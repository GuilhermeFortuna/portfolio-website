# Nexo Dental — Case-Study Evidence and Publication Contract

**Work Order:** WO-034. **State on handoff:** `DONE` (owner authorized
2026-08-04; separate independent reviewer waived).
**Sources inspected (read-only):** `/home/gui/projects/nexo/dev.sh`,
`/home/gui/projects/nexo/teardown/`, `/home/gui/projects/nexo/odonto_back`
(backend), and `/home/gui/projects/nexo/odonto_front` (frontend). No file in
either source repository was modified. Evidence paths below are relative to
the source repository named in the row (`odonto_back/…` or `odonto_front/…`),
or to the portfolio batch index when citing owner facts.

**Source repository status at inspection (preserved; not cleaned):**

- `odonto_back`: branch `development` (ahead of `origin/development` by 2);
  dirty working tree: `.env.example`, `README.md`, `app/core/config.py`,
  `docker-compose.yml`, `scripts/wo24_container_smoke.sh`, `tests/conftest.py`.
- `odonto_front`: branch `feature/implement-silk-background-animation`; clean
  working tree.

## Public disclosure boundary (read first)

This register governs what may become public Nexo Dental wording. Nothing
here is published automatically; it is the reviewed input for WO-035 and
WO-036.

Nexo Dental is the owner's own product. There is **no employer, client, or
third-party confidentiality boundary**. Most of this register is a factual
inventory of what the system does so copy can describe it accurately.

- **Confidential and omitted from all public output:** real clinic or patient
  data, credentials and `.env` values, Firebase project identifiers, database
  connection strings, API keys, and private deployment identifiers. This
  document deliberately does **not** reproduce those values; it cites the
  file where they live so a reviewer can confirm them at the source.
- **Private source:** project repositories are private and are not linked
  publicly.
- **Screenshot content:** every capture must use seed/fixture/MSW data only —
  never a real clinic's records. The credential / Firebase / PII prohibition
  above still applies.
- **No invented outcomes:** no clinic count, patient volume, adoption,
  uptime, or performance under real load may be published as a real result.
  Those rows are listed explicitly as `UNSUPPORTED — DO NOT PUBLISH` below.
- **README and product-doc claims are not source evidence.**
  `PRODUCT.md` and both READMEs describe the product in aspirational and
  promotional terms (`premium`, differentiated capabilities, and similar). A
  sentence from either is a *candidate* claim; it becomes `FACT — SOURCE`
  only when this register cites the code, route, test, migration, or command
  that implements it. Code wins over product-doc prose.
- **Narrative framing rule (Locked Owner Fact 3):** the case study frames
  problem and context entirely from Nexo Dental's own functional scope and
  engineering decisions. Do not introduce third-party product-comparison
  framing of any kind in public copy, context sections, or this register.

## Classifications

Exactly these values appear in the `Classification` column:

- `FACT — OWNER` — stated by the owner and recorded in `BATCH-06-README.md`.
- `FACT — SOURCE` — verifiable in a named source-repository file.
- `DECISION` — an owner or editorial decision about what to publish.
- `CONFIDENTIAL` — real but must not be published; value omitted here.
- `INFERENCE — REVIEW REQUIRED` — reasonable reading of the source that a
  reviewer must confirm before it is published as fact.
- `UNSUPPORTED — DO NOT PUBLISH` — no accepted evidence exists; prohibited.

Git history is evidence for dates and authorship only. It is **not** evidence
of clinic-scale performance, correctness under load, or production usage.

## Owner facts

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| OWN-01 | `FACT — OWNER` | Public project name is **Nexo Dental**. Route slug is `nexo-dental` (`/work/nexo-dental`). | `docs/work-orders/wo/BATCH-06-README.md` Locked Owner Fact 6; `src/content/projects.ts` and `docs/content.md` already reserve the slug. | Display name and slug are locked for this batch. |
| OWN-02 | `FACT — OWNER` | Nexo Dental is the owner's own product — not client or employer work. Guilherme is the sole owner/founder. | `BATCH-06-README.md` Locked Owner Fact 1. | No third-party confidentiality boundary; only real clinic/patient data, credentials, Firebase identifiers, and private source are sensitive. |
| OWN-03 | `FACT — OWNER` | Role: founder and sole developer. | `BATCH-06-README.md` Locked Owner Fact 2. | Do not invent a team (see UNSUP-06). |
| OWN-04 | `FACT — OWNER` | Guilherme designed and built the product as sole owner, with AI assistance (Cursor was a development tool). | `BATCH-06-README.md` Locked Owner Fact 2; closes authorship for GIT-02. | State "with AI assistance" honestly; do not imply additional human contributors. Matches Quant wording. |
| OWN-05 | `FACT — OWNER` | The project's public period is the two repositories' Git history only — no earlier unlogged lineage. | `BATCH-06-README.md` Locked Owner Fact 4. | Reconcile with GIT-01. Unlike Quant, there is no separate multi-year idea lineage to publish. |
| OWN-06 | `FACT — OWNER` | Live-environment hero control reuses Aegis's exact disabled object: `liveEnvironment: { label: "Live environment — coming soon" }` — no real link. | `BATCH-06-README.md` Locked Owner Fact 5; staging status in SYS-09. | Source staging Work Orders are blocked; do not invent a live URL. |
| OWN-07 | `FACT — OWNER` | Domain: multi-tenant clinic-operations product for Brazilian dental clinics, spanning scheduling, patient records, odontogram, finance, WhatsApp communication, CRM, TISS claims, and reporting, across three primary daily user roles (receptionist/operational, dentist/clinical, manager/commercial-financial). | `BATCH-06-README.md` Locked Facts (source-derived) and Locked Owner Fact 3 consequence; functional list only. Corroborated by WF-* and SEC-* rows. | Publish the functional scope list. Do not frame the product via third-party product comparison (Locked Owner Fact 3). |

## Git-derived facts (dates and authorship only)

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| GIT-01 | `FACT — SOURCE` | Implementation history: backend begins 2026-07-06 and runs through 2026-07-29; frontend begins 2026-07-06 and runs through 2026-08-02. | `git log` in `odonto_back` (earliest 2026-07-06, latest 2026-07-29) and `odonto_front` (earliest 2026-07-06, latest 2026-08-02). Re-verified 2026-08-04. | Dates show repository activity only. Reconcile with OWN-05. |
| GIT-02 | `FACT — OWNER` | Development is single-owner with AI-assisted tooling. | Distinct author names (no emails extracted): both repositories show exactly three name variants — `Guilherme`, `Guilherme Fortuna`, `Guilherme Fortuna dos Santos`. Owner Facts 1–2 resolve these to one person. Unlike Quant, there is no tooling-identity author to reconcile. | Authorship wording rests on the owner statement plus name-variant resolution, not on git inference alone. |
| GIT-03 | `FACT — SOURCE` | Sustained, active development (backend 73 commits; frontend 224 commits at inspection). | `git rev-list --count HEAD` = 73 (`odonto_back`), 224 (`odonto_front`), recorded 2026-08-04. | Commit counts are not a productivity, quality, or clinic-outcome metric. |

## Verified system boundaries

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| SYS-01 | `FACT — SOURCE` | React / TypeScript SPA built with Vite; TanStack Router file routes under `src/routes/`. | `odonto_front/package.json`; `odonto_front/src/main.tsx`; `odonto_front/src/routes/`; `odonto_front/src/routeTree.gen.ts`. | Stack names only. Promotional UI adjectives from `PRODUCT.md` are not evidence (UNSUP-07). |
| SYS-02 | `FACT — SOURCE` | FastAPI HTTP service is the backend API surface; routers mount under `/api/v1`; `/health` at root. | `odonto_back/pyproject.toml` (`fastapi`, `uvicorn`); `odonto_back/app/main.py` (`create_app`, `api_v1_prefix = "/api/v1"`). | Do not claim production readiness or SLA. |
| SYS-03 | `FACT — SOURCE` | PostgreSQL with Alembic migrations stores application schema (35 version files at inspection). | `odonto_back/pyproject.toml` (`sqlalchemy`, `alembic`, Postgres driver); `odonto_back/alembic/`; `odonto_back/docker-compose.yml` (`postgres` service). | Schema evolution evidence, not data-volume evidence. |
| SYS-04 | `FACT — SOURCE` | Local orchestration starts Postgres/Redis via compose, the FastAPI app (`uvicorn app.main:app`), and the frontend (`pnpm dev`) through `/home/gui/projects/nexo/dev.sh`. | `/home/gui/projects/nexo/dev.sh`; `odonto_back/docker-compose.yml`. | Local-dev path only; not a production deployment claim. |
| SYS-05 | `FACT — SOURCE` | Deterministic mock path: frontend can run with `VITE_USE_MOCKS=true`, MSW handlers under `src/mocks/`, and `assertProductionMocksDisabled()` guards production. | `odonto_front/src/main.tsx` (`VITE_USE_MOCKS`, `assertProductionMocksDisabled`); `odonto_front/src/mocks/` (`browser.ts`, `handlers.ts`, domain fixtures). | Approved capture path for WO-035. Prefer mocks/seed over any real clinic session. |
| SYS-06 | `FACT — SOURCE` | Backend domain modules under `app/` include scheduling, clinical, financial, comms, crm, claims, reporting, dashboard, ai, action_queue, identity, settings, billing, and demo. | `odonto_back/app/` package layout; routers included from `app/main.py`. | Module presence is not a clinic-adoption claim. |
| SYS-07 | `FACT — SOURCE` | Backend automated tests under `odonto_back/tests/` (50 `test_*.py` files at inspection) cover auth/tenancy/RLS, patients, scheduling, odontogram/encounters/anamnese/files, financial flows, comms, CRM, claims, AI ops, action queue, dashboard clinic-pulse (including no-PII assertions), reporting, demo seed/guard, domain events, and health/config. | `odonto_back/tests/`. | Publish what the suites verify. Do not claim broader coverage, production soak, or load performance. |
| SYS-08 | `FACT — SOURCE` | Frontend automated tests under `odonto_front/tests/` (134 `*.test.ts*` files at inspection) cover agenda, patients, odontogram, clinical, clinical-ai, financial, financial-ai, comms, crm, claims, fila, dashboard, reports, settings, auth, routes, visual, plus MSW server and hosting/runtime guards. | `odonto_front/tests/`. | Same limit as SYS-07. |
| SYS-09 | `FACT — SOURCE` | A Firebase Hosting staging target is defined in the frontend repository (`firebase.json`, `.firebaserc`), but the source Work Order series records WO23–WO26 as `BLOCKED` / "implemented, review rejected," with FIX8/FIX9 still `NOT_STARTED`. There is **no verified live staging URL**. | `odonto_front/firebase.json`; `odonto_front/.firebaserc` (identifiers not copied here — CONF-03); `odonto_front/docs/work-orders/WO-STATUS.md` Phase D rows WO23–WO26 and FIX8/FIX9. | State precisely: staging target exists in config; live staging is unverified/blocked. Do not imply a working public environment. Reconciles with OWN-06 / DEC-02. |

## Verified workflow modules

Module status below is from backend routers, frontend routes/features, and the
source repository's own `WO-STATUS.md` — not from `PRODUCT.md` promotional
copy. The functional list matches the publishable scope in OWN-07.

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| WF-01 | `FACT — SOURCE` | Scheduling / agenda: backend `/api/v1/scheduling`; frontend `/agenda`. | `odonto_back/app/scheduling/router.py` (`APIRouter(prefix="/scheduling")`); `odonto_front/src/routes/_authenticated/agenda.tsx`; `odonto_front/src/features/agenda/`. | Implemented. |
| WF-02 | `FACT — SOURCE` | Patient records: backend clinical patients API; frontend `/pacientes` and patient detail routes. | `odonto_back/app/clinical/` (`router.py` and related); `odonto_front/src/routes/_authenticated/pacientes/`. | Implemented. |
| WF-03 | `FACT — SOURCE` | Odontogram and clinical charting: odontogram/encounter/anamnese/file routers; patient clinical sub-routes and `src/features/odontogram`. | `odonto_back/app/clinical/odontogram_router.py`, `encounter_router.py`, `anamnese_router.py`, `file_asset_router.py`; `odonto_front/src/features/odontogram/`. | Implemented. |
| WF-04 | `FACT — SOURCE` | Finance / orçamentos: procedures, orçamentos, payments, commissions; frontend `/financeiro` and patient financial routes. | `odonto_back/app/financial/` (`router.py`, `orcamento_router.py`, `payment_router.py`, `commission_router.py`, `procedure_router.py`); `odonto_front/src/routes/_authenticated/financeiro.tsx`, `financeiro/comissoes.tsx`. | Implemented. |
| WF-05 | `FACT — SOURCE` | WhatsApp / communications: backend `/api/v1/comms`; frontend `/conversas`. | `odonto_back/app/comms/router.py` (`prefix="/comms"`); `odonto_front/src/routes/_authenticated/conversas.tsx`; `odonto_front/src/features/comms/`. | Implemented. Do not claim live clinic message volume. |
| WF-06 | `FACT — SOURCE` | CRM: backend `/api/v1/crm`; frontend `/crm` (pipeline, campanhas, CRM reports). | `odonto_back/app/crm/router.py` (`prefix="/crm"`); `odonto_front/src/routes/_authenticated/crm.tsx`, `crm/`. | Implemented. |
| WF-07 | `FACT — SOURCE` | TISS claims: backend `/api/v1/claims`; frontend `/tiss/*` (guias, lotes, glosas, autorizações, retornos, config). | `odonto_back/app/claims/router.py` (`prefix="/claims"`); `odonto_front/src/routes/_authenticated/tiss/`. | Implemented. |
| WF-08 | `FACT — SOURCE` | Reporting surfaces exist: backend `/api/v1/reports`; frontend `/relatorios` and CRM report routes. | `odonto_back/app/reporting/router.py` (`prefix="/reports"`); `odonto_front/src/routes/_authenticated/relatorios/`; `odonto_front/src/features/reports/`. | **Code is present**, but the source `WO-STATUS.md` still lists WO52 as `GATE_PENDING` and WO53/WO54 as `NOT_STARTED`. Treat reporting as implemented-in-repo with an incomplete/stale status-board signal — do not market a finished "BI suite" beyond what routes and tests show. |
| WF-09 | `FACT — SOURCE` | Role-native shell: machine roles `gestor`, `dentista`, `secretaria`, `financeiro` with labeled surfaces; operator maps and capability-gated navigation for receptionist/operational, dentist/clinical, and manager/commercial-financial work. | `odonto_front/src/components/layout/sidebar-role-labels.ts` (`SHELL_MEMBERSHIP_ROLE_LABELS`); operator/resolve surfaces under `odonto_front/src/features/ai/operator/`; `PRODUCT.md` user section (candidate domain description only — roles corroborated by shell labels and routes above). | Three primary daily roles are the publishable framing. Capability gates are UI/permissions evidence, not a clinic-staffing claim. |
| WF-10 | `FACT — SOURCE` | Adjacent operator surfaces: action queue (`/fila`) and AI operator panels backed by `/api/v1` AI and action-queue modules. | `odonto_back/app/ai/`; `odonto_back/app/action_queue/`; `odonto_front/src/routes/_authenticated/fila.tsx`; `odonto_front/src/features/ai/`. | Describe as role-native, reviewable operator assistance backed by code — not as autonomous clinical decision-making or "AI-first" marketing without further evidence. |

## Multi-tenancy, RLS, and LGPD posture

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| SEC-01 | `FACT — SOURCE` | Multi-tenant data access uses tenant-scoped database sessions that set `app.tenant_id` for the connection. | `odonto_back/app/core/tenancy.py` (`tenant_session`, `get_tenant_session`); `odonto_back/app/core/tenant_base.py` (`TenantBase.tenant_id` from `current_setting('app.tenant_id')`). | Mechanism evidence. Do not claim third-party audit certification. |
| SEC-02 | `FACT — SOURCE` | Row-level security is enabled and forced on tenant tables via Alembic helpers and a core multitenancy migration. | `odonto_back/alembic_helpers/rls.py` (`enable_rls` → `ENABLE`/`FORCE ROW LEVEL SECURITY` + `tenant_isolation` policy); `odonto_back/alembic/versions/b3c8e1f42d90_multitenancy_rls_core_tables.py`. | Same limit as SEC-01. |
| SEC-03 | `FACT — SOURCE` | AI pre-invoke validation rejects inputs that contain PII before provider call / audit row creation. | `odonto_back/app/ai/context/clinical.py` (`validate_evolution_facts_pii` → `ai_input_contains_pii`); wired from `odonto_back/app/ai/operations/draft_clinical_evolution.py`; covered in `odonto_back/tests/test_ai_operations.py`. | Source mechanism, not a legal certification claim. |
| SEC-04 | `FACT — SOURCE` | Claims field protection uses AES-GCM encryption with masked API fields (e.g. `*_masked` / last-4 style masking). | `odonto_back/app/claims/crypto/` (`aes_gcm.py`, factory/protocol); claims routers/schemas exposing masked fields. | Do not publish key material or real claim payloads. |
| SEC-05 | `FACT — SOURCE` | Dashboard clinic-pulse and related event payloads are tested for absence of PII keys. | `odonto_back/tests/test_dashboard_clinic_pulse.py` (`PII_KEYS`, `_assert_no_pii`); related no-PII assertions in domain-event and comms tests. | Test posture evidence. Portfolio media must still use seed/fixture data only (MEDIA-*). |

## Media and capture safety

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| MEDIA-01 | `DECISION` | Every WO-035 capture uses seed, fixture, or MSW mock data only — never a real clinic's or real patient's records. | `BATCH-06-README.md` Shared Prohibitions; SYS-05 mock path. | Hard rule for the batch. |
| MEDIA-02 | `DECISION` | Operators must not capture or publish pixels that reveal credentials, `.env` values, Firebase project identifiers, database connection strings, API keys, or real clinic/patient identifiers. Prefer the MSW/seed path so no real clinic session is required. | `BATCH-06-README.md` Shared Prohibitions; CONF-* rows; SYS-05. | If a capture accidentally includes a secret or real PII, discard it and recapture from mocks/seed. |
| MEDIA-03 | `DECISION` | Capture masters are archived outside the portfolio repository and referenced by hash; do not copy masters into the portfolio tree. | `BATCH-06-README.md` Shared Prohibitions. | WO-035 owns the media manifest. |

## Owner and editorial decisions

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| DEC-01 | `DECISION` | Project repositories are private; no public source link is published for Nexo Dental. | `docs/content.md` chapter-structure decision; `BATCH-06-README.md` Shared Prohibitions. | Applies to case-study CTAs and metadata. |
| DEC-02 | `DECISION` | Render Aegis's exact disabled live-environment control (`Live environment — coming soon`, non-interactive) on `/work/nexo-dental`. Do not publish a real staging or production URL. | OWN-06; SYS-09; `BATCH-06-README.md` Locked Owner Fact 5. | Closed for this batch unless the owner later supplies a verified URL through a reviewed decision. |
| DEC-03 | `DECISION` | Public display name is `Nexo Dental`; route slug stays `nexo-dental` (`/work/nexo-dental`, assets under `public/work/nexo-dental/`). | OWN-01; `BATCH-06-README.md` Locked Owner Fact 6. | Locked. |
| DEC-04 | `DECISION` | Metadata title/description for `/work/nexo-dental` must stay free of promotional adjectives (`premium`, `production-ready`, and similar) and free of third-party product-comparison framing. Prefer verified multi-tenant clinic-operations scope, including role-native operator assistance where sourced. | This register; UNSUP-07; Locked Owner Fact 3. | WO-034 updates `docs/content.md` metadata row accordingly. |
| DEC-05 | `DECISION` | Portfolio media for Nexo Dental is produced from the mock/seed path, not from a real clinic or blocked staging environment. | SYS-05; MEDIA-01; SYS-09. | Fixture data in screenshots needs no per-image clinic disclaimer beyond the chapter disclosure boundary; outcome claims remain prohibited. |
| DEC-06 | `DECISION` | Problem/context narrative (WO-036) motivates the product from Nexo Dental's own functional scope and engineering decisions — multi-tenant clinic operations across three role-native surfaces — with no third-party product-comparison framing. | `BATCH-06-README.md` Locked Owner Fact 3 and consequence paragraph. | Binding on WO-036 and this register. |

## Confidential — do not publish (values omitted)

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| CONF-01 | `CONFIDENTIAL` | Omit credentials, API keys, and `.env` contents. | `.env` files exist in local Nexo environments; they were not opened. | Never read or copy values into portfolio docs, media, or the bundle. |
| CONF-02 | `CONFIDENTIAL` | Omit real clinic names, patient names, clinical charts, financial records, and any other real clinic/patient PII. | Product handles clinical and financial data; seed/fixture data only for public media. | Security and LGPD rule for all public copy and every WO-035 capture. |
| CONF-03 | `CONFIDENTIAL` | Omit Firebase project identifiers and private deployment identifiers / internal hostnames. | `odonto_front/.firebaserc` and related config exist; identifiers not copied here. | Describe staging status generically (SYS-09) without project IDs. |
| CONF-04 | `CONFIDENTIAL` | Treat private source repositories as non-public; do not publish repository URLs. | DEC-01; `docs/content.md` chapter-structure decision. | Public GitHub profile link for the person remains separate and already approved. |

## Unsupported — do not publish

No accepted evidence exists for any of the following as real outcomes. Each is
prohibited unless a source is accepted in a future, reviewed decision. This is
the same no-invented-metrics discipline WO-018, WO-024, and WO-029 applied,
adapted to the clinic-operations metric vocabulary.

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| UNSUP-01 | `UNSUPPORTED — DO NOT PUBLISH` | Clinics using the product (clinic count / customer count). | No source. | Prohibited. |
| UNSUP-02 | `UNSUPPORTED — DO NOT PUBLISH` | Patient volume or real patient-count metrics. | No source. Fixture patient counts in seed data are not real outcomes. | Prohibited as real results. |
| UNSUP-03 | `UNSUPPORTED — DO NOT PUBLISH` | Adoption, growth, or market-share claims. | No source. | Prohibited. |
| UNSUP-04 | `UNSUPPORTED — DO NOT PUBLISH` | Uptime or availability percentages. | No source; staging itself is unverified (SYS-09). | Prohibited. |
| UNSUP-05 | `UNSUPPORTED — DO NOT PUBLISH` | Performance under real load / clinic-scale load claims. | No source. WO96/WO97 clinic-scale staging data Work Orders are themselves `BLOCKED` in source `WO-STATUS.md`. | Prohibited. |
| UNSUP-06 | `UNSUPPORTED — DO NOT PUBLISH` | Team size or that others were managed/led. | Owner states sole founder/developer with AI assistance (OWN-03, OWN-04). | Prohibited. |
| UNSUP-07 | `UNSUPPORTED — DO NOT PUBLISH` | Promotional product-doc / README language as product fact: `premium`, `production-ready`, `enterprise-grade`, `state-of-the-art`, and similar marketing adjectives. | Appears in `odonto_front/PRODUCT.md` and related product prose as aspirational tone; not backed by a cited benchmark or production proof. | Prohibited on product-doc authority alone. Revisit only with new admissible evidence. |

## Known gaps and limits (implemented vs planned)

| Claim ID | Classification | Proposed public wording | Evidence | Limits |
| --- | --- | --- | --- | --- |
| GAP-01 | `FACT — SOURCE` | Source Phase D staging Work Orders (WO23–WO26) are `BLOCKED` / review-rejected; FIX8/FIX9 are `NOT_STARTED`. | SYS-09; `odonto_front/docs/work-orders/WO-STATUS.md`. | No live staging URL. |
| GAP-02 | `FACT — SOURCE` | Source `WO-STATUS.md` still marks core BI Work Orders WO52–WO54 as gate-pending / not started even though reporting routers and `/relatorios` routes exist in-repo. | WF-08. | Publish from code for route existence; do not overclaim a completed BI program from the status board or from product-doc prose. |
| GAP-03 | `FACT — SOURCE` | Clinic-scale synthetic staging data Work Orders (WO96–WO97) are `BLOCKED` in the source status board. | `odonto_front/docs/work-orders/WO-STATUS.md` WO96/WO97. | Reinforces UNSUP-05; do not imply clinic-scale load validation. |
| GAP-04 | `FACT — SOURCE` | `/home/gui/projects/nexo/teardown/` holds external research notes that are **not** runtime product evidence and must not feed public portfolio wording. | `/home/gui/projects/nexo/teardown/` file list (`00_SITEMAP.md` … `10_GAPS_OPPORTUNITIES.md`). | Out of public narrative scope per DEC-06 / Locked Owner Fact 3. Inspected only to record the boundary. |

## Unresolved facts (needed before or during WO-035/WO-036)

- Approved high-resolution media set from the mock/seed path across the three
  role-native surfaces (WO-035).
- Owner-approved narrative and exact visible copy (WO-036), constrained by
  DEC-06.
- A verified live staging URL remains unavailable; DEC-02 stands unless the
  owner later supplies one through a reviewed decision.
- Homepage / projects entry display copy for Nexo Dental may still need
  alignment with DEC-04 during WO-037 (out of WO-034 write scope beyond
  `docs/content.md`).
