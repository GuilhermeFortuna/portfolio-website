# WO-028 — Sourced Decision and Evidence Choreography

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-028 row is
`READY`.

## Result to Produce

Adapt React Bits `Scroll Stack` for the four engineering decisions and React
Bits `Glare Hover` for real evidence media. The result must feel like the same
portfolio as every other project page, preserve all approved Aegis content and
media, and remain reusable for later case studies.

## Prerequisites

- WO-027 `DONE`
- React Bits `Scroll Stack` and `Glare Hover` are `ACCEPTED` in
  `docs/aegis-case-study-component-shortlist.md`

## Canonical Sources

- Scroll Stack: https://www.reactbits.dev/components/scroll-stack
- Glare Hover: https://www.reactbits.dev/animations/glare-hover
- Revision: `b9158acb37e7bdfd6c5bc5894da1826fe1d05a6b`
- Use the exact source paths, revisions, and hashes accepted by WO-024. Add
  `Adapted from` comments to both copied source files.

## Files to Create or Modify

```text
src/components/effects/scroll-stack.tsx
src/components/effects/glare-hover.tsx
src/components/case-study/case-study-decision-stack.tsx
src/components/case-study/case-study-evidence-frame.tsx
src/components/case-study/aegis/aegis-case-study.module.css
src/components/case-study/case-study-media.tsx
src/components/case-study/case-study-shell.tsx
src/app/work/aegis/page.tsx
src/app/__tests__/aegis-page.test.tsx
src/components/case-study/aegis/__tests__/aegis-decision-stack.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not modify content, types, or files in `public/work/aegis/`.

## Scroll Stack Adaptation

- Preserve the accepted source's card stacking, scale, vertical offset, and
  release behavior.
- Remove its internal `new Lenis(...)`, private RAF, nested overflow scroller,
  and lifecycle ownership. Consume the one root Lenis instance and case-study
  progress supplied by `PortfolioMotionProvider`.
- Do not replace the signature transforms with a custom observer or a new GSAP
  timeline. Any source change beyond scroll-owner extraction, semantic markup,
  tokens, and responsive integration is a blocker for owner review.
- Each decision remains one semantic `<section>` with its current ID, heading,
  paragraph order, media, captions, and accessible names. Decorative numerals
  `01`–`04` are `aria-hidden="true"`.
- Decision 1 and Decision 2 receive no invented diagram, image, metric, icon, or
  illustration. Typography and sourced stacking provide their pacing.
- On narrow viewports, retain authored motion and native document flow without
  horizontal swipe, nested scrolling, or clipped prose.

## Glare Hover Adaptation

- Preserve the accepted source's pointer-driven glare mechanic and CSS geometry.
- Apply it through the shared `CaseStudyEvidenceFrame`, never directly in the
  Aegis route.
- Use only portfolio accent tokens, existing radii, and bounded opacity. No
  Aegis palette, dashboard bezel, fake reflection asset, or product-specific
  frame.
- Apply to the two Decision 3 screenshots and the Delivered screenshot only.
  Do not apply it to prose-only decisions or the native video.
- Disable pointer response on coarse pointers while retaining the same authored
  entry motion. No information may depend on hover; captions stay visible.
- Preserve every evidence-bearing edge with `object-fit: contain`; do not crop,
  recolor, regenerate, or alter the source media bytes.

## Video and Closing Contract

Decision 4 keeps the existing poster, controls, muted, playsInline, preload
metadata, title, transcript, and accessible label. Do not autoplay, loop,
replace controls, scrub playback with scroll, or hide the transcript.

Contribution, Delivered, Technology, and Confidentiality return to one calm
reading column. Use the sourced Fade Content primitive from WO-026 for the final
reveal. Keep only the two approved closing links; add no contact form,
next-project card, repository link, live-environment link, or new copy.

## Procedure

1. Copy both exact accepted sources and preserve provenance comments.
2. Extract Scroll Stack from its private Lenis/RAF/scroller and connect it to
   the root provider without changing its signature transforms.
3. Map the four existing decision sections into the shared stack.
4. Normalize Glare Hover and apply it through the shared evidence frame.
5. Preserve native video behavior and implement the calm closing sequence.
6. Compare copy and media hashes against Batch 03.
7. Test fast forward/reverse scroll, keyboard/touch scrolling, resize, route
   exit during stack motion, pointer exit, and video playback.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
rg -n "new Lenis|useScroll\(|requestAnimationFrame|overflow-y: *(auto|scroll)" src/components/effects/scroll-stack.tsx src/components/case-study/case-study-decision-stack.tsx
git diff --check
```

The `rg` command must return no match.

## Acceptance Checklist

- [ ] Both components match the exact accepted React Bits revision and source hashes.
- [ ] Scroll Stack retains its recognizable mechanic with one shared root Lenis owner.
- [ ] Four decisions remain distinct without new or reordered copy.
- [ ] Decision 1 and 2 contain no fabricated visual evidence.
- [ ] Evidence media is unchanged, uncropped, readable, and provenance-backed.
- [ ] The native video and transcript retain their accessible behavior.
- [ ] Styling uses only the portfolio system and shared case-study primitives.
- [ ] No Aegis-specific page skin or visual hierarchy is introduced.
- [ ] Listeners, frames, scroll state, and playback clean up on route exit.
- [ ] Repository checks pass.

## Handoff

Include both source revisions/hashes, source-versus-adaptation diffs,
stack state captures, evidence pointer/coarse-pointer captures, copy and media
hash comparison, one-Lenis ownership proof, video-policy evidence, route-exit
cleanup, responsive results, test results, and deviations.
