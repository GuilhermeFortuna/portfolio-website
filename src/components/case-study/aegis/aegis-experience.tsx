"use client";

import type { ReactNode } from "react";

import {
  AEGIS_SCENE_DEFINITIONS,
  AEGIS_SECTION_IDS,
} from "@/components/case-study/experience/case-study-scene-config";
import { CaseStudySceneManager } from "@/components/case-study/experience/case-study-scene-manager";

/**
 * Aegis adapter: supplies scene/section data to the shared scene manager.
 * Contains no Aegis-specific styling — only configuration.
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
