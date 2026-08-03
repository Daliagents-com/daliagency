"use client";

import {
  useEffect,
  useRef,
  useState,
  type FocusEvent,
  type PointerEvent,
} from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { projects } from "@/Components/ProjectsSelect/projects";
import MasuroLogo from "@/assets/images/projects/logos/masuro.svg";
import DaliAgentsLogo from "@/assets/images/projects/logos/dali-mark.png";
import MuqtaLogo from "@/assets/images/projects/logos/muqta.png";
import MuqtadLogo from "@/assets/images/projects/logos/muqtad.png";
import TamariLogo from "@/assets/images/projects/logos/tamari.png";
import KoraLogo from "@/assets/images/projects/logos/kora.png";
import AgentsGeLogo from "@/assets/images/projects/logos/agentsge.png";
import dynamic from "next/dynamic";
import { homeCopy } from "@/i18n/home";

// Hover-only WebGL lines - keep out of critical project list chunk graph.
const PaperDesignBackground = dynamic(
  () =>
    import("@/Components/ui/neon-dither").then((m) => m.PaperDesignBackground),
  { ssr: false },
);
import { localizePath, type Locale } from "@/i18n/config";
import { projectWork } from "@/i18n/projectWork";
import type { ProjectSlug } from "@/i18n/projects";
import { sectionTitle } from "@/lib/sectionTitle";

/** Keep WebGL lines mounted briefly after hover leave so opacity can fade out. */
const LINES_UNMOUNT_MS = 420;

interface ProjectShowcaseProps {
  excludeProjects?: string[];
  locale?: Locale;
}

type Position = {
  x: number;
  y: number;
};

const projectLogos: Partial<Record<ProjectSlug, StaticImageData>> = {
  masuro: MasuroLogo,
  uimix: DaliAgentsLogo,
  // Muqta / Muqtad share the same product mark (cart).
  muqta: MuqtaLogo,
  muqtad: MuqtadLogo,
  tamari: TamariLogo,
  kora: KoraLogo,
  agentsge: AgentsGeLogo,
};

/** Per-logo max width so dense emblems (Tamari) stay readable. */
const logoMaxClass: Partial<Record<ProjectSlug, string>> = {
  uimix: "max-w-[64px]",
  muqta: "max-w-[80px]",
  muqtad: "max-w-[80px]",
  kora: "max-w-[84px]",
  agentsge: "max-w-[88px]",
  tamari: "max-w-[104px] max-h-[88px]",
  masuro: "max-w-[80px]",
};

/** Shared dissolve for image + caption layers when switching hover. */
const layerTransition =
  "transition-[opacity,filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:duration-0";

export function ProjectShowcase({
  excludeProjects,
  locale = "en",
}: ProjectShowcaseProps) {
  const copy = homeCopy[locale];
  const options = projects.filter(
    (project) => !excludeProjects?.includes(project.slug),
  );
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isSwitching, setIsSwitching] = useState(false);
  // Mounted card for hero-style lines (lags leave so fade-out can finish).
  const [linesIndex, setLinesIndex] = useState<number | null>(null);
  const [linesVisible, setLinesVisible] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const targetPosition = useRef<Position>({ x: 0, y: 0 });
  const currentPosition = useRef<Position>({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);
  const activeIndexRef = useRef<number | null>(null);
  const switchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const linesUnmountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  // One PaperDesignBackground at a time - same vertical-line dither as hero.
  // Always restart from scale-y-0 so the bottom→top grow plays on every enter.
  useEffect(() => {
    if (linesUnmountTimer.current !== null) {
      clearTimeout(linesUnmountTimer.current);
      linesUnmountTimer.current = null;
    }

    if (activeIndex !== null) {
      setLinesIndex(activeIndex);
      setLinesVisible(false);
      // Double rAF: paint the collapsed state, then open bottom→top.
      let raf2 = 0;
      const raf1 = window.requestAnimationFrame(() => {
        raf2 = window.requestAnimationFrame(() => setLinesVisible(true));
      });
      return () => {
        window.cancelAnimationFrame(raf1);
        window.cancelAnimationFrame(raf2);
      };
    }

    setLinesVisible(false);
    linesUnmountTimer.current = setTimeout(() => {
      setLinesIndex(null);
      linesUnmountTimer.current = null;
    }, LINES_UNMOUNT_MS);

    return () => {
      if (linesUnmountTimer.current !== null) {
        clearTimeout(linesUnmountTimer.current);
        linesUnmountTimer.current = null;
      }
    };
  }, [activeIndex]);

  useEffect(() => {
    if (activeIndex === null) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    );

    const animate = () => {
      const factor = reduceMotion.matches ? 1 : 0.16;
      currentPosition.current.x +=
        (targetPosition.current.x - currentPosition.current.x) * factor;
      currentPosition.current.y +=
        (targetPosition.current.y - currentPosition.current.y) * factor;

      if (previewRef.current) {
        previewRef.current.style.transform = `translate3d(${currentPosition.current.x}px, ${currentPosition.current.y}px, 0)`;
      }

      animationFrame.current = window.requestAnimationFrame(animate);
    };

    animationFrame.current = window.requestAnimationFrame(animate);

    return () => {
      if (animationFrame.current !== null) {
        window.cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [activeIndex]);

  useEffect(() => {
    return () => {
      if (switchTimer.current !== null) {
        clearTimeout(switchTimer.current);
      }
    };
  }, []);

  if (options.length === 0) return null;

  const positionPreview = (clientX: number, clientY: number, snap = false) => {
    const preview = previewRef.current;
    const previewWidth = preview?.offsetWidth ?? 380;
    const previewHeight = preview?.offsetHeight ?? 250;
    const viewportMargin = 20;
    const cursorGap = 24;

    let x = clientX + cursorGap;
    if (x + previewWidth > window.innerWidth - viewportMargin) {
      x = clientX - previewWidth - cursorGap;
    }

    x = Math.max(
      viewportMargin,
      Math.min(x, window.innerWidth - previewWidth - viewportMargin),
    );
    const y = Math.max(
      viewportMargin,
      Math.min(
        clientY - previewHeight / 2,
        window.innerHeight - previewHeight - viewportMargin,
      ),
    );

    targetPosition.current = { x, y };

    if (snap) {
      currentPosition.current = { x, y };
      if (preview) {
        preview.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    }
  };

  const pulseSwitchBlur = (fromIndex: number | null, toIndex: number) => {
    if (
      fromIndex === null ||
      fromIndex === toIndex ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    setIsSwitching(true);
    if (switchTimer.current !== null) {
      clearTimeout(switchTimer.current);
    }
    switchTimer.current = setTimeout(() => {
      setIsSwitching(false);
      switchTimer.current = null;
    }, 320);
  };

  const handlePointerEnter = (
    index: number,
    event: PointerEvent<HTMLAnchorElement>,
  ) => {
    if (event.pointerType !== "mouse") return;
    const previous = activeIndexRef.current;
    // Snap only on first show - keep preview fluid when moving between cards.
    positionPreview(event.clientX, event.clientY, previous === null);
    pulseSwitchBlur(previous, index);
    setActiveIndex(index);
  };

  const handlePointerMove = (event: PointerEvent<HTMLAnchorElement>) => {
    if (event.pointerType !== "mouse") return;
    positionPreview(event.clientX, event.clientY);
  };

  const handleFocus = (
    index: number,
    event: FocusEvent<HTMLAnchorElement>,
  ) => {
    const previous = activeIndexRef.current;
    const rect = event.currentTarget.getBoundingClientRect();
    positionPreview(rect.right, rect.top + rect.height / 2, previous === null);
    pulseSwitchBlur(previous, index);
    setActiveIndex(index);
  };

  const activeProject =
    activeIndex === null ? null : options[activeIndex] ?? null;
  const isPreviewOpen = activeIndex !== null;

  return (
    <div aria-labelledby="project-showcase-title">
      <div className="mb-24 max-w-[680px]">
        <h2 id="project-showcase-title" className="section-label">
          {sectionTitle(1, copy.navigation.home[0])}
        </h2>
      </div>

      <div
        className="grid grid-cols-2 border-l border-t border-gray-950/15 md:grid-cols-4"
        onPointerLeave={(event) => {
          if (event.pointerType === "mouse") {
            setActiveIndex(null);
            setIsSwitching(false);
          }
        }}
      >
        {options.map((project, index) => {
          const work = projectWork[locale][project.slug as ProjectSlug];
          const logo = projectLogos[project.slug as ProjectSlug];
          const isActive = index === activeIndex;
          const href =
            project.externalLink ??
            localizePath(`/project/${project.slug}`, locale);

          const showLines = linesIndex === index;

          return (
            <Link
              key={project.slug}
              href={href}
              target={project.externalLink ? "_blank" : undefined}
              rel={project.externalLink ? "noreferrer" : undefined}
              aria-label={`${project.title}: ${work}`}
              className={`group relative flex min-h-[112px] min-w-0 flex-col overflow-hidden border-b border-r border-gray-950/15 p-10 transition-[background-color,filter,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-primary motion-reduce:transition-colors motion-reduce:duration-300 md:min-h-[160px] md:p-14 ${
                isPreviewOpen && !isActive
                  ? "opacity-55 blur-[0.6px]"
                  : "opacity-100 blur-0"
              }`}
              onPointerEnter={(event) => handlePointerEnter(index, event)}
              onPointerMove={handlePointerMove}
              onFocus={(event) => handleFocus(index, event)}
              onBlur={() => {
                setActiveIndex(null);
                setIsSwitching(false);
              }}
            >
              {showLines ? (
                <div
                  aria-hidden="true"
                  className={`pointer-events-none absolute inset-0 z-0 origin-bottom will-change-transform transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity motion-reduce:duration-200 ${
                    linesVisible && isActive
                      ? "scale-y-100 opacity-100"
                      : "scale-y-0 opacity-0"
                  }`}
                >
                  {/*
                    Grow from origin-bottom (bottom → top).
                    scaleY(-1) on the dither so simplex ink drifts upward.
                  */}
                  <div className="absolute inset-0 [transform:scaleY(-1)]">
                    <PaperDesignBackground
                      layout="strip"
                      shape="lines"
                      themeMode="light"
                      intensity={0.74}
                      colorStrength={0.62}
                      effectStrength={0.46}
                      patternScale={1.2}
                      pixelSize={4}
                      speed={0.42}
                      parallax={false}
                    />
                  </div>
                </div>
              ) : null}

              <div className="relative z-10 flex min-h-0 flex-1 flex-col">
                <div className="flex items-start justify-between gap-12">
                  <span className="font-mono text-label tabular-nums text-gray-500">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <ArrowUpRight
                    aria-hidden="true"
                    strokeWidth={1.7}
                    className={`h-16 w-16 transition-transform duration-300 motion-reduce:transition-none ${
                      isActive
                        ? "-translate-y-2 translate-x-2"
                        : "translate-x-0 translate-y-0"
                    }`}
                  />
                </div>

                <div className="flex flex-1 items-center justify-center px-4 py-8">
                  {logo ? (
                    <>
                      <Image
                        src={logo}
                        alt={project.title}
                        className={`max-h-[80px] w-auto object-contain md:max-h-[96px] ${
                          logoMaxClass[project.slug as ProjectSlug] ??
                          "max-w-[80px]"
                        }`}
                        sizes="104px"
                      />
                    </>
                  ) : (
                    <h3 className="max-w-full text-center text-[clamp(15px,1.55vw,24px)] font-medium leading-[0.95] tracking-[-0.05em] text-gray-950">
                      {project.title}
                    </h3>
                  )}
                </div>

                <p className="hidden truncate text-[10px] leading-relaxed text-gray-600 md:block">
                  {work}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div
        ref={previewRef}
        aria-hidden="true"
        className="touch-device:hidden pointer-events-none fixed left-0 top-0 z-50 hidden w-[min(420px,38vw)] will-change-transform md:block"
      >
        <div
          className={`overflow-hidden border border-black/15 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.2)] transition-[opacity,transform,filter] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-opacity motion-reduce:duration-200 ${
            isPreviewOpen
              ? "scale-100 opacity-100"
              : "scale-[0.97] opacity-0"
          } ${isSwitching ? "blur-[2px]" : "blur-0"}`}
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-gray-100">
            {options.map((project, index) => {
              const isActive = index === activeIndex;
              return (
                <div
                  key={project.slug}
                  className={`absolute inset-0 ${layerTransition} ${
                    isActive
                      ? "z-[1] scale-100 opacity-100 blur-0"
                      : "z-0 scale-[1.05] opacity-0 blur-[18px]"
                  }`}
                  style={{ backgroundColor: project.backgroundColor }}
                >
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    placeholder="blur"
                    sizes="420px"
                    className={`object-contain transition-[filter,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
                      project.orientation === "portrait" ? "p-[8%]" : "p-[5%]"
                    } ${isActive ? "scale-100" : "scale-[1.03]"}`}
                  />
                </div>
              );
            })}
          </div>

          <div className="relative min-h-[72px] border-t border-black/10 bg-white text-gray-950">
            {options.map((project, index) => {
              const work = projectWork[locale][project.slug as ProjectSlug];
              const isActive = index === activeIndex;
              return (
                <div
                  key={`${project.slug}-meta`}
                  className={`flex items-end justify-between gap-20 p-16 ${layerTransition} ${
                    isActive
                      ? "relative z-[1] opacity-100 blur-0"
                      : "pointer-events-none absolute inset-0 opacity-0 blur-[6px]"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-body5 font-medium">
                      {project.title}
                    </p>
                    <p className="mt-2 truncate text-body6 text-gray-500">
                      {work}
                    </p>
                  </div>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="h-16 w-16 shrink-0"
                    strokeWidth={1.7}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
