// Adapted from https://github.com/basementstudio/scrollytelling
// commit 0c26959b106d9e81931c30af7dfeebfd83d0a379
// Minimal D-006 surface for WO-026: Root, Animation, Waypoint, context hooks.
// Debugger, Parallax, Pin, Stagger, image-sequence, and Portal were not copied.

export { Animation } from "./animation";
export {
  useDispatcher,
  useScrollytelling,
  type ScrollytellingContextType,
  type ScrollytellingDispatchersContextType,
} from "./context";
export { Root } from "./root";
export { Waypoint } from "./waypoint";
