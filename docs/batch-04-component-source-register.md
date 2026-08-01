# Batch 04 — Component Source Register

**Work Order:** WO-024 (`DONE`, owner-authorized 2026-08-01)  
**Status:** ACCEPTED  
**Recorded:** 2026-07-31  
**Repository head at recording:** `development` @ `697d8a22`  
**Capture workspace:** one `mktemp -d` directory outside the repository
(`/tmp/wo024-sources-epmQpAfp`); removed after hashes were recorded. No demo
assets or source snapshots remain in the workspace.

This register is the immutable source and compatibility gate for D-006 and
D-008–D-014. Public availability plus obtainable code is sufficient by owner
decision; no separate terms review is performed here.

## Owner-Pinned Runtime Packages (Verified, Not Installed)

WO-024 does not install packages. The following registry metadata was verified
against `https://registry.npmjs.org` on 2026-07-31 for later orders.

| Package | Exact version | Integrity (sha512) | Shasum | Peer notes | Install order |
| --- | --- | --- | --- | --- | --- |
| `motion` | `12.43.0` | `sha512-BQgQbSa9Hn3/mtbib0MK53y6JSANa+YKUKlaYnWzAVDH424RYQ5LVpV3pNiWH00BA2z4ojsSdMzqT7g2FQwjuQ==` | `6f68b70aeb48045a294617d3673f3a997fea3bd7` | Optional peers `react`/`react-dom` `^18 \|\| ^19`; depends on `framer-motion@^12.43.0` and `tslib`. | WO-025 |
| `lenis` | `1.3.25` | `sha512-mOKxayErlaONK8fm4LN3XNd99Qu4plTpn9h9qf8wxzjGrJDzuD84FYzZ81HCd6ZsWp++VWVwOzL286Pf2s2u4A==` | `9336d9a754d8d9c454b86e9576328f5448321bd7` | Optional peers include `react >=17`. Ships `ReactLenis`. | WO-025 |
| `@bsmnt/scrollytelling` | `0.3.3` (latest; published 2024-02-22) | `sha512-2CqKzVP5osiWhU7g6/5u4nChT7VxHXuDTcX93zbvw0/Wn0TUtv10Yp5XNJ2qM979BQf0mNrR9XVEpqTVr37RLg==` | `2f8be0b32a3c4cf5a335f489522a2c32547d4afb` | Peers `react/react-dom >=18`, `gsap >=3`. Depends on `@radix-ui/react-slot` and `@radix-ui/react-portal`. **Not installed;** see BSMNT strategy below. | WO-026 (copy path) |
| `@gsap/react` | `2.1.2` (latest; available) | `sha512-JqliybO1837UcgH2hVOM4VO+38APk3ECNrsuSM4MuXp+rbf+/2IG2K1YJiqfTcXQHH7XlA0m3ykniFYstfq0Iw==` | `bfc055a41b402e8d1dc56839e9d077407027b0a0` | Peers `gsap ^3.12.5`, `react >=17`. Required only if WO-030 keeps the source `useGSAP` call. | WO-030 (optional) |

Repository baseline already provides `react@19.2.4`, `react-dom@19.2.4`,
`gsap@3.15.0`, `ogl@1.0.11`, and `three@0.185.1`. No new WebGL renderer package
is required for Batch 04.

## BSMNT Package-Versus-Source Strategy (D-006 → WO-026)

**Decision: copy the minimal source set. Do not install `@bsmnt/scrollytelling`.**

Reasons, recorded without installing the package:

1. The published `0.3.3` tarball's `dist/` entries contain **no** `"use client"`
   banner despite the repository `tsup` config declaring one. Under Next.js App
   Router that makes a direct package import unsafe without an adapter layer.
2. The published package pulls `@radix-ui/react-portal` solely for the optional
   debugger/visualizer. WO-026 must not introduce that dependency for an inert
   scene root.
3. Source inspection of `Root` shows it creates a **scoped GSAP timeline +
   ScrollTrigger only**. It does not construct Lenis, ScrollSmoother, a RAF
   loop, Canvas, or WebGL. That is compatible with D-005 once driven by the
   WO-025 root Lenis → `ScrollTrigger.update` integration.
4. Peer ranges (`react >=18`, `gsap >=3`) are satisfied by the repository, but
   the package was last published against React 18 typings (`RefObject`
   without a `| null` genericity that React 19 types expect). Copying the
   source lets WO-026 normalize types and imports under the existing
   `moduleResolution: "bundler"` TypeScript config.

WO-026 must copy only the files listed in the D-006 row, keep the recorded
SHA-256 values in each `Adapted from` header, strip the debugger/visualizer and
`image-sequence-canvas` exports, and retain `Root`, `Animation`, `Waypoint`,
context, and the small util/types graph those three need. `@radix-ui/react-slot`
is the only additional direct package WO-026 may add for Slot composition;
alternatively WO-026 may replace Slot with a one-file local equivalent and add
zero packages. Either choice must be recorded in the WO-026 handoff. Do not
copy the BSMNT demo website, SCSS modules, or visualizer.

## New Direct Package Inventory by Destination Order

| Order | May add | Must not add | Notes |
| --- | --- | --- | --- |
| WO-025 | `motion@12.43.0`, `lenis@1.3.25` | BSMNT, D-008–D-014 packages | Forced-motion migration only. |
| WO-026 | Optionally `@radix-ui/react-slot` (exact version chosen at install), or zero packages under the Slot-replacement path | `@bsmnt/scrollytelling`, `@radix-ui/react-portal` | Copy D-006 source. |
| WO-027 | None beyond existing `ogl` / `gsap` | `@react-three/*`, `three` for this role, ScrollSmoother Club plugin as a second scroll owner, `imagesloaded` | D-008 uses existing `ogl`. D-009 is GSAP-only. |
| WO-028 | None | `lenis` as a second instance, `imagesloaded` | Flip plugin ships inside existing `gsap`. |
| WO-029 | Optionally `lucide-react` if the close icon is retained; otherwise zero | Second scroll library, heading observers as owners | Motion already installed by WO-025. Prefer portfolio-owned icon or CSS. |
| WO-030 | Optionally `@gsap/react@2.1.2` if `useGSAP` is retained; otherwise zero | Nested scroller, second Lenis | Prefer rewriting the lifecycle onto `gsap.context()` and skip `@gsap/react`. |
| WO-031 | None | Second Lenis, Canvas/WebGL, `imagesloaded` as a hard owner | Variation 3 is CSS 3D + GSAP/ScrollTrigger. |
| WO-032 | None | Second route-transition runtime, Canvas/WebGL | Article-published morph + D-009 handoff. |
| WO-033 | None | Any new runtime | Review only. |

## Runtime-Owner Conflict Inventory

| Source owner found in selected code | Present in | Required adaptation | Signature survives? |
| --- | --- | --- | --- |
| GSAP `ScrollSmoother.create(...)` | D-008 `cylinder-carousel.tsx` | Delete smoother creation, wrapper refs, and `smoother.kill()`. Drive ScrollTrigger through the WO-025 Lenis integration. | Yes — cylinder, camera, shaders, particles remain. |
| Local Lenis + `gsap.ticker.add(lenis.raf)` | D-010 `smoothscroll.js`; D-013 `index3.js` | Do not copy these owners. Consume the root Lenis. | Yes — Flip waypoints and Variation 3 transforms remain. |
| Unmanaged `requestAnimationFrame` render loop | D-008 `animate()` | Replace with the portfolio `ManagedWebGLEffect` / manager animation gate. | Yes — geometry and particle updates become manager-ticked. |
| Document `window` scroll listener / `window.scrollTo({ behavior: "smooth" })` | D-011 | Remove. Read chapter/progress from D-006; navigate through root Lenis. | Yes — Motion compact/expanded morph remains. |
| `prefers-reduced-motion` branch | D-012; D-014 article prose | Remove. Forced motion under D-004. | Yes — angular panels and morph remain mandatory. |
| `data-lenis-prevent` nested scroll region | D-011 expanded panel | Keep only if the expanded panel remains a bounded overflow region that must not drive the root page; never create a second Lenis. | Yes. |
| Document-level heading observer / auto ID mutation | D-011 | Replace with authored chapter data from the scene manager. | Yes — instrument UI remains. |
| DOM-reparenting gallery wrappers + marquee timeline + global resize refresh | D-013 | Remove marquee and preloader ownership; author wrappers in React; refresh through the scene manager. | Yes — Variation 3 transform/filter math remains. |
| Auto-navigation state machine writing `element.style.*` | D-014 | Retain the direct DOM writes and guards; hand committed navigation to D-009 instead of the article's local fadeout/router. | Yes — clip-path/scale/counter morph remains. |

One root Lenis, one GSAP ticker integration, one BSMNT scene root, and one
managed case-study WebGL context remain obtainable after every listed removal.

---

## Source Rows

### D-006 — Master scrollytelling capability

| Field | Value |
| --- | --- |
| Decision and role | D-006 — master scrollytelling / case-study scene composition |
| Provider/component | BSMNT Scrollytelling (`@bsmnt/scrollytelling` source) |
| Canonical demo URL | https://scrollytelling.basement.studio/ |
| Canonical source URL | https://github.com/basementstudio/scrollytelling |
| Immutable commit/tag or dated capture | Commit `0c26959b106d9e81931c30af7dfeebfd83d0a379` on `main` (2024-02-21); package version declared in tree `0.3.3` |
| Exact source file paths | `scrollytelling/src/primitive.tsx`; `scrollytelling/src/context/index.tsx`; `scrollytelling/src/components/animation/index.tsx`; `scrollytelling/src/components/waypoint/index.tsx`; `scrollytelling/src/types/index.ts`; `scrollytelling/src/util/index.ts`; `scrollytelling/src/util/emmiter.ts`; `scrollytelling/src/util/internal-event-emmiter.ts`; `scrollytelling/src/components/debugger/visualizer/shared-types.ts` (types only); optional supporting `scrollytelling/src/components/pin/index.tsx` if WO-026 needs Pin |
| SHA-256 | `primitive.tsx` `94c3d0879de93dd5a4f4c6f7c9db85c7667a2a61767e759a845d185770825068`; `context/index.tsx` `fbde6a5436b2b3482fb4886df4d03b31c9c75b95eaff5f030e2d478a92c38604`; `animation/index.tsx` `a5c47ec7ed00d4a513d198aa1f25a5ea26338f1e2b2609f290250f8301e98139`; `waypoint/index.tsx` `0c69662940c25f7e5790a28ab0aedffb115bb30601dc738625b772a8a9bf20b1`; `types/index.ts` `b36ae1bcb965375435b14c4064c90b6238b98442cea0aef8d30b21c314e9b47e`; `util/index.ts` `173994ea01c82cc5cfde23591ab3b1d9e249974c5fcabefbce8217ca147dd746`; `util/emmiter.ts` `9c5a4a9acc09b57b60fd60e53285b2f194dca78a51c211fda0b29b2fa0249f4b`; `util/internal-event-emmiter.ts` `4f84c1eab53a69cb02862eba41ed81132b4fcb63c0f536d52f2ad0f59cb622ea`; `shared-types.ts` `f69c77a86c18f0548e68285f72eea69d172c25fa85bf2f56f3f0dae308f7bf51`; `pin/index.tsx` `9865d9acd0a4475c3075f1fe0bc7186941811faf21964d7ad0f51c560446de0d` |
| Runtime and peer dependencies | Peers already present: `react`, `react-dom`, `gsap`. Optional new direct: `@radix-ui/react-slot`. Do not add `@radix-ui/react-portal`. |
| Framework/module assumptions | React client components; GSAP + ScrollTrigger; Radix Slot for child ref merging; no smooth-scroll package of its own. |
| Signature behavior that must survive adaptation | Page as directed scenes; pinned/scrubbed root timeline; coordinated Animation/Waypoint composition; layered entrances, exits, overlaps, and handoffs; deliberate pacing via a 0–100 scene timeline. |
| Permitted portfolio/runtime changes | Portfolio tokens/layout; typed scene/section snapshot API; Lenis-fed ScrollTrigger; `gsap.context()` lifecycle; drop debugger/visualizer/image-sequence; React 19 type normalization; Slot replacement. |
| Forbidden substitutions or source-local owners to remove | Do not install the published package; do not copy the demo website; do not create Lenis/ScrollSmoother/RAF/Canvas; do not keep the visualizer Portal dependency. |
| Destination Work Order | WO-026 |
| Compatibility verdict | **ACCEPTED** (copy strategy) |

### D-008 — Cinematic WebGL hero and environmental system

| Field | Value |
| --- | --- |
| Decision and role | D-008 — cinematic WebGL hero / media cylinder + reactive particles |
| Provider/component | Codrops / JosephASG `Cinematic 3D Scroll`, Demo 1 (variant-1) |
| Canonical demo URL | https://tympanus.net/Tutorials/Cinematic3DScroll/ |
| Canonical source URL | https://github.com/JosephASG/codrops-cinematic-scroll-animations |
| Immutable commit/tag or dated capture | Commit `7a56d1fdc12058e3a955348a7a9f3387a2bf57da` on `main` (2026-03-16) |
| Exact source file paths | `src/components/pages/variant-1/cylinder-carousel.tsx`; `src/lib/variant-1/shaders.ts`; `src/lib/variant-1/utils.ts`; `src/lib/variant-1/types.ts`; `src/lib/variant-1/data.ts` (geometry/config constants only — replace image URLs and perspective copy) |
| SHA-256 | `cylinder-carousel.tsx` `47bd76609fb100b0ad290ff06152dfa2041dc0c77c7d10ed27ff461b236656c7`; `shaders.ts` `3320dcc946b8108cc28505ec8e3a9e8017894d06226f6c03f9f6c1204cf6843a`; `utils.ts` `dde2d1d7a39df95315b370251d25cf22f022f26a57fece76c89536305073dcd7`; `types.ts` `ca7be4365b8a03fe4ccc73317d4079551bbd121e4455c370bdded39c4f9f4e53`; `data.ts` `f1c4f91491c4a32d0155a91d0c074b9643312b28afc4fb03535aa7a63feac5a3` |
| Runtime and peer dependencies | Uses `ogl`, `gsap`, `gsap/ScrollTrigger`, `gsap/CustomEase`, and (to remove) `gsap/ScrollSmoother`. All except ScrollSmoother ownership are already in the repository. No new direct package. |
| Framework/module assumptions | React client component; OGL WebGL1 renderer; ScrollTrigger scrubbed camera/rotation; local RAF loop; Vite path alias `@/`. |
| Signature behavior that must survive adaptation | Image-cylinder panorama; scroll-driven camera depth and arc expansion; reactive particle lines responding to rotational velocity; shader darkness treatment; continuous environmental presence after the hero. |
| Permitted portfolio/runtime changes | Approved Aegis media via data contract; portfolio typography outside WebGL; manager-owned mount/animate/DPR/context-loss; expose cylinder/camera/particle params to D-006; responsive authored values. |
| Forbidden substitutions or source-local owners to remove | Remove `ScrollSmoother` and smooth-wrapper DOM; remove unmanaged RAF; remove demo fashion imagery, editorial text overlays, Codrops frame, and loader ownership; do not adopt `@react-three/*` or a second canvas. |
| Destination Work Order | WO-027 |
| Compatibility verdict | **ACCEPTED** |

### D-009 — Hero entrance and title choreography

| Field | Value |
| --- | --- |
| Decision and role | D-009 — route entrance / kinetic title choreography |
| Provider/component | Codrops `Kinetic Typography Page Transition` |
| Canonical demo URL | https://tympanus.net/Development/KineticTypePageTransition/ |
| Canonical source URL | https://github.com/codrops/KineticTypePageTransition |
| Immutable commit/tag or dated capture | Commit `ebe926e2f1de42950c36ff8a678321155280c1af` on `main` (2025-05-30) |
| Exact source file paths | `src/js/typeTransition.js` (signature class); supporting wiring reference `src/js/index.js` (open/close timeline only); CSS boundaries `.type` / `.type__line` / `--type-line-opacity` in `src/css/base.css` lines 25 and 191–220; markup boundary `src/index.html` lines 18–30 (`[data-type-transition]`) |
| SHA-256 | `typeTransition.js` `f03ae81c34aec7e3a42d780a82abd1a4acf7a32b6786c5ec4df7816d1b8f0b46`; `index.js` `6c06a4178f634a6f12ebaf11b845b1676f0a1c939850d4d0b1a863ac931904af`; `base.css` `b45da81fb57aef46ebd6b35b8b856edef9747f42f597a324395bcffb9ce30c1a`; `index.html` `6b232912823b14e044a70b8b3f4f2ec361221ebf752599b8618ea380f88edf13` |
| Runtime and peer dependencies | `gsap` only for the selected mechanic. Demo also lists `imagesloaded` for boot preloading — do not add it as a runtime owner. |
| Framework/module assumptions | Vanilla JS modules; GSAP timelines; fixed full-viewport type field; no scroll library, canvas, or RAF loop. |
| Signature behavior that must survive adaptation | Oversized letterform field; scale/rotate travel across the camera plane; staggered line motion that opens an aperture; in/out timelines totaling roughly 2.5s; completion hands to the destination composition. |
| Permitted portfolio/runtime changes | Portfolio type/tokens; project title as the only content input; sync aperture reveal with D-008 params; dispose on route exit; re-entry guards for React remounts; reuse for WO-032 committed navigation. |
| Forbidden substitutions or source-local owners to remove | Do not copy article grid, image cards, warm palette, serif faces, or demo words; do not add ScrollSmoother/Lenis/canvas; do not create a reduced-motion static title. |
| Destination Work Order | WO-027 and WO-032 |
| Compatibility verdict | **ACCEPTED** |

### D-010 — Chapter-to-chapter narrative transitions

| Field | Value |
| --- | --- |
| Decision and role | D-010 — persistent evidence aperture / chapter handoffs |
| Provider/component | Codrops `One Element Scroll` |
| Canonical demo URL | https://tympanus.net/Development/OneElementScroll/ |
| Canonical source URL | https://github.com/codrops/OneElementScroll |
| Immutable commit/tag or dated capture | Commit `feb7ad7fbc602b8cdbb5109da83442ff5995cdaf` on `main` (2024-11-20) |
| Exact source file paths | Signature mechanic in `js/index.js` function `createFlipOnScrollAnimation` (approx. lines 15–49) plus Flip plugin registration; structural CSS `.one` in `css/base.css` lines 296–304; waypoint markup pattern `[data-step]` in `index.html`. Reference only (do not adapt as owners): `js/smoothscroll.js`. |
| SHA-256 | `js/index.js` `fc1eaa878301e925cb3943ee4435639d3eedda08613b0ad8c96471ef0ecf8612`; `css/base.css` `e7dcb8e51a1ee2ff82e7f2528ffc2a93541bb67d06b537c88a7e3cf65ca43de9`; `index.html` `ff5898a0e529a73a68645e3d7426726d112b428db771bb21b1a2c5deb4ee618f`; `js/smoothscroll.js` `7b8cbfaf9306c34f9ae2590aadefb6e537f74f909b643832f0cce42da91e0971` |
| Runtime and peer dependencies | GSAP + ScrollTrigger + Flip (bundled with repository `gsap@3.15.0`). Demo Lenis and `imagesloaded` are source-local owners to remove. |
| Framework/module assumptions | Vanilla JS; Flip.getState / Flip.fit waypoint sequence scrubbed by ScrollTrigger; demo boots Lenis through `smoothscroll.js`. |
| Signature behavior that must survive adaptation | One persistent visual object; consecutive Flip fits across waypoint states; scrubbed spatial continuity; size/position/relationship changes without destroying the element. |
| Permitted portfolio/runtime changes | Evidence aperture semantic media frame; authored responsive waypoints; D-006-owned pinning/progress; sync with D-008 params; `gsap.context()` rebuild/revert. |
| Forbidden substitutions or source-local owners to remove | Remove demo Lenis + ticker integration (`smoothscroll.js`); remove span parallax, unrelated image scale reveals, filter-on-first-switch, related-demos animation, and `imagesloaded` boot ownership; do not substitute sticky cards or section fades. |
| Destination Work Order | WO-028 |
| Compatibility verdict | **ACCEPTED** |

### D-011 — Reading progress and orientation

| Field | Value |
| --- | --- |
| Decision and role | D-011 — chapter instrument / reading orientation |
| Provider/component | 21st.dev `Dynamic Island TOC` by Digital Zone |
| Canonical demo URL | https://21st.dev/@digitalzone0707/components/dynamic-island-toc |
| Canonical source URL | https://21st.dev/@digitalzone0707/components/dynamic-island-toc (published component source; demo id `12488`) |
| Immutable commit/tag or dated capture | Dated capture **2026-07-31** via 21st.dev `get_component` id `12488`; saved as `d011-dynamic-island-toc.component.tsx` (309 lines) |
| Exact source file paths / excerpt boundaries | Entire published component function `DynamicIslandTOC` and helper `CircleProgress` from the capture file (lines 1–309). Demo/usage page is reference only and must not be copied. |
| SHA-256 | Capture file `dcab0863faa4c1d6ba632eb13076dc88b21d89aeeb777701376a6345070c81e2` |
| Runtime and peer dependencies | `motion` (already pinned for WO-025); optional `lucide-react` only if the close icon is kept; local `cn` already exists. No Lenis package of its own. |
| Framework/module assumptions | React client component; Motion layout/presence; document heading query + window scroll listener; `window.scrollTo` smooth navigation; `data-lenis-prevent` on the expanded list. |
| Signature behavior that must survive adaptation | Compact bottom-center capsule; morph to expanded chapter index; coordinated number/label/progress transitions; Motion-powered presence/layout; progress affordance. |
| Permitted portfolio/runtime changes | Portfolio tokens/type/surfaces; authored chapter model from D-006; root-Lenis navigation; explicit desktop/mobile layouts; portfolio-owned icon. |
| Forbidden substitutions or source-local owners to remove | Remove document scroll calculation, heading auto-ID mutation, independent smooth scrolling, and any reduced-motion branch if introduced; do not ship Apple-replica styling or blog auto-discovery as the product API; do not call root Motion `useScroll`. |
| Destination Work Order | WO-029 |
| Compatibility verdict | **ACCEPTED** |

### D-012 — Decision-chapter evidence choreography

| Field | Value |
| --- | --- |
| Decision and role | D-012 — angular decision-panel takeovers |
| Provider/component | 21st.dev `Story Scroll` by Samira Boudjadja (`FlowArt` / `FlowSection`) |
| Canonical demo URL | https://cdn.21st.dev/boudjadjasamira/story-scroll/default/bundle.1777905625968.html?theme=dark&dark=true |
| Canonical source URL | https://21st.dev/@boudjadjasamira/components/story-scroll (published component source; demo id `12461`) |
| Immutable commit/tag or dated capture | Dated capture **2026-07-31** via 21st.dev `get_component` id `12461`; saved as `d012-story-scroll.component.tsx` (134 lines) |
| Exact source file paths / excerpt boundaries | Entire published module: `FlowSection`, `FlowArt`, and helpers (capture lines 1–134). Demo panel copy/colors are reference only. |
| SHA-256 | Capture file `ab4a1e7f278bee29a419bd170729640be65383746bd6188db69c423009f633ec` |
| Runtime and peer dependencies | `gsap`, `gsap/ScrollTrigger` (present). Source imports `@gsap/react` (`useGSAP`) — WO-030 may either install `@gsap/react@2.1.2` or rewrite onto `gsap.context()` and add zero packages. Prefer the rewrite. |
| Framework/module assumptions | React client component; scrubbed rotation from 30° to 0° with `transformOrigin: bottom left`; pin previous sections with `pinSpacing: false`; local `prefers-reduced-motion` gate. |
| Signature behavior that must survive adaptation | Incoming panel rotates upward from the lower edge; brief overlap with the previous panel; scrubbed settle; cumulative stacked sequence. |
| Permitted portfolio/runtime changes | Portfolio visual system; four individually authored decision compositions; register timelines with D-006; forced motion (delete reduced-motion branch); mobile-authored values. |
| Forbidden substitutions or source-local owners to remove | Remove reduced-motion early return; remove document-level ownership / `<main>` page takeover; do not add scroll snapping, nested scroller, or a second render loop; do not copy orange art-platform styling or demo metrics. |
| Destination Work Order | WO-030 |
| Compatibility verdict | **ACCEPTED** |

### D-013 — Evidence-media presentation and transitions

| Field | Value |
| --- | --- |
| Decision and role | D-013 — CSS 3D evidence stage (Variation 3) |
| Provider/component | Codrops `Rotating On-Scroll Animations`, Variation 3 |
| Canonical demo URL | https://tympanus.net/Development/RotatingOnScrollAnimations/index3.html |
| Canonical source URL | https://github.com/codrops/RotatingOnScrollAnimations |
| Immutable commit/tag or dated capture | Commit `ebbe2c9bd80237d05c709475e47aad171030e21f` on `main` (2026-06-18) |
| Exact source file paths | Signature mechanic `js/index3.js` function `initGalleryAnimation` (lines 52–86) and the non-linear `rotationX` / `z` / `yPercent` / `saturate` / `brightness` formulas; structural CSS `.gallery`, `.gallery__item-wrap`, `.gallery__item`, and `.demo-3` rules in `css/base.css`; Variation 3 shell `index3.html` for class hooks only. |
| SHA-256 | `js/index3.js` `0f15d19f3a4e99c4ed504a9e97cb9541c5433b5960195ee39751d8906a7d13fc`; `index3.html` `c74474a39d37fd39edf8db2c04029de2ba951f03285925f01784d8cb0f8c39e6`; `css/base.css` `b2ecd738afcc168637a81099f614278be62c84e737884192a2f129c529b962df` |
| Runtime and peer dependencies | GSAP + ScrollTrigger (present). Demo Lenis and `imagesloaded` are source-local owners to remove. No Canvas/WebGL. |
| Framework/module assumptions | Vanilla JS; CSS perspective on wrappers; per-item ScrollTrigger `onUpdate` writing transforms/filters; demo-local Lenis ticker integration and marquee timeline. |
| Signature behavior that must survive adaptation | Non-linear x-rotation through perspective; z-depth and vertical travel; tonal modulation to full saturation/brightness at the frontal inspection point; scrubbed, reversible motion. |
| Permitted portfolio/runtime changes | Deterministic angles (no randomness); 16:9 inspection sizing; separate mobile/desktop perspective values; semantic captions; native video controls only when frontal; subordinate to D-012 panels. |
| Forbidden substitutions or source-local owners to remove | Remove Lenis init + ticker; remove marquee; remove DOM-reparenting setup ownership and image preloader ownership as hard dependencies; do not add Canvas/WebGL or a reduced-motion branch; do not copy fashion imagery or the names marquee. |
| Destination Work Order | WO-031 |
| Compatibility verdict | **ACCEPTED** |

### D-014 — Closing scene and route exit

| Field | Value |
| --- | --- |
| Decision and role | D-014 — closing scene / next-project scroll morph and guarded route exit |
| Provider/component | Codrops / Thibault Guignand `Next-Project Scroll Morph` (article-published implementation) |
| Canonical demo URL | https://www.thibaultguignand.com/en/project/atelier-stratus |
| Canonical source URL | https://tympanus.net/codrops/2026/05/06/from-shader-uniforms-to-clip-path-wipes-how-gsap-drives-my-portfolio/ |
| Immutable commit/tag or dated capture | Dated capture **2026-07-31**. Article HTML SHA-256 `60eb86a5e86ef2752199af0f828d219e75887bea6e92eff27de638d30c83654e`. Published excerpts extracted under heading **Next-Project Scroll Morph** (primary) and the adjacent route-handoff preload pattern under **Page Transitions (GSAP + View Transitions)** (supporting). |
| Exact source file paths / excerpt boundaries | Primary excerpt `d014-next-project-scroll-morph.js` lines 1–25 (`onUpdate` writing counter, `scale` from 1.3→1, inset clip-path, SVG circle, auto-nav guard). Supporting excerpt `d014-route-handoff-preload.js` lines 1–27 (preload + staged fade + navigate). Article prose additionally specifies: single ScrollTrigger with `scrub: 1`; `idle → triggered → navigating` state machine; `hasSeenLowProgress`; velocity ceiling `getVelocity() > 2000`; 250 ms cancellable commit; click driver tweening progress to 1. |
| SHA-256 | Primary excerpt `42a43b8db202757637846f8b24492672d4fadf9265394c81a2eecf939b0abd6b`; supporting excerpt `7406f4fa3d4d790532be501b3144b71a725f2f81385a80ce089e4d17b541be03` |
| Runtime and peer dependencies | GSAP + ScrollTrigger (present). No new package. Destination navigation must reuse D-009 rather than the article's local fadeout stack. |
| Framework/module assumptions | ScrollTrigger scrub callback writes `element.style.*` directly; React must not re-render per frame; guarded auto-navigation; optional click-to-complete tween. |
| Signature behavior that must survive adaptation | Inset/scaled preview expanding to full viewport; SVG circle + numeric 0–100 counter; reversible scroll; guarded commit; activatable completion with the same visual progression. |
| Permitted portfolio/runtime changes | Portfolio type/tokens; data-driven destination (`/#work` for Aegis in this batch); handoff to D-009 kinetic transition; preload only real destinations; semantic keyboard activation. |
| Forbidden substitutions or source-local owners to remove | Remove article `prefers-reduced-motion` behavior; do not create Lenis/RAF/Canvas/WebGL; do not preview unpublished projects; do not invent a second exit transition language. |
| Destination Work Order | WO-032 |
| Compatibility verdict | **ACCEPTED** |

---

## Compatibility Summary

| Decision | Verdict | Destination | Blocking conflict after adaptation? |
| --- | --- | --- | --- |
| D-006 | ACCEPTED (copy) | WO-026 | No |
| D-008 | ACCEPTED | WO-027 | No — ScrollSmoother/RAF removed |
| D-009 | ACCEPTED | WO-027, WO-032 | No |
| D-010 | ACCEPTED | WO-028 | No — demo Lenis removed |
| D-011 | ACCEPTED | WO-029 | No — document scroll owner removed |
| D-012 | ACCEPTED | WO-030 | No — reduced-motion branch removed |
| D-013 | ACCEPTED | WO-031 | No — demo Lenis/marquee removed |
| D-014 | ACCEPTED | WO-032 | No — article PRM branch removed |

All eight selected mechanics remain obtainable after source-local owners are
removed. WO-024 is therefore **not BLOCKED**.

## Selection Scope

The only planned Batch 04 external selections are the eight ACCEPTED rows
above (D-006 and D-008–D-014). Every earlier draft shortlist for this batch is
superseded. Batch 01 homepage provenance for unrelated shipped components
remains valid and is preserved outside this register.

## Cleanup Proof

After hashing:

1. Session temporary directory `/tmp/wo024-sources-epmQpAfp` was removed.
2. A prior leftover checkout at `/tmp/wo024` was also removed.
3. `git status --short` shows no copied demo assets under `public/`, `src/`, or
   `docs/` beyond this register and the reconciled provenance/blueprint files.
4. `git diff -- package.json pnpm-lock.yaml src` is empty for this order.
