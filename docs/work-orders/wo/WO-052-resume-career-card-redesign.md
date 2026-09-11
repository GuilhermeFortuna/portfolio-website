# WO-052 — Career Chapter Card Redesign

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-052 row is
`READY`.

## Result to Produce

Work Experience cards that read as authored editorial chapters instead of plain
panels: full use of the card width, a clear anatomy, and visible chapter state
tied to the existing horizontal scroll progress — in the enhanced desktop scene
and in the static/mobile/no-JS timeline fallback.

## Prerequisites

- WO-051 `DONE`, with the career-card direction approved (`RD-###` recorded).

## Branch and Files

Create `wo/wo-052-resume-career-card-redesign` from the WO-051 commit.

```text
src/components/resume/resume-career-reveal.tsx
src/components/resume/resume-timeline.tsx
src/components/resume/__tests__/resume-career-reveal.test.tsx
src/components/resume/__tests__/resume-timeline.test.tsx
src/app/globals.css                         (resume-career-* / resume-timeline-* only)
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

## Design Contract

The approved WO-051 direction governs the exact look. Whatever it specifies, it
must satisfy these problems from the owner review:

- **No dead half.** At 1440 and 1730 wide, the card uses its full width. Meta
  (period, location, role, chapter index) and highlights are composed as one
  layout — for example a meta rail beside the highlight list — rather than one
  left-aligned column.
- **Real anatomy.** Card chrome (index, hairlines, corner or edge detail) comes
  from the existing line and accent tokens, not from new shadows, glass, or
  glow.
- **Live state.** The progress indicator belongs to the card frame and shows
  which chapter is active, driven by the existing `activeCareerIndex` value. The
  inactive card is visibly secondary while it is partly in view.
- **Hierarchy.** The organization name remains the dominant element but no
  longer overwhelms highlights; highlight labels stay scannable.
- **No repeated facts on screen.** Resolve any duplication that WO-051 classified
  as presentation (e.g. location shown twice) by composition, never by editing
  content.
- **Fallback parity.** The timeline fallback uses the same card anatomy in a
  single column. Mobile has no horizontal reading.

## Invariants

- The ordered list stays the single experience DOM. GSAP changes geometry only.
- `splitHighlight` remains the only transformation of highlight strings; every
  highlight is rendered exactly once.
- Pin, scrub, and `invalidateOnRefresh` behavior and the enhanced/fallback mode
  switch from WO-049 are preserved.
- No new content, dependency, runtime, or `requestAnimationFrame` loop.

## Non-Goals

- Changing the horizontal-reveal mechanics, pin distance, or chapter count.
- Adding logos, tech tags, or metrics.
- Touching credentials, languages, or convergence.

## Ordered Implementation

1. Record the base commit, current tests, and 1440/1730/1024/375 baseline captures.
2. Add tests first: one article per employer; every highlight exactly once; the
   active-state attribute follows the chapter index; the fallback renders the
   same fields; no duplicated location/role text beyond the content contract.
3. Restructure card markup for the approved anatomy in both modes.
4. Implement styles in Resume-owned selectors using existing tokens.
5. Verify forward/reverse scroll, fast scrub, resize across the mode boundary,
   reduced motion, 200% zoom, and no-JS in both locales.
6. Update provenance with the local adaptation, run validation, commit, move
   WO-052 to `REVIEW`, and stop.

## Automated Checks

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
git diff -- package.json pnpm-lock.yaml pnpm-workspace.yaml
rg -n "requestAnimationFrame|new Lenis|WebGL" src/components/resume
```

## Acceptance Checklist

- [ ] The approved direction is implemented at 1440 and 1730 with no empty half.
- [ ] Chapter state is visible and matches scroll progress in both directions.
- [ ] The fallback timeline shares the anatomy and passes at 375 and 200% zoom.
- [ ] Every experience fact appears exactly once in the accessibility tree.
- [ ] No manifest, content, or runtime change; validation passes.

## Handoff

Report the commit; before/after captures at each viewport in both modes;
test additions; the provenance entry; and any register item left open.
