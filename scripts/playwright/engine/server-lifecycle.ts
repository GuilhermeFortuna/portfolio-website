import { spawn, type ChildProcess } from "node:child_process";
import type { Logger, ServerStartup } from "../types";

export interface EnsureServerResult {
  started: boolean;
  proc?: ChildProcess;
}

async function isReachable(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(2000) });
    return res.ok || (res.status >= 200 && res.status < 500);
  } catch {
    return false;
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function waitUntilReady(
  server: ServerStartup,
  proc: ChildProcess | undefined,
): Promise<void> {
  const pollIntervalMs = server.pollIntervalMs ?? 500;
  const deadline = Date.now() + server.readyTimeoutMs;
  let lastStderr = "";

  if (proc?.stderr) {
    proc.stderr.on("data", (chunk: Buffer) => {
      lastStderr = chunk.toString();
    });
  }

  while (Date.now() < deadline) {
    if (proc && proc.exitCode !== null) {
      throw new Error(
        `server process exited early (code ${proc.exitCode}) before becoming ready.${
          lastStderr ? ` Last stderr: ${lastStderr}` : ""
        }`,
      );
    }
    if (await isReachable(server.readyUrl)) {
      if (!server.readyCheck || (await server.readyCheck(server.readyUrl))) {
        return;
      }
    }
    await sleep(pollIntervalMs);
  }

  throw new Error(
    `timed out after ${server.readyTimeoutMs}ms waiting for ${server.readyUrl} to become ready` +
      `${server.readyCheck ? " (including its readyCheck)" : ""}.`,
  );
}

/**
 * Ensures a project's server is available: reuses an already-running,
 * already-ready server; otherwise runs `setup` and spawns `command`.
 * Never kills or mutates a server this call didn't start itself.
 */
export async function ensureServer(
  server: ServerStartup,
  log: Logger,
): Promise<EnsureServerResult> {
  const reachable = await isReachable(server.readyUrl);
  if (reachable) {
    if (!server.readyCheck || (await server.readyCheck(server.readyUrl))) {
      log.info(`reusing already-running server at ${server.readyUrl}`);
      return { started: false };
    }
    throw new Error(
      `a server is already running at ${server.readyUrl} but failed its readiness check. ` +
        `Stop it or fix its state, then retry — this tool will not touch a server it did not start.`,
    );
  }

  await server.setup?.({ log });

  const [command, ...args] = server.command;
  const proc = spawn(command, args, {
    cwd: server.cwd,
    env: { ...process.env, ...server.env },
    detached: true,
    stdio: ["ignore", "pipe", "pipe"],
  });

  await waitUntilReady(server, proc);
  log.info(`server ready at ${server.readyUrl}`);
  return { started: true, proc };
}

/** Stops a server this run started. No-op if the server was reused. */
export async function stopServer(
  result: EnsureServerResult,
  server: ServerStartup,
  log: Logger,
): Promise<void> {
  if (!result.started || !result.proc) {
    return;
  }
  const proc = result.proc;
  if (proc.exitCode !== null) {
    return;
  }

  const pid = proc.pid;
  if (pid === undefined) {
    return;
  }

  try {
    if (server.stop === "sigterm-process-group") {
      process.kill(-pid, "SIGTERM");
    } else {
      proc.kill("SIGTERM");
    }
  } catch {
    // process may already be gone
  }

  const exited = await Promise.race([
    new Promise<boolean>((resolve) => proc.once("exit", () => resolve(true))),
    sleep(3000).then(() => false),
  ]);

  if (!exited) {
    log.warn("server did not exit after SIGTERM, sending SIGKILL");
    try {
      if (server.stop === "sigterm-process-group") {
        process.kill(-pid, "SIGKILL");
      } else {
        proc.kill("SIGKILL");
      }
    } catch {
      // already gone
    }
  }
}
