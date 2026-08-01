"use client";

// Adapted from https://github.com/JosephASG/codrops-cinematic-scroll-animations
// @ 7a56d1fdc12058e3a955348a7a9f3387a2bf57da (Demo 1)
// Demo-local scroll ownership, independent frame loops, and renderer
// ownership removed; one managed context via ManagedWebGLEffect + gsap.ticker.

import { gsap } from "gsap";
import { Camera, Renderer, Transform } from "ogl";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

import {
  ManagedWebGLEffect,
  type ManagedWebGlRenderState,
} from "@/components/webgl/managed-webgl-effect";
import type { WebGLEffectConfig } from "@/components/webgl/webgl-manager";

import type { CinematicHeroParameters } from "./cinematic-hero-parameters";
import {
  buildCylinderTextureAtlas,
  createCinematicCylinder,
  DEFAULT_CYLINDER_CONFIG,
  type CinematicCylinderHandle,
} from "./cinematic-media-cylinder";
import {
  createReactiveParticleField,
  DEFAULT_PARTICLE_CONFIG,
  type ReactiveParticleFieldHandle,
} from "./reactive-particle-field";
import styles from "./case-study-experience.module.css";

export const CASE_STUDY_CINEMATIC_CONFIG: WebGLEffectConfig = {
  id: "case-study-cinematic",
  priority: "hero",
  estimatedCost: "high",
  continuous: true,
  allowMobile: false,
};

type CaseStudyWebGLStageProps = {
  /** Approved stills only — never texture native video into WebGL. */
  media: readonly { src: string }[];
  parameters: CinematicHeroParameters;
  fallback: ReactNode;
  className?: string;
};

type Runtime = {
  renderer: Renderer;
  camera: Camera;
  scene: Transform;
  cylinder: CinematicCylinderHandle | null;
  particles: ReactiveParticleFieldHandle | null;
  lastRotation: number;
  pointer: { x: number; y: number };
  contextLost: boolean;
  disposed: boolean;
};

function resizeRuntime(
  runtime: Runtime,
  width: number,
  height: number,
  dpr: number,
) {
  if (runtime.disposed || width <= 0 || height <= 0) return;
  runtime.renderer.dpr = dpr;
  runtime.renderer.setSize(width, height);
  runtime.camera.perspective({
    fov: width < 1024 ? 50 : 45,
    aspect: width / height,
  });
}

function CinematicScene({
  media,
  parameters,
  renderState,
  onAvailabilityChange,
}: {
  media: readonly { src: string }[];
  parameters: CinematicHeroParameters;
  renderState: ManagedWebGlRenderState;
  onAvailabilityChange: (available: boolean) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const runtimeRef = useRef<Runtime | null>(null);
  const parametersRef = useRef(parameters);
  const renderStateRef = useRef(renderState);

  useEffect(() => {
    parametersRef.current = parameters;
  }, [parameters]);

  useEffect(() => {
    renderStateRef.current = renderState;
  }, [renderState]);

  useEffect(() => {
    const runtime = runtimeRef.current;
    if (!runtime) return;
    resizeRuntime(
      runtime,
      renderState.size.width,
      renderState.size.height,
      renderState.dpr,
    );
  }, [renderState.dpr, renderState.size.height, renderState.size.width]);

  useEffect(() => {
    const mount = containerRef.current;
    if (!mount) return;
    const container = mount;

    let cancelled = false;
    let runtime: Runtime | null = null;
    let tick: (() => void) | null = null;

    const installResources = async (active: Runtime) => {
      active.cylinder?.dispose();
      active.particles?.dispose();
      active.scene = new Transform();

      try {
        const atlas = await buildCylinderTextureAtlas(
          active.renderer.gl,
          media.map((item) => item.src),
        );
        if (cancelled || active.disposed || active.contextLost) return;

        active.cylinder = createCinematicCylinder(
          active.renderer.gl,
          active.scene,
          atlas,
          DEFAULT_CYLINDER_CONFIG,
        );
        active.particles = createReactiveParticleField(
          active.renderer.gl,
          active.scene,
          DEFAULT_CYLINDER_CONFIG.height,
          {
            ...DEFAULT_PARTICLE_CONFIG,
            particleRadius: DEFAULT_CYLINDER_CONFIG.radius + 0.8,
          },
        );
        active.lastRotation = parametersRef.current.cylinderRotation;
        onAvailabilityChange(true);
      } catch {
        onAvailabilityChange(false);
      }
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
      if (!runtime) return;
      runtime.contextLost = true;
      onAvailabilityChange(false);
    };

    const onContextRestored = () => {
      if (!runtime || runtime.disposed) return;
      runtime.contextLost = false;
      const state = renderStateRef.current;
      resizeRuntime(runtime, state.size.width, state.size.height, state.dpr);
      void installResources(runtime);
    };

    async function boot() {
      let renderer: Renderer;
      try {
        renderer = new Renderer({
          alpha: true,
          antialias: true,
          dpr: renderStateRef.current.dpr,
        });
      } catch {
        onAvailabilityChange(false);
        return;
      }

      if (cancelled) {
        renderer.gl.getExtension("WEBGL_lose_context")?.loseContext();
        return;
      }

      const gl = renderer.gl;
      gl.clearColor(0, 0, 0, 0);
      gl.disable(gl.CULL_FACE);
      gl.canvas.style.display = "block";
      gl.canvas.style.width = "100%";
      gl.canvas.style.height = "100%";
      gl.canvas.style.pointerEvents = "none";
      container.appendChild(gl.canvas);
      gl.canvas.addEventListener("webglcontextlost", onContextLost);
      gl.canvas.addEventListener("webglcontextrestored", onContextRestored);

      const camera = new Camera(gl, { fov: 45 });
      camera.position.set(0, 0, 8);
      runtime = {
        renderer,
        camera,
        scene: new Transform(),
        cylinder: null,
        particles: null,
        lastRotation: 0.5,
        pointer: { x: 0, y: 0 },
        contextLost: false,
        disposed: false,
      };
      runtimeRef.current = runtime;
      const state = renderStateRef.current;
      resizeRuntime(runtime, state.size.width, state.size.height, state.dpr);
      await installResources(runtime);

      tick = () => {
        if (!runtime || runtime.disposed || runtime.contextLost) return;
        const state = renderStateRef.current;
        if (!state.active || state.disposeRequested || !state.shouldAnimate) return;

        const params = parametersRef.current;
        const influence = state.pointerEnabled ? params.pointerInfluence : 0;
        runtime.pointer.x +=
          (state.pointer.x * influence - runtime.pointer.x) * 0.08;
        runtime.pointer.y +=
          (state.pointer.y * influence - runtime.pointer.y) * 0.08;

        runtime.cylinder?.applyParameters(params);
        const rotationDelta = params.cylinderRotation - runtime.lastRotation;
        runtime.lastRotation = params.cylinderRotation;
        runtime.particles?.applyParameters(params, rotationDelta);

        runtime.camera.position.set(
          runtime.pointer.x * 0.8,
          -runtime.pointer.y * 0.5,
          params.cameraZ,
        );
        runtime.camera.lookAt([0, 0, 0]);
        runtime.renderer.render({ scene: runtime.scene, camera: runtime.camera });
      };

      gsap.ticker.add(tick);
    }

    void boot();

    return () => {
      cancelled = true;
      if (tick) gsap.ticker.remove(tick);

      const active = runtimeRef.current;
      if (!active) return;
      active.disposed = true;
      active.cylinder?.dispose();
      active.particles?.dispose();
      const { gl } = active.renderer;
      gl.canvas.removeEventListener("webglcontextlost", onContextLost);
      gl.canvas.removeEventListener("webglcontextrestored", onContextRestored);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      runtimeRef.current = null;
    };
  }, [media, onAvailabilityChange]);

  return <div ref={containerRef} className={styles.webglMount} aria-hidden="true" />;
}

export function CaseStudyWebGLStage({
  media,
  parameters,
  fallback,
  className,
}: CaseStudyWebGLStageProps) {
  const [available, setAvailable] = useState(false);
  const handleAvailabilityChange = useCallback((next: boolean) => {
    setAvailable(next);
  }, []);

  return (
    <ManagedWebGLEffect
      config={CASE_STUDY_CINEMATIC_CONFIG}
      className={className ?? styles.webglStage}
      fallback={fallback}
    >
      {(renderState) => (
        <>
          <CinematicScene
            media={media}
            parameters={parameters}
            renderState={renderState}
            onAvailabilityChange={handleAvailabilityChange}
          />
          {available ? null : fallback}
        </>
      )}
    </ManagedWebGLEffect>
  );
}
