import type { ResumeContent, ResumeLabels } from "@/types/resume";
import type { Locale } from "@/lib/i18n";

const sharedLinks = (labels: ResumeLabels) => [
  { label: labels.email, href: "mailto:guilhermefortuna.dev@gmail.com", kind: "email" as const },
  { label: labels.phone, href: "tel:+5548991814229", kind: "phone" as const },
  { label: labels.website, href: "https://guilhermefortuna.dev", kind: "website" as const },
  { label: labels.github, href: "https://github.com/GuilhermeFortuna", kind: "github" as const },
  {
    label: labels.linkedin,
    href: "https://www.linkedin.com/in/guilherme-fortuna-dos-santos/",
    kind: "linkedin" as const,
  },
] as const;

const englishLabels: ResumeLabels = {
  skills: "Technical Skills",
  experience: "Work Experience",
  education: "Education and International Experience",
  languages: "Languages",
  viewPdf: "View PDF",
  downloadPdf: "Download PDF",
  email: "Email",
  phone: "Phone",
  website: "Website",
  github: "GitHub",
  linkedin: "LinkedIn",
  contact: "Contact",
  returnToWork: "Return to Work",
};

const portugueseLabels: ResumeLabels = {
  skills: "Competências Técnicas",
  experience: "Experiência Profissional",
  education: "Educação e Experiência Internacional",
  languages: "Idiomas",
  viewPdf: "Ver PDF",
  downloadPdf: "Baixar PDF",
  email: "E-mail",
  phone: "Telefone",
  website: "Site",
  github: "GitHub",
  linkedin: "LinkedIn",
  contact: "Contato",
  returnToWork: "Voltar ao Trabalho",
};

const english: ResumeContent = {
  locale: "en",
  metadata: {
    title: "Guilherme Fortuna — Full-stack Developer | Python, TypeScript & Platform Systems",
    description:
      "Full-stack developer with 5+ years building production web applications, distributed systems, data platforms, and cloud infrastructure.",
  },
  identity: {
    name: "Guilherme Fortuna",
    role: "Full-stack Developer",
    focus: "Python, TypeScript & Platform Systems",
    summary:
      "Full-stack developer with 5+ years building software systems, including professional experience delivering production web applications, distributed systems and APIs, data platforms, and cloud infrastructure.",
  },
  location: "Criciúma, Brazil",
  availability: "Available and actively looking for a remote position.",
  links: sharedLinks(englishLabels),
  skills: [
    { label: "Languages", items: ["Python", "TypeScript", "JavaScript", "Go", "SQL"] },
    { label: "Frontend and UI", items: ["React", "Next.js", "Vite", "Tauri", "Tailwind CSS", "TanStack Query", "Zustand"] },
    { label: "Backend and APIs", items: ["FastAPI", "Node.js", "RESTful APIs", "PostgreSQL", "Redis", "Databricks", "WebSockets"] },
    { label: "Cloud and DevOps", items: ["AWS (ECS/Fargate, S3, EventBridge)", "Docker", "GitHub Actions", "Jenkins", "Linux", "CI/CD"] },
    { label: "Data and AI systems", items: ["ETL Data Pipelines", "Parquet", "Pandas", "LLM Tooling & Evaluation"] },
    { label: "Security and quality", items: ["Mutual TLS (mTLS)", "X.509/PFX", "RSA-SHA256", "Pytest", "Playwright", "Vitest"] },
  ],
  experience: [
    {
      organization: "BRXBET & RICOBET",
      role: "Software Developer — Integrations & Data Platforms",
      period: "Sep 2025 – Jul 2026 · Remote",
      location: "Remote",
      highlights: [
        "GoSIGAPP Regulatory Gateway: Architected and deployed a production Go microservice for Brazilian regulatory compliance (SIGAP), implementing mutual TLS (mTLS), RSA-SHA256 payload signing, automated XML validation, and X.509/PFX certificate handling with resilient failure recovery.",
        "Aegis Fraud Intelligence: Engineered a full-stack fraud investigation platform using FastAPI, PostgreSQL, Databricks, and Redis; built concurrent ETL synchronization jobs processing high-volume player, financial, and event data to accelerate analyst investigations from hours to sub-minute operational lookups.",
        "Platform Integrations: Built integration services and APIs connecting gaming platforms, analytics pipelines, third-party payment providers, and government endpoints with isolated configurations and retry handling.",
        "Cloud Infrastructure: Containerized and operated APIs and background worker workloads on AWS ECS/Fargate, S3, and EventBridge with structured logging, alerting, and automated failure recovery.",
      ],
    },
    {
      organization: "Jones Software",
      role: "Software Developer / Data Analyst",
      period: "Jul 2024 – Sep 2025 · Remote",
      location: "Remote",
      highlights: [
        "Automated Data Pipelines: Built Python ingestion pipelines converting unstructured OCR output from insurance certificates into validated, structured datasets used in compliance audit workflows.",
        "LLM Verification Tooling: Developed verification and evaluation tooling in Python and Node.js for LLM prompt testing, structural JSON comparisons, concurrent batch processing, and automated reporting.",
        "Test Automation & Delivery: Automated test suites using Pytest and integrated workflows with AWS S3 and Jenkins CI pipelines to ensure data integrity and continuous verification.",
      ],
    },
  ],
  education: [
    { institution: "Savonia University of Applied Sciences (Kuopio, Finland) & SATC (Brazil)", program: "Mechanical Engineering & Academic Exchange", period: "2014 – 2018" },
    { institution: "SATC (Brazil)", program: "Software Engineering (In Progress)", period: "2024 – Present" },
    { institution: "SATC (Brazil)", program: "Technical Diploma in Electromechanics", period: "2011 – 2013" },
  ],
  languages: ["English: Bilingual / Full Professional Proficiency (TOEFL iBT 105)", "Portuguese: Native"],
  labels: englishLabels,
  pdf: { href: "/resume/guilherme-fortuna-resume-en.pdf", downloadName: "guilherme-fortuna-resume-en.pdf" },
};

const portuguese: ResumeContent = {
  ...english,
  locale: "pt-BR",
  metadata: {
    title: "Guilherme Fortuna — Desenvolvedor Full-stack | Python, TypeScript e Sistemas de Plataforma",
    description:
      "Desenvolvedor full-stack com mais de 5 anos criando aplicações web em produção, sistemas distribuídos, plataformas de dados e infraestrutura em nuvem.",
  },
  identity: {
    name: "Guilherme Fortuna",
    role: "Desenvolvedor Full-stack",
    focus: "Python, TypeScript e Sistemas de Plataforma",
    summary:
      "Desenvolvedor full-stack com mais de 5 anos criando sistemas de software, incluindo experiência profissional com aplicações web em produção, sistemas distribuídos e APIs, plataformas de dados e infraestrutura em nuvem.",
  },
  location: "Criciúma, Brasil",
  availability: "Disponível e buscando ativamente uma posição remota.",
  links: sharedLinks(portugueseLabels),
  skills: [
    { label: "Linguagens", items: ["Python", "TypeScript", "JavaScript", "Go", "SQL"] },
    { label: "Frontend e UI", items: ["React", "Next.js", "Vite", "Tauri", "Tailwind CSS", "TanStack Query", "Zustand"] },
    { label: "Backend e APIs", items: ["FastAPI", "Node.js", "APIs RESTful", "PostgreSQL", "Redis", "Databricks", "WebSockets"] },
    { label: "Nuvem e DevOps", items: ["AWS (ECS/Fargate, S3, EventBridge)", "Docker", "GitHub Actions", "Jenkins", "Linux", "CI/CD"] },
    { label: "Dados e IA", items: ["Pipelines ETL", "Parquet", "Pandas", "Ferramentas e avaliação de LLMs"] },
    { label: "Segurança e QA", items: ["TLS mútuo (mTLS)", "X.509/PFX", "RSA-SHA256", "Pytest", "Playwright", "Vitest"] },
  ],
  experience: [
    {
      organization: "BRXBET & RICOBET",
      role: "Desenvolvedor — Integrações e Plataformas de Dados",
      period: "Set 2025 – Jul 2026 · Remoto",
      location: "Remoto",
      highlights: [
        "Gateway regulatório GoSIGAPP: Projetei e implantei em produção um microsserviço Go para conformidade regulatória brasileira (SIGAP), com TLS mútuo (mTLS), assinatura de payloads RSA-SHA256, validação automática de XML, gestão de certificados X.509/PFX e recuperação resiliente de falhas.",
        "Aegis - Inteligência antifraude: Desenvolvi uma plataforma full-stack de investigação de fraudes com FastAPI, PostgreSQL, Databricks e Redis; criei rotinas ETL concorrentes para sincronizar grandes volumes de dados de jogadores, finanças e eventos, reduzindo investigações de horas para consultas operacionais de menos de um minuto.",
        "Integrações de plataformas: Criei serviços de integração e APIs conectando plataformas de jogos, pipelines analíticos, provedores de pagamento e endpoints governamentais, com configurações isoladas e tratamento de novas tentativas.",
        "Infraestrutura em nuvem: Containerizei e operei APIs e workers em segundo plano no AWS ECS/Fargate, S3 e EventBridge, com logs estruturados, alertas e recuperação automática de falhas.",
      ],
    },
    {
      organization: "Jones Software",
      role: "Desenvolvedor de Software / Analista de Dados",
      period: "Jul 2024 – Set 2025 · Remoto",
      location: "Remoto",
      highlights: [
        "Pipelines de dados automatizados: Criei pipelines de ingestão em Python para converter saídas não estruturadas de OCR de certificados de seguro em dados estruturados e validados, usados em auditorias de conformidade.",
        "Ferramentas de verificação de LLMs: Desenvolvi ferramentas em Python e Node.js para testes de prompts, avaliação, comparação estrutural de JSON, processamento concorrente em lote e geração automática de relatórios.",
        "Automação de testes e entrega: Automatizei suítes de testes com Pytest e integrei fluxos com AWS S3 e pipelines de CI no Jenkins para garantir a integridade dos dados e a verificação contínua.",
      ],
    },
  ],
  education: [
    { institution: "Savonia University of Applied Sciences (Kuopio, Finlândia) e SATC (Brasil)", program: "Engenharia Mecânica e Intercâmbio Acadêmico", period: "2014 – 2018" },
    { institution: "SATC (Brasil)", program: "Engenharia de Software (Em andamento)", period: "2024 – Atual" },
    { institution: "SATC (Brasil)", program: "Técnico em Eletromecânica", period: "2011 – 2013" },
  ],
  languages: ["Inglês: Bilíngue / Plena proficiência profissional (TOEFL iBT 105)", "Português: Nativo"],
  labels: portugueseLabels,
  pdf: { href: "/resume/guilherme-fortuna-resume-pt-BR.pdf", downloadName: "guilherme-fortuna-resume-pt-BR.pdf" },
};

const resumeContent: Record<Locale, ResumeContent> = { en: english, "pt-BR": portuguese };

export function getResumeContent(locale: Locale = "en"): ResumeContent {
  return resumeContent[locale] ?? english;
}
