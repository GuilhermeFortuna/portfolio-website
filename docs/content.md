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
- Support: `Software developer creating intelligent products, complex systems, and experiences that generate leverage.`
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

**DECISION (2026-07-28):** Project repositories are private and will not be linked publicly. Staging/live environment links are planned for Aegis, Q, and Nexo Dental when those environments exist; gosigapp has no UI (CLI/backend only) and will not receive a live-environment action. Until staging URLs are verified, keep `[REQUIRED: live environment URL]` markers.

**DECISION (2026-07-31):** On a case-study page whose live environment is still unverified, the live-environment action renders as a visibly disabled, non-interactive control reading `Live environment — coming soon` (`aria-disabled="true"`, no `href`). It must never render a `[REQUIRED: …]` marker as visible text. Applies to Aegis now; extend to Q and Nexo Dental when those case studies are built.

## Aegis case study

**Status:** accepted facts from WO-018, with the WO-020 content contract drafted.
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

All three are stated in the published copy rather than glossed over; see the
`Delivered` section of the content contract.

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

## Metadata

The validated route metadata registry is shared by the client router and the static route-shell generator. Every route requires a unique title, description, canonical URL, `og:url`, `og:title`, and `og:description`. An approved project-specific social image SHOULD be used; routes without one use the approved global 1200×630 default.

| Route | Proposed title | Proposed description |
|---|---|---|
| `/` | `Guilherme — Software Developer | AI, Product, Data & Infrastructure` | `A cinematic engineering portfolio featuring fraud intelligence, quantitative systems, government integration, and AI-first product development.` |
| `/process` | `Engineering Process — Guilherme` | `How I move from difficult ideas through architecture, AI-agent execution, implementation, testing, and deployment.` |
| `/about` | `About Guilherme — Software Developer` | `A product-minded software developer working across interfaces, architecture, data, automation, and infrastructure.` |
| `/work/aegis` | `Aegis — Fraud Intelligence Case Study` | `Fraud intelligence and investigation software for the iGaming industry, presented through verified engineering decisions and evidence.` |
| `/work/q` | `Q — Quantitative Research and Execution` | `A quantitative research and execution system covering backtesting, optimization, data pipelines, and execution architecture.` |
| `/work/gosigapp` | `gosigapp — Reliable SIGAP Submission Pipeline` | `A Go backend pipeline for file validation, processing, retries, auditability, and submission to SIGAP.` |
| `/work/nexo-dental` | `Nexo Dental — AI-First Clinic Software` | `An AI-first, multi-tenant product for dental clinics spanning workflows, CRM, operations, and premium interface engineering.` |
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
- Staging/live URLs for Aegis, Q, and Nexo Dental (gosigapp: no live UI). **DECISION:** private source; three staging links planned, not ready yet.
- Social image, analytics consent choice, license, and portfolio-source visibility.
