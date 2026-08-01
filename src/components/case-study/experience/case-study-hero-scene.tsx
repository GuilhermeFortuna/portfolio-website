"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

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

  const parameters = useMemo(
    () =>
      resolveCinematicHeroParameters(
        scene.activeSceneId,
        entranceComplete ? scene.sceneProgress : 0,
      ),
    [entranceComplete, scene.activeSceneId, scene.sceneProgress],
  );

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
        <CaseStudyHero hero={hero} embedded />
      </div>
    </section>
  );
}
