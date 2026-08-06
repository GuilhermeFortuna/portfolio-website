export type ProjectMedia = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** True while this is an authored placeholder standing in for a real capture. */
  placeholder?: boolean;
};

/*
 * `projects.ts` belongs to Batch 04; this file is VIZ-005's own so the
 * persistent aperture can carry media without writing to that scope. Every
 * project gets an entry so the aperture renders through one code path.
 * Project media stays separate from project copy so the persistent aperture
 * can swap or optimize a visual without changing the content registry.
 */
export const projectMedia: Record<string, ProjectMedia> = {
  aegis: {
    src: "/work/aegis/aegis-portfolio.png",
    alt: "Aegis Fraud Intelligence cinematic logo with glowing mechanical eye",
    width: 3840,
    height: 2160,
  },
  q: {
    src: "/work/q/quant-portfolio.png",
    alt: "Quant cinematic logo with metallic Q mark and bronze topographic patterns",
    width: 3840,
    height: 2160,
  },
  gosigapp: {
    src: "/work/gosigapp/gosigapp-portfolio.webp",
    alt: "Cinematic gosigapp pipeline sculpture transforming archive data into a secure API submission",
    width: 1600,
    height: 900,
  },
  "nexo-dental": {
    src: "/work/nexo-dental/nexo-entry-final.webp",
    alt: "Nexo Dental sculptural mark mural from the product entry experience",
    width: 1920,
    height: 1080,
  },
};
