import type { CaseStudy } from "@/types/case-study";
import type { Locale } from "@/lib/i18n";

/**
 * Visible copy follows the WO-039 successor contract,
 * `docs/nexo-dental-case-study-content-v2.md`.
 *
 * English and Brazilian Portuguese are complete authored objects. Neither
 * locale may inherit visible copy from the other.
 */

const SCREENSHOT_WIDTH = 2560;
const SCREENSHOT_HEIGHT = 1440;

export const nexoDentalCaseStudy = {
  slug: "nexo-dental",

  metadata: {
    title: "Nexo Dental — Founder-Built Clinic Operations",
    description:
      "How I designed and built a multi-tenant dental-clinic product across role-native workflows, data isolation, clinical modelling, and reviewable AI assistance.",
  },

  hero: {
    backLink: { label: "Back to selected work", href: "/#work" },
    category: "Clinical software",
    title: "Nexo Dental",
    deck: "A founder-built product connecting the clinical, operational, and financial work of a dental clinic",
    facts: [
      { label: "Role", value: "Founder and sole developer" },
      { label: "Period", value: "July 2026–present" },
      { label: "State", value: "Active development" },
      { label: "Source", value: "Private" },
    ],
    support:
      "As founder and sole developer, I designed and built Nexo Dental end to end: product and interaction design, frontend, API, data model, security boundaries, clinical and financial workflows, and reviewable AI assistance. One product serves reception, dentists, and managers without forcing them into one generic workflow.",
    liveEnvironment: { label: "Live environment — coming soon" },
    media: {
      src: "/work/nexo-dental/shell-identity.webp",
      alt: "The Nexo Dental application shell on Clinic Pulse, with brand identity, role navigation, and an operational home dashboard populated from fixture data.",
      width: SCREENSHOT_WIDTH,
      height: SCREENSHOT_HEIGHT,
      caption:
        "Authenticated shell and Clinic Pulse home. The product interface is in Portuguese.",
    },
  },

  origin: {
    id: "origin",
    heading: "One patient record. Three ways of working.",
    paragraphs: [
      "A clinic does not operate through one generic dashboard. Reception works in minutes, keeping appointments and conversations moving. Dentists work around the clinical record at the chair. Managers need the financial and operational picture that emerges from both.",
      "I saw a product opportunity in those handoffs: one shared system could preserve the same patient and financial context while giving each role a surface designed around its own decisions. I founded Nexo Dental to build that product from the data model outward, rather than stitching separate screens onto disconnected records.",
    ],
  },

  tourIntro: {
    id: "product-tour",
    heading: "Built around the people who run the clinic",
    paragraphs: [
      "Nexo Dental follows work from the first appointment through clinical care, payment, claims, and follow-up. The interface changes emphasis by role, while the underlying patient, treatment, and financial records remain connected. That product boundary shaped the three workspaces below.",
    ],
  },

  tourGroups: [
    {
      id: "reception-workspace",
      heading: "Reception — keep the day moving",
      paragraphs: [
        "Reception starts with time and attention. The agenda organizes appointments across professionals and statuses; the conversations workspace keeps patient communication beside the operational context; and the action queue turns open work into explicit next steps.",
        "The goal is not another notification feed. A receptionist can move from a pending confirmation to the relevant conversation or patient balance without reconstructing why the item matters. The product keeps the queue actionable while a person remains responsible for every response and change.",
      ],
      images: [
        {
          src: "/work/nexo-dental/agenda.webp",
          alt: "A week-view dental agenda showing multi-professional appointment cards and a status strip, populated from seed fixture data.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "The receptionist agenda brings professional availability, appointments, and status into one weekly view.",
        },
        {
          src: "/work/nexo-dental/whatsapp-inbox.webp",
          alt: "A WhatsApp-style conversations inbox with a synthetic thread open beside the conversation list.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Fixture conversations keep communication in the same operational surface as the patient workflow.",
        },
        {
          src: "/work/nexo-dental/fila.webp",
          alt: "An operational action queue listing prioritized items with actions for reviewing a claim issue, replying on WhatsApp, and opening patient balances.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "The action queue pairs prioritized work with the next useful destination; it does not act on a person's behalf.",
        },
      ],
    },
    {
      id: "clinical-workspace",
      heading: "Clinical care — carry truth from chart to treatment",
      paragraphs: [
        "The patient workspace gives dentists one clinical context rather than a trail of isolated forms. Identity, history, odontogram, encounters, files, treatment proposals, and financial context remain reachable from the same record.",
        "The odontogram is structured clinical data, not a drawing pasted onto a profile. Tooth conditions and procedures feed the clinical timeline and treatment proposal, preserving attribution as the record moves from diagnosis to the front desk. That reduces duplicate interpretation at the handoff between care and administration.",
      ],
      images: [
        {
          src: "/work/nexo-dental/patient-workspace.webp",
          alt: "A patient workspace header with identity overview and clinical tabs for a fixture patient record.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "The patient workspace anchors clinical and financial work to one synthetic record.",
        },
        {
          src: "/work/nexo-dental/odontogram.webp",
          alt: "An odontogram workspace with an FDI tooth chart, tooth 16 highlighted, in a populated seed clinical state.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "The FDI odontogram represents tooth state as information other workflows can use.",
        },
        {
          src: "/work/nexo-dental/clinical-timeline.webp",
          alt: "A chronological clinical timeline of seed encounters with attribution in the patient clinical workspace.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "The clinical timeline preserves sequence and attribution across fixture encounters.",
        },
      ],
    },
    {
      id: "management-workspace",
      heading: "Management — connect care to the ledger",
      paragraphs: [
        "Managers need to understand what clinical and reception work produced: treatment proposals, installments, payments, commissions, insurance claims, and reporting. Nexo Dental keeps those records connected to the patient and clinic tenant instead of treating finance as a separate back-office product.",
        "The management surface exposes the operational trail behind a balance or claim. Reporting routes are present in the implementation, but I describe them as active development rather than presenting the product as a finished analytics program.",
      ],
      images: [
        {
          src: "/work/nexo-dental/financial-ledger.webp",
          alt: "A patient financial ledger showing synthetic installment balances and debits in the finance workspace.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "The fixture ledger keeps installments and balances attached to the patient workflow that created them.",
        },
      ],
    },
  ],

  system: {
    id: "architecture",
    heading: "One product, isolated at the data boundary",
    paragraphs: [
      "A React and TypeScript application talks to a FastAPI service under `/api/v1`; PostgreSQL owns application state and Alembic evolves the schema. The boundary is deliberately conventional so product complexity stays in explicit domain modules rather than leaking into the client.",
      "Every tenant-scoped database session sets `app.tenant_id`, and row-level security is enabled and forced on tenant tables. The application still scopes requests deliberately, while PostgreSQL rejects cross-clinic access if a query path forgets. A guarded MSW mode supplies deterministic fixture data for interface development and public captures without a real clinic session.",
    ],
  },

  decisions: [
    {
      id: "decision-tenant-isolation",
      heading: "01 — Make tenant isolation a database guarantee",
      paragraphs: [
        "Clinical and financial data made application-only filtering an unacceptable boundary. A missed condition on a new query should not be enough to expose another clinic's records.",
        "I built tenant identity into the schema and session lifecycle, then enabled and forced PostgreSQL row-level security through reusable Alembic helpers. That choice adds migration discipline to every tenant-owned table, but it moves the final refusal to the layer that stores the data. Claims fields add AES-GCM protection and masked API representations for another sensitive boundary.",
      ],
    },
    {
      id: "decision-clinical-model",
      heading: "02 — Model the odontogram as a domain, not a widget",
      paragraphs: [
        "A visual tooth chart would have been faster to ship, but it would stop being useful as soon as encounters, treatment proposals, and finance needed the same facts. I modelled teeth, conditions, and procedures as structured clinical records instead.",
        "The interface can still present an intuitive FDI chart, while the system retains history, attribution, and links to downstream work. The trade-off is a richer clinical model and more careful state transitions. The benefit is one source of clinical meaning across the chart, timeline, proposal, and ledger.",
      ],
    },
    {
      id: "decision-ai-boundary",
      heading: "03 — Put AI behind a human decision boundary",
      paragraphs: [
        "Nexo Dental uses AI assistance beside role-specific work rather than presenting it as an autonomous operator. The action queue ranks open items and deep-links to the next useful surface; adjacent panels can draft assistance, but a person reviews and acts.",
        "That boundary also shapes the backend. Clinical AI inputs are checked for PII before a provider call, and operator capabilities remain role-aware. I chose a narrower, inspectable interaction because clinical, communication, and financial actions need accountable human judgment more than they need the appearance of automation.",
      ],
    },
  ],

  contribution: {
    id: "contribution",
    heading: "What I owned",
    paragraphs: [
      "I founded, designed, and built Nexo Dental as the sole developer: product direction, interaction system, React application, FastAPI service, PostgreSQL model, tenancy and permissions, clinical and financial domains, communications, claims, AI boundaries, automated tests, and local development tooling.",
      "AI accelerated scaffolding, refactoring, test generation, and review. The product thesis, architecture, implementation, validation strategy, security decisions, and final trade-offs remained my responsibility.",
    ],
  },

  delivered: {
    id: "implementation-evidence",
    heading: "What the implementation proves",
    paragraphs: [
      "The private repositories contain working paths for scheduling, patients, odontogram and clinical records, finance and treatment proposals, WhatsApp communication, CRM, TISS claims, reporting routes, role-aware navigation, and the action queue. At this revision, 50 backend and 134 frontend test files exercise those domains, tenancy, authentication, runtime guards, and interface behavior.",
      "The engineering safeguards are concrete: forced row-level security, encrypted and masked claim fields, pre-provider PII validation for clinical AI, no-PII assertions on operational payloads, and a production guard against mock data. Nexo Dental remains in active development, its source is private, and there is no verified public environment or published clinic outcome today.",
    ],
  },

  technology: {
    id: "technology",
    heading: "Technology in service of the workflow",
    paragraphs: [],
    badges: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Router",
      "FastAPI",
      "PostgreSQL",
      "Alembic",
      "Row-level security",
      "AES-GCM",
      "Mock Service Worker",
      "pytest",
      "Vitest",
    ],
  },

  confidentiality: {
    id: "source-and-data",
    heading: "Private source. Synthetic evidence.",
    paragraphs: [
      "The repositories are private. Every interface capture on this page uses seed or MSW fixture data—never a real clinic or patient—and visible identifiers are invented showcase values. The case study describes what the implementation contains without turning synthetic data into customer, adoption, reliability, or business-impact claims.",
    ],
    actions: [
      { label: "Back to selected work", href: "/#work" },
      { label: "Get in touch", href: "/#contact" },
    ],
  },
} as const satisfies CaseStudy;

const nexoDentalCaseStudyPtBr = {
  slug: "nexo-dental",

  metadata: {
    title: "Nexo Dental — Operações Clínicas Construídas de Ponta a Ponta",
    description:
      "Como projetei e construí um produto multi-tenant para clínicas odontológicas, com fluxos por papel, isolamento de dados, modelagem clínica e IA sob revisão humana.",
  },

  hero: {
    backLink: {
      label: "Voltar aos trabalhos selecionados",
      href: "/pt-BR/#work",
    },
    category: "Software clínico",
    title: "Nexo Dental",
    deck: "Um produto criado por seu fundador para conectar o trabalho clínico, operacional e financeiro de uma clínica odontológica",
    facts: [
      { label: "Papel", value: "Fundador e único desenvolvedor" },
      { label: "Período", value: "Julho de 2026–presente" },
      { label: "Status", value: "Desenvolvimento ativo" },
      { label: "Código-fonte", value: "Privado" },
    ],
    support:
      "Como fundador e único desenvolvedor, projetei e construí o Nexo Dental de ponta a ponta: produto, interação, frontend, API, modelo de dados, segurança, fluxos clínicos e financeiros e assistência de IA sob revisão. Um só produto atende recepção, dentistas e gestores sem impor a todos um fluxo genérico.",
    liveEnvironment: { label: "Ambiente ao vivo — em breve" },
    media: {
      src: "/work/nexo-dental/shell-identity.webp",
      alt: "Interface autenticada do Nexo Dental na tela Pulso da Clínica, com identidade visual, navegação por papel e painel operacional preenchido com dados fictícios.",
      width: SCREENSHOT_WIDTH,
      height: SCREENSHOT_HEIGHT,
      caption:
        "Interface autenticada e tela inicial Pulso da Clínica, preenchidas com dados fictícios.",
    },
  },

  origin: {
    id: "origin",
    heading: "Um prontuário. Três formas de trabalhar.",
    paragraphs: [
      "Uma clínica não opera por meio de um painel genérico. A recepção trabalha em minutos, mantendo agenda e conversas em movimento. Dentistas trabalham ao redor do prontuário durante o atendimento. Gestores precisam compreender o quadro financeiro e operacional produzido pelos dois fluxos.",
      "Enxerguei uma oportunidade de produto nessas passagens: um único sistema poderia preservar o contexto clínico e financeiro do paciente e, ao mesmo tempo, oferecer a cada papel uma superfície desenhada para suas decisões. Fundei o Nexo Dental para construir esse produto a partir do modelo de dados, em vez de reunir telas desconectadas.",
    ],
  },

  tourIntro: {
    id: "product-tour",
    heading: "Construído em torno de quem faz a clínica funcionar",
    paragraphs: [
      "O Nexo Dental acompanha o trabalho desde o primeiro agendamento até atendimento, pagamento, convênio e acompanhamento. A interface muda de ênfase conforme o papel, enquanto os registros do paciente, tratamento e finanças permanecem conectados. Essa fronteira de produto definiu os três ambientes a seguir.",
    ],
  },

  tourGroups: [
    {
      id: "reception-workspace",
      heading: "Recepção — manter o dia em movimento",
      paragraphs: [
        "A recepção começa por tempo e atenção. A agenda organiza compromissos entre profissionais e status; a área de conversas mantém a comunicação ao lado do contexto operacional; e a fila de ações transforma pendências em próximos passos explícitos.",
        "O objetivo não é criar mais uma central de notificações. A recepcionista pode sair de uma confirmação pendente para a conversa ou o débito correspondente sem reconstruir por que aquilo importa. O produto mantém a fila acionável, enquanto uma pessoa continua responsável por cada resposta e alteração.",
      ],
      images: [
        {
          src: "/work/nexo-dental/agenda.webp",
          alt: "Agenda odontológica semanal com compromissos de vários profissionais e faixa de status, preenchida com dados fictícios.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "A agenda da recepção reúne disponibilidade dos profissionais, compromissos e status em uma visão semanal.",
        },
        {
          src: "/work/nexo-dental/whatsapp-inbox.webp",
          alt: "Caixa de conversas no estilo WhatsApp com uma conversa fictícia aberta ao lado da lista de contatos.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Conversas fictícias mantêm a comunicação na mesma superfície operacional do fluxo do paciente.",
        },
        {
          src: "/work/nexo-dental/fila.webp",
          alt: "Fila operacional com itens priorizados e ações para revisar uma glosa, responder pelo WhatsApp e abrir débitos do paciente.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "A fila associa o trabalho priorizado ao próximo destino útil; ela não age em nome da pessoa.",
        },
      ],
    },
    {
      id: "clinical-workspace",
      heading: "Atendimento clínico — levar a verdade do registro ao tratamento",
      paragraphs: [
        "O ambiente do paciente oferece ao dentista um único contexto clínico, não uma sequência de formulários isolados. Identidade, histórico, odontograma, evoluções, arquivos, propostas de tratamento e contexto financeiro permanecem acessíveis a partir do mesmo registro.",
        "O odontograma é dado clínico estruturado, não um desenho colado ao perfil. Condições e procedimentos alimentam a linha do tempo e o orçamento, preservando autoria quando o registro passa do diagnóstico para a recepção. Isso reduz a reinterpretação na passagem entre atendimento e administração.",
      ],
      images: [
        {
          src: "/work/nexo-dental/patient-workspace.webp",
          alt: "Cabeçalho do ambiente do paciente com visão de identidade e abas clínicas de um registro fictício.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "O ambiente do paciente ancora o trabalho clínico e financeiro em um único registro fictício.",
        },
        {
          src: "/work/nexo-dental/odontogram.webp",
          alt: "Área do odontograma com diagrama dentário FDI, dente 16 destacado e estado clínico fictício preenchido.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "O odontograma FDI representa o estado dentário como informação que outros fluxos podem usar.",
        },
        {
          src: "/work/nexo-dental/clinical-timeline.webp",
          alt: "Linha do tempo clínica cronológica com evoluções fictícias e identificação de autoria no ambiente do paciente.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "A linha do tempo clínica preserva sequência e autoria entre evoluções fictícias.",
        },
      ],
    },
    {
      id: "management-workspace",
      heading: "Gestão — conectar o atendimento ao financeiro",
      paragraphs: [
        "Gestores precisam entender o que os fluxos clínico e de recepção produziram: orçamentos, parcelas, pagamentos, comissões, convênios e relatórios. O Nexo Dental mantém esses registros ligados ao paciente e ao tenant da clínica, em vez de tratar finanças como um produto administrativo separado.",
        "A área de gestão expõe o caminho operacional por trás de um saldo ou uma glosa. As rotas de relatórios existem na implementação, mas eu as apresento como parte do desenvolvimento ativo, não como um programa de BI concluído.",
      ],
      images: [
        {
          src: "/work/nexo-dental/financial-ledger.webp",
          alt: "Extrato financeiro de um paciente com parcelas e débitos fictícios na área financeira.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "O extrato fictício mantém parcelas e saldos ligados ao fluxo do paciente que os originou.",
        },
      ],
    },
  ],

  system: {
    id: "architecture",
    heading: "Um produto, isolado na fronteira dos dados",
    paragraphs: [
      "Uma aplicação em React e TypeScript conversa com um serviço FastAPI sob `/api/v1`; o PostgreSQL mantém o estado da aplicação e o Alembic evolui o esquema. A fronteira é deliberadamente convencional para que a complexidade do produto permaneça em módulos de domínio explícitos, sem vazar para o cliente.",
      "Cada sessão de banco com escopo de tenant define `app.tenant_id`, e a segurança em nível de linha é habilitada e forçada nas tabelas da clínica. A aplicação ainda delimita as requisições de forma explícita, enquanto o PostgreSQL recusa acesso entre clínicas caso uma consulta se esqueça disso. Um modo protegido com MSW fornece dados fictícios determinísticos para desenvolvimento da interface e capturas públicas, sem uma sessão real de clínica.",
    ],
  },

  decisions: [
    {
      id: "decision-tenant-isolation",
      heading: "01 — Tornar o isolamento entre clínicas uma garantia do banco",
      paragraphs: [
        "Dados clínicos e financeiros tornaram insuficiente uma fronteira baseada apenas em filtros da aplicação. Esquecer uma condição em uma nova consulta não poderia ser o bastante para expor registros de outra clínica.",
        "Incorporei a identidade do tenant ao esquema e ao ciclo de vida da sessão, depois habilitei e forcei a segurança em nível de linha do PostgreSQL por helpers reutilizáveis do Alembic. A escolha exige disciplina em toda migração de tabela multi-tenant, mas transfere a recusa final para a camada que armazena os dados. Campos de convênios ainda recebem proteção AES-GCM e representações mascaradas na API.",
      ],
    },
    {
      id: "decision-clinical-model",
      heading: "02 — Modelar o odontograma como domínio, não como widget",
      paragraphs: [
        "Um diagrama dentário apenas visual seria mais rápido de entregar, mas deixaria de ser útil assim que evoluções, orçamentos e finanças precisassem dos mesmos fatos. Modelei dentes, condições e procedimentos como registros clínicos estruturados.",
        "A interface ainda apresenta um odontograma FDI intuitivo, enquanto o sistema preserva histórico, autoria e vínculos com o trabalho seguinte. O custo é um modelo clínico mais rico e transições de estado mais cuidadosas. O benefício é uma única fonte de significado clínico entre odontograma, linha do tempo, orçamento e financeiro.",
      ],
    },
    {
      id: "decision-ai-boundary",
      heading: "03 — Manter a IA atrás de uma decisão humana",
      paragraphs: [
        "O Nexo Dental posiciona a assistência de IA ao lado do trabalho de cada papel, sem apresentá-la como uma operadora autônoma. A fila prioriza itens e leva à próxima superfície útil; painéis próximos podem preparar rascunhos, mas uma pessoa revisa e executa.",
        "Essa fronteira também orienta o backend. Entradas de IA clínica passam por validação de dados pessoais antes da chamada ao provedor, e as capacidades da operadora respeitam cada papel. Escolhi uma interação mais estreita e inspecionável porque decisões clínicas, de comunicação e financeiras precisam mais de julgamento humano responsável do que da aparência de automação.",
      ],
    },
  ],

  contribution: {
    id: "contribution",
    heading: "O que esteve sob minha responsabilidade",
    paragraphs: [
      "Fundei, projetei e construí o Nexo Dental como único desenvolvedor: direção de produto, sistema de interação, aplicação React, serviço FastAPI, modelo PostgreSQL, multi-tenancy e permissões, domínios clínico e financeiro, comunicação, convênios, fronteiras de IA, testes automatizados e ferramentas de desenvolvimento local.",
      "A IA acelerou scaffolding, refatorações, geração de testes e revisão. A tese do produto, a arquitetura, a implementação, a estratégia de validação, as decisões de segurança e os trade-offs finais permaneceram sob minha responsabilidade.",
    ],
  },

  delivered: {
    id: "implementation-evidence",
    heading: "O que a implementação comprova",
    paragraphs: [
      "Os repositórios privados contêm fluxos funcionais para agenda, pacientes, odontograma e prontuário, finanças e orçamentos, comunicação por WhatsApp, CRM, convênios TISS, rotas de relatórios, navegação por papel e fila de ações. Nesta revisão, 50 arquivos de testes do backend e 134 do frontend exercitam esses domínios, multi-tenancy, autenticação, guardas de execução e comportamento da interface.",
      "As proteções de engenharia são concretas: segurança em nível de linha forçada, campos de convênios criptografados e mascarados, validação de dados pessoais antes do provedor de IA clínica, verificações de ausência de PII em payloads operacionais e uma guarda contra mocks em produção. O Nexo Dental segue em desenvolvimento ativo, o código-fonte é privado e hoje não existe ambiente público verificado nem resultado de clínica divulgado.",
    ],
  },

  technology: {
    id: "technology",
    heading: "Tecnologia a serviço do fluxo de trabalho",
    paragraphs: [],
    badges: [
      "React",
      "TypeScript",
      "Vite",
      "TanStack Router",
      "FastAPI",
      "PostgreSQL",
      "Alembic",
      "Row-level security",
      "AES-GCM",
      "Mock Service Worker",
      "pytest",
      "Vitest",
    ],
  },

  confidentiality: {
    id: "source-and-data",
    heading: "Código privado. Evidência fictícia.",
    paragraphs: [
      "Os repositórios são privados. Todas as telas desta página usam dados de seed ou fixtures do MSW — nunca dados de uma clínica ou de um paciente real — e os identificadores visíveis foram inventados para a demonstração. O estudo descreve o que existe na implementação sem transformar dados fictícios em afirmações sobre clientes, adoção, confiabilidade ou impacto de negócio.",
    ],
    actions: [
      {
        label: "Voltar aos trabalhos selecionados",
        href: "/pt-BR/#work",
      },
      { label: "Entrar em contato", href: "/pt-BR/#contact" },
    ],
  },
} as const satisfies CaseStudy;

export function getNexoDentalCaseStudy(locale: Locale = "en"): CaseStudy {
  return locale === "pt-BR" ? nexoDentalCaseStudyPtBr : nexoDentalCaseStudy;
}
