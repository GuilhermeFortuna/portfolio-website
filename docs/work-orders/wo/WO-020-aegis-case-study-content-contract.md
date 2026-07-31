# WO-020 — Aegis Case-Study Content Contract

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-020 row is
`READY`.

## Result to Produce

An owner-approved, implementation-ready Aegis narrative with exact visible
copy, media placement, evidence references, and no unsupported outcome claim.

## Prerequisites

- WO-019 `DONE`

## Files to Create or Modify

```text
docs/aegis-case-study-content.md
docs/content.md
docs/work-orders/wo/WO-STATUS.md
```

Do not create or modify public route code in this order.

## Fixed Narrative Structure

Use this order:

1. Hero: project, role, period, production state, concise proposition.
2. Context: unnamed betting company in the Brazilian iGaming sector and the
   confidentiality boundary.
3. Problem: make suspicious behavior, relationships, and player history
   investigable across operational and analytical data.
4. System overview: frontend, API/services, operational store, analytical
   source, cache, and scheduled jobs.
5. Decision 1: standalone product boundary and deployment/runtime
   configuration.
6. Decision 2: Postgres + Databricks + Redis/job data-access strategy.
7. Decision 3: investigation-oriented interface and Risk Constellation.
8. Decision 4: custom Aegis identity and entry-intro production pipeline.
9. Contribution: end-to-end ownership with AI assistance.
10. Evidence/result: production delivery and implemented capabilities only.
11. Technology in context.
12. Confidentiality note and return-to-work/contact actions.

## Required Copy Facts

The content must state, without exaggeration:

- `Software Developer`
- `April 2026–present`
- built for an unnamed betting company in the Brazilian iGaming sector
- designed and built end to end by Guilherme, with AI assistance
- deployed to production and last known to remain active
- portfolio version is a sanitized, independently maintained evolution
- no client-provided business-impact metrics are available
- project source is private

The entry-intro explanation must accurately describe Blender modeling and
animation, FBX transfer, Unreal Engine 5 scene/lighting/aurora/dust/render,
4K image sequence, and DaVinci Resolve finishing.

## Writing Rules

- First person for decisions and ownership.
- Explain the problem before naming technologies.
- Each technical claim must cite a WO-018 claim ID in an adjacent author note
  inside `docs/aegis-case-study-content.md`.
- Use no more than four primary engineering decisions.
- Do not use `production-ready`, `revolutionary`, `state-of-the-art`,
  `enterprise-grade`, `real-time`, or `high-volume` unless the evidence
  register accepts the exact usage.
- Do not imply that AI independently built the product. State that AI assisted
  Guilherme's work.
- Do not publish internal route names, infrastructure project IDs, company
  branding, real data examples, or source links.
- Use `Result` or `Delivered`, not `Impact`, when discussing production
  delivery without business metrics.

## Procedure

1. Reconcile WO-018 claims with WO-019's accepted media.
2. Draft `docs/aegis-case-study-content.md` using the fixed structure. For every
   section, include exact heading, visible body copy, selected media filename,
   alt text or decorative decision, and claim IDs.
3. Keep the page concise: hero support ≤55 words; each decision body ≤140
   words; total visible prose target 900–1,400 words.
4. Define useful media descriptions. The intro video requires a descriptive
   title and transcript/summary because the visual is not self-explanatory to
   every visitor.
5. Update the Aegis chapter and metadata facts in `docs/content.md`. Resolve
   existing Aegis `[REQUIRED: ...]` markers only when the evidence exists.
6. Add a public confidentiality note that protects the company while remaining
   candid about the production context.
7. Run a claim-by-claim comparison against `docs/aegis-case-study-evidence.md`.
   Any ungrounded sentence is removed or converted to a documentation-only
   `[REQUIRED: ...]` marker.
8. Request owner review of the complete visible copy. Record the exact approval
   or requested changes in the WO-STATUS gate log.
9. Move WO-020 to `REVIEW`. WO-021 remains blocked until an independent
   reviewer and the owner accept the content contract.

## Automated Checks

```bash
git diff --check
rg -n "Software Developer|April 2026|Brazilian iGaming|production|AI assistance" docs/aegis-case-study-content.md docs/content.md
rg -n "revolutionary|state-of-the-art|enterprise-grade|fraud reduction|revenue|money saved|client satisfaction" docs/aegis-case-study-content.md
rg -n "\[REQUIRED:" docs/aegis-case-study-content.md docs/content.md
```

Every match in the last two searches must be reviewed and explained; public
copy cannot contain a required marker.

## Acceptance Checklist

- [ ] The narrative follows the fixed twelve-part structure.
- [ ] Exact visible copy and media placement are implementation-ready.
- [ ] Every public claim maps to accepted evidence.
- [ ] Production delivery is stated without invented business impact.
- [ ] Company identity and sensitive implementation details remain omitted.
- [ ] Entry-intro authorship and pipeline are accurate.
- [ ] Media descriptions and intro transcript/summary are included.
- [ ] `docs/content.md` agrees with the case-study contract.
- [ ] Owner approval is recorded.
- [ ] Documentation checks pass.

## Handoff

Include final word count, claim IDs used, unresolved documentation-only
markers, media-to-section mapping, forbidden-language review, owner approval,
and the exact content files WO-021 must consume.
