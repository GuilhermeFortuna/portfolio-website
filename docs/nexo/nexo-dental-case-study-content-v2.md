# Nexo Dental — Hiring-Focused Case-Study Content Contract

**Work Order:** WO-039. **State on handoff:** `REVIEW` (exact bilingual copy
awaits owner acceptance).

**Supersedes for current rendering:**
[`nexo-dental-case-study-content.md`](./nexo-dental-case-study-content.md), which
remains the immutable WO-036 historical contract.

**Claim authority:**
[`nexo-dental-case-study-evidence.md`](./nexo-dental-case-study-evidence.md).
**Media authority:**
[`nexo-dental-case-study-media.md`](./nexo-dental-case-study-media.md).
**Exact typed strings:**
[`../src/content/case-studies/nexo-dental.ts`](../src/content/case-studies/nexo-dental.ts).

## Audience and Editorial Objective

The primary reader is an international hiring manager evaluating Guilherme for a
senior product-engineering role. The chapter sells the idea through evidence of
founder-level ownership, product structure, domain modelling, security judgment,
human-reviewed AI, and full-stack execution. It does not market Nexo Dental as a
live commercial product or substitute synthetic data for outcomes.

Owner direction recorded 2026-08-05:

- restructure rather than preserve the WO-036 section order;
- target senior product-engineering roles;
- frame Nexo Dental as a real founder-led product opportunity;
- author complete English and Brazilian Portuguese;
- close with general contact only, not a promised demo or source walkthrough.

## Locked Metadata

| Locale | Title | Description |
| --- | --- | --- |
| English | `Nexo Dental — Founder-Built Clinic Operations` | `How I designed and built a multi-tenant dental-clinic product across role-native workflows, data isolation, clinical modelling, and reviewable AI assistance.` |
| pt-BR | `Nexo Dental — Operações Clínicas Construídas de Ponta a Ponta` | `Como projetei e construí um produto multi-tenant para clínicas odontológicas, com fluxos por papel, isolamento de dados, modelagem clínica e IA sob revisão humana.` |

The hero keeps `Clinical software` / `Software clínico`, the four established
facts, and the disabled live-environment control. English hero support is 46
words; Brazilian Portuguese support is 48 words.

## Fixed Section and Media Order

| Order | Stable ID | English heading | Brazilian Portuguese heading | Media |
| --- | --- | --- | --- | --- |
| 1 | `origin` | One patient record. Three ways of working. | Um prontuário. Três formas de trabalhar. | none |
| 2 | `product-tour` | Built around the people who run the clinic | Construído em torno de quem faz a clínica funcionar | none |
| 3 | `reception-workspace` | Reception — keep the day moving | Recepção — manter o dia em movimento | `agenda`, `whatsapp-inbox`, `fila` |
| 4 | `clinical-workspace` | Clinical care — carry truth from chart to treatment | Atendimento clínico — levar a verdade do registro ao tratamento | `patient-workspace`, `odontogram`, `clinical-timeline` |
| 5 | `management-workspace` | Management — connect care to the ledger | Gestão — conectar o atendimento ao financeiro | `financial-ledger` |
| 6 | `architecture` | One product, isolated at the data boundary | Um produto, isolado na fronteira dos dados | none |
| 7 | `decision-tenant-isolation` | 01 — Make tenant isolation a database guarantee | 01 — Tornar o isolamento entre clínicas uma garantia do banco | none |
| 8 | `decision-clinical-model` | 02 — Model the odontogram as a domain, not a widget | 02 — Modelar o odontograma como domínio, não como widget | none |
| 9 | `decision-ai-boundary` | 03 — Put AI behind a human decision boundary | 03 — Manter a IA atrás de uma decisão humana | none |
| 10 | `contribution` | What I owned | O que esteve sob minha responsabilidade | none |
| 11 | `implementation-evidence` | What the implementation proves | O que a implementação comprova | none |
| 12 | `technology` | Technology in service of the workflow | Tecnologia a serviço do fluxo de trabalho | badges |
| Closing | `source-and-data` | Private source. Synthetic evidence. | Código privado. Evidência fictícia. | none |

The hero remains `shell-identity.webp`. All image paths and intrinsic dimensions
remain unchanged. `orcamento.webp` and `reports.webp` remain reserved.

## Message Contract

- **Origin:** one shared patient/financial context supports three distinct daily
  operating rhythms. The founder saw a product opportunity in those handoffs.
- **Reception:** agenda, conversations, and prioritized next actions belong in
  one operational surface; a person remains responsible for responses and
  changes.
- **Clinical:** the shared patient workspace and structured FDI odontogram carry
  clinical meaning, history, and attribution into treatment and finance.
- **Management:** treatments, installments, payments, commissions, TISS claims,
  and reporting remain connected to the patient and tenant. Reporting is active
  development, not a claimed finished BI program.
- **Architecture:** React/TypeScript → FastAPI `/api/v1` → PostgreSQL/Alembic,
  with deterministic guarded MSW fixtures.
- **Decision 1:** tenant-scoped sessions plus forced RLS make cross-clinic refusal
  a database guarantee; AES-GCM and masked API fields protect claims data.
- **Decision 2:** teeth, conditions, and procedures are domain records shared by
  the odontogram, timeline, treatment proposal, and ledger.
- **Decision 3:** the queue and adjacent AI panels assist role-specific work;
  humans review and act, clinical AI rejects PII before provider calls, and
  capabilities remain role-aware.
- **Ownership:** Guilherme founded, designed, built, and validated the product as
  sole developer with AI assistance.
- **Evidence:** implemented workflow scope; 50 backend and 134 frontend test files
  verified 2026-08-05; forced RLS, encrypted/masked claims fields, PII guards,
  no-PII payload assertions, and production mock guard.
- **Limits:** active development, private source, no verified public environment,
  and no published clinic outcome.

## Technology Badges

`React`, `TypeScript`, `Vite`, `TanStack Router`, `FastAPI`, `PostgreSQL`,
`Alembic`, `Row-level security`, `AES-GCM`, `Mock Service Worker`, `pytest`, and
`Vitest`.

## Publication Boundaries

- No third-party product comparison framing, including generic comparisons.
- No production-readiness, adoption, clinic/patient volume, uptime, performance
  under load, reliability, or business-impact claim.
- No autonomous clinical, communication, or financial decision claim.
- No real clinic/patient data, credentials, private infrastructure identifiers,
  repository link, or live-environment link.
- Captions and alt text are completely authored in both locales. The only shared
  strings are product/technology names, paths, stable IDs, and dimensions.

## Verification Record

- English prose excluding metadata, actions, alt text, captions, and badges: 962
  words.
- English hero support: 46 words.
- English decision bodies: 82 / 86 / 86 words.
- Brazilian Portuguese prose: 1,085 words; support 48; decisions 97 / 85 / 97.
- Media: eight placed, two reserved; no file changed.
- Source test counts rechecked 2026-08-05: backend 50; frontend 134.
- Exact strings, captions, and alt text remain reviewable in the typed content
  file linked above; owner acceptance moves WO-039 from `REVIEW` to `DONE`.
