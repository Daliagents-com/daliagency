import Link from "next/link";
import Container from "@/Components/Container/Container";
import BlogMedia from "@/Components/Blog/BlogMedia";
import { onestText, syneText } from "@/assets/fonts";
import type { Locale } from "@/i18n/config";
import {
  blogCategoryPath,
  blogCopy,
  formatBlogPostCount,
  getBlogCategoryCopy,
  getBlogTypeLabel,
} from "@/i18n/blog";
import {
  isBlogCategoryId,
  listBlogCategories,
  type BlogCategoryId,
} from "@/lib/blog/categories";
import { blogPath, getPublishedPosts } from "@/lib/blog/loadPosts";
import type { PublishedBlogPost } from "@/lib/blog/types";
import styles from "./BlogIndex.module.css";

type BlogIndexProps = {
  locale: Locale;
};

type CategoryArchiveSummary = {
  categoryId: BlogCategoryId;
  description: string;
  posts: PublishedBlogPost[];
  title: string;
};

type BlogCategorySurface = {
  categories: CategoryArchiveSummary[];
  newestPosts: PublishedBlogPost[];
  posts: PublishedBlogPost[];
};

function isCategorizedPost(post: PublishedBlogPost): boolean {
  return isBlogCategoryId(post.category ?? "");
}

export function getBlogCategorySurface(locale: Locale): BlogCategorySurface {
  const posts = getPublishedPosts(locale).filter(
    (post): post is PublishedBlogPost => post.status === "published",
  );
  const categorizedPosts = posts.filter(isCategorizedPost);

  const categories = listBlogCategories().map((category) => {
    const categoryPosts = categorizedPosts.filter((post) => post.category === category.id);
    const categoryCopy = getBlogCategoryCopy(locale, category.id);

    return {
      categoryId: category.id,
      description: categoryCopy.description,
      posts: categoryPosts,
      title: categoryCopy.title,
    };
  });

  return {
    categories,
    newestPosts: categorizedPosts.slice(0, 4),
    posts: categorizedPosts,
  };
}

export function getBlogCategoryArchive(locale: Locale, categoryId: BlogCategoryId) {
  const surface = getBlogCategorySurface(locale);
  const archive = surface.categories.find((category) => category.categoryId === categoryId);

  if (!archive) {
    return null;
  }

  return {
    ...archive,
    indexable: archive.posts.length >= 4,
  };
}

function BlogCategoryNavigation({
  locale,
  activeCategory,
}: {
  locale: Locale;
  activeCategory?: BlogCategoryId;
}) {
  const copy = blogCopy[locale];

  return (
    <nav aria-label={copy.browseByCategory} className="mt-24">
      <div className={`${styles.navScroller} -mx-16 flex gap-10 overflow-x-auto px-16 pb-4 md:mx-0 md:flex-wrap md:overflow-visible md:px-0`}>
        <Link
          href={blogPath(locale)}
          aria-current={activeCategory ? undefined : "page"}
          className={navPillClass(!activeCategory)}
        >
          {copy.allCategories}
        </Link>
        {listBlogCategories().map((category) => (
          <Link
            key={category.id}
            href={blogCategoryPath(locale, category.id)}
            aria-current={activeCategory === category.id ? "page" : undefined}
            className={navPillClass(activeCategory === category.id)}
          >
            {getBlogCategoryCopy(locale, category.id).label}
          </Link>
        ))}
      </div>
    </nav>
  );
}

function navPillClass(active: boolean): string {
  return [
    syneText.className,
    "inline-flex min-w-max items-center rounded-full border px-14 py-10 text-body6 uppercase tracking-[0.1em] transition-colors md:px-16",
    active
      ? "border-[color:var(--accent)] bg-[var(--accent-soft)] text-[var(--accent)]"
      : "border-black/10 bg-white/70 text-[var(--muted)] hover:border-black/20 hover:text-[var(--text)]",
  ].join(" ");
}

function PostMeta({ locale, post }: { locale: Locale; post: PublishedBlogPost }) {
  return (
    <div
      className={`${onestText.className} flex flex-wrap items-center gap-10 text-body6 uppercase tracking-[0.08em] text-[var(--muted)]`}
    >
      <time dateTime={post.date}>{post.date}</time>
      <span aria-hidden>·</span>
      <span>
        {post.readingMinutes} {blogCopy[locale].minRead}
      </span>
      <span aria-hidden>·</span>
      <span>{getBlogTypeLabel(locale, post.type)}</span>
    </div>
  );
}

function PostCard({
  locale,
  post,
  priority = false,
}: {
  locale: Locale;
  post: PublishedBlogPost;
  priority?: boolean;
}) {
  const categoryCopy = getBlogCategoryCopy(locale, post.category);
  const placeholderNodes = ["north", "center", "south"] as const;

  return (
    <article className="flex h-full flex-col overflow-hidden border border-black/10 bg-white/60 transition-colors hover:border-black/20">
      <Link href={blogPath(locale, post.slug)} className="block border-b border-black/10">
        <div className="bg-[var(--accent-soft)]/70">
          {post.heroImage ? (
            <BlogMedia
              src={post.heroImage}
              alt={post.heroAlt || post.title}
              variant="card"
              kind="editorial"
              width={1600}
              height={900}
              sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 36rem"
              priority={priority}
            />
          ) : (
            <div className={styles.placeholderMedia}>
              <div className={styles.placeholderSystem} aria-hidden="true">
                <span className={styles.placeholderRail} />
                {placeholderNodes.map((node) => (
                  <span
                    key={node}
                    className={`${styles.placeholderNode} ${styles[`placeholderNode${node[0].toUpperCase()}${node.slice(1)}`]}`}
                  />
                ))}
              </div>
              <span className={`${syneText.className} ${styles.placeholderLabel}`}>
                {categoryCopy.label}
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="flex flex-1 flex-col px-18 py-20 md:px-22 md:py-22">
        <PostMeta locale={locale} post={post} />
        <h3 className={`${syneText.className} mt-12 text-body3 font-medium text-[var(--text)] md:text-body2`}>
          <Link href={blogPath(locale, post.slug)} className="transition-opacity hover:opacity-75">
            {post.title}
          </Link>
        </h3>
        <p className={`${onestText.className} mt-12 flex-1 text-body5 text-[var(--muted)] md:text-body4`}>
          {post.description}
        </p>
        <div className="mt-18 flex items-center justify-between gap-12">
          <Link
            href={blogCategoryPath(locale, post.category)}
            className={`${syneText.className} text-body6 uppercase tracking-[0.08em] text-[var(--accent)]`}
          >
            {categoryCopy.label}
          </Link>
          <Link
            href={blogPath(locale, post.slug)}
            className={`${syneText.className} text-body6 uppercase tracking-[0.1em] text-[var(--text)] underline underline-offset-4`}
          >
            {blogCopy[locale].readMore}
          </Link>
        </div>
      </div>
    </article>
  );
}

function CompactPostList({
  emptyLabel,
  locale,
  posts,
}: {
  emptyLabel: string;
  locale: Locale;
  posts: PublishedBlogPost[];
}) {
  if (posts.length === 0) {
    return <p className={`${onestText.className} text-body5 text-[var(--muted)]`}>{emptyLabel}</p>;
  }

  return (
    <ul className="grid gap-12">
      {posts.map((post) => (
        <li key={`${post.locale}-${post.slug}`}>
          <article className="border border-black/10 bg-white/50 px-16 py-16 transition-colors hover:border-black/20">
            <PostMeta locale={locale} post={post} />
            <h3 className={`${syneText.className} mt-10 text-body4 font-medium text-[var(--text)]`}>
              <Link href={blogPath(locale, post.slug)} className="transition-opacity hover:opacity-75">
                {post.title}
              </Link>
            </h3>
          </article>
        </li>
      ))}
    </ul>
  );
}

function CategorySummaryCard({
  category,
  locale,
}: {
  category: CategoryArchiveSummary;
  locale: Locale;
}) {
  return (
    <section className="flex h-full flex-col border border-black/10 bg-white/55 px-20 py-22 md:px-24 md:py-24">
      <div className="flex flex-wrap items-start justify-between gap-12">
        <div>
          <p className={`${syneText.className} text-body6 uppercase tracking-[0.14em] text-[var(--muted)]`}>
            {formatBlogPostCount(locale, category.posts.length)}
          </p>
          <h2 className={`${syneText.className} mt-8 text-body3 font-medium text-[var(--text)] md:text-body2`}>
            <Link href={blogCategoryPath(locale, category.categoryId)} className="transition-opacity hover:opacity-75">
              {category.title}
            </Link>
          </h2>
        </div>
        <Link
          href={blogCategoryPath(locale, category.categoryId)}
          className={`${syneText.className} inline-flex items-center text-body6 uppercase tracking-[0.1em] text-[var(--accent)]`}
        >
          {blogCopy[locale].viewCategory}
        </Link>
      </div>
      <p className={`${onestText.className} mt-12 text-body5 text-[var(--muted)] md:text-body4`}>
        {category.description}
      </p>
      <div className="mt-18 flex-1">
        <CompactPostList
          emptyLabel={blogCopy[locale].empty}
          locale={locale}
          posts={category.posts.slice(0, 3)}
        />
      </div>
    </section>
  );
}

export function BlogCategoryArchive({
  locale,
  categoryId,
}: {
  locale: Locale;
  categoryId: BlogCategoryId;
}) {
  const archive = getBlogCategoryArchive(locale, categoryId);

  if (!archive) {
    return null;
  }

  const copy = blogCopy[locale];

  return (
    <main className="min-h-[70vh] bg-[var(--page-bg-color)] pb-64 pt-16 md:pb-80 md:pt-20">
      <Container>
        <div className="mx-auto w-full max-w-[78rem]">
          <header className="mb-24">
            <p className={`${syneText.className} text-body6 uppercase tracking-[0.14em] text-[var(--muted)]`}>
              {copy.kicker}
            </p>
            <h1 className={`${syneText.className} mt-12 text-body1 font-medium tracking-tight text-[var(--text)] md:text-title3`}>
              {archive.title}
            </h1>
            <p className={`${onestText.className} mt-16 max-w-[48rem] text-body5 text-[var(--muted)] md:text-body4`}>
              {archive.description}
            </p>
            <p className={`${onestText.className} mt-12 text-body6 uppercase tracking-[0.08em] text-[var(--muted)]`}>
              {formatBlogPostCount(locale, archive.posts.length)}
            </p>
            <BlogCategoryNavigation locale={locale} activeCategory={categoryId} />
          </header>

          {archive.posts.length === 0 ? (
            <p className={`${onestText.className} text-body5 text-[var(--muted)]`}>
              {copy.empty}
            </p>
          ) : (
            <div className="grid gap-18 lg:grid-cols-2">
              {archive.posts.map((post, index) => (
                <PostCard
                  key={`${post.locale}-${post.slug}`}
                  locale={locale}
                  post={post}
                  priority={index === 0}
                />
              ))}
            </div>
          )}
        </div>
      </Container>
    </main>
  );
}

export default function BlogIndex({ locale }: BlogIndexProps) {
  const copy = blogCopy[locale];
  const surface = getBlogCategorySurface(locale);

  return (
    <main className="min-h-[70vh] bg-[var(--page-bg-color)] pb-64 pt-16 md:pb-80 md:pt-20">
      <Container>
        <div className="mx-auto w-full max-w-[78rem]">
          <header className="mb-24">
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
              className={`${onestText.className} mt-16 max-w-[48rem] text-body5 text-[var(--muted)] md:text-body4`}
            >
              {copy.lead}
            </p>
            <BlogCategoryNavigation locale={locale} />
          </header>

          {surface.posts.length === 0 ? (
            <p className={`${onestText.className} text-body5 text-[var(--muted)]`}>
              {copy.empty}
            </p>
          ) : (
            <>
              <section aria-labelledby={`blog-hub-${locale}`}>
                <div className="mb-18 flex flex-wrap items-end justify-between gap-12">
                  <div>
                    <p className={`${syneText.className} text-body6 uppercase tracking-[0.14em] text-[var(--muted)]`}>
                      {copy.browseByCategory}
                    </p>
                    <h2 id={`blog-hub-${locale}`} className={`${syneText.className} mt-8 text-body3 font-medium text-[var(--text)] md:text-body2`}>
                      {copy.allArticles}
                    </h2>
                  </div>
                </div>
                <div className="grid gap-18 xl:grid-cols-2">
                  {surface.categories.map((category) => (
                    <CategorySummaryCard
                      key={category.categoryId}
                      category={category}
                      locale={locale}
                    />
                  ))}
                </div>
              </section>

              <section aria-labelledby={`blog-newest-${locale}`} className="mt-32">
                <div className="mb-18 flex flex-wrap items-end justify-between gap-12">
                  <div>
                    <p className={`${syneText.className} text-body6 uppercase tracking-[0.14em] text-[var(--muted)]`}>
                      {copy.newestTitle}
                    </p>
                    <h2 id={`blog-newest-${locale}`} className={`${syneText.className} mt-8 text-body3 font-medium text-[var(--text)] md:text-body2`}>
                      {copy.newestTitle}
                    </h2>
                  </div>
                  <p className={`${onestText.className} max-w-[30rem] text-body6 text-[var(--muted)] md:text-body5`}>
                    {copy.newestLead}
                  </p>
                </div>
                <div className="grid gap-18 lg:grid-cols-2">
                  {surface.newestPosts.map((post) => (
                    <PostCard
                      key={`${post.locale}-${post.slug}`}
                      locale={locale}
                      post={post}
                    />
                  ))}
                </div>
              </section>
            </>
          )}
        </div>
      </Container>
    </main>
  );
}
