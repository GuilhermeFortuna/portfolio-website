# WO-025 — Motion Runtime and Forced-Motion Migration

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when WO-025 is `READY`.

## Result to Produce

Install the owner-pinned Motion and Lenis runtimes, establish exactly one root
smooth-scroll/GSAP integration, and remove every active reduced-motion branch
without changing the visible portfolio composition or adding case-study scenes.

## Prerequisites

- WO-024 `DONE`
- Motion/Lenis rows in `docs/batch-04-component-source-register.md` accepted

## Files to Create or Modify

```text
README.md
docs/component-provenance.md
docs/portfolio-component-blueprint.md
docs/work-orders/wo/IMPLEMENTATION-SPEC.md
package.json
pnpm-lock.yaml
src/app/layout.tsx
src/app/globals.css
src/components/providers/portfolio-motion-provider.tsx
src/components/providers/portfolio-motion-context.ts
src/components/providers/__tests__/portfolio-motion-provider.test.tsx
src/components/effects/scroll-reveal.tsx
src/components/effects/sparkles.tsx
src/components/sections/process-section.tsx
src/components/ui/logo-loop.tsx
src/components/webgl/webgl-manager.tsx
src/hooks/use-effect-activity.ts
src/hooks/use-motion-preference.ts                 # delete
src/hooks/__tests__/use-motion-preference.test.tsx # delete
src/hooks/__tests__/use-effect-activity.test.tsx
src/app/__tests__/page.test.tsx
docs/work-orders/wo/WO-STATUS.md
```

Touch another test only when it imports the deleted hook or asserts the old
policy. Record it in the handoff.

## Dependencies

Install exactly:

```bash
pnpm add --save-exact motion@12.43.0 lenis@1.3.25
```

Do not install BSMNT or any D-008–D-014 source dependency in this order.

## Root Provider Contract

Mount one `PortfolioMotionProvider` in `src/app/layout.tsx`:

```tsx
<MotionConfig reducedMotion="never">
  <ReactLenis root options={lenisOptions} ref={lenisRef}>
    {children}
  </ReactLenis>
</MotionConfig>
```

Use:

```ts
{
  autoRaf: false,
  anchors: true,
  duration: 1.05,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false,
  infinite: false,
  overscroll: true,
}
```

Import `lenis/dist/lenis.css`; remove CSS `scroll-behavior: smooth`. Feed Lenis
into the existing GSAP ticker exactly once with `lenis.raf(time * 1000)` and
`lenis.on("scroll", ScrollTrigger.update)`. Cleanup removes both callbacks.
Stop Lenis while the document is hidden; restart and refresh once when visible.

Expose through context:

```ts
export type PortfolioScrollSnapshot = {
  scroll: number;
  limit: number;
  velocity: number;
  direction: 1 | -1 | 0;
  progress: number;
};

export function usePortfolioLenis(): Lenis | null;
export function usePortfolioScrollSnapshot(): PortfolioScrollSnapshot;
```

Use one external-store subscription so consumers do not create root scroll
listeners. Components may consume the instance but may not construct Lenis,
call root Motion `useScroll`, register another GSAP ticker, or own a page RAF.

## Forced-Motion Migration

1. Delete `use-motion-preference.ts` and its test.
2. Remove `@media (prefers-reduced-motion: reduce)` from `globals.css`.
3. Remove preference imports, media queries, branches, static substitutions,
   and tests from Scroll Reveal, Sparkles, Process, Logo Loop,
   `useEffectActivity`, and `WebGLManager`.
4. Keep capability, visibility, near-viewport, Save-Data, mobile budget,
   context-loss, failure, and cleanup behavior.
5. Update active README/provenance/blueprint/spec wording. Historical completed
   Work Orders and evidence rows remain untouched.

OS `reduce` and `no-preference` must produce the same authored behavior. This
order does not authorize new animation or visual restaging.

## Procedure

1. Record repository status and verify WO-024 dependency metadata.
2. Install exact Motion/Lenis versions.
3. Implement provider, context, one Lenis subscription, and one GSAP hookup.
4. Complete the forced-motion migration in the fixed file list.
5. Update affected tests and active documentation.
6. Verify homepage appearance and behavior remain compositionally unchanged.
7. Test anchors, keyboard/touch, history, visibility pause/resume, remount, and
   provider cleanup before moving to review.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
pnpm list motion lenis --depth 0
rg -n "prefers-reduced-motion|useMotionPreference" src README.md docs/component-provenance.md docs/portfolio-component-blueprint.md
rg -n "new Lenis|useScroll\(|requestAnimationFrame" src/components/providers
git diff --check
```

The preference search must return no active match. Runtime-owner matches must be
limited to the documented root provider implementation.

## Manual Checks

- Homepage at 1440×900, 768×1024, 390×844, and 200% zoom.
- OS `reduce` and `no-preference`, wheel, keyboard, touch, anchors, browser back,
  hidden-tab restore, React development remount, and route change.
- Count Lenis instances, GSAP ticker callbacks, scroll subscriptions, and RAFs
  before mount, while active, and after provider cleanup.

## Acceptance Checklist

- [ ] Exact Motion/Lenis direct dependencies and lockfile integrity are proven.
- [ ] One MotionConfig and one root Lenis wrap the existing site.
- [ ] One Lenis/GSAP integration and one shared scroll subscription exist.
- [ ] No active reduced-motion branch or preference hook remains.
- [ ] Existing lifecycle/capability gates remain intact.
- [ ] Anchors, input, sticky behavior, history, hidden-tab resume, and cleanup pass.
- [ ] Homepage composition, copy, media, and WebGL budgets are unchanged.
- [ ] No BSMNT or visual-scene implementation entered this order.
- [ ] Repository and browser checks pass.

## Handoff

Include dependency delta, removed preference branches, remaining lifecycle
gates, provider/context API, owner counts before/after cleanup, OS-preference
comparison, homepage captures, automated results, and deviations.

