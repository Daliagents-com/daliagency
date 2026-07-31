import Image from "next/image";
import Link from "next/link";
import Container from "@/Components/Container/Container";
import { onestText, syneText } from "@/assets/fonts";
import type { Locale } from "@/i18n/config";
import { blogPath, getPublishedPosts } from "@/lib/blog/loadPosts";
import { blogCopy } from "@/i18n/blog";

type BlogIndexProps = {
  locale: Locale;
};

export default function BlogIndex({ locale }: BlogIndexProps) {
  const posts = getPublishedPosts(locale);
  const copy = blogCopy[locale];

  return (
    <main className="min-h-[70vh] bg-[var(--page-bg-color)] pb-64 pt-16 md:pb-80 md:pt-20">
      <Container>
        <div className="mx-auto w-full max-w-[42rem]">
        <header className="mb-32">
          <p
            className={`${syneText.className} mb-12 text-body6 uppercase tracking-[0.14em] text-[var(--muted)]`}
          >
            {copy.kicker}
          </p>
          <h1
            className={`${syneText.className} text-body1 font-medium tracking-tight text-[var(--text)] md:text-title3`}
          >
            {copy.title}
          </h1>
          <p
            className={`${onestText.className} mt-16 text-body5 text-[var(--muted)] md:text-body4`}
          >
            {copy.lead}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className={`${onestText.className} text-body5 text-[var(--muted)]`}>
            {copy.empty}
          </p>
        ) : (
          <ul className="grid gap-20 md:gap-24">
            {posts.map((post) => (
              <li key={`${post.locale}-${post.slug}`}>
                <article className="overflow-hidden border border-black/10 bg-white/40 transition-colors hover:border-black/25">
                  {post.heroImage ? (
                    <Link
                      href={blogPath(locale, post.slug)}
                      className="block border-b border-black/10"
                    >
                      <Image
                        src={post.heroImage}
                        alt={post.heroAlt || post.title}
                        width={1920}
                        height={1080}
                        className="h-auto max-h-[14rem] w-full object-cover md:max-h-[16rem]"
                        sizes="(max-width: 768px) 100vw, 48rem"
                      />
                    </Link>
                  ) : null}
                  <div className="px-20 py-24 md:px-28 md:py-28">
                    <div
                      className={`${onestText.className} mb-10 flex flex-wrap items-center gap-10 text-body6 uppercase tracking-[0.08em] text-[var(--muted)]`}
                    >
                      <time dateTime={post.date}>{post.date}</time>
                      <span aria-hidden>·</span>
                      <span>
                        {post.readingMinutes} {copy.minRead}
                      </span>
                      <span aria-hidden>·</span>
                      <span>{post.type}</span>
                    </div>
                    <h2
                      className={`${syneText.className} text-body3 font-medium text-[var(--text)] md:text-body2`}
                    >
                      <Link
                        href={blogPath(locale, post.slug)}
                        className="transition-opacity hover:opacity-70"
                      >
                        {post.title}
                      </Link>
                    </h2>
                    <p
                      className={`${onestText.className} mt-12 max-w-[40rem] text-body5 text-[var(--muted)] md:text-body4`}
                    >
                      {post.description}
                    </p>
                    <Link
                      href={blogPath(locale, post.slug)}
                      className={`${syneText.className} mt-18 inline-block text-body6 uppercase tracking-[0.1em] text-[var(--text)] underline underline-offset-4`}
                    >
                      {copy.readMore}
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>
        )}
        </div>
      </Container>
    </main>
  );
}
