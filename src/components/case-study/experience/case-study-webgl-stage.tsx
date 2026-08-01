"use client";

// Adapted from https://github.com/JosephASG/codrops-cinematic-scroll-animations
// @ 7a56d1fdc12058e3a955348a7a9f3387a2bf57da (Demo 1)
// Demo-local scroll ownership, independent frame loops, and renderer
// ownership removed; one managed context via ManagedWebGLEffect + gsap.ticker.

import { gsap } from "gsap";
import { Camera, Renderer, Transform } from "ogl";
import {
  useEffect,
  useRef,
  type ReactNode,
} from "react";

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
  targetPointer: { x: number; y: number };
  disposed: boolean;
};

function CinematicScene({
  media,
  parameters,
  renderState,
}: {
  media: readonly { src: string }[];
  parameters: CinematicHeroParameters;
  renderState: ManagedWebGlRenderState;
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
    const mount = containerRef.current;
    if (!mount) return;
    const container = mount;

    let cancelled = false;
    let runtime: Runtime | null = null;
    let tick: (() => void) | null = null;
    let resizeObserver: ResizeObserver | null = null;

    const onPointerMove = (event: PointerEvent) => {
      if (!runtime || !renderStateRef.current.pointerEnabled) return;
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      runtime.targetPointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      runtime.targetPointer.y = (event.clientY - rect.top) / rect.height - 0.5;
    };

    const onPointerLeave = () => {
      if (!runtime) return;
      runtime.targetPointer.x = 0;
      runtime.targetPointer.y = 0;
    };

    const onContextLost = (event: Event) => {
      event.preventDefault();
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

      const camera = new Camera(gl, { fov: 45 });
      camera.position.set(0, 0, 8);
      const scene = new Transform();

      runtime = {
        renderer,
        camera,
        scene,
        cylinder: null,
        particles: null,
        lastRotation: 0.5,
        pointer: { x: 0, y: 0 },
        targetPointer: { x: 0, y: 0 },
        disposed: false,
      };
      runtimeRef.current = runtime;

      const resize = () => {
        if (!runtime || runtime.disposed) return;
        const width = container.clientWidth;
        const height = container.clientHeight;
        if (width <= 0 || height <= 0) return;
        runtime.renderer.dpr = renderStateRef.current.dpr;
        runtime.renderer.setSize(width, height);
        runtime.camera.perspective({
          fov: width < 1024 ? 50 : 45,
          aspect: width / height,
        });
      };

      resize();
      resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      try {
        const atlas = await buildCylinderTextureAtlas(
          gl,
          media.map((item) => item.src),
        );
        if (cancelled || runtime.disposed) return;

        runtime.cylinder = createCinematicCylinder(
          gl,
          scene,
          atlas,
          DEFAULT_CYLINDER_CONFIG,
        );
        runtime.particles = createReactiveParticleField(
          gl,
          scene,
          DEFAULT_CYLINDER_CONFIG.height,
          {
            ...DEFAULT_PARTICLE_CONFIG,
            particleRadius: DEFAULT_CYLINDER_CONFIG.radius + 0.8,
          },
        );
        runtime.lastRotation = parametersRef.current.cylinderRotation;
      } catch {
        // Texture failure leaves the managed fallback surface via parent.
        return;
      }

      tick = () => {
        if (!runtime || runtime.disposed) return;
        const state = renderStateRef.current;
        if (!state.shouldAnimate) return;

        const params = parametersRef.current;
        runtime.renderer.dpr = state.dpr;

        const influence = state.pointerEnabled ? params.pointerInfluence : 0;
        runtime.pointer.x +=
          (runtime.targetPointer.x * influence - runtime.pointer.x) * 0.08;
        runtime.pointer.y +=
          (runtime.targetPointer.y * influence - runtime.pointer.y) * 0.08;

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
      window.addEventListener("pointermove", onPointerMove);
      window.addEventListener("pointerleave", onPointerLeave);
    }

    void boot();

    return () => {
      cancelled = true;
      if (tick) gsap.ticker.remove(tick);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
      resizeObserver?.disconnect();

      const active = runtimeRef.current;
      if (!active) return;
      active.disposed = true;
      active.cylinder?.dispose();
      active.particles?.dispose();
      const { gl } = active.renderer;
      gl.canvas.removeEventListener("webglcontextlost", onContextLost);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
      runtimeRef.current = null;
    };
  }, [media]);

  return <div ref={containerRef} className={styles.webglMount} aria-hidden="true" />;
}

export function CaseStudyWebGLStage({
  media,
  parameters,
  fallback,
  className,
}: CaseStudyWebGLStageProps) {
  return (
    <ManagedWebGLEffect
      config={CASE_STUDY_CINEMATIC_CONFIG}
      className={className ?? styles.webglStage}
      fallback={fallback}
    >
      {(renderState) => (
        <CinematicScene
          media={media}
          parameters={parameters}
          renderState={renderState}
        />
      )}
    </ManagedWebGLEffect>
  );
}
