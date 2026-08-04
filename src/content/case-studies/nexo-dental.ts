import type { CaseStudy } from "@/types/case-study";
import type { Locale } from "@/lib/i18n";

/**
 * Visible copy is transcribed verbatim from the approved WO-036 contract,
 * `docs/nexo-dental-case-study-content.md`. Rewording any string here requires
 * a new WO-036 gate. Section order is fixed by that contract and must not change.
 *
 * Route metadata comes from the `/work/nexo-dental` row of the metadata registry
 * in `docs/content.md`.
 */

const SCREENSHOT_WIDTH = 2560;
const SCREENSHOT_HEIGHT = 1440;

export const nexoDentalCaseStudy = {
  slug: "nexo-dental",

  metadata: {
    title: "Nexo Dental — Multi-Tenant Clinic Operations",
    description:
      "A multi-tenant product for Brazilian dental clinics spanning scheduling, clinical records, finance, communications, CRM, claims, and reporting across role-native surfaces.",
  },

  hero: {
    backLink: { label: "Back to selected work", href: "/#work" },
    category: "Clinical software",
    title: "Nexo Dental",
    deck: "Multi-tenant clinic operations for Brazilian dental clinics",
    facts: [
      { label: "Role", value: "Founder and sole developer" },
      { label: "Period", value: "July 2026–present" },
      { label: "State", value: "Active development" },
      { label: "Source", value: "Private" },
    ],
    support:
      "Nexo Dental is my multi-tenant clinic-operations product for Brazilian dental clinics. It spans scheduling, clinical records, finance, WhatsApp communication, CRM, insurance claims, and reporting across three role-native surfaces. I designed and built every layer, with AI assistance.",
    // No verified live URL exists yet — reuses Aegis's exact disabled control
    // (OWN-06, DEC-02; docs/content.md live-environment decision).
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

  context: {
    id: "context",
    heading: "The context",
    paragraphs: [
      "Brazilian dental clinics run on three concurrent daily workflows. Reception keeps the day moving: appointments, confirmations, and patient conversations. Dentists need the clinical chart — teeth, encounters, and treatment proposals — at the chair. Managers watch cash, commissions, claims, and reporting.",
      "Those jobs share patients and money, but not the same questions. Nexo Dental exists to give each role a native surface inside one multi-tenant product, without collapsing them into a single generic dashboard.",
    ],
    images: [
      {
        src: "/work/nexo-dental/agenda.webp",
        alt: "A week-view dental agenda showing multi-professional appointment cards and a status strip, populated from seed fixture data.",
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        caption: "Receptionist week agenda on fixture appointments.",
      },
    ],
  },

  problem: {
    id: "problem",
    heading: "The problem",
    paragraphs: [
      "Building a clinic-operations system means serving three users who work the same patient record on different clocks. Reception needs the next open slot and a fast reply channel. The dentist needs an odontogram and a chronological clinical timeline that stay trustworthy under chairside pressure. The manager needs ledgers, claims, and reports that reconcile with what the floor already did.",
      "If any one of those surfaces is forced to wear the others' clothes, daily work degrades. The job was one multi-tenant product where scheduling, clinical records, finance, communication, and reporting stay sharp for each role at once.",
    ],
  },

  system: {
    id: "system",
    heading: "How the system fits together",
    paragraphs: [
      "Nexo Dental is a React and TypeScript single-page application talking to a FastAPI service under `/api/v1`, with PostgreSQL as the application store and Alembic for schema evolution. Tenant-scoped sessions and forced row-level security keep each clinic's data isolated at the database boundary. Local orchestration wires Postgres, the API, and the frontend together; a guarded MSW mock path lets the interface run on fixture data without a real clinic session.",
    ],
    images: [
      {
        src: "/work/nexo-dental/patient-workspace.webp",
        alt: "A patient workspace header with identity overview and clinical tabs for a fixture patient record.",
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        caption:
          "Patient workspace — the shared clinical and financial record surface.",
      },
    ],
  },

  decisions: [
    {
      id: "decision-1",
      heading: "Decision 1 — Isolate every clinic at the database boundary",
      paragraphs: [
        "A multi-tenant clinic product fails the moment one clinic can see another's patients, charts, or ledgers. Application filters alone were not enough for me: they are easy to forget on a new query path.",
        "So every tenant-scoped session sets `app.tenant_id` on the connection, and row-level security is enabled and forced on the core tables. Policies isolate rows by that setting. The application still scopes deliberately; the database refuses the accident.",
        "That choice costs migration discipline and a tenancy model in every new table, and it is worth it. Clinical and financial data is the blast radius, and I wanted isolation enforced where a missed `WHERE` clause cannot undo it.",
      ],
    },
    {
      id: "decision-2",
      heading: "Decision 2 — Build role-native surfaces, not one generic dashboard",
      paragraphs: [
        "The tempting shortcut was one dense dashboard with everything a clinic might need. That would have optimized for the builder, not the day.",
        "I split the product by the people who live in it. Reception works agenda, queue, and conversations. Dentists work the odontogram, clinical timeline, and treatment proposals. Managers work finance, claims, and reporting. Machine roles and capability-gated navigation make those surfaces first-class rather than tabs bolted onto a shared grid.",
        "The cost is more surface area to keep coherent. The gain is that each role opens to the work they actually do, instead of hunting through someone else's screen.",
      ],
      images: [
        {
          src: "/work/nexo-dental/whatsapp-inbox.webp",
          alt: "A WhatsApp-style conversations inbox with a synthetic thread open beside the conversation list.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Receptionist communications surface on fixture conversations.",
        },
      ],
    },
    {
      id: "decision-3",
      heading: "Decision 3 — Treat the odontogram as a clinical data model",
      paragraphs: [
        "A tooth chart that is only a picture becomes a dead end the moment treatment planning, encounters, and finance need the same facts. I modelled the odontogram as structured clinical data: teeth, conditions, and procedures that feed encounters, timelines, and treatment proposals.",
        "The dentist's workspace therefore stays one place. The chart shows the mouth; the clinical timeline shows what happened and who recorded it; an orçamento builds from the same clinical vocabulary instead of a parallel spreadsheet.",
        "That coupling is deliberate. Clinical truth has to survive the handoff from chair to front desk to ledger, and a decorative chart would force retyping the story at every step.",
      ],
      images: [
        {
          src: "/work/nexo-dental/odontogram.webp",
          alt: "An odontogram workspace with an FDI tooth chart, tooth 16 highlighted, in a populated seed clinical state.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption: "Clinical odontogram on fixture chart data.",
        },
        {
          src: "/work/nexo-dental/clinical-timeline.webp",
          alt: "A chronological clinical timeline of seed encounters with attribution in the patient clinical workspace.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption: "Clinical timeline built from fixture encounters.",
        },
      ],
    },
    {
      id: "decision-4",
      heading: "Decision 4 — Triage the day with an action queue",
      paragraphs: [
        "Clinic work rarely arrives as a calm checklist. Glosas, unpaid balances, incomplete charts, and messages compete for attention in the same hour. A flat notification pile does not tell anyone what to do next.",
        "I built an action queue that ranks operational work and attaches the next useful action — review a claim issue, reply on WhatsApp, open débitos, complete a chart. Adjacent AI operator panels can draft assistance, but a person still reviews and acts.",
        "The hierarchy is the point. Reception and management stay oriented when the day gets noisy, without pretending the system decides clinical care alone.",
      ],
      images: [
        {
          src: "/work/nexo-dental/fila.webp",
          alt: "An operational action queue listing prioritized items with action buttons such as reviewing a claim issue, replying on WhatsApp, and opening patient balances.",
          width: SCREENSHOT_WIDTH,
          height: SCREENSHOT_HEIGHT,
          caption:
            "Action queue with prioritized operational work on fixture items.",
        },
      ],
    },
  ],

  contribution: {
    id: "contribution",
    heading: "What I did",
    paragraphs: [
      "I designed and built Nexo Dental end to end as founder and sole developer, with AI assistance throughout: product and interaction design, the React application, the FastAPI service, the Postgres schema and tenancy model, role-native surfaces, clinical and financial workflows, communications and claims, operator assistance, tests, and the local development path.",
      "AI sped that work up — scaffolding, refactors, tests, review. The architecture, the trade-offs above, and the product decisions are mine.",
    ],
  },

  delivered: {
    id: "delivered",
    heading: "Delivered",
    paragraphs: [
      "This page reports what is implemented in the repositories, not clinic usage or operational outcomes.",
      "Shipped in code: scheduling and agenda; patient records; odontogram and clinical charting; finance and orçamentos; WhatsApp communications; CRM; TISS claims; reporting routes; a role-native shell; and an action queue with reviewable operator assistance. Multi-tenant RLS, LGPD-oriented input checks, and automated backend and frontend tests back those surfaces.",
      "Honest limits: a Firebase Hosting staging target exists in config, but the source deployment Work Orders remain blocked — there is no verified live staging URL today. Reporting code is present while the source status board still marks core BI Work Orders incomplete, so I do not claim a finished analytics program.",
    ],
    images: [
      {
        src: "/work/nexo-dental/financial-ledger.webp",
        alt: "A patient financial ledger showing synthetic installment balances and débitos in the finance workspace.",
        width: SCREENSHOT_WIDTH,
        height: SCREENSHOT_HEIGHT,
        caption: "Patient financial ledger on fixture amounts.",
      },
    ],
  },

  technology: {
    id: "technology",
    heading: "Technology, in context",
    paragraphs: [
      "React, TypeScript, Vite, and TanStack Router for the single-page application. FastAPI for the `/api/v1` service. PostgreSQL with Alembic migrations, including forced row-level security for tenant isolation. MSW for the fixture-driven mock path. pytest and the frontend Vitest suite for automated coverage.",
      "Nothing there was chosen for its own sake; each entry exists because a decision above needed it.",
    ],
  },

  confidentiality: {
    id: "confidentiality",
    heading: "A note on source and data",
    paragraphs: [
      "The repositories are private, so there is no code link. Every interface capture on this page uses seed and MSW fixture data — never a real clinic or real patient. Visible document and phone numbers in screenshots are invented showcase identifiers from the mock dataset. Source staging Work Orders remain blocked, which is why the live-environment control stays disabled.",
      "To go further than a public page allows, ask me directly.",
    ],
    actions: [
      { label: "Back to selected work", href: "/#work" },
      { label: "Get in touch", href: "/#contact" },
    ],
  },
} as const satisfies CaseStudy;

export function getNexoDentalCaseStudy(locale: Locale = "en"): CaseStudy {
  if (locale === "pt-BR") {
    return {
      ...nexoDentalCaseStudy,
      metadata: {
        title: "Nexo Dental — Operações Clínicas Multi-Tenant",
        description:
          "Um produto multi-tenant para clínicas odontológicas brasileiras cobrindo agenda, registros clínicos, finanças, comunicação, CRM, convênios e relatórios em superfícies nativas por papel.",
      },
      hero: {
        ...nexoDentalCaseStudy.hero,
        backLink: {
          label: "Voltar aos trabalhos selecionados",
          href: "/pt-BR/#work",
        },
        category: "Software clínico",
        deck: "Operações clínicas multi-tenant para clínicas odontológicas brasileiras",
        facts: [
          { label: "Papel", value: "Fundador e único desenvolvedor" },
          { label: "Período", value: "Julho de 2026–presente" },
          { label: "Status", value: "Desenvolvimento ativo" },
          { label: "Fonte", value: "Privado" },
        ],
        support:
          "Nexo Dental é meu produto multi-tenant de operações clínicas para clínicas odontológicas brasileiras. Cobre agenda, registros clínicos, finanças, comunicação WhatsApp, CRM, convênios e relatórios em três superfícies nativas por papel. Projetei e construí cada camada, com assistência de IA.",
        liveEnvironment: { label: "Ambiente ao vivo — em breve" },
      },
      confidentiality: {
        ...nexoDentalCaseStudy.confidentiality,
        actions: [
          { label: "Voltar aos trabalhos selecionados", href: "/pt-BR/#work" },
          { label: "Entrar em contato", href: "/pt-BR/#contact" },
        ],
      },
    };
  }
  return nexoDentalCaseStudy;
}
