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

- [ ] Project selection works with mouse and keyboard in tests.
- [ ] Mobile project content preserves all four records in order.
- [ ] Both reusable hooks cover state changes and cleanup.
- [ ] Tests require no network, WebGL context, real animation frame, or timer delay.
- [ ] Full test suite, coverage, lint, type-check, and build pass.

## Handoff

Record mocks/doubles introduced, lifecycle cases covered, and any behavior that remains browser-only evidence.
