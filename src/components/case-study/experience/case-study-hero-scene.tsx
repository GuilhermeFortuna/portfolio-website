"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";

import { CaseStudyHero } from "@/components/case-study/case-study-hero";
import { usePortfolioLenis } from "@/components/providers/portfolio-motion-context";
import type {
  CaseStudyHero as CaseStudyHeroContent,
  CaseStudyImage,
} from "@/types/case-study";

import { useCaseStudyScene } from "./case-study-scene-context";
import { resolveCinematicHeroParameters } from "./cinematic-hero-parameters";
import { CaseStudyWebGLStage } from "./case-study-webgl-stage";
import { KineticRouteTransition } from "./kinetic-route-transition";
import styles from "./case-study-experience.module.css";

export type CaseStudyHeroSceneProps = {
  hero: CaseStudyHeroContent;
  /** Approved stills for the media cylinder (never native video). */
  media: readonly CaseStudyImage[];
};

type HeroSceneStyle = CSSProperties & {
  "--semantic-poster-opacity": number;
  "--webgl-stage-opacity": number;
};

function smoothstep(edge0: number, edge1: number, value: number): number {
  const progress = Math.min(
    Math.max((value - edge0) / Math.max(edge1 - edge0, Number.EPSILON), 0),
    1,
  );
  return progress * progress * (3 - 2 * progress);
}

function PosterSurface({ image }: { image: CaseStudyImage }) {
  return (
    <div
      className={styles.posterFallback}
      aria-hidden="true"
      style={{ backgroundImage: `url(${image.src})` }}
    />
  );
}

/**
 * Composes D-009 kinetic entrance + D-008 cinematic WebGL + semantic hero DOM
 * as one opening scene. Scroll-driven cinematic parameters activate after the
 * entrance completes so the aperture and cylinder form a continuous handoff.
 */
export function CaseStudyHeroScene({ hero, media }: CaseStudyHeroSceneProps) {
  const scene = useCaseStudyScene();
  const lenis = usePortfolioLenis();
  const [enhanced, setEnhanced] = useState(false);
  const [entranceComplete, setEntranceComplete] = useState(false);

  // The article-wide scene ranges are intentionally inert scaffolding. Drive
  // the hero from its real semantic section so the final frame meets the
  // physical context boundary at every viewport height.
  const heroProgress =
    scene.activeSectionId === "top" ? scene.sectionProgress : 1;

  const parameters = useMemo(
    () =>
      resolveCinematicHeroParameters(
        scene.activeSectionId === "top" ? "hero" : scene.activeSceneId,
        entranceComplete ? heroProgress : 0,
      ),
    [
      entranceComplete,
      heroProgress,
      scene.activeSceneId,
      scene.activeSectionId,
    ],
  );
  const sceneStyle: HeroSceneStyle = {
    // Clear the semantic poster before the primary cylinder expansion begins;
    // otherwise it masks the first half of the WebGL choreography.
    "--semantic-poster-opacity": 1 - smoothstep(0.03, 0.2, heroProgress),
    "--webgl-stage-opacity": 1 - smoothstep(0.8, 0.94, heroProgress),
  };

  useEffect(() => {
    if (!lenis || !enhanced) return;
    if (entranceComplete) {
      lenis.start();
      return;
    }
    lenis.stop();
    return () => {
      lenis.start();
    };
  }, [enhanced, entranceComplete, lenis]);

  const handleReady = useCallback(() => {
    setEnhanced(true);
  }, []);

  const handleEnterComplete = useCallback(() => {
    setEntranceComplete(true);
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="case-study-title"
      className={styles.heroScene}
      data-entrance={entranceComplete ? "complete" : "pending"}
      data-hero-progress={heroProgress.toFixed(3)}
      style={sceneStyle}
    >
      <CaseStudyWebGLStage
        media={media}
        parameters={parameters}
        fallback={<PosterSurface image={hero.media} />}
        className={styles.webglStage}
      />

      <KineticRouteTransition
        title={hero.title}
        onReady={handleReady}
        onEnterComplete={handleEnterComplete}
      />

      <div
        className={[
          styles.heroContent,
          enhanced ? styles.heroContentEnhanced : "",
          entranceComplete ? styles.heroContentReady : styles.heroContentPending,
        ]
          .filter(Boolean)
          .join(" ")}
        data-hero-content=""
      >
        <CaseStudyHero
          hero={hero}
          embedded
          mediaClassName={styles.semanticPoster}
        />
      </div>
    </section>
  );
}
