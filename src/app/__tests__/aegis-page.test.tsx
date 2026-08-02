import type { ReactElement, ReactNode, SVGProps } from "react";
import { describe, expect, it, vi } from "vitest";

import AegisCaseStudyPage, { metadata } from "@/app/work/aegis/page";
import { PortfolioMotionProvider } from "@/components/providers/portfolio-motion-provider";
import { aegisCaseStudy, caseStudyBodySections } from "@/content/case-studies";
import { siteNavigation } from "@/content/site";
import { render as rtlRender, screen, within } from "@/test/render";

/**
 * WO-026 wraps the article in a client scene manager that reads the root
 * Motion/Lenis provider. Structure assertions still target the same semantic
 * DOM; GSAP/Lenis are stubbed so jsdom does not own a second scroll runtime.
 */

vi.mock("gsap", () => {
  const timeline = {
    data: { id: "aegis-page-root" },
    eventCallback: vi.fn(),
    to: vi.fn(),
    add: vi.fn(),
    addLabel: vi.fn(),
    removeLabel: vi.fn(),
    revert: vi.fn(),
  };
  const api = {
    registerPlugin: vi.fn(),
    context: vi.fn((fn: () => void) => {
      fn();
      return { revert: vi.fn() };
    }),
    timeline: vi.fn(() => timeline),
    utils: { selector: vi.fn(() => vi.fn()) },
    getById: vi.fn(),
    set: vi.fn(() => ({
      play: vi.fn(),
      vars: {},
      data: {},
    })),
    fromTo: vi.fn(() => ({})),
    ticker: { add: vi.fn(), remove: vi.fn() },
  };
  return { gsap: api, default: api };
});

vi.mock("gsap/ScrollTrigger", () => ({
  ScrollTrigger: {
    refresh: vi.fn(),
    update: vi.fn(),
  },
}));

vi.mock("gsap/Flip", () => ({
  Flip: {
    getState: vi.fn(() => ({})),
    fit: vi.fn(() => ({ kill: vi.fn() })),
  },
}));

vi.mock("motion/react", () => ({
  MotionConfig: ({ children }: { children: ReactNode }) => <>{children}</>,
  AnimatePresence: ({ children }: { children: ReactNode }) => <>{children}</>,
  motion: {
    div: ({
      children,
      ...props
    }: {
      children?: ReactNode;
      [key: string]: unknown;
    }) => <div {...props}>{children}</div>,
    span: ({
      children,
      ...props
    }: {
      children?: ReactNode;
      [key: string]: unknown;
    }) => <span {...props}>{children}</span>,
    circle: (props: { [key: string]: unknown }) => (
      <circle {...(props as SVGProps<SVGCircleElement>)} />
    ),
  },
}));

vi.mock("lenis/react", () => ({
  ReactLenis: ({ children }: { children: ReactNode }) => <>{children}</>,
  useLenis: () => null,
}));

vi.mock("@/components/case-study/experience/case-study-webgl-stage", () => ({
  CASE_STUDY_CINEMATIC_CONFIG: {
    id: "case-study-cinematic",
    priority: "hero",
    estimatedCost: "high",
    continuous: true,
    allowMobile: false,
  },
  CaseStudyWebGLStage: ({ fallback }: { fallback: ReactNode }) => (
    <div data-testid="aegis-cinematic-stage">{fallback}</div>
  ),
}));

vi.mock("@/components/case-study/experience/kinetic-route-transition", () => ({
  KineticRouteTransition: () => (
    <div data-testid="aegis-kinetic-field" aria-hidden="true" />
  ),
  createKineticRouteTransitionController: vi.fn(),
  getKineticControllerFromElement: vi.fn(() => null),
}));

function render(ui: ReactElement) {
  return rtlRender(<PortfolioMotionProvider>{ui}</PortfolioMotionProvider>);
}

const EXPECTED_H2_ORDER = [
  ...caseStudyBodySections(aegisCaseStudy).map((section) => section.heading),
  aegisCaseStudy.confidentiality.heading,
];

describe("/work/aegis metadata", () => {
  it("exports the approved static title and description", () => {
    expect(metadata.title).toBe("Aegis — Fraud Intelligence Case Study");
    expect(metadata.description).toBe(
      "Fraud intelligence and investigation software for the iGaming industry, presented through verified engineering decisions and evidence.",
    );
  });
});

describe("/work/aegis document structure", () => {
  it("keeps one h1 and the contract heading order", () => {
    render(<AegisCaseStudyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Aegis" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(EXPECTED_H2_ORDER);
  });

  it("exposes banner, main, and contentinfo landmarks", () => {
    render(<AegisCaseStudyPage />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("exposes the chapter instrument nav with twelve approved destinations", () => {
    render(<AegisCaseStudyPage />);

    const chapterNav = screen.getByRole("navigation", {
      name: "Case study chapters",
    });

    const ordered = Array.from(
      chapterNav.querySelectorAll<HTMLAnchorElement>("[data-chapter-static] a"),
    ).map((link) => ({
      href: link.getAttribute("href"),
      label: (link.textContent ?? "").replace(/^\d{2}/, "").trim(),
    }));

    expect(ordered).toEqual([
      { href: "#top", label: "Aegis" },
      { href: "#context", label: "The context" },
      { href: "#problem", label: "The problem" },
      { href: "#system", label: "How the system fits together" },
      {
        href: "#decision-1",
        label: "Decision 1 — Keep Aegis a standalone product",
      },
      {
        href: "#decision-2",
        label: "Decision 2 — Read from a curated store, not the lakehouse",
      },
      {
        href: "#decision-3",
        label: "Decision 3 — Build for investigation, not for monitoring",
      },
      {
        href: "#decision-4",
        label: "Decision 4 — Give the product its own identity",
      },
      { href: "#contribution", label: "What I did" },
      { href: "#delivered", label: "Delivered" },
      { href: "#technology", label: "Technology, in context" },
      { href: "#confidentiality", label: "A note on confidentiality" },
    ]);
  });

  it("provides the skip-link and back-to-top anchor targets", () => {
    render(<AegisCaseStudyPage />);

    const skipLink = screen.getByRole("link", {
      name: siteNavigation.skipLink,
    });
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(document.querySelector("#main-content")).not.toBeNull();

    // The footer's `Back to top` is a bare fragment, so the route owns `#top`.
    expect(
      screen.getByRole("link", { name: "Back to top" }),
    ).toHaveAttribute("href", "#top");
    expect(document.querySelector("#top")).not.toBeNull();
  });

  it("gives every section an id matching its labelling heading", () => {
    render(<AegisCaseStudyPage />);

    for (const section of [
      ...caseStudyBodySections(aegisCaseStudy),
      aegisCaseStudy.confidentiality,
    ]) {
      const element = document.querySelector(`section#${section.id}`);
      expect(element).not.toBeNull();
      expect(element).toHaveAttribute(
        "aria-labelledby",
        `${section.id}-heading`,
      );
    }
  });

  it("authors four distinct decision-panel compositions under one sequence", () => {
    render(<AegisCaseStudyPage />);

    expect(document.querySelector("[data-decision-panels]")).not.toBeNull();
    const panels = Array.from(
      document.querySelectorAll("[data-decision-panel]"),
    );
    expect(panels).toHaveLength(4);
    expect(
      panels.map((panel) => panel.getAttribute("data-decision-composition")),
    ).toEqual([
      "declaration",
      "contrast",
      "evidenceStage",
      "identityVideo",
    ]);

    const stage = document.querySelector(
      "section#decision-3 [data-decision-media-stage]",
    );
    expect(stage).not.toBeNull();
    expect(stage?.querySelectorAll("img")).toHaveLength(2);

    expect(
      document.querySelector("section#decision-1 img"),
    ).toBeNull();
    expect(
      document.querySelector("section#decision-2 img"),
    ).toBeNull();
  });
});

describe("/work/aegis navigation", () => {
  it("sends shared header navigation back to the homepage", () => {
    render(<AegisCaseStudyPage />);

    for (const item of siteNavigation.desktop) {
      for (const link of screen.getAllByRole("link", { name: item.label })) {
        expect(link).toHaveAttribute("href", item.href);
      }
    }

    expect(
      screen.getByRole("link", { name: "GUILHERME" }),
    ).toHaveAttribute("href", "/#top");
  });

  it("offers the approved in-page return and contact actions", () => {
    render(<AegisCaseStudyPage />);

    const backLinks = screen.getAllByRole("link", {
      name: "Back to selected work",
    });
    expect(backLinks).toHaveLength(2);
    for (const link of backLinks) {
      expect(link).toHaveAttribute("href", "/#work");
    }

    expect(
      screen.getByRole("link", { name: "Get in touch" }),
    ).toHaveAttribute("href", "/#contact");
  });

  it("keeps every destination same-origin and publishes no repository link", () => {
    render(<AegisCaseStudyPage />);

    const hrefs = Array.from(document.querySelectorAll("a")).map(
      (anchor) => anchor.getAttribute("href") ?? "",
    );

    expect(hrefs.length).toBeGreaterThan(0);
    for (const href of hrefs) {
      expect(href.startsWith("/") || href.startsWith("#")).toBe(true);
    }
    expect(hrefs.some((href) => href.includes("github.com"))).toBe(false);
  });
});

describe("/work/aegis private-source behaviour", () => {
  it("renders the live environment as a disabled, non-interactive control", () => {
    render(<AegisCaseStudyPage />);

    const control = screen.getByRole("button", {
      name: "Live environment — coming soon",
    });
    expect(control).toBeDisabled();
    expect(control).toHaveAttribute("aria-disabled", "true");
    expect(control).not.toHaveAttribute("href");
  });

  it("states the private source in the hero facts", () => {
    render(<AegisCaseStudyPage />);

    const term = screen.getByText("Source");
    expect(term.tagName).toBe("DT");
    expect(term.parentElement?.textContent).toContain("Private");
  });

  it("renders no documentation placeholder anywhere in the page text", () => {
    render(<AegisCaseStudyPage />);

    const html = document.body.innerHTML;
    expect(html).not.toContain("[REQUIRED:");
    expect(html).not.toContain("[CONFIDENTIAL:");
    // Author-note plumbing from the content contract must not leak into the DOM.
    expect(html).not.toContain("copy:start");
    expect(html).not.toContain("Author note");
  });
});

describe("/work/aegis system map", () => {
  function systemSection(): HTMLElement {
    const section = document.querySelector(
      `section#${aegisCaseStudy.system.id}`,
    );
    expect(section).not.toBeNull();
    return section as HTMLElement;
  }

  it("renders inside the system section, after the prose it explains", () => {
    render(<AegisCaseStudyPage />);
    const section = systemSection();

    const lists = section.querySelectorAll("ol");
    expect(lists.length).toBeGreaterThan(0);

    // Order within the section: prose, then map, then the screenshot.
    const prose = section.querySelector("p");
    const firstList = lists[0];
    const figure = section.querySelector("figure");
    expect(prose).not.toBeNull();
    expect(
      prose!.compareDocumentPosition(firstList) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
    expect(
      firstList.compareDocumentPosition(figure as Node) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("states every node as real text rather than an image or canvas", () => {
    render(<AegisCaseStudyPage />);
    const section = systemSection();

    for (const label of [
      "Investigator UI",
      "FastAPI service",
      "Curated PostgreSQL schema",
      "Databricks lakehouse",
      "Redis cache",
      "Scheduled sync and detection jobs",
      "PostgreSQL and cache refresh",
    ]) {
      expect(within(section).getAllByText(label).length).toBeGreaterThan(0);
    }

    // The map is HTML and CSS: no canvas, SVG, or extra image is introduced.
    expect(section.querySelector("canvas")).toBeNull();
    expect(section.querySelector("svg")).toBeNull();
    expect(section.querySelectorAll("img")).toHaveLength(1);
  });

  it("names each path so the two lists are distinguishable", () => {
    render(<AegisCaseStudyPage />);
    const section = systemSection();

    for (const name of [
      "What a request touches",
      "What keeps that data current",
    ]) {
      const list = within(section).getByRole("list", { name });
      expect(list.tagName).toBe("OL");
    }
  });

  it("keeps the connectors decorative and out of the accessibility tree", () => {
    render(<AegisCaseStudyPage />);
    const section = systemSection();

    const hidden = section.querySelectorAll('[aria-hidden="true"]');
    expect(hidden.length).toBeGreaterThan(0);
    for (const element of hidden) {
      // A hidden node may not swallow any of the map's text.
      expect(element.textContent?.trim()).toBe("");
    }
  });

  it("exposes no confidential identifier, company name, or invented figure", () => {
    render(<AegisCaseStudyPage />);
    const text = systemSection().textContent ?? "";

    for (const forbidden of [
      "localhost",
      "http://",
      "https://",
      "aegis.",
      "gcp",
      "project-id",
      "requests/s",
      "req/s",
      "ms latency",
      "uptime",
    ]) {
      expect(text.toLowerCase()).not.toContain(forbidden.toLowerCase());
    }
    // No throughput or volume number beyond the counts in the approved copy.
    expect(text).not.toMatch(/\d+\s*(k|m|million|per second|\/s)\b/i);
  });
});

describe("/work/aegis media", () => {
  it("renders each screenshot with alt text and a visible caption", () => {
    render(<AegisCaseStudyPage />);

    // Semantic chapter figures stay in Batch 03 DOM; the D-010 aperture may
    // add one traveling still that must not replace captions or figure count.
    const images = Array.from(document.querySelectorAll("img")).filter(
      (image) => !image.closest("[data-aperture]"),
    );
    expect(images).toHaveLength(5);

    for (const image of images) {
      expect(image.getAttribute("alt")?.trim()).toBeTruthy();
      expect(image.getAttribute("src")).toMatch(/^\/work\/aegis\//);
      expect(image.getAttribute("width")).toBeTruthy();
      expect(image.getAttribute("height")).toBeTruthy();
    }

    for (const section of caseStudyBodySections(aegisCaseStudy)) {
      for (const image of section.images ?? []) {
        expect(
          screen.getByText(image.caption as string),
        ).toBeInTheDocument();
      }
    }
  });

  it("places one Flip waypoint slot per authored narrative scene", () => {
    render(<AegisCaseStudyPage />);

    const slots = Array.from(
      document.querySelectorAll("[data-aperture-slot]"),
    ).map((node) => node.getAttribute("data-aperture-slot"));

    expect(slots).toEqual([
      "aegis-aperture-hero",
      "aegis-aperture-context",
      "aegis-aperture-problem",
      "aegis-aperture-system",
      "aegis-aperture-decisions",
      "aegis-aperture-contribution",
      "aegis-aperture-delivered",
      "aegis-aperture-technology",
      "aegis-aperture-confidentiality",
    ]);
    expect(document.querySelector("[data-aperture]")).not.toBeNull();
  });

  it("keeps the intro poster-first, controlled, and never autoplaying", () => {
    render(<AegisCaseStudyPage />);

    const video = document.querySelector("video");
    expect(video).not.toBeNull();
    expect(video).toHaveAttribute("controls");
    expect(video).toHaveAttribute(
      "poster",
      "/work/aegis/entry-intro-poster.webp",
    );
    expect(video).toHaveAttribute("preload", "metadata");
    expect(video).not.toHaveAttribute("autoplay");
    expect(video).not.toHaveAttribute("loop");
    expect(video?.getAttribute("aria-label")).toBeTruthy();
  });

  it("renders the silent film's transcript as visible text", () => {
    render(<AegisCaseStudyPage />);

    const { video } = aegisCaseStudy.decisions[3];
    expect(screen.getByText(video?.title as string)).toBeInTheDocument();
    expect(
      screen.getByText(video?.transcript as string),
    ).toBeInTheDocument();
  });
});
