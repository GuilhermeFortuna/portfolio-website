import type { Page } from "playwright";

export type ProjectId = "q" | "aegis" | "nexo";

export interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

export interface ServerStartup {
  /** Absolute path to run `command` in. */
  cwd: string;
  /** Argv, never a shell string — spawned with shell:false. */
  command: string[];
  env?: Record<string, string>;
  /** URL polled to decide whether a server is already running / has finished starting. */
  readyUrl: string;
  /**
   * Optional extra check beyond a reachable response, e.g. confirming
   * demo data has actually been seeded before treating the server as usable.
   */
  readyCheck?: (baseURL: string) => Promise<boolean>;
  readyTimeoutMs: number;
  pollIntervalMs?: number;
  /** How to stop a server this run started. Never applied to a reused server. */
  stop: "sigterm-process-group" | "sigterm";
  /**
   * Optional one-time setup invoked before the server is probed at all
   * (e.g. `docker compose up -d` + cache warm for Aegis). Must be idempotent —
   * the engine calls it on every run and expects the hook to decide whether
   * there is anything to do.
   */
  setup?: (ctx: { log: Logger }) => Promise<void>;
}

export interface AuthConfig {
  /** Absolute path under scripts/playwright/auth/ where storageState is persisted. */
  storageStatePath: string;
  /** Performs a real login. Used by the `--auth-only` flow to produce storageState. */
  login: (page: Page, baseURL: string) => Promise<void>;
  /** Cheap check against a freshly loaded page (with storageState applied) for staleness. */
  isValid: (page: Page, baseURL: string) => Promise<boolean>;
}

export interface Viewport {
  width: number;
  height: number;
  deviceScaleFactor: number;
}

export interface ScreenshotCapture {
  /** Output filename stem: <name>.webp, written into the project's public/work/<slug>/ directory. */
  name: string;
  route: string;
  fullPage?: boolean;
  /** CSS selector to screenshot instead of the full viewport/page. */
  locator?: string;
  /** REQUIRED — every capture must declare a data-testid readiness signal. */
  readySelector: string;
  /** Override for slow-loading routes. Defaults to 15000ms. */
  readyTimeoutMs?: number;
  viewport?: Viewport;
  /** Runs before the readiness wait, e.g. to open a menu or seed localStorage. */
  prepare?: (page: Page) => Promise<void>;
  /** Extra capture-specific settle logic beyond readySelector + fonts/images. */
  waitFor?: (page: Page) => Promise<void>;
}

export interface ScreenshotProject {
  id: ProjectId;
  label: string;
  repositoryPath: string;
  server: ServerStartup;
  baseURL: string;
  auth?: AuthConfig;
  /** Absolute path to public/work/<slug> in this repo. */
  outputDirectory: string;
  /** Extra overlay/toast/tooltip selectors to force-hide before every shutter. */
  hideSelectors?: string[];
  viewport: Viewport;
  captures: ScreenshotCapture[];
}
