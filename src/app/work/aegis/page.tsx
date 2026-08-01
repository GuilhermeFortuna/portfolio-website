import type { Metadata } from "next";

import {
  AEGIS_CINEMATIC_MEDIA,
  AegisExperience,
} from "@/components/case-study/aegis/aegis-experience";
import { AegisSystemMap } from "@/components/case-study/aegis-system-map";
import {
  CaseStudyClosingSection,
  CaseStudySection,
} from "@/components/case-study/case-study-section";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import type { CaseStudySceneId } from "@/components/case-study/experience/case-study-scene-config";
import { CaseStudyHeroScene } from "@/components/case-study/experience/case-study-hero-scene";
import { CaseStudyScene } from "@/components/case-study/experience/case-study-scene";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { aegisCaseStudy, caseStudyBodySections } from "@/content/case-studies";

export const metadata: Metadata = {
  title: aegisCaseStudy.metadata.title,
  description: aegisCaseStudy.metadata.description,
};

const SECTION_SCENE_IDS = new Set<CaseStudySceneId>([
  "context",
  "problem",
  "system",
  "contribution",
  "delivered",
  "technology",
]);

function asSceneId(sectionId: string): CaseStudySceneId {
  if (!SECTION_SCENE_IDS.has(sectionId as CaseStudySceneId)) {
    throw new Error(`Unexpected Aegis section id for scene mapping: ${sectionId}`);
  }
  return sectionId as CaseStudySceneId;
}

export default function AegisCaseStudyPage() {
  const bodySections = caseStudyBodySections(aegisCaseStudy);
  const decisionSections = bodySections.filter((section) =>
    section.id.startsWith("decision-"),
  );
  const beforeDecisions = bodySections.filter(
    (section) =>
      section.id === "context" ||
      section.id === "problem" ||
      section.id === "system",
  );
  const afterDecisions = bodySections.filter(
    (section) =>
      section.id === "contribution" ||
      section.id === "delivered" ||
      section.id === "technology",
  );

  return (
    <>
      <SiteHeader />
      <main id="main-content" tabIndex={-1}>
        <AegisExperience>
          <CaseStudyShell>
            <CaseStudyScene id="hero">
              <CaseStudyHeroScene
                hero={aegisCaseStudy.hero}
                media={AEGIS_CINEMATIC_MEDIA}
              />
            </CaseStudyScene>

            {beforeDecisions.map((section) => (
              <CaseStudyScene key={section.id} id={asSceneId(section.id)}>
                <CaseStudySection section={section}>
                  {section.id === aegisCaseStudy.system.id ? (
                    <AegisSystemMap />
                  ) : null}
                </CaseStudySection>
              </CaseStudyScene>
            ))}

            <CaseStudyScene id="decisions">
              {decisionSections.map((section) => (
                <CaseStudySection key={section.id} section={section} />
              ))}
            </CaseStudyScene>

            {afterDecisions.map((section) => (
              <CaseStudyScene key={section.id} id={asSceneId(section.id)}>
                <CaseStudySection section={section} />
              </CaseStudyScene>
            ))}

            <CaseStudyScene id="confidentiality">
              <CaseStudyClosingSection
                closing={aegisCaseStudy.confidentiality}
              />
            </CaseStudyScene>
          </CaseStudyShell>
        </AegisExperience>
      </main>
      <SiteFooter />
    </>
  );
}
