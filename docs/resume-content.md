# Resume Content Contract

**Status:** Owner review required before WO-041
**Scope:** `/resume` and `/pt-BR/resume` resume surfaces only
**Factual authority:** The two approved PDFs listed below

This document freezes the exact bilingual web copy, source mapping, action
destinations, and disclosure boundary for WO-041. The web page may regroup copy
for scanning, but it may not add a claim, metric, date, employer, technology,
credential, or outcome that is absent from the corresponding locale PDF.

## Source manifest

| Locale | Source | Size | SHA-256 | Pages | Page size | Assignment |
|---|---|---:|---|---:|---|---|
| English (`en`) | `docs/Guilherme_Fortuna_Resume.pdf` | 97,520 bytes | `e3c7365bec0dfb606e4338b2879a9dec736d27a4f4a7f11632d6753fbea6464c` | 1 | US Letter, 612 × 792 pt | English resume |
| Brazilian Portuguese (`pt-BR`) | `docs/Guilherme_Fortuna_Curriculo_PT-BR.pdf` | 85,816 bytes | `a330b61f75d390f31acc44405294098ad6956733b0fb505e403b674375bb53bd` | 1 | US Letter, 612 × 792 pt | Brazilian Portuguese resume |

Both files are public, final, unencrypted, script-free, and read-only sources.
WO-041 must publish byte-identical copies under stable public filenames; it
must not rewrite, optimize, redact, embed, or replace either PDF.

## Fact matrix

The matrix has 56 semantic rows. `EN` and `PT` locators refer to the respective
PDF page 1 and section headings. Translation differences are recorded as
presentation differences, not as missing facts.

| # | Semantic fact | EN locator | PT locator | Parity |
|---:|---|---|---|---|
| 1 | Full name: Guilherme Fortuna dos Santos | Header | Cabeçalho | Match |
| 2 | Role family: full-stack developer | Header role | Cabeçalho / função | Match |
| 3 | Role focus: Python, TypeScript, platform systems | Header role | Cabeçalho / função | Translation |
| 4 | Location: Criciúma, Brazil / Brasil | Header contact line | Linha de contato | Match |
| 5 | Remote overlap: UTC-3 and US/EU overlap | Header contact line | Linha de contato | Translation |
| 6 | Public email: guilhermefortuna.dev@gmail.com | Header contact line | Linha de contato | Match |
| 7 | Phone: +55 48 99181-4229 | Header contact line | Linha de contato | Match |
| 8 | Website: guilhermefortuna.dev | Header links | Links do cabeçalho | Match |
| 9 | GitHub: github.com/GuilhermeFortuna | Header links | Links do cabeçalho | Match |
| 10 | LinkedIn: linkedin.com/in/guilherme-fortuna-dos-santos | Header links | Links do cabeçalho | Match |
| 11 | More than five years building software systems | Summary, sentence 1 | Resumo, frase 1 | Translation |
| 12 | Professional production web applications experience | Summary, sentence 1 | Resumo, frase 1 | Translation |
| 13 | Distributed systems and APIs experience | Summary, sentence 1 | Resumo, frase 1 | Translation |
| 14 | Data platforms and cloud infrastructure experience | Summary, sentence 1 | Resumo, frase 1 | Translation |
| 15 | Strong Python with FastAPI | Summary, sentence 2 | Resumo, frase 2 | Match |
| 16 | Strong TypeScript with React/Next.js | Summary, sentence 2 | Resumo, frase 2 | Match |
| 17 | Strong PostgreSQL and AWS/Docker | Summary, sentence 2 | Resumo, frase 2 | Match |
| 18 | End-to-end product delivery | Summary, sentence 3 | Resumo, frase 3 | Translation |
| 19 | Multi-tenant SaaS platforms | Summary, sentence 3 | Resumo, frase 3 | Match |
| 20 | LLM evaluation workflows | Summary, sentence 3 | Resumo, frase 3 | Translation |
| 21 | Secure mTLS regulatory gateways | Summary, sentence 3 | Resumo, frase 3 | Translation |
| 22 | High-throughput / high-performance quantitative backtesting engines | Summary, sentence 3 | Resumo, frase 3 | Translation |
| 23 | English fluency and TOEFL iBT 105 | Summary and Languages | Resumo e Idiomas | Match |
| 24 | International academic background | Summary | Resumo | Match |
| 25 | Languages: Python, TypeScript, JavaScript, Go, SQL | Technical Skills / Languages | Competências / Linguagens | Match |
| 26 | Frontend: React, Next.js, Vite, Tauri, Tailwind CSS, TanStack Query, Zustand | Technical Skills / Frontend & UI | Competências / Frontend e UI | Match |
| 27 | Backend: FastAPI, Node.js, RESTful APIs, PostgreSQL, Redis, Databricks, WebSockets | Technical Skills / Backend & APIs | Competências / Backend e APIs | Match |
| 28 | Cloud: AWS ECS/Fargate, S3, EventBridge, Docker, GitHub Actions, Jenkins, Linux, CI/CD | Technical Skills / Cloud & DevOps | Competências / Nuvem e DevOps | Match |
| 29 | Data/AI: ETL, Parquet, Pandas, LLM tooling/evaluation | Technical Skills / Data & AI Systems | Competências / Dados e IA | Translation |
| 30 | Security/quality: mTLS, X.509/PFX, RSA-SHA256, Pytest, Playwright, Vitest | Technical Skills / Security & Quality | Competências / Segurança e QA | Translation |
| 31 | BRXBET & RICOBET employer | Work Experience / first entry | Experiência / primeira entrada | Match |
| 32 | BRXBET & RICOBET role: Software Developer — Integrations & Data Platforms | First entry heading | Cabeçalho da primeira entrada | Translation |
| 33 | BRXBET & RICOBET period: Sep 2025 – Jul 2026 | First entry heading | Set 2025 - Jul 2026 | Translation |
| 34 | BRXBET & RICOBET remote status | First entry heading | Primeira entrada | Match |
| 35 | GoSIGAPP production Go regulatory gateway | First work bullet 1 | Primeira entrada, bullet 1 | Translation |
| 36 | SIGAP, mTLS, RSA-SHA256, XML validation, X.509/PFX, failure recovery | First work bullet 1 | Primeira entrada, bullet 1 | Match |
| 37 | Aegis Fraud Intelligence full-stack platform | First work bullet 2 | Primeira entrada, bullet 2 | Match |
| 38 | FastAPI, PostgreSQL, Databricks, Redis in Aegis | First work bullet 2 | Primeira entrada, bullet 2 | Match |
| 39 | Concurrent ETL synchronization and high-volume player/financial/event data | First work bullet 2 | Primeira entrada, bullet 2 | Translation |
| 40 | Investigation time from hours to sub-minute operational lookups | First work bullet 2 | Primeira entrada, bullet 2 | Translation |
| 41 | Platform integrations across gaming, analytics, payment, government endpoints | First work bullet 3 | Primeira entrada, bullet 3 | Translation |
| 42 | Isolated configurations and retry handling | First work bullet 3 | Primeira entrada, bullet 3 | Translation |
| 43 | AWS ECS/Fargate, S3, EventBridge APIs and workers | First work bullet 4 | Primeira entrada, bullet 4 | Match |
| 44 | Structured logging, alerting, automated failure recovery | First work bullet 4 | Primeira entrada, bullet 4 | Translation |
| 45 | Jones Software employer and Software Developer / Data Analyst role | Work Experience / second entry | Experiência / segunda entrada | Translation |
| 46 | Jones Software period: Jul 2024 – Sep 2025 and remote status | Second entry heading | Segunda entrada | Translation |
| 47 | Python OCR ingestion from insurance certificates to validated datasets | Second work bullet 1 | Segunda entrada, bullet 1 | Translation |
| 48 | Compliance audit workflows | Second work bullet 1 | Segunda entrada, bullet 1 | Match |
| 49 | Python/Node.js LLM prompt testing and evaluation tooling | Second work bullet 2 | Segunda entrada, bullet 2 | Translation |
| 50 | Structural JSON comparisons, concurrent batches, automated reports | Second work bullet 2 | Segunda entrada, bullet 2 | Translation |
| 51 | Pytest, AWS S3, Jenkins CI, data integrity and continuous verification | Second work bullet 3 | Segunda entrada, bullet 3 | Translation |
| 52 | Q independent project, Mar 2020 – Present / Atual | Projects / first entry | Projetos / primeira entrada | Translation |
| 53 | Q desktop quantitative research/backtesting stack and capabilities | First project bullet 1 | Projetos / primeira entrada, bullet 1 | Translation |
| 54 | Optuna, evolutionary algorithms, Redis/Dramatiq, zero-lookahead safeguards | First project bullet 2 | Projetos / primeira entrada, bullet 2 | Match |
| 55 | Nexo Dental independent project, 2026 – Present / Atual | Projects / second entry | Projetos / segunda entrada | Translation |
| 56 | Nexo Dental AI-assisted multi-tenant clinic platform and listed stack/workflows | Second project bullet 1 | Projetos / segunda entrada, bullet 1 | Translation |

### Discrepancies and permitted normalization

There are no unresolved factual contradictions or missing semantic facts. The
following are translation or typography differences and must remain localized:

- English uses `Sep`, `Jul`, `Present`, `Remote`, `Full Professional Proficiency`,
  `Frontend & UI`, `Cloud & DevOps`, and `Data & AI Systems`; Portuguese uses
  `Set`, `Jul`, `Atual`, `Remoto`, `Plena proficiência profissional`, `Frontend e
  UI`, `Nuvem e DevOps`, and `Dados e IA`.
- English uses an en dash in date ranges and Portuguese uses a hyphen in the
  source PDF; the web contract normalizes both to an en dash while preserving
  the same months and years.
- English says `high-throughput` and Portuguese says `alto desempenho`; both
  describe the same PDF backtesting-engine claim and neither may be expanded
  into a new performance metric.
- English says `player, financial, and event data`; Portuguese says `dados de
  jogadores, finanças e eventos`; these are equivalent translations.
- English labels the first project `Q — Quantitative Research & Execution
  Platform`; Portuguese labels it `Q - Plataforma de Pesquisa e Execução
  Quantitativa`. The project name, independent status, period, and bullets are
  unchanged facts.
- English says `role-based tenant data isolation`; Portuguese says
  `isolamento de dados por clínica e perfil de acesso`. This is a localized
  rendering of the approved source sentence, not permission to add an
  additional security claim.

## Exact bilingual web copy

Every block below is publishable copy. The locator at the end of each block is
the source sentence or source line that authorizes it.

### Metadata

| Locale | Title | Description | Source |
|---|---|---|---|
| EN | `Guilherme Fortuna — Full-stack Developer \| Python, TypeScript & Platform Systems` | `Full-stack developer with 5+ years building production web applications, distributed systems, data platforms, and cloud infrastructure.` | EN Header role; Professional Summary sentences 1–2 |
| PT-BR | `Guilherme Fortuna — Desenvolvedor Full-stack \| Python, TypeScript e Sistemas de Plataforma` | `Desenvolvedor full-stack com mais de 5 anos criando aplicações web em produção, sistemas distribuídos, plataformas de dados e infraestrutura em nuvem.` | PT Cabeçalho; Resumo frases 1–2 |

### Hero identity

| Key | EN | PT-BR | Source |
|---|---|---|---|
| Name | `Guilherme Fortuna dos Santos` | `Guilherme Fortuna dos Santos` | Header |
| Role | `Full-stack Developer` | `Desenvolvedor Full-stack` | Header role |
| Focus | `Python, TypeScript & Platform Systems` | `Python, TypeScript e Sistemas de Plataforma` | Header role |
| Location | `Criciúma, Brazil` | `Criciúma, Brasil` | Header contact line |
| Remote overlap | `Remote · UTC-3 / US EST & EU Overlap` | `Remoto · UTC-3 / Horários EUA e Europa` | Header contact line |
| Summary | `Full-stack developer with 5+ years building software systems, including professional experience delivering production web applications, distributed systems and APIs, data platforms, and cloud infrastructure.` | `Desenvolvedor full-stack com mais de 5 anos criando sistemas de software, incluindo experiência profissional com aplicações web em produção, sistemas distribuídos e APIs, plataformas de dados e infraestrutura em nuvem.` | Professional Summary sentence 1 |
| Availability | `Available and actively looking for a remote position.` | `Disponível e buscando ativamente uma posição remota.` | PDF summary's remote positioning; localized resume action wording |
| Email | `guilhermefortuna.dev@gmail.com` | `guilhermefortuna.dev@gmail.com` | Header contact line |
| Phone | `+55 48 99181-4229` | `+55 48 99181-4229` | Header contact line |
| Website | `guilhermefortuna.dev` | `guilhermefortuna.dev` | Header links |
| GitHub | `github.com/GuilhermeFortuna` | `github.com/GuilhermeFortuna` | Header links |
| LinkedIn | `linkedin.com/in/guilherme-fortuna-dos-santos` | `linkedin.com/in/guilherme-fortuna-dos-santos` | Header links |

### Skills

| Group | EN | PT-BR | Source |
|---|---|---|---|
| Languages | `Python, TypeScript, JavaScript, Go, SQL` | `Python, TypeScript, JavaScript, Go, SQL` | Technical Skills / Languages |
| Frontend and UI | `React, Next.js, Vite, Tauri, Tailwind CSS, TanStack Query, Zustand` | `React, Next.js, Vite, Tauri, Tailwind CSS, TanStack Query, Zustand` | Technical Skills / Frontend & UI; Frontend e UI |
| Backend and APIs | `FastAPI, Node.js, RESTful APIs, PostgreSQL, Redis, Databricks, WebSockets` | `FastAPI, Node.js, APIs RESTful, PostgreSQL, Redis, Databricks, WebSockets` | Technical Skills / Backend & APIs; Backend e APIs |
| Cloud and DevOps | `AWS (ECS/Fargate, S3, EventBridge), Docker, GitHub Actions, Jenkins, Linux, CI/CD` | `AWS (ECS/Fargate, S3, EventBridge), Docker, GitHub Actions, Jenkins, Linux, CI/CD` | Technical Skills / Cloud & DevOps; Nuvem e DevOps |
| Data and AI systems | `ETL Data Pipelines, Parquet, Pandas, LLM Tooling & Evaluation` | `Pipelines ETL, Parquet, Pandas, ferramentas e avaliação de LLMs` | Technical Skills / Data & AI Systems; Dados e IA |
| Security and quality | `Mutual TLS (mTLS), X.509/PFX, RSA-SHA256, Pytest, Playwright, Vitest` | `TLS mútuo (mTLS), X.509/PFX, RSA-SHA256, Pytest, Playwright, Vitest` | Technical Skills / Security & Quality; Segurança e QA |

### Work experience

#### BRXBET & RICOBET

| Field | EN | PT-BR | Source |
|---|---|---|---|
| Role | `Software Developer — Integrations & Data Platforms` | `Desenvolvedor — Integrações e Plataformas de Dados` | First work-entry heading |
| Dates/status | `Sep 2025 – Jul 2026 · Remote` | `Set 2025 – Jul 2026 · Remoto` | First work-entry heading |
| Bullet 1 | `GoSIGAPP Regulatory Gateway: Architected and deployed a production Go microservice for Brazilian regulatory compliance (SIGAP), implementing mutual TLS (mTLS), RSA-SHA256 payload signing, automated XML validation, and X.509/PFX certificate handling with resilient failure recovery.` | `Gateway regulatório GoSIGAPP: Projetei e implantei em produção um microsserviço Go para conformidade regulatória brasileira (SIGAP), com TLS mútuo (mTLS), assinatura de payloads RSA-SHA256, validação automática de XML, gestão de certificados X.509/PFX e recuperação resiliente de falhas.` | First work-entry bullet 1 |
| Bullet 2 | `Aegis Fraud Intelligence: Engineered a full-stack fraud investigation platform using FastAPI, PostgreSQL, Databricks, and Redis; built concurrent ETL synchronization jobs processing high-volume player, financial, and event data to accelerate analyst investigations from hours to sub-minute operational lookups.` | `Aegis - Inteligência antifraude: Desenvolvi uma plataforma full-stack de investigação de fraudes com FastAPI, PostgreSQL, Databricks e Redis; criei rotinas ETL concorrentes para sincronizar grandes volumes de dados de jogadores, finanças e eventos, reduzindo investigações de horas para consultas operacionais de menos de um minuto.` | First work-entry bullet 2 |
| Bullet 3 | `Platform Integrations: Built integration services and APIs connecting gaming platforms, analytics pipelines, third-party payment providers, and government endpoints with isolated configurations and retry handling.` | `Integrações de plataformas: Criei serviços de integração e APIs conectando plataformas de jogos, pipelines analíticos, provedores de pagamento e endpoints governamentais, com configurações isoladas e tratamento de novas tentativas.` | First work-entry bullet 3 |
| Bullet 4 | `Cloud Infrastructure: Containerized and operated APIs and background worker workloads on AWS ECS/Fargate, S3, and EventBridge with structured logging, alerting, and automated failure recovery.` | `Infraestrutura em nuvem: Containerizei e operei APIs e workers em segundo plano no AWS ECS/Fargate, S3 e EventBridge, com logs estruturados, alertas e recuperação automática de falhas.` | First work-entry bullet 4 |

#### Jones Software

| Field | EN | PT-BR | Source |
|---|---|---|---|
| Role | `Software Developer / Data Analyst` | `Desenvolvedor de Software / Analista de Dados` | Second work-entry heading |
| Dates/status | `Jul 2024 – Sep 2025 · Remote` | `Jul 2024 – Set 2025 · Remoto` | Second work-entry heading |
| Bullet 1 | `Automated Data Pipelines: Built Python ingestion pipelines converting unstructured OCR output from insurance certificates into validated, structured datasets used in compliance audit workflows.` | `Pipelines de dados automatizados: Criei pipelines de ingestão em Python para converter saídas não estruturadas de OCR de certificados de seguro em dados estruturados e validados, usados em auditorias de conformidade.` | Second work-entry bullet 1 |
| Bullet 2 | `LLM Verification Tooling: Developed verification and evaluation tooling in Python and Node.js for LLM prompt testing, structural JSON comparisons, concurrent batch processing, and automated reporting.` | `Ferramentas de verificação de LLMs: Desenvolvi ferramentas em Python e Node.js para testes de prompts, avaliação, comparação estrutural de JSON, processamento concorrente em lote e geração automática de relatórios.` | Second work-entry bullet 2 |
| Bullet 3 | `Test Automation & Delivery: Automated test suites using Pytest and integrated workflows with AWS S3 and Jenkins CI pipelines to ensure data integrity and continuous verification.` | `Automação de testes e entrega: Automatizei suítes de testes com Pytest e integrei fluxos com AWS S3 e pipelines de CI no Jenkins para garantir a integridade dos dados e a verificação contínua.` | Second work-entry bullet 3 |

### Selected software projects

#### Q

| Field | EN | PT-BR | Source |
|---|---|---|---|
| Project/status | `Q — Quantitative Research & Execution Platform · Independent` | `Q — Plataforma de Pesquisa e Execução Quantitativa · Independente` | First project heading |
| Dates | `Mar 2020 – Present` | `Mar 2020 – Atual` | First project heading |
| Bullet 1 | `Developed a desktop quantitative research and backtesting platform using Python/FastAPI, React/TypeScript/Tauri, PostgreSQL, and Parquet for market-data ingestion, interactive charting, and paper execution.` | `Desenvolvi uma plataforma desktop de pesquisa quantitativa e backtesting com Python/FastAPI, React/TypeScript/Tauri, PostgreSQL e Parquet para ingestão de dados de mercado, gráficos interativos e execução simulada.` | First project bullet 1 |
| Bullet 2 | `Built distributed parameter discovery pipelines using Optuna and evolutionary algorithms over Redis/Dramatiq worker pools, enforcing strict zero-lookahead causality safeguards across backtests.` | `Criei pipelines distribuídos de busca de parâmetros com Optuna e algoritmos evolutivos em pools de workers Redis/Dramatiq, com controles rigorosos de causalidade para impedir o uso de dados futuros nos backtests.` | First project bullet 2 |

#### Nexo Dental

| Field | EN | PT-BR | Source |
|---|---|---|---|
| Project/status | `Nexo Dental — Multi-Tenant Clinic Management SaaS · Independent` | `Nexo Dental — SaaS Multi-Tenant de Gestão de Clínicas · Independente` | Second project heading |
| Dates | `2026 – Present` | `2026 – Atual` | Second project heading |
| Bullet 1 | `Architected an AI-assisted, multi-tenant dental clinic management platform (React, TypeScript, FastAPI, PostgreSQL) with role-based tenant data isolation, appointment scheduling, and automated clinical workflows.` | `Projetei uma plataforma multi-tenant de gestão de clínicas odontológicas assistida por IA (React, TypeScript, FastAPI, PostgreSQL), com isolamento de dados por clínica e perfil de acesso, agendamento e automação de fluxos clínicos.` | Second project bullet 1 |

### Education and international experience

| Order | EN | PT-BR | Source |
|---:|---|---|---|
| 1 | `Savonia University of Applied Sciences (Kuopio, Finland) & SATC (Brazil) — Mechanical Engineering & Academic Exchange · 2014 – 2018` | `Savonia University of Applied Sciences (Kuopio, Finlândia) e SATC (Brasil) — Engenharia Mecânica e Intercâmbio Acadêmico · 2014 – 2018` | First education line |
| 2 | `SATC (Brazil) — Software Engineering (In Progress) · 2024 – Present` | `SATC (Brasil) — Engenharia de Software (Em andamento) · 2024 – Atual` | Second education line |
| 3 | `SATC (Brazil) — Technical Diploma in Electromechanics · 2011 – 2013` | `SATC (Brasil) — Técnico em Eletromecânica · 2011 – 2013` | Third education line |

### Languages

| Locale | Copy | Source |
|---|---|---|
| EN | `English: Bilingual / Full Professional Proficiency (TOEFL iBT 105) · Portuguese: Native` | Languages |
| PT-BR | `Inglês: Bilíngue / Plena proficiência profissional (TOEFL iBT 105) · Português: Nativo` | Idiomas |

### Localized actions

| Action | EN label | PT-BR label | Target | Source |
|---|---|---|---|---|
| View PDF | `View PDF` | `Ver PDF` | Locale-specific public PDF | Source manifest |
| Download PDF | `Download PDF` | `Baixar PDF` | Locale-specific public PDF with stable download filename | Source manifest |
| Email | `Email` | `E-mail` | `mailto:guilhermefortuna.dev@gmail.com` | Header contact line |
| Phone | `Phone` | `Telefone` | `tel:+5548991814229` | Header contact line |
| Website | `Website` | `Site` | `https://guilhermefortuna.dev` | Header links |
| GitHub | `GitHub` | `GitHub` | `https://github.com/GuilhermeFortuna` | Header links |
| LinkedIn | `LinkedIn` | `LinkedIn` | `https://www.linkedin.com/in/guilherme-fortuna-dos-santos/` | Header links |
| Contact | `Contact` | `Contato` | `mailto:guilhermefortuna.dev@gmail.com` | Header email |
| Return to Work | `Return to Work` | `Voltar ao Trabalho` | Locale homepage Work anchor | Existing site navigation; action label only |

## Publication and disclosure boundary

- Employer names `BRXBET` and `RICOBET` are allowed on these resume surfaces.
- The literal `Aegis Fraud Intelligence` bullet is allowed because the owner
  approved it for resume publication.
- No resume copy, metadata, action, breadcrumb, project relation, or link may
  mention `/work/aegis`, describe this employment entry as the Work case study,
  or imply a cross-surface connection to that chapter.
- Existing Work and case-study disclosure rules remain unchanged. The resume
  exception must not be copied into `docs/content.md` case-study chapters.
- The phone appears only on the two resume routes and their corresponding PDFs;
  it is not a homepage Contact action.
- No private repository URL, credentials, customer data, deployment identifier,
  or unsupported achievement may be introduced.
- The PDFs are ordinary view/download documents. No embedded viewer, iframe,
  PDF renderer, or rewritten PDF is part of this contract.

## Parity and review ledger

- Fact matrix: 56 semantic rows; 56/56 present in both locales.
- Factual mismatches: 0 unresolved; 6 translation/typography normalizations
  are listed explicitly above.
- English copy word count: 544 words, counting inline-code copy fields in the
  metadata, identity, skills, experience, projects, education, languages, and
  actions tables.
- Portuguese copy word count: 701 words, counting the corresponding PT-BR
  inline-code fields.
- Owner review state: `REVIEW REQUIRED`.
- Freeze state: no WO-041 freeze commit exists until the owner accepts this
  exact copy.
