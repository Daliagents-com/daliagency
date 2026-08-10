import React, { type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Content, Emphasis, Image, Paragraph, Root } from "mdast";
import { onestText, syneText } from "@/assets/fonts";
import type { Locale } from "@/i18n/config";
import BlogMedia from "./BlogMedia";

type BlogMarkdownProps = {
  content: string;
  locale: Locale;
};

type Heading = {
  id: string;
  label: string;
};

type ImageParagraph = Paragraph & {
  children: [Image];
};

type CaptionParagraph = Paragraph & {
  children: [Emphasis];
};

const tocLabels: Record<Locale, string> = {
  en: "On this page",
  ru: "На этой странице",
  ge: "ამ გვერდზე",
  arm: "Այս էջում",
};

function plainHeading(value: string): string {
  return value
    .replace(/\[([^\]]+)]\([^)]+\)/g, "$1")
    .replace(/[*_`~]/g, "")
    .trim();
}

function headingSlug(value: string): string {
  return plainHeading(value)
    .toLocaleLowerCase("en")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "") || "section";
}

function extractHeadings(content: string): Heading[] {
  const seen = new Map<string, number>();
  return content
    .split("\n")
    .map((line) => line.match(/^##\s+(.+?)\s*#*$/)?.[1])
    .filter((label): label is string => Boolean(label))
    .map((label) => {
      const cleanLabel = plainHeading(label);
      const base = headingSlug(cleanLabel);
      const count = (seen.get(base) ?? 0) + 1;
      seen.set(base, count);
      return { id: count === 1 ? base : `${base}-${count}`, label: cleanLabel };
    });
}

function childrenText(value: ReactNode): string {
  if (typeof value === "string" || typeof value === "number") return String(value);
  if (Array.isArray(value)) return value.map(childrenText).join("");
  if (React.isValidElement<{ children?: ReactNode }>(value)) {
    return childrenText(value.props.children);
  }
  return "";
}

function isImageParagraph(node: Content): node is ImageParagraph {
  return (
    node.type === "paragraph" &&
    node.children.length === 1 &&
    node.children[0]?.type === "image"
  );
}

function isCaptionParagraph(node: Content): node is CaptionParagraph {
  return (
    node.type === "paragraph" &&
    node.children.length === 1 &&
    node.children[0]?.type === "emphasis"
  );
}

function mdastText(node: Content): string {
  if (node.type === "text" || node.type === "inlineCode") return node.value;
  if ("children" in node && Array.isArray(node.children)) {
    return node.children.map((child) => mdastText(child)).join(" ");
  }
  return "";
}

function promoteImageCaptions(children: Content[]): void {
  for (let index = 0; index < children.length; index += 1) {
    const current = children[index];
    const next = children[index + 1];

    if (current && next && isImageParagraph(current) && isCaptionParagraph(next)) {
      const caption = mdastText(next.children[0]).replace(/\s+/g, " ").trim();
      if (caption && !current.children[0].title) {
        current.children[0].title = caption;
        children.splice(index + 1, 1);
      }
    }

    if (current && "children" in current && Array.isArray(current.children)) {
      promoteImageCaptions(current.children as Content[]);
    }
  }
}

function remarkImageCaptions() {
  return (tree: Root) => {
    promoteImageCaptions(tree.children);
  };
}

export default function BlogMarkdown({ content, locale }: BlogMarkdownProps) {
  if (!content.trim()) return null;
  const headings = extractHeadings(content);
  let h2Index = 0;
  let mediaIndex = 0;

  return (
    <div className={`${onestText.className} blog-prose max-w-none text-[var(--text)]`}>
      {headings.length >= 4 ? (
        <nav
          aria-label={tocLabels[locale]}
          className="mb-32 border border-black/10 bg-white/40 px-18 py-18"
        >
          <p className={`${syneText.className} text-body6 font-medium uppercase tracking-[0.08em]`}>
            {tocLabels[locale]}
          </p>
          <ol className="mt-12 grid gap-8 text-body6 md:grid-cols-2 md:text-body5">
            {headings.map((heading) => (
              <li key={heading.id}>
                <a
                  href={`#${heading.id}`}
                  className="underline decoration-black/20 underline-offset-4 transition-opacity hover:opacity-60"
                >
                  {heading.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>
      ) : null}
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkImageCaptions]}
        components={{
          h2: ({ children }) => {
            const id = headings[h2Index]?.id ?? headingSlug(childrenText(children));
            h2Index += 1;
            return (
              <h2
                id={id}
                className={`${syneText.className} mt-40 mb-16 scroll-mt-24 text-body2 font-medium tracking-tight text-[var(--text)] md:text-body1`}
              >
                {children}
              </h2>
            );
          },
          h3: ({ children }) => (
            <h3
              className={`${syneText.className} mt-32 mb-12 text-body3 font-medium text-[var(--text)]`}
            >
              {children}
            </h3>
          ),
          p: ({ children, node }) => {
            const imageOnly =
              node?.children.length === 1 &&
              node.children[0]?.type === "element" &&
              node.children[0].tagName === "img";

            if (imageOnly) return <>{children}</>;

            return (
              <p className="mb-16 text-body5 leading-relaxed text-[var(--text)] md:text-body4">
                {children}
              </p>
            );
          },
          ul: ({ children }) => (
            <ul className="mb-16 list-disc space-y-8 pl-20 text-body5 md:text-body4">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="mb-16 list-decimal space-y-8 pl-20 text-body5 md:text-body4">
              {children}
            </ol>
          ),
          li: ({ children }) => <li className="leading-relaxed">{children}</li>,
          a: ({ href, children }) => (
            <a
              href={href}
              className="underline underline-offset-4 transition-opacity hover:opacity-60"
              rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
              target={href?.startsWith("http") ? "_blank" : undefined}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-[var(--text)]">{children}</strong>
          ),
          blockquote: ({ children }) => (
            <blockquote className="my-20 border-l-2 border-black/20 pl-16 text-[var(--muted)]">
              {children}
            </blockquote>
          ),
          img: ({ src, alt, title }) => {
            if (!src) return null;
            return (
              <div className="my-32">
                <BlogMedia
                  src={src}
                  alt={alt || ""}
                  caption={title || undefined}
                  figureNumber={(mediaIndex += 1)}
                  variant="body"
                />
              </div>
            );
          },
          table: ({ children }) => (
            <div className="my-24 overflow-x-auto">
              <table className="w-full min-w-[28rem] border-collapse text-left text-body6 md:text-body5">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="border-b border-black/15 px-12 py-10 font-medium">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border-b border-black/10 px-12 py-10 align-top">
              {children}
            </td>
          ),
          pre: ({ children }) => (
            <pre className="my-24 max-w-full overflow-x-auto border border-black/10 bg-black/5 p-16 text-body6 leading-relaxed">
              {children}
            </pre>
          ),
          code: ({ className, children }) => (
            <code
              className={
                className
                  ? className
                  : "rounded bg-black/5 px-6 py-2 text-[0.9em]"
              }
            >
              {children}
            </code>
          ),
          hr: () => <hr className="my-32 border-black/10" />,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
