# Batch 01 — Fixed Implementation Specification

Canonical location: `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.

## 1. Authority

This file locks the implementation decisions for Batch 01. Work Order agents may solve code-level issues, but they may not redesign the result.

`docs/content.md` is authoritative for all visible copy, facts, links, navigation labels, and metadata. If this file or a Work Order conflicts with `docs/content.md`, use `docs/content.md`.

The visual thesis is:

**Precise software emerging from fluid computational depth.**

The result must be dark, restrained, technical, spacious, and editorial. It must not resemble a game landing page, neon cyberpunk interface, generic glass-card dashboard, or collection of disconnected component demos.

## 2. Fixed Application Structure

Use this structure. A Work Order may create only the subset assigned to it.

```text
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    effects/
      dotted-surface.tsx
      line-waves.tsx
      scroll-reveal.tsx
      shape-blur.tsx
      sparkles.tsx
    layout/
      section-shell.tsx
      site-header.tsx
      site-footer.tsx
    sections/
      about-section.tsx
      contact-section.tsx
      hero-section.tsx
      process-section.tsx
      project-showcase.tsx
      selected-work-section.tsx
    ui/
      liquid-metal-link.tsx
      logo-loop.tsx
  content/
    projects.ts
    site.ts
  hooks/
    use-effect-activity.ts
    use-motion-preference.ts
  lib/
    cn.ts
  types/
    content.ts
```

Do not create `components/common`, `components/shared`, or alternate section directories.

## 3. Fixed Page Order and IDs

`src/app/page.tsx` must render this order:

```tsx
<>
  <SiteHeader />
  <main id="main-content">
    <HeroSection />          // id="top"
    <SelectedWorkSection />  // id="work"
    <ProcessSection />       // id="process"
    <AboutSection />         // id="about"
    <ContactSection />       // id="contact"
  </main>
  <SiteFooter />
</>
```

Do not add, remove, rename, or reorder sections in Batch 01.

## 4. Fixed Content

Put site strings and verified links in `src/content/site.ts`; put project records in `src/content/projects.ts`.

The approved homepage implementation is the content contract committed in `ca6ccf0`. Preserve:

- Hero: approved identity, disciplines, support copy, `Explore my work` → `#work`, and verified GitHub action.
- Page order: Hero → Work → Process → About → Contact.
- Process sequence: `IDEA → ARCHITECTURE → AGENTS → IMPLEMENTATION → TESTING → DEPLOYMENT`.
- About: both approved bio paragraphs, time-zone wording, availability, GitHub, and WakaTime.
- Contact: approved manifesto, CTA, `Brazil`, availability, email, LinkedIn, and GitHub.
- Footer: `© 2026 Guilherme.`
- Homepage metadata from `docs/content.md`.

Do not render résumé or project actions until their URLs are verified. Do not put `[REQUIRED: …]` markers in rendered or bundled content.

## 5. Fixed Tokens

Define these values in `:root` and consume them through CSS variables:

```css
:root {
  --color-canvas: #06070a;
  --color-surface: #0c0f14;
  --color-surface-strong: #111620;
  --color-text: #f3f6fb;
  --color-text-muted: #9ba6b5;
  --color-text-dim: #667083;
  --color-line: rgba(166, 177, 197, 0.16);
  --color-line-strong: rgba(184, 195, 216, 0.28);
  --color-accent-a: #8ea0ff;
  --color-accent-b: #68d7c5;
  --color-accent-c: #b49cff;
  --color-focus: #d5dcff;

  --radius-sm: 0.5rem;
  --radius-md: 0.875rem;
  --radius-lg: 1.25rem;
  --radius-pill: 999px;

  --content-wide: 74rem;
  --content-reading: 46rem;
  --page-gutter: clamp(1.25rem, 4vw, 3rem);
  --section-space: clamp(6rem, 12vw, 10rem);

  --duration-fast: 160ms;
  --duration-medium: 320ms;
  --duration-slow: 700ms;
  --ease-standard: cubic-bezier(0.22, 1, 0.36, 1);
}
```

No Work Order may introduce another blue, green, purple, white, black, radius, easing, or duration value unless it is an alpha variation derived from these tokens.

## 6. Fixed Typography

- Geist Sans: body, headings, navigation.
- Geist Mono: eyebrow labels, project indices, process stages, and CTA labels.
- Hero title: `clamp(3rem, 8vw, 7.5rem)`, line-height `0.94`, weight `560`, letter-spacing `-0.055em`.
- Section title: `clamp(2.25rem, 5vw, 4.75rem)`, line-height `1`, weight `540`, letter-spacing `-0.04em`.
- Manifesto: `clamp(2rem, 4.5vw, 4rem)`, line-height `1.12`, weight `450`, letter-spacing `-0.035em`.
- Body large: `clamp(1.0625rem, 1.5vw, 1.25rem)`, line-height `1.65`.
- Eyebrow: `0.6875rem`, line-height `1`, weight `600`, letter-spacing `0.14em`, uppercase.

Do not use all-uppercase text outside eyebrow labels, wordmark, and compact technical metadata.

## 7. Fixed Layout

- Header height: `4.5rem`.
- Main content maximum width: `74rem`.
- Reading text maximum width: `46rem`.
- Hero minimum height: `100svh`.
- Every non-hero section uses `padding-block: var(--section-space)`.
- Desktop begins at `1024px`.
- Tablet is `768px–1023px`.
- Mobile is below `768px`.
- Never create horizontal scrolling.
- Touch targets must be at least `44px` in both dimensions.

## 8. Fixed Header

- Position absolute over the hero, top `0`, width `100%`, z-index above effects.
- Left: wordmark.
- Right desktop links in order: `Work`, `Process`, `About`, `Contact`.
- Right mobile links: `Work`, `Contact`.
- No hamburger menu in Batch 01.
- Add a skip link as the first focusable element. It targets `#main-content`.

## 9. Fixed Motion Policy

Every continuous effect receives an `active` boolean.

`active` is true only when all are true:

- the effect container intersects the viewport
- `document.visibilityState === "visible"`
- reduced motion is not requested

Use `useEffectActivity(ref)` to implement this shared policy.

Reduced motion:

- no requestAnimationFrame loops
- no pointer-reactive distortion
- no infinite marquee movement
- no scrubbed text rotation or blur
- no particle movement
- no animated 3D dotted surface
- preserve the same layout with static CSS or static rendered content

Mobile:

- cap WebGL/canvas device pixel ratio at `1.25`
- disable pointer interaction
- Shape Blur is not mounted
- other effects may run only when their Work Order explicitly permits it

## 10. Fixed Component Boundaries

- Effect files are Client Components.
- Section files remain Server Components unless state is essential.
- `project-showcase.tsx` may be a Client Component.
- `page.tsx`, `layout.tsx`, and content files must not use `"use client"`.
- Decorative canvases use `aria-hidden="true"` and `pointer-events: none`.
- Essential content must remain in semantic HTML outside canvases.

## 11. Fixed Project Presentation

The Selected Work layout is not open.

Desktop:

- two-column grid: `5fr 7fr`, gap `clamp(2rem, 5vw, 5rem)`
- left column contains four full-width project selector buttons
- right column contains one sticky visual stage with `top: 8rem`, aspect ratio `4 / 3`
- the first project is active on initial render
- clicking or focusing a selector changes the active project
- pointer hover may change the active project only on fine pointers
- all project name, category, and summary text remains visible in the left list

Mobile and tablet:

- single column
- no sticky stage
- no Shape Blur
- each project is a bordered content row
- the active-state interaction is unnecessary; all four rows remain equally visible

The visual stage uses abstract, non-factual diagrams:

- Aegis: a 7×5 dot matrix with three highlighted nodes.
- Q: three thin horizontal plot lines with one moving-marker position represented statically.
- gosigapp: three boxes labeled `UPLOAD`, `VALIDATE`, `SUBMIT`, connected left to right.
- Nexo Dental: a 4×3 appointment grid with one accent cell and a centered crosshair.

These diagrams are decorative and use only the fixed tokens.

## 12. External Component Rule

For every locked component:

1. Use the TypeScript + Tailwind source variant when available.
2. Copy the component into the exact local path assigned by its Work Order.
3. Copy component source, not demo/preview markup.
4. Install only dependencies required after adaptation.
5. Remove source demo colors, dimensions, headings, backgrounds, and example content.
6. Preserve a comment at the top with the canonical source URL.
7. Do not import a component from a hosted package at runtime.

## 13. Stop Conditions

Stop and report `blocked` instead of guessing if:

- prerequisite files do not exist
- a prerequisite changed a required public API
- an external source cannot be accessed
- the source license prohibits the intended local use
- verified contact information is required but absent
- required validation fails because of unrelated pre-existing changes

Missing contact information does not block the prototype: use the exact `contactPending` copy and render no fake link.
