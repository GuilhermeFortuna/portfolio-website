import type { CSSProperties } from "react";

import type { Locale } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { eyebrowStyle } from "./case-study-shell";

/**
 * Semantic, localized system map for the Quant architecture section. Every
 * node remains traceable to the accepted claims in
 * `docs/q-case-study-evidence.md`; no confidential identifier or performance
 * claim belongs in this component.
 */

type MapNode = {
  label: string;
  detail: string;
  accent?: string;
};

type SystemMapCopy = {
  stackLabel: string;
  dependenciesLabel: string;
  desktopShell: MapNode;
  reactSpa: MapNode;
  apiService: MapNode;
  postgres: MapNode;
  redisQueue: MapNode;
  workerPool: MapNode;
  marketData: MapNode;
  mt5Boundary: MapNode;
};

const SYSTEM_MAP_COPY = {
  en: {
    stackLabel: "How the stack nests",
    dependenciesLabel: "What the API depends on",
    desktopShell: {
      label: "Tauri desktop shell",
      detail: "Native desktop host for the research console",
      accent: "var(--color-accent-a)",
    },
    reactSpa: {
      label: "React SPA",
      detail: "Webview interface talking to the local API",
      accent: "var(--color-accent-a)",
    },
    apiService: {
      label: "FastAPI service",
      detail: "HTTP API surface for the desktop console",
      accent: "var(--color-accent-b)",
    },
    postgres: {
      label: "PostgreSQL",
      detail: "Application schema through Alembic migrations",
    },
    redisQueue: {
      label: "Redis queue",
      detail: "Job queue for asynchronous research work",
    },
    workerPool: {
      label: "Dramatiq worker pool",
      detail: "Backtests, optimization, walk-forward, and discovery",
      accent: "var(--color-accent-c)",
    },
    marketData: {
      label: "Market-data ingestion",
      detail: "Lands in local storage the research workspaces read",
    },
    mt5Boundary: {
      label: "MetaTrader 5 boundary",
      detail: "Read-only gateway; paper execution, live trading locked",
    },
  },
  "pt-BR": {
    stackLabel: "Como a stack se organiza",
    dependenciesLabel: "Dependências da API",
    desktopShell: {
      label: "Shell desktop Tauri",
      detail: "Host desktop nativo do console de pesquisa",
      accent: "var(--color-accent-a)",
    },
    reactSpa: {
      label: "SPA em React",
      detail: "Interface no WebView que se comunica com a API local",
      accent: "var(--color-accent-a)",
    },
    apiService: {
      label: "Serviço FastAPI",
      detail: "Superfície HTTP da API para o console desktop",
      accent: "var(--color-accent-b)",
    },
    postgres: {
      label: "PostgreSQL",
      detail: "Esquema da aplicação com migrações Alembic",
    },
    redisQueue: {
      label: "Fila Redis",
      detail: "Fila de trabalhos para pesquisa assíncrona",
    },
    workerPool: {
      label: "Pool de workers Dramatiq",
      detail: "Backtests, otimização, walk-forward e descoberta",
      accent: "var(--color-accent-c)",
    },
    marketData: {
      label: "Ingestão de dados de mercado",
      detail: "Grava no armazenamento local lido pelas áreas de pesquisa",
    },
    mt5Boundary: {
      label: "Fronteira MetaTrader 5",
      detail:
        "Gateway somente leitura; execução simulada; trading ao vivo bloqueado",
    },
  },
} as const satisfies Record<Locale, SystemMapCopy>;

const nodeStyle: CSSProperties = {
  border: "1px solid var(--color-line)",
  borderRadius: "var(--radius-md)",
  backgroundColor: "var(--color-surface)",
  padding: "1rem 1.25rem",
};

const groupLabelStyle: CSSProperties = {
  ...eyebrowStyle,
  color: "var(--color-text-dim)",
};

function MapNodeBox({ node }: { node: MapNode }) {
  return (
    <div style={nodeStyle} className="flex flex-1 flex-col gap-2">
      <span
        style={{
          ...eyebrowStyle,
          lineHeight: 1.3,
          color: node.accent ?? "var(--color-text)",
        }}
      >
        {node.label}
      </span>
      <span className="text-[0.875rem] leading-[1.5] text-[var(--color-text-muted)]">
        {node.detail}
      </span>
    </div>
  );
}

function Connector({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn("block self-center bg-[var(--color-line-strong)]", className)}
    />
  );
}

const listStyle = "m-0 flex list-none flex-col p-0";

const STACK_PATH_LABEL_ID = "q-map-stack-path";
const API_DEPS_LABEL_ID = "q-map-api-deps";

export function QSystemMap({ locale = "en" }: { locale?: Locale }) {
  const copy = SYSTEM_MAP_COPY[locale];

  return (
    <div className="flex flex-col gap-4">
      <p id={STACK_PATH_LABEL_ID} style={groupLabelStyle}>
        {copy.stackLabel}
      </p>

      <ol aria-labelledby={STACK_PATH_LABEL_ID} className={listStyle}>
        <li className="flex flex-col">
          <MapNodeBox node={copy.desktopShell} />
          <Connector className="h-6 w-px" />
        </li>

        <li className="flex flex-col">
          <MapNodeBox node={copy.reactSpa} />
          <Connector className="h-6 w-px" />
        </li>

        <li className="flex flex-col">
          <MapNodeBox node={copy.apiService} />
          <Connector className="h-6 w-px" />

          <p id={API_DEPS_LABEL_ID} style={groupLabelStyle} className="mb-4">
            {copy.dependenciesLabel}
          </p>

          <ol
            aria-labelledby={API_DEPS_LABEL_ID}
            className={cn(listStyle, "gap-4")}
          >
            <li className="flex flex-col md:flex-row md:items-stretch md:gap-0">
              <div className="flex flex-1 flex-col md:flex-row md:items-stretch">
                <MapNodeBox node={copy.postgres} />
              </div>
            </li>

            <li className="flex flex-col">
              <MapNodeBox node={copy.redisQueue} />
              <Connector className="h-6 w-px" />
              <MapNodeBox node={copy.workerPool} />
            </li>

            <li className="flex flex-1">
              <MapNodeBox node={copy.marketData} />
            </li>

            <li className="flex flex-1">
              <MapNodeBox node={copy.mt5Boundary} />
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
}
