import { existsSync } from "node:fs";
import path from "node:path";
import type { ProjectId } from "../types";

const ENV_VARS: Record<ProjectId, string> = {
  aegis: "SCREENSHOTS_AEGIS_PATH",
  q: "SCREENSHOTS_Q_PATH",
  nexo: "SCREENSHOTS_NEXO_PATH",
};

const SIBLING_DEFAULTS: Record<ProjectId, string> = {
  aegis: "aegis-project",
  q: "q",
  nexo: "nexo",
};

/**
 * Resolves an external project's repository path without hardcoding a
 * machine-specific location: an env var takes priority, falling back to the
 * sibling-directory convention (`../<repo>` relative to this repo's root).
 */
export function resolveRepoPath(id: ProjectId): string {
  const envVar = ENV_VARS[id];
  const fromEnv = process.env[envVar];
  if (fromEnv) {
    return path.resolve(fromEnv);
  }

  const guess = path.resolve(process.cwd(), "..", SIBLING_DEFAULTS[id]);
  if (existsSync(guess)) {
    return guess;
  }

  throw new Error(
    `[${id}] could not locate repository. Set ${envVar} or place it at ${guess}.`,
  );
}
