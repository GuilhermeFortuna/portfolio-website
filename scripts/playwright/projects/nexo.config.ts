import path from "node:path";
import { fileURLToPath } from "node:url";
import { resolveRepoPath } from "../engine/repo-paths";
import { login, isValid } from "../nexo/login";
import type { ScreenshotProject } from "../types";

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..", "..");
const repositoryPath = resolveRepoPath("nexo");
const frontendCwd = path.join(repositoryPath, "odonto_front");
const PORT = 5174;
const baseURL = `http://127.0.0.1:${PORT}`;

// Fixture data from odonto_front/src/mocks: João Fictício, the MSW showcase
// patient, and his draft orçamento / WhatsApp thread.
const PATIENT_ID = "11111111-1111-4111-8111-111111111101";
const ORCAMENTO_ID = "orc-11111111-1111-4111-8111-111111111201";
const CONVERSATION_ID = "c1111111-1111-4111-8111-111111111101";

// Bypasses nexo/dev.sh entirely: it starts docker+backend, unneeded for a
// frontend-only MSW-mocked capture. Mirrors odonto_front's own
// scripts/visual-capture.mjs, which proves this exact approach works.
export const nexoProject: ScreenshotProject = {
  id: "nexo",
  label: "Nexo Dental",
  repositoryPath,
  baseURL,
  outputDirectory: path.join(REPO_ROOT, "public/work/nexo-dental"),
  viewport: { width: 1600, height: 900, deviceScaleFactor: 2 },
  server: {
    cwd: frontendCwd,
    command: [
      path.join(frontendCwd, "node_modules/.bin/vite"),
      "--host",
      "127.0.0.1",
      "--port",
      String(PORT),
      "--strictPort",
    ],
    env: {
      VITE_USE_MOCKS: "true",
      VITE_MOCK_CLINIC_NAME: "Clínica Centro",
      VITE_SHOW_DEMO_BANNER: "false",
      VITE_DEMO_CLOCK_ISO: "2026-07-15T12:00:00-03:00",
    },
    readyUrl: `${baseURL}/login`,
    readyTimeoutMs: 30000,
    stop: "sigterm-process-group",
  },
  auth: {
    storageStatePath: path.join(REPO_ROOT, "scripts/playwright/auth/nexo.json"),
    login,
    isValid,
  },
  captures: [
    { name: "shell-identity", route: "/", readySelector: '[data-testid="viz115-sculpted-flagship"]' },
    { name: "agenda", route: "/agenda", readySelector: '[data-testid="week-grid"]' },
    { name: "fila", route: "/fila", readySelector: '[data-testid="fila-workspace"]' },
    {
      name: "patient-workspace",
      route: `/pacientes/${PATIENT_ID}/sobre`,
      readySelector: '[data-testid="patient-sobre-sections"]',
    },
    {
      name: "odontogram",
      route: `/pacientes/${PATIENT_ID}/tratamentos`,
      readySelector: '[data-testid="odontogram-workspace"]',
    },
    {
      name: "clinical-timeline",
      route: `/pacientes/${PATIENT_ID}/prontuario`,
      readySelector: '[data-testid="clinical-workspace"]',
    },
    {
      name: "orcamento",
      route: `/pacientes/${PATIENT_ID}/orcamentos/${ORCAMENTO_ID}`,
      readySelector: '[data-testid="orcamento-detail"]',
    },
    {
      name: "financial-ledger",
      route: `/pacientes/${PATIENT_ID}/debitos`,
      readySelector: '[data-testid="ledger-page"]',
    },
    {
      name: "whatsapp-inbox",
      route: `/conversas?conversation=${CONVERSATION_ID}`,
      readySelector: '[data-testid="conversas-inbox-shell"]',
    },
    { name: "reports", route: "/relatorios", readySelector: '[data-testid="reports-catalog-page"]' },
  ],
};
