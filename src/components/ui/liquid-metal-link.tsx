// Adapted from https://21st.dev/@johuniq/components/liquid-metal-button
"use client";

import {
  getShaderColorFromString,
  LiquidMetalShapes,
  liquidMetalFragmentShader,
  ShaderMount,
} from "@paper-design/shaders";
import { type ReactElement, useEffect, useRef } from "react";

import { ManagedWebGLEffect } from "@/components/webgl/managed-webgl-effect";
import type { WebGLEffectConfig } from "@/components/webgl/webgl-manager";
import { cn } from "@/lib/cn";

const LIQUID_METAL_CONFIG: WebGLEffectConfig = {
  id: "liquid-metal",
  priority: "hero",
  estimatedCost: "low",
  continuous: true,
  allowMobile: false,
};

/** Source idle speed; the manager pauses the loop by setting speed to 0. */
const SHADER_IDLE_SPEED = 0.6;
/** The metal only fills a pill a few hundred CSS pixels wide. */
const SHADER_MAX_PIXEL_COUNT = 240_000;
/** Color-burn strength of the accent tint over the metal stripes. */
const TINT_STRENGTH = 0.55;

function readShaderUniforms(element: HTMLElement) {
  const tint = getComputedStyle(element)
    .getPropertyValue("--color-accent-a")
    .trim();
  const [red, green, blue] = getShaderColorFromString(tint);

  return {
    u_colorBack: [0, 0, 0, 0],
    u_colorTint: [red, green, blue, TINT_STRENGTH],
    u_repetition: 4,
    u_softness: 0.5,
    u_shiftRed: 0.3,
    u_shiftBlue: 0.3,
    u_distortion: 0,
    u_contour: 0,
    u_angle: 45,
    u_scale: 8,
    // The source uses the circle shape for a fixed-width button; a pill needs the
    // canvas-fill shape so the metal reaches both ends of the label.
    u_shape: LiquidMetalShapes.none,
    u_offsetX: 0.1,
    u_offsetY: -0.1,
  };
}

function LiquidMetalShaderLayer({
  active,
  dpr,
}: {
  active: boolean;
  dpr: number;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<ShaderMount | null>(null);
  const activeRef = useRef(active);

  useEffect(() => {
    const node = mountRef.current;
    if (!node) {
      return;
    }

    let mount: ShaderMount;
    try {
      mount = new ShaderMount(
        node,
        liquidMetalFragmentShader,
        readShaderUniforms(node),
        undefined,
        0,
        undefined,
        dpr,
        SHADER_MAX_PIXEL_COUNT,
      );
    } catch {
      return;
    }

    shaderRef.current = mount;
    mount.setSpeed(activeRef.current ? SHADER_IDLE_SPEED : 0);

    return () => {
      mount.dispose();
      shaderRef.current = null;
    };
  }, [dpr]);

  useEffect(() => {
    activeRef.current = active;
    shaderRef.current?.setSpeed(active ? SHADER_IDLE_SPEED : 0);
  }, [active]);

  return <div ref={mountRef} className="absolute inset-0" />;
}

function LiquidMetalStaticFallback() {
  return (
    <span
      className="absolute inset-0"
      style={{
        background:
          "linear-gradient(120deg, var(--color-accent-a) 0%, var(--color-accent-b) 100%)",
      }}
    />
  );
}

type LiquidMetalLinkProps = {
  href: string;
  children: string;
  className?: string;
};

export function LiquidMetalLink({
  href,
  children,
  className,
}: LiquidMetalLinkProps): ReactElement {
  return (
    <a
      href={href}
      className={cn(
        "group relative isolate inline-flex items-center justify-center transition-[translate,opacity] duration-[var(--duration-fast)] ease-[var(--ease-standard)] motion-safe:hover:-translate-y-px motion-safe:active:translate-y-0",
        className,
      )}
      style={{
        height: "3.5rem",
        paddingInline: "1.5rem",
        borderRadius: "var(--radius-pill)",
        border: "1px solid var(--color-line-strong)",
        color: "var(--color-text)",
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
      }}
    >
      <ManagedWebGLEffect
        config={LIQUID_METAL_CONFIG}
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[var(--radius-pill)] opacity-60 transition-opacity duration-[var(--duration-fast)] ease-[var(--ease-standard)] group-hover:opacity-[0.72]"
        fallback={<LiquidMetalStaticFallback />}
      >
        {({ shouldAnimate, dpr }) => (
          <LiquidMetalShaderLayer active={shouldAnimate} dpr={dpr} />
        )}
      </ManagedWebGLEffect>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[2px] z-[1] rounded-[var(--radius-pill)]"
        style={{ background: "rgba(12, 15, 20, 0.82)" }}
      />

      <span className="relative z-[2]">{children}</span>
    </a>
  );
}
