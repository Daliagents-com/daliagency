// Purpose: Default social preview for public pages - brand logo, not pilot marketing art.
// Scope: Shared Open Graph / Twitter image via Next.js metadata pipeline.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Dali - AI agents and workflow automation";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logoBytes = await readFile(join(process.cwd(), "public/og-logo.png"));
  const logoSrc = `data:image/png;base64,${logoBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#F7F7F5",
          color: "#111312",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 28,
            width: "100%",
            height: "100%",
            padding: "72px 96px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoSrc}
            width={560}
            height={218}
            alt=""
            style={{
              width: 560,
              height: 218,
              objectFit: "contain",
            }}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 10,
            }}
          >
            <span
              style={{
                fontSize: 28,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#6B7280",
              }}
            >
              AI agent systems
            </span>
            <span
              style={{
                maxWidth: 720,
                textAlign: "center",
                fontSize: 30,
                lineHeight: 1.35,
                letterSpacing: "-0.02em",
                color: "#374151",
              }}
            >
              Production agents and workflow automation inside tools teams already use
            </span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
