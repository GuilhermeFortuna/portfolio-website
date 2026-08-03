# VIZ-005 — Selected Work Stage

## Status

See [`VIZ-STATUS.md`](VIZ-STATUS.md). Dispatch only when the VIZ-005 row is
`READY`. May run in parallel with VIZ-003 and VIZ-004.

## Result to Produce

A Selected Work section that makes a visitor want to open a case study. This is
the part of the page the whole site exists to serve.

## Prerequisites

- VIZ-002 `DONE`

## Files to Create or Modify

```text
src/components/sections/project-showcase.tsx
src/components/sections/selected-work-section.tsx
src/components/effects/shape-blur.tsx
src/components/effects/sparkles.tsx
src/components/ui/**
src/app/globals.css
src/components/sections/__tests__/project-showcase.test.tsx
docs/work-orders/wo/IMPLEMENTATION-SPEC.md
docs/work-orders/viz/VIZ-STATUS.md
```

`src/content/projects.ts` belongs to **Batch 04**, which is changing `Q` to
`Quant` and setting its `href`. Read it; do not write it. Coordinate with
VIZ-004 on `selected-work-section.tsx` and `globals.css`.

## The Layout Is Open

`IMPLEMENTATION-SPEC.md` §11 currently fixes this section hard: a `5fr 7fr`
desktop grid, four selector buttons on the left, one sticky `4/3` visual stage
on the right at `top: 8rem`, hover-to-activate on fine pointers only, and single
column with no Shape Blur on mobile.

**All of it is open.** Replace it if the approved direction wants something
better, and update §11 to match what ships.

## Data Contract

Read `projects` from `src/content/projects.ts`. Four entries, each with `slug`,
`index`, `name`, `category`, `summary`, and `href`.

Two rules that must survive any redesign:

- **`href: null` renders no action at all** — no disabled control, no fake
  route, no placeholder. Two of the four are still `null`, and Quant flips to
  `/work/q` during Batch 04. Whatever you build must handle both states without
  the layout moving as chapters ship.
- **The link label is derived** — `View ${project.name} case study`. It becomes
  `View Quant case study` automatically when Batch 04 lands. Do not hardcode it.

WO-022 reserved the link slot for any project with an `href` specifically
because rendering it only when active made rows shift as the pointer crossed the
column, since selection follows hover. Whatever replaces the current layout has
to solve that same problem — geometry must not change as the pointer moves.

## The Placeholder Diagrams

The current visual stage uses abstract non-factual diagrams: a dot matrix for
Aegis, plot lines for Q, three labeled boxes for gosigapp, an appointment grid
for Nexo Dental. They are honest placeholders and they look like placeholders.

**Batch 04 is producing twelve uncropped 2560×1440 captures of Quant's
interface, deliberately over-resolved so this kind of work can crop and animate
into them.** Aegis already has four 1600×900 screenshots plus an 8.6-second
film in `public/work/aegis/`.

Using real project media here is the single biggest available upgrade to this
section. Two constraints if you do:

- **D-002 — comparable weight.** Aegis and Quant would have real media while
  gosigapp and Nexo Dental have none. A design that looks broken for the two
  chapters without media is not finished. Solve for the mixed state.
- **Page weight.** The Aegis homepage baseline is 306 KiB over 19 requests.
  Full-resolution project media on the landing page will destroy that if loaded
  eagerly. Lazy-load, downscale for this context, or both — and measure.

Quant's captures do not exist until WO-025 completes. Either design against the
Aegis assets and leave a seam, or coordinate timing — do not block on it.

## Known Styling Bug

WO-022 recorded it and it is still open: the unlayered `button { border: 0;
padding: 0 }` reset in `globals.css` outranks Tailwind's layered utilities, so
`border-t` and `py-6` on the desktop selector buttons have never rendered. The
markup was left byte-identical at the time to avoid adding separator lines
nobody had approved.

Fix it properly here, or delete the inert utilities. Do not leave a third order
to rediscover it.

## Verification

- Every project reachable and selectable by keyboard; focus visible; the link is
  never nested inside a button.
- Row geometry does not shift as the pointer crosses the column, or as a project
  gains an `href`.
- Both `href` states render correctly, including two `null` projects today.
- Reduced motion: all four projects equally visible and readable.
- Frame rate during rapid selection changes and pointer movement.
- Page weight before and after, with request count.
- 1440×900, 1024×768, 768×1024, 375×780, and 200% zoom.

## Automated Checks

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
```

## Acceptance Checklist

- [ ] Approved names, categories, and summaries render verbatim from content.
- [ ] `href: null` renders no action; the link label stays derived.
- [ ] Geometry does not shift on hover or when a project gains an `href`.
- [ ] Keyboard selection works; no link nested in a button; focus visible.
- [ ] Reduced motion leaves all four projects equally visible.
- [ ] If real media is used, the no-media chapters still look deliberate.
- [ ] Page weight and request count recorded before and after.
- [ ] The `globals.css` button-reset bug is fixed or the dead utilities removed.
- [ ] `IMPLEMENTATION-SPEC.md` §11 matches what shipped.
- [ ] Tests, lint, type-check, build, and diff checks pass.

## Handoff

Include a recording of selection and hover at desktop and mobile, the mixed
`href` state, keyboard evidence, geometry-stability proof, page weight before
and after, the button-reset resolution, media decisions with their weight cost,
every specification section superseded, and what VIZ-006 should scrutinize.
