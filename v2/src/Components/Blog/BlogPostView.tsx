import Image from "next/image";
import Link from "next/link";
import Container from "@/Components/Container/Container";
import { onestText, syneText } from "@/assets/fonts";
import type { Locale } from "@/i18n/config";
import { localizePath } from "@/i18n/config";
import type { BlogPost } from "@/lib/blog/types";
import { blogPath } from "@/lib/blog/loadPosts";
import { blogCopy } from "@/i18n/blog";
import BlogMarkdown from "./BlogMarkdown";
import BlogFaq from "./BlogFaq";
import BlogRelated from "./BlogRelated";
import ChecklistMagnet from "@/Components/LeadMagnet/ChecklistMagnet";
import ConsultationTrigger from "@/Components/Consultation/ConsultationTrigger";
import { parseBlogBody } from "@/lib/blog/parseFaq";
import { checklistPackSlugs } from "@/lib/checklist";

type BlogPostViewProps = {
  locale: Locale;
  post: BlogPost;
};

export default function BlogPostView({ locale, post }: BlogPostViewProps) {
  const copy = blogCopy[locale];
  const { body, faq, faqTitle } = parseBlogBody(post.content);

  return (
    <main className="min-h-[70vh] bg-[var(--page-bg-color)] pb-64 pt-16 md:pb-80 md:pt-20">
      <Container>
        <div className="mx-auto w-full max-w-[78rem]">
          <p className={`${onestText.className} mb-16 text-body6`}>
            <Link
              href={blogPath(locale)}
              className="uppercase tracking-[0.1em] text-[var(--muted)] underline-offset-4 hover:underline"
            >
              ← {copy.backToBlog}
            </Link>
          </p>

          <div className="flex flex-col items-start gap-24 lg:flex-row lg:justify-between lg:gap-36 xl:gap-48">
            <div className="min-w-0 w-full max-w-[48rem] flex-1">
              <header className="mb-28">
                <div
                  className={`${onestText.className} mb-12 flex flex-wrap items-center gap-10 text-body6 uppercase tracking-[0.08em] text-[var(--muted)]`}
                >
                  <time dateTime={post.date}>{post.date}</time>
                  {post.updated ? (
                    <>
                      <span aria-hidden>·</span>
                      <span>
                        {copy.updated} {" "}
                        <time dateTime={post.updated}>{post.updated}</time>
                      </span>
                    </>
                  ) : null}
                  <span aria-hidden>·</span>
                  <span>
                    {post.readingMinutes} {copy.minRead}
                  </span>
                  <span aria-hidden>·</span>
                  <span>{post.type}</span>
                </div>
                <h1
                  className={`${syneText.className} text-body1 font-medium tracking-tight text-[var(--text)] md:text-title3`}
                >
                  {post.title}
                </h1>
                <p
                  className={`${onestText.className} mt-14 text-body5 text-[var(--muted)] md:text-body4`}
                >
                  {post.description}
                </p>
                <div className="mt-16 border border-black/10 bg-white/40 px-16 py-14">
                  <p
                    className={`${syneText.className} text-body6 uppercase tracking-[0.08em] text-[var(--text)]`}
                  >
                    {copy.authorBy}
                  </p>
                  <p
                    className={`${onestText.className} mt-8 text-body6 leading-relaxed text-[var(--muted)] md:text-body5`}
                  >
                    {copy.authorBio}
                  </p>
                  <p
                    className={`${onestText.className} mt-10 text-body6 text-[var(--muted)]`}
                  >
                    <Link
                      href="/about#david-hakobyan"
                      className="underline underline-offset-4"
                    >
                      David Hakobyan
                    </Link>
                    {" · "}
                    <a
                      href="https://www.linkedin.com/in/davidhakobyan/"
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4"
                    >
                      LinkedIn
                    </a>
                    {" · "}
                    {post.author}
                  </p>
                </div>
              </header>

              {Boolean(post.heroImage) && (
                <figure className="mb-32 overflow-hidden border border-black/10 bg-white/40">
                  <Image
                    src={post.heroImage as string}
                    alt={post.heroAlt || post.title}
                    width={1920}
                    height={1080}
                    className="h-auto w-full object-cover"
                    sizes="(max-width: 1024px) 100vw, 48rem"
                    priority
                  />
                </figure>
              )}

              <BlogMarkdown content={body} locale={locale} />

              {faq.length > 0 ? (
                <BlogFaq title={faqTitle || "FAQ"} items={faq} />
              ) : null}

              {(checklistPackSlugs as readonly string[]).includes(
                post.slug,
              ) ? (
                <ChecklistMagnet
                  locale={locale}
                  source="blog-checklist-magnet"
                />
              ) : null}

              <aside className="mt-48 border border-black/10 bg-white/50 px-20 py-24 md:px-28">
                <h2
                  className={`${syneText.className} text-body4 font-medium uppercase tracking-[0.08em]`}
                >
                  {copy.ctaTitle}
                </h2>
                <p
                  className={`${onestText.className} mt-12 text-body5 text-[var(--muted)]`}
                >
                  {copy.ctaBody}
                </p>
                <div className="mt-20 flex flex-wrap gap-12">
                  <ConsultationTrigger
                    source="blog-audit"
                    className={`${syneText.className} inline-flex cursor-pointer items-center justify-center border border-black/10 bg-primary px-16 py-10 text-body6 uppercase text-white transition-colors hover:bg-primary-700`}
                  >
                    {copy.ctaButton}
                  </ConsultationTrigger>
                  <Link
                    href={localizePath("/solutions", locale)}
                    className={`${syneText.className} inline-flex items-center justify-center border border-black/15 px-16 py-10 text-body6 uppercase transition-opacity hover:opacity-70`}
                  >
                    {copy.ctaSecondary}
                  </Link>
                </div>
              </aside>
            </div>

            <BlogRelated locale={locale} currentSlug={post.slug} />
          </div>
        </div>
      </Container>
    </main>
  );
}
