import type { Locale } from "./config";

export const designSprintServiceKeys = [
  "Product Design Sprint",
  "Vision Sprint",
  "Brand Sprint",
  "Design Sprint",
  "Branding",
  "Website Design",
  "Design Contribution",
  "Website Development",
  "Hackathon",
  "Grant",
  "Design",
  "Web Development",
  "Product Development",
  "Pitch Deck",
  "Smart Contract Testing",
] as const;

export type DesignSprintService = (typeof designSprintServiceKeys)[number];

type SprintCardCopy = {
  type: string;
  duration: string;
  title: string;
};

type ScheduleItemCopy = {
  name: string;
  duration: string;
};

export type DesignSprintsCopy = {
  hero: string;
  contact: string;
  trackAlt: string;
  introTitle: string;
  introBody: string;
  chooseLineOne: string;
  chooseLineTwo: string;
  chooseBody: string;
  sprintCards: readonly [
    SprintCardCopy,
    SprintCardCopy,
    SprintCardCopy,
    SprintCardCopy,
    SprintCardCopy,
    SprintCardCopy,
  ];
  studioQuoteAfterName: string;
  founder: string;
  coFounder: string;
  visionTitle: string;
  visionBody: string;
  visionCta: string;
  pastClients: string;
  collaborators: string;
  filterPlaceholder: string;
  allYears: string;
  active: string;
  howItWorks: string;
  howParagraphs: readonly [string, string, string];
  timeline: string;
  scheduleMeta: string;
  day: string;
  schedule: readonly [
    ScheduleItemCopy,
    ScheduleItemCopy,
    ScheduleItemCopy,
    ScheduleItemCopy,
    ScheduleItemCopy,
    ScheduleItemCopy,
    ScheduleItemCopy,
    ScheduleItemCopy,
  ];
  services: Record<DesignSprintService, string>;
};

export const designSprintsCopy: Record<Locale, DesignSprintsCopy> = {
  en: {
    hero:
      "Align on vision & test solutions before touching a line of code",
    contact: "Get in touch",
    trackAlt: "Track and field illustration",
    introTitle: "What is a Design Sprint?",
    introBody:
      "Our version of the Google Ventures Design Sprint is an eight-day workshop that uses design thinking to produce a realistic prototype. It helps us understand the challenge as an outside partner, define behavioural requirements, and test an early visual prototype with real users before implementation.",
    chooseLineOne: "Choose a sprint",
    chooseLineTwo: "that fits your vision",
    chooseBody:
      "The process turns an early idea into a realistic prototype, clear behavioural requirements, and evidence from user testing before a larger build begins.",
    sprintCards: [
      {
        type: "Brand sprint",
        duration: "1 week",
        title: "Create a unique brand identity",
      },
      {
        type: "Product design sprint",
        duration: "2 weeks",
        title: "Build winning products",
      },
      {
        type: "Vision sprint",
        duration: "2 days",
        title: "Craft the big picture",
      },
      {
        type: "Freedom tech sprint",
        duration: "2 weeks",
        title: "Explore decentralised innovation",
      },
      {
        type: "AI sprint",
        duration: "2 weeks",
        title: "Explore AI for a better user experience",
      },
      {
        type: "Process sprint",
        duration: "3 days",
        title: "Optimise the workflow",
      },
    ],
    studioQuoteAfterName:
      " is a husband-and-wife studio. Liana leads design and David leads engineering. Working as a couple means complete trust, no politics, and projects we are both proud to put our names on.",
    founder: "Founder",
    coFounder: "Co-founder",
    visionTitle: "Get your vision out fast",
    visionBody:
      "We work with founders and early-stage startups on fundraising preparation, project and product management, executive alignment, and helping technology and design teams ship better work faster.",
    visionCta: "Launch with the best",
    pastClients: "Past clients",
    collaborators: "Collaborators",
    filterPlaceholder: "Filter by services",
    allYears: "All years",
    active: "Active",
    howItWorks: "How it works",
    howParagraphs: [
      "This eight-day process uses design thinking to create a realistic prototype, define behavioural requirements, and test an early visual concept with real users.",
      "The first three days require a few focused hours from your team. This early investment aligns everyone around the project goals and prevents avoidable problems during implementation.",
      "To make decisions efficiently, we vote on individual proposals instead of relying on long discussions. Your team selects one Decider who can make the final call when needed.",
    ],
    timeline: "Timeline",
    scheduleMeta: "Design Sprint activity schedule",
    day: "Day",
    schedule: [
      { name: "Define the challenge", duration: "3 hours" },
      {
        name: "Map the customer journey and choose a focus",
        duration: "3 hours",
      },
      { name: "Choose the focus and create a storyboard", duration: "3 hours" },
      { name: "Build the prototype", duration: "8 hours" },
      { name: "Build the prototype", duration: "8 hours" },
      { name: "Build the prototype", duration: "8 hours" },
      { name: "Test with users", duration: "2 days" },
      { name: "Deliver the report", duration: "" },
    ],
    services: Object.fromEntries(
      designSprintServiceKeys.map((service) => [service, service]),
    ) as Record<DesignSprintService, string>,
  },
  ru: {
    hero:
      "Согласуйте видение и проверьте решения до написания первой строки кода",
    contact: "Связаться с нами",
    trackAlt: "Иллюстрация беговой дорожки",
    introTitle: "Что такое дизайн-спринт?",
    introBody:
      "Наша версия дизайн-спринта Google Ventures - это восьмидневный воркшоп, в котором дизайн-мышление помогает создать реалистичный прототип. Мы изучаем задачу как внешний партнёр, определяем требования к поведению продукта и проверяем ранний визуальный прототип на реальных пользователях до начала разработки.",
    chooseLineOne: "Выберите спринт,",
    chooseLineTwo: "подходящий вашему видению",
    chooseBody:
      "Процесс превращает раннюю идею в реалистичный прототип, понятные требования и результаты пользовательского тестирования до начала большой разработки.",
    sprintCards: [
      {
        type: "Бренд-спринт",
        duration: "1 неделя",
        title: "Создайте уникальную айдентику бренда",
      },
      {
        type: "Продуктовый дизайн-спринт",
        duration: "2 недели",
        title: "Создайте сильный продукт",
      },
      {
        type: "Спринт видения",
        duration: "2 дня",
        title: "Сформируйте общую картину",
      },
      {
        type: "Freedom tech спринт",
        duration: "2 недели",
        title: "Исследуйте децентрализованные инновации",
      },
      {
        type: "ИИ-спринт",
        duration: "2 недели",
        title: "Исследуйте ИИ для лучшего пользовательского опыта",
      },
      {
        type: "Процессный спринт",
        duration: "3 дня",
        title: "Оптимизируйте рабочий процесс",
      },
    ],
    studioQuoteAfterName:
      " - семейная студия. Лиана руководит дизайном, Давид - разработкой. Совместная работа даёт полное доверие, отсутствие политики и проекты, под которыми мы оба готовы поставить своё имя.",
    founder: "Основатель",
    coFounder: "Сооснователь",
    visionTitle: "Быстро воплотите своё видение",
    visionBody:
      "Мы помогаем основателям и стартапам на ранних стадиях готовиться к инвестициям, выстраивать управление проектами и продуктами, согласовывать решения руководителей и быстрее выпускать более качественные технологии и дизайн.",
    visionCta: "Запустить проект",
    pastClients: "Наши клиенты",
    collaborators: "Партнёры",
    filterPlaceholder: "Фильтр по услугам",
    allYears: "Все годы",
    active: "Активный",
    howItWorks: "Как это работает",
    howParagraphs: [
      "За восемь дней с помощью дизайн-мышления мы создаём реалистичный прототип, определяем требования к поведению продукта и проверяем раннюю визуальную концепцию на реальных пользователях.",
      "В первые три дня вашей команде понадобится несколько часов сфокусированной работы. Эти вложения заранее согласуют цели проекта и предотвращают лишние проблемы при реализации.",
      "Чтобы принимать решения быстрее, мы голосуем за конкретные предложения вместо долгих обсуждений. Команда выбирает одного решающего участника, который при необходимости принимает финальное решение.",
    ],
    timeline: "График",
    scheduleMeta: "Расписание дизайн-спринта",
    day: "День",
    schedule: [
      { name: "Определить задачу", duration: "3 часа" },
      {
        name: "Составить путь клиента и выбрать фокус",
        duration: "3 часа",
      },
      { name: "Выбрать фокус и создать раскадровку", duration: "3 часа" },
      { name: "Создать прототип", duration: "8 часов" },
      { name: "Создать прототип", duration: "8 часов" },
      { name: "Создать прототип", duration: "8 часов" },
      { name: "Провести тестирование с пользователями", duration: "2 дня" },
      { name: "Передать отчёт", duration: "" },
    ],
    services: {
      "Product Design Sprint": "Продуктовый дизайн-спринт",
      "Vision Sprint": "Спринт видения",
      "Brand Sprint": "Бренд-спринт",
      "Design Sprint": "Дизайн-спринт",
      Branding: "Брендинг",
      "Website Design": "Дизайн сайта",
      "Design Contribution": "Дизайн-поддержка",
      "Website Development": "Разработка сайта",
      Hackathon: "Хакатон",
      Grant: "Грант",
      Design: "Дизайн",
      "Web Development": "Веб-разработка",
      "Product Development": "Разработка продукта",
      "Pitch Deck": "Инвестиционная презентация",
      "Smart Contract Testing": "Тестирование смарт-контрактов",
    },
  },
  ge: {
    hero:
      "შეათანხმეთ ხედვა და გამოცადეთ გადაწყვეტილებები კოდის წერამდე",
    contact: "დაგვიკავშირდით",
    trackAlt: "სარბენი ბილიკის ილუსტრაცია",
    introTitle: "რა არის დიზაინ-სპრინტი?",
    introBody:
      "Google Ventures-ის დიზაინ-სპრინტის ჩვენი ვერსია რვადღიანი ვორკშოპია, რომელიც რეალისტური პროტოტიპის შესაქმნელად დიზაინერულ აზროვნებას იყენებს. როგორც გარე პარტნიორი, ვიკვლევთ ამოცანას, ვადგენთ პროდუქტის ქცევის მოთხოვნებს და განვითარების დაწყებამდე ადრეულ ვიზუალურ პროტოტიპს რეალურ მომხმარებლებთან ვამოწმებთ.",
    chooseLineOne: "აირჩიეთ სპრინტი,",
    chooseLineTwo: "რომელიც თქვენს ხედვას შეესაბამება",
    chooseBody:
      "პროცესი ადრეულ იდეას რეალისტურ პროტოტიპად, მკაფიო მოთხოვნებად და მომხმარებლის ტესტირების მტკიცებულებად აქცევს დიდი განვითარების დაწყებამდე.",
    sprintCards: [
      {
        type: "ბრენდის სპრინტი",
        duration: "1 კვირა",
        title: "შექმენით უნიკალური ბრენდის იდენტობა",
      },
      {
        type: "პროდუქტის დიზაინ-სპრინტი",
        duration: "2 კვირა",
        title: "შექმენით წარმატებული პროდუქტი",
      },
      {
        type: "ხედვის სპრინტი",
        duration: "2 დღე",
        title: "ჩამოაყალიბეთ სრული სურათი",
      },
      {
        type: "Freedom tech სპრინტი",
        duration: "2 კვირა",
        title: "გამოიკვლიეთ დეცენტრალიზებული ინოვაციები",
      },
      {
        type: "AI სპრინტი",
        duration: "2 კვირა",
        title: "გამოიკვლიეთ AI უკეთესი გამოცდილებისთვის",
      },
      {
        type: "პროცესის სპრინტი",
        duration: "3 დღე",
        title: "გააუმჯობესეთ სამუშაო პროცესი",
      },
    ],
    studioQuoteAfterName:
      " ცოლ-ქმრის სტუდიაა. ლიანა ხელმძღვანელობს დიზაინს, დავითი - ინჟინერიას. ერთად მუშაობა ნიშნავს სრულ ნდობას, პოლიტიკის გარეშე ურთიერთობას და პროექტებს, რომლებსაც ორივე სიამაყით ვაწერთ ჩვენს სახელებს.",
    founder: "დამფუძნებელი",
    coFounder: "თანადამფუძნებელი",
    visionTitle: "სწრაფად აქციეთ ხედვა რეალობად",
    visionBody:
      "ვმუშაობთ დამფუძნებლებთან და ადრეული ეტაპის სტარტაპებთან ინვესტიციისთვის მომზადებაზე, პროექტისა და პროდუქტის მართვაზე, ხელმძღვანელებისა და გუნდების შეთანხმებაზე და უკეთესი ტექნოლოგიური და დიზაინ პროდუქტების სწრაფად გამოშვებაზე.",
    visionCta: "პროექტის დაწყება",
    pastClients: "წინა კლიენტები",
    collaborators: "პარტნიორები",
    filterPlaceholder: "სერვისებით გაფილტვრა",
    allYears: "ყველა წელი",
    active: "აქტიური",
    howItWorks: "როგორ მუშაობს",
    howParagraphs: [
      "რვადღიანი პროცესი დიზაინერული აზროვნებით ქმნის რეალისტურ პროტოტიპს, ადგენს პროდუქტის ქცევის მოთხოვნებს და ადრეულ ვიზუალურ კონცეფციას რეალურ მომხმარებლებთან ამოწმებს.",
      "პირველ სამ დღეს თქვენი გუნდის რამდენიმე საათიანი ჩართულობა სჭირდება. ეს ადრეული ინვესტიცია ყველას პროექტის მიზნებზე ათანხმებს და განხორციელებისას ზედმეტ პრობლემებს თავიდან გვაცილებს.",
      "გადაწყვეტილებების სწრაფად მისაღებად ხანგრძლივი განხილვების ნაცვლად კონკრეტულ წინადადებებს ვუყრით კენჭს. გუნდი ირჩევს ერთ გადამწყვეტ პირს, რომელიც საჭიროებისას საბოლოო არჩევანს აკეთებს.",
    ],
    timeline: "განრიგი",
    scheduleMeta: "დიზაინ-სპრინტის აქტივობების განრიგი",
    day: "დღე",
    schedule: [
      { name: "ამოცანის განსაზღვრა", duration: "3 საათი" },
      {
        name: "მომხმარებლის გზის შედგენა და ფოკუსის არჩევა",
        duration: "3 საათი",
      },
      {
        name: "ფოკუსის არჩევა და სცენარის შექმნა",
        duration: "3 საათი",
      },
      { name: "პროტოტიპის შექმნა", duration: "8 საათი" },
      { name: "პროტოტიპის შექმნა", duration: "8 საათი" },
      { name: "პროტოტიპის შექმნა", duration: "8 საათი" },
      { name: "მომხმარებლებთან ტესტირება", duration: "2 დღე" },
      { name: "ანგარიშის ჩაბარება", duration: "" },
    ],
    services: {
      "Product Design Sprint": "პროდუქტის დიზაინ-სპრინტი",
      "Vision Sprint": "ხედვის სპრინტი",
      "Brand Sprint": "ბრენდის სპრინტი",
      "Design Sprint": "დიზაინ-სპრინტი",
      Branding: "ბრენდინგი",
      "Website Design": "ვებსაიტის დიზაინი",
      "Design Contribution": "დიზაინის მხარდაჭერა",
      "Website Development": "ვებსაიტის შექმნა",
      Hackathon: "ჰაკათონი",
      Grant: "გრანტი",
      Design: "დიზაინი",
      "Web Development": "ვებდეველოპმენტი",
      "Product Development": "პროდუქტის შექმნა",
      "Pitch Deck": "საინვესტიციო პრეზენტაცია",
      "Smart Contract Testing": "სმარტ-კონტრაქტების ტესტირება",
    },
  },
  arm: {
    hero:
      "Համաձայնեցրեք տեսլականը և փորձարկեք լուծումները մինչև կոդ գրելը",
    contact: "Կապվել մեզ հետ",
    trackAlt: "Վազքուղու պատկերազարդում",
    introTitle: "Ի՞նչ է դիզայն սպրինտը։",
    introBody:
      "Google Ventures-ի դիզայն սպրինտի մեր տարբերակը ութօրյա աշխատարան է, որը դիզայներական մտածողությամբ ստեղծում է իրատեսական նախատիպ։ Որպես արտաքին գործընկեր՝ ուսումնասիրում ենք խնդիրը, սահմանում արտադրանքի վարքային պահանջները և մինչև մշակումը վաղ տեսողական նախատիպը փորձարկում իրական օգտատերերի հետ։",
    chooseLineOne: "Ընտրեք սպրինտ,",
    chooseLineTwo: "որը համապատասխանում է ձեր տեսլականին",
    chooseBody:
      "Գործընթացը վաղ գաղափարը վերածում է իրատեսական նախատիպի, հստակ պահանջների և օգտատերերի փորձարկման ապացույցների՝ մինչև մեծ մշակման սկիզբը։",
    sprintCards: [
      {
        type: "Բրենդի սպրինտ",
        duration: "1 շաբաթ",
        title: "Ստեղծեք յուրահատուկ բրենդային ինքնություն",
      },
      {
        type: "Արտադրանքի դիզայն սպրինտ",
        duration: "2 շաբաթ",
        title: "Ստեղծեք հաջող արտադրանք",
      },
      {
        type: "Տեսլականի սպրինտ",
        duration: "2 օր",
        title: "Ձևավորեք ամբողջական պատկերը",
      },
      {
        type: "Freedom tech սպրինտ",
        duration: "2 շաբաթ",
        title: "Ուսումնասիրեք ապակենտրոնացված նորարարությունը",
      },
      {
        type: "AI սպրինտ",
        duration: "2 շաբաթ",
        title: "Ուսումնասիրեք AI-ը՝ ավելի լավ փորձի համար",
      },
      {
        type: "Գործընթացի սպրինտ",
        duration: "3 օր",
        title: "Օպտիմալացրեք աշխատանքային գործընթացը",
      },
    ],
    studioQuoteAfterName:
      "-ն ամուսինների ստուդիա է։ Լիանան ղեկավարում է դիզայնը, Դավիթը՝ ինժեներիան։ Միասին աշխատելը նշանակում է լիակատար վստահություն, հարաբերություններ առանց ներքին քաղաքականության և նախագծեր, որոնց տակ երկուսս էլ հպարտությամբ դնում ենք մեր անունները։",
    founder: "Հիմնադիր",
    coFounder: "Համահիմնադիր",
    visionTitle: "Արագ կյանքի կոչեք ձեր տեսլականը",
    visionBody:
      "Աշխատում ենք հիմնադիրների և վաղ փուլի ստարտափների հետ՝ ներդրումներին պատրաստվելու, նախագծերի ու արտադրանքի կառավարումը կառուցելու, ղեկավարներին ու թիմերին համաձայնեցնելու և ավելի լավ տեխնոլոգիական ու դիզայն լուծումներ արագ թողարկելու համար։",
    visionCta: "Սկսել նախագիծը",
    pastClients: "Նախորդ հաճախորդներ",
    collaborators: "Գործընկերներ",
    filterPlaceholder: "Զտել ըստ ծառայությունների",
    allYears: "Բոլոր տարիները",
    active: "Ակտիվ",
    howItWorks: "Ինչպես է աշխատում",
    howParagraphs: [
      "Ութօրյա գործընթացը դիզայներական մտածողությամբ ստեղծում է իրատեսական նախատիպ, սահմանում արտադրանքի վարքային պահանջները և վաղ տեսողական գաղափարը փորձարկում իրական օգտատերերի հետ։",
      "Առաջին երեք օրերին անհրաժեշտ է ձեր թիմի մի քանի ժամ կենտրոնացված մասնակցությունը։ Այս վաղ ներդրումը բոլորին համաձայնեցնում է նախագծի նպատակների շուրջ և կանխում ավելորդ խնդիրները իրականացման ընթացքում։",
      "Արագ որոշումներ ընդունելու համար երկար քննարկումների փոխարեն քվեարկում ենք կոնկրետ առաջարկների շուրջ։ Թիմն ընտրում է մեկ որոշում կայացնողի, որը անհրաժեշտության դեպքում կատարում է վերջնական ընտրությունը։",
    ],
    timeline: "Ժամանակացույց",
    scheduleMeta: "Դիզայն սպրինտի գործողությունների ժամանակացույց",
    day: "Օր",
    schedule: [
      { name: "Սահմանել խնդիրը", duration: "3 ժամ" },
      {
        name: "Քարտեզագրել օգտատիրոջ ուղին և ընտրել ուղղությունը",
        duration: "3 ժամ",
      },
      {
        name: "Ընտրել ուղղությունը և ստեղծել սցենարը",
        duration: "3 ժամ",
      },
      { name: "Ստեղծել նախատիպը", duration: "8 ժամ" },
      { name: "Ստեղծել նախատիպը", duration: "8 ժամ" },
      { name: "Ստեղծել նախատիպը", duration: "8 ժամ" },
      { name: "Փորձարկել օգտատերերի հետ", duration: "2 օր" },
      { name: "Հանձնել հաշվետվությունը", duration: "" },
    ],
    services: {
      "Product Design Sprint": "Արտադրանքի դիզայն սպրինտ",
      "Vision Sprint": "Տեսլականի սպրինտ",
      "Brand Sprint": "Բրենդի սպրինտ",
      "Design Sprint": "Դիզայն սպրինտ",
      Branding: "Բրենդինգ",
      "Website Design": "Կայքի դիզայն",
      "Design Contribution": "Դիզայնի աջակցություն",
      "Website Development": "Կայքի մշակում",
      Hackathon: "Հեքըթոն",
      Grant: "Դրամաշնորհ",
      Design: "Դիզայն",
      "Web Development": "Վեբ մշակում",
      "Product Development": "Արտադրանքի մշակում",
      "Pitch Deck": "Ներդրումային ներկայացում",
      "Smart Contract Testing": "Սմարթ պայմանագրերի փորձարկում",
    },
  },
};
