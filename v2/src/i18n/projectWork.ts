import type { Locale } from "./config";
import type { ProjectSlug } from "./projects";

export const projectWork: Record<
  Locale,
  Record<ProjectSlug, string>
> = {
  en: {
    kora: "Product, brand and AI agent workspace",
    muqtad: "Brand identity and e-commerce platform",
    deliverysetup: "Brand identity, website and operating tools",
    uimix: "Product strategy, UX and editor engineering",
    masuro: "Brand identity and website",
    agentsge: "Product concept, brand and engineering",
    tamari: "Brand identity and mobile product",
    muqta: "Brand identity and end-to-end mobile product",
  },
  ru: {
    kora: "Продукт, бренд и AI agent workspace",
    muqtad: "Айдентика и e-commerce платформа",
    deliverysetup: "Айдентика, сайт и рабочие инструменты",
    uimix: "Стратегия продукта, UX и разработка редактора",
    masuro: "Айдентика и сайт",
    agentsge: "Концепция продукта, бренд и разработка",
    tamari: "Айдентика и мобильный продукт",
    muqta: "Айдентика и мобильный продукт под ключ",
  },
  ge: {
    kora: "პროდუქტი, ბრენდი და AI agent workspace",
    muqtad: "ბრენდის იდენტობა და e-commerce პლატფორმა",
    deliverysetup: "ბრენდის იდენტობა, ვებსაიტი და სამუშაო ხელსაწყოები",
    uimix: "პროდუქტის სტრატეგია, UX და რედაქტორის ინჟინერია",
    masuro: "ბრენდის იდენტობა და ვებსაიტი",
    agentsge: "პროდუქტის კონცეფცია, ბრენდი და ინჟინერია",
    tamari: "ბრენდის იდენტობა და მობილური პროდუქტი",
    muqta: "ბრენდის იდენტობა და სრული მობილური პროდუქტი",
  },
  arm: {
    kora: "Արտադրանք, բրենդ և AI agent workspace",
    muqtad: "Բրենդի ինքնություն և e-commerce հարթակ",
    deliverysetup: "Բրենդի ինքնություն, կայք և աշխատանքային գործիքներ",
    uimix: "Արտադրանքի ռազմավարություն, UX և խմբագրի ինժեներիա",
    masuro: "Բրենդի ինքնություն և կայք",
    agentsge: "Արտադրանքի գաղափար, բրենդ և ինժեներիա",
    tamari: "Բրենդի ինքնություն և բջջային արտադրանք",
    muqta: "Բրենդի ինքնություն և ամբողջական բջջային արտադրանք",
  },
};
