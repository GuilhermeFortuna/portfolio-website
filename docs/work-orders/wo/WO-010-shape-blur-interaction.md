# WO-010 — Shape Blur Project Interaction

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-010 row is `READY`.

## Result to Produce

One Shape Blur WebGL instance behind the active desktop project diagram. It reacts only inside the visual stage and does not mount on smaller screens or under reduced motion.

Follow `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.

## Prerequisites

- WO-008
- `ProjectShowcase` has one `[data-shape-blur-slot]` inside the desktop visual stage.

## Canonical Source

- https://reactbits.dev/animations/shape-blur
- Use the TypeScript + Tailwind source variant.
- Expected runtime dependency: `three`

## Files to Create or Modify

```text
package.json
package-lock.json
src/components/effects/shape-blur.tsx
src/components/sections/project-showcase.tsx
```

Do not modify the Selected Work heading or Sparkles slot.

## Procedure

### 1. Copy the source

Create `src/components/effects/shape-blur.tsx` with:

```ts
// Adapted from https://reactbits.dev/animations/shape-blur
```

Add `"use client"`.

Install:

```bash
npm install three
```

Do not add React Three Fiber.

### 2. Use this local API

```ts
type ShapeBlurProps = {
  className?: string;
  active: boolean;
  color: string;
  variation?: 0 | 1 | 2 | 3;
  pixelRatio?: number;
  shapeSize?: number;
  roundness?: number;
  borderSize?: number;
  circleSize?: number;
  circleEdge?: number;
};
```

Rename the source’s `pixelRatioProp` to `pixelRatio`.

### 3. Correct the source behavior

Make these required changes:

- Add a shader `uColor` uniform and replace hard-coded white output.
- Convert the `color` string with `new THREE.Color(color)`.
- Attach `pointermove` only to the mount element.
- Remove source-level `document` mouse and pointer listeners.
- Start requestAnimationFrame only when `active` is true.
- Stop the frame when `active` becomes false.
- Cap renderer DPR to the smaller of device DPR and `pixelRatio`.
- Dispose geometry, material, renderer, canvas, observer, frame, and listeners.
- Keep the canvas transparent and decorative.

### 4. Mount exactly one instance

In `ProjectShowcase`:

1. add a ref to the desktop visual stage
2. call `useEffectActivity(stageRef)`
3. detect `min-width: 1024px`
4. call `useMotionPreference()`
5. mount Shape Blur only when desktop and not reduced motion

Do not create one Shape Blur per project.

### 5. Use exact parameters

```tsx
<ShapeBlur
  active={effectActive}
  color={activeColor}
  variation={0}
  pixelRatio={1.25}
  shapeSize={1.05}
  roundness={0.45}
  borderSize={0.04}
  circleSize={0.18}
  circleEdge={0.3}
/>
```

Map project colors:

- Aegis → `#8EA0FF`
- Q → `#68D7C5`
- gosigapp → `#B49CFF`
- Nexo Dental → `#8EA0FF`

### 6. Style the effect slot

`[data-shape-blur-slot]`:

- absolute inset `0`
- z-index `0`
- opacity `0.18`
- pointer events `none`
- mask fades the outer `12%` of every edge

The diagram layer:

- position relative
- z-index `1`

Do not apply CSS `filter: blur()` to project text or diagrams.

### 7. Fallback

When Shape Blur is not mounted, retain the existing static surface and diagram. Add no replacement animation.

## Forbidden Changes

- No mobile/tablet Shape Blur
- No more than one WebGL context
- No document-level pointer listener
- No variation other than `0`
- No opacity above `0.18`
- No effect behind selector text
- No persistent animation while offscreen
- No React Three Fiber

## Automated Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Manual Checks

- Desktop: change active projects and confirm the fixed color map.
- Move pointer inside and outside the stage; confirm response is stage-local.
- Inspect the page at `1023px`; confirm no Shape Blur canvas exists.
- Enable reduced motion; confirm no Shape Blur canvas exists.
- Scroll the stage offscreen and verify frames stop.
- Navigate away during development and confirm WebGL context and listeners are disposed.

## Acceptance Checklist

- [ ] Canonical-source comment exists.
- [ ] Only `three` was added.
- [ ] Exactly one Shape Blur instance exists.
- [ ] Fixed parameters and color map are used.
- [ ] Pointer listener is stage-local.
- [ ] Mobile/tablet and reduced motion mount no canvas.
- [ ] Inactive states stop frames.
- [ ] Text and diagram contrast remain unchanged.
- [ ] Lint, type-check, and build pass.
