# Content and Editorial Specification

## Voice

Confident, precise, concise, technically literate, and evidence-led. Use first person for ownership and active voice for decisions. Avoid empty superlatives, résumé clichés, unexplained technology lists, and invented impact.

## Messaging hierarchy

1. Guilherme builds ambitious software systems.
2. His work spans AI, product engineering, data, and infrastructure.
3. Four chapters prove depth through problems, architecture, decisions, and outcomes.
4. The portfolio itself proves frontend craftsmanship.
5. The visitor can inspect work and start a conversation.

## Proposed, editable copy

### Identity

**Status:** `APPROVED` (2026-07-28) — source for WO-005.

- Eyebrow: `GUILHERME`
- Headline: `I build ambitious software systems.`
- Disciplines: `AI · Product Engineering · Data · Infrastructure`
- Support: `Full-stack developer creating intelligent products, complex systems, and high-impact digital experiences.`
- Actions:
  - **DECISION:** `Explore my work` → `/work/aegis` (first project in fixed chapter order)
  - **FACT:** `View GitHub` → `https://github.com/GuilhermeFortuna` (public profile; project repositories remain private)

### Process

**Status:** `APPROVED` (2026-07-28) — source for WO-007.

- Heading: `From difficult idea to working system.`
- Sequence: `IDEA → ARCHITECTURE → AGENTS → IMPLEMENTATION → TESTING → DEPLOYMENT`
- Support: `I combine system design, AI-native execution, and rigorous validation to turn ambitious product ideas into dependable software.`

### About

**Status:** `APPROVED` (2026-07-28) — source for WO-006.

- Title: `Software Engineer · AI, Data & Product Systems`
- Bio:

  > I’m a software developer focused on building ambitious, intelligent systems that solve complex problems. My work spans AI-powered products, data-intensive applications, quantitative research, backend infrastructure, and polished frontend experiences.
  >
  > I combine strong engineering fundamentals with product thinking and a relentless drive to turn difficult ideas into reliable, usable software. I don’t just write code—I design and build complete systems from concept to deployment.

- Time-zone wording: `Brasília / São Paulo time zone`
- Availability: `Available and actively looking for a remote position.`
- Profile actions:
  - **FACT:** `GitHub` → `https://github.com/GuilhermeFortuna`
  - **FACT:** `WakaTime` → `https://wakatime.com/@GuilhermeFortuna`
- Résumé status: **FACT:** not yet available; currently being prepared.
- Résumé behavior for WO-006: omit the résumé action. Do not render a disabled
  control, fake URL, or public placeholder.
- Location was not provided for About. Do not infer a city, state, country of
  residence, or nationality from the approved time-zone wording. Country-level
  location for Contact is approved separately below.

### Manifesto / Contact

**Status:** `APPROVED` (2026-07-28) — source for WO-011.

- Manifesto: `I don’t just create code. I build systems that turn ambitious ideas into reality.`
- CTA: `Let’s build something difficult.`
- Location wording: `Brazil` (country only; do not invent a city)
- Availability: `Available and actively looking for a remote position.`
  (**DECISION:** reuse the approved About availability wording)
- Contact actions:
  - **FACT:** `Email me` → `mailto:guilhermefortuna1000@gmail.com`
  - **FACT:** `LinkedIn` → `https://www.linkedin.com/in/guilherme-fortuna-dos-santos/`
  - **FACT:** `GitHub` → `https://github.com/GuilhermeFortuna`
- Résumé status: **FACT:** not yet available; currently being prepared.
- Résumé behavior for WO-011: **DECISION (2026-07-28, owner-approved):** omit the
  résumé action until a verified file/URL exists. Do not render a disabled
  control, fake URL, or public placeholder. Résumé remains a release
  requirement, not a WO-011 scene blocker.

## Chapter structure

Positioning → problem → goal → why difficult → system → 2–4 decisions → personal contribution → evidence/result → technology → verified links. Motion copy stays short; detailed narrative remains in the semantic layer.

| Purpose | Label |
|---|---|
| Navigation | Work / Process / About / Contact |
| Project | View live environment / Read architecture (no public source link) |
| Final | Email me / LinkedIn / GitHub (Résumé when verified) |
| State | Live / Private source / Case study / Backend system |

**DECISION (2026-07-28):** Project repositories are private and will not be linked publicly. Staging/live environment links are planned for Aegis and Nexo Dental when those environments exist; gosigapp has no UI (CLI/backend only) and will not receive a live-environment action. Quant is a native desktop application and omits the control entirely (see Quant chapter). Until staging URLs are verified for routes that use them, keep `[REQUIRED: live environment URL]` markers in documentation only.

**DECISION (2026-07-31):** On a case-study page whose live environment is still unverified, the live-environment action renders as a visibly disabled, non-interactive control reading `Live environment — coming soon` (`aria-disabled="true"`, no `href`). It must never render a `[REQUIRED: …]` marker as visible text. Applies to Aegis and Nexo Dental (OWN-06 / DEC-02 in the Nexo evidence register). Does **not** apply to Quant (DEC-02 in the Quant evidence register).

## Aegis case study

**Status:** accepted facts from WO-018, with the WO-020 content contract drafted.
Both locales rewritten for voice 2026-08-05 (see the decisions under *Known
gaps*). The Brazilian Portuguese chapter is now a complete authored object: the
14 `...aegisCaseStudy` spreads are gone, so neither locale inherits visible copy
from the other, matching Quant, gosigapp, and Nexo Dental. An i18n test asserts
no English heading or action label survives into `/pt-BR/work/aegis`.
The claim-level evidence register and public disclosure boundary is
[`aegis-case-study-evidence.md`](./aegis-case-study-evidence.md); it is
authoritative for every publishable Aegis claim and its classification.

The exact visible copy, media placement, alt text, and intro transcript for
`/work/aegis` live in
[`aegis-case-study-content.md`](./aegis-case-study-content.md) (WO-020), which is
authoritative for **wording**; this chapter stays authoritative for **facts**.
Where the two ever disagree, the evidence register decides. Approved assets are
inventoried in [`aegis-case-study-media.md`](./aegis-case-study-media.md)
(WO-019, `DONE`).

### Accepted facts

- **FACT (owner):** Aegis is a **fraud-intelligence** product built for an
  unnamed betting company in the **Brazilian iGaming** sector.
- **FACT (owner):** Role **Software Developer**; period **April 2026–present**.
  Repository history begins 2026-04-06 (backend) and 2026-04-12 (frontend).
- **FACT (owner):** Guilherme designed and built every product and engineering
  layer, with AI assistance. It was deployed to production and, as far as the
  owner knows, remains active. The owner confirmed on 2026-07-31 that the extra
  frontend git author names are tooling identities, not additional
  contributors, so single-owner wording is accepted as fact (closes GIT-03).
- **FACT (owner):** The public repository version is a **sanitized,
  independently maintained evolution** of the company implementation. It is not
  byte-identical to production.
- **FACT (source):** Verified system — a standalone React SPA (Vite + React
  Router v7, static nginx), a read-focused **FastAPI** service, **PostgreSQL**,
  **Databricks** lakehouse queries, optional **Redis** cache-first reads, batch
  sync jobs and an hourly sync-then-scan pipeline, an 8-rule detection engine
  (payment/gameplay/identity/impact) with shadow/live modes, scoring, and
  generated finding reports, API-enforced auth (sessions, CSRF, MFA, Argon2,
  permissions), and a synthetic demonstration-data path.
- **FACT (source):** Verified workflows — overview dashboard, player
  investigation, alerts queue, saved cases, reports, rule configuration, Risk
  Constellation WebGL visualization, player geo/map, and admin/security-audit.
- **FACT (source):** The cases route is a browser-local shelf of findings an
  analyst is working through (`localStorage` key `aegis:cases`, populated from
  the alerts queue); triage status changes and report generation do go through
  the API, but no backend cases table or router exists. Verified 2026-07-31.
  Do **not** describe it as full case management (closes WF-04).
- **DECISION (2026-07-31):** Regulatory framing is published generically as
  alignment with Brazilian anti-money-laundering obligations. Do not name
  SPA/MF Portaria 1.143/2024 or SISCOAF in public copy, and never claim
  regulator certification or approval (closes SYS-11). The WO-020 copy omits
  regulatory framing altogether, which is within this decision.

### Disclosure boundary

- **Confidential — never published:** the employer identity, any former
  internal portal/system name, deployment/project identifiers and staging URLs,
  third-party cloud account IDs, and all production/personal data (players,
  CPFs, transactions, IPs, credentials).
- **Synthetic media only:** every screenshot, figure, or video uses the
  repository's synthetic demonstration data.
- **No invented impact:** no fraud-reduction, revenue, money-saved,
  investigation-speed, adoption, accuracy, data-volume, uptime, team-size, or
  client-satisfaction claim may be published.

### Known gaps (state honestly)

- The frontend login is a nonfunctional shell; the API is the sole
  authorization authority until the client gate lands.
- The Playwright end-to-end suite is written but skipped.
- The Risk Constellation is tested to ~350k points, not multi-million.

**DECISION (2026-08-05, owner-approved):** these three gaps are **no longer
published**. They remain authoritative here as register facts and continue to
bound what the public copy may assert. The rule is now asymmetric: the copy may
omit a gap, but may never claim its opposite. A test
(`never converts an unpublished gap into a positive claim`) enforces that the
`Delivered` copy makes no login, end-to-end-coverage, or million-point claim.

**DECISION (2026-08-05, owner-approved):** the Aegis copy was rewritten for voice
and disclaimer load, bringing it into line with the recruiter-focused revisions
already applied to Quant, gosigapp, and Nexo Dental. Removed: the standalone
`Real system. Synthetic evidence.` context section, the
`as far as I know, remains active` hedge on production status, the paragraph
declining to publish client business metrics, the
`not a backend case-management system` negation, the known-gaps paragraph, and
the whole `Private by design, open to discussion` closing note. Accuracy is
unchanged — no claim was added, widened, or invented.

**DECISION (2026-08-05, owner-approved):** the Aegis chapter now ends on
pagination, not prose. The closing renders as a labelled `nav` with no heading
and no paragraphs, carrying `Back to selected work` and
`Next project: Quant` (`/work/q`, `/pt-BR/work/q`). The old `Discuss Aegis`
contact action is retired: it returned the reader to the homepage anchor rather
than advancing them through the work. `CaseStudyClosing.paragraphs` is optional
to support this; the other three chapters keep their prose closings unchanged.

With the closing note gone, the **image captions are the sole carrier of the
synthetic-data disclosure**. Every screenshot caption must continue to name its
data as synthetic, and the `player-investigation.webp` caption must keep
disclosing the document number per the 2026-07-31 decision below. A test
(`keeps the synthetic-data disclosure in the published copy`) enforces both.

### Approved media

Six assets in `public/work/aegis/`, accepted at WO-019 `DONE`: `entry-intro.mp4`
(1920×1080, 8.625 s, silent), `entry-intro-poster.webp`, `overview.webp`,
`player-investigation.webp`, `risk-constellation.webp`, and `alerts.webp`. All
product captures come from the synthetic demonstration path; the interface in
them is Portuguese, so English copy must not invent UI labels that are not in
the pixels. Hashes and provenance are in
[`aegis-case-study-media.md`](./aegis-case-study-media.md).

**DECISION (2026-07-31):** `player-investigation.webp` ships as captured. It
shows a synthetic name and a CPF-formatted number in legible type; the visible
caption states that every value including the document number is synthetic, and
the owner accepted that disclosure instead of masking the field.

**DECISION (2026-07-31):** `SISCOAF` and `COAF` remain legible in
`player-investigation.webp` and `alerts.webp`. They are public regulator names,
the copy makes no compliance claim, and no explanatory sentence is added — the
generic-regulatory decision above stands, with regulatory framing omitted from
the visible copy entirely.

### Missing inputs

- Verified live/staging URL (`[REQUIRED: live environment URL]`). **DECISION
  (2026-07-31):** until one exists, the Aegis case study renders a visibly
  disabled `Live environment — coming soon` control in its hero — not a link,
  and never a placeholder marker. The documentation-only marker stays here and
  closes when a URL is verified.

Screenshots/intro media and the regulatory-wording and cases-workflow questions
are resolved above; no other Aegis input is outstanding.

## Quant case study

**Status:** evidence WO-024 `DONE` (2026-08-03); media WO-025 `DONE`
(2026-08-03); content contract WO-026 `DONE` (owner approved 2026-08-03);
recruiter-focused bilingual revision implemented 2026-08-05 and awaiting final
owner copy review. The current screenshot set is temporary and will be replaced
through the manifest below.
Authoritative claim register:
[`q-case-study-evidence.md`](./q-case-study-evidence.md). Authoritative media
inventory: [`q-case-study-media.md`](./q-case-study-media.md). Exact visible
copy and placement: [`q-case-study-content.md`](./q-case-study-content.md).
The routes must render that contract verbatim in their selected locale.

### Accepted facts

- **FACT (owner):** Public name is **Quant** (category **Quantitative
  systems**). `Q` was the working shorthand and repository prefix; the route
  slug is `q` (`/work/q`, assets under `public/work/q/`).
- **FACT (owner):** Quant is the owner's own product — not client or employer
  work. Role: **founder and sole developer**, with AI assistance (Cursor was a
  development tool; extra git author names are tooling/duplicates).
- **FACT (owner):** Two timelines that must not be conflated. The **idea** is
  roughly six years old (≈2020) and led the owner to learn programming, with
  many rebuilt versions since. The **current implementation** lives in these
  repositories only: backend from 2026-04-20 through 2026-08-02; frontend from
  2026-05-30 through 2026-08-03. The six-year lineage has no repository
  evidence here; this codebase is not six years old.
- **FACT (owner):** A research, backtesting, and (in future) execution tool for
  the **Brazilian futures market**. Execution is a future capability; the tool
  is used today for research and backtesting.
- **FACT (source):** Verified system — Tauri 2 desktop shell around a React SPA,
  FastAPI service, Dramatiq workers on Redis, PostgreSQL with Alembic,
  MetaTrader 5 integration plus a read-only market-data gateway (no order API),
  Optuna optimization, market-data ingestion, and an MSW mock path
  (`./dev.sh --mocks`) that needs no backend, Postgres, Redis, or MT5.
- **FACT (source):** Default instruments include B3 equities and BMF futures
  `WIN$` / `WDO$`; additional symbols may come from local store or MT5.
- **FACT (source):** Live trading is locked in UI and backend (paper-only
  validation, live-capability defaults, dry-run gates). The Execution workspace
  is paper execution with a Live locked badge.
- **FACT (source):** Shipped workspaces — Launcher, Market Data, Storage,
  Backtests (with Optimize/Validate modes), Strategy Builder, Discover,
  Research (including Neural Features), Execution (paper), System, and News
  (secondary window). `/strategy` redirects to Strategy Builder. The
  `strategy/` directory is shared helpers, not a routed workspace.
  Walk-forward UI exists but is not router-mounted.
- **DECISION:** No strategy/parameter/feature/market-data restriction on
  screenshot content. Credentials, broker/account details remain confidential.
- **DECISION (closed 2026-08-03):** Omit the live-environment hero control for
  Quant entirely (DEC-02). It is a native desktop application with no live URL;
  do not render Aegis's disabled `Live environment — coming soon` pill on
  `/work/q`. Owner confirmed.

### Disclosure boundary

- **Confidential — never published:** credentials, `.env` values, broker names,
  account numbers, balances, MT5 login/server details, API keys, private
  deployment identifiers, and private source repository links.
- **Media sources:** WO-025 chose `--mocks` or `--web` per subject on rendered
  image quality; credentials and live broker identifiers remain prohibited in
  every capture. Fixture figures on the page get at most one explicit fixture
  disclosure where useful (`q-case-study-content.md`).
- **No invented outcomes:** no trading profit/loss, returns, Sharpe or other
  risk-adjusted ratio, win rate, alpha, edge, strategy effectiveness,
  prediction accuracy, users/adopters, uptime, or ingestion throughput.
- **No promotional README authority:** do not publish `state-of-the-art`,
  `high-performance`, `real-time`, `high-frequency`, or `production-ready` on
  README wording alone.

### Known gaps (state honestly)

- Frontend README still claims `/strategy` → Backtests and that Neural Features
  is deferred; code redirects `/strategy` → Strategy Builder and ships Neural
  Features.
- Walk-forward workspace directory is an unmounted shell relative to the router.
- Performance budgets exist and have a smoke script but are not CI-enforced.
- Homepage `projects[1].name` is still `Q` in `src/content/projects.ts`; display
  rename to `Quant` is tracked for WO-027.
- Native desktop-shell screenshot (WO-025 subject 12) remains `DEFERRED`.

### Media state and replacement contract

The existing WebP assets in `public/work/q/` remain temporary and must not
determine the new narrative. The recruiter revision currently references only
existing files so the route never publishes missing assets. The owner will
replace the set through the exact future paths and shot requirements in
[`q-case-study-content.md`](./q-case-study-content.md). `identity.webp` is
optional; omit identity media until a genuine approved render exists. Do not
render `identity-placeholder.svg` or any pending-asset message.

### Narrative

Exact headings, visible copy, media placement, alt text, and captions live in
[`q-case-study-content.md`](./q-case-study-content.md). Metadata title for the
route remains `Quant — Quantitative Research and Execution`. Hero meta uses
Role `Founder, Product Engineer, and sole developer`, Period
`April 2026–present`, State `Research, backtesting, and paper execution`, Source
`Private`, and **no** live-environment action. English is the canonical source;
Brazilian Portuguese is a complete editorial adaptation with localized body
copy, media descriptions, captions, and system-map labels.

### Missing inputs

- Owner review of the complete recruiter-focused English and Brazilian
  Portuguese copy.
- Owner-supplied replacement screenshots at the exact paths in the content
  contract, followed by independent visual and disclosure review.

## gosigapp case study

**Status:** content contract WO-031 `DONE` (2026-08-03); recruiter-focused bilingual revision implemented 2026-08-05.
Authoritative claim register: [`gosigapp-case-study-evidence.md`](./gosigapp-case-study-evidence.md).
Authoritative content contract: [`gosigapp-case-study-content.md`](./gosigapp-case-study-content.md).

### Accepted facts

- **FACT (owner):** Public name is **gosigapp**. Recruiter-facing category: regulated systems / backend platform (`Regulated Submission Infrastructure in Go`). Route slug is `gosigapp` (`/work/gosigapp`).
- **FACT (owner):** Built for an unnamed betting operator in the **Brazilian iGaming** sector to satisfy that operator's legal duty to submit daily and monthly regulatory files to SIGAP.
- **FACT (owner):** Role: **Software Developer** and sole human developer; designed and built every layer with AI assistance.
- **FACT (owner):** Repository history spans **2025-12-24** through **2026-06-22** (100 commits total). The commit count remains evidence-register context and is not visible recruiter copy.
- **FACT (owner/source):** Deployed via AWS ECS/Fargate (`Dockerfile`, `.github/workflows/deploy.yml`, `gosigapp-task-definition.json`, `iam-policies/` present). Current live operational status is not independently verified.
- **FACT (external):** The official SIGAP technical manual defines six categories of operational data and daily/monthly reporting schedules. This supports deadline-bound regulatory framing, not a direct claim that one malformed or late submission causes license suspension.
- **FACT (source):** Verified pipeline — S3 fetch → ZIP extraction → XML validation/aggregation → PFX RSA-SHA256 digital signing → gzip compression → base64 encoding → mTLS SIGAP API submission.
- **FACT (source):** Six SIGAP dataset types — `apostadores` (bettors), `carteiras` (wallets), `esportivas` (sports betting), `jogos` (online casino), `diarios` (daily operator aggregate), and `mensais` (monthly operator aggregate).
- **FACT (source):** Primary CLI pipeline runner (`cmd/pipeline`) and HTTP API server (`cmd/server`) for service integration, plus seven supporting utility commands (`backfill`, `compliance-check`, `date-detail`, `downloader-batch`, `downloader-monthly`, `migrate-logs`, `refresh-token`).
- **FACT (source):** `internal/impedidos` queries the official SIGAP API Impedidos v2 endpoint (`GET /impedimento/v2/condicao/{cpf}`) for bettor self-exclusion and restriction checks (SPA/MF-SIGAP-001/2026).
- **FACT (source):** Retry & auditability mechanics — network/5xx failures receive up to two bounded retries with backoff; 4xx responses do not retry. Durable log storage uses AWS DynamoDB, and the asynchronous job runner tracks `queued`, `running`, `completed`, `failed`, and `cancelled` states.
- **FACT (source):** Recovery mechanics — `cmd/backfill` checks SIGAP status before processing missing dates, while duplicate-batch responses are treated as already submitted. Describe this as status-aware recovery, not guaranteed idempotency.
- **FACT (source):** Security boundary — PKCS#12 PFX certificate digital signing (RSA-SHA256 XML signatures `ds:Signature`) and mTLS authentication with OAuth2 token caching.
- **DECISION:** Omit live-environment hero control (backend/CLI pipeline with no public UI).
- **DECISION:** Media deliverables limited to an architecture system-map diagram and sanitized CLI/log text captures against fixture data (no cloud-console screenshots).

### Disclosure boundary

- **Confidential — never published:** employer identity, brand codes `BRX` and `RICO`, S3 bucket names, PFX certificate paths/passwords, AWS account IDs, ARNs, IAM policies, API tokens, JWT secrets, and real submission payload data/PII.
- **No invented outcomes:** no files-processed volume, submission success rate, uptime percentage, incident count, regulator endorsement, fine avoidance figures, or SLA performance may be claimed.

### Known gaps (state honestly)

- gosigapp has no visual UI surface; case study relies entirely on architectural system-map diagrams and sanitized CLI/log captures.
- Current live operational status cannot be independently verified beyond the committed cloud deployment configurations and owner knowledge.

### Missing inputs

- None. English and Brazilian Portuguese recruiter copy, media captures, and implementation are complete.

## Nexo Dental case study

**Status:** evidence WO-034 `DONE` (2026-08-04); media WO-035 `DONE`
(2026-08-04); historical content contract WO-036 `DONE` (owner approved
2026-08-04); hiring-focused bilingual successor WO-039 `REVIEW` (2026-08-05).
Authoritative claim register:
[`nexo-dental-case-study-evidence.md`](./nexo-dental-case-study-evidence.md).
Current content contract:
[`nexo-dental-case-study-content-v2.md`](./nexo-dental-case-study-content-v2.md).
Historical WO-036 copy:
[`nexo-dental-case-study-content.md`](./nexo-dental-case-study-content.md).
Media manifest:
[`nexo-dental-case-study-media.md`](./nexo-dental-case-study-media.md).

### Accepted facts

- **FACT (owner):** Public name is **Nexo Dental**. Route slug is
  `nexo-dental` (`/work/nexo-dental`, assets under `public/work/nexo-dental/`).
- **FACT (owner):** Nexo Dental is the owner's own product — not client or
  employer work. Role: **founder and sole developer**, with AI assistance
  (Cursor was a development tool; git author-name variants resolve to one
  person).
- **FACT (owner):** Public period is the two repositories' Git history only —
  no earlier unlogged lineage. Backend: 2026-07-06 through 2026-07-29 (73
  commits). Frontend: 2026-07-06 through 2026-08-02 (224 commits).
- **FACT (owner):** Domain — multi-tenant clinic-operations product for
  Brazilian dental clinics spanning scheduling, patient records, odontogram,
  finance, WhatsApp communication, CRM, TISS claims, and reporting, across
  three primary daily roles (receptionist/operational, dentist/clinical,
  manager/commercial-financial). Narrative frames from this scope alone.
- **FACT (source):** Verified system — React/TypeScript Vite SPA (TanStack
  Router), FastAPI service under `/api/v1`, PostgreSQL with Alembic (35
  migrations), local orchestration via `nexo/dev.sh`, and an MSW mock path
  (`VITE_USE_MOCKS=true`).
- **FACT (source):** Multi-tenant RLS via tenant-scoped sessions
  (`app.tenant_id`) and forced row-level security policies; LGPD-oriented
  controls include AI PII pre-invoke rejection, claims field encryption/
  masking, and no-PII assertions on clinic-pulse/event payloads.
- **FACT (source):** Shipped workflow modules with backend + frontend
  evidence — agenda/scheduling, patients, odontogram/clinical, finance/
  orçamentos, WhatsApp/comms, CRM, TISS claims, plus reporting routes
  present in-repo (source WO-STATUS still marks core BI WOs incomplete —
  do not overclaim a finished BI program). Adjacent action-queue and
  role-native AI operator surfaces exist in code.
- **FACT (source, rechecked 2026-08-05):** Automated coverage is organized in
  50 backend `test_*.py` files and 134 frontend `*.test.ts*` files. These are
  test-file counts, not coverage percentages or evidence of production scale.
- **FACT (source):** Firebase Hosting staging config exists in the frontend
  repository, but source Work Orders WO23–WO26 are `BLOCKED` / review-
  rejected — **no verified live staging URL**.
- **DECISION:** Reuse Aegis's exact disabled live-environment control
  (`Live environment — coming soon`); no real link.
- **DECISION:** Private source; no public repository link. Media from
  seed/fixture/MSW only — never real clinic/patient data.
- **DECISION:** No third-party product-comparison framing in Context/
  Problem or any public claim.

### Disclosure boundary

- **Confidential — never published:** real clinic/patient data, credentials,
  `.env` values, Firebase project identifiers, database connection strings,
  API keys, private deployment identifiers, and private source repository
  links.
- **No invented outcomes:** no clinic count, patient volume, adoption,
  uptime, or performance under real load.
- **No promotional product-doc authority:** do not publish `premium`,
  `production-ready`, `enterprise-grade`, `state-of-the-art`, or similar on
  `PRODUCT.md` / README wording alone.

### Known gaps (state honestly)

- Staging deployment Work Orders in the source repository are blocked;
  live environment remains unverified — the case-study hero therefore
  reuses Aegis's disabled `Live environment — coming soon` control.
- Source `WO-STATUS.md` still lists core BI Work Orders as incomplete
  despite reporting code/routes existing.
- Clinic-scale synthetic staging data Work Orders (WO96–WO97) are blocked
  in the source status board.
### Approved media (WO-035)

Ten uncropped 2560×1440 WebP captures in `public/work/nexo-dental/` from
MSW mocks only. Content contract places eight
(`shell-identity`, `agenda`, `patient-workspace`, `whatsapp-inbox`,
`odontogram`, `clinical-timeline`, `fila`, `financial-ledger`) and reserves
`orcamento` and `reports`.

### Missing inputs

- Owner acceptance of the exact English and Brazilian Portuguese WO-039 copy.
  WO-039 remains `REVIEW`; WO-038 stays blocked until that approval is recorded.

## Metadata

The validated route metadata registry is shared by the client router and the static route-shell generator. Every route requires a unique title, description, canonical URL, `og:url`, `og:title`, and `og:description`. An approved project-specific social image SHOULD be used; routes without one use the approved global 1200×630 default.

| Route | Proposed title | Proposed description |
|---|---|---|
| `/` | `Guilherme — Software Developer | AI, Product, Data & Infrastructure` | `A cinematic engineering portfolio featuring fraud intelligence, quantitative systems, government integration, and AI-first product development.` |
| `/process` | `Engineering Process — Guilherme` | `How I move from difficult ideas through architecture, AI-agent execution, implementation, testing, and deployment.` |
| `/about` | `About Guilherme — Software Developer` | `A product-minded software developer working across interfaces, architecture, data, automation, and infrastructure.` |
| `/work/aegis` | `Aegis — Production Fraud Intelligence Platform` | `How I designed and built a production fraud-investigation platform for Brazilian iGaming, from explainable rules and data pipelines to security and WebGL.` |
| `/work/q` | `Quant — Quantitative Research and Execution` | `How I designed and built a native quantitative research platform across desktop UX, asynchronous services, market-data pipelines, validation, and paper execution.` |
| `/work/gosigapp` | `gosigapp — Regulated Submission Infrastructure in Go` | `How I designed and deployed a Go pipeline that validates, signs, retries, audits, and submits six regulated datasets to Brazil's SIGAP.` |
| `/work/nexo-dental` | `Nexo Dental — Founder-Built Clinic Operations` | `How I designed and built a multi-tenant dental-clinic product across role-native workflows, data isolation, clinical modelling, and reviewable AI assistance.` |
| `/contact` | `Contact Guilherme — Build Something Difficult` | `Contact Guilherme about remote software engineering, ambitious product development, and difficult systems.` |

- Global OG default title: `Guilherme builds ambitious software systems.`
- Global OG image: `[REQUIRED: 1200×630 approved social image]`
- Canonical base URL: `[REQUIRED: production URL]`
- JSON-LD MUST contain only verified Person/profile data.
- Route-specific generated HTML MUST be validated without executing JavaScript.

## Truth and placeholders

Use exact markers: `[REQUIRED: exact measurable result]`, `[REQUIRED: public repository URL]`, `[REQUIRED: personal contribution]`, `[REQUIRED: live environment URL]`, `[REQUIRED: approved screenshot or asset]`, `[REQUIRED: source/evidence for claim]`, `[CONFIDENTIAL: approved public wording]`.

`[REQUIRED: …]` markers are allowed in documentation and explicitly labeled development fixtures. They MUST NOT appear in public content, metadata, generated JSON-LD, production assets, or the production bundle; content validation MUST fail the production build if they do.

Never invent metrics, users, revenue, employers, clients, dates, production usage, architecture, or outcomes. An agent encountering an unknown fact MUST retain or add a precise `[REQUIRED: …]` marker. Source data MUST distinguish **FACT**, **DECISION**, **PROPOSAL**, and **PLACEHOLDER**. Private source is labeled private. Remove PII, credentials, customer/tenant data, transaction records, proprietary algorithms, sensitive strategy logic, and government payloads. Synthetic data is identified.

## Input required from Guilherme

- Résumé file/URL when complete. **FACT (received):** professional title, short
  bio, time-zone wording, availability, current résumé status (in preparation),
  Contact location `Brazil`, manifesto/CTA, email, LinkedIn, and GitHub.
- Canonical domain. **FACT (received):** GitHub profile
  `https://github.com/GuilhermeFortuna`, WakaTime profile
  `https://wakatime.com/@GuilhermeFortuna`, LinkedIn profile
  `https://www.linkedin.com/in/guilherme-fortuna-dos-santos/`, and email
  `guilhermefortuna1000@gmail.com`.
- Per project: dates, role, contribution, verified stack/architecture, challenges, evidence/results, source/live status, confidentiality, approved media.
- Staging/live URLs for Aegis and Nexo Dental (gosigapp: no live UI; Quant: native desktop app, live-environment control omitted). **DECISION:** private source; Aegis/Nexo staging links planned, not ready yet.
- Social image, analytics consent choice, license, and portfolio-source visibility.
