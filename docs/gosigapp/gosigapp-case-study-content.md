# gosigapp — Bilingual Case Study Content Contract

**Approved revision:** 2026-08-05

**Audience:** backend and platform engineering hiring managers

**Routes:** `/work/gosigapp`, `/pt-BR/work/gosigapp`

## Editorial Contract

- Lead with Guilherme's ownership, engineering judgment, and delivery from architecture through AWS deployment.
- Treat AI as an implementation aid, not as the owner of technical decisions or verification.
- Keep English and Brazilian Portuguese as complete authored versions. Portuguese must never inherit visible English copy.
- Preserve the existing section IDs, order, media paths, dimensions, private-source boundary, and omission of a live-environment control.
- Do not claim operational volume, uptime, rejection rate, business impact, regulator endorsement, penalty avoidance, or current live status.
- Do not use absolutes such as `zero rejected transmissions`, `zero credential exposure`, `complete historical proof`, or `without data duplication`.

## English Contract

### Metadata and Hero

- **Title:** `gosigapp — Regulated Submission Infrastructure in Go`
- **Description:** `How I designed and deployed a Go pipeline that validates, signs, retries, audits, and submits six regulated datasets to Brazil's SIGAP.`
- **Category:** `Regulated Systems / Backend Platform`
- **Deck:** `From six operational datasets to signed, auditable SIGAP submissions`
- **Role:** `Software Developer · Sole human developer`
- **Period:** `December 2025 – June 2026`
- **State:** `Deployed via AWS ECS/Fargate`
- **Source:** `Private repository`
- **Support:** `I designed and deployed a Go backend that turns six regulated data feeds into validated, signed, and auditable SIGAP submissions for a licensed Brazilian betting operator.`

### Narrative Order

1. `context` — **A regulatory deadline became a systems problem**

   Establish six government reporting categories, defined daily/monthly schedules, and the need for structurally valid, traceable filings.
2. `problem` — **Six data contracts, one submission path**

   Explain S3/ZIP inputs, XML/XSD validation, PKCS#12 signing, gzip/base64 packaging, OAuth2, and mTLS.
3. `system-overview` — **From S3 input to signed SIGAP submission**

   Present one Go core, batch CLI, HTTP job service, operational utilities, and DynamoDB history.
4. `decision-1` — **Decision 1 — Fail before transmission**

   Describe pre-submission validation and the official SIGAP Impedidos v2 integration without promising rejection-free submissions.
5. `decision-2` — **Decision 2 — Protect signing and transport**

   Describe the certificate, XML-signature, mTLS, OAuth2, and environment-configuration boundary without claiming zero exposure.
6. `decision-3` — **Decision 3 — Make failures recoverable and runs auditable**

   State the exact retry tradeoff: bounded retry for network/5xx failures; immediate correction path for 4xx responses. Include job lifecycle, DynamoDB records, status-aware backfills, and duplicate-batch handling.
7. `contribution` — **What I owned**

   Establish sole human ownership across requirements translation, architecture, implementation, operational tooling, CI/CD, and ECS/Fargate delivery. Mention AI once, after ownership.
8. `evidence-limits` — **What shipped—and what I can verify**

   Ground the story in private source, container/deployment artifacts, and sanitized fixtures; name unsupported metrics honestly.
9. `tech-stack` — **Technology in service of the pipeline**
10. `disclosure-actions` — **Private source, discussable architecture**

    Invite an architecture conversation while preserving operator, infrastructure, and data confidentiality.

### English Media and Actions

| Section | Asset | Required English framing |
| --- | --- | --- |
| System | `system-map.svg` | Architecture from S3 through validation, signing, submission, jobs, and DynamoDB audit storage. |
| Decision 1 | `compliance-check-output.webp` | Explicitly fixture-backed pre-submission checks. |
| Decision 3 | `cli-pipeline-run.webp` | Explicitly fixture-backed stage and failure visibility. |

- **Primary closing action:** `Discuss this project` → `/#contact`
- **Secondary closing action:** `Return to selected work` → `/#work`

## Brazilian Portuguese Contract

### Metadados e Hero

- **Título:** `gosigapp — Infraestrutura de Envios Regulatórios em Go`
- **Descrição:** `Como projetei e implantei um pipeline em Go que valida, assina, faz novas tentativas de forma seletiva, audita e envia seis conjuntos de dados regulatórios ao SIGAP.`
- **Categoria:** `Sistemas Regulados / Plataforma Backend`
- **Deck:** `De seis conjuntos operacionais a envios assinados e rastreáveis ao SIGAP`
- **Papel:** `Desenvolvedor de Software · Desenvolvimento individual`
- **Período:** `Dezembro de 2025 – junho de 2026`
- **Status:** `Implantado via AWS ECS/Fargate`
- **Código:** `Repositório privado`
- **Apoio:** `Projetei e implantei um backend em Go que transforma seis fluxos de dados regulatórios em envios validados, assinados e rastreáveis ao SIGAP para uma operadora brasileira de apostas licenciada.`

### Ordem Narrativa

1. `context` — **Um prazo regulatório se tornou um problema de sistemas**
2. `problem` — **Seis contratos de dados, um único fluxo de envio**
3. `system-overview` — **Do S3 ao envio assinado para o SIGAP**
4. `decision-1` — **Decisão 1 — Identificar falhas antes da transmissão**
5. `decision-2` — **Decisão 2 — Proteger assinatura e transporte**
6. `decision-3` — **Decisão 3 — Tornar falhas recuperáveis e execuções rastreáveis**
7. `contribution` — **O que ficou sob minha responsabilidade**
8. `evidence-limits` — **O que foi entregue — e o que posso comprovar**
9. `tech-stack` — **Tecnologia a serviço do pipeline**
10. `disclosure-actions` — **Código privado, arquitetura aberta à conversa**

The Portuguese object must independently author every paragraph, fact, heading, alt text, caption, badge label where translatable, and action. Only proper nouns, technologies, standards, and code identifiers may remain in English.

- **Ação principal:** `Conversar sobre este projeto` → `/pt-BR/#contact`
- **Ação secundária:** `Voltar aos trabalhos selecionados` → `/pt-BR/#work`

## Evidence Mapping

- Regulatory schedule and six data categories: `REG-01`, `SYS-02`
- End-to-end processing: `SYS-01`, `SYS-03`, `SYS-04`
- Impedidos integration: `REG-02`, `SYS-05`
- Signing and transport: `SEC-01`, `SEC-02`
- Retry, duplicate handling, recovery, jobs, and audit: `OPS-01`, `OPS-02`, `OPS-05`, `OPS-06`
- Deployment and ownership: `GIT-01`, `GIT-02`, `OPS-04`
- Disclosure and media limits: `CONF-01`–`06`, `MEDIA-01`, `DEC-02`, `UNSUP-01`–`07`
