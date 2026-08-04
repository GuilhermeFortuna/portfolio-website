import { describe, expect, it } from "vitest";

import GosigappCaseStudyPage, { metadata } from "@/app/work/gosigapp/page";
import { caseStudyBodySections, gosigappCaseStudy } from "@/content/case-studies";
import { siteNavigation } from "@/content/site";
import { render, screen, within } from "@/test/render";

/**
 * The case-study route is fully static: no effect, hook, or client runtime is
 * involved, so a plain render is a faithful stand-in for the server HTML.
 */

const EXPECTED_H2_ORDER = [
  ...caseStudyBodySections(gosigappCaseStudy).map((section) => section.heading),
  gosigappCaseStudy.confidentiality.heading,
];

describe("/work/gosigapp metadata", () => {
  it("exports the approved static title and description", () => {
    expect(metadata.title).toBe("gosigapp — Reliable SIGAP Submission Pipeline");
    expect(metadata.description).toBe(
      "A Go backend pipeline for file validation, processing, retries, auditability, and submission to SIGAP.",
    );
  });
});

describe("/work/gosigapp document structure", () => {
  it("keeps one h1 and the contract heading order", () => {
    render(<GosigappCaseStudyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "gosigapp" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(EXPECTED_H2_ORDER);
  });

  it("exposes banner, main, and contentinfo landmarks", () => {
    render(<GosigappCaseStudyPage />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("provides the skip-link and back-to-top anchor targets", () => {
    render(<GosigappCaseStudyPage />);

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
    render(<GosigappCaseStudyPage />);

    for (const section of [
      ...caseStudyBodySections(gosigappCaseStudy),
      gosigappCaseStudy.confidentiality,
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

describe("/work/gosigapp navigation", () => {
  it("sends shared header navigation back to the homepage", () => {
    render(<GosigappCaseStudyPage />);

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
    render(<GosigappCaseStudyPage />);

    const backLinks = screen.getAllByRole("link", {
      name: "Back to selected work",
    });
    expect(backLinks).toHaveLength(1);
    for (const link of backLinks) {
      expect(link).toHaveAttribute("href", "/#work");
    }

    expect(
      screen.getByRole("link", { name: "Get in touch" }),
    ).toHaveAttribute("href", "/#contact");
  });

  it("keeps every destination same-origin and publishes no repository link", () => {
    render(<GosigappCaseStudyPage />);

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

describe("/work/gosigapp private-source & screenless backend behaviour", () => {
  it("omits the live-environment control and hero media", () => {
    render(<GosigappCaseStudyPage />);

    expect(
      screen.queryByRole("button", { name: /live environment/i }),
    ).toBeNull();
    expect("liveEnvironment" in gosigappCaseStudy.hero).toBe(false);
    expect("media" in gosigappCaseStudy.hero).toBe(false);
  });

  it("states the private source and ECS/Fargate deployment in the hero facts", () => {
    render(<GosigappCaseStudyPage />);

    const sourceTerm = screen.getByText("Source");
    expect(sourceTerm.tagName).toBe("DT");
    expect(sourceTerm.parentElement?.textContent).toContain("Private Repository");

    const stateTerm = screen.getByText("State");
    expect(stateTerm.tagName).toBe("DT");
    expect(stateTerm.parentElement?.textContent).toContain("Deployed to AWS ECS/Fargate");
  });

  it("renders no confidential brand code or draft placeholder anywhere", () => {
    render(<GosigappCaseStudyPage />);

    const html = document.body.innerHTML;
    expect(html).not.toContain("[REQUIRED:");
    expect(html).not.toContain("[CONFIDENTIAL:");
    expect(html).not.toContain("copy:start");
    expect(html).not.toContain("Author note");
    expect(html).not.toMatch(/\bBRX\b/);
    expect(html).not.toMatch(/\bRICO\b/);
  });
});

describe("/work/gosigapp system map", () => {
  function systemSection(): HTMLElement {
    const section = document.querySelector(
      `section#${gosigappCaseStudy.system.id}`,
    );
    expect(section).not.toBeNull();
    return section as HTMLElement;
  }

  it("renders inside the system section, after the prose it explains", () => {
    render(<GosigappCaseStudyPage />);
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
    render(<GosigappCaseStudyPage />);
    const section = systemSection();

    for (const label of [
      "Amazon S3 storage",
      "Pipeline Core (Go)",
      "PFX Signing & Packaging",
      "mTLS Transport & OAuth2",
      "SIGAP Impedidos v2 Service",
      "DynamoDB Audit & Job Runner",
      "AWS ECS / Fargate",
    ]) {
      expect(within(section).getAllByText(label).length).toBeGreaterThan(0);
    }

    expect(section.querySelector("canvas")).toBeNull();
  });

  it("names the flow stages so the lists are distinguishable", () => {
    render(<GosigappCaseStudyPage />);
    const section = systemSection();

    for (const name of ["Pipeline Data & Submission Flow", "Compliance, Auditability & Cloud Infrastructure"]) {
      const list = within(section).getByRole("list", { name });
      expect(list.tagName).toBe("OL");
    }
  });

  it("keeps the connectors decorative and out of the accessibility tree", () => {
    render(<GosigappCaseStudyPage />);
    const section = systemSection();

    const hidden = section.querySelectorAll('[aria-hidden="true"]');
    expect(hidden.length).toBeGreaterThan(0);
    for (const element of hidden) {
      expect(element.textContent?.trim()).toBe("");
    }
  });
});

describe("/work/gosigapp media", () => {
  it("renders the 3 placed assets (system map + 2 terminal captures) with alt, dimensions, and captions", () => {
    render(<GosigappCaseStudyPage />);

    const images = Array.from(document.querySelectorAll("img"));
    expect(images).toHaveLength(3);

    for (const image of images) {
      expect(image.getAttribute("alt")?.trim()).toBeTruthy();
      expect(image.getAttribute("src")).toMatch(/^\/work\/gosigapp\//);
      expect(image.getAttribute("width")).toBeTruthy();
      expect(image.getAttribute("height")).toBeTruthy();
      expect(image.getAttribute("loading")).toBe("lazy");
    }

    for (const section of caseStudyBodySections(gosigappCaseStudy)) {
      for (const image of section.images ?? []) {
        expect(
          screen.getByText(image.caption as string),
        ).toBeInTheDocument();
      }
    }
  });

  it("ships no video on this chapter", () => {
    render(<GosigappCaseStudyPage />);

    expect(document.querySelector("video")).toBeNull();
    expect(
      caseStudyBodySections(gosigappCaseStudy).some((section) => section.video),
    ).toBe(false);
  });
});
