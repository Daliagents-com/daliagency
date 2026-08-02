/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: process.env.NEXT_DIST_DIR || ".next",
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  async redirects() {
    const legacyPilotMap = [
      ["lead-response", "conversation-control"],
      ["client-inbox", "conversation-control"],
      ["operations-docs", "ops-knowledge"],
      ["knowledge-assistant", "ops-knowledge"],
      ["vibe-code-rescue", "rescue-and-migration"],
    ];
    const localePrefixes = ["", "/ru", "/ge", "/arm"];
    const legacyRedirects = localePrefixes.flatMap((prefix) =>
      legacyPilotMap.flatMap(([from, to]) => [
        {
          source: `${prefix}/solutions/${from}`,
          destination: `${prefix}/solutions/${to}`,
          permanent: true,
        },
        {
          source: `/for/upwork/${from}`,
          destination: `/for/upwork/${to}`,
          permanent: true,
        },
      ]),
    );
    // de-dupe upwork redirects (generated once per locale otherwise)
    const seen = new Set();
    const uniqueLegacy = legacyRedirects.filter((rule) => {
      if (seen.has(rule.source)) return false;
      seen.add(rule.source);
      return true;
    });

    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      // /for/upwork has no index page; Upwork profiles may link the bare path.
      {
        source: "/for/upwork",
        destination: "/solutions",
        permanent: false,
      },
      {
        source: "/for",
        destination: "/solutions",
        permanent: false,
      },
      ...uniqueLegacy,
    ];
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico|woff|woff2|ttf)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig
