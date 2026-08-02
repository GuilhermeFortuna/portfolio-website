import type { CaseStudyImage } from "@/types/case-study";

import type { CaseStudySceneId } from "./case-study-scene-config";

export type ApertureWaypoint = {
  sceneId: CaseStudySceneId;
  slotId: string;
  aspectRatio: `${number} / ${number}`;
  mediaKey?: string;
  /** Fraction of this scene held at its stable waypoint before traveling. */
  holdUntil?: number;
  fit: "contain" | "cover";
  alignment: "start" | "center" | "end";
};

export type ApertureMediaMap = Readonly<Record<string, CaseStudyImage>>;
