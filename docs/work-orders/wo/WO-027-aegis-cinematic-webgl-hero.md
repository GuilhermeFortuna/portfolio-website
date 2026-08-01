# WO-027 — Cinematic WebGL Hero and Kinetic Entrance

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when WO-027 is `READY`.

## Result to Produce

Adapt D-008's Codrops Demo 1 media cylinder and reactive particles into the
single managed case-study WebGL environment, then adapt D-009's kinetic
typography transition into the reusable route entrance and hero-title
choreography. The two sources must resolve as one opening scene.

## Prerequisites

- WO-026 `DONE`
- D-008 and D-009 source-register rows are accepted and hash-locked

## Canonical Sources

- D-008: `https://github.com/JosephASG/codrops-cinematic-scroll-animations`,
  Demo 1
- D-009: `https://github.com/codrops/KineticTypePageTransition`
- Use only the revision, paths, and hashes recorded by WO-024.

## Files to Create or Modify

```text
src/components/case-study/experience/case-study-webgl-stage.tsx
src/components/case-study/experience/cinematic-media-cylinder.ts
src/components/case-study/experience/reactive-particle-field.ts
src/components/case-study/experience/kinetic-route-transition.tsx
src/components/case-study/experience/case-study-hero-scene.tsx
src/components/case-study/experience/case-study-experience.module.css
src/components/case-study/case-study-hero.tsx
src/components/case-study/case-study-shell.tsx
src/components/case-study/aegis/aegis-experience.tsx
src/app/work/aegis/page.tsx
src/components/webgl/webgl-manager.tsx
src/app/__tests__/aegis-page.test.tsx
src/components/case-study/experience/__tests__/case-study-hero-scene.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not modify approved content or files under `public/work/aegis/`.

## D-008 WebGL Adaptation

Preserve the source's cylindrical media geometry, shader treatment, camera
depth, cylinder rotation, oversized arc expansion, and velocity-reactive
particle lines. Replace demo imagery with approved Aegis stills supplied by a
generic `media` prop; do not texture the native video into WebGL.

Use exactly one canvas and renderer through the existing WebGL manager. Extend
the manager with one `case-study-cinematic` registration (`hero`, `high`,
continuous, `allowMobile: false`). Expose manager-owned `active`, `dpr`, size,
pointer, and disposal state to both selected subsystems. Remove the source's
ScrollSmoother, scroll listener, independent RAF, renderer ownership, and
global resize handler.

Expose scene parameters rather than reading scroll inside WebGL:

```ts
export type CinematicHeroParameters = {
  cylinderRotation: number;
  cylinderRadius: number;
  mediaScale: number;
  cameraZ: number;
  arcExpansion: number;
  particleEnergy: number;
  pointerInfluence: number;
};
```

The D-006 scene manager writes these values. Interpolate deterministically and
reproduce the same frame when scrolling backward.

Opening scroll sequence:

1. `hero 0.00–0.28`: restrained media cylinder behind the title composition;
   title contrast remains readable at the brightest frame.
2. `hero 0.28–0.72`: rotation, radius, camera depth, media scale, and particle
   energy increase together.
3. `hero 0.72–1.00`: the cylinder opens into oversized arcs beyond the viewport
   and recedes into environmental traces for the D-010 handoff.

No-JS, denied WebGL, context loss, Save-Data, and the fixed mobile WebGL budget
retain the complete semantic hero and a designed portfolio surface using the
approved poster. They may not invent a different illustration.

## D-009 Kinetic Entrance

Preserve the source's oversized glyph field, perspective travel, rotation,
scale, overlaps, and aperture reveal. Use the project title as data; the shared
primitive contains no Aegis-specific letters or styling.

For Aegis:

1. Full-viewport `AEGIS` letterforms establish the transition field.
2. Glyphs travel toward and across the viewer; their counters and negative
   spaces reveal D-008 behind them.
3. The field clears into the existing breadcrumb, title, deck, support, facts,
   and disabled environment action without rewriting or splitting their text.
4. Completion enables D-006 hero scroll control without resetting D-008.

The entrance runs once per route entry, can be cancelled during rapid
navigation, and must tolerate React development remounts without replay races.
Server/no-JS content begins visible; enhancement may hide/transiently transform
it only after initialization succeeds. D-009 also exposes the reusable route
transition controller that WO-032 will call at exit.

## Portfolio Composition

- Hero height: at least `100svh`; never clip the header or first heading.
- Keep all narrative typography and actions in semantic DOM above WebGL.
- Use portfolio tokens and Geist only; do not adopt either demo's palette,
  serif face, fashion styling, image cards, or labels.
- Preserve the poster and all approved media uncropped at semantic inspection
  points even when WebGL crops transitional textures decoratively.
- No additional canvas, pointer owner, smooth-scroll instance, or route loader.

## Procedure

1. Recheck D-008/D-009 hashes and copy only the accepted mechanics with source
   headers.
2. Merge cylinder and particles under one managed renderer/context.
3. Replace source scroll reads with the typed parameter API.
4. Build the reusable kinetic route-transition controller.
5. Compose the Aegis entrance and three hero progress ranges.
6. Add responsive layouts and capability/lifecycle behavior.
7. Test forward/reverse scroll, interrupted entry/exit, remount, resize,
   context loss, hidden tab, and route cleanup.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
rg -n "ScrollSmoother|new Lenis|requestAnimationFrame|prefers-reduced-motion" src/components/case-study/experience
git diff --check
```

## Manual Checks

- Production build at 1440×900, 1280×800, 1024×768, 768×1024, 390×844,
  320×568, and 200% zoom.
- Entry, reverse hero scroll, refresh mid-page, browser back/forward, and exit
  during the kinetic transition.
- WebGL available/unavailable, forced context loss/restoration, Save-Data,
  hidden tab, fine/coarse pointer, and mobile budget.
- Compare the working result with both selected demos; reject a technically
  functional result that lacks their spatial scale or compositional impact.

## Acceptance Checklist

- [ ] D-008 cylinder, shaders, arc expansion, and reactive particles remain
  recognizable from the accepted source.
- [ ] D-009 glyph field, camera-plane travel, and aperture reveal remain
  recognizable from the accepted source.
- [ ] Entrance and hero form one continuous composition without a visual reset.
- [ ] One managed case-study canvas/context and render owner exist.
- [ ] No source-local scroll owner, renderer loop, or reduced-motion branch remains.
- [ ] Portfolio style and approved content/media remain authoritative.
- [ ] Mobile and capability states are complete, readable, and intentional.
- [ ] Route exit disposes renderer resources and cancels timelines.
- [ ] Repository and browser checks pass.

## Handoff

Include source-to-adaptation mapping, parameter ranges, entry/hero captures,
one-context proof, frame/heap/context-loss results, mobile/capability captures,
cleanup evidence, content/media comparison, validation results, and deviations.
