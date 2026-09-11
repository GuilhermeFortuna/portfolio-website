# WO-041 — Resume Route Foundation and PDF Assets

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-041 row is
`READY`.

## Result to Produce

Semantic, server-rendered English and Brazilian Portuguese resume routes using
the exact WO-040 contract, plus byte-identical public PDF assets, localized
view/download/contact actions, metadata, hreflang alternates, sitemap entries,
and the approved sitewide public-email migration. This order delivers a fully
usable content-first page before WO-042 adds the timeline enhancement.

## Prerequisites

- WO-040 `DONE`, owner-approved, and frozen at a named commit.

## Branch and Files

Create `wo/wo-041-resume-route-foundation` from the accepted WO-040 integration
base.

```text
public/resume/guilherme-fortuna-resume-en.pdf          (new)
public/resume/guilherme-fortuna-resume-pt-BR.pdf       (new)
src/types/resume.ts                                    (new)
src/content/resume.ts                                  (new)
src/components/resume/resume-page.tsx                  (new)
src/app/(en)/resume/page.tsx                           (new)
src/app/[lang]/resume/page.tsx                         (new)
src/content/site.ts
src/lib/seo.ts
src/content/__tests__/resume.test.ts                   (new)
src/app/__tests__/resume-page.test.tsx                 (new)
src/content/__tests__/site.test.ts
src/lib/__tests__/seo.test.ts
src/lib/__tests__/i18n.test.ts
docs/work-orders/wo/WO-STATUS.md
```

Do not modify the header, global styles, motion runtime, Work content,
case-study components, or package manifests. WO-042 owns presentation and
navigation.

## Interfaces Produced

```ts
// src/types/resume.ts
export type ResumeLink = {
  label: string;
  href: string;
  kind: "email" | "phone" | "website" | "github" | "linkedin";
};

export type ResumeSkillGroup = {
  label: string;
  items: readonly string[];
};

export type ResumeExperience = {
  organization: string;
  role: string;
  period: string;
  location: string;
  highlights: readonly string[];
};

export type ResumeProject = {
  name: string;
  role: string;
  period: string;
  highlights: readonly string[];
};

export type ResumeEducation = {
  institution: string;
  program: string;
  period: string;
};

export type ResumeContent = {
  metadata: { title: string; description: string };
  identity: { name: string; role: string; summary: string };
  location: string;
  availability: string;
  links: readonly ResumeLink[];
  skills: readonly ResumeSkillGroup[];
  experience: readonly ResumeExperience[];
  projects: readonly ResumeProject[];
  education: readonly ResumeEducation[];
  languages: readonly string[];
  labels: Record<string, string>;
  pdf: { href: string; downloadName: string };
};

// src/content/resume.ts
export function getResumeContent(locale?: Locale): ResumeContent;

// src/components/resume/resume-page.tsx
export function ResumePage({ locale }: { locale: Locale }): ReactNode;
```

The exact label-key union may be made explicit rather than using a broad record,
but it must remain compile-time complete for both locales.

## Implementation Decisions

- Keep resume facts in a locale-keyed content module because the current site
  already uses that pattern and server rendering must not depend on a client
  translation runtime.
- Keep the route entrypoints thin and render one shared `ResumePage`, because
  duplicated English/Portuguese markup would let section order and semantics
  drift.
- Copy the PDFs byte-for-byte under stable public filenames because the `docs/`
  files are authoritative source artifacts and users need durable URLs.
- Use ordinary anchors for `View PDF` and `Download PDF`; the view action opens
  a new tab with `rel="noreferrer"`, while the download action uses the
  localized download filename. Do not embed the document.
- Render all resume data in native headings, lists, `<address>`, and links
  before adding motion because the page must remain complete without
  JavaScript, CSS animation, or PDF accessibility tagging.
- Keep the phone off `src/content/site.ts`; only the new resume registry owns
  it. Change the public email in `site.ts` because the owner requested a
  sitewide public-contact migration, but leave deployment records untouched.
- Add `/resume` to the existing metadata and sitemap helpers because the
  language-alternate machinery already localizes unprefixed paths correctly.

## Ordered Implementation

1. Record the dirty worktree, create the branch, and copy each source PDF to
   its fixed public filename. Confirm the source/destination SHA-256 values are
   pairwise identical, then commit the assets alone.
2. Write failing content tests asserting the fixed section counts/order,
   reverse chronology (`BRXBET & RICOBET` before `JONES SOFTWARE`; `Q` before
   `Nexo Dental`), both localized PDF paths, `tel:+5548991814229`, the approved
   email, no empty arrays, and no `/work/aegis` href. Confirm failure, implement
   the typed registry from WO-040 verbatim, confirm pass, and commit.
3. Write failing route tests asserting one `h1`, heading order, localized copy,
   all skill/experience/project/education/language items, semantic lists,
   descriptive view/download actions, external-link security attributes, and
   omission of empty optional sections. Confirm failure, implement the shared
   server page and both route entrypoints, confirm pass, and commit.
4. Write failing metadata/i18n tests for `/resume` ↔ `/pt-BR/resume`, canonical
   URLs, hreflang plus `x-default`, localized title/description, and sitemap
   inclusion. Confirm failure, extend the existing helpers, confirm pass, and
   commit.
5. Write failing public-contact tests showing both homepage locales use
   `guilhermefortuna.dev@gmail.com`, while the phone remains absent from the
   homepage. Confirm failure, perform the public-email migration, confirm pass,
   and commit without touching infrastructure documentation.
6. Build normally and with `NEXT_OUTPUT=export`; inspect generated HTML without
   JavaScript for one `h1`, ordered sections, correct localized PDF/contact
   URLs, and zero draft markers or `/work/aegis` links. Run the full gate and
   commit only any test/evidence corrections, then hand off for review.

## Automated Checks

```bash
sha256sum docs/Guilherme_Fortuna_Resume.pdf public/resume/guilherme-fortuna-resume-en.pdf
sha256sum docs/Guilherme_Fortuna_Curriculo_PT-BR.pdf public/resume/guilherme-fortuna-resume-pt-BR.pdf
pnpm run test
pnpm run test:coverage
pnpm run lint
pnpm run typecheck
pnpm run build
NEXT_OUTPUT=export pnpm run build
rg -n "guilhermefortuna1000@gmail.com" src
rg -n "href:.*work/aegis|/work/aegis" src/content/resume.ts src/components/resume src/app/\(en\)/resume src/app/\[lang\]/resume
git diff --check
```

The final two source searches must return zero matches. Historical docs and the
homepage hero's intentional `/work/aegis` action are outside those scopes.

## Acceptance Checklist

- [ ] Both public PDFs are byte-identical to the approved sources.
- [ ] Both localized routes render the WO-040 contract completely without
      requiring JavaScript.
- [ ] Typed content enforces bilingual completeness and stable section order.
- [ ] View/download, email, phone, website, GitHub, and LinkedIn actions are
      correct and accessible.
- [ ] No resume link or copy connects the employment entry to `/work/aegis`.
- [ ] Homepage email is updated in both locales; phone remains resume-only.
- [ ] Metadata, canonical, hreflang, and sitemap contracts include both routes.
- [ ] Normal and static-export builds pass without a new dependency.
- [ ] Tests, coverage, lint, typecheck, builds, and diff checks pass.

## Handoff

Report the frozen WO-040 commit, content item counts by locale, source/public PDF
hash pairs, route/static-export results, generated-HTML scan, exact public link
set, old-email and Aegis-cross-link search results, test/coverage totals,
dependency delta, and the named commit for WO-042.
