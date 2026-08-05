import type { CaseStudy } from "@/types/case-study";
import type { Locale } from "@/lib/i18n";

/**
 * Public portfolio copy for Aegis.
 *
 * Keep factual claims grounded in the approved project evidence. Section IDs,
 * media paths, and route metadata are part of the case-study contract.
 */

const SCREENSHOT_WIDTH = 1600;
const SCREENSHOT_HEIGHT = 900;

export const aegisCaseStudy = {
  slug: "aegis",

  metadata: {
    title: "Aegis — Production Fraud Intelligence Platform",
    description:
      "How I designed and built a production fraud-investigation platform for Brazilian iGaming, from explainable rules and data pipelines to security and WebGL.",
  },

  hero: {
    backLink: { label: "Back to selected work", href: "/#work" },
    category: "Fraud intelligence",
    title: "Aegis",
    deck: "I designed and built a production platform that turns fragmented fraud signals into explainable investigations.",
    facts: [
      { label: "Role", value: "Software Developer" },
      { label: "Period", value: "April 2026–present" },
      { label: "State", value: "Deployed to production" },
      { label: "Source", value: "Private" },
    ],
    support:
      "For a Brazilian betting operator, I owned the product end to end—with AI assistance—from investigation workflows and explainable detection to the frontend, API, data pipelines, security, deployment, and WebGL risk visualization. Aegis gives analysts one place to move from a fraud signal to the player history and evidence behind it.",
    // No verified live URL exists yet, so this renders disabled rather than as a
    // link or placeholder marker.
    liveEnvironment: { label: "Live environment — coming soon" },
    media: {
      src: "/work/aegis/entry-intro-poster.webp",
      alt: "The Aegis wordmark in brushed metal beneath a glowing blue iris set into a dark shield, lit by aurora curtains.",
      width: SCREENSHOT_WIDTH,
      height: SCREENSHOT_HEIGHT,
    },
  },

  context: {
    id: "context",
    heading: "Real system. Synthetic evidence.",
    paragraphs: [
      "Aegis was built for an unnamed betting company in the Brazilian iGaming sector. The product, architecture, and engineering decisions are real; company names, internal identifiers, environment details, and production data stay private.",
      "Every interface shown here runs on 25,000 fabricated profiles seeded locally and connected to no company system. The people, documents, transactions, and findings are synthetic—not production data or client outcomes.",
    ],
  },

  problem: {
    id: "problem",
    heading: "Fraud investigations started as data reconstruction",
    paragraphs: [
      "Fraud signals lived across systems built for different purposes. Identity and account data sat in the operational database, while deposits, withdrawals, bets, balances, and gameplay events accumulated in the analytical lakehouse. Investigating one suspicious account meant rebuilding its story by hand across both.",
      "The job was to make behaviour, relationships, and a player's history investigable in one place without collapsing the answer into an unexplained score. Every finding had to show which rule fired and the evidence that triggered it.",
    ],
  },

  system: {
    id: "system",
    heading: "A separate product built around investigative reads",
    paragraphs: [
      "Aegis separates investigation work from its analytical source: a static React application talks to a read-focused FastAPI service, and that service reads a curated PostgreSQL schema instead of querying the lakehouse on every request. The boundary gives the product a predictable read path and isolates access to sensitive evidence.",
      "Scheduled jobs synchronize profiles, wallets, transactions, hourly balances, and visualization data from Databricks into PostgreSQL, then chain that sync into detection scans each hour. Redis is an optional first read for selected data; jobs write the cache and the interface only reads it.",
    ],
    images: [
      {
        src: "/work/aegis/overview.webp",
        alt: "The Aegis overview screen: a dark console with a Portuguese sidebar, a risk summary counting 25,000 analysed players and 97 with a signal, and a field of faint points with an amber cluster.",
        width: 3840,
        height: 2160,
        caption: "The product overview running on synthetic data. The interface is shown in Portuguese.",
      },
    ],
  },

  decisions: [
    {
      id: "decision-1",
      heading: "01 — Separate the product and its security boundary",
      paragraphs: [
        "The shortest path was to add fraud screens to a system that already existed. I built Aegis as a separate product instead, with its own schema, API, deployment, and release cycle.",
        "My reasoning was blast radius and pace. Fraud workflows change as new patterns emerge, while the documents and transaction evidence behind them require a narrower authorization model than most internal users should inherit.",
        "The cost is explicit ownership: sessions, CSRF protection, multi-factor authentication, Argon2 hashing, permissions, scoped job credentials, and security auditing. The API enforces that boundary as the single authorization authority.",
      ],
    },
    {
      id: "decision-2",
      heading: "02 — Curate investigation data instead of querying the lakehouse live",
      paragraphs: [
        "The event data lives in the lakehouse. Querying it directly from the interface would have been the shortest line to a working dashboard, but it would also attach every step through a player timeline to warehouse latency and billing.",
        "The data path therefore splits. Scheduled jobs copy what the product needs into its curated PostgreSQL schema, an hourly pipeline chains synchronization into detection scans, and Redis holds selected first reads. Jobs write the cache; the interface never does.",
        "The trade-off is deliberate: Aegis reads recent data, not live data. For behavioural patterns that develop across hours and days, that was the better product boundary.",
      ],
    },
    {
      id: "decision-3",
      heading: "03 — Build for investigation, not monitoring",
      paragraphs: [
        "A dashboard can show that a number is high; an investigation tool has to explain why. Aegis follows the analyst's path from a triage queue grouped by rule to a player view that brings profile, balances, transactions, gameplay, open findings, and generated reports together.",
        "Every finding carries its rule, category, confidence level, and triggering evidence. Rules run in shadow mode by default and are promoted to live deliberately. A browser-local worklist keeps findings an analyst is reviewing; it is not a backend case-management system.",
        "The Risk Constellation draws the scored player population as a GPU point field. Colour and brightness encode risk while position separates the general population from flagged players, giving analysts another way to inspect clusters and outliers.",
      ],
      images: [
        {
          src: "/work/aegis/player-investigation.webp",
          alt: "A player investigation screen showing a monitored player's balances and deposit totals, a risk score of 35 rated high confidence, tags for the rules that fired, and an expanded deposit-structuring finding listing the deposit counts and amounts that triggered it.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "A player investigation opened to the evidence behind a finding. All values, including document numbers, are synthetic.",
        },
        {
          src: "/work/aegis/risk-constellation.webp",
          alt: "The Risk Constellation: a wide, dark field of thousands of faint points with a bright amber cluster, beside a panel breaking 25,000 analysed players into critical, high, medium, low, and no-signal tiers.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "The Risk Constellation visualizing 25,000 synthetic players through position, colour, and brightness.",
        },
      ],
    },
    {
      id: "decision-4",
      heading: "04 — Give the product identity without blocking the work",
      paragraphs: [
        "I treated the internal product as a designed instrument, not a collection of utility screens. The shield-and-iris emblem, dark interface, and cinematic entry sequence give Aegis a coherent identity across the first frame and the investigation workspace.",
        "I modelled and animated the emblem in Blender, exported it as FBX, assembled and lit the scene in Unreal Engine 5, rendered a 4K image sequence, and finished the film in DaVinci Resolve.",
        "The production craft does not block the product. The sequence plays once per session and fails open: if the media stalls, cannot play, or the user reduces motion, the console appears immediately.",
      ],
      video: {
        src: "/work/aegis/entry-intro.mp4",
        poster: "/work/aegis/entry-intro-poster.webp",
        width: 1920,
        height: 1080,
        title: "The Aegis entry sequence — 9 seconds, silent",
        transcript:
          'The film opens almost black. A small blue iris, ringed by concentric dashed segments, glows at the centre of a dark shield-shaped dome while faint aurora curtains drift behind it. The iris brightens and its rings pull into focus. The Aegis wordmark rises in brushed metal, the words "fraud intelligence" set smaller beneath it, reflected in the floor. The wordmark dissolves as the camera settles on the emblem, wreathed in light and drifting dust, and the aurora fades to black. There is no sound.',
        ariaLabel:
          "Silent nine-second title sequence for Aegis, described in the accompanying transcript.",
      },
    },
  ],

  contribution: {
    id: "contribution",
    heading: "What I owned",
    paragraphs: [
      "I owned Aegis across four connected areas: product and interaction design; the React application, FastAPI service, authentication, and permissions; the PostgreSQL model, lakehouse synchronization, hourly pipeline, detection rules, scoring, and reports; and testing, deployment, the WebGL Risk Constellation, and the identity film.",
      "AI accelerated scaffolding, refactoring, test generation, and review. The architecture, implementation, validation, trade-offs, and final product decisions remained my responsibility.",
    ],
  },

  delivered: {
    id: "delivered",
    heading: "What shipped—and what remains limited",
    paragraphs: [
      "Aegis was deployed to production and, as far as I know, remains active. Client business metrics were not available for publication, so this case study reports the product and engineering scope I can verify—not unverified business outcomes.",
      "In the sanitized portfolio edition, shipped and working scope includes eight configurable rules across payment, gameplay, identity, and impact categories; shadow and live execution; scoring and explainable findings; alert triage, player investigation, a browser-local findings worklist, rule administration, geographic analysis, the Risk Constellation, security auditing, and reports exported as HTML, Markdown, or PDF.",
      "Three limits are worth stating plainly. The browser-side login remains a shell, so the API is the sole authorization authority. The end-to-end browser suite is written but skipped; the backend suite has 67 test files. The Risk Constellation is proven to a few hundred thousand points, not millions.",
    ],
    images: [
      {
        src: "/work/aegis/alerts.webp",
        alt: "The alerts triage queue, grouped by rule: duplicate document, incomplete identity checks, deposit structuring, promotional-credit volume, and two operator-impact rules, each with its rule code, category, alert count, and maximum score, next to an empty evidence panel inviting the analyst to select an alert.",
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        caption:
          "The triage queue over synthetic findings. Selecting an alert opens its evidence panel, which is empty in this capture.",
      },
    ],
  },

  technology: {
    id: "technology",
    heading: "Technology in service of the product",
    paragraphs: [
      "React, Vite, and React Router deliver the single-page interface; FastAPI exposes the read-focused API; PostgreSQL owns the investigative model; Databricks remains the analytical source; and Redis supports selected cache-first reads. Opaque sessions, Argon2, TOTP, CSRF protection, and API-enforced permissions form the security boundary.",
      "Three.js and a Web Worker point decoder power the Risk Constellation; deck.gl and MapLibre support geographic analysis; WeasyPrint produces reports; pytest and Jest exercise backend and frontend code paths; and Blender, Unreal Engine 5, and DaVinci Resolve form the identity-film pipeline.",
    ],
  },

  confidentiality: {
    id: "confidentiality",
    heading: "Private by design, open to discussion",
    paragraphs: [
      "The source remains private, and the portfolio edition is a sanitized evolution I maintain independently—not a mirror of the production environment. I can discuss the architecture, trade-offs, and ownership in greater depth without exposing the operator, its systems, or its data.",
    ],
    actions: [
      { label: "Back to selected work", href: "/#work" },
      { label: "Discuss Aegis", href: "/#contact" },
    ],
  },
} as const satisfies CaseStudy;

const aegisCaseStudyPtBr = {
  ...aegisCaseStudy,

  metadata: {
    title: "Aegis — Plataforma de Inteligência contra Fraudes em Produção",
    description:
      "Como projetei e construí uma plataforma de investigação de fraudes em produção para o iGaming brasileiro, de regras explicáveis e pipelines de dados a segurança e WebGL.",
  },

  hero: {
    ...aegisCaseStudy.hero,
    backLink: { label: "Voltar aos trabalhos selecionados", href: "/pt-BR/#work" },
    category: "Inteligência contra fraudes",
    deck: "Projetei e construí uma plataforma em produção que transforma sinais fragmentados de fraude em investigações explicáveis.",
    facts: [
      { label: "Papel", value: "Desenvolvedor de Software" },
      { label: "Período", value: "Abril de 2026–presente" },
      { label: "Estado", value: "Implantado em produção" },
      { label: "Código-fonte", value: "Privado" },
    ],
    support:
      "Para uma operadora brasileira de apostas, fui responsável pelo produto de ponta a ponta, com assistência de IA: fluxos de investigação, detecção explicável, frontend, API, pipelines de dados, segurança, implantação e visualização de risco em WebGL. O Aegis leva o analista do sinal de fraude ao histórico do jogador e às evidências que o explicam.",
    liveEnvironment: { label: "Ambiente ao vivo — em breve" },
    media: {
      ...aegisCaseStudy.hero.media,
      alt: "A marca Aegis em metal escovado sob uma íris azul luminosa inserida em um escudo escuro, iluminado por cortinas de aurora.",
    },
  },

  context: {
    id: "context",
    heading: "Sistema real. Evidência sintética.",
    paragraphs: [
      "O Aegis foi construído para uma empresa não identificada do setor brasileiro de iGaming. O produto, a arquitetura e as decisões de engenharia são reais; nomes, identificadores internos, detalhes de ambiente e dados de produção permanecem privados.",
      "Todas as interfaces exibidas aqui utilizam 25.000 perfis fictícios, gerados localmente e sem conexão com sistemas da empresa. Pessoas, documentos, transações e descobertas são sintéticos — não são dados de produção nem resultados do cliente.",
    ],
  },

  problem: {
    id: "problem",
    heading: "As investigações de fraude começavam pela reconstrução dos dados",
    paragraphs: [
      "Os sinais de fraude estavam distribuídos entre sistemas criados para finalidades diferentes. Dados de identidade e conta ficavam no banco operacional, enquanto depósitos, saques, apostas, saldos e eventos de jogo se acumulavam no lakehouse analítico. Investigar uma conta suspeita significava reconstruir manualmente sua história entre os dois.",
      "O trabalho era tornar comportamento, relacionamentos e histórico do jogador investigáveis em um único lugar, sem resumir a resposta a uma pontuação inexplicável. Cada descoberta precisava mostrar qual regra foi acionada e quais evidências a dispararam.",
    ],
  },

  system: {
    ...aegisCaseStudy.system,
    heading: "Um produto separado, projetado em torno de leituras investigativas",
    paragraphs: [
      "O Aegis separa o trabalho de investigação de sua fonte analítica: uma aplicação React estática conversa com um serviço FastAPI focado em leitura, que consulta um schema PostgreSQL curado em vez de acessar o lakehouse a cada requisição. Esse limite cria um caminho de leitura previsível e isola o acesso a evidências sensíveis.",
      "Jobs agendados sincronizam perfis, carteiras, transações, saldos horários e dados de visualização do Databricks para o PostgreSQL e encadeiam essa sincronização a varreduras de detecção a cada hora. O Redis é uma primeira leitura opcional para dados selecionados; os jobs escrevem no cache e a interface apenas lê.",
    ],
    images: [
      {
        ...aegisCaseStudy.system.images[0],
        alt: "Tela de visão geral do Aegis: um console escuro com menu lateral em português, resumo de risco com 25.000 jogadores analisados e 97 com sinal, e um campo de pontos sutis com um agrupamento âmbar.",
        caption: "A visão geral do produto executada com dados sintéticos. A interface está em português.",
      },
    ],
  },

  decisions: [
    {
      ...aegisCaseStudy.decisions[0],
      heading: "01 — Separar o produto e seu limite de segurança",
      paragraphs: [
        "O caminho mais curto seria adicionar telas de fraude a um sistema que já existia. Em vez disso, construí o Aegis como um produto separado, com schema, API, implantação e ciclo de releases próprios.",
        "Minha decisão considerou o raio de impacto e o ritmo de evolução. Os fluxos de fraude mudam conforme novos padrões surgem, enquanto os documentos e as evidências transacionais exigem um modelo de autorização mais restrito do que a maioria dos usuários internos deveria herdar.",
        "O custo é uma responsabilidade explícita: sessões, proteção contra CSRF, autenticação multifator, hashing Argon2, permissões, credenciais restritas para jobs e auditoria de segurança. A API aplica esse limite como única autoridade de autorização.",
      ],
    },
    {
      ...aegisCaseStudy.decisions[1],
      heading: "02 — Curar os dados investigativos em vez de consultar o lakehouse ao vivo",
      paragraphs: [
        "Os dados de eventos vivem no lakehouse. Consultá-los diretamente pela interface seria o caminho mais curto para um dashboard funcional, mas também vincularia cada etapa da timeline de um jogador à latência e à cobrança do warehouse.",
        "Por isso, o caminho dos dados se divide. Jobs agendados copiam o que o produto precisa para seu schema PostgreSQL curado, um pipeline horário encadeia sincronização e varreduras de detecção, e o Redis mantém primeiras leituras selecionadas. Os jobs escrevem no cache; a interface nunca escreve.",
        "A troca é deliberada: o Aegis lê dados recentes, não dados ao vivo. Para padrões comportamentais que se desenvolvem ao longo de horas e dias, esse era o limite de produto mais adequado.",
      ],
    },
    {
      ...aegisCaseStudy.decisions[2],
      heading: "03 — Construir para investigação, não para monitoramento",
      paragraphs: [
        "Um dashboard pode mostrar que um número está alto; uma ferramenta de investigação precisa explicar o motivo. O Aegis acompanha o caminho do analista: parte de uma fila agrupada por regra e chega a uma visão do jogador que reúne perfil, saldos, transações, gameplay, descobertas abertas e relatórios gerados.",
        "Cada descoberta inclui regra, categoria, nível de confiança e evidências acionadoras. As regras operam em modo sombra por padrão e são promovidas deliberadamente para o modo ativo. Uma lista local no navegador mantém as descobertas em análise; não é um sistema backend de gestão de casos.",
        "A Constelação de Risco desenha a população pontuada como um campo de pontos na GPU. Cor e brilho codificam risco, enquanto a posição separa a população geral dos jogadores sinalizados, oferecendo outra forma de examinar agrupamentos e anomalias.",
      ],
      images: [
        {
          ...aegisCaseStudy.decisions[2].images[0],
          alt: "Tela de investigação de jogador mostrando saldos, depósitos, pontuação de risco 35 com alta confiança, regras acionadas e uma descoberta expandida de estruturação de depósitos com as evidências correspondentes.",
          caption:
            "Uma investigação aberta nas evidências por trás da descoberta. Todos os valores, incluindo documentos, são sintéticos.",
        },
        {
          ...aegisCaseStudy.decisions[2].images[1],
          alt: "A Constelação de Risco: um amplo campo escuro com milhares de pontos sutis e um agrupamento âmbar brilhante, acompanhado por um painel que divide 25.000 jogadores entre níveis crítico, alto, médio, baixo e sem sinal.",
          caption:
            "A Constelação de Risco visualiza 25.000 jogadores sintéticos por meio de posição, cor e brilho.",
        },
      ],
    },
    {
      ...aegisCaseStudy.decisions[3],
      heading: "04 — Dar identidade ao produto sem bloquear o trabalho",
      paragraphs: [
        "Tratei o produto interno como um instrumento projetado, não como uma coleção de telas utilitárias. O emblema de escudo e íris, a interface escura e a abertura cinematográfica dão ao Aegis uma identidade coerente entre o primeiro quadro e o ambiente de investigação.",
        "Modelei e animei o emblema no Blender, exportei-o como FBX, montei e iluminei a cena no Unreal Engine 5, renderizei uma sequência de imagens em 4K e finalizei o filme no DaVinci Resolve.",
        "O trabalho de produção não bloqueia o produto. A sequência é executada uma vez por sessão e falha de forma segura: se a mídia travar, não puder ser reproduzida ou o usuário reduzir o movimento, o console aparece imediatamente.",
      ],
      video: {
        ...aegisCaseStudy.decisions[3].video,
        title: "A sequência de abertura do Aegis — 9 segundos, sem áudio",
        transcript:
          'O filme começa quase completamente escuro. Uma pequena íris azul, cercada por anéis segmentados concêntricos, brilha no centro de uma estrutura escura em forma de escudo enquanto cortinas sutis de aurora se movem ao fundo. A íris ganha intensidade e seus anéis entram em foco. A marca Aegis surge em metal escovado, com as palavras "fraud intelligence" em tamanho menor abaixo, refletidas no piso. A marca se dissolve enquanto a câmera se fixa no emblema, envolto por luz e partículas, e a aurora desaparece no escuro. Não há som.',
        ariaLabel:
          "Sequência silenciosa de nove segundos do Aegis, descrita na transcrição correspondente.",
      },
    },
  ],

  contribution: {
    id: "contribution",
    heading: "O que eu assumi",
    paragraphs: [
      "Fui responsável pelo Aegis em quatro áreas conectadas: produto e design de interação; aplicação React, serviço FastAPI, autenticação e permissões; modelo PostgreSQL, sincronização com o lakehouse, pipeline horário, regras de detecção, pontuação e relatórios; e testes, implantação, Constelação de Risco em WebGL e filme de identidade.",
      "A IA acelerou scaffolding, refatoração, geração de testes e revisão. A arquitetura, a implementação, a validação, as trocas técnicas e as decisões finais de produto permaneceram sob minha responsabilidade.",
    ],
  },

  delivered: {
    ...aegisCaseStudy.delivered,
    heading: "O que foi entregue — e o que ainda tem limites",
    paragraphs: [
      "O Aegis foi implantado em produção e, até onde sei, continua ativo. Métricas de negócio do cliente não estavam disponíveis para publicação, por isso este estudo de caso relata o escopo de produto e engenharia que posso verificar — não redução de fraude, adoção ou impacto financeiro.",
      "Na edição sanitizada do portfólio, o escopo entregue e funcional inclui oito regras configuráveis nas categorias de pagamentos, gameplay, identidade e impacto; execução em modo sombra e ativo; pontuação e descobertas explicáveis; triagem de alertas, investigação de jogadores, lista local de descobertas, administração de regras, análise geográfica, Constelação de Risco, auditoria de segurança e relatórios em HTML, Markdown ou PDF.",
      "Três limites merecem ser explícitos. O login no navegador ainda é uma estrutura não funcional, então a API é a única autoridade de autorização. A suíte E2E de navegador está escrita, mas ignorada; a suíte backend tem 67 arquivos de teste. A Constelação de Risco foi comprovada com algumas centenas de milhares de pontos, não milhões.",
    ],
    images: [
      {
        ...aegisCaseStudy.delivered.images[0],
        alt: "Fila de triagem de alertas agrupada por regra, incluindo documento duplicado, identidade incompleta, estruturação de depósitos e volume de créditos promocionais, com códigos, categorias, contagem de alertas, pontuação máxima e painel de evidências.",
        caption:
          "A fila de triagem usa descobertas sintéticas. Selecionar um alerta abre seu painel de evidências, vazio nesta captura.",
      },
    ],
  },

  technology: {
    id: "technology",
    heading: "Tecnologia a serviço do produto",
    paragraphs: [
      "React, Vite e React Router entregam a interface de página única; FastAPI expõe a API focada em leitura; PostgreSQL mantém o modelo investigativo; Databricks permanece como fonte analítica; e Redis apoia primeiras leituras selecionadas. Sessões opacas, Argon2, TOTP, proteção contra CSRF e permissões aplicadas pela API formam o limite de segurança.",
      "Three.js e um decodificador de pontos em Web Worker sustentam a Constelação de Risco; deck.gl e MapLibre apoiam a análise geográfica; WeasyPrint produz relatórios; pytest e Jest exercitam caminhos do backend e do frontend; e Blender, Unreal Engine 5 e DaVinci Resolve formam o pipeline do filme de identidade.",
    ],
  },

  confidentiality: {
    id: "confidentiality",
    heading: "Privado por decisão, aberto à conversa",
    paragraphs: [
      "O código-fonte permanece privado, e a edição do portfólio é uma evolução sanitizada que mantenho de forma independente — não um espelho do ambiente de produção. Posso discutir a arquitetura, as decisões e minha responsabilidade em maior profundidade sem expor a operadora, seus sistemas ou seus dados.",
    ],
    actions: [
      { label: "Voltar aos trabalhos selecionados", href: "/pt-BR/#work" },
      { label: "Conversar sobre o Aegis", href: "/pt-BR/#contact" },
    ],
  },
} as const satisfies CaseStudy;

export function getAegisCaseStudy(locale: Locale = "en"): CaseStudy {
  return locale === "pt-BR" ? aegisCaseStudyPtBr : aegisCaseStudy;
}
