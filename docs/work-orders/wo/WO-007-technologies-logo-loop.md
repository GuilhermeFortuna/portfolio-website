# WO-007 — Technologies and Logo Loop

## Status

Ready after WO-002 and WO-003.

## Result to Produce

A Technologies section containing one slow, accessible Logo Loop of the eight fixed text wordmarks and a static grid fallback.

Follow `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.

## Prerequisites

- WO-002
- WO-003
- `src/content/technologies.ts` contains exactly eight records.

## Canonical Source

- https://reactbits.dev/animations/logo-loop
- Use the TypeScript + Tailwind source variant.
- The current source does not require a runtime animation package.

## Files to Create or Modify

```text
src/components/sections/technologies-section.tsx
src/components/ui/logo-loop.tsx
```

Do not download image or SVG logos.

## Procedure

### 1. Copy the source

Create `src/components/ui/logo-loop.tsx` with:

```ts
// Adapted from https://reactbits.dev/animations/logo-loop
```

Add `"use client"` if the copied source does not already require it.

### 2. Extend the API with activity control

Preserve the source props and add:

```ts
active?: boolean;
pauseOnFocus?: boolean;
```

Required behavior:

- requestAnimationFrame runs only while `active !== false`
- focus entering the loop sets velocity to `0` when `pauseOnFocus` is true
- focus leaving resumes the configured velocity
- hover pause remains enabled
- all animation frames, observers, image listeners, and resize fallbacks clean up

### 3. Create wordmark nodes

Map `technologies` to Logo Loop node items.

Each wordmark is:

```text
[6px accent square] [technology name]
```

Style:

- Geist Mono
- `0.75rem`
- weight `550`
- letter spacing `0.06em`
- color `var(--color-text-muted)`
- no uppercase transformation

The square cycles accent A, B, C by array index. Do not use brand colors.

### 4. Build an activity-aware wrapper

The wrapper:

1. owns a ref
2. calls `useEffectActivity(ref)`
3. calls `useMotionPreference()`
4. renders static content for reduced motion
5. passes `active` to Logo Loop otherwise

### 5. Use these exact Logo Loop props

```tsx
<LogoLoop
  logos={items}
  speed={34}
  direction="left"
  width="100%"
  logoHeight={22}
  gap={48}
  pauseOnHover
  pauseOnFocus
  fadeOut
  fadeOutColor="#06070a"
  scaleOnHover={false}
  ariaLabel="Selected technologies"
  active={active}
/>
```

Do not change the order from `technologies.ts`.

### 6. Build the static fallback

For reduced motion, render the eight items once:

- mobile: two-column grid
- `768px` and wider: four-column grid
- row gap: `1.25rem`
- column gap: `2rem`

No duplicated content and no transform.

### 7. Build the section

Use `SectionShell`:

- `id="technologies"`
- `label={siteContent.technologiesLabel}`
- `labelledBy="technologies-title"`

Render:

1. `h2#technologies-title`
2. gap `3rem`
3. one loop/fallback wrapper with height `4.5rem`
4. top and bottom `1px` borders using `--color-line`

The loop spans the content width, not the viewport width.

## Forbidden Changes

- No second loop or reverse row
- No brand icons
- No brand colors
- No proficiency bars
- No technology categories in the visible UI
- No speed above `34`
- No scale-on-hover
- No continuous frames while offscreen

## Automated Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Manual Checks

- Hover the loop and confirm it stops smoothly.
- Tab into the loop if any item is focusable and confirm it stops.
- Scroll it offscreen and confirm frames stop.
- Enable reduced motion and confirm one static eight-item grid.
- Inspect the accessibility tree and confirm decorative duplicate sequences are hidden.

## Acceptance Checklist

- [ ] Exact eight technologies appear in the fixed order.
- [ ] Wordmarks use text and accent squares only.
- [ ] Exact loop props are used.
- [ ] There is one loop.
- [ ] Hover, focus, offscreen, and document-hidden states stop work.
- [ ] Reduced motion renders a nonduplicated grid.
- [ ] Duplicated loop sequences are hidden from assistive technology.
- [ ] No new dependency was installed.
- [ ] Lint, type-check, and build pass.
