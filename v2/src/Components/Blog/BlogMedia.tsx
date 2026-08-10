/* eslint-disable @next/next/no-img-element */
import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { monoText, onestText } from "@/assets/fonts";
import styles from "./BlogMedia.module.css";

type BlogMediaKind = "editorial" | "diagram" | "screenshot" | "code";
type BlogMediaVariant = "hero" | "body" | "card";

type BlogMediaProps = {
  src: string;
  alt: string;
  caption?: string;
  kind?: BlogMediaKind;
  width?: number;
  height?: number;
  figureNumber?: number;
  sourceLabel?: string;
  sourceHref?: string;
  capturedAt?: string;
  priority?: boolean;
  sizes?: string;
  variant?: BlogMediaVariant;
};

type MediaDimensions = {
  width: number;
  height: number;
};

const DEFAULT_DIMENSIONS: Record<BlogMediaKind, MediaDimensions> = {
  editorial: { width: 1600, height: 900 },
  diagram: { width: 1600, height: 900 },
  screenshot: { width: 1600, height: 1000 },
  code: { width: 1600, height: 1000 },
};

const svgDimensionCache = new Map<string, MediaDimensions | null>();

function inferKind(src: string, kind?: BlogMediaKind): BlogMediaKind {
  if (kind) return kind;
  if (src.startsWith("/") && src.toLowerCase().endsWith(".svg")) return "diagram";
  return "editorial";
}

function getLocalSvgDimensions(src: string): MediaDimensions | null {
  if (!src.startsWith("/") || !src.toLowerCase().endsWith(".svg")) return null;

  const cached = svgDimensionCache.get(src);
  if (cached !== undefined) return cached;

  const publicRoot = path.resolve(process.cwd(), "public");
  const filePath = path.resolve(publicRoot, `.${src}`);

  const publicPrefix = `${publicRoot}${path.sep}`;

  if (filePath !== publicRoot && !filePath.startsWith(publicPrefix)) {
    svgDimensionCache.set(src, null);
    return null;
  }

  try {
    const svg = fs.readFileSync(filePath, "utf8");
    const widthMatch = svg.match(/\bwidth=["']([\d.]+)(px)?["']/i);
    const heightMatch = svg.match(/\bheight=["']([\d.]+)(px)?["']/i);

    if (widthMatch && heightMatch) {
      const parsed = {
        width: Math.round(Number(widthMatch[1])),
        height: Math.round(Number(heightMatch[1])),
      };
      svgDimensionCache.set(src, parsed);
      return parsed;
    }

    const viewBoxMatch = svg.match(
      /\bviewBox=["'][^"']*?([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)["']/i,
    );

    if (viewBoxMatch) {
      const parsed = {
        width: Math.round(Number(viewBoxMatch[3])),
        height: Math.round(Number(viewBoxMatch[4])),
      };
      svgDimensionCache.set(src, parsed);
      return parsed;
    }
  } catch {
    svgDimensionCache.set(src, null);
    return null;
  }

  svgDimensionCache.set(src, null);
  return null;
}

function getDimensions(src: string, kind: BlogMediaKind, width?: number, height?: number): MediaDimensions {
  if (width && height) return { width, height };

  const svgDimensions = getLocalSvgDimensions(src);
  if (svgDimensions) return svgDimensions;

  return DEFAULT_DIMENSIONS[kind];
}

function joinClasses(...values: Array<string | false | null | undefined>) {
  return values.filter(Boolean).join(" ");
}

export default function BlogMedia({
  src,
  alt,
  caption,
  kind,
  width,
  height,
  figureNumber,
  sourceLabel,
  sourceHref,
  capturedAt,
  priority = false,
  sizes = "(max-width: 1024px) 100vw, 48rem",
  variant = "body",
}: BlogMediaProps) {
  const resolvedKind = inferKind(src, kind);
  const dimensions = getDimensions(src, resolvedKind, width, height);
  const isExternal = /^https?:\/\//i.test(src);
  const isSvg = src.toLowerCase().endsWith(".svg");
  const useRawImage = isExternal || isSvg;
  const isEditorial = resolvedKind === "editorial";
  const usesWindow = resolvedKind === "screenshot" || resolvedKind === "code";
  const hasCaption = Boolean(caption || sourceLabel || capturedAt);
  const showRail = variant === "body";
  const objectClass = isEditorial && variant !== "body" ? styles.fitCover : styles.fitContain;
  const surfaceStyle = usesWindow
    ? undefined
    : { aspectRatio: `${dimensions.width} / ${dimensions.height}` };

  const imageNode = useRawImage ? (
    <img
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      loading={priority ? "eager" : "lazy"}
      className={joinClasses(styles.media, objectClass)}
    />
  ) : (
    <Image
      src={src}
      alt={alt}
      width={dimensions.width}
      height={dimensions.height}
      sizes={sizes}
      priority={priority}
      className={joinClasses(styles.media, objectClass)}
    />
  );

  return (
    <figure
      className={joinClasses(
        styles.figure,
        variant === "hero" && styles.hero,
        variant === "card" && styles.card,
      )}
    >
      {showRail ? (
        <div className={styles.rail} aria-hidden="true">
          <span className={`${monoText.className} ${styles.railMark}`}>
            {String(figureNumber ?? 0).padStart(2, "0")}
          </span>
          <span className={`${monoText.className} ${styles.railWordmark}`}>Dali</span>
        </div>
      ) : null}

      <div className={styles.viewport}>
        <div
          className={joinClasses(
            styles.surface,
            styles[resolvedKind],
            usesWindow && styles.window,
            resolvedKind === "screenshot" && styles.windowShadow,
            resolvedKind === "code" && styles.codeWindow,
          )}
          style={surfaceStyle}
        >
          {usesWindow ? (
            <div
              className={joinClasses(
                styles.chrome,
                resolvedKind === "code" && styles.chromeCode,
              )}
              aria-hidden="true"
            >
              <span className={styles.chromeDot} />
              <span className={styles.chromeDot} />
              <span className={styles.chromeDot} />
            </div>
          ) : null}
          {imageNode}
        </div>
      </div>

      {hasCaption ? (
        <figcaption className={styles.caption}>
          {caption ? (
            <p className={`${onestText.className} ${styles.captionText}`}>{caption}</p>
          ) : null}
          {sourceLabel || capturedAt ? (
            <div className={`${monoText.className} ${styles.meta}`}>
              {sourceLabel ? (
                sourceHref ? (
                  <a
                    href={sourceHref}
                    target="_blank"
                    rel="noreferrer"
                    className={styles.metaLink}
                  >
                    {sourceLabel}
                  </a>
                ) : (
                  <span>{sourceLabel}</span>
                )
              ) : null}
              {capturedAt ? <time dateTime={capturedAt}>{capturedAt}</time> : null}
            </div>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
