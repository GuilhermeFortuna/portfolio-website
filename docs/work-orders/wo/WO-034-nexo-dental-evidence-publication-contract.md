# WO-034 — Nexo Dental Evidence and Publication Contract

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-034 row is
`READY`. The Locked Owner Facts in
[`BATCH-06-README.md`](BATCH-06-README.md) must be recorded and confirmed by
the owner before this order may close — read them first and treat confirmed
items as `FACT — OWNER` inputs, not open questions.

## Result to Produce

A claim-level evidence register for Nexo Dental that separates verified
facts, owner decisions, safe inferences, and unsupported outcomes before any
media or public route is created — the same discipline WO-018 (Aegis),
WO-024 (Quant), and WO-029 (gosigapp) applied.

If the Batch 06 Locked Owner Facts confirm Nexo Dental as the owner's own
product (the working hypothesis — see fact 1), this register is mostly a
factual inventory, proportionate the way WO-024 kept Quant's: what the
system provably does, so the copy describes it accurately. The only
genuinely sensitive material is real clinic/patient data, credentials, and
the fact that the source is private. If the owner instead confirms this is
client or employer work, this order must be redone against the Aegis/
gosigapp confidentiality template before continuing — do not proceed past
Locked Owner Fact 1 until it is resolved.

## Prerequisites

- Batch 05 `DONE` (WO-033 `GO`)
- Locked Owner Facts recorded and confirmed in the Batch 06 index

## Files to Create or Modify

```text
docs/nexo-dental-case-study-evidence.md
docs/content.md
docs/work-orders/wo/WO-STATUS.md
```

The Nexo Dental source repositories are read-only inputs and are not in the
write scope.

## Required Source Inspection

Inspect at minimum:

```text
/home/gui/projects/nexo/dev.sh
/home/gui/projects/nexo/odonto_back/README.md
/home/gui/projects/nexo/odonto_back/pyproject.toml
/home/gui/projects/nexo/odonto_back/app/
/home/gui/projects/nexo/odonto_back/alembic/
/home/gui/projects/nexo/odonto_back/docker-compose.yml
/home/gui/projects/nexo/odonto_back/tests/
/home/gui/projects/nexo/odonto_back/docs/
/home/gui/projects/nexo/odonto_front/README.md
/home/gui/projects/nexo/odonto_front/PRODUCT.md
/home/gui/projects/nexo/odonto_front/package.json
/home/gui/projects/nexo/odonto_front/src/
/home/gui/projects/nexo/odonto_front/src/mocks/
/home/gui/projects/nexo/odonto_front/tests/
/home/gui/projects/nexo/odonto_front/docs/work-orders/README.md
/home/gui/projects/nexo/odonto_front/docs/work-orders/WO-STATUS.md
/home/gui/projects/nexo/teardown/
```

Do not open `.env` files (either repository), Firebase project
configuration/secrets, database connection strings, real patient or clinic
records, or any staging/production credential.

**README and product-doc claims are not source evidence.** `PRODUCT.md` and
both READMEs describe the product in aspirational and promotional terms
("premium," "differentiated," "full replacement"). A sentence from either is
a *candidate* claim; it becomes `FACT — SOURCE` only when the register cites
the code, route, test, migration, or command that implements it.

## Evidence Register Format

`docs/nexo-dental-case-study-evidence.md` must begin with the public
boundary and use one row per publishable claim:

```text
Claim ID | Classification | Proposed public wording | Evidence | Limits
```

Allowed classifications are exactly:

- `FACT — OWNER`
- `FACT — SOURCE`
- `DECISION`
- `CONFIDENTIAL`
- `INFERENCE — REVIEW REQUIRED`
- `UNSUPPORTED — DO NOT PUBLISH`

Every source-backed row names a repository-relative file and, where
practical, a symbol, route, test, migration, or command. Git history is
evidence for dates and authorship, not proof of correctness, production
readiness, or clinic-scale performance.

Use the ID prefixes `SYS-` (system/architecture), `WF-` (workflow/module —
scheduling, patients, odontogram, finance, WhatsApp, CRM, claims, reporting),
`GIT-` (history/authorship), `SEC-` (multi-tenancy/RLS/LGPD), and `MEDIA-`
(capture safety).

## Procedure

1. Record `git status --short --branch` for both Nexo Dental repositories
   and the portfolio. Preserve all pre-existing changes.
2. Record the earliest and latest commit dates and the distinct author-name
   count for each repository, without printing author email addresses.
   Confirm backend history begins 2026-07-06 and ends 2026-07-29 (73
   commits), and frontend history begins 2026-07-06 and ends 2026-08-02
   (224 commits). If any of these differ, stop and report `blocked`.
3. Resolve authorship as a `GIT-` claim: all author-name variants on both
   repositories resolve to a single person. Confirm this against Locked
   Owner Fact 1 and Fact 2 (role) before publishing single-owner wording.
4. Map verified system boundaries: FastAPI-style backend (`odonto_back/
   app/`), Alembic-migrated relational schema, multi-tenant row-level
   security, the React/TypeScript SPA (`odonto_front/src/`), and its MSW
   mock layer. Distinguish what is implemented from what a product doc
   describes as planned or in-progress — the source repository's own
   `WO-STATUS.md` already tracks several work orders as `BLOCKED`; carry
   that distinction into this register rather than treating the roadmap as
   shipped.
5. Map the verified module boundaries against `PRODUCT.md`'s claimed scope
   (scheduling/agenda, patient records, odontogram, finance/orçamentos,
   WhatsApp communication, CRM, TISS claims, reporting) as `WF-` claims. For
   each module, cite the backend API and/or frontend route that implements
   it, and record any module that is only partially built or is design-only
   (per the source `WO-STATUS.md`) as a limit, not a shipped feature.
6. Record the multi-tenant/RLS/LGPD posture as a `SEC-` claim: cite the
   specific mechanism (e.g. tenant-scoped database sessions, row-level
   security policy, PII-exclusion rules for logs/events/URLs) from source,
   not from the product doc's prose alone.
7. Record the staging-deployment status as an `OPS-`-equivalent `FACT —
   SOURCE` claim: a Firebase Hosting staging target is defined
   (`odonto_front/firebase.json`, `.firebaserc`), but the source
   repository's own Work Order series records its deployment orders as
   `BLOCKED` / review-rejected — there is no verified live staging URL.
   State this precisely; do not imply a working staging environment exists.
8. Create `UNSUPPORTED — DO NOT PUBLISH` rows for the outcome claims no
   evidence supports: clinics using the product, patient volume, adoption,
   uptime, or performance under real load. This is the same
   no-invented-metrics discipline WO-018, WO-024, and WO-029 each applied.
   **Do not create any row — of any classification, including
   `CONFIDENTIAL` — that names or paraphrases the incumbent product
   `PRODUCT.md` references internally.** Locked Owner Fact 3 (confirmed
   2026-08-04) rules this out entirely, stronger than a redaction: it is not
   publishable context under any framing, generic or specific, and it must
   not appear in the evidence register at all, not even as a rejected
   candidate claim.
9. Record test coverage as a `FACT — SOURCE` claim: what the backend and
   frontend test suites actually verify. Do not claim broader coverage than
   what is present.
10. Record the role-native surface structure (receptionist/operational,
    dentist/clinical, manager/commercial-financial) as a `WF-` claim, citing
    `PRODUCT.md`'s user section and the corresponding routes/components in
    `odonto_front/src/`.
11. Create the public confidentiality note covering real clinic/patient
    data, credentials, Firebase project identifiers, and private source.
12. Update the Nexo Dental portion of `docs/content.md` with the accepted
    facts, disclosure boundary, missing inputs, and evidence-register link.
    Confirm or correct the already-reserved `/work/nexo-dental` title and
    summary (line 343) against source. Do not change the Aegis, Quant, or
    gosigapp chapters or other project facts.
13. Search candidate public wording for real clinic/patient names, Firebase
    project IDs, database credentials, internal hostnames, and
    `[REQUIRED: ...]` leakage.
14. Move WO-034 to `REVIEW`. Only an independent reviewer, or the owner
    acting explicitly in that role, may mark it `DONE` and unblock WO-035.

## Automated Checks

```bash
git diff --check
rg -n "FACT — OWNER|FACT — SOURCE|UNSUPPORTED — DO NOT PUBLISH" docs/nexo-dental-case-study-evidence.md
rg -n "clinics using|adoption|uptime|patient volume|performance under load" docs/nexo-dental-case-study-evidence.md
rg -n "production-ready|enterprise-grade|state-of-the-art|premium\b" docs/nexo-dental-case-study-evidence.md
rg -in "simples dental|incumbent|replaces|replacement for" docs/nexo-dental-case-study-evidence.md docs/content.md
rg -n "\[REQUIRED:" docs/nexo-dental-case-study-evidence.md docs/content.md
```

Every match in the incumbent-reference search must be zero, per Locked Owner
Fact 3 — this is not a reviewable exception like the other searches, it is a
hard fail.

Every match in the second and third searches must be reviewed: each one is
either inside an `UNSUPPORTED` row, inside an explicit prohibition, or
backed by a cited source. Run a targeted secret-pattern scan over only the
new and modified documentation. Do not print matched secret values; report
file and classification only.

## Acceptance Checklist

- [ ] Locked Owner Fact 1 (own product vs. client/employer work) is
      confirmed by the owner before any claim is classified.
- [ ] The incumbent product `PRODUCT.md` references internally does not
      appear anywhere in the evidence register, under any classification,
      per Locked Owner Fact 3.
- [ ] Every proposed public claim has a classification and evidence or
      limit.
- [ ] Owner facts and Git-derived dates are recorded without author emails.
- [ ] Every module claimed against `PRODUCT.md`'s scope is verified against
      source, and partially built or design-only modules are recorded as
      limits.
- [ ] The multi-tenant/RLS/LGPD posture is verified from source, not
      product-doc prose alone.
- [ ] The staging-deployment status is stated precisely as unverified/
      blocked, not implied working.
- [ ] Unsupported outcome claims have `UNSUPPORTED — DO NOT PUBLISH` rows.
- [ ] Promotional product-doc language is either sourced or explicitly
      prohibited.
- [ ] Real clinic/patient data, credentials, and Firebase identifiers remain
      confidential and absent from the register.
- [ ] `docs/content.md` and the evidence register agree.
- [ ] No Nexo Dental source repository file was modified.
- [ ] Documentation checks pass.

## Handoff

Include the claim count by classification, inspected source areas, the
verified module-by-module implemented/limited table, the verified staging-
deployment status, the confirmed Locked Owner Facts (own-product resolution
above all), unresolved facts, confidentiality scan result, source-repository
status before and after, and the reviewer decision needed to unblock
WO-035.
