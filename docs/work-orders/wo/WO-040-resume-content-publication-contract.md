# WO-040 — Resume Content and Publication Contract

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-040 row is
`READY`.

## Result to Produce

An owner-reviewable bilingual content contract for the web resume, derived
only from the two approved PDFs. It must fix the exact visible English and
Brazilian Portuguese copy, section order, contact actions, PDF filenames,
source hashes, and route-scoped disclosure boundary before an implementation
agent publishes anything.

## Prerequisites

- The Locked Owner Facts in [`BATCH-07-README.md`](BATCH-07-README.md).
- Both authoritative PDF files exist and match the recorded hashes.

## Branch and Files

Create `wo/wo-040-resume-content-contract` from the coordinator-approved base.

```text
docs/resume-content.md                         (new)
docs/content.md
docs/work-orders/wo/WO-STATUS.md
```

The PDFs are read-only sources for this order. Do not change product code,
public assets, package manifests, or any case-study contract.

## Fixed Content Shape

The contract defines exact copy for both locales in this order:

1. Metadata title and description.
2. Hero identity: full name, localized role, location/remote overlap, summary,
   availability, email, phone, website, GitHub, and LinkedIn.
3. Six skill groups: languages; frontend and UI; backend and APIs; cloud and
   DevOps; data and AI systems; security and quality.
4. Reverse-chronological work experience: BRXBET & RICOBET, then Jones
   Software, retaining the dates, remote status, role names, and all factual
   achievement bullets from the corresponding PDF.
5. Selected software projects: Q, then Nexo Dental, retaining their independent
   status, dates, and factual bullets.
6. Education and international experience in the PDF's order.
7. Languages, including TOEFL iBT 105.
8. Localized action labels for view PDF, download PDF, email, phone, GitHub,
   LinkedIn, contact, and return to Work.

The contract may shorten repeated technology phrasing and convert dense PDF
sentences into scan-friendly bullets, but each resulting claim must map to one
source sentence. Keep `5+ years`, date ranges, `hours` to `sub-minute`/
`menos de um minuto`, production/deployed wording, and every named technology
only where the PDFs state them.

## Disclosure and Contact Rules

- Employer names and the literal `Aegis Fraud Intelligence` resume bullet are
  allowed on resume surfaces by owner decision.
- The contract must explicitly prohibit any `/work/aegis` link or prose saying
  that the resume entry is the same as the Work case study.
- Existing Work and case-study disclosure rules remain unchanged. Do not edit
  the gosigapp/Aegis chapters to reconcile them with the resume.
- Use `guilhermefortuna.dev@gmail.com` for every public portfolio contact
  surface going forward. Record the old public address as superseded, not as an
  alternate action.
- The phone is present only in resume content and uses the display form
  `+55 48 99181-4229`; its eventual link target is `tel:+5548991814229`.
- The website, GitHub, and LinkedIn URLs use the exact PDF values. No private
  repository URL is introduced.

## Procedure

1. Record the pre-existing working-tree changes, create the branch, and confirm
   both PDF hashes and one-page structure. Commit no source or asset changes.
2. Extract each PDF with layout preservation. Build a locale-to-locale fact
   matrix covering identity, contacts, summary, skills, employment, projects,
   education, languages, dates, metrics, and technologies; report every
   mismatch rather than silently choosing one.
3. Write the exact bilingual web copy and source mapping in
   `docs/resume-content.md`. Each visible block receives a source locator to the
   PDF section, not an invented evidence claim. Commit the contract draft.
4. Reconcile only the resume/contact/metadata portions of `docs/content.md`:
   mark the resume available, add `/resume` metadata, record the localized
   route and PDF policy, and replace the superseded public contact email.
   Preserve deployment addresses and all case-study chapters. Commit on a
   clean diff check.
5. Run the automated scans, report word counts and bilingual structural parity,
   and hand the exact copy to the owner. Move the order to `REVIEW`; it becomes
   `DONE` only after explicit owner acceptance and a named commit freeze.

## Automated Checks

```bash
sha256sum docs/Guilherme_Fortuna_Resume.pdf docs/Guilherme_Fortuna_Curriculo_PT-BR.pdf
pdfinfo docs/Guilherme_Fortuna_Resume.pdf
pdfinfo docs/Guilherme_Fortuna_Curriculo_PT-BR.pdf
pdftotext -layout docs/Guilherme_Fortuna_Resume.pdf -
pdftotext -layout docs/Guilherme_Fortuna_Curriculo_PT-BR.pdf -
rg -n "\[REQUIRED:|\[CONFIDENTIAL:" docs/resume-content.md
rg -n "guilhermefortuna1000@gmail.com" docs/resume-content.md docs/content.md
git diff --check
```

The two searches must return zero matches in the new resume contract and the
current public-content registry. Historical work-order evidence and deployment
records are outside this search scope.

## Acceptance Checklist

- [ ] Both PDF hashes, sizes, page counts, and language assignments are exact.
- [ ] Every visible web claim maps to the corresponding locale PDF.
- [ ] English and Portuguese contain the same facts and section structure, with
      discrepancies explicitly listed rather than hidden.
- [ ] Work, projects, education, and languages retain the approved order.
- [ ] Employer names and phone publication match the owner's 2026-09-07
      decision.
- [ ] The Aegis resume bullet has no Work-route link or cross-reference.
- [ ] `docs/content.md` records `/resume`, the new public email, and the
      route-scoped disclosure boundary without weakening any Work policy.
- [ ] No draft marker, unsupported claim, or old public email remains in the
      contract/current public-content registry.
- [ ] The owner approves the exact bilingual copy before dispatching WO-041.

## Handoff

Report both source hashes, the fact-matrix count and every mismatch, English and
Portuguese word counts, the exact public contact set, the `docs/content.md`
changes, confirmation that no case-study disclosure rule changed, automated
scan results, the owner-copy-review status, and the frozen commit consumed by
WO-041.
