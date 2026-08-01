# Portfolio Website — Work Orders, Batch 04

## Purpose

Enhance Aegis, the portfolio's first case-study route, with premium motion,
scrollytelling, and visual depth while establishing reusable presentation
patterns for every later project page.

Aegis is the first case study and receives no higher editorial or visual status than
Q, gosigapp, or Nexo Dental. Every completed project case study must ultimately
carry roughly equal navigational prominence, production care, and visual weight.

This batch enhances presentation only. Batch 03's approved copy, claims,
section order, media, confidentiality boundary, route metadata, and homepage
links remain authoritative.

## Portfolio Visual-System Lock

The portfolio owns the visual language of every case-study route. A project may
supply evidence—screenshots, video, product marks, and factual diagrams—but it
must not reskin the page shell around its own product identity.

Every Batch 04 component must use the portfolio's existing:

- canvas, surface, line, text, and accent tokens from `globals.css`;
- Geist Sans and Geist Mono typography;
- content widths, gutters, spacing scale, radii, focus treatment, and header;
- shared WebGL manager, native page scroll, and motion lifecycle;
- case-study shell, media, semantic section, and navigation conventions.

Do not introduce an Aegis-only typeface, palette, dashboard chrome, shield/iris
motif, amber risk theme, instrument-panel skin, or page-level imitation of the
Aegis product UI. A later project must be able to reuse the same visual
primitives by supplying different approved content and media.

## Source-First Component Rule

Visual components are sourced, then adapted. Do not invent a background shader,
reveal system, sticky-story component, progress indicator, or media effect from
scratch.

Custom code is allowed only for:

- semantic wrappers and content mapping;
- TypeScript interfaces and route-local state;
- adapters into the shared WebGL manager and effect-activity lifecycle;
- token normalization, responsive composition, and accessibility repairs;
- cleanup, tests, and integration between sourced components.

The implementation agent must preserve an `Adapted from` comment with the
canonical URL and pinned source revision in every copied component. A public
source with obtainable component code is sufficient for use.

## Locked Component Shortlist

Use these sources unless WO-024 proves a source-access or compatibility blocker. A
blocker stops the batch for an owner decision; an agent may not silently replace
the component or hand-build an approximation.

| Visual role | Locked source | Canonical URL | Adaptation boundary |
| --- | --- | --- | --- |
| Case-study WebGL background | React Bits `Threads` | https://www.reactbits.dev/backgrounds/threads | Preserve the upstream OGL shader and line behavior; route it through `ManagedWebGLEffect`, manager DPR/activity, and portfolio tokens. |
| Hero entrance groups | React Bits `Animated Content` | https://www.reactbits.dev/animations/animated-content | Preserve its GSAP/ScrollTrigger entrance mechanic; use existing semantic hero groups and portfolio spacing/type. |
| Section entrances and closing | React Bits `Fade Content` | https://www.reactbits.dev/animations/fade-content | Preserve the one-shot GSAP reveal; no new bespoke section observer. |
| Reading progress | Magic UI `Scroll Progress` | https://magicui.design/docs/components/scroll-progress | Adapt the visual indicator to consume the route's single progress value; portfolio tokens and native scroll remain authoritative. |
| Architecture scrollytelling | Aceternity UI `Sticky Scroll Reveal` | https://ui.aceternity.com/components/sticky-scroll-reveal | Preserve the sourced sticky text/visual composition; replace demo content and styling with the semantic Aegis map and portfolio system. |
| Decision-chapter stacking | React Bits `Scroll Stack` | https://www.reactbits.dev/components/scroll-stack | Preserve the sourced stack transforms; remove its private Lenis instance and consume the portfolio's shared Lenis owner. |
| Evidence-media highlight | React Bits `Glare Hover` | https://www.reactbits.dev/animations/glare-hover | Preserve the sourced glare mechanic; apply only to real evidence media with token colors and existing radii. |

React Bits sources are pinned initially to repository revision
`b9158acb37e7bdfd6c5bc5894da1826fe1d05a6b`. WO-024 records exact file hashes
for reproducibility. Magic UI and Aceternity sources receive the same
revision/hash treatment before use.

## Motion Runtime Ownership

WO-024 installs and pins:

```text
motion@12.43.0
lenis@1.3.25
```

Their responsibilities are fixed:

- Motion owns state-driven transitions, layout animation, presence, hover/tap,
  and the internals required by accepted Magic UI and Aceternity components.
- GSAP/ScrollTrigger owns authored timelines and React Bits components that
  already use GSAP.
- Lenis owns smooth document scrolling through exactly one root instance. It
  feeds GSAP's ticker and the shared case-study progress state.
- CSS owns simple color, opacity, border, and focus transitions.
- WebGL animation remains owned by `WebGLManager`/`ManagedWebGLEffect`.

No component may create another Lenis instance, root `useScroll` subscription,
global ticker, page-level requestAnimationFrame loop, or alternate scroll
container. Motion must be wrapped in `MotionConfig reducedMotion="never"` to
enforce the owner's forced-motion policy.

## Locked Motion Decision

Owner decision, 2026-07-31: this website has **no reduced-motion path**.

- Ignore `prefers-reduced-motion` in CSS and JavaScript.
- Do not suppress, shorten, replace, or statically restage an effect because the
  operating system requests reduced motion.
- Remove the existing reduced-motion hook and every reduced-motion branch from
  homepage and case-study behavior in WO-024.
- All visitors receive the same authored motion sequence.

Capability and lifecycle fallbacks still apply. No JavaScript, unavailable
WebGL, failed media, a hidden tab, an offscreen effect, Save-Data, mobile cost
limits, and a lost WebGL context are not reduced-motion variants. They must
remain safe and readable.

## Non-Negotiable Product Rules

- `docs/content.md` and the WO-018/WO-020 contracts remain authoritative for
  visible words and claims. Do not add marketing copy, metrics, labels, or
  outcomes to make a sourced component demo fit.
- Preserve semantic server-rendered content and the existing heading order.
- Do not hide essential prose, diagrams, captions, links, or controls behind
  animation or JavaScript.
- Do not change, regenerate, crop away, or recolor the six approved Aegis media
  assets.
- Do not copy demo copy, demo imagery, demo colors, typography, radii, icons, or
  layout chrome from an upstream component.
- Lenis wraps native document scrolling; browser position, sticky positioning,
  anchors, keyboard scrolling, and history remain authoritative.
- Do not add nested smooth-scroll containers, per-component Lenis instances, or
  CSS `scroll-behavior: smooth` on top of Lenis.
- The case study may own one WebGL context. It must register with the shared
  manager, pause when hidden, release on route exit, and never change the
  homepage's cost budget.
- Mobile gets the same narrative, media, section order, and authored motion. It
  may use a designed non-WebGL rendering because of the fixed mobile budget.

## Mandatory Reading

1. This batch index.
2. [`WO-STATUS.md`](WO-STATUS.md).
3. [`IMPLEMENTATION-SPEC.md`](IMPLEMENTATION-SPEC.md).
4. [`BATCH-03-README.md`](BATCH-03-README.md).
5. [`../../content.md`](../../content.md).
6. [`../../aegis-case-study-content.md`](../../aegis-case-study-content.md).
7. [`../../aegis-case-study-evidence.md`](../../aegis-case-study-evidence.md).
8. [`../../component-provenance.md`](../../component-provenance.md).
9. The assigned Work Order and every completed prerequisite handoff.

## Dependency Order

```text
WO-023 Batch 03 Release Review
  └─ WO-024 Source Snapshot, Forced-Motion Policy, and Experience Foundation
       └─ WO-025 Sourced Threads Background and Cinematic Hero
            └─ WO-026 Sourced Progress and Section Choreography
                 └─ WO-027 Sourced Sticky System-Map Scrollytelling
                      └─ WO-028 Sourced Decision and Evidence Choreography
                           └─ WO-029 Visual Integration and Release Review
```

Run the batch sequentially. The orders deliberately touch adjacent composition
files; parallel execution would create conflicting motion ownership.

## Work Order Index

| ID | Work Order | Primary output |
| --- | --- | --- |
| WO-024 | [Source Snapshot, Forced-Motion Policy, and Experience Foundation](./WO-024-forced-motion-aegis-experience-foundation.md) | Reproducible source register, site-wide policy migration, and route-local motion state |
| WO-025 | [Sourced Threads Background and Cinematic Hero](./WO-025-aegis-signal-field-cinematic-hero.md) | Managed React Bits Threads background and sourced hero entrances |
| WO-026 | [Sourced Progress and Section Choreography](./WO-026-aegis-narrative-rail-section-choreography.md) | Magic UI progress, shared navigation, and React Bits reveals |
| WO-027 | [Sourced Sticky System-Map Scrollytelling](./WO-027-aegis-system-map-scrollytelling.md) | Aceternity sticky composition with semantic map content |
| WO-028 | [Sourced Decision and Evidence Choreography](./WO-028-aegis-decision-evidence-choreography.md) | Shared decision pacing and React Bits evidence treatment |
| WO-029 | [Visual Integration and Release Review](./WO-029-aegis-visual-integration-release-review.md) | Provenance, parity, browser, lifecycle, accessibility, visual, and performance gate |

## Batch Completion Rule

Batch 04 is complete only when WO-029 records `GO` and is `DONE`. A visually
impressive Aegis capture is not completion: the reviewer must also prove source
fidelity, portfolio-style continuity, reusable case-study boundaries, and no
special hierarchy or visual status for Aegis.
