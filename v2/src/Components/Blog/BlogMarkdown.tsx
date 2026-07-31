import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { onestText, syneText } from "@/assets/fonts";

type BlogMarkdownProps = {
  content: string;
};

export default function BlogMarkdown({ content }: BlogMarkdownProps) {
  if (!content.trim()) return null;

  return (
    <div
      className={`${onestText.className} blog-prose max-w-none text-[var(--text)]`}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h2: ({ children }) => (
            <h2
              className={`${syneText.className} mt-40 mb-16 text-body2 font-medium tracking-tight text-[var(--text)] md:text-body1`}
            >
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
              className={`${syneText.className} mt-28 mb-12 text-body3 font-medium text-[var(--text)]`}
            >
              {children}
            </h3>
          ),
          p: ({ children }) => (
            <p className="mb-16 text-body5 leading-relaxed text-[var(--text)] md:text-body4">
              {children}
            </p>
          ),
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
          code: ({ children }) => (
            <code className="rounded bg-black/5 px-6 py-2 text-[0.9em]">
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
