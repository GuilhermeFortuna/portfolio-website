# Aegis — Case-Study Content Contract

**Work Order:** WO-020. **State on handoff:** `REVIEW`.
**Evidence register (authoritative for claims):**
[`aegis-case-study-evidence.md`](./aegis-case-study-evidence.md).
**Media inventory (authoritative for assets):**
[`aegis-case-study-media.md`](./aegis-case-study-media.md).
**Consumers:** WO-021 builds the route shell from this file; WO-022 renders this
copy verbatim. WO-021/WO-022 must not reword visible copy without a new gate.

## How to read this file

Each numbered section below is one section of the `/work/aegis` page, in the
fixed order WO-020 requires. Every section gives:

- **Heading** — the exact visible heading string.
- **Visible copy** — the exact rendered prose. Copy it verbatim.
- **Media** — the asset filename from `public/work/aegis/`, its alt text or an
  explicit decorative decision, and any visible caption.
- **Author note** — not rendered. Cites the WO-018 claim IDs backing each
  technical claim, plus wording limits.

Visible prose is delimited by `<!-- copy:start … -->` / `<!-- copy:end -->` HTML
comments so the word budget is machine-countable (see
[Verification](#verification)). Those comments are invisible when rendered and
must not be carried into route code.

**Author notes and `[REQUIRED: …]` markers must never reach rendered output,
metadata, JSON-LD, generated assets, or the production bundle.**

---

## 1. Hero

**Heading (h1):**

<!-- copy:start id=hero-title -->
Aegis
<!-- copy:end -->

**Deck (visible, directly under the h1):**

<!-- copy:start id=hero-deck -->
I designed and built a production platform that turns fragmented fraud signals
into explainable investigations.
<!-- copy:end -->

**Meta list** — four label/value pairs, rendered as a definition list:

<!-- copy:start id=hero-meta -->
Role
Software Developer
Period
April 2026–present
State
Deployed to production
Source
Private
<!-- copy:end -->

**Support copy (50 words, limit 55):**

<!-- copy:start id=hero-support limit=55 -->
For a Brazilian betting operator, I owned the product end to end—with AI
assistance—from investigation workflows and explainable detection to the
frontend, API, data pipelines, security, deployment, and WebGL risk
visualization. Aegis gives analysts one place to move from a fraud signal to the
player history and evidence behind it.
<!-- copy:end -->

**Actions:**

<!-- copy:start id=hero-actions -->
Live environment — coming soon
<!-- copy:end -->

**Media:** `entry-intro-poster.webp`.

Alt text:

<!-- copy:start id=hero-media-alt render=alt-attribute-only -->
The Aegis wordmark in brushed metal beneath a glowing blue iris set into a dark
shield, lit by aurora curtains.
<!-- copy:end -->

**Author note.** Title and category label are the approved public strings
(OWN-01). Sector wording is fixed by OWN-02; the operator is never named
(CONF-01). Role string is exactly `Software Developer` per OWN-03 — do not
inflate. Period string is fixed by OWN-04. `Source: Private` implements DEC-01,
so no repository link appears anywhere on the page.

`State` reads `Deployed to production` — the owner shortened it from
`Deployed to production; last known to remain active` when approving this
contract on 2026-07-31. OWN-06's epistemic limit is therefore carried by the
first sentence of section 10 ("as far as I know, remains active"), which is the
only place the page qualifies the claim. WO-022 must render the hero value
exactly as written and must not restore the longer string, and must not drop or
weaken that sentence in section 10, or the page would assert current production
status flatly and drift into a monitored-uptime claim (UNSUP-06).
The investigation workflow and explainable detection ← WF-02, WF-03, SYS-08,
and SYS-10. Frontend, API, pipelines, security, deployment, and WebGL ownership
← SYS-01, SYS-02, SYS-06, SYS-07, SYS-12, SYS-14, and WF-07. "with AI
assistance" ← OWN-05: AI assisted my work, it did not build the product, and no
team is implied (UNSUP-08).

The single hero action is a **visibly disabled, non-interactive** control per
the owner's 2026-07-31 decision recorded in the WO-STATUS Gate Log, which
extends DEC-02. It must render with `aria-disabled="true"` and no `href`, and
it must never contain a `[REQUIRED: …]` marker. When a staging URL is verified,
this control becomes a real link and DEC-02 is closed. The documentation-only
`[REQUIRED: live environment URL]` marker stays in `content.md`.

Hero media is the poster still, not the video. The intro plays in section 8,
where its pipeline is explained, because WO-020 step 4 requires the intro to be
introduced rather than autoplayed at a visitor who has no context for it.

---

## 2. Context

**Heading (h2):**

<!-- copy:start id=context-heading -->
Real system. Synthetic evidence.
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=context-body -->
Aegis was built for an unnamed betting company in the Brazilian iGaming sector.
The product, architecture, and engineering decisions are real; company names,
internal identifiers, environment details, and production data stay private.

Every interface shown here runs on 25,000 fabricated profiles seeded locally and
connected to no company system. The people, documents, transactions, and
findings are synthetic—not production data or client outcomes.
<!-- copy:end -->

**Media:** none.

**Author note.** Sector and anonymity ← OWN-02 and CONF-01. The synthetic-data
statement ← DEC-03 and SYS-13; the 25,000 figure is the seeded demo count
recorded in `aegis-case-study-media.md`, which is a property of the local demo
seed and **not** a production data-volume claim (UNSUP-05, CONF-05). The final
sentence sets up the absence of metrics honestly and forecloses reader
inference of UNSUP-01 through UNSUP-09.

---

## 3. Problem

**Heading (h2):**

<!-- copy:start id=problem-heading -->
Fraud investigations started as data reconstruction
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=problem-body -->
Fraud signals lived across systems built for different purposes. Identity and
account data sat in the operational database, while deposits, withdrawals, bets,
balances, and gameplay events accumulated in the analytical lakehouse.
Investigating one suspicious account meant rebuilding its story by hand across
both.

The job was to make behaviour, relationships, and a player's history investigable
in one place without collapsing the answer into an unexplained score. Every
finding had to show which rule fired and the evidence that triggered it.
<!-- copy:end -->

**Media:** none.

**Author note.** No technology is named in this section, per the WO-020 rule
that the problem precedes the stack. The operational/analytical split is SYS-03
and SYS-04. "which rule fired" and "the evidence that triggered it" ← SYS-08
and SYS-10; this is a rule engine, never described as machine learning.
"rebuilding its story by hand" describes the owner-stated problem, not a
measured investigation-speed claim (UNSUP-03).

---

## 4. System overview

**Heading (h2):**

<!-- copy:start id=system-heading -->
A separate product built around investigative reads
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=system-body -->
Aegis separates investigation work from its analytical source: a static React
application talks to a read-focused FastAPI service, and that service reads a
curated PostgreSQL schema instead of querying the lakehouse on every request.
The boundary gives the product a predictable read path and isolates access to
sensitive evidence.

Scheduled jobs synchronize profiles, wallets, transactions, hourly balances,
and visualization data from Databricks into PostgreSQL, then chain that sync into
detection scans each hour. Redis is an optional first read for selected data;
jobs write the cache and the interface only reads it.
<!-- copy:end -->

**Media:** `overview.webp`.

Alt text:

<!-- copy:start id=system-media-alt render=alt-attribute-only -->
The Aegis overview screen: a dark console with a Portuguese sidebar, a risk
summary counting 25,000 analysed players and 97 with a signal, and a field of
faint points with an amber cluster.
<!-- copy:end -->

Caption:

<!-- copy:start id=system-media-caption -->
The product overview running on synthetic data. The interface is shown in
Portuguese.
<!-- copy:end -->

**Author note.** SPA/static-bundle boundary ← SYS-01 (no Node server or BFF at
runtime — do not imply one). Read-focused API ← SYS-02. Curated Postgres schema
← SYS-03. Databricks as analytical source ← SYS-04. Sync job contents ← SYS-06.
Hourly sync-then-scan pipeline ← SYS-07; described as a configured cadence, not
a monitored SLA. Redis cache-first reads with job-owned writes ← SYS-05.
The deployment platform is intentionally omitted from the visible system copy;
SYS-14 remains available for the contribution claim without exposing project
IDs, regions, hostnames, or staging URLs (CONF-02, CONF-03).

Alt text describes only what is in the pixels. The panel reads
`TOTAL ANALISADOS 25.000` and `COM SINAL 97`; the caption states the Portuguese
locale so WO-022 does not invent English UI labels that the screenshot does not
contain (`aegis-case-study-media.md`, "Limitations for WO-020").

---

## 5. Decision 1

**Heading (h2):**

<!-- copy:start id=decision-1-heading -->
01 — Separate the product and its security boundary
<!-- copy:end -->

**Visible copy (93 words, limit 140):**

<!-- copy:start id=decision-1-body limit=140 -->
The shortest path was to add fraud screens to a system that already existed. I
built Aegis as a separate product instead, with its own schema, API, deployment,
and release cycle.

My reasoning was blast radius and pace. Fraud workflows change as new patterns
emerge, while the documents and transaction evidence behind them require a
narrower authorization model than most internal users should inherit.

The cost is explicit ownership: sessions, CSRF protection, multi-factor
authentication, Argon2 hashing, permissions, scoped job credentials, and
security auditing. The API enforces that boundary as the single authorization
authority.
<!-- copy:end -->

**Media:** none.

**Author note.** Standalone boundary ← SYS-01 and SYS-02. The security
inventory ← SYS-12, listing only mechanisms verified in source. "the only
authorization authority" ← SYS-12 plus GAP-01, and it is deliberately the same
phrasing used in section 10 so the browser-side login gap is not contradicted.
The alternative ("a system that already existed") is described without naming
any internal system (CONF-01). The rationale is first person and presented as a
judgement with an explicit ownership cost, not as a universal best practice.

---

## 6. Decision 2

**Heading (h2):**

<!-- copy:start id=decision-2-heading -->
02 — Curate investigation data instead of querying the lakehouse live
<!-- copy:end -->

**Visible copy (104 words, limit 140):**

<!-- copy:start id=decision-2-body limit=140 -->
The event data lives in the lakehouse. Querying it directly from the interface
would have been the shortest line to a working dashboard, but it would also
attach every step through a player timeline to warehouse latency and billing.

The data path therefore splits. Scheduled jobs copy what the product needs into
its curated PostgreSQL schema, an hourly pipeline chains synchronization into
detection scans, and Redis holds selected first reads. Jobs write the cache; the
interface never does.

The trade-off is deliberate: Aegis reads recent data, not live data. For
behavioural patterns that develop across hours and days, that was the better
product boundary.
<!-- copy:end -->

**Media:** none.

**Author note.** Databricks as the event source ← SYS-04. Sync jobs and cadence
← SYS-06. Hourly sync-then-scan ← SYS-07. Cache-first reads with job-owned
writes and no TTL on job-managed keys ← SYS-05. "recent data, not live data" is
the deliberate honest inverse of the forbidden term `real-time`, and it is
consistent with the batch pipeline in SYS-06/SYS-07. Warehouse cost and latency
are given as my design reasoning, not as a measured benchmark — no figure is
claimed (UNSUP-03, UNSUP-05).

---

## 7. Decision 3

**Heading (h2):**

<!-- copy:start id=decision-3-heading -->
03 — Build for investigation, not monitoring
<!-- copy:end -->

**Visible copy (120 words, limit 140):**

<!-- copy:start id=decision-3-body limit=140 -->
A dashboard can show that a number is high; an investigation tool has to explain
why. Aegis follows the analyst's path from a triage queue grouped by rule to a
player view that brings profile, balances, transactions, gameplay, open findings,
and generated reports together.

Every finding carries its rule, category, confidence level, and triggering
evidence. Rules run in shadow mode by default and are promoted to live
deliberately. A browser-local worklist keeps findings an analyst is reviewing;
it is not a backend case-management system.

The Risk Constellation draws the scored player population as a GPU point field.
Colour and brightness encode risk while position separates the general
population from flagged players, giving analysts another way to inspect clusters
and outliers.
<!-- copy:end -->

**Media:** `player-investigation.webp`, then `risk-constellation.webp`.

`player-investigation.webp` alt text:

<!-- copy:start id=decision-3-media-a-alt render=alt-attribute-only -->
A player investigation screen showing a monitored player's balances and deposit
totals, a risk score of 35 rated high confidence, tags for the rules that
fired, and an expanded deposit-structuring finding listing the deposit counts
and amounts that triggered it.
<!-- copy:end -->

`player-investigation.webp` caption:

<!-- copy:start id=decision-3-media-a-caption -->
A player investigation opened to the evidence behind a finding. All values,
including document numbers, are synthetic.
<!-- copy:end -->

`risk-constellation.webp` alt text:

<!-- copy:start id=decision-3-media-b-alt render=alt-attribute-only -->
The Risk Constellation: a wide, dark field of thousands of faint points with a
bright amber cluster, beside a panel breaking 25,000 analysed players into
critical, high, medium, low, and no-signal tiers.
<!-- copy:end -->

`risk-constellation.webp` caption:

<!-- copy:start id=decision-3-media-b-caption -->
The Risk Constellation visualizing 25,000 synthetic players through position,
colour, and brightness.
<!-- copy:end -->

**Author note.** Triage queue ← WF-03. Player view contents ← WF-02. Generated
reports ← WF-05 and SYS-10. Finding metadata (rule, category, confidence,
evidence fields) ← SYS-08 and SYS-10. Shadow default and promotion ← SYS-09.
The browser-local worklist and explicit non-case-management boundary ← WF-04.
Risk Constellation ← WF-07: state the GPU point field, never "millions of
particles" (GAP-04) — the tested envelope is stated in section 10 instead.
"scored player base" ← SYS-10; scoring weights are configurable defaults, so no
accuracy, precision, or false-positive claim appears anywhere (UNSUP-07).

The caption's positional explanation paraphrases the legend visible in the
screenshot itself ("Cor e brilho indicam risco; posição separa população geral
e alertas"), so it describes the capture rather than adding a claim.

**Open flag for WO-022 (documentation only, not visible copy).**
`player-investigation.webp` displays a synthetic full name and a synthetic
CPF-formatted number in legible type. Both are generated by the demo seed and
are accepted by the WO-019 confidentiality scan, but a visitor cannot tell
synthetic from real by looking. The caption above states it in words; if the
owner prefers, WO-022 may additionally mask the document field. That is a media
change, so it would require a new WO-019 gate.

---

## 8. Decision 4

**Heading (h2):**

<!-- copy:start id=decision-4-heading -->
04 — Give the product identity without blocking the work
<!-- copy:end -->

**Visible copy (102 words, limit 140):**

<!-- copy:start id=decision-4-body limit=140 -->
I treated the internal product as a designed instrument, not a collection of
utility screens. The shield-and-iris emblem, dark interface, and cinematic entry
sequence give Aegis a coherent identity across the first frame and the
investigation workspace.

I modelled and animated the emblem in Blender, exported it as FBX, assembled and
lit the scene in Unreal Engine 5, rendered a 4K image sequence, and finished the
film in DaVinci Resolve.

The production craft does not block the product. The sequence plays once per
session and fails open: if the media stalls, cannot play, or the user reduces
motion, the console appears immediately.
<!-- copy:end -->

**Media:** `entry-intro.mp4`, with `entry-intro-poster.webp` as its poster.

**Descriptive title (visible, rendered above the player):**

<!-- copy:start id=decision-4-media-title -->
The Aegis entry sequence — 9 seconds, silent
<!-- copy:end -->

**Summary and transcript (visible, rendered adjacent to the player).** The film
has no speech, narration, or audio track, so this describes the visuals in
order:

<!-- copy:start id=decision-4-media-transcript -->
The film opens almost black. A small blue iris, ringed by concentric dashed
segments, glows at the centre of a dark shield-shaped dome while faint aurora
curtains drift behind it. The iris brightens and its rings pull into focus. The
Aegis wordmark rises in brushed metal, the words "fraud intelligence" set smaller
beneath it, reflected in the floor. The wordmark dissolves as the camera settles
on the emblem, wreathed in light and drifting dust, and the aurora fades to
black. There is no sound.
<!-- copy:end -->

Video `aria-label` (screen readers; the transcript above carries the detail):

<!-- copy:start id=decision-4-media-alt render=aria-label-only -->
Silent nine-second title sequence for Aegis, described in the accompanying
transcript.
<!-- copy:end -->

**Author note.** The pipeline sentence must match OWN-08 exactly in substance:
Blender model and animation → FBX → Unreal Engine 5 scene, lighting, aurora,
dust, render → 4K image sequence → DaVinci Resolve finish. Once-per-session
playback and the fail-open timeout with a reduced-motion-safe fallback ←
WF-10. The asset is the optimized 1920×1080 copy required by DEC-04; the 4K
master is never shipped. "4K image sequence" describes the render stage of my
own pipeline (OWN-08) and is not a claim about the delivered file.

Duration: the asset is 8.625 s (`aegis-case-study-media.md`), so "9 seconds" is
the rounded visible wording. WO-022 may say `8.6 seconds` instead, but must not
round up beyond 9.

The transcript was written from frames sampled across the delivered
`entry-intro.mp4` at roughly 0.0, 1.0, 2.5, 4.0, 5.5, 7.0, and 8.3 seconds. The
subtitle in the pixels reads `FRAUD INTELLIGENCE`; do not substitute any other
tagline (`aegis-case-study-media.md`, "Limitations for WO-020"). Rendering
requirements: muted, `playsInline`, `preload="metadata"`, poster shown until
play, never autoplaying under `prefers-reduced-motion: reduce`, and a visible
pause or play control.

`preload` was corrected from `none` to `metadata` on 2026-07-31 by owner
decision, resolving the conflict with WO-021 step 4 in favour of the value
WO-021 fixes. The poster is always specified, so playback stays poster-first
either way; see the WO-STATUS Gate Log.

---

## 9. Contribution

**Heading (h2):**

<!-- copy:start id=contribution-heading -->
What I owned
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=contribution-body -->
I owned Aegis across four connected areas: product and interaction design; the
React application, FastAPI service, authentication, and permissions; the
PostgreSQL model, lakehouse synchronization, hourly pipeline, detection rules,
scoring, and reports; and testing, deployment, the WebGL Risk Constellation, and
the identity film.

AI accelerated scaffolding, refactoring, test generation, and review. The
architecture, implementation, validation, trade-offs, and final product decisions
remained my responsibility.
<!-- copy:end -->

**Media:** none.

**Author note.** End-to-end ownership with AI assistance ← OWN-05, corroborated
by GIT-03, which the owner closed on 2026-07-31 by confirming that the frontend
git authors "WO5 Bootstrap" and "WO5 Extract" are tooling identities rather
than additional contributors (WO-STATUS Gate Log). The listed layers each map
to a verified claim: SYS-01, SYS-02, SYS-03, SYS-06, SYS-07, SYS-08, SYS-10,
SYS-12, WF-07, SYS-15, SYS-16, SYS-14, OWN-08. No team, headcount, or
leadership claim appears (UNSUP-08). The second paragraph is required by the
WO-020 rule that AI must be shown assisting my work, never building the product
independently.

---

## 10. Delivered

**Heading (h2):**

<!-- copy:start id=delivered-heading -->
What shipped—and what remains limited
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=delivered-body -->
Aegis was deployed to production and, as far as I know, remains active. Client
business metrics were not available for publication, so this case study reports
the product and engineering scope I can verify—not unverified business outcomes.

In the sanitized portfolio edition, shipped and working scope includes eight
configurable rules across payment, gameplay, identity, and impact categories;
shadow and live execution; scoring and explainable findings; alert triage,
player investigation, a browser-local findings worklist, rule administration,
geographic analysis, the Risk Constellation, security auditing, and reports
exported as HTML, Markdown, or PDF.

Three limits are worth stating plainly. The browser-side login remains a shell,
so the API is the sole authorization authority. The end-to-end browser suite is
written but skipped; the backend suite has 67 test files. The Risk Constellation
is proven to a few hundred thousand points, not millions.
<!-- copy:end -->

**Media:** `alerts.webp`.

Alt text:

<!-- copy:start id=delivered-media-alt render=alt-attribute-only -->
The alerts triage queue, grouped by rule: duplicate document, incomplete
identity checks, deposit structuring, promotional-credit volume, and two
operator-impact rules, each with its rule code, category, alert count, and
maximum score, next to an empty evidence panel inviting the analyst to select
an alert.
<!-- copy:end -->

Caption:

<!-- copy:start id=delivered-media-caption -->
The triage queue over synthetic findings. Selecting an alert opens its evidence
panel, which is empty in this capture.
<!-- copy:end -->

**Author note.** Production delivery ← OWN-06, worded as owner knowledge. The
opening paragraph discharges the WO-020 requirement to report delivery without
inventing business impact and closes off UNSUP-01 through UNSUP-09; the heading
describes shipped scope and limits, never `Impact`. Capability list mapping:
eight rules and four
categories ← SYS-08; thresholds/shadow-live/promotion ← SYS-09 and WF-06;
scoring ← SYS-10; report formats ← SYS-10 (HTML, Markdown, and PDF confirmed in
`reporting.py`); overview ← WF-01; player investigation ← WF-02; alerts queue ←
WF-03; rule configuration ← WF-06; Risk Constellation ← WF-07; geographic
distribution ← WF-08; admin and security audit ← WF-09. The synthetic dataset is
established in section 2 from SYS-13.

`browser-local findings worklist` resolves WF-04, which WO-018 left open. Source inspection
on 2026-07-31 found the cases route reads and writes the browser
`localStorage` key `aegis:cases`, populated from the alerts queue, with no
backend cases table or router; triage status changes and report generation do go
through the API. "browser-local findings worklist" is therefore accurate, and
the page explicitly states that it is not a backend case-management system.

Known limits ← GAP-01, GAP-02, GAP-04, and SYS-15 for the 67 test files.
"a few hundred thousand points" reflects the ≤350,000 tested envelope in WF-07
and GAP-04 without publishing an exact cap that reads as a performance claim.
`67 test files` is stated as coverage of code paths, not proof of correctness
(SYS-15), and no accuracy or reliability figure appears (UNSUP-06, UNSUP-07).

Alt text names only rule meanings legible in the capture and avoids inventing
English labels for Portuguese UI strings. The empty evidence panel is disclosed
in the caption because `aegis-case-study-media.md` flags it as a limitation.

---

## 11. Technology in context

**Heading (h2):**

<!-- copy:start id=technology-heading -->
Technology in service of the product
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=technology-body -->
React, Vite, and React Router deliver the single-page interface; FastAPI exposes
the read-focused API; PostgreSQL owns the investigative model; Databricks remains
the analytical source; and Redis supports selected cache-first reads. Opaque
sessions, Argon2, TOTP, CSRF protection, and API-enforced permissions form the
security boundary.

Three.js and a Web Worker point decoder power the Risk Constellation; deck.gl
and MapLibre support geographic analysis; WeasyPrint produces reports; pytest
and Jest exercise backend and frontend code paths; and Blender, Unreal Engine 5,
and DaVinci Resolve form the identity-film pipeline.
<!-- copy:end -->

**Media:** none.

**Author note.** React/Vite/React Router ← SYS-01. FastAPI ← SYS-02. Postgres ←
SYS-03. Databricks ← SYS-04. Redis ← SYS-05. Argon2, TOTP, opaque sessions ←
SYS-12. Three.js and the Web Worker decode ← WF-07, confirmed on 2026-07-31 in
`src/features/risk-constellation/scene/` (`three`, `UnrealBloomPass`,
`OrbitControls`, a colour-encoded picking pass) and `data/points.worker.ts`.
deck.gl and MapLibre ← WF-08, confirmed as `@deck.gl/core`, `@deck.gl/layers`,
`@deck.gl/react`, and `maplibre-gl` in `aegis-front/package.json`. WeasyPrint ←
SYS-10. pytest and Jest ← SYS-15 and SYS-16.

The grouped wording keeps the stack tied to product responsibilities rather than
turning the section into an unstructured technology inventory. No version
numbers are published, and test tooling is not presented as proof of correctness.

---

## 12. Confidentiality note and actions

**Heading (h2):**

<!-- copy:start id=confidentiality-heading -->
Private by design, open to discussion
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=confidentiality-body -->
The source remains private, and the portfolio edition is a sanitized evolution I
maintain independently—not a mirror of the production environment. I can discuss
the architecture, trade-offs, and ownership in greater depth without exposing
the operator, its systems, or its data.
<!-- copy:end -->

**Actions** — exactly two, in this order:

<!-- copy:start id=confidentiality-actions -->
Back to selected work
Discuss Aegis
<!-- copy:end -->

**Media:** none.

**Author note.** The confidentiality details are established once in section 2
rather than repeated here (CONF-01 through CONF-04; DEC-03). Private repository
← DEC-01. The sanitized-evolution sentence is required by OWN-07 so no reader
concludes the public version is byte-identical to production.

Action targets: `Back to selected work` → `/#work`; `Discuss Aegis` → `/#contact`.
Both are internal same-origin links, matching the approved homepage section
anchors. No live-environment, résumé, or repository action appears here — the
disabled live-environment control belongs to the hero only (DEC-01, DEC-02).

---

## Media-to-section mapping

| Asset | Section | Role | Accessible text |
| --- | --- | --- | --- |
| `entry-intro-poster.webp` | 1. Hero | Hero still | `alt` from `hero-media-alt` |
| `overview.webp` | 4. System overview | Figure + caption | `alt` from `system-media-alt` |
| `player-investigation.webp` | 7. Decision 3 | First figure + caption | `alt` from `decision-3-media-a-alt` |
| `risk-constellation.webp` | 7. Decision 3 | Second figure + caption | `alt` from `decision-3-media-b-alt` |
| `entry-intro.mp4` | 8. Decision 4 | Video, poster `entry-intro-poster.webp` | Visible title + transcript; `aria-label` from `decision-4-media-alt` |
| `alerts.webp` | 10. Delivered | Figure + caption | `alt` from `delivered-media-alt` |

All six WO-019 assets are used exactly once, except
`entry-intro-poster.webp`, which is used twice by design: as the hero still and
as the `poster` attribute of the video in section 8. No asset outside
`public/work/aegis/` is introduced.

`overview.webp` and `risk-constellation.webp` are visually similar, because
both include the risk-summary panel. They are assigned to different sections
and different captions on purpose: section 4 uses the overview to show the
console in one piece, section 7 uses the dedicated surface to show the point
field at full width. If a reviewer finds the pair redundant on the rendered
page, drop `overview.webp` from section 4 rather than duplicating a caption.

## Forbidden-language review

| Term | Status in this file |
| --- | --- |
| `production-ready` | Not used. Sections 1 and 10 say `deployed to production` instead (OWN-06). |
| `revolutionary` | Not used. |
| `state-of-the-art` | Not used. |
| `enterprise-grade` | Not used. |
| `real-time` | Not used. Section 6 says `recent data, not live data`, which is the accurate description of a batch pipeline (SYS-06, SYS-07). |
| `high-volume` | Not used in visible copy. SYS-04's register wording permits it, but the batch design is described concretely instead, so no reader infers a production volume (UNSUP-05). |
| `Impact` as a delivery word | Not used that way. Section 10 is headed `What shipped—and what remains limited`. The word `impact` appears only as the name of a real rule category (`IMPACT-001`, `IMPACT-002` in SYS-08). |
| `revenue`, `money saved`, `fraud reduction`, `client satisfaction` | Not used in visible copy. Section 10 states that only verified product and engineering scope is reported. The operator-loss rule is referred to by its category rather than by expanding `GGR`. |

## Claim-by-claim reconciliation

Every visible sentence traces to an accepted register row. Claims used:
OWN-01, OWN-02, OWN-03, OWN-04, OWN-05, OWN-06, OWN-07, OWN-08, GIT-03,
SYS-01, SYS-02, SYS-03, SYS-04, SYS-05, SYS-06, SYS-07, SYS-08, SYS-09,
SYS-10, SYS-12, SYS-13, SYS-14, SYS-15, SYS-16, WF-01, WF-02, WF-03, WF-04,
WF-05, WF-06, WF-07, WF-08, WF-09, WF-10, GAP-01, GAP-02, GAP-04, DEC-01,
DEC-02, DEC-03, DEC-04, CONF-01, CONF-02, CONF-03, CONF-04.

Deliberately **not** used in visible copy:

| Claim | Why it is absent |
| --- | --- |
| GIT-01, GIT-02 | Commit dates and counts are activity, not achievement. The period comes from OWN-04 instead. |
| SYS-11 | The owner ruled on 2026-07-31 that regulatory framing stays generic. It is therefore omitted rather than softened, since no section needed it to make sense. See the note below. |
| GAP-03 | Placeholder analyst attribution is an internal detail with no bearing on any published claim. |
| CONF-05 | The ~4.5M design figure is confidential and is never referenced, directly or by implication. |
| UNSUP-01 … UNSUP-09 | Prohibited. Section 10 states outright that unverified business outcomes are excluded. |

**Regulatory framing (SYS-11).** The owner's 2026-07-31 decision allows generic
mention of Brazilian anti-money-laundering obligations without naming SPA/MF
Portaria 1.143/2024 or SISCOAF, and forbids any claim of certification or
approval. The copy above contains no regulatory sentence at all, which is
within that decision. Reviewers should note one residual tension: the token
`SISCOAF` is legible in `player-investigation.webp` (as
`1 candidatos SISCOAF`), and `COAF` appears as a filter in `alerts.webp`. The
prose neither names nor explains those tokens. That is acceptable — they are
public regulator names, not confidential identifiers, and no compliance claim
is made — but if the owner would rather the page not surface them at all, the
fix is a media change under WO-019, not a copy change.

## Unresolved documentation-only markers

One marker remains, in `content.md` only, and it is not part of any visible
string:

- `[REQUIRED: live environment URL]` — DEC-02. The hero renders a visibly
  disabled `Live environment — coming soon` control per the owner's 2026-07-31
  decision. The marker closes when a staging URL is verified.

Two global markers in `content.md` are outside WO-020's scope and unchanged:
`[REQUIRED: 1200×630 approved social image]` and `[REQUIRED: production URL]`.
Both belong to site-wide metadata, not the Aegis chapter.

**No `[REQUIRED: …]` marker appears in any `copy:start` block in this file.**

## Verification

**Recorded result, re-measured for the hiring-focused rewrite (2026-08-04).** All
visible strings: **1,294 words**. Prose only, excluding headings, the hero meta
list, action labels, and the video title: **1,173 words**. Hero support 50 (limit
55); decision bodies 93, 104, 120, and 102 (limit 140 each). No block exceeds its
limit. 41 delimiter pairs balanced; 40 identified copy blocks. A scan of every
copy block found 0 occurrences of the forbidden terms and 0 `[REQUIRED:` or
`[CONFIDENTIAL:` markers, and all required copy facts present. Alt text and
`aria-label` strings are excluded from both totals because they are not visible
prose; they are listed separately by the script.

Word budget, counted over `copy:start` / `copy:end` blocks only:

```bash
python3 - <<'PY'
import re, pathlib
src = pathlib.Path("docs/aegis-case-study-content.md").read_text()
src = src.split("## Verification")[0]   # ignore this snippet's own example
blocks = re.findall(r"<!-- copy:start ([^>]*?)-->(.*?)<!-- copy:end -->", src, re.S)
CHROME = {"hero-title", "hero-deck", "hero-meta", "hero-actions",
          "confidentiality-actions", "decision-4-media-title"}
total = prose = 0
for meta, body in blocks:
    ident = re.search(r"id=(\S+)", meta)
    if not ident:              # prose that merely mentions the delimiters
        continue
    bid = ident.group(1)
    limit = re.search(r"limit=(\d+)", meta)
    words = len(body.split())
    if "render=" in meta:      # alt text / aria-label: not visible prose
        continue
    total += words
    if not (bid in CHROME or bid.endswith("-heading")):
        prose += words
    flag = " OVER LIMIT" if limit and words > int(limit.group(1)) else ""
    print(f"{bid:34} {words:5}{flag}")
print(f"{'ALL VISIBLE STRINGS':34} {total:5}")
print(f"{'PROSE ONLY (no headings/labels)':34} {prose:5}  (target 900-1400)")
PY
```

Documentation checks required by WO-020:

```bash
git diff --check
rg -n "Software Developer|April 2026|Brazilian iGaming|production|AI assistance" \
  docs/aegis-case-study-content.md docs/content.md
rg -n "revolutionary|state-of-the-art|enterprise-grade|fraud reduction|revenue|money saved|client satisfaction" \
  docs/aegis-case-study-content.md
rg -n "\[REQUIRED:" docs/aegis-case-study-content.md docs/content.md
```

## What WO-021 and WO-022 consume

```text
docs/aegis-case-study-content.md   # this file: exact copy, media placement, a11y text
docs/aegis-case-study-media.md     # asset inventory and hashes
docs/aegis-case-study-evidence.md  # claim register; the boundary on any new sentence
docs/content.md                    # Aegis chapter and route metadata
public/work/aegis/                 # the six approved assets
```

Structural requirements WO-021/WO-022 must honour:

1. Sections render in the order 1–12 above. Do not reorder or merge.
2. One `h1` (`Aegis`); every section heading is an `h2`.
3. Copy is rendered verbatim. Rewording needs a new WO-020 gate.
4. Author notes, `copy:*` comments, and claim IDs never reach the DOM.
5. The hero live-environment control is non-interactive and `aria-disabled`.
6. The intro video never autoplays under `prefers-reduced-motion: reduce`, and
   its visible transcript is present whether or not the video plays.
7. Every figure has either the `alt` text above or, if a reviewer reclassifies
   it as decorative, `alt=""` with the caption retained.
