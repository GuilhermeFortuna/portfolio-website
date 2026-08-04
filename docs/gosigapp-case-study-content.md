# gosigapp — Case Study Content Contract

## Overview and Metadata

- **Route:** `/work/gosigapp`
- **Page Title:** `gosigapp — Reliable SIGAP Submission Pipeline`
- **Page Description:** `A Go backend pipeline for file validation, processing, retries, auditability, and submission to SIGAP.`
- **Public Name:** `gosigapp`
- **Category:** `Government Compliance / Backend Pipeline`
- **Role:** `Software Developer (Sole Author)`
- **Period:** `2025-12-24 – 2026-06-22`
- **State:** `Deployed to AWS ECS/Fargate`
- **Source Code:** `Private Repository`
- **Live Environment Control:** `Omitted (Backend / CLI Pipeline with no public UI)`

---

## 1. Hero Section

- **Section ID:** `hero`
- **Heading (`h1`):** `gosigapp`
- **Category Subtitle:** `Reliable SIGAP Submission Pipeline`
- **Hero Metadata Cards:**
  - **Role:** `Software Developer (Sole Author)`
  - **Period:** `2025-12-24 – 2026-06-22`
  - **State:** `Deployed to AWS ECS/Fargate`
  - **Source:** `Private Repository`
- **Hero Support Copy (27 words):**
  > A Go backend pipeline built to fetch, validate, digitally sign, package, and submit daily and monthly regulatory files to Brazil's SIGAP API for a licensed betting operator.
- **Hero Media Placement:** None (*DEC-02: Non-photographic backend project; hero visual is typographic/diagram-led in WO-032; live-environment control omitted*).
- **Claim ID Citations:** `GIT-01`, `GIT-02`, `GIT-03`, `OPS-04`, `DEC-01`, `DEC-02`

---

## 2. Regulatory Compliance Stakes (Context)

- **Section ID:** `context`
- **Section Title (`h2`):** `Regulatory Compliance Stakes`
- **Visible Copy:**
  > In Brazil's regulated iGaming market, operators face a mandatory legal obligation to submit daily operational logs and monthly summary files directly to the Ministry of Finance's regulatory system (SIGAP). Reporting errors, malformed data structures, or missed submission windows carry strict regulatory penalties and potential license suspension. gosigapp was engineered to convert raw betting engine data into verifiable, audit-backed regulatory filings—transforming compliance from a manual operational risk into an automated, deterministic pipeline.
- **Media Placement:** None.
- **Claim ID Citations:** `GIT-03`, `CONF-01`

---

## 3. The Regulatory Integration Challenge (Problem)

- **Section ID:** `problem`
- **Section Title (`h2`):** `The Regulatory Integration Challenge`
- **Visible Copy:**
  > Submitting data to SIGAP requires far more than posting JSON payloads. Raw operator data across six distinct dataset categories must be fetched from S3 storage, extracted from ZIP archives, and validated against rigid government XML schemas (XSD). Every submission requires PKCS#12 PFX digital signatures using RSA-SHA256, gzip compression, base64 encoding, and mutual TLS (mTLS) transport with automated OAuth2 authentication. Doing this reliably across high daily event volumes—without manual intervention or failed transmissions—demanded a resilient processing architecture.
- **Media Placement:** None.
- **Claim ID Citations:** `SYS-01`, `SYS-02`, `SEC-01`, `SEC-02`

---

## 4. Pipeline Architecture & End-to-End Processing (System Overview)

- **Section ID:** `system-overview`
- **Section Title (`h2`):** `Pipeline Architecture & End-to-End Processing`
- **Visible Copy:**
  > The gosigapp system operates as an end-to-end Go processing pipeline, orchestrating data extraction, validation, cryptographic signing, packaging, and mTLS transmission. Built with a dual-entry structure (`cmd/pipeline` CLI for batch runs and `cmd/server` HTTP service for real-time orchestration), the system integrates automated pre-submission compliance matrix audits, self-exclusion API lookups, and durable log storage backed by AWS DynamoDB.
- **Media Placement:** `public/work/gosigapp/system-map.svg`
- **Alt Text:** `Vector architecture diagram showing the gosigapp end-to-end regulatory pipeline from S3 data fetch through XSD validation, PFX signing, mTLS transport, and DynamoDB log store.`
- **Caption:** `End-to-end architecture diagram detailing the gosigapp pipeline, security boundary, auditability layer, and AWS ECS deployment.`
- **Claim ID Citations:** `SYS-01`, `SYS-03`, `SEC-01`, `SEC-02`, `OPS-01`, `OPS-04`, `MEDIA-01`

---

## 5. Decision 1: Regulator-Imposed Cryptographic Security & Transport

- **Section ID:** `decision-1`
- **Section Title (`h2`):** `Regulator-Imposed Cryptographic Security & Transport`
- **Visible Copy (86 words):**
  > Rather than treating security as optional hardening, regulatory compliance required strict cryptographic standards at the application layer. gosigapp integrates PKCS#12 PFX certificate parsing directly into the pipeline (`internal/auth`), executing RSA-SHA256 XML digital signatures (`ds:Signature`) over aggregated dataset payloads before compression. For transport, the sender module establishes mutual TLS (mTLS) connections with automated OAuth2 token lifecycle management and memory caching. Cryptographic keys and PFX secrets are injected securely via environment variables, ensuring zero credential exposure while maintaining strict regulator compliance.
- **Media Placement:** None.
- **Claim ID Citations:** `SEC-01`, `SEC-02`, `CONF-04`

---

## 6. Decision 2: Pre-Submission Compliance Matrix & Self-Exclusion Verification

- **Section ID:** `decision-2`
- **Section Title (`h2`):** `Pre-Submission Compliance Matrix & Self-Exclusion Verification`
- **Visible Copy (86 words):**
  > To guarantee zero rejected transmissions, gosigapp implements a comprehensive pre-submission compliance audit matrix prior to payload packaging (`cmd/compliance-check`). The engine validates raw records against all six mandatory SIGAP dataset schemas—Bettors (`apostadores`), Wallets (`carteiras`), Sports Betting (`esportivas`), Online Games (`jogos`), Daily Aggregates (`diarios`), and Monthly Aggregates (`mensais`). Additionally, the `internal/impedidos` module queries the official SIGAP API Impedidos v2 endpoint (`GET /impedimento/v2/condicao/{cpf}`) to verify bettor self-exclusion status and legal restrictions (SPA/MF-SIGAP-001/2026) before file generation.
- **Media Placement:** `public/work/gosigapp/compliance-check-output.webp`
- **Alt Text:** `Terminal output showing the gosigapp compliance-check audit matrix passing XSD schema validation, PFX signature integrity, SIGAP Impedidos v2 checks, and multi-brand header checks.`
- **Caption:** `Pre-submission compliance matrix output verifying XSD schema conformance, PFX cryptographic integrity, and SIGAP Impedidos v2 self-exclusion checks against fixture configuration.`
- **Claim ID Citations:** `SYS-02`, `SYS-04`, `SYS-05`, `SEC-01`

---

## 7. Decision 3: Durable Auditability & Asynchronous Execution Lifecycle

- **Section ID:** `decision-3`
- **Section Title (`h2`):** `Durable Auditability & Asynchronous Execution Lifecycle`
- **Visible Copy (88 words):**
  > Regulatory reporting demands complete historical proof for every attempted submission. gosigapp combines an asynchronous job runner (`internal/job`) with AWS DynamoDB log storage (`internal/logstore`) to track full job lifecycles (`queued`, `running`, `completed`, `failed`, `cancelled`). Scheduled via an automated internal cron system (`internal/scheduler`), each pipeline run records step-by-stage timestamps, XSD validation results, cryptographic checksums, and HTTP receipt IDs. If a network interruption occurs, specialized CLI tools (`cmd/backfill`, `cmd/date-detail`) enable state inspection and deterministic re-runs without data duplication.
- **Media Placement:** `public/work/gosigapp/cli-pipeline-run.webp`
- **Alt Text:** `Terminal log capture demonstrating stage-by-stage gosigapp pipeline execution from S3 download through XSD validation, PFX signing, mTLS transmission, and DynamoDB audit recording.`
- **Caption:** `Terminal execution output of the gosigapp CLI pipeline, showing stage-by-stage validation, PFX signing, mTLS submission, receipt capture, and DynamoDB log recording.`
- **Claim ID Citations:** `SYS-01`, `SYS-03`, `SYS-04`, `OPS-01`, `OPS-02`, `OPS-03`

---

## 8. Contribution & Engineering Ownership

- **Section ID:** `contribution`
- **Section Title (`h2`):** `Engineering Ownership & AI-Assisted Execution`
- **Visible Copy:**
  > Guilherme designed, implemented, and delivered the entire gosigapp codebase as sole author across 100 commits (December 2025 – June 2026). Using AI-assisted software development, every layer—from Go pipeline internals and XML/XSD parsing to DynamoDB integration, CLI utility suites, and containerized deployment infrastructure—was architected and written independently to satisfy regulatory mandates.
- **Media Placement:** None.
- **Claim ID Citations:** `GIT-01`, `GIT-02`

---

## 9. Evidence & Honest Limits

- **Section ID:** `evidence-limits`
- **Section Title (`h2`):** `Implementation Verification & Operational Scope`
- **Visible Copy:**
  > The gosigapp codebase is verified through end-to-end source code inspection and containerized cloud configuration files (`Dockerfile`, GitHub Actions CI/CD workflows, AWS ECS/Fargate task definitions). As a specialized backend CLI and service pipeline, gosigapp has no graphic user interface. In accordance with portfolio disclosure standards, the source code repository is private, employer details and brand identifiers remain confidential, and no unverified live transaction metrics or uptime percentages are claimed.
- **Media Placement:** None.
- **Claim ID Citations:** `OPS-04`, `CONF-01`, `CONF-02`, `CONF-06`, `DEC-02`, `UNSUP-01`–`07`

---

## 10. Technology Stack

- **Section ID:** `tech-stack`
- **Section Title (`h2`):** `Technology Stack`
- **Visible Copy:**
  > - **Language & Runtime:** Go 1.22+ (`cmd/pipeline`, `cmd/server`, utility CLI suite)
  > - **Cloud & Infrastructure:** AWS ECS/Fargate, AWS DynamoDB, AWS S3, Docker, GitHub Actions CI/CD
  > - **Security & Cryptography:** PKCS#12 PFX (RSA-SHA256), mTLS transport, OAuth2 token management
  > - **Data Formats & Standards:** XML, XSD schemas, ZIP, gzip, base64, SIGAP REST API
- **Media Placement:** None.
- **Claim ID Citations:** `SYS-01`–`04`, `SEC-01`–`02`, `OPS-01`, `OPS-04`

---

## 11. Disclosure Note & Closing Actions

- **Section ID:** `disclosure-actions`
- **Section Title (`h2`):** `Disclosure & Navigation`
- **Visible Copy:**
  > gosigapp was built for an unnamed licensed betting operator in Brazil to meet SIGAP regulatory compliance requirements. Employer identity, brand codes, AWS resource IDs, and PFX secrets are withheld. All CLI outputs and diagrams display fixture configuration only.
- **Actions:**
  - **Primary Action (`a`):** `Return to selected work` → `/#work`
  - **Secondary Action (`a`):** `Get in touch` → `/#contact`
- **Claim ID Citations:** `CONF-01`–`06`, `MEDIA-01`

---

## Media Placement Inventory

| Section | Asset Filename | Status | Purpose |
| --- | --- | --- | --- |
| 4. System Overview | `system-map.svg` | **PLACED** | Primary architecture diagram |
| 6. Decision 2 | `compliance-check-output.webp` | **PLACED** | Pre-submission compliance audit matrix terminal output |
| 7. Decision 3 | `cli-pipeline-run.webp` | **PLACED** | Terminal execution log capture for pipeline run |

---

## Reserved Media Manifest

No media produced in WO-030 remains unplaced. All 3 delivered assets are actively placed within the narrative.
