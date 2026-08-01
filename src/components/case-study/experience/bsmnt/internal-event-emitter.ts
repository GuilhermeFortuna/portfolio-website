// Adapted from https://github.com/basementstudio/scrollytelling
// commit 0c26959b106d9e81931c30af7dfeebfd83d0a379
// source path: scrollytelling/src/util/internal-event-emmiter.ts
// SHA-256: 4f84c1eab53a69cb02862eba41ed81132b4fcb63c0f536d52f2ad0f59cb622ea
// Adaptation: import path uses local emitter.ts filename.

import { Emitter } from "./emitter";

export const internalEventEmmiter = new Emitter();
