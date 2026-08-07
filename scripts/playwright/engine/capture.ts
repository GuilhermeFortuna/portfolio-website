import path from "node:path";
import { fileURLToPath } from "node:url";
import { PROJECTS } from "../projects/registry";
import type { ProjectId, ScreenshotProject } from "../types";
import { createLogger } from "./log";
import { ensureServer, stopServer } from "./server-lifecycle";
import { openCaptureSession, closeCaptureSession, captureMaster } from "./screenshot";
import { convertToDeliverable } from "./pipeline";
import { printSummaryTable, summarizeCapture } from "./review";
import { createConsoleBuffer, writeDiagnostics } from "./diagnostics";
import { ensureAuthValid } from "./auth";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");

interface Args {
  projectId: ProjectId | "all";
  authOnly: boolean;
}

function parseArgs(): Args {
  const raw = process.argv.find((arg) => arg.startsWith("--project="));
  if (!raw) {
    throw new Error("usage: capture.ts --project=<q|aegis|nexo|all> [--auth-only]");
  }
  const projectId = raw.split("=")[1] as ProjectId | "all";
  if (projectId !== "all" && !(projectId in PROJECTS)) {
    throw new Error(`unknown project "${projectId}". Expected one of: ${Object.keys(PROJECTS).join(", ")}, all`);
  }
  return { projectId, authOnly: process.argv.includes("--auth-only") };
}

function runId(): string {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

async function runAuthOnly(project: ScreenshotProject): Promise<void> {
  const log = createLogger(project.id);
  if (!project.auth) {
    log.info("this project has no auth config — nothing to do.");
    return;
  }

  const result = await ensureServer(project.server, log);
  try {
    const { browser, context, page } = await (async () => {
      const { chromium } = await import("playwright");
      const browser = await chromium.launch();
      const context = await browser.newContext({
        viewport: { width: project.viewport.width, height: project.viewport.height },
        deviceScaleFactor: project.viewport.deviceScaleFactor,
      });
      const page = await context.newPage();
      return { browser, context, page };
    })();

    try {
      await project.auth.login(page, project.baseURL);
      await context.storageState({ path: project.auth.storageStatePath });
      log.info(`storageState written to ${project.auth.storageStatePath}`);
    } finally {
      await context.close();
      await browser.close();
    }
  } finally {
    await stopServer(result, project.server, log);
  }
}

async function runCapture(project: ScreenshotProject, run: string): Promise<boolean> {
  const log = createLogger(project.id);
  const runDir = path.join(REPO_ROOT, "scripts/playwright/scratch", run, project.id);
  const mastersDir = path.join(runDir, "masters");
  const deliverablesDir = path.join(runDir, "deliverables");
  const diagnosticsDir = path.join(runDir, "diagnostics");

  let overallOk = true;
  const result = await ensureServer(project.server, log);

  try {
    if (project.auth) {
      const valid = await ensureAuthValid(project, log);
      if (!valid) {
        log.error(
          `stored session missing or expired. Run: pnpm screenshots:auth:${project.id}`,
        );
        return false;
      }
    }

    const session = await openCaptureSession(project);
    const consoleBuffer = createConsoleBuffer();
    consoleBuffer.attach(session.page);

    const summaryRows = [];

    try {
      for (const capture of project.captures) {
        try {
          log.info(`capturing ${capture.route} -> ${capture.name}.webp`);
          const masterPath = await captureMaster(session.page, project, capture, mastersDir, log);
          const deliverable = await convertToDeliverable(
            masterPath,
            deliverablesDir,
            capture.name,
            log,
          );
          summaryRows.push(summarizeCapture(capture.name, deliverable.bytes));
        } catch (err) {
          overallOk = false;
          log.error(`capture:${capture.name} failed: ${err instanceof Error ? err.message : String(err)}`);
          await writeDiagnostics({
            diagnosticsDir,
            name: capture.name,
            phase: `capture:${capture.name}`,
            error: err,
            page: session.page,
            consoleBuffer,
            log,
          });
        }
      }
    } finally {
      await closeCaptureSession(session);
    }

    printSummaryTable(summaryRows, log);
    log.info(`scratch output at ${runDir}`);
    if (overallOk) {
      log.info(`review the output above, then run: pnpm screenshots:promote:${project.id}`);
    }
  } catch (err) {
    overallOk = false;
    log.error(`run failed: ${err instanceof Error ? err.message : String(err)}`);
  } finally {
    await stopServer(result, project.server, log);
  }

  return overallOk;
}

async function main() {
  const { projectId, authOnly } = parseArgs();
  const run = runId();

  const targets: ScreenshotProject[] =
    projectId === "all" ? Object.values(PROJECTS) : [PROJECTS[projectId]];

  if (authOnly) {
    for (const project of targets) {
      await runAuthOnly(project);
    }
    return;
  }

  const results: { id: ProjectId; ok: boolean }[] = [];
  for (const project of targets) {
    const ok = await runCapture(project, run);
    results.push({ id: project.id, ok });
  }

  const log = createLogger("screenshots");
  log.info("=== overall summary ===");
  for (const r of results) {
    log.info(`  ${r.id}: ${r.ok ? "OK" : "FAILED"}`);
  }

  if (results.some((r) => !r.ok)) {
    process.exit(1);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
