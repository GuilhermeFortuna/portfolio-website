# WO-030 — gosigapp Architecture Diagram and CLI/Log Evidence Capture

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-030 row is
`READY`.

## Result to Produce

The media set for a case study with no interface: a system-map diagram of the
verified pipeline boundary, plus a small set of sanitized CLI/log captures
that make the pipeline's real behavior legible, without a single screenshot
of a UI, a cloud console, or any real infrastructure identifier.

This replaces WO-019 (Aegis) and WO-025 (Quant) in the batch sequence. Those
orders captured product screenshots; gosigapp has no product screen to
capture, so this order substitutes the evidence that actually exists:
verified architecture and real (but sanitized) execution output.

## Prerequisites

- WO-029 `DONE`

## Read-Only Inputs

```text
/home/gui/projects/gosigapp
docs/gosigapp-case-study-evidence.md
```

## Files to Create or Modify

```text
public/work/gosigapp/system-map.svg
public/work/gosigapp/cli-pipeline-run.webp
public/work/gosigapp/compliance-check-output.webp
docs/gosigapp-case-study-media.md
docs/work-orders/wo/WO-STATUS.md
```

Exact final asset count and filenames may be adjusted in the manifest if the
accepted evidence changes what is safe or useful to show (for example, if two
CLI captures better demonstrate the pipeline than one) — but every asset must
be justified against a specific WO-029 claim ID, and none may be a UI or
cloud-console screenshot. Do not modify the gosigapp source repository.
Temporary captures and intermediates must live under a disposable
`mktemp -d` directory outside every repository.

## Safety Contract

- **No cloud-console screenshots of any kind.** This is an explicit owner
  decision (2026-08-03), not a capture-difficulty workaround. AWS console
  views expose account IDs, ARNs, and resource names that are expensive to
  reliably redact and are not worth the risk for this chapter.
- Run the CLI (`cmd/pipeline`, `cmd/compliance-check`) only against
  placeholder/fixture configuration — a fake `.env` with dummy S3 bucket
  names, a self-signed test certificate the worker generates, and
  `SIGAP_ENV=staging` pointed at nothing reachable, or with the network call
  mocked/stubbed if the codebase supports it. Never load the real `.env`,
  the real PFX certificate, or real AWS credentials.
- If a full pipeline run cannot be exercised safely without real
  credentials, capture `--help` output, a dry-run/validation-only path if one
  exists, or `compliance-check`'s local logic — whatever subset is real,
  runnable, and safe. A smaller, honest capture beats a fabricated terminal
  transcript. Do not hand-write fake terminal output and present it as a
  real run.
- Every captured terminal frame and log excerpt must be inspected before
  acceptance for: S3 bucket names, brand codes (`BRX`, `RICO`, or any other
  value), certificate paths or passwords, hostnames, tokens, account
  identifiers, and file paths that reveal the employer or local machine
  username. Redact or reject rather than publish with a blur — blurred text
  is not an acceptable substitute for not capturing it.
- The diagram may only show boundaries WO-029 accepted. Do not invent a
  component, queue, or service that is not verified in source.

## Diagram Contract

- `system-map.svg` is a clean, hand-styled or programmatically generated
  diagram (not a raw export of the README's Mermaid block) matching the
  portfolio's existing System Map visual language
  (`AegisSystemMap`/`QSystemMap` precedent, confirmed in WO-032).
- Content: S3 (source) → extract → process/aggregate → PFX sign
  (RSA-SHA256) → gzip → base64 → mTLS auth → SIGAP API, using only the
  labels WO-029's `SYS-`/`SEC-` claims accept.
- No account IDs, bucket names, ARNs, or brand codes appear anywhere in the
  diagram, including in any alt text drafted alongside it.
- Provide the diagram as clean vector SVG so it renders sharply at any size
  WO-032 chooses, and is inexpensive to ship.

## CLI/Log Capture Contract

- Capture terminal output as WebP at high resolution (2560×1440 or higher @ 2x DPR)
  to ensure ultra-sharp typography and visual excellence, per owner directive
  (2026-08-03). Do not apply artificial file-size ceilings that degrade image quality.
- Acceptable subjects: a `pipeline` CLI run against fixture/mock
  configuration showing stage-by-stage progress (fetch, sign, compress,
  submit) with fixture data; `compliance-check` output demonstrating the
  compliance-status reporting described in WO-029's evidence register; a
  short sanitized excerpt of structured log/audit output demonstrating the
  auditability claim.
- Terminal chrome should be minimal and generic — no real hostname, no real
  username-derived prompt, no local absolute paths that reveal the
  employer's project layout beyond `gosigapp` itself.

## Procedure

1. Confirm WO-029's accepted evidence and disclosure boundary; extract the
   exact claim IDs this order's media must support.
2. Record source-repository status (`git status --short --branch`).
3. Build fixture/placeholder configuration in the external temporary
   directory: dummy `.env` values, a locally generated self-signed test
   certificate (never the real PFX), and a `SIGAP_ENV` value that cannot
   reach a real endpoint.
4. Attempt a safe pipeline/compliance-check run per the Safety Contract.
   Record exactly what ran, what was mocked or stubbed, and what could not
   be safely exercised.
5. Capture terminal output at the fixed subjects above; inspect every frame
   for leakage before saving.
6. Build `system-map.svg` from the accepted claim set; verify it against
   `docs/gosigapp-case-study-evidence.md` line by line.
7. Copy only accepted final files into `public/work/gosigapp/`.
8. Create `docs/gosigapp-case-study-media.md` with source commands/config
   used (redacted of any real value), dimensions, byte sizes, SHA-256
   hashes, a leakage-inspection note per asset, and a one-sentence approved
   use tied to a WO-029 claim ID.
9. Verify no bucket name, brand code, certificate path, token, hostname, or
   account identifier appears in OCR-readable pixels or the manifest text.
10. Remove all temporary files, generated test certificates, and fixture
    configuration. Confirm the source repository retains its original
    status.

## Automated Checks

```bash
find public/work/gosigapp -maxdepth 1 -type f -printf "%f %s bytes\n" | sort
sha256sum public/work/gosigapp/*
rg -n "BRX|RICO" docs/gosigapp-case-study-media.md public/work/gosigapp/system-map.svg
git diff --check
```

Also verify that no file under `public/work/gosigapp/` is a raster export of a cloud console.

## Acceptance Checklist

- [ ] No cloud-console screenshot exists anywhere in the deliverables.
- [ ] Every CLI/log capture used fixture or mocked configuration only; no
      real credential, certificate, or AWS access was used.
- [ ] Every captured frame was inspected and contains no bucket name, brand
      code, certificate path, token, hostname, or account identifier.
- [ ] The diagram shows only WO-029-accepted boundaries and labels.
- [ ] Media manifest records commands (redacted), hashes, dimensions, sizes,
      and a claim-ID-linked approved use for each asset.
- [ ] Source repository is unchanged; all temporary/generated fixtures were
      removed.
- [ ] Documentation checks pass.

## Handoff

Include what pipeline subset was actually run and what was mocked or
skipped, the per-file size/hash table, rejected captures and reasons, the
leakage-inspection result, source-repository status before/after, and any
media limitation for WO-031 (for example, if a full pipeline run could not be
safely demonstrated and the content contract must rely more on the diagram
and prose than on CLI evidence).
