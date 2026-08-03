# WO-031 — gosigapp Case-Study Content Contract

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-031 row is
`READY`.

## Result to Produce

An owner-approved, implementation-ready gosigapp narrative with exact visible
copy, media placement, and evidence references — written to read as
compelling to a hiring engineer or manager, not merely accurate. This chapter
carries the least visual material in the portfolio; the writing has to carry
more of the weight the screenshots carried for Aegis and Quant.

## Prerequisites

- WO-030 `DONE`

## Files to Create or Modify

```text
docs/gosigapp-case-study-content.md
docs/content.md
docs/work-orders/wo/WO-STATUS.md
```

Do not create or modify public route code in this order.

## Fixed Narrative Structure

Use this order. It matches the Aegis/Quant structure, shortened where there
is no video and no multi-screenshot gallery, so all three chapters read as
one series:

1. Hero: project, role, period, state, concise proposition.
2. Context: a betting operator's legal duty to submit daily and monthly
   files to a government regulator (SIGAP), and why that duty makes this a
   compliance-critical system rather than an internal tool with no
   consequences for failure.
3. Problem: getting operator data into the exact signed, encrypted,
   authenticated shape a regulatory API requires, on a recurring schedule,
   with retries and an audit trail — reliably enough that a missed or
   malformed submission is not an option.
4. System overview: the S3 → extract → sign → compress → encode → mTLS
   submit pipeline, using the system-map diagram from WO-030.
5. Decision 1.
6. Decision 2.
7. Decision 3.
8. Contribution: end-to-end ownership with AI assistance.
9. Evidence/result: implemented capabilities and honest limits only.
10. Technology in context.
11. Disclosure note and return-to-work/contact actions.

Three decisions, not four — this chapter has less surface area than Aegis or
Quant, and a forced fourth decision would pad rather than strengthen it.
Choose from WO-029's accepted claims, not from this list. Strong candidates,
subject to evidence: PFX digital signing and mTLS as regulator-imposed
security requirements rather than optional hardening; the retry/audit-trail
design (`internal/job`, `internal/logstore`) that makes a submission
provable after the fact, not just attempted; and the multi-brand,
environment-driven configuration that lets one pipeline serve several
operator brands without code duplication (described generically, never
naming a brand code).

## Required Copy Facts

The content must state, without exaggeration, using the values WO-029
accepted:

- the public name `gosigapp` and its category
- sole developer, built for the same unnamed betting operator as Aegis, not
  the owner's own product
- the pipeline's function: fetch, validate, sign, and submit betting/gaming
  data files to SIGAP on the operator's behalf, satisfying a legal
  compliance duty
- the six SIGAP dataset types and their daily/monthly cadence, at the level
  of specificity WO-029 verified — not necessarily naming all six by their
  Portuguese names if that reads as a spec dump; summarizing the daily/
  monthly split is enough unless the six-way breakdown earns its place
- designed and built end to end by Guilherme, with AI assistance
- deployed to AWS ECS/Fargate via a CI/CD pipeline (GitHub Actions), stated
  as an architectural fact, not an uptime claim
- no live UI exists, so there is no live-environment action on this chapter
- project source is private

## Writing Rules

- First person for decisions and ownership.
- Open with the compliance stakes before the pipeline mechanics — a hiring
  reader should understand *why this had to be correct* in the first two
  sentences, not after a stack rundown.
- Explain the problem before naming technologies.
- Each technical claim cites a WO-029 claim ID in an adjacent author note
  inside `docs/gosigapp-case-study-content.md`.
- Use no more than three primary engineering decisions.
- Do not use `production-ready`, `enterprise-grade`, `state-of-the-art`,
  `mission-critical`, or `bulletproof` unless the evidence register accepts
  the exact usage. The README uses several of these; none carries over on
  README authority.
- Do not state a files-processed count, uptime percentage, submission
  success rate, or regulator feedback as a real result — the same
  no-invented-metrics rule `docs/content.md` applies to every chapter.
- Do not imply AI independently built the pipeline. State that AI assisted
  Guilherme's work.
- Use `Result` or `Delivered`, not `Impact`.
- Frame "no UI" explicitly and positively once, in the context section or
  the system overview — a backend engineer owning a regulator-facing
  pipeline end to end, not a caveat about what's missing. Do not apologize
  for or over-explain the absence of screenshots.
- Never write `BRX`, `RICO`, or any other brand code; describe multi-brand
  support generically.

## Media Placement Rules

WO-030 delivers far less media than Aegis or Quant: one diagram and up to two
CLI/log captures.

- The system-map diagram is placed at the system-overview section; this is
  mandatory, not optional, since it is the chapter's primary visual evidence
  of real architecture.
- Each CLI/log capture is placed only where it directly supports the
  adjacent decision's claim (for example, the audit-trail decision paired
  with the log-excerpt capture). An unused capture from WO-030 is recorded
  as reserved rather than forced onto the page.
- Captions describe what the reader is looking at and, where relevant, note
  that configuration/data shown is a fixture, not production data — stated
  once, not repeated per figure.
- Alt text is accurate and informative for the diagram and every capture.
- The hero has no image if WO-030 produced no hero-appropriate asset; do not
  force the system-map diagram into a hero role it was not designed for.
  Confirm with WO-032 what the hero visual is before finalizing this
  section — it may be typographic/diagram-led rather than photographic,
  unlike Aegis and Quant's heroes.

## Procedure

1. Reconcile WO-029 claims with WO-030's accepted media and its "what could
   not be safely exercised" note.
2. Draft `docs/gosigapp-case-study-content.md` using the fixed structure.
   For every section include exact heading, visible body copy, selected
   media filename (or "reserved"/"none"), alt text or decorative decision,
   caption, and claim IDs.
3. Keep the page comparable in weight to Aegis and Quant: hero support ≤55
   words, each decision body ≤140 words, total visible prose 700–1,100
   words — shorter than Quant's ceiling is expected and fine given less
   surface area, but the copy must still feel complete, not thin.
4. Write the reserved-media manifest for any WO-030 asset not placed on the
   page.
5. Update the gosigapp chapter and metadata facts in `docs/content.md`:
   confirm or correct the reserved `/work/gosigapp` title and summary, and
   record that the hero omits the live-environment control entirely (per
   the existing `docs/content.md` decision and the Batch 05 locked facts).
   Resolve existing gosigapp `[REQUIRED: ...]` markers only where evidence
   now exists.
6. Add the public disclosure note: private source, unnamed employer, and the
   verified deployment status.
7. Run a claim-by-claim comparison against `docs/gosigapp-case-study-
   evidence.md`. Any ungrounded sentence is removed or converted to a
   documentation-only `[REQUIRED: ...]` marker.
8. Read the draft once specifically for a hiring audience: does the opening
   establish real stakes, does each decision read as a deliberate choice
   with a reason, is the language confident without exceeding the evidence.
   Note any place tightened for this pass in the handoff.
9. Request owner review of the complete visible copy. Record the exact
   approval or requested changes in the WO-STATUS gate log.
10. Move WO-031 to `REVIEW`. WO-032 stays blocked until a reviewer and the
    owner accept the content contract.

## Automated Checks

```bash
git diff --check
rg -n "AI assistance|regulator|SIGAP" docs/gosigapp-case-study-content.md
rg -n "production-ready|enterprise-grade|state-of-the-art|mission-critical|bulletproof" docs/gosigapp-case-study-content.md
rg -n "\bBRX\b|\bRICO\b" docs/gosigapp-case-study-content.md docs/content.md
rg -n "uptime|success rate|files processed|regulator feedback" docs/gosigapp-case-study-content.md
rg -n "\[REQUIRED:" docs/gosigapp-case-study-content.md docs/content.md
```

Every match in the second, third, and fourth searches must be reviewed and
explained. Public copy cannot contain a required marker.

## Acceptance Checklist

- [ ] The narrative follows the fixed structure.
- [ ] Exact visible copy, media placement, alt text, and captions are
      implementation-ready.
- [ ] Every public claim maps to accepted WO-029 evidence.
- [ ] No operational metric is stated as a real result.
- [ ] The opening establishes real compliance stakes before mechanics.
- [ ] No brand code or employer-identifying detail appears anywhere.
- [ ] The system-map diagram is placed; any unused WO-030 asset is listed as
      reserved.
- [ ] "No UI" is framed as backend ownership, not apologized for.
- [ ] Page weight is comparable to, and may reasonably be shorter than, the
      Aegis/Quant chapters.
- [ ] `docs/content.md` agrees with the case-study contract.
- [ ] Owner approval is recorded.
- [ ] Documentation checks pass.

## Handoff

Include final word count, claim IDs used, the placed-media map, the reserved-
media manifest, unresolved documentation-only markers, forbidden-language
review, the hiring-audience read notes, owner approval, and the exact content
files WO-032 must consume.
