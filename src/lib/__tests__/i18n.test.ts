import { describe, expect, it } from "vitest";
import { getSiteContent, getSiteNavigation, getSiteMetadata, getFooterContent } from "@/content/site";
import { getProjects } from "@/content/projects";
import {
  caseStudyBodySections,
  getAegisCaseStudy,
  getQCaseStudy,
  getCaseStudy,
} from "@/content/case-studies";
import {
  isValidLocale,
  isPrefixedLocale,
  locales,
  defaultLocale,
  prefixedLocales,
  getLocaleFromPathname,
  stripLocalePrefix,
  localizePathname,
  getHtmlLang,
} from "@/lib/i18n";

describe("i18n infrastructure & Brazilian Portuguese content", () => {
  it("defines valid locales and defaults", () => {
    expect(locales).toEqual(["en", "pt-BR"]);
    expect(defaultLocale).toBe("en");
    expect(prefixedLocales).toEqual(["pt-BR"]);
    expect(isValidLocale("en")).toBe(true);
    expect(isValidLocale("pt-BR")).toBe(true);
    expect(isValidLocale("fr")).toBe(false);
    expect(isPrefixedLocale("en")).toBe(false);
    expect(isPrefixedLocale("pt-BR")).toBe(true);
    expect(isPrefixedLocale("fr")).toBe(false);
  });

  it("maps document language tags and path locales", () => {
    expect(getHtmlLang("en")).toBe("en");
    expect(getHtmlLang("pt-BR")).toBe("pt-BR");
    expect(getLocaleFromPathname("/")).toBeNull();
    expect(getLocaleFromPathname("/work/aegis")).toBeNull();
    expect(getLocaleFromPathname("/en")).toBe("en");
    expect(getLocaleFromPathname("/en/work/aegis")).toBe("en");
    expect(getLocaleFromPathname("/pt-BR")).toBe("pt-BR");
    expect(getLocaleFromPathname("/pt-BR/work/q")).toBe("pt-BR");
    expect(getLocaleFromPathname("/fr")).toBeNull();
  });

  it("localizes and strips locale prefixes without duplicating English routes", () => {
    expect(stripLocalePrefix("/en")).toBe("/");
    expect(stripLocalePrefix("/en/work/aegis")).toBe("/work/aegis");
    expect(stripLocalePrefix("/pt-BR/work/q")).toBe("/work/q");
    expect(localizePathname("/", "en")).toBe("/");
    expect(localizePathname("/work/aegis", "en")).toBe("/work/aegis");
    expect(localizePathname("/pt-BR/work/aegis", "en")).toBe("/work/aegis");
    expect(localizePathname("/", "pt-BR")).toBe("/pt-BR");
    expect(localizePathname("/work/aegis", "pt-BR")).toBe("/pt-BR/work/aegis");
    expect(localizePathname("/en/work/aegis", "pt-BR")).toBe("/pt-BR/work/aegis");
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
    const enAegis = getAegisCaseStudy("en");
    const ptAegis = getAegisCaseStudy("pt-BR");
    expect(ptAegis.hero.category).toBe("Inteligência contra fraudes");
    expect(ptAegis.hero.backLink.href).toBe("/pt-BR/#work");
    expect(ptAegis.metadata).toEqual({
      title: "Aegis — Plataforma de Inteligência contra Fraudes em Produção",
      description:
        "Como projetei e construí uma plataforma de investigação de fraudes em produção para o iGaming brasileiro, de regras explicáveis e pipelines de dados a segurança e WebGL.",
    });
    expect(ptAegis.hero.facts).toEqual([
      { label: "Papel", value: "Desenvolvedor de Software" },
      { label: "Período", value: "Abril de 2026–presente" },
      { label: "Estado", value: "Implantado em produção" },
      { label: "Código-fonte", value: "Privado" },
    ]);
    expect(
      caseStudyBodySections(ptAegis).map((section) => section.id),
    ).toEqual(caseStudyBodySections(enAegis).map((section) => section.id));
    expect(ptAegis.system.images?.[0].alt).toContain("Tela de visão geral");
    expect(ptAegis.delivered?.paragraphs.join(" ")).toContain(
      "até onde sei, continua ativo",
    );
    expect(ptAegis.delivered?.paragraphs.join(" ")).toContain(
      "suíte E2E de navegador está escrita, mas ignorada",
    );
    expect(ptAegis.confidentiality.actions[1]).toEqual({
      label: "Conversar sobre o Aegis",
      href: "/pt-BR/#contact",
    });

    const ptQ = getQCaseStudy("pt-BR");
    expect(ptQ.hero.category).toBe("Sistemas quantitativos");
    expect(ptQ.hero.backLink.href).toBe("/pt-BR/#work");

    expect(getCaseStudy("aegis", "pt-BR")).toBeDefined();
    expect(getCaseStudy("q", "pt-BR")).toBeDefined();
  });
});
