import { describe, expect, it } from "vitest";

import { projects } from "@/content/projects";
import { getSiteContent, siteContent, siteNavigation } from "@/content/site";

// Root-relative so the shared header resolves to the homepage from any route.
const expectedDesktopNavigation = [
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
  { label: "Resume", href: "/resume" },
] as const;

const expectedProfileLinks = {
  github: "https://github.com/GuilhermeFortuna",
  wakatime: "https://wakatime.com/@GuilhermeFortuna",
  linkedin:
    "https://www.linkedin.com/in/guilherme-fortuna-dos-santos/",
} as const;

describe("site content contract", () => {
  it("keeps desktop navigation destinations in page order", () => {
    expect(siteNavigation.desktop).toEqual(expectedDesktopNavigation);
  });

  it("keeps mobile navigation as the approved page-order subset", () => {
    expect(siteNavigation.mobile).toEqual([
      expectedDesktopNavigation[0],
      { label: "CV", href: "/resume", ariaLabel: "Resume" },
    ]);
  });

  it("keeps page-level navigation references aligned with section IDs", () => {
    expect(siteNavigation.wordmarkHref).toBe("/#top");
    // The approved hero destination is the first chapter, not the section
    // anchor (docs/content.md, Identity).
    expect(siteContent.heroCtaHref).toBe("/work/aegis");
    expect(siteContent.heroCtaHref).toBe(projects[0].href);
    expect(siteNavigation.desktop.map(({ href }) => href)).toEqual([
      "/#work",
      "/#process",
      "/#about",
      "/#contact",
      "/resume",
    ]);
  });

  it("keeps every global navigation destination same-origin", () => {
    const destinations = [
      siteNavigation.wordmarkHref,
      ...siteNavigation.desktop.map(({ href }) => href),
      ...siteNavigation.mobile.map(({ href }) => href),
    ];

    for (const href of destinations) {
      expect(href.startsWith("/#") || href === "/resume").toBe(true);
    }
  });

  it("keeps approved profile destinations consistent across sections", () => {
    expect(siteContent.heroGithubHref).toBe(expectedProfileLinks.github);
    expect(siteContent.aboutGithubHref).toBe(expectedProfileLinks.github);
    expect(siteContent.aboutWakatimeHref).toBe(expectedProfileLinks.wakatime);

    expect(siteContent.contactActions).toEqual([
      {
        label: "Email me",
        href: "mailto:guilhermefortuna.dev@gmail.com",
      },
      { label: "LinkedIn", href: expectedProfileLinks.linkedin },
      { label: "GitHub", href: expectedProfileLinks.github },
    ]);
  });

  it("omits unavailable contact actions instead of using null placeholders", () => {
    expect(
      siteContent.contactActions.every(({ href }) => href.length > 0),
    ).toBe(true);
    expect(
      siteContent.contactActions.some(({ label }) =>
        label.toLowerCase().includes("résumé"),
      ),
    ).toBe(false);
  });

  it("uses the approved public email in both homepage locales", () => {
    expect(getSiteContent("en").contactActions[0].href).toBe(
      "mailto:guilhermefortuna.dev@gmail.com",
    );
    expect(getSiteContent("pt-BR").contactActions[0].href).toBe(
      "mailto:guilhermefortuna.dev@gmail.com",
    );
    expect(
      [...getSiteContent("en").contactActions, ...getSiteContent("pt-BR").contactActions].some(
        ({ href }) => href === "tel:+5548991814229",
      ),
    ).toBe(false);
  });
});
