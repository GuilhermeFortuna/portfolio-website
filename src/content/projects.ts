import type { Project } from "@/types/content";

/*
 * `href` is the project's own case-study route, and stays `null` until that
 * route exists. Aegis is the only chapter published so far; a `null` here is a
 * deliberate pending destination, never a placeholder to invent a URL for.
 */
export const projects = [
  {
    slug: "aegis",
    index: "01",
    name: "Aegis",
    category: "Fraud intelligence",
    summary:
      "Fraud intelligence and investigation software for the iGaming industry.",
    href: "/work/aegis",
  },
  {
    slug: "q",
    index: "02",
    name: "Quant",
    category: "Quantitative systems",
    summary:
      "A quantitative research and execution system covering backtesting, optimization, data pipelines, and execution architecture.",
    href: "/work/q",
  },
  {
    slug: "gosigapp",
    index: "03",
    name: "gosigapp",
    category: "Public-sector automation",
    summary:
      "A Go backend pipeline for file validation, processing, retries, auditability, and submission to SIGAP.",
    href: null,
  },
  {
    slug: "nexo-dental",
    index: "04",
    name: "Nexo Dental",
    category: "Clinical software",
    summary:
      "An AI-first, multi-tenant product for dental clinics spanning workflows, CRM, operations, and premium interface engineering.",
    href: null,
  },
] as const satisfies readonly Project[];
