import { describe, expect, it } from "vitest";

import NexoDentalCaseStudyPage, {
  metadata,
} from "@/app/work/nexo-dental/page";
import {
  caseStudyBodySections,
  nexoDentalCaseStudy,
} from "@/content/case-studies";
import { siteNavigation } from "@/content/site";
import { render, screen } from "@/test/render";

/**
 * The case-study route is fully static: no effect, hook, or client runtime is
 * involved, so a plain render is a faithful stand-in for the server HTML.
 */

const EXPECTED_H2_ORDER = [
  ...caseStudyBodySections(nexoDentalCaseStudy).map(
    (section) => section.heading,
  ),
  nexoDentalCaseStudy.confidentiality.heading,
];

describe("/work/nexo-dental metadata", () => {
  it("exports the approved static title and description", () => {
    expect(metadata.title).toBe("Nexo Dental — Multi-Tenant Clinic Operations");
    expect(metadata.description).toBe(
      "A multi-tenant product for Brazilian dental clinics spanning scheduling, clinical records, finance, communications, CRM, claims, and reporting across role-native surfaces.",
    );
  });
});

describe("/work/nexo-dental document structure", () => {
  it("keeps one h1 and the contract heading order", () => {
    render(<NexoDentalCaseStudyPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Nexo Dental" }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);

    expect(
      screen
        .getAllByRole("heading", { level: 2 })
        .map((heading) => heading.textContent),
    ).toEqual(EXPECTED_H2_ORDER);
  });

  it("exposes banner, main, and contentinfo landmarks", () => {
    render(<NexoDentalCaseStudyPage />);

    expect(screen.getByRole("banner")).toBeInTheDocument();
    expect(screen.getByRole("contentinfo")).toBeInTheDocument();
    expect(screen.getByRole("main")).toHaveAttribute("id", "main-content");
  });

  it("provides the skip-link and back-to-top anchor targets", () => {
    render(<NexoDentalCaseStudyPage />);

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
    render(<NexoDentalCaseStudyPage />);

    for (const section of [
      ...caseStudyBodySections(nexoDentalCaseStudy),
      nexoDentalCaseStudy.confidentiality,
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

describe("/work/nexo-dental navigation", () => {
  it("sends shared header navigation back to the homepage", () => {
    render(<NexoDentalCaseStudyPage />);

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
    render(<NexoDentalCaseStudyPage />);

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
    render(<NexoDentalCaseStudyPage />);

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

describe("/work/nexo-dental private-source behaviour", () => {
  it("renders the live environment as a disabled, non-interactive control", () => {
    render(<NexoDentalCaseStudyPage />);

    const control = screen.getByRole("button", {
      name: "Live environment — coming soon",
    });
    expect(control).toBeDisabled();
    expect(control).toHaveAttribute("aria-disabled", "true");
    expect(control).not.toHaveAttribute("href");
  });

  it("states the private source in the hero facts", () => {
    render(<NexoDentalCaseStudyPage />);

    const term = screen.getByText("Source");
    expect(term.tagName).toBe("DT");
    expect(term.parentElement?.textContent).toContain("Private");
  });

  it("renders no documentation placeholder anywhere in the page text", () => {
    render(<NexoDentalCaseStudyPage />);

    const html = document.body.innerHTML;
    expect(html).not.toContain("[REQUIRED:");
    expect(html).not.toContain("[CONFIDENTIAL:");
    expect(html).not.toContain("copy:start");
    expect(html).not.toContain("Author note");
  });
});

describe("/work/nexo-dental media", () => {
  it("renders eight placed assets with alt, dimensions, captions, and lazy-loading", () => {
    render(<NexoDentalCaseStudyPage />);

    const images = Array.from(document.querySelectorAll("img"));
    expect(images).toHaveLength(8);

    for (const image of images) {
      expect(image.getAttribute("alt")?.trim()).toBeTruthy();
      expect(image.getAttribute("src")).toMatch(/^\/work\/nexo-dental\//);
      expect(image.getAttribute("width")).toBe("2560");
      expect(image.getAttribute("height")).toBe("1440");
    }

    // Hero is eager; every other image stays lazy.
    expect(images[0].getAttribute("loading")).toBe("eager");
    for (const image of images.slice(1)) {
      expect(image.getAttribute("loading")).toBe("lazy");
    }

    expect(nexoDentalCaseStudy.hero.media?.caption).toBeTruthy();
    expect(
      screen.getByText(nexoDentalCaseStudy.hero.media!.caption as string),
    ).toBeInTheDocument();

    for (const section of caseStudyBodySections(nexoDentalCaseStudy)) {
      for (const image of section.images ?? []) {
        expect(
          screen.getByText(image.caption as string),
        ).toBeInTheDocument();
      }
    }
  });

  it("ships no video on this chapter", () => {
    render(<NexoDentalCaseStudyPage />);

    expect(document.querySelector("video")).toBeNull();
    expect(
      caseStudyBodySections(nexoDentalCaseStudy).some(
        (section) => section.video,
      ),
    ).toBe(false);
  });
});
