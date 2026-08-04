# WO-035 — Nexo Dental Media Capture

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-035 row is
`READY`.

## Result to Produce

A high-resolution capture set that shows Nexo Dental's three role-native
surfaces — receptionist/operational, dentist/clinical, and manager/
commercial-financial — at enough fidelity to support a hiring-audience
narrative, plus an archived master set outside the repository so no future
visual batch ever needs to recapture.

Every pixel in this batch must come from **seed/fixture data**. Unlike
Quant, where the owner set no content restriction, Nexo Dental is a
multi-tenant clinic product carrying real clinical and financial PII risk —
this order's data-safety rule is closer to Q's broker/account rule than to
Q's "no restriction" one, but it applies to every subject, not just two.

## Prerequisites

- WO-034 `DONE`

## Read-Only Inputs

```text
/home/gui/projects/nexo/dev.sh
/home/gui/projects/nexo/odonto_front
/home/gui/projects/nexo/odonto_front/src/mocks/
/home/gui/projects/nexo/odonto_back
docs/nexo-dental-case-study-evidence.md
```

## Files to Create or Modify

```text
public/work/nexo-dental/<subject>.webp        (one per accepted subject)
docs/nexo-dental-case-study-media.md
docs/work-orders/wo/WO-STATUS.md
```

Do not modify a Nexo Dental source repository. Do not commit masters to the
portfolio.

## Capture Environment

Run the frontend against its deterministic mock/seed path — the equivalent
of Quant's `--mocks` mode — never against a real clinic's backend or
database, even if one is reachable in this environment. If the frontend has
no mock-data path capable of rendering a subject convincingly, seed a local
backend instance with synthetic data generated for this purpose (invented
clinic name, invented patient names, invented amounts) rather than pointing
the capture at any real data source. Record which path (mock frontend vs.
seeded local backend) produced each asset in the manifest.

Before capturing anything, audit each subject's backing data the way
WO-025 audited Quant's fixtures: render the view, check for placeholder
text, obviously synthetic values, degraded/error states, or empty states
that would undercut the screenshot, and record the decision.

### Security and privacy rule (hard rule — no exceptions)

No real clinic name, real patient name, real CPF, real phone number, real
address, real financial amount tied to a real transaction, real WhatsApp
message content, or any other real-world identifying data may be legible in
any capture, under any circumstances. If a view cannot be populated with
synthetic data without extensive engineering effort, skip that subject and
record why rather than using real or ambiguous data. This is stricter than
Quant's rule (which had no content restriction) and closer to the account-
security rule Quant did apply, extended to cover every subject.

## Resolution and Format Contract

Match WO-025's contract, since this chapter's media plays the same
supporting role Quant's did (a real, extensive UI, not a diagram-only
chapter):

| Property | Value |
| --- | --- |
| Capture viewport | 1600×900 CSS pixels |
| Device scale factor | `2` (raw capture 3200×1800) |
| Master (archived) | 3200×1800 lossless PNG |
| Deliverable | 2560×1440 WebP, quality ≥ 88 |
| Per-file ceiling | 500 KiB |
| Per-file target | ≤ 250 KiB |
| Total `public/work/nexo-dental/` ceiling | 5 MiB |

Additional rules:

- Deliverables are exactly 2560×1440. A subject that cannot fill that frame
  is recaptured, never upscaled.
- **Do not crop the deliverables.**
- Masters live under a `mktemp -d` archive outside every repository. Record
  the archive path and every master's SHA-256 in the manifest. Masters must
  not enter Git.
- Follow the existing `<picture>`/`image/webp` seam the other three
  chapters use; adding AVIF is out of scope.

## Required Subjects

Capture across all three role-native surfaces so the narrative can show
range, not just one persona. Exact subjects depend on what WO-034 confirms
is actually built (the source repository's own status board records several
modules as in-progress or blocked) — treat this table as a target, not a
guarantee, and substitute the closest shipped equivalent where a listed
subject is not yet implemented.

| # | Subject | File | Surface | Must show |
| --- | --- | --- | --- | --- |
| 1 | Agenda / scheduling week view | `agenda.webp` | Receptionist | Multi-professional week view with appointments |
| 2 | Fila (queue) / action hierarchy | `fila.webp` | Receptionist | Queue items with clear priority/action affordance |
| 3 | Patient workspace | `patient-workspace.webp` | Receptionist/Dentist | Patient header, tabs, and identity/contact overview |
| 4 | Odontogram | `odontogram.webp` | Dentist | Clinical tooth chart in a realistic populated state |
| 5 | Clinical timeline / encounter | `clinical-timeline.webp` | Dentist | Chronological clinical record with attribution |
| 6 | Orçamento (treatment proposal) | `orcamento.webp` | Dentist/Manager | Treatment plan / proposal builder |
| 7 | Financial ledger | `financial-ledger.webp` | Manager | Payments/installments view with synthetic amounts |
| 8 | WhatsApp conversations inbox | `whatsapp-inbox.webp` | Receptionist | Conversation list with synthetic message content |
| 9 | Reports / BI dashboard | `reports.webp` | Manager | Operational or financial reporting view |
| 10 | Application shell / login | `shell-identity.webp` | All | Brand identity — shell, navigation, or entry surface |

Up to **two** additional subjects may be captured if a compelling one is
found — a total ceiling of twelve files. Record any addition with its
justification.

Any subject whose backing module is confirmed by WO-034 as not yet built or
blocked must be **skipped**, not simulated. Record it as `DEFERRED` with the
reason and report it so WO-036 writes that claim, if any, without a
supporting image.

## Safety Contract

- No real clinic, patient, CPF, phone, address, financial, or message data
  may be legible — the hard rule above, applying to every subject.
- Browser chrome, local URLs, devtools, notifications, cursors over content,
  loading skeletons, empty states, and error banners must not appear unless
  a subject specifically requires showing a deliberate state.
- Preserve the real Nexo Dental interface. Do not restyle, recolor,
  relabel, or reconstruct it.

Record each asset's environment and data source in the manifest so
provenance is traceable and the capture is reproducible.

## Procedure

1. Confirm WO-034's accepted evidence, including which modules are
   confirmed shipped versus in-progress/blocked.
2. Record `git status --short --branch` for both Nexo Dental repositories.
3. Audit each candidate subject's backing data before capturing anything;
   record the decision and reason, including any subject substituted or
   dropped because its module is not yet built.
4. Start the frontend against its mock path, or seed a local backend with
   synthetic data if a subject requires it. Verify the security rule before
   each capture.
5. Write a scripted capture routine: fixed viewport, `deviceScaleFactor: 2`,
   fixed navigation per subject, an explicit settle wait, and animation
   quiescence before shutter.
6. Before each shutter, inspect the live DOM and visible state against the
   safety contract. Reject anything unsafe or ambiguous rather than editing
   it afterwards.
7. Capture all masters to the external archive first. Inspect every master
   at original resolution before deriving anything from it.
8. Derive the 2560×1440 WebP deliverables, then re-inspect each deliverable
   at original resolution: text legible, no resampling artifacts.
9. Copy only accepted deliverables into `public/work/nexo-dental/`.
10. Create `docs/nexo-dental-case-study-media.md` recording, per asset:
    subject, role-native surface, route and navigation steps, capture
    command, master path and SHA-256, deliverable dimensions, byte size and
    SHA-256, the environment/data source used and why, and a one-sentence
    approved use.
11. Run OCR over every deliverable and confirm no real clinic/patient/
    financial/message identifier appears.
12. Stop all local processes and any seeded local backend/database. Confirm
    both Nexo Dental repositories retain their original status. Record the
    archive path; do not delete the masters.

## Automated Checks

```bash
find public/work/nexo-dental -maxdepth 1 -type f -printf "%f %s bytes\n" | sort
du -sh public/work/nexo-dental
identify -format "%f %wx%h\n" public/work/nexo-dental/*.webp
sha256sum public/work/nexo-dental/*
git diff --check
pnpm run lint
pnpm run typecheck
pnpm run build
```

Also verify: every deliverable is exactly 2560×1440; no file exceeds 500
KiB; the directory total is under 5 MiB; the file count is between six and
twelve; and every file in the directory appears in the manifest and vice
versa.

## Acceptance Checklist

- [ ] Every subject's data source was audited before capture and the
      decision recorded.
- [ ] No subject was captured against a real clinic, real patient, or any
      other real identifying data.
- [ ] Subjects spanning all three role-native surfaces are represented, or
      the shortfall is explained by a confirmed unbuilt module.
- [ ] Every deliverable is 2560×1440 WebP within its byte ceiling,
      uncropped.
- [ ] Masters archived outside the repository, hashed, and not committed.
- [ ] Every asset was visually and OCR-inspected at original resolution.
- [ ] Environment and data source are recorded per asset.
- [ ] Directory total, file count, and per-file ceilings all pass.
- [ ] Nexo Dental source repositories are unchanged, and any seeded local
      backend/database was torn down.
- [ ] Portfolio validation commands pass.

## Handoff

Include the per-file dimension/size/hash table, the master archive path
with its hash table, the per-subject environment/data-source decisions and
reasons, any subject dropped or substituted because its module was
unbuilt, rejected captures and why, the OCR scan result, source-repository
status before and after, and the exact set of assets available to WO-036.
