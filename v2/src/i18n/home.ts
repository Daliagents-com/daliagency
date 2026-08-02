import type { Locale } from "./config";

type ServiceCardCopy = {
  title: string;
  description: string;
};

type ProjectCardCopy = {
  tagline: string;
  tags: string[];
};

export type HomeCopy = {
  navigation: {
    home: string[];
    solutions: string[];
    startAudit: string;
    openMenu: string;
    closeMenu: string;
    selectLanguage: string;
  };
  footer: {
    talkToUs: string;
    agentSystems: string;
    production: string;
    approach: string;
    startAudit: string;
    contact: string;
    founder: string;
    socials: string;
    blog: string;
    resources: string;
  };
  hero: {
    lines: string[][];
    lead: string;
    icp: string;
    promise: string;
    secondaryCta: string;
    scroll: string;
  };
  projects: {
    heading: string;
    previous: string;
    next: string;
    mobileSuffix: string;
  };
  about: {
    heading: string;
    beforeName: string;
    afterName: string;
    founder: string;
    coFounder: string;
  };
  services: {
    heading: string;
    body: string;
    contact: string;
    cards: ServiceCardCopy[];
  };
  projectCards: Record<string, ProjectCardCopy>;
};

export const homeCopy: Record<Locale, HomeCopy> = {
  en: {
    navigation: {
      home: ["Projects", "Solutions", "Blog", "Services", "About"],
      solutions: ["Solutions", "Process", "Blog", "Proof", "About"],
      startAudit: "Start audit",
      openMenu: "Open navigation menu",
      closeMenu: "Close navigation menu",
      selectLanguage: "Select language",
    },
    footer: {
      talkToUs: "Talk to us",
      agentSystems: "AI agent systems",
      production:
        "Production AI agents and workflow automation, mapped to the tools your team already runs.",
      approach:
        "We audit real operating workflows, define where agents belong, and design implementation paths that fit existing systems.",
      startAudit: "Start audit",
      contact: "Contact",
      founder: "Founder: David Hakobyan",
      socials: "Socials",
      blog: "Blog",
      resources: "Resources",
    },
    hero: {
      lines: [
        ["Agent", "systems"],
        ["for", "your"],
        ["business"],
      ],
      lead: "Production AI agents in the tools your team already uses.",
      icp: "For service businesses with real inbound volume - and founders with AI-built MVPs that need production hardening.",
      promise: "One workflow · One acceptance test · Fixed price · You own the code",
      secondaryCta: "See solutions",
      scroll: "Scroll",
    },
    projects: {
      heading: "Selected systems and products",
      previous: "Previous projects",
      next: "Next projects",
      mobileSuffix: "mobile",
    },
    about: {
      heading: "About us",
      beforeName: "",
      afterName:
        "is an AI agent systems studio combining engineering and operations. David designs the product and technical system, Liana makes sure it fits real workflows and teams, and together we take projects from process discovery to production.",
      founder: "Founder",
      coFounder: "Co-founder",
    },
    services: {
      heading: "From process discovery to production agent systems",
      body: "We map how your company works, pick high-value agent paths, and define tools plus human controls before we build.",
      contact: "Start a free audit",
      cards: [
        {
          title: "Conversation control",
          description:
            "Inbound leads or client support in one supervised inbox shell.",
        },
        {
          title: "Ops & knowledge systems",
          description:
            "Documents-to-actions or internal Q&A with audit and human gates.",
        },
        {
          title: "Agent-first products",
          description: "Agents do the core product work, not just chat.",
        },
        {
          title: "AI visibility systems",
          description: "GEO, SEO, and content systems for search and AI answers.",
        },
        {
          title: "Vibe-code rescue",
          description:
            "Triage secrets, payments, and admin on AI-built MVPs, then harden with gates and a handoff.",
        },
      ],
    },
    projectCards: {
      kora: {
        tagline: "AI co-founder for freelancers & agencies",
        tags: ["product", "AI agents", "ops"],
      },
      muqtad: {
        tagline: "discount aggregator",
        tags: ["brand", "e-commerce"],
      },
      deliverysetup: {
        tagline: "restaurant delivery, end-to-end",
        tags: ["brand", "foodtech", "service"],
      },
      uimix: {
        tagline: "WYSIWYG for React components",
        tags: ["product", "dev tool", "open source"],
      },
      masuro: {
        tagline: "localization & video studio",
        tags: ["brand", "studio", "video"],
      },
      agentsge: {
        tagline: "agent-first workspace with persistent shared memory",
        tags: ["agent-first", "shared memory", "open source"],
      },
      tamari: {
        tagline: "daily wisdom of the saints",
        tags: ["mobile", "brand", "spiritual"],
      },
      muqta: {
        tagline: "smart shopping companion",
        tags: ["mobile", "e-commerce", "lifestyle"],
      },
    },
  },
  ru: {
    navigation: {
      home: ["Проекты", "Решения", "Блог", "Услуги", "О нас"],
      solutions: ["Решения", "Процесс", "Блог", "Кейсы", "О нас"],
      startAudit: "Начать аудит",
      openMenu: "Открыть меню навигации",
      closeMenu: "Закрыть меню навигации",
      selectLanguage: "Выбрать язык",
    },
    footer: {
      talkToUs: "Свяжитесь с нами",
      agentSystems: "Системы ИИ-агентов",
      production:
        "Создаём производственные ИИ-агенты и автоматизируем процессы в инструментах, которыми уже пользуется ваша команда.",
      approach:
        "Изучаем реальные рабочие процессы, определяем задачи для агентов и проектируем внедрение в существующие системы.",
      startAudit: "Начать аудит",
      contact: "Контакты",
      founder: "Основатель: Давид Акопян",
      socials: "Соцсети",
      blog: "Блог",
      resources: "Ресурсы",
    },
    hero: {
      lines: [
        ["Агентские", "системы"],
        ["для", "вашего"],
        ["бизнеса"],
      ],
      lead: "Рабочие ИИ-агенты в инструментах, которыми команда уже пользуется.",
      icp: "Для сервисных бизнесов с потоком входящих - и фаундеров с AI-собранными MVP, которым нужен продакшен.",
      promise: "Один процесс · Один приёмочный тест · Фиксированная цена · Код ваш",
      secondaryCta: "Смотреть решения",
      scroll: "Листайте",
    },
    projects: {
      heading: "Избранные системы и продукты",
      previous: "Предыдущие проекты",
      next: "Следующие проекты",
      mobileSuffix: "мобильная версия",
    },
    about: {
      heading: "О нас",
      beforeName: "",
      afterName:
        "это студия агентских ИИ-систем, объединяющая разработку и операционную экспертизу. Давид проектирует продукт и техническую систему, Лиана помогает встроить её в реальные процессы и работу команды. Вместе мы ведём проекты от изучения процессов до запуска.",
      founder: "Основатель",
      coFounder: "Сооснователь",
    },
    services: {
      heading: "От изучения процессов до рабочих агентских систем",
      body: "Изучаем процессы, выбираем ценные пути для агентов и заранее задаём инструменты и точки человеческого контроля.",
      contact: "Начать бесплатный аудит",
      cards: [
        {
          title: "Управление перепиской",
          description:
            "Входящие лиды или client support в одной supervised inbox-оболочке.",
        },
        {
          title: "Ops и знания",
          description:
            "Documents-to-actions или internal Q&A с audit и human gates.",
        },
        {
          title: "Agent-first продукты",
          description: "Агенты делают core-работу продукта, а не просто чат.",
        },
        {
          title: "Системы AI-видимости",
          description: "GEO, SEO и контент для поиска и AI-ответов.",
        },
        {
          title: "Vibe-code rescue",
          description:
            "Триаж секретов, платежей и admin-путей в AI-MVP, затем hardening с gates и handoff.",
        },
      ],
    },
    projectCards: {
      kora: {
        tagline: "AI co-founder для фрилансеров и агентств",
        tags: ["product", "AI agents", "ops"],
      },
      muqtad: {
        tagline: "агрегатор скидок",
        tags: ["бренд", "e-commerce"],
      },
      deliverysetup: {
        tagline: "доставка для ресторанов под ключ",
        tags: ["бренд", "foodtech", "сервис"],
      },
      uimix: {
        tagline: "визуальный редактор React-компонентов",
        tags: ["продукт", "инструмент", "open source"],
      },
      masuro: {
        tagline: "локализация и видеостудия",
        tags: ["бренд", "студия", "видео"],
      },
      agentsge: {
        tagline: "agent-first среда с постоянной общей памятью",
        tags: ["agent-first", "общая память", "open source"],
      },
      tamari: {
        tagline: "ежедневная мудрость святых",
        tags: ["мобильное", "бренд", "духовность"],
      },
      muqta: {
        tagline: "умный помощник для покупок",
        tags: ["мобильное", "e-commerce", "образ жизни"],
      },
    },
  },
  ge: {
    navigation: {
      home: ["პროექტები", "გადაწყვეტილებები", "ბლოგი", "სერვისები", "ჩვენ შესახებ"],
      solutions: ["გადაწყვეტილებები", "პროცესი", "ბლოგი", "ნამუშევრები", "ჩვენ შესახებ"],
      startAudit: "აუდიტის დაწყება",
      openMenu: "ნავიგაციის მენიუს გახსნა",
      closeMenu: "ნავიგაციის მენიუს დახურვა",
      selectLanguage: "ენის არჩევა",
    },
    footer: {
      talkToUs: "დაგვიკავშირდით",
      agentSystems: "AI აგენტების სისტემები",
      production:
        "ვქმნით სამუშაო AI აგენტებს და პროცესების ავტომატიზაციას იმ ხელსაწყოებში, რომლებსაც თქვენი გუნდი უკვე იყენებს.",
      approach:
        "ვიკვლევთ რეალურ სამუშაო პროცესებს, ვადგენთ აგენტების ადგილს და ვგეგმავთ არსებულ სისტემებთან შესაბამის დანერგვას.",
      startAudit: "აუდიტის დაწყება",
      contact: "კონტაქტი",
      founder: "დამფუძნებელი: დავით ჰაკობიანი",
      socials: "სოციალური ქსელები",
      blog: "ბლოგი",
      resources: "რესურსები",
    },
    hero: {
      lines: [
        ["აგენტური", "სისტემები"],
        ["თქვენი"],
        ["ბიზნესისთვის"],
      ],
      lead: "სამუშაო AI აგენტები იმ ხელსაწყოებში, რომლებსაც გუნდი უკვე იყენებს.",
      icp: "სერვისული ბიზნესებისთვის დიდი შემომავალი ნაკადით - და დამფუძნებლებისთვის, რომელთა AI-ით აწყობილ MVP-ს პროდაქშენი სჭირდება.",
      promise: "ერთი პროცესი · ერთი მიღების ტესტი · ფიქსირებული ფასი · კოდი თქვენია",
      secondaryCta: "იხილეთ გადაწყვეტები",
      scroll: "გადაახვიეთ",
    },
    projects: {
      heading: "შერჩეული სისტემები და პროდუქტები",
      previous: "წინა პროექტები",
      next: "შემდეგი პროექტები",
      mobileSuffix: "მობილური ვერსია",
    },
    about: {
      heading: "ჩვენ შესახებ",
      beforeName: "",
      afterName:
        "არის AI აგენტური სისტემების სტუდია, სადაც ერთიანდება ინჟინერია და ოპერაციები. დავითი პროექტირებს პროდუქტსა და ტექნიკურ სისტემას, ლიანა უზრუნველყოფს, რომ ის რეალურ პროცესებსა და გუნდებთან ერგება. ერთად ვაწარმოებთ პროექტებს პროცესების კვლევიდან production-მდე.",
      founder: "დამფუძნებელი",
      coFounder: "თანადამფუძნებელი",
    },
    services: {
      heading: "პროცესების კვლევიდან production აგენტურ სისტემებამდე",
      body: "ვიკვლევთ, როგორ მუშაობს თქვენი კომპანია, ვირჩევთ მაღალი ღირებულების აგენტურ გზებს და წინასწარ ვადგენთ ხელსაწყოებსა და ადამიანის კონტროლის წერტილებს.",
      contact: "დაიწყეთ უფასო აუდიტი",
      cards: [
        {
          title: "მორგებული აგენტური სისტემები",
          description: "პროცესები, ხელსაწყოები, წესები და approve-ის საზღვრები.",
        },
        {
          title: "Agent-first პროდუქტები",
          description: "აგენტები აკეთებენ პროდუქტის core-სამუშაოს, არა მხოლოდ ჩატს.",
        },
        {
          title: "AI კონსალტინგი და ტრენინგი",
          description: "Discovery, roadmap, არქიტექტურა და ვორქშოპები.",
        },
        {
          title: "AI ხილვადობის სისტემები",
          description: "GEO, SEO და კონტენტი ძიებისა და AI-პასუხებისთვის.",
        },
        {
          title: "Vibe-code rescue",
          description:
            "AI-ით აწყობილი MVP-ის secrets, payments და admin ბილიკების ტრიაჟი, შემდეგ hardening gates-ით და handoff-ით.",
        },
      ],
    },
    projectCards: {
      kora: {
        tagline: "AI co-founder ფრილანსერებისა და სააგენტოებისთვის",
        tags: ["product", "AI agents", "ops"],
      },
      muqtad: {
        tagline: "ფასდაკლებების აგრეგატორი",
        tags: ["ბრენდი", "e-commerce"],
      },
      deliverysetup: {
        tagline: "რესტორნის მიტანა სრულად",
        tags: ["ბრენდი", "foodtech", "სერვისი"],
      },
      uimix: {
        tagline: "React კომპონენტების ვიზუალური რედაქტორი",
        tags: ["პროდუქტი", "დევ ხელსაწყო", "ღია კოდი"],
      },
      masuro: {
        tagline: "ლოკალიზაციისა და ვიდეოს სტუდია",
        tags: ["ბრენდი", "სტუდია", "ვიდეო"],
      },
      agentsge: {
        tagline: "agent-first გარემო მუდმივი საერთო მეხსიერებით",
        tags: ["agent-first", "საერთო მეხსიერება", "ღია კოდი"],
      },
      tamari: {
        tagline: "წმინდანთა ყოველდღიური სიბრძნე",
        tags: ["მობილური", "ბრენდი", "სულიერი"],
      },
      muqta: {
        tagline: "ჭკვიანი საყიდლების ასისტენტი",
        tags: ["მობილური", "e-commerce", "ცხოვრების სტილი"],
      },
    },
  },
  arm: {
    navigation: {
      home: ["Նախագծեր", "Լուծումներ", "Բլոգ", "Ծառայություններ", "Մեր մասին"],
      solutions: ["Լուծումներ", "Գործընթաց", "Բլոգ", "Նախագծեր", "Մեր մասին"],
      startAudit: "Սկսել աուդիտը",
      openMenu: "Բացել նավիգացիոն ընտրացանկը",
      closeMenu: "Փակել նավիգացիոն ընտրացանկը",
      selectLanguage: "Ընտրել լեզուն",
    },
    footer: {
      talkToUs: "Կապվեք մեզ հետ",
      agentSystems: "AI գործակալների համակարգեր",
      production:
        "Ստեղծում ենք գործնական AI գործակալներ և ավտոմատացնում գործընթացները ձեր թիմի արդեն օգտագործած գործիքներում։",
      approach:
        "Ուսումնասիրում ենք իրական աշխատանքային գործընթացները, որոշում գործակալների դերը և նախագծում առկա համակարգերին համապատասխան ներդրում։",
      startAudit: "Սկսել աուդիտը",
      contact: "Կապ",
      founder: "Հիմնադիր՝ Դավիթ Հակոբյան",
      socials: "Սոցիալական ցանցեր",
      blog: "Բլոգ",
      resources: "Ռեսուրսներ",
    },
    hero: {
      lines: [
        ["Գործակալային", "համակարգեր"],
        ["ձեր"],
        ["բիզնեսի", "համար"],
      ],
      lead: "Արտադրական AI գործակալներ՝ թիմի արդեն օգտագործվող գործիքներում։",
      icp: "Սերվիսային բիզնեսների համար՝ մեծ մուտքային հոսքով, և հիմնադիրների համար, որոնց AI-ով հավաքած MVP-ն արտադրական ամրացման կարիք ունի։",
      promise: "Մեկ գործընթաց · Մեկ ընդունման թեստ · Ֆիքսված գին · Կոդը ձերն է",
      secondaryCta: "Դիտել լուծումները",
      scroll: "Ոլորեք",
    },
    projects: {
      heading: "Ընտրված համակարգեր և արտադրանք",
      previous: "Նախորդ նախագծերը",
      next: "Հաջորդ նախագծերը",
      mobileSuffix: "բջջային տարբերակ",
    },
    about: {
      heading: "Մեր մասին",
      beforeName: "",
      afterName:
        "AI գործակալային համակարգերի ստուդիա է, որը միավորում է ինժեներիան և օպերացիաները։ Դավիթը նախագծում է արտադրանքն ու տեխնիկական համակարգը, Լիանան ապահովում է, որ այն համապատասխանի իրական գործընթացներին և թիմերին։ Միասին նախագծերը տանում ենք գործընթացների ուսումնասիրությունից մինչև production։",
      founder: "Հիմնադիր",
      coFounder: "Համահիմնադիր",
    },
    services: {
      heading: "Գործընթացների ուսումնասիրությունից մինչև production գործակալային համակարգեր",
      body: "Քարտեզագրում ենք, թե ինչպես է աշխատում ձեր ընկերությունը, ընտրում բարձրարժեք գործակալային ուղիներ և նախապես սահմանում գործիքներն ու մարդու վերահսկման կետերը։",
      contact: "Սկսել անվճար աուդիտ",
      cards: [
        {
          title: "Անհատական գործակալային համակարգեր",
          description: "Գործընթացներ, գործիքներ, կանոններ և approve սահմաններ։",
        },
        {
          title: "Agent-first արտադրանք",
          description: "Գործակալները կատարում են արտադրանքի core աշխատանքը, ոչ միայն չատը։",
        },
        {
          title: "AI խորհրդատվություն և ուսուցում",
          description: "Discovery, roadmap, ճարտարապետություն և վորկշոփներ։",
        },
        {
          title: "AI տեսանելիության համակարգեր",
          description: "GEO, SEO և բովանդակություն որոնման և AI պատասխանների համար։",
        },
        {
          title: "Vibe-code rescue",
          description:
            "AI-ով կառուցված MVP-ի secrets, payments և admin ուղիների տրիաժ, ապա hardening՝ gates-ով և handoff-ով։",
        },
      ],
    },
    projectCards: {
      kora: {
        tagline: "AI co-founder ֆրիլանսերների և գործակալությունների համար",
        tags: ["product", "AI agents", "ops"],
      },
      muqtad: {
        tagline: "զեղչերի ագրեգատոր",
        tags: ["բրենդ", "e-commerce"],
      },
      deliverysetup: {
        tagline: "ռեստորանային առաքում ամբողջությամբ",
        tags: ["բրենդ", "foodtech", "ծառայություն"],
      },
      uimix: {
        tagline: "React բաղադրիչների տեսողական խմբագիր",
        tags: ["արտադրանք", "մշակման գործիք", "բաց կոդ"],
      },
      masuro: {
        tagline: "տեղայնացման և տեսանյութի ստուդիա",
        tags: ["բրենդ", "ստուդիա", "տեսանյութ"],
      },
      agentsge: {
        tagline: "agent-first միջավայր մշտական ընդհանուր հիշողությամբ",
        tags: ["agent-first", "ընդհանուր հիշողություն", "բաց կոդ"],
      },
      tamari: {
        tagline: "սրբերի ամենօրյա իմաստություն",
        tags: ["բջջային", "բրենդ", "հոգևոր"],
      },
      muqta: {
        tagline: "խելացի գնումների օգնական",
        tags: ["բջջային", "e-commerce", "կենսակերպ"],
      },
    },
  },
};
