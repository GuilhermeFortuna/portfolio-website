import type { Project } from "@/types/content";
import type { Locale } from "@/lib/i18n";

export function getProjects(locale: Locale = "en") {
  const isPt = locale === "pt-BR";
  const prefix = isPt ? "/pt-BR" : "";

  return [
    {
      slug: "aegis",
      index: "01",
      name: "Aegis",
      category: isPt ? "Inteligência contra fraudes" : "Fraud intelligence",
      summary: isPt
        ? "Software de inteligência e investigação de fraudes para a indústria de iGaming."
        : "Fraud intelligence and investigation software for the iGaming industry.",
      href: `${prefix}/work/aegis`,
    },
    {
      slug: "q",
      index: "02",
      name: "Quant",
      category: isPt ? "Sistemas quantitativos" : "Quantitative systems",
      summary: isPt
        ? "Sistema de pesquisa e execução quantitativa cobrindo backtesting, otimização, pipelines de dados e arquitetura de execução."
        : "A quantitative research and execution system covering backtesting, optimization, data pipelines, and execution architecture.",
      href: `${prefix}/work/q`,
    },
    {
      slug: "gosigapp",
      index: "03",
      name: "gosigapp",
      category: isPt ? "Automação do setor público" : "Public-sector automation",
      summary: isPt
        ? "Pipeline backend em Go para validação, processamento, tentativas, auditabilidade e envio de arquivos para o SIGAP."
        : "A Go backend pipeline for file validation, processing, retries, auditability, and submission to SIGAP.",
      href: `${prefix}/work/gosigapp`,
    },
    {
      slug: "nexo-dental",
      index: "04",
      name: "Nexo Dental",
      category: isPt ? "Software clínico" : "Clinical software",
      summary: isPt
        ? "Produto multi-tenant focado em IA para clínicas odontológicas, abrangendo fluxos de trabalho, CRM, operações e engenharia de interface premium."
        : "An AI-first, multi-tenant product for dental clinics spanning workflows, CRM, operations, and premium interface engineering.",
      href: null,
    },
  ] as const satisfies readonly Project[];
}

export const projects = getProjects("en");
