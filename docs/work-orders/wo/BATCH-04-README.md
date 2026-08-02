# Portfolio Website — Work Orders, Batch 04

## Purpose

Turn the owner-approved D-006–D-014 component set into one cinematic,
scroll-directed Aegis case study while establishing reusable presentation
primitives for every later project page.

Aegis is the first case study, not a flagship. Q, gosigapp, and Nexo Dental
must be able to use the same scene system with roughly equal editorial and
visual weight. Batch 03 remains authoritative for all copy, facts, media,
confidentiality boundaries, section order, metadata, and links.

## Authoritative Design Contract

Read [`../../design/batch-04-aegis-visual-decisions.md`](../../design/batch-04-aegis-visual-decisions.md)
before any Batch 04 Work Order. Its constraints and selections override every
older shortlist, Work Order draft, or provider demo.

The selected set is complete:

| Decision | Role | Selected source |
| --- | --- | --- |
| D-006 | Master scrollytelling | BSMNT Scrollytelling |
| D-008 | Cinematic WebGL hero/environment | Codrops `Cinematic 3D Scroll`, Demo 1 |
| D-009 | Route entrance and kinetic title | Codrops `Kinetic Typography Page Transition` |
| D-010 | Chapter-to-chapter continuity | Codrops `One Element Scroll` |
| D-011 | Reading orientation | 21st.dev `Dynamic Island TOC` |
| D-012 | Decision chapters | 21st.dev `Story Scroll` |
| D-013 | Evidence media | Codrops `Rotating On-Scroll Animations`, Variation 3 |
| D-014 | Closing and route exit | Codrops/Thibault Guignand `Next-Project Scroll Morph` |

React Bits `Threads`, `Animated Content`, `Fade Content`, `Scroll Stack`, and
`Glare Hover`; Magic UI `Scroll Progress`; and Aceternity `Sticky Scroll
Reveal` are rejected for this batch. Do not copy, install, retain, or
substitute them.

## Source-First Rule

Use the selected public component or demonstration source as the mechanical
foundation. Public availability plus obtainable code is sufficient; do not add
a licensing investigation or approval gate.

WO-024 records an immutable revision and SHA-256 for every repository-backed
source and captures the exact published code used from provider/article-only
sources. Every adapted source file must contain an `Adapted from` header with
the canonical URL, revision or capture date, source path, and original hash.

Custom code is limited to:

- semantic wrappers and typed project data;
- portfolio styling and responsive composition;
- adapters into the shared scroll, scene, route, and WebGL owners;
- lifecycle, cleanup, accessibility, and failure handling;
- connective choreography between the selected source mechanics.

Do not hand-build an approximation, silently select a similar component, copy
demo content, or adopt a provider's visual design.

## Portfolio Visual-System Lock

Every route uses the portfolio's Geist type, tokens, grid, gutters, surfaces,
spacing, radii, focus treatment, header, and semantic case-study primitives.
Approved project screenshots, video, and marks may appear as evidence, but the
page shell must never imitate the Aegis interface or introduce an Aegis-only
palette, dashboard bezel, shield, iris, or risk-console skin.

## Runtime Ownership

WO-025 installs exact direct dependencies after WO-024 records their source contract:

```text
motion@12.43.0
lenis@1.3.25
```

It also pins the selected `@bsmnt/scrollytelling` version or immutable source
snapshot after verifying compatibility with React 19 and the existing GSAP.

- One root Lenis instance owns smooth native document scrolling.
- GSAP/ScrollTrigger owns authored scroll timelines and receives Lenis updates
  through one integration point.
- BSMNT supplies the case-study scene composition and cleanup boundary; it does
  not create a second scroll or render owner.
- Motion owns D-011 layout, presence, and interaction-state transitions.
- Exactly one managed case-study WebGL context owns D-008's media cylinder and
  reactive particles.
- CSS owns simple visual transitions and D-013 perspective styling.
- No component may create another Lenis instance, root Motion `useScroll`,
  global ticker, page RAF, nested scroller, input observer, or WebGL context.

## Forced Authored Motion

The website has no reduced-motion presentation path.

- Mount `MotionConfig reducedMotion="never"` once.
- Remove active `prefers-reduced-motion` CSS/JavaScript and the legacy motion
  preference hook.
- Do not suppress, shorten, replace, or statically restage D-006–D-014 based on
  an operating-system motion preference.

Capability and lifecycle controls remain mandatory: no JavaScript, unavailable
WebGL, Save-Data, mobile performance limits, hidden tabs, offscreen work,
runtime failure, and context loss must remain safe. They are not alternate
motion designs.

## Content and Evidence Lock

- Preserve all twelve Batch 03 sections and their heading order.
- Do not add copy, metrics, diagrams, claims, project outcomes, or unpublished
  project previews to fit a component.
- Preserve all six approved Aegis assets byte-for-byte and use `object-fit:
  contain` at their inspection states.
- `entry-intro.mp4` retains native controls, poster, `muted`, `playsInline`, and
  `preload="metadata"`; never autoplay, loop, or scrub playback.
- Essential prose, media captions, map labels, controls, and destinations stay
  semantic and server rendered outside WebGL.

## Dependency Order

```text
WO-023 Batch 03 Release Review
  └─ WO-024 Component Source Register
       └─ WO-025 Motion Runtime and Forced-Motion Migration
            └─ WO-026 BSMNT Case-Study Scene Foundation (D-006)
                 └─ WO-027 Cinematic WebGL Hero and Kinetic Entrance (D-008, D-009)
                      └─ WO-028 Narrative Aperture and Chapter Handoffs (D-010)
                           └─ WO-029 Chapter Instrument (D-011)
                                └─ WO-030 Decision Panel Choreography (D-012)
                                     └─ WO-031 Evidence Media Choreography (D-013)
                                          └─ WO-032 Closing Scene and Route Exit (D-014)
                                               └─ WO-033 Visual Integration Release Review
```

Run sequentially. These orders deliberately share scene timelines and
composition files; parallel implementation is forbidden.

## Work Order Index

| ID | Work Order | Primary output |
| --- | --- | --- |
| WO-024 | [Component Source Register](./WO-024-component-source-register.md) | Immutable D-006 and D-008–D-014 source register |
| WO-025 | [Motion Runtime and Forced-Motion Migration](./WO-025-motion-runtime-forced-motion.md) | One Motion/Lenis owner and forced-motion policy |
| WO-026 | [BSMNT Case-Study Scene Foundation](./WO-026-case-study-scene-foundation.md) | Geometry-derived D-006 scene manager |
| WO-027 | [Cinematic WebGL Hero and Kinetic Entrance](./WO-027-aegis-cinematic-webgl-hero.md) | Shared D-008 environment and D-009 route entrance |
| WO-028 | [Narrative Aperture and Chapter Handoffs](./WO-028-narrative-aperture-chapter-handoffs.md) | Persistent D-010 evidence aperture and chapter composition |
| WO-029 | [Chapter Instrument](./WO-029-case-study-chapter-instrument.md) | Motion-powered D-011 reading orientation and navigation |
| WO-030 | [Decision Panel Choreography](./WO-030-aegis-decision-panel-choreography.md) | D-012 angular decision sequence |
| WO-031 | [Evidence Media Choreography](./WO-031-aegis-evidence-media-choreography.md) | D-013 deterministic 3D media stages |
| WO-032 | [Closing Scene and Route Exit](./WO-032-case-study-closing-route-exit.md) | D-014 reversible destination morph and guarded navigation |
| WO-033 | [Visual Integration Release Review](./WO-033-aegis-visual-integration-release-review.md) | Full source, truth, browser, lifecycle, visual-delta, and performance gate |

## Mandatory Reading

1. This batch index.
2. [`WO-STATUS.md`](WO-STATUS.md).
3. [`IMPLEMENTATION-SPEC.md`](IMPLEMENTATION-SPEC.md).
4. [`../../design/batch-04-aegis-visual-decisions.md`](../../design/batch-04-aegis-visual-decisions.md).
5. [`BATCH-03-README.md`](BATCH-03-README.md).
6. [`../../content.md`](../../content.md).
7. [`../../aegis-case-study-content.md`](../../aegis-case-study-content.md).
8. [`../../aegis-case-study-evidence.md`](../../aegis-case-study-evidence.md).
9. [`../../aegis-case-study-media.md`](../../aegis-case-study-media.md).
10. The assigned Work Order and every completed prerequisite handoff.

## Batch Completion Rule

Batch 04 is complete only when WO-033 records `GO` and is `DONE`. Passing unit
tests is insufficient. The final review must prove a substantial visual and
compositional transformation, source-mechanic fidelity, one-owner runtime
discipline, readable evidence, portfolio-style continuity, and no special
hierarchy for Aegis.
