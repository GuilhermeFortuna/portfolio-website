// Adapted from https://github.com/basementstudio/scrollytelling
// commit 0c26959b106d9e81931c30af7dfeebfd83d0a379
// source path: scrollytelling/src/util/emmiter.ts
// SHA-256: 9c5a4a9acc09b57b60fd60e53285b2f194dca78a51c211fda0b29b2fa0249f4b
// Adaptation: filename spelling normalized to emitter.ts; logic unchanged.

type Callback = (...args: unknown[]) => void;

export class Emitter {
  events: Record<string, Callback[]>;

  constructor() {
    this.events = {};
  }

  emit(event: string, ...args: unknown[]) {
    const callbacks = this.events[event] || [];
    for (let i = 0, length = callbacks.length; i < length; i++) {
      callbacks[i]?.(...args);
    }
  }

  on(event: string, cb: Callback) {
    this.events[event]?.push(cb) || (this.events[event] = [cb]);

    return () => {
      this.off(event, cb);
    };
  }

  off(event: string, cb: Callback) {
    this.events[event] = this.events[event]?.filter((i) => cb !== i) ?? [];
  }

  destroy() {
    this.events = {};
  }
}
