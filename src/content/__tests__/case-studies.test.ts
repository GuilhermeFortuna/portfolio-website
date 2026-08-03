import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  aegisCaseStudy,
  caseStudies,
  caseStudyBodySections,
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

/** Every asset placed by the owner-revised visual contract. */
const Q_PLACED_ASSETS = [
  "/work/q/launcher.webp",
  "/work/q/identity-placeholder.svg",
  "/work/q/market-data.webp",
  "/work/q/system.webp",
  "/work/q/backtest-studio.webp",
  "/work/q/backtest-results.webp",
  "/work/q/optimize-pareto.webp",
  "/work/q/discover-leaderboard.webp",
  "/work/q/research-features.webp",
  "/work/q/walkforward.webp",
  "/work/q/dock.webp",
  "/work/q/execution.webp",
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
  "The context",
  "The problem",
  "How the system fits together",
  "Decision 1 — Keep Aegis a standalone product",
  "Decision 2 — Read from a curated store, not the lakehouse",
  "Decision 3 — Build for investigation, not for monitoring",
  "Decision 4 — Give the product its own identity",
  "What I did",
  "Delivered",
  "Technology, in context",
] as const;

const Q_EXPECTED_BODY_HEADINGS = [
  "Designing Q as a product, not just a tool",
  "Built from a real research problem",
  "Inside the product",
  "Market data and system awareness",
  "Strategy construction and backtesting",
  "Optimization and discovery",
  "Research features and validation",
  "Execution and background work",
  "How the system fits together",
  "Native desktop instead of public SaaS",
  "Queued research jobs",
  "Validation before deployment",
  "Fixture-first product development",
  "My contribution",
  "Technology",
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
    caseStudy.hero.media,
    ...(caseStudy.hero.identityMedia ? [caseStudy.hero.identityMedia] : []),
    ...caseStudyBodySections(caseStudy).flatMap(
      (section) => section.images ?? [],
    ),
  ];
}

const aegisStrings = collectStrings(aegisCaseStudy);
const qStrings = collectStrings(qCaseStudy);

describe("case-study registry", () => {
  it("exposes Aegis and Quant under their slugs", () => {
    expect(Object.keys(caseStudies)).toEqual(["aegis", "q"]);
    expect(caseStudies.aegis).toBe(aegisCaseStudy);
    expect(caseStudies.q).toBe(qCaseStudy);
    expect(aegisCaseStudy.slug).toBe("aegis");
    expect(qCaseStudy.slug).toBe("q");
  });

  it("uses the approved route metadata", () => {
    expect(aegisCaseStudy.metadata).toEqual({
      title: "Aegis — Fraud Intelligence Case Study",
      description:
        "Fraud intelligence and investigation software for the iGaming industry, presented through verified engineering decisions and evidence.",
    });
    expect(qCaseStudy.metadata).toEqual({
      title: "Quant — Quantitative Research and Execution",
      description:
        "A native quantitative research platform for the Brazilian futures market, covering backtesting, optimization, data pipelines, and execution architecture.",
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

  it("keeps the epistemic limit on production status", () => {
    // Removing this sentence would turn OWN-06 into a flat uptime claim.
    expect(aegisCaseStudy.delivered.paragraphs[0]).toContain(
      "as far as I know, remains active",
    );
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
      { label: "Role", value: "Founder, designer, and sole developer" },
      { label: "Period", value: "April 2026–present" },
      { label: "Platform", value: "Native desktop" },
      { label: "Market", value: "Brazilian futures and equities" },
      { label: "State", value: "Active research and backtesting" },
      { label: "Source", value: "Private" },
    ]);
    expect(qCaseStudy.hero.support).toContain("built Quant end to end");
    expect("liveEnvironment" in qCaseStudy.hero).toBe(false);
  });

  it("states paper execution and locked live trading somewhere in the copy", () => {
    const allCopy = qStrings.join(" ");
    expect(allCopy).toMatch(/paper/i);
    expect(allCopy).toMatch(/locked/i);
  });
});

describe("Aegis section structure", () => {
  it("renders the twelve contract sections in the fixed order", () => {
    expect(
      caseStudyBodySections(aegisCaseStudy).map((section) => section.heading),
    ).toEqual(AEGIS_EXPECTED_BODY_HEADINGS);
    expect(aegisCaseStudy.confidentiality.heading).toBe(
      "A note on confidentiality",
    );
  });

  it("gives every section a unique id and at least one paragraph", () => {
    const sections = [
      ...caseStudyBodySections(aegisCaseStudy),
      aegisCaseStudy.confidentiality,
    ];

    const ids = sections.map((section) => section.id);
    expect(new Set(ids).size).toBe(ids.length);

    for (const section of sections) {
      expect(section.paragraphs.length).toBeGreaterThan(0);
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
    expect(qCaseStudy.confidentiality.heading).toBe("Current status");
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

  it("keeps exactly four decisions and no video", () => {
    const ids = qCaseStudy.decisions.map((decision) => decision.id);
    expect(ids).toEqual([
      "decision-1",
      "decision-2",
      "decision-3",
      "decision-4",
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

  it("gives every image alt text and 2560×1440 intrinsic dimensions", () => {
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
    expect(bodyImages).toHaveLength(11);
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

    expect(hrefs).toEqual(["/#work", "/#work", "/#contact"]);
    for (const href of hrefs) {
      expect(href.startsWith("/#")).toBe(true);
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
