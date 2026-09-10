"use client";

import type { CSSProperties, ReactNode } from "react";

import { AmbientRays } from "@/components/effects/ambient-rays";
import { LightRays, LightRaysStaticFallback } from "@/components/effects/light-rays";
import { useResumeSceneRuntime } from "@/components/resume/resume-scene-runtime";
import { ManagedWebGLEffect } from "@/components/webgl/managed-webgl-effect";
import type { WebGLEffectConfig } from "@/components/webgl/webgl-manager";

const LIGHT_RAYS_CONFIG: WebGLEffectConfig = {
  id: "light-rays",
  priority: "hero",
  estimatedCost: "high",
  continuous: true,
  allowMobile: true,
};

/** Page scroll progress over which the ambient rays take over from the hero. */
const AMBIENT_FADE_START = 0.05;
const AMBIENT_FADE_END = 0.15;
const AMBIENT_MAX_OPACITY = 0.8;

export function resolveAmbientOpacity(progress: number): number {
  const t = (progress - AMBIENT_FADE_START) / (AMBIENT_FADE_END - AMBIENT_FADE_START);
  return Math.min(1, Math.max(0, t)) * AMBIENT_MAX_OPACITY;
}

/**
 * Decorative Resume background: WebGL light rays over the identity hero that
 * hand off to a fixed, CSS-only ray field once the hero scrolls away. Rendered
 * as the first child of `.resume-stage`, beneath every chapter.
 */
export function ResumeBackdrop(): ReactNode {
  const { progress, mode } = useResumeSceneRuntime();

  return (
    <div aria-hidden="true" className="resume-backdrop" data-resume-backdrop>
      <div className="resume-backdrop__hero">
        <ManagedWebGLEffect
          config={LIGHT_RAYS_CONFIG}
          className="absolute inset-0 h-full w-full"
          fallback={<LightRaysStaticFallback />}
        >
          {({ shouldAnimate, dpr, pointerEnabled, isMobile }) => (
            <LightRays
              active={shouldAnimate}
              dpr={dpr}
              raysOrigin="top-center"
              originX={isMobile ? 0.5 : 0.36}
              raysColor="#c9b8ff"
              raysSpeed={isMobile ? 0.4 : 0.6}
              lightSpread={0.9}
              rayLength={isMobile ? 1.2 : 1.6}
              fadeDistance={1}
              saturation={0.9}
              followMouse={pointerEnabled}
              mouseInfluence={0.08}
              noiseAmount={0.06}
              distortion={0.04}
              className="absolute inset-0 h-full w-full"
            />
          )}
        </ManagedWebGLEffect>
      </div>

      <div
        className="resume-backdrop__ambient"
        data-resume-backdrop-ambient
        style={{ opacity: resolveAmbientOpacity(progress) } as CSSProperties}
      >
        <AmbientRays
          count={6}
          color="color-mix(in srgb, var(--color-accent-c) 18%, transparent)"
          blur={48}
          speed={18}
          length="90vh"
          mode={mode}
        />
      </div>
    </div>
  );
}
