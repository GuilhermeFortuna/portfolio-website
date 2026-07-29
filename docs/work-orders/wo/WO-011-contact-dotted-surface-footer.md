# WO-011 — Contact, Dotted Surface, and Footer

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-011 row is `READY`.

## Result to Produce

A finished contact/outro section with a shallow Dotted Surface horizon, verified-contact fallback behavior, and a restrained footer.

Follow `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.

## Prerequisites

- WO-002
- WO-003

## Canonical Source

- https://21st.dev/@sshahaider/components/dotted-surface
- Copy the component source, not the preview.
- Expected dependency after removing theme support: `three`

## Files to Create or Modify

```text
package.json
package-lock.json
src/components/effects/dotted-surface.tsx
src/components/layout/site-footer.tsx
src/components/sections/contact-section.tsx
```

Do not modify Selected Work.

## Procedure

### 1. Copy and simplify the source

Create `src/components/effects/dotted-surface.tsx` with:

```ts
// Adapted from https://21st.dev/@sshahaider/components/dotted-surface
```

Add `"use client"`.

Remove:

- the demo heading and wrapper
- `next-themes`
- light-theme branches
- source surface colors
- full-screen sizing

Install `three` if it is not already present:

```bash
npm install three
```

### 2. Use this API

```ts
type DottedSurfaceProps = {
  className?: string;
  active: boolean;
};
```

Required implementation behavior:

- transparent renderer background
- DPR cap `1.5` desktop and `1.25` mobile
- fixed dark-theme point colors derived from accents A, B, and C
- frame loop runs only while `active`
- ResizeObserver sizes only the local container
- dispose geometry, material, renderer, canvas, observer, frame, and listeners
- no pointer interaction

### 3. Register Dotted Surface

Wrap Dotted Surface in `ManagedWebGLEffect`:

```ts
{
  id: "dotted-surface",
  priority: "decorative",
  estimatedCost: "high",
  continuous: true,
  allowMobile: false,
}
```

Pass `shouldAnimate` to `active`. Use the static horizon as the manager fallback.

Keep the main contact copy in a Server Component.

### 4. Build the exact contact composition

Use `SectionShell`:

- `id="contact"`
- `label={siteContent.contactLabel}`
- `labelledBy="contact-title"`

Section measurements:

- minimum height `44rem`
- content max-width `46rem`
- contact copy sits above all decorative layers
- title-to-body gap `1.5rem`
- body-to-contact-action gap `2.5rem`

Preserve the approved manifesto, `Let’s build something difficult.`, `Brazil`, availability, and the verified Email, LinkedIn, and GitHub actions from `docs/content.md`.

Omit the résumé action until a verified URL exists. Do not add a placeholder or disabled control.

### 5. Build the shallow horizon

The Dotted Surface container:

- absolute left/right/bottom `0`
- height `20rem`
- opacity `0.22`
- z-index behind content
- pointer events none
- overflow hidden

Add:

- a top mask that fades from fully transparent to visible over the first `40%`
- a bottom fade into `--color-canvas`
- a static radial glow using accent B at `8%` opacity

The surface must never fill the section’s entire height.

### 6. Build the static fallback

Reduced motion and initialization failure show:

- the same `20rem` horizon
- a CSS radial gradient
- a sparse static dot pattern made with `radial-gradient`

No canvas and no movement.

### 7. Finish the footer

`SiteFooter` is a Server Component.

Required content:

- left: `© 2026 Portfolio.`
- right: `Back to top` linking to `#top`

Style:

- max width `74rem`
- page gutters
- top border `1px solid var(--color-line)`
- padding `2rem 0`
- Geist Mono
- font size `0.6875rem`
- muted color
- mobile stacks vertically with `1rem` gap

## Forbidden Changes

- No contact form
- No social links without verified URLs
- No full-screen Dotted Surface
- No `next-themes`
- No pointer interaction
- No starfield
- No additional CTA button when email is null
- No invented legal links
- No direct mount outside `ManagedWebGLEffect`

## Automated Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Manual Checks

- Confirm the three verified contact actions have the exact approved destinations.
- Scroll the horizon offscreen and confirm frames stop.
- Enable reduced motion and confirm static dots only.
- Test mobile and confirm the surface height remains `20rem`.
- Confirm footer link returns to `#top`.
- Confirm decorative canvas is absent from the accessibility tree.

## Acceptance Checklist

- [ ] Canonical-source comment exists.
- [ ] `next-themes` is not installed or imported.
- [ ] Dotted Surface is a `20rem` shallow horizon.
- [ ] Dotted Surface registers with the fixed decorative/high-cost config.
- [ ] Email, LinkedIn, and GitHub actions match `docs/content.md`.
- [ ] Footer content and layout match the recipe.
- [ ] Reduced motion uses static CSS dots.
- [ ] No unverified contact or social information appears.
- [ ] Lint, type-check, and build pass.
