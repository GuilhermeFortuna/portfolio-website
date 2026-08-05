import type { Logger, ProjectId } from "../types";

export function createLogger(projectId: ProjectId | "screenshots"): Logger {
  const prefix = `[${projectId}]`;
  return {
    info(message: string) {
      console.log(`${prefix} ${message}`);
    },
    warn(message: string) {
      console.warn(`${prefix} ${message}`);
    },
    error(message: string) {
      console.error(`${prefix} ${message}`);
    },
  };
}
