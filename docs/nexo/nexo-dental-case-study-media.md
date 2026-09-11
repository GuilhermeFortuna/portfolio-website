# Nexo Dental — Case-Study Media Manifest

**Work Order:** WO-035. **State on handoff:** `DONE` (owner authorized
2026-08-04).
**Evidence boundary:** [`nexo-dental-case-study-evidence.md`](./nexo-dental-case-study-evidence.md).
**Final assets:** `public/work/nexo-dental/` (ten WebP subjects; `placeholder.svg` retained for chapter wiring).

All ten required subjects were captured from the frontend MSW mock path only.
No subject used a real clinic backend, real patient session, or seeded local
database. Masters archived outside every repository; deliverables only enter
Git.

## Capture environment

Frontend-only mocks (the WO-035-preferred path; `nexo/dev.sh` was not used):

```bash
cd /home/gui/projects/nexo/odonto_front
VITE_USE_MOCKS=true \
VITE_MOCK_CLINIC_NAME='Clínica Centro' \
VITE_SHOW_DEMO_BANNER=false \
VITE_DEMO_CLOCK_ISO='2026-07-15T12:00:00-03:00' \
pnpm dev --host 127.0.0.1 --port 5174 --strictPort
```

`VITE_MOCK_CLINIC_NAME` was forced on the process so any local `.env` clinic
override could not appear in pixels. Capture drove Chromium through a
scratch Playwright script under the external archive (Playwright resolved
from `odonto_front/node_modules` via absolute import). Neither Nexo source
repository received files from this order.

Viewport: `1600×900` CSS, `deviceScaleFactor: 2` → masters `3200×1800` PNG.
Deliverables: `ffmpeg -vf scale=2560:1440 -c:v libwebp -quality 90 -preset text`
(straight downscale; no crop, no upscale).

Masters archived at `/tmp/wo035-nexo-media-mwhmjN/masters/` (created with
`mktemp -d /tmp/wo035-nexo-media-XXXXXX`). Deliverables derived at
`/tmp/wo035-nexo-media-mwhmjN/deliverables/` before copy into
`public/work/nexo-dental/`.

## Fixture audit (all ten subjects)

| # | Subject | Decision | Reason |
| - | --- | --- | --- |
| 1 | Agenda / week view | `CAPTURE` — mocks | Week grid populated (status strip Agendado·3 / Confirmado·2; appointment cards for João F. / Gisele F. visible). Synthetic dentist `Dr. Bruno Dentista Demo`. |
| 2 | Fila / action hierarchy | `CAPTURE` — mocks | Dense priority queue with action buttons (Revisar glosa, Responder no WhatsApp, Ver débitos, Completar prontuário). Not empty. |
| 3 | Patient workspace | `CAPTURE` — mocks | João Antônio Fictício header, tabs, identity/contact overview from MSW showcase patient. |
| 4 | Odontogram | `CAPTURE` — mocks | `odontogram-workspace` + canvas visible; FDI chart with tooth 16 highlighted. First pass rejected solely for `odontogram-tooth-inspector-empty`; recaptured and accepted — WO must-show is the tooth chart, not the inspector. |
| 5 | Clinical timeline | `CAPTURE` — mocks | Clinical workspace with chronological seed encounters and attribution under `dentista@demo.com`. |
| 6 | Orçamento | `CAPTURE` — mocks | Draft proposal `orc-11111111-1111-4111-8111-111111111201` builder with synthetic procedures/totals. |
| 7 | Financial ledger | `CAPTURE` — mocks | Patient débitos ledger with synthetic installment amounts under `admin@demo.com`. |
| 8 | WhatsApp inbox | `CAPTURE` — mocks | Conversas inbox + deep-linked thread `c1111111-1111-4111-8111-111111111101` with synthetic message bodies. |
| 9 | Reports / BI | `CAPTURE` — mocks | `/relatorios` catalog with operational/pipeline/cash-flow cards. Source WO52–54 status board is stale; UI+MSW exist (WO-034 WF-08). |
| 10 | Shell identity | `CAPTURE` — mocks | Authenticated AppShell + Clinic Pulse (`/`) with Nexo Dental brand and role-native navigation. |

No subject was deferred. No additional 11th/12th subject was captured.

## Asset inventory

Environment column is always `mocks` (MSW). Master paths are under
`/tmp/wo035-nexo-media-mwhmjN/masters/`.

| File | Deliverable bytes | Deliverable SHA-256 | Master bytes | Master SHA-256 | Environment / source | Approved use |
| --- | --- | --- | --- | --- | --- | --- |
| `agenda.webp` | 77,028 | `90f3916a3feffb244065d106c15cd0b5519ad20d5ad49d91091b73d70f9b6a19` | 1,737,542 | `5d3a6793d22d079ee5143be7ece8d4816ac9d723ecbcebde111219a31c474762` | mocks — `/agenda`, `admin@demo.com` | Show the receptionist week agenda with multi-professional appointments from seed data. |
| `fila.webp` | 157,120 | `1e93e72e98fc1f6a35bb998d1a82b57bd98d6515d9e760e5f9980dbd568e6ed2` | 2,803,711 | `6b75bfdfe923b560a130fc15bfd11388120349f7001e817cd2618a989017a2fd` | mocks — `/fila`, `admin@demo.com` | Show the operational action queue with prioritized items and action affordances. |
| `patient-workspace.webp` | 105,896 | `58f860cc18b6df12899f88f7955788dc3e53483a3bb280821eb27f4600ed39cf` | 2,574,903 | `a1620d3257c8f7bd491bf9c04b4cd4639a164b72efd292d88718d34bcc0317f7` | mocks — `/pacientes/…/sobre`, `admin@demo.com` | Show the patient workspace header, tabs, and synthetic identity overview. |
| `odontogram.webp` | 124,114 | `1ae0e1ae8a1a94a69fe6fd48c8726b9fbfffc5d566e905afd73a2b909c606c4d` | 2,043,026 | `efd30328592f5570a06e1120ed10aa0375e39ac0f0a80542c322997e86b3d187` | mocks — `/pacientes/…/tratamentos`, `dentista@demo.com` | Show the clinical odontogram chart in a populated seed state. |
| `clinical-timeline.webp` | 129,200 | `cb305f9bf9ca53459e7a783b5f5b37ff0685fec8583886435bddfbc2e0328921` | 2,287,897 | `ba10760af65e38be3aa16f548c689e23bf54184eebf73d6d1c1f7286075fcbf0` | mocks — `/pacientes/…/prontuario`, `dentista@demo.com` | Show the chronological clinical timeline with attribution from seed encounters. |
| `orcamento.webp` | 106,460 | `7941f39358b6f8d8fcbd1e3f0aab3387263c82f2c76b29163b2762e060e13492` | 2,596,766 | `a791e26d70232c06b771aa3bc980d5b1625dc257d109aca74b4b84f6406235e1` | mocks — `/pacientes/…/orcamentos/orc-…1201`, `dentista@demo.com` | Show the treatment proposal (orçamento) builder with synthetic procedures and totals. |
| `financial-ledger.webp` | 118,550 | `d09e5318b957494e050789574275faa7959659af904aa5d0db295ecf47df359e` | 2,546,024 | `d5d7d6175f4e989e74e2b9ed1118610b52e63bf0297631a6a4538ac65786e582` | mocks — `/pacientes/…/debitos`, `admin@demo.com` | Show the patient financial ledger with synthetic balances and installments. |
| `whatsapp-inbox.webp` | 196,820 | `f94018986142ccdcbeed4abd4e7ec60e8113acbda9fc5c3699bc7ffbc142188e` | 2,587,379 | `792da1a58bde7850dddf654e5af8c07dd966e9d53211e2a7dadde3a5cb54e588` | mocks — `/conversas?conversation=…`, `admin@demo.com` | Show the WhatsApp-style inbox with synthetic conversation list and thread. |
| `reports.webp` | 107,094 | `0add97bb53b56af3651c2b42b946554c0f2fd162b076f4ce2e6f8273fb0db6bf` | 1,531,810 | `efc0345eb425ad82842470566b1662c6ceaf08c166d90a25aeecbd9e9a55c6f0` | mocks — `/relatorios`, `admin@demo.com` | Show the reports catalog as the manager reporting surface. |
| `shell-identity.webp` | 165,170 | `21d9c68ae621bbbc38e524e58a509db1504ac2ca1f17cd271ec6f76688b59aaf` | 2,315,041 | `3976ebb2874863114922d6442c3cfa2e25c1bcb9d10d82854872554fd4ee7bbc` | mocks — `/` Clinic Pulse, `admin@demo.com` | Show the authenticated application shell, navigation, and Clinic Pulse home. |

Total `public/work/nexo-dental/` WebP set: **1,287,452 bytes (~1.3 MiB)** across
10 files, all ≤500 KiB and under the ≤250 KiB target. Directory also retains
pre-existing `placeholder.svg` (959 bytes) for WO-036/037 chapter wiring —
not part of the capture set.

## Capture procedure (summary)

1. Confirmed WO-034 `DONE` and WO-035 `READY`; recorded Nexo git baselines.
2. Created external archive `/tmp/wo035-nexo-media-mwhmjN`.
3. Started mocks-mode Vite on `:5174` with synthetic clinic name and fixed demo clock.
4. Audited every subject by rendering it; recorded decisions above.
5. Scratch Playwright capture at 1600×900 / DPR 2 with animation quiescence,
   login as `admin@demo.com` or `dentista@demo.com` per subject, settle on
   documented `data-testid` ready selectors, pre-shutter `innerText` safety scan.
6. Inspected every master at original resolution; derived 2560×1440 WebP;
   re-inspected deliverables; copied accepted files into
   `public/work/nexo-dental/`.
7. OCR (`tesseract`) over every deliverable plus `innerText` dumps.

## Rejected captures

| Attempt | Reason |
| --- | --- |
| `odontogram` — first pass | Visible `odontogram-tooth-inspector-empty` tripped the empty-state guard. Chart itself was populated. Recaptured; accepted with note that WO must-show is the tooth chart. |

## Confidentiality / OCR scan

Pre-shutter `document.body.innerText` scans and post-encode OCR (`tesseract`,
`por+eng`) ran over every subject.

- **Zero** matches for personal clinic override patterns (`Mauricio`,
  `Clínica Dr.`), Firebase/API-key/Bearer/`AIza`/`sk-` credential patterns, or
  the prohibited third-party product name from Locked Owner Fact 3.
- Clinic label rendered is the forced synthetic **Clínica Centro**.
- Patient/professional names are unmistakably fixture labels (`* Fictício`,
  `* Demo`, `Admin Demo`, `Dr. Bruno Dentista Demo`).
- Message bodies are synthetic MSW templates (“Olá, posso remarcar…”, model
  confirmation strings).
- Amounts (e.g. R$ 170,00 / R$ 350,00 / R$ 2.500,00) are fixture values, not
  tied to a real clinic transaction.
- Patient header surfaces the MSW showcase CPF `835.840.532-42` and phone
  `(11) 98765-4321` for **João Antônio Fictício** — these are invented fixture
  identifiers from `odonto_front/src/mocks/patient-data.ts` (WO84 synthetic
  showcase), not real-world PII. They remain legible because the product UI
  shows them; substituting blank fields would require editing the source
  repository, which this order forbids. Recorded here so WO-036 can treat
  them as fixture identifiers, not real patients.

No browser chrome, localhost URL chrome, devtools, loading skeletons, or
error banners appear in accepted frames.

## Source-repository status

| Repo | Before | After |
| --- | --- | --- |
| `odonto_front` | `feature/implement-silk-background-animation`, clean | unchanged |
| `odonto_back` | `development` ahead 2; dirty on `.env.example`, `README.md`, `app/core/config.py`, `docker-compose.yml`, `scripts/wo24_container_smoke.sh`, `tests/conftest.py` | unchanged (same dirty set; this order wrote nothing) |

Vite on `:5174` was stopped after capture. Masters were **not** deleted
(archive path retained for reproducibility).

## Role-native surface coverage

| Surface | Subjects |
| --- | --- |
| Receptionist / operational | `agenda`, `fila`, `whatsapp-inbox`, (`patient-workspace`) |
| Dentist / clinical | `odontogram`, `clinical-timeline`, `orcamento`, (`patient-workspace`) |
| Manager / commercial-financial | `financial-ledger`, `reports`, (`shell-identity` / Clinic Pulse) |

## Assets available to WO-036

`agenda.webp`, `fila.webp`, `patient-workspace.webp`, `odontogram.webp`,
`clinical-timeline.webp`, `orcamento.webp`, `financial-ledger.webp`,
`whatsapp-inbox.webp`, `reports.webp`, `shell-identity.webp` — ten assets in
`public/work/nexo-dental/`, all uncropped 2560×1440 WebP, ready for the
case-study narrative's media budget. No subject deferred.
