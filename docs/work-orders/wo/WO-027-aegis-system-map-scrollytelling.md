# WO-027 — Sourced Sticky System-Map Scrollytelling

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-027 row is
`READY`.

## Result to Produce

Adapt Aceternity UI's accepted `Sticky Scroll Reveal` composition into a shared
case-study story primitive, then use it to guide the existing complete and
truthful Aegis system map. Preserve the source component's sticky text/visual
relationship and Motion transitions while replacing its demo content and style
with approved case-study content and the portfolio design system.

## Prerequisites

- WO-026 `DONE`
- Aceternity `Sticky Scroll Reveal` is `ACCEPTED` in
  `docs/aegis-case-study-component-shortlist.md`

## Canonical Source

- Documentation: https://ui.aceternity.com/components/sticky-scroll-reveal
- Revision, source path, and SHA-256: use the immutable values accepted by
  WO-024.
- Add an `Adapted from` comment with the canonical URL and accepted revision to
  the copied source file. Do not copy demo prose, imagery, colors, or cards.

## Files to Create or Modify

```text
src/components/effects/sticky-scroll-reveal.tsx
src/components/case-study/case-study-sticky-story.tsx
src/components/case-study/aegis-system-map.tsx
src/components/case-study/aegis/aegis-system-story.tsx
src/components/case-study/aegis/aegis-case-study.module.css
src/app/work/aegis/page.tsx
src/app/__tests__/aegis-page.test.tsx
src/components/case-study/aegis/__tests__/aegis-system-story.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not modify `src/content/case-studies/aegis.ts`.

## Fixed Story Steps

Use the existing accepted labels and details in `aegis-system-map.tsx`. Do not
add prose to the case-study content contract.

| Step | Active nodes/path |
| --- | --- |
| 1 | Investigator UI → FastAPI service |
| 2 | FastAPI service → Curated PostgreSQL schema |
| 3 | FastAPI service → Databricks lakehouse and Redis cache |
| 4 | Databricks lakehouse → Scheduled sync and detection jobs |
| 5 | Scheduled jobs → PostgreSQL and cache refresh; then show the full system |

The approved system paragraph stays before the story. Step text may reuse only
the existing node labels; do not invent explanatory captions.

## Source Adaptation Contract

- Preserve the accepted component's sticky two-column composition, active-item
  transition model, and Motion-based visual swap.
- Expose a shared `CaseStudyStickyStory` API that accepts semantic step content,
  a render function for the visual, and the current active step.
- Consume the case-study provider's existing scroll state. Do not call root
  `useScroll`, create a Lenis instance, add a private RAF, or create a nested
  scroll container.
- Keep native document scroll, Lenis anchor behavior, keyboard scroll, sticky
  positioning, history restoration, and text selection intact.
- Normalize all colors, surfaces, radii, spacing, typography, and focus states
  to the portfolio tokens. No Aegis product chrome, palette, iris/shield motif,
  or dashboard styling.
- The shared primitive must accept another project's approved story and visual
  without an Aegis-specific branch.

## Layout and Map Behavior

At `min-width: 1024px`, use the accepted sticky composition with narrative
column `minmax(18rem, 0.8fr)`, visual column `minmax(0, 1.4fr)`, gap
`clamp(2rem, 6vw, 6rem)`, and visual top `8rem`. Each step is at least `42svh`.

`AegisSystemMap` accepts
`activeStep?: 1 | 2 | 3 | 4 | 5 | "all"`; default is `"all"`. Add stable
`data-node` and `data-path` attributes. Active nodes are fully opaque, visited
nodes are `0.72`, and upcoming nodes are `0.28` but readable. Connector
activation uses token timing and transforms; do not turn the map into canvas,
SVG, an image, or another WebGL effect.

Below `1024px`, keep the same authored motion but render the complete map in
normal flow after the steps. Do not duplicate the map five times or introduce a
horizontal carousel. Before hydration, without JavaScript, and after a runtime
failure, the complete map remains visible and readable.

## Procedure

1. Copy the exact accepted source and preserve its provenance comment.
2. Extract only the integration seams needed for shared progress, semantic
   content, and portfolio tokens; document every behavioral deviation.
3. Refactor the map to accept the fixed optional active-step API without
   changing its default static render.
4. Map the five fixed steps into `CaseStudyStickyStory` and keep one complete
   semantic map in the DOM.
5. Implement responsive normal flow and runtime-failure behavior.
6. Test forward/reverse scroll, fast wheel input, keyboard scrolling, touch,
   anchors, history restoration, resize across `1024px`, and route exit.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
rg -n "new Lenis|useScroll\(|requestAnimationFrame" src/components/effects/sticky-scroll-reveal.tsx src/components/case-study/case-study-sticky-story.tsx
git diff --check
```

The `rg` command must return no match.

## Acceptance Checklist

- [ ] The component is traceable to the exact accepted Aceternity source snapshot.
- [ ] Its signature sticky composition and Motion transitions remain recognizable.
- [ ] Five steps tell the fixed architecture in the correct direction.
- [ ] One complete semantic map remains the accessible DOM source.
- [ ] No new claim, label, system, metric, host, or schema identifier appears.
- [ ] Portfolio tokens and shared case-study boundaries are used throughout.
- [ ] No second scroll owner, root subscription, RAF loop, or nested scroller exists.
- [ ] Desktop sticky behavior and responsive normal flow do not trap scrolling.
- [ ] Forced motion is preserved; hidden/offscreen work still stops.
- [ ] Repository checks pass.

## Handoff

Include source revision/hash, source-versus-adaptation diff, five-step
capture sequence, responsive capture, source mapping for every node, shared
scroll-owner proof, keyboard/touch/anchor/history results, cleanup evidence,
test results, and deviations.
