export const siteContent = {
  wordmark: "GUILHERME",
  heroEyebrow: "GUILHERME",
  heroTitle: "I build ambitious software systems.",
  heroDisciplines: "AI · Product Engineering · Data · Infrastructure",
  heroBody:
    "Software developer creating intelligent products, complex systems, and experiences that generate leverage.",
  heroCta: "Explore my work",
  // The approved destination is the first chapter in fixed order, not the
  // section anchor (docs/content.md, Identity).
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
} as const;

/*
 * Global navigation destinations are root-relative homepage fragments so the
 * same header works from the homepage and from a case-study route. `Back to
 * top` stays a bare fragment: every route provides its own `#top` anchor.
 */
export const siteNavigation = {
  skipLink: "Skip to content",
  wordmarkHref: "/#top",
  desktop: [
    { label: "Work", href: "/#work" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/#contact" },
  ],
  mobile: [
    { label: "Work", href: "/#work" },
    { label: "Contact", href: "/#contact" },
  ],
} as const;

export const footerContent = {
  copyright: "© 2026 Guilherme.",
  backToTop: "Back to top",
} as const;

export const siteMetadata = {
  title:
    "Guilherme — Software Developer | AI, Product, Data & Infrastructure",
  description:
    "A cinematic engineering portfolio featuring fraud intelligence, quantitative systems, government integration, and AI-first product development.",
} as const;
