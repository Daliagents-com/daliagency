"use client";
import React, { useRef } from "react";
import { CgFileDocument } from "react-icons/cg";
import { FiChevronRight } from "react-icons/fi";
import { IoPhonePortraitOutline, IoSparklesOutline } from "react-icons/io5";
import { AiOutlineScan, AiOutlineSwap } from "react-icons/ai";
import { useScroll, motion, useTransform, MotionValue } from "framer-motion";
import Container from "@/Components/Container/Container";
import { condensedHeadings, serifText } from "@/assets/fonts";
import Button from "@/Components/Button/Button";

export default function DesignSprint() {
  const container = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: container,
  });

  return (
    <section
      id="services"
      className="lg:min-h-[min(500vh,6000px)] relative py-80 isolate z-10"
      ref={container}
    >
      <div className="relative lg:sticky top-0 overflow-hidden">
        <Container className="relative">
          <div className="flex max-lg:flex-wrap justify-between gap-40 min-h-[100vh] w-full items-center ">
            <div className="max-w-[480px] p-16 rounded-12">
              <h2
                className={`${condensedHeadings.className} text-primary text-h2 uppercase leading-none lg:text-[48px] font-light`}
              >
                Websites, apps, AI agents{" "}
                <span className="amp">&amp;</span> business automation
              </h2>
              <p
                className={`${serifText.className} italic text-body2 lg:text-body1`}
              >
                We build practical digital systems: from launch-ready websites
                to internal tools that save teams time.
              </p>
              <Button
                className="mt-40 max-lg:w-full"
                href="https://ch234lt3std.typeform.com/to/OCi31Zif"
                target="_blank"
              >
                <CgFileDocument /> Get in touch <FiChevronRight />
              </Button>
            </div>
            <div className="grid lg:grid-cols-2 lg:pt-64 gap-32">
              <ul className="flex flex-col gap-32">
                {sprints.slice(0, 3).map((sprint, i) => (
                  <ResearchCard
                    key={sprint.title}
                    sprint={sprint}
                    index={i}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </ul>
              <ul className="flex flex-col gap-32 lg:mt-64">
                {sprints.slice(3).map((sprint, i) => (
                  <ResearchCard
                    key={sprint.title}
                    sprint={sprint}
                    index={i + 3}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </div>
    </section>
  );
}

function ResearchCard({
  sprint,
  scrollYProgress,
  index,
}: {
  sprint: (typeof sprints)[0];
  scrollYProgress: MotionValue<number>;
  index: number;
}) {
  const segmentLength = 1 / sprints.length;
  const segmentStart = segmentLength * index;
  const segmentEnd = segmentStart + segmentLength;

  const opacity = useTransform(
    scrollYProgress,
    [segmentStart, segmentEnd],
    [0, 1]
  );

  const y = useTransform(scrollYProgress, [segmentStart, segmentEnd], [200, 0]);
  const scale = useTransform(
    scrollYProgress,
    [segmentStart, segmentEnd],
    [0.96, 1]
  );

  return (
    <motion.li
      initial={{ opacity: 0, y: 200 }}
      style={{ opacity, y, scale }}
      key={sprint.title}
      className="group relative min-w-[240px] overflow-hidden rounded-8 border border-black/10 bg-white/95 p-20 shadow-sm transition-colors duration-300 hover:border-primary/50 hover:bg-white"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-primary/20 transition-transform duration-300 group-hover:scale-125" />

      <div className="relative flex items-start justify-between gap-24">
        <div className="flex h-48 w-48 shrink-0 items-center justify-center rounded-8 border border-black/10 bg-gray-50 text-[28px] text-primary transition-colors duration-300 group-hover:border-primary/30 group-hover:bg-primary group-hover:text-white">
          <sprint.icon aria-hidden />
        </div>
        <span className="text-body6 text-gray-500">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>

      <div className="relative mt-24 flex flex-col gap-10">
        <p className="text-body3 text-gray-950 uppercase font-normal leading-tight">
          {sprint.title}
        </p>
        <p className="text-body5 text-gray-700 leading-6">
          {sprint.description}
        </p>
      </div>

      <div className="relative mt-24 flex items-center justify-between gap-16 border-t border-black/10 pt-14">
        <span className="text-body6 uppercase text-gray-500">Output</span>
        <span className="text-body6 text-right text-gray-900">
          {sprint.output}
        </span>
      </div>
    </motion.li>
  );
}

const sprints = [
  {
    title: "Website Development",
    icon: AiOutlineScan,
    description:
      "Landing pages, company websites, and product pages built for fast launch.",
    output: "Launch-ready website",
  },
  {
    title: "Applications",
    icon: IoPhonePortraitOutline,
    description:
      "Web apps, dashboards, MVPs, and interfaces for daily business work.",
    output: "Working product",
  },
  {
    title: "AI Agents",
    icon: IoSparklesOutline,
    description:
      "Agents for support, sales, research, content, and internal operations.",
    output: "Agent workflow",
  },
  {
    title: "Automation",
    icon: AiOutlineSwap,
    description:
      "Connect CRMs, spreadsheets, forms, notifications, and AI into clear workflows.",
    output: "Automated workflows",
  },
];
