import { ImageResponse } from "next/og";

import { defaultOpenGraphTitle } from "@/lib/seo";

export const alt = defaultOpenGraphTitle;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "#06070a",
          color: "#f4f4f5",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 28,
            fontWeight: 700,
            letterSpacing: "0.28em",
            color: "#8ea0ff",
          }}
        >
          GUILHERME
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 64,
              fontWeight: 600,
              lineHeight: 1.1,
              maxWidth: 980,
            }}
          >
            {defaultOpenGraphTitle}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              color: "#a1a1aa",
              letterSpacing: "0.04em",
            }}
          >
            AI · Product Engineering · Data · Infrastructure
          </div>
        </div>
      </div>
    ),
    size,
  );
}
