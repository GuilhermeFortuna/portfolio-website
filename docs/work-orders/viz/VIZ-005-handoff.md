# VIZ-005 — Selected Work Stage Handoff

**Status:** `REVIEW`
**Implementation date:** 2026-08-03

## Delivered

- Replaced the rejected `5fr/7fr` selector-button/sticky-stage layout and its
  four abstract diagrams with D-010 (persistent project aperture, GSAP Flip)
  and D-011 (panel choreography) per `docs/design/viz-visual-decisions.md`.
- `src/components/sections/project-showcase.tsx` rewritten: every project
  always renders as a full, real `<article>` in document order — index,
  category, name, summary, its own aperture image, and (only when
  `href !== null`) one unconditional case-study link with the derived,
  locale-aware label. There is no "active"/selection state in the baseline
  markup, so a link can never appear or disappear under the pointer.
- Desktop-only, motion-permitting enhancement (`useSceneTimeline`, one
  `gsap.context()` + `gsap.matchMedia("(min-width: 1024px)")`, no independent
  ScrollTrigger/Lenis/WebGL ownership): pins the section, scrubs/snaps across
  the four projects, crossfades panels, and Flip-animates one shared aperture
  between each project's slot rect, swapping its image via a two-layer
  crossfade.
- Added a `<nav aria-label="Select project">` rail of four `href="#slug"`
  anchors (desktop only) so every project — including gosigapp and Nexo
  Dental, which have no case-study link and therefore no other focusable
  element in their panel — has a reachable, real, same-page destination. A
  `focusin` listener and the rail's `click` handler both drive the same
  pinned-scroll jump, so keyboard focus landing anywhere in a project's
  content also brings it into view while pinned.
- New `src/content/project-media.ts` (VIZ-005-owned, read-only against
  Batch 04's `src/content/projects.ts`): one representative screenshot each
  for Aegis (`overview.webp`) and Quant (`dock.webp`), plus two new authored
  placeholder assets — `public/work/gosigapp/placeholder.svg` and
  `public/work/nexo-dental/placeholder.svg` — at the exact path a real capture
  will later replace. Every project goes through the identical
  image-in-aperture code path (no separate typographic-fallback branch), so
  D-002's equal treatment is structural rather than a special case.
- Deleted `src/components/effects/shape-blur.tsx` and removed `"shape-blur"`
  from `WebGLEffectId` in `src/components/webgl/webgl-manager.tsx`; this
  section no longer holds a WebGL context or budget slot at all.
- Fixed the open button-reset bug: `globals.css`'s unlayered
  `button { margin:0; padding:0; border:0; ... }` now sits in `@layer base`,
  matching Tailwind v4's own cascade layers, so utility classes on a
  `<button>` (or, going forward, any button reintroduced later) win again.
  Confirmed visually under reduced motion, where the article `border-t`
  separators now render.
- Rewrote `src/components/sections/__tests__/project-showcase.test.tsx` and
  fixed two now-obsolete assertions in `src/app/__tests__/page.test.tsx` that
  expected the old desktop+mobile duplicate-link structure.
- Updated `IMPLEMENTATION-SPEC.md` §11 (full rewrite, see Specification
  reconciliation) and §9 (Shape Blur row/id removed from the WebGL
  registrations and budget prose).

## Coordination notes

- `src/components/sections/selected-work-section.tsx` was found already
  modified on disk by concurrent i18n work (`useLocale()`/`getProjects(locale)`
  instead of the static `projects` import) that landed mid-session. VIZ-005
  did not edit this file; `ProjectShowcase` now consumes `useLocale()` itself
  for the case-study link label so it stays consistent with that system.
- `src/app/__tests__/page.test.tsx` is outside VIZ-005's nominal file list but
  directly asserted on the old two-link-per-project (desktop+mobile) DOM
  shape; updated it to match the new one-link-per-project reality (2 fixed
  assertions, no scope change to the file's intent).

## Automated checks

| Command | Result |
| --- | --- |
| `pnpm run test` | Pass — 18 files, 126 tests |
| `pnpm run lint` | Pass — 3 pre-existing `no-img-element` warnings in this file (matches the repo's established plain-`<img>` convention, e.g. `case-study-media.tsx`); 4 errors remain in `src/components/layout/language-switcher.tsx`, an untracked file from concurrent i18n work VIZ-005 does not own or touch |
| `pnpm run typecheck` | Pass |
| `pnpm run build` | Pass — `next build` completes; `/`, `/en`, `/pt-BR`, and both `/work/*` routes generate |
| `git diff --check` | Pass on every file VIZ-005 touched (new files checked via `git add -N` before diffing) |

## Browser evidence

Chromium via `playwright-cli`, `pnpm start` (production build) and `pnpm dev`:

| Check | Result |
| --- | --- |
| 1440×900, normal motion | Section pins; scroll/wheel input crossfades Aegis → Quant → gosigapp → Nexo Dental; aperture Flips between alternating left/right slot rects each stop, swapping to each project's real or placeholder image; pin releases cleanly into Process at the last stop. Screenshots captured at each stop. |
| 1440×900, `prefers-reduced-motion: reduce` | No pin, no Flip: all four projects render in normal document flow, alternating two-column layout, each with its own image, `border-t` separators visible (button-reset fix confirmed), Aegis's case-study link visible, all text fully readable. |
| 375×780 | Single column, image below text per project, rail correctly hidden (`lg:` only), no horizontal overflow observed. |
| Keyboard/rail reachability | Clicked the "04 Nexo Dental" rail anchor (`href="#nexo-dental"`, `data-project-jump="nexo-dental"`) — a project with `href: null` and otherwise no focusable content in its panel — and the pinned view jumped directly to it, aperture Flipped to the placeholder image, text updated. Confirms every project is keyboard-reachable regardless of case-study-link presence. |
| Console | No errors attributable to this section. Pre-existing/unrelated: one 404 for `/en/icon`, WebGL driver perf-warning noise from the hero's existing shaders. |

## Page weight

The section previously held no image payload (Shape Blur was a WebGL canvas,
no `<img>` assets). New media, served from the production build:

| Asset | Size |
| --- | --- |
| `/work/aegis/overview.webp` (eager, first project) | 39,648 bytes |
| `/work/q/dock.webp` (lazy) | 65,914 bytes |
| `/work/gosigapp/placeholder.svg` (lazy) | 953 bytes |
| `/work/nexo-dental/placeholder.svg` (lazy) | 959 bytes |
| **Total, 4 requests** | **≈107 KB** |

Only Aegis is `loading="eager"`; the other three are `loading="lazy"`. In
practice all four requested promptly on initial load in this environment
because Selected Work sits directly below the Hero (`top: ~860px` at
1440×900, well inside Chromium's default lazy-load prefetch distance) — this
is native browser lazy-loading behavior operating on real, unmodified
geometry, not an artifact of the GSAP enhancement (verified: the same four
requests fire before any scroll and before the pinned enhancement's absolute
positioning could plausibly widen the near-viewport heuristic). No full-scale
(2560×1440) capture is loaded for this teaser; one modest per-project image
is used instead of a set.

## Specification reconciliation

- **§11** rewritten in full: records the baseline always-in-DOM markup, the
  desktop-only GSAP enhancement (pin/crossfade/Flip), the rail's keyboard
  role, and the media/placeholder scheme. See the file for the complete text.
- **§9**: removed `"shape-blur"` from the `WebGLEffectId` union snippet and
  the Shape Blur row from the fixed-registrations table; noted VIZ-005
  removed the effect entirely and that VIZ-006 still owns the final desktop
  budget refit.

## Known findings / what VIZ-006 should scrutinize

- The four project scenes share one consistent alternating two-column
  template rather than four bespoke compositions with individually authored
  aperture sizing/position per D-011's "settles with its own hierarchy...and
  aperture position" language. The mechanism (persistent shared element via
  Flip, panel takeover via pin+scrub+crossfade, equal media/placeholder
  treatment) is delivered faithfully; bespoke per-scene art direction was
  judged out of scope for a first implementation and is a reasonable
  follow-up if the owner wants more visual differentiation between the four
  chapters.
- No WebKit or Firefox evidence was gathered for this order (matching the
  environment constraints already logged against VIZ-004 — WebKit needs
  `libicudata.so.74`, not present in this environment). VIZ-006 should
  reproduce cross-browser, especially the ScrollTrigger pin/Flip combination,
  which is new in this order.
- Frame rate was observed qualitatively smooth during interactive scroll in
  this session but not sampled numerically (no automated fps harness was run
  against this section specifically). VIZ-006's assembled-page review should
  capture a numeric sample the way VIZ-002/003/004 did.
- `src/components/layout/language-switcher.tsx` (concurrent, untracked i18n
  work) currently fails lint with 4 errors unrelated to VIZ-005; flagged here
  so it isn't mistaken for a VIZ-005 regression.
