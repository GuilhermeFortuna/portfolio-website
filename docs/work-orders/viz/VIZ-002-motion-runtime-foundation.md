# VIZ-002 — Motion Runtime Foundation

## Status

See [`VIZ-STATUS.md`](VIZ-STATUS.md). Dispatch only when the VIZ-002 row is
`READY`.

## Result to Produce

One motion runtime with one owner per concern, so VIZ-003, VIZ-004, and VIZ-005
can be built in parallel by different agents without fighting each other over
the scroll position, the frame loop, or the GPU.

This order ships no visible feature. It is the reason the three that follow can
run at the same time.

## Prerequisites

- VIZ-001 `DONE`

## Files to Create or Modify

```text
package.json
pnpm-lock.yaml
src/app/layout.tsx
src/app/globals.css
src/components/motion/**          (new)
src/components/webgl/webgl-manager.tsx
src/components/webgl/managed-webgl-effect.tsx
docs/work-orders/wo/IMPLEMENTATION-SPEC.md
docs/component-provenance.md
docs/work-orders/viz/VIZ-STATUS.md
```

Stay out of Batch 04's write scope — see the line index. If `globals.css` tokens
change, say so explicitly in the handoff; Batch 04's captures and the Aegis
contrast fix both depend on them.

## Already Installed

Verified 2026-08-03:

```text
gsap 3.15.0    three 0.185.1    ogl 1.0.11
@paper-design/shaders 0.0.78    @tsparticles/{engine,react,slim} 4.3.2
```

`IMPLEMENTATION-SPEC.md` §9 already specifies the two additions and pins them:

```text
motion@12.43.0
lenis@1.3.25
```

Those pins are a prior decision, not a law. If VIZ-001 selected something that
argues for different versions or a different library, take it and record why.
Ship a coherent runtime, not a compliant one.

## Ownership Split

The specification already describes the intended split. Implement it, or replace
it with something better and update the specification to match:

| Concern | Owner |
| --- | --- |
| Smooth document scroll | Lenis — exactly one root instance |
| State-driven transitions, layout, presence, hover/tap | Motion |
| Authored timelines, scroll-linked sequences | GSAP + ScrollTrigger |
| Simple visual transitions | CSS |
| Canvas animation | The WebGL manager, exclusively |

The rules that make parallel work possible:

- Exactly one site-level `MotionConfig`; it preserves the operating-system
  reduced-motion preference rather than overriding it.
- Exactly one root `ReactLenis`. No component constructs Lenis, creates another
  scroll container, calls root `useScroll`, or owns a page RAF.
- Lenis feeds `ScrollTrigger.update`, one shared progress value, and the GSAP
  ticker. Every subscription and ticker callback is removed on cleanup.
- Remove CSS `scroll-behavior: smooth`. Lenis must preserve native anchors,
  keyboard and touch scrolling, sticky positioning, and history restoration —
  the header's `/#work` style links and the skip link both depend on this.
- No third-party WebGL component mounts outside the manager.

## The WebGL Budget Is Open

The current desktop cost budget is `7` (low `1`, medium `2`, high `3`), raised
from `4` on 2026-07-30 because the hero effects consumed everything and Shape
Blur never mounted at a normal reading position. Mobile is `3`.

That budget was fitted to the current effect set. If VIZ-001 changed the set,
refit it — measure rather than guess, and record the frame rates that justify
the new number. The manager's near-viewport mounting, visibility gating, DPR
cap, pausing, and cleanup are all worth keeping regardless of what runs inside.

## Interface Contract for VIZ-003 / 004 / 005

Those three orders will be written against whatever this order exposes, so the
API matters more than the internals. Define and document, before handoff:

- how a section subscribes to scroll progress without creating its own listener
- how a section registers an authored timeline and gets it cleaned up
- how a section requests a WebGL slot and what it renders when refused
- how anything checks reduced motion
- what a component must never do

Write this as a short document with real code examples. Three agents will read
it and nothing else.

## Verification

Runtime foundations fail in ways that only show under load and interaction:

- Navigate between `/` and `/work/aegis` repeatedly. Confirm no listener, RAF,
  ticker callback, or WebGL context leaks. Record context counts before and
  after — the shipped baseline is 2 canvases / 2 contexts on the homepage.
- Anchor links, browser back, keyboard scrolling, and the skip link still work
  with Lenis mounted.
- Reduced motion produces a still, usable page.
- Sustained frame rate at 1440×900 and on a mobile viewport, recorded per
  browser.
- `/work/aegis` renders and behaves exactly as it did before this order.

## Automated Checks

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
```

## Acceptance Checklist

- [ ] One `MotionConfig`, one `ReactLenis`, one ticker, one scroll source.
- [ ] Reduced motion is honored from the operating system, not overridden.
- [ ] Anchors, keyboard scroll, back/forward, and the skip link all still work.
- [ ] No leaked listeners, RAFs, tickers, or WebGL contexts across navigation,
      with before/after counts recorded.
- [ ] The WebGL budget is either kept with justification or refitted with
      measurements.
- [ ] The interface contract is documented with working code examples.
- [ ] `IMPLEMENTATION-SPEC.md` §9 matches what was actually built.
- [ ] `/work/aegis` is unchanged in appearance and behavior.
- [ ] Tests, lint, type-check, build, and diff checks pass.

## Handoff

Include the dependency delta, the ownership split as built, the interface
contract document, leak evidence with before/after counts, frame rates per
browser and viewport, reduced-motion evidence, the specification sections
updated, proof `/work/aegis` is unregressed, and anything VIZ-003 through
VIZ-005 must not do.
