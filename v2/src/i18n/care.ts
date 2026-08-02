// Purpose: Localized copy for the standalone Agent Care retainer landing (/care).
// Scope: All four locales. Guarantee strings mirror the solution-page wording
// (copied, not imported, to keep /care decoupled from Solutions).
import type { Locale } from "./config";

export type CareTierCopy = {
  name: string;
  price: string;
  summary: string;
  includesNote?: string;
  bullets: readonly string[];
};

export type CareCopy = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroCta: string;
  tiersEyebrow: string;
  tiersTitle: string;
  tierIndexPrefix: string;
  tiers: readonly [CareTierCopy, CareTierCopy, CareTierCopy];
  worksEyebrow: string;
  worksTitle: string;
  worksItems: readonly [string, string, string];
  worksNote: string;
  guarantee: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
};

export const careCopy: Record<Locale, CareCopy> = {
  en: {
    metaTitle: "Agent Care - your agents, kept working, from $390/mo | Dali",
    metaDescription:
      "Agents do not fail loudly, they drift. Agent Care is the monthly discipline that catches it: monitoring, drift and cost alerts, eval regressions, and one measured improvement per month. Three tiers from $390/mo, for agents we built and agents built elsewhere.",
    heroEyebrow: "Agent Care",
    heroTitle: "Agent Care - your agents, kept working",
    heroLead:
      "Agents do not fail loudly, they drift. Care is the monthly discipline that catches it before your customers do.",
    heroCta: "Start a free workflow audit",
    tiersEyebrow: "Three tiers",
    tiersTitle: "Pick the level of discipline your agents need.",
    tierIndexPrefix: "Tier",
    tiers: [
      {
        name: "Care",
        price: "$390/mo",
        summary:
          "The baseline: someone is watching, and problems get fixed fast.",
        bullets: [
          "Uptime and behavior monitoring on every connected agent",
          "Drift and cost alerts before they become customer-facing problems",
          "Fixes within 48 hours when something breaks or degrades",
        ],
      },
      {
        name: "Care+",
        price: "$790/mo",
        summary:
          "The agent does not just stay up. It gets measurably better every month.",
        includesNote: "Everything in Care, plus",
        bullets: [
          "Monthly eval regressions against a fixed test set",
          "One measured improvement shipped every month",
          "A weekly report of what the agent actually did",
        ],
      },
      {
        name: "Care Pro",
        price: "$1,490/mo",
        summary:
          "For agents your revenue depends on: governed costs, fast SLAs, a real roadmap.",
        includesNote: "Everything in Care+, plus",
        bullets: [
          "Cost governance: budgets, model choices, and spend reviews",
          "24-hour SLA on fixes",
          "Quarterly roadmap sessions",
          "Priority queue for new requests",
        ],
      },
    ],
    worksEyebrow: "Coverage",
    worksTitle: "Works with any agent.",
    worksItems: [
      "Agents we built",
      "Agents someone else built",
      "Agents we rescued",
    ],
    worksNote:
      "For agents built elsewhere, Care starts with a short intake review so we know exactly what we are keeping alive.",
    guarantee: "If the acceptance test does not pass, you do not pay.",
    ctaEyebrow: "Next step",
    ctaTitle: "Keep your agents working.",
    ctaLead:
      "Tell us what is running in production. We reply with a tier recommendation and an intake date within one business day.",
    ctaButton: "Start a free workflow audit",
  },
  ru: {
    metaTitle:
      "Agent Care - ваши агенты продолжают работать, от $390/мес | Dali",
    metaDescription:
      "Агенты не падают с грохотом - они дрейфуют. Agent Care - это ежемесячная дисциплина, которая ловит дрейф раньше клиентов: мониторинг, алерты по дрейфу и затратам, eval-регрессии и одно измеримое улучшение в месяц. Три тира от $390/мес, для наших и чужих агентов.",
    heroEyebrow: "Agent Care",
    heroTitle: "Agent Care - ваши агенты продолжают работать",
    heroLead:
      "Агенты не падают с грохотом - они дрейфуют. Care - это ежемесячная дисциплина, которая ловит это раньше, чем ваши клиенты.",
    heroCta: "Начать бесплатный аудит",
    tiersEyebrow: "Три тира",
    tiersTitle: "Выберите уровень дисциплины для ваших агентов.",
    tierIndexPrefix: "Тир",
    tiers: [
      {
        name: "Care",
        price: "$390/мес",
        summary: "База: за агентом следят, а проблемы чинятся быстро.",
        bullets: [
          "Мониторинг доступности и поведения каждого подключённого агента",
          "Алерты по дрейфу и затратам до того, как их заметят клиенты",
          "Фиксы в течение 48 часов, если что-то сломалось или деградировало",
        ],
      },
      {
        name: "Care+",
        price: "$790/мес",
        summary:
          "Агент не просто работает. Он измеримо становится лучше каждый месяц.",
        includesNote: "Всё из Care, плюс",
        bullets: [
          "Ежемесячные eval-регрессии на фиксированном наборе тестов",
          "Одно измеримое улучшение каждый месяц",
          "Еженедельный отчёт о том, что агент реально сделал",
        ],
      },
      {
        name: "Care Pro",
        price: "$1,490/мес",
        summary:
          "Для агентов, от которых зависит выручка: управляемые затраты, быстрые SLA, настоящий роадмап.",
        includesNote: "Всё из Care+, плюс",
        bullets: [
          "Cost governance: бюджеты, выбор моделей и разбор затрат",
          "SLA 24 часа на фиксы",
          "Квартальные сессии по роадмапу",
          "Приоритетная очередь на новые запросы",
        ],
      },
    ],
    worksEyebrow: "Покрытие",
    worksTitle: "Работает с любым агентом.",
    worksItems: [
      "Агенты, которых построили мы",
      "Агенты, которых построил кто-то другой",
      "Агенты, которых мы спасли",
    ],
    worksNote:
      "Для агентов, построенных не нами, Care начинается с короткого intake-ревью: мы должны точно знать, что поддерживаем.",
    guarantee: "Если acceptance test не пройден - вы не платите.",
    ctaEyebrow: "Следующий шаг",
    ctaTitle: "Пусть агенты продолжают работать.",
    ctaLead:
      "Расскажите, что у вас работает в проде. Ответим с рекомендацией тира и датой intake в течение одного рабочего дня.",
    ctaButton: "Начать бесплатный аудит",
  },
  ge: {
    metaTitle:
      "Agent Care - თქვენი აგენტები მუშა მდგომარეობაში, $390/თვიდან | Dali",
    metaDescription:
      "აგენტები ხმაურით არ ეცემიან - ისინი დრეიფობენ. Agent Care არის ყოველთვიური დისციპლინა, რომელიც ამას იჭერს: მონიტორინგი, დრეიფისა და ხარჯების შეტყობინებები, eval რეგრესიები და ერთი გაზომვადი გაუმჯობესება თვეში. სამი დონე $390/თვიდან, ჩვენი და სხვისი აგენტებისთვის.",
    heroEyebrow: "Agent Care",
    heroTitle: "Agent Care - თქვენი აგენტები რჩებიან მუშა მდგომარეობაში",
    heroLead:
      "აგენტები ხმაურით არ ეცემიან - ისინი დრეიფობენ. Care არის ყოველთვიური დისციპლინა, რომელიც ამას თქვენს კლიენტებზე ადრე იჭერს.",
    heroCta: "დაიწყეთ უფასო აუდიტი",
    tiersEyebrow: "სამი დონე",
    tiersTitle: "აირჩიეთ დისციპლინის დონე, რომელიც თქვენს აგენტებს სჭირდებათ.",
    tierIndexPrefix: "დონე",
    tiers: [
      {
        name: "Care",
        price: "$390/თვე",
        summary:
          "საბაზისო დონე: აგენტს ვინმე უყურებს და პრობლემები სწრაფად სწორდება.",
        bullets: [
          "ხელმისაწვდომობისა და ქცევის მონიტორინგი ყველა მიერთებულ აგენტზე",
          "დრეიფისა და ხარჯების შეტყობინებები, სანამ ისინი კლიენტებამდე მიაღწევს",
          "გამოსწორება 48 საათში, თუ რამე გატყდა ან დაქვეითდა",
        ],
      },
      {
        name: "Care+",
        price: "$790/თვე",
        summary:
          "აგენტი უბრალოდ კი არ მუშაობს - ის ყოველ თვე გაზომვადად უმჯობესდება.",
        includesNote: "ყველაფერი Care-დან, პლუს",
        bullets: [
          "ყოველთვიური eval რეგრესიები ფიქსირებულ სატესტო ნაკრებზე",
          "ერთი გაზომვადი გაუმჯობესება ყოველ თვე",
          "ყოველკვირეული ანგარიში იმაზე, თუ რა გააკეთა აგენტმა რეალურად",
        ],
      },
      {
        name: "Care Pro",
        price: "$1,490/თვე",
        summary:
          "აგენტებისთვის, რომლებზეც თქვენი შემოსავალი დგას: მართული ხარჯები, სწრაფი SLA, ნამდვილი roadmap.",
        includesNote: "ყველაფერი Care+-დან, პლუს",
        bullets: [
          "ხარჯების მართვა: ბიუჯეტები, მოდელების არჩევანი და დანახარჯების განხილვა",
          "24-საათიანი SLA გამოსწორებებზე",
          "კვარტალური roadmap სესიები",
          "პრიორიტეტული რიგი ახალ მოთხოვნებზე",
        ],
      },
    ],
    worksEyebrow: "დაფარვა",
    worksTitle: "მუშაობს ნებისმიერ აგენტთან.",
    worksItems: [
      "აგენტები, რომლებიც ჩვენ ავაშენეთ",
      "აგენტები, რომლებიც სხვამ ააშენა",
      "აგენტები, რომლებიც გადავარჩინეთ",
    ],
    worksNote:
      "სხვის მიერ აშენებული აგენტებისთვის Care იწყება მოკლე intake განხილვით, რომ ზუსტად ვიცოდეთ, რას ვინარჩუნებთ.",
    guarantee: "თუ მიღების ტესტი არ ჩაბარდა, თქვენ არ იხდით.",
    ctaEyebrow: "შემდეგი ნაბიჯი",
    ctaTitle: "შეინარჩუნეთ აგენტები მუშა მდგომარეობაში.",
    ctaLead:
      "გვითხარით, რა გაქვთ პროდაქშენში. ერთი სამუშაო დღის განმავლობაში გიპასუხებთ დონის რეკომენდაციითა და intake-ის თარიღით.",
    ctaButton: "დაიწყეთ უფასო აუდიტი",
  },
  arm: {
    metaTitle:
      "Agent Care - ձեր գործակալները շարունակում են աշխատել, $390/ամսից | Dali",
    metaDescription:
      "Գործակալները աղմուկով չեն ընկնում. նրանք դրեյֆում են։ Agent Care-ը ամսական դիսցիպլինան է, որը դա բռնում է. մոնիտորինգ, դրեյֆի և ծախսերի ծանուցումներ, eval ռեգրեսիաներ և մեկ չափելի բարելավում ամսական։ Երեք մակարդակ` $390/ամսից, մեր և ուրիշների կառուցած գործակալների համար։",
    heroEyebrow: "Agent Care",
    heroTitle: "Agent Care - ձեր գործակալները շարունակում են աշխատել",
    heroLead:
      "Գործակալները աղմուկով չեն ընկնում. նրանք դրեյֆում են։ Care-ը ամսական դիսցիպլինան է, որը դա բռնում է ձեր հաճախորդներից առաջ։",
    heroCta: "Սկսել անվճար աուդիտ",
    tiersEyebrow: "Երեք մակարդակ",
    tiersTitle:
      "Ընտրեք դիսցիպլինայի մակարդակը, որն անհրաժեշտ է ձեր գործակալներին։",
    tierIndexPrefix: "Մակարդակ",
    tiers: [
      {
        name: "Care",
        price: "$390/ամիս",
        summary:
          "Բազային մակարդակ. գործակալին հետևում են, իսկ խնդիրները արագ շտկվում են։",
        bullets: [
          "Հասանելիության և վարքի մոնիտորինգ ամեն միացված գործակալի վրա",
          "Դրեյֆի և ծախսերի ծանուցումներ, նախքան դրանք կհասնեն հաճախորդներին",
          "Շտկումներ 48 ժամվա ընթացքում, եթե ինչ-որ բան կոտրվել կամ վատացել է",
        ],
      },
      {
        name: "Care+",
        price: "$790/ամիս",
        summary:
          "Գործակալը ոչ միայն աշխատում է. այն ամեն ամիս չափելիորեն լավանում է։",
        includesNote: "Ամեն ինչ Care-ից, գումարած",
        bullets: [
          "Ամսական eval ռեգրեսիաներ ֆիքսված թեստային հավաքածուի վրա",
          "Մեկ չափելի բարելավում ամեն ամիս",
          "Շաբաթական հաշվետվություն այն մասին, թե գործակալն իրականում ինչ արեց",
        ],
      },
      {
        name: "Care Pro",
        price: "$1,490/ամիս",
        summary:
          "Գործակալների համար, որոնցից կախված է ձեր եկամուտը. կառավարվող ծախսեր, արագ SLA, իրական roadmap։",
        includesNote: "Ամեն ինչ Care+-ից, գումարած",
        bullets: [
          "Ծախսերի կառավարում. բյուջեներ, մոդելների ընտրություն և ծախսերի վերանայում",
          "24-ժամյա SLA շտկումների վրա",
          "Եռամսյակային roadmap սեսիաներ",
          "Առաջնահերթ հերթ նոր հարցումների համար",
        ],
      },
    ],
    worksEyebrow: "Ծածկույթ",
    worksTitle: "Աշխատում է ցանկացած գործակալի հետ։",
    worksItems: [
      "Գործակալներ, որոնք մենք ենք կառուցել",
      "Գործակալներ, որոնք ուրիշն է կառուցել",
      "Գործակալներ, որոնք մենք փրկել ենք",
    ],
    worksNote:
      "Ուրիշի կառուցած գործակալների համար Care-ը սկսվում է կարճ intake վերանայումով, որպեսզի ճշգրիտ իմանանք, թե ինչ ենք պահում աշխատուն վիճակում։",
    guarantee: "Եթե ընդունման թեստը չի անցնում, դուք չեք վճարում։",
    ctaEyebrow: "Հաջորդ քայլը",
    ctaTitle: "Պահեք գործակալներին աշխատուն վիճակում։",
    ctaLead:
      "Ասեք, թե ինչ է աշխատում ձեր պրոդում։ Մեկ աշխատանքային օրվա ընթացքում կպատասխանենք մակարդակի առաջարկով և intake-ի ամսաթվով։",
    ctaButton: "Սկսել անվճար աուդիտ",
  },
};
