import type { Metadata } from "next";

import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import {
  CaseStudyClosingSection,
  CaseStudySection,
} from "@/components/case-study/case-study-section";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { QSystemMap } from "@/components/case-study/q-system-map";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { caseStudyBodySections, qCaseStudy } from "@/content/case-studies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/work/q",
  title: qCaseStudy.metadata.title,
  description: qCaseStudy.metadata.description,
  type: "article",
  images: [
    {
      url: qCaseStudy.hero.media.src,
      width: qCaseStudy.hero.media.width,
      height: qCaseStudy.hero.media.height,
      alt: qCaseStudy.hero.media.alt,
    },
  ],
});

export default function QuantCaseStudyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <CaseStudyShell>
          <CaseStudyHero hero={qCaseStudy.hero} />

          {caseStudyBodySections(qCaseStudy).map((section) => (
            <CaseStudySection key={section.id} section={section}>
              {/* The map belongs to the system section only. */}
              {section.id === qCaseStudy.system.id ? (
                <QSystemMap locale="en" />
              ) : null}
            </CaseStudySection>
          ))}

          <CaseStudyClosingSection closing={qCaseStudy.confidentiality} />
        </CaseStudyShell>
      </main>
      <SiteFooter />
    </>
  );
}
