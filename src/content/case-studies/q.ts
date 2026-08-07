import type { Locale } from "@/lib/i18n";
import type { CaseStudy } from "@/types/case-study";

/**
 * Visible copy is transcribed from the owner-approved content contract in
 * `docs/q-case-study-content.md`. Rewording published claims requires a new
 * content review against `docs/q-case-study-evidence.md`.
 *
 * The current screenshots remain temporary. The replacement manifest is
 * documented in the content contract, but a future path must not be referenced
 * here until its reviewed asset exists in `public/work/q/`.
 */

const SCREENSHOT_WIDTH = 2560;
const SCREENSHOT_HEIGHT = 1440;

export const qCaseStudy = {
  slug: "q",

  metadata: {
    title: "Quant — Quantitative Research and Execution",
    description:
      "How I designed and built a native quantitative research platform across desktop UX, asynchronous services, market-data pipelines, validation, and paper execution.",
  },

  hero: {
    backLink: { label: "Back to selected work", href: "/#work" },
    category: "Quantitative systems",
    title: "Quant",
    deck: "A solo-built desktop platform for turning trading ideas into disciplined, inspectable research.",
    facts: [
      { label: "Role", value: "Founder, Product Engineer, and sole developer" },
      { label: "Period", value: "April 2026–present" },
      { label: "Platform", value: "Native desktop" },
      { label: "Market", value: "Brazilian futures and equities" },
      { label: "State", value: "Research, backtesting, and paper execution" },
      { label: "Source", value: "Private" },
    ],
    support:
      "I built Quant across product design, desktop UX, backend services, data infrastructure, research workflows, and testing. A Tauri and React interface coordinates FastAPI, Redis-backed workers, PostgreSQL, and market-data paths, keeping complex experiments structured and inspectable in one native product.",
    // DEC-02: native desktop app — omit the live-environment control entirely.
    media: {
      src: "/work/q/launcher.png",
      alt: "The Quant launcher showing workspace navigation, system state, and recent research activity in the native desktop product.",
      width: SCREENSHOT_WIDTH,
      height: SCREENSHOT_HEIGHT,
    },
  },

  identity: {
    id: "identity",
    heading: "Built end to end as one product",
    paragraphs: [
      "Quant crosses product, design, frontend, backend, data, and infrastructure boundaries. I owned them together so the workflow and architecture could evolve around the same research problem.",
      "I also created the Q emblem in Blender and its presentation scene in Unreal Engine 5. Layered surfaces, restrained metallic accents, and clear hierarchy carry that identity into dense workspaces designed for long research sessions.",
    ],
  },

  origin: {
    id: "origin",
    heading: "A six-year idea, rebuilt for disciplined research",
    paragraphs: [
      "My own systematic trading research exposed the limits of spreadsheets and disconnected scripts. I needed reusable data, consistent strategy definitions, repeatable simulations, structured parameter search, and a way to challenge promising results before capital was involved.",
      "The idea is roughly six years old and is what led me to learn programming. I rebuilt it several times as my understanding of markets, architecture, research discipline, and product design grew. The implementation shown here is a new codebase begun in April 2026.",
      "An earlier generation of my tooling supported a strategy I traded personally, growing approximately R$3,000 into R$90,000 over about one year. That result predates this implementation; it is origin context, not a forecast or evidence that Quant produced those returns.",
    ],
  },

  tourGroups: [
    {
      id: "inspectable-experiments",
      heading: "From market context to inspectable experiments",
      paragraphs: [
        "Research starts with instruments, historical series, indicators, and data availability. Quant keeps those inputs close to entry and exit rules, parameters, and simulation settings so an experiment can be reconstructed instead of remembered.",
        "Completed runs put the equity path, drawdown, trades, and supporting statistics beside the assumptions that produced them. A promising chart remains tied to a specific configuration rather than becoming an isolated screenshot or headline metric.",
      ],
      images: [
        {
          src: "/work/q/market-data.webp",
          alt: "The current Quant market-data workspace showing an instrument chart, indicators, and market controls.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Market context and data controls provide the inputs for a reproducible research run.",
        },
        {
          src: "/work/q/backtest-studio.webp",
          alt: "The current Quant backtest workspace showing strategy entries, exits, parameters, instruments, and simulation controls.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Strategy rules and simulation assumptions stay together before a run begins.",
        },
        {
          src: "/work/q/backtest-results.webp",
          alt: "The current Quant backtest results showing an equity path, drawdown, trades, and supporting run statistics.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Fixture-based research output remains connected to the configuration that produced it.",
        },
      ],
    },
    {
      id: "challenge-results",
      heading: "Challenge results before trusting them",
      paragraphs: [
        "A useful search process must do more than surface the highest number. Optimization compares trials across multiple objectives, while discovery narrows broader candidate sets into work worth deeper investigation.",
        "Validation stays inside the Backtests workflow and separates in-sample from out-of-sample windows. Feature creation, simulation performance, and held-out evidence remain distinct questions instead of collapsing into one score.",
      ],
      images: [
        {
          src: "/work/q/optimize-pareto.webp",
          alt: "The current Quant optimization workspace comparing study trials across multiple objectives.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Multiple objectives make the trade-offs between candidate configurations visible.",
        },
        {
          src: "/work/q/discover-leaderboard.webp",
          alt: "The current Quant discovery workspace organizing research candidates for comparison.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Discovery narrows a large search space into candidates that merit further investigation.",
        },
        {
          src: "/work/q/walkforward.webp",
          alt: "The current Backtests validation view comparing in-sample and out-of-sample results across multiple windows.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Held-out windows test whether a promising configuration deserves continued research.",
        },
      ],
    },
    {
      id: "heavy-research",
      heading: "Keep heavy research work off the interaction path",
      paragraphs: [
        "Backtests, optimization studies, and discovery searches can outlive an HTTP request. Quant accepts work through the API, runs it in Dramatiq workers backed by Redis, and reports job state through the desktop shell so the interface can stay responsive.",
        "Execution is deliberately narrower than the research stack: the product supports paper accounts and paper deployments today. Live trading is rejected by both the interface and the API, turning the current safety boundary into visible product behavior.",
      ],
      images: [
        {
          src: "/work/q/system.webp",
          alt: "The current Quant system workspace showing data-source availability, environment details, and backend health.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Operational state stays visible without pulling the operator out of the research environment.",
        },
        {
          src: "/work/q/execution.webp",
          alt: "The current Quant execution workspace showing a paper account, a paper deployment, and the Live locked boundary.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Paper execution is available while live trading remains visibly and technically locked.",
        },
      ],
    },
  ],

  system: {
    id: "architecture",
    heading: "A native product around asynchronous services",
    paragraphs: [
      "Quant packages a React interface inside Tauri 2 and connects it to FastAPI. PostgreSQL and Alembic manage application state; Redis and Dramatiq coordinate asynchronous research; MetaTrader 5 and a separate read-only gateway feed market data into local storage.",
      "The desktop owns interaction; services own durable data and compute-heavy work. That boundary keeps long-running research out of the UI process without fragmenting the product.",
    ],
  },

  decisions: [
    {
      id: "decision-desktop",
      heading: "Why desktop was the right boundary",
      paragraphs: [
        "Quant belongs beside local market-data services, workers, and research files. A native Tauri shell makes that operating context explicit and supports a focused desktop workflow instead of pretending the product is a public SaaS.",
        "The trade-off is a native toolchain and platform-specific dependencies. I accepted it because it fits how the product is actually used.",
      ],
    },
    {
      id: "decision-fixtures",
      heading: "Develop against stable fixtures",
      paragraphs: [
        "I built a deterministic Mock Service Worker mode that runs the interface without FastAPI, PostgreSQL, Redis, or a broker connection. Stable fixtures let product design, frontend behavior, and visual review continue while service contracts were changing.",
        "This reduced coordination between interface and infrastructure work and made important states reproducible instead of dependent on a particular local stack.",
      ],
    },
    {
      id: "decision-safety",
      heading: "Make validation and execution safety product constraints",
      paragraphs: [
        "A single backtest can reward overfitting, so Quant keeps optimization, held-out validation, and execution controls in the product workflow. The software presents evidence and boundaries; it does not declare that a strategy is successful.",
        "Paper-only execution and backend live-mode rejection apply the same principle operationally: future capability cannot accidentally appear as current capability.",
      ],
    },
  ],

  contribution: {
    id: "contribution",
    heading: "What I owned",
    paragraphs: [
      "I conceived, designed, and built the product: its identity, desktop shell, interaction system, frontend workspaces, API, worker architecture, database schema, market-data paths, research workflows, execution controls, automated tests, and development tooling.",
      "I used AI for scaffolding, refactoring, test generation, and review. Product direction, architecture, visual design, engineering trade-offs, and final decisions remained mine.",
    ],
  },

  technology: {
    id: "technology",
    heading: "Technology across the stack",
    paragraphs: [],
    badges: [
      "Tauri 2",
      "React",
      "Vite",
      "FastAPI",
      "Dramatiq",
      "Redis",
      "PostgreSQL",
      "Alembic",
      "MetaTrader 5",
      "Optuna",
      "Mock Service Worker",
      "pytest",
      "Blender",
      "Unreal Engine 5",
    ],
  },

  confidentiality: {
    id: "status",
    heading: "Current status and technical walkthrough",
    paragraphs: [
      "Quant is actively used for research and backtesting, with paper execution available and live trading intentionally disabled while the execution path matures.",
      "The repository is private, and public materials omit credentials, broker and account details, deployment identifiers, and source code. I can walk through the product, architecture, and decisions in greater depth in a technical conversation.",
    ],
    actions: [
      { label: "Back to selected work", href: "/#work" },
      { label: "Discuss Quant", href: "/#contact" },
    ],
  },
} as const satisfies CaseStudy;

const qCaseStudyPtBr = {
  slug: "q",

  metadata: {
    title: "Quant — Pesquisa Quantitativa e Execução",
    description:
      "Como projetei e construí uma plataforma nativa de pesquisa quantitativa, da experiência desktop e serviços assíncronos aos pipelines de dados, validação e execução simulada.",
  },

  hero: {
    backLink: {
      label: "Voltar aos trabalhos selecionados",
      href: "/pt-BR/#work",
    },
    category: "Sistemas quantitativos",
    title: "Quant",
    deck: "Uma plataforma desktop construída por uma só pessoa para transformar ideias de trading em pesquisa disciplinada e inspecionável.",
    facts: [
      {
        label: "Papel",
        value: "Fundador, Engenheiro de Produto e único desenvolvedor",
      },
      { label: "Período", value: "Abril de 2026–presente" },
      { label: "Plataforma", value: "Desktop nativo" },
      { label: "Mercado", value: "Futuros e ações brasileiras" },
      {
        label: "Estado",
        value: "Pesquisa, backtesting e execução simulada",
      },
      { label: "Código-fonte", value: "Privado" },
    ],
    support:
      "Construí o Quant da concepção do produto e da experiência desktop aos serviços de backend, infraestrutura de dados, fluxos de pesquisa e testes. Uma interface em Tauri e React coordena serviços FastAPI, workers apoiados por Redis, PostgreSQL e caminhos de dados de mercado para manter experimentos complexos estruturados, inspecionáveis e utilizáveis em um único produto nativo.",
    media: {
      src: "/work/q/launcher.png",
      alt: "Launcher do Quant com navegação entre áreas de trabalho, estado do sistema e atividade recente de pesquisa no produto desktop nativo.",
      width: SCREENSHOT_WIDTH,
      height: SCREENSHOT_HEIGHT,
    },
  },

  identity: {
    id: "identity",
    heading: "Construído de ponta a ponta como um só produto",
    paragraphs: [
      "O Quant atravessa as fronteiras entre produto, design, frontend, backend, dados e infraestrutura. Assumi essas frentes em conjunto, permitindo que o fluxo e a arquitetura evoluíssem em torno do mesmo problema de pesquisa, sem depender de repasses entre equipes separadas.",
      "Também criei o emblema Q no Blender e sua cena de apresentação no Unreal Engine 5. O sistema visual leva essa identidade a áreas de trabalho densas por meio de superfícies em camadas, detalhes metálicos contidos e hierarquia clara; o objetivo é manter o foco durante longas sessões de pesquisa, não apenas decorar a interface.",
    ],
  },

  origin: {
    id: "origin",
    heading: "Uma ideia de seis anos, reconstruída para pesquisa disciplinada",
    paragraphs: [
      "Minha própria pesquisa de trading sistemático expôs os limites de planilhas e scripts desconectados. Eu precisava de dados reutilizáveis, definições consistentes de estratégia, simulações repetíveis, busca estruturada de parâmetros e uma forma de questionar resultados promissores antes de envolver capital.",
      "A ideia tem cerca de seis anos e foi o que me levou a aprender programação. Eu a reconstruí várias vezes à medida que aprofundei meu entendimento de mercados, arquitetura, disciplina de pesquisa e design de produto. A implementação apresentada aqui é um novo código-fonte iniciado em abril de 2026.",
      "Uma geração anterior das minhas ferramentas apoiou uma estratégia que negociei pessoalmente, levando aproximadamente R$3.000 a R$90.000 em cerca de um ano. Esse resultado antecede esta implementação; ele contextualiza a origem do projeto, não é uma previsão nem evidência de que o Quant tenha produzido esses retornos.",
    ],
  },

  tourGroups: [
    {
      id: "inspectable-experiments",
      heading: "Do contexto de mercado a experimentos inspecionáveis",
      paragraphs: [
        "A pesquisa começa com instrumentos, séries históricas, indicadores e disponibilidade dos dados. O Quant mantém essas entradas próximas das regras de entrada e saída, parâmetros e configurações de simulação para que um experimento possa ser reconstruído, não apenas lembrado.",
        "Execuções concluídas colocam trajetória do patrimônio, drawdown, operações e estatísticas de apoio ao lado das premissas que as produziram. Um gráfico promissor continua ligado a uma configuração específica, em vez de virar uma imagem isolada ou uma métrica de destaque.",
      ],
      images: [
        {
          src: "/work/q/market-data.webp",
          alt: "Área atual de dados de mercado do Quant com gráfico de instrumento, indicadores e controles de mercado.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Contexto de mercado e controles de dados fornecem as entradas de uma pesquisa reproduzível.",
        },
        {
          src: "/work/q/backtest-studio.webp",
          alt: "Área atual de backtesting do Quant com entradas, saídas, parâmetros, instrumentos e controles de simulação da estratégia.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Regras da estratégia e premissas da simulação permanecem juntas antes do início de uma execução.",
        },
        {
          src: "/work/q/backtest-results.webp",
          alt: "Resultados atuais de backtesting do Quant com trajetória do patrimônio, drawdown, operações e estatísticas da execução.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Resultados de pesquisa baseados em fixtures continuam ligados à configuração que os produziu.",
        },
      ],
    },
    {
      id: "challenge-results",
      heading: "Questionar resultados antes de confiar neles",
      paragraphs: [
        "Um processo de busca útil precisa fazer mais do que revelar o maior número. A otimização compara tentativas em múltiplos objetivos, enquanto a descoberta reduz conjuntos amplos de candidatos ao trabalho que merece investigação mais profunda.",
        "A validação permanece dentro do fluxo de Backtests e separa janelas dentro e fora da amostra. Criação de atributos, desempenho em simulação e evidência retida continuam sendo perguntas distintas, em vez de se reduzirem a uma única pontuação.",
      ],
      images: [
        {
          src: "/work/q/optimize-pareto.webp",
          alt: "Área atual de otimização do Quant comparando tentativas de um estudo em múltiplos objetivos.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Múltiplos objetivos tornam visíveis os compromissos entre configurações candidatas.",
        },
        {
          src: "/work/q/discover-leaderboard.webp",
          alt: "Área atual de descoberta do Quant organizando candidatos de pesquisa para comparação.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "A descoberta reduz um espaço amplo de busca a candidatos que merecem investigação adicional.",
        },
        {
          src: "/work/q/walkforward.webp",
          alt: "Visão atual de validação em Backtests comparando resultados dentro e fora da amostra em várias janelas.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Janelas fora da amostra testam se uma configuração promissora merece pesquisa adicional.",
        },
      ],
    },
    {
      id: "heavy-research",
      heading: "Manter o trabalho pesado fora do caminho da interação",
      paragraphs: [
        "Backtests, estudos de otimização e buscas de descoberta podem durar mais do que uma requisição HTTP. O Quant recebe o trabalho pela API, executa-o em workers Dramatiq apoiados por Redis e informa o estado no shell desktop para que a interface continue responsiva.",
        "A execução é deliberadamente mais restrita do que a camada de pesquisa: hoje o produto aceita contas e implantações simuladas. O trading ao vivo é recusado pela interface e pela API, transformando o limite atual de segurança em comportamento visível do produto.",
      ],
      images: [
        {
          src: "/work/q/system.webp",
          alt: "Área atual de sistema do Quant com disponibilidade das fontes de dados, detalhes do ambiente e integridade do backend.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "O estado operacional permanece visível sem tirar o operador do ambiente de pesquisa.",
        },
        {
          src: "/work/q/execution.webp",
          alt: "Área atual de execução do Quant com uma conta simulada, uma implantação simulada e o limite Live locked.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "A execução simulada está disponível enquanto o trading ao vivo permanece visível e tecnicamente bloqueado.",
        },
      ],
    },
  ],

  system: {
    id: "architecture",
    heading: "Um produto nativo apoiado por serviços assíncronos",
    paragraphs: [
      "O Quant empacota uma interface React no Tauri 2 e a conecta ao FastAPI. PostgreSQL e Alembic gerenciam o estado da aplicação; Redis e Dramatiq coordenam a pesquisa assíncrona; MetaTrader 5 e um gateway separado e somente leitura alimentam o armazenamento local com dados de mercado.",
      "O desktop é responsável pela interação e pelo contexto do operador, enquanto os serviços assumem dados duráveis e processamento pesado. Essa fronteira mantém o produto coerente sem forçar pesquisas longas a rodar no processo da interface.",
    ],
  },

  decisions: [
    {
      id: "decision-desktop",
      heading: "Por que o desktop era a fronteira certa",
      paragraphs: [
        "O Quant pertence ao lado de serviços locais de dados de mercado, workers e arquivos de pesquisa. Um shell nativo em Tauri torna esse contexto operacional explícito e sustenta um fluxo desktop focado, em vez de fingir que o produto é um SaaS público.",
        "A contrapartida é uma cadeia de ferramentas nativa e dependências específicas de plataforma. Aceitei esse custo porque ele corresponde à forma como o produto é realmente usado.",
      ],
    },
    {
      id: "decision-fixtures",
      heading: "Desenvolver com fixtures estáveis",
      paragraphs: [
        "Construí um modo determinístico com Mock Service Worker que executa a interface sem FastAPI, PostgreSQL, Redis ou conexão com uma corretora. Fixtures estáveis permitem que o design do produto, o comportamento do frontend e a revisão visual continuem enquanto os contratos dos serviços mudam.",
        "Isso reduziu a coordenação necessária entre interface e infraestrutura e tornou estados importantes reproduzíveis, em vez de dependentes de uma configuração local específica.",
      ],
    },
    {
      id: "decision-safety",
      heading: "Transformar validação e segurança de execução em restrições do produto",
      paragraphs: [
        "Um único backtest pode premiar o sobreajuste, por isso o Quant mantém otimização, validação fora da amostra e controles de execução no fluxo do produto. O software apresenta evidências e limites; ele não declara que uma estratégia é bem-sucedida.",
        "A execução exclusivamente simulada e a recusa do modo ao vivo no backend aplicam o mesmo princípio operacionalmente: uma capacidade futura não pode parecer, por acidente, uma capacidade atual.",
      ],
    },
  ],

  contribution: {
    id: "contribution",
    heading: "O que esteve sob minha responsabilidade",
    paragraphs: [
      "Concebi, projetei e construí o produto: identidade, shell desktop, sistema de interação, áreas de trabalho do frontend, API, arquitetura de workers, esquema do banco, caminhos de dados de mercado, fluxos de pesquisa, controles de execução, testes automatizados e ferramentas de desenvolvimento.",
      "Usei IA para scaffolding, refatoração, geração de testes e revisão. A direção do produto, a arquitetura, o design visual, as decisões de engenharia e as escolhas finais permaneceram sob minha responsabilidade.",
    ],
  },

  technology: {
    id: "technology",
    heading: "Tecnologia em toda a stack",
    paragraphs: [],
    badges: [
      "Tauri 2",
      "React",
      "Vite",
      "FastAPI",
      "Dramatiq",
      "Redis",
      "PostgreSQL",
      "Alembic",
      "MetaTrader 5",
      "Optuna",
      "Mock Service Worker",
      "pytest",
      "Blender",
      "Unreal Engine 5",
    ],
  },

  confidentiality: {
    id: "status",
    heading: "Estado atual e apresentação técnica",
    paragraphs: [
      "O Quant é usado ativamente para pesquisa e backtesting, com execução simulada disponível e trading ao vivo intencionalmente desativado enquanto esse caminho amadurece.",
      "O código-fonte é privado, e os materiais públicos omitem credenciais, dados de corretora e contas, identificadores de implantação e código. Posso apresentar o produto, a arquitetura e as decisões em maior profundidade em uma conversa técnica.",
    ],
    actions: [
      {
        label: "Voltar aos trabalhos selecionados",
        href: "/pt-BR/#work",
      },
      { label: "Conversar sobre o Quant", href: "/pt-BR/#contact" },
    ],
  },
} as const satisfies CaseStudy;

export function getQCaseStudy(locale: Locale = "en"): CaseStudy {
  return locale === "pt-BR" ? qCaseStudyPtBr : qCaseStudy;
}
