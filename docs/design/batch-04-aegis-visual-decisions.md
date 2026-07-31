# Batch 04 — Aegis Visual-Experience Decisions

## Purpose

This is the owner-approved design-decision ledger for Batch 04. Record each
decision here as it is made so research agents and implementation agents do not
infer a direction from an exploratory shortlist, an old Work Order, or a
provider demo.

This document governs visual direction and component selection. Batch 03's
approved copy, evidence, media, confidentiality boundaries, and section order
remain authoritative for content.

## Decision Status

- **Selected** — approved for the batch. It may be translated into a Work Order.
- **Rejected** — considered and explicitly excluded. Do not reintroduce it as a
  substitute.
- **Constraint** — a standing rule that every later selection must satisfy.
- **Open** — the role has been identified, but no source has been selected.

Only entries marked **Selected** authorize a component choice. A candidate,
search result, or mention in an older planning document is not an approval.

## Selection Process

**Status:** Constraint  
**Owner decision:** 2026-07-31

Components are selected collaboratively, one visual role at a time:

1. Define the role and the experience it must produce.
2. Search public providers and other public sources with obtainable code.
3. Inspect the working demo and source, not only screenshots or marketing copy.
4. Present only candidates that meet the portfolio's visual-quality threshold.
5. The owner selects or rejects the candidates.
6. Record the decision here before updating or dispatching implementation Work
   Orders.

Do not create a preselected batch-wide shortlist. Do not force three options
when only one meets the required standard.

## Standing Design Constraints

### D-001 — Portfolio visual system owns every project page

**Status:** Constraint  
**Owner decision:** 2026-07-31

Every case study uses the portfolio's visual language: typography, palette,
spacing, layout logic, surfaces, interaction vocabulary, and motion direction.
Project evidence may include the project's own screenshots, film, and marks,
but the surrounding page must not imitate the project's product interface or
adopt a separate project-specific design system.

### D-002 — Projects carry comparable weight

**Status:** Constraint  
**Owner decision:** 2026-07-31

Aegis is the first case study being added; it is not the flagship project.
Later project pages must receive roughly equal editorial importance, production
care, visual ambition, and navigational prominence.

The presentation primitives selected in Batch 04 must therefore be reusable by
other case studies without an Aegis-specific branch.

### D-003 — Source-first component development

**Status:** Constraint  
**Owner decision:** 2026-07-31

Premium motion, scrollytelling, WebGL, and presentation components must begin
with high-quality code from public sources such as component providers,
creative-development studios, or public demonstrations with obtainable source.
The batch must adapt proven work instead of recreating common effects from
scratch.

Custom work is limited to portfolio styling, semantic content mapping,
composition, runtime integration, lifecycle management, and the connective
choreography needed to turn the selected sources into one experience.

Public availability plus obtainable code is sufficient for source eligibility.
Do not add a separate licensing-review or licensing-approval gate to the
component-selection workflow.

### D-004 — Forced authored motion

**Status:** Constraint  
**Owner decision:** 2026-07-31

The website has no reduced-motion presentation path. Do not use
`prefers-reduced-motion` or a motion-preference hook to suppress, shorten,
replace, or statically restage the authored experience. Configure Motion with
`reducedMotion="never"`.

Capability and lifecycle handling remain required. Missing WebGL, Save-Data,
mobile performance limits, hidden tabs, offscreen effects, runtime failures,
and lost WebGL contexts are operational states, not reduced-motion variants.
They must remain safe without becoming an alternative design direction.

### D-005 — One coordinated motion runtime

**Status:** Constraint  
**Owner decision:** 2026-07-31

- Pin `motion@12.43.0` for state transitions, presence, layout animation, and
  interaction states.
- Pin `lenis@1.3.25` and create exactly one root smooth-scroll owner.
- GSAP/ScrollTrigger owns authored scroll timelines and integrates with the root
  Lenis instance exactly once.
- WebGL remains inside the portfolio's shared WebGL management boundary. A
  sourced component must not introduce a competing page-level canvas owner.
- Components must not create another Lenis instance, global animation ticker,
  root scroll subscription, or nested scrolling experience.

## Component Decisions

### D-006 — Master scrollytelling capability

**Status:** Selected  
**Owner decision:** 2026-07-31  
**Selected source:** BSMNT Scrollytelling  
**Demo:** https://scrollytelling.basement.studio/  
**Source:** https://github.com/basementstudio/scrollytelling

BSMNT Scrollytelling is the selected source and quality benchmark for the
case-study's master scroll choreography. The selection is based on the
capability demonstrated by its working example rather than its agency-site
visual style.

The qualities that must survive adaptation are:

- a page experienced as a sequence of directed scenes rather than a document
  decorated with isolated reveal effects;
- pinned and continuously transforming compositions;
- coordinated typography, imagery, spatial elements, and scroll progress;
- layered entrances, exits, overlaps, and handoffs between scenes;
- scrubbed timelines with deliberate pacing and strong visual continuity;
- a finished result at the same level of visual quality and impressiveness as
  the BSMNT demonstration.

The BSMNT example's typography, colors, imagery, branding, density, debug
visualizer, and agency composition are not selected. The implementation must
express the capabilities above through the portfolio design system and the
approved Aegis narrative and evidence.

BSMNT must remain subordinate to D-005: its GSAP timelines may be scoped to the
case-study experience, but it may not create a second smooth-scroll owner or an
independent global runtime.

### D-007 — Rejected master-scrollytelling candidates

**Status:** Rejected  
**Owner decision:** 2026-07-31

The following candidates are excluded from the master-scrollytelling role:

- `@matthesketh/react-storyteller`
- Aceternity UI `Sticky Scroll Reveal`

Both were rejected because their working examples are too simple and visually
unambitious for Batch 04. Correct sticky-layout mechanics are insufficient. Do
not use either candidate as the master-scrollytelling foundation, even if it is
technically easier to integrate.

React Kino was screened out before owner review because it introduces its own
root scroll system and automatic reduced-motion behavior, conflicting with
D-004 and D-005.

### D-008 — Cinematic WebGL hero and environmental system

**Status:** Selected  
**Owner decision:** 2026-07-31  
**Selected source:** Codrops `Cinematic 3D Scroll Experiences with GSAP`, Demo 1  
**Demo:** https://tympanus.net/Tutorials/Cinematic3DScroll/  
**Source:** https://github.com/JosephASG/codrops-cinematic-scroll-animations  
**Technical reference:** https://tympanus.net/codrops/2025/11/19/how-to-build-cinematic-3d-scroll-experiences-with-gsap/

The rotating image-cylinder and reactive-particle environment from Demo 1 is
the selected source for the case-study hero and its continuing environmental
WebGL layer. It meets the visual bar because it is a spatial scene with a
substantial scroll-driven transformation, not a decorative shader wallpaper:
the media begins as a controlled panoramic band, expands beyond the viewport
into large surrounding arcs, and carries a sense of depth and momentum through
particle response.

The source must be adapted into a reusable portfolio primitive. Aegis supplies
the approved Batch 03 evidence media for the cylinder; future projects supply
their own approved media through the same data contract. Project media changes,
but the geometry, scene grammar, portfolio typography, palette, composition,
and production weight remain consistent across case studies.

The intended Aegis sequence is:

1. The hero opens with a restrained cylindrical panorama behind the portfolio
   title composition, providing depth without compromising text legibility.
2. Early scroll advances cylinder rotation, camera depth, media scale, and
   particle energy as the case-study premise is introduced.
3. The panorama opens into oversized arcs that travel beyond the viewport,
   surrounding the narrative rather than behaving like a conventional
   carousel.
4. Reactive particle lines express scroll velocity and reinforce spatial
   movement during the expansion.
5. The geometry recedes into restrained environmental traces as the page hands
   off to the evidence chapters; it must not disappear as an unrelated hero
   gimmick.

BSMNT Scrollytelling owns the authored sequence and maps its scene progress to
the selected WebGL system. The source implementation is not adopted wholesale:

- remove its `ScrollSmoother` instance and all demo-local scroll ownership;
- consume the single root Lenis state through the portfolio's GSAP/ScrollTrigger
  integration;
- remove any independent global render ticker or unmanaged
  `requestAnimationFrame` loop;
- run exactly one case-study WebGL context inside the portfolio WebGL management
  boundary, including visibility, animation, DPR, context-loss, and disposal
  handling;
- expose cylinder, camera, shader, and particle values as scene parameters for
  the BSMNT timeline instead of reading global scroll position inside the
  component;
- keep DOM headings and case-study content in the portfolio layer rather than
  baking narrative text into WebGL.

The demo's fashion imagery, typography, editorial styling, labels, colors, and
page composition are reference content only and must not be copied. The selected
capability is its media-cylinder geometry, shader treatment, reactive particles,
and cinematic spatial transformation.

The Codrops `Shaders on Scroll` morphing object and Paper Shaders `Neuro Noise`
were not selected for this role. The former is less evidence-led; the latter is
a useful shader texture but does not provide a complete cinematic hero system.

### D-009 — Hero entrance and title choreography

**Status:** Selected  
**Owner decision:** 2026-07-31  
**Selected source:** Codrops `Kinetic Typography Page Transition`  
**Demo:** https://tympanus.net/Development/KineticTypePageTransition/  
**Source:** https://github.com/codrops/KineticTypePageTransition  
**Technical reference:** https://tympanus.net/codrops/2021/09/29/kinetic-typography-page-transition/

The kinetic type-transition system is selected as the foundation for the case-
study route entrance and hero-title choreography. It is a complete
compositional transition rather than an isolated text-reveal preset: large
typographic structures move through the viewport, cross the camera plane, and
create the visual aperture through which the destination composition appears.

The selected capability must be translated into the portfolio visual system.
The intended Aegis sequence is:

1. The case-study route opens inside the portfolio's dark shell with oversized
   `AEGIS` letterforms establishing a full-viewport typographic field.
2. The letterforms scale, rotate, and travel toward and across the viewer as
   spatial architecture rather than entering as a conventional staggered
   heading.
3. Glyph counters, overlaps, and negative space become an animated aperture
   through which the D-008 media cylinder and particle environment first
   appear.
4. The kinetic field clears and resolves into the restrained portfolio hero:
   the `Aegis` title, case-study framing, approved metadata, and project facts.
5. The completed entrance hands the same composition to D-006; the first scroll
   continues the cylinder and environmental motion without a visual reset or a
   second intro.

The original demo's warm palette, serif typography, editorial grid, image
cards, article layout, copy, and photographic content must not be copied. The
project UI and Aegis product branding must not become the surrounding page
style. The reusable portfolio primitive owns the type, tokens, composition,
timing, and transition grammar; each project supplies only its approved title,
metadata, and media.

The source's self-contained GSAP timeline is compatible with D-005 and should
be adapted rather than wrapped as a separate runtime:

- scope the entrance timeline to the case-study route and dispose it on route
  exit;
- do not add a render loop, scroll listener, smooth-scroll instance, or canvas;
- synchronize the typographic aperture with parameters exposed by the shared
  D-008 WebGL scene;
- hand timeline completion to the existing BSMNT/ScrollTrigger scene sequence;
- keep the authored entrance mandatory under D-004; do not introduce a static
  or reduced-motion replacement;
- prevent re-entry races and duplicate timelines during React development
  remounts, navigation interruption, and rapid route changes.

Codrops `On-Scroll Text Motion` remains unselected for this role. Its spatial
typographic field is strong, but it is better suited to a scroll handoff than a
route entrance, competes with the selected WebGL centerpiece, and includes a
demo-local `ScrollSmoother` owner that conflicts with D-005. The 21st.dev
`Hero Shutter Text`, conventional split/blur/scramble presets, and 3D text-
cylinder demos were screened out because they are isolated effects or duplicate
the cylindrical grammar already selected in D-008. Do not substitute them for
D-009.

### D-010 — Chapter-to-chapter narrative transitions

**Status:** Selected  
**Owner decision:** 2026-07-31  
**Selected source:** Codrops `One Element Scroll`  
**Demo:** https://tympanus.net/Development/OneElementScroll/  
**Source:** https://github.com/codrops/OneElementScroll  
**Technical reference:** https://tympanus.net/codrops/2024/11/20/consecutive-scroll-animations-with-one-element/

The consecutive GSAP Flip waypoint system from `One Element Scroll` is selected
as the foundation for transitions between the major case-study chapters. Its
essential quality is spatial continuity: one persistent visual object travels
through successive compositions, changing size, position, and relationship to
the surrounding typography instead of disappearing at the end of one section
and being recreated in the next.

The reusable portfolio primitive is an **evidence aperture**. It is one owned
DOM media frame whose layout states are supplied by the case-study scene
configuration. The intended Aegis sequence is:

1. The aperture emerges from the D-008 hero panorama as the opening scene hands
   off to the written case study.
2. It occupies a broad cinematic position during the context chapter.
3. It contracts and relocates beside the problem narrative, allowing the page
   composition to rebuild around it.
4. It expands into a principal visual anchor as the system explanation begins.
5. It continues through later chapter waypoints with deliberate changes in
   proportion, alignment, depth, and overlap so transitions feel causal rather
   than decorative.
6. Approved evidence may change inside the aperture only at choreographed,
   visually masked handoff points; the aperture itself remains spatially
   continuous.

This technique defines the connective grammar between chapters. It does not
authorize a generic repeated card, sticky image, or identical Flip movement for
every section. Each waypoint must serve the narrative and be composed through
the portfolio's typography, grid, palette, and spacing. Future case studies use
the same aperture and waypoint contract with their own approved evidence.

The source must be reduced to its core Flip technique and integrated under
D-005:

- retain the `Flip.getState()`/`Flip.fit()` waypoint approach;
- remove the demo's Lenis instance, GSAP ticker integration, typography
  effects, parallax, and unrelated image animations;
- let D-006 own pinning, scroll progress, pacing, and scene handoffs;
- build the Flip sequence inside a scoped GSAP context and revert it on resize,
  route exit, interrupted navigation, and React development remount;
- use explicit responsive waypoint layouts rather than relying on desktop
  coordinates;
- synchronize aperture movement with the D-008 camera, cylinder, and particle
  parameters without adding a renderer or global subscription;
- keep the authored sequence mandatory under D-004.

Codrops `On-Scroll Layout Formations` was not selected for this role because it
assembles groups of media rather than preserving one narrative object across
chapters. It remains eligible for the later evidence-media presentation search.
The Codrops SVG mask transitions were not selected because they primarily wipe
between full-screen images, and `On Scroll Clipped Sections` was screened out
because it behaves as a parallax gallery rather than a strong chapter-handoff
system. Do not substitute a conventional progress reveal, section fade, sticky
card stack, or image wipe for D-010.

### D-011 — Reading progress and orientation

**Status:** Selected  
**Owner decision:** 2026-07-31  
**Selected source:** 21st.dev `Dynamic Island TOC` by Digital Zone  
**Demo and source:** https://21st.dev/@digitalzone0707/components/dynamic-island-toc

The Motion-powered morphing table-of-contents system is selected as the
foundation for persistent reading orientation. It qualifies because it treats
location as a changing interface object: a compact progress surface expands
into a navigable chapter index and then resolves back into the current reading
state. A conventional top progress bar, documentation sidebar, row of dots, or
passive percentage counter does not provide the required capability.

The reusable portfolio primitive is a **chapter instrument**, not a literal
copy of the demo's Dynamic Island styling. Its intended behavior is:

1. A restrained bottom-center capsule remains present after the hero entrance.
2. Its compact state shows the current chapter number, a short editorial label,
   and progress within that chapter.
3. Chapter changes reshape the capsule and transition the number, label, and
   progress treatment as one coordinated state change rather than swapping
   static text.
4. Activating the capsule expands it into a cinematic chapter index, shifts
   visual focus away from the page, and clearly marks the current and completed
   chapters.
5. Selecting a chapter navigates through the portfolio's single root scroll
   system and then collapses the instrument into the destination state.
6. The instrument remains reusable across project pages; projects supply the
   ordered chapter labels and destinations while the portfolio owns its visual
   language, geometry, motion, and placement.

The source's rounded black pill, blog styling, automatic heading discovery,
generic table-of-contents hierarchy, copy, and Apple-interface resemblance are
not selected. The adapted instrument must use the portfolio typography,
surfaces, grid, spacing, and interaction vocabulary. It must remain visually
quiet while collapsed so it does not compete with D-008 or the D-010 evidence
aperture, but its expansion must feel like an authored scene rather than a
utility popover.

The component must be integrated under D-004 and D-005:

- retain Motion-based presence and layout morphing for the compact/expanded
  states, active label, and chapter-list transitions;
- remove the source's document-level scroll calculation, heading observer,
  independent smooth-scrolling behavior, and reduced-motion logic;
- consume the current chapter, completed chapters, and normalized local
  progress from the D-006 scene manager;
- route chapter selection through the one root Lenis owner rather than calling
  a second scrolling implementation;
- do not add a render loop, ScrollTrigger owner, global subscription, nested
  scroller, or WebGL context;
- preserve the full authored transition under D-004 with no reduced-motion
  branch;
- provide explicit compact and expanded layouts for desktop and mobile rather
  than scaling one fixed desktop capsule.

The 21st.dev `Table of Contents` by inference-sh, `Sticky Section Tabs` by Erik,
standard scroll-progress bars and rings, Codrops `Navigation Indicators`, and
the Codrops context-aware fixed-logo experiment were screened out because they
are generic, dated, or too modest for this role. GreenSock's `ScrollTrigger
Lateral Pin Indicator` was not selected because its large pinned panel would
compete with the evidence composition and its own scroll ownership would add
unnecessary integration work. Do not substitute these for D-011.

### D-012 — Decision-chapter evidence choreography

**Status:** Selected  
**Owner decision:** 2026-07-31  
**Selected source:** 21st.dev `Story Scroll` by Samira Boudjadja  
**Demo and source:** https://21st.dev/@boudjadjasamira/components/story-scroll  
**Full-screen demo:** https://cdn.21st.dev/boudjadjasamira/story-scroll/default/bundle.1777905625968.html?theme=dark&dark=true

The source's angular full-viewport panel takeover is selected as the structural
transition language for the four Aegis decision chapters. An incoming panel
rotates upward from the lower edge, briefly shares the frame with the previous
chapter, and settles over it. This creates a layered editorial sequence with a
clear sense of consequence and accumulation rather than another stack of cards
or a series of independent reveal animations.

The source is a motion primitive, not the visual design for the section. Its
orange palette, art-platform copy, typography, spacing, and individual panel
layouts are not selected. The adaptation must use the portfolio's established
visual system and preserve the authoritative Aegis content and media. The
shared angular handoff provides continuity, while the settled composition and
internal choreography must differ by decision:

1. Decision 1 is a typography-led declaration of the standalone-product choice
   followed by its existing reasoning. It must not introduce invented visual
   evidence.
2. Decision 2 uses the existing curated-store-versus-direct-lakehouse language
   as an editorial contrast. It must not turn that contrast into an invented
   architecture diagram, data flow, or unsupported product claim.
3. Decision 3 opens the settled scene into the existing
   `player-investigation.webp` and `risk-constellation.webp` evidence. Both
   screenshots remain legible and uncropped.
4. Decision 4 resolves into the existing `entry-intro.mp4` evidence. The video
   retains native controls and must not autoplay, loop, or become a
   scroll-scrubbed animation.

The four chapters must not be implemented as four copies of one card. Their
content hierarchy, internal pacing, and evidence composition must be authored
individually. The panel takeover is connective tissue between scenes; it does
not replace the chapter-specific choreography.

The component must be integrated under D-004, D-005, and D-006:

- retain the GSAP and ScrollTrigger rotation, overlap, pinning, and scrubbed
  handoff as the selected signature capability;
- remove the source's independent lifecycle, document-level ownership, and
  `prefers-reduced-motion` branch;
- register the decision sequence as scoped timelines owned by the BSMNT scene
  manager and driven by the portfolio's single root Lenis instance;
- do not add scroll snapping, a nested scroller, an input observer, a second
  smooth-scroll instance, or another render loop;
- preserve authored motion on every supported viewport, including mobile;
- keep evidence-media choreography subordinate to this sequence so the later
  evidence-media role does not create competing scroll ownership.

Componentry `Scroll Choreography`, React Bits `Scroll Stack`, and Codrops
`Smooth Panel Scroll Effects` were screened out for this role. They are
principally image-gallery or repeated-card treatments and cannot carry both the
prose-only and media-backed decisions honestly at the required level. Do not
substitute them for D-012.

## Planning Impact

The current Batch 04 drafts predate this ledger and contain premature component
selections, including Aceternity `Sticky Scroll Reveal` for the system-map
chapter. Those selections are stale wherever they conflict with this document.

Before any Batch 04 implementation Work Order is dispatched:

1. Replace the old master-scrollytelling selection with D-006.
2. Remove D-007 candidates from locked or accepted component tables.
3. Treat every other preselected Batch 04 component as unapproved until it has
   gone through the selection process in this document.
4. Reconcile the Work Order scope and runtime contract with the final selected
   component set.

## Open Component Roles

No source is selected yet for the remaining roles. This list defines search
categories only; it is not a component shortlist.

| Role | Status |
| --- | --- |
| Cinematic WebGL hero and environmental background | Selected — D-008 |
| Hero entrance and title choreography | Selected — D-009 |
| Chapter-to-chapter narrative transitions | Selected — D-010 |
| Reading progress and orientation | Selected — D-011 |
| Decision-chapter evidence choreography | Selected — D-012 |
| Evidence-media presentation and transitions | Open |
| Closing scene and route exit | Open |

## Entry Template

Append new decisions using this structure:

```md
### D-XXX — Decision title

**Status:** Selected | Rejected | Constraint | Open  
**Owner decision:** YYYY-MM-DD  
**Selected source:** Provider and component, when applicable  
**Demo:** Canonical working demo  
**Source:** Obtainable source URL

State what was decided, why it meets or misses the visual bar, which signature
qualities must survive adaptation, what must not be copied, and any effect on
the runtime or existing Work Orders.
```
