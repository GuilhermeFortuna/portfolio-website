import { existsSync } from "node:fs";
import { chromium } from "playwright";
import type { Logger, ScreenshotProject } from "../types";

/**
 * Loads the project's persisted storageState (if any) and checks it's still
 * valid via AuthConfig.isValid. Never logs in inline — a missing/expired
 * session is the caller's cue to fail with an actionable
 * `pnpm screenshots:auth:<id>` message rather than prompting.
 */
export async function ensureAuthValid(project: ScreenshotProject, log: Logger): Promise<boolean> {
  const auth = project.auth;
  if (!auth) return true;

  if (!existsSync(auth.storageStatePath)) {
    return false;
  }

  const browser = await chromium.launch();
  try {
    const context = await browser.newContext({ storageState: auth.storageStatePath });
    try {
      const page = await context.newPage();
      try {
        return await auth.isValid(page, project.baseURL);
      } finally {
        await page.close();
      }
    } finally {
      await context.close();
    }
  } catch (err) {
    log.warn(`could not validate stored session: ${err instanceof Error ? err.message : String(err)}`);
    return false;
  } finally {
    await browser.close();
  }
}
