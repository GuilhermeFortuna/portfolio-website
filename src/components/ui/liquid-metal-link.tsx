// Adapted from https://21st.dev/@johuniq/components/liquid-metal-button
"use client";

import {
  LiquidMetalShapes,
  liquidMetalFragmentShader,
  ShaderMount,
} from "@paper-design/shaders";
import {
  type HTMLAttributeAnchorTarget,
  type MouseEvent,
  type ReactElement,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

import { ManagedWebGLEffect } from "@/components/webgl/managed-webgl-effect";
import type {
  WebGLEffectConfig,
  WebGLEffectId,
} from "@/components/webgl/webgl-manager";
import { cn } from "@/lib/cn";

function createLiquidMetalConfig(id: WebGLEffectId): WebGLEffectConfig {
  return {
    id,
    priority: "hero",
    estimatedCost: "low",
    continuous: true,
    allowMobile: false,
  };
}

/** Source idle / hover / click speeds. */
const SPEED_IDLE = 0.6;
const SPEED_HOVER = 1;
const SPEED_CLICK = 2.4;
const CLICK_SPEED_MS = 300;
const RIPPLE_MS = 600;
/** The metal only fills a pill a few hundred CSS pixels wide. */
const SHADER_MAX_PIXEL_COUNT = 240_000;

const BUTTON_HEIGHT_PX = 54;
const EASE_SPRING = "cubic-bezier(0.34, 1.56, 0.64, 1)";
const EASE_PRESS = "cubic-bezier(0.4, 0, 0.2, 1)";

const SHADOW_IDLE =
  "0px 0px 0px 1px rgba(0, 0, 0, 0.3), 0px 36px 14px 0px rgba(0, 0, 0, 0.02), 0px 20px 12px 0px rgba(0, 0, 0, 0.08), 0px 9px 9px 0px rgba(0, 0, 0, 0.12), 0px 2px 5px 0px rgba(0, 0, 0, 0.15)";
const SHADOW_HOVER =
  "0px 0px 0px 1px rgba(0, 0, 0, 0.4), 0px 12px 6px 0px rgba(0, 0, 0, 0.05), 0px 8px 5px 0px rgba(0, 0, 0, 0.1), 0px 4px 4px 0px rgba(0, 0, 0, 0.15), 0px 1px 2px 0px rgba(0, 0, 0, 0.2)";
const SHADOW_PRESSED =
  "0px 0px 0px 1px rgba(0, 0, 0, 0.5), 0px 1px 2px 0px rgba(0, 0, 0, 0.3)";
const INSET_PRESSED =
  "inset 0px 2px 4px rgba(0, 0, 0, 0.4), inset 0px 1px 2px rgba(0, 0, 0, 0.3)";

const SHADER_UNIFORMS = {
  u_colorBack: [0, 0, 0, 0] as [number, number, number, number],
  u_colorTint: [0, 0, 0, 0] as [number, number, number, number],
  u_repetition: 4,
  u_softness: 0.5,
  u_shiftRed: 0.3,
  u_shiftBlue: 0.3,
  u_distortion: 0,
  u_contour: 0,
  u_angle: 45,
  u_scale: 8,
  // Source uses circle for a fixed-width button; canvas-fill keeps the metal rim
  // continuous around a longer label like "Explore my work".
  u_shape: LiquidMetalShapes.none,
  u_offsetX: 0.1,
  u_offsetY: -0.1,
};

type Ripple = { x: number; y: number; id: number };

function LiquidMetalShaderLayer({
  active,
  dpr,
  speed,
}: {
  active: boolean;
  dpr: number;
  speed: number;
}) {
  const mountRef = useRef<HTMLDivElement>(null);
  const shaderRef = useRef<ShaderMount | null>(null);
  const activeRef = useRef(active);
  const speedRef = useRef(speed);

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
        SHADER_UNIFORMS,
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
    mount.setSpeed(activeRef.current ? speedRef.current : 0);

    return () => {
      mount.dispose();
      shaderRef.current = null;
    };
  }, [dpr]);

  useEffect(() => {
    activeRef.current = active;
    speedRef.current = speed;
    shaderRef.current?.setSpeed(active ? speed : 0);
  }, [active, speed]);

  return (
    <div
      ref={mountRef}
      className="liquid-metal-shader absolute inset-0 overflow-hidden rounded-[100px] [&_canvas]:absolute [&_canvas]:inset-0 [&_canvas]:block [&_canvas]:!h-full [&_canvas]:!w-full [&_canvas]:rounded-[100px]"
    />
  );
}

function LiquidMetalStaticFallback() {
  return (
    <span
      className="absolute inset-0 rounded-[100px]"
      style={{
        background:
          "linear-gradient(160deg, #d8d8d8 0%, #8a8a8a 45%, #f2f2f2 100%)",
      }}
    />
  );
}

type LiquidMetalLinkProps = {
  href: string;
  children: string;
  className?: string;
  /** Unique manager id when more than one Liquid Metal link is on screen. */
  effectId?: Extract<WebGLEffectId, `liquid-metal${string}`>;
  target?: HTMLAttributeAnchorTarget;
  rel?: string;
};

export function LiquidMetalLink({
  href,
  children,
  className,
  effectId = "liquid-metal",
  target,
  rel,
}: LiquidMetalLinkProps): ReactElement {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const rippleId = useRef(0);
  const clickResetRef = useRef<number | null>(null);
  const isHoveredRef = useRef(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [shaderSpeed, setShaderSpeed] = useState(SPEED_IDLE);
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const rippleKeyframesId = useId().replace(/:/g, "");

  useEffect(() => {
    const styleId = `liquid-metal-ripple-${rippleKeyframesId}`;
    if (document.getElementById(styleId)) {
      return;
    }

    const style = document.createElement("style");
    style.id = styleId;
    style.textContent = `
      @keyframes liquid-metal-ripple {
        0% { transform: translate(-50%, -50%) scale(0); opacity: 0.6; }
        100% { transform: translate(-50%, -50%) scale(4); opacity: 0; }
      }
    `;
    document.head.appendChild(style);

    return () => {
      style.remove();
    };
  }, [rippleKeyframesId]);

  useEffect(() => {
    return () => {
      if (clickResetRef.current !== null) {
        window.clearTimeout(clickResetRef.current);
      }
    };
  }, []);

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
    setIsHovered(true);
    setShaderSpeed(SPEED_HOVER);
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    setIsHovered(false);
    setIsPressed(false);
    setShaderSpeed(SPEED_IDLE);
  };

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    setShaderSpeed(SPEED_CLICK);
    if (clickResetRef.current !== null) {
      window.clearTimeout(clickResetRef.current);
    }
    clickResetRef.current = window.setTimeout(() => {
      setShaderSpeed(isHoveredRef.current ? SPEED_HOVER : SPEED_IDLE);
      clickResetRef.current = null;
    }, CLICK_SPEED_MS);

    const node = linkRef.current;
    if (!node) {
      return;
    }

    const rect = node.getBoundingClientRect();
    const ripple = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
      id: rippleId.current++,
    };
    setRipples((prev) => [...prev, ripple]);
    window.setTimeout(() => {
      setRipples((prev) => prev.filter((item) => item.id !== ripple.id));
    }, RIPPLE_MS);
  };

  const pressTransform = isPressed
    ? "translateY(1px) scale(0.98)"
    : "translateY(0) scale(1)";

  return (
    <a
      ref={linkRef}
      href={href}
      target={target}
      rel={rel}
      className={cn(
        "group relative isolate inline-flex items-center justify-center rounded-[100px]",
        className,
      )}
      style={{
        height: BUTTON_HEIGHT_PX,
        paddingInline: "1.5rem",
        color: "var(--color-text)",
        fontFamily: "var(--font-geist-mono), monospace",
        fontSize: "0.875rem",
        fontWeight: 600,
        letterSpacing: "0.08em",
        textTransform: "uppercase",
        textShadow: "0px 1px 2px rgba(0, 0, 0, 0.5)",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onClick={handleClick}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-[100px]"
        style={{
          boxShadow: isPressed
            ? SHADOW_PRESSED
            : isHovered
              ? SHADOW_HOVER
              : SHADOW_IDLE,
          transition: `box-shadow 0.15s ${EASE_PRESS}, transform 0.8s ${EASE_SPRING}`,
          transform: pressTransform,
        }}
      >
        <ManagedWebGLEffect
          config={createLiquidMetalConfig(effectId)}
          className="absolute inset-0 overflow-hidden rounded-[100px]"
          fallback={<LiquidMetalStaticFallback />}
        >
          {({ shouldAnimate, dpr }) => (
            <LiquidMetalShaderLayer
              active={shouldAnimate}
              dpr={dpr}
              speed={shaderSpeed}
            />
          )}
        </ManagedWebGLEffect>
      </span>

      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-[2px] z-20 rounded-[100px]"
        style={{
          background: "linear-gradient(180deg, #202020 0%, #000000 100%)",
          boxShadow: isPressed ? INSET_PRESSED : "none",
          transform: pressTransform,
          transition: `box-shadow 0.15s ${EASE_PRESS}, transform 0.8s ${EASE_SPRING}`,
        }}
      />

      <span className="relative z-30">{children}</span>

      {ripples.map((ripple) => (
        <span
          key={ripple.id}
          aria-hidden="true"
          className="pointer-events-none absolute z-40 size-5 rounded-full"
          style={{
            left: ripple.x,
            top: ripple.y,
            background:
              "radial-gradient(circle, rgba(255, 255, 255, 0.4) 0%, rgba(255, 255, 255, 0) 70%)",
            animation: "liquid-metal-ripple 0.6s ease-out",
          }}
        />
      ))}
    </a>
  );
}
