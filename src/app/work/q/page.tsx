import type { Metadata } from "next";

import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import {
  CaseStudyClosingSection,
  CaseStudySection,
} from "@/components/case-study/case-study-section";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import { QSystemMap } from "@/components/case-study/q-system-map";
import { LanguageProvider } from "@/components/i18n/language-context";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { caseStudyBodySections, qCaseStudy } from "@/content/case-studies";

export const metadata: Metadata = {
  title: qCaseStudy.metadata.title,
  description: qCaseStudy.metadata.description,
};

export default function QuantCaseStudyPage() {
  return (
    <LanguageProvider locale="en">
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <CaseStudyShell>
          <CaseStudyHero hero={qCaseStudy.hero} />

          {caseStudyBodySections(qCaseStudy).map((section) => (
            <CaseStudySection key={section.id} section={section}>
              {/* The map belongs to the system section only. */}
              {section.id === qCaseStudy.system.id ? <QSystemMap /> : null}
            </CaseStudySection>
          ))}

          <CaseStudyClosingSection closing={qCaseStudy.confidentiality} />
        </CaseStudyShell>
      </main>
      <SiteFooter />
    </LanguageProvider>
  );
}
