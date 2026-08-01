export type CaseStudySceneId =
  | "hero"
  | "context"
  | "problem"
  | "system"
  | "decisions"
  | "contribution"
  | "delivered"
  | "technology"
  | "confidentiality"
  | "closing";

export type CaseStudySceneDefinition = {
  id: CaseStudySceneId;
  /** Inclusive start on the BSMNT 0–100 root timeline. */
  start: string;
  /** Exclusive end on the BSMNT 0–100 root timeline (100 inclusive for the last scene). */
  end: string;
};

export type CaseStudySceneSnapshot = {
  activeSceneId: CaseStudySceneId;
  sceneProgress: number;
  activeSectionId: string;
  sectionProgress: number;
  articleProgress: number;
};

/** Twelve semantic Aegis chapter wrappers (hero uses existing `#top`). */
export const AEGIS_SECTION_IDS = [
  "top",
  "context",
  "problem",
  "system",
  "decision-1",
  "decision-2",
  "decision-3",
  "decision-4",
  "contribution",
  "delivered",
  "technology",
  "confidentiality",
] as const;

/**
 * Inert Aegis scene ranges on the shared 0–100 timeline.
 * `decisions` covers decision-1 through decision-4; `closing` shares the
 * confidentiality section at the end of the article.
 */
export const AEGIS_SCENE_DEFINITIONS: readonly CaseStudySceneDefinition[] = [
  { id: "hero", start: "0", end: "10" },
  { id: "context", start: "10", end: "20" },
  { id: "problem", start: "20", end: "30" },
  { id: "system", start: "30", end: "40" },
  { id: "decisions", start: "40", end: "60" },
  { id: "contribution", start: "60", end: "70" },
  { id: "delivered", start: "70", end: "80" },
  { id: "technology", start: "80", end: "88" },
  { id: "confidentiality", start: "88", end: "95" },
  { id: "closing", start: "95", end: "100" },
];

export function parseSceneBoundary(value: string): number {
  const parsed = Number.parseFloat(value);
  if (!Number.isFinite(parsed)) {
    throw new Error(`Invalid scene boundary: ${value}`);
  }
  return parsed;
}

export function clamp01(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

export function createInitialSceneSnapshot(
  scenes: readonly CaseStudySceneDefinition[],
  sectionIds: readonly string[],
): CaseStudySceneSnapshot {
  return {
    activeSceneId: scenes[0]?.id ?? "hero",
    sceneProgress: 0,
    activeSectionId: sectionIds[0] ?? "top",
    sectionProgress: 0,
    articleProgress: 0,
  };
}

export function resolveActiveScene(
  scenes: readonly CaseStudySceneDefinition[],
  articleProgress: number,
): Pick<CaseStudySceneSnapshot, "activeSceneId" | "sceneProgress"> {
  const progressPercent = clamp01(articleProgress) * 100;
  const ordered = scenes;

  for (let index = 0; index < ordered.length; index += 1) {
    const scene = ordered[index]!;
    const start = parseSceneBoundary(scene.start);
    const end = parseSceneBoundary(scene.end);
    const isLast = index === ordered.length - 1;
    const inRange = isLast
      ? progressPercent >= start && progressPercent <= end
      : progressPercent >= start && progressPercent < end;

    if (inRange) {
      const span = Math.max(end - start, Number.EPSILON);
      return {
        activeSceneId: scene.id,
        sceneProgress: clamp01((progressPercent - start) / span),
      };
    }
  }

  const fallback = ordered[ordered.length - 1] ?? ordered[0];
  return {
    activeSceneId: fallback?.id ?? "hero",
    sceneProgress: progressPercent >= 100 ? 1 : 0,
  };
}

/**
 * Resolve the active semantic section from document order and viewport top.
 * Progress is the fraction of the section that has scrolled past the top edge.
 */
export function resolveActiveSection(
  sectionIds: readonly string[],
  scrollY: number,
  viewportHeight: number,
): Pick<CaseStudySceneSnapshot, "activeSectionId" | "sectionProgress"> {
  if (sectionIds.length === 0) {
    return { activeSectionId: "", sectionProgress: 0 };
  }

  const probe = scrollY + Math.min(viewportHeight * 0.25, 160);
  let activeIndex = 0;

  for (let index = 0; index < sectionIds.length; index += 1) {
    const element = document.getElementById(sectionIds[index]!);
    if (!element) continue;
    const top = element.getBoundingClientRect().top + scrollY;
    if (top <= probe) {
      activeIndex = index;
    }
  }

  const activeSectionId = sectionIds[activeIndex]!;
  const activeElement = document.getElementById(activeSectionId);
  if (!activeElement) {
    return { activeSectionId, sectionProgress: 0 };
  }

  const top = activeElement.getBoundingClientRect().top + scrollY;
  const height = Math.max(activeElement.offsetHeight, 1);
  const sectionProgress = clamp01((probe - top) / height);

  return { activeSectionId, sectionProgress };
}

export function computeSceneSnapshot(
  scenes: readonly CaseStudySceneDefinition[],
  sectionIds: readonly string[],
  articleProgress: number,
  scrollY: number,
  viewportHeight: number,
): CaseStudySceneSnapshot {
  const scene = resolveActiveScene(scenes, articleProgress);
  const section =
    typeof document === "undefined"
      ? {
          activeSectionId: sectionIds[0] ?? "",
          sectionProgress: 0,
        }
      : resolveActiveSection(sectionIds, scrollY, viewportHeight);

  return {
    ...scene,
    ...section,
    articleProgress: clamp01(articleProgress),
  };
}
