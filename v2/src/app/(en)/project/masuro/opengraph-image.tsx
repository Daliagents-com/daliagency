// Purpose: Social preview for the masuro case study - real product screenshot instead of the generic brand card.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Masuro case study - localization and video studio";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const screenshotBytes = await readFile(
    join(process.cwd(), "src/app/(en)/project/masuro/assets/screenshot.png"),
  );
  const screenshotSrc = `data:image/png;base64,${screenshotBytes.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshotSrc}
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    ),
    size,
  );
}
