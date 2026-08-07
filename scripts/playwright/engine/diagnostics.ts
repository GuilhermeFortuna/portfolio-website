import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Page } from "playwright";
import type { Logger } from "../types";

export interface ConsoleBuffer {
  lines: string[];
  attach(page: Page): void;
}

/** Buffers console + page-error events for a page from the moment it's created. */
export function createConsoleBuffer(): ConsoleBuffer {
  const lines: string[] = [];
  return {
    lines,
    attach(page: Page) {
      page.on("console", (msg) => {
        lines.push(`[console:${msg.type()}] ${msg.text()}`);
      });
      page.on("pageerror", (err) => {
        lines.push(`[pageerror] ${err.message}`);
      });
    },
  };
}

/**
 * Writes a failure diagnostics bundle: a screenshot (if the page is still
 * usable), the buffered console/pageerror log, the failing URL, and — if
 * tracing was started on the context — the trace archive.
 */
export async function writeDiagnostics(params: {
  diagnosticsDir: string;
  name: string;
  phase: string;
  error: unknown;
  page?: Page;
  consoleBuffer?: ConsoleBuffer;
  log: Logger;
}): Promise<void> {
  const { diagnosticsDir, name, phase, error, page, consoleBuffer, log } = params;
  await mkdir(diagnosticsDir, { recursive: true });

  const message = error instanceof Error ? error.message : String(error);
  const url = page?.url() ?? "unknown";

  const summary = [
    `phase: ${phase}`,
    `error: ${message}`,
    `url: ${url}`,
    "",
    "console/pageerror log:",
    ...(consoleBuffer?.lines ?? []),
  ].join("\n");

  await writeFile(path.join(diagnosticsDir, `${name}-failure.log`), summary, "utf8");

  if (page) {
    try {
      await page.screenshot({ path: path.join(diagnosticsDir, `${name}-failure.png`) });
    } catch (screenshotErr) {
      log.warn(`could not capture diagnostic screenshot: ${String(screenshotErr)}`);
    }

    try {
      await page.context().tracing.stop({
        path: path.join(diagnosticsDir, `${name}-trace.zip`),
      });
    } catch {
      // tracing may not have been started, or context already closed
    }
  }

  log.error(`diagnostics for capture:${name} written to ${diagnosticsDir}`);
}
