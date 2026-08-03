import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { AegisSystemMap } from "@/components/case-study/aegis-system-map";
import { QSystemMap } from "@/components/case-study/q-system-map";
import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import {
  CaseStudyClosingSection,
  CaseStudySection,
} from "@/components/case-study/case-study-section";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { caseStudyBodySections, getCaseStudy } from "@/content/case-studies";
import { isValidLocale, defaultLocale, locales, type Locale } from "@/lib/i18n";

type PageProps = {
  params: Promise<{
    lang: string;
    slug: string;
  }> | Promise<unknown>;
};

export function generateStaticParams() {
  const slugs = ["aegis", "q"];
  const params: Array<{ lang: string; slug: string }> = [];

  for (const lang of locales) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolved = (await params) as { lang?: string; slug?: string } | undefined;
  const lang = resolved?.lang ?? defaultLocale;
  const slug = resolved?.slug ?? "";
  const locale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const caseStudy = getCaseStudy(slug, locale);

  if (!caseStudy) {
    return {};
  }

  return {
    title: caseStudy.metadata.title,
    description: caseStudy.metadata.description,
  };
}

export default async function DynamicCaseStudyPage({ params }: PageProps) {
  const resolved = (await params) as { lang?: string; slug?: string } | undefined;
  const lang = resolved?.lang ?? defaultLocale;
  const slug = resolved?.slug ?? "";
  const locale: Locale = isValidLocale(lang) ? lang : defaultLocale;
  const caseStudy = getCaseStudy(slug, locale);

  if (!caseStudy) {
    notFound();
  }

  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <CaseStudyShell>
          <CaseStudyHero hero={caseStudy.hero} />

          {caseStudyBodySections(caseStudy).map((section) => (
            <CaseStudySection key={section.id} section={section}>
              {section.id === caseStudy.system.id ? (
                slug === "aegis" ? (
                  <AegisSystemMap />
                ) : slug === "q" ? (
                  <QSystemMap />
                ) : null
              ) : null}
            </CaseStudySection>
          ))}

          <CaseStudyClosingSection closing={caseStudy.confidentiality} />
        </CaseStudyShell>
      </main>
      <SiteFooter />
    </>
  );
}
