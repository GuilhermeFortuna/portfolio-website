# VIZ-003 — Hero Handoff

**Status:** `REVIEW`
**Implementation date:** 2026-08-03

## Delivered

- Restored both owner-selected Liquid Metal WebGL CTA shaders after comparison
  with the supplied hero reference. Their dark chrome treatment retains the
  approved destinations and 46px targets while integrating with Line Waves.
- Rebuilt the hero as a scoped `useSceneTimeline` scene. Its readable eyebrow,
  heading, disciplines, support copy, and actions render fully visible before
  hydration; only `aria-hidden` kinetic layers animate. The entrance uses
  transform and clip-path only and resolves in 1.64 seconds.
- Retained managed Line Waves as the hero's only persistent environment.
  Mobile adds a text-safe canvas gradient while preserving the simplified
  manager-owned effect.
- Restored `liquid-metal-link.tsx`, both WebGL registrations, and
  `@paper-design/shaders`; provenance and the implementation specification now
  record the owner override.
- Repaired the VIZ-002 Lenis bridge. It had attempted to attach before
  `ReactLenis` published its instance, leaving wheel events intercepted but
  unticked. The bridge now mounts beneath the provider through `useLenis()`;
  GSAP remains the one Lenis ticker owner.

## Evidence

| Check | Result |
| --- | --- |
| Desktop normal motion | Chromium at 1440×900: 52 fps over 2 seconds, three managed canvases (Line Waves plus both CTA shaders), no overflow, CLS `0`. |
| Mobile normal motion | Chromium at 375×780: one managed Line Waves canvas; both Liquid Metal controls render their static chrome fallback, with no overflow. |
| Reduced motion | Chromium at 375×780: 0 canvases; kinetic field is `display: none`; complete static hero and both static action fallbacks remain composed. |
| Keyboard | Tab reaches both actions. Primary: 170×46px, then secondary: 138×46px; Enter on primary reaches `/work/aegis`. |
| No-JS markup | Server HTML contains the approved headline, both action labels, `/work/aegis`, and the GitHub URL. |
| Hero axe scan | 0 violations. Nine color-contrast checks are incomplete because axe cannot determine the layered pseudo-element background; readable content never enters an opacity/blur state. |
| Wheel scrolling | Before repair, wheel left `scrollY` at `0`; after repair, a wheel event advances to `698px` at desktop and `649px` at mobile. |

Artifacts: [desktop still](../../design/evidence/viz-003/desktop-1440x900.png),
[mobile still](../../design/evidence/viz-003/mobile-375x780.png),
[reduced-motion still](../../design/evidence/viz-003/mobile-375x780-reduced-motion.png),
and [desktop entrance recording](../../design/evidence/viz-003/desktop-entrance.webm).

## Automated checks

| Command | Result |
| --- | --- |
| `pnpm run test` | Pass — 16 files, 117 tests |
| `pnpm run lint` | Pass |
| `pnpm run typecheck` | Pass |
| `pnpm run build` | Pass — `/`, `/work/aegis`, and `/work/q` static |
| `git diff --check` | Pass |

## Specification reconciliation

- **§6 Typography:** VIZ-003 supersedes the fixed hero-only treatment with the
  D-009 kinetic title aperture. The approved semantic `h1` and copy remain
  binding.
- **§7 Layout:** the Hero is a full-viewport spatial composition with a
  text-safe left field. Its document ID, order, and 44px targets are unchanged.
- **§9 Motion:** the hero uses the VIZ-002 scoped GSAP timeline, managed Line
  Waves, and the owner-restored Liquid Metal CTA shaders. The 8-unit desktop
  budget admits all three hero effects pending VIZ-005/VIZ-006's refit.

## Review gate

Visual acceptance remains independent. Review the desktop/mobile stills and
entrance recording against D-004, D-005, D-006, D-009, and D-009A before moving
this order from `REVIEW` to `DONE`.
