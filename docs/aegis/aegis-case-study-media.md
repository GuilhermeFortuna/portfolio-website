# Aegis — Case-Study Media Manifest

**Work Order:** WO-019. **State on handoff:** `REVIEW`.
**Evidence boundary:** [`aegis-case-study-evidence.md`](./aegis-case-study-evidence.md).
**Final assets:** `public/work/aegis/` (exactly six files).

All product captures were produced from the repository-owned synthetic
demonstration path (`jobs.demo.seed_demo_data`, seed `20260728`,
reference-time `2026-07-28T12:00:00Z`, scale `visual`). The analytical
database contained **25,000** profiles, all stamped
`AEGISDEMO*` / `@users.aegis-demo.test`, and **0** non-demo profiles.
No Databricks, company environment, or production data was contacted.

Temporary intermediates lived under `/tmp/wo019-aegis-media.*` (outside every
repository) and were removed after copy. Neither Aegis source repository was
modified.

## Source intro probe (locked input)

| Field | Expected | Observed |
| --- | --- | --- |
| Path | `aegis-front/public/aegis/entry-intro/LS_Aegis_EntryIntro.mp4` | match |
| Resolution | 3840×2160 | 3840×2160 |
| Codec | H.264 | h264 |
| Frame rate | 24 fps | 24/1 |
| Duration | 8.625 s | 8.625000 |
| Size | 17,280,292 bytes | 17,280,292 |
| SHA-256 | — | `2f95d87115b1193b32c3c2d30436855fbc2ab73e12e3f79d9f8bad17d1d3cc36` |

## Delivery contract (entry intro)

| Field | Contract | Delivered |
| --- | --- | --- |
| Codec / pixel format | H.264 / `yuv420p` | h264 / yuv420p |
| Resolution | 1920×1080 | 1920×1080 |
| Frame rate | 24 fps | 24/1 |
| Duration | full 8.625 s narrative | 8.625000 |
| Audio | none | none (`-an`) |
| Fast-start | yes | `+faststart` |
| Max size | ≤ 6 MiB | 1,954,655 bytes (~1.86 MiB) |

Encode command (temp dir):

```bash
ffmpeg -y -i LS_Aegis_EntryIntro.mp4 \
  -an -vf "scale=1920:1080:flags=lanczos" \
  -c:v libx264 -preset slow -profile:v high -pix_fmt yuv420p \
  -r 24 -crf 23 -maxrate 5500k -bufsize 11000k \
  -movflags +faststart \
  entry-intro.mp4
```

Poster: frame at t=5.0 s (settled Aegis wordmark + “FRAUD INTELLIGENCE”),
scaled to 1600×900 WebP.

Frame comparison (source vs encoded) at t ∈ {0.1, 3.0, 5.0, 8.0} confirmed
start, identity reveal, settled wordmark, and exit without recoloring,
watermarking, or timing edits.

## Asset inventory

| File | Bytes | SHA-256 | Dimensions | Provenance | Approved use |
| --- | --- | --- | --- | --- | --- |
| `entry-intro.mp4` | 1,954,655 | `d3456485bdca44b9da70847f7ddbed604bab475942332af58d422312f9e4ffc2` | 1920×1080, 24 fps, 8.625 s | Adapted from the locked 4K intro master; timing preserved | Case-study / route entry motion (muted, autoplay-capable) |
| `entry-intro-poster.webp` | 37,066 | `9d2f9035f7169707e892a31a28b9613d1de83d991b86ff9accc55415016f29d4` | 1600×900 | Frame t=5.0 s from the adapted intro | Poster / reduced-motion still for the intro |
| `overview.webp` | 39,648 | `79893638f240fb5e1dc4791e53d51270fb69ccb25d1d1ed233ae726f12311efd` | 1600×900 | Live `/aegis` after synthetic seed + cache warm; WebGL constellation with 25k demo players | Show the overview / risk-constellation summary |
| `player-investigation.webp` | 46,870 | `b99012e470d5f9d64c2e974f9f05835f90cea67a7b4b5675ffbc4787ac1def79` | 1600×900 | `/aegis/player?brand=brand1&userId=8005391&tab=alertas`; player email domain `users.aegis-demo.test`, affiliation `AEGISDEMO*` | Show player investigation with alert/evidence context |
| `risk-constellation.webp` | 38,492 | `212a95ac9325e83b8cb86650a39b49445a684c7e3283a48e84d565556d095f81` | 1600×900 | `/aegis/constellation` with warmed live points (25,000) | Show the dedicated Risk Constellation surface |
| `alerts.webp` | 44,588 | `479e74cc8b93ca32a8a9cd17cf69f658cad6d69702750052f9582c99472fac29` | 1600×900 | `/aegis/alertas` open-queue of synthetic findings (ACC/PAY/GAME/IMPACT rules) | Show the alerts / triage queue |

## Capture procedure (summary)

1. `docker compose up -d` for local Postgres, control-postgres, and Redis.
2. `./setup-db.sh --scale visual --with-admin admin@example.com --password-file <temp>`
   (tables + synthetic seed + detection scan + control migrate + admin).
3. `warm_brand_cache(Brand.BRAND1)` so dashboard/constellation/findings read from
   Redis; live constellation MV created (`mv` rows = 25,000).
4. Local API (`uv run dev` on `:8001`) and SPA (`npm run dev` on `:8002`) with
   `AEGIS_PUBLIC_API_URL=http://localhost:8001`.
5. Playwright Chromium, viewport 1600×900, sessionStorage intro flag set,
   logout control hidden; screenshots exported to WebP via ffmpeg `libwebp`.
6. Accepted finals copied into `public/work/aegis/`; temp dir removed.

## Rejected captures

| Attempt | Reason |
| --- | --- |
| First overview | Still in “Carregando métricas… / Loading points…” before Redis warm. |
| First player route `/aegis/player` (no `userId`) | Empty investigation landing (“Buscar por email”), not timeline/evidence. |
| Mid-run alerts with command palette open | Browser chrome / Cmd+K overlay covered the queue. |
| Pre-warm constellation on overview | WebGL field blank until cache + MV ready; retained only post-warm frame. |

## Confidentiality scan

Scanned asset paths and this manifest for company or internal system names,
Firebase Hosting-style staging origins, cloud project identifiers, AWS-style
access-key prefixes, and documentation placeholder markers. No matches in the
final six asset filenames, the manifest text, or OCR-readable UI chrome beyond
the anonymized brand enum `Brand1` and synthetic demo identifiers (player
numeric IDs, synthetic CPF/name fields generated by the demo seed).

## Limitations for WO-020

- Screenshots are Portuguese UI (product locale). English case-study copy must
  not invent English UI labels that are not in the pixels.
- Alerts capture shows the open triage queue; the right-hand evidence cockpit
  remains in its empty “select an alert” state in this still.
- Shadow-mode constellation MV was not built; captures use **live** mode only
  (`AO VIVO`).
- Intro poster subtitle at t=5.0 s reads “FRAUD INTELLIGENCE”; do not swap in
  alternate taglines from other frames.
