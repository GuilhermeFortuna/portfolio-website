# Component Provenance

This document records the origin and local adaptation of every externally
sourced visual component used in the Batch 01 homepage. It covers the seven
locked components from [`docs/portfolio-component-blueprint.md`](./portfolio-component-blueprint.md).

The Aegis case-study route (Batch 03) adds no external component; its own
provenance is recorded at the end of this file.

Each external component is treated as source material, not a finished design.
Every component was normalized through the shared design tokens, wrapped behind
the project's own interfaces (including the managed WebGL lifecycle where
relevant), and given a reduced-motion state.

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
| Scroll Reveal | https://reactbits.dev/text-animations/scroll-reveal | `src/components/effects/scroll-reveal.tsx` | `gsap` (with `gsap/ScrollTrigger`) | `baseRotation` reduced from the example `8` to `2`; blur kept subtle; GSAP + ScrollTrigger dynamically imported only when motion is allowed; renders an unsplit static paragraph under reduced motion / before client hydration; ticker put to sleep on cleanup. | Not independently verified; confirm terms at the canonical source page (React Bits). |
| Logo Loop | https://reactbits.dev/animations/logo-loop | `src/components/ui/logo-loop.tsx` | None beyond React | Added an `active` gate so `requestAnimationFrame` runs only while the section is on screen, the tab is visible, and motion is allowed; pause on hover/focus; token-based styling, radii, and fade colors; accessible list semantics with duplicated copies hidden from assistive tech; used for the engineering-process wordmarks. | Not independently verified; confirm terms at the canonical source page (React Bits). |
| Sparkles | https://21st.dev/@manuarora700/components/sparkles | `src/components/effects/sparkles.tsx` | `@tsparticles/engine`, `@tsparticles/react`, `@tsparticles/slim` | Reduced to a thin, low-density, low-opacity, slow horizontal accent instead of a full background; default bright-blue gradient removed in favor of the Line Waves palette; single instance; hover/click interactivity disabled; activity-gated and reduced-motion static glow fallback. | Not independently verified; confirm terms at the canonical source page (21st.dev / @manuarora700). |
| Shape Blur | https://reactbits.dev/animations/shape-blur | `src/components/effects/shape-blur.tsx` | `three` | Colors carried as sRGB and routed through tokens; pointer listener resolved to the nearest interactive ancestor rather than `document`; wrapped in `ManagedWebGLEffect`; mounted only on desktop (not below `1024px`) and never under reduced motion; subordinate to project content. | Not independently verified; confirm terms at the canonical source page (React Bits). |
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
