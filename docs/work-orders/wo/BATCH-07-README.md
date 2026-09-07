# Portfolio Website — Work Orders, Batch 07

## Purpose

Publish Guilherme's approved English and Brazilian Portuguese resumes as a
recruiter-first web experience at `/resume` and `/pt-BR/resume`, with the
original one-page PDFs available to view and download. The page extends the
portfolio's existing bilingual, cinematic design system while deliberately
using a calmer editorial register for fast hiring review.

The visual centerpiece is an adapted free Aceternity Timeline. The source is a
starting point, not a finished design: it must be normalized through the
portfolio's tokens, semantic HTML, reduced-motion behavior, and responsive
layout. The batch adds no PDF viewer, second animation system, or WebGL effect.

## Scope Boundary

In scope: bilingual resume content, publication of the approved PDFs, localized
routes and metadata, site navigation, the sitewide public-contact email,
responsive timeline presentation, provenance, and release verification.

Out of scope: rewriting the PDFs, adding a CMS, embedding a PDF renderer,
changing homepage composition, changing case-study claims, or connecting a
resume employment entry to any `/work/*` case study.

## Locked Owner Facts

Recorded from the owner on **2026-09-07**. Workers consume these as approved
`FACT — OWNER` inputs and must not reopen them as design questions.

1. The two PDFs in `docs/` are final, public, and require no redaction.
2. `BRXBET` and `RICOBET` may be named on resume surfaces and in the resume
   PDFs. The existing confidentiality boundary remains unchanged on Work and
   case-study surfaces.
3. Resume content may reproduce the PDF's `Aegis Fraud Intelligence` wording,
   but it must not link to `/work/aegis`, call it the same portfolio case study,
   or otherwise add a cross-surface connection between that employment entry
   and the Work chapter.
4. The public contact email is `guilhermefortuna.dev@gmail.com`. Replace the
   old public portfolio address in rendered site content and its tests; do not
   rewrite infrastructure notification addresses in deployment records.
5. The phone number `+55 48 99181-4229` is approved for the resume web routes
   and PDFs. It is not a new homepage Contact action.
6. The web resume preserves the PDFs' facts while editing labels and grouping
   for scanning. Missing claims, dates, employers, metrics, certifications, or
   sections must never be invented.
7. Only free-source components may be used. Paid React Bits Pro source is not
   required or permitted by this batch.

## Authoritative Resume Sources

| Locale | Source file | Size | SHA-256 |
| --- | --- | ---: | --- |
| English | `docs/Guilherme_Fortuna_Resume.pdf` | 97,520 bytes | `e3c7365bec0dfb606e4338b2879a9dec736d27a4f4a7f11632d6753fbea6464c` |
| Portuguese | `docs/Guilherme_Fortuna_Curriculo_PT-BR.pdf` | 85,816 bytes | `a330b61f75d390f31acc44405294098ad6956733b0fb505e403b674375bb53bd` |

Both are one-page US Letter PDFs. They contain no JavaScript, forms, or
encryption. Neither is tagged, so the semantic web rendering is the accessible
primary experience; the PDFs remain downloadable source documents.

## Mandatory Reading

1. This batch index.
2. [`WO-STATUS.md`](WO-STATUS.md).
3. [`IMPLEMENTATION-SPEC.md`](IMPLEMENTATION-SPEC.md).
4. [`../../content.md`](../../content.md).
5. [`../../FOUNDATIONAL-IDEA.txt`](../../FOUNDATIONAL-IDEA.txt),
   [`../../portfolio-component-blueprint.md`](../../portfolio-component-blueprint.md),
   and [`../../component-provenance.md`](../../component-provenance.md).
6. The assigned Work Order and every completed prerequisite handoff.

Workers must begin with `git status --short`, preserve the current unrelated
changes to `package.json`, `pnpm-lock.yaml`, and `pnpm-workspace.yaml`, and
touch only their assigned scope plus the status ledger.

## Dependency Order

```text
WO-040 Resume Content and Publication Contract
  └─ WO-041 Resume Route Foundation and PDF Assets
       └─ WO-042 Resume Timeline and Navigation Integration
            └─ WO-043 Resume Integration and Release Review
```

Do not run the orders in parallel. WO-040 freezes facts and visible copy;
WO-041 turns that contract into semantic routes; WO-042 adapts the external
component without owning content; WO-043 reviews a named frozen commit.

## Work Order Index

| ID | Work Order | Primary output |
| --- | --- | --- |
| WO-040 | [Resume Content and Publication Contract](./WO-040-resume-content-publication-contract.md) | Owner-approved bilingual web copy, source manifest, and route-scoped disclosure rules |
| WO-041 | [Resume Route Foundation and PDF Assets](./WO-041-resume-route-foundation.md) | Typed content, static localized routes, public PDFs, actions, metadata, sitemap, and email migration |
| WO-042 | [Resume Timeline and Navigation Integration](./WO-042-resume-timeline-navigation-integration.md) | Adapted Aceternity chronology, responsive dossier presentation, and active Resume navigation |
| WO-043 | [Resume Integration and Release Review](./WO-043-resume-integration-release-review.md) | Independent content, privacy, browser, accessibility, metadata, asset, and performance gate |

## Shared Prohibitions

- Do not add any link, callout, or metadata connecting the resume's Aegis
  employment bullet to `/work/aegis`.
- Do not weaken the Work/case-study confidentiality rules merely because the
  resume route may publish employer and brand names.
- Do not change the two source PDFs or delete them from `docs/`; publish
  byte-identical copies under stable public filenames.
- Do not add `react-pdf`, EmbedPDF, PDF.js, an iframe, or a browser-native
  embedded PDF surface. Use ordinary view and download links.
- Do not add WebGL, another animation library, another smooth-scroll runtime,
  a portrait, decorative stock media, or an additional dominant effect.
- Do not install a paid component or a whole UI kit. The Aceternity source may
  be inspected through its registry, then adapted locally using dependencies
  already present.
- Do not place the phone number outside the two resume routes or their PDFs.
- Do not rewrite deployment/billing notification emails as part of the public
  contact-email migration.
- Do not place draft markers, internal notes, or unsupported claims in rendered
  content, metadata, or public assets.

## Batch Completion Rule

Batch 07 is complete only when WO-040's exact bilingual copy is owner-approved,
WO-042 is committed at a named freeze commit, and WO-043 records `GO`. Passing a
build or completing the timeline alone is not release acceptance.
