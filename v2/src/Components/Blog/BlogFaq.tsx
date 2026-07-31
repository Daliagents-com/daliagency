"use client";

import { useId, useState } from "react";
import { onestText, syneText } from "@/assets/fonts";
import type { FaqItem } from "@/lib/blog/parseFaq";

type BlogFaqProps = {
  title: string;
  items: FaqItem[];
};

export default function BlogFaq({ title, items }: BlogFaqProps) {
  const baseId = useId();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <section className="mt-40" aria-labelledby={`${baseId}-heading`}>
      <h2
        id={`${baseId}-heading`}
        className={`${syneText.className} mb-16 text-body2 font-medium tracking-tight text-[var(--text)] md:text-body1`}
      >
        {title}
      </h2>

      <ul className="flex flex-col gap-10 border-t border-black/10">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `${baseId}-panel-${index}`;
          const buttonId = `${baseId}-button-${index}`;

          return (
            <li key={`${item.question}-${index}`} className="border-b border-black/10">
              <h3 className="m-0">
                <button
                  type="button"
                  id={buttonId}
                  className={`${syneText.className} flex w-full items-center justify-between gap-16 py-16 text-left text-body4 font-medium text-[var(--text)] transition-opacity hover:opacity-70 md:text-body3`}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span>{item.question}</span>
                  <span
                    aria-hidden
                    className={`${onestText.className} shrink-0 text-body3 tabular-nums text-[var(--muted)]`}
                  >
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                hidden={!isOpen}
                className={`${onestText.className} pb-18 text-body5 leading-relaxed text-[var(--text)] md:text-body4`}
              >
                {isOpen ? <p className="m-0 whitespace-pre-wrap">{item.answer}</p> : null}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
