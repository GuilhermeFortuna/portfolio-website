# WO-032 — gosigapp Case-Study Implementation

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-032 row is
`READY`.

## Result to Produce

A `/work/gosigapp` case study that makes a screenless backend pipeline's
architecture, security model, and compliance stakes understandable, and that
connects the homepage's `gosigapp` entry to the route — built on the existing
shared primitives, and reading as the same series as `/work/aegis` and
`/work/q`.

## Prerequisites

- WO-031 `DONE`

## Files to Create or Modify

```text
src/content/case-studies/gosigapp.ts
src/content/case-studies/index.ts
src/app/work/gosigapp/page.tsx
src/components/case-study/gosigapp-system-map.tsx
src/content/projects.ts
src/app/__tests__/gosigapp-page.test.tsx
src/app/__tests__/page.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

**`src/components/sections/project-showcase.tsx` is deliberately not in
scope**, for the same reason WO-027 recorded: it renders the case-study link
generically from `project.name`/`project.href`, so changing `projects[2]` is
sufficient. That file belongs to the parallel VIZ line
([`../viz/README.md`](../viz/README.md)); do not write it.

Shared primitives may be modified **only** where a genuine third consumer
requires it:

```text
src/types/case-study.ts
src/components/case-study/case-study-shell.tsx
src/components/case-study/case-study-hero.tsx
src/components/case-study/case-study-section.tsx
src/components/case-study/case-study-media.tsx
```

Any change to those five files is a reusability change and must be justified
in the handoff, and must leave Aegis and Quant rendering byte-identical. Do
not touch `src/content/case-studies/aegis.ts`, `src/content/case-studies/
q.ts`, or their route files.

## Reuse Contract

WO-021 delivered the typed content model, shell, hero, section, and media
primitives; WO-027 already proved they generalize to a second, differently
shaped chapter (Quant's optional `liveEnvironment`). This is the third test,
and the shape difference is sharper: gosigapp has **no product screenshots at
all**, only a diagram and up to two small CLI/log captures.

- Start by rendering gosigapp through the existing primitives unchanged.
- The hero: confirm from WO-031 whether it needs an image at all. If WO-031
  specifies no hero image, `CaseStudyHero` must already tolerate that, or
  this order widens it the same legitimate way WO-027 widened
  `liveEnvironment` — optional, not forked, and Aegis/Quant's hero rendering
  must not change.
- `liveEnvironment` is omitted for gosigapp, reusing the optional field
  WO-027 already introduced. No new widening is expected here.
- `CaseStudySection.video` stays unused, exactly as it is for Quant.
- Do not introduce a "diagram-only section" variant component. If
  `CaseStudyMedia` cannot render an SVG diagram as cleanly as it renders a
  screenshot, widen its accepted media type rather than forking a new
  component — an `<img>`/`<picture>` already handles SVG.

## Fixed Page Composition

```text
Site header
Case-study hero
Context
Problem
System map (WO-030 diagram, rendered through GosigappSystemMap)
Three engineering decisions with assigned media where WO-031 places it
Contribution
Delivered result and honest limits
Technology in context
Disclosure note
Previous/return/contact actions
Site footer
```

Where this sketch and the approved WO-031 contract disagree, **the contract
wins**, the same resolution WO-022 and WO-027 recorded.

## System Map Contract

`GosigappSystemMap` is semantic HTML/CSS, following the same pattern as
`AegisSystemMap` and `QSystemMap` — not canvas, not a raw embed of the
README's Mermaid diagram. It shows only boundaries WO-029 accepted, along the
lines of:

```text
Amazon S3 (source files)
  → Extract and process
    → PFX digital signature (RSA-SHA256)
      → Compress and encode
        → mTLS-authenticated submission → SIGAP API
```

Use only labels accepted by WO-029, including its verified wording for
retries/auditability if that boundary is shown. Provide an accessible text
equivalent using the same nested-list technique the other two system maps
use. Do not show bucket names, brand codes, internal hosts, or invented
throughput numbers. If WO-030 produced `system-map.svg` as a finished visual
asset rather than a set of labels to re-implement in HTML/CSS, render it
through `CaseStudyMedia` instead of rebuilding it as a component — confirm
which approach WO-031's content contract assumes and follow that, since the
contract wins any disagreement with this sketch.

## Media Behavior

- The diagram/CLI captures render at their native dimensions from WO-030's
  manifest; intrinsic `width`/`height` in content must match the real file
  so no layout shift occurs.
- Any hero visual is `eager`; every other image stays `loading="lazy"`,
  matching the existing primitive default.
- Captions from WO-031 render as visible `figcaption` text.
- Do not substitute a stock or generic diagram for a missing capture — if
  WO-030 reserved an asset rather than delivering it, the corresponding
  section relies on prose only, exactly as WO-027 handled a possible missing
  "Subject 12" for Quant.

## Homepage Integration

- Change `projects[2].href` from `null` to `/work/gosigapp`. Confirm
  `projects[2].name` and `category` already match the approved public
  wording from WO-029/WO-031; update only if they do not.
- The derived link label becomes `View gosigapp case study` automatically,
  since WO-022 built it from `project.name`. Update the expectation in
  `src/app/__tests__/page.test.tsx`. Leave `project-showcase.test.tsx` to the
  VIZ line, which owns that component.
- Confirm in a browser that three linked projects (Aegis, Quant, gosigapp)
  behave correctly and no row geometry shifts — but fix nothing there
  yourself; a defect in that component is a VIZ finding, report it.
- Do not change the hero `Explore my work` destination; it stays
  `/work/aegis`.
- **The VIZ line may be redesigning this section concurrently**, per the
  precedent WO-027 recorded. Both the `href: null` behavior and the derived
  label are contract, recorded in VIZ-005, so this data change lands
  correctly whichever layout is live at merge time.

## Procedure

1. Compare the planned route against the exact WO-031 content and media map.
2. Author `src/content/case-studies/gosigapp.ts` from the approved copy,
   verbatim. Register it in the case-studies index.
3. Build the route from the existing primitives. Record every primitive
   change and why the unchanged primitive could not serve.
4. Implement `GosigappSystemMap` (or the direct-SVG-render path, per
   WO-031's assumption) and its accessible equivalent.
5. Place approved media beside its assigned sections with correct intrinsic
   dimensions.
6. Add the homepage `gosigapp` link using the fixed integration contract.
7. Record media and component provenance. No new third-party dependency is
   expected.
8. Extend tests: route composition, copy fidelity against the contract,
   media dimensions and lazy-loading, fixture captions present, accessible
   labels, three-linked-project homepage behavior, and `null` behavior for
   the remaining project (Nexo Dental).
9. Manually review the full forward reading flow at all required viewports,
   and read `/work/aegis`, `/work/q`, and `/work/gosigapp` back to back to
   confirm all three read as one series despite gosigapp's much lighter
   media set.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
```

The build must report `/work/gosigapp` as `○ (Static)`. Verify the generated
`.next/server/app/work/gosigapp.html` without executing JavaScript: exactly
one `h1`, headings in contract order, every image under `/work/gosigapp/`
with an `alt`, all anchors same-origin, and zero occurrences of
`[REQUIRED:`, `[CONFIDENTIAL:`, `BRX`, `RICO`, or author-note markers.

## Manual Checks

- 1440×900, 1280×800, 1024×768, 768×1024, and 375×780.
- Motion allowed, reduced motion, and Save-Data.
- Keyboard-only, screen-reader landmark/heading pass, and 200% zoom.
- JavaScript disabled.
- Homepage active states for Aegis, Quant, and gosigapp; Nexo Dental still
  `null`.
- Page weight: record total transferred bytes and confirm this chapter is
  meaningfully lighter than Aegis and Quant, given its much smaller media
  set — a regression toward heavier weight than Aegis with less content
  would itself be a finding.

## Acceptance Checklist

- [ ] The route follows the approved contract and approved copy exactly.
- [ ] The shared primitives were reused; every change to them is justified
      and leaves Aegis and Quant rendering identical.
- [ ] The system map is truthful, semantic, responsive, and shows only
      WO-029-accepted boundaries.
- [ ] Homepage links Aegis, Quant, and gosigapp without changing other
      project behavior, and no row geometry shifts.
- [ ] Reduced-motion, Save-Data, keyboard, no-JS, zoom, and viewport checks
      pass.
- [ ] No brand code, employer identity, or infra identifier appears in
      rendered output.
- [ ] No new dependency or visual runtime is introduced.
- [ ] Tests, coverage, lint, type-check, build, and diff checks pass.

## Handoff

Include route screenshots, every shared-primitive change with its
justification, proof Aegis and Quant are unchanged, system-map source
mapping, the placed-media map, accessibility and viewport results,
page-weight comparison against Aegis and Quant, test/coverage results,
dependency/provenance result, and every deviation from the contract.
