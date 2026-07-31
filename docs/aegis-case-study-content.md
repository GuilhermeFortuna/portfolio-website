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
Fraud intelligence for the Brazilian iGaming industry
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

**Support copy (51 words, limit 55):**

<!-- copy:start id=hero-support limit=55 -->
Aegis is a fraud-intelligence console built for a betting operator in the
Brazilian iGaming sector. It turns scattered operational and analytical data
into something an analyst can investigate: scored players, explainable rule
findings, and a visual field of an entire player base. I designed and built
every layer, with AI assistance.
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
"scored players" ← SYS-10; "explainable rule findings" ← SYS-08; "a visual
field of an entire player base" ← WF-07. "with AI assistance" ← OWN-05: AI
assisted my work, it did not build the product, and no team is implied
(UNSUP-08).

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
The context
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=context-body -->
Aegis was built for a betting company in the Brazilian iGaming sector. I am not
naming the operator, and nothing here comes from its production environment.
Every screenshot comes from the project's own synthetic data: 25,000 fabricated
profiles, seeded locally, connected to no company system.

So this page shows the engineering and the product decisions, not the operator's
data, its system names, or outcomes it never shared.
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
The problem
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=problem-body -->
Fraud signals in an online betting operation do not sit in one place: identity
details live in the operational database, while deposits, withdrawals, bets, and
gameplay events accumulate in the analytical lakehouse. An analyst who suspects
one account is structuring deposits, or that several share a document, has to
rebuild that story by hand across systems never designed to answer the question.

The job was to make behaviour, relationships, and a player's history
investigable in one place, and every finding explainable: which rule fired, on
what evidence.
<!-- copy:end -->

**Media:** none.

**Author note.** No technology is named in this section, per the WO-020 rule
that the problem precedes the stack. The two example patterns are real
implemented rules, not invented scenarios: deposit structuring is `PAY-003` and
shared-document/duplicate-identity is `ACC-008`, both in SYS-08. The
operational/analytical split is SYS-03 and SYS-04. "explainable … which rule
fired and on what evidence" ← SYS-08 and SYS-10; this is a rule engine, never
described as machine learning.

---

## 4. System overview

**Heading (h2):**

<!-- copy:start id=system-heading -->
How the system fits together
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=system-body -->
Aegis is a standalone React single-page application, served as a static bundle,
talking directly to a read-focused FastAPI service. That service reads a curated
PostgreSQL schema instead of querying the lakehouse on every request. Scheduled
jobs pull profiles, wallets, deposits, withdrawals, hourly balances, and the
risk-constellation view out of a Databricks lakehouse into Postgres, then run
detection scans, chained hourly. An optional Redis cache fronts the busiest
reads: jobs write it, the interface only reads. Deployment targets Google Cloud:
serverless containers, managed Postgres, secret storage, scheduling, and
federated identity for CI.
<!-- copy:end -->

**Media:** `overview.webp`.

Alt text:

<!-- copy:start id=system-media-alt render=alt-attribute-only -->
The Aegis overview screen: a dark console with a Portuguese sidebar, a risk
summary panel counting 25,000 analysed players and 97 with a signal, and a
field of faint points with an amber cluster to the right.
<!-- copy:end -->

Caption:

<!-- copy:start id=system-media-caption -->
The overview on synthetic data. The product interface is in Portuguese.
<!-- copy:end -->

**Author note.** SPA/static-bundle boundary ← SYS-01 (no Node server or BFF at
runtime — do not imply one). Read-focused API ← SYS-02. Curated Postgres schema
← SYS-03. Databricks as analytical source ← SYS-04. Sync job contents ← SYS-06.
Hourly sync-then-scan pipeline ← SYS-07; described as a configured cadence, not
a monitored SLA. Redis cache-first reads with job-owned writes ← SYS-05.
Deployment platform ← SYS-14, generically, with **no** project ID, region,
hostname, or staging URL (CONF-02, CONF-03).

Alt text describes only what is in the pixels. The panel reads
`TOTAL ANALISADOS 25.000` and `COM SINAL 97`; the caption states the Portuguese
locale so WO-022 does not invent English UI labels that the screenshot does not
contain (`aegis-case-study-media.md`, "Limitations for WO-020").

---

## 5. Decision 1

**Heading (h2):**

<!-- copy:start id=decision-1-heading -->
Decision 1 — Keep Aegis a standalone product
<!-- copy:end -->

**Visible copy (115 words, limit 140):**

<!-- copy:start id=decision-1-body limit=140 -->
The obvious path was fraud screens inside a system that already existed. I built
Aegis as its own product instead, with its own schema, API, and deployment.

My reasoning was blast radius and pace. A fraud console changes quickly as new
patterns appear, and it needs its own authorization model, because analysts see
documents and transaction evidence most internal users should never see.
Coupling it to another system's release cycle and permissions would have made
both harder.

The cost is that Aegis owns what it would otherwise inherit: sessions, CSRF
protection, multi-factor authentication, Argon2 hashing, permissions, scoped job
credentials, and a security-audit log. All of it is enforced in the API, the only
authorization authority.
<!-- copy:end -->

**Media:** none.

**Author note.** Standalone boundary ← SYS-01 and SYS-02. The security
inventory ← SYS-12, listing only mechanisms verified in source. "the only
authorization authority" ← SYS-12 plus GAP-01, and it is deliberately the same
phrasing used in section 10 so the browser-side login gap is not contradicted.
The alternative ("a system that already existed") is described without naming
any internal system (CONF-01). The rationale is first person and presented as a
judgement with a stated cost, not as a universal best practice.

---

## 6. Decision 2

**Heading (h2):**

<!-- copy:start id=decision-2-heading -->
Decision 2 — Read from a curated store, not the lakehouse
<!-- copy:end -->

**Visible copy (115 words, limit 140):**

<!-- copy:start id=decision-2-body limit=140 -->
The event data lives in the lakehouse. Querying it straight from the interface
would have been the shortest line to a working dashboard, and the wrong one:
warehouse queries are billed, and slow enough that an analyst clicking through a
player timeline would feel every one.

So the data path splits. Scheduled jobs copy what the product needs into the
curated Postgres schema on a fixed cadence, an hourly pipeline chains that sync
into detection scans, and Redis holds what the interface reads first. Jobs write
the cache; the interface never does.

The trade-off, plainly: Aegis reads recent data, not live data. For behaviour
that unfolds over hours and days, that was the right exchange.
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
Decision 3 — Build for investigation, not for monitoring
<!-- copy:end -->

**Visible copy (122 words, limit 140):**

<!-- copy:start id=decision-3-body limit=140 -->
A dashboard tells you a number is high; an investigation tool has to tell you
why. So the interface follows the analyst's sequence: a triage queue grouped by
which rule fired, a player view holding profile, balances, transactions,
gameplay, and open findings on one screen, and generated reports for findings
that leave the tool.

Every finding carries its rule, category, confidence level, and the evidence
fields that triggered it. Rules run in shadow mode by default, recording what
they would have flagged, and are promoted to live deliberately.

The Risk Constellation is the part I would not cut. It draws the whole scored
player base as a GPU point field, so clusters and outliers surface before you
know what to look for.
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
A finding opened down to its evidence. Every value here, document number
included, is synthetic.
<!-- copy:end -->

`risk-constellation.webp` alt text:

<!-- copy:start id=decision-3-media-b-alt render=alt-attribute-only -->
The Risk Constellation: a wide, dark field of thousands of faint points with a
bright amber cluster, beside a panel breaking 25,000 analysed players into
critical, high, medium, low, and no-signal tiers.
<!-- copy:end -->

`risk-constellation.webp` caption:

<!-- copy:start id=decision-3-media-b-caption -->
25,000 synthetic players. Colour and brightness carry risk; position separates
the flagged from everyone else.
<!-- copy:end -->

**Author note.** Triage queue ← WF-03. Player view contents ← WF-02. Generated
reports ← WF-05 and SYS-10. Finding metadata (rule, category, confidence,
evidence fields) ← SYS-08 and SYS-10. Shadow default and promotion ← SYS-09.
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
Decision 4 — Give the product its own identity
<!-- copy:end -->

**Visible copy (122 words, limit 140):**

<!-- copy:start id=decision-4-body limit=140 -->
Internal tools usually look like internal tools. I gave Aegis a real identity
instead: a shield-and-iris emblem, a dark instrument-panel palette, and a
cinematic entry sequence that plays once per session before the console
appears.

I produced that sequence myself. The emblem was modelled and animated in Blender,
exported as FBX, and taken into Unreal Engine 5 for scene assembly, lighting, the
aurora curtains, and the drifting dust, then rendered as a 4K image sequence and
finished in DaVinci Resolve.

This was not decoration for its own sake: analysts spend a whole shift inside one
tool, and a product that feels considered gets treated as one. It also fails
open: if the video stalls or motion is reduced, the console loads immediately.
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
Silent nine-second title sequence for Aegis, described in the summary beside
this video.
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
requirements: muted, `playsInline`, `preload="none"`, poster shown until play,
never autoplaying under `prefers-reduced-motion: reduce`, and a visible pause
or play control.

---

## 9. Contribution

**Heading (h2):**

<!-- copy:start id=contribution-heading -->
What I did
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=contribution-body -->
I designed and built Aegis end to end, with AI assistance throughout: product and
interaction design, the React application, the FastAPI service, the Postgres
schema, the lakehouse sync and hourly pipeline, the detection rules and scoring,
authentication and permissions, the WebGL Risk Constellation, the test suites,
the deployment path, and the identity film.

AI sped that work up — scaffolding, refactors, tests, review. The architecture,
the trade-offs above, and the product decisions are mine.
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
Delivered
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=delivered-body -->
Aegis was deployed to production and, as far as I know, remains active. No
client-provided business metrics exist, so this page reports what was built and
shipped, not what it earned.

Shipped and working: eight detection rules across payment, gameplay, identity,
and impact categories, with configurable thresholds, shadow and live execution,
and promotion; risk scoring and finding reports as HTML, Markdown, or PDF; the
overview dashboard, player investigation, alerts triage, saved cases, and rule
configuration; the Risk Constellation and geographic distribution; admin users
with a security-audit view; and a synthetic dataset that runs everything locally.

Three limits I would rather state outright. The browser-side login is still a
shell, so the API remains the sole authorization authority. The end-to-end
browser suite is written but skipped; the backend suite is 67 test files. The
Risk Constellation is proven to a few hundred thousand points, not millions.
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
panel, empty here.
<!-- copy:end -->

**Author note.** Production delivery ← OWN-06, worded as owner knowledge. The
second sentence discharges the WO-020 requirement to report delivery without
inventing business impact and closes off UNSUP-01 through UNSUP-09; the heading
is `Delivered`, never `Impact`. Capability list mapping: eight rules and four
categories ← SYS-08; thresholds/shadow-live/promotion ← SYS-09 and WF-06;
scoring ← SYS-10; report formats ← SYS-10 (HTML, Markdown, and PDF confirmed in
`reporting.py`); overview ← WF-01; player investigation ← WF-02; alerts queue ←
WF-03; rule configuration ← WF-06; Risk Constellation ← WF-07; geographic
distribution ← WF-08; admin and security audit ← WF-09; synthetic dataset ←
SYS-13.

`saved-cases shelf` resolves WF-04, which WO-018 left open. Source inspection
on 2026-07-31 found the cases route reads and writes the browser
`localStorage` key `aegis:cases`, populated from the alerts queue, with no
backend cases table or router; triage status changes and report generation do go
through the API. "shelf that keeps the findings an analyst is working through"
is therefore accurate, and the page must **not** describe full case management.

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
Technology, in context
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=technology-body -->
React, Vite, and React Router for the single-page bundle. FastAPI for a
read-focused JSON API. PostgreSQL for the curated schema Aegis owns. Databricks
as the analytical source. Redis for cache-first reads. Argon2, TOTP, and opaque
sessions for authentication. Three.js plus a Web Worker point decoder for the
Risk Constellation. deck.gl and MapLibre for geographic views. WeasyPrint for PDF
reports. pytest and Jest for the tests. Blender, Unreal Engine 5, and DaVinci
Resolve for the film.

Nothing there was chosen for its own sake; each entry exists because a decision
above needed it.
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

The closing sentence is required by the Batch 03 prohibition on turning the
case study into a technology inventory. No version numbers are published.

---

## 12. Confidentiality note and actions

**Heading (h2):**

<!-- copy:start id=confidentiality-heading -->
A note on confidentiality
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=confidentiality-body -->
I have deliberately left things off this page: the operator's name, its internal
system names, deployment identifiers and environment URLs, and any real player,
document, transaction, or credential. The screenshots use synthetic data. The
repository is private, so there is no code link, and the portfolio version of
Aegis is a sanitized evolution I maintain independently, not a mirror of
production.

To go further than a public page allows, ask me directly.
<!-- copy:end -->

**Actions** — exactly two, in this order:

<!-- copy:start id=confidentiality-actions -->
Back to selected work
Get in touch
<!-- copy:end -->

**Media:** none.

**Author note.** Omissions enumerate CONF-01, CONF-02, CONF-03, and CONF-04
without reproducing any value. Synthetic media ← DEC-03. Private repository ←
DEC-01. The sanitized-evolution sentence is required by OWN-07 so no reader
concludes the public version is byte-identical to production.

Action targets: `Back to selected work` → `/#work`; `Get in touch` → `/#contact`.
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
| `Impact` as a delivery word | Not used that way. Section 10 is headed `Delivered`. The word `impact` appears only as the name of a real rule category (`IMPACT-001`, `IMPACT-002` in SYS-08) and in the phrase `business-outcome data`. |
| `revenue`, `money saved`, `fraud reduction`, `client satisfaction` | Not used. Section 10 states explicitly that no business-outcome data exists. The operator-loss rule is referred to by its category rather than by expanding `GGR`. |

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
| UNSUP-01 … UNSUP-09 | Prohibited. Section 10 states outright that no business-outcome data exists. |

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

**Recorded result, re-measured after owner approval (2026-07-31).** All visible
strings: **1,390 words**. Prose only, excluding headings, the hero meta list,
action labels, and the video title: **1,293 words**. Hero support 51 (limit 55);
decision bodies 115, 115, 122, and 122 (limit 140 each). No block exceeds its
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
