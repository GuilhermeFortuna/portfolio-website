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

export type CaseStudySceneBoundary =
  | { type: "article"; edge: "start" | "end" }
  | {
      type: "section";
      id: string;
      sectionProgress?: number;
      viewportProgress?: number;
    };

export type CaseStudySceneDefinition = {
  id: CaseStudySceneId;
  start: CaseStudySceneBoundary;
  end: CaseStudySceneBoundary;
};

export type ResolvedCaseStudySceneDefinition = {
  id: CaseStudySceneId;
  start: number;
  end: number;
};

export type CaseStudyLayoutMetrics = {
  articleTop: number;
  articleEnd: number;
  viewportHeight: number;
  sections: Readonly<Record<string, { top: number; height: number }>>;
};

export type CaseStudySceneSnapshot = {
  activeSceneId: CaseStudySceneId;
  sceneProgress: number;
  activeSectionId: string;
  sectionProgress: number;
  articleProgress: number;
};

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

const articleStart = { type: "article", edge: "start" } as const;
const articleEnd = { type: "article", edge: "end" } as const;
const section = (
  id: string,
  sectionProgress = 0,
): CaseStudySceneBoundary => ({
  type: "section",
  id,
  sectionProgress,
  viewportProgress: 0.25,
});

/** Geometry-owned chapter ranges. The manager resolves them after layout. */
export const AEGIS_SCENE_DEFINITIONS: readonly CaseStudySceneDefinition[] = [
  { id: "hero", start: articleStart, end: section("context") },
  { id: "context", start: section("context"), end: section("problem") },
  { id: "problem", start: section("problem"), end: section("system") },
  { id: "system", start: section("system"), end: section("decision-1") },
  {
    id: "decisions",
    start: section("decision-1"),
    end: section("contribution"),
  },
  {
    id: "contribution",
    start: section("contribution"),
    end: section("delivered"),
  },
  {
    id: "delivered",
    start: section("delivered"),
    end: section("technology"),
  },
  {
    id: "technology",
    start: section("technology"),
    end: section("confidentiality"),
  },
  {
    id: "confidentiality",
    start: section("confidentiality"),
    end: section("confidentiality", 0.7),
  },
  { id: "closing", start: section("confidentiality", 0.7), end: articleEnd },
];

export function clamp01(value: number): number {
  if (value <= 0) return 0;
  if (value >= 1) return 1;
  return value;
}

export function resolveSceneBoundary(
  boundary: CaseStudySceneBoundary,
  metrics: CaseStudyLayoutMetrics,
): number | null {
  const scrollStart = metrics.articleTop;
  const scrollEnd = Math.max(
    scrollStart,
    metrics.articleEnd - metrics.viewportHeight,
  );
  const scrollSpan = Math.max(scrollEnd - scrollStart, 1);

  if (boundary.type === "article") {
    return boundary.edge === "start" ? 0 : 100;
  }

  const target = metrics.sections[boundary.id];
  if (!target) return null;
  const sectionProgress = clamp01(boundary.sectionProgress ?? 0);
  const viewportProgress = clamp01(boundary.viewportProgress ?? 0.25);
  const scrollY =
    target.top + target.height * sectionProgress - metrics.viewportHeight * viewportProgress;
  return clamp01((scrollY - scrollStart) / scrollSpan) * 100;
}

export function resolveSceneDefinitions(
  scenes: readonly CaseStudySceneDefinition[],
  metrics: CaseStudyLayoutMetrics,
): readonly ResolvedCaseStudySceneDefinition[] {
  let previousEnd = 0;
  return scenes.map((scene, index) => {
    const start = resolveSceneBoundary(scene.start, metrics) ?? previousEnd;
    const end = resolveSceneBoundary(scene.end, metrics) ?? start;
    const safeStart = Math.max(previousEnd, start);
    const safeEnd = index === scenes.length - 1 ? 100 : Math.max(safeStart, end);
    previousEnd = safeEnd;
    return { id: scene.id, start: safeStart, end: safeEnd };
  });
}

export function createFallbackSceneDefinitions(
  scenes: readonly CaseStudySceneDefinition[],
): readonly ResolvedCaseStudySceneDefinition[] {
  const span = scenes.length > 0 ? 100 / scenes.length : 100;
  return scenes.map((scene, index) => ({
    id: scene.id,
    start: index * span,
    end: (index + 1) * span,
  }));
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
  scenes: readonly ResolvedCaseStudySceneDefinition[],
  articleProgress: number,
): Pick<CaseStudySceneSnapshot, "activeSceneId" | "sceneProgress"> {
  const progressPercent = clamp01(articleProgress) * 100;
  for (let index = 0; index < scenes.length; index += 1) {
    const scene = scenes[index]!;
    const isLast = index === scenes.length - 1;
    if (
      progressPercent >= scene.start &&
      (isLast ? progressPercent <= scene.end : progressPercent < scene.end)
    ) {
      const span = Math.max(scene.end - scene.start, Number.EPSILON);
      return {
        activeSceneId: scene.id,
        sceneProgress: clamp01((progressPercent - scene.start) / span),
      };
    }
  }
  const fallback = scenes[scenes.length - 1] ?? scenes[0];
  return {
    activeSceneId: fallback?.id ?? "hero",
    sceneProgress: progressPercent >= 100 ? 1 : 0,
  };
}

export function resolveActiveSection(
  sectionIds: readonly string[],
  scrollY: number,
  viewportHeight: number,
): Pick<CaseStudySceneSnapshot, "activeSectionId" | "sectionProgress"> {
  if (sectionIds.length === 0) return { activeSectionId: "", sectionProgress: 0 };
  const probe = scrollY + Math.min(viewportHeight * 0.25, 160);
  let activeIndex = 0;
  for (let index = 0; index < sectionIds.length; index += 1) {
    const element = document.getElementById(sectionIds[index]!);
    if (!element) continue;
    if (element.getBoundingClientRect().top + scrollY <= probe) activeIndex = index;
  }
  const activeSectionId = sectionIds[activeIndex]!;
  const activeElement = document.getElementById(activeSectionId);
  if (!activeElement) return { activeSectionId, sectionProgress: 0 };
  const top = activeElement.getBoundingClientRect().top + scrollY;
  return {
    activeSectionId,
    sectionProgress: clamp01((probe - top) / Math.max(activeElement.offsetHeight, 1)),
  };
}

export function computeSceneSnapshot(
  scenes: readonly ResolvedCaseStudySceneDefinition[],
  sectionIds: readonly string[],
  articleProgress: number,
  scrollY: number,
  viewportHeight: number,
): CaseStudySceneSnapshot {
  const scene = resolveActiveScene(scenes, articleProgress);
  const section =
    typeof document === "undefined"
      ? { activeSectionId: sectionIds[0] ?? "", sectionProgress: 0 }
      : resolveActiveSection(sectionIds, scrollY, viewportHeight);
  return { ...scene, ...section, articleProgress: clamp01(articleProgress) };
}
