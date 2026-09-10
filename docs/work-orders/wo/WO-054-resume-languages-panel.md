# WO-054 — Languages Panel

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-054 row is
`READY`.

## Result to Produce

A Languages block with clear hierarchy: each language shown as a structured row
with its name, proficiency level, and credential visible at a glance, balanced
against the Contact column — without inventing any measure of proficiency.

## Prerequisites

- WO-053 `DONE`.
- WO-051 languages direction approved.

## Branch and Files

Create `wo/wo-054-resume-languages-panel` from the WO-053 commit.

```text
src/components/resume/resume-convergence.tsx       (languages block only)
src/components/resume/__tests__/resume-convergence.test.tsx
src/app/globals.css                                 (resume-convergence__languages* only)
docs/work-orders/wo/WO-STATUS.md
```

## Design Contract

- **Structured rows.** Each existing language string is presented as language
  name, level, and — where present — the credential (`TOEFL iBT 105`). Parsing
  follows the same `:`-split approach the career highlights use, and must handle
  both locales' exact strings. If a string doesn't parse, the full string is
  rendered unchanged.
- **Credential visible.** The TOEFL score reads as a distinct credential marker,
  not a parenthetical buried mid-sentence.
- **Balance.** The block holds its own visual weight beside Contact at 768+ and
  stacks cleanly on mobile; it uses the card/hairline vocabulary from WO-052/053.
- **Quiet bridge.** Batch 08 positioned Languages as the calm bridge into the
  close. It gets structure, not motion. No new animation.

## Invariants

- One list item per language, every fact exactly once in the accessibility tree.
- No numeric scales, bars, percentages, CEFR/ILR labels, or flags — the resume
  states a level and a credential, and nothing more may be implied.
- Content strings in `src/content/resume.ts` are unchanged.

## Non-Goals

- The contact actions and Gemini paths (WO-055).
- Adding languages or rewording levels.

## Ordered Implementation

1. Record base commit and captures of the languages/contact area at 1440/768/375.
2. Add tests first: both locales parse into name/level/credential; unparseable
   input renders the original string; each language appears exactly once.
3. Implement the parsing helper and structured markup.
4. Style with existing tokens; verify balance at 1440, 1024, 768, 375, and 200%
   zoom in both locales, with and without JavaScript.
5. Run validation, commit, move WO-054 to `REVIEW`, and stop.

## Automated Checks

```bash
pnpm run test
pnpm run lint
pnpm run typecheck
pnpm run build
git diff --check
git diff -- src/content/resume.ts package.json pnpm-lock.yaml
```

The content and manifest diff must be empty.

## Acceptance Checklist

- [ ] Both locales render name, level, and credential as distinct elements.
- [ ] Fallback parsing renders any unparseable string unchanged.
- [ ] No invented proficiency measure appears.
- [ ] The block balances Contact at desktop and stacks at mobile.
- [ ] Content and manifests are unchanged; validation passes.

## Handoff

Report the commit; before/after captures per viewport and locale; parser test
cases; and open items.
