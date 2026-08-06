import { spawn } from "node:child_process";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";
import { createInterface } from "node:readline/promises";
import { parseArgs } from "node:util";
import { chromium } from "playwright";
import {
  injectStabilizationCss,
  settleCanvasWebGL,
  waitForFontsAndImages,
} from "./engine/readiness";
import { runSafetyScan } from "./engine/safety-scan";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const CSS_VIEWPORT = { width: 1920, height: 1080 };

type CaptureResolution = "1440p" | "2160p";

const RESOLUTIONS: Record<
  CaptureResolution,
  { width: number; height: number; deviceScaleFactor: number; label: string }
> = {
  "1440p": {
    width: 2560,
    height: 1440,
    deviceScaleFactor: 4 / 3,
    label: "QHD",
  },
  "2160p": {
    width: 3840,
    height: 2160,
    deviceScaleFactor: 2,
    label: "4K UHD",
  },
};

interface ManualCaptureOptions {
  url: string;
  name: string;
  profile: string;
  resolution: CaptureResolution;
  fullPage: boolean;
}

async function main(): Promise<void> {
  const options = readOptions();
  const resolution = RESOLUTIONS[options.resolution];
  const runId = new Date().toISOString().replaceAll(":", "-");
  const runRoot = path.join(
    REPO_ROOT,
    "scripts/playwright/scratch",
    runId,
    "manual",
    options.profile,
  );
  const mastersDir = path.join(runRoot, "masters");
  const deliverablesDir = path.join(runRoot, "deliverables");
  const profileDir = path.join(
    REPO_ROOT,
    "scripts/playwright/profiles",
    options.profile,
  );
  const masterPath = path.join(mastersDir, `${options.name}.png`);
  const deliverablePath = path.join(deliverablesDir, `${options.name}.webp`);

  await Promise.all([
    mkdir(mastersDir, { recursive: true }),
    mkdir(deliverablesDir, { recursive: true }),
    mkdir(profileDir, { recursive: true }),
  ]);

  const context = await chromium.launchPersistentContext(profileDir, {
    headless: false,
    // Match automated captures: native Chromium scrollbars stay out of the frame.
    args: ["--hide-scrollbars"],
    viewport: CSS_VIEWPORT,
    screen: CSS_VIEWPORT,
    deviceScaleFactor: resolution.deviceScaleFactor,
  });

  const terminal = createInterface({ input: process.stdin, output: process.stdout });

  try {
    const page = context.pages()[0] ?? (await context.newPage());
    await page.goto(options.url, { waitUntil: "domcontentloaded" });

    console.log(`\nManual capture ready at ${options.url}`);
    console.log(
      `Arrange the UI in Chromium, then return here. Both outputs will be ${resolution.width}x${resolution.height} (${options.resolution} ${resolution.label}).`,
    );
    console.log(`Persistent session: ${options.profile}`);
    await terminal.question("Press Enter to capture, or Ctrl+C to cancel... ");

    await waitForFontsAndImages(page);
    await settleCanvasWebGL(page);
    await injectStabilizationCss(page);

    const scanResult = await runSafetyScan(page);
    if (scanResult.matched) {
      throw new Error(
        `capture aborted: safety scan matched pattern "${scanResult.patternName}"`,
      );
    }

    await page.screenshot({
      path: masterPath,
      fullPage: options.fullPage,
      animations: "disabled",
      caret: "hide",
      scale: "device",
    });
    await encodeWebp(masterPath, deliverablePath);

    const [master, deliverable] = await Promise.all([
      stat(masterPath),
      stat(deliverablePath),
    ]);

    console.log("\nCapture complete:");
    console.log(`PNG master: ${masterPath} (${formatBytes(master.size)})`);
    console.log(`WebP:       ${deliverablePath} (${formatBytes(deliverable.size)})`);
    if (options.fullPage) {
      console.log(
        `Full-page mode preserves the ${resolution.width}px width; height follows the document.`,
      );
    } else {
      console.log(
        `Output dimensions: ${resolution.width}x${resolution.height} (${resolution.label})`,
      );
    }
  } finally {
    terminal.close();
    await context.close();
  }
}

function readOptions(): ManualCaptureOptions {
  const { values } = parseArgs({
    options: {
      url: { type: "string", short: "u" },
      name: { type: "string", short: "n" },
      profile: { type: "string", short: "p", default: "manual" },
      resolution: { type: "string", short: "r", default: "2160p" },
      "full-page": { type: "boolean", default: false },
      help: { type: "boolean", short: "h", default: false },
    },
    strict: true,
  });

  if (values.help) {
    printHelp();
    process.exit(0);
  }

  if (!values.url || !values.name) {
    printHelp();
    throw new Error("--url and --name are required");
  }

  const parsedUrl = new URL(values.url);
  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    throw new Error("--url must use http:// or https://");
  }

  assertSafeSegment(values.name, "--name");
  assertSafeSegment(values.profile, "--profile");
  assertResolution(values.resolution);

  return {
    url: parsedUrl.toString(),
    name: values.name,
    profile: values.profile,
    resolution: values.resolution,
    fullPage: values["full-page"],
  };
}

function assertResolution(value: string): asserts value is CaptureResolution {
  if (value !== "1440p" && value !== "2160p") {
    throw new Error("--resolution must be either 1440p or 2160p");
  }
}

function assertSafeSegment(value: string, flag: string): void {
  if (!/^[a-z0-9]+(?:[._-][a-z0-9]+)*$/i.test(value)) {
    throw new Error(
      `${flag} must contain only letters, numbers, dots, underscores, and hyphens`,
    );
  }
}

function printHelp(): void {
  console.log(`Usage:
  pnpm screenshots:manual --url=<url> --name=<name> [options]

Options:
  -u, --url          Starting page (required)
  -n, --name         Output filename stem (required)
  -p, --profile      Persistent browser session name (default: manual)
  -r, --resolution   PNG and WebP resolution: 1440p or 2160p (default: 2160p)
      --full-page    Capture the full document instead of the 16:9 viewport
  -h, --help         Show this help

Example:
  pnpm screenshots:manual --url=http://localhost:5173/research --name=q-research --profile=q --resolution=1440p`);
}

function encodeWebp(inputPath: string, outputPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const process = spawn(
      "ffmpeg",
      [
        "-y",
        "-i",
        inputPath,
        "-c:v",
        "libwebp",
        "-lossless",
        "1",
        "-quality",
        "100",
        "-pix_fmt",
        "bgra",
        outputPath,
      ],
      { stdio: ["ignore", "ignore", "pipe"] },
    );
    let stderr = "";

    process.stderr.on("data", (chunk: Buffer) => {
      stderr += chunk.toString();
    });
    process.on("error", (error) => {
      reject(new Error(`failed to start ffmpeg: ${error.message}`));
    });
    process.on("exit", (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error(`ffmpeg exited with code ${code}: ${stderr.slice(-2000)}`));
      }
    });
  });
}

function formatBytes(bytes: number): string {
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KiB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MiB`;
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
