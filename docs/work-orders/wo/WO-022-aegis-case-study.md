# WO-022 — Aegis Case-Study Implementation

## Status

See `[WO-STATUS.md](WO-STATUS.md)`. Dispatch only when the WO-022 row is
`READY`.

## Result to Produce

A polished Aegis case study that makes the production system, end-to-end
ownership, engineering decisions, and custom motion identity understandable,
then connects the homepage's Aegis entry to the route.

## Prerequisites

- WO-021 `DONE`

## Files to Create or Modify

```text
src/app/work/aegis/page.tsx
src/components/case-study/case-study-shell.tsx
src/components/case-study/case-study-hero.tsx
src/components/case-study/case-study-section.tsx
src/components/case-study/case-study-media.tsx
src/components/case-study/aegis-system-map.tsx
src/components/sections/project-showcase.tsx
src/content/projects.ts
src/content/site.ts
src/app/__tests__/aegis-page.test.tsx
src/app/__tests__/page.test.tsx
src/components/sections/__tests__/project-showcase.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Modify `src/content/case-studies/aegis.ts` only to correct a transcription
error against the approved WO-020 contract. Do not rewrite approved copy.

## Fixed Page Composition

```text
Site header
Case-study hero
Entry-intro media with production-pipeline explanation
Context and confidentiality
System map
Four engineering decisions with assigned screenshots
Contribution
Delivered result
Technology in context
Confidentiality note
Previous/return/contact actions
Site footer
```



## System Map Contract

`AegisSystemMap` is semantic HTML/CSS, not canvas or handcrafted SVG. It shows:

```text
Investigator UI
  → FastAPI services
    → PostgreSQL operational/curated data
    → Databricks analytical data
    → Redis cache
Databricks → scheduled sync/detection jobs → PostgreSQL/cache refresh
```

Use only labels accepted by WO-018. Provide an accessible text equivalent.
Do not show internal hosts, schemas, company names, or invented throughput.

## Media Behavior

- The intro belongs inside the case study, never as a site-wide gate.
- Poster and controls are visible before playback.
- Default: no autoplay.
- If an optional muted in-view preview is implemented, it may run only when
motion is allowed, the video is intersecting, the document is visible, and
Save-Data is off; controls remain available and cleanup is complete.
- Reduced motion and Save-Data must keep the poster and make zero automatic
media play attempts.
- Screenshots use accurate alt text when informative and empty alt only when an
adjacent passage fully duplicates their information.



## Homepage Integration

- Change only Aegis `href` to `/work/aegis`; Q, gosigapp, and Nexo Dental remain
`null`.
- Keep desktop project selectors as buttons. When Aegis is active, show one
visible `View Aegis case study` link after the summary; do not nest a link in
a button.
- Mobile Aegis article includes the same link after its summary.
- Other projects render no disabled link, fake route, or placeholder action.
- Change the hero `Explore my work` destination to `/work/aegis` as already
approved in `docs/content.md`.
- Preserve homepage section order and all existing visual effects.



## Procedure

1. Compare the route against the exact WO-020 content/media map.
2. Complete the fixed page composition using the WO-021 primitives.
3. Implement the bounded system map and accessible equivalent.
4. Place the four approved screenshots beside their assigned decisions. Do not
  crop away evidence needed by the text.
5. Implement the intro behavior and motion/Save-Data/document-visibility policy.
6. Add homepage Aegis links using the fixed integration contract.
7. Record the media and component provenance. No new third-party dependency is
  expected.
8. Extend tests for media policy, Aegis-only actions, hero destination, route
  composition, accessible labels, and null behavior for the other projects.
9. Manually review full forward reading flow and navigation at all required
  viewports before handing off.



## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
```



## Manual Checks

- 1440×900, 1280×800, 1024×768, 768×1024, and 375×780.
- Motion allowed, reduced motion, and Save-Data.
- Keyboard-only, screen-reader landmark/heading pass, and 200% zoom.
- JavaScript disabled.
- Intro play/pause/replay, offscreen pause if preview exists, hidden-tab
behavior, route exit cleanup, and browser back.
- Homepage Aegis active/inactive states and every non-Aegis null action.



## Acceptance Checklist

- [ ] The route follows the fixed composition and approved copy exactly.
- [ ] Every project visual explains adjacent content.
- [ ] Intro behavior is controlled, accessible, bounded, and never a global
  ```
  transition.
  ```
- [ ] System map is truthful, semantic, and responsive.
- [ ] Homepage and hero link to Aegis without changing other project behavior.
- [ ] No unsupported claim, company identity, sensitive data, or source link is
  ```
  exposed.
  ```
- [ ] Reduced-motion, Save-Data, keyboard, no-JS, zoom, and viewport checks pass.
- [ ] No new dependency or extra visual runtime is introduced.
- [ ] Tests, coverage, lint, type-check, build, and diff checks pass.



## Handoff

Include route screenshots, intro-policy evidence, Aegis-only homepage behavior,
system-map source mapping, accessibility and viewport results, test/coverage
results, dependency/provenance result, and every deviation from the contract.
