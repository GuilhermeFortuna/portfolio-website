# WO-042 — Resume Timeline and Navigation Integration

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-042 row is
`READY`.

## Result to Produce

A premium, responsive technical-dossier presentation for the two semantic
resume routes, centered on a locally adapted Aceternity Timeline, plus an active
Resume/Currículo entry in the existing site header. The result must preserve
WO-041's complete no-JavaScript reading experience and introduce no new runtime
dependency.

## Prerequisites

- WO-041 `DONE`, committed, and frozen at a named commit.

## Branch and Files

Create `wo/wo-042-resume-timeline-navigation` from the accepted WO-041
integration base.

```text
src/components/resume/resume-timeline.tsx              (new)
src/components/resume/resume-page.tsx
src/components/layout/site-header.tsx
src/content/site.ts
src/app/globals.css
src/components/resume/__tests__/resume-timeline.test.tsx (new)
src/components/layout/__tests__/site-header.test.tsx
src/content/__tests__/site.test.ts
src/lib/__tests__/i18n.test.ts
src/app/__tests__/resume-page.test.tsx
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not change resume facts, PDFs, metadata, sitemap code, package manifests,
homepage section composition, WebGL infrastructure, or any Work/case-study
surface. If WO-041 content is wrong, return the finding rather than fixing it in
this visual order.

## External Source and Interface

Canonical source: `https://ui.aceternity.com/components/timeline`.

Inspect the free registry source and its current license/attribution terms before
copying. Retrieve to a temporary directory or use a read-only registry view;
do not run an installer that rewrites project configuration. The adapted local
surface is intentionally narrower:

```ts
// src/components/resume/resume-timeline.tsx
export type ResumeTimelineProps = {
  entries: readonly ResumeExperience[];
  sectionLabel: string;
  sectionTitle: string;
};

export function ResumeTimeline(props: ResumeTimelineProps): ReactNode;
```

The component may use `motion/react` and the existing
`useMotionPreference`; it must not import another animation or intersection
library.

## Fixed Visual Direction

- **Register:** precise technical dossier, not a second homepage hero and not a
  paper résumé floating on a generic glass card.
- **Signature:** one thin accent chronology beam that fills with reading
  progress on desktop. It is decorative and `aria-hidden`; dates and order stay
  available in text.
- **Hero:** compact editorial identity block below the fixed header, with clear
  role/summary, availability, and the PDF actions. No WebGL or stock portrait.
- **Capabilities:** quiet token-based groups with wrapping tags; tags are plain
  text, not buttons.
- **Experience:** reverse chronology with a sticky period column only at
  `lg` and above. Mobile is one natural document column with no sticky dates.
- **Remaining sections:** structured two-column reading grid where content
  permits, collapsing to one column without reorder on small screens.
- **Motion:** existing duration/easing tokens; no entrance animation scatter.
  Reduced motion renders the complete static line and removes progress-linked
  transforms.
- **Surfaces:** existing canvas/surface/line/accent tokens only. Do not add a
  new palette, font, global radius, or shadow system.

## Navigation Contract

- Desktop adds `Resume` / `Currículo` after Contact and before the language
  switcher, rendered as a restrained outlined pill rather than the reserved
  Liquid Metal CTA.
- The narrow mobile list becomes `Work` plus a visually compact `CV` route
  link. Its accessible name is `Resume` in English and `Currículo` in
  Portuguese. Contact remains available in the homepage section and footer.
- On `/resume` and `/pt-BR/resume`, the route link has
  `aria-current="page"`. Homepage section items continue to use the existing
  section-current behavior; no route may expose two current links.
- The language switcher continues to derive the alternate route from the
  pathname; no resume-specific switch handler is added.
- The header must fit without clipping at 320px. Do not solve overflow by
  hiding the language switcher or shrinking touch targets below the established
  control baseline.

## Implementation Decisions

- Adapt only the timeline from Aceternity because the existing header, buttons,
  typography, tokens, and layout primitives already own the rest of the visual
  language; importing more components would turn the route into a catalog.
- Keep the scroll-progress calculation inside the client timeline leaf because
  the page/content should remain a Server Component and render fully before
  hydration.
- Use document-order semantic lists independently of visual positioning because
  sticky columns and decorative progress must never determine screen-reader
  order.
- Disable sticky chronology below `lg` because short mobile viewports otherwise
  obscure role headings and create overlapping labels.
- Extend navigation data minimally with an optional accessible/compact label if
  needed; do not introduce a second nav model solely for one route.
- Record provenance and license verification in the existing ledger because
  external source ownership is a release property, not a source comment alone.

## Ordered Implementation

1. Record the dirty worktree, create the branch, fetch/view the Aceternity
   Timeline source without modifying the repository, verify its license and
   dependency list, and record the exact upstream URL/retrieval date. Stop if
   free reuse cannot be verified.
2. Write failing timeline tests asserting semantic list order, visible periods,
   all highlights, decorative beam semantics, no content duplication, and a
   static reduced-motion state. Confirm failure, implement the narrow adapted
   client component with existing Motion, confirm pass, and commit.
3. Write failing page tests for the hero/actions, capability groups, enhanced
   experience chronology, remaining section order, and unchanged PDF/contact
   URLs. Confirm failure, apply the dossier layout and token-based styles,
   confirm pass, and commit.
4. Write failing header tests for desktop labels/URLs, mobile `Work` + `CV`,
   localized accessible names, route `aria-current="page"`, section-current
   regression, keyboard reachability, and exactly one current link. Confirm
   failure, implement the minimal navigation extension, confirm pass, and
   commit.
5. Update component provenance with source, retrieval/license result,
   dependency delta, and every material adaptation. Confirm no new package or
   lockfile delta, then commit.
6. Exercise both locales at 1730×900, 1440×900, 1024×768, 375×780, and
   320×700 with motion allowed and reduced. Verify keyboard order, sticky/non-
   sticky transitions, 200% zoom, long labels, header fit, PDF actions, language
   switching, and zero overflow. Capture desktop and mobile evidence.
7. Run the full validation and both build modes. Commit only verified
   corrections, freeze the final commit, move WO-042 to `REVIEW`, and stop;
   WO-043 requires owner acceptance/`DONE` before dispatch.

## Automated Checks

```bash
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
NEXT_OUTPUT=export pnpm run build
git diff --check
git diff -- package.json pnpm-lock.yaml pnpm-workspace.yaml
rg -n "react-pdf|embedpdf|pdfjs|from ['\"]framer-motion|/work/aegis" src/components/resume src/content/resume.ts src/app/\(en\)/resume src/app/\[lang\]/resume
```

The manifest diff and prohibited-dependency/cross-link search must be empty.
The literal PDF asset paths are allowed; embedded PDF components are not.

## Manual Checks

- 1730×900, 1440×900, 1024×768, 375×780, and 320×700.
- Motion allowed and `prefers-reduced-motion: reduce`.
- Keyboard-only, visible focus, native link activation, and 200% zoom.
- `/resume` → `/pt-BR/resume` → `/resume` through the real switcher.
- Header at top and scrolled states on homepage, resume, and one case study.
- JavaScript disabled: all facts, sections, contacts, and PDF actions remain.

## Acceptance Checklist

- [ ] The adapted component traces to the verified free Aceternity source.
- [ ] No new dependency, PDF renderer, WebGL effect, or animation runtime is
      introduced.
- [ ] Experience is semantic, reverse chronological, and complete without
      animation or JavaScript.
- [ ] Reduced motion is static and mobile uses no sticky period column.
- [ ] Desktop and mobile navigation match the fixed labels and destinations.
- [ ] Route and section active states are mutually correct and accessible.
- [ ] Both locale switches preserve `/resume` and select matching content/PDF.
- [ ] Header, long content, 200% zoom, and all required viewports have zero
      horizontal overflow or obscured focus.
- [ ] WO-041 content and public assets are unchanged.
- [ ] Tests, coverage, lint, typecheck, normal/static builds, and diff checks
      pass.

## Handoff

Report the WO-041 base commit, canonical source and verified license terms,
source-to-local adaptations, dependency/manifest diff, test and coverage totals,
all viewport and reduced-motion results, header current-state matrix, locale/
PDF switch result, screenshots, every deviation, and the final freeze commit for
WO-043.
