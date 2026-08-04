# WO-036 — Nexo Dental Case-Study Content Contract

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-036 row is
`READY`.

## Result to Produce

An owner-approved, implementation-ready Nexo Dental narrative with exact
visible copy, media placement, and evidence references — written to read as
compelling to a hiring engineer or manager, not merely accurate, and
consistent with the Aegis/Quant/gosigapp series this closes out.

## Prerequisites

- WO-035 `DONE`

## Files to Create or Modify

```text
docs/nexo-dental-case-study-content.md
docs/content.md
docs/work-orders/wo/WO-STATUS.md
```

Do not create or modify public route code in this order.

## Fixed Narrative Structure

Use this order, matching the Aegis/Quant structure since this chapter has a
full media set (unlike gosigapp's shortened structure):

1. Hero: project, role, period, state, concise proposition, live-environment
   control.
2. Context: Brazilian dental clinics' operational reality — receptionist,
   dentist, and manager workflows that motivated building a ground-up,
   multi-tenant clinic-operations system. **Do not name or paraphrase any
   incumbent product** (Locked Owner Fact 3, confirmed 2026-08-04) — frame
   the context entirely from the clinic's operational needs, not from a
   replacement or competitive narrative.
3. Problem: building an entire clinic-operations system — scheduling,
   clinical records, finance, communication, and reporting — for three
   distinct daily users at once, without any one surface degrading to serve
   the others.
4. System overview: the multi-tenant backend/frontend architecture, using
   WO-035's shell/identity capture where relevant.
5. Decision 1.
6. Decision 2.
7. Decision 3.
8. Decision 4.
9. Contribution: end-to-end ownership with AI assistance.
10. Evidence/result: implemented modules and honest limits only.
11. Technology in context.
12. Disclosure note and return-to-work/contact actions.

Four decisions, matching Aegis's and Quant's ceiling. Choose from WO-034's
accepted claims, not from this list. Strong candidates, subject to evidence:
the multi-tenant/row-level-security data model that isolates every clinic's
data; the role-native surface split (receptionist/dentist/manager) as a
deliberate design decision rather than one generic dashboard; the
odontogram/clinical-record data model; and the queue/action-hierarchy
pattern used for operational triage. Do not force a fourth decision if only
three are well evidenced — three, matching gosigapp's floor, is acceptable
if the fourth candidate is weak.

## Required Copy Facts

The content must state, without exaggeration, using the values WO-034
accepted:

- the public name `Nexo Dental` and its category (already reserved:
  `Clinical software` / `Software clínico`)
- sole developer/owner, resolved per Locked Owner Fact 1 — do not write
  "own product" language unless that fact is confirmed
- the product's function: a multi-tenant clinic-operations system covering
  scheduling, patient records, an odontogram, finance, WhatsApp
  communication, CRM, TISS insurance claims, and reporting
- the three role-native surfaces and who uses each
- designed and built end to end by Guilherme, with AI assistance
- the staging-deployment status exactly as WO-034 verified it — do not
  imply a live, verified staging environment exists if WO-034 found the
  source repository's own deployment orders `BLOCKED`
- the live-environment control renders the existing disabled
  `Live environment — coming soon` primitive (`liveEnvironment: { label:
  "Live environment — coming soon" }`, reused verbatim from
  `src/content/case-studies/aegis.ts`), not a real link
- project source is private

## Writing Rules

- First person for decisions and ownership.
- Explain the problem before naming technologies.
- Each technical claim cites a WO-034 claim ID in an adjacent author note
  inside `docs/nexo-dental-case-study-content.md`.
- Use no more than four primary engineering decisions.
- Do not use `production-ready`, `enterprise-grade`, `state-of-the-art`,
  `mission-critical`, or `bulletproof` unless the evidence register accepts
  the exact usage.
- Do not state a clinic count, patient count, adoption figure, or uptime
  percentage as a real result — the same no-invented-metrics rule
  `docs/content.md` applies to every chapter.
- Do not imply AI independently built the product. State that AI assisted
  Guilherme's work.
- Use `Result` or `Delivered`, not `Impact`.
- Never name a real clinic, real patient, or any other real individual.
- Never name or paraphrase any incumbent/competitor product, in any
  section, under any framing — confirmed by Locked Owner Fact 3
  (2026-08-04). This is stronger than a redaction rule: the incumbent has
  no role in this narrative at all, not even as an unnamed "market-leading
  competitor."
- Period is the two repositories' Git history only (both begin
  2026-07-06) — Locked Owner Fact 4 confirms there is no earlier,
  unlogged lineage to reference, unlike Quant's six-year idea framing.

## Media Placement Rules

- The hero image is drawn from WO-035's shell/identity capture (subject
  10), matching Aegis's and Quant's hero pattern — unlike gosigapp, this
  chapter does not omit the hero image.
- Each remaining WO-035 asset is placed only where it directly supports the
  adjacent decision's or context's claim. An unused capture is recorded as
  reserved rather than forced onto the page.
- Captions describe what the reader is looking at and note once, in the
  disclosure section, that all interface captures show seed/fixture data,
  never a real clinic — not repeated per figure.
- Alt text is accurate and informative for every capture.

## Procedure

1. Reconcile WO-034 claims with WO-035's accepted media and its "subject
   dropped or substituted" notes.
2. Draft `docs/nexo-dental-case-study-content.md` using the fixed
   structure. For every section include exact heading, visible body copy,
   selected media filename (or "reserved"/"none"), alt text, caption, and
   claim IDs.
3. Keep the page comparable in weight to Aegis and Quant: hero support
   ≤55 words, each decision body ≤140 words, total visible prose
   700–1,100 words.
4. Write the reserved-media manifest for any WO-035 asset not placed on the
   page.
5. Update the Nexo Dental chapter and metadata facts in `docs/content.md`:
   confirm or correct the reserved `/work/nexo-dental` title and summary
   (line 343), and record the disabled live-environment control per the
   existing `docs/content.md` decision (lines 90–92) and the Batch 06
   locked facts. Resolve existing Nexo Dental `[REQUIRED: ...]` markers
   only where evidence now exists.
6. Add the public disclosure note: private source, seed/fixture-only
   captures, and the verified staging-deployment status.
7. Run a claim-by-claim comparison against `docs/nexo-dental-case-study-
   evidence.md`. Any ungrounded sentence is removed or converted to a
   documentation-only `[REQUIRED: ...]` marker.
8. Read the draft once specifically for a hiring audience: does the opening
   establish real stakes (three concurrent user roles, a named incumbent to
   replace, real clinical/financial data), does each decision read as a
   deliberate choice with a reason, is the language confident without
   exceeding the evidence.
9. Request owner review of the complete visible copy. Record the exact
   approval or requested changes in the WO-STATUS gate log.
10. Move WO-036 to `REVIEW`. WO-037 stays blocked until a reviewer and the
    owner accept the content contract.

## Automated Checks

```bash
git diff --check
rg -n "AI assistance|multi-tenant|role-native" docs/nexo-dental-case-study-content.md
rg -n "production-ready|enterprise-grade|state-of-the-art|mission-critical|bulletproof" docs/nexo-dental-case-study-content.md
rg -n "clinics using|patient count|adoption|uptime" docs/nexo-dental-case-study-content.md
rg -in "simples dental|incumbent|replaces|replacement for" docs/nexo-dental-case-study-content.md docs/content.md
rg -n "\[REQUIRED:" docs/nexo-dental-case-study-content.md docs/content.md
```

Every match in the incumbent-reference search must be zero, per Locked Owner
Fact 3 — a hard fail, not a reviewable exception.

Every match in the second and third searches must be reviewed and
explained. Public copy cannot contain a required marker.

## Acceptance Checklist

- [ ] The narrative follows the fixed structure.
- [ ] Exact visible copy, media placement, alt text, and captions are
      implementation-ready.
- [ ] Every public claim maps to accepted WO-034 evidence.
- [ ] No operational metric is stated as a real result.
- [ ] Own-product vs. client/employer framing matches the confirmed Locked
      Owner Fact 1, not an assumption.
- [ ] The live-environment control uses the existing disabled primitive,
      not a real link.
- [ ] No real clinic, patient, or individual is named anywhere.
- [ ] No incumbent/competitor product is named or paraphrased anywhere, in
      any section.
- [ ] Page weight is comparable to the Aegis/Quant chapters.
- [ ] `docs/content.md` agrees with the case-study contract.
- [ ] Owner approval is recorded.
- [ ] Documentation checks pass.

## Handoff

Include final word count, claim IDs used, the placed-media map, the
reserved-media manifest, unresolved documentation-only markers, forbidden-
language review, the hiring-audience read notes, owner approval, and the
exact content files WO-037 must consume.
