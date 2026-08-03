# WO-026 — Q Case-Study Content Contract

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-026 row is
`READY`.

## Result to Produce

An owner-approved, implementation-ready Q narrative with exact visible copy,
media placement, and evidence references.

## Prerequisites

- WO-025 `DONE`

## Files to Create or Modify

```text
docs/q-case-study-content.md
docs/content.md
docs/work-orders/wo/WO-STATUS.md
```

Do not create or modify public route code in this order.

## Fixed Narrative Structure

Use this order. It matches the Aegis twelve-part structure so the two chapters
read as one series (batch constraint D-002).

1. Hero: project, role, period, state, concise proposition.
2. Context: the Brazilian futures market, what the tool is for, and the
   six-year lineage — this is the idea that made the owner learn to program,
   rebuilt many times, now in its most capable form. Aegis has no equivalent
   claim, and it is the strongest thing in this chapter.
3. Problem: turning a strategy idea into something testable, optimizable,
   validatable, and deployable without trusting a single backtest.
4. System overview: desktop shell, SPA, API, worker pool, queue, database,
   market-data ingestion, and the MT5 boundary.
5. Decision 1.
6. Decision 2.
7. Decision 3.
8. Decision 4.
9. Contribution: end-to-end ownership with AI assistance.
10. Evidence/result: implemented capabilities and honest limits only.
11. Technology in context.
12. Disclosure note and return-to-work/contact actions.

The four decisions are chosen from WO-024's accepted claims, not from this list.
Strong candidates, subject to evidence: the desktop-application boundary and why
Tauri rather than a web app; separating heavy computation into a queued worker
pool instead of blocking the API; the research pipeline that forces
walk-forward validation between backtest and deployment; and the fixture-first
frontend that lets the interface ship against MSW before the API exists.

## Required Copy Facts

The content must state, without exaggeration, using the values WO-024 accepted:

- the public name `Quant` and the category `Quantitative systems`
- founder and sole developer; the owner's own product, not client or employer
  work
- a research, backtesting, and future-execution tool for the **Brazilian
  futures market**
- the two timelines, kept separate: the idea is ≈six years old and has been
  rebuilt many times; **this** implementation dates from April 2026. Never let a
  sentence imply the current codebase is six years old.
- designed and built end to end by Guilherme, with AI assistance (Cursor was a
  tool, not a contributor)
- built as a native desktop application
- execution is a future capability; the tool is used today for research and
  backtesting, matching the locked live-trading state WO-024 verified in source
- project source is private

## Writing Rules

- First person for decisions and ownership.
- Explain the problem before naming technologies.
- Each technical claim cites a WO-024 claim ID in an adjacent author note inside
  `docs/q-case-study-content.md`.
- Use no more than four primary engineering decisions.
- Do not use `production-ready`, `revolutionary`, `state-of-the-art`,
  `enterprise-grade`, `real-time`, `high-frequency`, or `high-performance`
  unless the evidence register accepts the exact usage. Both Q READMEs use
  several of these; none carries over on README authority.
- Do not state a profit, return, Sharpe, win rate, alpha, or edge as a real
  result. Describing what the system *computes* is fine and is the whole point;
  claiming what it *earned* is the invented-metric rule `docs/content.md`
  already applies to every chapter.
- Do not imply AI independently built the product. State that AI assisted
  Guilherme's work.
- Use `Result` or `Delivered`, not `Impact`.
- State the deferred and redirecting parts honestly, as the Aegis chapter states
  its three known gaps. A twelve-workspace application with deferred panels is
  more credible when it says so.

## Media Placement Rules

WO-025 delivers substantially more media than Aegis's four screenshots. The
narrative must not become a gallery with captions.

- At most **one** image per narrative section.
- Every placed image must explain the adjacent prose. An image that only looks
  good is not placed here; it is recorded as **reserved for the later visual
  batch** in an explicit manifest section of the content contract.
- Reserving an image is a first-class outcome of this order, not a failure. The
  capture set is deliberately larger than this page needs.
- Captions describe what the reader is looking at and why it matters. Mentioning
  demo data once, where it is genuinely useful context, is enough; do not repeat
  a disclaimer on every figure.
- Alt text is accurate and informative; empty alt only where adjacent prose
  fully duplicates the image's information.
- The hero still is chosen for visual impact and carries no caption, matching
  the Aegis hero.

## Procedure

1. Reconcile WO-024 claims with WO-025's accepted media.
2. Draft `docs/q-case-study-content.md` using the fixed structure. For every
   section include exact heading, visible body copy, selected media filename,
   alt text or decorative decision, caption, and claim IDs.
3. Keep the page comparable in weight to Aegis: hero support ≤55 words, each
   decision body ≤140 words, total visible prose 900–1,400 words.
4. Write the reserved-media manifest for every captured asset not placed on the
   page, with a one-line note on what it could support later.
5. Update the Quant chapter and metadata facts in `docs/content.md`: the title
   becomes `Quant — …`, and the hero **omits** the live-environment control
   entirely rather than rendering Aegis's disabled `Live environment — coming
   soon` pill (locked owner fact 8 — a desktop application has no live URL to
   wait for). Confirm the owner has not overruled that recommendation before
   drafting. Resolve existing Q `[REQUIRED: ...]` markers only where evidence
   now exists.
6. Add the public disclosure note: private source and the verified execution
   status.
7. Run a claim-by-claim comparison against `docs/q-case-study-evidence.md`. Any
   ungrounded sentence is removed or converted to a documentation-only
   `[REQUIRED: ...]` marker.
8. Request owner review of the complete visible copy. Record the exact approval
   or requested changes in the WO-STATUS gate log.
9. Move WO-026 to `REVIEW`. WO-027 stays blocked until a reviewer and the owner
   accept the content contract.

## Automated Checks

```bash
git diff --check
rg -n "paper|locked|AI assistance" docs/q-case-study-content.md
rg -n "revolutionary|state-of-the-art|enterprise-grade|production-ready|real-time|high-frequency|high-performance" docs/q-case-study-content.md
rg -n "Sharpe|win rate|profit|alpha|edge|outperform" docs/q-case-study-content.md
rg -n "\[REQUIRED:" docs/q-case-study-content.md docs/content.md
```

Every match in the second, third, and fourth searches must be reviewed and
explained. Public copy cannot contain a required marker.

## Acceptance Checklist

- [ ] The narrative follows the fixed twelve-part structure.
- [ ] Exact visible copy, media placement, alt text, and captions are
      implementation-ready.
- [ ] Every public claim maps to accepted evidence.
- [ ] No trading outcome is stated as a real result.
- [ ] The verified execution status is stated plainly.
- [ ] At most one image per section; unused captures are listed as reserved.
- [ ] Deferred and redirecting parts of the application are stated honestly.
- [ ] Page weight is comparable to the Aegis chapter.
- [ ] `docs/content.md` agrees with the case-study contract.
- [ ] Owner approval is recorded.
- [ ] Documentation checks pass.

## Handoff

Include final word count, claim IDs used, the placed-media map, the reserved-media
manifest, unresolved documentation-only markers, forbidden-language review, owner
approval, and the exact content files WO-027 must consume.
