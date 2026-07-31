// Purpose: Button/link that opens the on-site consultation modal.
"use client";

import type { ButtonHTMLAttributes, ReactNode } from "react";
import { useConsultationOptional } from "./ConsultationContext";

type Props = {
  source?: string;
  className?: string;
  children: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type" | "className">;

export default function ConsultationTrigger({
  source = "cta",
  className,
  children,
  onClick,
  ...rest
}: Props) {
  const consultation = useConsultationOptional();

  return (
    <button
      type="button"
      className={className}
      data-cta={source}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        if (consultation) {
          consultation.openConsultation(source);
          return;
        }
        window.location.hash = "consultation";
        window.dispatchEvent(
          new CustomEvent("dali:open-consultation", {
            detail: { source },
          }),
        );
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
