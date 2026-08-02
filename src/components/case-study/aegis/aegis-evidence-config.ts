import type { EvidencePlaneDefinition } from "@/components/case-study/experience/case-study-evidence-stage";

const section = (
  id: string,
  sectionProgress = 0,
  viewportProgress = 0.25,
) =>
  ({
    type: "section" as const,
    id,
    sectionProgress,
    viewportProgress,
  });

/**
 * Authored Aegis D-013 plane ranges. Overview/alerts inspect inside D-010
 * aperture chapters; Decision 3 is a sequential two-beat stage; Decision 4
 * gets spatial arrival only (native video controls at inspect).
 */
export const AEGIS_EVIDENCE_PLANES: readonly EvidencePlaneDefinition[] = [
  {
    id: "aegis-overview",
    start: section("context"),
    end: section("decision-1"),
    inspectStart: 0.42,
    inspectEnd: 0.72,
  },
  {
    id: "aegis-alerts",
    start: section("contribution"),
    end: section("technology"),
    inspectStart: 0.3,
    inspectEnd: 0.7,
  },
  {
    id: "aegis-player-investigation",
    start: section("decision-3", 0, 1),
    end: section("decision-3", 0.55, 0.2),
    inspectStart: 0.28,
    inspectEnd: 0.72,
  },
  {
    id: "aegis-risk-constellation",
    start: section("decision-3", 0.5, 0.2),
    end: section("contribution", 0, 1),
    inspectStart: 0.28,
    inspectEnd: 0.72,
  },
  {
    id: "aegis-entry-intro",
    start: section("decision-4", 0, 1),
    end: section("contribution", 0, 0.9),
    inspectStart: 0.3,
    inspectEnd: 0.75,
  },
];
