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
  };
  hero: {
    lines: string[][];
    lead: string;
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
      home: ["Projects", "Solutions", "Services", "About"],
      solutions: ["Solutions", "Process", "Proof", "About"],
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
    },
    hero: {
      lines: [
        ["Agent", "systems"],
        ["for", "your"],
        ["business"],
      ],
      lead: "Production AI agents in the tools your team already uses.",
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
      contact: "Book a free consultation",
      cards: [
        {
          title: "Custom agent systems",
          description: "Workflows, tools, rules, and approval boundaries.",
        },
        {
          title: "Agent-first products",
          description: "Agents do the core product work, not just chat.",
        },
        {
          title: "AI consulting and training",
          description: "Discovery, roadmaps, architecture, and workshops.",
        },
        {
          title: "AI visibility systems",
          description: "GEO, SEO, and content systems for search and AI answers.",
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
      home: ["Проекты", "Решения", "Услуги", "О нас"],
      solutions: ["Решения", "Процесс", "Кейсы", "О нас"],
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
    },
    hero: {
      lines: [
        ["Агентские", "системы"],
        ["для", "вашего"],
        ["бизнеса"],
      ],
      lead: "Рабочие ИИ-агенты в инструментах, которыми команда уже пользуется.",
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
      contact: "Записаться на бесплатную консультацию",
      cards: [
        {
          title: "Кастомные агентские системы",
          description: "Процессы, инструменты, правила и границы approve.",
        },
        {
          title: "Agent-first продукты",
          description: "Агенты делают core-работу продукта, а не просто чат.",
        },
        {
          title: "ИИ-консалтинг и обучение",
          description: "Discovery, roadmap, архитектура и воркшопы.",
        },
        {
          title: "Системы AI-видимости",
          description: "GEO, SEO и контент для поиска и AI-ответов.",
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
      home: ["პროექტები", "გადაწყვეტილებები", "სერვისები", "ჩვენ შესახებ"],
      solutions: ["გადაწყვეტილებები", "პროცესი", "ნამუშევრები", "ჩვენ შესახებ"],
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
    },
    hero: {
      lines: [
        ["აგენტური", "სისტემები"],
        ["თქვენი"],
        ["ბიზნესისთვის"],
      ],
      lead: "სამუშაო AI აგენტები იმ ხელსაწყოებში, რომლებსაც გუნდი უკვე იყენებს.",
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
        "არის ოჯახური სიახლოვით შექმნილი და პროფესიული სიზუსტით მართული სააგენტო. ლიანა ხელმძღვანელობს ოპერაციებს, დავითი - ინჟინერიას. ჩვენი მუშაობის საფუძველია ნდობა, სტრუქტურა და ხარისხისადმი განსაკუთრებული ყურადღება.",
      founder: "დამფუძნებელი",
      coFounder: "თანადამფუძნებელი",
    },
    services: {
      heading: "ვებსაიტები, აპები, AI აგენტები და ბიზნესის ავტომატიზაცია",
      body: "პრაქტიკული ციფრული სისტემები: გასაშვები ვებსაიტებიდან დროის დამზოგავ შიდა ხელსაწყოებამდე.",
      contact: "დაგვიკავშირდით",
      cards: [
        {
          title: "ვებსაიტების შექმნა",
          description: "ლენდინგები და პროდუქტის გვერდები სწრაფი გაშვებისთვის.",
        },
        {
          title: "აპლიკაციები",
          description: "ვებაპები, დაფები და ყოველდღიური ბიზნესის ინტერფეისები.",
        },
        {
          title: "AI აგენტები",
          description: "აგენტები მხარდაჭერის, გაყიდვებისა და ოპერაციებისთვის.",
        },
        {
          title: "ავტომატიზაცია",
          description: "CRM, ცხრილები, ფორმები და AI ერთიან პროცესებში.",
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
        tagline: "საერთო მეხსიერება AI კოდის აგენტებისთვის",
        tags: ["პროდუქტი", "დევ ხელსაწყო", "ღია კოდი"],
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
      home: ["Նախագծեր", "Լուծումներ", "Ծառայություններ", "Մեր մասին"],
      solutions: ["Լուծումներ", "Գործընթաց", "Նախագծեր", "Մեր մասին"],
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
    },
    hero: {
      lines: [
        ["Գործակալային", "համակարգեր"],
        ["ձեր"],
        ["բիզնեսի", "համար"],
      ],
      lead: "Արտադրական AI գործակալներ՝ թիմի արդեն օգտագործվող գործիքներում։",
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
        "ընտանեկան մտերմությամբ ստեղծված և մասնագիտական ճշգրտությամբ կառավարվող գործակալություն է։ Լիանան ղեկավարում է գործառնական աշխատանքը, Դավիթը՝ ինժեներականը։ Մեր աշխատանքի հիմքում վստահությունն է, կառուցվածքը և որակի նկատմամբ ուշադրությունը։",
      founder: "Հիմնադիր",
      coFounder: "Համահիմնադիր",
    },
    services: {
      heading: "Կայքեր, հավելվածներ, AI գործակալներ և բիզնեսի ավտոմատացում",
      body: "Գործնական թվային համակարգեր՝ գործարկման կայքերից մինչև թիմի ժամանակը խնայող գործիքներ։",
      contact: "Կապվել մեզ հետ",
      cards: [
        {
          title: "Կայքերի մշակում",
          description: "Լենդինգներ և արտադրանքի էջեր արագ գործարկման համար։",
        },
        {
          title: "Հավելվածներ",
          description: "Վեբ հավելվածներ, վահանակներ և բիզնես միջերեսներ։",
        },
        {
          title: "AI գործակալներ",
          description: "Գործակալներ աջակցության, վաճառքի և օպերացիաների համար։",
        },
        {
          title: "Ավտոմատացում",
          description: "CRM, աղյուսակներ, ձևեր և AI մեկ գործընթացում։",
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
        tagline: "ընդհանուր հիշողություն AI կոդավորման գործակալների համար",
        tags: ["արտադրանք", "մշակման գործիք", "բաց կոդ"],
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
