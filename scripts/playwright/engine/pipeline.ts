import { spawn } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import type { Logger } from "../types";

const DELIVERABLE_WIDTH = 2560;
const DELIVERABLE_HEIGHT = 1440;
const TARGET_BYTES = 250 * 1024;
const CEILING_BYTES = 500 * 1024;

export interface ConversionResult {
  path: string;
  bytes: number;
}

/**
 * Converts a PNG master into the established WebP deliverable convention:
 * straight downscale to 2560x1440, quality 90, ffmpeg's "text" preset (sharp
 * edges for UI screenshots). Warns past the 250KiB target, hard-fails past
 * the 500KiB ceiling rather than silently shipping an oversized asset.
 */
export async function convertToDeliverable(
  masterPath: string,
  deliverablesDir: string,
  name: string,
  log: Logger,
): Promise<ConversionResult> {
  await mkdir(deliverablesDir, { recursive: true });
  const deliverablePath = path.join(deliverablesDir, `${name}.webp`);

  await runFfmpeg([
    "-y",
    "-i",
    masterPath,
    "-vf",
    `scale=${DELIVERABLE_WIDTH}:${DELIVERABLE_HEIGHT}`,
    "-c:v",
    "libwebp",
    "-quality",
    "90",
    "-preset",
    "text",
    deliverablePath,
  ]);

  const { size } = await stat(deliverablePath);

  if (size > CEILING_BYTES) {
    throw new Error(
      `${name}.webp is ${(size / 1024).toFixed(0)}KiB, over the ${CEILING_BYTES / 1024}KiB ceiling. ` +
        `Consider lowering quality or checking for an unusually dense/noisy capture.`,
    );
  }
  if (size > TARGET_BYTES) {
    log.warn(
      `${name}.webp is ${(size / 1024).toFixed(0)}KiB, over the ${TARGET_BYTES / 1024}KiB target (still within the ${CEILING_BYTES / 1024}KiB ceiling).`,
    );
  }

  return { path: deliverablePath, bytes: size };
}

function runFfmpeg(args: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    const proc = spawn("ffmpeg", args, { stdio: ["ignore", "ignore", "pipe"] });
    let stderr = "";
    proc.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    proc.on("error", (err) => {
      reject(new Error(`failed to spawn ffmpeg: ${err.message}`));
    });
    proc.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}: ${stderr.slice(-2000)}`));
      }
    });
  });
}
