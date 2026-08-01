// Adapted from https://github.com/JosephASG/codrops-cinematic-scroll-animations
// @ 7a56d1fdc12058e3a955348a7a9f3387a2bf57da (Demo 1 / variant-1)
// Source files: cylinder-carousel.tsx, shaders.ts, utils.ts, types.ts, data.ts
// SHA-256 (WO-024): see cinematic-media-cylinder.ts header

import {
  Geometry,
  Mesh,
  Program,
  Transform,
  type OGLRenderingContext,
} from "ogl";

import type { CinematicHeroParameters } from "./cinematic-hero-parameters";

export type ParticleUserData = {
  originAngle: number;
  baseAngle: number;
  angleSpan: number;
  baseY: number;
  speed: number;
  radius: number;
};

function seededUnit(index: number, salt: number): number {
  const value = Math.sin((index + 1) * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

export function resolveParticleUserData(
  config: ParticleConfig,
  index: number,
  height: number,
): ParticleUserData {
  const startAngle = (index / config.numParticles) * Math.PI * 2;
  const isTopHalf = index < config.numParticles / 2;
  const baseY = isTopHalf
    ? height * 0.7 + seededUnit(index, 1) * height * 0.3
    : -height + seededUnit(index, 1) * height * 0.3;

  return {
    originAngle: startAngle,
    baseAngle: startAngle,
    angleSpan: config.angleSpan,
    baseY,
    speed: 0.5 + seededUnit(index, 2),
    radius: config.particleRadius,
  };
}

export type ParticleConfig = {
  numParticles: number;
  particleRadius: number;
  segments: number;
  angleSpan: number;
};

export const DEFAULT_PARTICLE_CONFIG: ParticleConfig = {
  numParticles: 12,
  particleRadius: 3.3,
  segments: 20,
  angleSpan: 0.3,
};

/** Source Demo 1 particle vertex shader (preserved). */
export const particleVertex = /* glsl */ `
  attribute vec3 position;
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  void main() {
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/** Source Demo 1 particle fragment shader (preserved). */
export const particleFragment = /* glsl */ `
  precision highp float;
  uniform vec3 uColor;
  uniform float uOpacity;

  void main() {
    gl_FragColor = vec4(uColor, uOpacity);
  }
`;

type ParticleMesh = Mesh & { userData: ParticleUserData };

/**
 * Creates curved line geometry for a single particle.
 * Adapted from D-008 `utils.createParticleGeometry`.
 */
export function createParticleGeometry(
  gl: OGLRenderingContext,
  config: ParticleConfig,
  index: number,
  height: number,
): { geometry: Geometry; userData: ParticleUserData } {
  const { particleRadius, segments, angleSpan } = config;
  const linePositions: number[] = [];
  const userData = resolveParticleUserData(config, index, height);

  for (let j = 0; j <= segments; j += 1) {
    const t = j / segments;
    const angle = userData.baseAngle + angleSpan * t;
    linePositions.push(
      Math.cos(angle) * particleRadius,
      userData.baseY,
      Math.sin(angle) * particleRadius,
    );
  }

  return {
    geometry: new Geometry(gl, {
      position: { size: 3, data: new Float32Array(linePositions) },
    }),
    userData,
  };
}

export type ReactiveParticleFieldHandle = {
  applyParameters: (
    parameters: CinematicHeroParameters,
    rotationDelta: number,
  ) => void;
  dispose: () => void;
};

export function createReactiveParticleField(
  gl: OGLRenderingContext,
  scene: Transform,
  cylinderHeight: number,
  config: ParticleConfig = DEFAULT_PARTICLE_CONFIG,
): ReactiveParticleFieldHandle {
  const particles: ParticleMesh[] = [];
  for (let i = 0; i < config.numParticles; i += 1) {
    const { geometry, userData } = createParticleGeometry(
      gl,
      config,
      i,
      cylinderHeight,
    );

    const program = new Program(gl, {
      vertex: particleVertex,
      fragment: particleFragment,
      uniforms: {
        uColor: { value: [0.92, 0.94, 1.0] },
        uOpacity: { value: 0 },
      },
      transparent: true,
      depthTest: true,
    });

    const particle = new Mesh(gl, {
      geometry,
      program,
      mode: gl.LINE_STRIP,
    }) as ParticleMesh;

    particle.userData = userData;
    particle.setParent(scene);
    particles.push(particle);
  }

  return {
    applyParameters(parameters, _rotationDelta) {
      void _rotationDelta;
      const energy = parameters.particleEnergy;
      const isActive = energy > 0.08;

      for (const particle of particles) {
        const userData = particle.userData;
        const targetOpacity = isActive
          ? Math.min(energy * 0.82, 0.9)
          : 0;
        particle.program.uniforms.uOpacity.value = targetOpacity;

        if (!isActive) continue;

        const newBaseAngle =
          userData.originAngle + parameters.cylinderRotation * userData.speed;
        userData.baseAngle = newBaseAngle;
        userData.radius =
          config.particleRadius *
          (parameters.cylinderRadius / 2.5) *
          (1 + parameters.arcExpansion * 0.35);

        const positions = particle.geometry.attributes.position
          .data as Float32Array;
        for (let j = 0; j <= config.segments; j += 1) {
          const t = j / config.segments;
          const angle = newBaseAngle + userData.angleSpan * t;
          positions[j * 3] = Math.cos(angle) * userData.radius;
          positions[j * 3 + 1] = userData.baseY;
          positions[j * 3 + 2] = Math.sin(angle) * userData.radius;
        }
        particle.geometry.attributes.position.needsUpdate = true;
      }
    },
    dispose() {
      for (const particle of particles) {
        particle.setParent(null);
      }
      particles.length = 0;
    },
  };
}
