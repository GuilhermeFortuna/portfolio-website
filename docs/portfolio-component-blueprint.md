# Portfolio Component Blueprint

## Status

This document locks the component set for the first complete homepage prototype. Do not add more visual-effect components until the assembled page has been evaluated in context.

## Visual Thesis

**Precise software emerging from fluid computational depth.**

The interface should feel technical, atmospheric, and cinematic without drifting into gaming, cyberpunk, or generic developer-portfolio clichés. External components are starting points: each must be normalized through the same design tokens, typography, surfaces, spacing, and motion grammar.

## Locked Components

| Order | Component | Source | Location | Role | Priority |
| --- | --- | --- | --- | --- | --- |
| 1 | [Line Waves](https://reactbits.dev/backgrounds/line-waves) | React Bits | Hero | Primary background and defining visual identity | Foundational |
| 2 | [Liquid Metal Button](https://21st.dev/@johuniq/components/liquid-metal-button) | 21st.dev | Hero | Primary CTA: **Explore my work** | Primary interaction |
| 3 | [Scroll Reveal](https://reactbits.dev/text-animations/scroll-reveal) | React Bits | About / manifesto | Narrative typography reveal | Primary motion |
| 4 | [Logo Loop](https://reactbits.dev/animations/logo-loop) | React Bits | Process | Display the approved engineering sequence | Functional content |
| 5 | [Sparkles](https://21st.dev/@manuarora700/components/sparkles) | 21st.dev | Selected Work introduction | Localized transition and heading accent | Supporting effect |
| 6 | [Shape Blur](https://reactbits.dev/animations/shape-blur) | React Bits | Selected Work | Interactive project accent or section transition | Supporting interaction |
| 7 | [Dotted Surface](https://21st.dev/@sshahaider/components/dotted-surface) | 21st.dev | Contact / outro | Final atmospheric scene above the footer | Closing visual |

## Page Composition

### 1. Hero

Components:

- [Line Waves](https://reactbits.dev/backgrounds/line-waves)
- [Liquid Metal Button](https://21st.dev/@johuniq/components/liquid-metal-button)

Purpose:

- Establish the portfolio’s identity immediately.
- Present the primary positioning statement.
- Lead directly to the selected projects.

Adaptation:

- Use a restrained custom palette rather than the component default.
- Reduce wave speed and distortion.
- Preserve dark negative space behind the headline.
- Keep cursor interaction subtle.
- Style the CTA as dark chrome using colors derived from Line Waves.
- Reduce the button’s glow and fluid speed.
- Use Geist Mono for the CTA label.
- Provide a static metallic fallback for reduced-motion and constrained devices.
- Reserve this button style for the primary CTA only.

### 2. About / Manifesto

Component:

- [Scroll Reveal](https://reactbits.dev/text-animations/scroll-reveal)

Purpose:

- Introduce the professional narrative through controlled typography.
- Establish the site-wide text-motion grammar.

Adaptation:

- Use for the opening manifesto or About copy, not the hero headline.
- Reduce `baseRotation` from the example value of `8` to approximately `2–3`.
- Keep blur subtle.
- Use restrained reveal timing and generous negative space.
- Pair with large Geist Mono typography.

### 3. Process

Component:

- [Logo Loop](https://reactbits.dev/animations/logo-loop)

Purpose:

- Display the approved sequence: **IDEA → ARCHITECTURE → AGENTS → IMPLEMENTATION → TESTING → DEPLOYMENT**.
- Turn the engineering process into a useful, continuous visual element without making unsupported technology claims.

Adaptation:

- Use restrained text wordmarks with small token-based accent markers.
- Keep movement slow and legible.
- Avoid brand logos and brand-color noise.
- Pause or reduce movement during direct interaction.
- Ensure the content remains accessible without animation.

### 4. Selected Work Introduction

Component:

- [Sparkles](https://21st.dev/@manuarora700/components/sparkles)

Purpose:

- Transition from the hero into the four featured projects.
- Add emphasis beneath the **Selected Work** heading.

Adaptation:

- Use as a thin, localized horizontal particle field—not a section background.
- Use low density, low opacity, and slow movement.
- Inherit the Line Waves palette.
- Remove the default bright-blue gradient.
- Fade quickly into negative space.
- Render only one instance on the page.

### 5. Selected Work

Component:

- [Shape Blur](https://reactbits.dev/animations/shape-blur)

Purpose:

- Add interaction or transitions to the project presentation.
- Give the project section a distinct behavior without introducing another full background.

Initial projects:

1. **Aegis** — Fraud intelligence and analysis for the iGaming industry.
2. **Q** — Quantitative research and execution system.
3. **gosigapp** — Go pipeline for file submission to SIGAP.
4. **Nexo Dental** — AI-first software for dental clinics.

Adaptation:

- Use around project transitions, hover states, or the active project—not behind the entire section.
- Keep the geometry subordinate to project content.
- Reuse the global palette and motion easing.
- Avoid persistent high-intensity blur.
- Disable or simplify the effect on mobile and reduced-motion modes.

The exact project-card or project-chapter layout remains open and should be resolved during the integrated prototype.

### 6. Contact / Outro

Component:

- [Dotted Surface](https://21st.dev/@sshahaider/components/dotted-surface)

Purpose:

- Create the final scene above the footer.
- Resolve the visual narrative by transforming the hero’s continuous waves into discrete particles.
- Support the contact CTA without competing with it.

Adaptation:

- Use a shallow horizon rather than a full-screen background.
- Keep opacity low and movement slow.
- Reuse the Line Waves palette.
- Add a strong top fade into negative space.
- Stop rendering while offscreen.

## Motion Hierarchy

| Level | Component | Behavior |
| --- | --- | --- |
| Dominant | Line Waves | Defines the hero and overall atmosphere |
| Primary | Scroll Reveal | Defines narrative text motion |
| Functional | Logo Loop | Communicates the engineering process |
| Supporting | Sparkles | Marks a single section transition |
| Supporting | Shape Blur | Responds to project interaction |
| Closing | Dotted Surface | Provides a restrained final scene |
| Tactile | Liquid Metal Button | Emphasizes the single primary CTA |

Rules:

- Allow only one dominant visual effect per viewport.
- Use one shared easing system and a small duration scale.
- Effects must support content hierarchy rather than become the content.
- Offscreen animated effects should stop rendering.
- Every animated component requires a reduced-motion state.
- Mobile variants may simplify or replace GPU-heavy effects.
- Treat WebGL as a managed resource. Line Waves, Liquid Metal, Shape Blur, and Dotted Surface must register with one shared lifecycle and budget manager.

## Component Integration Rules

- Treat every external component as source material, not a finished design.
- Remove default colors, typography, spacing, radii, shadows, and gradients.
- Route all styling through shared design tokens.
- Normalize interaction states: default, hover, focus-visible, active, and disabled.
- Preserve keyboard navigation and semantic HTML.
- Test component composition before polishing components individually.
- Measure GPU load, frame consistency, bundle cost, and mobile behavior.
- Reject any effect that weakens readability or competes with Line Waves.
- Never scatter third-party WebGL components directly through sections. Wrap them behind the shared managed interface controlling near-viewport mounting, visibility, DPR, pausing, fallback, and cleanup.

## Explicitly Excluded

### [Laser Flow](https://reactbits.dev/animations/laser-flow)

Do not include it in the initial prototype. It would introduce a second dominant visual effect that competes with Line Waves. Reconsider only if the visual direction changes or Line Waves is removed.

## Prototype Scope

Build one complete vertical homepage with real portfolio content:

1. Hero — Line Waves + Liquid Metal Button
2. Selected Work introduction — Sparkles
3. Selected Work — Shape Blur
4. Process — Logo Loop
5. About — Scroll Reveal
6. Contact / outro — Dotted Surface

During integration, lock:

- Palette and semantic color tokens
- Typography hierarchy
- Spacing and layout grid
- Section transitions
- Motion durations and easing
- Project presentation pattern
- Mobile and reduced-motion behavior
- GPU and performance budgets

## Acceptance Criteria

The first prototype is successful when:

- The homepage reads as one intentional design rather than a component showcase.
- Line Waves clearly anchors the visual language.
- Project content remains the main focus after the hero.
- No viewport contains competing dominant effects.
- All seven selected components have a clear, non-overlapping role.
- The experience remains usable with reduced motion.
- Desktop performance is smooth and mobile has an intentional simplified mode.
