# WO-058 — Premium Card Surfaces and Closing Focal Point

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-058 row is
`READY`.

## Result to Produce

One sourced card vocabulary across the Resume's three card surfaces — the hero
contact card, the credential cards, and the closing action cluster — replacing
the flat hairline boxes with a pointer-lit gradient-border surface, and giving
the Gemini convergence a real focal element to converge on.

## Prerequisites

- WO-056 `DONE`.
- Owner direction RD-008 approved (recorded in
  [`../../design/resume-refinement-decisions.md`](../../design/resume-refinement-decisions.md)).

## Owner Findings (2026-09-10)

1. The hero contact card is generic: flat fill, uniform hairline, five tiny
   underlined mono links wrapping into a ragged row, default pills, and a
   "Contact" link that duplicates the Email link beside it.
2. The Education cards are generic: the same flat surface with one line of
   text in a tall empty body; both cards are visually identical, so the fan
   stack has nothing to stack.
3. The close needs refinement: the four pills float above a ~500px band of
   paths that converge on nothing; the footer rule lands right under the
   drawing; the "Contact" pill repeats the "Contact" heading (R-013).

## Source Policy

Batch 08's Source Policy binds: no component is authored from scratch; every
visual component is adapted from a public, free source and recorded in
[`../../component-provenance.md`](../../component-provenance.md).

| Surface | Source | License | Dependency |
| --- | --- | --- | --- |
| Card surface (all three) | [Magic UI — Magic Card](https://magicui.design/docs/components/magic-card) | MIT (`magicuidesign/magicui`) | Existing `motion` only; `next-themes` from the source is dropped |
| Traveling beam (hero card, closing card) | [Magic UI — Border Beam](https://magicui.design/docs/components/border-beam) | MIT (`magicuidesign/magicui`) | Existing `motion` only |

Both adaptations live in one local file, `src/components/ui/magic-card.tsx`,
styled through the project's tokens in `src/app/globals.css` instead of the
source's Tailwind utilities.

## Branch and Files

Create `wo/wo-058-resume-premium-card-surfaces` from the WO-056 commit.

```text
src/components/ui/magic-card.tsx                       (new, adapted)
src/components/ui/__tests__/magic-card.test.tsx         (new)
src/components/resume/resume-identity-scene.tsx
src/components/resume/resume-credential-stack.tsx
src/components/resume/resume-convergence.tsx
src/components/resume/resume-page.tsx                  (props only)
src/components/resume/__tests__/**
src/app/__tests__/resume-page.test.tsx
src/app/globals.css                                    (magic-card*, resume-identity*, resume-credential-stack*, resume-convergence* only)
docs/component-provenance.md
docs/component-links.txt
docs/design/resume-refinement-decisions.md
docs/work-orders/wo/WO-STATUS.md
```

## Design Contract

- **One vocabulary.** Every card on the page is the same adapted Magic Card:
  a pointer-tracked radial gradient border (accent-a to accent-c over the
  existing line color) and a soft inner spotlight. Without a fine pointer, or
  under reduced motion, the card is a static surface with a faint fixed
  gradient hairline. The beam is reserved for the two primary cards (hero
  contact, closing actions) and never runs under reduced motion.
- **Hero contact card.** Eyebrow uses the existing `labels.contact`; the five
  links become a ledger of rows with hairline dividers, a mono label, and a
  decorative arrow; View PDF is the filled primary pill, Download PDF the
  outline pill. The standalone "Contact" text link is removed because the
  Email row is the same destination.
- **Credential cards.** Header strip anatomy from WO-053 is unchanged. The
  body gains an oversized decorative ordinal (`aria-hidden`) on the right as
  typographic fill; the program title stays on the left. The topmost card in
  the sticky stack gets a faint accent top edge.
- **Closing.** The content grid keeps Languages on the left. The Contact
  column shows the section header and the same five contact links as a ledger.
  The closing action cluster moves into a Magic Card with beam placed at the
  geometric convergence point of the Gemini paths (the source component's own
  centered-control layout). The path band shrinks to what the card needs. In
  static and reduced modes the card renders in normal flow below the grid with
  every action present.
- **No invented content.** Labels, hrefs, `download` targets, and facts are
  unchanged. Ordinals and arrows are decorative and hidden from assistive
  technology.

## Invariants

- Zero new packages; WO-044 budgets hold (CLS ≤ 0.05, no Resume long task
  over 200 ms, ≤ 20 KiB gzip client-JS delta against the WO-049 freeze).
- One `h1`; heading order unchanged; chapter IDs and TOC labels unchanged.
- The Gemini geometry, `PATH_RANGES`, and scroll offset from WO-055 are
  unchanged.
- No canvas, WebGL, or `requestAnimationFrame` loop in the new component.
- Every link keeps its `href`, `target`, `rel`, and `download` attributes.

## Non-Goals

- Career cards, capability orbit, chapter navigation, backdrop.
- Changing action targets, labels, or PDFs.
- Replacing any approved Batch 08 source component.

## Ordered Implementation

1. Record the base commit.
2. Add tests first: the Magic Card adapter (children, static vs animated,
   decorative beam, no pointer handlers when static); identity ledger and
   link count; credential ghost ordinal; convergence ledger, focal card, and
   scoped action assertions.
3. Adapt Magic Card and Border Beam into `src/components/ui/magic-card.tsx`.
4. Apply to the hero, credential, and closing surfaces; write the CSS.
5. Verify in the browser at 1440 and 375 in both locales, plus reduced motion.
6. Update provenance and links, run validation, commit, move WO-058 to
   `REVIEW`, and stop.

## Automated Checks

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
git diff -- src/content package.json pnpm-lock.yaml pnpm-workspace.yaml
rg -n "requestAnimationFrame|<canvas|WebGL" src/components/ui/magic-card.tsx
```

The content and manifest diff must be empty.

## Acceptance Checklist

- [ ] Hero, credential, and closing cards share the adapted Magic Card surface.
- [ ] Beam runs only on the two primary cards and never under reduced motion.
- [ ] The Gemini paths converge on the closing action card.
- [ ] Static, reduced, and mobile modes render every link and fact.
- [ ] Link targets, labels, PDF hashes, heading order, and TOC unchanged.
- [ ] Provenance updated; validation passes; manifest diff empty.

## Handoff

Report the commit; captures at 1440 and 375 in both locales plus reduced
motion; provenance; and open items.
