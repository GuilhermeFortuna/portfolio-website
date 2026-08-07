import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveRepoPath } from "../engine/repo-paths";
import { login, isValid } from "../aegis/login";
import type { ScreenshotProject } from "../types";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const repositoryPath = resolveRepoPath("aegis");
const backendCwd = path.join(repositoryPath, "aegis");
const frontendCwd = path.join(repositoryPath, "aegis-front");

const API_PORT = 8001;
const FRONT_PORT = 8002;
const apiBaseURL = `http://127.0.0.1:${API_PORT}`;
const baseURL = `http://127.0.0.1:${FRONT_PORT}`;

// Aegis has no MSW-equivalent mocks mode (verified: dev.sh only offers
// --skip-docker/--install-only, nothing frontend-only). The real API + SPA
// are unavoidable. A single non-interactive shell starts both, sharing one
// process group so stopServer's process-group kill tears both down together
// — this is a fixed, developer-authored script (not untrusted config data),
// spawned with shell:false at the outer level via ["bash","-c",script].
const startBothProcesses = [
  "bash",
  "-c",
  [
    `cd ${JSON.stringify(backendCwd)} && AEGIS_DEV_PORT=${API_PORT} uv run dev &`,
    `cd ${JSON.stringify(frontendCwd)} && AEGIS_PUBLIC_API_URL=${apiBaseURL} AEGIS_PUBLIC_APP_ORIGIN=${baseURL} npm run dev -- --host 127.0.0.1 --port ${FRONT_PORT} --strictPort &`,
    "wait",
  ].join("\n"),
];

export const aegisProject: ScreenshotProject = {
  id: "aegis",
  label: "Aegis",
  repositoryPath,
  baseURL,
  outputDirectory: path.join(REPO_ROOT, "public/work/aegis"),
  viewport: { width: 1600, height: 900, deviceScaleFactor: 2 },
  server: {
    cwd: repositoryPath,
    command: startBothProcesses,
    readyUrl: `${baseURL}/login`,
    // Confirms the API actually booted, not just the SPA dev server — does
    // NOT confirm demo data is seeded. Seeding is a one-time manual
    // prerequisite (see README): an unseeded stack starts fine here, and
    // each capture's readySelector (e.g. "constellation-ready", never
    // "constellation-loading") is what actually catches an empty backend —
    // it times out with a diagnostic screenshot showing the stuck loading
    // state instead of silently capturing an empty dashboard.
    readyCheck: async () => {
      try {
        const res = await fetch(`${apiBaseURL}/health`, { signal: AbortSignal.timeout(2000) });
        return res.ok;
      } catch {
        return false;
      }
    },
    readyTimeoutMs: 60000,
    stop: "sigterm-process-group",
    setup: async ({ log }) => {
      // Idempotent: `docker compose up -d` no-ops on already-healthy
      // containers. Never runs setup-db.sh's migrate/seed/admin-bootstrap —
      // those mutate a stateful volume and are treated as a one-time manual
      // prerequisite, not something to auto-trigger on every capture run.
      const { spawn } = await import("node:child_process");
      log.info("ensuring Postgres/Redis containers are up (docker compose up -d)");
      await new Promise<void>((resolve, reject) => {
        const proc = spawn("docker", ["compose", "up", "-d"], { cwd: backendCwd, stdio: "inherit" });
        proc.on("exit", (code) =>
          code === 0 ? resolve() : reject(new Error(`docker compose up -d exited with code ${code}`)),
        );
        proc.on("error", reject);
      });
    },
  },
  auth: {
    storageStatePath: path.join(REPO_ROOT, "scripts/playwright/auth/aegis.json"),
    login,
    isValid,
  },
  captures: [
    {
      // The overview embeds RiskConstellationFeature in `embedded` mode,
      // which fetches its point layout from a live, uncached aggregation
      // query the first time it runs after a seed. Observed to take well
      // over 15s cold, while the same query is warm (fast) by the time the
      // dedicated /aegis/constellation capture below runs a few seconds
      // later. This is Aegis's own query performance, not a selector or
      // engine issue — give it more room instead of a longer global default.
      name: "overview",
      route: "/aegis",
      readySelector: '[data-testid="constellation-ready"]',
      readyTimeoutMs: 60000,
    },
    {
      name: "player-investigation",
      route: "/aegis/player?brand=brand1&userId=8005391&tab=alertas",
      readySelector: '[data-testid="investigation-summary"]',
    },
    { name: "risk-constellation", route: "/aegis/constellation", readySelector: '[data-testid="constellation-ready"]' },
    { name: "alerts", route: "/aegis/alertas", readySelector: '[data-testid="alertas-command-center"]' },
  ],
};
