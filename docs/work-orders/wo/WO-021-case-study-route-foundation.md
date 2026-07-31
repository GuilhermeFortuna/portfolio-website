# WO-021 — Shared Case-Study Route Foundation

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-021 row is
`READY`.

## Result to Produce

A typed, server-rendered, reusable case-study foundation and a valid
`/work/aegis` route shell that consumes only the approved WO-020 contract.

## Prerequisites

- WO-020 `DONE`

## Files to Create or Modify

```text
src/types/case-study.ts
src/content/case-studies/aegis.ts
src/content/case-studies/index.ts
src/components/case-study/case-study-shell.tsx
src/components/case-study/case-study-hero.tsx
src/components/case-study/case-study-section.tsx
src/components/case-study/case-study-media.tsx
src/app/work/aegis/page.tsx
src/content/site.ts
src/app/__tests__/aegis-page.test.tsx
src/content/__tests__/case-studies.test.ts
docs/work-orders/wo/WO-STATUS.md
```

Do not modify the homepage project interaction in this order.

## Fixed Architecture

- Use the static route `src/app/work/aegis/page.tsx`; do not introduce a
  database, CMS, MDX runtime, catch-all route, or client router.
- The page and layout components are Server Components.
- `CaseStudyMedia` may be a minimal client leaf only when native video state
  requires it. No animation library is added.
- `CaseStudy` is a typed authored-content object, not arbitrary HTML. It must
  represent metadata, hero facts, context, system summary, decisions,
  contribution, result, technologies, media, confidentiality note, and actions.
- Use existing tokens, typography, `SiteHeader`, `SiteFooter`, and page gutters.
- Route navigation targets the homepage with root-relative fragments:
  `/#work`, `/#process`, `/#about`, and `/#contact`.
- The route main element has `id="main-content"` and a top anchor. Skip link,
  heading order, focus visibility, and 44px targets remain valid.
- Export static Next.js metadata from the approved `/work/aegis` title and
  description in `docs/content.md`.
- Render no `[REQUIRED: ...]` marker and no content fallback that invents copy.

## Visual Foundation

- Maximum reading width: `var(--content-reading)`.
- Maximum wide/media width: `var(--content-wide)`.
- Page uses the existing canvas color and section spacing.
- Hero contains breadcrumb/back action, category, title, one approved support
  paragraph, and role/period/status facts.
- Sections use semantic headings and ordinary document flow.
- Media uses native aspect ratios and existing radii/line tokens.
- No sticky cinematic, scroll hijack, parallax, WebGL, decorative video
  background, or auto-advancing carousel.

## Procedure

1. Create the narrow `CaseStudy` types required by the approved Aegis content.
   Do not generalize for hypothetical future fields.
2. Author `aegis.ts` by transcribing the exact approved WO-020 copy and media
   filenames. Add runtime-free tests that reject required markers, empty
   sections, duplicate decision IDs, invalid media paths, and unapproved
   external/source links.
3. Implement the shared shell and section primitives using semantic HTML and
   existing tokens.
4. Implement `CaseStudyMedia` with `<picture>`/`<img>` for screenshots and a
   native `<video>` for the intro. The intro is not autoplayed in this order;
   provide controls, poster, `preload="metadata"`, and the approved accessible
   summary.
5. Create `/work/aegis` with static metadata, header, main content, and footer.
6. Change global site navigation fragments to root-relative homepage fragments
   so navigation works from both routes. Preserve labels and order.
7. Add tests for metadata, landmark/heading order, skip link target, homepage
   navigation destinations, private-source behavior, and absence of forbidden
   placeholders.
8. Confirm the route's server-rendered HTML contains the approved title,
   description, semantic content, image paths, and no source repository link.

## Automated Checks

```bash
npm run test
npm run lint
npm run typecheck
npm run build
git diff --check
```

After the build, inspect generated `/work/aegis` HTML without executing
JavaScript.

## Manual Checks

- 1440×900, 1024×768, 768×1024, and 375×780.
- Keyboard-only traversal from skip link through page actions.
- JavaScript disabled: full text, screenshots, video poster, and navigation
  remain available.
- Browser back, wordmark, Work, Contact, and footer return paths.
- No horizontal overflow at 200% zoom.

## Acceptance Checklist

- [ ] `/work/aegis` is statically rendered from typed approved content.
- [ ] Shared primitives remain narrow and reusable.
- [ ] No new dependency or visual runtime is added.
- [ ] Header/footer navigation works from homepage and case-study route.
- [ ] Native video is controlled, poster-first, and not autoplayed.
- [ ] Metadata and server HTML are complete without JavaScript.
- [ ] Semantic, keyboard, responsive, zoom, and overflow checks pass.
- [ ] Tests and repository validation pass.

## Handoff

Include created type fields, route/server-render evidence, metadata values,
navigation changes, viewport and keyboard results, dependency delta, tests
added, and the exact enhancement seams available to WO-022.
