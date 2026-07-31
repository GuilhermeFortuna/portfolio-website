# WO-024 — Source Snapshot, Forced-Motion Policy, and Experience Foundation

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-024 row is
`READY`.

## Result to Produce

Freeze the exact public components Batch 04 may adapt, record reproducible
source snapshots, apply the owner-approved site-wide forced-motion policy, and
create the single client-side motion state used by case-study routes without
converting their content primitives into client-rendered content.

## Prerequisites

- WO-023 `DONE` with a `GO` decision

## Files to Create or Modify

```text
README.md
docs/aegis-case-study-component-shortlist.md
docs/component-provenance.md
docs/portfolio-component-blueprint.md
docs/work-orders/wo/IMPLEMENTATION-SPEC.md
package.json
pnpm-lock.yaml
src/app/layout.tsx
src/app/globals.css
src/components/providers/portfolio-motion-provider.tsx
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
src/components/case-study/aegis/aegis-experience.tsx
src/components/case-study/aegis/aegis-motion-context.ts
src/components/case-study/aegis/use-aegis-scroll-state.ts
src/components/case-study/aegis/__tests__/use-aegis-scroll-state.test.tsx
src/components/case-study/case-study-shell.tsx
src/app/work/aegis/page.tsx
docs/work-orders/wo/WO-STATUS.md
```

Touch another test only when it imports the deleted hook or asserts the old
policy. Record the additional file in the handoff.

## Component Source Snapshot

Create `docs/aegis-case-study-component-shortlist.md` with one row per locked
Batch 04 component:

| Required field | Meaning |
| --- | --- |
| Role | Background, hero entrance, section reveal, progress, sticky story, or media highlight |
| Provider/component | Exact public provider and component name |
| Canonical URL | Public documentation page from Batch 04 index |
| Source revision | Git commit/tag or immutable registry revision |
| Source file/hash | Exact TS+Tailwind source path and SHA-256 |
| Dependencies | Existing and proposed runtime packages |
| Accepted adaptation | What may change to match portfolio tokens/lifecycle |
| Prohibited adaptation | What behavior must not be reimplemented from scratch |
| Decision | `ACCEPTED` or exact blocker |

Start with the seven locked sources in `BATCH-04-README.md`. React Bits is pinned
to `b9158acb37e7bdfd6c5bc5894da1826fe1d05a6b`; record hashes for `Threads`,
`AnimatedContent`, `FadeContent`, `ScrollStack`, and `GlareHover` from the TypeScript variant.
Pin equivalent immutable revisions and hashes for Magic UI `Scroll Progress`
and Aceternity UI `Sticky Scroll Reveal`.

Stop instead of implementing when:

- source code cannot be obtained from the canonical provider;
- the component cannot be adapted to the single shared Lenis owner without
  changing its signature behavior;
- the component requires a second global scroll owner, a second WebGL context,
  or another unmanaged continuous runtime;
- token normalization would require discarding the component's signature
  mechanic and rebuilding it independently.

Do not substitute a similar component, generate an asset, or create a custom
approximation. Record the blocker in `WO-STATUS.md` for owner selection.

## Public API to Implement

```ts
export const AEGIS_SECTION_IDS = [
  "top",
  "context",
  "problem",
  "system",
  "decision-1",
  "decision-2",
  "decision-3",
  "decision-4",
  "contribution",
  "delivered",
  "technology",
  "confidentiality",
] as const;

export type AegisSectionId = (typeof AEGIS_SECTION_IDS)[number];

export type AegisMotionState = {
  activeSectionId: AegisSectionId;
  progress: number; // clamped 0..1
};

export function useAegisMotion(): AegisMotionState;
```

The state owner is implemented as a shared case-study primitive with an
Aegis route adapter. It accepts `children`, renders them unchanged, and provides
this state. `page.tsx` remains a Server Component. Do not encode Aegis colors,
marks, screenshots, or product terminology into the shared primitive.

## Motion and Lenis Foundation

Install exact production dependencies:

```bash
pnpm add --save-exact motion@12.43.0 lenis@1.3.25
```

Create one `PortfolioMotionProvider` mounted in `src/app/layout.tsx`. It owns:

```tsx
<MotionConfig reducedMotion="never">
  <ReactLenis root options={lenisOptions} ref={lenisRef} />
  {children}
</MotionConfig>
```

Use these Lenis options:

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
  stopInertiaOnNavigate: true,
}
```

Import `lenis/dist/lenis.css`. Remove global `scroll-behavior: smooth` so CSS
and Lenis do not compete.

Integrate Lenis with the existing GSAP ticker exactly once:

```ts
const update = (time: number) => lenisRef.current?.lenis?.raf(time * 1000);
gsap.ticker.add(update);
lenis.on("scroll", ScrollTrigger.update);
```

Cleanup removes the ticker callback and scroll subscription, then lets
`ReactLenis` destroy the instance. Do not add a separate requestAnimationFrame.
Stop Lenis while the document is hidden and restart/recalculate once when it
becomes visible.

The provider also owns one shared Motion `MotionValue<number>` for document
progress and updates it from the Lenis `scroll` event. Magic UI Scroll Progress
and case-study consumers receive that value; they may not call root `useScroll`.

Fixed ownership:

- Motion: state, presence, layout, hover/tap, and accepted sourced component
  internals.
- GSAP: timelines and ScrollTrigger-based React Bits components.
- Lenis: the only smooth-scroll instance and scroll-event source.
- WebGL manager: all canvas animation and lifecycle decisions.

React Bits Scroll Stack must have its internal `new Lenis(...)`, private RAF,
and nested scroll container removed in WO-028; it consumes this shared root
instance instead. No other component may construct Lenis.

## Forced-Motion Migration

1. Delete `use-motion-preference.ts` and its test.
2. Remove the `@media (prefers-reduced-motion: reduce)` block from
   `globals.css`.
3. Remove reduced-motion imports, queries, branches, static-stage substitutions,
   and wording from Scroll Reveal, Sparkles, Process, Logo Loop,
   `useEffectActivity`, and their tests.
4. Remove `REDUCED_MOTION_QUERY` from `WebGLManager`; WebGL eligibility depends
   on capability, visibility, mobile policy, near-viewport state, and budget,
   never an OS motion preference.
5. Keep hidden-tab and offscreen pausing. Keep component cleanup. Do not turn
   every effect into an always-running loop.
6. Update README, provenance, blueprint, and the implementation specification
   so none claims reduced-motion support.
7. Search source, built output, and active documentation for
   `prefers-reduced-motion`, `useMotionPreference`, and `reduced motion`. The
   only permitted matches are historical Batch 01–03 Work Orders and release
   evidence; current implementation and current policy must have zero matches.

## Case-Study Scroll State Algorithm

1. Add `data-aegis-section` to the twelve existing semantic sections. Keep every
   existing `id` and heading association.
2. On mount, query only
   `[data-aegis-section]` inside the current case-study article root. The
   Aegis-prefixed attribute is a Batch 04 migration seam; the state API and
   implementation must otherwise remain reusable.
3. Use one `IntersectionObserver` with
   `rootMargin: "-32% 0px -58% 0px"` and thresholds `[0, 0.01, 0.5, 1]`.
   The active section is the intersecting section nearest the 38% viewport line.
4. If no section intersects, select the last section whose top is above that
   line; default to `top` before measurement.
5. Use the single shared Lenis `scroll` callback to compute article progress:
   `(scrollY - articleTop) / (articleHeight - innerHeight)`, clamped to `0..1`.
   Do not add a window scroll listener, root Motion `useScroll`, or another RAF.
6. Recompute bounds on `resize`; do not add a `ResizeObserver` unless testing
   proves media height changes make the result stale.
7. Pause measurement while `document.visibilityState !== "visible"` and resume
   once on visibility return.
8. The provider may set `data-aegis-active-section` and
   `--aegis-scroll-progress` on its own root. It must not write to `body` or
   retain state after route exit.

## Procedure

1. Record current `git status --short`; preserve Batch 03 and package-manager
   changes already present.
2. Complete the source snapshot register. Do not touch implementation until all
   seven source rows and both runtime dependency rows are `ACCEPTED`.
3. Add the accepted components to `docs/component-provenance.md` as planned
   adaptations, with canonical URLs, pinned revisions, and hashes.
4. Install Motion and Lenis at the exact fixed versions.
5. Implement and test the single root provider, Motion forced-motion config,
   Lenis/GSAP synchronization, visibility behavior, and cleanup.
6. Complete the forced-motion migration and tests.
7. Implement the exact shared case-study state API from Lenis events.
8. Wrap the existing `CaseStudyShell` composition through the Aegis adapter.
9. Confirm view-source/server HTML still contains the entire approved narrative.
10. Record all removed preference gates and every remaining lifecycle gate.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
rg -n "prefers-reduced-motion|useMotionPreference" src README.md docs/component-provenance.md docs/portfolio-component-blueprint.md
rg -n "new Lenis|useScroll\(" src
git diff --check
```

The first `rg` command must return no match. The second may match only the root
provider's single Lenis construction if `ReactLenis` internals require an
explicit constructor; application components must return zero matches.

## Acceptance Checklist

- [ ] OS reduced-motion preference no longer changes any site behavior.
- [ ] All seven component sources plus Motion and Lenis have immutable version,
  dependency, source-hash, and adaptation evidence before implementation begins.
- [ ] No visual component or asset is custom-invented or silently substituted.
- [ ] `motion@12.43.0` and `lenis@1.3.25` are exact direct dependencies.
- [ ] One `MotionConfig reducedMotion="never"` and one root Lenis instance wrap
  the site.
- [ ] Lenis, GSAP, Motion, CSS, and WebGL ownership follows the fixed boundary.
- [ ] Anchor, keyboard, sticky, browser-back, and touch scrolling still work.
- [ ] Offscreen, hidden-tab, WebGL-capability, mobile, budget, and cleanup gates
  remain intact.
- [ ] Aegis exposes one active-section/progress state with no duplicate scroll
  loops.
- [ ] All twelve section IDs and the complete server-rendered narrative remain.
- [ ] Route exit removes observers, listeners, and pending animation frames.
- [ ] Tests cover progress clamping, active-section selection, hidden-tab resume,
  and cleanup.
- [ ] No approved copy, media, metadata, or homepage behavior changed.
- [ ] Repository checks pass.

## Handoff

Include the exact removed preference branches, remaining lifecycle gates, source
search result, accepted component table and hashes, shared
state API, listener/observer counts, cleanup proof, server-HTML proof, test
results, exact dependency delta, Motion/Lenis ownership proof, and any
pre-existing change preserved.
