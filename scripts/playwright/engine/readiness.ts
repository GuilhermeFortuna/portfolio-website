import type { Page } from "playwright";

/** Waits for a required data-testid readiness signal to become visible. */
export async function waitForTestId(
  page: Page,
  selector: string,
  timeoutMs = 15000,
): Promise<void> {
  await page.locator(selector).first().waitFor({ state: "visible", timeout: timeoutMs });
}

/** Waits for web fonts and all currently-present images to finish loading/decoding. */
export async function waitForFontsAndImages(page: Page): Promise<void> {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const images = Array.from(document.images).filter((img) => !img.complete);
    await Promise.all(
      images.map((img) => img.decode().catch(() => undefined)),
    );
  });
}

/**
 * Freezes the current frame for a stable shutter without disabling motion as
 * a feature: zeroes animation/transition durations (the page still runs in
 * its normal motion-enabled mode otherwise), hides the caret, suppresses
 * scrollbars (pair with Chromium `--hide-scrollbars`), and force-hides any
 * project-specified overlay/toast/tooltip selectors.
 */
export async function injectStabilizationCss(
  page: Page,
  extraSelectors: string[] = [],
): Promise<void> {
  const hideRules = extraSelectors
    .map((selector) => `${selector} { display: none !important; }`)
    .join("\n");

  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
      * {
        caret-color: transparent !important;
        scrollbar-width: none !important;
        -ms-overflow-style: none !important;
      }
      *::-webkit-scrollbar {
        display: none !important;
        width: 0 !important;
        height: 0 !important;
      }
      ${hideRules}
    `,
  });
}

/**
 * Best-effort settle for canvas/WebGL scenes: polls two toDataURL samples a
 * short interval apart until they match or a hard iteration cap is hit.
 * Heuristic, not a guarantee — never an unbounded wait.
 */
export async function settleCanvasWebGL(
  page: Page,
  maxIterations = 8,
  intervalMs = 150,
): Promise<void> {
  for (let i = 0; i < maxIterations; i++) {
    const before = await sampleCanvases(page);
    if (before === null) return; // no canvases on the page
    await page.waitForTimeout(intervalMs);
    const after = await sampleCanvases(page);
    if (before === after) return;
  }
}

async function sampleCanvases(page: Page): Promise<string | null> {
  return page.evaluate(() => {
    const canvases = Array.from(document.querySelectorAll("canvas"));
    if (canvases.length === 0) return null;
    try {
      return canvases.map((c) => c.toDataURL()).join("|");
    } catch {
      return null; // tainted canvas (cross-origin content) — skip settling
    }
  });
}
