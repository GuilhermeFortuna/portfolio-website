# VIZ-004 — Scroll Choreography and Section Transitions

## Status

See [`VIZ-STATUS.md`](VIZ-STATUS.md). Dispatch only when the VIZ-004 row is
`READY`. May run in parallel with VIZ-003 and VIZ-005.

## Result to Produce

A page that reads as one continuous piece rather than five sections stacked on
top of each other.

## Prerequisites

- VIZ-002 `DONE`

## Files to Create or Modify

```text
src/app/page.tsx
src/components/sections/about-section.tsx
src/components/sections/process-section.tsx
src/components/sections/contact-section.tsx
src/components/sections/selected-work-section.tsx
src/components/effects/scroll-reveal.tsx
src/components/layout/**
src/app/globals.css
docs/work-orders/wo/IMPLEMENTATION-SPEC.md
docs/work-orders/viz/VIZ-STATUS.md
```

`project-showcase.tsx` belongs to VIZ-005. Coordinate on `globals.css` and
`page.tsx`. Stay out of Batch 04's write scope.

## What This Order Owns

The connective tissue: how sections enter, how they hand off to each other, how
the page's rhythm changes as the visitor moves through it, and whether the
current five-section order is still right.

Current order is Hero → Selected Work → Process → About → Contact, fixed by
`IMPLEMENTATION-SPEC.md` §3. **That order is open.** So is the section count.
If the approved direction wants a transition passage between two sections, or
Process folded into About, or a different sequence entirely, do it and update
§3.

Copy and headings stay as `docs/content.md` approved them. Section IDs
(`top`, `work`, `process`, `about`, `contact`, `main-content`) are referenced by
the header, the skip link, the footer, and `/work/aegis`'s return links — if any
ID changes, every referrer changes with it in the same commit.

## Existing Motion to Reconsider

- **Scroll Reveal** on About — the current primary narrative motion, a GSAP
  word-by-word reveal from `opacity: 0.3` with blur.
- **Logo Loop** on Process — carries the `IDEA → ARCHITECTURE → AGENTS →
  IMPLEMENTATION → TESTING → DEPLOYMENT` sequence. It has an open accessibility
  finding from WO-023 (F-03: axe `scrollable-region-focusable`, and the loop is
  not keyboard-accessible). This order can fix it or replace the component; do
  one of the two rather than inheriting the finding.
- **Sparkles** at the Selected Work introduction — a single section-transition
  accent.
- **Dotted Surface** above the footer — the closing scene.

Each of these has a keep/cut verdict from VIZ-001. Implement it.

## The Hard Part

Scroll choreography is where ambitious pages become unusable. Three specific
failures to design against, not discover:

1. **Scroll hijacking.** The visitor's input should stay predictable. Anything
   that fights the scroll wheel, traps the page, or makes a flick unpredictable
   is a defect, however good it looks in a demo.
2. **Slow reading.** Someone who wants to reach Contact should be able to get
   there quickly. Animation that gates content behind a scroll distance makes
   the page feel long.
3. **Mid-animation states.** Anything caught halfway — by a fast scroll, an
   anchor jump, a browser back, or a resize — must still be readable. Jumping to
   `/#contact` from `/work/aegis` must not land on a section frozen at
   `opacity: 0`.

## Verification

- Fast scroll, slow scroll, flick, and jump-to-anchor from another route: no
  section left in a partial state.
- Every header link, footer link, skip link, and `/work/aegis` return link lands
  on the right section, settled and readable.
- Browser back and forward, and resize mid-animation.
- Reduced motion: the whole page readable with no dependence on scroll position.
- Sustained frame rate while scrolling continuously top to bottom, per browser,
  at 1440×900 and on mobile.
- Time to reach Contact by scrolling deliberately; report it. If it feels long,
  it is long.

## Automated Checks

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
```

## Acceptance Checklist

- [ ] Approved copy and headings render verbatim.
- [ ] Section IDs are intact, or every referrer was updated in the same commit.
- [ ] No scroll hijacking; visitor input stays predictable.
- [ ] No section can be left in an unreadable partial state by any entry path.
- [ ] Anchor navigation from `/work/aegis` lands settled and readable.
- [ ] Reduced motion leaves the page fully readable.
- [ ] Frame rate recorded while scrolling, per browser and viewport.
- [ ] The Logo Loop keyboard/axe finding is fixed or the component is replaced.
- [ ] `IMPLEMENTATION-SPEC.md` §3 matches the shipped order.
- [ ] Tests, lint, type-check, build, and diff checks pass.

## Handoff

Include a full-page scroll recording at desktop and mobile, frame rates, the
anchor-navigation matrix, the reduced-motion pass, the Logo Loop resolution,
time-to-Contact, every specification section superseded, and anything VIZ-006
should scrutinize.
