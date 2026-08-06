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
    deck: "A fraud investigation platform I designed, built, and shipped alone — from the detection rules to the WebGL that renders them.",
    facts: [
      { label: "Role", value: "Software Developer" },
      { label: "Period", value: "April 2026–present" },
      { label: "State", value: "Deployed to production" },
      { label: "Source", value: "Private" },
    ],
    support:
      "A Brazilian betting operator needed its analysts to stop reconstructing player histories by hand. I built them the whole thing, with AI assistance: the investigation workflows, the detection engine, the API, the data pipelines, the security model, the deployment, and the WebGL view that renders 25,000 players at once. Aegis takes an analyst from a signal to the evidence behind it without leaving the screen.",
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

  problem: {
    id: "problem",
    heading: "Every investigation started from scratch",
    paragraphs: [
      "An analyst who wanted to understand one suspicious account had to assemble it by hand. Identity and account data lived in the operational database. Deposits, withdrawals, bets, balances, and gameplay events accumulated in the analytical lakehouse. The story of a player existed, but only in pieces, across two systems that were never meant to be read together.",
      "I also wanted the answer to survive scrutiny. A score on its own is useless to someone who has to justify freezing an account, so every finding Aegis produces names the rule that fired and shows the evidence that triggered it.",
    ],
  },

  system: {
    id: "system",
    heading: "The path a request takes",
    paragraphs: [
      "Aegis is a static React application talking to a read-focused FastAPI service, and that service reads a curated PostgreSQL schema I designed for investigation. The lakehouse stays out of the request path entirely. That boundary buys a predictable read path and keeps access to sensitive evidence in one place I control.",
      "Scheduled jobs move profiles, wallets, transactions, hourly balances, and visualization data from Databricks into PostgreSQL, then chain straight into detection scans every hour. Redis serves selected first reads: the jobs write it, the interface only reads it.",
    ],
    images: [
      {
        src: "/work/aegis/overview.webp",
        alt: "The Aegis overview screen: a dark console with a Portuguese sidebar, a risk summary counting 25,000 analysed players and 97 with a signal, and a field of faint points with an amber cluster.",
        width: 3840,
        height: 2160,
        caption: "The overview, running on 25,000 synthetic profiles. The interface ships in Portuguese.",
      },
    ],
  },

  decisions: [
    {
      id: "decision-1",
      heading: "01 — I made it a separate product",
      paragraphs: [
        "I could have bolted fraud screens onto a system that already existed, and nobody would have argued with me. I built Aegis as its own product instead: its own schema, its own API, its own deployment, its own release cycle.",
        "Two things drove that. Fraud workflows change every time a new pattern shows up, and I wanted to ship those changes without touching anything else. And the evidence behind a finding — documents, transaction history — needs a tighter authorization model than the average internal user should ever inherit.",
        "That decision handed me the entire security surface to own: sessions, CSRF protection, multi-factor authentication, Argon2 hashing, permissions, scoped job credentials, security auditing. I took it. The API is the single authorization authority.",
      ],
    },
    {
      id: "decision-2",
      heading: "02 — I stopped querying the lakehouse on every click",
      paragraphs: [
        "The event data lives in the lakehouse, and pointing the interface straight at it would have been the fastest route to a working dashboard. It would also have chained every step through a player timeline to warehouse latency and a billing meter.",
        "So the data path splits. Scheduled jobs copy what the product needs into the curated schema, an hourly pipeline runs sync and then scan, and Redis absorbs the reads that repeat.",
        "Aegis therefore reads recent data rather than live data, and I made that call deliberately. The behaviour I am detecting — structuring, velocity, repeated documents — develops over hours and days. Freshness I did not need was not worth the latency I would have paid for it.",
      ],
    },
    {
      id: "decision-3",
      heading: "03 — I followed the analyst's actual path",
      paragraphs: [
        "A dashboard tells you a number is high. That is where its job ends and the analyst's job starts, which is exactly the wrong place to stop. Aegis follows the path someone actually walks: a triage queue grouped by rule, opening into a player view that holds profile, balances, transactions, gameplay, open findings, and generated reports in one place.",
        "Every finding carries its rule, category, confidence level, and the evidence that triggered it. Rules run in shadow mode by default and get promoted to live on purpose, never by accident. Findings an analyst is actively working sit in a browser-local worklist.",
        "Then there is the Risk Constellation. I render the whole scored population as a GPU point field, with colour and brightness for risk and position to pull flagged players out of the crowd. It started as a question about whether 25,000 players could be legible at once. It turned out clusters and outliers are far easier to see than to query.",
      ],
      images: [
        {
          src: "/work/aegis/player-investigation.webp",
          alt: "A player investigation screen showing a monitored player's balances and deposit totals, a risk score of 35 rated high confidence, tags for the rules that fired, and an expanded deposit-structuring finding listing the deposit counts and amounts that triggered it.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "A finding opened to its evidence. Every value here, including the document number, is synthetic.",
        },
        {
          src: "/work/aegis/risk-constellation.webp",
          alt: "The Risk Constellation: a wide, dark field of thousands of faint points with a bright amber cluster, beside a panel breaking 25,000 analysed players into critical, high, medium, low, and no-signal tiers.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "25,000 synthetic players placed by risk, in colour and brightness.",
        },
      ],
    },
    {
      id: "decision-4",
      heading: "04 — I made an internal tool worth looking at",
      paragraphs: [
        "Internal tools look like internal tools because someone decided nobody would mind. I minded. Aegis got a shield-and-iris emblem, a dark console, and a cinematic entry sequence, and that identity holds from the first frame through to the investigation workspace.",
        "I modelled and animated the emblem in Blender, exported it as FBX, assembled and lit the scene in Unreal Engine 5, rendered a 4K image sequence, and graded the film in DaVinci Resolve. That is not a normal thing to do for a fraud console. I wanted to find out whether I could.",
        "None of it gets in the way of the work. The sequence plays once per session and fails open: if the media stalls, cannot play, or the user prefers reduced motion, the console is simply there.",
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
    heading: "What I built",
    paragraphs: [
      "Aegis is mine end to end. The product and interaction design. The React application, the FastAPI service, authentication, permissions. The PostgreSQL model, the lakehouse synchronization, the hourly pipeline, the detection rules, the scoring, the reports. The tests, the deployment, the WebGL Risk Constellation, and the identity film.",
      "I work AI-native and I am not shy about it: agents accelerated scaffolding, refactoring, test generation, and review. Every architectural decision, every trade-off, and every judgment about whether something was actually good enough stayed mine.",
    ],
  },

  delivered: {
    id: "delivered",
    heading: "What shipped",
    paragraphs: [
      "I shipped Aegis to production. Eight configurable rules across payment, gameplay, identity, and impact categories; shadow and live execution; scoring and explainable findings; alert triage; player investigation; a browser-local worklist; rule administration; geographic analysis; the Risk Constellation; security auditing; and reports exported as HTML, Markdown, or PDF.",
    ],
    images: [
      {
        src: "/work/aegis/alerts.webp",
        alt: "The alerts triage queue, grouped by rule: duplicate document, incomplete identity checks, deposit structuring, promotional-credit volume, and two operator-impact rules, each with its rule code, category, alert count, and maximum score, next to an empty evidence panel inviting the analyst to select an alert.",
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        caption:
          "The triage queue. Selecting an alert opens its evidence panel, empty in this capture.",
      },
    ],
  },

  technology: {
    id: "technology",
    heading: "What it is built with",
    paragraphs: [
      "React, Vite, and React Router deliver the interface. FastAPI exposes the read API. PostgreSQL owns the investigative model, Databricks stays the analytical source, and Redis backs selected cache-first reads. Opaque sessions, Argon2, TOTP, CSRF protection, and API-enforced permissions hold the security boundary.",
      "Three.js and a Web Worker point decoder drive the Risk Constellation. deck.gl and MapLibre handle geographic analysis. WeasyPrint generates the reports. pytest and Jest cover backend and frontend paths. Blender, Unreal Engine 5, and DaVinci Resolve produced the identity film.",
    ],
  },

  // The chapter ends on navigation alone: no heading and no prose render, so
  // `heading` only names the landmark. The synthetic-data disclosure lives in
  // the image captions.
  confidentiality: {
    id: "continue",
    heading: "Continue",
    actions: [
      { label: "Back to selected work", href: "/#work" },
      { label: "Next project: Quant", href: "/work/q" },
    ],
  },
} as const satisfies CaseStudy;

/**
 * Brazilian Portuguese is a complete authored chapter, not a translation layer:
 * it inherits no visible copy from the English object, matching the convention
 * the other three case studies follow.
 */
const aegisCaseStudyPtBr = {
  slug: "aegis",

  metadata: {
    title: "Aegis — Plataforma de Inteligência contra Fraudes em Produção",
    description:
      "Como projetei e construí uma plataforma de investigação de fraudes em produção para o iGaming brasileiro, de regras explicáveis e pipelines de dados a segurança e WebGL.",
  },

  hero: {
    backLink: { label: "Voltar aos trabalhos selecionados", href: "/pt-BR/#work" },
    category: "Inteligência contra fraudes",
    title: "Aegis",
    deck: "Uma plataforma de investigação de fraudes que projetei, construí e coloquei em produção sozinho — das regras de detecção ao WebGL que as desenha.",
    facts: [
      { label: "Papel", value: "Desenvolvedor de Software" },
      { label: "Período", value: "Abril de 2026–presente" },
      { label: "Estado", value: "Em produção" },
      { label: "Código-fonte", value: "Privado" },
    ],
    support:
      "Uma operadora brasileira de apostas precisava que seus analistas parassem de remontar o histórico de cada jogador na mão. Construí tudo, com assistência de IA: os fluxos de investigação, o motor de detecção, a API, os pipelines de dados, o modelo de segurança, a implantação e a visualização em WebGL que desenha 25.000 jogadores de uma vez. O Aegis leva o analista do sinal até a evidência por trás dele sem sair da tela.",
    liveEnvironment: { label: "Ambiente ao vivo — em breve" },
    media: {
      src: "/work/aegis/entry-intro-poster.webp",
      alt: "A marca Aegis em metal escovado sob uma íris azul luminosa inserida em um escudo escuro, iluminado por cortinas de aurora.",
      width: SCREENSHOT_WIDTH,
      height: SCREENSHOT_HEIGHT,
    },
  },

  problem: {
    id: "problem",
    heading: "Toda investigação começava do zero",
    paragraphs: [
      "Um analista que quisesse entender uma conta suspeita tinha que montar a história na mão. Identidade e dados cadastrais ficavam no banco operacional. Depósitos, saques, apostas, saldos e eventos de jogo se acumulavam no lakehouse analítico. A história do jogador existia, mas em pedaços, espalhada por dois sistemas que nunca foram feitos para serem lidos juntos.",
      "Eu também queria que a resposta aguentasse questionamento. Uma pontuação sozinha não serve para quem precisa justificar o bloqueio de uma conta, então todo achado do Aegis diz qual regra disparou e mostra a evidência que a disparou.",
    ],
  },

  system: {
    id: "system",
    heading: "O caminho que uma requisição faz",
    paragraphs: [
      "O Aegis é uma aplicação React estática conversando com um serviço FastAPI focado em leitura, e esse serviço lê um schema PostgreSQL que desenhei para investigação. O lakehouse fica fora do caminho da requisição. Esse limite compra um caminho de leitura previsível e mantém o acesso à evidência sensível em um lugar só, sob meu controle.",
      "Jobs agendados trazem perfis, carteiras, transações, saldos horários e dados de visualização do Databricks para o PostgreSQL e emendam direto nas varreduras de detecção, de hora em hora. O Redis atende primeiras leituras selecionadas: os jobs escrevem, a interface só lê.",
    ],
    images: [
      {
        src: "/work/aegis/overview.webp",
        alt: "Tela de visão geral do Aegis: um console escuro com menu lateral em português, resumo de risco com 25.000 jogadores analisados e 97 com sinal, e um campo de pontos sutis com um agrupamento âmbar.",
        width: 3840,
        height: 2160,
        caption: "A visão geral, rodando sobre 25.000 perfis sintéticos. A interface é em português.",
      },
    ],
  },

  decisions: [
    {
      id: "decision-1",
      heading: "01 — Fiz dele um produto separado",
      paragraphs: [
        "Eu podia ter pendurado telas de fraude em um sistema que já existia, e ninguém teria reclamado. Em vez disso, construí o Aegis como produto próprio: schema próprio, API própria, implantação própria, ciclo de release próprio.",
        "Duas coisas me levaram a isso. Fluxo de fraude muda toda vez que aparece um padrão novo, e eu queria entregar essas mudanças sem encostar em mais nada. E a evidência por trás de um achado — documentos, histórico de transações — pede um modelo de autorização mais apertado do que o usuário interno médio deveria herdar.",
        "Essa decisão me entregou toda a superfície de segurança para cuidar: sessões, proteção contra CSRF, autenticação multifator, hashing Argon2, permissões, credenciais restritas para os jobs, auditoria de segurança. Assumi. A API é a única autoridade de autorização.",
      ],
    },
    {
      id: "decision-2",
      heading: "02 — Parei de consultar o lakehouse a cada clique",
      paragraphs: [
        "Os dados de evento vivem no lakehouse, e apontar a interface direto para lá teria sido o caminho mais rápido até um dashboard funcionando. Também teria amarrado cada passo dentro da timeline de um jogador à latência do warehouse e ao medidor de cobrança.",
        "Então o caminho dos dados se divide. Jobs agendados copiam o que o produto precisa para o schema curado, um pipeline horário roda sincronização e depois varredura, e o Redis absorve as leituras que se repetem.",
        "O Aegis, portanto, lê dados recentes em vez de dados ao vivo, e essa escolha foi deliberada. O comportamento que estou detectando — estruturação, velocidade, documento repetido — se desenvolve ao longo de horas e dias. Frescor que eu não precisava não valia a latência que eu teria pago por ele.",
      ],
    },
    {
      id: "decision-3",
      heading: "03 — Segui o caminho real do analista",
      paragraphs: [
        "Um dashboard te diz que um número está alto. É aí que o trabalho dele acaba e o do analista começa, que é exatamente o lugar errado de parar. O Aegis segue o caminho que a pessoa percorre de verdade: uma fila de triagem agrupada por regra, que abre em uma visão do jogador reunindo perfil, saldos, transações, gameplay, achados em aberto e relatórios gerados no mesmo lugar.",
        "Todo achado carrega sua regra, categoria, nível de confiança e a evidência que o disparou. As regras rodam em shadow mode por padrão e são promovidas para o modo ativo de propósito, nunca por acidente. Os achados que o analista está trabalhando ficam em uma lista local no navegador.",
        "E tem a Constelação de Risco. Desenho a população pontuada inteira como um campo de pontos na GPU, com cor e brilho para risco e posição para puxar os jogadores sinalizados para fora da multidão. Começou como uma pergunta: dá para ler 25.000 jogadores de uma vez? Acabou que agrupamento e ponto fora da curva são muito mais fáceis de enxergar do que de consultar.",
      ],
      images: [
        {
          src: "/work/aegis/player-investigation.webp",
          alt: "Tela de investigação de jogador mostrando saldos, depósitos, pontuação de risco 35 com alta confiança, regras acionadas e um achado expandido de estruturação de depósitos com as evidências correspondentes.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Um achado aberto na evidência que o sustenta. Todo valor aqui, inclusive o número do documento, é sintético.",
        },
        {
          src: "/work/aegis/risk-constellation.webp",
          alt: "A Constelação de Risco: um amplo campo escuro com milhares de pontos sutis e um agrupamento âmbar brilhante, acompanhado por um painel que divide 25.000 jogadores entre níveis crítico, alto, médio, baixo e sem sinal.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "25.000 jogadores sintéticos posicionados por risco, em cor e brilho.",
        },
      ],
    },
    {
      id: "decision-4",
      heading: "04 — Fiz uma ferramenta interna que vale olhar",
      paragraphs: [
        "Ferramenta interna tem cara de ferramenta interna porque alguém decidiu que ninguém ia se importar. Eu me importei. O Aegis ganhou um emblema de escudo e íris, um console escuro e uma abertura cinematográfica, e essa identidade se sustenta do primeiro quadro até o ambiente de investigação.",
        "Modelei e animei o emblema no Blender, exportei em FBX, montei e iluminei a cena no Unreal Engine 5, renderizei uma sequência de imagens em 4K e finalizei o filme no DaVinci Resolve. Não é uma coisa normal de se fazer para um console de fraude. Eu quis descobrir se conseguia.",
        "Nada disso atrapalha o trabalho. A sequência roda uma vez por sessão e falha para o lado seguro: se a mídia travar, não puder ser reproduzida ou a pessoa preferir menos movimento, o console simplesmente está lá.",
      ],
      video: {
        src: "/work/aegis/entry-intro.mp4",
        poster: "/work/aegis/entry-intro-poster.webp",
        width: 1920,
        height: 1080,
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
    heading: "O que eu construí",
    paragraphs: [
      "O Aegis é meu de ponta a ponta. O produto e o design de interação. A aplicação React, o serviço FastAPI, autenticação, permissões. O modelo PostgreSQL, a sincronização com o lakehouse, o pipeline horário, as regras de detecção, a pontuação, os relatórios. Os testes, a implantação, a Constelação de Risco em WebGL e o filme de identidade.",
      "Trabalho AI-native e não tenho pudor nenhum com isso: os agentes aceleraram scaffolding, refatoração, geração de testes e revisão. Toda decisão de arquitetura, todo trade-off e todo julgamento sobre se algo estava realmente bom o suficiente continuaram meus.",
    ],
  },

  delivered: {
    id: "delivered",
    heading: "O que foi entregue",
    paragraphs: [
      "Coloquei o Aegis em produção. Oito regras configuráveis nas categorias de pagamentos, gameplay, identidade e impacto; execução em shadow mode e em modo ativo; pontuação e achados explicáveis; triagem de alertas; investigação de jogadores; lista de trabalho local no navegador; administração de regras; análise geográfica; Constelação de Risco; auditoria de segurança; e relatórios em HTML, Markdown ou PDF.",
    ],
    images: [
      {
        src: "/work/aegis/alerts.webp",
        alt: "Fila de triagem de alertas agrupada por regra, incluindo documento duplicado, identidade incompleta, estruturação de depósitos e volume de créditos promocionais, com códigos, categorias, contagem de alertas, pontuação máxima e painel de evidências.",
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        caption:
          "A fila de triagem, sobre achados sintéticos. Selecionar um alerta abre seu painel de evidências, vazio nesta captura.",
      },
    ],
  },

  technology: {
    id: "technology",
    heading: "Com o que foi construído",
    paragraphs: [
      "React, Vite e React Router entregam a interface. O FastAPI expõe a API de leitura. O PostgreSQL é dono do modelo investigativo, o Databricks segue como fonte analítica e o Redis sustenta leituras selecionadas a partir de cache. Sessões opacas, Argon2, TOTP, proteção contra CSRF e permissões aplicadas pela API seguram o limite de segurança.",
      "Three.js e um decodificador de pontos em Web Worker movem a Constelação de Risco. deck.gl e MapLibre cuidam da análise geográfica. O WeasyPrint gera os relatórios. pytest e Jest cobrem os caminhos de backend e de frontend. Blender, Unreal Engine 5 e DaVinci Resolve produziram o filme de identidade.",
    ],
  },

  confidentiality: {
    id: "continue",
    heading: "Continuar",
    actions: [
      { label: "Voltar aos trabalhos selecionados", href: "/pt-BR/#work" },
      { label: "Próximo projeto: Quant", href: "/pt-BR/work/q" },
    ],
  },
} as const satisfies CaseStudy;

export function getAegisCaseStudy(locale: Locale = "en"): CaseStudy {
  return locale === "pt-BR" ? aegisCaseStudyPtBr : aegisCaseStudy;
}
