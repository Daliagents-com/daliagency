// Purpose: Localized copy for the standalone Agent Starter landing (/starter).
// Scope: All four locales. Guarantee strings mirror the solution-page wording
// (copied, not imported, to keep /starter decoupled from Solutions).
import type { Locale } from "./config";

export type StarterSkuCopy = {
  name: string;
  summary: string;
  bullets: readonly [string, string, string, string];
  acceptanceTest: string;
};

export type StarterCopy = {
  metaTitle: string;
  metaDescription: string;
  heroEyebrow: string;
  heroTitle: string;
  heroLead: string;
  heroCta: string;
  skusEyebrow: string;
  skusTitle: string;
  skuIndexPrefix: string;
  skus: readonly [StarterSkuCopy, StarterSkuCopy, StarterSkuCopy];
  includedTitle: string;
  includedSetup: string;
  includedMonthly: string;
  acceptanceTitle: string;
  approvalGate: string;
  termsEyebrow: string;
  termsTitle: string;
  terms: readonly [string, string];
  guarantee: string;
  ctaEyebrow: string;
  ctaTitle: string;
  ctaLead: string;
  ctaButton: string;
};

export const starterCopy: Record<Locale, StarterCopy> = {
  en: {
    metaTitle: "Agent Starter - one agent, one outcome, $199/mo | Dali",
    metaDescription:
      "The simplest entry to Dali: a production agent for one narrow job, live in days. Speed-to-Lead, Missed-Call Textback, or Review & Reputation. $199 setup, $199/mo. If the acceptance test does not pass, you do not pay.",
    heroEyebrow: "Agent Starter",
    heroTitle: "Agent Starter - one agent, one outcome, $199/mo",
    heroLead:
      "The simplest entry: a production agent for one narrow job, live in days.",
    heroCta: "Start a free workflow audit",
    skusEyebrow: "Three starters",
    skusTitle: "Pick one narrow job. The agent does exactly that.",
    skuIndexPrefix: "Starter",
    skus: [
      {
        name: "Speed-to-Lead",
        summary:
          "Every inbound lead gets an answer in under 60 seconds, around the clock.",
        bullets: [
          "Replies to every lead from your form, Instagram, or WhatsApp in under 60 seconds",
          "Asks one qualification question and sends your booking link",
          "Logs every conversation to your sheet or CRM",
          "Sends the owner a daily digest of leads and outcomes",
        ],
        acceptanceTest:
          "A test lead submitted through any connected channel gets a reply with a qualification question and booking link in under 60 seconds, logged to your sheet or CRM.",
      },
      {
        name: "Missed-Call Textback",
        summary:
          "A missed call becomes an instant text conversation that ends in a booking.",
        bullets: [
          "Detects every missed call and sends an instant SMS or WhatsApp follow-up",
          "Carries the conversation all the way to a booked slot",
          "Keeps the thread going until the caller books or opts out",
          "Sends a weekly calls-saved report",
        ],
        acceptanceTest:
          "A test call left unanswered triggers a text follow-up within 2 minutes, and the conversation reaches a booked slot.",
      },
      {
        name: "Review & Reputation",
        summary:
          "Fresh reviews come in, every Google review gets a reply, and you stay in control.",
        bullets: [
          "Sends post-visit review requests to your customers",
          "Drafts replies to new Google reviews for your approval",
          "Publishes only what you approve",
          "Sends a monthly rating report",
        ],
        acceptanceTest:
          "A test visit triggers a review request, and a new Google review gets a drafted reply waiting for your approval within 24 hours.",
      },
    ],
    includedTitle: "What is included",
    includedSetup:
      "$199 setup: connection to up to 2 tools from the supported list, tone and scenario setup",
    includedMonthly:
      "$199/mo: hosting and model costs up to ~500 conversations, downtime alerts, monthly report",
    acceptanceTitle: "Acceptance test",
    approvalGate:
      "For the first 2 weeks, every outbound message goes out only after your approval.",
    termsEyebrow: "Terms",
    termsTitle: "Simple terms, no lock-in tricks.",
    terms: [
      "Month-to-month. 3-month minimum, or the setup fee doubles.",
      "Outgrow it? Upgrade to fixed Build packages from $1,900.",
    ],
    guarantee: "If the acceptance test does not pass, you do not pay.",
    ctaEyebrow: "Next step",
    ctaTitle: "Start with one agent.",
    ctaLead:
      "Tell us which job hurts most. We reply with a fit check and a start date within one business day.",
    ctaButton: "Start a free workflow audit",
  },
  ru: {
    metaTitle: "Agent Starter - один агент, один результат, $199/мес | Dali",
    metaDescription:
      "Самый простой вход в Dali: рабочий агент под одну узкую задачу, запуск за несколько дней. Speed-to-Lead, Missed-Call Textback или Review & Reputation. $199 настройка, $199/мес. Если acceptance test не пройден - вы не платите.",
    heroEyebrow: "Agent Starter",
    heroTitle: "Agent Starter - один агент, один результат, $199/мес",
    heroLead:
      "Самый простой вход: рабочий агент под одну узкую задачу, запуск за несколько дней.",
    heroCta: "Начать бесплатный аудит",
    skusEyebrow: "Три стартера",
    skusTitle: "Выберите одну узкую задачу. Агент делает ровно её.",
    skuIndexPrefix: "Starter",
    skus: [
      {
        name: "Speed-to-Lead",
        summary:
          "Каждый входящий лид получает ответ менее чем за 60 секунд, круглосуточно.",
        bullets: [
          "Отвечает каждому лиду из формы, Instagram или WhatsApp менее чем за 60 секунд",
          "Задаёт один квалифицирующий вопрос и отправляет ссылку на запись",
          "Фиксирует каждый диалог в вашей таблице или CRM",
          "Присылает владельцу ежедневный дайджест по лидам и результатам",
        ],
        acceptanceTest:
          "Тестовый лид из любого подключённого канала получает ответ с квалифицирующим вопросом и ссылкой на запись менее чем за 60 секунд, диалог записан в таблицу или CRM.",
      },
      {
        name: "Missed-Call Textback",
        summary:
          "Пропущенный звонок превращается в мгновенную переписку, которая заканчивается записью.",
        bullets: [
          "Замечает каждый пропущенный звонок и мгновенно отправляет SMS или WhatsApp",
          "Ведёт диалог до записи на конкретный слот",
          "Продолжает переписку, пока клиент не запишется или не откажется",
          "Присылает еженедельный отчёт о спасённых звонках",
        ],
        acceptanceTest:
          "Тестовый звонок без ответа запускает текстовое сообщение в течение 2 минут, и диалог доходит до записи.",
      },
      {
        name: "Review & Reputation",
        summary:
          "Новые отзывы приходят, каждый отзыв в Google получает ответ, контроль остаётся у вас.",
        bullets: [
          "Отправляет клиентам запросы отзывов после визита",
          "Готовит черновики ответов на новые отзывы в Google на ваше утверждение",
          "Публикует только то, что вы одобрили",
          "Присылает ежемесячный отчёт по рейтингу",
        ],
        acceptanceTest:
          "Тестовый визит запускает запрос отзыва, а новый отзыв в Google получает черновик ответа на ваше утверждение в течение 24 часов.",
      },
    ],
    includedTitle: "Что входит",
    includedSetup:
      "$199 настройка: подключение до 2 инструментов из поддерживаемого списка, настройка тона и сценария",
    includedMonthly:
      "$199/мес: хостинг и стоимость модели до ~500 диалогов, оповещения о сбоях, ежемесячный отчёт",
    acceptanceTitle: "Тест приёмки",
    approvalGate:
      "Первые 2 недели каждое исходящее сообщение уходит только после вашего утверждения.",
    termsEyebrow: "Условия",
    termsTitle: "Простые условия, без скрытых привязок.",
    terms: [
      "Помесячная оплата. Минимум 3 месяца, иначе настройка стоит вдвое дороже.",
      "Переросли Starter? Переходите на фиксированные пакеты Build от $1,900.",
    ],
    guarantee: "Если acceptance test не пройден - вы не платите.",
    ctaEyebrow: "Следующий шаг",
    ctaTitle: "Начните с одного агента.",
    ctaLead:
      "Расскажите, какая задача болит сильнее всего. Ответим с оценкой соответствия и датой старта в течение одного рабочего дня.",
    ctaButton: "Начать бесплатный аудит",
  },
  ge: {
    metaTitle: "Agent Starter - ერთი აგენტი, ერთი შედეგი, $199/თვე | Dali",
    metaDescription:
      "ყველაზე მარტივი დასაწყისი Dali-სთან: მუშა აგენტი ერთი ვიწრო ამოცანისთვის, ეშვება რამდენიმე დღეში. Speed-to-Lead, Missed-Call Textback ან Review & Reputation. $199 დაყენება, $199/თვე. თუ მიღების ტესტი არ ჩაბარდა, თქვენ არ იხდით.",
    heroEyebrow: "Agent Starter",
    heroTitle: "Agent Starter - ერთი აგენტი, ერთი შედეგი, $199/თვე",
    heroLead:
      "ყველაზე მარტივი დასაწყისი: მუშა აგენტი ერთი ვიწრო ამოცანისთვის, ეშვება რამდენიმე დღეში.",
    heroCta: "დაიწყეთ უფასო აუდიტი",
    skusEyebrow: "სამი სტარტერი",
    skusTitle: "აირჩიეთ ერთი ვიწრო ამოცანა. აგენტი აკეთებს ზუსტად მას.",
    skuIndexPrefix: "Starter",
    skus: [
      {
        name: "Speed-to-Lead",
        summary:
          "ყველა შემომავალი ლიდი პასუხს იღებს 60 წამზე სწრაფად, დღე-ღამის განმავლობაში.",
        bullets: [
          "პასუხობს ყველა ლიდს ფორმიდან, Instagram-იდან ან WhatsApp-იდან 60 წამზე სწრაფად",
          "სვამს ერთ საკვალიფიკაციო კითხვას და აგზავნის ჩაწერის ბმულს",
          "ინახავს ყველა დიალოგს თქვენს ცხრილში ან CRM-ში",
          "უგზავნის მფლობელს ყოველდღიურ დაიჯესტს ლიდებსა და შედეგებზე",
        ],
        acceptanceTest:
          "სატესტო ლიდი ნებისმიერი მიერთებული არხიდან იღებს პასუხს საკვალიფიკაციო კითხვით და ჩაწერის ბმულით 60 წამზე სწრაფად, დიალოგი ფიქსირდება ცხრილში ან CRM-ში.",
      },
      {
        name: "Missed-Call Textback",
        summary:
          "გამოტოვებული ზარი იქცევა მყისიერ მიმოწერად, რომელიც ჩაწერით მთავრდება.",
        bullets: [
          "ამჩნევს ყველა გამოტოვებულ ზარს და მყისიერად აგზავნის SMS ან WhatsApp შეტყობინებას",
          "მიჰყავს დიალოგი კონკრეტული დროის დაჯავშნამდე",
          "აგრძელებს მიმოწერას, სანამ კლიენტი ჩაიწერება ან უარს იტყვის",
          "აგზავნის ყოველკვირეულ ანგარიშს გადარჩენილ ზარებზე",
        ],
        acceptanceTest:
          "უპასუხოდ დარჩენილი სატესტო ზარი 2 წუთში იწვევს ტექსტურ შეტყობინებას და დიალოგი აღწევს ჩაწერამდე.",
      },
      {
        name: "Review & Reputation",
        summary:
          "ახალი შეფასებები შემოდის, ყველა Google შეფასება პასუხს იღებს, კონტროლი თქვენთან რჩება.",
        bullets: [
          "ვიზიტის შემდეგ უგზავნის კლიენტებს შეფასების მოთხოვნას",
          "ამზადებს პასუხების მონახაზებს ახალ Google შეფასებებზე თქვენი დასტურისთვის",
          "აქვეყნებს მხოლოდ იმას, რასაც თქვენ დაადასტურებთ",
          "აგზავნის ყოველთვიურ ანგარიშს რეიტინგზე",
        ],
        acceptanceTest:
          "სატესტო ვიზიტი იწვევს შეფასების მოთხოვნას, ხოლო ახალი Google შეფასება 24 საათში იღებს პასუხის მონახაზს თქვენი დასტურისთვის.",
      },
    ],
    includedTitle: "რა შედის",
    includedSetup:
      "$199 დაყენება: მიერთება მაქსიმუმ 2 ინსტრუმენტთან მხარდაჭერილი სიიდან, ტონისა და სცენარის მორგება",
    includedMonthly:
      "$199/თვე: ჰოსტინგი და მოდელის ხარჯი ~500 დიალოგამდე, შეფერხების შეტყობინებები, ყოველთვიური ანგარიში",
    acceptanceTitle: "მიღების ტესტი",
    approvalGate:
      "პირველი 2 კვირის განმავლობაში ყველა გამავალი შეტყობინება იგზავნება მხოლოდ თქვენი დასტურის შემდეგ.",
    termsEyebrow: "პირობები",
    termsTitle: "მარტივი პირობები, დამალული ვალდებულებების გარეშე.",
    terms: [
      "თვიდან თვემდე. მინიმუმ 3 თვე, წინააღმდეგ შემთხვევაში დაყენების საფასური ორმაგდება.",
      "გადაუზარდეთ Starter-ს? გადადით ფიქსირებულ Build პაკეტებზე $1,900-დან.",
    ],
    guarantee: "თუ მიღების ტესტი არ ჩაბარდა, თქვენ არ იხდით.",
    ctaEyebrow: "შემდეგი ნაბიჯი",
    ctaTitle: "დაიწყეთ ერთი აგენტით.",
    ctaLead:
      "გვითხარით, რომელი ამოცანა გაწუხებთ ყველაზე მეტად. ერთი სამუშაო დღის განმავლობაში გიპასუხებთ შესაბამისობის შეფასებით და დაწყების თარიღით.",
    ctaButton: "დაიწყეთ უფასო აუდიტი",
  },
  arm: {
    metaTitle: "Agent Starter - մեկ գործակալ, մեկ արդյունք, $199/ամիս | Dali",
    metaDescription:
      "Ամենապարզ մուտքը Dali. աշխատող գործակալ մեկ նեղ խնդրի համար, գործարկվում է մի քանի օրում։ Speed-to-Lead, Missed-Call Textback կամ Review & Reputation։ $199 կարգավորում, $199/ամիս։ Եթե ընդունման թեստը չի անցնում, դուք չեք վճարում։",
    heroEyebrow: "Agent Starter",
    heroTitle: "Agent Starter - մեկ գործակալ, մեկ արդյունք, $199/ամիս",
    heroLead:
      "Ամենապարզ մուտքը. աշխատող գործակալ մեկ նեղ խնդրի համար, գործարկվում է մի քանի օրում։",
    heroCta: "Սկսել անվճար աուդիտ",
    skusEyebrow: "Երեք ստարտեր",
    skusTitle: "Ընտրեք մեկ նեղ խնդիր։ Գործակալն անում է հենց դա։",
    skuIndexPrefix: "Starter",
    skus: [
      {
        name: "Speed-to-Lead",
        summary:
          "Յուրաքանչյուր մուտքային լիդ պատասխան է ստանում 60 վայրկյանից պակաս ժամանակում, շուրջօրյա։",
        bullets: [
          "Պատասխանում է ձևից, Instagram-ից կամ WhatsApp-ից եկած ամեն լիդի 60 վայրկյանից պակաս ժամանակում",
          "Տալիս է մեկ որակավորման հարց և ուղարկում ամրագրման հղումը",
          "Գրանցում է ամեն զրույց ձեր աղյուսակում կամ CRM-ում",
          "Սեփականատիրոջն ուղարկում է ամենօրյա ամփոփում լիդերի և արդյունքների մասին",
        ],
        acceptanceTest:
          "Ցանկացած միացված ալիքով ուղարկված թեստային լիդը 60 վայրկյանից պակաս ժամանակում ստանում է պատասխան որակավորման հարցով և ամրագրման հղումով, զրույցը գրանցվում է աղյուսակում կամ CRM-ում։",
      },
      {
        name: "Missed-Call Textback",
        summary:
          "Բաց թողնված զանգը դառնում է ակնթարթային նամակագրություն, որն ավարտվում է ամրագրումով։",
        bullets: [
          "Նկատում է ամեն բաց թողնված զանգ և անմիջապես ուղարկում SMS կամ WhatsApp հաղորդագրություն",
          "Զրույցը տանում է մինչև ամրագրված կոնկրետ ժամ",
          "Շարունակում է նամակագրությունը, մինչև հաճախորդը ամրագրի կամ հրաժարվի",
          "Ուղարկում է շաբաթական հաշվետվություն փրկված զանգերի մասին",
        ],
        acceptanceTest:
          "Անպատասխան մնացած թեստային զանգը 2 րոպեում գործարկում է տեքստային հաղորդագրություն, և զրույցը հասնում է ամրագրման։",
      },
      {
        name: "Review & Reputation",
        summary:
          "Նոր կարծիքները գալիս են, Google-ի ամեն կարծիք պատասխան է ստանում, վերահսկողությունը մնում է ձեզ մոտ։",
        bullets: [
          "Այցից հետո հաճախորդներին ուղարկում է կարծիք թողնելու հրավեր",
          "Պատրաստում է Google-ի նոր կարծիքների պատասխանների սևագրեր ձեր հաստատման համար",
          "Հրապարակում է միայն այն, ինչ դուք հաստատել եք",
          "Ուղարկում է ամսական հաշվետվություն վարկանիշի մասին",
        ],
        acceptanceTest:
          "Թեստային այցը գործարկում է կարծիքի հարցում, իսկ Google-ի նոր կարծիքը 24 ժամում ստանում է պատասխանի սևագիր ձեր հաստատման համար։",
      },
    ],
    includedTitle: "Ինչ է ներառված",
    includedSetup:
      "$199 կարգավորում. միացում մինչև 2 գործիքի աջակցվող ցանկից, տոնի և սցենարի կարգավորում",
    includedMonthly:
      "$199/ամիս. հոստինգ և մոդելի ծախսեր մինչև ~500 զրույց, խափանումների ծանուցումներ, ամսական հաշվետվություն",
    acceptanceTitle: "Ընդունման թեստ",
    approvalGate:
      "Առաջին 2 շաբաթվա ընթացքում ամեն ելքային հաղորդագրություն ուղարկվում է միայն ձեր հաստատումից հետո։",
    termsEyebrow: "Պայմաններ",
    termsTitle: "Պարզ պայմաններ, առանց թաքնված կապանքների։",
    terms: [
      "Ամսական վճարում։ Նվազագույնը 3 ամիս, հակառակ դեպքում կարգավորման վճարը կրկնապատկվում է։",
      "Գերազանցե՞լ եք Starter-ը։ Անցեք ֆիքսված Build փաթեթների՝ $1,900-ից։",
    ],
    guarantee: "Եթե ընդունման թեստը չի անցնում, դուք չեք վճարում։",
    ctaEyebrow: "Հաջորդ քայլը",
    ctaTitle: "Սկսեք մեկ գործակալից։",
    ctaLead:
      "Ասեք, թե որ խնդիրն է ամենաշատը ցավում։ Մեկ աշխատանքային օրվա ընթացքում կպատասխանենք համապատասխանության գնահատականով և մեկնարկի ամսաթվով։",
    ctaButton: "Սկսել անվճար աուդիտ",
  },
};
