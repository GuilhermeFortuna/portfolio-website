# Aegis — Case-Study Evidence and Publication Contract

**Work Order:** WO-018. **State on handoff:** `REVIEW`.
**Sources inspected (read-only):** `/home/gui/projects/aegis-project/aegis`
(backend) and `/home/gui/projects/aegis-project/aegis-front` (frontend). No file
in either source repository was modified. Evidence paths below are relative to
the source repository named in the row (`aegis/…` or `aegis-front/…`).

## Public disclosure boundary (read first)

This register governs what may become public Aegis wording. Nothing here is
published automatically; it is the reviewed input for WO-019 and WO-020.

- **Confidential and omitted from all public output:** the former employer /
  operator identity, any former internal portal or system name that appears in
  source history, real players/bettors, CPFs or other personal identifiers,
  real transactions, credentials and `.env` values, internal hostnames, cloud
  account identifiers, deployment/project identifiers, staging URLs, and
  proprietary implementation details. This document deliberately does **not**
  reproduce those values; it cites the file where they live so a reviewer can
  confirm them at the source.
- **Synthetic data only in media:** any portfolio screenshot, video, or figure
  must be produced from the repository's synthetic demonstration data path, not
  from production or real analytical sources.
- **No invented impact:** no fraud-reduction, revenue, savings, speed,
  adoption, accuracy, data-volume, uptime, team-size, or client-satisfaction
  claim may be published. Those rows are listed explicitly as
  `UNSUPPORTED — DO NOT PUBLISH` below.
- **Sanitized evolution, not a production copy:** the public repository version
  is described as a sanitized, independently maintained evolution of the
  company implementation. It is not asserted to be byte-identical to what runs
  (or ran) in production.

## Classifications

Exactly these values appear in the `Classification` column:

- `FACT — OWNER` — stated by the owner and recorded in `BATCH-03-README.md`.
- `FACT — SOURCE` — verifiable in a named source-repository file.
- `DECISION` — an owner or editorial decision about what to publish.
- `CONFIDENTIAL` — real but must not be published; value omitted here.
- `INFERENCE — REVIEW REQUIRED` — reasonable reading of the source that a
  reviewer must confirm before it is published as fact.
- `UNSUPPORTED — DO NOT PUBLISH` — no accepted evidence exists; prohibited.

Git history is evidence for dates and authorship only. It is **not** evidence
of business impact, production usage, or outcomes.

## Owner facts

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| OWN-01 | `FACT — OWNER` | Aegis is a fraud-intelligence product. | `BATCH-03-README.md` "Locked Owner Facts"; public name `Aegis`, category `Fraud intelligence`. | Name/category are the approved public labels; the operator stays unnamed. |
| OWN-02 | `FACT — OWNER` | Built for a betting company in the Brazilian iGaming sector. | `BATCH-03-README.md` "Context". | The company is never named or hinted at. |
| OWN-03 | `FACT — OWNER` | Role: Software Developer. | `BATCH-03-README.md` "Role". | Use this exact title; do not inflate to a seniority or lead title. |
| OWN-04 | `FACT — OWNER` | Period: April 2026–present. | `BATCH-03-README.md` "Period"; corroborated by first-commit dates (GIT-01). | "Present" reflects owner statement at handoff; revisit if stale. |
| OWN-05 | `FACT — OWNER` | Guilherme designed and built every product and engineering layer, with AI assistance. | `BATCH-03-README.md` "Ownership". | State "with AI assistance" honestly; do not imply a team (see UNSUP-08). |
| OWN-06 | `FACT — OWNER` | Deployed to production and, as far as the owner knows, still active. | `BATCH-03-README.md` "Status". | Owner knowledge, not a monitored uptime claim (see UNSUP-06). |
| OWN-07 | `FACT — OWNER` | The public repository is a sanitized, independently maintained evolution of the company implementation. | `BATCH-03-README.md` "Public version". | Not byte-identical to production; do not claim otherwise. |
| OWN-08 | `FACT — OWNER` | Cinematic intro pipeline: Blender model/animation → FBX → Unreal Engine 5 lighting, aurora, dust, scene, render → 4K image sequence → DaVinci Resolve final video. | `BATCH-03-README.md` "Entry intro pipeline"; asset `aegis-front/public/aegis/entry-intro/LS_Aegis_EntryIntro.mp4`. | The 17 MB 4K master is not shipped as-is (see DEC-04). |

## Git-derived facts (dates and authorship only)

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| GIT-01 | `FACT — SOURCE` | Backend history begins 2026-04-06; frontend history begins 2026-04-12; both have commits through 2026-07-28. | `git log` in `aegis` (earliest 2026-04-06) and `aegis-front` (earliest 2026-04-12); latest commit 2026-07-28 in both. | Dates show activity window, not effort or impact. |
| GIT-02 | `FACT — SOURCE` | Sustained, active development (backend 195 commits; frontend 165 commits). | `git rev-list --count HEAD` = 195 (backend), 165 (frontend). | Commit counts are not a productivity or quality metric. |
| GIT-03 | `INFERENCE — REVIEW REQUIRED` | Development is single-owner with AI-assisted tooling. | Distinct author names: backend 2 (both "Guilherme Fortuna" variants); frontend 4 (two Guilherme variants plus automation identities "WO5 Bootstrap" and "WO5 Extract"). | Consistent with OWN-05, but confirm the two extra frontend names are tooling/automation, not additional people, before publishing "solo". Author emails were not extracted or published. |

## Verified system boundaries

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| SYS-01 | `FACT — SOURCE` | Standalone React single-page app (Vite + React Router v7 framework mode, `ssr: false`) served as a static bundle by nginx; the browser calls the API directly. | `aegis-front/README.md` (intro, Container); `aegis-front/package.json` (`react-router`, `vite`). | No Node server/BFF at runtime; describe accordingly. |
| SYS-02 | `FACT — SOURCE` | Read-focused FastAPI service exposes JSON endpoints for dashboards and player drill-downs. | `aegis/api/main.py`; `aegis/README.md` "What this repository does". | Some write/PATCH endpoints exist for finding status and rule config (see WF rows). |
| SYS-03 | `FACT — SOURCE` | PostgreSQL holds the curated Aegis schema; tables are provisioned by DDL jobs. | `aegis/jobs/create_tables/create_all.py` and siblings; `aegis/README.md` "Repository layout". | Schema name configurable (default `aegis`). |
| SYS-04 | `FACT — SOURCE` | Databricks (lakehouse SQL warehouse) is queried for high-volume event data. | `aegis/src/aegis/infra/databricks.py`; `aegis/README.md` "Architecture". | Requires workspace/token config; not exercised in the synthetic path. |
| SYS-05 | `FACT — SOURCE` | Optional Redis cache; UI reads are cache-first, jobs own cache writes, job-managed keys carry no TTL. | `aegis/docs/aegis-cache-and-job-pipeline.md`; `aegis/src/aegis/infra/redis_cache.py`. | Redis is optional and disabled under pytest. |
| SYS-06 | `FACT — SOURCE` | Batch synchronization jobs pull from Databricks into Postgres (profiles, wallets, deposits, withdrawals, hourly balance/GGR, risk-constellation view). | `aegis/jobs/sync/sync_all.py`; `aegis/README.md` "Data jobs". | Offline path; runs on schedule or manually. |
| SYS-07 | `FACT — SOURCE` | An hourly pipeline chains sync then detection scans. | `aegis/jobs/pipeline/run_hourly_pipeline.py`; `aegis/docs/aegis-cache-and-job-pipeline.md`. | "Production schedule" in the doc is design/config, not a monitored SLA. |
| SYS-08 | `FACT — SOURCE` | Rule-based detection engine with 8 MVP rules across payment, gameplay, identity, and impact categories, configurable thresholds, confidence levels, and a rule registry. | `aegis/src/aegis/detection/rules/mvp.py` (`build_mvp_rule_registry` registers PAY-001, PAY-003, GAME-002, GAME-006, ACC-005, ACC-008, IMPACT-001, IMPACT-002); `aegis/src/aegis/detection/registry.py`. | Describe as a rule engine, not machine-learning classification. |
| SYS-09 | `FACT — SOURCE` | Rules support shadow and live execution modes and a rule-promotion workflow. | `aegis/src/aegis/detection/models.py` (`ExecutionMode.SHADOW`/`LIVE`); `aegis/src/aegis/detection/orchestration.py`; `aegis/api/routers/aegis_v2.py` (`/rules/{rule_id}/promotion`). | Default mode is shadow (would-have-fired) unless promoted. |
| SYS-10 | `FACT — SOURCE` | Findings drive a scored player risk model (fraud-risk and operational-risk contributions) and generated finding reports (HTML/Markdown/PDF). | `aegis/src/aegis/detection/rules/mvp.py` (risk-contribution params); `aegis/src/aegis/detection/scoring.py`; `aegis/src/aegis/detection/reporting.py` (`render_finding_report_pdf` via WeasyPrint). | Scoring weights are configurable defaults, not validated accuracy. |
| SYS-11 | `INFERENCE — REVIEW REQUIRED` | Detection rules are aligned to Brazilian anti-money-laundering regulation (SPA/MF Portaria 1.143/2024; SISCOAF reporting candidates). | `aegis/src/aegis/detection/rules/mvp.py` (`RegulatoryBasis` on PAY-001, PAY-003, ACC-005, ACC-008). | "Aligned to"/"references" only — do not claim regulator certification or approval. |
| SYS-12 | `FACT — SOURCE` | Authentication and authorization are enforced by the API: opaque sessions, CSRF, MFA (TOTP), Argon2 password hashing, a permission model, scoped machine credentials, admin user management, and a security-audit log. | `aegis/src/aegis/auth/` (`sessions.py`, `passwords.py`, `tokens.py`, `permissions.py`, `machine_credentials.py`); `aegis/api/routers/auth.py`, `admin_users.py`; `aegis/api/route_permissions.py`; `aegis/pyproject.toml` (`argon2-cffi`, `pyotp`). | Frontend access gate is a known gap (see GAP-01). |
| SYS-13 | `FACT — SOURCE` | A repository-owned synthetic demonstration data path can populate a local database with no Databricks or external-cloud connection. | `aegis/src/aegis/demo/` (`generator.py`, `quality.py`); `aegis/jobs/demo/seed_demo_data.py`; `aegis/README.md` "Synthetic demonstration data". | This is the only approved source for portfolio media (DEC-03). |
| SYS-14 | `FACT — SOURCE` | Target deployment is Google Cloud (Artifact Registry, Cloud Run, Cloud SQL, Secret Manager, optional Memorystore, Cloud Scheduler, logging/monitoring) via Workload Identity Federation. | `aegis/README.md` "Deployment"; `aegis-front/README.md` "Staging (Google Cloud)". | Concrete project/host/region identifiers are confidential (CONF-02). |
| SYS-15 | `FACT — SOURCE` | Backend test suite: 67 pytest files spanning API, services, domain, detection, jobs, auth, infra, and packaging. | `aegis/tests/` (67 `test_*.py` files). | Coverage of code paths, not proof of production correctness. |
| SYS-16 | `FACT — SOURCE` | Frontend test tooling: Jest unit suite plus a Playwright end-to-end suite, and a build-time dependency "boundary" check. | `aegis-front/package.json` scripts (`test`, `test:e2e`, `check:boundary`); `aegis-front/scripts/check-frontend-boundary.mjs`. | The Playwright smoke suite is currently skipped (GAP-02). |

## Verified user-facing workflows

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| WF-01 | `FACT — SOURCE` | Overview dashboard with casino and sports KPIs. | `aegis-front/app/routes/aegis-overview.tsx`; `aegis/api/routers/dashboard.py` (`casino_overview`, `sports_overview`). | — |
| WF-02 | `FACT — SOURCE` | Player investigation view: profile, hourly casino/sports results, transactions, casino events, and balance timeline. | `aegis-front/app/routes/aegis-player.tsx`; `aegis/api/routers/users.py` (search, summary, hourly results/transactions, casino events). | Casino events read from Databricks on cache miss. |
| WF-03 | `FACT — SOURCE` | Alerts queue: list, counts, finding detail, and finding status updates. | `aegis-front/app/routes/aegis-alertas.tsx`; `aegis/api/routers/aegis_v2.py` (`/findings`, `/findings/count`, `/findings/{id}`, `PATCH /findings/{id}/status`). | — |
| WF-04 | `FACT — SOURCE` | Cases workflow route. | `aegis-front/app/routes/aegis-casos.tsx`; cache warms player profile when a finding moves to `in_review` (`aegis/docs/aegis-cache-and-job-pipeline.md`). | Confirm depth of the cases workflow before describing it as full case management. |
| WF-05 | `FACT — SOURCE` | Reports route with generated finding reports. | `aegis-front/app/routes/aegis-relatorios.tsx`; `aegis/api/routers/aegis_v2.py` (`/findings/{id}/report`); `aegis/src/aegis/detection/reporting.py`. | — |
| WF-06 | `FACT — SOURCE` | Configuration route to read/update rule config, view rule status, and promote rules. | `aegis-front/app/routes/aegis-configuracoes.tsx`; `aegis/api/routers/aegis_v2.py` (`/rules/config`, `PATCH /rules/{id}/config`, `/rules/status`, `/rules/{id}/promotion`). | — |
| WF-07 | `FACT — SOURCE` | Risk Constellation: a GPU/WebGL visualization rendering large point sets (initial fetch 350,000; API cap 500,000) with Web Worker decode and optional bloom post-processing. | `aegis-front/src/features/risk-constellation/README.md`; `aegis-front/src/features/risk-constellation/scene/` and `data/points.worker.ts`; `aegis/api/routers/risk_constellation.py`. | "Millions of particles in one view" is explicitly not supported end-to-end (GAP-04). |
| WF-08 | `FACT — SOURCE` | Player geographic distribution and map views. | `aegis-front/src/components/aegis/AegisPlayerMap`; `aegis/api/routers/players.py` (`/city-distribution`, `/city-players`); maplibre/deck.gl in `aegis-front/package.json`. | Map media must use synthetic locations only. |
| WF-09 | `FACT — SOURCE` | Admin user management and a security-audit view. | `aegis-front/app/routes/aegis.admin.users.tsx`, `aegis.admin.user-detail.tsx`, `aegis.admin.security-audit.tsx`; `aegis/api/routers/admin_users.py`. | Frontend gating still pending (GAP-01). |
| WF-10 | `FACT — SOURCE` | A cinematic entry-intro video plays once per session with a fail-open timeout and reduced-motion-safe fallback. | `aegis-front/src/components/aegis/AegisEntryIntro.tsx`. | Uses the 17 MB master today; portfolio needs an optimized copy (DEC-04). |

## Known gaps and limits (implemented vs planned)

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| GAP-01 | `FACT — SOURCE` | The frontend login screen is currently a nonfunctional shell; the client-side access gate is pending, and the API remains the sole authorization authority. | `aegis-front/README.md` "Known gaps" (Authentication, WO6); `aegis-front/app/routes/login.tsx`. | Do not present the console as having a finished sign-in flow. |
| GAP-02 | `FACT — SOURCE` | The Playwright end-to-end smoke suite is written but skipped pending an authenticated fixture. | `aegis-front/README.md` "Known gaps" (Playwright). | Do not claim passing end-to-end coverage. |
| GAP-03 | `FACT — SOURCE` | Finding status changes are stamped with a placeholder analyst identity until real identity is wired in. | `aegis-front/README.md` "Known gaps" (Analyst attribution). | — |
| GAP-04 | `FACT — SOURCE` | The Risk Constellation does not support true multi-million-point rendering end-to-end without further backend work. | `aegis-front/src/features/risk-constellation/README.md` "Scale and limits". | State the tested envelope (≤350k initial), not aspirational scale. |

## Owner and editorial decisions

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| DEC-01 | `DECISION` | Project repositories are private; no public source link is published for Aegis. | `docs/content.md` "Chapter structure"; `BATCH-03-README.md` "Shared Prohibitions". | Applies to case-study CTAs and metadata. |
| DEC-02 | `DECISION` | A live/staging environment link is deferred until a URL is verified; keep `[REQUIRED: live environment URL]` until then. | `docs/content.md` metadata decision note. | Marker must never reach public UI/metadata/bundle. |
| DEC-03 | `DECISION` | Portfolio media uses synthetic demonstration data only. | `BATCH-03-README.md` "Shared Prohibitions"; `aegis/README.md` synthetic path (SYS-13). | No real screenshots, exports, or player data. |
| DEC-04 | `DECISION` | The 17 MB 4K intro master is not copied into the portfolio directly; WO-019 produces optimized, sanitized media. | `BATCH-03-README.md` "Shared Prohibitions"; asset size verified at `aegis-front/public/aegis/entry-intro/LS_Aegis_EntryIntro.mp4` (~17 MB). | — |

## Confidential — do not publish (values omitted)

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| CONF-01 | `CONFIDENTIAL` | Omit the operator identity and any former internal portal/system name that appears in source history. | Names appear in `aegis/README.md` (migration notes) and `aegis-front/README.md` (extraction/ownership). Value intentionally not reproduced here. | Never name or hint at the employer or its internal systems. |
| CONF-02 | `CONFIDENTIAL` | Omit concrete deployment identifiers: cloud project IDs, hosting origins, staging URLs, and regions. | Present in `aegis-front/README.md` "Staging (Google Cloud)". Values omitted here. | Describe the platform generically (SYS-14) without identifiers. |
| CONF-03 | `CONFIDENTIAL` | Omit the third-party cloud account identifier referenced as forbidden in source. | `aegis/README.md` "Deployment" (Forbidden environment). Value omitted here. | Do not reproduce the account number anywhere public. |
| CONF-04 | `CONFIDENTIAL` | Omit all production/personal data: real players, CPFs and identity fields, transactions, IP/device values, credentials, and `.env` contents. | Detection evidence payloads reference fields such as CPF/document, IP, and device (`aegis/src/aegis/detection/rules/mvp.py`); `.env` files were not opened. | Rules may be described; real values and payloads must never be shown. |
| CONF-05 | `CONFIDENTIAL` | Treat the ~4.5M-user design figure as confidential internal context, not public copy. | Scale figure appears in `aegis/docs/aegis-cache-and-job-pipeline.md`. | Public data-volume claims are separately prohibited (UNSUP-05). |

## Unsupported — do not publish

No client-provided metric or outcome exists for any of the following. Each is
prohibited unless a source is accepted in a future, reviewed decision.

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| UNSUP-01 | `UNSUPPORTED — DO NOT PUBLISH` | Fraud reduction attributable to Aegis. | No source. | Prohibited. |
| UNSUP-02 | `UNSUPPORTED — DO NOT PUBLISH` | Revenue impact or money saved. | No source. | Prohibited. |
| UNSUP-03 | `UNSUPPORTED — DO NOT PUBLISH` | Faster investigations or time saved per case. | No source. | Prohibited. |
| UNSUP-04 | `UNSUPPORTED — DO NOT PUBLISH` | Analyst adoption or number of users. | No source. | Prohibited. |
| UNSUP-05 | `UNSUPPORTED — DO NOT PUBLISH` | Production data volume, players processed, or scale reached. | No source (the ~4.5M figure is design context, CONF-05). | Prohibited. |
| UNSUP-06 | `UNSUPPORTED — DO NOT PUBLISH` | Uptime, availability, or reliability numbers. | No source. | Prohibited. |
| UNSUP-07 | `UNSUPPORTED — DO NOT PUBLISH` | Detection accuracy, precision, recall, or false-positive rate. | No source; rules run in shadow by default (SYS-09). | Prohibited. |
| UNSUP-08 | `UNSUPPORTED — DO NOT PUBLISH` | Team size or that others were managed/led. | Owner states solo build with AI assistance (OWN-05). | Prohibited. |
| UNSUP-09 | `UNSUPPORTED — DO NOT PUBLISH` | Client satisfaction, testimonials, or stakeholder endorsement. | No source. | Prohibited. |

## Unresolved facts (needed before or during WO-019/WO-020)

- Verified live/staging URL for public linking, or explicit confirmation to keep
  the case study link-free (DEC-02).
- Confirmation that frontend git authors "WO5 Bootstrap" and "WO5 Extract" are
  tooling/automation identities, not additional contributors (GIT-03).
- Reviewer confirmation of how strongly to state regulatory alignment (SYS-11).
- Depth of the cases workflow to confirm WF-04 wording.
- Approved sanitized screenshots/media produced from the synthetic path (WO-019).
