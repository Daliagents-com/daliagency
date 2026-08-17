import type { Locale } from "./config";

type ServiceCardCopy = {
  title: string;
  price: string;
  description: string;
  cta: string;
};

type AlternativeOptionCopy = {
  title: string;
  body: string;
  ours?: boolean;
};

type DeliveryStepCopy = {
  day: string;
  body: string;
  stamp: string;
  lines: { item: string; state: string }[];
};

type AcceptanceCheckCopy = {
  criterion: string;
  condition: string;
  evidence: string;
};

type PricingPartCopy = {
  text: string;
  href?: string;
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
    title: string;
    bridge: string;
    accent: string;
    lead: string;
    primaryCta: string;
    secondaryCta: string;
    scroll: string;
  };
  ctaGift: string;
  manifesto: {
    label: string;
    state: string;
    heading: string;
    body: string;
    decision: string;
    passLabel: string;
    passBody: string;
    failLabel: string;
    failBody: string;
    checksLabel: string;
    checksNote: string;
    columns: {
      criterion: string;
      condition: string;
      evidence: string;
    };
    checks: AcceptanceCheckCopy[];
    statusLabel: string;
    status: string;
    statusValue: string;
    invoiceLabel: string;
    dueLabel: string;
    dueOpen: string;
    dueClosed: string;
  };
  deliveryPath: {
    label: string;
    steps: DeliveryStepCopy[];
  };
  alternatives: {
    heading: string;
    options: AlternativeOptionCopy[];
  };
  pricing: {
    label: string;
    parts: PricingPartCopy[];
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
    label: string;
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
      title: "A 100× improvement,",
      bridge: "or we",
      accent: "don't build it.",
      lead: "Production AI agents for service businesses, built inside your tools. One written acceptance test - no pass, no pay.",
      primaryCta: "Book a free audit",
      secondaryCta: "See the work",
      scroll: "Scroll",
    },

    ctaGift:
      "30 minutes with the person who builds the system. Leave with three ranked workflows, a first pass condition, and a fixed price range.",

    manifesto: {
      label: "Acceptance protocol",
      state: "Terms locked before build",
      heading: "We do not ask you to trust a promise. We show you how the work will be accepted.",
      body: "The test is written before we build. The invoice waits for it.",
      decision: "Did every written condition pass?",
      passLabel: "Pass",
      passBody: "Launch the workflow. Invoice unlocked.",
      failLabel: "Fail",
      failBody: "Fix and rerun. Nothing to pay.",
      checksLabel: "What we measure",
      checksNote: "Exact values are agreed with you",
      columns: {
        criterion: "Criterion",
        condition: "Written condition",
        evidence: "Evidence",
      },
      checks: [
        {
          criterion: "Outcome quality",
          condition: "Target agreed before development",
          evidence: "Held-out leads",
        },
        {
          criterion: "Speed and cost",
          condition: "Maximum limits fixed in scope",
          evidence: "Timestamped run log",
        },
        {
          criterion: "Sensitive actions",
          condition: "Human approval is mandatory",
          evidence: "Tool-call trace",
        },
        {
          criterion: "Payment",
          condition: "Every written gate must pass",
          evidence: "Acceptance report",
        },
      ],
      statusLabel: "Commercial rule",
      status: "Pass first. Invoice second.",
      statusValue: "Written into scope",
      invoiceLabel: "Invoice",
      dueLabel: "Due",
      dueOpen: "Unlocked",
      dueClosed: "$0",
    },

    deliveryPath: {
      label: "How the test runs",
      steps: [
        {
          day: "Real leads",
          body: "A representative sample, locked before we write code.",
          stamp: "Frozen sample",
          lines: [
            { item: "#14 inbound", state: "locked" },
            { item: "#27 missed call", state: "locked" },
            { item: "#31 renewal", state: "locked" },
          ],
        },
        {
          day: "Control run",
          body: "The agent works. Clients never see it.",
          stamp: "Shadow log",
          lines: [
            { item: "Draft reply", state: "not sent" },
            { item: "CRM note", state: "not sent" },
            { item: "Refund ask", state: "held" },
          ],
        },
        {
          day: "Human review",
          body: "You compare the log to the written gates.",
          stamp: "Your review",
          lines: [
            { item: "Quality vs target", state: "you confirm" },
            { item: "Speed and cost", state: "you confirm" },
            { item: "Sensitive action", state: "you decide" },
          ],
        },
      ],
    },

    alternatives: {
      heading: "Three ways to get an agent into production.",
      options: [
        {
          title: "DIY with a no-code builder",
          body: "Fast prototype. Then silent failures at 2 a.m., no evals, nobody watching. Free until it costs you a client.",
        },
        {
          title: "Hire an ML engineer",
          body: "$8-15k/mo, months to the first workflow, and you still need someone to own operations.",
        },
        {
          title: "Dali",
          body: "One workflow live against a written acceptance test. From $1,900 fixed. Human gates from day one. You own the code.",
          ours: true,
        },
      ],
    },

    pricing: {
      label: "Pricing",
      parts: [
        { text: "Start", href: "/starter" },
        { text: " at $199/mo. " },
        { text: "Subscribe", href: "/hire" },
        { text: " from $300/mo - built and run for you. " },
        { text: "Build", href: "/solutions" },
        { text: " a lane from $1,900 fixed. " },
        { text: "Rescue", href: "/solutions/rescue-and-migration" },
        { text: " a failing system from $1,900. " },
        { text: "Keep it healthy", href: "/care" },
        {
          text: " from $390/mo. Every fixed package ships against a written test - no pass, no pay.",
        },
      ],
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
      label: "Services",
      heading: "Choose how you want to start with Dali",
      body: "Start with a packaged agent, commission one fixed workflow, rescue an existing system, or keep production healthy. Every route has a clear scope, price, and next step.",
      contact: "Find my best workflow - free",
      cards: [
        {
          title: "Starter",
          price: "$199/mo",
          description:
            "One packaged agent for a narrow recurring task. Setup is included.",
          cta: "See Starter",
        },
        {
          title: "Subscription",
          price: "From $300/mo",
          description:
            "An agent we build, run, and continuously improve for you.",
          cta: "See Subscription",
        },
        {
          title: "Fixed build",
          price: "From $1,900 fixed",
          description:
            "One workflow, one acceptance test, shipped inside the tools you already use.",
          cta: "Choose a solution",
        },
        {
          title: "Rescue & Migration",
          price: "From $1,900 fixed",
          description:
            "Stabilize a failing agent, migrate an aging API, or harden an AI-built MVP.",
          cta: "See Rescue",
        },
        {
          title: "Agent Care",
          price: "From $390/mo",
          description:
            "Monitoring, evals, guardrails, and ongoing production ownership.",
          cta: "See Care",
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
      title: "В 100 раз лучше -",
      bridge: "или мы",
      accent: "не берёмся.",
      lead: "AI-агенты для сервисного бизнеса в ваших инструментах. Один процесс, один письменный тест - не прошёл, не платите.",
      primaryCta: "Получить бесплатный аудит",
      secondaryCta: "Смотреть работы",
      scroll: "Листайте",
    },

    ctaGift:
      "30 минут с тем, кто строит систему. Уйдёте с тремя приоритетными процессами, первым условием приёмки и фиксированным диапазоном цены.",

    manifesto: {
      label: "Как принимаем работу",
      state: "Условия зафиксированы до разработки",
      heading: "Не просим верить обещаниям. Показываем, как будет принята работа.",
      body: "Тест фиксируем до разработки. Счёт ждёт результата.",
      decision: "Каждое записанное условие выполнено?",
      passLabel: "Прошёл",
      passBody: "Запускаем процесс. Выставляем счёт.",
      failLabel: "Не прошёл",
      failBody: "Исправляем и повторяем. К оплате 0.",
      checksLabel: "Что измеряем",
      checksNote: "Точные значения согласуем с вами",
      columns: {
        criterion: "Критерий",
        condition: "Условие",
        evidence: "Подтверждение",
      },
      checks: [
        {
          criterion: "Качество результата",
          condition: "Цель фиксируется до разработки",
          evidence: "Контрольные лиды",
        },
        {
          criterion: "Скорость и стоимость",
          condition: "Предельные значения входят в условия",
          evidence: "Журнал прогонов",
        },
        {
          criterion: "Чувствительные действия",
          condition: "Обязательно подтверждает человек",
          evidence: "Трассировка действий",
        },
        {
          criterion: "Оплата",
          condition: "Пройдены все записанные критерии",
          evidence: "Отчёт о приёмке",
        },
      ],
      statusLabel: "Правило оплаты",
      status: "Сначала приёмка. Потом счёт.",
      statusValue: "Фиксируем письменно",
      invoiceLabel: "Счёт",
      dueLabel: "К оплате",
      dueOpen: "Открыт",
      dueClosed: "0",
    },

    deliveryPath: {
      label: "Как проходит проверка",
      steps: [
        {
          day: "Реальные лиды",
          body: "Репрезентативная выборка, зафиксированная до кода.",
          stamp: "Замороженная выборка",
          lines: [
            { item: "#14 входящий", state: "зафиксирован" },
            { item: "#27 пропущенный звонок", state: "зафиксирован" },
            { item: "#31 продление", state: "зафиксирован" },
          ],
        },
        {
          day: "Контрольный прогон",
          body: "Агент работает. Клиенты этого не видят.",
          stamp: "Теневой журнал",
          lines: [
            { item: "Черновик ответа", state: "не отправлен" },
            { item: "Заметка в CRM", state: "не отправлена" },
            { item: "Запрос на возврат", state: "удержан" },
          ],
        },
        {
          day: "Проверка человеком",
          body: "Вы сверяете журнал с записанными условиями.",
          stamp: "Ваша проверка",
          lines: [
            { item: "Качество против цели", state: "вы подтверждаете" },
            { item: "Скорость и стоимость", state: "вы подтверждаете" },
            { item: "Чувствительное действие", state: "вы решаете" },
          ],
        },
      ],
    },

    alternatives: {
      heading: "Три способа запустить ИИ-агента в реальной работе.",
      options: [
        {
          title: "Собрать самому в конструкторе без кода",
          body: "Быстрый прототип. Затем скрытые сбои ночью, без системных проверок и ответственного за работу. Бесплатно, пока это не стоит вам клиента.",
        },
        {
          title: "Нанять ML-инженера",
          body: "$8-15k/мес, несколько месяцев до первого автоматизированного процесса, и всё равно нужен тот, кто отвечает за ежедневную работу системы.",
        },
        {
          title: "Dali",
          body: "Один процесс запускается по письменному приёмочному тесту. От $1,900 фикс. Чувствительные действия с первого дня проверяет человек. Код остаётся вам.",
          ours: true,
        },
      ],
    },

    pricing: {
      label: "Цены",
      parts: [
        { text: "Старт", href: "/starter" },
        { text: " за $199/мес. " },
        { text: "Подписка", href: "/hire" },
        { text: " от $300/мес - строим и ведём за вас. " },
        { text: "Сборка", href: "/solutions" },
        { text: " одного процесса от $1,900 фикс. " },
        { text: "Спасение", href: "/solutions/rescue-and-migration" },
        { text: " падающей системы от $1,900. " },
        { text: "Поддержка", href: "/care" },
        {
          text: " от $390/мес. Каждый фикс-пакет сдаётся по письменному тесту - нет прохождения, нет оплаты.",
        },
      ],
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
      label: "Услуги",
      heading: "Выберите, как начать работу с Dali",
      body: "Начните с готового агента, закажите систему под один процесс, спасите существующую или передайте рабочую систему под постоянный контроль. У каждого формата есть понятные границы, цена и следующий шаг.",
      contact: "Подобрать процесс бесплатно",
      cards: [
        {
          title: "Быстрый старт",
          price: "$199/мес.",
          description:
            "Один готовый агент для узкой повторяющейся задачи. Настройка включена.",
          cta: "Открыть быстрый старт",
        },
        {
          title: "Подписка",
          price: "От $300/мес.",
          description:
            "ИИ-агент, которого мы собираем, запускаем и постоянно улучшаем за вас.",
          cta: "Смотреть подписку",
        },
        {
          title: "Фиксированная разработка",
          price: "От $1,900 фикс.",
          description:
            "Один процесс, один приёмочный тест и внедрение в ваши текущие инструменты.",
          cta: "Выбрать решение",
        },
        {
          title: "Спасение и миграция",
          price: "От $1,900 фикс.",
          description:
            "Стабилизируем падающего агента, мигрируем устаревающий API или укрепляем AI-MVP.",
          cta: "Открыть спасение",
        },
        {
          title: "Поддержка агента",
          price: "От $390/мес.",
          description:
            "Мониторинг, проверки качества, ограничения и постоянная ответственность за рабочую систему.",
          cta: "Открыть поддержку",
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
      title: "100× გაუმჯობესება,",
      bridge: "ან საქმეს",
      accent: "არ ვიწყებთ.",
      lead: "Production AI აგენტები სერვისული ბიზნესებისთვის. ერთი workflow, ერთი წერილობითი acceptance test - თუ ვერ გაიარა, არ იხდით.",
      primaryCta: "უფასო აუდიტის დაჯავშნა",
      secondaryCta: "იხილეთ ნამუშევრები",
      scroll: "გადაახვიეთ",
    },

    ctaGift:
      "30 წუთი მასთან, ვინც სისტემას აშენებს. მიდიხართ სამი პრიორიტეტული workflow-ით, პირველი pass condition-ით და ფიქსირებული ფასის დიაპაზონით.",

    manifesto: {
      label: "Acceptance protocol",
      state: "პირობები build-მდე ფიქსირდება",
      heading: "დაპირების ნდობას არ გთხოვთ. გაჩვენებთ, როგორ მიიღება სამუშაო.",
      body: "ტესტი build-მდე იწერება. Invoice ტესტს ელოდება.",
      decision: "ყველა წერილობითი პირობა შესრულდა?",
      passLabel: "Pass",
      passBody: "Workflow ეშვება. Invoice იხსნება.",
      failLabel: "Fail",
      failBody: "ვასწორებთ და ვიმეორებთ. გადასახდელი 0.",
      checksLabel: "რას ვზომავთ",
      checksNote: "ზუსტ მნიშვნელობებს თქვენთან ვათანხმებთ",
      columns: {
        criterion: "კრიტერიუმი",
        condition: "პირობა",
        evidence: "მტკიცებულება",
      },
      checks: [
        {
          criterion: "შედეგის ხარისხი",
          condition: "მიზანი build-მდე ფიქსირდება",
          evidence: "Control leads",
        },
        {
          criterion: "სიჩქარე და ფასი",
          condition: "ზღვრები scope-ში იწერება",
          evidence: "Run log",
        },
        {
          criterion: "მგრძნობიარე მოქმედებები",
          condition: "ადამიანის approval სავალდებულოა",
          evidence: "Tool-call trace",
        },
        {
          criterion: "გადახდა",
          condition: "ყველა წერილობითი gate უნდა გავიდეს",
          evidence: "Acceptance report",
        },
      ],
      statusLabel: "გადახდის წესი",
      status: "ჯერ acceptance. შემდეგ invoice.",
      statusValue: "წერილობით ფიქსირდება",
      invoiceLabel: "Invoice",
      dueLabel: "გადასახდელი",
      dueOpen: "ღიაა",
      dueClosed: "0",
    },

    deliveryPath: {
      label: "როგორ მიმდინარეობს ტესტი",
      steps: [
        {
          day: "რეალური ლიდები",
          body: "Representative sample, დაფიქსირებული კოდამდე.",
          stamp: "გაყინული sample",
          lines: [
            { item: "#14 inbound", state: "locked" },
            { item: "#27 missed call", state: "locked" },
            { item: "#31 renewal", state: "locked" },
          ],
        },
        {
          day: "Control run",
          body: "აგენტი მუშაობს. კლიენტი ამას არ ხედავს.",
          stamp: "Shadow log",
          lines: [
            { item: "Draft reply", state: "not sent" },
            { item: "CRM note", state: "not sent" },
            { item: "Refund ask", state: "held" },
          ],
        },
        {
          day: "ადამიანის შემოწმება",
          body: "თქვენ ადარებთ log-ს წერილობით პირობებს.",
          stamp: "თქვენი review",
          lines: [
            { item: "Quality vs target", state: "you confirm" },
            { item: "Speed and cost", state: "you confirm" },
            { item: "Sensitive action", state: "you decide" },
          ],
        },
      ],
    },

    alternatives: {
      heading: "სამი გზა, რომ აგენტი production-ში მოხვდეს.",
      options: [
        {
          title: "DIY no-code კონსტრუქტორით",
          body: "სწრაფი პროტოტიპი. მერე ჩუმი ჩავარდნები ღამის 2 საათზე, evals-ის გარეშე, ზედამხედველის გარეშე. უფასოა, სანამ კლიენტი არ დაგიჯდებათ.",
        },
        {
          title: "ML ინჟინრის დაქირავება",
          body: "$8-15k/თვე, თვეები პირველ workflow-მდე, და მაინც გჭირდებათ ვინმე, ვინც ოპერაციებს ითავებს.",
        },
        {
          title: "Dali",
          body: "ერთი workflow პროდაქშენში წერილობითი მიღების ტესტით. $1,900-დან ფიქსით. Human gates პირველი დღიდან. კოდი თქვენია.",
          ours: true,
        },
      ],
    },

    pricing: {
      label: "ფასები",
      parts: [
        { text: "დაიწყეთ", href: "/starter" },
        { text: " $199/თვე-დან. " },
        { text: "გამოიწერეთ", href: "/hire" },
        { text: " $300/თვე-დან - ვაშენებთ და ვმართავთ თქვენთვის. " },
        { text: "ააწყვეთ", href: "/solutions" },
        { text: " ერთი workflow $1,900 ფიქსით. " },
        { text: "გადაარჩინეთ", href: "/solutions/rescue-and-migration" },
        { text: " ჩავარდნილი სისტემა $1,900-დან. " },
        { text: "შეინარჩუნეთ ჯანსაღად", href: "/care" },
        {
          text: " $390/თვე-დან. ყველა ფიქს-პაკეტი ბარდება წერილობითი ტესტით - ვერ ჩააბარა, არ იხდით.",
        },
      ],
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
      label: "სერვისები",
      heading: "აირჩიეთ, როგორ დაიწყოთ Dali-სთან მუშაობა",
      body: "დაიწყეთ მზა აგენტით, შეუკვეთეთ ერთი workflow-ის ფიქსირებული build, გადაარჩინეთ არსებული სისტემა ან მოგვანდეთ production-ის უწყვეტი კონტროლი. თითოეულ ფორმატს აქვს მკაფიო scope, ფასი და შემდეგი ნაბიჯი.",
      contact: "workflow-ების რუკა - უფასოდ",
      cards: [
        {
          title: "Starter",
          price: "$199/თვე",
          description:
            "ერთი მზა აგენტი ვიწრო, განმეორებადი ამოცანისთვის. Setup შედის.",
          cta: "Starter-ის ნახვა",
        },
        {
          title: "Subscription",
          price: "$300/თვე-დან",
          description:
            "აგენტი, რომელსაც თქვენთვის ვაწყობთ, ვუშვებთ და მუდმივად ვაუმჯობესებთ.",
          cta: "გამოწერის ნახვა",
        },
        {
          title: "ფიქსირებული build",
          price: "$1,900-დან ფიქსად",
          description:
            "ერთი workflow, ერთი acceptance test და დანერგვა თქვენს არსებულ ინსტრუმენტებში.",
          cta: "გადაწყვეტის არჩევა",
        },
        {
          title: "Rescue & Migration",
          price: "$1,900-დან ფიქსად",
          description:
            "ვასტაბილურებთ ჩავარდნილ აგენტს, ვამიგრირებთ მოძველებულ API-ს ან ვამაგრებთ AI-MVP-ს.",
          cta: "Rescue-ის ნახვა",
        },
        {
          title: "Agent Care",
          price: "$390/თვე-დან",
          description:
            "მონიტორინგი, evals, guardrails და მუდმივი პასუხისმგებლობა production-ზე.",
          cta: "Care-ის ნახვა",
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
      title: "100× բարելավում,",
      bridge: "կամ մենք",
      accent: "չենք կառուցում։",
      lead: "Production AI գործակալներ ծառայությունների բիզնեսների համար։ Մեկ workflow, մեկ գրավոր acceptance test - չի անցել, չեք վճարում։",
      primaryCta: "Ամրագրել անվճար աուդիտ",
      secondaryCta: "Տեսնել աշխատանքները",
      scroll: "Ոլորեք",
    },

    ctaGift:
      "30 րոպե նրա հետ, ով կառուցում է համակարգը։ Դուրս եք գալիս երեք առաջնահերթ workflow-ով, առաջին pass condition-ով և ֆիքսված գնի միջակայքով։",

    manifesto: {
      label: "Acceptance protocol",
      state: "Պայմանները ամրագրվում են build-ից առաջ",
      heading: "Խոստմանը հավատալ չենք խնդրում։ Ցույց ենք տալիս՝ ինչպես է ընդունվելու աշխատանքը։",
      body: "Թեստը գրվում է build-ից առաջ։ Invoice-ը սպասում է արդյունքին։",
      decision: "Բոլոր գրավոր պայմաններն անցա՞ն։",
      passLabel: "Pass",
      passBody: "Workflow-ը գործարկվում է։ Invoice-ը բացվում է։",
      failLabel: "Fail",
      failBody: "Ուղղում և կրկնում ենք։ Վճարումը 0 է։",
      checksLabel: "Ինչ ենք չափում",
      checksNote: "Ճշգրիտ արժեքները համաձայնեցնում ենք ձեզ հետ",
      columns: {
        criterion: "Չափանիշ",
        condition: "Պայման",
        evidence: "Ապացույց",
      },
      checks: [
        {
          criterion: "Արդյունքի որակ",
          condition: "Նպատակը ֆիքսվում է build-ից առաջ",
          evidence: "Control leads",
        },
        {
          criterion: "Արագություն և արժեք",
          condition: "Սահմանները գրվում են scope-ում",
          evidence: "Run log",
        },
        {
          criterion: "Զգայուն գործողություններ",
          condition: "Մարդու հաստատումը պարտադիր է",
          evidence: "Tool-call trace",
        },
        {
          criterion: "Վճարում",
          condition: "Բոլոր գրավոր gate-երը պետք է անցնեն",
          evidence: "Acceptance report",
        },
      ],
      statusLabel: "Վճարման կանոն",
      status: "Սկզբում acceptance։ Հետո invoice։",
      statusValue: "Ամրագրվում է գրավոր",
      invoiceLabel: "Invoice",
      dueLabel: "Վճարում",
      dueOpen: "Բաց է",
      dueClosed: "0",
    },

    deliveryPath: {
      label: "Ինչպես է անցնում թեստը",
      steps: [
        {
          day: "Իրական լիդեր",
          body: "Representative sample, ֆիքսված կոդից առաջ։",
          stamp: "Սառեցված sample",
          lines: [
            { item: "#14 inbound", state: "locked" },
            { item: "#27 missed call", state: "locked" },
            { item: "#31 renewal", state: "locked" },
          ],
        },
        {
          day: "Control run",
          body: "Agent-ը աշխատում է։ Հաճախորդը չի տեսնում։",
          stamp: "Shadow log",
          lines: [
            { item: "Draft reply", state: "not sent" },
            { item: "CRM note", state: "not sent" },
            { item: "Refund ask", state: "held" },
          ],
        },
        {
          day: "Մարդու ստուգում",
          body: "Դուք համեմատում եք log-ը գրավոր պայմանների հետ։",
          stamp: "Ձեր review",
          lines: [
            { item: "Quality vs target", state: "you confirm" },
            { item: "Speed and cost", state: "you confirm" },
            { item: "Sensitive action", state: "you decide" },
          ],
        },
      ],
    },

    alternatives: {
      heading: "Երեք ճանապարհ՝ գործակալը production հասցնելու համար։",
      options: [
        {
          title: "DIY no-code կոնստրուկտորով",
          body: "Արագ նախատիպ։ Հետո լուռ խափանումներ գիշերվա ժամը 2-ին, առանց eval-ների, առանց հսկողի։ Անվճար է, մինչև հաճախորդ արժենա։",
        },
        {
          title: "Վարձել ML ինժեներ",
          body: "$8-15k/ամիս, ամիսներ մինչև առաջին workflow-ը, և միևնույն է պետք է մեկը, ով կվարի օպերացիաները։",
        },
        {
          title: "Dali",
          body: "Մեկ workflow production-ում՝ գրավոր ընդունման թեստով։ $1,900-ից ֆիքս։ Human gates առաջին օրվանից։ Կոդը ձերն է։",
          ours: true,
        },
      ],
    },

    pricing: {
      label: "Գներ",
      parts: [
        { text: "Սկսեք", href: "/starter" },
        { text: " $199/ամսից։ " },
        { text: "Բաժանորդագրվեք", href: "/hire" },
        { text: " $300/ամսից - կառուցում և վարում ենք ձեզ համար։ " },
        { text: "Կառուցեք", href: "/solutions" },
        { text: " մեկ workflow $1,900 ֆիքսով։ " },
        { text: "Փրկեք", href: "/solutions/rescue-and-migration" },
        { text: " ձախողվող համակարգը $1,900-ից։ " },
        { text: "Պահեք առողջ", href: "/care" },
        {
          text: " $390/ամսից։ Յուրաքանչյուր ֆիքս փաթեթ հանձնվում է գրավոր թեստով - թեստը չանցավ, չեք վճարում։",
        },
      ],
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
      label: "Ծառայություններ",
      heading: "Ընտրեք՝ ինչպես սկսել աշխատանքը Dali-ի հետ",
      body: "Սկսեք պատրաստի գործակալից, պատվիրեք մեկ workflow-ի fixed build, փրկեք գործող համակարգը կամ production-ի մշտական վերահսկումը վստահեք մեզ։ Յուրաքանչյուր ձևաչափ ունի հստակ scope, գին և հաջորդ քայլ։",
      contact: "Ստանալ workflow քարտեզը անվճար",
      cards: [
        {
          title: "Starter",
          price: "$199/ամիս",
          description:
            "Մեկ պատրաստի գործակալ նեղ, կրկնվող առաջադրանքի համար։ Setup-ը ներառված է։",
          cta: "Դիտել Starter-ը",
        },
        {
          title: "Subscription",
          price: "$300/ամսից",
          description:
            "Գործակալ, որը կառուցում, գործարկում և շարունակաբար բարելավում ենք ձեզ համար։",
          cta: "Դիտել բաժանորդագրությունը",
        },
        {
          title: "Ֆիքսված build",
          price: "$1,900-ից ֆիքս",
          description:
            "Մեկ workflow, մեկ acceptance test և ներդրում ձեր գործող գործիքներում։",
          cta: "Ընտրել լուծումը",
        },
        {
          title: "Rescue & Migration",
          price: "$1,900-ից ֆիքս",
          description:
            "Կայունացնում ենք խափանվող agent-ը, միգրացնում հնացող API-ն կամ ամրացնում AI-MVP-ն։",
          cta: "Դիտել Rescue-ը",
        },
        {
          title: "Agent Care",
          price: "$390/ամսից",
          description:
            "Մոնիթորինգ, evals, guardrails և շարունակական պատասխանատվություն production-ի համար։",
          cta: "Դիտել Care-ը",
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
