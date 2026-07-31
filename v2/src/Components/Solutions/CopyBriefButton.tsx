"use client";

// Purpose: Give visitors a reliable fallback when no desktop email client is configured.
// Scope: Copy the structured pilot brief without sending data to a third party.
import { useEffect, useRef, useState } from "react";

type CopyBriefButtonProps = {
  copiedLabel: string;
  label: string;
  text: string;
  className: string;
};

function copyWithTextarea(text: string) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "fixed";
  textarea.style.opacity = "0";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

export default function CopyBriefButton({
  copiedLabel,
  label,
  text,
  className,
}: CopyBriefButtonProps) {
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    },
    [],
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      copyWithTextarea(text);
    }

    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), 2200);
  }

  return (
    <button type="button" className={className} onClick={handleCopy}>
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
