// Purpose: Inline DiceBear avatar for product mocks (leads, inbox, tables, hero).
import { mockAvatarUrl } from "@/lib/mockAvatar";

type MockAvatarProps = {
  /** Unique seed → unique face (person name, company, or stable id). */
  seed: string;
  alt?: string;
  className?: string;
  /** Pixel size for width/height attributes; CSS usually owns layout size. */
  size?: number;
};

export function MockAvatar({
  seed,
  alt = "",
  className,
  size = 32,
}: MockAvatarProps) {
  return (
    <span className={className} aria-hidden={alt ? undefined : true}>
      {/* External SVG — plain img avoids next/image remote config for mocks. */}
      <img
        src={mockAvatarUrl(seed)}
        alt={alt}
        width={size}
        height={size}
        loading="lazy"
        decoding="async"
        draggable={false}
      />
    </span>
  );
}
