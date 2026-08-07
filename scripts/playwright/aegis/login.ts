import type { Page } from "playwright";

/**
 * Real admin credentials for a local Aegis demo stack — never hardcoded.
 * Read only here, only from process.env, and never logged. Staged in
 * .env.local (gitignored) and loaded via `node --env-file=.env.local`.
 */
function credentials(): { email: string; password: string } {
  const email = process.env.SCREENSHOT_EMAIL;
  const password = process.env.SCREENSHOT_PASSWORD;
  if (!email || !password) {
    throw new Error(
      "SCREENSHOT_EMAIL / SCREENSHOT_PASSWORD are not set. " +
        "Add them to .env.local (see .env.example) before running screenshots:auth:aegis.",
    );
  }
  return { email, password };
}

/** Ported from aegis-front's real login form (LoginForm.tsx / login.tsx route). */
export async function login(page: Page, baseURL: string): Promise<void> {
  const { email, password } = credentials();

  // Clears the per-tab "intro already played" marker so a fresh login always
  // plays the entry intro consistently, matching what a real sign-in does
  // (src/components/aegis/entry-intro.ts's resetAegisEntryIntro).
  await page.addInitScript(() => {
    try {
      sessionStorage.removeItem("aegis-intro-seen-v1");
    } catch {
      // sessionStorage can throw in locked-down contexts
    }
  });

  await page.goto(`${baseURL}/login`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.getByLabel("E-mail corporativo").fill(email);
  await page.getByLabel("Senha").fill(password);
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL((url) => url.pathname.startsWith("/aegis"), { timeout: 15000 });
}

/** Cheap staleness check: an authenticated route should not bounce to /login. */
export async function isValid(page: Page, baseURL: string): Promise<boolean> {
  await page.goto(`${baseURL}/aegis`, { waitUntil: "domcontentloaded", timeout: 15000 });
  return page.url().includes("/login") === false;
}
