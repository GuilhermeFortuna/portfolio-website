# WO-026 — Sourced Progress and Section Choreography

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-026 row is
`READY`.

## Result to Produce

Adapt Magic UI `Scroll Progress` and React Bits `Fade Content` into the shared
case-study system, then add a semantic chapter navigation wrapper. Do not create
a custom progress animation or section-reveal engine.

## Prerequisites

- WO-025 `DONE`
- Magic UI `Scroll Progress` and React Bits `Fade Content` source rows are
  `ACCEPTED`

## Canonical Sources

```text
https://magicui.design/docs/components/scroll-progress
https://www.reactbits.dev/animations/fade-content
https://github.com/DavidHDev/react-bits/tree/b9158acb37e7bdfd6c5bc5894da1826fe1d05a6b
```

## Files to Create or Modify

```text
src/components/effects/fade-content.tsx
src/components/ui/scroll-progress.tsx
src/components/case-study/case-study-narrative-rail.tsx
src/components/case-study/case-study-experience.module.css
src/components/case-study/aegis/aegis-experience.tsx
src/components/case-study/case-study-section.tsx
src/components/case-study/case-study-shell.tsx
src/app/work/aegis/page.tsx
src/app/__tests__/aegis-page.test.tsx
src/components/case-study/__tests__/case-study-narrative-rail.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

## Scroll Progress Adaptation

Preserve Magic UI's `motion.div` scale-X progress treatment and transform
origin. Replace its internal root `useScroll()` call with a required
`progress: MotionValue<number>` prop supplied by `PortfolioMotionProvider`.

- Fixed position: directly below the site header.
- Height: `2px` desktop, `1px` below `768px`.
- Color: `var(--color-accent-a)` only.
- Track: transparent; no gradient, glow, percentage, or time-to-read label.
- Z-index: above content/background, below focusable header controls.
- It must not add a scroll listener, Lenis instance, Motion `useScroll`, or RAF.

## Chapter Navigation Wrapper

The chapter navigation is semantic integration glue, not a new visual-library
component. It is a `nav` labelled `Case study chapters` with the exact existing
section IDs and four compact group labels:

| Group | Target | Active range |
| --- | --- | --- |
| `Brief` | `#top` | top through problem |
| `System` | `#system` | system |
| `Decisions` | `#decision-1` | decision-1 through decision-4 |
| `Outcome` | `#contribution` | contribution through confidentiality |

These labels are navigational, not factual claims. Do not add word count,
reading time, completion percentage, or impact figures.

At `min-width: 1100px`, place the four native links in a fixed left rail. Below
that width, hide the text rail and retain only the sourced top progress line.
Every link remains a real `href="#id"`; Lenis `anchors: true` owns smooth
movement and browser history. Do not call `preventDefault` or `scrollTo` in the
rail.

## Fade Content Adaptation

Preserve React Bits' GSAP/ScrollTrigger source, one-shot behavior, public props,
and cleanup. Use the pinned TypeScript source and add the provenance header.

Fixed use for case-study sections:

```tsx
<FadeContent
  blur={false}
  duration={800}
  ease="power2.out"
  delay={0}
  threshold={0.22}
  initialOpacity={0.35}
>
  {children}
</FadeContent>
```

Adapt upstream only so server/no-JS content starts visible and initialization
failure cannot leave content hidden. Do not add a second IntersectionObserver,
replay on reverse scroll, split text, rotate copy, or build a bespoke stagger
wrapper. Apply it once per semantic section; use normal CSS gaps inside.

## Portfolio-System Rules

- Shared filenames, APIs, and CSS may not mention Aegis except in its route
  adapter and section-ID mapping.
- All typography, colors, radii, spacing, and focus styling use portfolio tokens.
- The same components must accept a future project section map without visual
  redesign.
- Forced motion applies; do not use Motion or GSAP reduced-motion APIs.

## Procedure

1. Verify source revisions/hashes from WO-024 before copying.
2. Copy Magic UI Scroll Progress and React Bits Fade Content with canonical
   source/revision headers.
3. Adapt Scroll Progress to the provider MotionValue and fixed token styling.
4. Adapt Fade Content only for lifecycle, visibility safety, and typing.
5. Add the semantic shared narrative rail and Aegis group mapping.
6. Apply one Fade Content instance to each body/closing section.
7. Verify Lenis anchors, direct fragment loads, browser back/forward, and 200%
   zoom.
8. Record adaptation diffs and source hashes in provenance.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
rg -n "useScroll\(|new Lenis|requestAnimationFrame" src/components/ui/scroll-progress.tsx src/components/case-study
git diff --check
```

The ownership scan must show no root scroll owner or animation loop in these
files.

## Manual Checks

- Direct load and keyboard activation for `#top`, `#system`, `#decision-1`, and
  `#contribution`.
- 1440×900, 1280×720, 1100×700, 1024×768, 768×1024, 390×844, and 320×568.
- 200% zoom, JavaScript disabled, slow script load, tab hidden/restored.
- Smooth wheel, keyboard PageDown/Home/End, touch, rapid/reverse scroll, browser
  back, and route exit.

## Acceptance Checklist

- [ ] Progress and section reveal components are copied from the accepted public
  sources, not custom-created.
- [ ] Magic UI progress consumes the shared MotionValue and owns no root scroll.
- [ ] React Bits Fade Content preserves its signature mechanic and cleanup.
- [ ] The semantic rail adds navigation only and follows portfolio styling.
- [ ] Lenis anchors, keyboard, touch, sticky, and history behavior pass.
- [ ] Shared components contain no Aegis-specific visual design.
- [ ] No duplicate Lenis, useScroll, ScrollTrigger owner, observer, or RAF exists.
- [ ] Server/no-JS content is complete and visible.
- [ ] Narrow viewports and 200% zoom have no overlap or overflow.
- [ ] Repository checks pass.

## Handoff

Include source/revision/hash mapping, exact adaptation diffs, progress and rail
captures, fragment/keyboard/touch/history results, ownership scan, no-JS result,
listener/ticker inventory, validation results, and deviations.
