import React from "react";
import Image, { ImageProps } from "next/image";
import macbookFrame from "./macbook-pro.png";

interface Props {
  src: ImageProps["src"];
  alt: string;
  className?: string;
  priority?: boolean;
  placeholder?: ImageProps["placeholder"];
  sizes?: string;
}

export default function LaptopFrame({
  src,
  alt,
  className = "",
  priority,
  placeholder,
  sizes = "(max-width: 768px) 80vw, 600px",
}: Props) {
  return (
    <div className={`relative aspect-[3910/2236] ${className}`}>
      <Image
        src={macbookFrame}
        alt=""
        fill
        sizes={sizes}
        className="object-contain pointer-events-none select-none"
        aria-hidden
      />
      <div
        className="absolute overflow-hidden"
        style={{
          top: "1.6%",
          bottom: "8.5%",
          left: "9.6%",
          right: "9.6%",
          borderRadius: "1.2% / 2.2%",
        }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
          priority={priority}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
}
