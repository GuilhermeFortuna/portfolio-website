# WO-029 — Case-Study Chapter Instrument

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when WO-029 is `READY`.

## Result to Produce

Adapt D-011's 21st.dev `Dynamic Island TOC` into a persistent, portfolio-owned
chapter instrument. Its compact state communicates current chapter and local
progress; its expanded state provides cinematic, keyboard-accessible navigation
through all Aegis chapters.

## Prerequisites

- WO-028 `DONE`
- D-011 source-register row accepted and hash-locked

## Canonical Source

- `https://21st.dev/@digitalzone0707/components/dynamic-island-toc`
- Use the captured source paths and SHA-256 recorded by WO-024.

## Files to Create or Modify

```text
src/components/case-study/experience/case-study-chapter-instrument.tsx
src/components/case-study/experience/case-study-chapter-instrument.module.css
src/components/case-study/experience/case-study-scene-context.ts
src/components/case-study/case-study-shell.tsx
src/components/case-study/aegis/aegis-experience.tsx
src/app/work/aegis/page.tsx
src/components/case-study/experience/__tests__/case-study-chapter-instrument.test.tsx
src/app/__tests__/aegis-page.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

## Shared API

```ts
export type CaseStudyChapter = {
  id: string;
  label: string;
  href: `#${string}`;
};

export type CaseStudyChapterInstrumentProps = {
  chapters: readonly CaseStudyChapter[];
  activeId: string;
  localProgress: number;
};
```

The Aegis adapter supplies the existing twelve section IDs and their approved
headings. Do not add editorial group names, reading time, word count, impact
figures, completion claims, or new chapter labels.

## Selected Motion Contract

Preserve the source's Motion-powered compact/expanded layout morph, animated
active label, progress treatment, presence transitions, and navigable list.
Do not copy its Apple-like black pill styling, blog typography, demo hierarchy,
automatic heading discovery, or visual tokens.

Compact state:

- fixed bottom center after the D-009 entrance completes;
- current chapter ordinal, exact short heading, and local scene progress;
- visually restrained enough not to compete with D-008 or D-010.

Expanded state:

- becomes an authored overlay/surface within the portfolio grid;
- lists all twelve real anchors in DOM order and marks current/completed states;
- traps no scroll and restores focus to the opener after selection or Escape;
- collapses after native anchor navigation reaches the selected scene.

Use Motion for layout/presence/state transitions and consume D-006's active
scene/local progress. Remove the source's document scroll calculation, heading
observer, `useScroll`, smooth-scroll logic, and reduced-motion branch.

## Navigation and Accessibility

- Render a real `nav` labelled `Case study chapters` and real `<a href="#id">`
  destinations.
- The root Lenis `anchors: true` path owns smooth movement; do not create a
  second scroll function or prevent native navigation without preserving the
  hash/history result.
- Opener and every link are at least 44×44 CSS pixels, have visible focus, and
  remain reachable at 200% zoom.
- `Escape`, outside activation, route exit, and successful chapter navigation
  close the expanded state and clean up listeners.
- No-JS keeps a normal semantic chapter navigation available; essential route
  orientation cannot depend on Motion mounting.

## Responsive Contract

Author separate compact and expanded compositions for desktop and mobile.
Below 768px, the expanded list may occupy most of the viewport but must retain
safe-area spacing, show the current item, avoid horizontal overflow, and leave
a visible close action. Do not merely scale the desktop capsule.

## Procedure

1. Recheck the D-011 captured hash and copy the accepted source with its header.
2. Replace discovery/scroll ownership with the fixed prop API.
3. Apply portfolio tokens and the two responsive compositions.
4. Map the existing twelve Aegis anchors without changing headings.
5. Integrate D-006 progress and root Lenis anchor handling.
6. Test keyboard, touch, reverse scroll, fragment entry, history, focus return,
   resize, route exit, and no-JS behavior.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
rg -n "useScroll\(|new Lenis|IntersectionObserver|requestAnimationFrame|prefers-reduced-motion" src/components/case-study/experience/case-study-chapter-instrument.tsx
git diff --check
```

The ownership search must return no match.

## Acceptance Checklist

- [ ] The source's compact-to-expanded layout transformation remains recognizable.
- [ ] Compact state shows correct active chapter and normalized local progress.
- [ ] Expanded state exposes all twelve unchanged destinations in DOM order.
- [ ] Navigation, hash/history, keyboard, touch, Escape, focus return, and 200%
  zoom work.
- [ ] D-006 and root Lenis remain the only scene/scroll owners.
- [ ] No Apple/demo styling, invented labels, Aegis skin, or reduced-motion path exists.
- [ ] Desktop/mobile compositions are independently authored and overflow-free.
- [ ] Repository and browser checks pass.

## Handoff

Include source/adaptation diff, compact/expanded captures at desktop/mobile,
chapter mapping, keyboard/focus/hash/history results, no-JS result, ownership
scan, cleanup proof, test results, and deviations.
