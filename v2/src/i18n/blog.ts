import type { BlogCategoryId } from "@/lib/blog/categories";
import type { BlogPostType } from "@/lib/blog/types";
import type { Locale } from "./config";

export type BlogCategoryCopy = {
  label: string;
  title: string;
  description: string;
};

export type BlogCopy = {
  homeLabel: string;
  kicker: string;
  title: string;
  lead: string;
  empty: string;
  minRead: string;
  updated: string;
  readMore: string;
  backToBlog: string;
  moreArticles: string;
  moreArticlesEmpty: string;
  allArticles: string;
  allCategories: string;
  browseByCategory: string;
  newestTitle: string;
  newestLead: string;
  viewCategory: string;
  viewAll: string;
  authorBy: string;
  authorBio: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaSecondary: string;
  metaTitle: string;
  metaDescription: string;
  categories: Record<BlogCategoryId, BlogCategoryCopy>;
  typeLabels: Record<BlogPostType, string>;
};

export const blogCopy: Record<Locale, BlogCopy> = {
  en: {
    homeLabel: "Home",
    kicker: "Blog",
    title: "AI agents, production systems, visibility",
    lead: "Comparisons, tutorials, and field notes from building production agent systems and AI visibility.",
    empty: "No published posts in this language yet.",
    minRead: "min read",
    updated: "Updated",
    readMore: "Read article",
    backToBlog: "Blog",
    moreArticles: "Related articles",
    moreArticlesEmpty: "More posts land here as the library grows.",
    allArticles: "All articles",
    allCategories: "All",
    browseByCategory: "Browse by category",
    newestTitle: "Newest posts",
    newestLead: "Recent writing across the full library for readers who prefer recency.",
    viewCategory: "Open category",
    viewAll: "View all articles",
    authorBy: "Written by Dali",
    authorBio:
      "Dali is an AI agent systems studio. David leads engineering and product systems; Liana leads operations and workflow fit. We ship production agents inside tools teams already use.",
    ctaTitle: "Map agents to your real workflows",
    ctaBody:
      "We audit how your team works, define where agents belong, and design implementation with human controls.",
    ctaButton: "Book audit",
    ctaSecondary: "See solutions",
    metaTitle: "Blog | Dali",
    metaDescription:
      "Articles on production AI agents, agent systems for business, and GEO/SEO visibility from the Dali studio.",
    categories: {
      "agent-foundations": {
        label: "AI Agent Foundations",
        title: "AI Agent Foundations",
        description:
          "Definitions, boundaries, and first-principles guidance for understanding what production agents are and when they fit.",
      },
      "implementation-operations": {
        label: "Building & Operating Agents",
        title: "Building & Operating Agents",
        description:
          "Design, implementation, evals, rollout, observability, and day-two operations for production agent systems.",
      },
      "security-governance": {
        label: "Security & Governance",
        title: "Security & Governance",
        description:
          "Permissions, approval flows, incident handling, compliance, and control patterns for agent-driven work.",
      },
      "use-cases-workflows": {
        label: "Use Cases & Workflows",
        title: "Use Cases & Workflows",
        description:
          "Concrete workflow patterns for teams, channels, tools, and industries using AI agents in real operations.",
      },
      "buying-partners": {
        label: "Choosing Solutions & Partners",
        title: "Choosing Solutions & Partners",
        description:
          "Guidance for build versus buy decisions, vendor evaluation, pricing, scoping, and partner selection.",
      },
      "vibe-coding-engineering": {
        label: "Vibe Coding & Engineering",
        title: "Vibe Coding & Engineering",
        description:
          "How AI-built products move from fragile prototypes toward secure, maintainable production software.",
      },
      "seo-visibility": {
        label: "SEO, GEO & Visibility",
        title: "SEO, GEO & Visibility",
        description:
          "Crawlability, multilingual discoverability, citation readiness, and visibility systems for modern software companies.",
      },
    },
    typeLabels: {
      article: "Article",
      comparison: "Comparison",
      pillar: "Pillar",
      tutorial: "Tutorial",
    },
  },
  ru: {
    homeLabel: "Главная",
    kicker: "Блог",
    title: "ИИ-агенты, продакшен-системы, видимость",
    lead: "Сравнения, туториалы и заметки о продакшен-агентах и AI-видимости от студии Dali.",
    empty: "Пока нет опубликованных материалов на этом языке.",
    minRead: "мин чтения",
    updated: "Обновлено",
    readMore: "Читать",
    backToBlog: "Блог",
    moreArticles: "Связанные статьи",
    moreArticlesEmpty: "Здесь появятся следующие материалы.",
    allArticles: "Все статьи",
    allCategories: "Все",
    browseByCategory: "Категории",
    newestTitle: "Новые материалы",
    newestLead: "Свежие статьи из всей библиотеки для тех, кто предпочитает хронологию.",
    viewCategory: "Открыть категорию",
    viewAll: "Смотреть все статьи",
    authorBy: "Dali",
    authorBio:
      "Dali - студия AI agent systems. Давид ведёт engineering и продукт, Лиана - operations и fit процессов. Делаем production-агентов в tools, которыми команда уже пользуется.",
    ctaTitle: "Свяжем агентов с вашими процессами",
    ctaBody:
      "Аудит реальных workflow, точки для агентов и внедрение с human controls.",
    ctaButton: "Записаться на аудит",
    ctaSecondary: "Решения",
    metaTitle: "Блог | Dali",
    metaDescription:
      "Статьи о продакшен ИИ-агентах, agent-системах для бизнеса и GEO/SEO видимости от студии Dali.",
    categories: {
      "agent-foundations": {
        label: "Основы ИИ-агентов",
        title: "Основы ИИ-агентов",
        description:
          "Определения, границы и базовые принципы, чтобы понять, что такое продакшен-агенты и где они подходят.",
      },
      "implementation-operations": {
        label: "Разработка и эксплуатация агентов",
        title: "Разработка и эксплуатация агентов",
        description:
          "Проектирование, внедрение, evals, запуск, наблюдаемость и повседневная эксплуатация production agent systems.",
      },
      "security-governance": {
        label: "Безопасность и контроль",
        title: "Безопасность и контроль",
        description:
          "Права доступа, approval flow, инциденты, комплаенс и контрольные паттерны для работы агентов.",
      },
      "use-cases-workflows": {
        label: "Сценарии и процессы",
        title: "Сценарии и процессы",
        description:
          "Конкретные workflow-паттерны для команд, каналов, инструментов и отраслей, где агенты работают в реальных процессах.",
      },
      "buying-partners": {
        label: "Выбор решения и партнёра",
        title: "Выбор решения и партнёра",
        description:
          "Как сравнивать build vs buy, оценивать подрядчиков, бюджеты, scope и путь закупки.",
      },
      "vibe-coding-engineering": {
        label: "Vibe coding и инженерия",
        title: "Vibe coding и инженерия",
        description:
          "Как довести AI-built продукт от хрупкого прототипа до безопасного и поддерживаемого production software.",
      },
      "seo-visibility": {
        label: "SEO, GEO и видимость",
        title: "SEO, GEO и видимость",
        description:
          "Crawlability, многоязычная discoverability, цитируемость и visibility systems для современных software-компаний.",
      },
    },
    typeLabels: {
      article: "Статья",
      comparison: "Сравнение",
      pillar: "Пилар",
      tutorial: "Туториал",
    },
  },
  ge: {
    homeLabel: "მთავარი",
    kicker: "ბლოგი",
    title: "AI აგენტები, პროდაქშენ სისტემები, ხილვადობა",
    lead: "შედარებები, ტუტორიალები და შენიშვნები production agent სისტემებსა და AI ხილვადობაზე Dali-სგან.",
    empty: "ამ ენაზე გამოქვეყნებული პოსტები ჯერ არ არის.",
    minRead: "წთ კითხვა",
    updated: "განახლებულია",
    readMore: "წაიკითხე",
    backToBlog: "ბლოგი",
    moreArticles: "დაკავშირებული სტატიები",
    moreArticlesEmpty: "შემდეგი მასალები აქ გამოჩნდება.",
    allArticles: "ყველა სტატია",
    allCategories: "ყველა",
    browseByCategory: "კატეგორიები",
    newestTitle: "უახლესი პოსტები",
    newestLead: "ბიბლიოთეკის უახლესი მასალები მათთვის, ვინც ქრონოლოგიას ამჯობინებს.",
    viewCategory: "კატეგორიის გახსნა",
    viewAll: "ყველა სტატიის ნახვა",
    authorBy: "Dali",
    authorBio:
      "Dali არის AI agent systems სტუდია. დავითი - engineering/product, ლიანა - operations/workflow fit. Production აგენტები არსებულ tools-ში.",
    ctaTitle: "აგენტები რეალურ workflow-ებზე",
    ctaBody:
      "ვამოწმებთ, როგორ მუშაობს გუნდი, ვადგენთ სად სჭირდება აგენტები და ვქმნით იმპლემენტაციას human control-ებით.",
    ctaButton: "აუდიტის დაჯავშნა",
    ctaSecondary: "გადაწყვეტები",
    metaTitle: "ბლოგი | Dali",
    metaDescription:
      "სტატიები production AI აგენტებზე, ბიზნეს agent სისტემებსა და GEO/SEO ხილვადობაზე Dali-სგან.",
    categories: {
      "agent-foundations": {
        label: "AI აგენტების საფუძვლები",
        title: "AI აგენტების საფუძვლები",
        description:
          "განსაზღვრებები, საზღვრები და ძირითადი პრინციპები იმის გასაგებად, რა არის production აგენტი და როდის მუშაობს ის.",
      },
      "implementation-operations": {
        label: "აგენტების შექმნა და მართვა",
        title: "აგენტების შექმნა და მართვა",
        description:
          "დიზაინი, იმპლემენტაცია, evals, გაშვება, დაკვირვებადობა და ყოველდღიური ოპერაციები production agent სისტემებისთვის.",
      },
      "security-governance": {
        label: "უსაფრთხოება და მმართველობა",
        title: "უსაფრთხოება და მმართველობა",
        description:
          "წვდომები, approval flow, ინციდენტები, შესაბამისობა და კონტროლის პატერნები agent-based სამუშაოებისთვის.",
      },
      "use-cases-workflows": {
        label: "გამოყენების სცენარები და პროცესები",
        title: "გამოყენების სცენარები და პროცესები",
        description:
          "კონკრეტული workflow პატერნები გუნდებისთვის, არხებისთვის, ხელსაწყოებისთვის და ინდუსტრიებისთვის, სადაც აგენტები რეალურ ოპერაციებში მუშაობენ.",
      },
      "buying-partners": {
        label: "გადაწყვეტისა და პარტნიორის არჩევა",
        title: "გადაწყვეტისა და პარტნიორის არჩევა",
        description:
          "როგორ შეადარო build vs buy, შეაფასო პარტნიორები, ბიუჯეტები, scope და procurement გზა.",
      },
      "vibe-coding-engineering": {
        label: "Vibe coding და ინჟინერია",
        title: "Vibe coding და ინჟინერია",
        description:
          "როგორ გადაიყვანო AI-built პროდუქტი მყიფე პროტოტიპიდან უსაფრთხო და მხარდაჭერად production software-მდე.",
      },
      "seo-visibility": {
        label: "SEO, GEO და ხილვადობა",
        title: "SEO, GEO და ხილვადობა",
        description:
          "Crawlability, მრავალენოვანი discoverability, ციტირებადობა და visibility systems თანამედროვე software კომპანიებისთვის.",
      },
    },
    typeLabels: {
      article: "სტატია",
      comparison: "შედარება",
      pillar: "პილარი",
      tutorial: "ტუტორიალი",
    },
  },
  arm: {
    homeLabel: "Գլխավոր",
    kicker: "Բլոգ",
    title: "AI գործակալներ, production համակարգեր, տեսանելիություն",
    lead: "Համեմատություններ, ուսուցումներ և նշումներ production agent համակարգերի ու AI տեսանելիության մասին՝ Dali-ից։",
    empty: "Այս լեզվով հրապարակված գրառումներ դեռ չկան։",
    minRead: "րոպե կարդալու",
    updated: "Թարմացվել է",
    readMore: "Կարդալ",
    backToBlog: "Բլոգ",
    moreArticles: "Առնչվող հոդվածներ",
    moreArticlesEmpty: "Հաջորդ նյութերը կհայտնվեն այստեղ։",
    allArticles: "Բոլոր հոդվածները",
    allCategories: "Բոլորը",
    browseByCategory: "Կատեգորիաներ",
    newestTitle: "Նոր նյութեր",
    newestLead: "Վերջին հրապարակումները ամբողջ գրադարանից նրանց համար, ովքեր նախընտրում են ժամանակագրական դիտումը։",
    viewCategory: "Բացել կատեգորիան",
    viewAll: "Դիտել բոլոր հոդվածները",
    authorBy: "Dali",
    authorBio:
      "Dali-ն AI agent systems ստուդիա է։ Դավիթը՝ engineering/product, Լիանան՝ operations/workflow fit։ Production գործակալներ առկա tools-ում։",
    ctaTitle: "Գործակալները՝ ձեր իրական workflow-ներում",
    ctaBody:
      "Ստուգում ենք, թե ինչպես է աշխատում թիմը, որոշում՝ որտեղ են պետք գործակալները, և նախագծում ներդրում human control-ներով։",
    ctaButton: "Ամրագրել աուդիտ",
    ctaSecondary: "Լուծումներ",
    metaTitle: "Բլոգ | Dali",
    metaDescription:
      "Հոդվածներ production AI գործակալների, բիզնես agent համակարգերի և GEO/SEO տեսանելիության մասին՝ Dali ստուդիայից։",
    categories: {
      "agent-foundations": {
        label: "AI գործակալների հիմունքներ",
        title: "AI գործակալների հիմունքներ",
        description:
          "Սահմանումներ, սահմաններ և հիմնարար սկզբունքներ հասկանալու համար, թե ինչ է production գործակալը և երբ է այն տեղին։",
      },
      "implementation-operations": {
        label: "Գործակալների ստեղծում և գործարկում",
        title: "Գործակալների ստեղծում և գործարկում",
        description:
          "Դիզայն, իրականացում, evals, թողարկում, դիտարկելիություն և day-two operations production agent համակարգերի համար։",
      },
      "security-governance": {
        label: "Անվտանգություն և կառավարում",
        title: "Անվտանգություն և կառավարում",
        description:
          "Թույլտվություններ, approval flow, միջադեպեր, համապատասխանություն և վերահսկման pattern-ներ agent-driven աշխատանքի համար։",
      },
      "use-cases-workflows": {
        label: "Կիրառման սցենարներ և գործընթացներ",
        title: "Կիրառման սցենարներ և գործընթացներ",
        description:
          "Կոնկրետ workflow pattern-ներ թիմերի, ալիքների, գործիքների և ոլորտների համար, որտեղ գործակալները աշխատում են իրական գործողությունների մեջ։",
      },
      "buying-partners": {
        label: "Լուծման և գործընկերոջ ընտրություն",
        title: "Լուծման և գործընկերոջ ընտրություն",
        description:
          "Ինչպես համեմատել build vs buy, գնահատել գործընկերներին, բյուջեները, scope-ը և procurement ուղին։",
      },
      "vibe-coding-engineering": {
        label: "Vibe coding և ինժեներիա",
        title: "Vibe coding և ինժեներիա",
        description:
          "Ինչպես AI-built արտադրանքը տեղափոխել խոցելի պրոտոտիպից դեպի անվտանգ և սպասարկելի production software։",
      },
      "seo-visibility": {
        label: "SEO, GEO և տեսանելիություն",
        title: "SEO, GEO և տեսանելիություն",
        description:
          "Crawlability, բազմալեզու discoverability, citation readiness և visibility systems ժամանակակից software ընկերությունների համար։",
      },
    },
    typeLabels: {
      article: "Հոդված",
      comparison: "Համեմատություն",
      pillar: "Պիլար",
      tutorial: "Ուսուցում",
    },
  },
};

export function blogCategoryPath(locale: Locale, category: BlogCategoryId): string {
  const base = locale === "en" ? "/blog" : `/${locale}/blog`;
  return `${base}/category/${category}`;
}

export function getBlogCategoryCopy(
  locale: Locale,
  category: BlogCategoryId,
): BlogCategoryCopy {
  return blogCopy[locale].categories[category];
}

export function getBlogCategoryMeta(
  locale: Locale,
  category: BlogCategoryId,
): { title: string; description: string } {
  const categoryCopy = getBlogCategoryCopy(locale, category);
  return {
    title: `${categoryCopy.title} | ${blogCopy[locale].kicker} | Dali`,
    description: categoryCopy.description,
  };
}

export function getBlogTypeLabel(locale: Locale, type: BlogPostType): string {
  return blogCopy[locale].typeLabels[type];
}

export function formatBlogPostCount(locale: Locale, count: number): string {
  if (locale === "ru") {
    const mod10 = count % 10;
    const mod100 = count % 100;
    const noun = mod10 === 1 && mod100 !== 11
      ? "статья"
      : mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)
        ? "статьи"
        : "статей";
    return `${count} ${noun}`;
  }

  if (locale === "ge") {
    return `${count} სტატია`;
  }

  if (locale === "arm") {
    return `${count} հոդված`;
  }

  return `${count} ${count === 1 ? "article" : "articles"}`;
}
