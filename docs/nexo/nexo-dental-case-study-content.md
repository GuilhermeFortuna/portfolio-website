# Nexo Dental — Case-Study Content Contract

**Work Order:** WO-036. **State on handoff:** `DONE` (owner authorized
2026-08-04; separate independent reviewer waived).
**Evidence register (authoritative for claims):**
[`nexo-dental-case-study-evidence.md`](./nexo-dental-case-study-evidence.md).
**Media inventory (authoritative for assets):**
[`nexo-dental-case-study-media.md`](./nexo-dental-case-study-media.md).
**Consumers:** WO-037 renders this copy verbatim into `/work/nexo-dental`.
WO-037 must not reword visible copy without a new gate.

## How to read this file

Each numbered section below is one section of the `/work/nexo-dental` page, in
the fixed order WO-036 requires. Every section gives:

- **Heading** — the exact visible heading string.
- **Visible copy** — the exact rendered prose. Copy it verbatim.
- **Media** — the asset filename from `public/work/nexo-dental/`, its alt text,
  and any visible caption — or an explicit `none` / reserved decision.
- **Author note** — not rendered. Cites the WO-034 claim IDs backing each
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
Nexo Dental
<!-- copy:end -->

**Deck (visible, directly under the h1):**

<!-- copy:start id=hero-deck -->
Multi-tenant clinic operations for Brazilian dental clinics
<!-- copy:end -->

**Meta list** — four label/value pairs, rendered as a definition list:

<!-- copy:start id=hero-meta -->
Role
Founder and sole developer
Period
July 2026–present
State
Active development
Source
Private
<!-- copy:end -->

**Support copy (40 words, limit 55):**

<!-- copy:start id=hero-support limit=55 -->
Nexo Dental is my multi-tenant clinic-operations product for Brazilian dental
clinics. It spans scheduling, clinical records, finance, WhatsApp communication,
CRM, insurance claims, and reporting across three role-native surfaces. I
designed and built every layer, with AI assistance.
<!-- copy:end -->

**Actions:**

<!-- copy:start id=hero-actions -->
Live environment — coming soon
<!-- copy:end -->

**Media:** `shell-identity.webp`.

Alt text:

<!-- copy:start id=hero-media-alt render=alt-attribute-only -->
The Nexo Dental application shell on Clinic Pulse, with brand identity, role
navigation, and an operational home dashboard populated from fixture data.
<!-- copy:end -->

Caption:

<!-- copy:start id=hero-media-caption -->
Authenticated shell and Clinic Pulse home. The product interface is in
Portuguese.
<!-- copy:end -->

**Author note.** Title ← OWN-01; category label `Clinical software` /
`Software clínico` is already reserved in `src/content/projects.ts` and must
render with the hero (OWN-01). Role ← OWN-03. Period ← OWN-05 and GIT-01 (both
repositories begin 2026-07-06; no earlier lineage). `State: Active development`
is honest about an unfinished staging path — do not write "deployed" or imply a
verified live environment (SYS-09, GAP-01, OWN-06). `Source: Private` ← DEC-01.
Support module list and three role-native surfaces ← OWN-07. "with AI
assistance" ← OWN-04: AI assisted my work; it did not build the product
(UNSUP-06). Live-environment control reuses Aegis's exact disabled object
`liveEnvironment: { label: "Live environment — coming soon" }` — non-interactive,
`aria-disabled="true"`, no `href`, never a `[REQUIRED: …]` marker (OWN-06,
DEC-02). Hero media is WO-035 subject 10 (`shell-identity.webp`).

---

## 2. Context

**Heading (h2):**

<!-- copy:start id=context-heading -->
The context
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=context-body -->
Brazilian dental clinics run on three concurrent daily workflows. Reception keeps
the day moving: appointments, confirmations, and patient conversations.
Dentists need the clinical chart — teeth, encounters, and treatment proposals —
at the chair. Managers watch cash, commissions, claims, and reporting.

Those jobs share patients and money, but not the same questions. Nexo Dental
exists to give each role a native surface inside one multi-tenant product,
without collapsing them into a single generic dashboard.
<!-- copy:end -->

**Media:** `agenda.webp`.

Alt text:

<!-- copy:start id=context-media-alt render=alt-attribute-only -->
A week-view dental agenda showing multi-professional appointment cards and a
status strip, populated from seed fixture data.
<!-- copy:end -->

Caption:

<!-- copy:start id=context-media-caption -->
Receptionist week agenda on fixture appointments.
<!-- copy:end -->

**Author note.** Three roles and functional scope ← OWN-07, WF-09. No
third-party product-comparison framing of any kind (DEC-06 / Locked Owner Fact
3). Agenda capture ← WF-01 and MEDIA-01. Captions describe the figure; the
fixture-data disclosure for the whole page lives once in section 12
(DEC-05, MEDIA-01).

---

## 3. Problem

**Heading (h2):**

<!-- copy:start id=problem-heading -->
The problem
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=problem-body -->
Building a clinic-operations system means serving three users who work the same
patient record on different clocks. Reception needs the next open slot and a
fast reply channel. The dentist needs an odontogram and a chronological clinical
timeline that stay trustworthy under chairside pressure. The manager needs
ledgers, claims, and reports that reconcile with what the floor already did.

If any one of those surfaces is forced to wear the others' clothes, daily work
degrades. The job was one multi-tenant product where scheduling, clinical
records, finance, communication, and reporting stay sharp for each role at once.
<!-- copy:end -->

**Media:** none.

**Author note.** Problem framed entirely from Nexo Dental's own scope (DEC-06).
No technology names in this section — stack arrives in sections 4 and 11.
Module vocabulary ← OWN-07, WF-01–WF-08. No invented clinic, patient, or
growth metrics (UNSUP-01–UNSUP-03).

---

## 4. System overview

**Heading (h2):**

<!-- copy:start id=system-heading -->
How the system fits together
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=system-body -->
Nexo Dental is a React and TypeScript single-page application talking to a
FastAPI service under `/api/v1`, with PostgreSQL as the application store and
Alembic for schema evolution. Tenant-scoped sessions and forced row-level
security keep each clinic's data isolated at the database boundary. Local
orchestration wires Postgres, the API, and the frontend together; a guarded MSW
mock path lets the interface run on fixture data without a real clinic session.
<!-- copy:end -->

**Media:** `patient-workspace.webp`.

Alt text:

<!-- copy:start id=system-media-alt render=alt-attribute-only -->
A patient workspace header with identity overview and clinical tabs for a
fixture patient record.
<!-- copy:end -->

Caption:

<!-- copy:start id=system-media-caption -->
Patient workspace — the shared clinical and financial record surface.
<!-- copy:end -->

**Author note.** React/TS/Vite SPA ← SYS-01. FastAPI `/api/v1` ← SYS-02.
PostgreSQL + Alembic ← SYS-03. Tenant sessions + RLS ← SEC-01, SEC-02. Local
orchestration ← SYS-04 (local-dev only; not a production deployment claim).
MSW mock path ← SYS-05, DEC-05. Patient workspace ← WF-02. Do not name Firebase
project IDs or private hostnames (CONF-03); staging status is deferred to
section 10 / 12 (SYS-09).

---

## 5. Decision 1

**Heading (h2):**

<!-- copy:start id=decision-1-heading -->
Decision 1 — Isolate every clinic at the database boundary
<!-- copy:end -->

**Visible copy (115 words, limit 140):**

<!-- copy:start id=decision-1-body limit=140 -->
A multi-tenant clinic product fails the moment one clinic can see another's
patients, charts, or ledgers. Application filters alone were not enough for me:
they are easy to forget on a new query path.

So every tenant-scoped session sets `app.tenant_id` on the connection, and
row-level security is enabled and forced on the core tables. Policies isolate
rows by that setting. The application still scopes deliberately; the database
refuses the accident.

That choice costs migration discipline and a tenancy model in every new table,
and it is worth it. Clinical and financial data is the blast radius, and I
wanted isolation enforced where a missed `WHERE` clause cannot undo it.
<!-- copy:end -->

**Media:** none.

**Author note.** Tenant-scoped sessions ← SEC-01. RLS enable/force + tenant
isolation policies ← SEC-02. Multi-tenant domain ← OWN-07. Adjacent LGPD
posture (AI PII pre-invoke, claims masking, no-PII clinic-pulse tests) may be
mentioned lightly in Delivered/Technology if needed, but this decision's body
stays on the isolation mechanism (SEC-03–SEC-05). No third-party audit or
certification claim. First-person judgement with a stated cost, matching the
Aegis decision pattern.

---

## 6. Decision 2

**Heading (h2):**

<!-- copy:start id=decision-2-heading -->
Decision 2 — Build role-native surfaces, not one generic dashboard
<!-- copy:end -->

**Visible copy (105 words, limit 140):**

<!-- copy:start id=decision-2-body limit=140 -->
The tempting shortcut was one dense dashboard with everything a clinic might
need. That would have optimized for the builder, not the day.

I split the product by the people who live in it. Reception works agenda,
queue, and conversations. Dentists work the odontogram, clinical timeline, and
treatment proposals. Managers work finance, claims, and reporting. Machine roles
and capability-gated navigation make those surfaces first-class rather than
tabs bolted onto a shared grid.

The cost is more surface area to keep coherent. The gain is that each role
opens to the work they actually do, instead of hunting through someone else's
screen.
<!-- copy:end -->

**Media:** `whatsapp-inbox.webp`.

Alt text:

<!-- copy:start id=decision-2-media-alt render=alt-attribute-only -->
A WhatsApp-style conversations inbox with a synthetic thread open beside the
conversation list.
<!-- copy:end -->

Caption:

<!-- copy:start id=decision-2-media-caption -->
Receptionist communications surface on fixture conversations.
<!-- copy:end -->

**Author note.** Role-native shell ← WF-09. Three primary daily roles ← OWN-07.
Agenda/queue/comms ← WF-01, WF-10, WF-05. Odontogram/clinical/orçamentos ←
WF-03, WF-04. Finance/claims/reporting ← WF-04, WF-07, WF-08. WhatsApp capture
supports the receptionist communications claim (WF-05); dentist and manager
surfaces are evidenced in decisions 3–4 and Delivered. Do not invent staff
headcount (UNSUP-06).

---

## 7. Decision 3

**Heading (h2):**

<!-- copy:start id=decision-3-heading -->
Decision 3 — Treat the odontogram as a clinical data model
<!-- copy:end -->

**Visible copy (111 words, limit 140):**

<!-- copy:start id=decision-3-body limit=140 -->
A tooth chart that is only a picture becomes a dead end the moment treatment
planning, encounters, and finance need the same facts. I modelled the odontogram
as structured clinical data: teeth, conditions, and procedures that feed
encounters, timelines, and treatment proposals.

The dentist's workspace therefore stays one place. The chart shows the mouth;
the clinical timeline shows what happened and who recorded it; an orçamento
builds from the same clinical vocabulary instead of a parallel spreadsheet.

That coupling is deliberate. Clinical truth has to survive the handoff from
chair to front desk to ledger, and a decorative chart would force retyping the
story at every step.
<!-- copy:end -->

**Media:** `odontogram.webp`, then `clinical-timeline.webp`.

`odontogram.webp` alt text:

<!-- copy:start id=decision-3-media-a-alt render=alt-attribute-only -->
An odontogram workspace with an FDI tooth chart, tooth 16 highlighted, in a
populated seed clinical state.
<!-- copy:end -->

`odontogram.webp` caption:

<!-- copy:start id=decision-3-media-a-caption -->
Clinical odontogram on fixture chart data.
<!-- copy:end -->

`clinical-timeline.webp` alt text:

<!-- copy:start id=decision-3-media-b-alt render=alt-attribute-only -->
A chronological clinical timeline of seed encounters with attribution in the
patient clinical workspace.
<!-- copy:end -->

`clinical-timeline.webp` caption:

<!-- copy:start id=decision-3-media-b-caption -->
Clinical timeline built from fixture encounters.
<!-- copy:end -->

**Author note.** Odontogram and clinical charting ← WF-03. Backend clinical
module presence ← SYS-06. Frontend odontogram/clinical tests ← SYS-08.
Orçamento coupling mentioned as product vocabulary ← WF-04; the orçamento
capture itself is reserved (see reserved-media manifest) so this section does
not force a third figure. No clinical-outcome or patient-volume claim
(UNSUP-02).

---

## 8. Decision 4

**Heading (h2):**

<!-- copy:start id=decision-4-heading -->
Decision 4 — Triage the day with an action queue
<!-- copy:end -->

**Visible copy (101 words, limit 140):**

<!-- copy:start id=decision-4-body limit=140 -->
Clinic work rarely arrives as a calm checklist. Glosas, unpaid balances,
incomplete charts, and messages compete for attention in the same hour. A flat
notification pile does not tell anyone what to do next.

I built an action queue that ranks operational work and attaches the next
useful action — review a claim issue, reply on WhatsApp, open débitos, complete
a chart. Adjacent AI operator panels can draft assistance, but a person still
reviews and acts.

The hierarchy is the point. Reception and management stay oriented when the day
gets noisy, without pretending the system decides clinical care alone.
<!-- copy:end -->

**Media:** `fila.webp`.

Alt text:

<!-- copy:start id=decision-4-media-alt render=alt-attribute-only -->
An operational action queue listing prioritized items with action buttons such
as reviewing a claim issue, replying on WhatsApp, and opening patient balances.
<!-- copy:end -->

Caption:

<!-- copy:start id=decision-4-media-caption -->
Action queue with prioritized operational work on fixture items.
<!-- copy:end -->

**Author note.** Action queue `/fila` + AI operator panels ← WF-10. Backend
`action_queue` and `ai` modules ← SYS-06. Do **not** claim autonomous clinical
decision-making or "AI-first" marketing (WF-10 limits). UI labels in the alt
text paraphrase visible Portuguese affordances from the capture without inventing
English product chrome the screenshot lacks. Fixture-only ← MEDIA-01.

---

## 9. Contribution

**Heading (h2):**

<!-- copy:start id=contribution-heading -->
What I did
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=contribution-body -->
I designed and built Nexo Dental end to end as founder and sole developer, with
AI assistance throughout: product and interaction design, the React application,
the FastAPI service, the Postgres schema and tenancy model, role-native
surfaces, clinical and financial workflows, communications and claims, operator
assistance, tests, and the local development path.

AI sped that work up — scaffolding, refactors, tests, review. The architecture,
the trade-offs above, and the product decisions are mine.
<!-- copy:end -->

**Media:** none.

**Author note.** End-to-end ownership with AI assistance ← OWN-03, OWN-04,
GIT-02. Own product ← OWN-02. Listed layers map to SYS-01–SYS-08, SEC-01–SEC-02,
WF-01–WF-10. No team or leadership claim (UNSUP-06). Second paragraph required
so AI assists my work and never appears to have built the product alone.

---

## 10. Delivered

**Heading (h2):**

<!-- copy:start id=delivered-heading -->
Delivered
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=delivered-body -->
This page reports what is implemented in the repositories, not clinic usage or
operational outcomes.

Shipped in code: scheduling and agenda; patient records; odontogram and clinical
charting; finance and orçamentos; WhatsApp communications; CRM; TISS claims;
reporting routes; a role-native shell; and an action queue with reviewable
operator assistance. Multi-tenant RLS, LGPD-oriented input checks, and automated
backend and frontend tests back those surfaces.

Honest limits: a Firebase Hosting staging target exists in config, but the
source deployment Work Orders remain blocked — there is no verified live staging
URL today. Reporting code is present while the source status board still marks
core BI Work Orders incomplete, so I do not claim a finished analytics program.
<!-- copy:end -->

**Media:** `financial-ledger.webp`.

Alt text:

<!-- copy:start id=delivered-media-alt render=alt-attribute-only -->
A patient financial ledger showing synthetic installment balances and débitos
in the finance workspace.
<!-- copy:end -->

Caption:

<!-- copy:start id=delivered-media-caption -->
Patient financial ledger on fixture amounts.
<!-- copy:end -->

**Author note.** Module inventory ← WF-01–WF-10, OWN-07. RLS/LGPD posture ←
SEC-01–SEC-05 (described generically; no certification). Tests ← SYS-07,
SYS-08. Staging blocked ← SYS-09, GAP-01, DEC-02. Reporting incomplete on status
board ← WF-08, GAP-02. Explicit refusal of invented operational metrics ←
UNSUP-01–UNSUP-04. Financial ledger media ← WF-04. Section headed `Delivered`,
never `Impact`.

---

## 11. Technology in context

**Heading (h2):**

<!-- copy:start id=technology-heading -->
Technology, in context
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=technology-body -->
React, TypeScript, Vite, and TanStack Router for the single-page application.
FastAPI for the `/api/v1` service. PostgreSQL with Alembic migrations, including
forced row-level security for tenant isolation. MSW for the fixture-driven mock
path. pytest and the frontend Vitest suite for automated coverage.

Nothing there was chosen for its own sake; each entry exists because a decision
above needed it.
<!-- copy:end -->

**Media:** none.

**Author note.** SYS-01, SYS-02, SYS-03, SEC-02, SYS-05, SYS-07, SYS-08. Closing
sentence mirrors Aegis/Quant — no technology inventory for its own sake. No
version numbers. Do not list Firebase project identifiers (CONF-03); staging is
already disclosed in section 10.

---

## 12. Disclosure note and actions

**Heading (h2):**

<!-- copy:start id=disclosure-heading -->
A note on source and data
<!-- copy:end -->

**Visible copy:**

<!-- copy:start id=disclosure-body -->
The repositories are private, so there is no code link. Every interface capture
on this page uses seed and MSW fixture data — never a real clinic or real
patient. Visible document and phone numbers in screenshots are invented showcase
identifiers from the mock dataset. Source staging Work Orders remain blocked,
which is why the live-environment control stays disabled.

To go further than a public page allows, ask me directly.
<!-- copy:end -->

**Actions** — exactly two, in this order:

<!-- copy:start id=disclosure-actions -->
Back to selected work
Get in touch
<!-- copy:end -->

**Media:** none.

**Author note.** Private source ← DEC-01, CONF-04. Fixture/MSW media ← MEDIA-01,
MEDIA-02, DEC-05; fixture CPF/phone disclosure matches
`nexo-dental-case-study-media.md` (João Antônio Fictício showcase IDs) — stated
once here, not per figure. Staging blocked ← SYS-09, GAP-01, OWN-06, DEC-02.
No real clinic/patient names (CONF-02). Action targets: `Back to selected work`
→ `/#work`; `Get in touch` → `/#contact`. Disabled live-environment control
belongs to the hero only.

---

## Media-to-section mapping

| Asset | Section | Role | Accessible text |
| --- | --- | --- | --- |
| `shell-identity.webp` | 1. Hero | Hero figure + caption | `alt` from `hero-media-alt` |
| `agenda.webp` | 2. Context | Figure + caption | `alt` from `context-media-alt` |
| `patient-workspace.webp` | 4. System overview | Figure + caption | `alt` from `system-media-alt` |
| `whatsapp-inbox.webp` | 6. Decision 2 | Figure + caption | `alt` from `decision-2-media-alt` |
| `odontogram.webp` | 7. Decision 3 | First figure + caption | `alt` from `decision-3-media-a-alt` |
| `clinical-timeline.webp` | 7. Decision 3 | Second figure + caption | `alt` from `decision-3-media-b-alt` |
| `fila.webp` | 8. Decision 4 | Figure + caption | `alt` from `decision-4-media-alt` |
| `financial-ledger.webp` | 10. Delivered | Figure + caption | `alt` from `delivered-media-alt` |

## Reserved-media manifest

| Asset | Reason reserved |
| --- | --- |
| `orcamento.webp` | Treatment-proposal builder is covered in Decision 3 prose (WF-04) without forcing a third clinical figure onto that section. |
| `reports.webp` | Reporting existence and honest BI-status limit are stated in Delivered (WF-08, GAP-02); a catalog screenshot would over-weight an incomplete BI program. |

No WO-035 subject was deferred. `placeholder.svg` remains for chapter wiring
only and is not a narrative figure.

## Forbidden-language review

| Rule | Status in this file |
| --- | --- |
| WO-036 promo-adjective blocklist | Zero hits in visible copy blocks. |
| `Impact` as a delivery word | Not used. Section 10 is headed `Delivered`. |
| Invented operational metrics (UNSUP-01–UNSUP-04) | Not stated as real results. |
| Locked Owner Fact 3 / DEC-06 third-party product framing | Zero hits for the WO-036 hard-fail search over this file and `docs/content.md`. |
| AI independently built the product | Not used. Hero and Contribution state AI assistance only (OWN-04). |
| Verified live staging URL | Not implied. Hero disabled control + Delivered/Disclosure state SYS-09 / GAP-01. |

## Claim IDs used

OWN-01, OWN-02, OWN-03, OWN-04, OWN-05, OWN-06, OWN-07, GIT-01, GIT-02, SYS-01,
SYS-02, SYS-03, SYS-04, SYS-05, SYS-06, SYS-07, SYS-08, SYS-09, WF-01, WF-02,
WF-03, WF-04, WF-05, WF-07, WF-08, WF-09, WF-10, SEC-01, SEC-02, SEC-03, SEC-04,
SEC-05, MEDIA-01, MEDIA-02, DEC-01, DEC-02, DEC-05, DEC-06, GAP-01, GAP-02,
CONF-02, CONF-03, CONF-04, UNSUP-01, UNSUP-02, UNSUP-03, UNSUP-04, UNSUP-06.

Deliberately unused (with reason): GIT-03 (commit counts are not a public
outcome metric); WF-06 (CRM is in the module list / Delivered inventory without
its own decision figure); MEDIA-03 (capture-archive process, not page copy);
DEC-03, DEC-04 (slug/metadata decisions consumed by WO-037 / `content.md`);
GAP-03, GAP-04 (staging-data and teardown boundaries — out of narrative);
UNSUP-05, UNSUP-07 (load performance / promo adjectives — prohibited, not
needed as citations); CONF-01 (credentials never referenced).

## Hiring-audience read notes

- Opening stakes are three concurrent daily roles sharing clinical and financial
  data inside one multi-tenant product — framed from Nexo Dental's own scope
  only (DEC-06).
- Each decision states a deliberate choice, a reason, and a cost.
- Language stays confident within evidence: modules implemented, staging
  unverified, BI program not overclaimed.
- Own-product founder framing matches Locked Owner Fact 1.

## Unresolved documentation-only markers

None in this contract's visible copy. Global `docs/content.md` still retains
site-wide `[REQUIRED: live environment URL]` (documentation only until a URL is
verified) and unrelated OG/canonical markers — Nexo resolves live environment
via the disabled control (OWN-06 / DEC-02).

## Verification

Word budget measured 2026-08-04: hero support 40 (≤55); decision bodies
114 / 103 / 108 / 99 (≤140 each); visible prose excl. meta/actions/alt/captions
**1,100** (target 700–1,100).

Automated checks before owner approval:

Run the Automated Checks block from
`docs/work-orders/wo/WO-036-nexo-dental-case-study-content-contract.md`
verbatim (patterns live only in that Work Order so this contract file does not
self-match the hard-fail searches).

## Handoff for WO-037

Consume this file verbatim:

- Route: `/work/nexo-dental`
- Content file: `docs/nexo-dental-case-study-content.md`
- Evidence: `docs/nexo-dental-case-study-evidence.md`
- Media: eight placed assets under `public/work/nexo-dental/` per the mapping
  above; two reserved (`orcamento.webp`, `reports.webp`)
- Hero `liveEnvironment`: `{ label: "Live environment — coming soon" }` (disabled)
- Homepage wiring (`projects[3].href`) is WO-037 scope
