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

## Runtime infrastructure (VIZ-002)

| Runtime | Version | Local ownership | Source / license note |
| --- | --- | --- | --- |
| Motion | `12.43.0` | `src/components/motion/motion-runtime.tsx` mounts the one site-level `MotionConfig` and exposes the shared progress/reduced-motion contract. | https://motion.dev/ — dependency pin recorded by VIZ-002; confirm redistribution obligations before republishing package source. |
| Lenis | `1.3.25` | The same runtime mounts the sole root `ReactLenis`; GSAP owns its single ticker bridge and `ScrollTrigger.update` receives Lenis scroll events. | https://lenis.darkroom.engineering/ — dependency pin recorded by VIZ-002; confirm redistribution obligations before republishing package source. |

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
| Liquid Metal | https://21st.dev/@johuniq/components/liquid-metal-button | `src/components/ui/liquid-metal-link.tsx` | `@paper-design/shaders` | Reinstated by owner direction on 2026-08-03 after visual review of the hero reference. Rebuilt as an anchor (`<a>`); canvas-fill (`none`) keeps the metal rim continuous around each label; pixel budget capped; static chrome-gradient fallback; disabled on mobile by the manager. | Not independently verified; confirm terms at the canonical source page (21st.dev / @johuniq). |
| Scroll Reveal | https://reactbits.dev/text-animations/scroll-reveal | `src/components/effects/scroll-reveal.tsx` | `gsap` (with `gsap/ScrollTrigger`) | `baseRotation` reduced from the example `8` to `2`; blur kept subtle; GSAP + ScrollTrigger dynamically imported only when motion is allowed; renders an unsplit static paragraph under reduced motion / before client hydration; ticker put to sleep on cleanup. | Not independently verified; confirm terms at the canonical source page (React Bits). |
| Logo Loop | https://reactbits.dev/animations/logo-loop | `src/components/ui/logo-loop.tsx` | None beyond React | Added an `active` gate so `requestAnimationFrame` runs only while the section is on screen, the tab is visible, and motion is allowed; pause on hover/focus; token-based styling, radii, and fade colors; accessible list semantics with duplicated copies hidden from assistive tech; used for the engineering-process wordmarks. | Not independently verified; confirm terms at the canonical source page (React Bits). |
| Sparkles | https://21st.dev/@manuarora700/components/sparkles | `src/components/effects/sparkles.tsx` | `@tsparticles/engine`, `@tsparticles/react`, `@tsparticles/slim` | Reduced to a thin, low-density, low-opacity, slow horizontal accent instead of a full background; default bright-blue gradient removed in favor of the Line Waves palette; single instance; hover/click interactivity disabled; activity-gated and reduced-motion static glow fallback. | Not independently verified; confirm terms at the canonical source page (21st.dev / @manuarora700). |
| Shape Blur | https://reactbits.dev/animations/shape-blur | `src/components/effects/shape-blur.tsx` | `three` | Colors carried as sRGB and routed through tokens; pointer listener resolved to the nearest interactive ancestor rather than `document`; wrapped in `ManagedWebGLEffect`; mounted only on desktop (not below `1024px`) and never under reduced motion; subordinate to project content. | Not independently verified; confirm terms at the canonical source page (React Bits). |
| Dotted Surface | https://21st.dev/@sshahaider/components/dotted-surface | `src/components/effects/dotted-surface.tsx` | `three` | Reframed from a full-viewport surface into a shallow, wide `20rem` horizon with a low camera pitch; denser, wider-than-deep grid; lowered wave frequencies to avoid banding; accent-token point colors; top mask and bottom fade into negative space; wrapped in `ManagedWebGLEffect` with a static dot-pattern fallback; stops rendering while offscreen. | Not independently verified; confirm terms at the canonical source page (21st.dev / @sshahaider). |
| Resume Timeline | https://ui.aceternity.com/components/timeline | `src/components/resume/resume-timeline.tsx` | Existing `motion` only | Retrieved 2026-09-08 from the free Content component page and reduced to the resume contract: semantic ordered experience entries, token-based styling, one decorative chronology beam, desktop-only sticky periods, and static reduced-motion output. No Aceternity installer or package was used. | The canonical page identifies Timeline under free Content components. The linked Aceternity License permits modification and use in commercial/personal end products while prohibiting redistribution of source files; this repository distributes the adapted end product, not the upstream source. |

## Batch 08 — Career Operating System (WO-044 planned sources)

These entries are contract selections, not shipped components. WO-044 inspected
the public registry/component pages on 2026-09-08 without installing packages.
The full source/dependency/adaptation matrix and fallback contract are in
[`docs/resume-career-operating-system.md`](./resume-career-operating-system.md).
Implementation orders must re-verify public availability and license terms
before adapting or redistributing source.

| Component | Canonical URL | Local owner | Dependency | Planned adaptation | License / attribution status |
| --- | --- | --- | --- | --- | --- |
| Identity Scroll Choreography | https://21st.dev/@componentry/components/scroll-choreography | `src/components/resume/resume-identity-scene.tsx` | Shared Resume progress and CSS only; no source package or media dependency | Retains the source's staged convergence, but replaces its four-image composition with five restrained, content-derived data plates. The one semantic identity and its actions remain in normal flow from the server render; wide/tall fine-pointer viewports add only decorative assembly and settling. | Public source inspected 2026-09-08 from Componentry repository/registry; author Harsh Jadhav / componentry; repository MIT. The local implementation is a material adaptation with no copied demo media or factual copy. |
| Capability Radial Orbital Timeline | https://21st.dev/@jatin-yadav05/components/radial-orbital-timeline | `src/components/resume/resume-capability-orbit.tsx` | CSS enhancement and native React controls only; no `lucide-react` dependency or animation timer | Retains six radial nodes, a center label, and selected-group emphasis while removing source status/energy/relationship fields, generic icons, continuous node rotation, and overlaid cards. Labels remain upright; the active skills occupy a stable detail column; narrow, short, reduced-motion, and no-JS modes keep the complete wrapping semantic list. | Public source/preview inspected 2026-09-08; author Jatin Yadav; MIT License declared. The local implementation is materially adapted to the existing Resume content and runtime. |
| Career Horizontal Feature Reveal | https://21st.dev/@hyperiux/components/horizontal-feature-reveal | `src/components/resume/resume-career-reveal.tsx` | Existing scoped GSAP/ScrollTrigger bridge; no SplitText dependency | Adapts the vertical-to-horizontal editorial progression to two typed employer entries with an authored full-bleed masthead anatomy (WO-052, RD-001): card-integrated top progress bar driven by `data-active-career-index`, oversized organization masthead, right-aligned period meta row without redundant location duplication, and two-column highlights grid spanning the full card width with no dead half. Inactive card is visibly secondary (0.42 opacity). The single-column `ResumeTimeline` fallback shares the exact card anatomy and highlight breakdown. Exactly one accessible chronology is rendered at a time; enhanced track remains scoped and non-pinning so breakpoint fallback swaps cannot move React-owned nodes. | Re-verified 2026-09-08: public code/usage page, author Hyperiux Vault, GSAP dependency, and MIT License declared; immutable revision not exposed. Refinement updated 2026-09-10 (WO-052). |
| Credential Stacking Cards | https://21st.dev/@danielpetho/components/stacking-cards | `src/components/resume/resume-credential-stack.tsx` | Existing Motion only; no image dependency | Adapted sticky/scale presentation to the chronological education entries with structured header strip anatomy (WO-053, RD-002): index indicator, institution, and period in top header strip, prominent program title in body, equal width rest state with scale returning to 1, and sticky offset preserving visible covered header strips mid-stack; natural flow fallback for mobile and reduced motion; no new media or claims | Public source inspected 2026-09-08; author Daniel Petho; attribution retained for the implemented adaptation. Refinement updated 2026-09-10 (WO-053). |
| Dynamic Island TOC | https://21st.dev/@digitalzone0707/components/dynamic-island-toc | `src/components/resume/resume-chapter-navigation.tsx` | Existing Motion runtime and native anchors; no `lucide-react` dependency | Replaced auto-discovered headings and smooth-scroll ownership with an explicit five-chapter model after the owner-approved WO-048 project omission, native hash links, one `aria-current` destination, header-safe offsets, and document-flow mobile fallback | Public code/usage re-inspected 2026-09-08; author Digital Zone; license and immutable revision not exposed; source remains attributed and license limitation is retained |
| Tracing Beam | https://ui.aceternity.com/components/tracing-beam | `src/components/resume/resume-scene-runtime.tsx` (`ResumeReadingTrace`) | Existing Motion runtime progress; no new runtime | Reduced to a token-based decorative SVG rail with shared progress, `aria-hidden`, pointer-inert behavior, and omitted mobile/static presentation; never semantic chronology | Free component page and props re-inspected 2026-09-08; Aceternity UI; license and immutable revision not exposed on page; source remains attributed and license limitation is retained |
| Google Gemini Effect | https://ui.aceternity.com/components/google-gemini-effect | `src/components/resume/resume-convergence.tsx` | Existing Motion; no WebGL | Retain the source component's five 1440×890 irregular SVG paths, staggered MotionValue path-length ranges ending together at 0.8 in view, zero-duration linear draw, and Gaussian-blurred duplicate layer bound to draw progress; adapted container height to near-full scale (clamp 15rem–37.5rem / ~500–600px on desktop), per-path token colors (`--color-accent-a/b/c`), primary/secondary CTA controls for closing actions, and static fallback. Refinement updated 2026-09-10 (WO-055, RD-004). | Public component and registry source re-inspected 2026-09-08; author Manu Arora / Aceternity UI; license and immutable revision not exposed on page; source remains attributed and license limitation is retained |

## Resume card surfaces (WO-058)

| Component | Canonical URL | Local file | Dependency | Main adaptations | License / attribution note |
| --- | --- | --- | --- | --- | --- |
| Magic Card | https://magicui.design/docs/components/magic-card | `src/components/ui/magic-card.tsx` (`MagicCard`), applied by `resume-identity-scene.tsx` (hero contact card), `resume-credential-stack.tsx` (credential cards), and `resume-convergence.tsx` (closing focal card) | None beyond React; the source's `motion` motion-values and `next-themes` are dropped | Pointer position written to `--magic-card-x/y` custom properties instead of motion values; gradient-border and inner spotlight moved to `.magic-card*` selectors in `globals.css` using `--color-accent-a/c` over `--color-line-strong`; an `animated` prop gates the pointer handlers and spotlight so static, mobile, and reduced-motion modes render a fixed gradient hairline with no listeners; "orb" mode omitted; surface is opaque with a faint top-lit gradient; content, spotlight, and beam layered by explicit z-index. | Repository `magicuidesign/magicui` declares MIT (GitHub license API, inspected 2026-09-10). |
| Border Beam | https://magicui.design/docs/components/border-beam | `src/components/ui/magic-card.tsx` (`BorderBeam`, mounted only when `MagicCard` receives `beam` and `animated`) | Existing `motion` (`offsetDistance` keyframes) | Ring mask rebuilt with the content-box/`mask-composite: exclude` technique instead of Tailwind mask utilities; accent-b → accent-a gradient light; slower lap (9 s) and shorter light (120 px); mounted only on the two primary cards (hero contact, closing actions) and never under reduced motion, which also hides it in CSS. | Repository `magicuidesign/magicui` declares MIT (GitHub license API, inspected 2026-09-10). |

The closing Gemini paths (WO-055 row above) keep their source geometry and
draw ranges; WO-058 crops the SVG `viewBox` to the band the paths occupy
(`0 340 1440 350`) so the drawing fills the close and the geometric convergence
point sits at the vertical center, where the focal action card is placed.

## Resume background

| Component | Canonical URL | Local file | Dependency | Main adaptations |
| --- | --- | --- | --- | --- |
| Light Rays (hero) | https://reactbits.dev/backgrounds/light-rays | `src/components/effects/light-rays.tsx`, mounted by `src/components/resume/resume-backdrop.tsx` | `ogl` | Own IntersectionObserver and re-init-on-prop-change removed in favour of `ManagedWebGLEffect` (`light-rays`, hero/high) with `active`/`dpr` from the manager; props flow through a ref instead of re-creating the context; `originX` added to anchor the fan above the name; pointer read from the window because the layer sits beneath content; `pulsating`/`lightMode` dropped; lavender `#c9b8ff` tint echoing the homepage Line Waves violet; bottom mask into the canvas; static conic-gradient fallback. |
| Light Rays (ambient) | https://magicui.design/docs/components/light-rays | `src/components/effects/ambient-rays.tsx`, mounted by `src/components/resume/resume-backdrop.tsx` | Existing `motion` only | `Math.random` replaced with a seeded PRNG for SSR parity; inline styles instead of Tailwind arbitrary values; accent-token color; static rays under reduced motion; fixed full-viewport layer whose opacity follows Resume scroll progress so it takes over only after the hero rays scroll away. |

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

## Quant case study (Batch 04)

Nothing on `/work/q` is externally sourced. WO-027 added no runtime dependency:
`git diff package.json pnpm-lock.yaml` is empty for this order. The shared
case-study primitives from WO-021 were reused unchanged except for one justified
widening: `CaseStudyHero.liveEnvironment` is optional so Quant can omit the
control (DEC-02) while Aegis keeps its disabled pill.

| Component | Origin | Local file | Dependency | Notes |
| --- | --- | --- | --- | --- |
| Case-study shell, hero, section, and media primitives | First-party (WO-021; widened WO-027) | `src/components/case-study/case-study-{shell,hero,section,media}.tsx` | None beyond React | Hero renders the live-environment control only when `liveEnvironment` is present. Aegis rendering is unchanged. |
| Quant system map | First-party (WO-027) | `src/components/case-study/q-system-map.tsx` | None beyond React | Nested lists and token-based CSS. No canvas, SVG, animation, or diagram library; the markup is its own accessible text equivalent. Every node label is a claim accepted in `docs/q-case-study-evidence.md`. |

### Media provenance

The eleven assets in `public/work/q/` were produced under WO-025 and are
inventoried with SHA-256 hashes in
[`q-case-study-media.md`](./q-case-study-media.md). WO-027 places five of them
per the WO-026 media map, without re-encoding, cropping, or adding any asset.
Six accepted captures plus the deferred native desktop shell remain reserved.

| Asset | Origin | Used by |
| --- | --- | --- |
| `launcher.webp` | Product screenshot (WO-025 subject 1, `--web`). | Hero still |
| `system.webp` | Product screenshot (WO-025 subject 11, `--web`). | Section 4 figure |
| `dock.webp` | Product screenshot (WO-025 subject 2, `--web`). | Decision 2 figure |
| `walkforward.webp` | Product screenshot (WO-025 subject 7, `--mocks`). | Decision 3 figure |
| `execution.webp` | Product screenshot (WO-025 subject 10, `--mocks`). | Delivered figure |
| Reserved: `market-data.webp`, `backtest-studio.webp`, `backtest-results.webp`, `optimize-pareto.webp`, `discover-leaderboard.webp`, `research-features.webp` | Accepted WO-025 captures not placed on this page. | Later visual batch |
| Native desktop shell (subject 12) | Deferred in WO-025 (no Rust/WebKitGTK). | Not placed; desktop claim carried by prose and system map |

---

## Batch 05 — `gosigapp` Case-Study Implementation (WO-032)

`git diff package.json pnpm-lock.yaml` is empty for this order. The shared
case-study primitives from WO-021/WO-027 were reused with two minimal, justified
widenings: (1) `CaseStudyHero.media` is optional so `gosigapp` can omit the hero
image (DEC-02 & WO-031); (2) `CaseStudyFigure` sets `<source type="...">` to
`image/svg+xml` for SVG diagrams and `image/webp` for WebP images. Aegis and Quant
rendering remain 100% byte-identical.

| Component | Origin | Local file | Dependency | Notes |
| --- | --- | --- | --- | --- |
| Case-study shell, hero, section, and media primitives | First-party (WO-021; widened WO-027, WO-032) | `src/components/case-study/case-study-{shell,hero,section,media}.tsx` | None beyond React | Hero renders `media` conditionally when present. Aegis and Quant rendering unchanged. `CaseStudyFigure` supports `image/svg+xml` for SVG assets. |
| gosigapp system map | First-party (WO-032) | `src/components/case-study/gosigapp-system-map.tsx` | None beyond React | Nested lists and token-based CSS. No canvas or JS animation; the markup is its own accessible text equivalent. Every node label is a claim accepted in `docs/gosigapp-case-study-evidence.md`. |

### Media provenance

The three case-study evidence assets in `public/work/gosigapp/` were produced
under WO-030. The homepage Work cover was generated through Creative Production
on 2026-08-06. All four shipped media assets are inventoried with SHA-256 hashes
in [`gosigapp-case-study-media.md`](./gosigapp-case-study-media.md). WO-032 places
the three evidence assets per the WO-031 media map; the generated cover is used
only by the homepage project aperture.

| Asset | Origin | Used by |
| --- | --- | --- |
| `system-map.svg` | Vector architecture diagram (WO-030). | Section 4 system overview figure |
| `compliance-check-output.webp` | Terminal log capture (WO-030, high-res 2x DPR WebP). | Decision 2 figure |
| `cli-pipeline-run.webp` | Terminal log capture (WO-030, high-res 2x DPR WebP). | Decision 3 figure |
| `gosigapp-portfolio.webp` | AI-generated architectural illustration (Creative Production, 2026-08-06); derived from the verified pipeline and explicitly not evidence. | Homepage Work cover |

---

## Batch 06 — `Nexo Dental` Case-Study Implementation (WO-037)

`git diff package.json pnpm-lock.yaml` is empty for this order. The shared
case-study primitives from WO-021/WO-027/WO-032 were reused **unchanged**: no
type widening, no system-map component, and no new visual runtime. Aegis,
Quant, and gosigapp rendering remain byte-identical. Hero
`liveEnvironment` reuses Aegis’s exact disabled object
`{ label: "Live environment — coming soon" }`.

| Component | Origin | Local file | Dependency | Notes |
| --- | --- | --- | --- | --- |
| Case-study shell, hero, section, and media primitives | First-party (WO-021; widened WO-027, WO-032; reused WO-037) | `src/components/case-study/case-study-{shell,hero,section,media}.tsx` | None beyond React | No further changes in this order. Nexo Dental’s system overview uses section `images` (`patient-workspace.webp`) rather than a bespoke system-map component. |

### Media provenance

The ten WebP assets in `public/work/nexo-dental/` were produced under WO-035 and
are inventoried with SHA-256 hashes in
[`nexo-dental-case-study-media.md`](./nexo-dental-case-study-media.md). WO-037
places eight per the WO-036 media map, without re-encoding, cropping, or adding
any asset. Two accepted captures remain reserved.

| Asset | Origin | Used by |
| --- | --- | --- |
| `shell-identity.webp` | Product screenshot (WO-035 subject 10, MSW mocks). | Hero still + caption |
| `agenda.webp` | Product screenshot (WO-035, MSW mocks). | Context figure |
| `patient-workspace.webp` | Product screenshot (WO-035, MSW mocks). | System overview figure |
| `whatsapp-inbox.webp` | Product screenshot (WO-035, MSW mocks). | Decision 2 figure |
| `odontogram.webp` | Product screenshot (WO-035, MSW mocks). | Decision 3 first figure |
| `clinical-timeline.webp` | Product screenshot (WO-035, MSW mocks). | Decision 3 second figure |
| `fila.webp` | Product screenshot (WO-035, MSW mocks). | Decision 4 figure |
| `financial-ledger.webp` | Product screenshot (WO-035, MSW mocks). | Delivered figure |
| Reserved: `orcamento.webp`, `reports.webp` | Accepted WO-035 captures not placed on this page. | Prose-only coverage in Decision 3 / Delivered |
| `placeholder.svg` | Chapter wiring only. | Not a narrative figure |

## Site header (sticky glass + active nav)

First-party header chrome. Interaction patterns were inspired by 21st.dev motion
and underlined navigation menus; no registry package was installed.

| Component | Canonical URL (inspiration) | Local file | Dependency | Notes |
| --- | --- | --- | --- | --- |
| Sticky glass header + scroll-spy nav | https://21st.dev/@unlumen/components/motion-navigation-menu (layoutId active indicator); https://21st.dev/@shadcnui-blocks/components/navigation-menu-05 (hairline underline) | `src/components/layout/site-header.tsx`, `nav-active-indicator.tsx`, `src/hooks/use-active-section.ts`, `use-scrolled-past.ts` | `motion`, `lenis/react` (optional scroll sync) | Keeps the existing full-width bar. Solid `--color-canvas` fill at rest (separates nav from hero lines); glass + hairline after scroll. Active section via IntersectionObserver mid-viewport band; `aria-current` + Motion `layoutId` underline (static under reduced motion). Hover: muted → text + soft underline. Language switcher tokens aligned to `--color-line` / `--color-surface` / `--color-text`. |
