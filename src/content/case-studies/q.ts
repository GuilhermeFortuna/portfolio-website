import type { CaseStudy } from "@/types/case-study";

/**
 * Visible copy is transcribed from the owner-revised content contract,
 * `docs/q-case-study-content.md` (visual revision superseding the original
 * WO-026 contract). Rewording any string here requires a new content gate.
 * Section order is fixed by that contract and must not change.
 *
 * The Q emblem / Unreal Engine identity render is not yet captured. Section
 * 2 and the hero identity still both use `identity-placeholder.svg` — swap
 * `IDENTITY_MEDIA_SRC` below for the approved asset when it lands; every
 * other reference to it in this file follows automatically.
 *
 * Route metadata comes from the `/work/q` row of the metadata registry in
 * `docs/content.md`.
 */

const SCREENSHOT_WIDTH = 2560;
const SCREENSHOT_HEIGHT = 1440;

const IDENTITY_MEDIA_SRC = "/work/q/identity-placeholder.svg";

export const qCaseStudy = {
  slug: "q",

  metadata: {
    title: "Quant — Quantitative Research and Execution",
    description:
      "A native quantitative research platform for the Brazilian futures market, covering backtesting, optimization, data pipelines, and execution architecture.",
  },

  hero: {
    backLink: { label: "Back to selected work", href: "/#work" },
    category: "Quantitative systems",
    title: "Quant",
    deck: "A native quantitative research platform designed as a professional market instrument",
    facts: [
      { label: "Role", value: "Founder, designer, and sole developer" },
      { label: "Period", value: "April 2026–present" },
      { label: "Platform", value: "Native desktop" },
      { label: "Market", value: "Brazilian futures and equities" },
      { label: "State", value: "Active research and backtesting" },
      { label: "Source", value: "Private" },
    ],
    support:
      "I designed and built Quant end to end to turn trading ideas into structured research workflows — from market-data ingestion and strategy construction to distributed backtesting, optimization, discovery, and out-of-sample validation. The engineering and visual design were developed together so the product feels less like a collection of scripts and more like a focused professional tool.",
    // DEC-02: native desktop app — omit the live-environment control entirely.
    media: {
      src: "/work/q/launcher.webp",
      alt: "The Quant launcher dashboard showing market status, system health, and recent research activity in a polished dark desktop interface.",
      width: SCREENSHOT_WIDTH,
      height: SCREENSHOT_HEIGHT,
    },
    identityMedia: {
      src: IDENTITY_MEDIA_SRC,
      alt: "Placeholder graphic. The final Q emblem and Unreal Engine scene render is pending and will replace this placeholder.",
      width: SCREENSHOT_WIDTH,
      height: SCREENSHOT_HEIGHT,
    },
  },

  identity: {
    id: "identity",
    heading: "Designing Q as a product, not just a tool",
    paragraphs: [
      "Quant began as an engineering project, but I did not want its interface to feel like an internal dashboard assembled around whatever the backend exposed. I treated visual identity, interaction design, and system architecture as parts of the same product.",
      "I created the Q emblem in Blender, then used Unreal Engine 5 to build its cinematic presentation scene. That identity informed the application itself: dark layered surfaces, restrained metallic accents, strong depth, precise motion, and workspaces designed to keep dense research information readable.",
      "The result is intentionally more immersive than a typical analytics interface, without sacrificing the clarity required for long research sessions.",
    ],
    images: [
      {
        src: IDENTITY_MEDIA_SRC,
        alt: "Placeholder graphic standing in for the Q emblem, created in Blender and presented through a cinematic scene built in Unreal Engine 5.",
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        caption:
          "The Q emblem was created in Blender and presented through a cinematic scene built in Unreal Engine 5. Placeholder shown pending the final render.",
      },
    ],
  },

  origin: {
    id: "origin",
    heading: "Built from a real research problem",
    paragraphs: [
      "Quant grew from my own systematic trading research. I needed a way to move beyond spreadsheets and disconnected scripts: collect reusable market data, express strategies consistently, test them across historical periods, explore large parameter spaces, and challenge promising results before putting capital at risk.",
      "That problem became the reason I learned to program. I have rebuilt the idea several times over roughly six years, each version reflecting what I had learned about markets, software architecture, research discipline, and product design. The current implementation began in April 2026 and is a new codebase.",
      "An earlier generation of my tooling supported the research behind a strategy I traded personally, growing approximately R$3,000 into R$90,000 over about one year. That historical result predates the system shown here. It is project context, not a forecast or a claim that this implementation produced those returns.",
    ],
  },

  tourIntro: {
    id: "tour",
    heading: "Inside the product",
    paragraphs: [
      "Quant is organized as a set of focused workspaces connected by a persistent desktop shell. Each workspace handles a distinct stage of the research process, while the shared navigation, job state, diagnostics, and visual language make the system feel like one instrument rather than separate utilities.",
    ],
  },

  tourGroups: [
    {
      id: "tour-market-data",
      heading: "Market data and system awareness",
      paragraphs: [
        "The market-data workspace provides the visual foundation for research: instruments, historical price series, indicators, and the state of the local data environment. System diagnostics expose data-source availability, environment details, and backend health without forcing the user to leave the application.",
      ],
      images: [
        {
          src: "/work/q/market-data.webp",
          alt: "A Quant market-data workspace displaying a candlestick chart with indicators and market controls.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Market data and technical context inside the desktop research environment.",
        },
        {
          src: "/work/q/system.webp",
          alt: "The Quant system workspace showing data-source status, environment details, and backend-health diagnostics.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Data sources, environment state, and backend health in one diagnostic workspace.",
        },
      ],
    },
    {
      id: "tour-backtesting",
      heading: "Strategy construction and backtesting",
      paragraphs: [
        "The backtest studio turns strategy definitions into inspectable experiments. Entry and exit logic, parameters, instruments, and simulation settings live in one workspace, while completed runs expose the equity path, drawdown, trades, and supporting statistics needed for analysis.",
        "The interface is designed to keep configuration and evidence close together so a result can be traced back to the assumptions that produced it.",
      ],
      images: [
        {
          src: "/work/q/backtest-studio.webp",
          alt: "The Quant backtest studio showing strategy entries, exits, parameters, and simulation controls.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Strategy configuration and simulation controls in the Backtests workspace.",
        },
        {
          src: "/work/q/backtest-results.webp",
          alt: "A Quant backtest result showing an equity curve, drawdown view, and supporting run statistics.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "A completed simulation presented for inspection. The figures are research output, not a published trading record.",
        },
      ],
    },
    {
      id: "tour-optimization",
      heading: "Optimization and discovery",
      paragraphs: [
        "Optimization studies move parameter search out of ad hoc loops and into a structured workflow. Trials can be compared across multiple objectives rather than reduced to one headline number.",
        "Discovery expands that process across broader strategy candidates and ranks results using out-of-sample evidence. The objective is not to let the system declare a winner, but to help narrow a large search space into candidates worth further investigation.",
      ],
      images: [
        {
          src: "/work/q/optimize-pareto.webp",
          alt: "A Quant optimization workspace displaying a table of study trials and multiple objective values.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption: "Optimization trials compared across multiple objectives.",
        },
        {
          src: "/work/q/discover-leaderboard.webp",
          alt: "The Quant discovery workspace showing a leaderboard of strategy candidates ranked using out-of-sample metrics.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption: "Discovery results organized for comparison and deeper review.",
        },
      ],
    },
    {
      id: "tour-research",
      heading: "Research features and validation",
      paragraphs: [
        "The research workspace provides a feature catalog for developing and evaluating inputs, including neural features. Validation then challenges promising configurations across in-sample and out-of-sample windows with a per-window breakdown.",
        "This separation matters: feature creation, simulation performance, and held-out validation answer different questions. Quant keeps those questions visible instead of collapsing them into a single score.",
      ],
      images: [
        {
          src: "/work/q/research-features.webp",
          alt: "The Quant feature store displaying a catalog of research features available to the system.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption: "A structured feature catalog for research workflows.",
        },
        {
          src: "/work/q/walkforward.webp",
          alt: "A validation workspace comparing in-sample and out-of-sample results across multiple windows.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "In-sample and out-of-sample windows from a completed validation run.",
        },
      ],
    },
    {
      id: "tour-execution",
      heading: "Execution and background work",
      paragraphs: [
        "Long-running research continues outside the interface through queued workers, while the desktop shell reports job state through the workspace dock. That allows the product to remain responsive during backtests, optimization studies, and discovery searches.",
        "The execution workspace currently supports paper accounts and paper deployments. Live trading is rejected by both the interface and the API, making the product's present boundary explicit.",
      ],
      images: [
        {
          src: "/work/q/dock.webp",
          alt: "The Quant workspace dock showing progress for a backtest running in the worker pool.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "A queued backtest reporting progress through the persistent workspace dock.",
        },
        {
          src: "/work/q/execution.webp",
          alt: "The Quant execution workspace showing a paper account, an active paper deployment, and indicators that live trading is locked.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Paper execution with live trading locked. The capture uses fixture data.",
        },
      ],
    },
  ],

  system: {
    id: "architecture",
    heading: "How the system fits together",
    paragraphs: [
      "Quant runs as a Tauri 2 desktop application around a React interface. The frontend communicates with a FastAPI service, while backtests, optimization studies, and discovery jobs run asynchronously through Dramatiq workers backed by Redis. PostgreSQL stores application data through Alembic-managed schema changes.",
      "Market data arrives through MetaTrader 5 and a separate read-only gateway, then lands in local storage used by the research workspaces. A deterministic mocks mode can run the complete interface without the API, database, queue, or broker connection, allowing product design and frontend development to continue against stable fixtures.",
    ],
  },

  decisions: [
    {
      id: "decision-1",
      heading: "Native desktop instead of public SaaS",
      paragraphs: [
        "Quant depends on local market-data services, long-running workers, and files that belong beside the research environment. Packaging the React interface inside Tauri makes that boundary explicit: this is an operator tool running on the research machine, not a public website.",
        "The trade-off is a native toolchain and platform-specific dependencies, but the result matches how the product is actually used.",
      ],
    },
    {
      id: "decision-2",
      heading: "Queued research jobs",
      paragraphs: [
        "Backtests, optimization sweeps, and discovery searches do not belong inside the HTTP request that starts them. The API accepts the work and returns, while Dramatiq workers execute it through Redis and publish job state back to the interface.",
        "This keeps the UI responsive and lets the dock report progress from the actual background job.",
      ],
    },
    {
      id: "decision-3",
      heading: "Validation before deployment",
      paragraphs: [
        "A single backtest can reward overfitting, so Quant does not treat one equity curve as sufficient evidence. Optimization and validation live inside the Backtests workflow, where parameter sets can be compared across in-sample and out-of-sample windows.",
        "In my own process, held-out validation sits between a promising simulation and any path toward deployment. The software presents evidence; it does not declare a strategy successful.",
      ],
    },
    {
      id: "decision-4",
      heading: "Fixture-first product development",
      paragraphs: [
        "I built a deterministic mocks mode with Mock Service Worker so the workspaces could evolve while the API, workers, and data paths were still changing.",
        "This separated interaction design from service availability, accelerated frontend development, and made visual testing reproducible. The same screens can later point at the complete local stack.",
      ],
    },
  ],

  contribution: {
    id: "contribution",
    heading: "My contribution",
    paragraphs: [
      "I conceived, designed, and built Quant as a solo product: its visual identity, Blender emblem, Unreal Engine scene, desktop shell, interaction system, frontend workspaces, API, worker architecture, database schema, market-data paths, research workflows, execution controls, automated tests, and development tooling.",
      "AI assisted throughout with scaffolding, refactoring, test generation, and review. It accelerated implementation, but the product direction, architecture, visual system, engineering trade-offs, and final decisions are mine.",
    ],
  },

  technology: {
    id: "technology",
    heading: "Technology",
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
    heading: "Current status",
    paragraphs: [
      "The current implementation is actively used for research and backtesting, with paper execution available and live trading intentionally disabled while the execution path continues to mature.",
      "The repository is private. Public materials omit credentials, broker details, account identifiers, deployment identifiers, and private source code. For a deeper technical or product walkthrough, contact me directly.",
    ],
    actions: [
      { label: "Back to selected work", href: "/#work" },
      { label: "Get in touch", href: "/#contact" },
    ],
  },
} as const satisfies CaseStudy;
