import { mkdir } from "node:fs/promises";
import path from "node:path";
import { chromium, type Browser, type BrowserContext, type Page } from "playwright";
import type { ScreenshotCapture, ScreenshotProject } from "../types";
import {
  injectStabilizationCss,
  settleCanvasWebGL,
  waitForFontsAndImages,
  waitForTestId,
} from "./readiness";
import { runSafetyScan } from "./safety-scan";
import type { Logger } from "../types";

export interface CaptureSession {
  browser: Browser;
  context: BrowserContext;
  page: Page;
}

/** Launches a fresh browser/context/page for one project run, with tracing enabled. */
export async function openCaptureSession(project: ScreenshotProject): Promise<CaptureSession> {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: project.viewport.width, height: project.viewport.height },
    deviceScaleFactor: project.viewport.deviceScaleFactor,
    storageState: project.auth?.storageStatePath,
  });
  await context.tracing.start({ screenshots: true, snapshots: true });
  const page = await context.newPage();
  return { browser, context, page };
}

export async function closeCaptureSession(session: CaptureSession): Promise<void> {
  await session.context.close();
  await session.browser.close();
}

/**
 * Navigates to a capture's route, waits for its required readiness signal
 * plus fonts/images/canvas settling, runs a pre-shutter safety scan, and
 * writes a PNG master to `mastersDir/<name>.png`.
 */
export async function captureMaster(
  page: Page,
  project: ScreenshotProject,
  capture: ScreenshotCapture,
  mastersDir: string,
  log: Logger,
): Promise<string> {
  const viewport = capture.viewport ?? project.viewport;
  if (
    viewport.width !== project.viewport.width ||
    viewport.height !== project.viewport.height ||
    viewport.deviceScaleFactor !== project.viewport.deviceScaleFactor
  ) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
  }

  const url = new URL(capture.route, project.baseURL).toString();
  await page.goto(url, { waitUntil: "domcontentloaded" });

  await capture.prepare?.(page);
  await waitForTestId(page, capture.readySelector, capture.readyTimeoutMs);
  await waitForFontsAndImages(page);
  await settleCanvasWebGL(page);
  await capture.waitFor?.(page);
  await injectStabilizationCss(page, project.hideSelectors);

  const scanResult = await runSafetyScan(page);
  if (scanResult.matched) {
    log.warn(`capture:${capture.name} ABORTED — safety scan matched pattern "${scanResult.patternName}"`);
    throw new Error(`safety scan matched pattern "${scanResult.patternName}"`);
  }

  await mkdir(mastersDir, { recursive: true });
  const masterPath = path.join(mastersDir, `${capture.name}.png`);

  // scale: "device" (the default) bakes deviceScaleFactor into the output —
  // required to get the full 3200x1800 master from a 1600x900 CSS viewport
  // at DSF 2. Do not set scale: "css" here, which would discard the DSF
  // multiplier and produce a 1x master.
  if (capture.locator) {
    await page.locator(capture.locator).first().screenshot({
      path: masterPath,
      animations: "disabled",
      caret: "hide",
    });
  } else {
    await page.screenshot({
      path: masterPath,
      fullPage: capture.fullPage ?? false,
      animations: "disabled",
      caret: "hide",
    });
  }

  return masterPath;
}
