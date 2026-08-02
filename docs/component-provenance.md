# Component Provenance

This document records the origin and local adaptation of every externally
sourced visual component used in the Batch 01 homepage. It covers the seven
locked components from [`docs/portfolio-component-blueprint.md`](./portfolio-component-blueprint.md).

The Aegis case-study route (Batch 03) adds no external component; its own
provenance is recorded after the Batch 01 table.

Batch 04 planned selections are recorded after Batch 03. The only planned
Batch 04 external sources are D-006 and D-008–D-014 from
[`docs/design/batch-04-aegis-visual-decisions.md`](./design/batch-04-aegis-visual-decisions.md)
and the immutable register
[`docs/batch-04-component-source-register.md`](./batch-04-component-source-register.md).
Earlier Batch 04 draft shortlists are superseded and are not planned work.

Each external component is treated as source material, not a finished design.
Batch 01 components were normalized through the shared design tokens and wrapped
behind the project's own interfaces (including the managed WebGL lifecycle
where relevant). WO-025 removed active reduced-motion preference branches site-
wide and installed the Batch 04 one-owner Motion/Lenis runtime
(`motion@12.43.0`, `lenis@1.3.25`). Capability and lifecycle gates remain.

## Attribution and license status

The canonical URLs below are taken from the `// Adapted from …` header comment
in each local source file. **No upstream license file or license page was
inspected as part of this work**, so the license/attribution status of each
source has **not been independently verified**. Anyone reusing or redistributing
this code should visit the linked canonical source page and confirm its license
and attribution terms before relying on them.

## Provenance table

| Component | Canonical URL | Local file | Dependency | Main adaptations | License / attribution note |
| --- | --- | --- | --- | --- | --- |
| Line Waves | https://reactbits.dev/backgrounds/line-waves | `src/components/effects/line-waves.tsx` | `ogl` | Restrained custom three-color palette instead of the default; reduced speed, warp, and brightness; rotation and edge-fade tuned for the hero; wrapped in `ManagedWebGLEffect` with a static gradient fallback; DPR and pointer target supplied by the WebGL manager; mobile-simplified line counts and speed. | Not independently verified; confirm terms at the canonical source page (React Bits). |
| Liquid Metal | https://21st.dev/@johuniq/components/liquid-metal-button | `src/components/ui/liquid-metal-link.tsx` | `@paper-design/shaders` | Rebuilt as an anchor (`<a>`) primary CTA rather than a button; canvas-fill (`none`) shape instead of the source circle so metal reaches both ends of the pill; accent tint and idle speed reduced; pixel budget capped; Geist Mono uppercase label; static chrome-gradient fallback; disabled on mobile via the manager. | Not independently verified; confirm terms at the canonical source page (21st.dev / @johuniq). |
| Scroll Reveal | https://reactbits.dev/text-animations/scroll-reveal | `src/components/effects/scroll-reveal.tsx` | `gsap` (with `gsap/ScrollTrigger`) | `baseRotation` reduced from the example `8` to `2`; blur kept subtle; GSAP + ScrollTrigger dynamically imported after client hydration; unsplit static paragraph only before client mount; ticker put to sleep on cleanup; no OS reduced-motion branch (WO-025). | Not independently verified; confirm terms at the canonical source page (React Bits). |
| Logo Loop | https://reactbits.dev/animations/logo-loop | `src/components/ui/logo-loop.tsx` | None beyond React | Added an `active` gate so `requestAnimationFrame` runs only while the section is on screen and the tab is visible; pause on hover/focus; token-based styling, radii, and fade colors; accessible list semantics with duplicated copies hidden from assistive tech; used for the engineering-process wordmarks; no OS reduced-motion branch (WO-025). | Not independently verified; confirm terms at the canonical source page (React Bits). |
| Sparkles | https://21st.dev/@manuarora700/components/sparkles | `src/components/effects/sparkles.tsx` | `@tsparticles/engine`, `@tsparticles/react`, `@tsparticles/slim` | Reduced to a thin, low-density, low-opacity, slow horizontal accent instead of a full background; default bright-blue gradient removed in favor of the Line Waves palette; single instance; hover/click interactivity disabled; activity-gated with static glow while inactive or on particle failure; no OS reduced-motion branch (WO-025). | Not independently verified; confirm terms at the canonical source page (21st.dev / @manuarora700). |
| Shape Blur | https://reactbits.dev/animations/shape-blur | `src/components/effects/shape-blur.tsx` | `three` | Colors carried as sRGB and routed through tokens; pointer listener resolved to the nearest interactive ancestor rather than `document`; wrapped in `ManagedWebGLEffect`; mounted only on desktop (not below `1024px`) and only when the WebGL manager grants a budget slot; subordinate to project content. | Not independently verified; confirm terms at the canonical source page (React Bits). |
| Dotted Surface | https://21st.dev/@sshahaider/components/dotted-surface | `src/components/effects/dotted-surface.tsx` | `three` | Reframed from a full-viewport surface into a shallow, wide `20rem` horizon with a low camera pitch; denser, wider-than-deep grid; lowered wave frequencies to avoid banding; accent-token point colors; top mask and bottom fade into negative space; wrapped in `ManagedWebGLEffect` with a static dot-pattern fallback; stops rendering while offscreen. | Not independently verified; confirm terms at the canonical source page (21st.dev / @sshahaider). |

## Aegis case study (Batch 03)

Nothing on `/work/aegis` is externally sourced, and the batch added no runtime
dependency: `git diff package.json package-lock.json` is empty across WO-021
and WO-022.

| Component | Origin | Local file | Dependency | Notes |
| --- | --- | --- | --- | --- |
| Case-study shell, hero, section, and media primitives | First-party (WO-021) | `src/components/case-study/case-study-{shell,hero,section,media}.tsx` | None beyond React | Server Components built from the existing tokens. Screenshots are `<picture>`/`<img>`; the intro is a native `<video>`. |
| Aegis system map | First-party (WO-022) | `src/components/case-study/aegis-system-map.tsx` | None beyond React | Nested lists and token-based CSS. No canvas, SVG, animation, or diagram library; the markup is its own accessible text equivalent. Every node label is a claim accepted in `docs/aegis-case-study-evidence.md`. |

### Media provenance

The six assets in `public/work/aegis/` were produced under WO-019 and are
inventoried with SHA-256 hashes in
[`aegis-case-study-media.md`](./aegis-case-study-media.md). WO-022 references
them without re-encoding, cropping, or adding any asset.

| Asset | Origin | Used by |
| --- | --- | --- |
| `entry-intro.mp4` | Owner-produced identity film: modelled and animated in Blender, exported as FBX, assembled, lit, and rendered in Unreal Engine 5 as a 4K image sequence, finished in DaVinci Resolve, then optimized to 1920×1080 for the portfolio (the 4K master is never shipped). | Section 8 video |
| `entry-intro-poster.webp` | Frame from the same film. | Hero still and the video's `poster` |
| `overview.webp`, `player-investigation.webp`, `risk-constellation.webp`, `alerts.webp` | Screenshots of the product running against its own synthetic demonstration data. No production or personal data appears in them. | Sections 4, 7, 7, and 10 |

## Batch 04 planned selections (WO-024 register)

WO-024 recorded immutable revisions/captures and SHA-256 values in
[`batch-04-component-source-register.md`](./batch-04-component-source-register.md).
WO-026 adapted D-006 into `src/components/case-study/experience/bsmnt/`.
WO-028 adapted D-010 into `case-study-evidence-aperture.tsx` under the D-006
root timeline. Other Batch 04 rows remain registered until their destination
orders land.

| Decision | Canonical source | Destination | Adaptation status |
| --- | --- | --- | --- |
| D-006 BSMNT Scrollytelling | https://github.com/basementstudio/scrollytelling @ `0c26959` (copy strategy) | `src/components/case-study/experience/bsmnt/` (WO-026) | Adapted — Root/Animation/Waypoint/context/util/types only; local Slot (zero packages); no debugger/Portal/Pin/Parallax/image-sequence |
| D-008 Codrops Cinematic 3D Scroll Demo 1 | https://github.com/JosephASG/codrops-cinematic-scroll-animations @ `7a56d1f` | `src/components/case-study/experience/cinematic-media-cylinder.ts`, `reactive-particle-field.ts`, `case-study-webgl-stage.tsx` (WO-027) | Adapted — cylinder geometry/shaders, reactive particles, and parameter-driven camera; one `case-study-cinematic` managed context; demo scroll owner / independent frame loop removed |
| D-009 Codrops Kinetic Typography Page Transition | https://github.com/codrops/KineticTypePageTransition @ `ebe926e` | `src/components/case-study/experience/kinetic-route-transition.tsx` (WO-027, WO-032) | Adapted — oversized glyph field enter/exit controller; portfolio tokens/Geist; title as data; reusable exit for WO-032 |
| D-010 Codrops One Element Scroll | https://github.com/codrops/OneElementScroll @ `feb7ad7` | `src/components/case-study/experience/case-study-evidence-aperture.tsx`, `case-study-narrative-scenes.tsx` (WO-028) | Adapted — Flip.getState / Flip.fit persistent aperture; D-006-owned scrub; demo Lenis/ticker/parallax/type/image owners removed |
| D-011 21st.dev Dynamic Island TOC | https://21st.dev/@digitalzone0707/components/dynamic-island-toc (capture 2026-07-31) | `src/components/case-study/experience/case-study-chapter-instrument.tsx` (WO-029) | Adapted — Motion compact/expanded morph, active label, progress circle; authored chapter props from D-006; root Lenis anchors; document scroll/heading discovery removed |
| D-012 21st.dev Story Scroll | https://21st.dev/@boudjadjasamira/components/story-scroll (capture 2026-07-31) | `src/components/case-study/experience/case-study-decision-panels.tsx`, `case-study-decision-panel.tsx` (WO-030) | Adapted — angular sticky stack + bottom-left rotation scrubbed on D-006 timeline; four authored compositions; source ScrollTrigger/useGSAP/document owner/reduced-motion removed; SHA-256 `ab4a1e7f…` verified |
| D-013 Codrops Rotating On-Scroll Animations Variation 3 | https://github.com/codrops/RotatingOnScrollAnimations @ `ebbe2c9` | WO-031 | Registered; not yet adapted |
| D-014 Codrops/Thibault Guignand Next-Project Scroll Morph | https://tympanus.net/codrops/2026/05/06/from-shader-uniforms-to-clip-path-wipes-how-gsap-drives-my-portfolio/ (capture 2026-07-31) | WO-032 | Registered; not yet adapted |

Runtime pins: `motion@12.43.0` and `lenis@1.3.25` installed by WO-025. BSMNT
Scrollytelling is copied from commit `0c26959` (WO-026); `@bsmnt/scrollytelling`
is not installed.
