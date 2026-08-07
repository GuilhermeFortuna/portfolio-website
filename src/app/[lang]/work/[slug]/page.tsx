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
import { isPrefixedLocale, prefixedLocales, type Locale } from "@/lib/i18n";
import { createPageMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    lang: string;
    slug: string;
  }>;
};

function resolvePrefixedLocale(lang: string | undefined): Locale {
  if (!lang || !isPrefixedLocale(lang)) {
    notFound();
  }
  return lang;
}

export function generateStaticParams() {
  const slugs = ["aegis", "q"];
  const params: Array<{ lang: string; slug: string }> = [];

  for (const lang of prefixedLocales) {
    for (const slug of slugs) {
      params.push({ lang, slug });
    }
  }

  return params;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolvePrefixedLocale(lang);
  const caseStudy = getCaseStudy(slug, locale);

  if (!caseStudy) {
    return {};
  }

  const image = caseStudy.hero.media
    ? {
        url: caseStudy.hero.media.src,
        width: caseStudy.hero.media.width,
        height: caseStudy.hero.media.height,
        alt: caseStudy.hero.media.alt,
      }
    : caseStudy.hero.video
      ? {
          url: caseStudy.hero.video.poster,
          width: caseStudy.hero.video.width,
          height: caseStudy.hero.video.height,
          alt: caseStudy.hero.video.ariaLabel,
        }
      : undefined;

  return createPageMetadata({
    locale,
    pathname: `/work/${slug}`,
    title: caseStudy.metadata.title,
    description: caseStudy.metadata.description,
    type: "article",
    images: image ? [image] : undefined,
  });
}

export default async function DynamicCaseStudyPage({ params }: PageProps) {
  const { lang, slug } = await params;
  const locale = resolvePrefixedLocale(lang);
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
                  <QSystemMap locale={locale} />
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
