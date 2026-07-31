import { describe, expect, it } from "vitest";

import AegisCaseStudyPage, { metadata } from "@/app/work/aegis/page";
import { aegisCaseStudy, caseStudyBodySections } from "@/content/case-studies";
import { siteNavigation } from "@/content/site";
import { render, screen } from "@/test/render";

/**
 * The case-study route is fully static: no effect, hook, or client runtime is
 * involved, so a plain render is a faithful stand-in for the server HTML.
 */

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

describe("/work/aegis media", () => {
  it("renders each screenshot with alt text and a visible caption", () => {
    render(<AegisCaseStudyPage />);

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
