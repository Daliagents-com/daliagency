import Link from "next/link";
import Image from "next/image";
import { onestText, syneText } from "@/assets/fonts";
import type { Locale } from "@/i18n/config";
import { blogPath, getPublishedPosts } from "@/lib/blog/loadPosts";
import { blogCopy } from "@/i18n/blog";

type BlogRelatedProps = {
  locale: Locale;
  currentSlug?: string;
};

export default function BlogRelated({ locale, currentSlug }: BlogRelatedProps) {
  const copy = blogCopy[locale];
  const others = getPublishedPosts(locale)
    .filter((p) => p.slug !== currentSlug)
    .slice(0, 6);

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
                <span className="mb-10 block overflow-hidden border border-black/10">
                  <Image
                    src={post.heroImage}
                    alt={post.heroAlt || post.title}
                    width={640}
                    height={360}
                    className="h-auto w-full object-cover"
                    sizes="16rem"
                  />
                </span>
              ) : null}
              <span
                className={`${onestText.className} block text-body6 uppercase tracking-[0.08em] text-[var(--muted)]`}
              >
                {post.type}
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
