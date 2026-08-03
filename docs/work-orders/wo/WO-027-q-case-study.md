# WO-027 — Q Case-Study Implementation

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-027 row is
`READY`.

## Result to Produce

A `/work/q` case study that makes the system, end-to-end ownership, and
engineering decisions understandable, and that connects the homepage's Q entry
to the route — built on the existing shared primitives, and reading as the same
series as `/work/aegis`.

## Prerequisites

- WO-026 `DONE`

## Files to Create or Modify

```text
src/content/case-studies/q.ts
src/content/case-studies/index.ts
src/app/work/q/page.tsx
src/components/case-study/q-system-map.tsx
src/components/sections/project-showcase.tsx
src/content/projects.ts
src/app/__tests__/q-page.test.tsx
src/app/__tests__/page.test.tsx
src/components/sections/__tests__/project-showcase.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Shared primitives may be modified **only** where a genuine second consumer
requires it:

```text
src/types/case-study.ts
src/components/case-study/case-study-shell.tsx
src/components/case-study/case-study-hero.tsx
src/components/case-study/case-study-section.tsx
src/components/case-study/case-study-media.tsx
```

Any change to those five files is a reusability change and must be justified in
the handoff. Do not change Aegis rendering, and do not touch
`src/content/case-studies/aegis.ts` or `src/app/work/aegis/page.tsx`.

## Reuse Contract

WO-021 already delivered the typed content model, the shell, the hero, the
section, and the media primitives, and they are `DONE`. This order is the first
test of whether they generalize.

- Start by rendering Q through the existing primitives unchanged.
- Only where that genuinely fails, widen a primitive — do not fork it, do not
  add a Q-specific variant of an existing component, and do not introduce a
  parallel shell.
- Two known shape differences to resolve rather than work around. Quant has no
  video, and `CaseStudySection.video` is already optional, so that one is free.
  The hero `liveEnvironment` control is not: locked owner fact 8 omits it for
  Quant, but `CaseStudyHero.liveEnvironment` is currently a **required** field
  in `src/types/case-study.ts`. Make it optional and have the hero render
  nothing when it is absent. That is a legitimate widening — Aegis keeps its
  disabled pill and its rendering must not change.
- The `<picture>` element in `case-study-media.tsx` is already documented as the
  seam for an additional source. Do not add AVIF in this order.

## Fixed Page Composition

```text
Site header
Case-study hero
Context
Problem
System map
Four engineering decisions with assigned images
Contribution
Delivered result and honest limits
Technology in context
Disclosure note
Previous/return/contact actions
Site footer
```

Where this sketch and the approved WO-026 contract disagree, **the contract
wins** — the same resolution WO-022 recorded as its decision 1.

## System Map Contract

`QSystemMap` is semantic HTML/CSS, not canvas or handcrafted SVG. It shows only
boundaries WO-024 accepted, along the lines of:

```text
Tauri desktop shell
  → React SPA (webview)
    → FastAPI service
      → PostgreSQL
      → Redis queue
        → Dramatiq worker pool → backtests, optimization, walk-forward, discovery
      → market-data ingestion
      → MetaTrader 5 boundary
```

Use only labels accepted by WO-024, including its verified wording for the
execution status. Provide an accessible text equivalent using the same
nested-list technique `AegisSystemMap` uses, so both chapters behave identically
for assistive technology. Do not show internal hosts, schemas, broker names, or
invented throughput.

## Media Behavior

- Every image is 2560×1440 and rendered responsively; the intrinsic `width` and
  `height` in content must match the real file so no layout shift occurs.
- The hero image is `eager`; every other image stays `loading="lazy"`, which the
  existing primitive already does by default.
- Captions from WO-026 render as visible `figcaption` text.
- No image is cropped in CSS in a way that hides evidence the adjacent copy
  relies on.
- If subject 12 was deferred by WO-025, the desktop-application claim is carried
  by prose and the system map alone. Do not substitute another image for it and
  do not imply a screenshot exists.

## Homepage Integration

- Change `projects[1].name` from `Q` to `Quant` (locked owner fact 1) and its
  `href` to `/work/q`. The slug stays `q` unless the owner asked for
  `/work/quant`. `category` and `summary` are unchanged. gosigapp and Nexo
  Dental remain `null`.
- The derived link label becomes `View Quant case study` automatically, since
  WO-022 built it from `project.name`. Update the test expectation accordingly.
- The `View ${project.name} case study` link is already derived and already has a
  reserved slot for any project with an `href` (WO-022 decisions 7 and 8).
  Confirm both still hold with two linked projects and that no row geometry
  shifts.
- Keep desktop project selectors as buttons; never nest a link in a button.
- The mobile Q article includes the same link after its summary.
- Do not change the hero `Explore my work` destination; it stays `/work/aegis`
  as the first project in fixed chapter order.
- Preserve homepage section order and all existing visual effects.

## Procedure

1. Compare the planned route against the exact WO-026 content and media map.
2. Author `src/content/case-studies/q.ts` from the approved copy, verbatim.
   Register it in the case-studies index.
3. Build the route from the existing primitives. Record every primitive change
   and why the unchanged primitive could not serve.
4. Implement `QSystemMap` and its accessible equivalent.
5. Place approved images beside their assigned sections with correct intrinsic
   dimensions.
6. Add homepage Q links using the fixed integration contract.
7. Record media and component provenance. No new third-party dependency is
   expected.
8. Extend tests: route composition, copy fidelity against the contract, image
   dimensions and lazy-loading, fixture captions present, accessible labels,
   two-linked-project homepage behavior, and `null` behavior for the remaining
   two projects.
9. Manually review the full forward reading flow at all required viewports, and
   read `/work/aegis` and `/work/q` back to back to confirm they read as one
   series.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
```

The build must report `/work/q` as `○ (Static)`. Verify the generated
`.next/server/app/work/q.html` without executing JavaScript: exactly one `h1`,
headings in contract order, every image under `/work/q/` with an `alt`, all
anchors same-origin, and zero occurrences of `[REQUIRED:`, `[CONFIDENTIAL:`, or
author-note markers.

## Manual Checks

- 1440×900, 1280×800, 1024×768, 768×1024, and 375×780.
- Motion allowed, reduced motion, and Save-Data.
- Keyboard-only, screen-reader landmark/heading pass, and 200% zoom.
- JavaScript disabled.
- Homepage Q active/inactive states, Aegis still linked, and both remaining
  `null` actions.
- Page weight with all images: record total transferred bytes and confirm lazy
  loading actually defers the off-screen ones.

## Acceptance Checklist

- [ ] The route follows the approved contract and approved copy exactly.
- [ ] The shared primitives were reused; every change to them is justified and
      leaves Aegis rendering identical.
- [ ] Every project visual explains adjacent content.
- [ ] The system map is truthful, semantic, responsive, and shows the verified
      execution status.
- [ ] Homepage links both Aegis and Q without changing other project behavior,
      and no row geometry shifts.
- [ ] Reduced-motion, Save-Data, keyboard, no-JS, zoom, and viewport checks pass.
- [ ] Off-screen images are genuinely deferred; page weight is recorded.
- [ ] No new dependency or visual runtime is introduced.
- [ ] Tests, coverage, lint, type-check, build, and diff checks pass.

## Handoff

Include route screenshots, every shared-primitive change with its justification,
proof Aegis is unchanged, system-map source mapping, the placed-media map,
accessibility and viewport results, page-weight and lazy-loading evidence,
test/coverage results, dependency/provenance result, and every deviation from
the contract.
