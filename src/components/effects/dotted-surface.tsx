// Adapted from https://21st.dev/@sshahaider/components/dotted-surface
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { ManagedWebGLEffect } from "@/components/webgl/managed-webgl-effect";
import {
  resolveWebGlDpr,
  type WebGLEffectConfig,
} from "@/components/webgl/webgl-manager";
import { cn } from "@/lib/cn";

/**
 * The canonical source renders a full-viewport surface seen from well above it.
 * This adaptation has to read as a shallow horizon inside a 20rem strip, so the
 * camera sits low to the plane and the grid is denser and much wider than deep.
 */
const SEPARATION = 40;
const AMOUNT_X = 165;
const AMOUNT_Y = 60;

const CAMERA_FOV = 30;
const CAMERA_HEIGHT = 120;
const CAMERA_DEPTH = 1500;
/**
 * Shallow enough to put the vanishing line at ~38% of the strip and the dense
 * far rows at ~46%. Both the mandated top mask (opaque from 40% down) and the
 * bottom fade would otherwise erase the part of the surface that carries the
 * detail, since perspective crowds every distant row into a thin band.
 */
const CAMERA_PITCH = THREE.MathUtils.degToRad(-3.7);

const GRID_HALF_WIDTH = (AMOUNT_X * SEPARATION) / 2;
/** Distance from the camera to the furthest row of points. */
const FAR_ROW_DISTANCE = CAMERA_DEPTH + (AMOUNT_Y * SEPARATION) / 2;
const HALF_FOV_TANGENT = Math.tan(THREE.MathUtils.degToRad(CAMERA_FOV / 2));

/** Amplitude of each of the two crossing sine waves, in world units. */
const WAVE_AMPLITUDE = 20;
/**
 * The canonical frequencies (0.3 and 0.5 per grid step) repeat every ~21 grid
 * steps, which reads as vertical banding once the surface is squeezed into a
 * wide, shallow strip. These lower frequencies give a few broad swells instead.
 */
const WAVE_FREQUENCY_X = 0.09;
const WAVE_FREQUENCY_Y = 0.18;
/**
 * Advance of the phase counter per second. The counter is added to the grid
 * index before the frequency is applied, so the on-screen speed is
 * `WAVE_SPEED * WAVE_FREQUENCY` radians per second — roughly 0.9 and 1.8 here.
 */
const WAVE_SPEED = 10;

const POINT_SIZE = 4;
const POINT_OPACITY = 0.9;

/**
 * Fixed dark-theme point colors. These are the `--color-accent-a`, `-b`, and
 * `-c` tokens; the shader reads them through a buffer attribute, so they cannot
 * be consumed as CSS variables here.
 */
const ACCENT_A = "#8ea0ff";
const ACCENT_B = "#68d7c5";
const ACCENT_C = "#b49cff";

export type DottedSurfaceProps = {
  className?: string;
  active: boolean;
};

export function DottedSurface({ className, active }: DottedSurfaceProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const startLoopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    const mountNode = containerRef.current;
    if (!mountNode) {
      return;
    }
    const container: HTMLDivElement = mountNode;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    container.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(CAMERA_FOV, 1, 1, 8000);
    camera.position.set(0, CAMERA_HEIGHT, CAMERA_DEPTH);
    camera.rotation.x = CAMERA_PITCH;

    const positions: number[] = [];
    const colors: number[] = [];
    const accentA = new THREE.Color(ACCENT_A);
    const accentB = new THREE.Color(ACCENT_B);
    const accentC = new THREE.Color(ACCENT_C);
    const pointColor = new THREE.Color();

    for (let ix = 0; ix < AMOUNT_X; ix++) {
      for (let iy = 0; iy < AMOUNT_Y; iy++) {
        positions.push(
          ix * SEPARATION - GRID_HALF_WIDTH,
          0,
          iy * SEPARATION - (AMOUNT_Y * SEPARATION) / 2,
        );

        // Accent A sweeps into C across the width, then cools toward B with depth.
        pointColor
          .copy(accentA)
          .lerp(accentC, ix / (AMOUNT_X - 1))
          .lerp(accentB, (iy / (AMOUNT_Y - 1)) * 0.55);
        colors.push(pointColor.r, pointColor.g, pointColor.b);
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(positions, 3),
    );
    geometry.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: POINT_SIZE,
      vertexColors: true,
      transparent: true,
      opacity: POINT_OPACITY,
      sizeAttenuation: true,
      depthWrite: false,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    function resize() {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (width === 0 || height === 0) {
        return;
      }

      const aspect = width / height;
      renderer.setPixelRatio(resolveWebGlDpr());
      renderer.setSize(width, height, false);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      /*
        A 20rem strip is extremely wide relative to its height, so on wide
        viewports the frame is wider at the far row than the grid itself and the
        field would end in visible vertical edges. Stretching the grid keeps it
        edge to edge instead of adding thousands of points.
      */
      const requiredHalfWidth =
        FAR_ROW_DISTANCE * HALF_FOV_TANGENT * aspect;
      points.scale.x = Math.max(1, requiredHalfWidth / GRID_HALF_WIDTH);
    }

    resize();

    const observer = new ResizeObserver(resize);
    observer.observe(container);

    const positionAttribute = geometry.attributes
      .position as THREE.BufferAttribute;
    const positionArray = positionAttribute.array as Float32Array;

    let animationFrameId = 0;
    let running = false;
    let lastTime = 0;
    let count = 0;

    function update(time: number) {
      if (!activeRef.current) {
        running = false;
        animationFrameId = 0;
        return;
      }

      animationFrameId = requestAnimationFrame(update);

      // Accumulating phase rather than reading the clock keeps the surface from
      // jumping when the manager pauses and resumes the loop.
      const delta = lastTime === 0 ? 0 : (time - lastTime) * 0.001;
      lastTime = time;
      count += delta * WAVE_SPEED;

      let i = 0;
      for (let ix = 0; ix < AMOUNT_X; ix++) {
        for (let iy = 0; iy < AMOUNT_Y; iy++) {
          positionArray[i * 3 + 1] =
            Math.sin((ix + count) * WAVE_FREQUENCY_X) * WAVE_AMPLITUDE +
            Math.sin((iy + count) * WAVE_FREQUENCY_Y) * WAVE_AMPLITUDE;
          i++;
        }
      }

      positionAttribute.needsUpdate = true;
      renderer.render(scene, camera);
    }

    function startLoop() {
      if (running) {
        return;
      }
      running = true;
      lastTime = 0;
      animationFrameId = requestAnimationFrame(update);
    }

    startLoopRef.current = startLoop;

    if (activeRef.current) {
      startLoop();
    } else {
      renderer.render(scene, camera);
    }

    return () => {
      startLoopRef.current = null;
      running = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      scene.remove(points);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (canvas.parentNode === container) {
        container.removeChild(canvas);
      }
    };
  }, []);

  useEffect(() => {
    if (active) {
      startLoopRef.current?.();
    }
  }, [active]);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    />
  );
}

/**
 * Reduced motion and failed initialization both land here: the same horizon
 * band drawn as a still image, with no canvas and nothing in motion.
 */
function DottedSurfaceStaticFallback() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0"
      style={{
        backgroundImage: [
          "radial-gradient(ellipse 90% 120% at 50% 118%, color-mix(in srgb, var(--color-accent-a) 26%, transparent), transparent 70%)",
          "radial-gradient(circle at center, color-mix(in srgb, var(--color-accent-a) 70%, transparent) 1px, transparent 1.4px)",
        ].join(", "),
        backgroundSize: "100% 100%, 28px 28px",
        backgroundPosition: "center bottom, center bottom",
        // Thins the dots out toward the vanishing line, matching the animated depth cue.
        maskImage:
          "radial-gradient(ellipse 120% 150% at 50% 130%, #000 20%, transparent 72%)",
      }}
    />
  );
}

const DOTTED_SURFACE_CONFIG: WebGLEffectConfig = {
  id: "dotted-surface",
  priority: "decorative",
  estimatedCost: "high",
  continuous: true,
  allowMobile: false,
};

/**
 * Contact horizon layers. Rendered as absolutely positioned siblings of the
 * contact copy, which owns the stacking context.
 */
export function ContactDottedSurfaceHorizon() {
  return (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[20rem]"
        style={{
          background:
            "radial-gradient(ellipse 70% 100% at 50% 100%, color-mix(in srgb, var(--color-accent-b) 8%, transparent), transparent 72%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[20rem] overflow-hidden opacity-[0.22]"
        style={{
          maskImage: "linear-gradient(to bottom, transparent 0%, #000 40%)",
        }}
      >
        <ManagedWebGLEffect
          config={DOTTED_SURFACE_CONFIG}
          className="absolute inset-0 h-full w-full"
          fallback={<DottedSurfaceStaticFallback />}
        >
          {({ shouldAnimate }) => <DottedSurface active={shouldAnimate} />}
        </ManagedWebGLEffect>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[5rem]"
        style={{
          background:
            "linear-gradient(to top, var(--color-canvas) 0%, color-mix(in srgb, var(--color-canvas) 55%, transparent) 45%, transparent 100%)",
        }}
      />
    </>
  );
}
