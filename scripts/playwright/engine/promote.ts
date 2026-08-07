import path from "node:path";
import { fileURLToPath } from "node:url";
import { createLogger } from "./log";
import { findLatestRun, promoteDeliverables } from "./review";
import { PROJECTS } from "../projects/registry";
import type { ProjectId } from "../types";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const SCRATCH_ROOT = path.join(REPO_ROOT, "scripts/playwright/scratch");

function parseArgs(): { projectId: ProjectId } {
  const raw = process.argv.find((arg) => arg.startsWith("--project="));
  if (!raw) {
    throw new Error("usage: promote.ts --project=<q|aegis|nexo>");
  }
  const projectId = raw.split("=")[1] as ProjectId;
  if (!(projectId in PROJECTS)) {
    throw new Error(`unknown project "${projectId}". Expected one of: ${Object.keys(PROJECTS).join(", ")}`);
  }
  return { projectId };
}

async function main() {
  const { projectId } = parseArgs();
  const project = PROJECTS[projectId];
  const log = createLogger(projectId);

  const latestRun = await findLatestRun(SCRATCH_ROOT);
  const deliverablesDir = path.join(latestRun, projectId, "deliverables");

  log.info(`promoting from ${deliverablesDir} into ${project.outputDirectory}`);
  const promoted = await promoteDeliverables(deliverablesDir, project.outputDirectory, log);
  log.info(`promoted ${promoted.length} file(s).`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
