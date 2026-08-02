"use client";

import type { ReactNode } from "react";

import type { CaseStudyChapter } from "@/components/case-study/experience/case-study-chapter-instrument";
import {
  AEGIS_SCENE_DEFINITIONS,
  AEGIS_SECTION_IDS,
} from "@/components/case-study/experience/case-study-scene-config";
import { CaseStudyEvidenceStage } from "@/components/case-study/experience/case-study-evidence-stage";
import { CaseStudySceneManager } from "@/components/case-study/experience/case-study-scene-manager";
import { aegisCaseStudy } from "@/content/case-studies";
import type { CaseStudyImage } from "@/types/case-study";

import { AEGIS_EVIDENCE_PLANES } from "./aegis-evidence-config";

export {
  AEGIS_APERTURE_MEDIA,
  AEGIS_APERTURE_WAYPOINTS,
} from "./aegis-aperture-config";

export { AEGIS_EVIDENCE_PLANES } from "./aegis-evidence-config";
export { AegisChapterInstrument } from "./aegis-chapter-instrument";
export {
  AegisDecisionPanels,
  CaseStudyDecisionPanel,
} from "./aegis-decision-panels";
export type { DecisionComposition } from "./aegis-decision-panels";

/**
 * Approved Aegis stills for the D-008 media cylinder. Native video is never
 * textured into WebGL; the poster remains in semantic DOM separately.
 */
export const AEGIS_CINEMATIC_MEDIA: readonly CaseStudyImage[] = [
  {
    src: "/work/aegis/entry-intro-poster.webp",
    alt: "The Aegis wordmark in brushed metal beneath a glowing blue iris set into a dark shield, lit by aurora curtains.",
    width: 1600,
    height: 900,
  },
  {
    src: "/work/aegis/overview.webp",
    alt: "The Aegis overview screen on synthetic data.",
    width: 1600,
    height: 900,
  },
  {
    src: "/work/aegis/player-investigation.webp",
    alt: "Player investigation view on synthetic data.",
    width: 1600,
    height: 900,
  },
  {
    src: "/work/aegis/risk-constellation.webp",
    alt: "Risk constellation view on synthetic data.",
    width: 1600,
    height: 900,
  },
  {
    src: "/work/aegis/alerts.webp",
    alt: "Alerts triage queue on synthetic data.",
    width: 1600,
    height: 900,
  },
];

export { AEGIS_SCENE_DEFINITIONS };

function aegisChapterLabel(
  id: (typeof AEGIS_SECTION_IDS)[number],
): string {
  switch (id) {
    case "top":
      return aegisCaseStudy.hero.title;
    case "context":
      return aegisCaseStudy.context.heading;
    case "problem":
      return aegisCaseStudy.problem.heading;
    case "system":
      return aegisCaseStudy.system.heading;
    case "decision-1":
      return aegisCaseStudy.decisions[0].heading;
    case "decision-2":
      return aegisCaseStudy.decisions[1].heading;
    case "decision-3":
      return aegisCaseStudy.decisions[2].heading;
    case "decision-4":
      return aegisCaseStudy.decisions[3].heading;
    case "contribution":
      return aegisCaseStudy.contribution.heading;
    case "delivered":
      return aegisCaseStudy.delivered.heading;
    case "technology":
      return aegisCaseStudy.technology.heading;
    case "confidentiality":
      return aegisCaseStudy.confidentiality.heading;
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

/**
 * Twelve Aegis chapter destinations in DOM order. Labels are the approved
 * headings (hero title for `#top`); no editorial group names or invented copy.
 */
export const AEGIS_CHAPTERS: readonly CaseStudyChapter[] =
  AEGIS_SECTION_IDS.map((id) => ({
    id,
    label: aegisChapterLabel(id),
    href: `#${id}` as const,
  }));

/**
 * Aegis adapter: supplies scene/section data to the shared scene manager.
 * Contains no Aegis-specific styling — only configuration and media wiring.
 */
export function AegisExperience({ children }: { children: ReactNode }) {
  return (
    <CaseStudySceneManager
      scenes={AEGIS_SCENE_DEFINITIONS}
      sectionIds={AEGIS_SECTION_IDS}
    >
      <CaseStudyEvidenceStage planes={AEGIS_EVIDENCE_PLANES}>
        {children}
      </CaseStudyEvidenceStage>
    </CaseStudySceneManager>
  );
}
