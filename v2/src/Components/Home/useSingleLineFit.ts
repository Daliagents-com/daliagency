"use client";

import { useEffect, useRef } from "react";

export default function useSingleLineFit<T extends HTMLElement>(
  maximumFontSize: number,
  contentKey: string,
) {
  const containerRef = useRef<T>(null);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const fitText = () => {
      const styles = window.getComputedStyle(container);
      const availableWidth =
        container.clientWidth -
        Number.parseFloat(styles.paddingLeft) -
        Number.parseFloat(styles.paddingRight);

      text.style.fontSize = `${maximumFontSize}px`;
      const naturalWidth = text.getBoundingClientRect().width;
      const fittedFontSize =
        naturalWidth > 0
          ? Math.min(
              maximumFontSize,
              maximumFontSize * (availableWidth / naturalWidth),
            )
          : maximumFontSize;

      text.style.fontSize = `${Math.max(1, fittedFontSize)}px`;
    };

    const observer = new ResizeObserver(fitText);
    observer.observe(container);
    void document.fonts.ready.then(fitText);
    fitText();

    return () => observer.disconnect();
  }, [contentKey, maximumFontSize]);

  return { containerRef, textRef };
}
