import type { CaseStudy } from "@/types/case-study";
import type { Locale } from "@/lib/i18n";

/**
 * Visible copy is transcribed from the owner-approved content contract,
 * `docs/gosigapp-case-study-content.md` (WO-031).
 * Rewording any string here requires a new content gate.
 * Section order is fixed by that contract and must not change.
 */

const CAPTURE_WIDTH = 2560;
const CAPTURE_HEIGHT = 1440;

export const gosigappCaseStudy = {
  slug: "gosigapp",

  metadata: {
    title: "gosigapp — Reliable SIGAP Submission Pipeline",
    description:
      "A Go backend pipeline for file validation, processing, retries, auditability, and submission to SIGAP.",
  },

  hero: {
    backLink: { label: "Back to selected work", href: "/#work" },
    category: "Government Compliance / Backend Pipeline",
    title: "gosigapp",
    deck: "Reliable SIGAP Submission Pipeline",
    facts: [
      { label: "Role", value: "Software Developer (Sole Author)" },
      { label: "Period", value: "2025-12-24 – 2026-06-22" },
      { label: "State", value: "Deployed to AWS ECS/Fargate" },
      { label: "Source", value: "Private Repository" },
    ],
    support:
      "A Go backend pipeline built to fetch, validate, digitally sign, package, and submit daily and monthly regulatory files to Brazil's SIGAP API for a licensed betting operator.",
    // DEC-02 & WO-031: Backend CLI/service pipeline with no graphic UI; hero media omitted.
  },

  context: {
    id: "context",
    heading: "Regulatory Compliance Stakes",
    paragraphs: [
      "In Brazil's regulated iGaming market, operators face a mandatory legal obligation to submit daily operational logs and monthly summary files directly to the Ministry of Finance's regulatory system (SIGAP). Reporting errors, malformed data structures, or missed submission windows carry strict regulatory penalties and potential license suspension. gosigapp was engineered to convert raw betting engine data into verifiable, audit-backed regulatory filings—transforming compliance from a manual operational risk into an automated, deterministic pipeline.",
    ],
  },

  problem: {
    id: "problem",
    heading: "The Regulatory Integration Challenge",
    paragraphs: [
      "Submitting data to SIGAP requires far more than posting JSON payloads. Raw operator data across six distinct dataset categories must be fetched from S3 storage, extracted from ZIP archives, and validated against rigid government XML schemas (XSD). Every submission requires PKCS#12 PFX digital signatures using RSA-SHA256, gzip compression, base64 encoding, and mutual TLS (mTLS) transport with automated OAuth2 authentication. Doing this reliably across high daily event volumes—without manual intervention or failed transmissions—demanded a resilient processing architecture.",
    ],
  },

  system: {
    id: "system-overview",
    heading: "Pipeline Architecture & End-to-End Processing",
    paragraphs: [
      "The gosigapp system operates as an end-to-end Go processing pipeline, orchestrating data extraction, validation, cryptographic signing, packaging, and mTLS transmission. Built with a dual-entry structure (cmd/pipeline CLI for batch runs and cmd/server HTTP service for real-time orchestration), the system integrates automated pre-submission compliance matrix audits, self-exclusion API lookups, and durable log storage backed by AWS DynamoDB.",
    ],
    images: [
      {
        src: "/work/gosigapp/system-map.svg",
        alt: "Vector architecture diagram showing the gosigapp end-to-end regulatory pipeline from S3 data fetch through XSD validation, PFX signing, mTLS transport, and DynamoDB log store.",
        width: 1200,
        height: 680,
        caption:
          "End-to-end architecture diagram detailing the gosigapp pipeline, security boundary, auditability layer, and AWS ECS deployment.",
      },
    ],
  },

  decisions: [
    {
      id: "decision-1",
      heading: "Regulator-Imposed Cryptographic Security & Transport",
      paragraphs: [
        "Rather than treating security as optional hardening, regulatory compliance required strict cryptographic standards at the application layer. gosigapp integrates PKCS#12 PFX certificate parsing directly into the pipeline (internal/auth), executing RSA-SHA256 XML digital signatures (ds:Signature) over aggregated dataset payloads before compression. For transport, the sender module establishes mutual TLS (mTLS) connections with automated OAuth2 token lifecycle management and memory caching. Cryptographic keys and PFX secrets are injected securely via environment variables, ensuring zero credential exposure while maintaining strict regulator compliance.",
      ],
    },
    {
      id: "decision-2",
      heading: "Pre-Submission Compliance Matrix & Self-Exclusion Verification",
      paragraphs: [
        "To guarantee zero rejected transmissions, gosigapp implements a comprehensive pre-submission compliance audit matrix prior to payload packaging (cmd/compliance-check). The engine validates raw records against all six mandatory SIGAP dataset schemas—Bettors (apostadores), Wallets (carteiras), Sports Betting (esportivas), Online Games (jogos), Daily Aggregates (diarios), and Monthly Aggregates (mensais). Additionally, the internal/impedidos module queries the official SIGAP API Impedidos v2 endpoint (GET /impedimento/v2/condicao/{cpf}) to verify bettor self-exclusion status and legal restrictions (SPA/MF-SIGAP-001/2026) before file generation.",
      ],
      images: [
        {
          src: "/work/gosigapp/compliance-check-output.webp",
          alt: "Terminal output showing the gosigapp compliance-check audit matrix passing XSD schema validation, PFX signature integrity, SIGAP Impedidos v2 checks, and multi-brand header checks.",
          width: CAPTURE_WIDTH,
          height: CAPTURE_HEIGHT,
          caption:
            "Pre-submission compliance matrix output verifying XSD schema conformance, PFX cryptographic integrity, and SIGAP Impedidos v2 self-exclusion checks against fixture configuration.",
        },
      ],
    },
    {
      id: "decision-3",
      heading: "Durable Auditability & Asynchronous Execution Lifecycle",
      paragraphs: [
        "Regulatory reporting demands complete historical proof for every attempted submission. gosigapp combines an asynchronous job runner (internal/job) with AWS DynamoDB log storage (internal/logstore) to track full job lifecycles (queued, running, completed, failed, cancelled). Scheduled via an automated internal cron system (internal/scheduler), each pipeline run records step-by-stage timestamps, XSD validation results, cryptographic checksums, and HTTP receipt IDs. If a network interruption occurs, specialized CLI tools (cmd/backfill, cmd/date-detail) enable state inspection and deterministic re-runs without data duplication.",
      ],
      images: [
        {
          src: "/work/gosigapp/cli-pipeline-run.webp",
          alt: "Terminal log capture demonstrating stage-by-stage gosigapp pipeline execution from S3 download through XSD validation, PFX signing, mTLS transmission, and DynamoDB audit recording.",
          width: CAPTURE_WIDTH,
          height: CAPTURE_HEIGHT,
          caption:
            "Terminal execution output of the gosigapp CLI pipeline, showing stage-by-stage validation, PFX signing, mTLS submission, receipt capture, and DynamoDB log recording.",
        },
      ],
    },
  ],

  contribution: {
    id: "contribution",
    heading: "Engineering Ownership & AI-Assisted Execution",
    paragraphs: [
      "Guilherme designed, implemented, and delivered the entire gosigapp codebase as sole author across 100 commits (December 2025 – June 2026). Using AI-assisted software development, every layer—from Go pipeline internals and XML/XSD parsing to DynamoDB integration, CLI utility suites, and containerized deployment infrastructure—was architected and written independently to satisfy regulatory mandates.",
    ],
  },

  delivered: {
    id: "evidence-limits",
    heading: "Implementation Verification & Operational Scope",
    paragraphs: [
      "The gosigapp codebase is verified through end-to-end source code inspection and containerized cloud configuration files (Dockerfile, GitHub Actions CI/CD workflows, AWS ECS/Fargate task definitions). As a specialized backend CLI and service pipeline, gosigapp has no graphic user interface. In accordance with portfolio disclosure standards, the source code repository is private, employer details and brand identifiers remain confidential, and no unverified live transaction metrics or uptime percentages are claimed.",
    ],
  },

  technology: {
    id: "tech-stack",
    heading: "Technology Stack",
    paragraphs: [],
    badges: [
      "Go 1.22+",
      "AWS ECS/Fargate",
      "AWS DynamoDB",
      "AWS S3",
      "Docker",
      "GitHub Actions",
      "PKCS#12 PFX",
      "RSA-SHA256",
      "mTLS",
      "OAuth2",
      "XML",
      "XSD Schemas",
      "SIGAP REST API",
    ],
  },

  confidentiality: {
    id: "disclosure-actions",
    heading: "Disclosure & Navigation",
    paragraphs: [
      "gosigapp was built for an unnamed licensed betting operator in Brazil to meet SIGAP regulatory compliance requirements. Employer identity, brand codes, AWS resource IDs, and PFX secrets are withheld. All CLI outputs and diagrams display fixture configuration only.",
    ],
    actions: [
      { label: "Return to selected work", href: "/#work" },
      { label: "Get in touch", href: "/#contact" },
    ],
  },
} as const satisfies CaseStudy;

export function getGosigappCaseStudy(locale: Locale = "en"): CaseStudy {
  if (locale === "pt-BR") {
    return {
      ...gosigappCaseStudy,
      metadata: {
        title: "gosigapp — Pipeline de Envio Confiável para o SIGAP",
        description:
          "Um pipeline backend em Go para validação de arquivos, processamento, tentativas, auditabilidade e envio para o SIGAP.",
      },
      hero: {
        ...gosigappCaseStudy.hero,
        backLink: { label: "Voltar aos trabalhos selecionados", href: "/pt-BR/#work" },
        category: "Conformidade Governamental / Pipeline Backend",
        facts: [
          { label: "Papel", value: "Desenvolvedor de Software (Único Autor)" },
          { label: "Período", value: "2025-12-24 – 2026-06-22" },
          { label: "Status", value: "Implantado no AWS ECS/Fargate" },
          { label: "Fonte", value: "Repositório Privado" },
        ],
        support:
          "Um pipeline backend em Go construído para buscar, validar, assinar digitalmente, empacotar e enviar arquivos regulatórios diários e mensais para a API do SIGAP para um operador de apostas licenciado.",
      },
      confidentiality: {
        ...gosigappCaseStudy.confidentiality,
        actions: [
          { label: "Voltar aos trabalhos selecionados", href: "/pt-BR/#work" },
          { label: "Entrar em contato", href: "/pt-BR/#contact" },
        ],
      },
    };
  }
  return gosigappCaseStudy;
}
