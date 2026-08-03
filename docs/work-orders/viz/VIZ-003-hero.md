# VIZ-003 — Hero

## Status

See [`VIZ-STATUS.md`](VIZ-STATUS.md). Dispatch only when the VIZ-003 row is
`READY`. May run in parallel with VIZ-004 and VIZ-005.

## Result to Produce

A first screen that lands the claim — *Guilherme builds ambitious software
systems* — before the visitor decides whether to keep scrolling.

## Prerequisites

- VIZ-002 `DONE`

## Files to Create or Modify

```text
src/components/sections/hero-section.tsx
src/components/effects/**          (as the approved direction requires)
src/components/ui/**
src/app/globals.css
docs/component-provenance.md
docs/work-orders/viz/VIZ-STATUS.md
```

Coordinate with VIZ-004 and VIZ-005 on `globals.css` and shared primitives.
Stay out of Batch 04's write scope.

## What the Hero Has to Do

The hero is the only section that gets judged before it is read. It carries:

- eyebrow `GUILHERME`
- headline `I build ambitious software systems.`
- disciplines `AI · Product Engineering · Data · Infrastructure`
- a supporting line
- primary action `Explore my work` → `/work/aegis`
- secondary action `View GitHub`

Copy is fixed by `docs/content.md` and approved. Presentation is entirely open:
type scale, weight, entrance, layout, background, whether the CTA is still a
Liquid Metal button, whether there is a background effect at all.

The one measure that matters: a visitor who sees only this screen should
understand what this person does and want to see more.

## Current State

Line Waves (WebGL, `hero` priority, cost `high`, the only effect allowed on
mobile in simplified form) plus a Liquid Metal CTA. There is also a pre-existing
owner spacing change converting the disciplines and body `mt-*` utilities to
inline `marginTop`, uncommitted since before WO-022 — clean that up as part of
this work.

Whether Line Waves survives is VIZ-001's decision, not this order's. Implement
what the ledger selected.

## Known Trap

The homepage entrance animation is GSAP-driven and reveals text from
`opacity: 0.3` with a blur. A WO-023 axe scan mid-animation reported 28 contrast
violations that were an artifact of scanning before the animation settled — the
settled text computes to 17.9:1.

If this hero animates text opacity or blur on entrance, the same false positive
will recur in VIZ-006. Either scan settled, or design the entrance so
intermediate states also pass contrast. Say which one you chose.

## Verification

- Sustained frame rate during the entrance and at rest, per browser, at
  1440×900 and on mobile.
- Reduced motion: a still, complete, well-composed first screen — not the
  animated one with the motion removed and holes left behind.
- Keyboard: both actions reachable, focus visible, targets at least 44 px.
- No layout shift; record CLS.
- No-JS: the hero still renders its copy and both actions.
- 200% zoom and 375 px width without overflow.

## Automated Checks

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
```

## Acceptance Checklist

- [ ] Approved copy renders verbatim; no wording changed.
- [ ] Both actions work, are keyboard-reachable, and meet target size.
- [ ] Reduced motion produces a deliberately composed still state.
- [ ] Frame rate recorded per browser and viewport, entrance and at rest.
- [ ] CLS recorded and effectively zero.
- [ ] No-JS renders copy and actions.
- [ ] The contrast-during-animation decision is stated.
- [ ] The inline `marginTop` leftovers are resolved.
- [ ] Any WebGL registers through the manager and respects the budget.
- [ ] Tests, lint, type-check, build, and diff checks pass.

## Handoff

Include before/after screenshots and a recording at desktop and mobile, frame
rates, the reduced-motion still, CLS, the contrast decision, any new dependency
with provenance, and every specification section superseded.
