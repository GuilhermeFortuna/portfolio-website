import { describe, expect, it } from "vitest";

import AegisCaseStudyPage, { metadata } from "@/app/(en)/work/aegis/page";
import { aegisCaseStudy, caseStudyBodySections } from "@/content/case-studies";
import { siteNavigation } from "@/content/site";
import { renderWithLocale, screen, within } from "@/test/render";

/**
 * The case-study route is fully static: no effect, hook, or client runtime is
 * involved, so a plain render is a faithful stand-in for the server HTML.
 */

/**
 * The closing is navigation-only: it renders as a labelled `nav`, not a
 * heading-bearing section, so it contributes no `h2`.
 */
const EXPECTED_H2_ORDER = caseStudyBodySections(aegisCaseStudy).map(
  (section) => section.heading,
);

describe("/work/aegis metadata", () => {
  it("exports the approved static title and description", () => {
    expect(metadata.title).toBe(
      "Aegis — Production Fraud Intelligence Platform",
    );
    expect(metadata.description).toBe(
      "How I designed and built a production fraud-investigation platform for Brazilian iGaming, from explainable rules and data pipelines to security and WebGL.",
    );
  });
});

describe("/work/aegis document structure", () => {
  it("keeps one h1 and the contract heading order", () => {
    renderWithLocale(<AegisCaseStudyPage />);

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
    renderWithLocale(<AegisCaseStudyPage />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("provides the skip-link and back-to-top anchor targets", () => {
    renderWithLocale(<AegisCaseStudyPage />);

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
    renderWithLocale(<AegisCaseStudyPage />);

    for (const section of caseStudyBodySections(aegisCaseStudy)) {
      const element = document.querySelector(`section#${section.id}`);
      expect(element).not.toBeNull();
      expect(element).toHaveAttribute(
        "aria-labelledby",
        `${section.id}-heading`,
      );
    }
  });

  it("closes on a labelled navigation landmark rather than a section", () => {
    renderWithLocale(<AegisCaseStudyPage />);

    const closing = aegisCaseStudy.confidentiality;
    expect(document.querySelector(`section#${closing.id}`)).toBeNull();

    const nav = document.querySelector(`nav#${closing.id}`);
    expect(nav).not.toBeNull();
    expect(nav).toHaveAttribute("aria-label", closing.heading);
    // The landmark name must not surface as visible page copy.
    expect(screen.queryByRole("heading", { name: closing.heading })).toBeNull();
  });
});

describe("/work/aegis navigation", () => {
  it("sends shared header navigation back to the homepage", () => {
    renderWithLocale(<AegisCaseStudyPage />);

    for (const item of siteNavigation.desktop) {
      for (const link of screen.getAllByRole("link", { name: item.label })) {
        expect(link).toHaveAttribute("href", item.href);
      }
    }

    expect(
      screen.getByRole("link", { name: "GUILHERME FORTUNA" }),
    ).toHaveAttribute("href", "/#top");
  });

  it("offers the approved in-page return and next-chapter actions", () => {
    renderWithLocale(<AegisCaseStudyPage />);

    const backLinks = screen.getAllByRole("link", {
      name: "Back to selected work",
    });
    expect(backLinks).toHaveLength(2);
    for (const link of backLinks) {
      expect(link).toHaveAttribute("href", "/#work");
    }

    // The chapter paginates into Quant rather than back to the contact anchor.
    expect(
      screen.getByRole("link", { name: "Next project: Quant" }),
    ).toHaveAttribute("href", "/work/q");
  });

  it("keeps every destination same-origin and publishes no repository link", () => {
    renderWithLocale(<AegisCaseStudyPage />);

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
    renderWithLocale(<AegisCaseStudyPage />);

    const control = screen.getByRole("button", {
      name: "Live environment — coming soon",
    });
    expect(control).toBeDisabled();
    expect(control).toHaveAttribute("aria-disabled", "true");
    expect(control).not.toHaveAttribute("href");
  });

  it("states the private source in the hero facts", () => {
    renderWithLocale(<AegisCaseStudyPage />);

    const term = screen.getByText("Source");
    expect(term.tagName).toBe("DT");
    expect(term.parentElement?.textContent).toContain("Private");
  });

  it("renders no documentation placeholder anywhere in the page text", () => {
    renderWithLocale(<AegisCaseStudyPage />);

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
    renderWithLocale(<AegisCaseStudyPage />);
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
    renderWithLocale(<AegisCaseStudyPage />);
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
    renderWithLocale(<AegisCaseStudyPage />);
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
    renderWithLocale(<AegisCaseStudyPage />);
    const section = systemSection();

    const hidden = section.querySelectorAll('[aria-hidden="true"]');
    expect(hidden.length).toBeGreaterThan(0);
    for (const element of hidden) {
      // A hidden node may not swallow any of the map's text.
      expect(element.textContent?.trim()).toBe("");
    }
  });

  it("exposes no confidential identifier, company name, or invented figure", () => {
    renderWithLocale(<AegisCaseStudyPage />);
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
    renderWithLocale(<AegisCaseStudyPage />);

    const images = Array.from(document.querySelectorAll("img"));
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

  it("keeps the intro poster-first, controlled, and never autoplaying", () => {
    renderWithLocale(<AegisCaseStudyPage />);

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
    renderWithLocale(<AegisCaseStudyPage />);

    const { video } = aegisCaseStudy.decisions[3];
    expect(screen.getByText(video?.title as string)).toBeInTheDocument();
    expect(
      screen.getByText(video?.transcript as string),
    ).toBeInTheDocument();
  });
});
