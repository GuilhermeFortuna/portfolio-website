import type { CaseStudy } from "@/types/case-study";
import type { Locale } from "@/lib/i18n";

/**
 * Visible copy follows the owner-approved content contract,
 * `docs/gosigapp-case-study-content.md`.
 *
 * English and Brazilian Portuguese are complete authored objects. Neither
 * locale may inherit visible copy from the other.
 */

const CAPTURE_WIDTH = 2560;
const CAPTURE_HEIGHT = 1440;

export const gosigappCaseStudy = {
  slug: "gosigapp",

  metadata: {
    title: "gosigapp — Regulated Submission Infrastructure in Go",
    description:
      "How I designed and deployed a Go pipeline that validates, signs, retries, audits, and submits six regulated datasets to Brazil's SIGAP.",
  },

  hero: {
    backLink: { label: "Back to selected work", href: "/#work" },
    category: "Regulated Systems / Backend Platform",
    title: "gosigapp",
    deck: "From six operational datasets to signed, auditable SIGAP submissions",
    facts: [
      { label: "Role", value: "Software Developer · Sole human developer" },
      { label: "Period", value: "December 2025 – June 2026" },
      { label: "State", value: "Deployed via AWS ECS/Fargate" },
      { label: "Source", value: "Private repository" },
    ],
    support:
      "I designed and deployed a Go backend that turns six regulated data feeds into validated, signed, and auditable SIGAP submissions for a licensed Brazilian betting operator.",
    // Backend CLI/service pipeline with no graphic UI; hero media omitted.
  },

  context: {
    id: "context",
    heading: "A regulatory deadline became a systems problem",
    paragraphs: [
      "Brazilian betting operators must send six categories of operational data to the Ministry of Finance's SIGAP platform on defined daily and monthly schedules. I treated that obligation as a systems problem: every run had to turn changing source data into a filing that was structurally valid, traceable, and ready within the reporting window.",
    ],
  },

  problem: {
    id: "problem",
    heading: "Six data contracts, one submission path",
    paragraphs: [
      "The inputs arrived through S3 as ZIP archives covering bettors, wallets, sports betting, online games, and daily and monthly operator aggregates. Before SIGAP could accept them, the pipeline had to extract and validate XML, apply an RSA-SHA256 signature from a PKCS#12 certificate, compress and encode the result, authenticate with OAuth2, and transmit it over mutual TLS.",
    ],
  },

  system: {
    id: "system-overview",
    heading: "From S3 input to signed SIGAP submission",
    paragraphs: [
      "I built one Go processing core for the full path from S3 retrieval to SIGAP response handling. A batch CLI runs scheduled workloads, while an HTTP service exposes job control and progress for operational use. Around that core, dedicated commands inspect compliance, query submission status, backfill missing dates, and keep execution history in DynamoDB.",
    ],
    images: [
      {
        src: "/work/gosigapp/system-map.svg",
        alt: "Architecture diagram of the gosigapp flow from S3 retrieval through XML validation, PFX signing, mTLS submission, job execution, and DynamoDB audit storage.",
        width: 1200,
        height: 680,
        caption:
          "One processing core serves batch and service entry points while keeping validation, signing, transport, and audit responsibilities explicit.",
      },
    ],
  },

  decisions: [
    {
      id: "decision-1",
      heading: "Decision 1 — Fail before transmission",
      paragraphs: [
        "I moved preventable failures ahead of the network boundary. The pipeline validates XML against the six SIGAP schemas, and a dedicated compliance command checks schema conformance, certificate integrity, and configuration before packaging. The service layer also integrates with SIGAP's official Impedidos v2 service for self-exclusion and restriction checks.",
      ],
      images: [
        {
          src: "/work/gosigapp/compliance-check-output.webp",
          alt: "Fixture terminal output from the gosigapp compliance command showing XML schema, certificate, configuration, and SIGAP Impedidos checks.",
          width: CAPTURE_WIDTH,
          height: CAPTURE_HEIGHT,
          caption:
            "A fixture-backed compliance run surfaces schema, signing, configuration, and restriction-check problems before a submission is assembled.",
        },
      ],
    },
    {
      id: "decision-2",
      heading: "Decision 2 — Protect signing and transport",
      paragraphs: [
        "Signing and transport are part of the submission contract, not optional hardening. The pipeline parses PKCS#12 certificates, applies RSA-SHA256 XML signatures, and sends the packaged payload through an mTLS client with cached OAuth2 tokens. Certificate material and API credentials stay outside the source code and enter through environment-based configuration.",
      ],
    },
    {
      id: "decision-3",
      heading: "Decision 3 — Make failures recoverable and runs auditable",
      paragraphs: [
        "I made retry behavior selective: network and 5xx failures receive bounded backoff, while 4xx responses return immediately for correction. Jobs move through queued, running, completed, failed, and cancelled states; structured execution records are written to DynamoDB. For recovery, the backfill tooling checks SIGAP for existing submissions before processing missing dates and treats duplicate-batch responses as already submitted rather than silently resending.",
      ],
      images: [
        {
          src: "/work/gosigapp/cli-pipeline-run.webp",
          alt: "Fixture terminal output showing a gosigapp run progressing through retrieval, validation, signing, submission, response handling, and audit recording.",
          width: CAPTURE_WIDTH,
          height: CAPTURE_HEIGHT,
          caption:
            "Fixture output exposes each stage and its result so an operator can trace a run and act on a failure without relying on a black box.",
        },
      ],
    },
  ],

  contribution: {
    id: "contribution",
    heading: "What I owned",
    paragraphs: [
      "As the sole human developer, I translated the reporting requirements into the architecture, implemented the Go pipeline and operational tooling, connected AWS storage and audit services, and delivered the container and CI/CD path to ECS/Fargate. AI assisted implementation, but the system design, tradeoffs, verification, and deployment decisions remained my responsibility.",
    ],
  },

  delivered: {
    id: "evidence-limits",
    heading: "What shipped—and what I can verify",
    paragraphs: [
      "The system was deployed via AWS ECS/Fargate, and this case study is grounded in the private codebase, Docker image, GitHub Actions workflow, task definition, and sanitized fixture captures. It has no public graphic interface, and I do not publish operational volumes, uptime, rejection rates, or business impact that I cannot independently verify.",
    ],
  },

  technology: {
    id: "tech-stack",
    heading: "Technology in service of the pipeline",
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
      "XML/XSD",
      "SIGAP REST API",
    ],
  },

  confidentiality: {
    id: "disclosure-actions",
    heading: "Private source, discussable architecture",
    paragraphs: [
      "The repository remains private because it implements a regulated integration for an unnamed Brazilian betting operator. The diagrams and terminal captures use fixture configuration only. I can discuss the architecture, failure handling, security boundaries, and my engineering decisions in more depth without exposing the operator, its infrastructure, or its data.",
    ],
    actions: [
      { label: "Discuss this project", href: "/#contact" },
      { label: "Return to selected work", href: "/#work" },
    ],
  },
} as const satisfies CaseStudy;

const gosigappCaseStudyPtBr = {
  slug: "gosigapp",

  metadata: {
    title: "gosigapp — Infraestrutura de Envios Regulatórios em Go",
    description:
      "Como projetei e implantei um pipeline em Go que valida, assina, faz novas tentativas de forma seletiva, audita e envia seis conjuntos de dados regulatórios ao SIGAP.",
  },

  hero: {
    backLink: { label: "Voltar aos trabalhos selecionados", href: "/pt-BR/#work" },
    category: "Sistemas Regulados / Plataforma Backend",
    title: "gosigapp",
    deck: "De seis conjuntos operacionais a envios assinados e rastreáveis ao SIGAP",
    facts: [
      { label: "Papel", value: "Desenvolvedor de Software · Desenvolvimento individual" },
      { label: "Período", value: "Dezembro de 2025 – junho de 2026" },
      { label: "Status", value: "Implantado via AWS ECS/Fargate" },
      { label: "Código", value: "Repositório privado" },
    ],
    support:
      "Projetei e implantei um backend em Go que transforma seis fluxos de dados regulatórios em envios validados, assinados e rastreáveis ao SIGAP para uma operadora brasileira de apostas licenciada.",
  },

  context: {
    id: "context",
    heading: "Um prazo regulatório se tornou um problema de sistemas",
    paragraphs: [
      "Operadoras brasileiras de apostas precisam enviar seis categorias de dados operacionais à plataforma SIGAP do Ministério da Fazenda em ciclos diários e mensais definidos. Tratei essa obrigação como um problema de sistemas: cada execução precisava transformar dados de origem sujeitos a mudanças em um envio estruturalmente válido, rastreável e pronto dentro da janela regulatória.",
    ],
  },

  problem: {
    id: "problem",
    heading: "Seis contratos de dados, um único fluxo de envio",
    paragraphs: [
      "As entradas chegavam pelo S3 em arquivos ZIP sobre apostadores, carteiras, apostas esportivas, jogos on-line e agregados diário e mensal da operadora. Antes do aceite pelo SIGAP, o pipeline precisava extrair e validar o XML, aplicar uma assinatura RSA-SHA256 com certificado PKCS#12, compactar e codificar o resultado, autenticar via OAuth2 e transmitir por TLS mútuo.",
    ],
  },

  system: {
    id: "system-overview",
    heading: "Do S3 ao envio assinado para o SIGAP",
    paragraphs: [
      "Construí um único núcleo de processamento em Go para todo o caminho, da leitura no S3 ao tratamento da resposta do SIGAP. Uma CLI executa os lotes agendados, enquanto um serviço HTTP expõe controle e progresso dos trabalhos para uso operacional. Ao redor desse núcleo, comandos dedicados analisam conformidade, consultam envios, reprocessam datas ausentes e mantêm o histórico no DynamoDB.",
    ],
    images: [
      {
        src: "/work/gosigapp/system-map.svg",
        alt: "Diagrama da arquitetura do gosigapp, da leitura no S3 à validação XML, assinatura PFX, envio por mTLS, execução de trabalhos e armazenamento de auditoria no DynamoDB.",
        width: 1200,
        height: 680,
        caption:
          "Um único núcleo atende às entradas em lote e por serviço, mantendo explícitas as responsabilidades de validação, assinatura, transporte e auditoria.",
      },
    ],
  },

  decisions: [
    {
      id: "decision-1",
      heading: "Decisão 1 — Identificar falhas antes da transmissão",
      paragraphs: [
        "Antecipei falhas evitáveis para antes da fronteira de rede. O pipeline valida o XML contra os seis esquemas do SIGAP, e um comando de conformidade verifica esquemas, integridade do certificado e configuração antes do empacotamento. A camada de serviço também se integra ao módulo oficial Impedidos v2 para consultas de autoexclusão e restrições.",
      ],
      images: [
        {
          src: "/work/gosigapp/compliance-check-output.webp",
          alt: "Saída de terminal com dados fictícios do comando de conformidade do gosigapp, mostrando verificações de esquema XML, certificado, configuração e módulo Impedidos do SIGAP.",
          width: CAPTURE_WIDTH,
          height: CAPTURE_HEIGHT,
          caption:
            "Uma execução de conformidade com dados fictícios revela problemas de esquema, assinatura, configuração e restrições antes da montagem do envio.",
        },
      ],
    },
    {
      id: "decision-2",
      heading: "Decisão 2 — Proteger assinatura e transporte",
      paragraphs: [
        "Assinatura e transporte fazem parte do contrato de envio, não são reforços opcionais. O pipeline interpreta certificados PKCS#12, aplica assinaturas XML com RSA-SHA256 e envia o pacote por um cliente mTLS com tokens OAuth2 em cache. Certificados e credenciais de API permanecem fora do código-fonte e entram por configuração baseada em variáveis de ambiente.",
      ],
    },
    {
      id: "decision-3",
      heading: "Decisão 3 — Tornar falhas recuperáveis e execuções rastreáveis",
      paragraphs: [
        "Tornei seletiva a política de novas tentativas: falhas de rede e respostas 5xx recebem até duas novas tentativas com intervalos progressivos, enquanto respostas 4xx retornam imediatamente para correção. As execuções passam pelos estados de fila, processamento, conclusão, falha e cancelamento, com registros estruturados no DynamoDB. No reprocessamento controlado, a ferramenta de backfill consulta envios existentes antes de processar datas ausentes e trata respostas de lote duplicado como já enviado.",
      ],
      images: [
        {
          src: "/work/gosigapp/cli-pipeline-run.webp",
          alt: "Saída de terminal com dados fictícios mostrando uma execução do gosigapp pelas etapas de leitura, validação, assinatura, envio, tratamento da resposta e registro de auditoria.",
          width: CAPTURE_WIDTH,
          height: CAPTURE_HEIGHT,
          caption:
            "A saída fictícia expõe cada etapa e seu resultado para que a operação rastreie a execução e aja sobre uma falha sem depender de uma caixa-preta.",
        },
      ],
    },
  ],

  contribution: {
    id: "contribution",
    heading: "O que ficou sob minha responsabilidade",
    paragraphs: [
      "Conduzi o desenvolvimento individualmente: traduzi os requisitos regulatórios em arquitetura, implementei o pipeline em Go e as ferramentas operacionais, conectei os serviços de armazenamento e auditoria da AWS e entreguei o contêiner e o fluxo de CI/CD para o ECS/Fargate. A IA auxiliou a implementação, mas o desenho do sistema, as decisões, a verificação e a implantação permaneceram sob minha responsabilidade.",
    ],
  },

  delivered: {
    id: "evidence-limits",
    heading: "O que foi entregue — e o que posso comprovar",
    paragraphs: [
      "O sistema foi implantado via AWS ECS/Fargate, e este estudo de caso se apoia no código privado, na imagem Docker, no fluxo do GitHub Actions, na definição da tarefa e em capturas sanitizadas com dados fictícios. Não há interface gráfica pública, e não publico volumes operacionais, disponibilidade, taxas de rejeição ou impacto de negócio que eu não consiga verificar de forma independente.",
    ],
  },

  technology: {
    id: "tech-stack",
    heading: "Tecnologia a serviço do pipeline",
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
      "XML/XSD",
      "API REST do SIGAP",
    ],
  },

  confidentiality: {
    id: "disclosure-actions",
    heading: "Código privado, arquitetura aberta à conversa",
    paragraphs: [
      "O repositório permanece privado porque implementa uma integração regulatória para uma operadora brasileira de apostas não identificada. Os diagramas e as capturas de terminal usam apenas configurações fictícias. Posso conversar em mais detalhes sobre a arquitetura, o tratamento de falhas, as fronteiras de segurança e minhas decisões sem expor a operadora, sua infraestrutura ou seus dados.",
    ],
    actions: [
      { label: "Conversar sobre este projeto", href: "/pt-BR/#contact" },
      { label: "Voltar aos trabalhos selecionados", href: "/pt-BR/#work" },
    ],
  },
} as const satisfies CaseStudy;

export function getGosigappCaseStudy(locale: Locale = "en"): CaseStudy {
  return locale === "pt-BR" ? gosigappCaseStudyPtBr : gosigappCaseStudy;
}
