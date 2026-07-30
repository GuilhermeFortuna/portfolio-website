# WO-016 — Interactive Component and Hook Tests

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-016 row is `READY`.

## Result to Produce

User-focused component and hook tests for Batch 01 interactions that are practical in jsdom, while keeping real WebGL and animation-frame behavior in manual/browser validation.

## Prerequisites

- WO-013
- WO-014
- WO-015

## Files to Create or Modify

```text
src/components/sections/__tests__/project-showcase.test.tsx
src/hooks/__tests__/use-motion-preference.test.tsx
src/hooks/__tests__/use-effect-activity.test.tsx
```

## Procedure

1. Test `ProjectShowcase` desktop selection using click and keyboard focus. Confirm the selected project's label, summary, and diagram contract change together, with no dependence on hover.
2. Test its mobile presentation exposes all four projects in source order and preserves heading hierarchy. Assert the breakpoint mode through an explicit match-media mock rather than layout measurements.
3. Test `useMotionPreference` for initial media-query state and a subsequent preference change, including listener cleanup.
4. Test `useEffectActivity` for visibility/intersection transitions, document visibility, and cleanup. Provide controlled `IntersectionObserver`/document-visibility test doubles; do not use real timers.
5. Mock visual-effect leaves rather than rendering WebGL, GSAP, OGL, or tsParticles. Tests must prove the app's decision boundary and fallback rather than a third-party renderer.

## Automated Checks

```bash
npm run test
npm run test:coverage
npm run lint
npm run typecheck
npm run build
```

## Acceptance Checklist

- [x] Project selection works with mouse and keyboard in tests.
- [x] Mobile project content preserves all four records in order.
- [x] Both reusable hooks cover state changes and cleanup.
- [x] Tests require no network, WebGL context, real animation frame, or timer delay.
- [x] Full test suite, coverage, lint, type-check, and build pass.

## Handoff

### Test count and commands

- Added 9 tests across three files; the full suite contains 34 tests across
  twelve files.
- `npm run test`: pass — 12 files, 34 tests.
- `npm run test:coverage`: pass — hooks at ~93% lines; `ProjectShowcase` covered
  for selection paths.
- `npm run lint`: pass.
- `npm run typecheck`: pass.
- `npm run build`: pass.

### Mocks and doubles

| Double | Purpose |
| --- | --- |
| `ManagedWebGLEffect` → `fallback` | Avoid WebGL registry/canvas; keep decorative slot empty. |
| `ShapeBlur` → `null` | Skip Three.js leaf; selection/diagram contract still asserted. |
| `matchMedia` | Explicit mobile (`max-width: 767px`) vs desktop mode; `(pointer: fine)` for hover policy; reduced-motion for hooks. |
| `IntersectionObserver` class double | Controlled intersect/disconnect without real observers or timers. |
| `document.visibilityState` + `visibilitychange` | Document-visibility transitions for `useEffectActivity`. |

### Lifecycle cases covered

- `ProjectShowcase`: click updates `aria-pressed`, summary/label, and diagram
  together; focus selects without hover; coarse pointer ignores hover; mobile
  articles keep all four projects in source order with `h3` hierarchy.
- `useMotionPreference`: initial media-query snapshot, change notification,
  listener removal on unmount.
- `useEffectActivity`: inactive until intersecting; toggles with document
  visibility; forced inactive under reduced motion; observer disconnect on
  unmount; no observe when ref is null.

### Browser-only evidence (not in jsdom)

Real Shape Blur / WebGL mount, pointer-driven hover selection on fine pointers,
actual CSS `lg:` breakpoint hiding, GSAP/Logo Loop/tsParticles frame loops, and
hardware intersection remain Batch 01 manual/browser validation.
