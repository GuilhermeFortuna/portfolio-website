# WO-008 — Project Showcase Structure

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-008 row is `READY`.

## Result to Produce

The locked Selected Work presentation: four project selectors beside one sticky abstract visual stage on desktop, and four simple content rows on smaller screens.

Follow `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.

## Prerequisites

- WO-002
- WO-003
- Exact project records exist in `src/content/projects.ts`.

## Files to Create or Modify

```text
src/components/sections/project-showcase.tsx
src/components/sections/selected-work-section.tsx
```

Do not add packages or effect components.

## Procedure

### 1. Make `ProjectShowcase` the only client boundary

Add `"use client"` to `project-showcase.tsx`.

Use:

```ts
type ProjectShowcaseProps = {
  projects: readonly Project[];
};
```

State:

```ts
const [activeSlug, setActiveSlug] = useState(projects[0].slug);
```

Do not store entire project objects in state.

### 2. Create the desktop project selectors

At `1024px` and wider, render four `<button type="button">` elements.

Each button contains, in order:

1. project index
2. category
3. project name as `h3`
4. summary

Button behavior:

- click sets active slug
- focus sets active slug
- mouse enter sets active slug only when `(pointer: fine)` matches
- `aria-pressed` is true only for the active project
- all text remains visible for all four projects

Button style:

- width `100%`
- text aligned left
- transparent background
- no radius
- minimum height `10rem`
- padding `1.5rem 0`
- top border `1px solid var(--color-line)`
- final button also has bottom border
- active name color `var(--color-text)`
- inactive name color `var(--color-text-muted)`
- active index color `var(--color-accent-a)`
- no translate, scale, glow, or box shadow

### 3. Create the desktop stage

The right column stage:

- position `sticky`
- top `8rem`
- aspect ratio `4 / 3`
- maximum height `42rem`
- background `var(--color-surface)`
- border `1px solid var(--color-line)`
- radius `var(--radius-lg)`
- overflow hidden
- internal padding `clamp(1.5rem, 4vw, 3rem)`

Add an empty decorative layer:

```tsx
<div data-shape-blur-slot aria-hidden="true" />
```

It fills the stage, has opacity `0` for now, and is behind the diagram. WO-010 owns it.

### 4. Create exact abstract diagrams

Keep diagram helpers inside `project-showcase.tsx`. They are `aria-hidden`.

Use only CSS and semantic-neutral spans/divs; do not add chart packages.

- **Aegis:** 35 circles in a 7×5 grid. Highlight cells 9, 18, and 26 with accents A, B, and C.
- **Q:** three horizontal SVG paths or CSS lines. Use line widths `82%`, `68%`, and `48%`; place one static `8px` marker at `64%` of the middle line.
- **gosigapp:** boxes labeled `UPLOAD`, `VALIDATE`, `SUBMIT`; connect them with one-pixel lines. Stack vertically below `1200px`; horizontal at and above `1200px`.
- **Nexo Dental:** 12 cells in a 4×3 grid. Highlight cell 6 with accent B. Add a centered `24px` crosshair using two one-pixel lines.

Only the active diagram is rendered in the desktop stage.

### 5. Create mobile/tablet rows

Below `1024px`:

- hide the sticky stage
- render the same four project records as noninteractive `<article>` elements
- one column
- padding `2rem 0`
- top border on every article
- bottom border on the last
- render index, category, `h3`, and summary
- do not render the diagrams

Do not render buttons on mobile/tablet.

### 6. Build the Selected Work section

Use `SectionShell`:

- `id="work"`
- `label={siteContent.workLabel}`
- `labelledBy="work-title"`

Heading block:

1. `h2#work-title`
2. a reserved accent slot:

```tsx
<div data-sparkles-slot aria-hidden="true" />
```

Accent slot dimensions:

- width `min(100%, 45rem)`
- height `6rem`
- margin top `1.5rem`
- margin bottom `3rem`
- temporary one-pixel horizontal line using `--color-line`

WO-009 replaces only the contents of this slot.

### 7. Apply the fixed desktop grid

At `1024px` and wider:

- columns `5fr 7fr`
- gap `clamp(2rem, 5vw, 5rem)`
- align start

## Forbidden Changes

- No card grid
- No carousel
- No accordion
- No modal
- No fake screenshot
- No project URL
- No tags or technology chips
- No Shape Blur or Sparkles implementation yet
- No additional project content

## Automated Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Manual Checks

- Desktop: click, focus, and fine-pointer hover every selector; verify the diagram changes.
- Coarse pointer: confirm hover is not required.
- Mobile/tablet: confirm four noninteractive articles and no stage.
- Disable JavaScript: confirm all four projects remain visible from server-rendered HTML.
- Confirm no empty link or “View project” control renders.

## Acceptance Checklist

- [ ] The presentation pattern exactly matches the fixed two-column/single-column rules.
- [ ] First project is initially active.
- [ ] All four selectors expose all text.
- [ ] Mobile/tablet uses articles, not buttons.
- [ ] Abstract diagrams match their recipes.
- [ ] Sparkles and Shape Blur slots exist.
- [ ] No factual content was invented.
- [ ] No dependency was added.
- [ ] Lint, type-check, and build pass.
