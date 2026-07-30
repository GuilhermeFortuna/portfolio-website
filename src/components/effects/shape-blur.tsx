// Adapted from https://reactbits.dev/animations/shape-blur
"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

import { cn } from "@/lib/cn";

const vertexShader = /* glsl */ `
varying vec2 v_texcoord;
void main() {
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  v_texcoord = uv;
}
`;

const fragmentShader = /* glsl */ `
varying vec2 v_texcoord;

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_pixelRatio;
uniform vec3 uColor;

uniform float u_shapeSize;
uniform float u_roundness;
uniform float u_borderSize;
uniform float u_circleSize;
uniform float u_circleEdge;

#ifndef PI
#define PI 3.1415926535897932384626433832795
#endif
#ifndef TWO_PI
#define TWO_PI 6.2831853071795864769252867665590
#endif

#ifndef VAR
#define VAR 0
#endif

#ifndef FNC_COORD
#define FNC_COORD
vec2 coord(in vec2 p) {
  p = p / u_resolution.xy;
  if (u_resolution.x > u_resolution.y) {
    p.x *= u_resolution.x / u_resolution.y;
    p.x += (u_resolution.y - u_resolution.x) / u_resolution.y / 2.0;
  } else {
    p.y *= u_resolution.y / u_resolution.x;
    p.y += (u_resolution.x - u_resolution.y) / u_resolution.x / 2.0;
  }
  p -= 0.5;
  p *= vec2(-1.0, 1.0);
  return p;
}
#endif

#define st0 coord(gl_FragCoord.xy)
#define mx coord(u_mouse * u_pixelRatio)

float sdRoundRect(vec2 p, vec2 b, float r) {
  vec2 d = abs(p - 0.5) * 4.2 - b + vec2(r);
  return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}
float sdCircle(in vec2 st, in vec2 center) {
  return length(st - center) * 2.0;
}
float sdPoly(in vec2 p, in float w, in int sides) {
  float a = atan(p.x, p.y) + PI;
  float r = TWO_PI / float(sides);
  float d = cos(floor(0.5 + a / r) * r - a) * length(max(abs(p) * 1.0, 0.0));
  return d * 2.0 - w;
}

float aastep(float threshold, float value) {
  float afwidth = length(vec2(dFdx(value), dFdy(value))) * 0.70710678118654757;
  return smoothstep(threshold - afwidth, threshold + afwidth, value);
}
float fill(in float x) { return 1.0 - aastep(0.0, x); }
float fill(float x, float size, float edge) {
  return 1.0 - smoothstep(size - edge, size + edge, x);
}
float stroke(in float d, in float t) { return (1.0 - aastep(t, abs(d))); }
float stroke(float x, float size, float w, float edge) {
  float d = smoothstep(size - edge, size + edge, x + w * 0.5) - smoothstep(size - edge, size + edge, x - w * 0.5);
  return clamp(d, 0.0, 1.0);
}

float strokeAA(float x, float size, float w, float edge) {
  float afwidth = length(vec2(dFdx(x), dFdy(x))) * 0.70710678;
  float d = smoothstep(size - edge - afwidth, size + edge + afwidth, x + w * 0.5)
    - smoothstep(size - edge - afwidth, size + edge + afwidth, x - w * 0.5);
  return clamp(d, 0.0, 1.0);
}

void main() {
  vec2 st = st0 + 0.5;
  vec2 posMouse = mx * vec2(1., -1.) + 0.5;

  float size = u_shapeSize;
  float roundness = u_roundness;
  float borderSize = u_borderSize;
  float circleSize = u_circleSize;
  float circleEdge = u_circleEdge;

  float sdfCircle = fill(
    sdCircle(st, posMouse),
    circleSize,
    circleEdge
  );

  float sdf;
  if (VAR == 0) {
    sdf = sdRoundRect(st, vec2(size), roundness);
    sdf = strokeAA(sdf, 0.0, borderSize, sdfCircle) * 4.0;
  } else if (VAR == 1) {
    sdf = sdCircle(st, vec2(0.5));
    sdf = fill(sdf, 0.6, sdfCircle) * 1.2;
  } else if (VAR == 2) {
    sdf = sdCircle(st, vec2(0.5));
    sdf = strokeAA(sdf, 0.58, 0.02, sdfCircle) * 4.0;
  } else if (VAR == 3) {
    sdf = sdPoly(st - vec2(0.5, 0.45), 0.3, 3);
    sdf = fill(sdf, 0.05, sdfCircle) * 1.4;
  }

  gl_FragColor = vec4(uColor, clamp(sdf, 0.0, 1.0));
}
`;

/** Frames per unit of pointer catch-up, matching the canonical source. */
const POINTER_DAMPING = 8;

/**
 * The shader writes its colour straight to the output framebuffer, which is read
 * as sRGB, so the uniform must carry sRGB components rather than the linear
 * working space `THREE.Color` normally holds.
 */
function toShaderColor(color: string): THREE.Color {
  return new THREE.Color(color).convertLinearToSRGB();
}

export type ShapeBlurProps = {
  className?: string;
  active: boolean;
  color: string;
  variation?: 0 | 1 | 2 | 3;
  pixelRatio?: number;
  shapeSize?: number;
  roundness?: number;
  borderSize?: number;
  circleSize?: number;
  circleEdge?: number;
};

/**
 * The mount lives inside a decorative `pointer-events: none` slot, so it can
 * never be an event target itself. The listener goes on the nearest enclosing
 * element that does receive pointer events — never on `document`, which would
 * make the effect react to movement anywhere on the page.
 */
function resolvePointerTarget(mount: HTMLElement): HTMLElement {
  let node: HTMLElement | null = mount;

  while (node && node !== document.body) {
    if (window.getComputedStyle(node).pointerEvents !== "none") {
      return node;
    }
    node = node.parentElement;
  }

  return mount;
}

export function ShapeBlur({
  className,
  active,
  color,
  variation = 0,
  pixelRatio = 2,
  shapeSize = 1.2,
  roundness = 0.4,
  borderSize = 0.05,
  circleSize = 0.3,
  circleEdge = 0.5,
}: ShapeBlurProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(active);
  const startLoopRef = useRef<(() => void) | null>(null);
  const resizeRef = useRef<(() => void) | null>(null);
  const paramsRef = useRef({
    color,
    pixelRatio,
    shapeSize,
    roundness,
    borderSize,
    circleSize,
    circleEdge,
  });

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    paramsRef.current = {
      color,
      pixelRatio,
      shapeSize,
      roundness,
      borderSize,
      circleSize,
      circleEdge,
    };
  }, [
    color,
    pixelRatio,
    shapeSize,
    roundness,
    borderSize,
    circleSize,
    circleEdge,
  ]);

  useEffect(() => {
    resizeRef.current?.();
  }, [pixelRatio]);

  useEffect(() => {
    const mountNode = mountRef.current;
    if (!mountNode) {
      return;
    }
    const mount: HTMLDivElement = mountNode;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        // The shader writes straight alpha, so blending must not assume premultiplied color.
        premultipliedAlpha: false,
      });
    } catch {
      return;
    }

    renderer.setClearColor(0x000000, 0);

    const canvas = renderer.domElement;
    canvas.style.display = "block";
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.pointerEvents = "none";
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera();
    camera.position.z = 1;

    const vMouse = new THREE.Vector2();
    const vMouseDamp = new THREE.Vector2();
    const vResolution = new THREE.Vector2();

    const geometry = new THREE.PlaneGeometry(1, 1);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        u_mouse: { value: vMouseDamp },
        u_resolution: { value: vResolution },
        u_pixelRatio: { value: 1 },
        uColor: { value: toShaderColor(paramsRef.current.color) },
        u_shapeSize: { value: paramsRef.current.shapeSize },
        u_roundness: { value: paramsRef.current.roundness },
        u_borderSize: { value: paramsRef.current.borderSize },
        u_circleSize: { value: paramsRef.current.circleSize },
        u_circleEdge: { value: paramsRef.current.circleEdge },
      },
      defines: { VAR: variation },
      transparent: true,
    });

    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    function resize() {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (width === 0 || height === 0) {
        return;
      }

      const dpr = Math.min(
        window.devicePixelRatio || 1,
        paramsRef.current.pixelRatio,
      );

      renderer.setPixelRatio(dpr);
      renderer.setSize(width, height, false);

      camera.left = -width / 2;
      camera.right = width / 2;
      camera.top = height / 2;
      camera.bottom = -height / 2;
      camera.updateProjectionMatrix();

      quad.scale.set(width, height, 1);
      vResolution.set(width, height).multiplyScalar(dpr);
      material.uniforms.u_pixelRatio.value = dpr;
    }

    resizeRef.current = resize;
    resize();

    /** Without a pointer the highlight rests at the centre of the stage. */
    function centerPointer() {
      vMouse.set(mount.clientWidth / 2, mount.clientHeight / 2);
    }

    centerPointer();
    vMouseDamp.copy(vMouse);

    function handlePointerMove(event: PointerEvent) {
      const rect = mount.getBoundingClientRect();
      vMouse.set(event.clientX - rect.left, event.clientY - rect.top);
    }

    const pointerTarget = resolvePointerTarget(mount);
    pointerTarget.addEventListener("pointermove", handlePointerMove);
    pointerTarget.addEventListener("pointerleave", centerPointer);

    const observer = new ResizeObserver(resize);
    observer.observe(mount);
    window.addEventListener("resize", resize);

    let appliedColor = paramsRef.current.color;

    function syncUniforms() {
      const params = paramsRef.current;

      if (params.color !== appliedColor) {
        material.uniforms.uColor.value.copy(toShaderColor(params.color));
        appliedColor = params.color;
      }

      material.uniforms.u_shapeSize.value = params.shapeSize;
      material.uniforms.u_roundness.value = params.roundness;
      material.uniforms.u_borderSize.value = params.borderSize;
      material.uniforms.u_circleSize.value = params.circleSize;
      material.uniforms.u_circleEdge.value = params.circleEdge;
    }

    let animationFrameId = 0;
    let running = false;
    let lastTime = 0;

    function update() {
      if (!activeRef.current) {
        running = false;
        animationFrameId = 0;
        return;
      }

      animationFrameId = requestAnimationFrame(update);

      const time = performance.now() * 0.001;
      const delta = lastTime === 0 ? 0 : time - lastTime;
      lastTime = time;

      syncUniforms();
      vMouseDamp.x = THREE.MathUtils.damp(
        vMouseDamp.x,
        vMouse.x,
        POINTER_DAMPING,
        delta,
      );
      vMouseDamp.y = THREE.MathUtils.damp(
        vMouseDamp.y,
        vMouse.y,
        POINTER_DAMPING,
        delta,
      );

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
    }

    return () => {
      startLoopRef.current = null;
      resizeRef.current = null;
      running = false;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      observer.disconnect();
      window.removeEventListener("resize", resize);
      pointerTarget.removeEventListener("pointermove", handlePointerMove);
      pointerTarget.removeEventListener("pointerleave", centerPointer);
      scene.remove(quad);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      if (canvas.parentNode === mount) {
        mount.removeChild(canvas);
      }
    };
  }, [variation]);

  useEffect(() => {
    if (active) {
      startLoopRef.current?.();
    }
  }, [active]);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className={cn("h-full w-full", className)}
    />
  );
}
