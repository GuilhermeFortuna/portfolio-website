import type { Metadata } from "next";

import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import {
  CaseStudyClosingSection,
  CaseStudySection,
} from "@/components/case-study/case-study-section";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { LanguageProvider } from "@/components/i18n/language-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import {
  caseStudyBodySections,
  nexoDentalCaseStudy,
} from "@/content/case-studies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/work/nexo-dental",
  title: nexoDentalCaseStudy.metadata.title,
  description: nexoDentalCaseStudy.metadata.description,
  type: "article",
  images: [
    {
      url: "/work/nexo-dental/shell-identity.webp",
      width: 2560,
      height: 1440,
      alt: "The Nexo Dental application shell on Clinic Pulse, with brand identity, role navigation, and an operational home dashboard populated from fixture data.",
    },
  ],
});

export default function NexoDentalCaseStudyPage() {
  return (
    <LanguageProvider locale="en">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <CaseStudyShell>
          <CaseStudyHero hero={nexoDentalCaseStudy.hero} />

          {caseStudyBodySections(nexoDentalCaseStudy).map((section) => (
            <CaseStudySection key={section.id} section={section} />
          ))}

          <CaseStudyClosingSection
            closing={nexoDentalCaseStudy.confidentiality}
          />
        </CaseStudyShell>
      </main>
      <SiteFooter />
    </LanguageProvider>
  );
}
