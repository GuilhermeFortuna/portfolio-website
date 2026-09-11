// Adapted from https://reactbits.dev/backgrounds/light-rays
"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";

import { resolveWebGlDpr } from "@/components/webgl/webgl-manager";
import { cn } from "@/lib/cn";

export type RaysOrigin =
  | "top-center"
  | "top-left"
  | "top-right"
  | "left"
  | "right"
  | "bottom-center"
  | "bottom-left"
  | "bottom-right";

export type LightRaysProps = {
  className?: string;
  /** False while offscreen or hidden: the frame loop stops and time freezes. */
  active: boolean;
  /** Supplied by the WebGL manager so resolution policy stays centralized. */
  dpr?: number;
  raysOrigin?: RaysOrigin;
  /** Horizontal anchor for `top-*`/`bottom-*` origins, as a 0–1 width fraction. */
  originX?: number;
  raysColor?: string;
  raysSpeed?: number;
  lightSpread?: number;
  rayLength?: number;
  fadeDistance?: number;
  saturation?: number;
  followMouse?: boolean;
  mouseInfluence?: number;
  noiseAmount?: number;
  distortion?: number;
};

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

function getAnchorAndDir(
  origin: RaysOrigin,
  originX: number | undefined,
  w: number,
  h: number,
): { anchor: [number, number]; dir: [number, number] } {
  const outside = 0.2;
  switch (origin) {
    case "top-left":
      return { anchor: [(originX ?? 0) * w, -outside * h], dir: [0, 1] };
    case "top-right":
      return { anchor: [(originX ?? 1) * w, -outside * h], dir: [0, 1] };
    case "left":
      return { anchor: [-outside * w, 0.5 * h], dir: [1, 0] };
    case "right":
      return { anchor: [(1 + outside) * w, 0.5 * h], dir: [-1, 0] };
    case "bottom-left":
      return { anchor: [(originX ?? 0) * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-center":
      return { anchor: [(originX ?? 0.5) * w, (1 + outside) * h], dir: [0, -1] };
    case "bottom-right":
      return { anchor: [(originX ?? 1) * w, (1 + outside) * h], dir: [0, -1] };
    default:
      return { anchor: [(originX ?? 0.5) * w, -outside * h], dir: [0, 1] };
  }
}

const vertexShader = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float iTime;
uniform vec2 iResolution;
uniform vec2 rayPos;
uniform vec2 rayDir;
uniform vec3 raysColor;
uniform float raysSpeed;
uniform float lightSpread;
uniform float rayLength;
uniform float fadeDistance;
uniform float saturation;
uniform vec2 mousePos;
uniform float mouseInfluence;
uniform float noiseAmount;
uniform float distortion;

float noise(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float rayStrength(vec2 raySource, vec2 rayRefDirection, vec2 coord,
                  float seedA, float seedB, float speed) {
  vec2 sourceToCoord = coord - raySource;
  vec2 dirNorm = normalize(sourceToCoord);
  float cosAngle = dot(dirNorm, rayRefDirection);

  float distortedAngle = cosAngle + distortion * sin(iTime * 2.0 + length(sourceToCoord) * 0.01) * 0.2;
  float spreadFactor = pow(max(distortedAngle, 0.0), 1.0 / max(lightSpread, 0.001));

  float distance = length(sourceToCoord);
  float maxDistance = iResolution.x * rayLength;
  float lengthFalloff = clamp((maxDistance - distance) / maxDistance, 0.0, 1.0);
  float fadeFalloff = clamp((iResolution.x * fadeDistance - distance) / (iResolution.x * fadeDistance), 0.5, 1.0);

  float baseStrength = clamp(
    (0.45 + 0.15 * sin(distortedAngle * seedA + iTime * speed)) +
    (0.3 + 0.2 * cos(-distortedAngle * seedB + iTime * speed)),
    0.0, 1.0
  );

  return baseStrength * lengthFalloff * fadeFalloff * spreadFactor;
}

void main() {
  vec2 coord = vec2(gl_FragCoord.x, iResolution.y - gl_FragCoord.y);

  vec2 finalRayDir = rayDir;
  if (mouseInfluence > 0.0) {
    vec2 mouseScreenPos = mousePos * iResolution.xy;
    vec2 mouseDirection = normalize(mouseScreenPos - rayPos);
    finalRayDir = normalize(mix(rayDir, mouseDirection, mouseInfluence));
  }

  vec4 rays1 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 36.2214, 21.11349, 1.5 * raysSpeed);
  vec4 rays2 = vec4(1.0) * rayStrength(rayPos, finalRayDir, coord, 22.3991, 18.0234, 1.1 * raysSpeed);
  vec4 color = rays1 * 0.5 + rays2 * 0.4;

  if (noiseAmount > 0.0) {
    float n = noise(coord * 0.01 + iTime * 0.1);
    color.rgb *= (1.0 - noiseAmount + noiseAmount * n);
  }

  float brightness = 1.0 - (coord.y / iResolution.y);
  color.x *= 0.1 + brightness * 0.8;
  color.y *= 0.3 + brightness * 0.6;
  color.z *= 0.5 + brightness * 0.5;

  if (saturation != 1.0) {
    float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
    color.rgb = mix(vec3(gray), color.rgb, saturation);
  }

  color.rgb *= raysColor;
  gl_FragColor = color;
}
`;

export function LightRays({
  className,
  active,
  dpr,
  raysOrigin = "top-center",
  originX,
  raysColor = "#ffffff",
  raysSpeed = 1,
  lightSpread = 1,
  rayLength = 2,
  fadeDistance = 1,
  saturation = 1,
  followMouse = true,
  mouseInfluence = 0.1,
  noiseAmount = 0,
  distortion = 0,
}: LightRaysProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const dprRef = useRef(dpr);
  const resizeRef = useRef<(() => void) | null>(null);
  const startLoopRef = useRef<(() => void) | null>(null);
  const propsRef = useRef({
    raysOrigin,
    originX,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
  });

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    dprRef.current = dpr;
    resizeRef.current?.();
  }, [dpr]);

  useEffect(() => {
    propsRef.current = {
      raysOrigin,
      originX,
      raysColor,
      raysSpeed,
      lightSpread,
      rayLength,
      fadeDistance,
      saturation,
      followMouse,
      mouseInfluence,
      noiseAmount,
      distortion,
    };
    resizeRef.current?.();
  }, [
    raysOrigin,
    originX,
    raysColor,
    raysSpeed,
    lightSpread,
    rayLength,
    fadeDistance,
    saturation,
    followMouse,
    mouseInfluence,
    noiseAmount,
    distortion,
  ]);

  useEffect(() => {
    const mountNode = containerRef.current;
    if (!mountNode) {
      return;
    }
    const container: HTMLDivElement = mountNode;

    let renderer: Renderer;
    try {
      renderer = new Renderer({
        alpha: true,
        dpr: dprRef.current ?? resolveWebGlDpr(),
      });
    } catch {
      return;
    }

    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    gl.canvas.style.display = "block";
    gl.canvas.style.width = "100%";
    gl.canvas.style.height = "100%";
    gl.canvas.style.pointerEvents = "none";

    let animationFrameId = 0;
    let running = false;
    let timeOffset = 0;
    let frozenElapsed = 0;
    const targetMouse = { x: 0.5, y: 0.5 };
    const smoothMouse = { x: 0.5, y: 0.5 };

    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: [1, 1] },
        rayPos: { value: [0, 0] },
        rayDir: { value: [0, 1] },
        raysColor: { value: hexToVec3(propsRef.current.raysColor) },
        raysSpeed: { value: propsRef.current.raysSpeed },
        lightSpread: { value: propsRef.current.lightSpread },
        rayLength: { value: propsRef.current.rayLength },
        fadeDistance: { value: propsRef.current.fadeDistance },
        saturation: { value: propsRef.current.saturation },
        mousePos: { value: [0.5, 0.5] },
        mouseInfluence: { value: 0 },
        noiseAmount: { value: propsRef.current.noiseAmount },
        distortion: { value: propsRef.current.distortion },
      },
    });
    const mesh = new Mesh(gl, { geometry: new Triangle(gl), program });

    function resize() {
      renderer.dpr = dprRef.current ?? resolveWebGlDpr();
      renderer.setSize(container.clientWidth, container.clientHeight);
      const w = container.clientWidth * renderer.dpr;
      const h = container.clientHeight * renderer.dpr;
      const { raysOrigin: origin, originX: x } = propsRef.current;
      const { anchor, dir } = getAnchorAndDir(origin, x, w, h);
      program.uniforms.iResolution.value = [w, h];
      program.uniforms.rayPos.value = anchor;
      program.uniforms.rayDir.value = dir;
    }

    resizeRef.current = resize;
    window.addEventListener("resize", resize);
    container.appendChild(gl.canvas);
    resize();

    // The layer sits beneath page content with pointer-events disabled, so the
    // pointer is read from the window and mapped into the layer's own box.
    function handlePointerMove(event: PointerEvent) {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return;
      }
      targetMouse.x = (event.clientX - rect.left) / rect.width;
      targetMouse.y = (event.clientY - rect.top) / rect.height;
    }
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    function syncUniforms() {
      const next = propsRef.current;
      program.uniforms.raysColor.value = hexToVec3(next.raysColor);
      program.uniforms.raysSpeed.value = next.raysSpeed;
      program.uniforms.lightSpread.value = next.lightSpread;
      program.uniforms.rayLength.value = next.rayLength;
      program.uniforms.fadeDistance.value = next.fadeDistance;
      program.uniforms.saturation.value = next.saturation;
      program.uniforms.noiseAmount.value = next.noiseAmount;
      program.uniforms.distortion.value = next.distortion;
      program.uniforms.mouseInfluence.value = next.followMouse
        ? next.mouseInfluence
        : 0;
    }

    function update(time: number) {
      if (!activeRef.current) {
        running = false;
        frozenElapsed = time - timeOffset;
        animationFrameId = 0;
        return;
      }

      animationFrameId = requestAnimationFrame(update);
      syncUniforms();
      program.uniforms.iTime.value = (time - timeOffset) * 0.001;

      if (propsRef.current.followMouse) {
        smoothMouse.x = smoothMouse.x * 0.92 + targetMouse.x * 0.08;
        smoothMouse.y = smoothMouse.y * 0.92 + targetMouse.y * 0.08;
        program.uniforms.mousePos.value = [smoothMouse.x, smoothMouse.y];
      }

      renderer.render({ scene: mesh });
    }

    function startLoop() {
      if (running) {
        return;
      }
      running = true;
      timeOffset = performance.now() - frozenElapsed;
      animationFrameId = requestAnimationFrame(update);
    }

    startLoopRef.current = startLoop;
    if (activeRef.current) {
      startLoop();
    }

    return () => {
      startLoopRef.current = null;
      resizeRef.current = null;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      if (gl.canvas.parentNode === container) {
        container.removeChild(gl.canvas);
      }
      gl.getExtension("WEBGL_lose_context")?.loseContext();
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

/** Static stand-in rendered whenever the WebGL manager withholds a context. */
export function LightRaysStaticFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      data-light-rays-fallback
      className={cn("absolute inset-0", className)}
      style={{
        backgroundImage: [
          "conic-gradient(from 168deg at 38% -12%, transparent 0deg, color-mix(in srgb, var(--color-accent-c) 14%, transparent) 10deg, transparent 22deg, color-mix(in srgb, var(--color-text) 7%, transparent) 30deg, transparent 40deg)",
          "radial-gradient(ellipse 60% 55% at 38% 0%, color-mix(in srgb, var(--color-accent-c) 12%, transparent), transparent 70%)",
        ].join(", "),
      }}
    />
  );
}
