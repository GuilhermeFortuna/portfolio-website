import type { Locale } from "@/lib/i18n";

export interface SiteContent {
  wordmark: string;
  heroEyebrow: string;
  heroTitle: string;
  heroDisciplines: string;
  heroBody: string;
  heroCta: string;
  heroCtaHref: string;
  heroGithubLabel: string;
  heroGithubHref: string;

  processLabel: string;
  processTitle: string;
  processSequence: string;
  processBody: string;

  aboutLabel: string;
  aboutTitle: string;
  aboutBody: string[];
  aboutTimezone: string;
  aboutAvailability: string;
  aboutGithubLabel: string;
  aboutGithubHref: string;
  aboutWakatimeLabel: string;
  aboutWakatimeHref: string;

  workLabel: string;
  workTitle: string;

  contactLabel: string;
  contactTitle: string;
  contactManifesto: string;
  contactLocation: string;
  contactAvailability: string;
  contactActions: Array<{
    label: string;
    href: string;
  }>;
}

export interface NavItem {
  label: string;
  href: string;
}

export interface SiteNavigation {
  skipLink: string;
  wordmarkHref: string;
  desktop: NavItem[];
  mobile: NavItem[];
}

export interface FooterContent {
  copyright: string;
  backToTop: string;
}

export interface SiteMetadata {
  title: string;
  description: string;
}

const siteContentMap: Record<Locale, SiteContent> = {
  en: {
    wordmark: "GUILHERME",
    heroEyebrow: "GUILHERME",
    heroTitle: "I build ambitious software systems.",
    heroDisciplines: "AI · Product Engineering · Data · Infrastructure",
    heroBody:
      "Software developer creating intelligent products, complex systems, and experiences that generate leverage.",
    heroCta: "Explore my work",
    heroCtaHref: "/work/aegis",
    heroGithubLabel: "View GitHub",
    heroGithubHref: "https://github.com/GuilhermeFortuna",

    processLabel: "PROCESS",
    processTitle: "From difficult idea to working system.",
    processSequence:
      "IDEA → ARCHITECTURE → AGENTS → IMPLEMENTATION → TESTING → DEPLOYMENT",
    processBody:
      "I combine system design, AI-native execution, and rigorous validation to turn ambitious product ideas into dependable software.",

    aboutLabel: "ABOUT",
    aboutTitle: "Software Engineer · AI, Data & Product Systems",
    aboutBody: [
      "I’m a software developer focused on building ambitious, intelligent systems that solve complex problems. My work spans AI-powered products, data-intensive applications, quantitative research, backend infrastructure, and polished frontend experiences.",
      "I combine strong engineering fundamentals with product thinking and a relentless drive to turn difficult ideas into reliable, usable software. I don’t just write code—I design and build complete systems from concept to deployment.",
    ],
    aboutTimezone: "Brasília / São Paulo time zone",
    aboutAvailability: "Available and actively looking for a remote position.",
    aboutGithubLabel: "GitHub",
    aboutGithubHref: "https://github.com/GuilhermeFortuna",
    aboutWakatimeLabel: "WakaTime",
    aboutWakatimeHref: "https://wakatime.com/@GuilhermeFortuna",

    workLabel: "WORK",
    workTitle: "Work",

    contactLabel: "CONTACT",
    contactTitle: "Let’s build something difficult.",
    contactManifesto:
      "I don’t just create code. I build systems that turn ambitious ideas into reality.",
    contactLocation: "Brazil",
    contactAvailability: "Available and actively looking for a remote position.",
    contactActions: [
      {
        label: "Email me",
        href: "mailto:guilhermefortuna1000@gmail.com",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/guilherme-fortuna-dos-santos/",
      },
      {
        label: "GitHub",
        href: "https://github.com/GuilhermeFortuna",
      },
    ],
  },
  "pt-BR": {
    wordmark: "GUILHERME",
    heroEyebrow: "GUILHERME",
    heroTitle: "Desenvolvo sistemas de software ambiciosos.",
    heroDisciplines: "IA · Engenharia de Produto · Dados · Infraestrutura",
    heroBody:
      "Desenvolvedor de software criando produtos inteligentes, sistemas complexos e experiências de alto impacto.",
    heroCta: "Explore meu trabalho",
    heroCtaHref: "/pt-BR/work/aegis",
    heroGithubLabel: "Ver GitHub",
    heroGithubHref: "https://github.com/GuilhermeFortuna",

    processLabel: "PROCESSO",
    processTitle: "De uma ideia complexa a um sistema em funcionamento.",
    processSequence:
      "IDEIA → ARQUITETURA → AGENTES → IMPLEMENTAÇÃO → TESTES → IMPLANTAÇÃO",
    processBody:
      "Combino design de sistemas, execução nativa em IA e validação rigorosa para transformar ideias ambiciosas em software confiável.",

    aboutLabel: "SOBRE",
    aboutTitle: "Engenheiro de Software · Sistemas de IA, Dados e Produto",
    aboutBody: [
      "Sou um desenvolvedor de software focado em construir sistemas inteligentes e ambiciosos para resolver problemas complexos. Meu trabalho abrange produtos alimentados por IA, aplicações com uso intensivo de dados, pesquisa quantitativa, infraestrutura backend e experiências frontend refinadas.",
      "Combino sólidas bases de engenharia com visão de produto e um impulso incessante para transformar ideias desafiadoras em software confiável e funcional. Não apenas escrevo código—projeto e construo sistemas completos, do conceito à implantação.",
    ],
    aboutTimezone: "Fuso horário de Brasília / São Paulo",
    aboutAvailability: "Disponível e buscando ativamente oportunidades remotas.",
    aboutGithubLabel: "GitHub",
    aboutGithubHref: "https://github.com/GuilhermeFortuna",
    aboutWakatimeLabel: "WakaTime",
    aboutWakatimeHref: "https://wakatime.com/@GuilhermeFortuna",

    workLabel: "TRABALHO",
    workTitle: "Trabalho",

    contactLabel: "CONTATO",
    contactTitle: "Vamos construir algo desafiador.",
    contactManifesto:
      "Não apenas crio código. Construo sistemas que transformam ideias ambiciosas em realidade.",
    contactLocation: "Brasil",
    contactAvailability: "Disponível e buscando ativamente oportunidades remotas.",
    contactActions: [
      {
        label: "Enviar e-mail",
        href: "mailto:guilhermefortuna1000@gmail.com",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/guilherme-fortuna-dos-santos/",
      },
      {
        label: "GitHub",
        href: "https://github.com/GuilhermeFortuna",
      },
    ],
  },
};

export function getSiteContent(locale: Locale = "en"): SiteContent {
  return siteContentMap[locale] ?? siteContentMap.en;
}

export function getSiteNavigation(locale: Locale = "en"): SiteNavigation {
  const isPt = locale === "pt-BR";
  const prefix = isPt ? "/pt-BR" : "";

  return {
    skipLink: isPt ? "Ir para o conteúdo principal" : "Skip to content",
    wordmarkHref: `${prefix}/#top`,
    desktop: [
      { label: isPt ? "Trabalho" : "Work", href: `${prefix}/#work` },
      { label: isPt ? "Processo" : "Process", href: `${prefix}/#process` },
      { label: isPt ? "Sobre" : "About", href: `${prefix}/#about` },
      { label: isPt ? "Contato" : "Contact", href: `${prefix}/#contact` },
    ],
    mobile: [
      { label: isPt ? "Trabalho" : "Work", href: `${prefix}/#work` },
      { label: isPt ? "Contato" : "Contact", href: `${prefix}/#contact` },
    ],
  };
}

export function getFooterContent(locale: Locale = "en"): FooterContent {
  const isPt = locale === "pt-BR";
  return {
    copyright: "© 2026 Guilherme.",
    backToTop: isPt ? "Voltar ao topo" : "Back to top",
  };
}

export function getSiteMetadata(locale: Locale = "en"): SiteMetadata {
  if (locale === "pt-BR") {
    return {
      title:
        "Guilherme — Desenvolvedor de Software | IA, Produto, Dados e Infraestrutura",
      description:
        "Um portfólio de engenharia focado em inteligência contra fraudes, sistemas quantitativos, integração governamental e desenvolvimento de produtos voltados para IA.",
    };
  }

  return {
    title:
      "Guilherme — Software Developer | AI, Product, Data & Infrastructure",
    description:
      "A cinematic engineering portfolio featuring fraud intelligence, quantitative systems, government integration, and AI-first product development.",
  };
}

export const siteContent = getSiteContent("en");
export const siteNavigation = getSiteNavigation("en");
export const footerContent = getFooterContent("en");
export const siteMetadata = getSiteMetadata("en");
