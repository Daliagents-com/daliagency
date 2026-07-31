import type { Locale } from "./config";

export type BlogCopy = {
  kicker: string;
  title: string;
  lead: string;
  empty: string;
  minRead: string;
  readMore: string;
  backToBlog: string;
  moreArticles: string;
  moreArticlesEmpty: string;
  allArticles: string;
  ctaTitle: string;
  ctaBody: string;
  ctaButton: string;
  ctaSecondary: string;
  metaTitle: string;
  metaDescription: string;
};

export const blogCopy: Record<Locale, BlogCopy> = {
  en: {
    kicker: "Blog",
    title: "AI agents, production systems, visibility",
    lead: "Comparisons, tutorials, and field notes from building production agent systems and AI visibility.",
    empty: "No published posts in this language yet.",
    minRead: "min read",
    readMore: "Read article",
    backToBlog: "Blog",
    moreArticles: "Related articles",
    moreArticlesEmpty: "More posts land here as the library grows.",
    allArticles: "All articles",
    ctaTitle: "Map agents to your real workflows",
    ctaBody:
      "We audit how your team works, define where agents belong, and design implementation with human controls.",
    ctaButton: "Start audit",
    ctaSecondary: "See solutions",
    metaTitle: "Blog | Dali",
    metaDescription:
      "Articles on production AI agents, agent systems for business, and GEO/SEO visibility from the Dali studio.",
  },
  ru: {
    kicker: "Блог",
    title: "ИИ-агенты, продакшен-системы, видимость",
    lead: "Сравнения, туториалы и заметки о продакшен-агентах и AI-видимости от студии Dali.",
    empty: "Пока нет опубликованных материалов на этом языке.",
    minRead: "мин чтения",
    readMore: "Читать",
    backToBlog: "Блог",
    moreArticles: "Связанные статьи",
    moreArticlesEmpty: "Здесь появятся следующие материалы.",
    allArticles: "Все статьи",
    ctaTitle: "Свяжем агентов с вашими процессами",
    ctaBody:
      "Аудит реальных workflow, точки для агентов и внедрение с human controls.",
    ctaButton: "Начать аудит",
    ctaSecondary: "Решения",
    metaTitle: "Блог | Dali",
    metaDescription:
      "Статьи о продакшен ИИ-агентах, agent-системах для бизнеса и GEO/SEO видимости от студии Dali.",
  },
  ge: {
    kicker: "ბლოგი",
    title: "AI აგენტები, პროდაქშენ სისტემები, ხილვადობა",
    lead: "შედარებები, ტუტორიალები და შენიშვნები production agent სისტემებსა და AI ხილვადობაზე Dali-სგან.",
    empty: "ამ ენაზე გამოქვეყნებული პოსტები ჯერ არ არის.",
    minRead: "წთ კითხვა",
    readMore: "წაიკითხე",
    backToBlog: "ბლოგი",
    moreArticles: "დაკავშირებული სტატიები",
    moreArticlesEmpty: "შემდეგი მასალები აქ გამოჩნდება.",
    allArticles: "ყველა სტატია",
    ctaTitle: "აგენტები რეალურ workflow-ებზე",
    ctaBody:
      "ვამოწმებთ, როგორ მუშაობს გუნდი, ვადგენთ სად სჭირდება აგენტები და ვქმნით იმპლემენტაციას human control-ებით.",
    ctaButton: "აუდიტის დაწყება",
    ctaSecondary: "გადაწყვეტები",
    metaTitle: "ბლოგი | Dali",
    metaDescription:
      "სტატიები production AI აგენტებზე, ბიზნეს agent სისტემებსა და GEO/SEO ხილვადობაზე Dali-სგან.",
  },
  arm: {
    kicker: "Բլոգ",
    title: "AI գործակալներ, production համակարգեր, տեսանելիություն",
    lead: "Համեմատություններ, ուսուցումներ և նշումներ production agent համակարգերի ու AI տեսանելիության մասին՝ Dali-ից։",
    empty: "Այս լեզվով հրապարակված գրառումներ դեռ չկան։",
    minRead: "րոպե կարդալու",
    readMore: "Կարդալ",
    backToBlog: "Բլոգ",
    moreArticles: "Առնչվող հոդվածներ",
    moreArticlesEmpty: "Հաջորդ նյութերը կհայտնվեն այստեղ։",
    allArticles: "Բոլոր հոդվածները",
    ctaTitle: "Գործակալները՝ ձեր իրական workflow-ներում",
    ctaBody:
      "Ստուգում ենք, թե ինչպես է աշխատում թիմը, որոշում՝ որտեղ են պետք գործակալները, և նախագծում ներդրում human control-ներով։",
    ctaButton: "Սկսել աուդիտ",
    ctaSecondary: "Լուծումներ",
    metaTitle: "Բլոգ | Dali",
    metaDescription:
      "Հոդվածներ production AI գործակալների, բիզնես agent համակարգերի և GEO/SEO տեսանելիության մասին՝ Dali ստուդիայից։",
  },
};
