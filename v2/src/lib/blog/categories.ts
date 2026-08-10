export const BLOG_CATEGORIES = [
  {
    id: "agent-foundations",
    expectedPublishedCount: 8,
  },
  {
    id: "implementation-operations",
    expectedPublishedCount: 20,
  },
  {
    id: "security-governance",
    expectedPublishedCount: 8,
  },
  {
    id: "use-cases-workflows",
    expectedPublishedCount: 21,
  },
  {
    id: "buying-partners",
    expectedPublishedCount: 27,
  },
  {
    id: "vibe-coding-engineering",
    expectedPublishedCount: 19,
  },
  {
    id: "seo-visibility",
    expectedPublishedCount: 4,
  },
] as const;

export type BlogCategoryDefinition = (typeof BLOG_CATEGORIES)[number];
export type BlogCategoryId = BlogCategoryDefinition["id"];

const categoryById = new Map(BLOG_CATEGORIES.map((category) => [category.id, category]));
const categoryIdSet = new Set<BlogCategoryId>(BLOG_CATEGORIES.map((category) => category.id));

export function listBlogCategories(): readonly BlogCategoryDefinition[] {
  return BLOG_CATEGORIES;
}

export function getBlogCategory(id: BlogCategoryId): BlogCategoryDefinition {
  const category = categoryById.get(id);

  if (!category) {
    throw new Error(`[blog] Unknown category registry entry "${id}"`);
  }

  return category;
}

export function isBlogCategoryId(value: string): value is BlogCategoryId {
  return categoryIdSet.has(value as BlogCategoryId);
}

export function assertBlogCategoryId(value: unknown, context: string): BlogCategoryId {
  if (typeof value !== "string") {
    throw new Error(`[blog] Missing category for ${context}`);
  }

  const normalized = value.trim();

  if (!normalized) {
    throw new Error(`[blog] Missing category for ${context}`);
  }

  if (!isBlogCategoryId(normalized)) {
    throw new Error(`[blog] Invalid category "${normalized}" for ${context}`);
  }

  return normalized;
}

export function createEmptyBlogCategoryCounts(): Record<BlogCategoryId, number> {
  return Object.fromEntries(
    BLOG_CATEGORIES.map((category) => [category.id, 0]),
  ) as Record<BlogCategoryId, number>;
}
