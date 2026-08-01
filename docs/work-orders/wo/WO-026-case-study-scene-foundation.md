# WO-026 — BSMNT Case-Study Scene Foundation

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when WO-026 is `READY`.

## Result to Produce

Install or copy the exact WO-024-approved BSMNT Scrollytelling foundation and
implement one reusable case-study scene manager/context/API. This order adds no
visible cinematic choreography; it creates the lifecycle and data boundary
consumed by WO-027–WO-032.

## Prerequisites

- WO-025 `DONE`
- D-006 row in `docs/batch-04-component-source-register.md` accepted

## Canonical Source

- `https://github.com/basementstudio/scrollytelling`
- Use the exact package version or immutable `Root`, `Animation`, `Waypoint`,
  and context source strategy recorded by WO-024.

## Files to Create or Modify

```text
package.json
pnpm-lock.yaml
src/components/providers/portfolio-motion-context.ts
src/components/case-study/experience/case-study-scene-manager.tsx
src/components/case-study/experience/case-study-scene-context.ts
src/components/case-study/experience/case-study-scene.tsx
src/components/case-study/experience/case-study-scene-config.ts
src/components/case-study/experience/__tests__/case-study-scene-manager.test.tsx
src/components/case-study/case-study-shell.tsx
src/components/case-study/aegis/aegis-experience.tsx
src/app/work/aegis/page.tsx
src/app/__tests__/aegis-page.test.tsx
docs/component-provenance.md
docs/work-orders/wo/IMPLEMENTATION-SPEC.md
docs/work-orders/wo/WO-STATUS.md
```

## Installation Boundary

If WO-024 accepted the published package, install its exact version and verify
integrity. Otherwise copy only the approved minimal BSMNT files, preserve their
source headers/hashes, and adapt imports for this repository. Do not combine
both strategies or broaden the copy to demo/site code.

## Shared API

```ts
export type CaseStudySceneId =
  | "hero"
  | "context"
  | "problem"
  | "system"
  | "decisions"
  | "contribution"
  | "delivered"
  | "technology"
  | "confidentiality"
  | "closing";

export type CaseStudySceneDefinition = {
  id: CaseStudySceneId;
  start: string;
  end: string;
};

export type CaseStudySceneSnapshot = {
  activeSceneId: CaseStudySceneId;
  sceneProgress: number;
  activeSectionId: string;
  sectionProgress: number;
  articleProgress: number;
};

export function useCaseStudyScene(): CaseStudySceneSnapshot;
```

`CaseStudySceneManager` accepts ordered scene definitions and semantic section
IDs. `CaseStudyScene` accepts `id` and server-rendered children. The manager
enhances existing DOM after hydration and owns one BSMNT root timeline.

Use the root Lenis instance from WO-025. BSMNT may create scoped
ScrollTriggers/timelines but no Lenis, ScrollSmoother, root listener, ticker,
RAF, nested scroller, Canvas, or WebGL context. Scope all GSAP work through
`gsap.context()` and revert on route exit, responsive rebuild, interrupted
navigation, and React development remount.

## Initial Aegis Configuration

Register the ten scene IDs above against the existing twelve semantic sections;
the `decisions` scene contains decision-1 through decision-4. Derive
`activeSectionId` and `sectionProgress` from the ordered semantic wrappers so
WO-029 can address all twelve chapters independently.

This order must not pin chapters, animate transforms/opacity, move media, or add
the chapter instrument. All scene timelines remain visually inert until later
orders register their selected animations. Server/no-JS output must remain
byte-equivalent in approved visible content and DOM order.

## Procedure

1. Recheck the D-006 revision/hash and chosen package/source strategy.
2. Install or copy only the approved BSMNT foundation.
3. Implement the generic scene definitions, snapshot, and hooks.
4. Connect BSMNT to WO-025's root Lenis/GSAP ownership exactly once.
5. Wrap the Aegis route through a thin adapter with inert scene registrations.
6. Test progress clamping, active scene/section resolution, fragments, restored
   scroll, resize rebuild, hidden tab, remount, and cleanup.
7. Prove no visible route composition or Batch 03 contract changed.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
pnpm list @bsmnt/scrollytelling --depth 0
rg -n "new Lenis|useScroll\(|ScrollSmoother|requestAnimationFrame|prefers-reduced-motion" src/components/case-study/experience src/components/case-study/aegis
git diff --check
```

Omit `pnpm list` only when WO-024 selected the copied-source strategy, and prove
the recorded files/hashes instead. Runtime-owner searches must return no
component-local owner.

## Manual Checks

- `/work/aegis` at 1440×900, 768×1024, 390×844, and 200% zoom before/after hydration.
- Direct fragments, refresh mid-route, slow/fast/reverse scroll, keyboard/touch,
  browser back, breakpoint resize, hidden tab, development remount, and route exit.
- Compare screenshots and rendered text against the WO-023 baseline; there must
  be no intentional visual delta yet.

## Acceptance Checklist

- [ ] BSMNT package/source exactly matches WO-024's accepted strategy and hashes.
- [ ] One generic scene root exposes the fixed scene and section snapshot API.
- [ ] Aegis supplies data through an adapter; shared primitives contain no Aegis styling.
- [ ] Root Lenis/GSAP ownership is reused without duplicate runtime owners.
- [ ] All timelines/triggers/listeners clean up on rebuild, remount, and exit.
- [ ] Server/no-JS content, section order, copy, media, and semantics remain unchanged.
- [ ] No visible animation, pinning, WebGL, or chapter instrument was added.
- [ ] Repository and browser checks pass.

## Handoff

Include BSMNT package/source proof, dependency delta, API/configuration, scene and
section resolution tests, owner counts, lifecycle cleanup, baseline visual and
server-HTML comparison, automated results, and deviations.
