// Adapted from https://github.com/basementstudio/scrollytelling
// commit 0c26959b106d9e81931c30af7dfeebfd83d0a379
// source path: scrollytelling/src/components/debugger/visualizer/shared-types.ts
// SHA-256: f69c77a86c18f0548e68285f72eea69d172c25fa85bf2f56f3f0dae308f7bf51
// Adaptation: types only; debugger/visualizer not copied.

export type DataAttribute = {
  id: string;
  isScrollytellingTween: boolean;
} & (
  | { type: "root"; debug: boolean; label: string }
  | { type: "animation" | "rest"; rootId: string }
  | {
      type: "waypoint";
      rootId: string;
      label: string;
      _internalOnCall?: () => void;
      _internalOnReverseCall?: () => void;
    }
);

export type VisualizerItem = Omit<GSAPTween | GSAPTimeline, "data"> & {
  _start: number;
  _dur: number;
  data: DataAttribute;
};

export type VisualizerRoot = {
  id: string;
  debug: boolean;
  label: string;
  tween?: GSAPTimeline;
  children: VisualizerItem[];
};
