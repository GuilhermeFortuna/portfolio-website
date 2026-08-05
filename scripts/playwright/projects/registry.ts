import { qProject } from "./q.config";
import { nexoProject } from "./nexo.config";
import { aegisProject } from "./aegis.config";
import type { ProjectId, ScreenshotProject } from "../types";

export const PROJECTS: Record<ProjectId, ScreenshotProject> = {
  q: qProject,
  nexo: nexoProject,
  aegis: aegisProject,
};
