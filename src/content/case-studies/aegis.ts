import type { CaseStudy } from "@/types/case-study";

/**
 * Visible copy is transcribed verbatim from the approved WO-020 contract,
 * `docs/aegis-case-study-content.md`. Rewording any string here requires a new
 * WO-020 gate. Section order is fixed by that contract and must not change.
 *
 * Route metadata comes from the `/work/aegis` row of the metadata registry in
 * `docs/content.md`.
 */

const SCREENSHOT_WIDTH = 1600;
const SCREENSHOT_HEIGHT = 900;

export const aegisCaseStudy = {
  slug: "aegis",

  metadata: {
    title: "Aegis — Fraud Intelligence Case Study",
    description:
      "Fraud intelligence and investigation software for the iGaming industry, presented through verified engineering decisions and evidence.",
  },

  hero: {
    backLink: { label: "Back to selected work", href: "/#work" },
    category: "Fraud intelligence",
    title: "Aegis",
    deck: "Fraud intelligence for the Brazilian iGaming industry",
    facts: [
      { label: "Role", value: "Software Developer" },
      { label: "Period", value: "April 2026–present" },
      { label: "State", value: "Deployed to production" },
      { label: "Source", value: "Private" },
    ],
    support:
      "Aegis is a fraud-intelligence console built for a betting operator in the Brazilian iGaming sector. It turns scattered operational and analytical data into something an analyst can investigate: scored players, explainable rule findings, and a visual field of an entire player base. I designed and built every layer, with AI assistance.",
    // No verified live URL exists yet, so this renders disabled rather than as a
    // link or a placeholder marker (docs/content.md, decision of 2026-07-31).
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
    heading: "The context",
    paragraphs: [
      "Aegis was built for a betting company in the Brazilian iGaming sector. I am not naming the operator, and nothing here comes from its production environment. Every screenshot comes from the project's own synthetic data: 25,000 fabricated profiles, seeded locally, connected to no company system.",
      "So this page shows the engineering and the product decisions, not the operator's data, its system names, or outcomes it never shared.",
    ],
  },

  problem: {
    id: "problem",
    heading: "The problem",
    paragraphs: [
      "Fraud signals in an online betting operation do not sit in one place: identity details live in the operational database, while deposits, withdrawals, bets, and gameplay events accumulate in the analytical lakehouse. An analyst who suspects one account is structuring deposits, or that several share a document, has to rebuild that story by hand across systems never designed to answer the question.",
      "The job was to make behaviour, relationships, and a player's history investigable in one place, and every finding explainable: which rule fired, on what evidence.",
    ],
  },

  system: {
    id: "system",
    heading: "How the system fits together",
    paragraphs: [
      "Aegis is a standalone React single-page application, served as a static bundle, talking directly to a read-focused FastAPI service. That service reads a curated PostgreSQL schema instead of querying the lakehouse on every request. Scheduled jobs pull profiles, wallets, deposits, withdrawals, hourly balances, and the risk-constellation view out of a Databricks lakehouse into Postgres, then run detection scans, chained hourly. An optional Redis cache fronts the busiest reads: jobs write it, the interface only reads. Deployment targets Google Cloud: serverless containers, managed Postgres, secret storage, scheduling, and federated identity for CI.",
    ],
    images: [
      {
        src: "/work/aegis/overview.webp",
        alt: "The Aegis overview screen: a dark console with a Portuguese sidebar, a risk summary panel counting 25,000 analysed players and 97 with a signal, and a field of faint points with an amber cluster to the right.",
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        caption:
          "The overview on synthetic data. The product interface is in Portuguese.",
      },
    ],
  },

  decisions: [
    {
      id: "decision-1",
      heading: "Decision 1 — Keep Aegis a standalone product",
      paragraphs: [
        "The obvious path was fraud screens inside a system that already existed. I built Aegis as its own product instead, with its own schema, API, and deployment.",
        "My reasoning was blast radius and pace. A fraud console changes quickly as new patterns appear, and it needs its own authorization model, because analysts see documents and transaction evidence most internal users should never see. Coupling it to another system's release cycle and permissions would have made both harder.",
        "The cost is that Aegis owns what it would otherwise inherit: sessions, CSRF protection, multi-factor authentication, Argon2 hashing, permissions, scoped job credentials, and a security-audit log. All of it is enforced in the API, the only authorization authority.",
      ],
    },
    {
      id: "decision-2",
      heading: "Decision 2 — Read from a curated store, not the lakehouse",
      paragraphs: [
        "The event data lives in the lakehouse. Querying it straight from the interface would have been the shortest line to a working dashboard, and the wrong one: warehouse queries are billed, and slow enough that an analyst clicking through a player timeline would feel every one.",
        "So the data path splits. Scheduled jobs copy what the product needs into the curated Postgres schema on a fixed cadence, an hourly pipeline chains that sync into detection scans, and Redis holds what the interface reads first. Jobs write the cache; the interface never does.",
        "The trade-off, plainly: Aegis reads recent data, not live data. For behaviour that unfolds over hours and days, that was the right exchange.",
      ],
    },
    {
      id: "decision-3",
      heading: "Decision 3 — Build for investigation, not for monitoring",
      paragraphs: [
        "A dashboard tells you a number is high; an investigation tool has to tell you why. So the interface follows the analyst's sequence: a triage queue grouped by which rule fired, a player view holding profile, balances, transactions, gameplay, and open findings on one screen, and generated reports for findings that leave the tool.",
        "Every finding carries its rule, category, confidence level, and the evidence fields that triggered it. Rules run in shadow mode by default, recording what they would have flagged, and are promoted to live deliberately.",
        "The Risk Constellation is the part I would not cut. It draws the whole scored player base as a GPU point field, so clusters and outliers surface before you know what to look for.",
      ],
      images: [
        {
          src: "/work/aegis/player-investigation.webp",
          alt: "A player investigation screen showing a monitored player's balances and deposit totals, a risk score of 35 rated high confidence, tags for the rules that fired, and an expanded deposit-structuring finding listing the deposit counts and amounts that triggered it.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "A finding opened down to its evidence. Every value here, document number included, is synthetic.",
        },
        {
          src: "/work/aegis/risk-constellation.webp",
          alt: "The Risk Constellation: a wide, dark field of thousands of faint points with a bright amber cluster, beside a panel breaking 25,000 analysed players into critical, high, medium, low, and no-signal tiers.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "25,000 synthetic players. Colour and brightness carry risk; position separates the flagged from everyone else.",
        },
      ],
    },
    {
      id: "decision-4",
      heading: "Decision 4 — Give the product its own identity",
      paragraphs: [
        "Internal tools usually look like internal tools. I gave Aegis a real identity instead: a shield-and-iris emblem, a dark instrument-panel palette, and a cinematic entry sequence that plays once per session before the console appears.",
        "I produced that sequence myself. The emblem was modelled and animated in Blender, exported as FBX, and taken into Unreal Engine 5 for scene assembly, lighting, the aurora curtains, and the drifting dust, then rendered as a 4K image sequence and finished in DaVinci Resolve.",
        "This was not decoration for its own sake: analysts spend a whole shift inside one tool, and a product that feels considered gets treated as one. It also fails open: if the video stalls or motion is reduced, the console loads immediately.",
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
          "Silent nine-second title sequence for Aegis, described in the summary beside this video.",
      },
    },
  ],

  contribution: {
    id: "contribution",
    heading: "What I did",
    paragraphs: [
      "I designed and built Aegis end to end, with AI assistance throughout: product and interaction design, the React application, the FastAPI service, the Postgres schema, the lakehouse sync and hourly pipeline, the detection rules and scoring, authentication and permissions, the WebGL Risk Constellation, the test suites, the deployment path, and the identity film.",
      "AI sped that work up — scaffolding, refactors, tests, review. The architecture, the trade-offs above, and the product decisions are mine.",
    ],
  },

  delivered: {
    id: "delivered",
    heading: "Delivered",
    paragraphs: [
      "Aegis was deployed to production and, as far as I know, remains active. No client-provided business metrics exist, so this page reports what was built and shipped, not what it earned.",
      "Shipped and working: eight detection rules across payment, gameplay, identity, and impact categories, with configurable thresholds, shadow and live execution, and promotion; risk scoring and finding reports as HTML, Markdown, or PDF; the overview dashboard, player investigation, alerts triage, saved cases, and rule configuration; the Risk Constellation and geographic distribution; admin users with a security-audit view; and a synthetic dataset that runs everything locally.",
      "Three limits I would rather state outright. The browser-side login is still a shell, so the API remains the sole authorization authority. The end-to-end browser suite is written but skipped; the backend suite is 67 test files. The Risk Constellation is proven to a few hundred thousand points, not millions.",
    ],
    images: [
      {
        src: "/work/aegis/alerts.webp",
        alt: "The alerts triage queue, grouped by rule: duplicate document, incomplete identity checks, deposit structuring, promotional-credit volume, and two operator-impact rules, each with its rule code, category, alert count, and maximum score, next to an empty evidence panel inviting the analyst to select an alert.",
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        caption:
          "The triage queue over synthetic findings. Selecting an alert opens its evidence panel, empty here.",
      },
    ],
  },

  technology: {
    id: "technology",
    heading: "Technology, in context",
    paragraphs: [
      "React, Vite, and React Router for the single-page bundle. FastAPI for a read-focused JSON API. PostgreSQL for the curated schema Aegis owns. Databricks as the analytical source. Redis for cache-first reads. Argon2, TOTP, and opaque sessions for authentication. Three.js plus a Web Worker point decoder for the Risk Constellation. deck.gl and MapLibre for geographic views. WeasyPrint for PDF reports. pytest and Jest for the tests. Blender, Unreal Engine 5, and DaVinci Resolve for the film.",
      "Nothing there was chosen for its own sake; each entry exists because a decision above needed it.",
    ],
  },

  confidentiality: {
    id: "confidentiality",
    heading: "A note on confidentiality",
    paragraphs: [
      "I have deliberately left things off this page: the operator's name, its internal system names, deployment identifiers and environment URLs, and any real player, document, transaction, or credential. The screenshots use synthetic data. The repository is private, so there is no code link, and the portfolio version of Aegis is a sanitized evolution I maintain independently, not a mirror of production.",
      "To go further than a public page allows, ask me directly.",
    ],
    actions: [
      { label: "Back to selected work", href: "/#work" },
      { label: "Get in touch", href: "/#contact" },
    ],
  },
} as const satisfies CaseStudy;

import type { Locale } from "@/lib/i18n";

export function getAegisCaseStudy(locale: Locale = "en"): CaseStudy {
  if (locale === "pt-BR") {
    return {
      ...aegisCaseStudy,
      metadata: {
        title: "Aegis — Estudo de Caso de Inteligência contra Fraudes",
        description:
          "Software de inteligência e investigação de fraudes para a indústria de iGaming, apresentado por meio de decisões e evidências de engenharia verificadas.",
      },
      hero: {
        ...aegisCaseStudy.hero,
        backLink: { label: "Voltar aos trabalhos selecionados", href: "/pt-BR/#work" },
        category: "Inteligência contra fraudes",
        deck: "Inteligência contra fraudes para a indústria brasileira de iGaming",
        facts: [
          { label: "Papel", value: "Desenvolvedor de Software" },
          { label: "Período", value: "Abril de 2026–presente" },
          { label: "Status", value: "Implantado em produção" },
          { label: "Fonte", value: "Privado" },
        ],
        support:
          "Aegis é um console de inteligência contra fraudes construído para uma operadora de apostas no setor brasileiro de iGaming. Ele transforma dados operacionais e analíticos dispersos em informações investigáveis para analistas: pontuação de jogadores, descobertas de regras explicáveis e visualização completa da base de jogadores. Projetei e construí cada camada, com assistência de IA.",
        liveEnvironment: { label: "Ambiente ao vivo — em breve" },
      },
      confidentiality: {
        ...aegisCaseStudy.confidentiality,
        actions: [
          { label: "Voltar aos trabalhos selecionados", href: "/pt-BR/#work" },
          { label: "Entrar em contato", href: "/pt-BR/#contact" },
        ],
      },
    };
  }
  return aegisCaseStudy;
}

