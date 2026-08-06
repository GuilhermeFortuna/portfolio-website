import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  aegisCaseStudy,
  caseStudies,
  caseStudyBodySections,
  getGosigappCaseStudy,
  getNexoDentalCaseStudy,
  gosigappCaseStudy,
  nexoDentalCaseStudy,
  qCaseStudy,
} from "@/content/case-studies";
import type { CaseStudy, CaseStudyImage } from "@/types/case-study";

/**
 * These assertions guard the authored content itself, with no rendering: the
 * approved copy must stay marker-free, complete, internally linked, and backed
 * by assets that exist on disk.
 */

/** The six assets accepted at WO-019 `DONE`. Nothing else may be referenced. */
const AEGIS_APPROVED_ASSETS = [
  "/work/aegis/alerts.webp",
  "/work/aegis/entry-intro-poster.webp",
  "/work/aegis/entry-intro.mp4",
  "/work/aegis/overview.webp",
  "/work/aegis/player-investigation.webp",
  "/work/aegis/risk-constellation.webp",
] as const;

/** Existing temporary assets referenced until the replacement set is reviewed. */
const Q_PLACED_ASSETS = [
  "/work/q/launcher.webp",
  "/work/q/market-data.webp",
  "/work/q/system.webp",
  "/work/q/backtest-studio.webp",
  "/work/q/backtest-results.webp",
  "/work/q/optimize-pareto.webp",
  "/work/q/discover-leaderboard.webp",
  "/work/q/walkforward.webp",
  "/work/q/execution.webp",
] as const;

/** Eight placed assets from WO-035 / WO-036 (two reserved assets are omitted). */
const NEXO_PLACED_ASSETS = [
  "/work/nexo-dental/shell-identity.webp",
  "/work/nexo-dental/agenda.webp",
  "/work/nexo-dental/patient-workspace.webp",
  "/work/nexo-dental/whatsapp-inbox.webp",
  "/work/nexo-dental/odontogram.webp",
  "/work/nexo-dental/clinical-timeline.webp",
  "/work/nexo-dental/fila.webp",
  "/work/nexo-dental/financial-ledger.webp",
] as const;

/** Prohibited by the Batch 03/04 editorial rules. */
const FORBIDDEN_TERMS = [
  "production-ready",
  "revolutionary",
  "state-of-the-art",
  "enterprise-grade",
  "real-time",
  "high-volume",
  "high-frequency",
  "high-performance",
  "fraud reduction",
  "revenue",
  "money saved",
  "client satisfaction",
] as const;

const AEGIS_EXPECTED_BODY_HEADINGS = [
  "Every investigation started from scratch",
  "The path a request takes",
  "01 — I made it a separate product",
  "02 — I stopped querying the lakehouse on every click",
  "03 — I followed the analyst's actual path",
  "04 — I made an internal tool worth looking at",
  "What I built",
  "What shipped",
  "What it is built with",
] as const;

const Q_EXPECTED_BODY_HEADINGS = [
  "Built end to end as one product",
  "A six-year idea, rebuilt for disciplined research",
  "From market context to inspectable experiments",
  "Challenge results before trusting them",
  "Keep heavy research work off the interaction path",
  "A native product around asynchronous services",
  "Why desktop was the right boundary",
  "Develop against stable fixtures",
  "Make validation and execution safety product constraints",
  "What I owned",
  "Technology across the stack",
] as const;

const GOSIGAPP_EXPECTED_BODY_HEADINGS = [
  "A regulatory deadline became a systems problem",
  "Six data contracts, one submission path",
  "From S3 input to signed SIGAP submission",
  "Decision 1 — Fail before transmission",
  "Decision 2 — Protect signing and transport",
  "Decision 3 — Make failures recoverable and runs auditable",
  "What I owned",
  "What shipped—and what I can verify",
  "Technology in service of the pipeline",
] as const;

const GOSIGAPP_PT_BR_EXPECTED_BODY_HEADINGS = [
  "Um prazo regulatório se tornou um problema de sistemas",
  "Seis contratos de dados, um único fluxo de envio",
  "Do S3 ao envio assinado para o SIGAP",
  "Decisão 1 — Identificar falhas antes da transmissão",
  "Decisão 2 — Proteger assinatura e transporte",
  "Decisão 3 — Tornar falhas recuperáveis e execuções rastreáveis",
  "O que ficou sob minha responsabilidade",
  "O que foi entregue — e o que posso comprovar",
  "Tecnologia a serviço do pipeline",
] as const;

const NEXO_EXPECTED_BODY_HEADINGS = [
  "One patient record. Three ways of working.",
  "Built around the people who run the clinic",
  "Reception — keep the day moving",
  "Clinical care — carry truth from chart to treatment",
  "Management — connect care to the ledger",
  "One product, isolated at the data boundary",
  "01 — Make tenant isolation a database guarantee",
  "02 — Model the odontogram as a domain, not a widget",
  "03 — Put AI behind a human decision boundary",
  "What I owned",
  "What the implementation proves",
  "Technology in service of the workflow",
] as const;

const NEXO_PT_BR_EXPECTED_BODY_HEADINGS = [
  "Um prontuário. Três formas de trabalhar.",
  "Construído em torno de quem faz a clínica funcionar",
  "Recepção — manter o dia em movimento",
  "Atendimento clínico — levar a verdade do registro ao tratamento",
  "Gestão — conectar o atendimento ao financeiro",
  "Um produto, isolado na fronteira dos dados",
  "01 — Tornar o isolamento entre clínicas uma garantia do banco",
  "02 — Modelar o odontograma como domínio, não como widget",
  "03 — Manter a IA atrás de uma decisão humana",
  "O que esteve sob minha responsabilidade",
  "O que a implementação comprova",
  "Tecnologia a serviço do fluxo de trabalho",
] as const;

function collectStrings(value: unknown, found: string[] = []): string[] {
  if (typeof value === "string") {
    found.push(value);
  } else if (Array.isArray(value)) {
    for (const entry of value) collectStrings(entry, found);
  } else if (value !== null && typeof value === "object") {
    for (const entry of Object.values(value)) collectStrings(entry, found);
  }
  return found;
}

function collectImages(caseStudy: CaseStudy): readonly CaseStudyImage[] {
  return [
    ...(caseStudy.hero.media ? [caseStudy.hero.media] : []),
    ...(caseStudy.hero.identityMedia ? [caseStudy.hero.identityMedia] : []),
    ...caseStudyBodySections(caseStudy).flatMap(
      (section) => section.images ?? [],
    ),
  ];
}

const aegisStrings = collectStrings(aegisCaseStudy);
const qStrings = collectStrings(qCaseStudy);
const gosigappStrings = collectStrings(gosigappCaseStudy);
const gosigappCaseStudyPtBr = getGosigappCaseStudy("pt-BR");
const gosigappPtBrStrings = collectStrings(gosigappCaseStudyPtBr);
const nexoStrings = collectStrings(nexoDentalCaseStudy);
const nexoDentalCaseStudyPtBr = getNexoDentalCaseStudy("pt-BR");
const nexoPtBrStrings = collectStrings(nexoDentalCaseStudyPtBr);

describe("case-study registry", () => {
  it("exposes Aegis, Quant, gosigapp, and Nexo Dental under their slugs", () => {
    expect(Object.keys(caseStudies)).toEqual([
      "aegis",
      "q",
      "gosigapp",
      "nexo-dental",
    ]);
    expect(caseStudies.aegis).toBe(aegisCaseStudy);
    expect(caseStudies.q).toBe(qCaseStudy);
    expect(caseStudies.gosigapp).toBe(gosigappCaseStudy);
    expect(caseStudies["nexo-dental"]).toBe(nexoDentalCaseStudy);
    expect(aegisCaseStudy.slug).toBe("aegis");
    expect(qCaseStudy.slug).toBe("q");
    expect(gosigappCaseStudy.slug).toBe("gosigapp");
    expect(nexoDentalCaseStudy.slug).toBe("nexo-dental");
  });

  it("uses the approved route metadata", () => {
    expect(aegisCaseStudy.metadata).toEqual({
      title: "Aegis — Production Fraud Intelligence Platform",
      description:
        "How I designed and built a production fraud-investigation platform for Brazilian iGaming, from explainable rules and data pipelines to security and WebGL.",
    });
    expect(qCaseStudy.metadata).toEqual({
      title: "Quant — Quantitative Research and Execution",
      description:
        "How I designed and built a native quantitative research platform across desktop UX, asynchronous services, market-data pipelines, validation, and paper execution.",
    });
    expect(gosigappCaseStudy.metadata).toEqual({
      title: "gosigapp — Regulated Submission Infrastructure in Go",
      description:
        "How I designed and deployed a Go pipeline that validates, signs, retries, audits, and submits six regulated datasets to Brazil's SIGAP.",
    });
    expect(nexoDentalCaseStudy.metadata).toEqual({
      title: "Nexo Dental — Founder-Built Clinic Operations",
      description:
        "How I designed and built a multi-tenant dental-clinic product across role-native workflows, data isolation, clinical modelling, and reviewable AI assistance.",
    });
  });
});

describe("Aegis authored copy", () => {
  it("contains no unresolved documentation markers", () => {
    const offenders = aegisStrings.filter(
      (value) =>
        value.includes("[REQUIRED:") || value.includes("[CONFIDENTIAL:"),
    );
    expect(offenders).toEqual([]);
  });

  it("contains no forbidden marketing or impact language", () => {
    const offenders = aegisStrings.filter((value) =>
      FORBIDDEN_TERMS.some((term) => value.toLowerCase().includes(term)),
    );
    expect(offenders).toEqual([]);
  });

  it("has no empty authored string", () => {
    expect(aegisStrings.filter((value) => value.trim().length === 0)).toEqual(
      [],
    );
  });

  it("keeps the hero facts, support copy, and disabled live action intact", () => {
    expect(aegisCaseStudy.hero.facts).toEqual([
      { label: "Role", value: "Software Developer" },
      { label: "Period", value: "April 2026–present" },
      { label: "State", value: "Deployed to production" },
      { label: "Source", value: "Private" },
    ]);
    expect(aegisCaseStudy.hero.support).toContain("with AI assistance");
    expect(aegisCaseStudy.hero.liveEnvironment).toEqual({
      label: "Live environment — coming soon",
    });
    // The pending action must never gain an href while the URL is unverified.
    expect("href" in (aegisCaseStudy.hero.liveEnvironment ?? {})).toBe(false);
  });

  it("claims only the shipping event, never ongoing production status", () => {
    // OWN-06: the owner can attest that he deployed it, not that it is up now.
    // Any present-tense uptime or availability claim exceeds the evidence.
    const delivered = aegisCaseStudy.delivered.paragraphs.join(" ");
    expect(delivered).toContain("I shipped Aegis to production");
    expect(delivered).not.toMatch(/remains (active|live|in production)/i);
    expect(delivered).not.toMatch(/still (running|active|live)/i);
  });

  it("never converts an unpublished gap into a positive claim", () => {
    // Owner decision (2026-08-05): the three known gaps are no longer published.
    // Omitting them is permitted; asserting their opposite is not. The register
    // in `docs/content.md` remains the authority on what is actually true.
    const delivered = aegisCaseStudy.delivered.paragraphs.join(" ");
    expect(delivered).not.toMatch(/\blogin\b/i);
    expect(delivered).not.toMatch(/end-to-end|e2e/i);
    expect(delivered).not.toMatch(/fully tested|complete test|millions of/i);
  });

  it("describes the saved-findings surface without claiming case management", () => {
    // WF-04 forbids claiming case management; it does not require the
    // disclaimer sentence. Naming the surface accurately satisfies it.
    const investigationCopy = aegisCaseStudy.decisions[2].paragraphs.join(" ");
    expect(investigationCopy).toContain("browser-local worklist");
    expect(investigationCopy.toLowerCase()).not.toContain("case management");
    expect(investigationCopy.toLowerCase()).not.toContain("case-management");
  });

  it("keeps the synthetic-data disclosure in the published copy", () => {
    // The `context` section and the closing note are both gone, so the image
    // captions are now the sole carrier of the disclosure boundary. Every
    // screenshot-bearing section must still name its data as synthetic.
    const captions = collectImages(aegisCaseStudy)
      .map((image) => image.caption ?? "")
      .join(" ");
    expect(captions).toContain("including the document number, is synthetic");
    expect(captions).toMatch(/25,000 synthetic profiles/);
  });
});

describe("Quant authored copy", () => {
  it("contains no unresolved documentation markers", () => {
    const offenders = qStrings.filter(
      (value) =>
        value.includes("[REQUIRED:") || value.includes("[CONFIDENTIAL:"),
    );
    expect(offenders).toEqual([]);
  });

  it("contains no forbidden marketing or outcome language", () => {
    const offenders = qStrings.filter((value) =>
      FORBIDDEN_TERMS.some((term) => value.toLowerCase().includes(term)),
    );
    expect(offenders).toEqual([]);
  });

  it("has no empty authored string", () => {
    expect(qStrings.filter((value) => value.trim().length === 0)).toEqual([]);
  });

  it("keeps the hero facts and omits the live-environment control", () => {
    expect(qCaseStudy.hero.facts).toEqual([
      { label: "Role", value: "Founder, Product Engineer, and sole developer" },
      { label: "Period", value: "April 2026–present" },
      { label: "Platform", value: "Native desktop" },
      { label: "Market", value: "Brazilian futures and equities" },
      { label: "State", value: "Research, backtesting, and paper execution" },
      { label: "Source", value: "Private" },
    ]);
    expect(qCaseStudy.hero.support).toContain("I built Quant across");
    expect("liveEnvironment" in qCaseStudy.hero).toBe(false);
  });

  it("keeps the historical result subordinate and explicitly qualified", () => {
    const origin = qCaseStudy.origin?.paragraphs.join(" ") ?? "";
    expect(origin).toContain("R$3,000 into R$90,000");
    expect(origin).toContain("predates this implementation");
    expect(origin).toContain("not a forecast or evidence");
    expect(qCaseStudy.hero.deck).not.toContain("R$3,000");
  });

  it("publishes no identity placeholder while the approved render is absent", () => {
    expect("identityMedia" in qCaseStudy.hero).toBe(false);
    expect(qStrings.join(" ")).not.toContain("placeholder");
    expect(collectImages(qCaseStudy).map((image) => image.src)).not.toContain(
      "/work/q/identity-placeholder.svg",
    );
  });

  it("states paper execution and locked live trading somewhere in the copy", () => {
    const allCopy = qStrings.join(" ");
    expect(allCopy).toMatch(/paper/i);
    expect(allCopy).toMatch(/locked/i);
  });
});

describe("gosigapp authored copy", () => {
  it("keeps both locales complete, marker-free, and within the claim boundary", () => {
    const prohibitedClaims = [
      "zero rejected transmissions",
      "zero credential exposure",
      "high daily event volumes",
      "complete historical proof",
      "without data duplication",
      "license suspension",
      "sem duplicação",
      "suspensão da licença",
    ];

    for (const strings of [gosigappStrings, gosigappPtBrStrings]) {
      expect(strings.filter((value) => value.trim().length === 0)).toEqual([]);
      expect(
        strings.filter(
          (value) =>
            value.includes("[REQUIRED:") ||
            value.includes("[CONFIDENTIAL:") ||
            value.includes("github.com") ||
            /\b(?:BRX|RICO)\b/.test(value),
        ),
      ).toEqual([]);
      expect(
        strings.filter((value) =>
          [...FORBIDDEN_TERMS, ...prohibitedClaims].some((term) =>
            value.toLowerCase().includes(term),
          ),
        ),
      ).toEqual([]);
    }
  });

  it("states ownership before AI assistance and preserves deployment limits", () => {
    expect(gosigappCaseStudy.hero.support).toMatch(/^I designed and deployed/);
    expect(gosigappCaseStudy.contribution.paragraphs.join(" ")).toContain(
      "sole human developer",
    );
    expect(gosigappCaseStudy.contribution.paragraphs.join(" ")).toContain(
      "AI assisted implementation",
    );
    expect(gosigappCaseStudy.hero.facts).toContainEqual({
      label: "State",
      value: "Deployed via AWS ECS/Fargate",
    });
    expect(gosigappCaseStudy.delivered?.paragraphs.join(" ")).toContain(
      "do not publish operational volumes, uptime, rejection rates, or business impact",
    );
    expect("liveEnvironment" in gosigappCaseStudy.hero).toBe(false);
    expect("media" in gosigappCaseStudy.hero).toBe(false);
  });

  it("describes the selective retry and status-aware recovery tradeoffs", () => {
    const recovery = gosigappCaseStudy.decisions[2].paragraphs.join(" ");
    expect(recovery).toContain("network and 5xx failures");
    expect(recovery).toContain("4xx responses return immediately");
    expect(recovery).toContain("checks SIGAP for existing submissions");
    expect(recovery).toContain("already submitted");
  });

  it("provides a complete Brazilian Portuguese object instead of English fallback copy", () => {
    const englishSections = caseStudyBodySections(gosigappCaseStudy);
    const portugueseSections = caseStudyBodySections(gosigappCaseStudyPtBr);

    expect(portugueseSections.map((section) => section.heading)).toEqual(
      GOSIGAPP_PT_BR_EXPECTED_BODY_HEADINGS,
    );
    expect(portugueseSections).toHaveLength(englishSections.length);

    for (let index = 0; index < englishSections.length; index += 1) {
      const english = englishSections[index];
      const portuguese = portugueseSections[index];
      expect(portuguese.id).toBe(english.id);
      expect(portuguese.heading).not.toBe(english.heading);
      if (english.paragraphs.length > 0) {
        expect(portuguese.paragraphs).not.toEqual(english.paragraphs);
      } else {
        expect(portuguese.paragraphs).toEqual([]);
      }
    }

    const englishImages = collectImages(gosigappCaseStudy);
    const portugueseImages = collectImages(gosigappCaseStudyPtBr);
    expect(
      portugueseImages.map(({ src, width, height }) => ({ src, width, height })),
    ).toEqual(
      englishImages.map(({ src, width, height }) => ({ src, width, height })),
    );
    for (let index = 0; index < englishImages.length; index += 1) {
      expect(portugueseImages[index].alt).not.toBe(englishImages[index].alt);
      expect(portugueseImages[index].caption).not.toBe(
        englishImages[index].caption,
      );
    }

    expect(gosigappCaseStudyPtBr.metadata.title).toBe(
      "gosigapp — Infraestrutura de Envios Regulatórios em Go",
    );
    expect(gosigappCaseStudyPtBr.hero.support).toMatch(/^Projetei e implantei/);
    expect(gosigappCaseStudyPtBr.confidentiality.actions).toEqual([
      {
        label: "Conversar sobre este projeto",
        href: "/pt-BR/#contact",
      },
      {
        label: "Voltar aos trabalhos selecionados",
        href: "/pt-BR/#work",
      },
    ]);
  });
});

describe("gosigapp section structure", () => {
  it("renders the recruiter-focused sections in the fixed order", () => {
    expect(
      caseStudyBodySections(gosigappCaseStudy).map(
        (section) => section.heading,
      ),
    ).toEqual(GOSIGAPP_EXPECTED_BODY_HEADINGS);
    expect(gosigappCaseStudy.confidentiality.heading).toBe(
      "Private source, discussable architecture",
    );
  });

  it("preserves section ids and the three approved media placements", () => {
    const sections = [
      ...caseStudyBodySections(gosigappCaseStudy),
      gosigappCaseStudy.confidentiality,
    ];
    const ids = sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(collectImages(gosigappCaseStudy).map((image) => image.src)).toEqual([
      "/work/gosigapp/system-map.svg",
      "/work/gosigapp/compliance-check-output.webp",
      "/work/gosigapp/cli-pipeline-run.webp",
    ]);
  });
});

describe("Aegis section structure", () => {
  it("renders the ten contract sections in the fixed order", () => {
    expect(
      caseStudyBodySections(aegisCaseStudy).map((section) => section.heading),
    ).toEqual(AEGIS_EXPECTED_BODY_HEADINGS);
    // Navigation-only closing: `heading` names the landmark, never an <h2>.
    expect(aegisCaseStudy.confidentiality.heading).toBe("Continue");
    expect("paragraphs" in aegisCaseStudy.confidentiality).toBe(false);
  });

  it("gives every section a unique id and at least one paragraph", () => {
    const sections = [
      ...caseStudyBodySections(aegisCaseStudy),
      aegisCaseStudy.confidentiality,
    ];

    const ids = sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const section of sections) {
      // The closing is navigation-only and carries no prose; every content
      // section still must.
      const isClosing = section.id === aegisCaseStudy.confidentiality.id;
      if (!isClosing) {
        expect(
          (section as { paragraphs?: readonly string[] }).paragraphs?.length ??
            0,
        ).toBeGreaterThan(0);
      }
      expect(section.heading.trim()).not.toBe("");
    }
  });

  it("keeps exactly four decisions with unique ids", () => {
    const ids = aegisCaseStudy.decisions.map((decision) => decision.id);
    expect(ids).toEqual([
      "decision-1",
      "decision-2",
      "decision-3",
      "decision-4",
    ]);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("attaches the intro video to the identity decision only", () => {
    const withVideo = caseStudyBodySections(aegisCaseStudy).filter(
      (section) => section.video,
    );
    expect(withVideo.map((section) => section.id)).toEqual(["decision-4"]);
  });
});

describe("Quant section structure", () => {
  it("renders the twelve contract sections in the fixed order", () => {
    expect(
      caseStudyBodySections(qCaseStudy).map((section) => section.heading),
    ).toEqual(Q_EXPECTED_BODY_HEADINGS);
    expect(qCaseStudy.confidentiality.heading).toBe(
      "Current status and technical walkthrough",
    );
    expect(qCaseStudy.confidentiality.id).toBe("status");
  });

  it("gives every section a unique id, and prose or badges", () => {
    const sections = [
      ...caseStudyBodySections(qCaseStudy),
      qCaseStudy.confidentiality,
    ];

    const ids = sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const section of sections) {
      const badges = "badges" in section ? (section.badges ?? []) : [];
      expect(section.paragraphs.length > 0 || badges.length > 0).toBe(true);
      expect(section.heading.trim()).not.toBe("");
    }
  });

  it("keeps exactly three decisions and no video", () => {
    const ids = qCaseStudy.decisions.map((decision) => decision.id);
    expect(ids).toEqual([
      "decision-desktop",
      "decision-fixtures",
      "decision-safety",
    ]);
    expect(
      caseStudyBodySections(qCaseStudy).some((section) => section.video),
    ).toBe(false);
  });
});

describe("Aegis media references", () => {
  it("references only approved assets that exist on disk", () => {
    const referenced = [
      ...collectImages(aegisCaseStudy).map((image) => image.src),
      aegisCaseStudy.decisions[3].video?.src,
      aegisCaseStudy.decisions[3].video?.poster,
    ].filter((src): src is string => typeof src === "string");

    for (const src of referenced) {
      expect(AEGIS_APPROVED_ASSETS).toContain(src);
      expect(existsSync(join(process.cwd(), "public", src))).toBe(true);
    }

    // The poster is the only asset used twice, as hero still and video poster.
    expect(new Set(referenced)).toEqual(new Set(AEGIS_APPROVED_ASSETS));
  });

  it("gives every image alt text and intrinsic dimensions", () => {
    for (const image of collectImages(aegisCaseStudy)) {
      expect(image.alt.trim().length).toBeGreaterThan(0);
      expect(image.width).toBeGreaterThan(0);
      expect(image.height).toBeGreaterThan(0);
    }
  });

  it("describes the overview asset as the product screen it contains", () => {
    expect(aegisCaseStudy.system.images?.[0].alt).toContain(
      "Aegis overview screen",
    );
    expect(aegisCaseStudy.system.images?.[0].alt).not.toMatch(/logo|wordmark/i);
    expect(aegisCaseStudy.system.images?.[0].caption).toMatch(/synthetic/i);
  });

  it("captions every in-body figure and leaves the hero still uncaptioned", () => {
    expect("caption" in aegisCaseStudy.hero.media).toBe(false);

    const bodyImages = caseStudyBodySections(aegisCaseStudy).flatMap(
      (section) => section.images ?? [],
    );
    expect(bodyImages).toHaveLength(4);
    for (const image of bodyImages) {
      expect(image.caption?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });

  it("describes the silent film in visible text", () => {
    const video = aegisCaseStudy.decisions[3].video;
    expect(video?.transcript).toContain("There is no sound.");
    expect(video?.ariaLabel.trim().length ?? 0).toBeGreaterThan(0);
  });
});

describe("Quant media references", () => {
  it("references only the placed assets that exist on disk", () => {
    const referenced = collectImages(qCaseStudy).map((image) => image.src);

    for (const src of referenced) {
      expect(Q_PLACED_ASSETS).toContain(src);
      expect(existsSync(join(process.cwd(), "public", src))).toBe(true);
    }

    expect(new Set(referenced)).toEqual(new Set(Q_PLACED_ASSETS));
  });

  it("gives every image alt text and 16:9 intrinsic dimensions", () => {
    for (const image of collectImages(qCaseStudy)) {
      expect(image.alt.trim().length).toBeGreaterThan(0);
      expect(image.width).toBe(2560);
      expect(image.height).toBe(1440);
    }
  });

  it("captions every in-body figure and leaves the hero still uncaptioned", () => {
    expect("caption" in qCaseStudy.hero.media).toBe(false);

    const bodyImages = caseStudyBodySections(qCaseStudy).flatMap(
      (section) => section.images ?? [],
    );
    expect(bodyImages).toHaveLength(8);
    for (const image of bodyImages) {
      expect(image.caption?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });
});

describe("Aegis links", () => {
  it("uses only root-relative same-origin destinations", () => {
    const hrefs = [
      aegisCaseStudy.hero.backLink.href,
      ...aegisCaseStudy.confidentiality.actions.map((action) => action.href),
    ];

    // The chapter ends on pagination into the next case study, so the closing
    // now carries a route path alongside the homepage fragments.
    expect(hrefs).toEqual(["/#work", "/#work", "/work/q"]);
    for (const href of hrefs) {
      expect(href.startsWith("/")).toBe(true);
      expect(href).not.toMatch(/^\/\//);
    }
  });

  it("publishes no source repository or external environment link", () => {
    const offenders = aegisStrings.filter(
      (value) =>
        value.includes("http://") ||
        value.includes("https://") ||
        value.includes("github.com"),
    );
    expect(offenders).toEqual([]);
  });

  it("labels the private source in the hero facts", () => {
    expect(aegisCaseStudy.hero.facts).toContainEqual({
      label: "Source",
      value: "Private",
    });
  });
});

describe("Quant links", () => {
  it("uses only root-relative same-origin destinations", () => {
    const hrefs = [
      qCaseStudy.hero.backLink.href,
      ...qCaseStudy.confidentiality.actions.map((action) => action.href),
    ];

    expect(hrefs).toEqual(["/#work", "/#work", "/#contact"]);
    for (const href of hrefs) {
      expect(href.startsWith("/#")).toBe(true);
    }
  });

  it("publishes no source repository or external environment link", () => {
    const offenders = qStrings.filter(
      (value) =>
        value.includes("http://") ||
        value.includes("https://") ||
        value.includes("github.com"),
    );
    expect(offenders).toEqual([]);
  });

  it("labels the private source in the hero facts", () => {
    expect(qCaseStudy.hero.facts).toContainEqual({
      label: "Source",
      value: "Private",
    });
  });
});

describe("Nexo Dental authored copy", () => {
  it("contains no unresolved documentation markers", () => {
    for (const strings of [nexoStrings, nexoPtBrStrings]) {
      const offenders = strings.filter(
        (value) =>
          value.includes("[REQUIRED:") || value.includes("[CONFIDENTIAL:"),
      );
      expect(offenders).toEqual([]);
    }
  });

  it("contains no forbidden marketing or impact language", () => {
    for (const strings of [nexoStrings, nexoPtBrStrings]) {
      const offenders = strings.filter((value) =>
        FORBIDDEN_TERMS.some((term) => value.toLowerCase().includes(term)),
      );
      expect(offenders).toEqual([]);
    }
  });

  it("has no empty authored string", () => {
    for (const strings of [nexoStrings, nexoPtBrStrings]) {
      expect(strings.filter((value) => value.trim().length === 0)).toEqual([]);
    }
  });

  it("keeps the hero facts, support copy, and disabled live action intact", () => {
    expect(nexoDentalCaseStudy.hero.facts).toEqual([
      { label: "Role", value: "Founder and sole developer" },
      { label: "Period", value: "July 2026–present" },
      { label: "State", value: "Active development" },
      { label: "Source", value: "Private" },
    ]);
    expect(nexoDentalCaseStudy.hero.support).toMatch(
      /^As founder and sole developer/,
    );
    expect(nexoDentalCaseStudy.hero.support).toContain(
      "reviewable AI assistance",
    );
    expect(nexoDentalCaseStudy.hero.liveEnvironment).toEqual({
      label: "Live environment — coming soon",
    });
    expect("href" in (nexoDentalCaseStudy.hero.liveEnvironment ?? {})).toBe(
      false,
    );
  });

  it("states implementation evidence and public-environment limits precisely", () => {
    expect(nexoDentalCaseStudy.delivered?.paragraphs.join(" ")).toContain(
      "50 backend and 134 frontend test files",
    );
    expect(nexoDentalCaseStudy.delivered?.paragraphs.join(" ")).toContain(
      "there is no verified public environment",
    );
  });

  it("provides a complete Brazilian Portuguese object instead of English fallback copy", () => {
    const englishSections = caseStudyBodySections(nexoDentalCaseStudy);
    const portugueseSections = caseStudyBodySections(nexoDentalCaseStudyPtBr);

    expect(portugueseSections.map((section) => section.heading)).toEqual(
      NEXO_PT_BR_EXPECTED_BODY_HEADINGS,
    );
    expect(portugueseSections).toHaveLength(englishSections.length);

    for (let index = 0; index < englishSections.length; index += 1) {
      const english = englishSections[index];
      const portuguese = portugueseSections[index];
      expect(portuguese.id).toBe(english.id);
      expect(portuguese.heading).not.toBe(english.heading);
      if (english.paragraphs.length > 0) {
        expect(portuguese.paragraphs).not.toEqual(english.paragraphs);
      } else {
        expect(portuguese.paragraphs).toEqual([]);
      }
    }

    const englishImages = collectImages(nexoDentalCaseStudy);
    const portugueseImages = collectImages(nexoDentalCaseStudyPtBr);
    expect(
      portugueseImages.map(({ src, width, height }) => ({ src, width, height })),
    ).toEqual(
      englishImages.map(({ src, width, height }) => ({ src, width, height })),
    );
    for (let index = 0; index < englishImages.length; index += 1) {
      expect(portugueseImages[index].alt).not.toBe(englishImages[index].alt);
      expect(portugueseImages[index].caption).not.toBe(
        englishImages[index].caption,
      );
    }

    expect(nexoDentalCaseStudyPtBr.metadata.title).toBe(
      "Nexo Dental — Operações Clínicas Construídas de Ponta a Ponta",
    );
    expect(nexoDentalCaseStudyPtBr.hero.support).toMatch(
      /^Como fundador e único desenvolvedor/,
    );
    expect(nexoDentalCaseStudyPtBr.confidentiality.actions).toEqual([
      {
        label: "Voltar aos trabalhos selecionados",
        href: "/pt-BR/#work",
      },
      { label: "Entrar em contato", href: "/pt-BR/#contact" },
    ]);
  });
});

describe("Nexo Dental section structure", () => {
  it("renders the recruiter-focused contract sections in the fixed order", () => {
    expect(
      caseStudyBodySections(nexoDentalCaseStudy).map(
        (section) => section.heading,
      ),
    ).toEqual(NEXO_EXPECTED_BODY_HEADINGS);
    expect(nexoDentalCaseStudy.confidentiality.heading).toBe(
      "Private source. Synthetic evidence.",
    );
  });

  it("gives every section a unique id and authored prose or badges", () => {
    const sections = [
      ...caseStudyBodySections(nexoDentalCaseStudy),
      nexoDentalCaseStudy.confidentiality,
    ];

    const ids = sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const section of sections) {
      expect(
        section.paragraphs.length > 0 ||
          ("badges" in section && (section.badges?.length ?? 0) > 0),
      ).toBe(true);
      expect(section.heading.trim()).not.toBe("");
    }
  });

  it("keeps exactly three decisions and no video", () => {
    const ids = nexoDentalCaseStudy.decisions.map((decision) => decision.id);
    expect(ids).toEqual([
      "decision-tenant-isolation",
      "decision-clinical-model",
      "decision-ai-boundary",
    ]);
    expect(
      caseStudyBodySections(nexoDentalCaseStudy).some(
        (section) => section.video,
      ),
    ).toBe(false);
  });
});

describe("Nexo Dental media references", () => {
  it("references only the placed assets that exist on disk", () => {
    const referenced = collectImages(nexoDentalCaseStudy).map(
      (image) => image.src,
    );

    for (const src of referenced) {
      expect(NEXO_PLACED_ASSETS).toContain(src);
      expect(existsSync(join(process.cwd(), "public", src))).toBe(true);
    }

    expect(new Set(referenced)).toEqual(new Set(NEXO_PLACED_ASSETS));

    const portugueseReferenced = collectImages(nexoDentalCaseStudyPtBr).map(
      (image) => image.src,
    );
    expect(new Set(portugueseReferenced)).toEqual(new Set(NEXO_PLACED_ASSETS));
  });

  it("gives every image alt text and 2560×1440 intrinsic dimensions", () => {
    for (const image of collectImages(nexoDentalCaseStudy)) {
      expect(image.alt.trim().length).toBeGreaterThan(0);
      expect(image.width).toBe(2560);
      expect(image.height).toBe(1440);
    }
  });

  it("captions the hero still and every in-body figure", () => {
    expect(nexoDentalCaseStudy.hero.media?.caption?.trim().length).toBeGreaterThan(
      0,
    );

    const bodyImages = caseStudyBodySections(nexoDentalCaseStudy).flatMap(
      (section) => section.images ?? [],
    );
    expect(bodyImages).toHaveLength(7);
    for (const image of bodyImages) {
      expect(image.caption?.trim().length ?? 0).toBeGreaterThan(0);
    }
  });
});

describe("Nexo Dental links", () => {
  it("uses only root-relative same-origin destinations", () => {
    const hrefs = [
      nexoDentalCaseStudy.hero.backLink.href,
      ...nexoDentalCaseStudy.confidentiality.actions.map(
        (action) => action.href,
      ),
    ];

    expect(hrefs).toEqual(["/#work", "/#work", "/#contact"]);
    for (const href of hrefs) {
      expect(href.startsWith("/#")).toBe(true);
    }
  });

  it("publishes no source repository or external environment link", () => {
    for (const strings of [nexoStrings, nexoPtBrStrings]) {
      const offenders = strings.filter(
        (value) =>
          value.includes("http://") ||
          value.includes("https://") ||
          value.includes("github.com"),
      );
      expect(offenders).toEqual([]);
    }
  });

  it("labels the private source in the hero facts", () => {
    expect(nexoDentalCaseStudy.hero.facts).toContainEqual({
      label: "Source",
      value: "Private",
    });
  });
});
