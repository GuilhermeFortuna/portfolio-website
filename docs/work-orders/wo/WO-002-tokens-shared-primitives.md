# WO-002 — Tokens and Shared Primitives

## Status

Ready after WO-001.

## Result to Produce

The exact Batch 01 palette, typography, spacing, focus behavior, section container, class-name helper, and shared motion-activity hooks.

## Prerequisites

- WO-001
- `src/app/layout.tsx`, `src/app/globals.css`, and the validation scripts must exist.

## Files to Create or Modify

```text
package.json
package-lock.json
src/app/globals.css
src/app/layout.tsx
src/components/layout/section-shell.tsx
src/hooks/use-effect-activity.ts
src/hooks/use-motion-preference.ts
src/lib/cn.ts
```

Do not create section components in this Work Order.

## Procedure

### 1. Install the shared class-name dependencies

Install:

```bash
npm install clsx tailwind-merge
```

Do not install an icon or animation package.

### 2. Create `cn`

`src/lib/cn.ts` must export:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

### 3. Configure fonts

In `src/app/layout.tsx`:

1. Import `Geist` and `Geist_Mono` from `next/font/google`.
2. Configure both with `subsets: ["latin"]`.
3. Assign CSS variables `--font-geist-sans` and `--font-geist-mono`.
4. Put both variables on `<body>`.
5. Do not use a network stylesheet or manually downloaded font file.

### 4. Replace base CSS

Keep the framework’s required Tailwind import. Add every token from section 5 of `docs/work-orders/wo/IMPLEMENTATION-SPEC.md` exactly.

Then add:

```css
html {
  background: var(--color-canvas);
  color-scheme: dark;
  scroll-behavior: smooth;
}

body {
  min-width: 20rem;
  margin: 0;
  overflow-x: clip;
  background: var(--color-canvas);
  color: var(--color-text);
  font-family: var(--font-geist-sans), sans-serif;
  text-rendering: optimizeLegibility;
}

::selection {
  background: color-mix(in srgb, var(--color-accent-a) 32%, transparent);
  color: var(--color-text);
}

:focus-visible {
  outline: 2px solid var(--color-focus);
  outline-offset: 4px;
}

@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }

  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Add element resets for links, buttons, images, and headings, but do not add decorative backgrounds.

### 5. Create the section container

`src/components/layout/section-shell.tsx` remains a Server Component and exports:

```ts
type SectionShellProps = {
  id: string;
  label?: string;
  labelledBy?: string;
  className?: string;
  children: React.ReactNode;
};
```

It must render:

- a semantic `<section>`
- the supplied `id`
- `aria-labelledby` only when `labelledBy` exists
- an inner wrapper with `max-width: var(--content-wide)`
- horizontal padding `var(--page-gutter)`
- centered margin
- vertical padding `var(--section-space)`
- optional eyebrow `<p>` before children

The eyebrow uses the fixed eyebrow typography from the implementation spec.

### 6. Create the reduced-motion hook

`src/hooks/use-motion-preference.ts` is a Client Component module and exports:

```ts
export function useMotionPreference(): boolean;
```

Return `true` when `(prefers-reduced-motion: reduce)` matches. Subscribe to changes with `MediaQueryList.addEventListener("change", ...)` and clean up on unmount.

### 7. Create the effect-activity hook

`src/hooks/use-effect-activity.ts` is a Client Component module and exports:

```ts
export function useEffectActivity(
  ref: React.RefObject<Element | null>,
): boolean;
```

The return value is `true` only when:

- the element is intersecting with threshold `0.05`
- the document is visible
- reduced motion is false

Use one `IntersectionObserver` and one `visibilitychange` listener per mounted hook. Clean up both. Initialize as `false`; do not animate before hydration.

### 8. Confirm keyboard treatment

Create a temporary anchor in the diagnostic page only if needed to inspect focus. Remove it before handoff; WO-003 owns page content.

## Forbidden Changes

- No new colors or token values
- No section copy
- No visual effect
- No animation package
- No generic Button component
- No theme switcher or `next-themes`
- No dark/light theme branching

## Automated Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Manual Checks

- Toggle operating-system reduced motion and confirm the media query responds.
- Tab to an existing focusable element and confirm a visible two-pixel focus ring.
- Inspect computed styles and confirm both Geist variables are present.
- Resize below `320px`; the document must not collapse below the fixed `20rem` floor.

## Acceptance Checklist

- [ ] Every token matches `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.
- [ ] Geist Sans and Geist Mono use framework font loading.
- [ ] `cn` merges class names.
- [ ] `SectionShell` implements the fixed width, gutter, and vertical spacing.
- [ ] `useMotionPreference` reacts to preference changes.
- [ ] `useEffectActivity` combines intersection, visibility, and motion preference.
- [ ] All listeners and observers clean up.
- [ ] No effect package was installed.
- [ ] Lint, type-check, and build pass.
