# WO-018 — Aegis Evidence and Publication Contract

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-018 row is
`READY`.

## Result to Produce

A claim-level evidence register and public-disclosure contract that separates
verified facts, owner decisions, confidential context, safe inferences, and
unsupported outcomes before any Aegis media or public route is created.

## Prerequisites

- WO-017
- Owner facts recorded in [`BATCH-03-README.md`](BATCH-03-README.md)

## Files to Create or Modify

```text
docs/aegis-case-study-evidence.md
docs/content.md
docs/work-orders/wo/WO-STATUS.md
```

The Aegis source repositories are read-only inputs and are not in the write
scope.

## Required Source Inspection

Inspect at minimum:

```text
/home/gui/projects/aegis-project/aegis/README.md
/home/gui/projects/aegis-project/aegis/pyproject.toml
/home/gui/projects/aegis-project/aegis/api/
/home/gui/projects/aegis-project/aegis/src/aegis/
/home/gui/projects/aegis-project/aegis/jobs/
/home/gui/projects/aegis-project/aegis/tests/
/home/gui/projects/aegis-project/aegis/docs/aegis-cache-and-job-pipeline.md
/home/gui/projects/aegis-project/aegis-front/README.md
/home/gui/projects/aegis-project/aegis-front/package.json
/home/gui/projects/aegis-project/aegis-front/app/routes/
/home/gui/projects/aegis-project/aegis-front/src/components/aegis/
/home/gui/projects/aegis-project/aegis-front/src/features/risk-constellation/
/home/gui/projects/aegis-project/aegis-front/src/services/
/home/gui/projects/aegis-project/aegis-front/src/components/aegis/AegisEntryIntro.tsx
```

Do not open `.env` files, production exports, database dumps, or credentials.

## Evidence Register Format

`docs/aegis-case-study-evidence.md` must begin with the public boundary and use
one row per publishable claim:

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

Every source-backed row names a repository-relative file and, where practical,
a symbol, route, test, commit, or command. Git history is evidence for dates
and authorship, not proof of business impact.

## Procedure

1. Record `git status --short --branch` for both source repositories and the
   portfolio. Preserve all pre-existing changes.
2. Record the earliest and latest commit dates and author-name counts without
   printing author email addresses. Confirm the backend history begins
   2026-04-06 and frontend history begins 2026-04-12.
3. Map verified system boundaries: standalone React frontend, FastAPI API,
   Postgres, Databricks, optional Redis caching, batch synchronization/detection
   jobs, synthetic demonstration data, authentication, deployment, and tests.
4. Map verified user-facing workflows: overview, player investigation, alerts,
   cases/reports/configuration where implemented, and Risk Constellation.
   Distinguish implemented behavior from README plans or known gaps.
5. Record the owner facts from the batch index. Use `April 2026–present`,
   `Software Developer`, and the anonymized Brazilian iGaming context.
6. Create explicit `UNSUPPORTED — DO NOT PUBLISH` rows for fraud reduction,
   revenue, money saved, investigation speed, adoption, accuracy, production
   volume, uptime, team size, and client satisfaction.
7. Create the public confidentiality note: the company name, production data,
   deployment identifiers, and proprietary implementation details are omitted;
   portfolio media uses synthetic data.
8. Update the Aegis portion of `docs/content.md` with the accepted facts,
   disclosure boundary, missing inputs, and evidence-register link. Do not
   change other project facts.
9. Search candidate public wording for company names, real brands, internal
   hostnames, credentials, direct identifiers, and `[REQUIRED: ...]` leakage.
10. Move WO-018 to `REVIEW`. Only an independent reviewer may mark it `DONE`
    and unblock WO-019.

## Automated Checks

```bash
git diff --check
rg -n "FACT — OWNER|FACT — SOURCE|UNSUPPORTED — DO NOT PUBLISH" docs/aegis-case-study-evidence.md
rg -n "fraud reduction|revenue|money saved|accuracy|uptime|client satisfaction" docs/aegis-case-study-evidence.md
rg -n "Aegis|April 2026|Software Developer|Brazilian iGaming" docs/content.md
```

Run a targeted secret-pattern scan over only the new/modified documentation.
Do not print matched secret values; report file and classification only.

## Acceptance Checklist

- [ ] Every proposed public claim has a classification and evidence or limit.
- [ ] Owner facts and Git-derived dates are recorded without author emails.
- [ ] Company identity and production data remain confidential.
- [ ] The current repository version is described as a sanitized evolution, not
      asserted to be byte-identical to production.
- [ ] Unsupported impact claims are explicitly prohibited.
- [ ] `docs/content.md` and the evidence register agree.
- [ ] No source repository file was modified.
- [ ] Documentation checks pass.

## Handoff

Include the claim count by classification, inspected source areas, exact
unresolved facts, confidentiality scan result, source-repository status before
and after, and the reviewer decision needed to unblock WO-019.
