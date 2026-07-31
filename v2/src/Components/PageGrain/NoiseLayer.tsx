// Purpose: Render a lightweight animated grain texture without monopolizing the main thread.
// Scope: Decorative canvas used by the page frame and footer.
"use client";
import React, { useEffect, useRef } from "react";

interface Props {
  refresh?: number;
  alpha?: number;
  active?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export default function NoiseLayer({
  refresh = 2,
  alpha = 38,
  active = true,
  className = "",
  style,
}: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const c = ref.current;
    if (!c) return;
    const ctx = c.getContext("2d", { alpha: true });
    if (!ctx) return;

    const draw = () => {
      const img = ctx.createImageData(c.width, c.height);
      const d = img.data;
      for (let i = 0; i < d.length; i += 4) {
        const v = Math.random() * 255;
        d[i] = v;
        d[i + 1] = v;
        d[i + 2] = v;
        d[i + 3] = alpha;
      }
      ctx.putImageData(img, 0, 0);
    };

    const resize = () => {
      const bounds = c.getBoundingClientRect();
      const width = Math.max(1, Math.min(512, Math.ceil(bounds.width * 0.35)));
      const height = Math.max(1, Math.min(512, Math.ceil(bounds.height * 0.35)));

      if (c.width === width && c.height === height) return;

      c.width = width;
      c.height = height;
      draw();
    };

    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(c);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const interval = prefersReducedMotion || !active
      ? null
      : window.setInterval(() => {
          if (!document.hidden) draw();
        }, Math.max(140, refresh * 50));

    return () => {
      resizeObserver.disconnect();
      if (interval !== null) window.clearInterval(interval);
    };
  }, [refresh, alpha, active]);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 w-full h-full ${className}`}
      style={{ imageRendering: "pixelated", ...style }}
    />
  );
}
