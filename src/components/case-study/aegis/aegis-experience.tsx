"use client";

import type { ReactNode } from "react";

import {
  AEGIS_SCENE_DEFINITIONS,
  AEGIS_SECTION_IDS,
} from "@/components/case-study/experience/case-study-scene-config";
import { CaseStudySceneManager } from "@/components/case-study/experience/case-study-scene-manager";
import type { CaseStudyImage } from "@/types/case-study";

export {
  AEGIS_APERTURE_MEDIA,
  AEGIS_APERTURE_WAYPOINTS,
} from "./aegis-aperture-config";

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
      {children}
    </CaseStudySceneManager>
  );
}
