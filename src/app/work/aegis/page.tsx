import type { Metadata } from "next";

import {
  AEGIS_APERTURE_MEDIA,
  AEGIS_APERTURE_WAYPOINTS,
} from "@/components/case-study/aegis/aegis-aperture-config";
import {
  AEGIS_CHAPTERS,
  AEGIS_CINEMATIC_MEDIA,
  AegisChapterInstrument,
  AegisExperience,
} from "@/components/case-study/aegis/aegis-experience";
import { AEGIS_SCENE_DEFINITIONS } from "@/components/case-study/experience/case-study-scene-config";
import { AegisSystemMap } from "@/components/case-study/aegis-system-map";
import {
  CaseStudyClosingSection,
  CaseStudySection,
} from "@/components/case-study/case-study-section";
import { CaseStudyShell } from "@/components/case-study/case-study-shell";
import type { CaseStudySceneId } from "@/components/case-study/experience/case-study-scene-config";
import { CaseStudyHeroScene } from "@/components/case-study/experience/case-study-hero-scene";
import { CaseStudyScene } from "@/components/case-study/experience/case-study-scene";
import {
  CaseStudyNarrativeScenes,
  NarrativeSceneSlot,
} from "@/components/case-study/experience/case-study-narrative-scenes";
import styles from "@/components/case-study/experience/case-study-experience.module.css";
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

function waypointFor(sceneId: CaseStudySceneId) {
  const waypoint = AEGIS_APERTURE_WAYPOINTS.find(
    (entry) => entry.sceneId === sceneId,
  );
  if (!waypoint) {
    throw new Error(`Missing Aegis aperture waypoint for scene: ${sceneId}`);
  }
  return waypoint;
}

const SLOT_CLASS: Partial<Record<CaseStudySceneId, string>> = {
  context: styles.slotContext,
  problem: styles.slotProblem,
  system: styles.slotSystem,
  decisions: styles.slotDecisions,
  contribution: styles.slotContribution,
  delivered: styles.slotDelivered,
  technology: styles.slotTechnology,
  confidentiality: styles.slotConfidentiality,
};

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

            <CaseStudyNarrativeScenes
              waypoints={AEGIS_APERTURE_WAYPOINTS}
              scenes={AEGIS_SCENE_DEFINITIONS}
              mediaByKey={AEGIS_APERTURE_MEDIA}
            >
              {beforeDecisions.map((section) => {
                const sceneId = asSceneId(section.id);
                const waypoint = waypointFor(sceneId);
                return (
                  <CaseStudyScene key={section.id} id={sceneId}>
                    <CaseStudySection section={section}>
                      {section.id === aegisCaseStudy.system.id ? (
                        <div className={styles.systemCompose}>
                          <NarrativeSceneSlot
                            waypoint={waypoint}
                            className={SLOT_CLASS.system}
                          />
                          <AegisSystemMap />
                        </div>
                      ) : (
                        <NarrativeSceneSlot
                          waypoint={waypoint}
                          className={SLOT_CLASS[sceneId]}
                        />
                      )}
                    </CaseStudySection>
                  </CaseStudyScene>
                );
              })}

              <CaseStudyScene id="decisions">
                <div className="flex flex-col gap-8">
                  <NarrativeSceneSlot
                    waypoint={waypointFor("decisions")}
                    className={SLOT_CLASS.decisions}
                  />
                  {decisionSections.map((section) => (
                    <CaseStudySection key={section.id} section={section} />
                  ))}
                </div>
              </CaseStudyScene>

              {afterDecisions.map((section) => {
                const sceneId = asSceneId(section.id);
                const waypoint = waypointFor(sceneId);
                return (
                  <CaseStudyScene key={section.id} id={sceneId}>
                    <CaseStudySection section={section}>
                      <NarrativeSceneSlot
                        waypoint={waypoint}
                        className={SLOT_CLASS[sceneId]}
                      />
                    </CaseStudySection>
                  </CaseStudyScene>
                );
              })}

              <CaseStudyScene id="confidentiality">
                <div className="flex flex-col gap-8">
                  <NarrativeSceneSlot
                    waypoint={waypointFor("confidentiality")}
                    className={SLOT_CLASS.confidentiality}
                  />
                  <CaseStudyClosingSection
                    closing={aegisCaseStudy.confidentiality}
                  />
                </div>
              </CaseStudyScene>
            </CaseStudyNarrativeScenes>

            <AegisChapterInstrument chapters={AEGIS_CHAPTERS} />
          </CaseStudyShell>
        </AegisExperience>
      </main>
      <SiteFooter />
    </>
  );
}
