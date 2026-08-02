import type { Locale } from "./config";

export const projectSlugs = [
  "kora",
  "agentsge",
  "uimix",
  "muqta",
  "muqtad",
  "deliverysetup",
  "tamari",
  "masuro",
] as const;

export type ProjectSlug = (typeof projectSlugs)[number];

export type ProjectCaseCopy = {
  title: string;
  headline: string;
  description: string;
  imageAlt: string;
};

export const projectLabels: Record<
  Locale,
  {
    client: string;
    about: string;
    otherProjects: string;
    screen: string;
  }
> = {
  en: {
    client: "client",
    about: "About the project",
    otherProjects: "Other projects",
    screen: "app screen",
  },
  ru: {
    client: "клиент",
    about: "О проекте",
    otherProjects: "Другие проекты",
    screen: "экран приложения",
  },
  ge: {
    client: "კლიენტი",
    about: "პროექტის შესახებ",
    otherProjects: "სხვა პროექტები",
    screen: "აპის ეკრანი",
  },
  arm: {
    client: "հաճախորդ",
    about: "Նախագծի մասին",
    otherProjects: "Այլ նախագծեր",
    screen: "հավելվածի էկրան",
  },
};

export const projectCaseCopy: Record<
  Locale,
  Record<ProjectSlug, ProjectCaseCopy>
> = {
  en: {
    kora: {
      title: "Kora",
      headline: "An AI co-founder for freelancers and agencies.",
      description:
        "Kora is an AI co-founder workspace for freelancers and agencies: marketplace intake, task orchestration, and supervised agent runs in one product. Built end to end in our studio - product, brand, and engineering - so operators can run real work with agents without losing control.",
      imageAlt: "Kora product interface",
    },
    muqtad: {
      title: "Muqtad",
      headline: "One place for the best discounts across Georgia's retailers.",
      description:
        "Muqtad pulls discounts from Georgia's top retailers into one place. We came in to shape the brand identity and deliver the e-commerce platform: from logo and visual system to the way shoppers discover, compare, and act on offers.",
      imageAlt: "Muqtad website",
    },
    deliverysetup: {
      title: "Delivery Setup",
      headline: "End-to-end delivery operations for restaurants.",
      description:
        "Behind every restaurant scaling its delivery is an operational backbone running couriers, packaging, and customer experience. That is Delivery Setup. Our work covered the brand identity, website, and the operational touchpoints food businesses use day to day, so they can grow without losing quality or control.",
      imageAlt: "Delivery Setup website",
    },
    uimix: {
      title: "UIMix",
      headline: "A WYSIWYG editor for React components.",
      description:
        "UIMix is an open-source WYSIWYG editor for React components, letting designers and developers compose interfaces on a canvas with full code fidelity. From product strategy and UX to engineering the editor itself, the entire tool came out of our studio.",
      imageAlt: "UIMix product screenshot",
    },
    masuro: {
      title: "Masuro",
      headline: "A localization and video studio for global brands.",
      description:
        "Masuro adapts brands across languages and cultures through voice, subtitles, and video. Our role was to design an identity that captures translation as both technical precision and creative storytelling, paired with a website that speaks fluently to clients shipping content worldwide.",
      imageAlt: "Masuro website",
    },
    agentsge: {
      title: "agents.ge",
      headline: "Shared memory for AI coding agents.",
      description:
        "agents.ge gives AI coding agents persistent, shareable memory, so context, decisions, and learnings carry across sessions and teams. It was built end to end in our studio, from product concept to brand and engineering. It is open source and made for collaborative AI development.",
      imageAlt: "agents.ge website",
    },
    tamari: {
      title: "Saint King Tamari",
      headline: "Daily wisdom of the saints, in your pocket.",
      description:
        "Saint King Tamari is a mobile app for daily spiritual practice. Each day it presents a saint, their teachings, and stories for reflection. The brand and product came together in our studio: reverent yet contemporary, honoring the depth of the tradition while feeling natural in everyday use.",
      imageAlt: "Saint King Tamari app",
    },
    muqta: {
      title: "Muqta",
      headline: "A smart shopping companion in your pocket.",
      description:
        "Muqta is a smart shopping companion that compares prices, tracks promotions, and surfaces the best value across stores. Our team handled the brand and product end to end, shaping a mobile experience that turns everyday shopping into a confident, informed act.",
      imageAlt: "Muqta app",
    },
  },
  ru: {
    kora: {
      title: "Kora",
      headline: "AI co-founder для фрилансеров и агентств.",
      description:
        "Kora - рабочее пространство AI co-founder для фрилансеров и агентств: intake с маркетплейсов, оркестрация задач и supervised agent runs в одном продукте. Сделано end-to-end в нашей студии - продукт, бренд и инженерия - чтобы операторы вели реальную работу с агентами, не теряя контроль.",
      imageAlt: "Интерфейс продукта Kora",
    },
    muqtad: {
      title: "Muqtad",
      headline: "Лучшие скидки грузинских магазинов в одном месте.",
      description:
        "Muqtad собирает скидки крупнейших магазинов Грузии в одном месте. Мы разработали айдентику бренда и e-commerce платформу: от логотипа и визуальной системы до сценариев поиска, сравнения и использования предложений.",
      imageAlt: "Сайт Muqtad",
    },
    deliverysetup: {
      title: "Delivery Setup",
      headline: "Доставка для ресторанов под ключ.",
      description:
        "За ростом ресторанной доставки стоит операционная система, которая объединяет курьеров, упаковку и клиентский опыт. Это Delivery Setup. Мы создали айдентику, сайт и ежедневные рабочие инструменты, чтобы рестораны могли расти без потери качества и контроля.",
      imageAlt: "Сайт Delivery Setup",
    },
    uimix: {
      title: "UIMix",
      headline: "Визуальный WYSIWYG-редактор React-компонентов.",
      description:
        "UIMix - WYSIWYG-редактор React-компонентов с открытым исходным кодом. Дизайнеры и разработчики могут собирать интерфейсы на холсте с полной точностью кода. В нашей студии появились стратегия продукта, UX и сама инженерная реализация редактора.",
      imageAlt: "Интерфейс продукта UIMix",
    },
    masuro: {
      title: "Masuro",
      headline: "Студия локализации и видео для глобальных брендов.",
      description:
        "Masuro адаптирует бренды для разных языков и культур через озвучку, субтитры и видео. Мы создали айдентику, в которой техническая точность перевода сочетается с творческим повествованием, и сайт для клиентов, выпускающих контент по всему миру.",
      imageAlt: "Сайт Masuro",
    },
    agentsge: {
      title: "agents.ge",
      headline: "Общая память для ИИ-агентов разработки.",
      description:
        "agents.ge даёт ИИ-агентам разработки постоянную общую память, чтобы контекст, решения и знания сохранялись между сессиями и командами. Мы создали продукт полностью: от концепции и бренда до разработки. Это open-source решение для совместной разработки с ИИ.",
      imageAlt: "Сайт agents.ge",
    },
    tamari: {
      title: "Saint King Tamari",
      headline: "Ежедневная мудрость святых в вашем телефоне.",
      description:
        "Saint King Tamari - мобильное приложение для ежедневной духовной практики. Каждый день оно знакомит со святым, его учением и историями для размышления. В нашей студии появились бренд и продукт: бережные к традиции, но современные и естественные в повседневном использовании.",
      imageAlt: "Приложение Saint King Tamari",
    },
    muqta: {
      title: "Muqta",
      headline: "Умный помощник для покупок в вашем телефоне.",
      description:
        "Muqta сравнивает цены, отслеживает акции и находит самые выгодные предложения в разных магазинах. Наша команда создала бренд и продукт целиком, превратив повседневные покупки в уверенный и осознанный выбор.",
      imageAlt: "Приложение Muqta",
    },
  },
  ge: {
    kora: {
      title: "Kora",
      headline: "AI co-founder ფრილანსერებისა და სააგენტოებისთვის.",
      description:
        "Kora არის AI co-founder სამუშაო სივრცე ფრილანსერებისა და სააგენტოებისთვის: marketplace intake, ამოცანების ორკესტრაცია და supervised agent runs ერთ პროდუქტში. შექმნილია end-to-end ჩვენს სტუდიაში - პროდუქტი, ბრენდი და ინჟინერია - რათა ოპერატორებმა აგენტებთან რეალური სამუშაო აწარმოონ კონტროლის დაკარგვის გარეშე.",
      imageAlt: "Kora პროდუქტის ინტერფეისი",
    },
    muqtad: {
      title: "Muqtad",
      headline: "საქართველოს მაღაზიების საუკეთესო ფასდაკლებები ერთ სივრცეში.",
      description:
        "Muqtad საქართველოს წამყვანი მაღაზიების ფასდაკლებებს ერთ სივრცეში აერთიანებს. ჩვენ შევქმენით ბრენდის იდენტობა და e-commerce პლატფორმა: ლოგოდან და ვიზუალური სისტემიდან შეთავაზებების აღმოჩენის, შედარებისა და გამოყენების გამოცდილებამდე.",
      imageAlt: "Muqtad-ის ვებსაიტი",
    },
    deliverysetup: {
      title: "Delivery Setup",
      headline: "რესტორნების მიტანის ოპერაციები სრულად.",
      description:
        "რესტორნის მიტანის ზრდის უკან დგას ოპერაციული სისტემა, რომელიც კურიერებს, შეფუთვასა და მომხმარებლის გამოცდილებას მართავს. ეს არის Delivery Setup. ჩვენ შევქმენით ბრენდის იდენტობა, ვებსაიტი და ყოველდღიური სამუშაო ხელსაწყოები, რათა ბიზნესმა ხარისხისა და კონტროლის დაკარგვის გარეშე გაიზარდოს.",
      imageAlt: "Delivery Setup-ის ვებსაიტი",
    },
    uimix: {
      title: "UIMix",
      headline: "React კომპონენტების ვიზუალური WYSIWYG რედაქტორი.",
      description:
        "UIMix არის ღია კოდის WYSIWYG რედაქტორი React კომპონენტებისთვის. დიზაინერებსა და დეველოპერებს შეუძლიათ ინტერფეისები ტილოზე, კოდის სრული სიზუსტით ააწყონ. პროდუქტის სტრატეგია, UX და თავად რედაქტორის ინჟინერია ჩვენს სტუდიაში შეიქმნა.",
      imageAlt: "UIMix პროდუქტის ინტერფეისი",
    },
    masuro: {
      title: "Masuro",
      headline: "ლოკალიზაციისა და ვიდეოს სტუდია გლობალური ბრენდებისთვის.",
      description:
        "Masuro ბრენდებს სხვადასხვა ენასა და კულტურას ახმოვანების, სუბტიტრებისა და ვიდეოს საშუალებით არგებს. ჩვენ შევქმენით იდენტობა, რომელიც თარგმანის ტექნიკურ სიზუსტესა და შემოქმედებით ამბავს აერთიანებს, და ვებსაიტი გლობალური კონტენტის შემქმნელი კლიენტებისთვის.",
      imageAlt: "Masuro-ს ვებსაიტი",
    },
    agentsge: {
      title: "agents.ge",
      headline: "საერთო მეხსიერება AI კოდის აგენტებისთვის.",
      description:
        "agents.ge AI კოდის აგენტებს მუდმივ, გაზიარებად მეხსიერებას აძლევს, რათა კონტექსტი, გადაწყვეტილებები და ცოდნა სესიებსა და გუნდებს შორის შენარჩუნდეს. პროდუქტი ჩვენს სტუდიაში სრულად შეიქმნა: კონცეფციიდან ბრენდსა და ინჟინერიამდე. ის ღია კოდისაა და AI-თან თანამშრომლობისთვის არის შექმნილი.",
      imageAlt: "agents.ge-ს ვებსაიტი",
    },
    tamari: {
      title: "Saint King Tamari",
      headline: "წმინდანთა ყოველდღიური სიბრძნე თქვენს ტელეფონში.",
      description:
        "Saint King Tamari ყოველდღიური სულიერი პრაქტიკის მობილური აპია. ის ყოველ დღე გვაცნობს წმინდანს, მის სწავლებებსა და დასაფიქრებელ ამბებს. ბრენდი და პროდუქტი ჩვენს სტუდიაში შეიქმნა: ტრადიციისადმი პატივისცემით, თანამედროვე და ყოველდღიურ გამოყენებაში ბუნებრივი.",
      imageAlt: "Saint King Tamari-ს აპი",
    },
    muqta: {
      title: "Muqta",
      headline: "ჭკვიანი საყიდლების ასისტენტი თქვენს ტელეფონში.",
      description:
        "Muqta ადარებს ფასებს, აკვირდება აქციებს და სხვადასხვა მაღაზიაში საუკეთესო შეთავაზებებს პოულობს. ჩვენმა გუნდმა ბრენდი და პროდუქტი სრულად შექმნა და ყოველდღიური საყიდლები თავდაჯერებულ, ინფორმირებულ გადაწყვეტილებად აქცია.",
      imageAlt: "Muqta-ს აპი",
    },
  },
  arm: {
    kora: {
      title: "Kora",
      headline: "AI co-founder ֆրիլանսերների և գործակալությունների համար։",
      description:
        "Kora-ն AI co-founder աշխատատարածք է ֆրիլանսերների և գործակալությունների համար՝ marketplace intake, առաջադրանքների նվագախումբ և supervised agent runs մեկ արտադրանքում։ Ստեղծված է end-to-end մեր ստուդիայում՝ արտադրանք, բրենդ և ինժեներիա, որպեսզի օպերատորները գործակալների հետ իրական աշխատանք վարեն՝ չկորցնելով վերահսկողությունը։",
      imageAlt: "Kora արտադրանքի միջերեսը",
    },
    muqtad: {
      title: "Muqtad",
      headline: "Վրաստանի խանութների լավագույն զեղչերը մեկ վայրում։",
      description:
        "Muqtad-ը մեկ վայրում հավաքում է Վրաստանի առաջատար խանութների զեղչերը։ Մենք ստեղծել ենք բրենդի ինքնությունը և e-commerce հարթակը՝ լոգոյից ու տեսողական համակարգից մինչև առաջարկների որոնման, համեմատման և օգտագործման փորձը։",
      imageAlt: "Muqtad-ի կայքը",
    },
    deliverysetup: {
      title: "Delivery Setup",
      headline: "Ռեստորանային առաքման ամբողջական գործառնություններ։",
      description:
        "Ռեստորանի առաքման աճի հիմքում առաքիչները, փաթեթավորումը և հաճախորդի փորձը կառավարող գործառնական համակարգն է։ Դա Delivery Setup-ն է։ Մենք ստեղծել ենք բրենդի ինքնությունը, կայքը և առօրյա աշխատանքային գործիքները, որպեսզի բիզնեսը աճի առանց որակի ու վերահսկողության կորստի։",
      imageAlt: "Delivery Setup-ի կայքը",
    },
    uimix: {
      title: "UIMix",
      headline: "React բաղադրիչների տեսողական WYSIWYG խմբագիր։",
      description:
        "UIMix-ը բաց կոդով WYSIWYG խմբագիր է React բաղադրիչների համար։ Դիզայներներն ու ծրագրավորողները կարող են կտավի վրա հավաքել միջերեսներ՝ պահպանելով կոդի ամբողջական ճշգրտությունը։ Արտադրանքի ռազմավարությունը, UX-ը և խմբագրի ինժեներական լուծումը ստեղծվել են մեր ստուդիայում։",
      imageAlt: "UIMix արտադրանքի միջերեսը",
    },
    masuro: {
      title: "Masuro",
      headline: "Տեղայնացման և տեսանյութի ստուդիա համաշխարհային բրենդների համար։",
      description:
        "Masuro-ն բրենդները հարմարեցնում է տարբեր լեզուների ու մշակույթների՝ ձայնի, ենթագրերի և տեսանյութի միջոցով։ Մենք ստեղծել ենք ինքնություն, որը միավորում է թարգմանության տեխնիկական ճշգրտությունն ու ստեղծագործ պատմությունը, և կայք՝ ամբողջ աշխարհում բովանդակություն թողարկող հաճախորդների համար։",
      imageAlt: "Masuro-ի կայքը",
    },
    agentsge: {
      title: "agents.ge",
      headline: "Ընդհանուր հիշողություն AI կոդավորման գործակալների համար։",
      description:
        "agents.ge-ն AI կոդավորման գործակալներին տալիս է մշտական, համօգտագործվող հիշողություն, որպեսզի համատեքստը, որոշումները և գիտելիքը պահպանվեն սեսիաների ու թիմերի միջև։ Արտադրանքը մեր ստուդիայում ստեղծվել է ամբողջությամբ՝ գաղափարից մինչև բրենդ և ինժեներիա։ Այն բաց կոդով է և նախատեսված է AI-ի հետ համատեղ մշակման համար։",
      imageAlt: "agents.ge-ի կայքը",
    },
    tamari: {
      title: "Saint King Tamari",
      headline: "Սրբերի ամենօրյա իմաստությունը ձեր հեռախոսում։",
      description:
        "Saint King Tamari-ն ամենօրյա հոգևոր պրակտիկայի բջջային հավելված է։ Ամեն օր այն ներկայացնում է մի սրբի, նրա ուսմունքն ու մտորումների պատմությունները։ Բրենդն ու արտադրանքը ստեղծվել են մեր ստուդիայում՝ ավանդույթի հանդեպ հարգալից, բայց ժամանակակից և առօրյայում բնական։",
      imageAlt: "Saint King Tamari հավելվածը",
    },
    muqta: {
      title: "Muqta",
      headline: "Խելացի գնումների օգնականը ձեր հեռախոսում։",
      description:
        "Muqta-ն համեմատում է գները, հետևում ակցիաներին և տարբեր խանութներում գտնում լավագույն առաջարկները։ Մեր թիմը ամբողջությամբ ստեղծել է բրենդն ու արտադրանքը՝ ամենօրյա գնումները վերածելով վստահ և տեղեկացված ընտրության։",
      imageAlt: "Muqta հավելվածը",
    },
  },
};

export function isProjectSlug(value: string): value is ProjectSlug {
  return projectSlugs.includes(value as ProjectSlug);
}

export function getProjectAlternates(slug: ProjectSlug) {
  return {
    canonical: `/project/${slug}`,
    languages: {
      en: `/project/${slug}`,
      ru: `/ru/project/${slug}`,
      ka: `/ge/project/${slug}`,
      hy: `/arm/project/${slug}`,
    },
  };
}
