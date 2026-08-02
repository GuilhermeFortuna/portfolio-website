import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";
import { eyebrowStyle } from "./case-study-shell";

/**
 * The system map for section 4 of the Aegis case study.
 *
 * It is ordinary semantic HTML styled with the existing tokens — nested lists,
 * no canvas, SVG, or animation — so the map itself is the accessible text
 * equivalent: every label and qualifier is real text in reading order, and the
 * only decorative parts are the connector lines, which are hidden from
 * assistive technology because list order already carries the direction.
 *
 * Every node is a claim already accepted in
 * `docs/aegis-case-study-evidence.md` (WO-018), worded to match the approved
 * section 4 copy. No internal host, schema name, company name, or throughput
 * figure appears here, and none may be added.
 */

type MapNode = {
  /** Accepted public component name. */
  label: string;
  /** One short qualifier, traceable to the claim ID cited beside it. */
  detail: string;
  accent?: string;
};

/** SYS-01: standalone React SPA served as a static bundle. */
const INVESTIGATOR_UI: MapNode = {
  label: "Investigator UI",
  detail: "React single-page app, served as a static bundle",
  accent: "var(--color-accent-a)",
};

/** SYS-02 for the read-focused API; SYS-12 for it owning authorization. */
const API_SERVICE: MapNode = {
  label: "FastAPI service",
  detail: "Read-focused JSON API, and the only authorization authority",
  accent: "var(--color-accent-b)",
};

const READ_SOURCES: readonly MapNode[] = [
  // SYS-03: PostgreSQL holds the curated schema Aegis owns.
  {
    label: "Curated PostgreSQL schema",
    detail: "What the product reads for profiles, findings, and history",
  },
  // SYS-04 with WF-02: the lakehouse answers analytical reads on a cache miss.
  {
    label: "Databricks lakehouse",
    detail: "Analytical source, read on a cache miss",
  },
  // SYS-05: cache-first reads, with writes owned by the jobs.
  {
    label: "Redis cache",
    detail: "Optional, fronts the busiest reads",
  },
];

/** SYS-06 and SYS-07 for the chained hourly pipeline; SYS-05 for cache writes. */
const REFRESH_PATH: readonly MapNode[] = [
  {
    label: "Databricks lakehouse",
    detail: "Profiles, wallets, transactions, and hourly balances",
  },
  {
    label: "Scheduled sync and detection jobs",
    detail: "Sync, then detection scans, chained hourly",
    accent: "var(--color-accent-c)",
  },
  {
    label: "PostgreSQL and cache refresh",
    detail: "Jobs write; the interface only reads",
  },
];

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

const READ_PATH_LABEL_ID = "aegis-map-read-path";
const REFRESH_PATH_LABEL_ID = "aegis-map-refresh-path";

export function AegisSystemMap({ className }: { className?: string }) {
  return (
    <div
      className={["flex flex-col gap-12", className].filter(Boolean).join(" ")}
      data-aegis-system-map=""
    >
      <div className="flex flex-col gap-4">
        {/*
          Each group label names its own list, so the two paths are announced as
          named lists rather than as two unlabelled lists in a row. The ids are
          fixed because the map appears once on the route.
        */}
        <p id={READ_PATH_LABEL_ID} style={groupLabelStyle}>
          What a request touches
        </p>

        <ol aria-labelledby={READ_PATH_LABEL_ID} className={listStyle}>
          <li className="flex flex-col">
            <MapNodeBox node={INVESTIGATOR_UI} />
            <Connector className="h-6 w-px" />
          </li>

          <li className="flex flex-col">
            <MapNodeBox node={API_SERVICE} />
            <Connector className="h-6 w-px" />

            <ol className={cn(listStyle, "gap-4 md:flex-row md:items-stretch")}>
              {READ_SOURCES.map((node) => (
                <li key={node.label} className="flex flex-1">
                  <MapNodeBox node={node} />
                </li>
              ))}
            </ol>
          </li>
        </ol>
      </div>

      <div className="flex flex-col gap-4">
        <p id={REFRESH_PATH_LABEL_ID} style={groupLabelStyle}>
          What keeps that data current
        </p>

        <ol
          aria-labelledby={REFRESH_PATH_LABEL_ID}
          className={cn(listStyle, "md:flex-row md:items-stretch")}
        >
          {REFRESH_PATH.map((node, index) => (
            <li
              key={node.label}
              className="flex flex-1 flex-col md:flex-row md:items-stretch"
            >
              <MapNodeBox node={node} />
              {index < REFRESH_PATH.length - 1 ? (
                <Connector className="h-6 w-px md:h-px md:w-8" />
              ) : null}
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
