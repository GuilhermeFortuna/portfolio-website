# gosigapp — Evidence Register and Publication Contract

## Purpose

This document is the authoritative claim-level evidence register and public disclosure boundary for the **gosigapp** case study (`/work/gosigapp`). Every technical assertion, factual claim, historical detail, or architectural description proposed for public copy in `docs/content.md`, `docs/gosigapp-case-study-content.md`, or the `/work/gosigapp` route MUST trace to a classified row in this register.

---

## Public Disclosure Boundary and Confidentiality Rules

The following items are strictly **CONFIDENTIAL** and MUST NEVER appear in public copy, section headings, metadata, diagrams, sanitized CLI captures, log excerpts, or production asset bundles:

1. **Employer Identity**: The name, corporate identity, or specific domain of the betting/gaming operator for whom gosigapp was created.
2. **Brand Codes**: Specific brand identifiers such as `BRX`, `RICO`, or any other brand string configured in `ACTIVE_BRANDS`. Multi-brand support MUST be described generically.
3. **AWS & Infrastructure Identifiers**: AWS Account IDs, IAM Role ARNs, policy names, S3 bucket names, ECS cluster names, or VPC subnet/security group IDs. Infrastructure is stated generically as containerized AWS ECS/Fargate architecture.
4. **Secrets & Credentials**: PFX certificate file paths/passwords, RSA private keys, OAuth2 client secrets, API tokens, JWT signing secrets, or `.env` configuration values.
5. **Real Payload Content & Bettor PII**: Real bettor CPFs, names, wallet balances, transaction amounts, IP addresses, or actual XML submission payload content.
6. **Private Source Code Link**: Repository links to private source code remain private and will not be published.
7. **Cloud Console Screenshots**: No AWS Console, GitHub Actions UI, or cloud dashboard screenshots are permitted. Evidence is limited to an architecture system-map diagram and sanitized CLI/log text captures against fixture data.

---

## Claim Classifications

Allowed classifications are exactly:
- `FACT — OWNER`: Direct statement of fact provided by the owner.
- `FACT — SOURCE`: Technical fact verified directly in the `gosigapp` source code repository (`/home/gui/projects/gosigapp`).
- `DECISION`: Architectural, editorial, or presentation decision governing the portfolio.
- `CONFIDENTIAL`: Non-public item that must be withheld or generalized.
- `INFERENCE — REVIEW REQUIRED`: Safe logical inference requiring reviewer validation before publication.
- `UNSUPPORTED — DO NOT PUBLISH`: Unsubstantiated claim prohibited from public copy.

---

## Evidence Register

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| **CONF-01** | `CONFIDENTIAL` | Employer identity withheld; described as "a Brazilian betting and gaming operator". | Locked owner fact (2026-08-03); `BATCH-05-README.md` | Do not name or hint at the employer identity. |
| **CONF-02** | `CONFIDENTIAL` | Brand codes (`BRX`, `RICO`) withheld; described generically as "multi-brand configuration". | `README.md`, `internal/config/config.go` | Brand codes must never appear in copy, diagrams, or log captures. |
| **CONF-03** | `CONFIDENTIAL` | AWS Account IDs, ARNs, S3 bucket names, and IAM policy specifics withheld. | `gosigapp-task-definition.json`, `iam-policies/`, `Dockerfile` | Stated as containerized ECS/Fargate deployment without internal IDs. |
| **CONF-04** | `CONFIDENTIAL` | PFX certificate paths, passwords, private keys, and API tokens withheld. | `internal/auth/auth.go`, `internal/processor/processor.go` | Cryptographic mechanisms described; raw credentials never disclosed. |
| **CONF-05** | `CONFIDENTIAL` | Bettor PII, CPFs, wallet balances, and real submission payloads withheld. | `schemas/*.xsd`, `internal/processor/processor.go` | Schema structures described; real operational data strictly omitted. |
| **CONF-06** | `CONFIDENTIAL` | Private source code repository link withheld. | Owner decision (2026-07-28, 2026-08-03) | Repository remains private; no source code links published. |
| **GIT-01** | `FACT — OWNER` | Repository history spans 2025-12-24 to 2026-06-22 across 100 commits. | `git log --oneline` on `gosigapp` (commits `5c53fc4` to `7e9d25e`) | Timeline bounds exact repository commit history. |
| **GIT-02** | `FACT — OWNER` | Role: Software Developer; sole author of the codebase, designed and built with AI assistance. | `git log` author `Guilherme Fortuna dos Santos` / `guilherme` (100/100 commits), locked owner fact | Single-author repository history; AI assistance used for execution. |
| **GIT-03** | `FACT — OWNER` | Built for a Brazilian iGaming operator to satisfy legal reporting obligations to SIGAP. | Locked owner fact (2026-08-03), `README.md` | Operator identity remains confidential per CONF-01. |
| **SYS-01** | `FACT — SOURCE` | Multi-stage pipeline: S3 fetch → ZIP extraction → XML validation/aggregation → PFX RSA-SHA256 signing → gzip compression → base64 encoding → mTLS SIGAP submission. | `internal/pipeline/pipeline.go`, `internal/processor/processor.go`, `internal/sender/sender.go`, `internal/auth/auth.go` | Verified end-to-end processing pipeline flow. |
| **SYS-02** | `FACT — SOURCE` | Supports the six mandatory SIGAP dataset types: Bettors (`apostadores`), Wallets (`carteiras`), Sports Betting (`esportivas`), Online Games (`jogos`), Daily Operator Aggregate (`diarios`), and Monthly Operator Aggregate (`mensais`). | `schemas/Apostadores_v1.00.xsd`, `schemas/Carteiras_v1.00.xsd`, `schemas/ApostasEsportivas_v1.00.xsd`, `schemas/JogosOnline_v1.00.xsd`, `schemas/OperadorDiario_v1.00.xsd`, `schemas/OperadorMensal_v1.00.xsd` | Exact dataset categories mandated by Brazilian SIGAP regulations (MF/SPA). |
| **SYS-03** | `FACT — SOURCE` | Primary execution entry points: `cmd/pipeline` CLI for batch runs and `cmd/server` HTTP API for service integration and real-time status. | `cmd/pipeline/main.go`, `cmd/server/main.go`, `internal/api/` | Serves both CLI batch execution and persistent HTTP service workflows. |
| **SYS-04** | `FACT — SOURCE` | Seven specialized utility commands: `backfill`, `compliance-check`, `date-detail`, `downloader-batch`, `downloader-monthly`, `migrate-logs`, and `refresh-token`. | `cmd/backfill/main.go`, `cmd/compliance-check/main.go`, `cmd/date-detail/main.go`, `cmd/downloader-batch/main.go`, `cmd/downloader-monthly/main.go`, `cmd/migrate-logs/main.go`, `cmd/refresh-token/main.go` | Operational commands supporting backfills, pre-submission checks, state inspection, and token lifecycle. |
| **SYS-05** | `FACT — SOURCE` | `internal/impedidos`: SIGAP API Impedidos v2 query service (`GET /impedimento/v2/condicao/{cpf}`) for validating bettor self-exclusion and legal restrictions. | `internal/impedidos/service.go`, `internal/impedidos/types.go` | Validates bettor CPFs against official SIGAP self-exclusion registry (SPA/MF-SIGAP-001/2026). |
| **SYS-06** | `FACT — SOURCE` | Concurrent multi-brand execution with brand-isolated environment configuration overrides. | `internal/config/config.go`, `internal/pipeline/pipeline.go` | Multi-brand execution maintains strict isolation between brand contexts. |
| **SEC-01** | `FACT — SOURCE` | PKCS#12 PFX certificate digital signing applying RSA-SHA256 XML signatures (`ds:Signature`) to aggregated dataset XMLs. | `internal/processor/processor.go`, `internal/auth/auth.go` | Satisfies regulator digital signature requirements. |
| **SEC-02** | `FACT — SOURCE` | Mutual TLS (mTLS) transport security combined with automated SIGAP OAuth2 token management and caching. | `internal/auth/auth.go`, `internal/sender/sender.go` | Handles client certificate authentication and OAuth2 token refresh cycles. |
| **OPS-01** | `FACT — SOURCE` | Durable log storage and execution auditability backed by AWS DynamoDB (`internal/logstore/dynamodb.go`). | `internal/logstore/dynamodb.go` | Stores execution state, step results, and audit history in DynamoDB. |
| **OPS-02** | `FACT — SOURCE` | Asynchronous job runner with explicit state lifecycle (`queued`, `running`, `completed`, `failed`, `cancelled`) and WebSocket progress hub. | `internal/job/runner.go`, `internal/job/hub.go`, `internal/job/types.go` | Manages job execution lifecycle with real-time WebSocket progress updates. |
| **OPS-03** | `FACT — SOURCE` | Automated cron scheduler (`internal/scheduler`) for scheduled daily and monthly regulatory submissions. | `internal/scheduler/scheduler.go` | Periodically triggers pipeline jobs based on configured cron expressions. |
| **OPS-04** | `FACT — SOURCE` | Containerized deployment via Docker, GitHub Actions CI/CD workflows, and AWS ECS/Fargate task definitions. | `Dockerfile`, `.github/workflows/deploy.yml`, `gosigapp-task-definition.json` | Structural proof of cloud deployment; does not claim live operational status beyond owner knowledge. |
| **MEDIA-01** | `DECISION` | Media evidence limited to an architecture system-map diagram and sanitized CLI/log text captures against fixture data. | Locked owner fact (2026-08-03), `BATCH-05-README.md` | Cloud console screenshots strictly prohibited. |
| **DEC-01** | `DECISION` | Public project name is `gosigapp`; route slug is `gosigapp` (`/work/gosigapp`). | Locked owner fact (2026-08-03), `docs/content.md` | Route slug `/work/gosigapp`. |
| **DEC-02** | `DECISION` | Hero section omits the live-environment action entirely (no live UI, CLI/backend service). | Locked owner fact (2026-08-03), `docs/content.md` | Matches Quant hero decision model for non-web-app projects. |
| **UNSUP-01** | `UNSUPPORTED — DO NOT PUBLISH` | Stated file, record, or transaction processing volume per day or month. | None in source repository | Do not claim or estimate operational data volume. |
| **UNSUP-02** | `UNSUPPORTED — DO NOT PUBLISH` | Stated submission success rate or percentage. | None in source repository | Do not claim submission success percentages. |
| **UNSUP-03** | `UNSUPPORTED — DO NOT PUBLISH` | Stated system uptime, SLA adherence, or availability metrics. | None in source repository | Do not claim availability or SLA percentages. |
| **UNSUP-04** | `UNSUPPORTED — DO NOT PUBLISH` | Stated incident counts or error rate reductions. | None in source repository | Do not claim incident reduction metrics. |
| **UNSUP-05** | `UNSUPPORTED — DO NOT PUBLISH` | Regulator approval, endorsement, or formal certification. | None in source repository | Do not claim regulator certification or endorsement. |
| **UNSUP-06** | `UNSUPPORTED — DO NOT PUBLISH` | Financial penalty or fine avoidance claims. | None in source repository | Do not claim financial penalty avoidance figures. |
| **UNSUP-07** | `UNSUPPORTED — DO NOT PUBLISH` | Promotional README adjectives ("enterprise-grade", "production-ready", "state-of-the-art"). | `README.md` promotional copy | Promotional language prohibited unless grounded in specific source facts. |

---

## Source Verification Checklist

- [x] Repository commit range verified via `git log`: `5c53fc4` (2025-12-24) → `7e9d25e` (2026-06-22) (100 commits).
- [x] Single author identity confirmed (`Guilherme Fortuna dos Santos` / `guilherme`).
- [x] End-to-end pipeline mapped: S3 → ZIP → XML/XSD → PFX RSA-SHA256 → gzip → base64 → mTLS SIGAP.
- [x] All 6 SIGAP dataset types verified against `schemas/*.xsd`.
- [x] CLI (`cmd/pipeline`), API server (`cmd/server`), and 7 utility commands verified in `cmd/`.
- [x] `internal/impedidos` SIGAP API Impedidos v2 query (`GET /impedimento/v2/condicao/{cpf}`) verified.
- [x] Retry and log storage mechanisms verified in `internal/logstore/dynamodb.go` and `internal/job`.
- [x] Digital signing and mTLS security verified in `internal/processor` and `internal/auth`.
- [x] Multi-brand architecture verified in `internal/config` and `internal/pipeline`.
- [x] Docker, GitHub Actions, and AWS ECS/Fargate deployment files verified.
- [x] Zero confidential brand codes (`BRX`, `RICO`), employer details, or credentials exposed.
