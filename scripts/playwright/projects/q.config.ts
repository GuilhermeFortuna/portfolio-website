import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveRepoPath } from "../engine/repo-paths";
import type { ScreenshotProject } from "../types";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const repositoryPath = resolveRepoPath("q");
const frontendCwd = path.join(repositoryPath, "q_frontend");
const PORT = 1420;
const baseURL = `http://127.0.0.1:${PORT}`;

// Bypasses q/dev.sh entirely: dev.sh's Tauri/backend branching is irrelevant
// for a deterministic, unattended capture. Vite's own --mocks-equivalent
// behavior (VITE_ENABLE_MSW defaults true in dev, per src/lib/env.ts) needs
// no backend/infra at all.
export const qProject: ScreenshotProject = {
  id: "q",
  label: "Q",
  repositoryPath,
  baseURL,
  outputDirectory: path.join(REPO_ROOT, "public/work/q"),
  viewport: { width: 1600, height: 900, deviceScaleFactor: 2 },
  server: {
    cwd: frontendCwd,
    command: [
      path.join(frontendCwd, "node_modules/.bin/vite"),
      "--port",
      String(PORT),
      "--strictPort",
      "--host",
      "127.0.0.1",
    ],
    env: { VITE_ENABLE_MSW: "true" },
    readyUrl: `${baseURL}/`,
    readyTimeoutMs: 30000,
    stop: "sigterm-process-group",
  },
  // No `auth` — Q's mocks mode serves an open, unauthenticated app.
  captures: [
    { name: "launcher", route: "/", readySelector: '[data-workspace-transition-root="launcher"]' },
    { name: "market-data", route: "/market-data", readySelector: '[data-workspace-transition-root="market-data"]' },
    { name: "backtest-studio", route: "/backtests", readySelector: '[data-testid="backtest-workflow"]' },
    {
      name: "optimize-pareto",
      route: "/backtests?mode=optimize",
      readySelector: '[data-testid="optimize-workflow"]',
    },
    {
      name: "walkforward",
      route: "/backtests?mode=validate",
      readySelector: '[data-testid="validate-workflow"]',
    },
    { name: "discover-leaderboard", route: "/discover", readySelector: '[data-workspace-transition-root="discover"]' },
    {
      name: "research-features",
      route: "/research?tab=store",
      readySelector: '[data-workspace-transition-root="research"]',
    },
    { name: "execution", route: "/execution", readySelector: '[data-testid="execution-health-panel"]' },
    { name: "system", route: "/system", readySelector: '[data-workspace-transition-root="system"]' },
  ],
};
