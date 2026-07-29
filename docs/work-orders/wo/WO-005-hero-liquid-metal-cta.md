# WO-005 — Hero and Liquid Metal CTA

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-005 row is `READY`.

## Result to Produce

A finished hero layout using the fixed copy, managed Line Waves background, and the canonical Paper Liquid Metal shader in one managed link to `#work`.

Follow `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.

## Prerequisites

- WO-004
- `src/components/effects/line-waves.tsx` is integrated and passing validation.

## Canonical Source

- https://21st.dev/@johuniq/components/liquid-metal-button
- Copy the component source, not the preview/demo.
- The source currently lists `clsx`, `tailwind-merge`, `lucide-react`, and `@paper-design/shaders`. `clsx` and `tailwind-merge` already come from WO-002.

## Files to Create or Modify

```text
package.json
package-lock.json
src/app/layout.tsx
src/components/effects/line-waves.tsx
src/components/sections/hero-section.tsx
src/components/ui/liquid-metal-link.tsx
src/components/webgl/managed-webgl-effect.tsx
src/components/webgl/webgl-manager.tsx
```

Do not modify global tokens or Line Waves visual parameters.

## Procedure

### 1. Create the shared WebGL manager

Implement section 9 of `IMPLEMENTATION-SPEC.md`. Wrap application children with `WebGLManager` in `layout.tsx`.

Create `ManagedWebGLEffect` with the 300px near-viewport observer, registration lifecycle, static fallback, cost arbitration, and render-prop `shouldAnimate` control.

Migrate the existing `HeroLineWavesFrame` to:

```ts
{
  id: "line-waves",
  priority: "hero",
  estimatedCost: "high",
  continuous: true,
  allowMobile: true,
}
```

Do not change the existing Line Waves appearance.

### 2. Copy and reduce the source component

Create `src/components/ui/liquid-metal-link.tsx` with:

```ts
// Adapted from https://21st.dev/@johuniq/components/liquid-metal-button
```

Keep the real `liquidMetal` source shader implementation, but remove:

- icon-only mode
- generic button mode
- the demo component
- demo layout
- source colors and label
- unused Lucide icons

Do not install `lucide-react` if no icon remains.

### 3. Use a link-specific API

Export:

```ts
type LiquidMetalLinkProps = {
  href: string;
  children: string;
  className?: string;
};

export function LiquidMetalLink(
  props: LiquidMetalLinkProps,
): React.ReactElement;
```

The semantic interactive element must be an `<a>`, not a `<button>` with navigation behavior.

### 4. Install the canonical shader dependency

```bash
npm install @paper-design/shaders
```

Do not replace it with CSS-only animation and do not port the GLSL to OGL.

### 5. Apply exact dimensions and states

The link must have:

- height: `3.5rem`
- horizontal padding: `1.5rem`
- pill radius: `var(--radius-pill)`
- Geist Mono
- font size: `0.75rem`
- font weight: `600`
- letter spacing: `0.08em`
- text transform: uppercase
- text color: `var(--color-text)`
- default border: `1px solid var(--color-line-strong)`
- background base: `rgba(12, 15, 20, 0.82)`

State behavior:

- hover: translate upward by `1px`; shader/glow opacity increases by no more than `0.12`
- active: translate returns to `0`
- focus-visible: shared two-pixel focus outline remains unobstructed
- no disabled state is needed

The shader may retain its canonical grayscale metal striping. Surrounding glow, focus, border, and fallback colors use only accents A, B, and C.

### 6. Register Liquid Metal

Wrap the shader surface in `ManagedWebGLEffect` with:

```ts
{
  id: "liquid-metal",
  priority: "hero",
  estimatedCost: "low",
  continuous: true,
  allowMobile: false,
}
```

Pass manager animation state into the shader if supported. If the library exposes no pause control, render it only while `shouldAnimate` is true and show the static metallic fallback otherwise.

### 7. Implement the static fallback

When reduced motion is requested:

- do not mount or animate the shader
- use a static border gradient from accent A to accent B
- use the same dimensions
- do not apply transform on hover

The label remains `Explore my work`.

### 8. Finish the hero layout

`HeroSection` remains a Server Component.

Required section structure:

```text
section#top
  Line Waves background layer
  static contrast fades
  content wrapper
    eyebrow
    h1
    disciplines
    body paragraph
    LiquidMetalLink
    plain GitHub link
```

Use these measurements:

- hero min-height: `100svh`
- content wrapper max-width: `74rem`
- horizontal padding: `var(--page-gutter)`
- padding top: `9rem`
- padding bottom: `6rem`
- content max-width: `52rem`
- eyebrow to heading gap: `1.5rem`
- heading to body gap: `2rem`
- body max-width: `42rem`
- body to CTA gap: `2.5rem`

Use the exact hero typography and copy from the implementation spec.

### 9. Preserve readable layering

- Effect: z-index `0`
- Fades: z-index `1`
- Content: z-index `2`
- No element except the CTA receives pointer events from decorative layers.

## Forbidden Changes

- No second Liquid Metal CTA; the verified GitHub action remains a plain link
- No social icons
- No scroll indicator
- No portrait or device mockup
- No centered hero layout
- No new hero animation
- No Liquid Metal style elsewhere
- No CTA label change
- No CSS-only replacement and no hand-ported GLSL

## Automated Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Manual Checks

- Activate the CTA with mouse, Enter, and keyboard focus.
- Confirm it reaches `#work`.
- Enable reduced motion and confirm the shader does not animate.
- Test `320px`, `375px`, `768px`, `1024px`, and `1440px`.
- Confirm the title never overlaps the header or leaves the viewport horizontally.

## Acceptance Checklist

- [ ] CTA is an anchor to `#work`.
- [ ] Exact visible label is used.
- [ ] CTA dimensions and typography match the recipe.
- [ ] `@paper-design/shaders` is installed and the canonical shader is retained.
- [ ] Liquid Metal registers with the WebGL manager and uses the fixed low-cost hero config.
- [ ] Existing Line Waves is migrated to the manager without visual changes.
- [ ] Desktop manager budget permits Line Waves and Liquid Metal together.
- [ ] Reduced motion uses the static metallic fallback.
- [ ] Hero remains a Server Component.
- [ ] Hero spacing and max widths match the recipe.
- [ ] There is one CTA and one Liquid Metal treatment.
- [ ] Lint, type-check, and build pass.
