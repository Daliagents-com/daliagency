// Purpose: Paper Design dither background for hero - white text zone, full-field effect.
// Scope: White base + gradient white→ink color; dither visible full width (no side-only mask).
// Perf: shader chunk is client-only; gated by reduced-motion / save-data.
"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const Dithering = dynamic(
  () =>
    import("@paper-design/shaders-react").then((mod) => mod.Dithering),
  { ssr: false },
);

function getSystemPrefersDark(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function shouldEnableShader(): boolean {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean };
    }
  ).connection;
  if (connection?.saveData) return false;
  return true;
}

type ThemeMode = "light" | "dark" | "system";

export type DitherShape =
  | "simplex"
  | "warp"
  | "dots"
  | "wave"
  | "ripple"
  | "swirl"
  | "sphere"
  | "lines"
  | "lines-h";

export type PaperDesignBackgroundProps = {
  themeMode?: ThemeMode;
  intensity?: number;
  colorStrength?: number;
  effectStrength?: number;
  patternScale?: number;
  pixelSize?: number;
  offsetY?: number;
  offsetX?: number;
  rotation?: number;
  shape?: DitherShape;
  /**
   * How far the white top wash covers before fading into the effect (0..1).
   * Higher = more white around the title.
   */
  whiteTop?: number;
  /**
   * "stage" = hero full-bleed (white top + bottom gradient band).
   * "strip" = fill the host box fully (for mock side rails).
   */
  layout?: "stage" | "strip";
  /** Override dither animation speed (default is derived from intensity). */
  speed?: number;
  /** Override ink color (hex). Use black/gray for monochrome. */
  frontColor?: string;
  /**
   * Flip line stripe phase (gap/line swap) so the field reads inverted
   * relative to the default hero mask.
   */
  invertLines?: boolean;
  parallax?: boolean;
  syncDocumentTheme?: boolean;
  className?: string;
};

export function PaperDesignBackground({
  themeMode = "light",
  intensity = 0.8,
  colorStrength = 0.7,
  effectStrength = 0.75,
  patternScale,
  pixelSize,
  offsetY = 0,
  offsetX = 0,
  rotation = 0,
  shape = "wave",
  whiteTop = 0.83,
  layout = "stage",
  speed: speedOverride,
  frontColor,
  invertLines = false,
  parallax = false,
  syncDocumentTheme = false,
  className = "",
}: PaperDesignBackgroundProps) {
  const [shaderOn, setShaderOn] = useState(false);
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (themeMode === "dark") return true;
    if (themeMode === "light") return false;
    return getSystemPrefersDark();
  });

  useEffect(() => {
    setShaderOn(shouldEnableShader());
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setShaderOn(shouldEnableShader());
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (themeMode === "system") {
      const mq = window.matchMedia("(prefers-color-scheme: dark)");
      const handler = (e: MediaQueryListEvent) => {
        setIsDark(e.matches);
        if (syncDocumentTheme) {
          document.documentElement.classList.toggle("dark", e.matches);
        }
      };
      setIsDark(mq.matches);
      if (syncDocumentTheme) {
        document.documentElement.classList.toggle("dark", mq.matches);
      }
      mq.addEventListener("change", handler);
      return () => mq.removeEventListener("change", handler);
    }

    const dark = themeMode === "dark";
    setIsDark(dark);
    if (syncDocumentTheme) {
      document.documentElement.classList.toggle("dark", dark);
    }
  }, [themeMode, syncDocumentTheme]);

  const config = useMemo(() => {
    const clamp = (v: number, min = 0, max = 1) =>
      Math.max(min, Math.min(max, v));
    const t = clamp(intensity);
    const c = clamp(colorStrength);
    const e = clamp(effectStrength);
    const px = pixelSize ?? Math.round(2 + t * 2);
    const scale = patternScale ?? (isDark ? 1.05 + t * 0.15 : 1.03 + t * 0.12);

    if (isDark) {
      const front =
        frontColor ?? mix("#3a2e00", "#ffd45a", 0.25 + c * 0.75);
      return {
        back: "#00000000",
        front,
        bg: "#000000",
        base: "#000000",
        speed: speedOverride ?? 0.28 + t * 0.35,
        px,
        scale,
        offsetX,
        offsetY,
        glow: frontColor
          ? "none"
          : `radial-gradient(60% 40% at 50% 40%, rgba(255,210,90,${(0.04 + c * 0.18).toFixed(3)}), transparent 70%)`,
        glowOpacity: frontColor ? 0 : e,
        vignetteOpacity: 0.12 + e * 0.28,
        grainOpacity: 0.15 + e * 0.45,
        shineOpacity: 0.1 + e * 0.2,
      };
    }

    // Light hero: pure white base, ink color for gradient + dither front.
    const front =
      frontColor ?? mix("#9bb4e8", "#2f5fd4", 0.15 + c * 0.85);
    return {
      back: "#ffffff00",
      front,
      bg: "#ffffff",
      base: "#ffffff",
      speed: speedOverride ?? 0.22 + t * 0.28,
      px,
      scale,
      offsetX,
      offsetY,
      glow: frontColor
        ? "none"
        : `radial-gradient(70% 50% at 50% 70%, ${hexToRgba(front, 0.08 + c * 0.14)}, transparent 72%)`,
      glowOpacity: frontColor ? 0 : e,
      vignetteOpacity: 0.04 + e * 0.1,
      grainOpacity: 0.1 + e * 0.35,
      shineOpacity: 0.12 + e * 0.28,
    };
  }, [
    isDark,
    intensity,
    colorStrength,
    effectStrength,
    patternScale,
    pixelSize,
    offsetX,
    offsetY,
    speedOverride,
    frontColor,
  ]);

  useEffect(() => {
    if (!parallax || layout === "strip") return;
    const root = document.getElementById("paper-bg-parallax");
    if (!root) return;

    const strength = 8;
    const onMove = (e: MouseEvent) => {
      const { innerWidth: w, innerHeight: h } = window;
      const x = (e.clientX / w) * 2 - 1;
      const y = (e.clientY / h) * 2 - 1;
      root.style.setProperty("--parallax-x", `${(-x * strength).toFixed(2)}px`);
      root.style.setProperty("--parallax-y", `${(-y * strength).toFixed(2)}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [parallax, layout]);

  const isLines = shape === "lines" || shape === "lines-h";
  // Thin strokes + wider pitch so the field reads as airy, not a solid hatch.
  const lineThickness = Math.max(1.1, config.px * 0.48);
  const linePitch = Math.max(lineThickness + 5, config.px * 3.6);
  // invertLines swaps solid/gap so stripe positions read inverted vs hero default.
  const lineMaskOn = invertLines
    ? `transparent 0 ${lineThickness}px, #000 ${lineThickness}px ${linePitch}px`
    : `#000 0 ${lineThickness}px, transparent ${lineThickness}px ${linePitch}px`;
  const lineMask =
    shape === "lines"
      ? `repeating-linear-gradient(90deg, ${lineMaskOn})`
      : shape === "lines-h"
        ? `repeating-linear-gradient(0deg, ${lineMaskOn})`
        : undefined;
  // Lines use animated simplex ink under a stripe mask; other shapes use native dither shapes.
  const ditherShape = isLines ? "simplex" : shape;
  const isStrip = layout === "strip";

  // Lines-only mode: solid white base + soft center/top veil to clear the title zone.
  const linesOnly = isLines && !isStrip;
  const whiteTopPct = Math.round(
    Math.max(0, Math.min(1, whiteTop)) * 100,
  );

  return (
    <div
      id={isStrip ? undefined : "paper-bg-parallax"}
      className={[
        "pointer-events-none absolute inset-0 overflow-hidden",
        "transition-colors duration-500",
        className,
      ].join(" ")}
      style={{
        backgroundColor: isStrip
          ? "transparent"
          : isDark
            ? config.base
            : "#ffffff",
        transform:
          parallax && !isStrip
            ? "translate3d(var(--parallax-x,0), var(--parallax-y,0), 0)"
            : undefined,
        willChange: parallax && !isStrip ? "transform" : undefined,
      }}
    >
      <div
        className="absolute inset-0"
        style={
          isLines
            ? {
                WebkitMaskImage: lineMask,
                maskImage: lineMask,
                WebkitMaskSize: "100% 100%",
                maskSize: "100% 100%",
                WebkitMaskRepeat: "repeat",
                maskRepeat: "repeat",
              }
            : undefined
        }
      >
        <div className="absolute inset-[-10%]">
          {shaderOn ? (
            <Dithering
              colorBack={linesOnly || !isDark ? "#ffffff00" : config.back}
              colorFront={config.front}
              speed={config.speed}
              shape={ditherShape}
              type="4x4"
              size={config.px}
              scale={config.scale}
              rotation={rotation}
              offsetX={config.offsetX}
              offsetY={config.offsetY}
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          ) : (
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background: isDark
                  ? `radial-gradient(70% 55% at 50% 60%, ${config.front}33, transparent 70%)`
                  : `radial-gradient(70% 55% at 50% 70%, ${config.front}22, transparent 72%)`,
              }}
            />
          )}
        </div>
      </div>

      {/* Soft grain only - no color gradient wash (except lines title veil). */}
      {!linesOnly ? (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            backgroundImage: config.glow,
            mixBlendMode: isDark ? "screen" : "multiply",
            opacity: config.glowOpacity * (isStrip ? 0.85 : 1),
          }}
        />
      ) : null}

      {/* Fade lines out in the upper/center title zone; keep sides + lower field. */}
      {linesOnly ? (
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background: [
              `radial-gradient(ellipse 68% 48% at 50% 24%, #ffffff 0%, rgba(255,255,255,0.9) 28%, rgba(255,255,255,0.4) 48%, transparent 70%)`,
              `linear-gradient(180deg, #ffffff 0%, rgba(255,255,255,0.88) ${Math.max(whiteTopPct - 34, 6)}%, rgba(255,255,255,0.28) ${whiteTopPct}%, transparent ${Math.min(whiteTopPct + 18, 100)}%)`,
            ].join(", "),
          }}
        />
      ) : null}

      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.25' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.11'/%3E%3C/svg%3E\")",
          backgroundSize: "cover",
          opacity: config.grainOpacity * (linesOnly ? 0.28 : isStrip ? 0.9 : 1),
          mixBlendMode: isDark ? "screen" : "multiply",
        }}
      />
    </div>
  );
}

function mix(a: string, b: string, t: number): string {
  const ah = a.replace("#", "");
  const bh = b.replace("#", "");
  const ai = parseInt(ah, 16);
  const bi = parseInt(bh, 16);
  const ar = (ai >> 16) & 0xff;
  const ag = (ai >> 8) & 0xff;
  const ab = ai & 0xff;
  const br = (bi >> 16) & 0xff;
  const bg = (bi >> 8) & 0xff;
  const bb = bi & 0xff;
  const rr = Math.round(ar + (br - ar) * t);
  const rg = Math.round(ag + (bg - ag) * t);
  const rb = Math.round(ab + (bb - ab) * t);
  return `#${((1 << 24) + (rr << 16) + (rg << 8) + rb).toString(16).slice(1)}`;
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "");
  const i = parseInt(h, 16);
  const r = (i >> 16) & 0xff;
  const g = (i >> 8) & 0xff;
  const b = i & 0xff;
  return `rgba(${r},${g},${b},${alpha})`;
}
