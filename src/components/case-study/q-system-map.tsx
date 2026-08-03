import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";
import { eyebrowStyle } from "./case-study-shell";

/**
 * The system map for section 4 of the Quant case study.
 *
 * Ordinary semantic HTML styled with existing tokens — nested lists, no canvas,
 * SVG, or animation — so the map is its own accessible text equivalent. Every
 * node label is a claim accepted in `docs/q-case-study-evidence.md` (WO-024),
 * worded to match the approved section 4 copy. No internal host, schema name,
 * broker name, or throughput figure appears here, and none may be added.
 */

type MapNode = {
  /** Accepted public component name. */
  label: string;
  /** One short qualifier, traceable to the claim ID cited beside it. */
  detail: string;
  accent?: string;
};

/** SYS-01: Tauri 2 desktop shell around a web-rendered React SPA. */
const DESKTOP_SHELL: MapNode = {
  label: "Tauri desktop shell",
  detail: "Native desktop host for the research console",
  accent: "var(--color-accent-a)",
};

/** SYS-01: React SPA rendered in the webview. */
const REACT_SPA: MapNode = {
  label: "React SPA",
  detail: "Webview interface talking to the local API",
  accent: "var(--color-accent-a)",
};

/** SYS-02: FastAPI HTTP service. */
const API_SERVICE: MapNode = {
  label: "FastAPI service",
  detail: "HTTP API surface for the desktop console",
  accent: "var(--color-accent-b)",
};

/** SYS-04: PostgreSQL with Alembic migrations. */
const POSTGRES: MapNode = {
  label: "PostgreSQL",
  detail: "Application schema through Alembic migrations",
};

/** SYS-03: Redis queue feeding Dramatiq workers. */
const REDIS_QUEUE: MapNode = {
  label: "Redis queue",
  detail: "Job queue for asynchronous research work",
};

/** SYS-03: Dramatiq worker pool and the job types named in section 4. */
const WORKER_POOL: MapNode = {
  label: "Dramatiq worker pool",
  detail: "Backtests, optimization, walk-forward, and discovery",
  accent: "var(--color-accent-c)",
};

/** SYS-07: market-data ingestion into local storage. */
const MARKET_DATA: MapNode = {
  label: "Market-data ingestion",
  detail: "Lands in local storage the research workspaces read",
};

/**
 * SYS-05: MetaTrader 5 boundary with a read-only remote gateway that exposes
 * no order API. SYS-11 / OWN-07: live trading locked; paper only today.
 */
const MT5_BOUNDARY: MapNode = {
  label: "MetaTrader 5 boundary",
  detail: "Read-only gateway; paper execution, live trading locked",
};

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

export function QSystemMap() {
  return (
    <div className="flex flex-col gap-4">
      {/*
        One named outer list is the accessible equivalent of the nested stack
        WO-027 sketches. The id is fixed because the map appears once on the
        route. List order carries direction; connectors are decorative only.
      */}
      <p id={STACK_PATH_LABEL_ID} style={groupLabelStyle}>
        How the stack nests
      </p>

      <ol aria-labelledby={STACK_PATH_LABEL_ID} className={listStyle}>
        <li className="flex flex-col">
          <MapNodeBox node={DESKTOP_SHELL} />
          <Connector className="h-6 w-px" />
        </li>

        <li className="flex flex-col">
          <MapNodeBox node={REACT_SPA} />
          <Connector className="h-6 w-px" />
        </li>

        <li className="flex flex-col">
          <MapNodeBox node={API_SERVICE} />
          <Connector className="h-6 w-px" />

          <p id={API_DEPS_LABEL_ID} style={groupLabelStyle} className="mb-4">
            What the API depends on
          </p>

          <ol
            aria-labelledby={API_DEPS_LABEL_ID}
            className={cn(listStyle, "gap-4")}
          >
            <li className="flex flex-col md:flex-row md:items-stretch md:gap-0">
              <div className="flex flex-1 flex-col md:flex-row md:items-stretch">
                <MapNodeBox node={POSTGRES} />
              </div>
            </li>

            <li className="flex flex-col">
              <MapNodeBox node={REDIS_QUEUE} />
              <Connector className="h-6 w-px" />
              <MapNodeBox node={WORKER_POOL} />
            </li>

            <li className="flex flex-1">
              <MapNodeBox node={MARKET_DATA} />
            </li>

            <li className="flex flex-1">
              <MapNodeBox node={MT5_BOUNDARY} />
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
}
