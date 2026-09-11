# WO-048 — Credential Stack and Convergence

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-048 row is
`READY`.

## Result to Produce

A focused closing act built from adapted public Stacking Cards for the existing
Education and International Experience entries, followed by the existing
Languages content and a Gemini-inspired convergence toward the localized PDF,
contact, and Return to Work actions. The redundant Selected Software Projects
chapter is removed from the web Resume; the richer landing-page Work section
remains the canonical web destination for project proof.

## Prerequisites

- WO-047 `DONE`, committed, frozen, and accepted with complete career fallback.

## Branch and Files

Create `wo/wo-048-resume-proof-stack-convergence` from the accepted WO-047
base. Keep the existing branch and document filename for stable work-order
history. Expected write scope:

```text
src/components/resume/resume-page.tsx
src/components/resume/resume-credential-stack.tsx              (new)
src/components/resume/resume-convergence.tsx                   (new)
src/components/resume/__tests__/resume-credential-stack.test.tsx (new)
src/components/resume/__tests__/resume-convergence.test.tsx    (new)
src/components/resume/__tests__/resume-chapter-navigation.test.tsx
src/components/resume/__tests__/resume-scene-runtime.test.tsx
src/app/__tests__/resume-page.test.tsx
src/content/resume.ts
src/content/__tests__/resume.test.ts
src/types/resume.ts
src/app/globals.css
docs/component-provenance.md
docs/work-orders/wo/WO-STATUS.md
```

Do not change project facts on Work surfaces, source/public PDFs, case-study
claims, routes, or package manifests. Removing the web Resume project block is
an owner-approved information-architecture decision, not permission to alter
the supplied PDF resumes or the landing-page Work section.

## External Sources

- Stacking Cards:
  `https://21st.dev/@danielpetho/components/stacking-cards`
- Google Gemini Effect:
  `https://ui.aceternity.com/components/google-gemini-effect`

Use the WO-044-frozen public snapshots with existing Motion/runtime ownership.
The source roles are retargeted to credentials and closing actions; do not add
a replacement component or dependency.

## Project Omission Contract

- Remove the Selected Software Projects section from both web Resume locales,
  including its chapter wrapper, heading, navigation destination, rendered
  entries, and web-only typed content/label fields.
- Preserve the source/public PDFs byte-for-byte. Project material inside those
  owner-supplied documents is not changed by this work order.
- Do not move Resume project copy into another Resume scene or replace it with
  project teasers, cards, links, metrics, images, or decorative labels.
- Keep the existing localized Return to Work action as the path to the richer
  landing-page Work section. Do not change any Work or case-study surface.
- The Resume chapter model becomes identity → capabilities → experience →
  credentials → contact in semantic and navigation order.

## Credential Stack Contract

- The three existing Education and International Experience entries become
  restrained editorial credential cards in their existing source order, with
  institution, program, and period unchanged.
- Sticky/scale stacking is presentational. The credentials remain one ordinary
  semantic ordered list in document order; decorative layers never duplicate
  text or obscure a heading.
- Languages remain a quiet, complete semantic list after the credential stack.
  Do not force language proficiency into cards, gauges, percentages, orbit
  nodes, or invented rankings.
- No logo, seal, image, metric, credential status, location claim, or new
  chronology may be invented to fill the composition.
- Mobile, reduced motion, no-JavaScript, 200% zoom, and short viewports use a
  spaced static credential list followed by the Languages list, with no sticky
  overlap.

## Convergence Contract

- Adapt the Gemini path concept as restrained SVG/CSS linework using existing
  accent and line tokens. It is decorative, `aria-hidden`, and non-WebGL.
- Paths may visually connect the credential and language rows to the closing
  actions, but they must not imply a new qualification, proficiency, sequence,
  or causal relationship.
- The visual endpoint uses only the existing View PDF, Download PDF,
  email/contact, and Return to Work actions. All remain normal links available
  before animation or hydration.
- Reduced/static modes show a composed still or omit the decorative paths while
  retaining all education, language, and closing action content.

## Ordered Implementation

1. Record the base commit, exact localized credential/language/action content,
   URLs, chapter order, focus order, and performance baseline.
2. Write failing route/content/navigation tests for the five-chapter model,
   complete credentials and languages, removal of web Resume project fields and
   rendered project copy, unchanged PDFs/actions, and unchanged Work surfaces.
3. Write failing credential-stack tests for all three entries, unchanged
   text/order, semantic list structure, static fallback, and no invented claims.
4. Adapt stacking geometry through existing Motion and the scene runtime; prove
   deterministic space, readable headings/content, and cleanup.
5. Write failing convergence tests for complete languages/actions, ordinary
   link semantics, decorative SVG treatment, reduced/static mode, and unchanged
   PDF/contact/Work URLs.
6. Adapt the public path technique without WebGL or new packages. Start it only
   after the credential stack releases so sticky and convergence effects never
   compete.
7. Verify both locales at all required viewport/motion/JavaScript modes,
   including PDF view/download, mail and Return to Work links, repeated scroll,
   keyboard focus, and browser back/forward.
8. Run validation, measure budgets, update provenance, commit, freeze, and move
   WO-049 to `READY` only after review.

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
rg -n "three|@react-three|ogl|WebGL|canvas|/work/aegis" src/components/resume
```

The implementation must contain no WebGL/canvas path and no Aegis cross-link.
Manifest diff must be empty.

## Acceptance Checklist

- [ ] Selected Software Projects is absent from both rendered web Resume locales
      and the chapter navigation, while the supplied PDFs remain byte-identical.
- [ ] The web Resume uses the five-chapter identity → capabilities → experience
      → credentials → contact order, with the Return to Work action intact.
- [ ] All three education entries and both language entries remain complete,
      localized, ordered, and present exactly once in the accessibility tree.
- [ ] Credential stacking never hides content, traps scrolling, overlaps static
      modes, or changes document order.
- [ ] Convergence is decorative and resolves to the existing functional PDF,
      contact, and Return to Work actions.
- [ ] Mobile, short viewport, zoom, reduced motion, no-JavaScript, and failure
      behavior are complete.
- [ ] No invented credential/language claim, WebGL, dependency, global runtime,
      Resume-to-Aegis connection, or Work-surface change exists.
- [ ] Performance budgets, tests, builds, and provenance pass.

## Handoff

Report the freeze commit; project-omission and five-chapter comparison;
credential/language content fingerprint; stacking geometry; convergence
technique; action behavior; complete responsive/motion/no-JavaScript/browser
evidence; performance/bundle results; tests/builds; provenance; and integration
risks for WO-049.
