# WO-039 — Nexo Dental Hiring-Focused Content Revision

## Status

See [`WO-STATUS.md`](WO-STATUS.md). This order remains `REVIEW` until the owner
accepts the exact bilingual copy. WO-038 stays blocked until WO-039 is `DONE`.

## Result to Produce

A recruiter-first revision of `/work/nexo-dental` for senior product-engineering
roles. The chapter must make founder-level ownership, product judgment, security
boundaries, clinical modelling, human-reviewed AI, and full-stack execution clear
without inventing usage or business outcomes.

WO-036 and `docs/nexo-dental-case-study-content.md` remain immutable historical
records. This order creates the successor contract
`docs/nexo-dental-case-study-content-v2.md`.

## Prerequisites

- WO-034 through WO-037 `DONE`
- WO-035 media manifest unchanged
- Owner-approved direction recorded 2026-08-05: senior product engineer;
  restructure the narrative; complete English and Brazilian Portuguese; real
  product-opportunity framing; general contact CTA only

## Files to Create or Modify

```text
docs/nexo-dental-case-study-content-v2.md
docs/content.md
docs/work-orders/wo/BATCH-06-README.md
docs/work-orders/wo/WO-038-nexo-dental-integration-release-review.md
docs/work-orders/wo/WO-039-nexo-dental-hiring-content-revision.md
docs/work-orders/wo/WO-STATUS.md
package.json
pnpm-lock.yaml
src/content/case-studies/nexo-dental.ts
src/content/__tests__/case-studies.test.ts
src/app/__tests__/nexo-dental-page.test.tsx
```

Do not change shared components, the `CaseStudy` type, route composition, media
files, or another project chapter.

## Dependency Change

The owner authorized repository-local Playwright installation during WO-039.
Add `@playwright/test` as a development dependency and install its matching
Chromium runtime. Do not add a second browser automation library.

## Fixed Content Shape

Use the existing `CaseStudy` fields in this order:

1. Hero: founder-built proposition, ownership, state, private source, disabled
   live-environment control.
2. `origin`: one patient record, three ways of working.
3. `tourIntro`: role-native product boundary.
4. Reception tour: `agenda.webp`, `whatsapp-inbox.webp`, `fila.webp`.
5. Clinical tour: `patient-workspace.webp`, `odontogram.webp`,
   `clinical-timeline.webp`.
6. Management tour: `financial-ledger.webp`.
7. Architecture after the product tour.
8. Three decisions: forced RLS; structured odontogram domain; AI behind a human
   decision boundary.
9. End-to-end personal ownership.
10. Implementation evidence and honest current limits.
11. Technology badges, with no stack-list paragraph.
12. Private-source and synthetic-data closing with general contact actions.

Keep all eight WO-036 media paths. `orcamento.webp` and `reports.webp` remain
reserved.

## Evidence and Writing Rules

- Claims remain bounded by `docs/nexo-dental-case-study-evidence.md`.
- The current source counts must be rechecked before publication: 50 backend
  `test_*.py` files and 134 frontend `*.test.ts*` files on 2026-08-05.
- Do not name or paraphrase any competitor or incumbent.
- Do not claim production readiness, adoption, clinic/patient volume, uptime,
  load performance, reliability, or business impact.
- Do not describe AI as making autonomous clinical, communication, or financial
  decisions. A person reviews and acts.
- Remove source-repository Work Order terminology from visible copy.
- Keep English hero support at or below 55 words, each decision below 120 words,
  and English prose between 850 and 1,000 words excluding metadata, actions,
  alt text, captions, and badges.
- Brazilian Portuguese must be fully authored: headings, body, facts, metadata,
  alt text, captions, disabled state, and actions may not inherit English copy.

## Automated Checks

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
rg -in "simples dental|incumbent|replaces|replacement for" src/content/case-studies/nexo-dental.ts docs/content.md
rg -n "\[REQUIRED:|\[CONFIDENTIAL:" src/content/case-studies/nexo-dental.ts docs/nexo-dental-case-study-content-v2.md
```

The two searches must return zero matches in the WO-039-authored Nexo content.

## Rendered Review

Verify `/work/nexo-dental` and `/pt-BR/work/nexo-dental` at desktop and mobile
widths. Confirm correct title and locale, meaningful server-rendered content,
eight images, no framework overlay, no relevant console warnings/errors, the
disabled live control, and language switching that preserves the route.

The 15-second hiring scan passes only if the first viewport and opening sections
answer: what the product is, who it serves, what Guilherme owned, and why the
engineering demonstrates senior judgment.

## Acceptance Checklist

- [ ] The v2 contract and `docs/content.md` agree with the typed content.
- [ ] English uses the fixed recruiter-first structure and word budget.
- [ ] Brazilian Portuguese is complete and idiomatic with no English fallback.
- [ ] Exactly three decisions are present and each is evidence-backed.
- [ ] Eight existing media assets are preserved; no asset or component changed.
- [ ] Private-source, synthetic-data, and disabled-environment boundaries remain.
- [ ] Content, page, locale-parity, media, link, and prohibited-claim tests pass.
- [ ] Lint, typecheck, production build, and `git diff --check` pass.
- [ ] Playwright Chromium verifies both locales at 1440×900 and 375×780.
- [ ] Desktop/mobile rendered QA passes in both locales.
- [ ] Owner accepts the exact bilingual copy before WO-039 moves from `REVIEW`
      to `DONE` and WO-038 becomes `READY`.
