import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

const viewports = [
  { name: "desktop", width: 1440, height: 900 },
  { name: "tablet", width: 768, height: 1024 },
  { name: "mobile", width: 390, height: 844 },
  { name: "compact", width: 320, height: 568 },
  { name: "reflow", width: 720, height: 450 },
] as const;

async function openAegis(page: Page, hash = "") {
  await page.goto(`/work/aegis${hash}`, { waitUntil: "networkidle" });
  await expect(page.locator("[data-entrance='complete']").first()).toBeVisible({
    timeout: 12_000,
  });
}

async function expectNoHorizontalOverflow(page: Page) {
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      ),
    )
    .toBeLessThanOrEqual(1);
}

for (const viewport of viewports) {
  test(`${viewport.name}: remains overflow-free at every chapter`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await openAegis(page);
    await expectNoHorizontalOverflow(page);

    for (const id of [
      "context",
      "problem",
      "system",
      "decision-1",
      "decision-3",
      "contribution",
      "confidentiality",
    ]) {
      await page.locator(`#${id}`).scrollIntoViewIfNeeded();
      await expectNoHorizontalOverflow(page);
    }
  });
}

test("hero hands off cleanly to the stable context aperture", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openAegis(page, "#context");
  const aperture = page.locator("[data-aperture]");
  const slot = page.locator('[data-aperture-slot="aegis-aperture-context"]');
  await expect(aperture).toHaveAttribute("data-aperture-visible", "true");
  await expect
    .poll(async () => {
      const [actual, target] = await Promise.all([
        aperture.boundingBox(),
        slot.boundingBox(),
      ]);
      if (!actual || !target) return 999;
      return Math.max(
        Math.abs(actual.x - target.x),
        Math.abs(actual.y - target.y),
        Math.abs(actual.width - target.width),
        Math.abs(actual.height - target.height),
      );
    })
    .toBeLessThanOrEqual(2);
  await expect(page.locator("[data-hero-handoff]")).not.toBeInViewport();

  const contextRect = await slot.boundingBox();
  const problemSlot = page.locator('[data-aperture-slot="aegis-aperture-problem"]');
  const problemRect = await problemSlot.boundingBox();
  const initialScrollY = await page.evaluate(() => scrollY);
  await page.evaluate(() => {
    const context = document.querySelector("#context")!.getBoundingClientRect().top + scrollY;
    const problem = document.querySelector("#problem")!.getBoundingClientRect().top + scrollY;
    const contextStart = context - innerHeight * 0.25;
    const problemStart = problem - innerHeight * 0.25;
    scrollTo(0, contextStart + (problemStart - contextStart) * 0.8);
  });
  await expect.poll(async () => aperture.getAttribute("data-aperture-scene")).toBe("context");
  const midpoint = await aperture.boundingBox();
  const midpointScrollY = await page.evaluate(() => scrollY);
  expect(midpoint).not.toBeNull();
  expect(contextRect).not.toBeNull();
  expect(problemRect).not.toBeNull();
  for (const key of ["x", "width", "height"] as const) {
    const low = Math.min(contextRect![key], problemRect![key]) - 2;
    const high = Math.max(contextRect![key], problemRect![key]) + 2;
    expect(midpoint![key]).toBeGreaterThanOrEqual(low);
    expect(midpoint![key]).toBeLessThanOrEqual(high);
  }
  const contextDocumentY = contextRect!.y + initialScrollY;
  const problemDocumentY = problemRect!.y + initialScrollY;
  const midpointDocumentY = midpoint!.y + midpointScrollY;
  expect(midpointDocumentY).toBeGreaterThanOrEqual(
    Math.min(contextDocumentY, problemDocumentY) - 2,
  );
  expect(midpointDocumentY).toBeLessThanOrEqual(
    Math.max(contextDocumentY, problemDocumentY) + 2,
  );
});

test("all twelve chapter destinations remain reachable in short and reflow viewports", async ({ page }) => {
  for (const viewport of [
    { width: 1440, height: 900 },
    { width: 320, height: 568 },
    { width: 720, height: 450 },
  ]) {
    await page.setViewportSize(viewport);
    await openAegis(page);
    await page.locator("[data-chapter-island] button").first().click();
    const links = page.locator("[data-chapter-island] a[href^='#']");
    await expect(links).toHaveCount(12);
    await links.last().scrollIntoViewIfNeeded();
    await expect(links.last()).toBeVisible();
  }
});

test("chapter instrument preserves native anchors and focus cleanup", async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await openAegis(page);
  const opener = page.locator("[data-chapter-island] button").first();
  await opener.click();
  await expect(page.locator("[data-chapter-instrument]")).toHaveAttribute(
    "data-expanded",
    "true",
  );
  const destination = page.locator('[data-chapter-island] a[href="#problem"]');
  await expect(destination).toHaveAttribute("href", "#problem");
  await destination.click();
  await expect.poll(() => page.evaluate(() => location.hash)).toBe("#problem");

  await opener.click();
  await page.keyboard.press("Escape");
  await expect(opener).toBeFocused();
  await opener.click();
  await page.locator("#problem-heading").click();
  await expect(opener).toBeFocused();
});

test("decision 3 evidence planes inspect sequentially and reverse", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openAegis(page, "#decision-3");
  await expect(page.locator("[data-evidence-stage]")).toHaveAttribute(
    "data-evidence-enhanced",
    "true",
  );
  const player = page.locator(
    '[data-evidence-plane="aegis-player-investigation"]',
  );
  const risk = page.locator(
    '[data-evidence-plane="aegis-risk-constellation"]',
  );
  await expect(player).toBeVisible();
  await expect(risk).toBeVisible();

  await page.locator("#decision-3-heading").evaluate((heading) => {
    const top = heading.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top - window.innerHeight * 0.35);
  });
  await expect
    .poll(async () => player.getAttribute("data-evidence-inspect"))
    .toBe("true");
  await expect(risk).toHaveAttribute("data-evidence-inspect", "false");

  await page.locator("#decision-3-heading").evaluate((heading) => {
    const top = heading.getBoundingClientRect().top + window.scrollY;
    const height = document.querySelector("#decision-3")!.getBoundingClientRect()
      .height;
    window.scrollTo(0, top + height * 0.55 - window.innerHeight * 0.25);
  });
  await expect
    .poll(async () => risk.getAttribute("data-evidence-inspect"))
    .toBe("true");

  await page.locator("#decision-3-heading").evaluate((heading) => {
    const top = heading.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top - window.innerHeight * 0.35);
  });
  await expect
    .poll(async () => player.getAttribute("data-evidence-inspect"))
    .toBe("true");
});

test("decision panels settle and reverse from physical heading ranges", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openAegis(page, "#decision-3");
  const panel2 = page.locator('[data-decision-index="1"] [data-decision-inner]');
  const panel3 = page.locator('[data-decision-index="2"] [data-decision-inner]');
  const angle = (transform: string) => {
    if (transform === "none") return 0;
    const values = transform.match(/matrix\(([^)]+)\)/)?.[1]?.split(",").map(Number);
    return values ? Math.abs((Math.atan2(values[1]!, values[0]!) * 180) / Math.PI) : 999;
  };
  await expect
    .poll(async () => angle(await panel3.evaluate((node) => getComputedStyle(node).transform)))
    .toBeGreaterThan(5);
  await page.locator("#decision-2-heading").evaluate((heading) => {
    const top = heading.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top - window.innerHeight * 0.2);
  });
  await expect
    .poll(async () => angle(await panel2.evaluate((node) => getComputedStyle(node).transform)))
    .toBeLessThan(0.5);
  await page.locator("#decision-2-heading").evaluate((heading) => {
    const top = heading.getBoundingClientRect().top + window.scrollY;
    window.scrollTo(0, top - window.innerHeight);
  });
  await expect
    .poll(async () => angle(await panel2.evaluate((node) => getComputedStyle(node).transform)))
    .toBeGreaterThan(20);
});

test("has no serious or critical Axe violations with the silent-film contract asserted", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openAegis(page, "#decision-4");
  const video = page.locator("video");
  await expect(video).toHaveAttribute("muted", "");
  await expect(video).toHaveAttribute("controls", "");
  await expect(video).toHaveAttribute("aria-label", /silent/i);
  await expect(page.getByText(/There is no sound/i)).toBeVisible();

  const results = await new AxeBuilder({ page })
    .disableRules(["video-caption"])
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(
    results.violations.filter((violation) =>
      ["serious", "critical"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
});

test("reference compositions", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await openAegis(page);
  await expect(page).toHaveScreenshot("hero-start.png", { fullPage: false });

  for (const id of ["context", "problem", "decision-1", "decision-3"]) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect(page).toHaveScreenshot(`${id}.png`, { fullPage: false });
  }

  await page.locator("[data-chapter-island] button").first().click();
  await expect(page).toHaveScreenshot("expanded-chapters.png", { fullPage: false });
  await page.getByRole("button", { name: "Close chapter list" }).click();

  await page.setViewportSize({ width: 390, height: 844 });
  await openAegis(page, "#context");
  await expect(page).toHaveScreenshot("mobile-context.png", { fullPage: false });
});
