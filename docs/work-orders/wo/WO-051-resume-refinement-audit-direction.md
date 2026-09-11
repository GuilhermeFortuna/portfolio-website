# WO-051 — Resume Refinement Audit and Visual Direction

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-051 row is
`READY`.

## Result to Produce

1. A numbered, complete **refinement defect register** for the Resume in both
   locales, with every finding assigned to exactly one of WO-052 through WO-056.
2. An **owner-approved visual direction** for each refinement surface — career
   cards, credential cards, languages, Gemini convergence, and page rhythm —
   expressed as static mockups built from the existing tokens.

No product code changes in this order.

## Prerequisites

- WO-049 `DONE`, owner-accepted, and frozen at a named commit.

## Branch and Files

Create `wo/wo-051-resume-refinement-audit-direction` from the WO-049 freeze.

```text
docs/design/resume-refinement-decisions.md          (new)
docs/design/evidence/resume-refinement/**           (new: captures and mockups)
docs/work-orders/wo/WO-STATUS.md
```

## Audit Scope

Audit the production build (`pnpm build && pnpm start`, never `next dev`) of
`/resume` and `/pt-BR/resume` at 1730×900, 1440×900, 1024×768, and 375×780, in
enhanced and reduced-motion modes. For each chapter — identity, capabilities,
experience, credentials, languages/contact, convergence — capture the rest state
and at least one mid-transition state.

Record each finding with: ID (`R-001`…), chapter, viewport/mode, screenshot path,
description, severity (`MAJOR` blocks the batch / `MINOR`), and owning WO.

The register must at least resolve the five owner findings in
[`BATCH-09-README.md`](BATCH-09-README.md#owner-findings-2026-09-10), and must
explicitly check:

- dead space inside cards and columns at each desktop width;
- whether the stack scale residue on credentials reads as depth or as error;
- header pattern consistency across all chapters (eyebrow, title, rule);
- duplicated text visible at once (e.g. "Remote" in both the period and role
  lines; "Contact" as both a heading and a link) — classify each as
  *presentation* (fixable here) or *content* (needs an owner WO-040 amendment);
- credential order (currently 2014–2018, 2024–Present, 2011–2013) — a content
  question for the owner, not a presentation fix;
- reading-trace continuity, hero contact-cluster anchoring, and closing-action
  styling against the site's existing CTA vocabulary.

## Visual Direction

For each of the five surfaces, produce **two** static directions at 1440 wide
and one mobile frame, using only existing tokens, fonts, radii, and line
styles. For every direction, write down: the card/section anatomy, what fills
the space that is currently empty, how state (active chapter, stack depth,
convergence) is shown, the fallback appearance, and which content fields feed
each element. A direction that needs content that doesn't exist is rejected
before it reaches the owner.

Present both directions per surface to the owner. Record the chosen direction,
the rejected one, and the owner's notes in
`docs/design/resume-refinement-decisions.md` as numbered decisions `RD-001`….

## Non-Goals

- No product code, CSS, test, or dependency change.
- No new content, and no reordering of content. Content questions go to the
  owner as explicit decisions.
- No new source component. Directions adapt the approved Batch 08 sources.

## Ordered Implementation

1. Record base commit, dirty state, manifest hashes, and toolchain versions.
2. Build production output and capture the full audit matrix.
3. Write the defect register and assign every finding to one owning WO.
4. Draft two directions per surface, check each against the no-invented-content
   rule, and present them to the owner.
5. Record decisions `RD-###`, content questions and their answers, and any
   finding the owner defers.
6. Commit the decisions record and evidence, move WO-051 to `REVIEW`, and stop.

## Automated Checks

```bash
git diff --check
git diff --stat -- src package.json pnpm-lock.yaml pnpm-workspace.yaml public
rg -n "T[B]D|TO[D]O|placehold[e]r" docs/design/resume-refinement-decisions.md
```

The `src`/manifest/`public` diff must be empty.

## Acceptance Checklist

- [ ] Both locales audited at all four viewports in enhanced and reduced motion.
- [ ] Every finding has an ID, evidence, severity, and exactly one owning WO.
- [ ] All five owner findings are covered by at least one register entry.
- [ ] Every presentation-vs-content duplication is classified; content items
      have a recorded owner answer or deferral.
- [ ] Each surface has an owner-approved direction with anatomy, state, fallback,
      and field mapping, using only existing tokens and content.
- [ ] No product code, manifest, or public asset changed.

## Handoff

Report the commit; the defect register summary (counts by chapter, severity, and
owning WO); the approved direction per surface with the rejected alternative;
content decisions; and any deferred finding.
