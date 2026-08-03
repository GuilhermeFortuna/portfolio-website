import type { CaseStudy } from "@/types/case-study";

/**
 * Visible copy is transcribed verbatim from the approved WO-026 contract,
 * `docs/q-case-study-content.md`. Rewording any string here requires a new
 * WO-026 gate. Section order is fixed by that contract and must not change.
 *
 * Route metadata comes from the `/work/q` row of the metadata registry in
 * `docs/content.md`.
 */

const SCREENSHOT_WIDTH = 2560;
const SCREENSHOT_HEIGHT = 1440;

export const qCaseStudy = {
  slug: "q",

  metadata: {
    title: "Quant — Quantitative Research and Execution",
    description:
      "A quantitative research and execution system covering backtesting, optimization, data pipelines, and execution architecture.",
  },

  hero: {
    backLink: { label: "Back to selected work", href: "/#work" },
    category: "Quantitative systems",
    title: "Quant",
    deck: "Research and backtesting for the Brazilian futures market",
    facts: [
      { label: "Role", value: "Founder and sole developer" },
      { label: "Period", value: "April 2026–present" },
      { label: "State", value: "Research and backtesting" },
      { label: "Source", value: "Private" },
    ],
    support:
      "Quant is my research and backtesting tool for the Brazilian futures market. I am the founder and sole developer. The idea is about six years old; this implementation dates from April 2026. I designed and built every layer as a native desktop application, with AI assistance.",
    // DEC-02: native desktop app — omit the live-environment control entirely.
    media: {
      src: "/work/q/launcher.webp",
      alt: "The Quant launcher dashboard: a dark desktop console with a market monitor, a system gauge reading online, and a recent-simulations panel.",
      width: SCREENSHOT_WIDTH,
      height: SCREENSHOT_HEIGHT,
    },
  },

  context: {
    id: "context",
    heading: "The context",
    paragraphs: [
      "Quant is my own product. It is a research, backtesting, and future-execution tool aimed at the Brazilian futures market — instruments like WIN$ and WDO$ on BMF, alongside B3 equities when the local store or MetaTrader 5 provides them.",
      "The idea is roughly six years old. It is the problem that made me learn to program, and I have rebuilt it many times. What you see here is the current implementation, begun in April 2026 — not a six-year-old codebase. This is the most capable version I have shipped of that long idea.",
    ],
  },

  problem: {
    id: "problem",
    heading: "The problem",
    paragraphs: [
      "A strategy idea is cheap. Turning it into something I can test, optimize, validate, and eventually deploy is not — especially if a single backtest is allowed to look like proof.",
      "The work is a pipeline, not a chart. Market data has to land in a place the research tools can reuse. Simulations have to run without freezing the interface. Parameter searches have to be inspectable. Out-of-sample checks have to sit between a promising run and any path toward live money. And until execution is ready, the product must refuse to pretend it is already trading live.",
    ],
  },

  system: {
    id: "system",
    heading: "How the system fits together",
    paragraphs: [
      "Quant is a native desktop application: a Tauri 2 shell around a React single-page app. The SPA talks to a FastAPI service. Heavy research jobs — backtests, optimization studies, discovery searches — leave the API and run in a Dramatiq worker pool backed by Redis. PostgreSQL holds the application schema through Alembic migrations. Market data arrives through MetaTrader 5 and a separate read-only remote gateway that exposes no order API, then lands in local storage paths the research workspaces read. A mocks mode runs the same interface against fixtures with no backend, database, queue, or broker connection at all.",
    ],
    images: [
      {
        src: "/work/q/system.webp",
        alt: "The Quant system workspace showing data-source status, environment details, and backend-health telemetry with the service marked healthy.",
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        caption:
          "System diagnostics against a local stack: data source, environment, and backend health in one place.",
      },
    ],
  },

  decisions: [
    {
      id: "decision-1",
      heading: "Decision 1 — Ship a desktop application, not a website",
      paragraphs: [
        "The shortest path would have been a browser app. I built Quant as a native desktop product instead: Tauri 2 wraps the React interface so the research console lives on my machine, next to the market-data and worker processes it depends on.",
        "My reasoning was control and honesty about the boundary. A quantitative research tool that talks to MetaTrader 5, holds local Parquet, and runs long jobs does not behave like a public website. Packaging it as a desktop shell keeps that boundary visible — this is an operator tool, not a SaaS page waiting for a staging URL.",
        "The cost is a real native toolchain. Without Rust and the platform WebKit libraries, the shell does not build, and the same interface falls back to a browser for development. That fallback is useful. It is not the product.",
      ],
    },
    {
      id: "decision-2",
      heading: "Decision 2 — Push heavy work onto a queued worker pool",
      paragraphs: [
        "Backtests, optimization sweeps, and discovery searches are too heavy to run inside the API request that starts them. Blocking there would freeze the console every time a study began.",
        "So the API accepts the job and returns. Dramatiq workers, backed by Redis, pull the work and run it asynchronously while the interface keeps responding. The workspace dock shows progress on jobs that are actually in flight — a badge, not a spinner pretending the page itself is computing.",
        "The trade-off is operational: workers, Redis, and the API have to stay aligned, or the console looks healthy while the research path is offline. That is a failure mode I would rather see in diagnostics than hide behind a synchronous endpoint.",
      ],
      images: [
        {
          src: "/work/q/dock.webp",
          alt: "The Quant workspace dock with a glassmorphic bar and a live job-progress badge reading that a backtest is in flight.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "A backtest accepted by the API and running on the worker pool, with progress on the dock.",
        },
      ],
    },
    {
      id: "decision-3",
      heading: "Decision 3 — Force validation between backtest and deployment",
      paragraphs: [
        "A single backtest can flatter any idea. I did not want a straight line from a pretty equity curve to a deployment switch.",
        "So the research path is staged inside Backtests. Optimize and Validate are modes on that workspace, not separate products. Validation surfaces walk-forward style checks: in-sample against out-of-sample windows, with a per-window breakdown, so a parameter set has to survive held-out periods before it looks trustworthy.",
        "I still treat that as a gate in my own process, not as proof that a strategy works. The system computes the comparison; it does not earn a return. Live trading stays locked. Paper execution is the only broker mode the product will accept today.",
      ],
      images: [
        {
          src: "/work/q/walkforward.webp",
          alt: "A walk-forward validation view comparing in-sample and out-of-sample window results beside a per-window breakdown table.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "In-sample versus out-of-sample windows on a completed validation run. The figures are what the tool computes — not a published trading record.",
        },
      ],
    },
    {
      id: "decision-4",
      heading: "Decision 4 — Build the interface against fixtures first",
      paragraphs: [
        "Waiting for every backend path before shaping the console would have stalled the product. I needed the workspaces to exist as a real interface while the API, workers, and market-data path were still moving.",
        "So the frontend has a deterministic mocks mode: one command starts the SPA with Mock Service Worker fixtures and starts no backend, Postgres, Redis, or MetaTrader connection. I could design launcher, backtests, research, and execution against stable responses, then point the same screens at the real stack when it was ready.",
        "The cost is discipline. Fixture data can look finished. The rule on this page is the same as in the product: the interface may show what a run computes; it must not invent a live track record.",
      ],
    },
  ],

  contribution: {
    id: "contribution",
    heading: "What I did",
    paragraphs: [
      "I designed and built Quant end to end, with AI assistance throughout: product and interaction design, the Tauri shell and React workspaces, the FastAPI service, the Dramatiq workers, the Postgres schema, market-data ingestion and the read-only MetaTrader gateway, optimization and validation flows, paper execution with live trading locked, the test suites, and the mocks path that lets the interface move ahead of the API.",
      "AI sped that work up — scaffolding, refactors, tests, review. The architecture, the trade-offs above, and the product decisions are mine.",
    ],
  },

  delivered: {
    id: "delivered",
    heading: "Delivered",
    paragraphs: [
      "Quant is in active use for research and backtesting. Execution is a future capability. This page reports what was built, not what any strategy earned.",
      "Shipped and working: the launcher; market data; storage; backtests with optimize and validate modes; strategy builder; discovery; research including neural features; paper execution with live trading locked; system diagnostics; and a secondary news reader. A mocks mode runs the full interface without infra. Default instruments cover B3 equities and BMF futures such as WIN$ and WDO$.",
      "Three limits I would rather state outright. Live trading is refused by the UI and the API — paper is the only broker mode today. Walk-forward UI components exist, but they are not mounted as a top-level workspace; validation is reached through Backtests. Performance budgets are documented and smoke-testable, but they are not enforced in CI yet.",
    ],
    images: [
      {
        src: "/work/q/execution.webp",
        alt: "The Quant execution workspace showing a paper account, a running paper deployment, and badges that mark paper mode and live trading as locked.",
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        caption:
          "Paper execution with live trading locked. Fixture data in the capture; not a broker statement.",
      },
    ],
  },

  technology: {
    id: "technology",
    heading: "Technology, in context",
    paragraphs: [
      "Tauri 2 for the desktop shell. React, Vite, and the SPA router for the interface. FastAPI for the HTTP API. Dramatiq and Redis for the worker pool. PostgreSQL and Alembic for schema. MetaTrader 5 plus a read-only remote gateway for market data. Optuna for optimization studies. Mock Service Worker for the fixture-first frontend. pytest and the frontend unit suite for automated checks.",
      "Nothing there was chosen for its own sake; each entry exists because a decision above needed it.",
    ],
  },

  confidentiality: {
    id: "disclosure",
    heading: "A note on disclosure",
    paragraphs: [
      "Quant is my own product, so there is no client confidentiality boundary here. I have still left things off this page: credentials, broker login details, account numbers, private deployment identifiers, and any repository link. The source is private. Live trading is locked in the product today; what you see in execution captures is paper mode.",
      "To go further than a public page allows, ask me directly.",
    ],
    actions: [
      { label: "Back to selected work", href: "/#work" },
      { label: "Get in touch", href: "/#contact" },
    ],
  },
} as const satisfies CaseStudy;
