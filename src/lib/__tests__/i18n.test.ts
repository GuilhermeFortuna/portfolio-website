import { describe, expect, it } from "vitest";
import { getSiteContent, getSiteNavigation, getSiteMetadata, getFooterContent } from "@/content/site";
import { getProjects } from "@/content/projects";
import { getAegisCaseStudy, getQCaseStudy, getCaseStudy } from "@/content/case-studies";
import { isValidLocale, locales, defaultLocale } from "@/lib/i18n";

describe("i18n infrastructure & Brazilian Portuguese content", () => {
  it("defines valid locales and defaults", () => {
    expect(locales).toEqual(["en", "pt-BR"]);
    expect(defaultLocale).toBe("en");
    expect(isValidLocale("en")).toBe(true);
    expect(isValidLocale("pt-BR")).toBe(true);
    expect(isValidLocale("fr")).toBe(false);
  });

  it("provides complete Portuguese (pt-BR) site content", () => {
    const ptSite = getSiteContent("pt-BR");
    expect(ptSite.heroTitle).toBe("Desenvolvo sistemas de software ambiciosos.");
    expect(ptSite.processLabel).toBe("PROCESSO");
    expect(ptSite.aboutLabel).toBe("SOBRE");
    expect(ptSite.contactLabel).toBe("CONTATO");
    expect(ptSite.heroCtaHref).toBe("/pt-BR/work/aegis");
  });

  it("provides Portuguese (pt-BR) navigation and footer", () => {
    const ptNav = getSiteNavigation("pt-BR");
    expect(ptNav.wordmarkHref).toBe("/pt-BR/#top");
    expect(ptNav.desktop.map((item) => item.label)).toEqual([
      "Trabalho",
      "Processo",
      "Sobre",
      "Contato",
    ]);

    const ptFooter = getFooterContent("pt-BR");
    expect(ptFooter.backToTop).toBe("Voltar ao topo");
  });

  it("provides Portuguese (pt-BR) metadata", () => {
    const ptMeta = getSiteMetadata("pt-BR");
    expect(ptMeta.title).toContain("Desenvolvedor de Software");
  });

  it("provides Portuguese (pt-BR) projects", () => {
    const ptProjects = getProjects("pt-BR");
    expect(ptProjects[0].category).toBe("Inteligência contra fraudes");
    expect(ptProjects[0].href).toBe("/pt-BR/work/aegis");
    expect(ptProjects[1].category).toBe("Sistemas quantitativos");
    expect(ptProjects[1].href).toBe("/pt-BR/work/q");
  });

  it("provides Portuguese (pt-BR) case studies", () => {
    const ptAegis = getAegisCaseStudy("pt-BR");
    expect(ptAegis.hero.category).toBe("Inteligência contra fraudes");
    expect(ptAegis.hero.backLink.href).toBe("/pt-BR/#work");

    const ptQ = getQCaseStudy("pt-BR");
    expect(ptQ.hero.category).toBe("Sistemas quantitativos");
    expect(ptQ.hero.backLink.href).toBe("/pt-BR/#work");

    expect(getCaseStudy("aegis", "pt-BR")).toBeDefined();
    expect(getCaseStudy("q", "pt-BR")).toBeDefined();
  });
});
