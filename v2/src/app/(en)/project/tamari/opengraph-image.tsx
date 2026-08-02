// Purpose: Social preview for the tamari case study - real product screenshot instead of the generic brand card.
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Saint King Tamari case study - daily wisdom of the saints app";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const screenshotBytes = await readFile(
    join(process.cwd(), "src/app/(en)/project/tamari/assets/screenshot.jpg"),
  );
  const screenshotSrc = `data:image/jpeg;base64,${screenshotBytes.toString("base64")}`;

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
            objectFit: "contain",
          }}
        />
      </div>
    ),
    size,
  );
}
