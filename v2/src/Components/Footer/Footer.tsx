"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

import Container from "@/Components/Container/Container";
import { condensedHeadings, serifText } from "@/assets/fonts";
import NoiseLayer from "@/Components/PageGrain/NoiseLayer";

const sayHiVariants = [
  { text: "Привет", lang: "ru", className: "" },
  { text: "Привіт", lang: "uk", className: "" },
  { text: "გამარჯობა", lang: "ka", className: "say-hi-word--georgian" },
  { text: "Բարև", lang: "hy", className: "say-hi-word--armenian" },
  { text: "שלום", lang: "he", className: "say-hi-word--hebrew", dir: "rtl" },
  { text: "Bonjour", lang: "fr", className: "" },
  { text: "Hola", lang: "es", className: "" },
];

export default function Footer() {
  const [sayHiTextIndex, setSayHiTextIndex] = useState(0);
  const sayHiCount = sayHiVariants.length;

  useEffect(() => {
    const interval = setInterval(() => {
      setSayHiTextIndex((perv) => perv + 1);
    }, 900);
    return () => clearInterval(interval);
  }, []);

  const normalizedSayHiIndex = Number.isFinite(sayHiTextIndex)
    ? sayHiTextIndex % sayHiCount
    : 0;
  const sayHiText = sayHiVariants[normalizedSayHiIndex] ?? sayHiVariants[0];
  const prevText =
    sayHiVariants[(normalizedSayHiIndex - 1 + sayHiCount) % sayHiCount] ??
    sayHiVariants[sayHiCount - 1];

  return (
    <footer className="relative isolate bg-[var(--footer-bg-color)] text-[var(--footer-text-color)]">
      <NoiseLayer alpha={42} className="z-0 mix-blend-multiply" />
      <div className="relative z-10 flex justify-end py-40">
        <p
          className={`text-body1 relative flex items-center gap-16 uppercase ${condensedHeadings.className}`}
        >
          Talk to Us
          <span className="bg-[var(--footer-text-color)] h-2 w-64 md:w-[100px]"></span>
        </p>
      </div>
      <Container>
        <div className="grid md:grid-cols-2">
          <div>
            <div className="overflow-hidden relative h-[136px] ">
              {sayHiVariants.map((text, idx) => (
                <motion.p
                  key={idx}
                  lang={text.lang}
                  dir={text.dir}
                  style={{ perspective: 900 }}
                  transition={{ duration: 0.7 }}
                  className={`say-hi-word ${text.className} text-[4em] py-20 absolute top-0 left-0`}
                  initial={false}
                  animate={
                    sayHiText.text === text.text
                      ? { opacity: 1, y: 0, rotateX: 0 }
                      : text.text === prevText.text
                      ? { opacity: 0, y: -50, rotateX: -90 }
                      : { opacity: 0, y: 50, rotateX: 90 }
                  }
                >
                  {text.text}
                </motion.p>
              ))}
            </div>
            <a
              href="mailto:dav.hakobyan100@gmail.com"
              className={`text-body1 ${serifText.className} underline`}
            >
              DAV.HAKOBYAN100@GMAIL.COM
            </a>
          </div>
          <div className="py-42">
            <div>
              <p className="text-body3">SOCIALS</p>
              <ul className="text-body3 mt-40 flex flex-col gap-12 uppercase">
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
          <p
            className={`${serifText.className} italic text-body5 text-right`}
          >
            Dali Labs 2023-2026
          </p>
        </div>
      </Container>
    </footer>
  );
}
