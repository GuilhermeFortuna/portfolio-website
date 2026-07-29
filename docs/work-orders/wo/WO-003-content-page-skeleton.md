# WO-003 — Content and Page Skeleton

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-003 row is `READY`.

## Result to Produce

A semantic, static homepage containing the approved `docs/content.md` copy, verified links, project data, navigation, section order, and simple placeholders that later Work Orders replace.

## Prerequisites

- WO-002
- `SectionShell`, fixed tokens, and both shared hooks must exist.

## Files to Create or Modify

```text
src/app/page.tsx
src/components/layout/site-header.tsx
src/components/layout/site-footer.tsx
src/components/sections/about-section.tsx
src/components/sections/contact-section.tsx
src/components/sections/hero-section.tsx
src/components/sections/process-section.tsx
src/components/sections/project-showcase.tsx
src/components/sections/selected-work-section.tsx
src/content/projects.ts
src/content/site.ts
src/types/content.ts
```

Do not modify effect or hook files.

## Procedure

### 1. Create content types

In `src/types/content.ts`, export:

```ts
export type Project = {
  slug: string;
  index: string;
  name: string;
  category: string;
  summary: string;
  href: string | null;
};

```

### 2. Create content modules

Implement the approved homepage copy and links from `docs/content.md`.

- Type `projects` with `satisfies readonly Project[]`.
- Keep project `href` values null until verified.
- Do not add metrics, dates, outcomes, screenshots, or repository links.

### 3. Create the header

`site-header.tsx` remains a Server Component.

Render:

1. A skip link with text `Skip to content` and `href="#main-content"`.
2. A `<header>` positioned according to section 8 of the implementation spec.
3. Wordmark link to `#top`.
4. Desktop navigation links:
   - `Work` → `#work`
   - `Process` → `#process`
   - `About` → `#about`
   - `Contact` → `#contact`
5. Mobile navigation links:
   - `Work` → `#work`
   - `Contact` → `#contact`

The skip link must be visually hidden offscreen until focused. Do not use `display: none`.

### 4. Create static section components

Each section must use the `SectionShell` created by WO-002.

Use these exact responsibilities:

- `HeroSection`: approved identity, disciplines, support copy, CTA to `#work`, and GitHub action.
- `SelectedWorkSection`: `id="work"`, heading, then `<ProjectShowcase projects={projects} />`.
- `ProcessSection`: `id="process"`, heading, exact sequence, and support copy.
- `AboutSection`: approved title, both bio paragraphs, time zone, availability, GitHub, and WakaTime.
- `ProjectShowcase`: plain unordered list; each item renders index, category, name, and summary.
- `ContactSection`: approved manifesto, CTA, country, availability, email, LinkedIn, and GitHub.

Do not add animation, canvas, images, icons, gradients, hover transforms, or decorative diagrams.

### 5. Create the footer placeholder

Render:

- a semantic `<footer>`
- text `© 2026 Guilherme.`
- link `Back to top` → `#top`

WO-011 will finish its styling.

### 6. Compose the page

Copy the exact composition from section 3 of `docs/work-orders/wo/IMPLEMENTATION-SPEC.md`.

`page.tsx` must:

- remain a Server Component
- contain no content strings
- contain no data mapping
- contain no client hook
- only import and compose the header, section, and footer components

### 7. Check semantic output

Required heading structure:

```text
h1 I build ambitious software systems.
  h2 Work
    h3 Aegis
    h3 Q
    h3 gosigapp
    h3 Nexo Dental
  h2 From difficult idea to working system.
  h2 Software Engineer · AI, Data & Product Systems
  h2 Let’s build something difficult.
```

## Forbidden Changes

- No fabricated personal name, email, social link, outcome, metric, or project URL
- No lorem ipsum
- No external component
- No `"use client"` outside a pre-existing shared hook
- No hamburger menu
- No project card/chapter design
- No local replacement for fixed tokens

## Automated Checks

```bash
npm run lint
npm run typecheck
npm run build
```

## Manual Checks

- Tab once from the address bar and confirm the skip link appears.
- Activate the skip link and confirm focus moves to main content.
- Activate every navigation link and confirm the correct target.
- Disable JavaScript and confirm all copy and four projects remain visible.
- Inspect the heading outline against the required structure.

## Acceptance Checklist

- [ ] Approved `docs/content.md` copy is centralized in content files.
- [ ] Exact four project records render.
- [ ] Verified profile and contact actions render; résumé and unverified project links do not.
- [ ] Page order and IDs match the implementation spec.
- [ ] Header desktop and mobile link sets match the specification.
- [ ] There is one `h1`.
- [ ] Project names are `h3` elements.
- [ ] No unverified links or claims are present.
- [ ] The page works without JavaScript.
- [ ] Lint, type-check, and build pass.
