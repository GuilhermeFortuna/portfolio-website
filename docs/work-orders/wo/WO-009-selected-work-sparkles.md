# WO-009 — Selected Work Sparkles Accent

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-009 row is `READY`.

## Result to Produce

One thin Sparkles field beneath the Selected Work introduction, using fixed density, color, speed, dimensions, and a static fallback.

Follow `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.

## Prerequisites

- WO-008
- The Selected Work heading contains exactly one `[data-sparkles-slot]`.

## Canonical Source

- https://21st.dev/@manuarora700/components/sparkles
- Copy `SparklesCore` source, not any preview component.
- Expected runtime dependencies after demo removal:
  - `@tsparticles/engine`
  - `@tsparticles/react`
  - `@tsparticles/slim`

The source page also lists `framer-motion`, but this order does not use it unless the retained component source imports it directly. Remove demo-only motion imports.

## Files to Create or Modify

```text
package.json
package-lock.json
src/components/effects/sparkles.tsx
src/components/sections/selected-work-section.tsx
```

Do not modify project selectors or the visual stage.

## Procedure

### 1. Copy only the core

Create `src/components/effects/sparkles.tsx` with:

```ts
// Adapted from https://21st.dev/@manuarora700/components/sparkles
```

Add `"use client"`.

Remove all source previews, example headings, blue/indigo gradients, full-screen examples, and demo wrappers.

### 2. Install the minimal particle dependencies

Install:

```bash
npm install @tsparticles/engine @tsparticles/react @tsparticles/slim
```

Do not install `framer-motion` unless the final retained file imports it. Prefer removing the import.

### 3. Export a bounded component

Export:

```ts
type SparklesAccentProps = {
  className?: string;
};

export function SparklesAccent(
  props: SparklesAccentProps,
): React.ReactElement;
```

Inside the component:

1. create a wrapper ref
2. call `useEffectActivity(ref)`
3. call `useMotionPreference()`
4. initialize the slim particle engine once
5. mount the particle canvas only when active
6. show the static fallback otherwise

### 4. Use exact particle settings

Set:

- id: `selected-work-sparkles`
- background: transparent
- particle color: `#8EA0FF`
- minimum size: `0.3`
- maximum size: `0.8`
- density: `160`
- speed: `0.15`
- opacity range: `0.1–0.45`
- links: disabled
- interactivity: disabled
- full-screen mode: disabled

Pass `particleDensity={160}` through the copied component API. Leave the source engine’s density-area default unchanged.

### 5. Build the exact accent composition

Replace the temporary line inside `[data-sparkles-slot]` with:

1. one horizontal line, width `80%`, centered, accent A at `28%` opacity
2. one SparklesAccent filling the `45rem × 6rem` maximum slot
3. one radial mask/fade that makes the left and right edges transparent

The particle canvas opacity is `0.55`.

The slot remains:

- `aria-hidden="true"`
- `pointer-events: none`
- height `6rem`
- maximum width `45rem`

### 6. Static fallback

Reduced motion, offscreen, hidden-tab, and initialization-failure states show only the horizontal line plus a faint radial glow. No particles move.

## Forbidden Changes

- No second Sparkles instance
- No full-width or full-height background
- No density above `160`
- No white, cyan, or bright-blue particles
- No pointer interaction
- No particle links or trails
- No heading animation
- No changes to project layout

## Automated Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Manual Checks

- Count DOM/canvas instances and confirm exactly one Sparkles instance.
- Scroll the slot offscreen and confirm the particle canvas unmounts or stops.
- Enable reduced motion and confirm the static line remains.
- Test `320px`; confirm the slot fits without horizontal overflow.
- Confirm particles never overlap the heading at distracting opacity.

## Acceptance Checklist

- [ ] Canonical-source comment exists.
- [ ] Only the three required tsParticles packages were added.
- [ ] Fixed particle settings are used.
- [ ] One instance exists.
- [ ] Canvas is localized to the fixed slot.
- [ ] Interactivity is disabled.
- [ ] Reduced-motion and inactive states are static.
- [ ] Project layout is unchanged.
- [ ] Lint, type-check, and build pass.
