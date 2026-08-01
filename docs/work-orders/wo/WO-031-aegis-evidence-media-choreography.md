# WO-031 — Aegis Evidence Media Choreography

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when WO-031 is `READY`.

## Result to Produce

Adapt D-013's Codrops `Rotating On-Scroll Animations`, Variation 3, into a
shared CSS 3D evidence stage. Every approved screenshot and the intro video
must travel through perspective and tonal modulation, then resolve into a
large, frontal, uncropped inspection state.

## Prerequisites

- WO-030 `DONE`
- D-013 source-register row accepted and hash-locked

## Canonical Source

- Demo: `https://tympanus.net/Development/RotatingOnScrollAnimations/index3.html`
- Source: `https://github.com/codrops/RotatingOnScrollAnimations`
- Use Variation 3 from the immutable revision, source paths, and hashes recorded
  by WO-024.

## Files to Create or Modify

```text
src/components/case-study/experience/case-study-evidence-stage.tsx
src/components/case-study/experience/case-study-evidence-plane.tsx
src/components/case-study/experience/case-study-experience.module.css
src/components/case-study/experience/case-study-evidence-aperture.tsx
src/components/case-study/experience/case-study-decision-panel.tsx
src/components/case-study/case-study-media.tsx
src/components/case-study/aegis/aegis-experience.tsx
src/app/work/aegis/page.tsx
src/components/case-study/experience/__tests__/case-study-evidence-stage.test.tsx
src/app/__tests__/aegis-page.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not modify content types, approved copy, captions, or files under
`public/work/aegis/`.

## Selected Motion Contract

Preserve Variation 3's non-linear vertical travel, CSS perspective, x-axis
rotation, z-depth, brightness/saturation modulation, and frontal resolution.
Remove its Lenis instance, document-level ScrollTriggers, marquee, randomized
angles/placement, DOM reparenting, image-loader ownership, global resize
listener, fashion imagery, names, and page styling.

Use deterministic props:

```ts
export type EvidencePlaneKeyframe = {
  progress: number;
  yPercent: number;
  rotateX: number;
  z: number;
  brightness: number;
  saturation: number;
};
```

Every plane has authored `enter`, `inspect`, and `exit` keyframes. At `inspect`:
`rotateX=0`, `z=0`, `brightness=1`, `saturation=1`, and the media uses
`object-fit: contain`. Random values are forbidden. Reversing scroll must
reproduce the exact same frame.

## Fixed Aegis Staging

1. `overview.webp`: one arrival, stable inspection state in the narrative
   aperture, and departure.
2. `alerts.webp`: one arrival, stable inspection state in its existing chapter,
   and departure.
3. Decision 3: `player-investigation.webp` reaches inspection first and remains
   readable before `risk-constellation.webp` advances. Never reduce them to two
   small cards or overlap their inspection states.
4. Decision 4: `entry-intro.mp4` may receive the same spatial arrival/departure;
   at inspection it remains a native video with poster and controls. Playback
   is never tied to scene progress.

Captions remain semantic HTML linked to the original media. Off-axis planes
must not intercept pointer events. Restore pointer interaction only for the
stable inspection state, especially for native video controls.

## Runtime and Responsive Rules

- D-006 owns progress and timelines; D-012 owns the decision-panel stage.
- Use scoped GSAP/ScrollTrigger and CSS 3D only. Do not add Canvas/WebGL,
  another Lenis, root scroll subscription, observer, ticker, or RAF.
- Author separate desktop, tablet, and mobile perspective/travel values so
  inspection media remains large and legible on narrow screens.
- No-JS or initialization failure leaves every media item in its original
  semantic location, frontal, uncropped, and fully visible.

## Procedure

1. Recheck the D-013 Variation 3 hashes and copy the accepted mechanic with its
   provenance header.
2. Replace random source values with typed deterministic keyframes.
3. Integrate overview/alerts with D-010 and decision media with D-012.
4. Implement pointer-state gating and preserve native video behavior.
5. Author viewport-specific values and inspection dwell ranges.
6. Compare every media hash with WO-019 and test forward/reverse/fast scroll,
   resize, pointer/coarse pointer, video use, failure, and route exit.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
sha256sum public/work/aegis/*
rg -n "Math\.random|new Lenis|requestAnimationFrame|IntersectionObserver|prefers-reduced-motion" src/components/case-study/experience/case-study-evidence-stage.tsx src/components/case-study/experience/case-study-evidence-plane.tsx
rg -n "autoplay|\.play\(|currentTime *=|loop" src/components/case-study src/app/work/aegis
git diff --check
```

The random/runtime search and playback-control search must return no active
implementation match.

## Manual Checks

- Capture enter/inspect/exit for every media item at 1440×900, 768×1024, and
  390×844.
- Inspect screenshots at native zoom and 200%; confirm all evidence-bearing
  edges, text, captions, and synthetic-data disclosures are readable.
- Verify reverse/fast/keyboard/touch scroll, coarse/fine pointer, native video
  play/pause/seek, breakpoint resize, no-JS/failure, and route exit.

## Acceptance Checklist

- [ ] Variation 3's non-linear 3D rotation, travel, depth, and tonal progression
  remain recognizable.
- [ ] Every inspection state is frontal, sharp, fully saturated, uncropped, and
  large enough to inspect.
- [ ] Decision 3 media resolve sequentially, never as two small cards.
- [ ] Video remains native and entirely user controlled.
- [ ] All six asset hashes match WO-019 and captions remain semantic.
- [ ] Deterministic reverse scroll, pointer gating, and responsive values work.
- [ ] No duplicate runtime, WebGL context, random geometry, or reduced path exists.
- [ ] Repository and browser checks pass.

## Handoff

Include source/adaptation diff, deterministic keyframes, enter/inspect/exit
captures, asset hashes, legibility review, input/video results, runtime-owner
inventory, failure render, cleanup proof, test results, and deviations.
