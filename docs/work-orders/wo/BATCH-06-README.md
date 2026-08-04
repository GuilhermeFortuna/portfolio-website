# Portfolio Website — Work Orders, Batch 06

## Purpose

Turn **Nexo Dental** from a one-sentence homepage claim into the portfolio's
fourth and final evidence-led case study, following the pattern
[`BATCH-03-README.md`](BATCH-03-README.md) (Aegis),
[`BATCH-04-README.md`](BATCH-04-README.md) (Quant), and
[`BATCH-05-README.md`](BATCH-05-README.md) (gosigapp) established.

Nexo Dental is a multi-tenant clinic-operations product for Brazilian dental
clinics — scheduling, patient records, an odontogram, finance, WhatsApp
communication, CRM, TISS insurance claims, and reporting. It has a real,
extensive UI across three role-native surfaces (receptionist, dentist,
manager), closer to Quant's chapter than to Aegis's or gosigapp's, and it
carries real clinical and financial PII risk that neither of those chapters
had to manage — every capture in this batch must come from seed/fixture
data, never a real clinic.

**The case study must not name or otherwise reference any incumbent
product it competes with or replaces** — confirmed by the owner
(2026-08-04), see Locked Owner Fact 3. The product's own scope and
engineering decisions carry the entire narrative.

## Scope Boundary

In scope: evidence, media, copy, route, and release review for
`/work/nexo-dental`.

Out of scope: cinematic animation, scroll choreography, WebGL, gallery
motion, new visual-effect dependencies, homepage restructuring, and any
change to the Aegis, Quant, or gosigapp pages.

## Locked Facts (source- and Git-derived)

Recorded here from direct inspection on 2026-08-04. WO-034 re-verifies each
one against source before it may be published.

- Repositories: `/home/gui/projects/nexo/odonto_back` (Python, `uv`) and
  `/home/gui/projects/nexo/odonto_front` (React/TypeScript, `pnpm`).
- Backend history begins **2026-07-06**; latest commit **2026-07-29** (73
  commits).
- Frontend history begins **2026-07-06**; latest commit **2026-08-02** (224
  commits).
- All Git author names on both repositories are variants of a single
  identity (`Guilherme`, `Guilherme Fortuna`, `Guilherme Fortuna dos
  Santos`) — unlike Quant, there is no tooling-identity author (no `Cursor
  Agent`-equivalent) to reconcile.
- `odonto_front/PRODUCT.md` states the product serves Brazilian dental
  clinics from solo practices to multi-unit groups, with three primary daily
  users: receptionists (operational), dentists (clinical), and managers
  (commercial/financial). `PRODUCT.md` also frames the purpose internally as
  a replacement for a named incumbent — **this framing is source-internal
  only and must never carry into any public claim** per Locked Owner Fact 3
  below; the publishable scope statement is the functional list alone
  (scheduling, patient records, odontogram, finance, WhatsApp, CRM, claims,
  reporting).
- A staging deployment target exists in the source repository's own Work
  Order series (`odonto_front/docs/work-orders/WO23`–`WO26`, Firebase
  Hosting) but its own `WO-STATUS.md` records all four as `BLOCKED` /
  "review rejected" — **there is no live, verified staging URL today.**
- The product is multi-tenant and handles real clinical and financial data
  (LGPD-scoped); the source repositories' own product docs mandate no PII in
  logs, events, or URLs. This batch inherits that discipline for media
  capture: seed/mock data only, never a real clinic's data.

## Locked Owner Facts

Recorded from the owner on **2026-08-04**. These are `FACT — OWNER` inputs;
WO-034 classifies and cites them but does not relitigate them.

1. **Nature of the work: the owner's own product.** Confirmed. Guilherme is
   the sole owner/founder of Nexo Dental — no employer, no client, no
   third-party confidentiality boundary. WO-034 uses the Quant evidence
   template (factual inventory), not the Aegis/gosigapp confidentiality
   template. The only genuinely sensitive material is real clinic/patient
   data, credentials, and the fact that the source is private.
2. **Role: founder and sole developer.** Confirmed, matching Quant's exact
   wording — designed and built with AI assistance, not AI-authored.
3. **"Simples Dental" is not named, not even generically.** Confirmed
   **stronger than the original question offered**: the case study must not
   reference the incumbent product at all — not by name, and not with a
   generic paraphrase like "the market-leading incumbent." `PRODUCT.md`'s
   internal framing ("a full replacement for Simples Dental across...") must
   not carry into any public claim, context section, or problem statement.
   WO-034 and WO-036 must frame the problem and context entirely in terms of
   Nexo Dental's own scope and decisions, with no incumbent-comparison
   framing of any kind.
4. **Period: the two repositories' Git history is the whole story.**
   Confirmed — no earlier unlogged lineage to record, unlike Quant's
   six-year idea lineage. The project starts when the repositories start
   (2026-07-06).
5. **Live-environment control: reuse the existing disabled state.**
   Confirmed as recommended. Render Aegis's exact
   `liveEnvironment: { label: "Live environment — coming soon" }` object
   verbatim in the Nexo Dental hero — no new widening, no real link, since
   the source repository's own staging Work Orders are blocked.
6. **Slug/display name: `nexo-dental`.** Confirmed as already reserved —
   route stays `/work/nexo-dental`, matching `src/content/projects.ts` and
   `docs/content.md`.

**Consequence of fact 3 for downstream orders:** WO-034's evidence register
must not create a claim row of any kind — public, `CONFIDENTIAL`, or
otherwise — that surfaces "Simples Dental" or its generic paraphrase as
publishable context. Treat the incumbent's identity as entirely out of
scope for this case study, not as a `CONFIDENTIAL` fact to redact. WO-036's
Context/Problem sections must motivate the product from Nexo Dental's own
functional scope (multi-tenant clinic operations across three role-native
surfaces) rather than from a replacement narrative.

## Read-Only Evidence Sources

```text
/home/gui/projects/nexo/odonto_back
/home/gui/projects/nexo/odonto_front
/home/gui/projects/nexo/dev.sh
/home/gui/projects/nexo/teardown
```

Workers may inspect and run these repositories, using only seed/fixture
data. They must not modify, commit, clean, reset, or reconfigure either
source repository. Never read or copy `.env` values, real clinic or patient
records, real credentials, Firebase project secrets, or any staging/
production configuration values. `odonto_back/.env` and
`odonto_front/.env` exist in the source tree and are explicitly out of
bounds.

## Mandatory Reading

1. This batch index.
2. [`WO-STATUS.md`](WO-STATUS.md).
3. [`IMPLEMENTATION-SPEC.md`](IMPLEMENTATION-SPEC.md).
4. [`../../content.md`](../../content.md).
5. [`BATCH-03-README.md`](BATCH-03-README.md) and
   [`BATCH-04-README.md`](BATCH-04-README.md) and the deliverables they
   produced — this batch follows their pattern (Quant's own-product,
   two-repository, high-resolution-capture template most closely) and must
   stay consistent with all three prior chapters.
6. The assigned Work Order and every completed prerequisite handoff.

## Dependency Order

```text
WO-034 Nexo Dental Evidence and Publication Contract
  └─ WO-035 Nexo Dental Media Capture
       └─ WO-036 Nexo Dental Case-Study Content Contract
            └─ WO-037 Nexo Dental Case-Study Implementation
                 └─ WO-038 Nexo Dental Integration and Release Review
```

Do not run these orders in parallel. Each order freezes inputs consumed by
the next. Only WO-034 may become `READY` when this batch opens, and only
after the Locked Owner Facts above are recorded.

Batch 06 has **no route-foundation order**. WO-021 already delivered the
typed content model, the shared shell, and the case-study primitives, and
they are `DONE`. WO-037 reuses them — this is the fourth test of whether
they generalize, after Quant (optional `liveEnvironment`) and gosigapp (no
hero image, non-screenshot media).

## Work Order Index

| ID | Work Order | Primary output |
| --- | --- | --- |
| WO-034 | [Nexo Dental Evidence and Publication Contract](./WO-034-nexo-dental-evidence-publication-contract.md) | Claim-level evidence register and disclosure boundary |
| WO-035 | [Nexo Dental Media Capture](./WO-035-nexo-dental-media-capture.md) | High-resolution captures across the three role-native surfaces, archived masters, and media manifest |
| WO-036 | [Nexo Dental Case-Study Content Contract](./WO-036-nexo-dental-case-study-content-contract.md) | Owner-approved narrative and exact visible copy |
| WO-037 | [Nexo Dental Case-Study Implementation](./WO-037-nexo-dental-case-study.md) | Finished `/work/nexo-dental` route and homepage entry point |
| WO-038 | [Nexo Dental Integration and Release Review](./WO-038-nexo-dental-integration-release-review.md) | Independent truth, browser, accessibility, metadata, and performance gate |

## Shared Prohibitions

- Do not capture, describe, or reference any real clinic's or real patient's
  data. Every capture and every quoted number comes from seed/fixture data
  only.
- Do not expose `.env` values, Firebase project IDs/secrets, database
  connection strings, API keys, or any staging/production credential.
- Do not publish a real staging or production URL for the
  live-environment control. The source repository's own staging Work Orders
  are `BLOCKED`; render the existing disabled `Live environment — coming
  soon` primitive instead.
- Do not publish project repository links.
- Do not state an operational-metric outcome — clinic count, patient count,
  adoption, uptime, or performance under load — as a real result without a
  source WO-034 accepts. This is the site-wide no-invented-metrics rule from
  `docs/content.md`, binding this chapter exactly as it binds the other
  three.
- Do not add a visual-effect dependency, animation system, WebGL runtime,
  global cinematic transition, or homepage section.
- Do not turn the case study into a feature inventory. Nexo Dental spans
  scheduling, patients, odontogram, finance, WhatsApp, CRM, claims, and
  reporting; the narrative gets at most four engineering decisions, exactly
  as Aegis and Quant did.
- Do not place `[REQUIRED: ...]`, confidential notes, or development
  fixtures in rendered content, metadata, generated assets, or the
  production bundle.
- Do not copy capture masters into the portfolio repository. Masters are
  archived outside it and referenced by hash.

## Batch Completion Rule

Batch 06 is complete only when WO-038 records a `GO` release decision and is
marked `DONE`. Completion of the route implementation alone is insufficient.
