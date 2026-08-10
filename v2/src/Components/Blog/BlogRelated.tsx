import Link from "next/link";
import { onestText, syneText } from "@/assets/fonts";
import type { Locale } from "@/i18n/config";
import { blogPath } from "@/lib/blog/loadPosts";
import { getRelatedPosts } from "@/lib/blog/relatedPosts";
import { blogCopy, getBlogTypeLabel } from "@/i18n/blog";
import BlogMedia from "./BlogMedia";

type BlogRelatedProps = {
  locale: Locale;
  currentSlug?: string;
};

export default function BlogRelated({ locale, currentSlug }: BlogRelatedProps) {
  const copy = blogCopy[locale];
  const others = currentSlug
    ? getRelatedPosts(locale, currentSlug, 6)
    : getRelatedPosts(locale, "", 6);

  if (others.length === 0) {
    return null;
  }

  return (
    <aside
      className="w-full min-w-0 shrink-0 lg:ml-auto lg:w-[15.5rem] xl:w-[16.5rem] md:sticky md:top-28 md:self-start"
      aria-label={copy.moreArticles}
    >
      <p
        className={`${syneText.className} mb-14 text-body6 uppercase tracking-[0.14em] text-[var(--muted)]`}
      >
        {copy.moreArticles}
      </p>

      <ul className="flex flex-col gap-16">
        {others.map((post) => (
          <li key={post.slug} className="min-w-0">
            <Link
              href={blogPath(locale, post.slug)}
              className="group block transition-opacity hover:opacity-75"
            >
              {post.heroImage ? (
                <div className="mb-10">
                  <BlogMedia
                    src={post.heroImage}
                    alt={post.heroAlt || post.title}
                    width={640}
                    height={360}
                    sizes="16rem"
                    variant="card"
                  />
                </div>
              ) : null}
              <span
                className={`${onestText.className} block text-body6 uppercase tracking-[0.08em] text-[var(--muted)]`}
              >
                {getBlogTypeLabel(locale, post.type)}
              </span>
              <span
                className={`${syneText.className} mt-6 block text-body5 font-medium leading-snug text-[var(--text)] md:text-body4`}
              >
                {post.title}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
