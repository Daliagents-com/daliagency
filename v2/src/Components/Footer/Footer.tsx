// Purpose: Site footer - contact, resources, socials + rotating "hi" languages.
// Perf: no framer-motion - CSS transitions + rAF-free interval only when in view.
"use client";

import React, { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

import Container from "@/Components/Container/Container";
import { condensedHeadings, serifText, syneText } from "@/assets/fonts";
import {
  localeFromPathname,
  localizePath,
  stripLocalePrefix,
} from "@/i18n/config";
import { homeCopy } from "@/i18n/home";
import Link from "next/link";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import { daliContactEmail } from "@/lib/contact";

const sayHiVariants = [
  { text: "Привет", lang: "ru", className: "" },
  { text: "Привіт", lang: "uk", className: "" },
  { text: "გამარჯობა", lang: "ka", className: "say-hi-word--georgian" },
  { text: "Բարև", lang: "hy", className: "say-hi-word--armenian" },
  { text: "שלום", lang: "he", className: "say-hi-word--hebrew", dir: "rtl" as const },
  { text: "Bonjour", lang: "fr", className: "" },
  { text: "Hola", lang: "es", className: "" },
];

export default function Footer() {
  const pathname = usePathname() ?? "/";
  const locale = localeFromPathname(pathname);
  const copy = homeCopy[locale].footer;
  const solutionsLabel = homeCopy[locale].navigation.solutions[0] ?? "Solutions";
  const normalizedPathname = stripLocalePrefix(pathname);
  const [sayHiTextIndex, setSayHiTextIndex] = useState(0);
  const [isFooterVisible, setIsFooterVisible] = useState(false);
  const footerRef = useRef<HTMLElement | null>(null);
  const sayHiCount = sayHiVariants.length;
  const isUpworkProof = normalizedPathname.startsWith("/for/upwork");
  const isHome = normalizedPathname === "/";

  useEffect(() => {
    if (isUpworkProof) return undefined;
    const footer = footerRef.current;
    if (!footer) return undefined;

    if (!("IntersectionObserver" in window)) {
      setIsFooterVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsFooterVisible(entry?.isIntersecting ?? false),
      { rootMargin: "200px 0px" },
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, [isUpworkProof]);

  useEffect(() => {
    if (isUpworkProof || !isFooterVisible) return undefined;
    const interval = setInterval(() => {
      setSayHiTextIndex((prev) => prev + 1);
    }, 900);
    return () => clearInterval(interval);
  }, [isFooterVisible, isUpworkProof]);

  const normalizedSayHiIndex = Number.isFinite(sayHiTextIndex)
    ? sayHiTextIndex % sayHiCount
    : 0;
  const activeText =
    sayHiVariants[normalizedSayHiIndex]?.text ?? sayHiVariants[0].text;
  const prevText =
    sayHiVariants[(normalizedSayHiIndex - 1 + sayHiCount) % sayHiCount]
      ?.text ?? sayHiVariants[sayHiCount - 1].text;

  if (isUpworkProof) return null;

  return (
    <footer
      ref={footerRef}
      className={`${syneText.className} relative isolate bg-[var(--footer-bg-color)] text-[var(--footer-text-color)]`}
    >
      <div className="relative z-10 flex justify-end py-40">
        <p
          className={`relative flex items-center gap-16 text-body1 uppercase ${
            isHome
              ? `${syneText.className} font-medium`
              : condensedHeadings.className
          }`}
        >
          {isHome ? copy.talkToUs : copy.agentSystems}
          <span className="bg-[var(--footer-text-color)] h-2 w-64 md:w-[100px]"></span>
        </p>
      </div>
      <Container>
        <div
          className={
            isHome
              ? "grid md:grid-cols-2"
              : "grid min-w-0 gap-32 md:grid-cols-2"
          }
        >
          <div className="min-w-0">
            <div className="relative h-[136px] overflow-hidden">
              {sayHiVariants.map((text) => {
                const isActive = activeText === text.text;
                const isPrev = prevText === text.text;
                let transform = "translateY(50%) rotateX(90deg)";
                let opacity = 0;
                if (isActive) {
                  transform = "translateY(0) rotateX(0deg)";
                  opacity = 1;
                } else if (isPrev) {
                  transform = "translateY(-50%) rotateX(-90deg)";
                  opacity = 0;
                }
                return (
                  <p
                    key={text.text}
                    lang={text.lang}
                    dir={text.dir}
                    style={{
                      perspective: 900,
                      opacity,
                      transform,
                      transition: "opacity 0.7s ease, transform 0.7s ease",
                    }}
                    className={`say-hi-word ${text.className} absolute left-0 top-0 py-20 text-[4em]`}
                    aria-hidden={!isActive}
                  >
                    {text.text}
                  </p>
                );
              })}
            </div>
            {isHome ? (
              <a
                href={`mailto:${daliContactEmail}`}
                className={`break-all text-body4 md:text-body1 ${serifText.className} underline`}
              >
                {daliContactEmail.toUpperCase()}
              </a>
            ) : (
              <>
                <div className="max-w-[560px] space-y-16 pb-24">
                  <p className="text-body3 uppercase">{copy.production}</p>
                  <p className={`text-body4 ${serifText.className}`}>
                    {copy.approach}
                  </p>
                </div>
                <ConsultationTrigger
                  source="footer-consultation"
                  className="mb-20 inline-flex items-center justify-center border border-white/20 bg-white px-16 py-12 text-body5 uppercase text-primary transition-colors hover:bg-[var(--accent-soft)]"
                >
                  {copy.startAudit}
                </ConsultationTrigger>
                <div>
                  <p className="text-body6 uppercase pb-8">{copy.contact}</p>
                  <a
                    href={`mailto:${daliContactEmail}`}
                    className={`break-all text-body4 md:text-body1 ${serifText.className} underline`}
                  >
                    {daliContactEmail.toUpperCase()}
                  </a>
                </div>
              </>
            )}
          </div>
          <div className={isHome ? "py-42" : "py-42 md:pl-32"}>
            {!isHome ? (
              <a
                href="https://www.linkedin.com/in/davidhakobyan/"
                target="_blank"
                rel="noreferrer"
                className={`inline-block pb-24 text-body4 ${serifText.className} hover:underline`}
              >
                {copy.founder}
              </a>
            ) : null}
            <div>
              <p className="text-body3 uppercase">{copy.resources}</p>
              <ul className="text-body3 mt-16 flex flex-col gap-12 uppercase">
                <li>
                  <Link
                    href={localizePath("/blog", locale)}
                    className="hover:underline"
                  >
                    {copy.blog}
                  </Link>
                </li>
                <li>
                  <Link
                    href={localizePath("/solutions", locale)}
                    className="hover:underline"
                  >
                    {solutionsLabel}
                  </Link>
                </li>
              </ul>
              <p className="text-body3 uppercase mt-32">{copy.socials}</p>
              <ul className="text-body3 mt-16 flex flex-col gap-12 uppercase">
                <li>
                  <a
                    href="https://t.me/aisceptic0"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/davidhakobyan/"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://x.com/larseen66"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:underline"
                  >
                    X
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-40">
          <p className={`${serifText.className} text-body5 text-right`}>
            <a
              href="https://daliagents.com"
              className="hover:underline"
            >
              Dali Agents
            </a>
            {" · daliagents.com · 2023-2026"}
          </p>
        </div>
      </Container>
    </footer>
  );
}
