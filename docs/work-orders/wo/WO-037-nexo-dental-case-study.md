# WO-037 — Nexo Dental Case-Study Implementation

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-037 row is
`READY`.

## Result to Produce

A `/work/nexo-dental` case study that presents a multi-tenant clinic
operations product's architecture, role-native design, and product decisions,
and that connects the homepage's `Nexo Dental` entry to the route — built on
the existing shared primitives, closing out the four-chapter series
alongside `/work/aegis`, `/work/q`, and `/work/gosigapp`.

## Prerequisites

- WO-036 `DONE`

## Files to Create or Modify

```text
src/content/case-studies/nexo-dental.ts
src/content/case-studies/index.ts
src/app/work/nexo-dental/page.tsx
src/content/projects.ts
src/app/__tests__/nexo-dental-page.test.tsx
src/app/__tests__/page.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

**`src/components/sections/project-showcase.tsx` is deliberately not in
scope**, for the same reason WO-027 and WO-032 recorded: it renders the
case-study link generically from `project.name`/`project.href`, so changing
`projects[3]` is sufficient. That file belongs to the parallel VIZ line
([`../viz/README.md`](../viz/README.md)); do not write it.

Shared primitives may be modified **only** where a genuine fourth consumer
requires it:

```text
src/types/case-study.ts
src/components/case-study/case-study-shell.tsx
src/components/case-study/case-study-hero.tsx
src/components/case-study/case-study-section.tsx
src/components/case-study/case-study-media.tsx
```

Any change to those five files is a reusability change and must be
justified in the handoff, and must leave Aegis, Quant, and gosigapp
rendering byte-identical. Do not touch `src/content/case-studies/aegis.ts`,
`src/content/case-studies/q.ts`, `src/content/case-studies/gosigapp.ts`, or
their route files.

## Reuse Contract

WO-021 delivered the typed content model, shell, hero, section, and media
primitives; WO-027 proved they generalize to a differently shaped chapter
(Quant's optional `liveEnvironment`), and WO-032 proved they generalize
again to a chapter with no product screenshots at all (gosigapp). This is
the fourth and final test, and the shape is the closest yet to Aegis's and
Quant's: a real product with a full media set and a hero image.

- Start by rendering Nexo Dental through the existing primitives unchanged.
- The hero uses the `liveEnvironment` optional field WO-027 introduced,
  reusing Aegis's exact disabled-state object shape:
  `liveEnvironment: { label: "Live environment — coming soon" }`. Do not
  widen the type; this is the same value Aegis already uses verbatim.
- `CaseStudySection.video` stays unused, exactly as it is for Quant and
  gosigapp.
- No new component is expected. If WO-036's contract calls for a system-
  overview visual, prefer the existing `CaseStudyMedia`/`CaseStudyFigure`
  path (as Quant does) over introducing a bespoke system-map component
  (as Aegis and gosigapp did for their own domains) unless WO-036
  specifically requires a diagram — confirm this against the approved
  content contract, since the contract wins any disagreement.

## Fixed Page Composition

```text
Site header
Case-study hero (with disabled live-environment control)
Context
Problem
System overview
Up to four engineering decisions with assigned media where WO-036 places it
Contribution
Delivered result and honest limits
Technology in context
Disclosure note
Previous/return/contact actions
Site footer
```

Where this sketch and the approved WO-036 contract disagree, **the contract
wins**, the same resolution WO-022, WO-027, and WO-032 recorded.

## Media Behavior

- Every image renders at its native dimensions from WO-035's manifest;
  intrinsic `width`/`height` in content must match the real file so no
  layout shift occurs.
- The hero visual is `eager`; every other image stays `loading="lazy"`,
  matching the existing primitive default.
- Captions from WO-036 render as visible `figcaption` text.
- Do not substitute a stock or placeholder image for a missing capture — if
  WO-035 reserved or dropped an asset, the corresponding section relies on
  prose only.

## Homepage Integration

- Change `projects[3].href` from `null` to `/work/nexo-dental`. Confirm
  `projects[3].name` and `category` already match the approved public
  wording from WO-034/WO-036; update only if they do not.
- The derived link label becomes `View Nexo Dental case study`
  automatically, since WO-022 built it from `project.name`. Update the
  expectation in `src/app/__tests__/page.test.tsx`. Leave
  `project-showcase.test.tsx` to the VIZ line, which owns that component.
- Confirm in a browser that all four projects (Aegis, Quant, gosigapp, Nexo
  Dental) behave correctly and no row geometry shifts — but fix nothing
  there yourself; a defect in that component is a VIZ finding, report it.
- Do not change the hero `Explore my work` destination; it stays
  `/work/aegis`.
- **The VIZ line may be redesigning this section concurrently**, per the
  precedent WO-027 and WO-032 recorded. Both the `href: null` behavior and
  the derived label are contract, recorded in VIZ-005, so this data change
  lands correctly whichever layout is live at merge time.
- After this order, no project retains `href: null` — this is the fourth
  and final chapter. Update any test or comment that assumed a permanently
  `null` fourth project (e.g. WO-032's own test comment noting "Nexo Dental
  still `null`").

## Procedure

1. Compare the planned route against the exact WO-036 content and media
   map.
2. Author `src/content/case-studies/nexo-dental.ts` from the approved copy,
   verbatim. Register it in the case-studies index.
3. Build the route from the existing primitives. Record every primitive
   change and why the unchanged primitive could not serve.
4. Place approved media beside its assigned sections with correct intrinsic
   dimensions.
5. Add the homepage `Nexo Dental` link using the fixed integration
   contract, removing the last `href: null` in `projects.ts`.
6. Record media and component provenance. No new third-party dependency is
   expected.
7. Extend tests: route composition, copy fidelity against the contract,
   media dimensions and lazy-loading, disabled live-environment control
   behavior (`aria-disabled="true"`, no `href`), accessible labels, and
   four-linked-project homepage behavior with no remaining `null` project.
8. Manually review the full forward reading flow at all required
   viewports, and read `/work/aegis`, `/work/q`, `/work/gosigapp`, and
   `/work/nexo-dental` back to back to confirm all four read as one
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

The build must report `/work/nexo-dental` as `○ (Static)` (or the sitewide
pre-existing `ƒ Dynamic` state already recorded for the other three case
studies, per WO-033's F-04 finding — do not treat that as a new regression
if it matches the existing pattern). Verify the generated static HTML
without executing JavaScript: exactly one `h1`, headings in contract order,
every image under `/work/nexo-dental/` with an `alt`, all anchors
same-origin, and zero occurrences of `[REQUIRED:`, `[CONFIDENTIAL:`, or
author-note markers.

## Manual Checks

- 1440×900, 1280×800, 1024×768, 768×1024, and 375×780.
- Motion allowed, reduced motion, and Save-Data.
- Keyboard-only, screen-reader landmark/heading pass, and 200% zoom.
- JavaScript disabled.
- Homepage active states for Aegis, Quant, gosigapp, and Nexo Dental — no
  project remains `null`.
- The disabled live-environment control is visibly non-interactive and
  never receives keyboard focus as an actionable element.
- Page weight: record total transferred bytes and compare against all
  three prior chapters.

## Acceptance Checklist

- [ ] The route follows the approved contract and approved copy exactly.
- [ ] The shared primitives were reused; every change to them is justified
      and leaves Aegis, Quant, and gosigapp rendering identical.
- [ ] The live-environment control reuses Aegis's exact disabled-state
      object, not a real link.
- [ ] Homepage links all four projects without changing other project
      behavior, and no row geometry shifts.
- [ ] Reduced-motion, Save-Data, keyboard, no-JS, zoom, and viewport checks
      pass.
- [ ] No real clinic/patient data or Firebase/infra identifier appears in
      rendered output.
- [ ] No new dependency or visual runtime is introduced.
- [ ] Tests, coverage, lint, type-check, build, and diff checks pass.

## Handoff

Include route screenshots, every shared-primitive change with its
justification, proof Aegis/Quant/gosigapp are unchanged, the placed-media
map, accessibility and viewport results, page-weight comparison against the
other three chapters, test/coverage results, dependency/provenance result,
and every deviation from the contract.
