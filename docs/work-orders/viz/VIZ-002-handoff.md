# VIZ-002 — Motion Runtime Foundation Handoff

**Status:** `DONE` — owner accepted the handoff on 2026-08-03 and waived the
outstanding independent GPU-browser evidence.
**Implementation date:** 2026-08-03

## Delivered

- Exact runtime pins: `motion@12.43.0`, `lenis@1.3.25`.
- One site-level `MotionRuntime` in `layout.tsx`: `MotionConfig` preserves the
  user preference, root `ReactLenis` owns document smoothing, and the sole GSAP
  ticker callback drives Lenis while Lenis updates `ScrollTrigger` and the
  shared normalized `MotionValue`.
- `useMotionRuntime()` and BSMNT-compatible
  `useSceneTimeline(scopeRef, createTimeline, dependencies)` with scoped GSAP
  context, ScrollTrigger, and custom-cleanup teardown.
- Consumer contract and examples in
  [`src/components/motion/README.md`](../../../src/components/motion/README.md).
- CSS `scroll-behavior: smooth` removed. The WebGL manager remains the only
  WebGL owner; desktop budget is reconciled at 8 until VIZ-003/VIZ-005 remove
  the currently mounted rejected effects.

## Automated evidence

| Check | Result |
| --- | --- |
| `pnpm run test` | Pass — 15 files, 83 tests |
| `pnpm run lint` | Pass |
| `pnpm run typecheck` | Pass |
| `pnpm run build` | Pass — `/` and `/work/aegis` static |
| `git diff --check` | Pass |
| Runtime lifecycle unit tests | Pass — Lenis progress/ScrollTrigger bridge, ticker cleanup, scene-context/custom cleanup, reduced-motion suppression |

## Browser smoke evidence

Chrome via `agent-browser`, normal motion:

| Viewport | Result |
| --- | --- |
| 1440×900 | Homepage and `/work/aegis` render; `scroll-behavior` is `auto`; 2-second requestAnimationFrame sample: 52 fps. |
| 375×780 | Mobile navigation and content render; 2-second requestAnimationFrame sample: 52 fps. |
| Reduced motion, 375×780 | `prefers-reduced-motion: reduce` detected; hero remains present and `scroll-behavior` remains `auto`. |
| Navigation | Homepage → `/work/aegis` → `/#work` lands at the Work section. Two repeated homepage/Aegis cycles left the observed canvas/context count at 0 before and after. |
| Keyboard | `Tab`, then `Enter` on Skip to content moves focus to `main#main-content`. |

## Review limits and known findings

- The available Chrome automation environment exposed no usable WebGL context,
  so the page correctly exercised static fallbacks and reported 0 canvases / 0
  contexts rather than the shipped GPU baseline of 2 / 2. A GPU-capable browser
  must record the required before/after context counts and sustained frame rates
  before VIZ-002 can be marked `DONE`.
- Homepage axe still reports the pre-existing serious
  `scrollable-region-focusable` finding on `.overflow-x-hidden`; color contrast
  is incomplete under the automated renderer. Neither was introduced by this
  runtime-only order. VIZ-004/VIZ-006 must resolve or formally assess them on
  the assembled page.
- The owner accepted this handoff and waived the outstanding independent
  GPU-browser evidence. VIZ-003 through VIZ-005 are now `READY`; VIZ-004 and
  VIZ-006 retain responsibility for the noted accessibility and assembled-page
  GPU review.
