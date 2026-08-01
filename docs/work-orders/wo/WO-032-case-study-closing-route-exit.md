# WO-032 — Case-Study Closing Scene and Route Exit

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when WO-032 is `READY`.

## Result to Produce

Adapt D-014's Codrops/Thibault Guignand `Next-Project Scroll Morph` into the
portfolio-wide case-study closing scene. A deliberate final scroll expands a
destination preview to fullscreen, traces 0–100 progress, and hands committed
navigation to D-009's kinetic route transition.

## Prerequisites

- WO-031 `DONE`
- D-014 source-register row accepted and hash-locked

## Canonical Source

- Demo: `https://www.thibaultguignand.com/en/project/atelier-stratus`
- Published implementation:
  `https://tympanus.net/codrops/2026/05/06/from-shader-uniforms-to-clip-path-wipes-how-gsap-drives-my-portfolio/`
- Use the captured code boundaries and SHA-256 recorded by WO-024.

## Files to Create or Modify

```text
src/components/case-study/experience/case-study-closing-scene.tsx
src/components/case-study/experience/case-study-exit-target.ts
src/components/case-study/experience/case-study-experience.module.css
src/components/case-study/experience/kinetic-route-transition.tsx
src/components/case-study/case-study-shell.tsx
src/components/case-study/aegis/aegis-experience.tsx
src/content/projects.ts
src/app/work/aegis/page.tsx
src/components/case-study/experience/__tests__/case-study-closing-scene.test.tsx
src/content/__tests__/projects.test.ts
src/app/__tests__/aegis-page.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not publish a route, copy, or media asset for an unavailable project.

## Destination Model

```ts
export type CaseStudyExitTarget = {
  kind: "project" | "work-index";
  href: string;
  eyebrow: string;
  title: string;
  mediaSrc?: string;
  mediaAlt?: string;
};
```

Resolve the next project after the current slug whose `href` is non-null. When
one exists, use only its portfolio-owned index, name, category, route, and
approved hero media. When none exists, return:

```ts
{
  kind: "work-index",
  href: "/#work",
  eyebrow: "",
  title: "Back to selected work",
}
```

The fallback deliberately reuses the existing approved closing label and adds
no new visible copy. Aegis currently uses the work-index mode because Q,
gosigapp, and Nexo Dental have `href: null`.

Keep the existing `Get in touch` action as a secondary semantic link after or
within the closing composition without competing with the primary scene.

## Morph Algorithm

Use one D-006-owned ScrollTrigger with `scrub: 1`. On update, write directly to
element refs—never React state:

```ts
const percent = Math.round(progress * 100);
const scale = 1.3 - 0.3 * progress;
const insetV = Math.max(0, 20 - 20 * progress);
const insetH = Math.max(0, 40 - 40 * progress);
```

- Counter displays `100` at `percent >= 99`.
- Apply `scale` and `clip-path: inset(insetV% insetH%)` to the preview.
- Drive the SVG circle with
  `strokeDashoffset = circumference - progress * circumference`.
- Reverse scrolling reverses every value exactly.

Use states `idle -> triggered -> navigating`. Set `hasSeenLowProgress` only
after progress reaches `<= 0.1`. At 100, trigger only when state is `idle`, the
low-progress guard is true, and absolute ScrollTrigger velocity is `<= 2000`.
Start a `250ms` commit timer; reverse below 100 before it fires cancels the
timer and restores `idle`.

Activation by click, Enter, or Space tweens the same progress object from its
current value to 1 and scrolls the document to the matching end position. It
must not use a separate visual path. On commit, preload only a real destination
route/media, then call D-009's route-transition controller. Navigation failure
or cancellation restores an operable current page.

## Visual and Runtime Contract

- Begin as a strongly inset destination preview and finish as a full-viewport
  portfolio composition.
- Use portfolio typography, tokens, grid, and approved media; copy none of the
  source site's photography, minimap, white styling, labels, or identity.
- The shared component contains no Aegis-specific branch or special hierarchy.
- Use the root Lenis and existing GSAP ticker. Add no Lenis, Motion `useScroll`,
  ticker, RAF, observer, nested scroller, Canvas, or WebGL context.
- Remove the source's reduced-motion behavior. The complete morph, counter, and
  route handoff are mandatory on every supported viewport.
- Without JavaScript, render a normal semantic link to the resolved destination
  plus the existing contact action.

## Procedure

1. Recheck the D-014 captured source/hash and preserve its provenance header.
2. Implement and unit-test the generic destination resolver before animation.
3. Implement direct DOM morph writes and the guarded state machine.
4. Connect pointer/keyboard activation to the same progress driver.
5. Hand committed navigation to D-009 and preserve cancellation/failure recovery.
6. Author desktop/mobile compositions and no-JS rendering.
7. Test all destination modes, slow/fast/reverse scroll, restored scroll,
   fragments, input methods, history, interrupted navigation, and route cleanup.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
rg -n "setState|useState|new Lenis|useScroll\(|requestAnimationFrame|prefers-reduced-motion" src/components/case-study/experience/case-study-closing-scene.tsx
rg -n -i "flagship|next project" src/components/case-study src/content
git diff --check
```

`useState` is allowed only for non-frame UI state if the handoff proves it does
not run from ScrollTrigger updates. `next project` may appear only in generic
internal identifiers/tests, never as an Aegis promise while no route exists.

## Manual Checks

- Start/mid/100/reverse captures at 1440×900, 768×1024, and 390×844.
- Slow deliberate completion, high-velocity pass, restored-at-bottom load,
  reverse during 250ms commit, click, Enter, Space, Escape/interruption, browser
  back, route failure, and no-JS.
- Confirm Aegis targets `/#work`; exercise project mode with test data only and
  confirm no unpublished preview reaches production content.

## Acceptance Checklist

- [ ] Clip-path, scale, SVG circle, counter, reverse, and completion remain
  recognizable from D-014.
- [ ] Aegis resolves truthfully to Selected Work; unavailable projects are not previewed.
- [ ] Deliberate completion navigates; fast/restored/reversed traversal does not.
- [ ] Click and keyboard activation use the same visual progression.
- [ ] D-009 owns the committed route transition.
- [ ] Existing contact action and no-JS destination remain semantic and usable.
- [ ] No Aegis branding, flagship language, duplicate runtime, or reduced path exists.
- [ ] Timers, ScrollTriggers, listeners, and transition state clean up on exit.
- [ ] Repository and browser checks pass.

## Handoff

Include captured source boundaries/hash, destination-resolution tests, morph
values, start/mid/end/reverse captures, guard/state transition log, input and
history results, no-JS/failure behavior, cleanup proof, and validation results.
