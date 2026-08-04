import type { Metadata } from "next";

import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import {
  CaseStudyClosingSection,
  CaseStudySection,
} from "@/components/case-study/case-study-section";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { GosigappSystemMap } from "@/components/case-study/gosigapp-system-map";
import { LanguageProvider } from "@/components/i18n/language-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { caseStudyBodySections, gosigappCaseStudy } from "@/content/case-studies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  locale: "en",
  pathname: "/work/gosigapp",
  title: gosigappCaseStudy.metadata.title,
  description: gosigappCaseStudy.metadata.description,
  type: "article",
  images: [
    {
      url: "/work/gosigapp/system-map.svg",
      width: 1200,
      height: 680,
      alt: "Vector architecture diagram showing the gosigapp end-to-end regulatory pipeline from S3 data fetch through XSD validation, PFX signing, mTLS transport, and DynamoDB log store.",
    },
  ],
});

export default function GosigappCaseStudyPage() {
  return (
    <LanguageProvider locale="en">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <CaseStudyShell>
          <CaseStudyHero hero={gosigappCaseStudy.hero} />

          {caseStudyBodySections(gosigappCaseStudy).map((section) => (
            <CaseStudySection key={section.id} section={section}>
              {/* The system map belongs to the system section only. */}
              {section.id === gosigappCaseStudy.system.id ? (
                <GosigappSystemMap />
              ) : null}
            </CaseStudySection>
          ))}

          <CaseStudyClosingSection closing={gosigappCaseStudy.confidentiality} />
        </CaseStudyShell>
      </main>
      <SiteFooter />
    </LanguageProvider>
  );
}
