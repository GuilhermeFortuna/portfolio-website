# WO-030 — Aegis Decision Panel Choreography

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when WO-030 is `READY`.

## Result to Produce

Adapt D-012's 21st.dev `Story Scroll` angular full-viewport panel takeover into
the structural transition language for the four existing Aegis decision
chapters. Each settled chapter must have its own composition while the shared
rotation/overlap mechanic makes the sequence feel cumulative.

## Prerequisites

- WO-029 `DONE`
- D-012 source-register row accepted and hash-locked

## Canonical Source

- Source: `https://21st.dev/@boudjadjasamira/components/story-scroll`
- Full-screen demo:
  `https://cdn.21st.dev/boudjadjasamira/story-scroll/default/bundle.1777905625968.html?theme=dark&dark=true`
- Use the captured source paths and SHA-256 recorded by WO-024.

## Files to Create or Modify

```text
src/components/case-study/experience/case-study-decision-panels.tsx
src/components/case-study/experience/case-study-decision-panel.tsx
src/components/case-study/experience/case-study-experience.module.css
src/components/case-study/experience/case-study-scene-manager.tsx
src/components/case-study/case-study-section.tsx
src/components/case-study/case-study-media.tsx
src/components/case-study/aegis/aegis-experience.tsx
src/app/work/aegis/page.tsx
src/components/case-study/experience/__tests__/case-study-decision-panels.test.tsx
src/app/__tests__/aegis-page.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not modify `src/content/case-studies/aegis.ts` or approved media.

## Source Mechanic

Preserve the incoming panel's lower-edge origin, x-axis rotation, upward
takeover, temporary overlap with the previous chapter, pinned stage, and
scrubbed reverse path. Remove the source's document-level initialization,
independent ScrollTriggers, reduced-motion branch, demo palette, art copy,
typography, spacing, and repeated panel layout.

Register one scoped decision sequence with D-006. The root Lenis instance drives
it. Do not add scroll snapping, an Observer/InputObserver, nested scroller,
second smooth-scroll owner, global ticker, RAF, Canvas, or WebGL context.

## Fixed Four-Panel Composition

1. `decision-1`: typography-led declaration of keeping Aegis standalone,
   followed by its existing reasoning. No image, diagram, icon, or metric.
2. `decision-2`: editorial text contrast between curated-store reads and direct
   lakehouse reads. Do not create an architecture/data-flow diagram.
3. `decision-3`: composition reserves one large evidence stage. WO-031 controls
   `player-investigation.webp` then `risk-constellation.webp`; do not render two
   small simultaneous cards.
4. `decision-4`: composition resolves around `entry-intro.mp4`. The video keeps
   native controls, poster, `muted`, `playsInline`, `preload="metadata"`, title,
   and transcript; never autoplay, loop, or scrub playback.

The four chapters keep their existing IDs, headings, paragraph order, captions,
and media order. Decorative decision numerals may be generated from the index
but must be `aria-hidden`. Each settled panel must remain readable long enough
before the next takeover begins.

## Layout and Failure Behavior

- Desktop panels use a shared takeover axis but distinct internal grids.
- Tablet/mobile retain the authored angular takeover with shallower geometry
  and normal vertical reading; no horizontal swipe or clipped prose.
- Essential content remains semantic DOM and selectable throughout.
- Before hydration, without JavaScript, and after initialization failure, the
  four decisions render in ordinary document flow in their approved order.
- Direct entry at a decision fragment initializes the matching settled panel
  without playing earlier decisions.

## Procedure

1. Recheck D-012's captured source and copy the selected mechanic with its header.
2. Extract a generic decision-panel API without demo content or styles.
3. Register one D-006-owned pinned/scrubbed sequence.
4. Author four distinct Aegis layouts using only existing content slots.
5. Leave stable media-stage seams for WO-031.
6. Test slow/fast/reverse scroll, keyboard/touch, fragments, video interaction,
   resize, runtime failure, and route exit.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
rg -n "new Lenis|useScroll\(|Observer\.create|requestAnimationFrame|scroll-snap|prefers-reduced-motion" src/components/case-study/experience/case-study-decision-panels.tsx src/components/case-study/experience/case-study-decision-panel.tsx
git diff --check
```

## Manual Checks

- Capture each panel entering, overlapped, settled, and reversing at 1440×900,
  768×1024, and 390×844.
- Verify wheel, keyboard, touch, fast flick, reverse, direct fragments, history,
  200% zoom, no-JS, slow initialization, video controls, and route exit.

## Acceptance Checklist

- [ ] D-012's angular rotation, overlap, pinning, and takeover remain recognizable.
- [ ] All four settled compositions are visibly distinct rather than cloned cards.
- [ ] Decisions 1 and 2 contain no invented visual evidence.
- [ ] Decision 3 exposes one large staged-media seam for WO-031.
- [ ] Decision 4 preserves native, user-controlled video behavior.
- [ ] D-006/root Lenis own the sequence; no competing runtime or reduced path exists.
- [ ] Approved copy, IDs, order, media, captions, and semantic HTML remain intact.
- [ ] Responsive, no-JS, failure, and route-cleanup checks pass.

## Handoff

Include source/adaptation diff, timeline ranges, four-state capture sequences,
content/media comparison, input/fragment/video results, runtime-owner inventory,
failure render, cleanup evidence, test results, and deviations.
