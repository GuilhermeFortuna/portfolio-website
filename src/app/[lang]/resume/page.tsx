import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ResumePage } from "@/components/resume/resume-page";
import { getResumeContent } from "@/content/resume";
import { isPrefixedLocale, prefixedLocales, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

type PageProps = { params: Promise<{ lang: string }> };

function resolvePrefixedLocale(lang: string | undefined): Locale {
  if (!lang || !isPrefixedLocale(lang)) notFound();
  return lang;
}

export function generateStaticParams() {
  return prefixedLocales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolvePrefixedLocale(lang);
  const resume = getResumeContent(locale);
  return createPageMetadata({ locale, pathname: "/resume", title: resume.metadata.title, description: resume.metadata.description });
}

export default async function PortugueseResumePage({ params }: PageProps) {
  const { lang } = await params;
  return <ResumePage locale={resolvePrefixedLocale(lang)} />;
}
