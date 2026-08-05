import { copyFile, mkdir, readdir, rename, stat } from "node:fs/promises";
import path from "node:path";
import type { Logger } from "../types";

export interface CaptureSummaryRow {
  name: string;
  bytes: number;
  withinTarget: boolean;
  withinCeiling: boolean;
}

const TARGET_BYTES = 250 * 1024;
const CEILING_BYTES = 500 * 1024;

export function summarizeCapture(name: string, bytes: number): CaptureSummaryRow {
  return {
    name,
    bytes,
    withinTarget: bytes <= TARGET_BYTES,
    withinCeiling: bytes <= CEILING_BYTES,
  };
}

export function printSummaryTable(rows: CaptureSummaryRow[], log: Logger): void {
  log.info("capture summary:");
  for (const row of rows) {
    const kib = (row.bytes / 1024).toFixed(1);
    const flag = !row.withinCeiling ? "FAIL (over ceiling)" : !row.withinTarget ? "WARN (over target)" : "ok";
    log.info(`  ${row.name.padEnd(28)} ${kib.padStart(8)}KiB  ${flag}`);
  }
}

/**
 * Copies every deliverable from the given scratch run's deliverables
 * directory into the project's public/work/<slug> output directory.
 * Uses copy-to-temp-name + rename so a crash mid-copy can never leave a
 * partial file looking like a successfully promoted one.
 */
export async function promoteDeliverables(
  deliverablesDir: string,
  outputDirectory: string,
  log: Logger,
): Promise<string[]> {
  await mkdir(outputDirectory, { recursive: true });
  const entries = await readdir(deliverablesDir);
  const promoted: string[] = [];

  for (const entry of entries) {
    const src = path.join(deliverablesDir, entry);
    const info = await stat(src);
    if (!info.isFile()) continue;

    const dest = path.join(outputDirectory, entry);
    const tempDest = path.join(outputDirectory, `.${entry}.tmp`);
    await copyFile(src, tempDest);
    await rename(tempDest, dest);
    promoted.push(dest);
    log.info(`promoted ${entry} -> ${dest}`);
  }

  return promoted;
}

/** Finds the most recent run directory under scripts/playwright/scratch/. */
export async function findLatestRun(scratchRoot: string): Promise<string> {
  const entries = await readdir(scratchRoot, { withFileTypes: true });
  const runDirs = entries.filter((e) => e.isDirectory()).map((e) => e.name).sort();
  const latest = runDirs.at(-1);
  if (!latest) {
    throw new Error(`no scratch runs found under ${scratchRoot}. Run a capture first.`);
  }
  return path.join(scratchRoot, latest);
}
