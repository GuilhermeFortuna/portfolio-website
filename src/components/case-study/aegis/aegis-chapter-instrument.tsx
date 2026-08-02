"use client";

import {
  CaseStudyChapterInstrument,
  type CaseStudyChapter,
} from "@/components/case-study/experience/case-study-chapter-instrument";
import { useCaseStudyScene } from "@/components/case-study/experience/case-study-scene-context";

type AegisChapterInstrumentProps = {
  chapters: readonly CaseStudyChapter[];
};

/**
 * Aegis adapter host: maps D-006 active section + local progress into the
 * shared chapter instrument. Supplies no Aegis visual skin.
 */
export function AegisChapterInstrument({
  chapters,
}: AegisChapterInstrumentProps) {
  const scene = useCaseStudyScene();

  return (
    <CaseStudyChapterInstrument
      chapters={chapters}
      activeId={scene.activeSectionId}
      localProgress={scene.sectionProgress}
      entranceComplete={scene.entranceComplete}
    />
  );
}
