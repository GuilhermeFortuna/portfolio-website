# WO-028 — Narrative Aperture and Chapter Handoffs

## Status

See `[WO-STATUS.md](WO-STATUS.md)`. Dispatch only when WO-028 is `READY`.

## Result to Produce

Adapt D-010's Codrops `One Element Scroll` into a persistent, portfolio-owned
evidence aperture that travels between major narrative chapters. Compose those
handoffs inside the D-006 scene manager so the page reads as one directed story
rather than independent reveal effects.

## Prerequisites

- WO-027 `DONE`
- D-010 source-register row accepted and hash-locked

## Canonical Source

- `https://github.com/codrops/OneElementScroll`
- Use only the immutable revision, source paths, and hashes recorded by WO-024.



## Files to Create or Modify

```text
src/components/case-study/experience/case-study-evidence-aperture.tsx
src/components/case-study/experience/case-study-narrative-scenes.tsx
src/components/case-study/experience/case-study-experience.module.css
src/components/case-study/experience/case-study-scene-manager.tsx
src/components/case-study/case-study-section.tsx
src/components/case-study/case-study-shell.tsx
src/components/case-study/aegis-system-map.tsx
src/components/case-study/aegis/aegis-experience.tsx
src/app/work/aegis/page.tsx
src/app/__tests__/aegis-page.test.tsx
src/components/case-study/experience/__tests__/case-study-evidence-aperture.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not modify `src/content/case-studies/aegis.ts` or approved media.

## Persistent Aperture Contract

Preserve the selected source's `Flip.getState()`/`Flip.fit()` waypoint
technique: one owned DOM object changes parent layout, size, position, depth,
and relationship to text without being destroyed and recreated per chapter.

```ts
export type ApertureWaypoint = {
  sceneId: CaseStudySceneId;
  slotId: string;
  aspectRatio: `${number} / ${number}`;
  mediaKey?: string;
  fit: "contain" | "cover";
  alignment: "start" | "center" | "end";
};
```

Only the Aegis adapter maps approved media keys. The shared primitive receives
generic data and semantic children. Keep one aperture element in the DOM. Media
may swap only during a masked scene handoff; captions remain associated
semantic HTML and are never baked into WebGL or images.

## Fixed Narrative Sequence

1. `context`: aperture emerges from D-008's receding hero arcs into a broad
  cinematic position showing approved overview evidence.
2. `problem`: aperture contracts and relocates beside the prose; do not invent
  problem evidence or a diagram.
3. `system`: aperture expands as the system explanation begins while the
  existing semantic `AegisSystemMap` composes beside it. Do not convert the map
   to canvas, SVG, or an image and do not add labels.
4. `decisions`: aperture clears the stage for D-012; WO-030 owns the panel
  sequence and WO-031 owns evidence motion inside it.
5. `contribution` and `delivered`: aperture returns to support the existing
  evidence/captions without changing their order.
6. `technology` and `confidentiality`: aperture recedes and leaves a restrained
  reading composition ready for D-014.

Each waypoint must have an authored desktop and mobile layout. Do not repeat
the same center/scale movement for every section.

## Source Reduction and Runtime Rules

Retain Flip state capture, `Flip.fit`, consecutive waypoint logic, and reverse
scroll determinism. Remove the demo's Lenis instance, ticker hookup, parallax,
type effects, image animations, loader, document-level initialization, and
global resize ownership.

D-006 owns pinning, progress, labels, and handoffs. Register D-010 timelines in
one `gsap.context()` and rebuild them only when responsive waypoint geometry
changes. Revert the old Flip state before rebuilding. Do not add another
ScrollTrigger root, observer, RAF, Canvas, or WebGL context.

## Content and Resilience

- Preserve all section IDs, headings, prose, map labels, media, captions, and
DOM order from Batch 03.
- No-JS and initialization failure render every chapter in normal flow with
media adjacent to its original semantic caption.
- At the readable waypoint, screenshots are uncropped and selectable captions
are visible. Transitional cropping is allowed only while no evidence caption
is presented as active.
- Direct fragment loads and restored scroll positions must initialize the
aperture at the matching waypoint without replaying earlier chapters.



## Procedure

1. Recheck the D-010 source hash and copy the accepted Flip mechanism with its
  provenance header.
2. Implement the generic aperture and explicit waypoint slots.
3. Register the sequence with D-006 and remove all source-local runtime owners.
4. Compose the existing map and approved media without changing content.
5. Author desktop, tablet, and mobile waypoint geometry.
6. Test forward/reverse traversal, fast scroll, fragment entry, resize across
  breakpoints, failure initialization, and route exit.



## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
rg -n "new Lenis|ScrollSmoother|requestAnimationFrame|prefers-reduced-motion" src/components/case-study/experience/case-study-evidence-aperture.tsx src/components/case-study/experience/case-study-narrative-scenes.tsx
git diff --check
```



## Manual Checks

- 1440×900, 1280×800, 1024×768, 768×1024, 390×844, 320×568, and 200% zoom.
- Slow, fast, reverse, keyboard, and touch scroll; fragment loads; history
restoration; breakpoint resize; JavaScript disabled; route exit mid-Flip.
- Capture each stable waypoint and at least one midpoint between every pair.



## Acceptance Checklist

- [ ] One persistent aperture visibly travels through distinct chapter layouts.
- [ ] The selected Flip technique remains recognizable and reversible.
- [ ] D-006 is the sole scroll-scene owner.
- [ ] System map remains complete semantic DOM with unchanged labels.
- [ ] Every active evidence state is uncropped, readable, and captioned.
- [ ] No invented content, repeated generic reveal, duplicate scroll owner, or
  reduced-motion branch exists.
- [ ] Normal-flow failure and no-JS rendering preserve the full story.
- [ ] Repository and browser checks pass.



## Handoff

Include source/adaptation diff, waypoint configuration, stable and midpoint
captures, content/media comparison, runtime-owner inventory, reverse/resize/
fragment results, failure render, cleanup evidence, and validation results.