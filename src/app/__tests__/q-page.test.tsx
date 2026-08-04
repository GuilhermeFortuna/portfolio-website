import { describe, expect, it } from "vitest";

import QuantCaseStudyPage, { metadata } from "@/app/work/q/page";
import { caseStudyBodySections, qCaseStudy } from "@/content/case-studies";
import { siteNavigation } from "@/content/site";
import { render, screen, within } from "@/test/render";

/**
 * The case-study route is fully static: no effect, hook, or client runtime is
 * involved, so a plain render is a faithful stand-in for the server HTML.
 */

const EXPECTED_H2_ORDER = [
  ...caseStudyBodySections(qCaseStudy).map((section) => section.heading),
  qCaseStudy.confidentiality.heading,
];

describe("/work/q metadata", () => {
  it("exports the approved static title and description", () => {
    expect(metadata.title).toBe("Quant — Quantitative Research and Execution");
    expect(metadata.description).toBe(
      "A native quantitative research platform for the Brazilian futures market, covering backtesting, optimization, data pipelines, and execution architecture.",
    );
  });
});

describe("/work/q document structure", () => {
  it("keeps one h1 and the contract heading order", () => {
    render(<QuantCaseStudyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Quant" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(EXPECTED_H2_ORDER);
  });

  it("exposes banner, main, and contentinfo landmarks", () => {
    render(<QuantCaseStudyPage />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("provides the skip-link and back-to-top anchor targets", () => {
    render(<QuantCaseStudyPage />);

    const skipLink = screen.getByRole("link", {
      name: siteNavigation.skipLink,
    });
    expect(skipLink).toHaveAttribute("href", "#main-content");
    expect(document.querySelector("#main-content")).not.toBeNull();

    expect(
      screen.getByRole("link", { name: "Back to top" }),
    ).toHaveAttribute("href", "#top");
    expect(document.querySelector("#top")).not.toBeNull();
  });

  it("gives every section an id matching its labelling heading", () => {
    render(<QuantCaseStudyPage />);

    for (const section of [
      ...caseStudyBodySections(qCaseStudy),
      qCaseStudy.confidentiality,
    ]) {
      const element = document.querySelector(`section#${section.id}`);
      expect(element).not.toBeNull();
      expect(element).toHaveAttribute(
        "aria-labelledby",
        `${section.id}-heading`,
      );
    }
  });
});

describe("/work/q navigation", () => {
  it("sends shared header navigation back to the homepage", () => {
    render(<QuantCaseStudyPage />);

    for (const item of siteNavigation.desktop) {
      for (const link of screen.getAllByRole("link", { name: item.label })) {
        expect(link).toHaveAttribute("href", item.href);
      }
    }

    expect(
      screen.getByRole("link", { name: "GUILHERME FORTUNA" }),
    ).toHaveAttribute("href", "/#top");
  });

  it("offers the approved in-page return and contact actions", () => {
    render(<QuantCaseStudyPage />);

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
    render(<QuantCaseStudyPage />);

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

describe("/work/q private-source behaviour", () => {
  it("omits the live-environment control entirely", () => {
    render(<QuantCaseStudyPage />);

    expect(
      screen.queryByRole("button", { name: /live environment/i }),
    ).toBeNull();
    expect("liveEnvironment" in qCaseStudy.hero).toBe(false);
  });

  it("states the private source in the hero facts", () => {
    render(<QuantCaseStudyPage />);

    const term = screen.getByText("Source");
    expect(term.tagName).toBe("DT");
    expect(term.parentElement?.textContent).toContain("Private");
  });

  it("renders no documentation placeholder anywhere in the page text", () => {
    render(<QuantCaseStudyPage />);

    const html = document.body.innerHTML;
    expect(html).not.toContain("[REQUIRED:");
    expect(html).not.toContain("[CONFIDENTIAL:");
    expect(html).not.toContain("copy:start");
    expect(html).not.toContain("Author note");
  });
});

describe("/work/q system map", () => {
  function systemSection(): HTMLElement {
    const section = document.querySelector(
      `section#${qCaseStudy.system.id}`,
    );
    expect(section).not.toBeNull();
    return section as HTMLElement;
  }

  it("renders inside the system section, after the prose it explains", () => {
    render(<QuantCaseStudyPage />);
    const section = systemSection();

    const lists = section.querySelectorAll("ol");
    expect(lists.length).toBeGreaterThan(0);

    const prose = section.querySelector("p");
    const firstList = lists[0];
    expect(prose).not.toBeNull();
    expect(
      prose!.compareDocumentPosition(firstList) &
        Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });

  it("states every node as real text rather than an image or canvas", () => {
    render(<QuantCaseStudyPage />);
    const section = systemSection();

    for (const label of [
      "Tauri desktop shell",
      "React SPA",
      "FastAPI service",
      "PostgreSQL",
      "Redis queue",
      "Dramatiq worker pool",
      "Market-data ingestion",
      "MetaTrader 5 boundary",
    ]) {
      expect(within(section).getAllByText(label).length).toBeGreaterThan(0);
    }

    expect(section.querySelector("canvas")).toBeNull();
    expect(section.querySelector("svg")).toBeNull();
    expect(section.querySelectorAll("img")).toHaveLength(0);
  });

  it("names the nested paths so the lists are distinguishable", () => {
    render(<QuantCaseStudyPage />);
    const section = systemSection();

    for (const name of ["How the stack nests", "What the API depends on"]) {
      const list = within(section).getByRole("list", { name });
      expect(list.tagName).toBe("OL");
    }
  });

  it("keeps the connectors decorative and out of the accessibility tree", () => {
    render(<QuantCaseStudyPage />);
    const section = systemSection();

    const hidden = section.querySelectorAll('[aria-hidden="true"]');
    expect(hidden.length).toBeGreaterThan(0);
    for (const element of hidden) {
      expect(element.textContent?.trim()).toBe("");
    }
  });

  it("exposes the verified execution status and no confidential identifiers", () => {
    render(<QuantCaseStudyPage />);
    const text = document.body.textContent ?? "";

    expect(text.toLowerCase()).toContain("paper");
    expect(text.toLowerCase()).toContain("live trading is rejected");

    for (const forbidden of [
      "localhost",
      "http://",
      "https://",
      "requests/s",
      "req/s",
      "ms latency",
      "uptime",
    ]) {
      expect(text.toLowerCase()).not.toContain(forbidden.toLowerCase());
    }
    expect(text).not.toMatch(/\d+\s*(k|m|million|per second|\/s)\b/i);
  });
});

describe("/work/q media", () => {
  it("renders each screenshot with alt text, dimensions, and captions", () => {
    render(<QuantCaseStudyPage />);

    const images = Array.from(document.querySelectorAll("img"));
    expect(images).toHaveLength(13);

    for (const image of images) {
      expect(image.getAttribute("alt")?.trim()).toBeTruthy();
      expect(image.getAttribute("src")).toMatch(/^\/work\/q\//);
      expect(image.getAttribute("width")).toBe("2560");
      expect(image.getAttribute("height")).toBe("1440");
    }

    for (const section of caseStudyBodySections(qCaseStudy)) {
      for (const image of section.images ?? []) {
        expect(
          screen.getByText(image.caption as string),
        ).toBeInTheDocument();
      }
    }
  });

  it("eager-loads the hero still and lazy-loads every body figure", () => {
    render(<QuantCaseStudyPage />);

    const images = Array.from(document.querySelectorAll("img"));
    expect(images[0]?.getAttribute("loading")).toBe("eager");
    for (const image of images.slice(1)) {
      expect(image.getAttribute("loading")).toBe("lazy");
    }
  });

  it("ships no video on this chapter", () => {
    render(<QuantCaseStudyPage />);

    expect(document.querySelector("video")).toBeNull();
    expect(
      caseStudyBodySections(qCaseStudy).some((section) => section.video),
    ).toBe(false);
  });
});
