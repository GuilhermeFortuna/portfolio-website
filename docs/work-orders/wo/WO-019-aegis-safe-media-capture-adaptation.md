# WO-019 — Aegis Safe Media Capture and Adaptation

## Status

See [`WO-STATUS.md`](WO-STATUS.md). Dispatch only when the WO-019 row is
`READY`.

## Result to Produce

A compact, self-hosted, synthetic-data media set that demonstrates the real
Aegis product and motion identity without copying the original 4K source into
the portfolio or exposing company/production information.

## Prerequisites

- WO-018 `DONE`

## Read-Only Inputs

```text
/home/gui/projects/aegis-project/aegis
/home/gui/projects/aegis-project/aegis-front
/home/gui/projects/aegis-project/aegis-front/public/aegis/entry-intro/LS_Aegis_EntryIntro.mp4
docs/aegis-case-study-evidence.md
```

The intro source is 3840×2160, H.264, 24 fps, 8.625 seconds, and 17,280,292
bytes. Re-probe it and stop if those facts differ.

## Files to Create or Modify

```text
public/work/aegis/entry-intro.mp4
public/work/aegis/entry-intro-poster.webp
public/work/aegis/overview.webp
public/work/aegis/player-investigation.webp
public/work/aegis/risk-constellation.webp
public/work/aegis/alerts.webp
docs/aegis-case-study-media.md
docs/work-orders/wo/WO-STATUS.md
```

Do not modify an Aegis source repository. Temporary captures and intermediates
must live under a disposable `mktemp -d` directory outside every repository.

## Fixed Media Contract

### Entry intro

- Preserve the complete 8.625-second narrative; do not re-edit its timing.
- Output: H.264 MP4, 1920×1080, 24 fps, `yuv420p`, no audio, web fast-start.
- Maximum transfer size: 6 MiB.
- Do not brighten, recolor, add copy, watermark, or change the Aegis wordmark.
- Poster: 1600×900 WebP, maximum 250 KiB, chosen from a sharp fully resolved
  Aegis identity frame.

### Product captures

- Capture at 1600×900 CSS pixels and export WebP.
- Maximum size: 400 KiB per screenshot.
- Use the repository-owned deterministic synthetic/demo path only.
- The four exact subjects are:
  1. overview/dashboard;
  2. player investigation with timeline/evidence context;
  3. Risk Constellation;
  4. alerts/investigation queue.
- Every visible person, player, brand, transaction, identifier, and metric must
  be synthetic and safe. If a route cannot be proven synthetic, do not capture
  it; block the order and record the unsafe field.
- Browser chrome, local URLs, devtools, notifications, cursors over content,
  loading states, and error banners must not appear.
- Preserve the real Aegis interface. Do not reconstruct it in the portfolio.

## Procedure

1. Confirm WO-018's accepted evidence and disclosure boundary.
2. Record source-repository status and intro probe/hash.
3. Start the Aegis backend through its documented synthetic demo path and the
   standalone frontend through its documented local configuration. Never
   connect to Databricks, a company environment, or production.
4. Before each capture, inspect the latest DOM and visible state. Reject any
   screenshot containing unsafe or ambiguous data.
5. Capture the four fixed subjects and inspect every saved file at original
   resolution.
6. Encode the intro and poster in the external temporary directory. Compare the
   full encoded video against the source at start, identity reveal, settled
   wordmark, and exit.
7. Copy only accepted final files into `public/work/aegis/`.
8. Create `docs/aegis-case-study-media.md` with source paths, commands,
   dimensions, byte sizes, SHA-256 hashes, synthetic-data proof, capture route,
   and a one-sentence approved use for each asset.
9. Verify no real name, company name, brand, credential, hostname, project ID,
   or production identifier appears in OCR-readable pixels or the manifest.
10. Stop all local processes and remove temporary files. Confirm both source
    repositories retain their original status.

## Automated Checks

```bash
find public/work/aegis -maxdepth 1 -type f -printf "%f %s bytes\n" | sort
ffprobe -v error -show_entries format=duration,size:stream=codec_name,width,height,r_frame_rate,pix_fmt -of default=noprint_wrappers=1 public/work/aegis/entry-intro.mp4
sha256sum public/work/aegis/*
git diff --check
npm run lint
npm run typecheck
npm run build
```

Also verify exactly six final assets exist and each meets its assigned byte
ceiling.

## Acceptance Checklist

- [ ] The source probe matches the locked input.
- [ ] The adapted intro preserves the complete approved animation and meets the
      delivery contract.
- [ ] Four screenshots show real Aegis UI with proven synthetic data.
- [ ] Every final asset was visually inspected at original resolution.
- [ ] Media manifest records commands, hashes, dimensions, sizes, provenance,
      safe use, and synthetic-data proof.
- [ ] No sensitive or company-identifying information appears.
- [ ] Exactly six final assets exist and all size ceilings pass.
- [ ] Source repositories are unchanged.
- [ ] Portfolio validation commands pass.

## Handoff

Include the source and output probes, per-file size/hash table, rejected
captures and reasons, synthetic-data evidence, visual inspection result,
source-repository status before/after, and any media limitation for WO-020.
