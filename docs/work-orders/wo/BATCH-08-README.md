# Portfolio Website — Work Orders, Batch 08

## Purpose

Transform the already-published bilingual Resume from a polished document into
the approved **Career Operating System**: a cinematic, scroll-directed story in
which identity resolves, capabilities orbit a technical core, career chapters
move through an editorial track, selected projects stack into evidence, and the
closing paths converge on the existing contact and PDF actions.

This is an adaptation batch, not a component-invention exercise. Every dominant
interaction starts from an inspectable, free/public source and is reduced to the
smallest interface that fits this portfolio's content, tokens, accessibility,
and existing motion runtime.

## Scope Boundary

In scope: the two Resume routes, Resume-only components and styles, the existing
Resume navigation enhancement, free-source component provenance, motion and
resilience tests, responsive browser verification, and an independent release
review.

Out of scope: changing resume facts or PDFs; changing homepage or case-study
composition; adding employer/project claims; linking the Resume's Aegis wording
to `/work/aegis`; introducing a new smooth-scroll, animation, or WebGL runtime;
and copying, purchasing, reverse-engineering, or approximating a paid component.

## Approved Visual Direction

The owner approved this composition on **2026-09-08**:

1. **Identity resolution** — adapt 21st.dev's public Scroll Choreography into a
   typographic/data-plate hero. The plates converge into the existing name,
   role, summary, availability, and PDF actions; no portrait or invented copy.
2. **System map** — adapt 21st.dev's public Radial Orbital Timeline for the six
   existing capability groups around a restrained full-stack core.
3. **Career chapters** — adapt 21st.dev's public Horizontal Feature Reveal so
   vertical reading drives a horizontal desktop story for the two employers.
4. **Proof stack** — adapt 21st.dev's public Stacking Cards for the existing
   Quant and Nexo Dental project evidence already present in the Resume copy.
5. **Connective navigation** — adapt Aceternity's free Tracing Beam and
   21st.dev's public Dynamic Island TOC into one Resume chapter rail.
6. **Convergence** — adapt Aceternity's free Google Gemini Effect so the visual
   paths resolve into the existing PDF and contact actions.
7. **Fallback document** — retain the current Aceternity-derived semantic
   timeline as the mobile, reduced-motion, no-JavaScript, and failure fallback.

This direction is intentionally more ambitious than Batch 07 while remaining a
single authored narrative. Use one dominant effect per viewport; do not present
the route as a catalog of unrelated demos.

## Source Policy

Only sources whose implementation is publicly inspectable and free to adapt may
enter the product. The canonical candidates are:

| Role | Public source |
| --- | --- |
| Identity choreography | `https://21st.dev/@componentry/components/scroll-choreography` |
| Capability system map | `https://21st.dev/@jatin-yadav05/components/radial-orbital-timeline` |
| Career chapters | `https://21st.dev/@hyperiux/components/horizontal-feature-reveal` |
| Proof stack | `https://21st.dev/@danielpetho/components/stacking-cards` |
| Chapter navigation | `https://21st.dev/@digitalzone0707/components/dynamic-island-toc` |
| Reading trace | `https://ui.aceternity.com/components/tracing-beam` |
| Closing convergence | `https://ui.aceternity.com/components/google-gemini-effect` |

React Bits Pro and every other paywalled/private-source component are excluded.
If a listed public source becomes unavailable or cannot be inspected, WO-044
must record a free replacement and obtain owner acceptance before implementation.

## Runtime and Content Invariants

- Reuse the root `MotionRuntime`, Lenis/GSAP ScrollTrigger bridge, MotionConfig,
  motion preference hook, and managed effect lifecycle already in the site.
- Do not initialize another Lenis instance, global scroll listener system,
  animation library, or WebGL canvas.
- Render the complete Resume content in semantic document order before
  hydration. Animation may transform presentation, never gate information.
- Both locales use the same scene model but retain their exact approved copy.
- Desktop may pin, orbit, reveal, and stack. Mobile and 200% zoom must remain a
  natural single-column document with no horizontal reading requirement.
- Reduced motion removes progress-linked transforms and autoplay; no-JavaScript
  renders the complete current dossier/timeline experience.
- Preserve all Batch 07 privacy, contact, PDF-integrity, localization, and
  `/work/aegis` separation rules.

## Mandatory Reading

1. This batch index and [`WO-STATUS.md`](WO-STATUS.md).
2. [`BATCH-07-README.md`](BATCH-07-README.md) and the accepted WO-040 contract.
3. The completed WO-041/WO-042 handoffs and WO-043 release verdict.
4. [`IMPLEMENTATION-SPEC.md`](IMPLEMENTATION-SPEC.md),
   [`../../content.md`](../../content.md), and
   [`../../component-provenance.md`](../../component-provenance.md).
5. The assigned Work Order and every completed prerequisite handoff.

Workers begin by recording `git status --short`, the accepted base commit, and
manifest hashes. Preserve unrelated work and touch only the assigned scope plus
the status ledger.

## Dependency Order

```text
WO-043 Batch 07 Resume Release GO
  └─ WO-044 Career OS Component and Choreography Contract
       └─ WO-045 Resume Scene Runtime and Chapter Navigation
            └─ WO-046 Identity Resolution and Capability Orbit
                 └─ WO-047 Career Chapter Reveal
                      └─ WO-048 Project Proof Stack and Convergence
                           └─ WO-049 Responsive, Accessible Integration Polish
                                └─ WO-050 Career OS Integration and Release Review
```

Do not dispatch these orders in parallel. Each order freezes a public interface
and browser behavior consumed by the next. WO-050 reviews a named frozen commit
and does not silently repair implementation defects.

## Work Order Index

| ID | Work Order | Primary output |
| --- | --- | --- |
| WO-044 | [Career OS Component and Choreography Contract](./WO-044-career-os-component-contract.md) | Exact source snapshots, scene/content map, adaptation interfaces, budgets, and acceptance contract |
| WO-045 | [Resume Scene Runtime and Chapter Navigation](./WO-045-resume-scene-runtime-navigation.md) | Shared Resume scene shell, chapter progress, tracing beam, and dynamic TOC |
| WO-046 | [Identity Resolution and Capability Orbit](./WO-046-resume-identity-capability-orbit.md) | Scroll-resolved hero and accessible orbital capability system |
| WO-047 | [Career Chapter Reveal](./WO-047-resume-career-chapter-reveal.md) | Desktop horizontal career narrative with complete semantic fallback |
| WO-048 | [Project Proof Stack and Convergence](./WO-048-resume-proof-stack-convergence.md) | Stacked project evidence and Gemini-inspired closing payoff |
| WO-049 | [Responsive, Accessible Integration Polish](./WO-049-resume-integration-polish.md) | Unified pacing, responsive fallbacks, performance controls, and browser evidence |
| WO-050 | [Career OS Integration and Release Review](./WO-050-resume-career-os-release-review.md) | Independent content, accessibility, motion, browser, performance, and provenance gate |

## Shared Prohibitions

- Do not use React Bits Pro or any paid/private implementation, even as a visual
  tracing target. Do not create a near-copy intended to evade that restriction.
- Do not invent new resume content, metrics, employers, dates, skills, or project
  relationships to feed an animation.
- Do not hide content behind hover, pointer position, animation completion, or
  successful client hydration.
- Do not create sideways page overflow, scroll-jacking, nested vertical scroll,
  autoplay that cannot be stopped, or sticky behavior on narrow/short viewports.
- Do not duplicate headings or long descriptions solely for animation; one
  semantic source must drive both enhanced and fallback presentations.
- Do not introduce a new palette, font, radius, shadow language, or generic
  glass-card field. Adapt every source through the existing design tokens.
- Do not add another global provider, Lenis instance, GSAP registration, Motion
  configuration, animation dependency, or unmanaged requestAnimationFrame loop.
- Do not change the source/public PDFs, public contact boundary, route metadata,
  or the Resume-to-Work confidentiality boundary without a new owner decision.

## Batch Completion Rule

Batch 08 is complete only when WO-044 is owner-accepted, WO-049 is committed at
a named freeze commit, and WO-050 records `GO` with the full bilingual browser,
accessibility, resilience, performance, and provenance evidence. A striking
desktop capture or a passing build alone is not acceptance.
