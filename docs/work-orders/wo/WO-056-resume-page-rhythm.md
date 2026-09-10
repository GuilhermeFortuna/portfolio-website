# WO-056 — Page Rhythm and Residual Findings

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-056 row is
`READY`.

## Result to Produce

One consistent page rhythm across all Resume chapters — a single section-header
system, a spacing scale, and rule usage — plus closure of every remaining
WO-051 register item owned by this order (the "among other things" findings).

## Prerequisites

- WO-055 `DONE`.
- WO-051 page-rhythm direction approved.

## Branch and Files

Create `wo/wo-056-resume-page-rhythm` from the WO-055 commit.

```text
src/components/resume/**                    (header/spacing markup only)
src/components/resume/__tests__/**
src/app/__tests__/resume-page.test.tsx
src/app/globals.css                         (Resume selectors/tokens only)
docs/work-orders/wo/WO-STATUS.md
```

## Scope

Only these, and only as specified by the approved direction and the register:

1. **Section-header system.** Identity excepted, every chapter uses the same
   header pattern (eyebrow, title, rule). Today Experience has eyebrow + title +
   rule, Credentials has title + rule, and Languages/Contact use bare titles.
2. **Spacing and rules.** One vertical rhythm between chapters; remove stacked or
   doubled rules left over from separate component orders.
3. **Reading trace continuity.** The tracing beam reads as one continuous line
   through the page, not disconnected segments.
4. **Hero anchoring.** The identity contact/PDF cluster anchors to the hero
   layout rather than floating mid-right; data-plate labels keep legible
   contrast or leave the composition.
5. **Every other WO-051 register item assigned to WO-056.** List each by ID in
   the handoff with its resolution.

## Invariants

- One `h1`; heading levels stay ordered; the chapter IDs and TOC labels are
  unchanged.
- The card vocabulary frozen in WO-052/053 and the close from WO-054/055 aren't
  redesigned here — only aligned to the shared rhythm.
- No content, dependency, or runtime change.

## Non-Goals

- New sections, chapters, or effects.
- Register items that belong to WO-052 through WO-055; route those back rather
  than fixing them here.

## Ordered Implementation

1. Record base commit and a full-page capture at 1440 and 375 in both locales.
2. Add tests first: a heading-order test across the page; every chapter header
   exposes the shared structure; the TOC labels are unchanged.
3. Implement the header system, then spacing and rules, then trace continuity,
   then hero anchoring, then the remaining register items in page order.
4. Re-capture the full page and check each register item against its evidence.
5. Run validation, commit, move WO-056 to `REVIEW`, and stop.

## Automated Checks

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
git diff -- src/content package.json pnpm-lock.yaml pnpm-workspace.yaml
```

The content and manifest diff must be empty.

## Acceptance Checklist

- [ ] All non-identity chapters share one header pattern.
- [ ] Chapter spacing follows one rhythm with no doubled rules.
- [ ] The reading trace is continuous at 1440 and 1730.
- [ ] The hero contact cluster is anchored and data plates are legible or removed.
- [ ] Every register item assigned to WO-056 is resolved or deferred with owner
      approval, by ID.
- [ ] Heading order and TOC labels are unchanged; validation passes.

## Handoff

Report the commit; full-page before/after captures per locale; the register
items by ID with their resolution; and anything deferred.
