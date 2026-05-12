"use client";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import Container from "@/Components/Container/Container";
import DaliAnimation from "./DaliAnimation";
import ArrowDown from "@/assets/images/scroll--arrow-down.svg";
import Image from "next/image";

const headTextWords = {
  hide: {
    opacity: 0,
    y: 12,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.1,
    },
  },
};

export default function Hero() {
  const { scrollY } = useScroll();
  const scrollPromptOpacity = useTransform(scrollY, [0, 100], [1, 0]);

  return (
    <section className="min-h-[min(95vh,1440px)] flex flex-col justify-center relative py-16 isolate z-10 overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-2 flex-grow h-full w-full items-end overflow-hidden relative z-10">
        <motion.h1
          initial="hide"
          animate="show"
          transition={{
            ease: "easeIn",
            staggerChildren: 0.6,
            delayChildren: 2.5,
          }}
          className={`uppercase ps-16 md:ps-42 text-[40px] md:text-[72px] leading-[1.2] font-thin`}
        >
          <motion.span className="inline-block" variants={headTextWords}>
            We
          </motion.span>{" "}
          <motion.span className="inline-block" variants={headTextWords}>
            turn
          </motion.span>{" "}
          <motion.span className="inline-block" variants={headTextWords}>
            ideas
          </motion.span>
          <br />
          <motion.span className="inline-block" variants={headTextWords}>
            into
          </motion.span>{" "}
          <motion.span className="inline-block" variants={headTextWords}>
            working
          </motion.span>
          <br />
          <motion.span className="inline-block" variants={headTextWords}>
            digital
          </motion.span>{" "}
          <motion.span className="inline-block" variants={headTextWords}>
            systems
          </motion.span>
        </motion.h1>
        <div className="relative">
          <div className="top-0 left-0">
            <DaliAnimation />
          </div>
        </div>
      </div>
      <Container wide>
        <div className="flex max-md:flex-row-reverse justify-between mt-36 overflow-hidden items-center gap-24 pb-8">
          <div className="hidden md:block flex-1 mr-auto"></div>
          <motion.p
            style={{
              opacity: scrollPromptOpacity,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.5, type: "spring" }}
            className="flex flex-col items-center bg-white  shrink-0"
          >
            <span className="justify-self-center mb-10">SCROLL</span>
            <span className="justify-self-center mb-10">
              <Image src={ArrowDown} alt="" />
            </span>
          </motion.p>
          <div className="flex-1" />
        </div>
      </Container>
    </section>
  );
}
