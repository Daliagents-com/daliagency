import {
  buildSolutionsCatalog,
  type FamilyShells,
} from "../buildFamilySolutions";
import type { PilotSourceContent, PilotSourceSlug } from "../solutionContent";
import type { LocalizedSolutionsBundle } from "./types";

const familyShells: FamilyShells = {
  conversation: {
    name: "Conversation Control System",
    summary:
      "One supervised conversation shell for inbound leads and existing client threads, with fixed lanes, CRM write-back, and human gates.",
    metadata: {
      title: "Conversation Control System | Dali",
      description:
        "Packaged product family for inbound lead response and client inbox control: approved replies, qualification or grounding, CRM updates, and human escalation.",
    },
    hero: {
      eyebrow: "Product family · two fixed lanes",
      title: "One conversation system. Two fixed lanes.",
      lead:
        "Dali packages a supervised AI conversation system for the inbox you already run. Start with inbound leads or existing client support, keep approvals visible, and expand only after one lane passes.",
      supportLine:
        "Best fit for service businesses and operators with real message volume who need speed without unsupervised agents.",
    },
    pilotLabel: "Family boundary before you pick a lane",
    fixedOutcome:
      "One product shell, one CRM or case-history path, one approval model, and one starting lane live with logs and escalation.",
    agentLabel: "Conversation control",
    cta: {
      publicLabel: "Start the conversation audit",
      publicBody:
        "Tell us whether the first pain is inbound leads or existing client threads. Dali will reply with the lane boundary, approval map, and scope outline.",
      intakeFields: [
        "Starting lane: inbound leads or client support",
        "Channels and approximate weekly volume",
        "CRM or case-history system that must stay accurate",
        "Cases that must always wait for human review",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with the starting lane (leads or client support), channels, and CRM. Dali will answer with the fixed scope boundary for that lane.",
    },
  },
  opsKnowledge: {
    name: "Ops & Knowledge System",
    summary:
      "One control loop for documents-to-actions and internal Q&A: approved sources, validated writes or cited answers, and an exception owner.",
    metadata: {
      title: "Ops & Knowledge System | Dali",
      description:
        "Packaged product family for operations document workflows and internal knowledge assistants with validation, citations, and human exceptions.",
    },
    hero: {
      eyebrow: "Product family · two fixed lanes",
      title: "Turn docs and tribal knowledge into one reliable ops loop.",
      lead:
        "Dali packages a supervised system that either turns recurring documents into validated actions or answers internal questions from an approved source set. Pick one lane first, then connect the loop.",
      supportLine:
        "Best fit for teams drowning in mail, PDFs, SOPs, and repeated internal questions.",
    },
    pilotLabel: "Family boundary before you pick a lane",
    fixedOutcome:
      "One source or input bundle, one destination or answer surface, one exception owner, and one starting lane live with an audit trail.",
    agentLabel: "Ops & knowledge",
    cta: {
      publicLabel: "Start the ops & knowledge audit",
      publicBody:
        "Tell us whether the first pain is documents-to-actions or internal Q&A. Dali will reply with the lane boundary and acceptance test.",
      intakeFields: [
        "Starting lane: documents-to-actions or internal knowledge",
        "Sample inputs or source set the team already trusts",
        "Destination system or answer surface",
        "Owner for exceptions and residual risk",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with the starting lane, sample inputs or docs, and destination system. Dali will answer with the fixed scope boundary for that lane.",
    },
  },
  rescue: {
    name: "Rescue & Migration",
    summary:
      "One recovery shell for AI systems under pressure: rescue an agent that fails in production, migrate off the Assistants API before shutdown, or harden a vibe-coded MVP - each as a fixed lane with its own acceptance bar.",
    metadata: {
      title: "Rescue & Migration | Dali",
      description:
        "Packaged product family for AI systems that need saving, not selling: agent rescue with evals and guardrails, Assistants API migration before the August 26, 2026 shutdown, and vibe-code MVP hardening.",
    },
    hero: {
      eyebrow: "Product family · three fixed lanes",
      title: "For the AI system you already have. Especially when it is failing.",
      lead:
        "Dali packages three recovery lanes: rescue an agent that stalls in production, migrate off the OpenAI Assistants API before the August 26, 2026 shutdown, or harden a vibe-coded MVP before it costs trust or money. Each lane is fixed scope with a written triage and its own acceptance test.",
      supportLine:
        "Best fit for teams that already shipped something with AI - an agent, an integration, an MVP - and need it to survive production, not a pitch to start over.",
    },
    pilotLabel: "Family boundary before you pick a lane",
    fixedOutcome:
      "One system under rescue, one fixed lane, one written triage or call mapping, one acceptance bar, and a handoff the team can own - not an open-ended retainer.",
    agentLabel: "Rescue & migration",
    boundary: {
      includes: [
        "Start with one lane: agent rescue, Assistants API migration, or vibe-code hardening",
        "1 system or integration in scope, whoever built it",
        "A written triage or call mapping before any fix",
        "An agreed acceptance bar and a rollback path",
      ],
      excludes: [
        "Open-ended rebuilds of everything at once",
        "New feature development disguised as rescue",
        "Ongoing retainer work before the first lane passes",
      ],
    },
    acceptanceTest:
      "Pick one lane. Each lane has its own pass condition: an agreed eval pass rate for agent rescue, a matching side-by-side run with zero-downtime cutover for the migration, closed high-severity findings for vibe-code rescue. The family passes when the chosen lane does.",
    cta: {
      publicLabel: "Start the rescue audit",
      publicBody:
        "Tell us which system is under pressure: a failing agent, an Assistants API integration, or a vibe-coded MVP. Dali will reply with the lane boundary, the triage plan, and the acceptance bar.",
      intakeFields: [
        "Starting lane: agent rescue, Assistants API migration, or vibe-code hardening",
        "Who built the system and what stack it runs on",
        "Where it fails or what deadline it faces",
        "Owner who can approve scope and accept residual risk",
      ],
      upworkLabel: "See what to send in Upwork",
      upworkBody:
        "Reply in Upwork with the starting lane, the stack, and where it fails or what deadline applies. Dali will answer with the fixed scope boundary for that lane.",
    },
  },
};


export const armenianSolutionsBundle = {
  overview: {
    metadata: {
      title: "Dali AI լուծումների լուծումներ",
      description:
        "Dali-ը քարտեզագրում է մեկ թանկարժեք աշխատանքային հոսք, կառուցում է արտադրական AI գործակալ արդեն օգտագործվող գործիքների ներսում և գործարկում այն մարդու վերահսկմամբ, մոնիթորինգով և լիարժեք սեփականությամբ։",
    },
    hero: {
      eyebrow: "AI գործակալներ իրական օպերացիաների համար",
      title: "Կրկնվող աշխատանքը դրեք ավտոլուծումի վրա։",
      lead:
        "Dali-ը քարտեզագրում է մեկ բարձրարժեք աշխատանքային հոսք, կառուցում է արտադրական AI գործակալ հաճախորդի արդեն օգտագործվող գործիքների ներսում և գործարկում այն մարդու վերահսկմամբ, մոնիթորինգով և լիարժեք սեփականությամբ։",
      primaryCta: "Սկսել աշխատանքային հոսքի աուդիտը",
      secondaryCta: "Տեսնել փաթեթավորված լուծումները",
      supportLine: "Մեկ աշխատանքային հոսք։ Մեկ ընդունման թեստ։ Առանց պլատֆորմի միգրացիայի։",
    },
    diagram: {
      ariaLabel: "Աշխատանքային հոսքի դիագրամ",
      label: "Գոյություն ունեցող մուտքեր",
      inputs: ["Նամակների արկղ", "CRM", "Աղյուսակ"],
      agent: "Dali գործակալ",
      reviewTitle: "Մարդու վերանայում",
      reviewBody: "Հաստատումներ, սահմանային դեպքեր, վերջնական հաստատում",
      actionTitle: "Գործողություն աշխատանքի մեջ",
      actionBody: "Պատասխաններ, թարմացումներ, առաջադրանքներ, փոխանցված follow-up-ներ",
    },
    solutions: {
      kicker: "Լուծումներ",
      title: "Օպերացիոն ծանրաբեռնվածությունը փոխարինեք մեկ խիստ սահմանված համակարգով։",
      beforeLabel: "Մինչև",
      before: [
        "Լիդերը սպասում են ընդհանուր նամակների արկղերում։",
        "Օպերացիոն աշխատանքը կորչում է չատերի, փաստաթղթերի և աղյուսակների միջև։",
        "Թիմը նորից ու նորից կրկնում է նույն ընթերցումը, փոխանցումը և թարմացումը։",
      ],
      afterLabel: "Հետո",
      after: [
        "Գործակալը ակնթարթորեն կատարում է առաջին անցման աշխատանքը։",
        "Մարդիկ վերանայում են միայն այն, ինչ իսկապես դատողություն է պահանջում։",
        "Աշխատանքային հոսքը դառնում է տեսանելի, չափելի և պատասխանատուի կողմից տիրապետվող։",
      ],
      packagedPilot: "Փաթեթավորված լուծում",
      researchLane: "Հետազոտական ուղղություն",
      viewPilot: "Տեսնել լուծումը",
      viewResearch: "Տեսնել հետազոտական ուղղությունը",
      responseLane: {
        title: "Conversation Control",
        summary:
          "One conversation shell for inbound leads and existing client threads: draft, ground, gate sensitive actions, and keep CRM moving.",
        eyebrow: "Product family",
        pilotLabel: "Fixed lanes",
      },
      opsKnowledgeLane: {
        title: "Ops & Knowledge",
        summary:
          "One control loop for documents-to-actions and internal Q&A: approved sources, validated writes or cited answers, exception owner.",
        eyebrow: "Product family",
        pilotLabel: "Fixed lanes",
      },
      cards: {
        "conversation-control": {
          title: "Conversation Control System",
          summary:
            "Supervised inbox system for inbound leads and client support, with fixed lanes and human gates.",
          tasks: [
            "Pick inbound leads or existing client support as the first lane",
            "Draft or send approved replies with CRM write-back",
            "Stop pricing, refunds, and edge cases for human review",
          ],
        },
        "ops-knowledge": {
          title: "Ops & Knowledge System",
          summary:
            "Turn recurring documents into actions or answer internal questions from approved sources.",
          tasks: [
            "Pick documents-to-actions or internal Q&A as the first lane",
            "Validate writes or cite sources before the team trusts the output",
            "Route exceptions to a named human owner",
          ],
        },
        "voice-agents": {
          title: "Voice Design-Partner",
          summary:
            "Prove one repeatable call flow before widening the system.",
          tasks: [
            "Qualify one routine inbound call type",
            "Book the next step and write a structured CRM summary",
            "Transfer hard cases to a person without losing context",
          ],
        },
        "rescue-and-migration": {
          title: "Rescue & Migration",
          summary:
            "Three fixed lanes for AI systems under pressure: agent rescue, Assistants API migration, and vibe-code hardening.",
          tasks: [
            "Rescue an agent that fails in production with evals and guardrails",
            "Migrate off the Assistants API before the August 26, 2026 shutdown",
            "Harden a vibe-coded MVP with gates, a stop-switch, and a handoff",
          ],
        },
      },
      laneCards: {
        "lead-response": {
          title: "Inbound leads lane",
          summary:
            "Reply faster, qualify earlier, and keep every inbound lead moving.",
          tasks: [
            "Triage contact forms, email, WhatsApp, or Telegram inquiries",
            "Draft personalized first replies with qualification questions",
            "Update CRM stages, owners, and follow-up tasks automatically",
          ],
        },
        "client-inbox": {
          title: "Client support lane",
          summary:
            "Answer routine customer threads with approved context, CRM history, and a visible handoff.",
          tasks: [
            "Ground replies in approved policies, files, and past cases",
            "Log the conversation and next action in the existing CRM",
            "Stop sensitive requests, media, or unsupported answers for review",
          ],
        },
        "operations-docs": {
          title: "Documents-to-actions lane",
          summary:
            "Handle routine back-office work before it turns into team drag.",
          tasks: [
            "Turn inbox requests into tracker updates and routed tasks",
            "Reconcile spreadsheets, status fields, and recurring exceptions",
            "Prepare approvals, summaries, and handoff notes for staff",
          ],
        },
        "knowledge-assistant": {
          title: "Internal knowledge lane",
          summary:
            "Give the team a reliable first layer for repetitive questions.",
          tasks: [
            "Search SOPs, docs, and past cases before suggesting next steps",
            "Draft support answers and escalation context for human reviewers",
            "Keep internal knowledge organized as products and policies change",
          ],
        },
      },
    },
    process: {
      kicker: "Գործընթաց",
      title: "Երեք քայլ խառնաշփոթ աշխատանքային հոսքից դեպի աշխատանքի մեջ գտնվող համակարգ։",
      steps: [
        {
          title: "Աուդիտ",
          body:
            "Մենք քարտեզագրում ենք մեկ աշխատանքային հոսքը սկզբից մինչև վերջ, չափում ենք որտեղ է ժամանակը կորում և սահմանում ենք այն ճշգրիտ հաստատման կետերը, որոնք պետք է մնան մարդու մոտ։",
        },
        {
          title: "Կառուցում և վերախաղարկում",
          body:
            "Մենք կառուցում ենք գործակալը արդեն օգտագործվող ստեքի ներսում, հետո վերախաղարկում ենք իրական դեպքերը այնքան ժամանակ, մինչև արդյունքները դառնան հուսալի, իսկ սահմանային դեպքերը` տեսանելի։",
        },
        {
          title: "Գործարկում և բարելավում",
          body:
            "Աշխատանքային հոսքը գնում է production` մոնիթորինգով, բացառությունների մշակումով և սեղմ feedback loop-ով, որպեսզի համակարգը գործարկումից հետո շարունակի սրվել։",
        },
      ],
    },
    proof: {
      kicker: "Ապացույց",
      title: "Կառուցված է թիմի կողմից, որը արդեն իրական համակարգեր է թողարկում։",
      viewProject: "Տեսնել նախագիծը",
      cards: [
        {
          title: "agents.ge",
          body:
            "Ապացույց, որ Dali-ը կարող է սահմանել, նախագծել և առաքել AI-native արտադրանք` գաղափարից մինչև production engineering։",
        },
        {
          title: "Stay & Work Georgia",
          body:
            "Կառուցվածքային product execution-ի ապացույց ծառայողական բիզնեսի համար, որտեղ օպերացիաները բարդ են, իսկ օգտատիրոջ ճանապարհը` վստահության նկատմամբ զգայուն։",
        },
        {
          title: "Delivery Setup",
          body:
            "Համակարգային մտածողության ապացույց operator-heavy բիզնեսների համար, որտեղ գործընթացի հստակությունն ու հուսալի փոխանցումները կարևոր են ամեն օր։",
        },
      ],
    },
    trust: {
      kicker: "Վստահություն ըստ նախագծման",
      title: "Գործնական սահմանափակումները առաջարկի մաս են։",
      points: [
        "Աշխատում է այն գործիքների ներսում, որոնք թիմը արդեն օգտագործում է",
        "Մարդու հաստատումը մնում է ցիկլի մեջ այնտեղ, որտեղ ռիսկը իրական է",
        "Մոնիթորինգը և բացառությունների մշակումը գործարկման մաս են, ոչ թե ուշացած միտք",
        "Հաճախորդին է պատկանում կոդը, տվյալները, պրոմփթերը և օպերացիոն IP-ն",
      ],
    },
    about: {
      kicker: "Մեր մասին",
      title: "Ինժեներիան և օպերացիաները նույն սենյակում։",
      founders: [
        {
          name: "David",
          role: "Ինժեներիա",
          alt: "David, Dali-ի ինժեներական ղեկավարը",
          body:
            "Նախագծում է աշխատանքային հոսքի տրամաբանությունը, ինտեգրման սահմանները և production գործակալի վարքագիծը, որպեսզի ավտոմատացումը մնա հուսալի իրական օպերացիոն ծանրաբեռնվածության պայմաններում։",
        },
        {
          name: "Liana",
          role: "Օպերացիաներ",
          alt: "Liana, Dali-ի օպերացիոն ղեկավարը",
          body:
            "Ձևավորում է գործընթացի հստակությունը, բացառությունների մշակումը և գործարկման կարգապահությունը, որպեսզի համակարգը համապատասխանեցվի թիմի իրական ամենօրյա աշխատանքին։",
        },
      ],
    },
    faq: {
      kicker: "Հաճախ տրվող հարցեր",
      title: "Հստակ սահմաններ, նախքան որևէ բան կկառուցվի։",
      items: [
        {
          question: "Սա համապատասխանո՞ւմ է ցանկացած ընկերության։",
          answer:
            "Ոչ։ Լավագույն համապատասխանությունը այն թիմն է, որն ունի մեկ կրկնվող աշխատանքային հոսք, որը արդեն բավական հաճախ է տեղի ունենում, որպեսզի արդարացնի իրական օպերացիոն մաքրումն ու ավտոմատացումը։",
        },
        {
          question: "Իրականում ի՞նչ է ներառում 30-օրյա շրջանակը։",
          answer:
            "Մեկ կենտրոնացված աշխատանքային հոսք։ Մենք ընտրում ենք ամենաբարձր շփման ուղին, կառուցում ենք դրա շուրջ օպերացիոն տրամաբանությունը և այդ համակարգը բերում ենք production, նախքան ավելի լայն որևէ բան դիտարկելը։",
        },
        {
          question: "Պե՞տք է փոխենք մեր գործիքները կամ միգրացնենք պլատֆորմները։",
          answer:
            "Սովորաբար ոչ։ Լռելյայն մոտեցումն այն է, որ ինտեգրվենք արդեն օգտագործվող նամակների արկղերին, CRM-երին, աղյուսակներին, փաստաթղթերին և հաղորդակցման համակարգերին։",
        },
        {
          question: "Ինչպե՞ս եք աշխատում տվյալների և անվտանգության հետ։",
          answer:
            "Մենք նվազեցնում ենք հասանելիությունը, սահմանում ենք հաստատման սահմաններ և պահում ենք աշխատանքային հոսքը դիտարկելի։ Զգայուն գործողությունները կարելի է ուղարկել հստակ մարդկային վերանայման, ոչ թե լիարժեք ինքնավարության։",
        },
        {
          question: "Արդյո՞ք ներքին AI թիմ է պետք սա վարելու համար։",
          answer:
            "Ոչ։ Նպատակն այն է, որ մեկ աշխատանքային հոսքը կիրառելի լինի արդեն այն թիմի համար, որն իրենն է համարում այն, առանց առանձին ներքին AI ֆունկցիայի, որը պետք է պահի այն կենդանի։",
        },
        {
          question: "Ի՞նչ է տեղի ունենում գործարկումից հետո։",
          answer:
            "Dali-ը կարող է մնալ ներգրավված մոնիթորինգի և իտերացիայի համար, կամ փոխանցել փաստաթղթավորումն ու սեփականությունը, որպեսզի հաճախորդի թիմը կարողանա ինքնուրույն կառավարել աշխատանքային հոսքը։",
        },
      ],
    },
    contact: {
      kicker: "Կապ",
      title: "Սկսեք այն աշխատանքային հոսքից, որն այսօր ամենաշատ ուշադրությունն է խլում։",
      body:
        "Dali-ը աուդիտ է անում աշխատանքային հոսքը, առաջարկում է հաստատման մոդելը և ցույց է տալիս, թե ինչն է իրատեսորեն հնարավոր գործարկել կենտրոնացված 30-օրյա ներգրավվածության ընթացքում։",
      cta: "Սկսել աշխատանքային հոսքի աուդիտը",
    },
  },
  details: buildSolutionsCatalog({
    "lead-response": {
      slug: "lead-response",
      name: "Լիդերի արձագանքման լուծում",
      summary:
        "Փաթեթավորված լուծում այն թիմերի համար, որոնք թափ են կորցնում հարցումից, որակավորումից և ամրագրված հաջորդ քայլից առաջ։",
      accent: "#1E3A8A",
      accentSoft: "#E9EDFF",
      tint: "#fff5ef",
      metadata: {
        title: "Լիդերի արձագանքման լուծում | Dali",
        description:
          "Փաթեթավորված լուծում մուտքային լիդերը որակավորելու, հաստատված առաջին պատասխաններ ուղարկելու և CRM follow-up-ը շարժման մեջ պահելու համար, առանց ձևացնելու, թե վաճառքը կարելի է ամբողջությամբ ավտոմատացնել։",
      },
      hero: {
        eyebrow: "Փաթեթավորված լուծում",
        title: "Դադարեցրեք որակավորված լիդերի կորուստը առաջին հաղորդագրության և CRM-ի միջև։",
        lead:
          "Dali-ը փաթեթավորում է մեկ մուտքային աշխատանքային հոսք վերահսկվող AI համակարգի մեջ, որը ուղարկում է առաջին պատասխանը, որակավորում է ձեր կանոններով, թարմացնում է pipeline-ը, ամրագրում է հաջորդ քայլը կամ follow-up-ը և զգայուն դեպքերը ամբողջական լոգերով փոխանցում է մարդուն։",
        supportLine:
          "Լավագույնս համապատասխանում է ծառայողական բիզնեսներին, գործակալություններին և օպերատորներին, որոնք ունեն իրական մուտքային հոսք, բայց առաջին արձագանքի անհետևողականություն։",
      },
      workflow: {
        label: "Աշխատանքային հոսքի դիագրամ",
        intake: ["Ֆորմաներ", "Email", "WhatsApp կամ Telegram"],
        agentLabel: "Լիդերի արձագանքման լուծում",
        review: ["Անհատական գնագոյացում", "Enterprise սահմանային դեպքեր", "Ցածր վստահության լիդեր"],
        outcomes: ["Առաջին պատասխան", "Որակավորման նշումներ", "CRM թարմացում կամ ամրագրված զանգ"],
      },
      contrast: {
        painTitle: "Ինչն է փոխարինում",
        painPoints: [
          "Ընդհանուր նամակների արկղեր, որտեղ տաք լիդերը մնում են մինչև ինչ-որ մեկը նկատի դրանք։",
          "Հիմնադիրներ, որոնք նորից են գրում նույն առաջին պատասխանը և նույն որակավորման հարցերը։",
          "CRM փուլեր, որոնք հետ են մնում իրականությունից, այնպես որ follow-up-ը կառավարվելու փոխարեն գուշակվում է։",
        ],
        outcomeTitle: "Ինչն է ստեղծում",
        outcomePoints: [
          "Յուրաքանչյուր մուտքային լիդ ստանում է անմիջական առաջին արձագանք հաստատված տոնով։",
          "Որակավորումը կատարվում է մեկ հետևողական playbook-ով, ոչ թե թիմի հիշողությամբ։",
          "Մարդիկ միանում են միայն գնագոյացման, նրբությունների կամ բարձր stakes ունեցող գործարքների պահին։",
        ],
      },
      pilot: {
        label: "Scope-ի ճշգրիտ ֆիքսված սահմանը",
        fixedOutcome:
          "Մեկ կամ երկու մուտքային ալիք, մեկ CRM, մեկ որակավորման քաղաքականություն, մեկ ամրագրման կամ follow-up ուղի և մեկ մարդկային էսկալացիայի հերթ, production-ում deduplication-ով, do-not-contact տրամաբանությամբ և լոգերով։",
        includes: [
          "1 լիդի աղբյուրների խումբ, օրինակ կայքի ֆորմա գումարած ընդհանուր նամակների արկղ",
          "1 հաստատված առաջին պատասխանի playbook անգլերենով",
          "1 CRM կամ օրացույցային գործողության ուղի",
          "Աշխատանքային ժամերի ծածկույթ տեսանելի էսկալացիայի կանոններով",
        ],
        excludes: [
          "Աութբաունդ prospecting կամ cold outreach",
          "Անհատական առաջարկների գրություն",
          "Ինքնավար գնագոյացում, զեղչեր կամ պայմանագրային պարտավորություններ",
        ],
      },
      integrations: {
        label: "Ինտեգրացիաներ և օրինակներ",
        intro:
          "Այս լուծումի համար բնորոշ ստեք համադրությունները ներառում են այն գործիքները, որոնք արդեն օգտագործում է վաճառքի կամ founder թիմը։",
        items: [
          "HubSpot, Pipedrive կամ կառուցվածքային Google Sheet",
          "Gmail, Outlook, WhatsApp կամ Telegram նամակների արկղեր",
          "Calendly կամ ուղղակի ամրագրման փոխանցում",
          "Typeform կամ կայքի կոնտակտային ֆորմայի մուտք",
        ],
      },
      guardrails: {
        label: "Սահմանափակումներ և հաստատում",
        intro:
          "Համակարգը նախագծված է նախ օգտակար լինելու, հետո միայն համարձակ գործելու համար։ Զգայուն պահերը մնում են մարդու մոտ։",
        items: [
          "Գնագոյացման, ժամկետների կամ աշխատանքի ծավալի վերաբերյալ ոչ մի խոստում առանց հստակ հաստատման։",
          "Յուրաքանչյուր ելքային հաղորդագրություն լոգավորվում է այն աղբյուրային կոնտեքստով, որով կազմվել է։",
          "Ցածր վստահության լիդերը գուշակությամբ չանցնելու փոխարեն ուղարկվում են մարդուն։",
          "Էսկալացիայի կանոնները տեսանելի են և rehearsal-ի ընթացքում կարող են ճշգրտվել։",
        ],
      },
      validation: {
        acceptanceTest:
          "Վերախաղարկեք 20 ներկայացուցչական մուտքային խոսակցություն։ Անցնում է միայն այն դեպքում, եթե յուրաքանչյուր իրադարձություն լոգավորված է, կրկնակի CRM գրառումները մնում են 0, պահանջվող CRM դաշտերը առնվազն 90% լրացված են, և յուրաքանչյուր ցածր վստահության կամ զգայուն դեպք կանգ է առնում մարդկային վերանայման համար։",
        measures: [
          "Ժամանակ մինչև առաջին պատասխան",
          "Ճիշտ որակավորման և փոխանցման տոկոս",
          "CRM գրառման հաջողություն և կրկնությունների տոկոս",
          "Որակավորվածից մինչև ամրագրված փոխարկում",
          "Ժամանակացույցով ավարտված follow-up-ներ",
          "Մարդկային վերանայման տոկոս ըստ պատճառի",
        ],
        commercialModel:
          "Աուդիտը սահմանում է շրջանակը։ Եթե այն կենսունակ է, Dali-ը ուղարկում է ֆիքսված շրջանակով, ֆիքսված գնով լուծում milestone։ Կառուցումը սկսվում է միայն հաստատումից հետո, և ցանկացած ավելի լայն rollout առանձին որոշում է։",
      },
      delivery: [
        {
          title: "Քարտեզագրել արձագանքման ուղին",
          body:
            "Մենք վերանայում ենք իրական նամակների հոսքը, որակավորման հարցերը և CRM փոխանցումը, որպեսզի լուծումը խարսխված լինի այն բանի վրա, թե այսօր ինչպես են լիդերը գալիս, ոչ թե հիպոթետիկ funnel-ի վրա։",
        },
        {
          title: "Վերախաղարկել իրական օրինակների վրա",
          body:
            "Մենք վերախաղարկում ենք վերջին մուտքային թելերը, մշակում ենք որոշման կանոնները և ֆիքսում ենք ճշգրիտ հաստատման կետերը, նախքան որևէ բան live կպատասխանի։",
        },
        {
          title: "Գործարկել փաթեթավորված լուծումը",
          body:
            "Փաթեթը գործարկվում է համաձայնեցված հերթի վրա` մոնիթորինգով, բացառությունների մշակմամբ և նեղ շրջանակով, որի տիրապետումը գործնական է։",
        },
      ],
      fit: {
        fit: [
          "Դուք արդեն ունեք բավական մուտքային հոսք, որպեսզի գործընթացային կարգապահությունը արդարացվի։",
          "Առաջին պատասխանը հետևում է օրինաչափությունների, նույնիսկ եթե փակող զանգը մնում է մարդկային։",
          "Ձեր կողմից կա մեկը, ով կարող է արագ հաստատել որակավորման playbook-ը։",
        ],
        notFit: [
          "Յուրաքանչյուր լիդ պահանջում է անհատական շրջանակի սահմանում, նախքան որևէ օգտակար պատասխան գոյություն կունենա։",
          "Ձեր թիմը ուզում է լիովին ինքնավար closer, ոչ թե հաստատված first-pass համակարգ։",
          "Մուտքային ծավալը չափազանց փոքր է օգտակար rehearsal տվյալներ ստեղծելու համար։",
        ],
      },
      faqs: [
        {
          question: "Սա կարո՞ղ է ինքնուրույն փակել գործարքներ։",
          answer:
            "Ոչ։ Այս լուծումը արագ intake-ի, հետևողական որակավորման և ավելի մաքուր follow-up-ի համար է։ Փակման դատողությունը մնում է մարդկային վաճառողի մոտ։",
        },
        {
          question: "Կարո՞ղ է պատասխաններն ուղարկել ավտոմատ։",
          answer:
            "Այո, եթե հաղորդագրության դասը ցածր ռիսկային է և հաստատման սահմանը հստակ է։ Հակառակ դեպքում այն պատրաստում և ուղարկում է վերանայման։",
        },
        {
          question: "Ի՞նչ կլինի, եթե մեր լիդերի հոսքը շաբաթ առ շաբաթ շատ փոխվի։",
          answer:
            "Դա աշխատելի է, եթե first-pass հարցերը դեռ կայուն են։ Եթե յուրաքանչյուր հարցում փոխում է կանոնները, լուծումի շրջանակը պետք է նեղացվի նախքան գործարկումը։",
        },
      ],
      cta: {
        publicLabel: "Սկսել լիդերի արձագանքման աուդիտը",
        publicBody:
          "Եթե սա համընկնում է այն աշխատանքային հոսքի հետ, որը ցանկանում եք առաջինը շտկել, ուղարկեք intake մանրամասները, և Dali-ը կպատասխանի լուծումի ուրվագծով, հաստատումների քարտեզով և սահմանային ենթադրություններով։",
        intakeFields: [
          "Լիդերի աղբյուրները և մոտավոր շաբաթական ծավալը",
          "Ընթացիկ առաջին արձագանքի և որակավորման ուղին",
          "CRM-ը կամ օրացույցը, որը պետք է ստանա արդյունքը",
          "Դեպքեր, որոնք միշտ պետք է սպասեն մարդկային վերանայմանը",
        ],
        upworkLabel: "Տեսնել ինչ ուղարկել Upwork-ում",
        upworkBody:
          "Պատասխանեք Upwork-ում ձեր լիդերի աղբյուրներով, ընթացիկ արձագանքման ուղով և CRM-ով։ Dali-ը կպատասխանի այս ճշգրիտ աշխատանքային հոսքի ֆիքսված լուծում սահմանով։",
      },
    },
    "client-inbox": {
      slug: "client-inbox",
      name: "Հաճախորդների նամակների լուծում",
      summary:
        "Փաթեթավորված լուծում այն թիմերի համար, որոնց պետք են ավելի արագ, փաստարկված հաճախորդական պատասխաններ` առանց գործակալին զգայուն գործողություններ իմպրովիզացնելու իրավասություն տալու։",
      accent: "#1E3A8A",
      accentSoft: "#E9EDFF",
      tint: "#fff6f0",
      metadata: {
        title: "Հաճախորդների նամակների լուծում | Dali",
        description:
          "Փաթեթավորված լուծում մեկ հաճախորդական չատի կամ email աշխատանքային հոսքի համար` փաստարկված պատասխաններով, CRM պատմությամբ, հաստատված գործողություններով և մարդկային էսկալացիայով։",
      },
      hero: {
        eyebrow: "Փաթեթավորված լուծում",
        title: "Ընդհանուր նամակների արկղը դարձրեք մեկ վերահսկվող արձագանքման ուղի։",
        lead:
          "Dali-ը նախագծում է մեկ ֆիքսված շրջանակով հաճախորդական նամակների աշխատանքային հոսք, որը կարդում է հաստատված կոնտեքստը, պատրաստում կամ ուղարկում է սովորական պատասխաններ, խոսակցությունը գրանցում է CRM-ում և ֆայլերը, մեդիան կամ զգայուն գործողությունները կանգնեցնում է մարդկային վերանայման համար։",
        supportLine:
          "Լավագույնս համապատասխանում է աջակցության և օպերացիոն թիմերին, որոնք նույն պատասխաններն ու գործողությունները կրկնում են չատերում, email-ում, բաց գծերում կամ CRM հերթերում։",
      },
      workflow: {
        label: "Աշխատանքային հոսքի դիագրամ",
        intake: ["Չատ կամ email", "Ֆայլեր և մեդիա", "CRM կոնտեքստ"],
        agentLabel: "Հաճախորդների նամակների լուծում",
        review: ["Զգայուն գործողություններ", "Չաջակցվող պատասխաններ", "Քաղաքականության բացառություններ"],
        outcomes: ["Փաստարկված պատասխան", "CRM պատմություն", "Փոխանցում մարդուն"],
      },
      contrast: {
        painTitle: "Ինչն է փոխարինում",
        painPoints: [
          "Հաճախորդական թելեր, որոնք սպասում են, քանի որ կոնտեքստը ցրված է չատի, ֆայլերի և CRM-ի միջև։",
          "Գործակալներ, որոնք վերագրում են սովորական պատասխանները, մինչ զգայուն գործողությունները հետևում են անհետևողական կանոնների։",
          "Խոսակցության պատմություն և հաջորդ քայլեր, որոնք անհետանում են, երբ հարցումը փոխում է ալիքը կամ պատասխանատուին։",
        ],
        outcomeTitle: "Ինչն է ստեղծում",
        outcomePoints: [
          "Սովորական պատասխանները օգտագործում են մեկ հաստատված աղբյուրների հավաքածու, տոն և գործողության քաղաքականություն։",
          "Ֆայլերը, մեդիան և անորոշ հարցումները կանգ են առնում տեսանելի հաստատման սահմանին։",
          "Յուրաքանչյուր պատասխան, գործողություն և էսկալացիա գրանցվում է համաձայնեցված դեպքի պատմության մեջ։",
        ],
      },
      pilot: {
        label: "Scope-ի ճշգրիտ ֆիքսված սահմանը",
        fixedOutcome:
          "Մեկ հաճախորդական ալիք, մեկ պատասխանների և գործողությունների քաղաքականություն, մեկ CRM պատմության ուղի, production-ում մարդկային էսկալացիայի հերթով։",
        includes: [
          "1 հաճախորդական ալիք կամ իրար հետ սերտ կապ ունեցող ալիքների զույգ",
          "1 հաստատված պատասխանների աղբյուրների հավաքածու և պատասխանելու տոն",
          "1 CRM կամ դեպքերի պատմության թիրախ",
          "Մարդկային վերանայում զգայուն գործողությունների, չաջակցվող պատասխանների, ֆայլերի կամ մեդիայի համար",
        ],
        excludes: [
          "Հաճախորդների աջակցության ամբողջ թիմի փոխարինում",
          "Բաց-ended պատասխաններ հաստատված աղբյուրներից դուրս",
          "Ինքնավար վերադարձներ, խոստումներ, հաշվի փոփոխություններ կամ անշրջելի գործողություններ",
        ],
      },
      integrations: {
        label: "Ինտեգրացիաներ և օրինակներ",
        intro:
          "Փաթեթը կապում է այն ալիքը, որտեղ հաճախորդի հարցումները գալիս են, այն կոնտեքստի և պատմության հետ, որին թիմը արդեն վստահում է։",
        items: [
          "Email, կայքի չատ, CRM open lines, WhatsApp կամ Telegram",
          "HubSpot, Bitrix24, Kommo, GoHighLevel կամ այլ դեպքերի պատմության համակարգ",
          "Հաստատված օգնության հոդվածներ, քաղաքականության նշումներ, ֆայլեր և նախկինում լուծված թելեր",
          "Մարդկային հաստատում մեդիայի, հաշվի փոփոխությունների, կոմերցիոն խոստումների կամ անորոշ հարցումների համար",
        ],
      },
      guardrails: {
        label: "Սահմանափակումներ և հաստատում",
        intro:
          "Աշխատանքային հոսքը օգտակար է միայն այն ժամանակ, երբ ակնհայտ է, թե օգնականը ինչի կարող է պատասխանել, ինչ կարող է անել և որտեղ մարդը պետք է վերցնի վերահսկումը։",
        items: [
          "Յուրաքանչյուր պատասխան հիմնված է դեպքին կցված հաստատված կոնտեքստի վրա։",
          "Գնագոյացման, վերադարձի, հաշվի կամ քաղաքականության ոչ մի պարտավորություն չի տրվում համաձայնեցված կանոններից դուրս։",
          "Չաջակցվող կամ հակասական հարցումները փոխանցվում են անունով նշված մարդկային պատասխանատուին։",
          "Պատասխանները, գործիքային գործողությունները, հաստատումները և խափանումները մնում են տեսանելի audit log-ում։",
        ],
      },
      validation: {
        acceptanceTest:
          "Վերախաղարկեք 20 ներկայացուցչական հաճախորդական թելեր, ներառյալ ֆայլերն ու սահմանային դեպքերը։ Անցնում է միայն այն դեպքում, եթե յուրաքանչյուր իրադարձություն լոգավորված է, չարտոնված գործողությունները մնում են 0, փոխանցումը ճիշտ է առնվազն հաստատված դեպքերի 90%-ում, և աղբյուրային աջակցություն չունեցող յուրաքանչյուր պատասխան կանգ է առնում մարդկային վերանայման համար։",
        measures: [
          "Ժամանակ մինչև առաջին օգտակար պատասխան",
          "Պատասխանների ընդունման տոկոս վերանայված թելերում",
          "CRM կամ դեպքի պատմության գրառման հաջողություն",
          "Ճիշտ էսկալացիայի և չարտոնված գործողությունների տոկոս",
        ],
        commercialModel:
          "Աուդիտը ֆիքսում է մեկ ալիք, աղբյուրների հավաքածու, գործողությունների քաղաքականություն և CRM ուղի։ Dali-ը հետո ներկայացնում է ֆիքսված շրջանակով, ֆիքսված գնով լուծում։ Կառուցումը սկսվում է միայն հաստատումից հետո։",
      },
      delivery: [
        {
          title: "Քարտեզագրել մեկ խոսակցական ուղի",
          body:
            "Մենք ընտրում ենք կրկնվող հարցումների դասերը, հաստատված աղբյուրային նյութերը, պատասխանելու տոնը, թույլատրված գործողությունները և այն ճշգրիտ պահերը, երբ մարդ է պահանջվում։",
        },
        {
          title: "Վերախաղարկել իրական հաճախորդական թելեր",
          body:
            "Մենք ստուգում ենք սովորական հարցերը, ֆայլերը, մեդիան, բացակայող կոնտեքստը և զգայուն դեպքերը այնքան, մինչև փոխանցման և հաստատման վարքագիծը դառնա հետևողական։",
        },
        {
          title: "Գործարկել տեսանելի պատասխանատվությամբ",
          body:
            "Ընտրված հերթը գնում է production` CRM պատմությամբ, մոնիթորինգով և անունով սահմանված փոխանցման ուղով ամեն ինչի համար, ինչը լուծումի սահմանից դուրս է։",
        },
      ],
      fit: {
        fit: [
          "Նույն հաճախորդական հարցերն ու գործողությունները բավական հաճախ են կրկնվում rehearsal-ի համար։",
          "Թիմը կարող է նշել այն աղբյուրային նյութերն ու գործողությունները, որոնք համարվում են հաստատված։",
          "Կա մարդկային պատասխանատու չաջակցվող կամ զգայուն հարցումների համար։",
        ],
        notFit: [
          "Յուրաքանչյուր խոսակցություն պահանջում է անհատական կոմերցիոն կամ իրավական դատողություն։",
          "Աղբյուրային նյութերը հասանելի չեն կամ չափազանց հակասական են սովորական պատասխաններ ապահովելու համար։",
          "Նպատակն է թաքցնել ավտոմատացումը կամ ամբողջությամբ հանել մարդկային էսկալացիան։",
        ],
      },
      faqs: [
        {
          question: "Կարո՞ղ է պատասխանել և չատով, և email-ով։",
          answer:
            "Այո, բայց առաջին լուծումը մնում է մեկ ալիքի կամ սերտ կապված զույգի վրա։ Լրացուցիչ ալիքները առանձին ընդլայնում են այն բանից հետո, երբ արձագանքման և գրառման ուղին աշխատում է։",
        },
        {
          question: "Կարո՞ղ է ֆայլեր, մեդիա ուղարկել կամ CRM գործողություններ կատարել։",
          answer:
            "Միայն այն ճշգրիտ հաստատված գործողությունները, որոնք լուծումի սահմանում են։ Զգայուն մեդիան, հաշվի փոփոխությունները, խոստումները և անորոշ հարցումները կարող են մնալ միայն հաստատման ռեժիմում։",
        },
        {
          question: "Ի՞նչ է տեղի ունենում, երբ գիտելիքը թերի է։",
          answer:
            "Օգնականը պատասխան չի հորինում։ Այն ստեղծում է փոխանցում խոսակցության կոնտեքստով, բացակայող ապացույցով և այն հաջորդ որոշմամբ, որը մարդը պետք է կայացնի։",
        },
      ],
      cta: {
        publicLabel: "Սկսել հաճախորդների նամակների աուդիտը",
        publicBody:
          "Ուղարկեք մեկ ներկայացուցչական հաճախորդական թել, հիմնական ալիքը և CRM կամ դեպքերի պատմության համակարգը։ Dali-ը կպատասխանի replay set-ով, հաստատումների քարտեզով և լուծումի ֆիքսված սահմանով։",
        intakeFields: [
          "Հիմնական հաճախորդական ալիք և մոտավոր շաբաթական ծավալ",
          "Մեկ ներկայացուցչական սովորական խոսակցություն",
          "CRM, դեպքերի պատմություն և հաստատված գիտելիքի աղբյուրներ",
          "Գործողություններ կամ հարցումներ, որոնք միշտ պետք է սպասեն մարդուն",
        ],
        upworkLabel: "Տեսնել ինչ ուղարկել Upwork-ում",
        upworkBody:
          "Պատասխանեք Upwork-ում հիմնական հաճախորդական ալիքով, CRM-ով և մեկ ներկայացուցչական թելով։ Dali-ը կպատասխանի ֆիքսված լուծում սահմանով և հաստատման ենթադրություններով։",
      },
    },
    "operations-docs": {
      slug: "operations-docs",
      name: "Փաստաթղթերից դեպի գործողություններ լուծում",
      summary:
        "Փաթեթավորված լուծում, որը մեկ կրկնվող email, PDF, ֆորմայի կամ աղյուսակի հոսքը դարձնում է վավերացված գրառումներ և հաջորդ գործողություններ։",
      accent: "#1E3A8A",
      accentSoft: "#E9EDFF",
      tint: "#fff8f3",
      metadata: {
        title: "Փաստաթղթերից դեպի գործողություններ լուծում | Dali",
        description:
          "Փաթեթավորված լուծում օպերացիոն տվյալներ քաղելու և վավերացնելու, բացառությունները հաստատման ուղարկելու և ձեր թիմի արդեն օգտագործվող համակարգը թարմացնելու համար։",
      },
      hero: {
        eyebrow: "Փաթեթավորված լուծում",
        title: "Կրկնվող փաստաթղթերը վերածեք վավերացված գործողությունների։",
        lead:
          "Dali-ը նախագծում է մեկ ֆիքսված շրջանակով մուտքից դեպի համակարգ աշխատանքային հոսք, որը կարդում է emails, PDFs, ֆորմաներ, screenshots կամ spreadsheets, վավերացնում է պահանջվող դաշտերը, բացառությունները ուղարկում է հաստատման և հաստատված արդյունքը գրում է այն համակարգում, որը ձեր թիմը արդեն օգտագործում է։",
        supportLine:
          "Լավագույնս համապատասխանում է օպերացիոն թիմերին, որոնք անընդհատ կրկնում են նույն տեսակի տեղեկատվության պատճենումը, ստուգումը և փոխանցումը նամակների արկղերի և բիզնես համակարգերի միջև։",
      },
      workflow: {
        label: "Աշխատանքային հոսքի դիագրամ",
        intake: ["Email կամ PDF", "Ֆորմա կամ screenshot", "Աղյուսակի տող"],
        agentLabel: "Օպերացիոն աշխատանքային հոսքի լուծում",
        review: ["Բացակայող դաշտեր", "Կրկնվող գրառումներ", "Կանոնների բացառություններ"],
        outcomes: ["Վավերացված գրառում", "Փոխանցված առաջադրանք", "CRM կամ ERP թարմացում"],
      },
      contrast: {
        painTitle: "Ինչն է փոխարինում",
        painPoints: [
          "Օպերատորներ, որոնք նույն դաշտերը կցորդներից և նամակների արկղերից պատճենում են թրեքերների կամ բիզնես համակարգերի մեջ։",
          "Լուռ կրկնություններ, բացակայող արժեքներ և սխալ ձևավորված գրառումներ, որոնք հայտնաբերվում են միայն այն ժամանակ, երբ հաջորդ աշխատանքը կոտրվում է։",
          "Բացառություններ, որոնք թաղվում են չատում, քանի որ happy path-ը և վերանայման ուղին խառնված են իրար։",
        ],
        outcomeTitle: "Ինչն է ստեղծում",
        outcomePoints: [
          "Մեկ audit-able ուղի կրկնվող մուտքից դեպի վավերացված համակարգային թարմացում։",
          "Տեսանելի բացառությունների հերթ ամեն ինչի համար, ինչը թերի է, հակասական է կամ համաձայնեցված կանոններից դուրս է։",
          "Retries, deduplication և գործողությունների log, որպեսզի թիմը տեսնի ինչ է տեղի ունեցել, ոչ թե գուշակի։",
        ],
      },
      pilot: {
        label: "Scope-ի ճշգրիտ ֆիքսված սահմանը",
        fixedOutcome:
          "Մեկ մուտքային աղբյուր, մեկ քաղման սխեմա, մեկ նպատակային համակարգ և մեկ հաստատման կանոն, production-ում բացառությունների հերթով։",
        includes: [
          "1 կրկնվող մուտքային տեսակ, օրինակ պատվերի email, հաշիվ-ապրանքագրի PDF կամ intake ֆորմա",
          "1 պահանջվող տվյալների սխեմա վավերացման կանոններով",
          "1 CRM, ERP, թրեքեր կամ առաջադրանքների թիրախ",
          "Deduplication, retries, հաստատում և audit-able բացառությունների ուղի",
        ],
        excludes: [
          "Բոլոր փաստաթղթերի և օպերացիոն գործընթացների միաժամանակյա ավտոմատացում",
          "Բացակայող արժեքների գուշակում կամ երկիմաստ գրառումների հաստատում",
          "Առաջին լուծումում աղբյուրային կամ նպատակային համակարգի փոխարինում",
        ],
      },
      integrations: {
        label: "Ինտեգրացիաներ և օրինակներ",
        intro:
          "Այս լուծումը կանգնում է այն ալիքի միջև, որտեղ օպերացիոն տվյալները գալիս են, և այն համակարգի միջև, որտեղ պետք է գոյություն ունենա ստուգված գրառում կամ առաջադրանք։",
        items: [
          "Gmail, Outlook, Google Drive, ֆորմաներ, uploads կամ watched folders",
          "PDF-եր, screenshots, spreadsheets, order emails, invoices կամ application packets",
          "HubSpot, Salesforce, Odoo, QuickBooks, Buildium կամ Google Sheets",
          "Slack, Telegram, ClickUp կամ email հաստատումների և բացառությունների ահազանգերի համար",
        ],
      },
      guardrails: {
        label: "Սահմանափակումներ և հաստատում",
        intro:
          "Օպերացիոն ավտոմատացումը վաստակում է վստահությունը այն ժամանակ, երբ անորոշությունն ու խափանումը դարձնում է տեսանելի, ոչ թե ամեն մուտք force-ով անցկացնում happy path-ով։",
        items: [
          "Պահանջվող դաշտերը վավերացվում են նախքան ցանկացած downstream գրառում թույլատրելը։",
          "Կրկնվող մուտքերը հայտնաբերվում են նախքան երկրորդ գրառում կամ գործողություն ստեղծելը։",
          "Ցածր վստահության քաղումը և բիզնես կանոնների բացառությունները սպասում են անունով նշանակված վերանայողին։",
          "Յուրաքանչյուր retry, հաստատում, խափանում և վերջնական գրառում մնում է տեսանելի audit trail-ում։",
        ],
      },
      validation: {
        acceptanceTest:
          "Վերախաղարկեք 20 ներկայացուցչական մուտք համաձայնեցված սխեմայի դեմ։ Անցնում է միայն այն դեպքում, եթե լուռ կրկնությունները մնում են 0, յուրաքանչյուր իրադարձություն լոգավորված է, պահանջվող դաշտերը առնվազն 90% լրացված են, և յուրաքանչյուր բացակայող, հակասական կամ ցածր վստահության արժեք ստեղծում է բացառության գրառում։",
        measures: [
          "Քաղման տոկոս առանց ուղղման",
          "Բացառությունների տոկոս ըստ պատճառի",
          "Կրկնվող գործողությունների տոկոս",
          "Ժամանակ մինչև հաստատված համակարգային թարմացում",
        ],
        commercialModel:
          "Աուդիտը սահմանում է մուտքը, սխեման, թիրախը և բացառությունների կանոնները։ Dali-ը հետո ներկայացնում է մեկ ֆիքսված շրջանակով, ֆիքսված գնով milestone։ Կառուցումը սկսվում է հաստատումից հետո, ոչ թե դրանից առաջ։",
      },
      delivery: [
        {
          title: "Սահմանել ընդունման թեստը",
          body:
            "Մենք ընտրում ենք մեկ ներկայացուցչական մուտք, սահմանում ենք պահանջվող ելքային սխեման և ճշգրտորեն համաձայնում, թե որ գրառումները կարող են անցնել ավտոմատ, և որոնք պետք է սպասեն վերանայման։",
        },
        {
          title: "Վերախաղարկել իրական մուտքերը",
          body:
            "Մենք վերջին օրինակները անցկացնում ենք քաղման, վավերացման, deduplication-ի և բացառությունների հերթի միջով այնքան ժամանակ, մինչև համակարգի վարքագիծը դառնա դիտարկելի և կրկնելի։",
        },
        {
          title: "Գործարկել մեկ audit-able ուղի",
          body:
            "Ընտրված հոսքը գնում է production` հաստատումներով, retries-ով, alerts-ով և logs-ով, նախքան երկրորդ փաստաթղթի տեսակի կամ թիրախի ավելացումը։",
        },
      ],
      fit: {
        fit: [
          "Օպերացիոն նույն տեսակի մուտքը բավական հաճախ է գալիս, որպեսզի rehearsal արվի իրական օրինակների վրա։",
          "Նպատակային դաշտերը և բիզնես կանոնները կարելի է գրի առնել։",
          "Անվանված օպերատորը կարող է վերանայել բացառությունները լուծումի ընթացքում։",
        ],
        notFit: [
          "Յուրաքանչյուր մուտք ունի տարբեր կառուցվածք և չունի կայուն downstream գործողություն։",
          "Թիմը ցանկանում է առաջին milestone-ով ավտոմատացնել ամբողջ back-office օպերացիաները։",
          "Ոչ ոք չի կարող որոշել, թե երկիմաստ գրառումը պետք է անցնի, թե կանգ առնի։",
        ],
      },
      faqs: [
        {
          question: "Ի՞նչ է տեղի ունենում, երբ քաղումը անորոշ է։",
          answer:
            "Գրառումը կանգ է առնում բացառությունների հերթում կցված աղբյուրով։ Փաթեթը չի գուշակում բացակայող դաշտի կամ ցածր վստահության արժեքի միջով։",
        },
        {
          question: "Կարո՞ղ է ուղիղ գրել մեր CRM կամ ERP-ի մեջ։",
          answer:
            "Այո, այն բանից հետո, երբ գրառումն անցնում է համաձայնեցված վավերացման և հաստատման կանոնները։ Ավելի բարձր ռիսկային դեպքերը կարող են մնալ draft-only ամբողջ լուծումի ընթացքում։",
        },
        {
          question: "Պե՞տք է փոխարինենք մեր ընթացիկ գործիքները։",
          answer:
            "Ոչ։ Իմաստն այն է, որ միացնենք մեկ կրկնվող մուտք այն համակարգին, որի վրա ձեր թիմը արդեն հենվում է, և այդ ուղին ապացուցենք նախքան ընդլայնելը։",
        },
      ],
      cta: {
        publicLabel: "Սկսել փաստաթղթային աշխատանքային հոսքի աուդիտը",
        publicBody:
          "Ուղարկեք մեկ ներկայացուցչական մուտք, այն դաշտերը, որոնք պետք է քաղվեն, և նպատակային համակարգը։ Dali-ը կպատասխանի նեղ ընդունման թեստով և լուծումի ֆիքսված սահմանով։",
        intakeFields: [
          "Մեկ ներկայացուցչական email, փաստաթուղթ, ֆորմա կամ տող",
          "Ելքում պահանջվող դաշտերը և վավերացման կանոնները",
          "Թարմացվող CRM, ERP, թրեքեր կամ առաջադրանքների համակարգ",
          "Ով պետք է վերանայի բացառությունները նախքան գրառումը",
        ],
        upworkLabel: "Տեսնել ինչ ուղարկել Upwork-ում",
        upworkBody:
          "Պատասխանեք Upwork-ում մեկ ներկայացուցչական մուտքով, պահանջվող ելքային դաշտերով և նպատակային համակարգով։ Dali-ը դրանք կվերածի առաջին milestone-ի ընդունման թեստի։",
      },
    },
    "knowledge-assistant": {
      slug: "knowledge-assistant",
      name: "Գիտելիքի օգնականի լուծում",
      summary:
        "Փաթեթավորված լուծում այն թիմերի համար, որոնց պետք է հուսալի առաջին պատասխան իրենց ներքին գիտելիքից` առանց վստահություն հորինելու այնտեղ, որտեղ փաստաթղթերը թույլ են։",
      accent: "#1E3A8A",
      accentSoft: "#E9EDFF",
      tint: "#fff6f5",
      metadata: {
        title: "Գիտելիքի օգնականի լուծում | Dali",
        description:
          "Փաթեթավորված լուծում ներքին փաստաթղթերում որոնելու, ճիշտ աղբյուրը մեջբերելու, պատասխաններ պատրաստելու և անվտանգ հրաժարվելու համար, երբ գիտելիքը թերի կամ հակասական է։",
      },
      hero: {
        eyebrow: "Փաթեթավորված լուծում",
        title: "Տվեք թիմին պատասխաններ, որոնք այն կարող է ստուգել։",
        lead:
          "Dali-ը փաթեթավորում է մեկ permission-aware գիտելիքային աշխատանքային հոսք այն փաստաթղթերի և գործիքների շուրջ, որոնց թիմը արդեն վստահում է, փաստական պատասխանների համար մեջբերումներով և հստակ հրաժարման ուղով, երբ ապացույցը թույլ է։",
        supportLine:
          "Լավագույնս համապատասխանում է աջակցության, օպերացիոն և ներքին enablement թիմերին, որտեղ նույն հարցերը անընդհատ ընդհատում են նույն փորձագետներին։",
      },
      workflow: {
        label: "Աշխատանքային հոսքի դիագրամ",
        intake: ["Փաստաթղթեր", "Նախորդ պատասխաններ", "Քաղաքականության նշումներ"],
        agentLabel: "Գիտելիքի օգնականի լուծում",
        review: ["Բացակայող աղբյուրներ", "Հակասական ուղեցույց", "Զգայուն հարցումներ"],
        outcomes: ["Մեջբերված պատասխան", "Առաջարկվող հաջորդ քայլ", "Էսկալացիայի brief"],
      },
      contrast: {
        painTitle: "Ինչն է փոխարինում",
        painPoints: [
          "Թիմեր, որոնք նույն պատասխանը նորից գտնելու համար որոնում են drive-երում, չատերում և հին ticket-երում։",
          "Առարկայական փորձագետներ, որոնք դառնում են սովորական հարցերի լռելյայն որոնողական համակարգ։",
          "Պատասխաններ, որոնք պատճենվում են առաջ, առանց իմանալու` արդյոք աղբյուրը դեռ վավե՞ր է։",
        ],
        outcomeTitle: "Ինչն է ստեղծում",
        outcomePoints: [
          "First-pass պատասխան, որը հղում է տալիս օգտագործված աղբյուրային նյութին։",
          "Հստակ abstain ուղի, երբ գիտելիքի բազան չի կարող աջակցել վստահ պատասխանին։",
          "Կրկնելի օրինաչափություն մեկ աղբյուրների հավաքածուն օգտակար պահելու համար` առանց ձևացնելու, թե ամբողջ ընկերությունը արդեն կազմակերպված է։",
        ],
      },
      pilot: {
        label: "Scope-ի ճշգրիտ ֆիքսված սահմանը",
        fixedOutcome:
          "Մեկ թիմ կամ աղբյուրների փունջ, մեկ permission model, մեկ պատասխանների մակերես, մեջբերումներ յուրաքանչյուր փաստական պատասխանի համար և refusal վարքագիծ, երբ ապացույցը բացակայում է։",
        includes: [
          "1 խնամքով ընտրված փաստաթղթերի հավաքածու կամ թղթապանակների խումբ",
          "1 օգտատերերի լսարան, օրինակ ներքին ops կամ support աշխատակազմ",
          "Citation-first պատասխաններ վստահության մակարդակին զգայուն էսկալացիայով",
          "Հարցերի լոգավորում, որպեսզի գիտելիքի բազայի բացերը մնան տեսանելի",
        ],
        excludes: [
          "Բաց-ended հետազոտություն հաստատված աղբյուրների հավաքածուից դուրս",
          "Լուռ գուշակում, երբ փաստարկված պատասխան գոյություն չունի",
          "Լայն enterprise search-ի փոխարինում",
        ],
      },
      integrations: {
        label: "Ինտեգրացիաներ և օրինակներ",
        intro:
          "Փաթեթը լավագույնս աշխատում է այն ժամանակ, երբ աղբյուրային նյութը արդեն գոյություն ունի, նույնիսկ եթե անկատար է, և թիմը գիտի, թե որ պահոցը պետք է համարվի հաստատված։",
        items: [
          "Notion, Google Drive, Confluence կամ ներքին փաստաթղթերի թղթապանակ",
          "Slack կամ chat intake ներքին հարցերի համար",
          "Zendesk, Intercom կամ support triage ալիք draft պատասխանների համար",
          "Ticket կամ issue համակարգեր էսկալացիայի համար, երբ փաստաթղթերը թերի են",
        ],
      },
      guardrails: {
        label: "Սահմանափակումներ և հաստատում",
        intro:
          "Օգնականը նախագծված է մեջբերելու, հրաժարվելու և էսկալացնելու համար, նախքան նրան թույլ կտրվի հնչել սահուն, բայց սխալ։",
        items: [
          "Պատասխանները ներառում են օգտագործված աղբյուրը կամ հստակ նշում են, որ աղբյուր չի գտնվել։",
          "Հակասական փաստաթղթերը վստահության թատրոնի փոխարեն առաջացնում են էսկալացիա։",
          "Զգայուն թեմաները կարող են force-վել վերանայման, նույնիսկ երբ աղբյուր գոյություն ունի։",
          "Հարցերի log-երը ցույց են տալիս, թե գործարկումից հետո որտեղ գիտելիքի բազան մաքրման կարիք ունի։",
        ],
      },
      validation: {
        acceptanceTest:
          "Գնահատեք 30 իրական հարց հաստատված աղբյուրների հավաքածուի դեմ։ Անցնում է միայն այն դեպքում, եթե յուրաքանչյուր փաստական պատասխան ներառում է աջակցող մեջբերում կամ հստակ հրաժարում, permission խախտումները մնում են 0, և վերանայողների ընդունումը հասնում է առնվազն 90%-ի այն հարցերի դեպքում, որոնց պետք է պատասխաներ աղբյուրների հավաքածուն։",
        measures: [
          "Վավեր մեջբերումներով պատասխաններ",
          "Ճիշտ հրաժարման և էսկալացիայի տոկոս",
          "Permission boundary թեստերի արդյունքներ",
          "Retrieval latency",
          "Կրկնվող անպատասխան հարցերի թեմաներ",
        ],
        commercialModel:
          "Աուդիտը ֆիքսում է աղբյուրների հավաքածուն, լսարանը և գնահատման հարցերը։ Dali-ը հետո ներկայացնում է մեկ ֆիքսված շրջանակով, ֆիքսված գնով լուծում։ Կառուցումը սկսվում է միայն սահմանի հաստատումից հետո։",
      },
      delivery: [
        {
          title: "Կազմավորել հաստատված աղբյուրների հավաքածուն",
          body:
            "Մենք ընտրում ենք հաշվի առնվող փաստաթղթերը, հեռացնում ակնհայտ աղմուկը և սահմանում լսարանը, որպեսզի լուծումը լուծի սահմանված գիտելիքային խնդիր, ոչ թե անորոշ մեկը։",
        },
        {
          title: "Ստուգել փաստարկված պատասխանները",
          body:
            "Մենք իրական հարցերը անցկացնում ենք աղբյուրների հավաքածուի դեմ, սրում retrieval-ի և պատասխանների կանոնները և սահմանում, թե որտեղ հրաժարումը պետք է հաղթի ենթադրությանը։",
        },
        {
          title: "Գործարկել առաջին պատասխանի շերտը",
          body:
            "Օգնականը գնում է production ընտրված լսարանի համար` մեջբերումներով, էսկալացիայի ուղիներով և log-երով, որոնք ցույց են տալիս, թե որտեղ է աղբյուրային նյութը դեռ ձախողվում։",
        },
      ],
      fit: {
        fit: [
          "Նույն հարցերը բավական հաճախ են կրկնվում, որպեսզի ընդհատման արժեք ստեղծեն։",
          "Դուք կարող եք նշել, թե որ փաստաթղթերը պետք է դիտարկվեն որպես հաստատված աղբյուրներ։",
          "Առաջին պատասխանը օգտակար է, նույնիսկ եթե ավելի բարդ դեպքերը դեռ մարդն է վարում։",
        ],
        notFit: [
          "Ձեր հիմնական գիտելիքը դեռ օգտագործելի փաստաթղթերում գոյություն չունի։",
          "Դուք ուզում եք, որ օգնականը իմպրովիզացնի բաց ինտերնետում։",
          "Ոչ ոք չի կարող տիրապետել էսկալացիաներին կամ աղբյուրների մաքրմանը գործարկումից հետո։",
        ],
      },
      faqs: [
        {
          question: "Սա կարո՞ղ է անմիջապես պատասխանել հաճախորդներին։",
          answer:
            "Կարող է, բայց ավելի անվտանգ առաջին քայլը սովորաբար ներքին կամ draft-first աշխատանքային հոսքն է։ Հաճախորդին ուղիղ պատասխանները իմաստ ունեն միայն այն ժամանակ, երբ աղբյուրային նյութը կայուն է, իսկ ռիսկը` ցածր։",
        },
        {
          question: "Սա ինչո՞վ է տարբերվում սովորական chatbot-ից։",
          answer:
            "Փաթեթը սահմանված է հաստատված աղբյուրների հավաքածուի, հստակ հրաժարման և օպերացիոն էսկալացիայի շուրջ։ Այն նախատեսված է հուսալի լինելու, ոչ թե պարզապես խոսակցական։",
        },
        {
          question: "Նախապես կատարյալ փաստաթղթեր պե՞տք են։",
          answer:
            "Ոչ։ Աղբյուրների հավաքածուն պետք է բավական լավ լինի մեկ լսարանի և մեկ կիրառման համար։ Փաթեթը պետք է բացահայտի մնացած բացերը, ոչ թե թաքցնի դրանք։",
        },
      ],
      cta: {
        publicLabel: "Սկսել գիտելիքային աշխատանքային հոսքի աուդիտը",
        publicBody:
          "Եթե ձեր թիմը ժամանակ է կորցնում կրկնվող հարցերի վրա, ուղարկեք աղբյուրային համակարգերն ու օգտատերերի խումբը։ Dali-ը կպատասխանի ամենափոքր լուծումով, որը կարող է անվտանգ պատասխանել։",
        intakeFields: [
          "Հաստատված փաստաթղթերի պահոց կամ աղբյուրների հավաքածու",
          "Օգտատերերի խումբ, որին պետք է first-answer շերտը",
          "Երկու կամ երեք ներկայացուցչական հարց",
          "Պատասխանատու էսկալացիաների և աղբյուրների մաքրման համար",
        ],
        upworkLabel: "Տեսնել ինչ ուղարկել Upwork-ում",
        upworkBody:
          "Պատասխանեք Upwork-ում աղբյուրային պահոցով, լսարանով և էսկալացիայի պատասխանատուով։ Dali-ը կպատասխանի օգնականի ֆիքսված լուծում սահմանով։",
      },
    },
    "voice-agents": {
      slug: "voice-agents",
      name: "Ձայնային դիզայն-գործընկեր լուծում",
      summary:
        "Դիզայն-գործընկեր հետազոտական լուծում մեկ կրկնվող զանգի ուղղության համար, որը օգտագործվում է բացահայտումը, փոխանցումը, latency-ն և մարդկային handoff-ը հաստատելու համար` նախքան ավելի լայն կառուցումը։",
      accent: "#1E3A8A",
      accentSoft: "#E9EDFF",
      tint: "#fff7f2",
      metadata: {
        title: "Ձայնային դիզայն-գործընկեր լուծում | Dali",
        description:
          "Դիզայն-գործընկեր հետազոտական լուծում մեկ սովորական զանգային ուղղության համար` հստակ բացահայտմամբ, փոխանցմամբ, latency-ով, ամփոփումներով և մարդկային takeover թեստերով։",
      },
      hero: {
        eyebrow: "Դիզայն-գործընկեր հետազոտական լուծում",
        title: "Ստուգեք մեկ կրկնվող զանգի հոսք, նախքան ձայնային գործակալ գնելը։",
        lead:
          "Dali-ը սահմանում է մեկ վերահսկվող զանգային ուղղություն մեկ զանգի տեսակի համար, չափում է բացահայտումը, փոխանցումը, ամփոփումները, latency-ն և փոխանցման վարքագիծը և այդ ապացույցով որոշում է` արդյոք արդարացվա՞ծ է վճարովի ձայնային լուծումը։",
        supportLine:
          "Լավագույնս համապատասխանում է ամրագրմանը, որակավորմանը, ստատուսի թարմացումներին և overflow ծածկույթին, որտեղ արագությունը կարևոր է, բայց բարձր stakes դատողությունը դեռ մարդկանց է պատկանում։",
      },
      workflow: {
        label: "Աշխատանքային հոսքի դիագրամ",
        intake: ["Զանգերի հերթ", "Ամրագրման կանոններ", "FAQ փաստաթղթեր"],
        agentLabel: "Ձայնային դիզայն-գործընկեր թեստ",
        review: ["Էսկալացիաներ", "Զգայուն հարցումներ", "Callback բացառություններ"],
        outcomes: ["Պատասխանված զանգ", "Ամրագրված ժամանակ", "Ամփոփում և փոխանցում"],
      },
      contrast: {
        painTitle: "Ինչն է փոխարինում",
        painPoints: [
          "Սովորական զանգեր, որոնք ընդհատում են օպերատորներին, ովքեր պետք է զբաղվեն բարդ աշխատանքով։",
          "Բաց թողնված զանգեր աշխատանքային ժամերից դուրս կամ ծանրաբեռնված պահերին` առանց հետևողական follow-up-ի։",
          "Աշխատակազմ, որը ամբողջ օրը կրկնում է նույն ամրագրման, ստատուսի և intake հարցերը։",
        ],
        outcomeTitle: "Ինչն է ստեղծում",
        outcomePoints: [
          "Բացահայտված first-pass զանգային շերտ մեկ հստակ սահմանված զանգի տեսակի համար։",
          "Զանգողի տվյալների, ամփոփումների և հաջորդ գործողությունների հետևողական հավաքագրում։",
          "Անմիջական փոխանցում կամ callback փոխանցում, երբ հարցումը դուրս է գալիս հաստատված զանգային ուղուց։",
        ],
      },
      pilot: {
        label: "Հետազոտության ճշգրիտ սահմանը",
        fixedOutcome:
          "Մեկ զանգի տեսակ, մեկ լեզու, մեկ ամրագրման կամ փոխանցման ուղի, rehearsal արված վերահսկմամբ` բացահայտման և մարդկային takeover կանոններով։",
        includes: [
          "1 սովորական մուտքային զանգի հոսք, օրինակ ամրագրում կամ ստատուսի հարցումներ",
          "1 լեզու և աշխատանքային ժամերի կամ overflow ծածկույթի սահման",
          "1 ժամանակացույցի, փոխանցման կամ ամփոփման handoff ուղի",
          "Բացահայտում, որ զանգողը խոսում է ավտոմատացված համակարգի հետ",
        ],
        excludes: [
          "Հեռախոսով վճարումների հավաքագրում",
          "Բարդ վաճառքի բանակցություններ կամ բժշկական, իրավական կամ ճգնաժամային խորհուրդ",
          "Բազմալեզու ընդլայնում առաջին լուծումի ներսում",
        ],
      },
      integrations: {
        label: "Ինտեգրացիաներ և օրինակներ",
        intro:
          "Այս լուծումը լավագույնս համապատասխանում է այն դեպքում, երբ զանգից հետո փոխանցման ուղին արդեն սահմանված է, և բիզնեսին հիմնականում պետք է ավելի արագ ծածկույթ և ավելի մաքուր ամփոփումներ։",
        items: [
          "Twilio, SIP routing կամ գոյություն ունեցող cloud telephony provider",
          "Calendly, booking software կամ կառուցվածքային intake sheet",
          "CRM թարմացումներ և պատասխանատուի ահազանգեր յուրաքանչյուր զանգի արդյունքից հետո",
          "Telegram կամ Slack ծանուցումներ փոխանցման և callback իրադարձությունների համար",
        ],
      },
      guardrails: {
        label: "Սահմանափակումներ և հաստատում",
        intro:
          "Ձայնը բարձր վստահության միջավայր է, այդ պատճառով լուծումը սկսվում է նեղ և հստակ։ Համակարգը պետք է պարզ լինի իր ինքնության և իր կանգառի կետերի մասին։",
        items: [
          "Զանգողներին ասվում է, որ նրանք խոսում են ավտոմատացված օգնականի հետ։",
          "Հաստատված զանգային ուղուց դուրս ամեն ինչ փոխանցվում է մարդկային follow-up-ի։",
          "Ամփոփումները և log-երը պահվում են վերանայման և օպերացիոն կարգաբերման համար։",
          "Ձայնագրման և privacy կանոնները համաձայնեցվում են բիզնես կոնտեքստին մինչև գործարկումը։",
        ],
      },
      validation: {
        acceptanceTest:
          "Վերախաղարկեք 30 scripted և unscripted զանգեր։ Անցնում է միայն այն դեպքում, եթե ավտոմատացումը միշտ բացահայտված է, յուրաքանչյուր զանգի ամփոփումը լոգավորված է, չարտոնված գործողությունները մնում են 0, փոխանցումը ճիշտ է առնվազն հաստատված զանգային ուղղության 90%-ում, և շրջանակից դուրս յուրաքանչյուր հարցում հասնում է փոխանցման կամ callback capture-ի։",
        measures: [
          "Հաստատված զանգային ուղու ավարտման տոկոս",
          "Ամրագրման կամ փոխանցման հաջողություն",
          "Ճիշտ փոխանցման և callback-ի տոկոս",
          "Ամփոփումների ճշգրտություն վերանայված զանգերում",
        ],
        commercialModel:
          "Աուդիտը ֆիքսում է մեկ զանգային ուղղություն, provider, handoff և գնահատման հավաքածու։ Dali-ը կառուցման առաջարկ է ներկայացնում միայն այն դեպքում, եթե դիզայն-գործընկեր ապացույցը հաստատում է կենսունակ վճարովի լուծում։",
      },
      delivery: [
        {
          title: "Ընտրել նեղ զանգային ուղղությունը",
          body:
            "Մենք ընտրում ենք մեկ զանգի տեսակ, որն ունի բավարար կրկնություն կարևոր լինելու համար և բավարար կառուցվածք անվտանգ կերպով փաթեթավորված լուծումի մեջ մշակվելու համար։",
        },
        {
          title: "Վերախաղարկել փոխանցումներն ու սահմանային դեպքերը",
          body:
            "Մենք ստուգում ենք խոսակցության ուղին, ամրագրման տրամաբանությունը և takeover կանոնները այնքան, մինչև ակնհայտ դառնա, թե որտեղ համակարգը պետք է շարունակի, և որտեղ պետք է կանգնի։",
        },
        {
          title: "Գործարկել վերահսկվող թեստային ուղղությունը",
          body:
            "Ընտրված ուղղությունը աշխատում է սահմանափակ դիզայն-գործընկեր միջավայրում` բացահայտմամբ, մոնիթորինգով և հստակ callback կամ փոխանցման ուղով ամեն ինչի համար, ինչը շրջանակից դուրս է։",
        },
      ],
      fit: {
        fit: [
          "Դուք ունեք կրկնվող մուտքային զանգերի տեսակներ, որոնք արդեն հետևում են script-ի կամ checklist-ի։",
          "Ծածկույթի բացերը կամ բաց թողնված զանգերը բերում են իրական օպերացիոն կորստի։",
          "Մարդուն մաքուր handoff արդեն գոյություն ունի, երբ զանգը բարդանում է։",
        ],
        notFit: [
          "Յուրաքանչյուր զանգ բարդ է, խորհրդատվական կամ էմոցիոնալ զգայուն։",
          "Ձեզ պետք է համակարգ, որը ցանկացած գնով մարդկային է հնչում։",
          "Բիզնեսը չի կարող սահմանել, թե ձայնային գործակալին ինչ է թույլատրված անել։",
        ],
      },
      faqs: [
        {
          question: "Զանգողները կիմանա՞ն, որ սա ավտոմատացված է։",
          answer:
            "Այո։ Փաթեթը ենթադրում է հստակ բացահայտում։ Թաքնված ավտոմատացումը սխալ վստահության մոդել է նման ձայնային աշխատանքային հոսքի համար։",
        },
        {
          question: "Կարո՞ղ է փոխանցել մարդուն։",
          answer:
            "Սա սովորաբար հիմնական պահանջ է։ Փաթեթը կառուցված է նեղ զանգային ուղու և մաքուր փոխանցման կամ callback տրամաբանության շուրջ մնացած ամեն ինչի համար։",
        },
        {
          question: "Սա ամբողջ contact-center-ի փոխարինմա՞ն համար է։",
          answer:
            "Ոչ։ Սա մեկ զանգային ուղղության ֆիքսված լուծում է։ Եթե այն աշխատի, ավելի լայն ընդլայնումը պետք է առանձին որոշում լինի` նոր սահմաններով։",
        },
      ],
      cta: {
        publicLabel: "Դիմել ձայնային դիզայն-գործընկեր աուդիտի համար",
        publicBody:
          "Ուղարկեք մեկ ներկայացուցչական զանգի script, ընթացիկ փոխանցման ուղին և պահանջվող վերջնական գործողությունը։ Dali-ը կպատասխանի աուդիտի շրջանակով, թեստային մատրիցով և դիզայն-գործընկեր լուծումի սահմանով։",
        intakeFields: [
          "Մեկ սովորական մուտքային զանգի տեսակ",
          "Ընթացիկ telephony և routing provider",
          "Ավարտվող ամրագրման, ստատուսի կամ intake գործողություն",
          "Փոխանցման կամ callback կանոն շրջանակից դուրս հարցումների համար",
        ],
        upworkLabel: "Տեսնել ինչ ուղարկել Upwork-ում",
        upworkBody:
          "Պատասխանեք Upwork-ում զանգի տեսակով, routing գործիքով և handoff կանոններով։ Dali-ը կպատասխանի դիզայն-գործընկեր սահմանով, թեստային մատրիցով և հաստատման ենթադրություններով։",
      },
    },
    "vibe-code-rescue": {
      slug: "vibe-code-rescue",
      name: "Vibe-code Rescue լուծում",
      summary:
        "Ֆիքսված լուծում՝ AI-ով կառուցված MVP-ի secrets, payments և admin ուղիների տրիաժ, patch vs rewrite որոշումներ, gates, stop-switch և handoff փաթեթ թիմի համար։",
      accent: "#0B3A4A",
      accentSoft: "#E4F0F3",
      tint: "#f4f9fa",
      metadata: {
        title: "Vibe-code Rescue լուծում | Dali",
        description:
          "Ֆիքսված production-hardening լուծում vibe-coded MVP-երի համար՝ secrets, payments և admin տրիաժ, patch vs rewrite, gates և stop-switch, ապա handoff փաթեթ, որին թիմը տիրապետում է։",
      },
      hero: {
        eyebrow: "Փաթեթավորված լուծում",
        title: "Ամրացրեք AI-ով կառուցված MVP-ը նախքան այն վստահություն կամ գումար կարժենա։",
        lead:
          "Dali-ը ֆիքսված rescue է անում մեկ արտադրանքային մակերեսի վրա՝ գտնում է bleeding ուղիները (secrets, payments, admin, outbound գործողություններ), կանգնեցնում է ամենավատ ռիսկերը, որոշում է patch vs rewrite յուրաքանչյուր critical path-ի համար և դնում է gates, monitoring և stop-switch handoff-ով, որ թիմը կարող է վարել ինքնուրույն։",
        supportLine:
          "Լավագույնս համապատասխանում է հիմնադիրներին և օպերատորներին, ովքեր Lovable, Cursor, v0 կամ նման builders-ով են մեկնարկել և հիմա պետք ունեն production-ազնվություն առանց ամոթի դասախոսության և առանց ամբողջ արտադրանքի rewrite-ի։",
      },
      workflow: {
        label: "Աշխատանքային հոսքի դիագրամ",
        intake: ["Repo կամ preview", "Payment և admin ուղիներ", "Secret մակերեսներ"],
        agentLabel: "Rescue և harden լուծում",
        review: ["Կրիտիկական severity", "Patch vs rewrite", "Սեփականատիրոջ հաստատում"],
        outcomes: ["Ռիսկի տրիաժի քարտեզ", "Ամրացված ուղիներ", "Handoff փաթեթ"],
      },
      contrast: {
        painTitle: "Ինչ է փոխարինում",
        painPoints: [
          "Դեմո, որ աշխատում է preview-ում, մինչդեռ tokens, webhooks կամ admin routes բաց են production-ում։",
          "Անվերջ chat-driven պաչեր առանց severity կարգի, առանց stop-switch-ի և առանց sprint-ից հետո հստակ ownership-ի։",
          "Կեղծ ընտրություն «ուղարկիր ինչպես կա» և «դեն նետիր ամեն ինչ» միջև, երբ ինժեներական խորություն պետք է միայն մի քանի ուղիներին։",
        ],
        outcomeTitle: "Ինչ է ստեղծում",
        outcomePoints: [
          "Severity-ով դասավորված տրիաժ secrets, payments, admin և outbound գործողությունների համար։",
          "Գրավոր patch vs rewrite որոշում յուրաքանչյուր critical path-ի համար, ոչ թե անորոշ rewrite մանդատ։",
          "Gates, monitoring և stop-switch, գումարած handoff փաթեթ, որ թիմը վարում է առանց Dali-ի մշտական ներկայության։",
        ],
      },
      pilot: {
        label: "Scope-ի ճշգրիտ ֆիքսված սահման",
        fixedOutcome:
          "Մեկ արտադրանքային մակերես, բարձր ռիսկի ուղիների տրիաժ, patch կամ rewrite որոշումներ, production gates և stop-switch, handoff փաթեթ owners-ով և residual risks-ով։",
        includes: [
          "1 արտադրանքային մակերես կամ deployable հավելված (կայք, MVP կամ admin-backed flow)",
          "secrets, payments, admin access և high-impact outbound գործողությունների տրիաժ",
          "patch vs rewrite նշումներ յուրաքանչյուր critical path-ի համար scope-ում",
          "production gates, logging սպասումներ և հստակ stop-switch",
          "handoff փաթեթ՝ residual risks, owners և հաջորդ engineering քայլեր",
        ],
        excludes: [
          "Յուրաքանչյուր feature-ի կամ էկրանի ամբողջական rewrite",
          "Բաց product redesign կամ rebrand",
          "Բազմաարտադրանքային rescue մեկ լուծումում",
          "Թիմին ամաչեցնել AI builders օգտագործելու համար",
        ],
      },
      integrations: {
        label: "Ինտեգրացիաներ և օրինակներ",
        intro:
          "Փաթեթը աշխատում է այն stack-ի վրա, որն արդեն ուղարկել եք։ Արտադրանքին հանդիպում ենք այնտեղ, որտեղ կա՝ builder output, custom code, payments և host, ապա ամրացնում ենք միայն այն ուղիները, որոնք իրականում կարող են վնասել։",
        items: [
          "Lovable, v0, Cursor, Bolt կամ խառը AI-assisted codebase-եր",
          "Vercel, Netlify, Cloudflare կամ նման preview-to-prod hosts",
          "Stripe, payment webhooks, promo կոդեր և checkout callbacks",
          "Supabase, Firebase, custom admin կամ shared service-role keys",
          "Կապված նյութեր Dali բլոգում՝ how-we-rescue-vibe-coded-mvps, vibe-coded-site-hardening-checklist, security-audit-for-vibe-coded-websites, rewrite-vs-patch-vibe-code",
        ],
      },
      guardrails: {
        label: "Պաշտպանիչներ և հաստատում",
        intro:
          "Rescue-ը լուռ rewrite չէ։ Severity-ն, որոշումները և residual risk-ը տեսանելի են մնում սեփականատիրոջը, մինչև ինչ-որ բան համարվի ավարտված։",
        items: [
          "Secrets և payment ուղիները stop-the-bleeding աշխատանք են կոսմետիկ մաքրումից առաջ։",
          "Յուրաքանչյուր critical path ստանում է հստակ patch կամ rewrite որոշում պատճառով, ոչ թե «վայբով»։",
          "stop-switch և human gate մնում են high-impact գործողությունների վրա լուծումից հետո։",
          "scope-ից դուրս residual risks-ը գրվում են owners-ով, ոչ թե թաղվում չաթում։",
        ],
      },
      validation: {
        acceptanceTest:
          "Փաթեթն անցնում է միայն եթե high-severity secrets և payments findings-ը փակված են կամ գրավոր ընդունված owner-ի կողմից, scope-ի յուրաքանչյուր critical path ունի patch-or-rewrite որոշում, high-impact գործողությունների համար կա stop-switch, և handoff փաթեթը անվանում է residual risks և owners։",
        measures: [
          "high-severity findings փակված կամ owner-ի կողմից ընդունված",
          "critical paths գրավոր patch vs rewrite որոշումներով",
          "stop-switch և gate coverage high-impact գործողությունների վրա",
          "handoff ամբողջականություն՝ residual risks, owners, next steps",
        ],
        commercialModel:
          "Աուդիտը ֆիքսում է արտադրանքային մակերեսը, ռիսկերի առաջնահերթությունները և acceptance bar-ը։ Այնուհետև Dali-ը գնահատում է մեկ fixed-scope, fixed-price rescue լուծում։ Ավելի լայն rewrite կամ multi-surface աշխատանքը handoff-ից հետո առանձին որոշում է։",
      },
      delivery: [
        {
          title: "bleeding ուղիների տրիաժ",
          body:
            "Քարտեզագրում ենք secrets, payments, admin և outbound մակերեսները, դասավորում severity-ն և ֆիքսում լուծումի սահմանը, որպեսզի աշխատանքը սկսվի այնտեղ, որտեղ վնասը իրական է։",
        },
        {
          title: "Patch, rewrite և gates",
          body:
            "Ամրացնում կամ rewrite ենք անում scope-ի յուրաքանչյուր critical path, ավելացնում production gates և stop-switch, և կոսմետիկ պարտքը թողնում ենք առաջին փաթեթից դուրս, եթե այն չի արգելափակում անվտանգությունը։",
        },
        {
          title: "ownership-ի փոխանցում",
          body:
            "Ստանում եք փաթեթ որոշումներով, residual risks-ով, owners-ով և հաջորդ engineering քայլերով, որպեսզի թիմը վարի արտադրանքը առանց Dali-ի մշտական on-call-ի։",
        },
      ],
      fit: {
        fit: [
          "AI builders-ով կամ heavy AI-assisted coding-ով եք ուղարկել MVP, և իրական օգտատերերը կամ payments-ը մոտ են։",
          "Կարող եք անվանել մեկ արտադրանքային մակերես և ուղիներ, որոնք դիպչում են գումարին, մուտքին կամ outbound side effects-ին։",
          "Ձեզ պետք է ազնիվ patch vs rewrite քարտեզ ավելի, քան ամբողջական rebuild-ի կարգախոս։",
        ],
        notFit: [
          "Պետք է յուրաքանչյուր էկրանի ամբողջական product rewrite մեկ engagement-ում։",
          "Չկա owner, ով կարող է ընդունել residual risk կամ առաջնահերթել severity-ն։",
          "Արտադրանքը դեռևս մաքուր նախատիպ է առանց production host-ի, օգտատերերի կամ payment ուղու։",
        ],
      },
      faqs: [
        {
          question: "Պե՞տք է դեն նետել vibe-coded հավելվածը։",
          answer:
            "Սովորաբար ոչ։ Rescue-երի մեծ մասը պահում է աշխատող մակերեսը և rewrite է անում միայն անապահով կամ չսպասարկվող ուղիները։ Patch vs rewrite որոշվում է յուրաքանչյուր critical path-ի համար։ Որոշման շրջանակը տես rewrite-vs-patch-vibe-code Dali բլոգում։",
        },
        {
          question: "Սա ամբողջական security աուդիտ է՞։",
          answer:
            "Սա production-hardening լուծում է security-minded տրիաժով, ոչ թե enterprise pen-test թատրոն։ Նախ secrets, payments, admin և high-impact գործողություններ։ Ավելի խոր նշումներ՝ security-audit-for-vibe-coded-websites և vibe-coded-site-hardening-checklist։",
        },
        {
          question: "Կամաչեցնե՞ք AI tools-ի համար։",
          answer:
            "Ոչ։ Արագությունը ռացիոնալ էր։ Փաթեթը ենթադրում է, որ builders-ը օգնել են սովորել․ հիմա պետք է production-ազնվություն։ Գործընթացը հրապարակային է how-we-rescue-vibe-coded-mvps-ում։",
        },
        {
          question: "Ի՞նչ ենք ստանում վերջում։",
          answer:
            "Severity-ով դասավորված տրիաժ, scope-ում ամրացված կամ rewrite արված critical paths, gates և stop-switch, գումարած handoff փաթեթ residual risks-ով, owners-ով և next steps-ով։ Ոչ թե անորոշ «կոդը բարելավեցինք»։",
        },
      ],
      cta: {
        publicLabel: "Սկսել vibe-code rescue աուդիտը",
        publicBody:
          "Եթե MVP-ն արդեն live է կամ շուտով գումար է վերցնելու, ուղարկեք արտադրանքի URL կամ repo context և ուղիները, որոնք ամենաշատն են անհանգստացնում։ Dali-ը կպատասխանի ֆիքսված rescue սահմանով և acceptance bar-ով։",
        intakeFields: [
          "Արտադրանքի URL, preview կամ repo context մեկ մակերեսի համար",
          "payment, admin, auth կամ outbound ուղիներ, որոնք արդեն գոյություն ունեն",
          "Որտեղ են հիմա secrets, webhooks կամ service keys",
          "Owner, ով կարող է ընդունել residual risk և առաջնահերթել severity-ն",
        ],
        upworkLabel: "Տեսնել ինչ ուղարկել Upwork-ում",
        upworkBody:
          "Պատասխանեք Upwork-ում արտադրանքային մակերեսով, payment կամ admin ուղիներով և risk որոշումների owner-ով։ Dali-ը կպատասխանի ֆիքսված rescue լուծումի սահմանով և տրիաժի կարգով։",
      },
    },
    "agent-rescue": {
      slug: "agent-rescue",
      name: "Agent Rescue",
      summary:
        "Ֆիքսված լուծում AI գործակալների համար, որոնք անցնում են դեմոն, բայց ընկնում են production-ում՝ իրական failure modes-ի տրիաժ, eval suite իրական խոսակցությունների վրա, guardrails և monitoring, ապա cutover ապացույցներով։",
      accent: "#0B3A4A",
      accentSoft: "#E4F0F3",
      tint: "#f4f9fa",
      metadata: {
        title: "Agent Rescue | Dali",
        description:
          "Ֆիքսված rescue AI գործակալների համար, որոնք աշխատում են դեմոյում, բայց ընկնում կամ կանգնում են production-ում՝ failure modes-ի տրիաժ, eval suite իրական խոսակցությունների վրա, guardrails, approval gates, monitoring և production cutover 2-4 շաբաթում։",
      },
      hero: {
        eyebrow: "Փաթեթավորված լուծում",
        title: "Ձեր գործակալը դեմոյում աշխատում էր։ Production-ում կանգնեց։",
        lead:
          "Dali-ը վերցնում է գործակալ, որը կառուցել է այլ վենդոր, ֆրիլանսեր կամ ձեր թիմը, տրիաժ է անում իրական failure modes-ը՝ hallucinated actions, լուռ timeouts, drift, ծախսի թռիչքներ, կառուցում է eval suite իրական խոսակցություններից, ավելացնում guardrails և monitoring և cutover է անում production 2-4 շաբաթում։",
        supportLine:
          "Լավագույնս համապատասխանում է թիմերին, որոնք արդեն ներդրել են գործակալի մեջ և պետք ունեն production-վստահություն, ոչ թե «նորից սկսենք» pitch։",
      },
      workflow: {
        label: "Աշխատանքային հոսքի դիագրամ",
        intake: ["Գործող գործակալի կոդ", "Իրական խոսակցությունների լոգեր", "Խափանումների հաշվետվություններ"],
        agentLabel: "Agent rescue լուծում",
        review: ["High-risk գործողություններ", "Eval ձախողումներ", "Cutover-ի հաստատում"],
        outcomes: ["Failure modes-ի քարտեզ", "Անցնող eval suite", "Monitoring-ով production գործակալ"],
      },
      contrast: {
        painTitle: "Ինչ է փոխարինում",
        painPoints: [
          "Գործակալ, որ դեմոյում լավ է երևում, բայց իրական օգտատերերի գալուց հետո գործողություններ է հորինում, լուռ ընկնում է timeout-ով կամ drift-վում է։",
          "Դեբագ անեկդոտներով՝ մեկ վատ տրանսկրիպտը prompt-ի ուղղում է առաջացնում, և ոչ ոք չգիտի՝ նախորդ խափանումն իրոք ուղղվե՞լ է։",
          "Token-ների ծախս, որ աճում է առանց owner-ի, քանի որ ոչ ոք չի չափում, թե գործակալն ինչ է անում ամեն խոսակցությունում։",
        ],
        outcomeTitle: "Ինչ է ստեղծում",
        outcomePoints: [
          "Severity-ով դասավորված քարտեզ իրական failure modes-ի՝ production խոսակցություններից, ոչ թե ենթադրություններից։",
          "Eval suite, որ թիմը վերագործարկում է ամեն փոփոխության ժամանակ, որ ֆիքսը ֆիքս մնա։",
          "Guardrails, approval gates և monitoring, որոնց հետ գործակալին աշխատող թողնելը անվտանգ է։",
        ],
      },
      pilot: {
        label: "Scope-ի ճշգրիտ ֆիքսված սահման",
        fixedOutcome:
          "Մեկ գործակալ, մեկ production գործընթաց, գրավոր failure modes-ի տրիաժ, eval suite ներկայացուցչական խոսակցությունների վրա, guardrails և approval gates high-risk գործողությունների վրա, monitoring և production cutover 2-4 շաբաթում։",
        includes: [
          "1 գործող գործակալ կամ AI փորձնական, ով էլ կառուցած լինի՝ վենդոր, ֆրիլանսեր կամ in-house",
          "failure modes-ի տրիաժ՝ hallucinated actions, լուռ timeouts, drift, ծախսի թռիչքներ",
          "eval suite իրական խոսակցություններից՝ համաձայնեցված անցման շեմով",
          "guardrails, approval gates high-risk գործողությունների համար և production monitoring",
          "production cutover լոգերով և rollback ուղիով",
        ],
        excludes: [
          "Ամբողջական rebuild զրոյից, երբ գործող գործակալը կարելի է վերանորոգել",
          "Նոր feature-ների մշակում այն սահմանից դուրս, ինչ rescue-ին ինքնին պետք է",
          "Բազմագործակալ պորտֆելի rescue մեկ լուծումում",
        ],
      },
      integrations: {
        label: "Ինտեգրացիաներ և օրինակներ",
        intro:
          "Փաթեթը աշխատում է այն stack-ի վրա, որտեղ գործակալն արդեն ապրում է։ Նպատակը production-ում վստահելի գործակալ է, ոչ թե պլատֆորմի միգրացիա։",
        items: [
          "Գործակալներ OpenAI, Anthropic, LangChain, LangGraph կամ custom stack-երի վրա",
          "CRM, helpdesk և ներքին գործիքներ, որոնց գործակալն արդեն դիպչում է",
          "Tracing և eval գործիքներ ձեր stack-ում, թիմի կողմից վերագործարկելի",
          "Slack, Telegram կամ email ալերտներ guardrails և monitoring իրադարձությունների համար",
        ],
      },
      guardrails: {
        label: "Պաշտպանիչներ և հաստատում",
        intro:
          "Փրկված գործակալը վստահություն է վաստակում՝ ընկնելով տեսանելի և էժան, մինչև նրան նորից թույլ կտան միայնակ գործել։",
        items: [
          "High-risk գործողությունները գնում են approval gates-ի հետևը, մինչև eval suite-ը հակառակը չասի։",
          "Գործակալի ամեն գործողություն լոգավորվում է այն context-ի հետ, որն այն առաջացրել է։",
          "Ծախսի և latency բյուջեները հստակ են՝ ալերտներով, երբ գործակալը խախտում է դրանք։",
          "Հին վարքագիծը մնում է հասանելի rollback-ի համար, մինչև cutover-ի ապացույցը կայուն է։",
        ],
      },
      validation: {
        acceptanceTest:
          "Համաձայնեցրեք eval pass rate իրական խոսակցությունների ներկայացուցչական հավաքածուի վրա։ Rescue-ն անցնում է միայն երբ գործակալը հասնում է այդ ցուցանիշին, high-risk գործողությունները կանգնում են approval gates-ում, և monitoring-ը ցույց է տալիս ծախսն ու latency-ն համաձայնեցված բյուջեի սահմաններում։",
        measures: [
          "Eval pass rate ներկայացուցչական խոսակցությունների հավաքածուի վրա",
          "Hallucinated կամ չարտոնված գործողությունների մասնաբաժին",
          "Լուռ խափանումների և timeout-ների մասնաբաժին",
          "Խոսակցության արժեքը բյուջեի համեմատ",
          "Էսկալացիայի և approval gate-ի հաճախականություն",
        ],
        commercialModel:
          "Աուդիտը ֆիքսում է failure modes-ը, eval հավաքածուն և անցման շեմը։ Այնուհետև Dali-ը գնահատում է մեկ fixed-scope, fixed-price rescue։ Աշխատանքը սկսվում է հաստատումից հետո, իսկ գործակալի ավելի լայն roadmap-ը առանձին որոշում է։",
      },
      delivery: [
        {
          title: "Failure modes-ի տրիաժ",
          body:
            "Կարդում ենք իրական production խոսակցություններն ու լոգերը, անվանում ենք իրական failure modes-ը՝ hallucinated actions, լուռ timeouts, drift, ծախսի թռիչքներ, և դասավորում ըստ վնասի։",
        },
        {
          title: "Eval suite-ի կառուցում և ֆիքս",
          body:
            "Ներկայացուցչական խոսակցությունները դարձնում ենք վերագործարկելի eval suite, ապա ուղղում ենք guardrails-ը, prompt-ները, գործիքները և state-ի կառավարումը, մինչև suite-ն անցնի համաձայնեցված շեմը։",
        },
        {
          title: "Cutover monitoring-ով",
          body:
            "Գործակալը վերադառնում է production approval gates-ի հետևում՝ monitoring-ով, բյուջեներով և rollback ուղիով, մեկնարկից 2-4 շաբաթում։",
        },
      ],
      fit: {
        fit: [
          "Գործակալը կամ AI փորձնականն արդեն կա և դեմոյում բավական լավ էր աշխատում, որ արժենա փրկել։",
          "Ունեք իրական խոսակցություններ կամ լոգեր, որոնցից eval suite կկառուցվի։",
          "Ձեր կողմից ինչ-որ մեկը կարող է անվանել high-risk գործողությունները և հաստատել անցման շեմը։",
        ],
        notFit: [
          "Աշխատող նախատիպ դեռ չկա. դա կառուցում է, ոչ թե rescue։",
          "Գործընթացն այնքան է փոխվել, որ գործակալի աշխատանքն այլևս գոյություն չունի։",
          "Ոչ ոք չի կարող տիրապետել հաստատումներին կամ ընդունել eval շեմը։",
        ],
      },
      faqs: [
        {
          question: "Գործակալը կառուցել է այլ վենդոր։ Դա խնդի՞ր է։",
          answer:
            "Ոչ։ Rescue-երի մեծ մասը հենց այնտեղից է սկսվում։ Կարդում ենք կոդը և խոսակցությունները, պահում ենք այն, ինչ աշխատում է, և փոխում այն, ինչ ընկնում է։ Մեղավոր փնտրելը փաթեթի մեջ չի մտնում։",
        },
        {
          question: "Ինչո՞ւ eval suite, այլ ոչ պարզապես բագերի ուղղում։",
          answer:
            "Որովհետև առանց դրա ամեն ֆիքս անեկդոտ է։ Eval suite-ը «հիմա աշխատում է»-ն դարձնում է չափելի պնդում, որ թիմը կարող է վերստուգել ամեն փոփոխությունից հետո։",
        },
        {
          question: "Զրոյից նորի՞ց կկառուցեք։",
          answer:
            "Միայն եթե տրիաժը ցույց տա, որ վերանորոգումն ավելի թանկ է, քան rebuild-ը, և այդ որոշումը գրավոր ֆիքսվում է աշխատանքից առաջ։ Ամբողջական rebuild-ը գիտակցաբար այս լուծումի scope-ից դուրս է։",
        },
      ],
      cta: {
        publicLabel: "Սկսել agent rescue աուդիտը",
        publicBody:
          "Ուղարկեք, թե ինչ պետք է անի գործակալը, որտեղ է ընկնում, և իրական խոսակցությունների նմուշ։ Dali-ը կպատասխանի failure modes-ի տրիաժի պլանով, eval մոտեցմամբ և ֆիքսված rescue սահմանով։",
        intakeFields: [
          "Ով է կառուցել գործակալը և ինչ stack-ի վրա է աշխատում",
          "Ինչ պետք է անի և ինչ է իրականում կատարվում production-ում",
          "Իրական խոսակցությունների կամ լոգերի նմուշ, խմբագրվածը նույնպես լավ է",
          "Գործողություններ, որոնք պետք է մնան մարդու հաստատման հետևում",
        ],
        upworkLabel: "Տեսնել ինչ ուղարկել Upwork-ում",
        upworkBody:
          "Պատասխանեք Upwork-ում գործակալի stack-ով, ամենահաճախ խափանումով և նրանով՝ կարո՞ղ եք կիսվել խոսակցությունների լոգերով։ Dali-ը կպատասխանի տրիաժի պլանով և ֆիքսված rescue սահմանով։",
      },
    },
    "assistants-migration": {
      slug: "assistants-migration",
      name: "Assistants API միգրացիա",
      summary:
        "Ժամկետով սահմանափակ միգրացիա OpenAI Assistants API-ից մինչև 2026 թ. օգոստոսի 26-ի shutdown-ը՝ բոլոր call-երի mapping, state-ի և threads-ի տեղափոխում, side-by-side evals և cutover առանց downtime-ի։",
      accent: "#0B3A4A",
      accentSoft: "#E4F0F3",
      tint: "#f4f9fa",
      metadata: {
        title: "Assistants API միգրացիա | Dali",
        description:
          "Միգրացիա OpenAI Assistants API-ից Responses API 2026 թ. օգոստոսի 26-ի shutdown-ից առաջ՝ call mapping, state-ի և threads-ի տեղափոխում, side-by-side eval գործարկումներ, zero-downtime cutover և thread տվյալների արտահանում։",
      },
      hero: {
        eyebrow: "Փաթեթավորված լուծում · ժամկետային",
        title:
          "Assistants API-ն անջատվում է 2026 թ. օգոստոսի 26-ին։ Միգրացվեք, մինչև դա վթար դառնա։",
        lead:
          "OpenAI-ը փակում է /v1/assistants, /v1/threads և /v1/runs-ը 2026 թ. օգոստոսի 26-ին, և Azure հայելին գնում է նույն պատուհանում։ Dali-ը ձեր ինտեգրացիան Responses API տեղափոխում է 1-2 շաբաթում՝ ամեն call-ի mapping, state-ի և threads-ի տեղափոխում, side-by-side evals և cutover առանց downtime-ի, thread տվյալների արտահանումով shutdown-ից առաջ։",
        supportLine:
          "Լավագույնս համապատասխանում է թիմերին, որոնք ունեն աշխատող Assistants API ինտեգրացիա և ուզում են պլանավորված միգրացիա հիմա, ոչ թե վթարային rebuild անջատման կեսին 3-5x գնով։",
      },
      workflow: {
        label: "Աշխատանքային հոսքի դիագրամ",
        intake: ["Assistants API calls", "Thread և run state", "Prompt-ներ և tool config-ներ"],
        agentLabel: "Assistants միգրացիա",
        review: ["Վարքագծի դիֆեր", "Eval ռեգրեսիաներ", "Cutover-ի հաստատում"],
        outcomes: ["Ինտեգրացիա Responses API-ի վրա", "Side-by-side eval հաշվետվություն", "Արտահանված thread տվյալներ"],
      },
      contrast: {
        painTitle: "Ինչ է փոխարինում",
        painPoints: [
          "Production ինտեգրացիա /v1/assistants, /v1/threads և /v1/runs-ի վրա՝ կցված կոշտ անջատման ամսաթվով։",
          "Ենթադրություն, թե սա endpoint-ների փոխանակում է, երբ փոխվում են state-ի կառավարումը, ծախսի մոդելը և feature-ների պարիտետը։",
          "Սպասել մինչև վերջնաժամկետը, երբ վթարային rebuild-ը անջատման կեսին 3-5 անգամ ավելի թանկ է պլանավորված միգրացիայից։",
        ],
        outcomeTitle: "Ինչ է ստեղծում",
        outcomePoints: [
          "Assistants API-ի ամեն call զուգակցված է Responses API համարժեքի հետ, բացերը՝ գրավոր անվանված։",
          "State-ն ու threads-ը տեղափոխված են գիտակցաբար, ոչ թե կարկատված վթարի ժամանակ։",
          "Side-by-side eval գործարկում, որ ապացուցում է տեղափոխված վարքագիծը մինչև որևէ բան միացնելը։",
        ],
      },
      pilot: {
        label: "Scope-ի ճշգրիտ ֆիքսված սահման",
        fixedOutcome:
          "Մեկ Assistants API ինտեգրացիա՝ call-by-call mapping, տեղափոխում Responses API, ստուգում side-by-side eval գործարկումներով և cutover առանց downtime-ի, thread տվյալների արտահանումով shutdown-ից առաջ։",
        includes: [
          "1 production ինտեգրացիա /v1/assistants, /v1/threads կամ /v1/runs-ի վրա՝ OpenAI կամ Azure",
          "call-by-call mapping Responses API-ի վրա՝ ներառյալ ուղիղ պարիտետ չունեցող մասերը",
          "state-ի և threads-ի տեղափոխում ձեր վերահսկողության տակ գտնվող պահոց, որտեղ API-ն այլևս չի պահում դրանք",
          "side-by-side eval գործարկումներ հին և նոր վարքագծի համեմատության համար իրական դեպքերի վրա",
          "zero-downtime cutover և thread տվյալների արտահանում shutdown-ից առաջ",
        ],
        excludes: [
          "Նոր feature-ներ այն սահմանից դուրս, ինչ միգրացիան ինքնին պահանջում է",
          "Շրջապատող codebase-ի հետ չկապված ռեֆակտորինգ",
          "Ասիստենտի վարքագծի redesign. նախ պարիտետ, բարելավումները՝ հետո",
        ],
      },
      integrations: {
        label: "Ինտեգրացիաներ և օրինակներ",
        intro:
          "Փաթեթը տեղափոխում է այն ինտեգրացիան, որ ունեք, այն stack-ի վրա, որ ունեք։ Վերջնաժամկետը արտաքին է. միգրացիայի պլանը ձերն է։",
        items: [
          "OpenAI Assistants API և Azure OpenAI Assistants հայելին",
          "Responses API որպես թիրախ՝ խոսակցության state-ի տեղափոխումով ձեր պահոց",
          "Ձեր գործող backend-ը՝ Node, Python կամ ինչ էլ հյուրընկալում է ընթացիկ call-երը",
          "Eval գործարկումներ իրական խոսակցության դեպքերի վրա տեղափոխումից առաջ և հետո",
        ],
      },
      guardrails: {
        label: "Պաշտպանիչներ և հաստատում",
        intro:
          "Կոշտ արտաքին վերջնաժամկետով միգրացիան վստահություն է վաստակում՝ ապացուցելով պարիտետը միացումից առաջ, ոչ թե հետո։",
        items: [
          "Ոչ մի cutover, մինչև side-by-side eval գործարկումը չհամընկնի համաձայնեցված դեպքերի վրա։",
          "Thread տվյալները արտահանվում և ստուգվում են հին endpoint-ների անհետանալուց առաջ։",
          "Հին ինտեգրացիան շարունակում է աշխատել, մինչև նորը կայունանա production-ում։",
          "Ամեն զուգակցված call և հայտնի պարիտետի բաց գրվում է, ոչ թե հայտնաբերվում հետո։",
        ],
      },
      validation: {
        acceptanceTest:
          "Անցկացրեք համաձայնեցված դեպքերի հավաքածուն հին և նոր ինտեգրացիաների միջով զուգահեռ։ Միգրացիան անցնում է միայն երբ պատասխանները համընկնում են համաձայնեցված չափանիշներով, state-ը վերապրում է տեղափոխումը, thread տվյալները արտահանված և ստուգված են, և production-ը միանում է առանց downtime-ի։",
        measures: [
          "Զուգակցված և տեղափոխված call-երն ընդհանուրի համեմատ",
          "Side-by-side eval համընկնման մասնաբաժինը համաձայնեցված դեպքերի վրա",
          "Thread տվյալների արտահանման ամբողջականություն",
          "Downtime cutover-ի ընթացքում, նպատակը՝ զրո",
          "Խոսակցության արժեքը միգրացիայից առաջ և հետո",
        ],
        commercialModel:
          "Աուդիտը ֆիքսում է call-երի գույքագրումը, eval դեպքերը և cutover պլանը։ Այնուհետև Dali-ը գնահատում է մեկ fixed-scope, fixed-price միգրացիա։ 1-2 շաբաթվա պատուհանը ուժի մեջ է միայն քանի դեռ սա պլանավորված աշխատանք է. վերջնաժամկետը չի շարժվում։",
      },
      delivery: [
        {
          title: "Ինտեգրացիայի mapping",
          body:
            "Գույքագրում ենք ամեն Assistants API call, thread և run, որ ձեր կոդն անում է, և գրավոր ֆիքսում mapping-ը Responses API-ի վրա՝ ներառյալ այն տեղերը, որտեղ պարիտետ չկա։",
        },
        {
          title: "Տեղափոխում և ապացույց",
          body:
            "Տեղափոխում ենք call-երը և state-ի կառավարումը, ապա հին և նոր ինտեգրացիաները զուգահեռ գործարկում ենք իրական դեպքերի վրա, մինչև վարքագիծը համընկնի համաձայնեցված չափանիշներով։",
        },
        {
          title: "Cutover և արտահանում",
          body:
            "Production-ը միանում է Responses API-ին առանց downtime-ի, thread տվյալները արտահանված և ստուգված են, իսկ հին ուղին դուրս է գալիս ձեր գրաֆիկով, ոչ թե OpenAI-ի։",
        },
      ],
      fit: {
        fit: [
          "Ունեք production ինտեգրացիա Assistants API-ի վրա՝ ուղիղ կամ Azure-ի միջոցով։",
          "Կարող եք կիսվել այն կոդի ուղիներով, որոնք այն կանչում են, և իրական խոսակցությունների նմուշով։",
          "Ուզում եք սա փակել, մինչև վերջնաժամկետը ստիպի։",
        ],
        notFit: [
          "Ինտեգրացիան նախատիպ է, որից ոչ ոք կախված չէ. ջնջելը կարող է ավելի էժան լինել։",
          "Ուզում եք ասիստենտի ամբողջական redesign միգրացիայի պատուհանում։",
          "Ոչ ոք չի կարող հաստատել eval դեպքերը կամ cutover-ը։",
        ],
      },
      faqs: [
        {
          question: "Սա պարզապես endpoint-ների փոխանակո՞ւմ է։",
          answer:
            "Ոչ։ Responses API-ն փոխում է խոսակցության state-ի կառավարումը և ծախսի մոդելը, և feature-ների լիարժեք պարիտետ չկա։ Հենց դրա համար պլանավորված միգրացիան տևում է 1-2 շաբաթ, իսկ վթարայինը՝ անջատման կեսին, արժե 3-5x։",
        },
        {
          question: "Ի՞նչ կլինի մեր գործող threads-ի հետ։",
          answer:
            "Դրանք արտահանվում և ստուգվում են shutdown-ից առաջ, իսկ խոսակցության state-ը տեղափոխվում է ձեր վերահսկողության տակ գտնվող պահոց։ 2026 թ. օգոստոսի 26-ից հետո /v1/threads-ի տվյալները վերականգնելու վրա խաղադրույք դնել չարժե։",
        },
        {
          question: "Մենք Azure OpenAI-ի վրա ենք։ Վերջնաժամկետը մեզ վերաբերո՞ւմ է։",
          answer:
            "Այո։ Azure Assistants հայելին անջատվում է նույն պատուհանում, ուստի միգրացիայի ուղին և վերջնաժամկետի պլանավորումը նույնն են։",
        },
      ],
      cta: {
        publicLabel: "Սկսել միգրացիայի աուդիտը",
        publicBody:
          "Ուղարկեք, թե որտեղ է կանչվում Assistants API-ն, մոտավորապես քանի thread է կենդանի, և ով է կախված ինտեգրացիայից։ Dali-ը կպատասխանի call-երի գույքագրման պլանով, eval մոտեցմամբ և ֆիքսված միգրացիայի սահմանով։",
        intakeFields: [
          "Որտեղ է աշխատում ինտեգրացիան՝ OpenAI ուղիղ թե Azure",
          "Կոդի ուղիները կամ սերվիսները, որոնք կանչում են /v1/assistants, /v1/threads, /v1/runs",
          "Կենդանի thread-երի մոտավոր ծավալը և ինչն է դրանցից կախված",
          "Իրական խոսակցությունների նմուշ eval դեպքերի համար",
        ],
        upworkLabel: "Տեսնել ինչ ուղարկել Upwork-ում",
        upworkBody:
          "Պատասխանեք Upwork-ում stack-ով, Assistants API-ի կանչի տեղերով և thread-երի ծավալով։ Dali-ը կպատասխանի միգրացիայի պլանով և ֆիքսված scope սահմանով։",
      },
    },
  } as Record<PilotSourceSlug, PilotSourceContent>, familyShells),
  labels: {
    browseAllPilots: "Տեսնել բոլոր լուծումները",
    copyDetailedBrief: "Պատճենել մանրամասն brief-ը",
    briefCopied: "Brief-ը պատճենվեց",
    keepConversationOnPlatform: "Պահեք խոսակցությունը պլատֆորմի ներսում",
    returnToUpwork: "Վերադարձեք ձեր Upwork թելին և ուղարկեք վերը նշված մանրամասները։",
    humanReview: "Մարդկային վերանայում",
    liveOutcome: "Աշխատող արդյունք",
    painVersusOutcome: "Խնդիրը և արդյունքը",
    contrastTitle: "Ձգձգումը փոխարինեք մեկ հաստատված օպերացիոն ուղով։",
    pilotBoundary: "Փաթեթի սահման",
    boundaryTitle: "Ֆիքսված շրջանակ` նախքան ընդլայնումը։",
    included: "Ներառված է",
    excluded: "Գիտակցված դուրս է շրջանակից",
    systemSurfaces: "Համակարգի մակերեսներ",
    surfacesTitle: "Ինտեգրացիաներ, օրինակներ և վերահսկման կետեր։",
    acceptanceTest: "Ընդունման թեստ",
    validationTitle: "Նախապես իմացեք, թե ինչն է համարվում աշխատող։",
    passCondition: "Փաթեթի անցման պայման",
    measures: "Թիմի հետ վերանայվող չափումներ",
    deliveryEyebrow: "Երեք քայլով առաքում",
    deliveryTitle: "Մեկ գործնական rollout ուղի։",
    stepPrefix: "Քայլ",
    fitCheck: "Համապատասխանության ստուգում",
    fitTitle: "Ուժեղ համապատասխանություն, թույլ համապատասխանություն և այն, ինչ պետք չէ ստիպել։",
    goodFit: "Լավ համապատասխանություն",
    notFit: "Դեռևս չի համապատասխանում",
    faq: "Հաճախ տրվող հարցեր",
    faqTitle: "Գործնական հարցեր լուծումի մեկնարկից առաջ։",
    ctaEyebrow: "Գործողության կոչ",
    ctaTitle: "Սկսեք ամենանեղ, բայց օգտակար լուծումից։",
    sendUpwork: "Ինչ ուղարկել Upwork-ում",
    sendDali: "Ինչ ուղարկել Dali-ին",
    commercialModel: "Կոմերցիոն մոդել",
    commercialBody:
      "Dali-ը ձեզ չի խնդրում նախապես գնել լայն ավտոմատացման ծրագիր։ Մենք սահմանում ենք մեկ ընդունման թեստ, առաջարկում մեկ լուծում, կառուցում ենք համաձայնությունից հետո և ընդլայնում ենք շրջանակը միայն այն դեպքում, եթե առաջին աշխատանքային հոսքը անցնում է ստուգումը։",
    workflowAriaSuffix: "աշխատանքային հոսքի դիագրամ",
    chooseLane: "Choose a fixed lane",
    lanesTitle: "One system shell. Fixed lanes inside.",
    laneAcceptance: "Lane acceptance test",
    startWithLane: "Start with this lane",
    fixedPackage: "Ֆիքսված փաթեթ",
    priceFrom: "սկսած",
    priceRange: "Տիպիկ միջակայք",
    pricingNoteBundle: "Երկու fixed lane-ը` մեկ փաթեթում։",
    pricingNoteLane: "Մեկ մեկնարկային lane-ի համար։",
    guarantee: "Եթե ընդունման թեստը չի անցնում, դուք չեք վճարում։",
    foundingNote:
      "Founding հաճախորդի սակագին. առաջին 5 հաճախորդը ստանում է 25% զեղչ` մետրիկաներով հրապարակային քեյսի դիմաց։",
    careHandoff:
      "Գործարկումից հետո ամեն փաթեթ անցնում է Agent Care-ին. մոնիտորինգ, eval ռեգրեսիաներ և մեկ չափելի բարելավում ամսական։",
  },
} satisfies LocalizedSolutionsBundle;
