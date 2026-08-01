import {
  clamp01,
  type CaseStudySceneId,
} from "@/components/case-study/experience/case-study-scene-config";

/**
 * Scene-authored parameters for the D-008 cinematic hero. The scene manager
 * (via hero progress) writes these; the WebGL stage never reads scroll.
 */
export type CinematicHeroParameters = {
  cylinderRotation: number;
  cylinderRadius: number;
  mediaScale: number;
  cameraZ: number;
  arcExpansion: number;
  particleEnergy: number;
  pointerInfluence: number;
};

const BASE_RADIUS = 2.5;
/** Source Demo 1 rotates roughly `+=28.27` over the full scrub (~4.5 turns). */
const FULL_ROTATION = 28.27;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp01((x - edge0) / Math.max(edge1 - edge0, Number.EPSILON));
  return t * t * (3 - 2 * t);
}

/**
 * Map D-006 hero scene progress onto cinematic parameters.
 *
 * - `0.00–0.28`: restrained cylinder behind the title
 * - `0.28–0.72`: rotation, radius, camera depth, scale, and particle energy rise
 * - `0.72–1.00`: oversized arcs beyond the viewport, then environmental traces
 *
 * Values are deterministic for a given progress so reverse scroll reproduces
 * the same frame. Past the hero scene, the handoff state is held.
 */
export function resolveCinematicHeroParameters(
  activeSceneId: CaseStudySceneId,
  sceneProgress: number,
): CinematicHeroParameters {
  const progress =
    activeSceneId === "hero" ? clamp01(sceneProgress) : 1;

  const expand = smoothstep(0.28, 0.72, progress);
  const open = smoothstep(0.72, 1, progress);
  const restrained = 1 - expand;

  const cylinderRotation = lerp(0.5, 0.5 + FULL_ROTATION * 0.55, expand) + open * 6;
  const cylinderRadius =
    BASE_RADIUS * lerp(1, 1.35, expand) * lerp(1, 1.75, open);
  const mediaScale = lerp(1, 1.2, expand) * lerp(1, 1.55, open);
  const cameraZ = lerp(8, 3.2, expand) * lerp(1, 0.55, open) + open * 2.4;
  const arcExpansion = lerp(0, 0.35, expand) + open * 0.95;
  const particleEnergy =
    lerp(0.05, 0.85, expand) * (1 - open * 0.55) + open * 0.22;
  const pointerInfluence = lerp(0.15, 0.9, expand) * (1 - open * 0.4);

  // Keep title-readable darkness bias implicit via restrained phase; WebGL
  // stage maps `restrained` into shader darkness without a separate scroll read.
  void restrained;

  return {
    cylinderRotation,
    cylinderRadius,
    mediaScale,
    cameraZ,
    arcExpansion,
    particleEnergy,
    pointerInfluence,
  };
}

export function cinematicShaderDarkness(parameters: CinematicHeroParameters): number {
  // Brighter early (readable title), slightly darker as arcs expand.
  return lerp(0.38, 0.22, clamp01(parameters.arcExpansion));
}
