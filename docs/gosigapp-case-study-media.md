# gosigapp — Case Study Media Manifest

## Overview and Media Strategy

**gosigapp** is a backend compliance pipeline with no graphic user interface. Following the owner directive (2026-08-03), no cloud-console screenshots (AWS Console, GitHub Actions UI) are included to eliminate any risk of exposing account IDs, ARNs, or private resource names.

Per owner directive (2026-08-03), artificial file-size ceilings (such as 400 KiB) have been removed. Media deliverables are rendered at high resolution (2560×1440 @ 2x DPR / 5120×2880 rendering) at maximum 100% WebP quality to deliver ultra-sharp typography and terminal presentation.

The media asset set for `/work/gosigapp` consists of:
1. A clean, vector SVG architecture system map (`system-map.svg`) illustrating the end-to-end processing pipeline, security boundaries, and reliability components.
2. High-resolution terminal WebP captures (`cli-pipeline-run.webp`, `compliance-check-output.webp`) demonstrating stage-by-stage execution and pre-submission compliance audit matrix output against fixture configuration.

All assets are inventoried in `public/work/gosigapp/` and verified against the WO-029 evidence register (`docs/gosigapp-case-study-evidence.md`).

---

## Asset Manifest

| Filename | Type / Format | Render Resolution | Size (bytes) | SHA-256 Hash | Claim ID(s) | Leakage Inspection |
| --- | --- | --- | --- | --- | --- | --- |
| `system-map.svg` | Vector SVG | 1200×680 (viewBox) | 8,450 | `aee5e1fe7501507c37cceb9e6d88dd95a3d601f2392fc270a9401ab3d1bd66e8` | `SYS-01`–`05`, `SEC-01`–`02`, `OPS-01`–`04`, `MEDIA-01`, `DEC-01` | **PASSED** (0 account IDs, 0 bucket names, 0 brand codes) |
| `cli-pipeline-run.webp` | Raster WebP (High-Res 2x DPR) | 5120×2880 | 190,326 | `dd0b7b43e0d9ffd6894e8facded5485c7c2a52d98af4a0f4192c99eb602d1c40` | `SYS-01`, `SYS-02`, `SYS-03`, `SEC-01`, `SEC-02`, `OPS-01` | **PASSED** (Generic `operator-fixture`, staging env, 0 secrets) |
| `compliance-check-output.webp` | Raster WebP (High-Res 2x DPR) | 5120×2880 | 166,248 | `734b33981d05c6c0022b3f3f91df5cb711d0e1f4c0ab1f886d2acf2a6e715d04` | `SYS-02`, `SYS-04`, `SYS-05`, `SEC-01`, `SEC-02` | **PASSED** (Generic compliance matrix, 0 PII / CPFs, 0 brand codes) |

---

## Asset Details and Approved Uses

### 1. `system-map.svg`
- **Subject**: End-to-end verified architecture diagram.
- **Approved Use**: Primary visual for the System Architecture section (`/work/gosigapp`).
- **Description**: Displays S3 storage, ZIP extraction, 6 SIGAP dataset schema validation (`apostadores`, `carteiras`, `esportivas`, `jogos`, `diarios`, `mensais`), PFX RSA-SHA256 digital signing, gzip/base64 packaging, mTLS REST transport, SIGAP API Impedidos v2 self-exclusion query service, DynamoDB log store, async job runner, cron scheduler, entry points (`cmd/pipeline`, `cmd/server`), and Docker/ECS/Fargate deployment.
- **Leakage Inspection Result**: PASSED. Contains only generic architectural component labels matching WO-029 claim IDs. Zero confidential brand codes (`BRX`, `RICO`), AWS Account IDs, bucket names, or PFX secrets.

### 2. `cli-pipeline-run.webp`
- **Subject**: High-resolution terminal log capture of `gosigapp pipeline` CLI execution.
- **Approved Use**: Execution evidence figure in Section 8 (`Delivered / Pipeline Execution`).
- **Description**: Demonstrates stage-by-stage processing from S3 raw data download, ZIP extraction, XSD schema verification, RSA-SHA256 XML digital signature application, gzip/base64 packaging, mTLS OAuth2 token refresh, SIGAP API submission (HTTP 200 OK + receipt ID), to AWS DynamoDB audit log recording.
- **Leakage Inspection Result**: PASSED. Uses generic `operator-fixture` brand, `staging` environment, and synthetic receipt ID (`sigap-rec-20260601-0042-8a9b`). Zero confidential employer data, brand codes, ARNs, bucket names, or bettor PII.

### 3. `compliance-check-output.webp`
- **Subject**: High-resolution terminal log capture of `gosigapp compliance-check` audit output.
- **Approved Use**: Compliance validation figure in Section 6 (`Decision 2: Pre-Submission Compliance & Validation`).
- **Description**: Displays the 4 pre-submission audit checks: (1) XSD Schema Conformance for all 6 SIGAP dataset types, (2) Digital Signature & Cryptographic Packaging (RSA-SHA256 PKCS#12 certificate integrity), (3) SIGAP API Impedidos v2 self-exclusion registry check (`GET /impedimento/v2/condicao/{cpf}`), and (4) Multi-Brand Partitioning & Header Integrity.
- **Leakage Inspection Result**: PASSED. Displays generic compliance matrix output against fixture dataset. Zero real bettor CPFs, confidential brand codes, PFX credentials, or internal paths.

---

## Capture Methodology and High-Quality Standards

- **Quality Standard**: Rendered at **2560×1440 with 2x device scale factor (5120×2880 rendering)** via headless Chrome (`google-chrome --headless --force-device-scale-factor=2`) and converted to WebP at **100% quality** via ImageMagick (`magick convert -quality 100`).
- **Terminal Chrome**: Minimal, generic dark window chrome (`#0c0f17` background, `#141824` titlebar, standard window buttons, generic prompt `$ gosigapp ...`).
- **Redaction Verification**: Machine text search over SVG markup and automated inspection of HTML source templates confirmed zero occurrences of `BRX`, `RICO`, real AWS Account IDs, ARNs, real S3 bucket names, PFX passwords, or bettor PII.
- **Unrestricted Quality**: Artificial file-size caps have been removed. File sizes (190.3 KiB and 166.2 KiB) achieve maximum crispness and zero compression artifacts.

---

## Source Repository Status

- The `gosigapp` source repository (`/home/gui/projects/gosigapp`) was inspected read-only.
- Zero source code files, `.env` files, certificates, or git history records in `/home/gui/projects/gosigapp` were created, modified, or deleted during the creation of this media set.
