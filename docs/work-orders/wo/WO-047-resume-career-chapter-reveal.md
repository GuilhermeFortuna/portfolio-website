# WO-047 — Career Chapter Reveal

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-047 row is
`READY`.

## Result to Produce

An adapted Horizontal Feature Reveal that turns the two existing employers into
a legible desktop career sequence driven by vertical reading progress, while the
current semantic chronology remains the sole content source and the complete
fallback on mobile, reduced motion, and no JavaScript.

## Prerequisites

- WO-046 `DONE`, committed, frozen, and accepted at all required opening-scene
  viewports.

## Branch and Files

Create `wo/wo-047-resume-career-chapter-reveal` from the accepted WO-046 base.
Expected write scope:

```text
src/components/resume/resume-page.tsx
src/components/resume/resume-timeline.tsx
src/components/resume/resume-career-reveal.tsx           (new)
src/components/resume/__tests__/resume-career-reveal.test.tsx (new)
src/components/resume/__tests__/resume-timeline.test.tsx
src/app/globals.css
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not change Resume facts, experience order, PDF actions, capability scene,
project sections, case-study routes, or any Work content.

## External Source

Canonical source:
`https://21st.dev/@hyperiux/components/horizontal-feature-reveal`.

Use the WO-044-frozen public implementation. Reuse the site's existing
GSAP/ScrollTrigger bridge; the adapted component must not register a second
GSAP instance, own global refresh, or initialize smooth scrolling.

## Experience Contract

- Vertical document progress may translate a desktop editorial track; the
  browser retains vertical scrolling and native wheel/touch behavior.
- Each employer chapter shows its existing employer, role, period, summary, and
  every highlight. Long bullets may not be truncated, marquee-scrolled, or
  disclosed only after interaction.
- The active chapter may control decorative background/index elements only.
  Screen-reader order stays reverse chronological and never follows transforms.
- Period labels remain visible text. The decorative progress beam and chapter
  counters are `aria-hidden` when they repeat information.
- The transition into and out of the pinned track has stable spacer geometry,
  no jump, no blank trap, and correct fixed-header offsets.
- At the WO-044 breakpoint/height threshold, at 200% zoom, with coarse pointer,
  reduced motion, or without JS, use the existing natural vertical timeline.

## Ordered Implementation

1. Record base commit, current semantic chronology, all localized experience
   strings, ScrollTrigger ownership, scroll height, and performance baseline.
2. Write failing tests that assert reverse chronology, every role/period/summary/
   highlight, one semantic copy, no `/work/aegis` link, fallback selection, and
   teardown on route transition.
3. Adapt the source's progress geometry to two chapters and the WO-045 scene API.
   Keep content in normal semantic DOM and transforms presentational.
4. Integrate desktop pin/translation with deterministic spacers and existing
   refresh lifecycle. Prove no duplicate GSAP registration or global listener.
5. Preserve and refine `resume-timeline.tsx` as the explicit fallback, not a
   hidden duplicate that remains accessible beside the enhanced track.
6. Tune handoffs from capability orbit and into projects so only the experience
   reveal dominates its scene.
7. Verify both locales through repeated forward/back scrolling, scrollbar drag,
   keyboard anchors, resize across breakpoint, browser back/forward, reduced
   motion, no JS, 200% zoom, mobile, tablet, and short landscape.
8. Run validation, compare content fingerprints and performance budgets, update
   provenance, commit, freeze, and move WO-048 to `READY` after review.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
NEXT_OUTPUT=export pnpm run build
git diff --check
git diff -- package.json pnpm-lock.yaml pnpm-workspace.yaml
rg -n "new Lenis|gsap\.registerPlugin|from ['\"]gsap|/work/aegis" src/components/resume
```

An existing centralized GSAP import may be used only through the repository's
approved runtime boundary. Explain any match; manifest diff must remain empty.

## Acceptance Checklist

- [ ] Both employer chapters retain every approved fact and highlight exactly
      once in the accessibility tree.
- [ ] Vertical input drives the desktop story without horizontal page overflow,
      nested scrolling, scroll trap, or transition jump.
- [ ] Native timeline fallback is complete on all contracted modes.
- [ ] Reverse chronology, headings, periods, anchors, and fixed-header offsets
      remain correct.
- [ ] No Resume-to-`/work/aegis` connection or Work-surface change exists.
- [ ] Resize, route change, browser navigation, and unmount clean up all effects.
- [ ] Performance and motion budgets pass in both locales.
- [ ] Provenance and adaptations are complete; manifests are unchanged.

## Handoff

Report the freeze commit; exact content comparison; ScrollTrigger/progress and
cleanup design; enhanced/fallback DOM strategy; full browser/viewport/motion/
no-JS evidence; overflow and scroll-height results; budgets; tests/builds;
provenance; and constraints for the project proof stack.

