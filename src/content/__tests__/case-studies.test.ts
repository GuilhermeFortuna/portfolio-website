import { existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import {
  aegisCaseStudy,
  caseStudies,
  caseStudyBodySections,
} from "@/content/case-studies";
import type { CaseStudyImage } from "@/types/case-study";

/**
 * These assertions guard the authored content itself, with no rendering: the
 * approved copy must stay marker-free, complete, internally linked, and backed
 * by assets that exist on disk.
 */

/** The six assets accepted at WO-019 `DONE`. Nothing else may be referenced. */
const APPROVED_ASSETS = [
  "/work/aegis/alerts.webp",
  "/work/aegis/entry-intro-poster.webp",
  "/work/aegis/entry-intro.mp4",
  "/work/aegis/overview.webp",
  "/work/aegis/player-investigation.webp",
  "/work/aegis/risk-constellation.webp",
] as const;

/** Prohibited by the Batch 03 editorial rules and the WO-020 review table. */
const FORBIDDEN_TERMS = [
  "production-ready",
  "revolutionary",
  "state-of-the-art",
  "enterprise-grade",
  "real-time",
  "high-volume",
  "fraud reduction",
  "revenue",
  "money saved",
  "client satisfaction",
] as const;

const EXPECTED_BODY_HEADINGS = [
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

function collectImages(): readonly CaseStudyImage[] {
  return [
    aegisCaseStudy.hero.media,
    ...caseStudyBodySections(aegisCaseStudy).flatMap(
      (section) => section.images ?? [],
    ),
  ];
}

const allStrings = collectStrings(aegisCaseStudy);

describe("case-study registry", () => {
  it("exposes Aegis under its slug", () => {
    expect(Object.keys(caseStudies)).toEqual(["aegis"]);
    expect(caseStudies.aegis).toBe(aegisCaseStudy);
    expect(aegisCaseStudy.slug).toBe("aegis");
  });

  it("uses the approved route metadata", () => {
    expect(aegisCaseStudy.metadata).toEqual({
      title: "Aegis — Fraud Intelligence Case Study",
      description:
        "Fraud intelligence and investigation software for the iGaming industry, presented through verified engineering decisions and evidence.",
    });
  });
});

describe("Aegis authored copy", () => {
  it("contains no unresolved documentation markers", () => {
    const offenders = allStrings.filter(
      (value) =>
        value.includes("[REQUIRED:") || value.includes("[CONFIDENTIAL:"),
    );
    expect(offenders).toEqual([]);
  });

  it("contains no forbidden marketing or impact language", () => {
    const offenders = allStrings.filter((value) =>
      FORBIDDEN_TERMS.some((term) => value.toLowerCase().includes(term)),
    );
    expect(offenders).toEqual([]);
  });

  it("has no empty authored string", () => {
    expect(allStrings.filter((value) => value.trim().length === 0)).toEqual([]);
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
    expect("href" in aegisCaseStudy.hero.liveEnvironment).toBe(false);
  });

  it("keeps the epistemic limit on production status", () => {
    // Removing this sentence would turn OWN-06 into a flat uptime claim.
    expect(aegisCaseStudy.delivered.paragraphs[0]).toContain(
      "as far as I know, remains active",
    );
  });
});

describe("Aegis section structure", () => {
  it("renders the twelve contract sections in the fixed order", () => {
    expect(
      caseStudyBodySections(aegisCaseStudy).map((section) => section.heading),
    ).toEqual(EXPECTED_BODY_HEADINGS);
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

describe("Aegis media references", () => {
  it("references only approved assets that exist on disk", () => {
    const referenced = [
      ...collectImages().map((image) => image.src),
      aegisCaseStudy.decisions[3].video?.src,
      aegisCaseStudy.decisions[3].video?.poster,
    ].filter((src): src is string => typeof src === "string");

    for (const src of referenced) {
      expect(APPROVED_ASSETS).toContain(src);
      expect(existsSync(join(process.cwd(), "public", src))).toBe(true);
    }

    // The poster is the only asset used twice, as hero still and video poster.
    expect(new Set(referenced)).toEqual(new Set(APPROVED_ASSETS));
  });

  it("gives every image alt text and intrinsic dimensions", () => {
    for (const image of collectImages()) {
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
    const offenders = allStrings.filter(
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
