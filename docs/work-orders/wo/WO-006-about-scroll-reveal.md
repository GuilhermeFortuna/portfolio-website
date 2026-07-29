# WO-006 — About and Scroll Reveal

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-006 row is `READY`.

## Result to Produce

A complete About section with a restrained word-by-word reveal applied only to the manifesto paragraph.

Follow `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.

## Prerequisites

- WO-002
- WO-003

## Canonical Source

- https://reactbits.dev/text-animations/scroll-reveal
- Use the TypeScript + Tailwind source variant.
- Expected runtime dependency: `gsap`

## Files to Create or Modify

```text
package.json
package-lock.json
src/components/effects/scroll-reveal.tsx
src/components/sections/about-section.tsx
```

Do not modify Hero, Process, or Work files.

## Procedure

### 1. Copy the source

Create `src/components/effects/scroll-reveal.tsx` with:

```ts
// Adapted from https://reactbits.dev/text-animations/scroll-reveal
```

Add `"use client"`.

Install:

```bash
npm install gsap
```

### 2. Use this public API

```ts
type ScrollRevealProps = {
  children: string;
  className?: string;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  rotationEnd?: string;
  wordAnimationEnd?: string;
};
```

Render a semantic `<p>`. Do not make the component choose arbitrary HTML tags.

### 3. Fix source cleanup behavior

Do not call `ScrollTrigger.getAll().forEach(...kill)`, because that destroys triggers owned by other sections.

Instead:

1. Create a `gsap.context` scoped to the paragraph.
2. Create rotation, opacity, and blur animations inside that context.
3. Call `context.revert()` during cleanup.
4. Remove `will-change` after the reveal reaches its final state or during cleanup.

### 4. Handle reduced motion

Read `useMotionPreference()`.

When it returns true:

- render normal unsplit paragraph text
- opacity `1`
- rotation `0`
- blur `0`
- create no ScrollTrigger

### 5. Use these exact reveal settings

```tsx
<ScrollReveal
  baseOpacity={0.3}
  baseRotation={2}
  blurStrength={2}
  rotationEnd="bottom 70%"
  wordAnimationEnd="bottom 65%"
>
  {siteContent.aboutBody[0]}
</ScrollReveal>
```

Keep source stagger at `0.05`. Do not add spring motion.

### 6. Build the exact section layout

Use `SectionShell` with:

- `id="about"`
- `label={siteContent.aboutLabel}`
- `labelledBy="about-title"`

Inside:

```text
two-column desktop grid
  left: h2#about-title
  right: ScrollReveal first bio paragraph, static second bio paragraph,
         time zone, availability, GitHub, and WakaTime
```

Measurements:

- desktop columns: `4fr 8fr`
- desktop gap: `clamp(2rem, 6vw, 6rem)`
- title max-width: `18rem`
- paragraph max-width: `46rem`
- mobile/tablet: one column
- mobile title-to-paragraph gap: `2rem`

Apply section-title typography to the `h2` and manifesto typography to the revealed paragraph.

## Forbidden Changes

- No reveal on the label or heading
- No pinned scrolling
- No extra scroll distance
- No base rotation above `2`
- No blur above `2px`
- No opacity below `0.3`
- No global ScrollTrigger cleanup
- No word highlighting or accent colors

## Automated Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Manual Checks

- Scroll slowly through About and confirm the paragraph settles fully before leaving the section.
- Navigate away and back during development; confirm triggers do not duplicate.
- Enable reduced motion and confirm unsplit static text.
- Confirm copy/paste produces normal sentence spacing.
- Confirm a screen reader reads one coherent paragraph.

## Acceptance Checklist

- [ ] Canonical-source comment exists.
- [ ] Only `gsap` was added.
- [ ] Exact reveal values are used.
- [ ] Only the paragraph animates.
- [ ] Cleanup affects only this component’s GSAP context.
- [ ] Reduced motion creates no trigger.
- [ ] Desktop and mobile grids match the recipe.
- [ ] Copy remains semantic and selectable.
- [ ] Lint, type-check, and build pass.
