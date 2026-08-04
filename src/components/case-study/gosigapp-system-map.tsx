import type { CSSProperties } from "react";

import { cn } from "@/lib/cn";
import { eyebrowStyle } from "./case-study-shell";

/**
 * The system map for section 4 of the gosigapp case study.
 *
 * Ordinary semantic HTML styled with existing tokens — nested lists, no canvas or
 * JS animation — so the map is its own accessible text equivalent. Every node
 * label is a claim accepted in `docs/gosigapp-case-study-evidence.md` (WO-029),
 * worded to match the approved section 4 copy. No internal host, S3 bucket name,
 * brand code, or invented throughput figure appears here.
 */

type MapNode = {
  /** Accepted public component name. */
  label: string;
  /** One short qualifier, traceable to the claim ID cited beside it. */
  detail: string;
  accent?: string;
};

/** SYS-01: Amazon S3 storage holding raw betting operator archives. */
const S3_SOURCE: MapNode = {
  label: "Amazon S3 storage",
  detail: "Raw operator data archives (ZIP files & datasets)",
  accent: "var(--color-accent-a)",
};

/** SYS-01, SYS-02, SYS-03: Go pipeline extraction and XSD schema validation. */
const PIPELINE_CORE: MapNode = {
  label: "Pipeline Core (Go)",
  detail: "CLI (cmd/pipeline) & HTTP service (cmd/server) for XSD validation across 6 datasets",
  accent: "var(--color-accent-a)",
};

/** SEC-01: PKCS#12 PFX RSA-SHA256 digital signature and compression. */
const CRYPTO_PACKAGING: MapNode = {
  label: "PFX Signing & Packaging",
  detail: "PKCS#12 RSA-SHA256 XML digital signatures (ds:Signature), gzip compression, base64 encoding",
  accent: "var(--color-accent-b)",
};

/** SEC-02: mTLS transport and OAuth2 token management. */
const MTLS_TRANSPORT: MapNode = {
  label: "mTLS Transport & OAuth2",
  detail: "Mutual TLS client auth & automated SIGAP OAuth2 token lifecycle caching",
  accent: "var(--color-accent-b)",
};

/** SYS-05: SIGAP API Impedidos v2 bettor self-exclusion verification. */
const IMPEDIDOS_QUERY: MapNode = {
  label: "SIGAP Impedidos v2 Service",
  detail: "internal/impedidos self-exclusion query (GET /impedimento/v2/condicao/{cpf})",
  accent: "var(--color-accent-c)",
};

/** OPS-01, OPS-02, OPS-03: AWS DynamoDB log store & async job runner. */
const LOGSTORE_JOBS: MapNode = {
  label: "DynamoDB Audit & Job Runner",
  detail: "Durable log storage, async job lifecycle, and automated cron scheduler",
};

/** OPS-04: AWS ECS / Fargate containerized cloud deployment. */
const ECS_DEPLOYMENT: MapNode = {
  label: "AWS ECS / Fargate",
  detail: "Containerized deployment via Docker & GitHub Actions CI/CD workflows",
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

const PIPELINE_FLOW_LABEL_ID = "gosigapp-map-pipeline-flow";
const INFRA_LABEL_ID = "gosigapp-map-infra-deps";

export function GosigappSystemMap() {
  return (
    <div className="flex flex-col gap-4">
      {/*
        One named outer list is the accessible equivalent of the processing flow.
        The id is fixed because the map appears once on the route.
      */}
      <p id={PIPELINE_FLOW_LABEL_ID} style={groupLabelStyle}>
        Pipeline Data & Submission Flow
      </p>

      <ol aria-labelledby={PIPELINE_FLOW_LABEL_ID} className={listStyle}>
        <li className="flex flex-col">
          <MapNodeBox node={S3_SOURCE} />
          <Connector className="h-6 w-px" />
        </li>

        <li className="flex flex-col">
          <MapNodeBox node={PIPELINE_CORE} />
          <Connector className="h-6 w-px" />
        </li>

        <li className="flex flex-col">
          <MapNodeBox node={CRYPTO_PACKAGING} />
          <Connector className="h-6 w-px" />
        </li>

        <li className="flex flex-col">
          <MapNodeBox node={MTLS_TRANSPORT} />
          <Connector className="h-6 w-px" />

          <p id={INFRA_LABEL_ID} style={groupLabelStyle} className="mb-4 mt-2">
            Compliance, Auditability & Cloud Infrastructure
          </p>

          <ol
            aria-labelledby={INFRA_LABEL_ID}
            className={cn(listStyle, "gap-4")}
          >
            <li className="flex flex-1">
              <MapNodeBox node={IMPEDIDOS_QUERY} />
            </li>

            <li className="flex flex-1">
              <MapNodeBox node={LOGSTORE_JOBS} />
            </li>

            <li className="flex flex-1">
              <MapNodeBox node={ECS_DEPLOYMENT} />
            </li>
          </ol>
        </li>
      </ol>
    </div>
  );
}
