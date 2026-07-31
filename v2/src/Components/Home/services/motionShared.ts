// Purpose: Reliable mock player for services bento (no GSAP, no Framer DOM).
// Autoplay when visible; hover/click restarts from reset frame.
"use client";

import { useEffect, useRef } from "react";

export const OUT = "cubic-bezier(0.22, 1, 0.36, 1)";
export const IN_OUT = "cubic-bezier(0.45, 0, 0.55, 1)";
export const SOFT = "cubic-bezier(0.33, 1, 0.68, 1)";
export const MOVE = "cubic-bezier(0.16, 1, 0.3, 1)";
export const SNAP = "cubic-bezier(0.34, 1.4, 0.64, 1)";
export const DRAW = "cubic-bezier(0.33, 1, 0.68, 1)";
export const EASE = OUT;

export type MockPlayer = {
  restart: () => void;
  kill: () => void;
  finish: () => void;
  timeScale: (n: number) => void;
};

export type MockHost = HTMLElement & { __tl?: MockPlayer | null };

export type PlayContext = {
  signal: AbortSignal;
  animate: (
    target: Element | Element[] | Record<string, number>,
    keyframes: Record<string, string | number | Array<string | number>>,
    options?: {
      duration?: number;
      ease?: string;
      delay?: number;
      onUpdate?: () => void;
    },
  ) => Promise<void>;
  set: (
    target: Element | Element[] | null | undefined,
    styles: Record<string, string | number>,
  ) => void;
  sleep: (seconds: number) => Promise<void>;
};

export const reduced = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function camelToKebab(key: string) {
  return key.replace(/[A-Z]/g, (m) => `-${m.toLowerCase()}`);
}

function applyStyle(el: HTMLElement | SVGElement, key: string, value: string | number) {
  if (key === "x" || key === "y" || key === "scale" || key === "scaleX") {
    // Compose transform from data attrs so we can animate pieces.
    const html = el as HTMLElement;
    const curX = Number(html.dataset.tx ?? 0);
    const curY = Number(html.dataset.ty ?? 0);
    const curS = Number(html.dataset.ts ?? 1);
    const curSx = html.dataset.tsx !== undefined ? Number(html.dataset.tsx) : undefined;
    if (key === "x") html.dataset.tx = String(value);
    if (key === "y") html.dataset.ty = String(value);
    if (key === "scale") html.dataset.ts = String(value);
    if (key === "scaleX") html.dataset.tsx = String(value);
    const x = key === "x" ? Number(value) : curX;
    const y = key === "y" ? Number(value) : curY;
    const s = key === "scale" ? Number(value) : curS;
    const sx = key === "scaleX" ? Number(value) : curSx;
    if (sx !== undefined) {
      html.style.transform = `translate(${x}px, ${y}px) scaleX(${sx}) scale(${s})`;
      html.style.transformOrigin = "left center";
    } else {
      html.style.transform = `translate(${x}px, ${y}px) scale(${s})`;
    }
    return;
  }
  if (key === "left") {
    (el as HTMLElement).style.left =
      typeof value === "number" ? `${value}%` : String(value);
    return;
  }
  if (key === "opacity") {
    (el as HTMLElement).style.opacity = String(value);
    return;
  }
  if (key === "backgroundColor") {
    (el as HTMLElement).style.backgroundColor = String(value);
    return;
  }
  if (key === "borderColor") {
    (el as HTMLElement).style.borderColor = String(value);
    return;
  }
  if (key === "color") {
    (el as HTMLElement).style.color = String(value);
    return;
  }
  if (key === "strokeDashoffset") {
    (el as SVGElement).style.strokeDashoffset = String(value);
    return;
  }
  if (key === "strokeDasharray") {
    (el as SVGElement).style.strokeDasharray = String(value);
    return;
  }
  try {
    (el as HTMLElement).style.setProperty(camelToKebab(key), String(value));
  } catch {
    /* skip */
  }
}

function setStyles(
  target: Element | Element[] | null | undefined,
  styles: Record<string, string | number>,
) {
  if (!target) return;
  const list = Array.isArray(target) ? target : [target];
  list.forEach((el) => {
    if (!el) return;
    Object.entries(styles).forEach(([k, v]) =>
      applyStyle(el as HTMLElement, k, v),
    );
  });
}

function readNumericProp(el: Element, key: string): number {
  const html = el as HTMLElement;
  if (key === "x") return Number(html.dataset.tx ?? 0);
  if (key === "y") return Number(html.dataset.ty ?? 0);
  if (key === "scale") return Number(html.dataset.ts ?? 1);
  if (key === "scaleX") return Number(html.dataset.tsx ?? 0);
  if (key === "opacity") {
    const o = getComputedStyle(html).opacity;
    return o === "" ? 1 : Number(o);
  }
  if (key === "left") {
    // Prefer % if set as percent string
    const raw = html.style.left || getComputedStyle(html).left;
    if (raw.endsWith("%")) return parseFloat(raw);
    // px → approximate % of parent
    const parent = html.offsetParent as HTMLElement | null;
    const pw = parent?.clientWidth || 1;
    return (parseFloat(raw) / pw) * 100;
  }
  if (key === "strokeDashoffset") {
    return parseFloat((el as SVGElement).style.strokeDashoffset || "0");
  }
  return 0;
}

/**
 * createMockPlayer(play, { reset, finish })
 * - reset() runs before every play (and on kill)
 * - finish() for reduced-motion end frame
 */
export function createMockPlayer(
  play: (ctx: PlayContext) => Promise<void>,
  opts: { reset: () => void; finish: () => void },
): MockPlayer {
  let generation = 0;
  let scale = 1;
  let abort: AbortController | null = null;
  const timers = new Set<number>();
  const rafs = new Set<number>();

  const stopAll = () => {
    abort?.abort();
    abort = null;
    timers.forEach((id) => window.clearTimeout(id));
    timers.clear();
    rafs.forEach((id) => cancelAnimationFrame(id));
    rafs.clear();
  };

  const run = () => {
    const gen = ++generation;
    stopAll();
    opts.reset();

    const controller = new AbortController();
    abort = controller;
    const { signal } = controller;

    const sleep = (seconds: number) =>
      new Promise<void>((resolve, reject) => {
        if (signal.aborted || gen !== generation) {
          reject(new DOMException("aborted", "AbortError"));
          return;
        }
        const id = window.setTimeout(
          () => resolve(),
          (seconds * 1000) / Math.max(scale, 0.1),
        ) as unknown as number;
        timers.add(id);
        signal.addEventListener(
          "abort",
          () => {
            window.clearTimeout(id);
            timers.delete(id);
            reject(new DOMException("aborted", "AbortError"));
          },
          { once: true },
        );
      });

    const animateOne = (
      el: Element,
      keyframes: Record<string, string | number | Array<string | number>>,
      duration: number,
      ease: string,
    ) =>
      new Promise<void>((resolve, reject) => {
        if (signal.aborted || gen !== generation) {
          reject(new DOMException("aborted", "AbortError"));
          return;
        }

        const keys = Object.keys(keyframes);
        const from: Record<string, number> = {};
        const to: Record<string, number> = {};

        keys.forEach((k) => {
          const raw = keyframes[k];
          const end = Array.isArray(raw) ? raw[raw.length - 1] : raw;
          const start = Array.isArray(raw) ? raw[0] : readNumericProp(el, k);
          // string ends like "36%" or colors
          if (typeof end === "string" && (end.endsWith("%") || k === "left")) {
            from[k] =
              typeof start === "number"
                ? start
                : parseFloat(String(start));
            to[k] = parseFloat(end);
          } else if (typeof end === "string" && (k === "color" || k === "backgroundColor" || k === "borderColor")) {
            // snap color at end of duration (no interpolate)
            from[k] = 0;
            to[k] = 1;
            (el as HTMLElement).dataset[`animColor_${k}`] = end;
          } else {
            from[k] = typeof start === "number" ? start : Number(start) || 0;
            to[k] = typeof end === "number" ? end : parseFloat(String(end)) || 0;
          }
        });

        const startTime = performance.now();
        const ms = Math.max(1, duration * 1000);

        const tick = (now: number) => {
          if (signal.aborted || gen !== generation) {
            reject(new DOMException("aborted", "AbortError"));
            return;
          }
          const t = Math.min(1, (now - startTime) / ms);
          // easeOut-ish via cubic approx when ease is cubic-bezier — use t for simplicity + OUT feel
          const e = 1 - (1 - t) ** 3;
          keys.forEach((k) => {
            const raw = keyframes[k];
            const end = Array.isArray(raw) ? raw[raw.length - 1] : raw;
            if (
              typeof end === "string" &&
              (k === "color" || k === "backgroundColor" || k === "borderColor")
            ) {
              if (t >= 1) applyStyle(el as HTMLElement, k, end);
              return;
            }
            if (k === "left" || (typeof end === "string" && String(end).endsWith("%"))) {
              const v = from[k] + (to[k] - from[k]) * e;
              applyStyle(el as HTMLElement, "left", `${v}%`);
              return;
            }
            const v = from[k] + (to[k] - from[k]) * e;
            applyStyle(el as HTMLElement, k, v);
          });
          if (t < 1) {
            const id = requestAnimationFrame(tick);
            rafs.add(id);
          } else {
            resolve();
          }
        };
        const id = requestAnimationFrame(tick);
        rafs.add(id);
      });

    const runAnimate: PlayContext["animate"] = async (
      target,
      keyframes,
      options = {},
    ) => {
      if (signal.aborted || gen !== generation) {
        throw new DOMException("aborted", "AbortError");
      }
      const duration = (options.duration ?? 0.4) / Math.max(scale, 0.1);
      const delay = (options.delay ?? 0) / Math.max(scale, 0.1);
      if (delay > 0) await sleep(delay);

      // Number bag (typewriter / score)
      if (
        target &&
        typeof target === "object" &&
        !(target instanceof Element) &&
        !Array.isArray(target)
      ) {
        const obj = target as Record<string, number>;
        const to = keyframes as Record<string, number>;
        const from = { ...obj };
        const startTime = performance.now();
        const ms = Math.max(1, duration * 1000);
        await new Promise<void>((resolve, reject) => {
          const tick = (now: number) => {
            if (signal.aborted || gen !== generation) {
              reject(new DOMException("aborted", "AbortError"));
              return;
            }
            const t = Math.min(1, (now - startTime) / ms);
            const e = 1 - (1 - t) ** 3;
            Object.keys(to).forEach((k) => {
              obj[k] = (from[k] ?? 0) + ((to[k] ?? 0) - (from[k] ?? 0)) * e;
            });
            options.onUpdate?.();
            if (t < 1) {
              const id = requestAnimationFrame(tick);
              rafs.add(id);
            } else resolve();
          };
          const id = requestAnimationFrame(tick);
          rafs.add(id);
        });
        return;
      }

      const list = (
        Array.isArray(target) ? target : [target]
      ).filter(Boolean) as Element[];
      if (!list.length) return;
      await Promise.all(
        list.map((el) =>
          animateOne(el, keyframes, duration, options.ease ?? OUT),
        ),
      );
      if (signal.aborted || gen !== generation) {
        throw new DOMException("aborted", "AbortError");
      }
    };

    void (async () => {
      try {
        await play({
          signal,
          animate: runAnimate,
          set: setStyles,
          sleep,
        });
      } catch (e) {
        if ((e as Error)?.name !== "AbortError") {
          console.warn("[services-mock]", e);
        }
      }
    })();
  };

  // Start frame immediately so cards don't look "already done".
  opts.reset();

  return {
    restart: () => run(),
    kill: () => {
      generation += 1;
      stopAll();
      opts.reset();
    },
    finish: () => {
      generation += 1;
      stopAll();
      opts.finish();
    },
    timeScale: (n: number) => {
      scale = Math.max(0.1, n || 1);
    },
  };
}

/**
 * Autoplay when mock becomes visible. Hover/click uses restart().
 */
export function useMockLoop(
  build: (root: HTMLElement) => MockPlayer | null,
  delay = 0,
) {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current as MockHost | null;
    if (!root) return undefined;

    let disposed = false;
    let hasAutoPlayed = false;
    let player: MockPlayer | null = null;
    let io: IntersectionObserver | null = null;
    const timers: number[] = [];

    const clearTimers = () => {
      timers.forEach((id) => window.clearTimeout(id));
      timers.length = 0;
    };

    const playIntro = (reason: string) => {
      if (disposed || !player || hasAutoPlayed) return;
      hasAutoPlayed = true;
      root.dataset.played = "true";
      root.dataset.play = "true";
      root.dataset.playReason = reason;
      try {
        player.restart();
      } catch (e) {
        console.warn("[services-mock] restart failed", e);
      }
      io?.disconnect();
      io = null;
      clearTimers();
    };

    player = build(root);
    if (!player) {
      console.warn("[services-mock] build null", root.dataset.mock);
      return undefined;
    }
    root.__tl = player;
    root.dataset.played = "false";
    root.dataset.play = "idle";

    if (reduced()) {
      root.dataset.play = "static";
      root.dataset.played = "true";
      player.finish();
      return () => {
        disposed = true;
        player?.kill();
        root.__tl = null;
      };
    }

    const schedule = (reason: string) => {
      if (disposed || hasAutoPlayed) return;
      const id = window.setTimeout(
        () => playIntro(reason),
        Math.max(0, delay * 1000),
      ) as unknown as number;
      timers.push(id);
    };

    const visible = () => {
      const r = root.getBoundingClientRect();
      const vh = window.innerHeight || 0;
      return r.bottom > 0 && r.top < vh;
    };

    io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) schedule("io");
      },
      { threshold: 0.05, rootMargin: "100px 0px 50px 0px" },
    );
    io.observe(root);

    // Also observe #services — more reliable than tiny mock root.
    const section = document.getElementById("services");
    if (section) io.observe(section);

    // Immediate check after paint
    const boot = window.setTimeout(() => {
      if (visible()) schedule("boot");
    }, 100) as unknown as number;
    timers.push(boot);

    // Failsafe while sitting on the section
    const fail = window.setTimeout(() => {
      if (!hasAutoPlayed && visible()) playIntro("failsafe");
    }, 2500 + delay * 1000) as unknown as number;
    timers.push(fail);

    return () => {
      disposed = true;
      clearTimers();
      io?.disconnect();
      player?.kill();
      if (root.__tl === player) root.__tl = null;
    };
  }, [build, delay]);

  return rootRef;
}
