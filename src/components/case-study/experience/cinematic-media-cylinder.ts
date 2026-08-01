// Adapted from https://github.com/JosephASG/codrops-cinematic-scroll-animations
// @ 7a56d1fdc12058e3a955348a7a9f3387a2bf57da (Demo 1 / variant-1)
// Source files: cylinder-carousel.tsx, shaders.ts, utils.ts, types.ts, data.ts
// SHA-256 (WO-024): cylinder-carousel 47bd7660…; shaders 3320dcc9…; utils dde2d1d7…;
// types ca7be436…; data f1c4f914…

import {
  Geometry,
  Mesh,
  Program,
  Texture,
  Transform,
  type OGLRenderingContext,
} from "ogl";

import {
  cinematicShaderDarkness,
  type CinematicHeroParameters,
} from "./cinematic-hero-parameters";

export type CylinderConfig = {
  radius: number;
  height: number;
  radialSegments: number;
  heightSegments: number;
};

export const DEFAULT_CYLINDER_CONFIG: CylinderConfig = {
  radius: 2.5,
  height: 1.2,
  radialSegments: 64,
  heightSegments: 1,
};

export const IMAGE_TILE = {
  width: 1024,
  height: 1024,
} as const;

/** Source Demo 1 cylinder vertex shader (preserved). */
export const cylinderVertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec3 position;

  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;

  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

/** Source Demo 1 cylinder fragment shader (preserved). */
export const cylinderFragment = /* glsl */ `
  precision highp float;

  uniform sampler2D tMap;
  uniform float uDarkness;

  varying vec2 vUv;

  void main() {
    vec4 tex = texture2D(tMap, vUv);
    tex.rgb *= (1.0 - uDarkness);
    gl_FragColor = tex;
  }
`;

/**
 * Draws an image with object-fit: cover behavior on a canvas.
 * Adapted from D-008 `utils.drawImageCover`.
 */
export function drawImageCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  x: number,
  y: number,
  w: number,
  h: number,
): void {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const canvasRatio = w / h;

  let sourceX = 0;
  let sourceY = 0;
  let sourceWidth = img.naturalWidth;
  let sourceHeight = img.naturalHeight;

  if (imgRatio > canvasRatio) {
    sourceWidth = img.naturalHeight * canvasRatio;
    sourceX = (img.naturalWidth - sourceWidth) / 2;
  } else {
    sourceHeight = img.naturalWidth / canvasRatio;
    sourceY = (img.naturalHeight - sourceHeight) / 2;
  }

  ctx.save();
  ctx.translate(x, y + h);
  ctx.scale(1, -1);
  ctx.drawImage(img, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, w, h);
  ctx.restore();
}

/**
 * Creates cylinder geometry with positions, UVs, and indices.
 * Adapted from D-008 `utils.createCylinderGeometry`.
 */
export function createCylinderGeometry(
  gl: OGLRenderingContext,
  config: CylinderConfig,
): Geometry {
  const { radius, height, radialSegments, heightSegments } = config;

  const positions: number[] = [];
  const uvs: number[] = [];
  const indices: number[] = [];

  for (let y = 0; y <= heightSegments; y += 1) {
    const v = y / heightSegments;
    const yPos = (v - 0.5) * height;

    for (let x = 0; x <= radialSegments; x += 1) {
      const u = x / radialSegments;
      const theta = u * Math.PI * 2;

      positions.push(Math.cos(theta) * radius, yPos, Math.sin(theta) * radius);
      uvs.push(u, 1 - v);
    }
  }

  for (let y = 0; y < heightSegments; y += 1) {
    for (let x = 0; x < radialSegments; x += 1) {
      const a = y * (radialSegments + 1) + x;
      const b = a + radialSegments + 1;
      const c = a + 1;
      const d = b + 1;

      indices.push(a, b, c);
      indices.push(b, d, c);
    }
  }

  return new Geometry(gl, {
    position: { size: 3, data: new Float32Array(positions) },
    uv: { size: 2, data: new Float32Array(uvs) },
    index: { data: new Uint16Array(indices) },
  });
}

export type CinematicCylinderHandle = {
  mesh: Mesh;
  applyParameters: (parameters: CinematicHeroParameters) => void;
  dispose: () => void;
};

export function createCinematicCylinder(
  gl: OGLRenderingContext,
  scene: Transform,
  textureCanvas: HTMLCanvasElement,
  config: CylinderConfig = DEFAULT_CYLINDER_CONFIG,
): CinematicCylinderHandle {
  const geometry = createCylinderGeometry(gl, config);

  const texture = new Texture(gl, {
    wrapS: gl.CLAMP_TO_EDGE,
    wrapT: gl.CLAMP_TO_EDGE,
    minFilter: gl.LINEAR,
    magFilter: gl.LINEAR,
    generateMipmaps: false,
  });
  texture.image = textureCanvas;
  texture.needsUpdate = true;

  const program = new Program(gl, {
    vertex: cylinderVertex,
    fragment: cylinderFragment,
    uniforms: {
      tMap: { value: texture },
      uDarkness: { value: 0.3 },
    },
    cullFace: null,
  });

  const mesh = new Mesh(gl, { geometry, program });
  mesh.setParent(scene);
  mesh.rotation.y = 0.5;

  return {
    mesh,
    applyParameters(parameters) {
      const radiusScale = parameters.cylinderRadius / config.radius;
      const arcY = 1 + parameters.arcExpansion * 1.35;
      const scale = parameters.mediaScale * radiusScale;
      mesh.rotation.y = parameters.cylinderRotation;
      mesh.scale.set(scale, scale * arcY, scale);
      program.uniforms.uDarkness.value = cinematicShaderDarkness(parameters);
    },
    dispose() {
      mesh.setParent(null);
    },
  };
}

export async function buildCylinderTextureAtlas(
  gl: OGLRenderingContext,
  sources: readonly string[],
): Promise<HTMLCanvasElement> {
  const numImages = Math.max(sources.length, 1);
  const hardwareLimit = gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
  const safeLimit = Math.min(hardwareLimit, 8192);

  const totalWidthOriginal = IMAGE_TILE.width * numImages;
  const heightOriginal = IMAGE_TILE.height;
  const scale = Math.min(1, safeLimit / totalWidthOriginal);

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d", {
    willReadFrequently: false,
    alpha: false,
  });
  if (!ctx) {
    throw new Error("Failed to allocate cylinder texture canvas.");
  }

  canvas.width = Math.floor(totalWidthOriginal * scale);
  canvas.height = Math.floor(heightOriginal * scale);

  const images = await Promise.all(
    sources.map(
      (src) =>
        new Promise<HTMLImageElement>((resolve, reject) => {
          const img = new Image();
          img.decoding = "async";
          img.onload = () => resolve(img);
          img.onerror = () => reject(new Error(`Failed to load media: ${src}`));
          img.src = src;
        }),
    ),
  );

  images.forEach((img, i) => {
    const xStartExact = (i / numImages) * canvas.width;
    const xEndExact = ((i + 1) / numImages) * canvas.width;
    const xPos = Math.floor(xStartExact);
    const drawWidthActual = Math.floor(xEndExact) - xPos;
    drawImageCover(ctx, img, xPos, 0, drawWidthActual, canvas.height);
  });

  return canvas;
}
