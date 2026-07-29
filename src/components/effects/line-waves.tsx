// Adapted from https://reactbits.dev/backgrounds/line-waves
"use client";

import { Mesh, Program, Renderer, Triangle } from "ogl";
import { useEffect, useRef } from "react";

import { ManagedWebGLEffect } from "@/components/webgl/managed-webgl-effect";
import {
  resolveWebGlDpr,
  type WebGLEffectConfig,
} from "@/components/webgl/webgl-manager";
import { cn } from "@/lib/cn";

export type LineWavesProps = {
  className?: string;
  active: boolean;
  /** Supplied by the WebGL manager so resolution policy stays centralized. */
  dpr?: number;
  /**
   * Resolves the element that pointer movement is read from. Needed because the
   * canvas and its managed wrapper are `pointer-events: none`, so events must be
   * observed on an interactive ancestor instead of the document.
   */
  resolvePointerTarget?: () => HTMLElement | null;
  speed?: number;
  innerLineCount?: number;
  outerLineCount?: number;
  warpIntensity?: number;
  rotation?: number;
  edgeFadeWidth?: number;
  colorCycleSpeed?: number;
  brightness?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  enableMouseInteraction?: boolean;
  mouseInfluence?: number;
};

function hexToVec3(hex: string): [number, number, number] {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16) / 255,
    parseInt(h.slice(2, 4), 16) / 255,
    parseInt(h.slice(4, 6), 16) / 255,
  ];
}

const vertexShader = `
attribute vec2 uv;
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 0, 1);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec3 uResolution;
uniform float uSpeed;
uniform float uInnerLines;
uniform float uOuterLines;
uniform float uWarpIntensity;
uniform float uRotation;
uniform float uEdgeFadeWidth;
uniform float uColorCycleSpeed;
uniform float uBrightness;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec2 uMouse;
uniform float uMouseInfluence;
uniform bool uEnableMouse;

#define HALF_PI 1.5707963

float hashF(float n) {
  return fract(sin(n * 127.1) * 43758.5453123);
}

float smoothNoise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hashF(i), hashF(i + 1.0), u);
}

float displaceA(float coord, float t) {
  float result = sin(coord * 2.123) * 0.2;
  result += sin(coord * 3.234 + t * 4.345) * 0.1;
  result += sin(coord * 0.589 + t * 0.934) * 0.5;
  return result;
}

float displaceB(float coord, float t) {
  float result = sin(coord * 1.345) * 0.3;
  result += sin(coord * 2.734 + t * 3.345) * 0.2;
  result += sin(coord * 0.189 + t * 0.934) * 0.3;
  return result;
}

vec2 rotate2D(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
}

void main() {
  vec2 coords = gl_FragCoord.xy / uResolution.xy;
  coords = coords * 2.0 - 1.0;
  coords = rotate2D(coords, uRotation);

  float halfT = uTime * uSpeed * 0.5;
  float fullT = uTime * uSpeed;

  float mouseWarp = 0.0;
  if (uEnableMouse) {
    vec2 mPos = rotate2D(uMouse * 2.0 - 1.0, uRotation);
    float mDist = length(coords - mPos);
    mouseWarp = uMouseInfluence * exp(-mDist * mDist * 4.0);
  }

  float warpAx = coords.x + displaceA(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpAy = coords.y - displaceA(coords.x * cos(fullT) * 1.235, halfT) * uWarpIntensity;
  float warpBx = coords.x + displaceB(coords.y, halfT) * uWarpIntensity + mouseWarp;
  float warpBy = coords.y - displaceB(coords.x * sin(fullT) * 1.235, halfT) * uWarpIntensity;

  vec2 fieldA = vec2(warpAx, warpAy);
  vec2 fieldB = vec2(warpBx, warpBy);
  vec2 blended = mix(fieldA, fieldB, mix(fieldA, fieldB, 0.5));

  float fadeTop = smoothstep(uEdgeFadeWidth, uEdgeFadeWidth + 0.4, blended.y);
  float fadeBottom = smoothstep(-uEdgeFadeWidth, -(uEdgeFadeWidth + 0.4), blended.y);
  float vMask = 1.0 - max(fadeTop, fadeBottom);

  float tileCount = mix(uOuterLines, uInnerLines, vMask);
  float scaledY = blended.y * tileCount;
  float nY = smoothNoise(abs(scaledY));

  float ridge = pow(
    step(abs(nY - blended.x) * 2.0, HALF_PI) * cos(2.0 * (nY - blended.x)),
    5.0
  );

  float lines = 0.0;
  for (float i = 1.0; i < 3.0; i += 1.0) {
    lines += pow(max(fract(scaledY), fract(-scaledY)), i * 2.0);
  }

  float pattern = vMask * lines;

  float cycleT = fullT * uColorCycleSpeed;
  float rChannel = (pattern + lines * ridge) * (cos(blended.y + cycleT * 0.234) * 0.5 + 1.0);
  float gChannel = (pattern + vMask * ridge) * (sin(blended.x + cycleT * 1.745) * 0.5 + 1.0);
  float bChannel = (pattern + lines * ridge) * (cos(blended.x + cycleT * 0.534) * 0.5 + 1.0);

  vec3 col = (rChannel * uColor1 + gChannel * uColor2 + bChannel * uColor3) * uBrightness;
  float alpha = clamp(length(col), 0.0, 1.0);

  gl_FragColor = vec4(col, alpha);
}
`;

export function LineWaves({
  className,
  active,
  dpr,
  resolvePointerTarget,
  speed = 0.3,
  innerLineCount = 32.0,
  outerLineCount = 36.0,
  warpIntensity = 1.0,
  rotation = -45,
  edgeFadeWidth = 0.0,
  colorCycleSpeed = 1.0,
  brightness = 0.2,
  color1 = "#ffffff",
  color2 = "#ffffff",
  color3 = "#ffffff",
  enableMouseInteraction = true,
  mouseInfluence = 2.0,
}: LineWavesProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const enableMouseRef = useRef(enableMouseInteraction);
  const dprRef = useRef(dpr);
  const resolvePointerTargetRef = useRef(resolvePointerTarget);
  const resizeRef = useRef<(() => void) | null>(null);
  const propsRef = useRef({
    speed,
    innerLineCount,
    outerLineCount,
    warpIntensity,
    rotation,
    edgeFadeWidth,
    colorCycleSpeed,
    brightness,
    color1,
    color2,
    color3,
    mouseInfluence,
  });
  const startLoopRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    enableMouseRef.current = enableMouseInteraction;
  }, [enableMouseInteraction]);

  useEffect(() => {
    resolvePointerTargetRef.current = resolvePointerTarget;
  }, [resolvePointerTarget]);

  useEffect(() => {
    dprRef.current = dpr;
    resizeRef.current?.();
  }, [dpr]);

  useEffect(() => {
    propsRef.current = {
      speed,
      innerLineCount,
      outerLineCount,
      warpIntensity,
      rotation,
      edgeFadeWidth,
      colorCycleSpeed,
      brightness,
      color1,
      color2,
      color3,
      mouseInfluence,
    };
  }, [
    speed,
    innerLineCount,
    outerLineCount,
    warpIntensity,
    rotation,
    edgeFadeWidth,
    colorCycleSpeed,
    brightness,
    color1,
    color2,
    color3,
    mouseInfluence,
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
        premultipliedAlpha: false,
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
    const currentMouse = [0.5, 0.5];
    let targetMouse = [0.5, 0.5];

    function handlePointerMove(event: PointerEvent) {
      const rect = container.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) {
        return;
      }
      targetMouse = [
        (event.clientX - rect.left) / rect.width,
        1.0 - (event.clientY - rect.top) / rect.height,
      ];
    }

    function handlePointerLeave() {
      targetMouse = [0.5, 0.5];
    }

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: [1, 1, 1],
        },
        uSpeed: { value: propsRef.current.speed },
        uInnerLines: { value: propsRef.current.innerLineCount },
        uOuterLines: { value: propsRef.current.outerLineCount },
        uWarpIntensity: { value: propsRef.current.warpIntensity },
        uRotation: { value: (propsRef.current.rotation * Math.PI) / 180 },
        uEdgeFadeWidth: { value: propsRef.current.edgeFadeWidth },
        uColorCycleSpeed: { value: propsRef.current.colorCycleSpeed },
        uBrightness: { value: propsRef.current.brightness },
        uColor1: { value: hexToVec3(propsRef.current.color1) },
        uColor2: { value: hexToVec3(propsRef.current.color2) },
        uColor3: { value: hexToVec3(propsRef.current.color3) },
        uMouse: { value: new Float32Array([0.5, 0.5]) },
        uMouseInfluence: { value: propsRef.current.mouseInfluence },
        uEnableMouse: { value: enableMouseRef.current },
      },
    });

    function resize() {
      renderer.dpr = dprRef.current ?? resolveWebGlDpr();
      renderer.setSize(container.offsetWidth, container.offsetHeight);
      program.uniforms.uResolution.value = [
        gl.canvas.width,
        gl.canvas.height,
        gl.canvas.width / gl.canvas.height,
      ];
    }

    resizeRef.current = resize;
    window.addEventListener("resize", resize);

    const mesh = new Mesh(gl, { geometry, program });
    container.appendChild(gl.canvas);
    resize();

    const pointerTarget =
      resolvePointerTargetRef.current?.() ?? container.parentElement ?? container;
    pointerTarget.addEventListener("pointermove", handlePointerMove);
    pointerTarget.addEventListener("pointerleave", handlePointerLeave);

    function syncUniforms() {
      const next = propsRef.current;
      program.uniforms.uSpeed.value = next.speed;
      program.uniforms.uInnerLines.value = next.innerLineCount;
      program.uniforms.uOuterLines.value = next.outerLineCount;
      program.uniforms.uWarpIntensity.value = next.warpIntensity;
      program.uniforms.uRotation.value = (next.rotation * Math.PI) / 180;
      program.uniforms.uEdgeFadeWidth.value = next.edgeFadeWidth;
      program.uniforms.uColorCycleSpeed.value = next.colorCycleSpeed;
      program.uniforms.uBrightness.value = next.brightness;
      program.uniforms.uColor1.value = hexToVec3(next.color1);
      program.uniforms.uColor2.value = hexToVec3(next.color2);
      program.uniforms.uColor3.value = hexToVec3(next.color3);
      program.uniforms.uMouseInfluence.value = next.mouseInfluence;
      program.uniforms.uEnableMouse.value = enableMouseRef.current;
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
      program.uniforms.uTime.value = (time - timeOffset) * 0.001;

      if (enableMouseRef.current) {
        currentMouse[0] += 0.05 * (targetMouse[0] - currentMouse[0]);
        currentMouse[1] += 0.05 * (targetMouse[1] - currentMouse[1]);
        program.uniforms.uMouse.value[0] = currentMouse[0];
        program.uniforms.uMouse.value[1] = currentMouse[1];
      } else {
        program.uniforms.uMouse.value[0] = 0.5;
        program.uniforms.uMouse.value[1] = 0.5;
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
      pointerTarget.removeEventListener("pointermove", handlePointerMove);
      pointerTarget.removeEventListener("pointerleave", handlePointerLeave);
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

function LineWavesStaticFallback({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("absolute inset-0 z-0", className)}
      style={{
        backgroundColor: "var(--color-canvas)",
        backgroundImage: [
          "radial-gradient(ellipse 70% 55% at 70% 35%, color-mix(in srgb, var(--color-accent-a) 12%, transparent), transparent 70%)",
          "radial-gradient(ellipse 55% 45% at 30% 70%, color-mix(in srgb, var(--color-accent-b) 8%, transparent), transparent 65%)",
        ].join(", "),
      }}
    />
  );
}

/**
 * Hero background layers. Renders inside `section#top` as absolutely positioned
 * siblings of the hero content, so the section itself owns the stacking context.
 */
const LINE_WAVES_CONFIG: WebGLEffectConfig = {
  id: "line-waves",
  priority: "hero",
  estimatedCost: "high",
  continuous: true,
  allowMobile: true,
};

export function HeroLineWavesBackground() {
  const layerRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        ref={layerRef}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        <ManagedWebGLEffect
          config={LINE_WAVES_CONFIG}
          className="absolute inset-0 h-full w-full"
          fallback={<LineWavesStaticFallback />}
        >
          {({ shouldAnimate, dpr, pointerEnabled, isMobile }) => (
            <LineWaves
              active={shouldAnimate}
              dpr={dpr}
              resolvePointerTarget={() => layerRef.current?.parentElement ?? null}
              speed={isMobile ? 0.1 : 0.16}
              innerLineCount={isMobile ? 18 : 24}
              outerLineCount={isMobile ? 22 : 30}
              warpIntensity={isMobile ? 0.35 : 0.55}
              rotation={-35}
              edgeFadeWidth={0.15}
              colorCycleSpeed={0.35}
              brightness={0.16}
              color1="#5366D8"
              color2="#53BBAA"
              color3="#8772D6"
              enableMouseInteraction={pointerEnabled}
              mouseInfluence={0.25}
              className="pointer-events-none absolute inset-0 h-full w-full"
            />
          )}
        </ManagedWebGLEffect>
      </div>

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to right, var(--color-canvas) 0%, color-mix(in srgb, var(--color-canvas) 82%, transparent) 35%, transparent 55%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(to top, var(--color-canvas) 0%, color-mix(in srgb, var(--color-canvas) 70%, transparent) 12%, transparent 25%)",
        }}
      />
    </>
  );
}
