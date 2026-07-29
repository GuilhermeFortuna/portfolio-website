# WO-004 — Line Waves Effect

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-004 row is `READY`.

## Result to Produce

One adapted Line Waves WebGL background behind the existing hero content, with fixed parameters, narrow client boundaries, offscreen pausing, mobile simplification, and a static reduced-motion fallback.

Follow the fixed rules in `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.

## Prerequisites

- WO-002
- WO-003
- `HeroSection` renders the exact copy and has `id="top"`.
- `useEffectActivity` exists.

## Canonical Source

- Component page: https://reactbits.dev/backgrounds/line-waves
- TypeScript/Tailwind source: use the TypeScript + Tailwind variant from React Bits.
- Expected runtime dependency: `ogl`

## Files to Create or Modify

```text
package.json
package-lock.json
src/components/effects/line-waves.tsx
src/components/sections/hero-section.tsx
```

Do not modify global tokens or hero copy.

## Procedure

### 1. Acquire only the component source

Copy the TypeScript + Tailwind Line Waves component into:

`src/components/effects/line-waves.tsx`

Add this first-line comment:

```ts
// Adapted from https://reactbits.dev/backgrounds/line-waves
```

Do not copy React Bits demo markup.

### 2. Install the dependency

Run:

```bash
npm install ogl
```

Do not add Three.js for this component.

### 3. Preserve and extend the public API

The local component must accept:

```ts
type LineWavesProps = {
  className?: string;
  active: boolean;
  speed?: number;
  innerLineCount?: number;
  outerLineCount?: number;
  warpIntensity?: number;
  rotation?: number;
  edgeFadeWidth?: number;
  colorCycleSpeed?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
};
```

Required changes to the source:

- Add `"use client"`.
- Merge `className` onto the mount element.
- Do not request the next animation frame when `active` is false.
- When `active` changes back to true, resume from the current timestamp without a large time jump.
- Cap DPR at `1.5` desktop and `1.25` below `768px`.
- Attach pointer movement to the component container, not `document`.
- Clean up the renderer, canvas, frame, resize listener, and pointer listeners.

### 4. Create a hero-only client wrapper

The hero section remains a Server Component. Add a small local Client Component in the effect file or a separate export that:

1. Owns a wrapper ref.
2. Calls `useEffectActivity(ref)`.
3. Checks `(pointer: fine)` and viewport width.
4. Mounts `LineWaves` only when reduced motion is false.

Do not convert the whole hero section into a Client Component.

### 5. Use these exact settings

Desktop:

```tsx
<LineWaves
  active={active}
  speed={0.16}
  innerLineCount={24}
  outerLineCount={30}
  warpIntensity={0.55}
  rotation={-35}
  edgeFadeWidth={0.15}
  colorCycleSpeed={0.35}
  brightness={0.16}
  color1="#5366D8"
  color2="#53BBAA"
  color3="#8772D6"
  enableMouseInteraction={hasFinePointer}
  mouseInfluence={0.25}
/>
```

Below `768px`:

- `speed={0.1}`
- `innerLineCount={18}`
- `outerLineCount={22}`
- `warpIntensity={0.35}`
- `enableMouseInteraction={false}`

Do not tune these values.

### 6. Integrate behind hero content

Hero stacking order:

1. canvas/effect at z-index `0`
2. two static fades at z-index `1`
3. semantic hero content at z-index `2`

Required fades:

- left-to-right canvas fade so the left `55%` remains dark enough for text
- bottom fade into `--color-canvas` over the bottom `25%`

Both fades are CSS pseudo-elements or empty `aria-hidden` elements. They do not animate.

### 7. Implement the fallback

For reduced motion or unavailable WebGL, render a static background consisting of:

- `--color-canvas`
- one radial gradient using `--color-accent-a` at no more than `12%` opacity
- one radial gradient using `--color-accent-b` at no more than `8%` opacity

The layout and text position must not change between animated and fallback states.

## Forbidden Changes

- No hero copy or CTA redesign
- No particle overlay
- No noise texture
- No second canvas
- No loading screen
- No document-level pointer listener
- No default white Line Waves colors
- No brightness above `0.16`

## Automated Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Manual Checks

- Scroll the hero fully offscreen and verify frames stop in browser performance tools.
- Hide and restore the tab; verify animation pauses and resumes.
- Enable reduced motion; verify no canvas loop mounts.
- Test at `375px` and confirm pointer interaction is disabled.
- Test at desktop and confirm the headline stays readable over every wave state.
- Confirm the canvas never receives pointer events.

## Acceptance Checklist

- [ ] Local source contains the canonical-source comment.
- [ ] Only `ogl` was added.
- [ ] Fixed parameter values are used.
- [ ] Hero remains a Server Component.
- [ ] Animation is gated by `useEffectActivity`.
- [ ] DPR caps are implemented.
- [ ] Reduced motion uses the static fallback.
- [ ] Canvas listeners and resources clean up.
- [ ] No horizontal overflow or layout shift occurs.
- [ ] Lint, type-check, and build pass.
