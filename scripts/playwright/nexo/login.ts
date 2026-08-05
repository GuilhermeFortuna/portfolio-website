import type { Page } from "playwright";

// Fixture credentials for Nexo's MSW mocks-mode login — not real secrets,
// safe to keep in source (unlike Aegis's, which gate a real backend).
export const NEXO_CREDENTIALS = {
  email: "admin@demo.com",
  password: "demo123",
};

/** Ported from odonto_front/scripts/visual-capture.mjs's confirmed selectors. */
export async function login(page: Page, baseURL: string): Promise<void> {
  await page.goto(`${baseURL}/login`, { waitUntil: "domcontentloaded", timeout: 30000 });
  await page.getByLabel("E-mail").fill(NEXO_CREDENTIALS.email);
  await page.getByLabel("Senha").fill(NEXO_CREDENTIALS.password);
  await page.getByRole("button", { name: "Entrar" }).click();
  await page.waitForURL((url) => url.pathname !== "/login", { timeout: 15000 });
}

/** Cheap staleness check: an authenticated route should not bounce to /login. */
export async function isValid(page: Page, baseURL: string): Promise<boolean> {
  await page.goto(`${baseURL}/agenda`, { waitUntil: "domcontentloaded", timeout: 15000 });
  return page.url().includes("/login") === false;
}
