import type { Metadata } from "next";

import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import {
  CaseStudyClosingSection,
  CaseStudySection,
} from "@/components/case-study/case-study-section";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { aegisCaseStudy, caseStudyBodySections } from "@/content/case-studies";

export const metadata: Metadata = {
  title: aegisCaseStudy.metadata.title,
  description: aegisCaseStudy.metadata.description,
};

export default function AegisCaseStudyPage() {
  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <CaseStudyShell>
          <CaseStudyHero hero={aegisCaseStudy.hero} />

          {caseStudyBodySections(aegisCaseStudy).map((section) => (
            <CaseStudySection key={section.id} section={section} />
          ))}

          <CaseStudyClosingSection closing={aegisCaseStudy.confidentiality} />
        </CaseStudyShell>
      </main>
      <SiteFooter />
    </>
  );
}
