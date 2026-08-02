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


export const georgianSolutionsBundle = {
  overview: {
    metadata: {
      title: "AI აგენტები რეალური ოპერაციებისთვის | Dali",
      description:
        "Dali არჩევს ერთ ძვირადღირებულ პროცესს, აშენებს საწარმოო AI აგენტს იმავე ინსტრუმენტებში, რომლებსაც გუნდი უკვე იყენებს, და უშვებს მას ადამიანური შემოწმებით, მონიტორინგით და სრული საკუთრებით.",
    },
    hero: {
      eyebrow: "AI აგენტები რეალური ოპერაციებისთვის",
      title: "განმეორებადი სამუშაო გადაიყვანეთ ავტოპილოტზე.",
      lead:
        "Dali თავიდან ბოლომდე რუკავს ერთ მაღალი ღირებულების პროცესს, აშენებს საწარმოო AI აგენტს კლიენტის უკვე არსებულ ინსტრუმენტებში და უშვებს მას ადამიანური შემოწმებით, მონიტორინგით და სრული საკუთრებით.",
      primaryCta: "დაიწყეთ პროცესის აუდიტი",
      secondaryCta: "ნახეთ პაკეტირებული გადაწყვეტები",
      supportLine: "ერთი პროცესი. ერთი მიღების ტესტი. პლატფორმის მიგრაციის გარეშე.",
    },
    diagram: {
      ariaLabel: "პროცესის დიაგრამა",
      label: "არსებული შემომავალი წყაროები",
      inputs: ["ინბოქსი", "CRM", "ცხრილი"],
      agent: "Dali აგენტი",
      reviewTitle: "ადამიანის შემოწმება",
      reviewBody: "დამტკიცებები, გამონაკლისები, საბოლოო თანხმობა",
      actionTitle: "მოქმედება რეალურ დროში",
      actionBody: "პასუხები, განახლებები, ამოცანები, გადამისამართებული follow-up",
    },
    solutions: {
      kicker: "გადაწყვეტილებები",
      title: "ოპერაციული ხახუნი ჩაანაცვლეთ ერთი მკაფიოდ შემოსაზღვრული სისტემით.",
      beforeLabel: "მანამდე",
      before: [
        "ლიდები საერთო ინბოქსებში ელოდებიან.",
        "ოპერაციული სამუშაო იკარგება ჩატს, დოკუმენტებსა და ცხრილებს შორის.",
        "თანამშრომლები ისევ და ისევ იმეორებენ კითხვას, გადამისამართებას და განახლებას.",
      ],
      afterLabel: "შემდეგ",
      after: [
        "აგენტი მყისიერად იღებს პირველ ფენას სამუშაოს.",
        "ადამიანები ამოწმებენ მხოლოდ იმას, რასაც მართლა სჭირდება განსჯა.",
        "პროცესი ხდება ხილული, გაზომვადი და პასუხისმგებლობით მართული.",
      ],
      packagedPilot: "პაკეტირებული გადაწყვეტა",
      researchLane: "კვლევის მიმართულება",
      viewPilot: "ნახეთ გადაწყვეტა",
      viewResearch: "ნახეთ კვლევის მიმართულება",
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
      kicker: "პროცესი",
      title: "სამი ნაბიჯი არეულ პროცესიდან რეალურად გაშვებულ სისტემამდე.",
      steps: [
        {
          title: "აუდიტი",
          body:
            "ვრუკავთ ერთ პროცესს თავიდან ბოლომდე, ვზომავთ სად იკარგება დრო და ზუსტად ვადგენთ, რომელი დამტკიცების წერტილები უნდა დარჩეს ადამიანთან.",
        },
        {
          title: "აგება და გამეორება",
          body:
            "ვაშენებთ აგენტს უკვე გამოყენებულ stack-ში და შემდეგ ვამეორებთ რეალურ შემთხვევებს იქამდე, სანამ შედეგები საიმედო არ გახდება და გამონაკლისები თვალსაჩინო არ იქნება.",
        },
        {
          title: "გაშვება და გაუმჯობესება",
          body:
            "პროცესი გადადის live რეჟიმში მონიტორინგით, გამონაკლისების დამუშავებით და მჭიდრო უკუკავშირის ციკლით, რომ სისტემა გაშვების შემდეგაც ილესებოდეს.",
        },
      ],
    },
    proof: {
      kicker: "დამადასტურებელი გამოცდილება",
      title: "აშენებულია გუნდის მიერ, რომელიც უკვე უშვებს რეალურ სისტემებს.",
      viewProject: "ნახეთ პროექტი",
      cards: [
        {
          title: "agents.ge",
          body:
            "დადასტურება იმისა, რომ Dali-ს შეუძლია AI-first პროდუქტის სკოპირება, დიზაინი და გაშვება კონცეფციიდან საწარმოო ინჟინერიამდე.",
        },
        {
          title: "Stay & Work Georgia",
          body:
            "დადასტურება სტრუქტურირებული პროდუქტის მიწოდებისა სერვისულ ბიზნესში, სადაც ოპერაციები რთულია და მომხმარებლის გზა ნდობაზეა დამოკიდებული.",
        },
        {
          title: "Delivery Setup",
          body:
            "დადასტურება სისტემური აზროვნებისა იმ ბიზნესებისთვის, სადაც ყოველდღე პროცესის სიცხადე და საიმედო გადაბარება კრიტიკულია.",
        },
      ],
    },
    trust: {
      kicker: "ნდობა დიზაინშივე",
      title: "პრაქტიკული შეზღუდვები შეთავაზების ნაწილია.",
      points: [
        "მუშაობს იმ ინსტრუმენტებში, რომლებსაც გუნდი უკვე იყენებს",
        "ადამიანური დამტკიცება რჩება ციკლში იქ, სადაც რისკი რეალურია",
        "მონიტორინგი და გამონაკლისების დამუშავება გაშვების ნაწილია და არა შემდგომი აზრი",
        "კლიენტი ფლობს კოდს, მონაცემებს, prompt-ებს და ოპერაციულ IP-ს",
      ],
    },
    about: {
      kicker: "ჩვენ შესახებ",
      title: "ინჟინერია და ოპერაციები ერთ სივრცეში.",
      founders: [
        {
          name: "David",
          role: "ინჟინერია",
          alt: "David, Dali-ის ინჟინერიის ლიდი",
          body:
            "აპროექტებს პროცესის ლოგიკას, ინტეგრაციის საზღვრებს და საწარმოო აგენტის ქცევას, რათა ავტომატიზაცია რეალურ ოპერაციულ დატვირთვაშიც საიმედო დარჩეს.",
        },
        {
          name: "Liana",
          role: "ოპერაციები",
          alt: "Liana, Dali-ის ოპერაციების ლიდი",
          body:
            "აყალიბებს პროცესის სიცხადეს, გამონაკლისების მართვას და rollout-ის დისციპლინას, რათა სისტემა მოერგოს იმას, როგორ მუშაობს გუნდი ყოველდღიურად.",
        },
      ],
    },
    faq: {
      kicker: "FAQ",
      title: "მკაფიო საზღვრები მანამდე, სანამ რამე აშენდება.",
      items: [
        {
          question: "ყველა კომპანიისთვის გამოდგება ეს?",
          answer:
            "არა. საუკეთესო ვარიანტია გუნდი, რომელსაც აქვს ერთი განმეორებადი პროცესი, რომელიც უკვე საკმარისად ხშირად ხდება, რომ რეალური ოპერაციული გასუფთავება და ავტომატიზაცია ღირდეს.",
        },
        {
          question: "რას მოიცავს რეალურად 30-დღიანი მოცულობა?",
          answer:
            "ერთ ფოკუსირებულ პროცესს. ვირჩევთ ყველაზე ხახუნიან გზას, ვაშენებთ მის გარშემო ოპერაციულ ლოგიკას და ვუშვებთ ამ სისტემას მანამდე, სანამ რამე უფრო ფართოზე ვიფიქრებთ.",
        },
        {
          question: "გვჭირდება ინსტრუმენტების შეცვლა ან პლატფორმის მიგრაცია?",
          answer:
            "როგორც წესი, არა. ნაგულისხმევი მიდგომაა ინტეგრაცია იმ inbox-ებთან, CRM-ებთან, ცხრილებთან, docs-თან და მესიჯინგ სისტემებთან, რომლებსაც გუნდი უკვე იყენებს.",
        },
        {
          question: "როგორ მართავთ მონაცემებს და უსაფრთხოებას?",
          answer:
            "ვზღუდავთ წვდომას მინიმუმამდე, ვადგენთ დამტკიცების საზღვრებს და პროცესს ვტოვებთ დაკვირვებადს. სენსიტიური ქმედებები შეიძლება გაიაროს მკაფიო ადამიანური შემოწმებით სრული ავტონომიის ნაცვლად.",
        },
        {
          question: "შიდა AI გუნდი გვჭირდება ამის სამართავად?",
          answer:
            "არა. მიზანი ისაა, რომ ერთი პროცესი გამოსაყენებელი გახდეს იმ გუნდისთვის, რომელიც მას ისედაც ფლობს, ცალკე შიდა AI ფუნქციის შექმნის გარეშე.",
        },
        {
          question: "რა ხდება გაშვების შემდეგ?",
          answer:
            "Dali შეიძლება დარჩეს მონიტორინგისა და გაუმჯობესებისთვის, ან გადააბაროს დოკუმენტაცია და საკუთრება ისე, რომ კლიენტის გუნდმა პროცესი თავად მართოს.",
        },
      ],
    },
    contact: {
      kicker: "კონტაქტი",
      title: "დაიწყეთ იმ პროცესით, რომელიც დღეს ყველაზე მეტ ყურადღებას ჭამს.",
      body:
        "Dali აუდიტს უკეთებს პროცესს, აყალიბებს დამტკიცების მოდელს და აჩვენებს, რა შეიძლება რეალისტურად გავიდეს live რეჟიმში ფოკუსირებულ 30-დღიან თანამშრომლობაში.",
      cta: "დაიწყეთ პროცესის აუდიტი",
    },
  },
  details: buildSolutionsCatalog({
    "lead-response": {
      slug: "lead-response",
      name: "ლიდებზე რეაგირება",
      summary:
        "პაკეტირებული გადაწყვეტა გუნდებისთვის, რომლებიც კარგავენ იმპულსს მოთხოვნას, კვალიფიკაციასა და დაჯავშნილ შემდეგ ნაბიჯს შორის.",
      accent: "#1E3A8A",
      accentSoft: "#E9EDFF",
      tint: "#fff5ef",
      metadata: {
        title: "ლიდებზე რეაგირება | Dali",
        description:
          "პაკეტირებული გადაწყვეტა შემომავალი ლიდების საკვალიფიკაციოდ, დამტკიცებული პირველი პასუხების გასაგზავნად და CRM follow-up-ის სამართავად ისე, რომ გაყიდვების სრულ ავტომატიზაციას არ ასახიერებდეს.",
      },
      hero: {
        eyebrow: "პაკეტირებული გადაწყვეტა",
        title: "აღარ დაკარგოთ კვალიფიცირებული ლიდები პირველ შეტყობინებასა და CRM-ს შორის.",
        lead:
          "Dali ერთ შემომავალ პროცესს აფუთავს ზედამხედველობით მართულ AI სისტემად, რომელიც აგზავნის პირველ პასუხს, აკვალიფიცირებს თქვენს წესებთან, ანახლებს pipeline-ს, ჯავშნის შემდეგ ნაბიჯს ან follow-up-ს და სენსიტიურ შემთხვევებს სრული ლოგებით გადასცემს ადამიანს.",
        supportLine:
          "საუკეთესოა სერვისული ბიზნესებისთვის, სააგენტოებისთვის და ოპერატორებისთვის, რომლებსაც რეალური შემომავალი მოცულობა აქვთ, მაგრამ პირველი პასუხი არათანმიმდევრულია.",
      },
      workflow: {
        label: "პროცესის დიაგრამა",
        intake: ["Forms", "Email", "WhatsApp ან Telegram"],
        agentLabel: "ლიდებზე რეაგირება",
        review: [
          "ინდივიდუალური ფასები",
          "Enterprise დონის გამონაკლისები",
          "დაბალი ნდობის ლიდები",
        ],
        outcomes: ["პირველი პასუხი", "საკვალიფიკაციო ჩანაწერები", "CRM განახლება ან დაჯავშნილი ზარი"],
      },
      contrast: {
        painTitle: "რას ანაცვლებს",
        painPoints: [
          "საერთო ინბოქსებს, სადაც თბილი ლიდები რჩება მანამდე, სანამ ვინმე მათ შეამჩნევს.",
          "დამფუძნებლებს, რომლებიც თავიდან წერენ ერთსა და იმავე პირველ პასუხს და საკვალიფიკაციო კითხვებს.",
          "CRM ეტაპებს, რომლებიც რეალობას ჩამორჩება და follow-up მართვის ნაცვლად გამოცნობით კეთდება.",
        ],
        outcomeTitle: "რას ქმნის",
        outcomePoints: [
          "ყველა შემომავალი ლიდი იღებს მყისიერ პირველ პასუხს დამტკიცებულ ტონში.",
          "კვალიფიკაცია ხდება ერთი თანმიმდევრული playbook-ით და არა გუნდის მეხსიერებით.",
          "ადამიანები ერთვებიან მხოლოდ ფასზე, ნიუანსზე ან მაღალი რისკის გაყიდვის მომენტზე.",
        ],
      },
      pilot: {
        label: "scope-ის ზუსტი ფიქსირებული საზღვარი",
        fixedOutcome:
          "ერთი ან ორი შემომავალი არხი, ერთი CRM, ერთი საკვალიფიკაციო პოლიტიკა, ერთი დაჯავშნის ან follow-up მარშრუტი და ერთი ადამიანური ესკალაციის რიგი, live რეჟიმში deduplication-ით, do-not-contact ლოგიკით და ლოგებით.",
        includes: [
          "1 ლიდის წყაროს კლასტერი, მაგალითად website form და shared inbox",
          "1 დამტკიცებული პირველი პასუხის playbook ინგლისურად",
          "1 CRM ან calendar ქმედების გზა",
          "სამუშაო საათების დაფარვა თვალსაჩინო ესკალაციის წესებით",
        ],
        excludes: [
          "Outbound prospecting ან cold outreach",
          "ინდივიდუალური შეთავაზებების წერა",
          "ავტონომიური ფასდადება, ფასდაკლებები ან კონტრაქტული ვალდებულებები",
        ],
      },
      integrations: {
        label: "ინტეგრაციები და მაგალითები",
        intro:
          "ამ პაკეტისთვის ტიპური stack კომბინაციები მოიცავს იმ ინსტრუმენტებს, რომლებსაც გაყიდვების ან დამფუძნებლების გუნდი უკვე იყენებს.",
        items: [
          "HubSpot, Pipedrive ან სტრუქტურირებული Google Sheet",
          "Gmail, Outlook, WhatsApp ან Telegram inbox-ები",
          "Calendly ან პირდაპირი booking handoff",
          "Typeform ან website contact form intake",
        ],
      },
      guardrails: {
        label: "შეზღუდვები და დამტკიცება",
        intro:
          "სისტემა ისეა აწყობილი, რომ სარგებელი მოუტანოს მანამდე, სანამ თამამი გახდება. სენსიტიური მომენტები ადამიანთან რჩება.",
        items: [
          "ფასზე, ვადებზე ან მოცულობაზე დაპირებები არ კეთდება მკაფიო დამტკიცების გარეშე.",
          "ყველა გამავალი შეტყობინება ლოგდება იმ საწყისი კონტექსტით, რომლითაც შეიქმნა.",
          "დაბალი ნდობის ლიდები გადამისამართდება ადამიანთან და არ გაივლის გამოცნობით.",
          "ესკალაციის წესები ხილულია და რეპეტიციის დროს შეიძლება შესწორდეს.",
        ],
      },
      validation: {
        acceptanceTest:
          "გავატაროთ 20 რეპრეზენტატიული შემომავალი საუბარი. პაკეტი გადის მხოლოდ მაშინ, თუ ყველა მოვლენა დალოგილია, CRM-ში დუბლირებული ჩაწერები 0-ზე რჩება, სავალდებულო CRM ველები მინიმუმ 90%-ით არის შევსებული და ყველა დაბალი ნდობის ან სენსიტიური შემთხვევა ჩერდება ადამიანური შემოწმებისთვის.",
        measures: [
          "დრო პირველ პასუხამდე",
          "სწორი კვალიფიკაციისა და გადამისამართების მაჩვენებელი",
          "CRM ჩაწერის წარმატება და დუბლირების მაჩვენებელი",
          "კვალიფიცირებულიდან დაჯავშნილზე კონვერსია",
          "გრაფიკით შესრულებული follow-up-ები",
          "ადამიანური რევიუს მაჩვენებელი მიზეზის მიხედვით",
        ],
        commercialModel:
          "აუდიტი განსაზღვრავს საზღვარს. თუ პაკეტი სიცოცხლისუნარიანია, Dali აგზავნის ფიქსირებული მოცულობისა და ფიქსირებული ფასის მქონე milestone-ს. აგება იწყება მხოლოდ დამტკიცების შემდეგ და ნებისმიერი უფრო ფართო rollout ცალკე გადაწყვეტილებაა.",
      },
      delivery: [
        {
          title: "რეაგირების გზის რუკვა",
          body:
            "ვაკვირდებით რეალურ inbox პროცესს, საკვალიფიკაციო კითხვებს და CRM handoff-ს, რათა პაკეტი დაეფუძნოს იმას, როგორ მოდის ლიდები დღეს და არა ჰიპოთეტურ funnel-ს.",
        },
        {
          title: "რეპეტიცია რეალურ მაგალითებზე",
          body:
            "ვატარებთ ბოლო შემომავალი მიმოწერების განმეორებას, ვამუშავებთ გადაწყვეტილების წესებს და ზუსტად ვკეტავთ დამტკიცების წერტილებს მანამდე, სანამ რამე live რეჟიმში უპასუხებს.",
        },
        {
          title: "პაკეტირებული გადაწყვეტას გაშვება",
          body:
            "პაკეტი გადის შეთანხმებულ რიგზე მონიტორინგით, გამონაკლისების დამუშავებით და ისეთი ვიწრო მოცულობით, რომლის ფლობაც პრაქტიკულად შესაძლებელია.",
        },
      ],
      fit: {
        fit: [
          "უკვე იღებთ იმდენ შემომავალს, რომ პროცესი დისციპლინას ამართლებდეს.",
          "პირველი პასუხი გარკვეულ ნიმუშებს მიჰყვება, თუნდაც დახურვის ზარი ადამიანთან რჩებოდეს.",
          "თქვენს მხარეს ვინმეს შეუძლია საკვალიფიკაციო playbook სწრაფად დაამტკიცოს.",
        ],
        notFit: [
          "ყველა ლიდს სასარგებლო პასუხამდე ინდივიდუალური სკოპირება სჭირდება.",
          "თქვენს გუნდს უნდა სრულად ავტონომიური closer და არა დამტკიცებული პირველი ფენის სისტემა.",
          "შემომავალი მოცულობა ძალიან დაბალია სასარგებლო რეპეტიციის მონაცემებისთვის.",
        ],
      },
      faqs: [
        {
          question: "შეუძლია გარიგების თვითონ დახურვა?",
          answer:
            "არა. ეს პაკეტი არის უფრო სწრაფი intake-ისთვის, თანმიმდევრული კვალიფიკაციისთვის და უფრო სუფთა follow-up-ისთვის. დახურვის განსჯა ადამიან გამყიდველთან რჩება.",
        },
        {
          question: "შეუძლია პასუხების ავტომატურად გაგზავნა?",
          answer:
            "კი, თუ შეტყობინების კლასი დაბალი რისკისაა და დამტკიცების საზღვარი მკაფიოა. სხვა შემთხვევაში იგი ამზადებს მონახაზს და გზავნის რევიუსთვის.",
        },
        {
          question: "რა ხდება, თუ ჩვენი ლიდების ნაკადი კვირიდან კვირამდე ძლიერ იცვლება?",
          answer:
            "ეს შესაძლებელია, თუ პირველი ფენის კითხვები მაინც სტაბილურია. თუ ყოველი მოთხოვნა წესებს ცვლის, გაშვებამდე პაკეტის მოცულობა უფრო უნდა დავავიწროვოთ.",
        },
      ],
      cta: {
        publicLabel: "დაიწყეთ ლიდებზე რეაგირების აუდიტი",
        publicBody:
          "თუ ეს ემთხვევა პროცესს, რომლის გასწორებაც პირველ რიგში გსურთ, გამოგვიგზავნეთ intake-ის დეტალები და Dali გიპასუხებთ პაკეტის მონახაზით, დამტკიცების რუკით და საზღვრის წინაპირობებით.",
        intakeFields: [
          "ლიდების წყაროები და დაახლოებით კვირეული მოცულობა",
          "არსებული პირველი პასუხისა და კვალიფიკაციის გზა",
          "CRM ან calendar, რომელმაც შედეგი უნდა მიიღოს",
          "შემთხვევები, რომლებიც ყოველთვის ადამიანურ შემოწმებას უნდა დაელოდოს",
        ],
        upworkLabel: "ნახეთ, რა უნდა გააგზავნოთ Upwork-ში",
        upworkBody:
          "უპასუხეთ Upwork-ში თქვენი ლიდების წყაროებით, მიმდინარე რეაგირების გზით და CRM-ით. Dali გიპასუხებთ ამ ზუსტი პროცესისთვის ფიქსირებული პაკეტის საზღვრით.",
      },
    },
    "client-inbox": {
      slug: "client-inbox",
      name: "კლიენტის ინბოქსის პაკეტი",
      summary:
        "პაკეტირებული გადაწყვეტა გუნდებისთვის, რომლებსაც სჭირდებათ სწრაფი და კონტექსტზე დაფუძნებული მომხმარებლის პასუხები ისე, რომ აგენტს სენსიტიური ქმედებების იმპროვიზაციის უფლება არ მიეცეს.",
      accent: "#1E3A8A",
      accentSoft: "#E9EDFF",
      tint: "#fff6f0",
      metadata: {
        title: "კლიენტის ინბოქსის პაკეტი | Dali",
        description:
          "პაკეტირებული გადაწყვეტა ერთი მომხმარებლის chat ან email პროცესისთვის, კონტექსტზე დაფუძნებული პასუხებით, CRM ისტორიით, დამტკიცებული ქმედებებით და ადამიანური ესკალაციით.",
      },
      hero: {
        eyebrow: "პაკეტირებული გადაწყვეტა",
        title: "აქციეთ საერთო ინბოქსი ერთ კონტროლირებად რეაგირების გზად.",
        lead:
          "Dali აწყობს ერთი ფიქსირებული მოცულობის მომხმარებლის ინბოქსის პროცესს, რომელიც კითხულობს დამტკიცებულ კონტექსტს, ამზადებს ან აგზავნის რუტინულ პასუხებს, CRM-ში წერს საუბრის ისტორიას და ფაილებს, მედიას ან სენსიტიურ ქმედებებს აჩერებს ადამიანური შემოწმებისთვის.",
        supportLine:
          "საუკეთესოა მხარდაჭერისა და ოპერაციების გუნდებისთვის, რომლებიც ერთსა და იმავე პასუხებსა და ქმედებებს იმეორებენ chat-ში, email-ში, open line-ებში ან CRM რიგებში.",
      },
      workflow: {
        label: "პროცესის დიაგრამა",
        intake: ["Chat ან email", "ფაილები და მედია", "CRM კონტექსტი"],
        agentLabel: "კლიენტის ინბოქსის პაკეტი",
        review: ["სენსიტიური ქმედებები", "დაუდასტურებელი პასუხები", "პოლიტიკის გამონაკლისები"],
        outcomes: ["კონტექსტზე დაფუძნებული პასუხი", "CRM ისტორია", "ადამიანთან გადაბარება"],
      },
      contrast: {
        painTitle: "რას ანაცვლებს",
        painPoints: [
          "მომხმარებლის მიმოწერებს, რომლებიც ელოდება, რადგან კონტექსტი მიმოფანტულია chat-ში, ფაილებსა და CRM-ში.",
          "აგენტებს, რომლებიც თავიდან წერენ რუტინულ პასუხებს, მაშინ როცა სენსიტიური ქმედებები არათანმიმდევრულ წესებს მიჰყვება.",
          "საუბრის ისტორიასა და შემდეგ ნაბიჯებს, რომლებიც ქრება, როცა მოთხოვნა არხს ან პასუხისმგებელს იცვლის.",
        ],
        outcomeTitle: "რას ქმნის",
        outcomePoints: [
          "რუტინული პასუხები იყენებს ერთ დამტკიცებულ წყაროს, ტონს და ქმედების პოლიტიკას.",
          "ფაილები, მედია და გაურკვეველი მოთხოვნები ჩერდება ხილულ დამტკიცების საზღვარზე.",
          "ყველა პასუხი, ქმედება და ესკალაცია ბრუნდება შეთანხმებულ case history-ში.",
        ],
      },
      pilot: {
        label: "scope-ის ზუსტი ფიქსირებული საზღვარი",
        fixedOutcome:
          "ერთი მომხმარებლის არხი, ერთი პასუხისა და ქმედების პოლიტიკა, ერთი CRM ისტორიის გზა, live რეჟიმში ადამიანური ესკალაციის რიგით.",
        includes: [
          "1 მომხმარებლის არხი ან მჭიდროდ დაკავშირებული არხების წყვილი",
          "1 დამტკიცებული პასუხების წყარო და რეაგირების ტონი",
          "1 CRM ან case-history დანიშნულება",
          "ადამიანური შემოწმება სენსიტიური ქმედებებისთვის, დაუდასტურებელი პასუხებისთვის, ფაილებისთვის ან მედიისთვის",
        ],
        excludes: [
          "მომხმარებლის მხარდაჭერის მთელი გუნდის ჩანაცვლება",
          "ღია პასუხები დამტკიცებული წყაროების მიღმა",
          "ავტონომიური refund-ები, დაპირებები, account ცვლილებები ან შეუქცევადი ქმედებები",
        ],
      },
      integrations: {
        label: "ინტეგრაციები და მაგალითები",
        intro:
          "პაკეტი აერთებს იმ არხს, სადაც მომხმარებლის მოთხოვნები მოდის, იმ კონტექსტთან და ისტორიასთან, რომელსაც გუნდი უკვე ენდობა.",
        items: [
          "Email, website chat, CRM open line-ები, WhatsApp ან Telegram",
          "HubSpot, Bitrix24, Kommo, GoHighLevel ან სხვა case-history სისტემა",
          "დამტკიცებული help article-ები, policy note-ები, ფაილები და წარსულში მოგვარებული მიმოწერები",
          "ადამიანური დამტკიცება მედიისთვის, account ცვლილებებისთვის, კომერციული დაპირებებისთვის ან გაურკვეველი მოთხოვნებისთვის",
        ],
      },
      guardrails: {
        label: "შეზღუდვები და დამტკიცება",
        intro:
          "პროცესი სასარგებლოა მხოლოდ მაშინ, როცა ნათელია, რას შეიძლება უპასუხოს ასისტენტმა, რა შეიძლება გააკეთოს და სად უნდა გადაიბაროს ადამიანმა.",
        items: [
          "ყველა პასუხი ეფუძნება შემთხვევაზე მიბმულ დამტკიცებულ კონტექსტს.",
          "ფასზე, refund-ზე, account-ზე ან policy ვალდებულებაზე შეთანხმებული წესების მიღმა არაფერი ხდება.",
          "დაუდასტურებელი ან ურთიერთგამომრიცხავი მოთხოვნები გადამისამართდება სახელდებულ ადამიან პასუხისმგებელთან.",
          "პასუხები, ინსტრუმენტის ქმედებები, დამტკიცებები და წარუმატებლობები ხილული რჩება audit log-ში.",
        ],
      },
      validation: {
        acceptanceTest:
          "გავატაროთ 20 რეპრეზენტატიული მომხმარებლის მიმოწერა, ფაილებისა და გამონაკლისების ჩათვლით. პაკეტი გადის მხოლოდ მაშინ, თუ ყველა მოვლენა დალოგილია, არაუფლებამოსილი ქმედებები 0-ზე რჩება, გადამისამართება მინიმუმ 90% დამტკიცებულ შემთხვევებში სწორია და ყველა პასუხი, რომელსაც წყაროს მხარდაჭერა არ აქვს, ჩერდება ადამიანურ შემოწმებაზე.",
        measures: [
          "დრო პირველ სასარგებლო პასუხამდე",
          "გადამოწმებულ მიმოწერებში პასუხის მიღების მაჩვენებელი",
          "CRM ან case-history ჩაწერის წარმატება",
          "სწორი ესკალაციისა და არაუფლებამოსილი ქმედებების მაჩვენებელი",
        ],
        commercialModel:
          "აუდიტი აფიქსირებს ერთ არხს, წყაროების ერთ ნაკრებს, ქმედების პოლიტიკას და CRM გზას. ამის შემდეგ Dali აფასებს ფიქსირებული მოცულობისა და ფიქსირებული ფასის პაკეტს. აგება იწყება მხოლოდ დამტკიცების შემდეგ.",
      },
      delivery: [
        {
          title: "ერთი საუბრის გზის რუკვა",
          body:
            "ვირჩევთ განმეორებად მოთხოვნებს, დამტკიცებულ წყაროებს, პასუხის ტონს, ნებადართულ ქმედებებს და ზუსტ მომენტებს, როცა ადამიანია საჭირო.",
        },
        {
          title: "რეალური მომხმარებლის მიმოწერების გამეორება",
          body:
            "ვამოწმებთ რუტინულ კითხვებს, ფაილებს, მედიას, დაკარგულ კონტექსტს და სენსიტიურ შემთხვევებს იქამდე, სანამ გადამისამართება და დამტკიცების ქცევა თანმიმდევრული არ გახდება.",
        },
        {
          title: "გაშვება ხილული პასუხისმგებლობით",
          body:
            "არჩეული რიგი გადადის live რეჟიმში CRM ისტორიით, მონიტორინგით და მკაფიო handoff გზით ყველაფრისთვის, რაც პაკეტის საზღვარს სცდება.",
        },
      ],
      fit: {
        fit: [
          "ერთსა და იმავე მომხმარებლის კითხვები და ქმედებები საკმარისად ხშირად მეორდება რეპეტიციისთვის.",
          "გუნდს შეუძლია ზუსტად დაასახელოს, რომელი წყაროები და ქმედებები ითვლება დამტკიცებულად.",
          "დაუდასტურებელი ან სენსიტიური მოთხოვნებისთვის ხელმისაწვდომია ადამიანური პასუხისმგებელი.",
        ],
        notFit: [
          "ყველა საუბარი ინდივიდუალურ კომერციულ ან იურიდიულ განსჯას მოითხოვს.",
          "წყაროები მიუწვდომელია ან იმდენად წინააღმდეგობრივია, რომ რუტინულ პასუხებს ვერ ამყარებს.",
          "მიზანია ავტომატიზაციის დამალვა ან ადამიანური ესკალაციის სრულად მოხსნა.",
        ],
      },
      faqs: [
        {
          question: "შეუძლია უპასუხოს chat-შიც და email-შიც?",
          answer:
            "კი, მაგრამ პირველი პაკეტი ერთ არხზე ან მჭიდროდ დაკავშირებულ წყვილზე რჩება. დამატებითი არხები ცალკე გაფართოებაა მას შემდეგ, რაც რეაგირებისა და ლოგირების გზა იმუშავებს.",
        },
        {
          question: "შეუძლია გააგზავნოს ფაილები, მედია ან შეასრულოს CRM ქმედებები?",
          answer:
            "მხოლოდ ზუსტად ის დამტკიცებული ქმედებები, რომლებიც პაკეტის საზღვარშია. სენსიტიური მედია, account ცვლილებები, დაპირებები და გაურკვეველი მოთხოვნები შეიძლება მხოლოდ დამტკიცების რეჟიმში დარჩეს.",
        },
        {
          question: "რა ხდება, როცა ცოდნა არასრულია?",
          answer:
            "ასისტენტი პასუხს არ იგონებს. ის ქმნის handoff-ს საუბრის კონტექსტით, დაკარგული მტკიცებულებით და იმ შემდეგი გადაწყვეტილებით, რომელიც ადამიანმა უნდა მიიღოს.",
        },
      ],
      cta: {
        publicLabel: "დაიწყეთ კლიენტის ინბოქსის აუდიტი",
        publicBody:
          "გამოგვიგზავნეთ ერთი რეპრეზენტატიული მომხმარებლის მიმოწერა, ძირითადი არხი და CRM ან case-history სისტემა. Dali გიპასუხებთ replay ნაკრებით, დამტკიცების რუკით და ფიქსირებული პაკეტის საზღვრით.",
        intakeFields: [
          "ძირითადი მომხმარებლის არხი და დაახლოებით კვირეული მოცულობა",
          "ერთი რეპრეზენტატიული რუტინული საუბარი",
          "CRM, case history და დამტკიცებული ცოდნის წყაროები",
          "ქმედებები ან მოთხოვნები, რომლებსაც ყოველთვის ადამიანი უნდა დაელოდოს",
        ],
        upworkLabel: "ნახეთ, რა უნდა გააგზავნოთ Upwork-ში",
        upworkBody:
          "უპასუხეთ Upwork-ში ძირითადი მომხმარებლის არხით, CRM-ით და ერთი რეპრეზენტატიული მიმოწერით. Dali გიპასუხებთ ფიქსირებული პაკეტის საზღვრით და დამტკიცების წინაპირობებით.",
      },
    },
    "operations-docs": {
      slug: "operations-docs",
      name: "დოკუმენტებიდან ქმედებებზე გადასვლის პაკეტი",
      summary:
        "პაკეტირებული გადაწყვეტა, რომელიც ერთ განმეორებად email, PDF, form ან spreadsheet პროცესს გადააქცევს ვალიდირებულ ჩანაწერებად და შემდეგ ქმედებებად.",
      accent: "#1E3A8A",
      accentSoft: "#E9EDFF",
      tint: "#fff8f3",
      metadata: {
        title: "დოკუმენტებიდან ქმედებებზე გადასვლის პაკეტი | Dali",
        description:
          "პაკეტირებული გადაწყვეტა ოპერაციული მონაცემების ამოსაღებად და დასადასტურებლად, გამონაკლისების დასამტკიცებლად და იმ სისტემის გასაახლებლად, რომელსაც თქვენი გუნდი უკვე იყენებს.",
      },
      hero: {
        eyebrow: "პაკეტირებული გადაწყვეტა",
        title: "აქციეთ განმეორებადი დოკუმენტები ვალიდირებულ ქმედებებად.",
        lead:
          "Dali აწყობს ერთ ფიქსირებული მოცულობის intake-to-system პროცესს, რომელიც კითხულობს email-ებს, PDF-ებს, form-ებს, screenshot-ებს ან spreadsheet-ებს, ამოწმებს აუცილებელ ველებს, გამონაკლისებს აგზავნის დასამტკიცებლად და დამტკიცებულ შედეგს წერს იმ სისტემაში, რომელსაც თქვენი გუნდი უკვე იყენებს.",
        supportLine:
          "საუკეთესოა ოპერაციების გუნდებისთვის, რომლებიც ისევ და ისევ კოპირებენ, ამოწმებენ და გზავნიან ერთი და იმავე ტიპის ინფორმაციას inbox-ებსა და ბიზნეს სისტემებს შორის.",
      },
      workflow: {
        label: "პროცესის დიაგრამა",
        intake: ["Email ან PDF", "Form ან screenshot", "Spreadsheet-ის სტრიქონი"],
        agentLabel: "ოპერაციების პროცესის პაკეტი",
        review: ["დაკარგული ველები", "დუბლირებული ჩანაწერები", "წესებიდან გამონაკლისები"],
        outcomes: ["ვალიდირებული ჩანაწერი", "გადამისამართებული ამოცანა", "CRM ან ERP განახლება"],
      },
      contrast: {
        painTitle: "რას ანაცვლებს",
        painPoints: [
          "ოპერატორებს, რომლებიც ერთსა და იმავე ველებს attachments-იდან და inbox-ებიდან tracker-ებში ან ბიზნეს სისტემებში ხელით კოპირებენ.",
          "ჩუმ დუბლიკატებს, დაკარგულ მნიშვნელობებს და არასწორ ჩანაწერებს, რომლებიც მხოლოდ შემდეგი ნაბიჯის ჩაშლისას ჩანს.",
          "გამონაკლისებს, რომლებიც chat-ში იფლობა, რადგან ბედნიერი გზა და რევიუს გზა ერთმანეთშია არეული.",
        ],
        outcomeTitle: "რას ქმნის",
        outcomePoints: [
          "ერთ აუდიტირებად გზას განმეორებადი შემომავალიდან ვალიდირებულ სისტემურ განახლებამდე.",
          "ხილულ გამონაკლისების რიგს ყველაფრისთვის, რაც არასრულია, ეწინააღმდეგება წესებს ან შეთანხმებული საზღვრების გარეთაა.",
          "retry-ს, deduplication-ს და ქმედებების ჟურნალს, რათა გუნდმა ზუსტად ნახოს რა მოხდა და არ გამოიცნოს.",
        ],
      },
      pilot: {
        label: "scope-ის ზუსტი ფიქსირებული საზღვარი",
        fixedOutcome:
          "ერთი intake წყარო, ერთი ამოღების schema, ერთი სამიზნე სისტემა და ერთი დამტკიცების წესი, live რეჟიმში გამონაკლისების რიგით.",
        includes: [
          "1 განმეორებადი შემომავალი ტიპი, მაგალითად order email, invoice PDF ან intake form",
          "1 აუცილებელი data schema ვალიდაციის წესებით",
          "1 CRM, ERP, tracker ან task დანიშნულება",
          "Deduplication, retry-ები, დამტკიცება და აუდიტირებადი გამონაკლისების გზა",
        ],
        excludes: [
          "ყველა დოკუმენტისა და ოპერაციული პროცესის ერთდროული ავტომატიზაცია",
          "დაკარგული მნიშვნელობების გამოცნობა ან ორაზროვანი ჩანაწერების დამტკიცება",
          "პირველ პაკეტში საწყისი ან სამიზნე სისტემის ჩანაცვლება",
        ],
      },
      integrations: {
        label: "ინტეგრაციები და მაგალითები",
        intro:
          "ეს პაკეტი დგას იმ არხს შორის, სადაც ოპერაციული მონაცემები შემოდის, და იმ სისტემას შორის, სადაც გადამოწმებული ჩანაწერი ან ამოცანა უნდა გაჩნდეს.",
        items: [
          "Gmail, Outlook, Google Drive, forms, uploads ან watched folder-ები",
          "PDF-ები, screenshot-ები, spreadsheet-ები, order email-ები, invoice-ები ან application packet-ები",
          "HubSpot, Salesforce, Odoo, QuickBooks, Buildium ან Google Sheets",
          "Slack, Telegram, ClickUp ან email დამტკიცებებისთვის და გამონაკლისების შეტყობინებებისთვის",
        ],
      },
      guardrails: {
        label: "შეზღუდვები და დამტკიცება",
        intro:
          "ოპერაციული ავტომატიზაცია ნდობას მაშინ იმსახურებს, როცა გაურკვევლობასა და ჩავარდნას ხილულს ხდის და არა როცა ყველა შემომავალს ბედნიერი გზით ატარებს.",
        items: [
          "სავალდებულო ველები მოწმდება მანამდე, სანამ ქვემოთ მდებარე სისტემაში რაიმე ჩაიწერება.",
          "დუბლირებული შემომავლები აღმოჩნდება მანამდე, სანამ მეორე ჩანაწერს ან ქმედებას შექმნის.",
          "დაბალი ნდობის ამოღება და ბიზნეს წესებიდან გამონაკლისები სახელდებულ რევიუერთან ჩერდება.",
          "ყველა retry, დამტკიცება, ჩავარდნა და საბოლოო ჩაწერა audit trail-ში ხილული რჩება.",
        ],
      },
      validation: {
        acceptanceTest:
          "გავატაროთ 20 რეპრეზენტატიული შემომავალი შეთანხმებულ schema-ზე. პაკეტი გადის მხოლოდ მაშინ, თუ ჩუმი დუბლიკატები 0-ზე რჩება, ყველა მოვლენა დალოგილია, სავალდებულო ველები მინიმუმ 90%-ით სრულდება და ყველა დაკარგული, კონფლიქტური ან დაბალი ნდობის მნიშვნელობა ქმნის გამონაკლისის ჩანაწერს.",
        measures: [
          "გარჩევის მაჩვენებელი ხელით ჩასწორების გარეშე",
          "გამონაკლისების მაჩვენებელი მიზეზის მიხედვით",
          "დუბლირებული ქმედებების მაჩვენებელი",
          "დრო დამტკიცებულ სისტემურ განახლებამდე",
        ],
        commercialModel:
          "აუდიტი განსაზღვრავს შემომავალს, schema-ს, მიზნობრივ სისტემას და გამონაკლისების წესებს. შემდეგ Dali აფასებს ერთ ფიქსირებული მოცულობისა და ფიქსირებული ფასის milestone-ს. აგება იწყება დამტკიცების შემდეგ და არა მანამდე.",
      },
      delivery: [
        {
          title: "მიღების ტესტის განსაზღვრა",
          body:
            "ვირჩევთ ერთ რეპრეზენტატიულ შემომავალს, ვადგენთ საჭირო გამომავალი schema-ს და ზუსტად ვთანხმდებით, რომელი ჩანაწერები შეიძლება გავიდეს ავტომატურად და რომელი უნდა დაელოდოს რევიუს.",
        },
        {
          title: "რეალური შემომავლების გამეორება",
          body:
            "ვატარებთ ბოლო მაგალითებს extraction-ის, validation-ის, deduplication-ის და გამონაკლისების რიგის გავლით მანამდე, სანამ სისტემის ქცევა დაკვირვებადი და გამეორებადი არ გახდება.",
        },
        {
          title: "ერთი აუდიტირებადი გზის გაშვება",
          body:
            "არჩეული პროცესი გადადის live რეჟიმში დამტკიცებებით, retry-ებით, alert-ებით და ლოგებით მანამდე, სანამ მეორე დოკუმენტის ტიპი ან დანიშნულება დაემატება.",
        },
      ],
      fit: {
        fit: [
          "ერთი და იმავე ტიპის ოპერაციული შემომავალი საკმარისად ხშირად მოდის რეალურ მაგალითებზე რეპეტიციისთვის.",
          "სამიზნე ველები და ბიზნეს წესები შეიძლება მკაფიოდ დაიწეროს.",
          "პაკეტის დროს სახელდებული ოპერატორი ხელმისაწვდომია გამონაკლისების გადასახედად.",
        ],
        notFit: [
          "ყველა შემომავალს განსხვავებული სტრუქტურა აქვს და სტაბილური შემდეგი ქმედება არ არსებობს.",
          "გუნდს პირველივე milestone-ში მთელი back-office ოპერაციების ავტომატიზაცია უნდა.",
          "არავინ შეიძლება გადაწყვიტოს ორაზროვანი ჩანაწერი გავიდეს თუ გაჩერდეს.",
        ],
      },
      faqs: [
        {
          question: "რა ხდება, როცა ამოღება გაურკვეველია?",
          answer:
            "ჩანაწერი ჩერდება გამონაკლისების რიგში მიმაგრებული წყაროთი. პაკეტი არ გამოიცნობს არც დაკარგულ ველს და არც დაბალი ნდობის მნიშვნელობას.",
        },
        {
          question: "შეუძლია პირდაპირ ჩაწეროს ჩვენს CRM-ში ან ERP-ში?",
          answer:
            "კი, მას შემდეგ, რაც ჩანაწერი გაივლის შეთანხმებულ ვალიდაციას და დამტკიცების წესებს. უფრო მაღალი რისკის შემთხვევები პაკეტის განმავლობაში შეიძლება მონახაზის რეჟიმშიც დარჩეს.",
        },
        {
          question: "გვიწევს არსებული ინსტრუმენტების შეცვლა?",
          answer:
            "არა. იდეა ისაა, რომ ერთი განმეორებადი შემომავალი დაუკავშირდეს იმ სისტემას, რომელსაც გუნდი უკვე ეყრდნობა, და გზა ჯერ დაამტკიცოს, შემდეგ კი გაფართოვდეს.",
        },
      ],
      cta: {
        publicLabel: "დაიწყეთ დოკუმენტების პროცესის აუდიტი",
        publicBody:
          "გამოგვიგზავნეთ ერთი რეპრეზენტატიული შემომავალი, თქვენთვის საჭირო ამოსაღები ველები და სამიზნე სისტემა. Dali გიპასუხებთ ვიწრო მიღების ტესტით და ფიქსირებული პაკეტის საზღვრით.",
        intakeFields: [
          "ერთი რეპრეზენტატიული email, დოკუმენტი, form ან row",
          "გამომავალში საჭირო ველები და ვალიდაციის წესები",
          "CRM, ERP, tracker ან task სისტემა, რომელიც უნდა განახლდეს",
          "ვინ უნდა გადაამოწმოს გამონაკლისები ჩაწერამდე",
        ],
        upworkLabel: "ნახეთ, რა უნდა გააგზავნოთ Upwork-ში",
        upworkBody:
          "უპასუხეთ Upwork-ში ერთი რეპრეზენტატიული შემომავალით, საჭირო გამომავალი ველებით და სამიზნე სისტემით. Dali ამ ყველაფერს პირველ milestone-ის მიღების ტესტად გადააქცევს.",
      },
    },
    "knowledge-assistant": {
      slug: "knowledge-assistant",
      name: "ცოდნის ასისტენტის პაკეტი",
      summary:
        "პაკეტირებული გადაწყვეტა გუნდებისთვის, რომლებსაც სჭირდებათ სანდო პირველი პასუხი შიდა ცოდნიდან ისე, რომ დოკუმენტების სისუსტე ცრუ სისწორედ არ გადაიქცეს.",
      accent: "#1E3A8A",
      accentSoft: "#E9EDFF",
      tint: "#fff6f5",
      metadata: {
        title: "ცოდნის ასისტენტის პაკეტი | Dali",
        description:
          "პაკეტირებული გადაწყვეტა შიდა docs-ის მოსაძებნად, სწორი წყაროს მისათითებლად, პასუხების მოსამზადებლად და უსაფრთხო უარისთვის მაშინ, როცა ცოდნა არასრული ან წინააღმდეგობრივია.",
      },
      hero: {
        eyebrow: "პაკეტირებული გადაწყვეტა",
        title: "მიეცით გუნდს პასუხები, რომელთა გადამოწმებაც შეუძლია.",
        lead:
          "Dali აფუთავს ერთ permission-aware ცოდნის პროცესს იმ დოკუმენტებსა და ინსტრუმენტებზე, რომლებსაც გუნდი უკვე ენდობა, ფაქტობრივი პასუხებისთვის citation-ებით და მკაფიო უარის გზით მაშინ, როცა მტკიცებულება სუსტია.",
        supportLine:
          "საუკეთესოა მხარდაჭერის, ოპერაციების და შიდა enablement გუნდებისთვის, სადაც ერთი და იგივე კითხვები იმავე ექსპერტებს მუდმივად აწყვეტინებს მუშაობას.",
      },
      workflow: {
        label: "პროცესის დიაგრამა",
        intake: ["Docs", "წინა პასუხები", "policy note-ები"],
        agentLabel: "ცოდნის ასისტენტის პაკეტი",
        review: ["დაკარგული წყაროები", "ურთიერთსაწინააღმდეგო მითითებები", "სენსიტიური მოთხოვნები"],
        outcomes: ["ციტირებული პასუხი", "შემოთავაზებული შემდეგი ნაბიჯი", "ესკალაციის მოკლე აღწერა"],
      },
      contrast: {
        painTitle: "რას ანაცვლებს",
        painPoints: [
          "გუნდებს, რომლებიც ერთსა და იმავე პასუხს ისევ ეძებენ drive-ებში, chat-ებში და ძველ ticket-ებში.",
          "subject-matter ექსპერტებს, რომლებიც რუტინული კითხვებისთვის ნაგულისხმევ search engine-ად იქცნენ.",
          "პასუხებს, რომლებიც წყაროს მოქმედების შემოწმების გარეშე უბრალოდ გადაიტანება წინ.",
        ],
        outcomeTitle: "რას ქმნის",
        outcomePoints: [
          "პირველი ფენის პასუხს, რომელიც პირდაპირ მიუთითებს გამოყენებულ წყაროზე.",
          "მკაფიო abstain გზას, როცა knowledge base თავდაჯერებულ პასუხს ვერ ამყარებს.",
          "გამეორებად მოდელს, რომლითაც ერთი წყაროების ნაკრები სასარგებლო რჩება ისე, რომ მთელი კომპანიის მოწესრიგების ილუზია არ იქმნება.",
        ],
      },
      pilot: {
        label: "scope-ის ზუსტი ფიქსირებული საზღვარი",
        fixedOutcome:
          "ერთი გუნდი ან წყაროების ნაკრები, ერთი permission მოდელი, ერთი პასუხის ზედაპირი, citation ყველა ფაქტობრივი პასუხისთვის და უარის ქცევა მაშინ, როცა მტკიცებულება არ არსებობს.",
        includes: [
          "1 შერჩეული დოკუმენტების ნაკრები ან folder group",
          "1 მომხმარებლის აუდიტორია, მაგალითად შიდა ops ან support staff",
          "Citation-first პასუხები confidence-aware ესკალაციით",
          "კითხვების ლოგირება, რომ knowledge base-ის ხარვეზები ხილული დარჩეს",
        ],
        excludes: [
          "ღია კვლევა დამტკიცებული წყაროების მიღმა",
          "ჩუმი გამოცნობა მაშინ, როცა მყარად დაფუძნებული პასუხი არ არსებობს",
          "ფართო enterprise search-ის ჩანაცვლება",
        ],
      },
      integrations: {
        label: "ინტეგრაციები და მაგალითები",
        intro:
          "პაკეტი საუკეთესოდ მუშაობს მაშინ, როცა წყაროები უკვე არსებობს, თუნდაც არასრულყოფილად, და გუნდმა იცის რომელი repository უნდა ჩაითვალოს დამტკიცებულად.",
        items: [
          "Notion, Google Drive, Confluence ან შიდა docs folder",
          "Slack ან chat intake შიდა კითხვებისთვის",
          "Zendesk, Intercom ან support triage არხი draft პასუხებისთვის",
          "Ticket ან issue სისტემები ესკალაციისთვის, როცა docs არასრულია",
        ],
      },
      guardrails: {
        label: "შეზღუდვები და დამტკიცება",
        intro:
          "ასისტენტი ისეა აწყობილი, რომ ჯერ ციტირება, უარი და ესკალაცია შეძლოს და მხოლოდ ამის შემდეგ ჟღერდეს გამართულად, მაგრამ არასწორად.",
        items: [
          "პასუხები შეიცავს გამოყენებულ წყაროს ან მკაფიოდ აცხადებს, რომ წყარო ვერ მოიძებნა.",
          "ურთიერთსაწინააღმდეგო დოკუმენტები თავდაჯერებულობის თეატრის ნაცვლად ესკალაციას იწვევს.",
          "სენსიტიური თემები შეიძლება რევიუში იძულებით გადავიდეს მაშინაც კი, როცა წყარო არსებობს.",
          "კითხვების ლოგები აჩენს, სად სჭირდება knowledge base-ს გასუფთავება გაშვების შემდეგ.",
        ],
      },
      validation: {
        acceptanceTest:
          "შევაფასოთ 30 რეალური კითხვა დამტკიცებული წყაროების ნაკრებზე. პაკეტი გადის მხოლოდ მაშინ, თუ ყველა ფაქტობრივ პასუხს ახლავს დამადასტურებელი citation ან აშკარა უარი, permission დარღვევები 0-ზე რჩება და reviewer-ის მიღება მინიმუმ 90%-ს აღწევს იმ კითხვებზე, რომლებზეც წყაროების ნაკრები წესით უნდა პასუხობდეს.",
        measures: [
          "პასუხები ვალიდური citation-ებით",
          "სწორი abstention-ისა და ესკალაციის მაჩვენებელი",
          "Permission საზღვრის ტესტების შედეგები",
          "retrieval latency",
          "განმეორებადი უპასუხო კითხვების თემები",
        ],
        commercialModel:
          "აუდიტი აფიქსირებს წყაროების ნაკრებს, აუდიტორიას და შეფასების კითხვებს. შემდეგ Dali აფასებს ერთ ფიქსირებული მოცულობისა და ფიქსირებული ფასის პაკეტს. აგება იწყება მხოლოდ მას შემდეგ, რაც საზღვარი დამტკიცდება.",
      },
      delivery: [
        {
          title: "დამტკიცებული წყაროების ნაკრების შერჩევა",
          body:
            "ვირჩევთ დოკუმენტებს, რომლებიც უნდა ჩაითვალოს წყაროდ, ვშლით აშკარა ხმაურს და ვადგენთ აუდიტორიას, რათა პაკეტმა გადაჭრას შემოსაზღვრული ცოდნის პრობლემა და არა ბუნდოვანი ამოცანა.",
        },
        {
          title: "დაფუძნებული პასუხების ტესტირება",
          body:
            "ვამოწმებთ რეალურ კითხვებს წყაროების ნაკრებზე, ვამკაცრებთ retrieval-ისა და პასუხის წესებს და ვადგენთ, სად უნდა აჯობოს უარმა სპეკულაციას.",
        },
        {
          title: "პირველი პასუხის ფენის გაშვება",
          body:
            "ასისტენტი live რეჟიმში გადადის შერჩეული აუდიტორიისთვის citation-ებით, ესკალაციის გზებით და ლოგებით, რომლებიც აჩვენებს, სად ვერ მუშაობს წყარო მასალა.",
        },
      ],
      fit: {
        fit: [
          "ერთი და იგივე კითხვები საკმარისად ხშირად მეორდება, რომ შეწყვეტის ღირებულება შეიქმნას.",
          "შეგიძლიათ ზუსტად თქვათ, რომელი დოკუმენტები უნდა ჩაითვალოს დამტკიცებულ წყაროებად.",
          "პირველი პასუხი ღირებულია მაშინაც კი, თუ რთულ შემთხვევებს ისევ ადამიანი იღებს.",
        ],
        notFit: [
          "თქვენი ძირითადი ცოდნა ჯერ გამოსადეგ დოკუმენტებში საერთოდ არ არსებობს.",
          "გსურთ, რომ ასისტენტმა ღია ინტერნეტში იმპროვიზაცია მოახდინოს.",
          "გაშვების შემდეგ ესკალაციებს ან წყაროების გასუფთავებას ვერავინ აიღებს საკუთარ თავზე.",
        ],
      },
      faqs: [
        {
          question: "შეუძლია პირდაპირ მომხმარებლებს უპასუხოს?",
          answer:
            "შეუძლია, მაგრამ უფრო უსაფრთხო პირველი ნაბიჯი ჩვეულებრივ შიდა ან draft-first პროცესია. პირდაპირი მომხმარებლის პასუხები აზრს იძენს მხოლოდ მაშინ, როცა წყარო მასალა სტაბილურია და რისკი დაბალია.",
        },
        {
          question: "რით განსხვავდება ეს ჩვეულებრივი chatbot-ისგან?",
          answer:
            "პაკეტი აგებულია დამტკიცებული წყაროების ნაკრებზე, აშკარა უარზე და ოპერაციულ ესკალაციაზე. მისი მიზანი სანდოობაა და არა უბრალოდ სასაუბრო მოქნილობა.",
        },
        {
          question: "ჯერ იდეალური docs გვჭირდება?",
          answer:
            "არა. წყაროების ნაკრები საკმარისად კარგი უნდა იყოს ერთი აუდიტორიისა და ერთი გამოყენების შემთხვევისთვის. პაკეტმა დარჩენილი ხარვეზები უნდა გამოაჩინოს და არა დამალოს.",
        },
      ],
      cta: {
        publicLabel: "დაიწყეთ ცოდნის პროცესის აუდიტი",
        publicBody:
          "თუ თქვენი გუნდი მუდმივად კარგავს დროს განმეორებად კითხვებზე, გამოგვიგზავნეთ წყარო სისტემები და მომხმარებელთა ჯგუფი. Dali გიპასუხებთ ყველაზე მცირე პაკეტით, რომელსაც უსაფრთხოდ შეუძლია პასუხის გაცემა.",
        intakeFields: [
          "დამტკიცებული დოკუმენტების repository ან წყაროების ნაკრები",
          "მომხმარებელთა ჯგუფი, რომელსაც პირველი პასუხის ფენა სჭირდება",
          "ორი ან სამი რეპრეზენტატიული კითხვა",
          "პასუხისმგებელი ესკალაციებსა და წყაროების გასუფთავებაზე",
        ],
        upworkLabel: "ნახეთ, რა უნდა გააგზავნოთ Upwork-ში",
        upworkBody:
          "უპასუხეთ Upwork-ში source repository-ით, აუდიტორიით და ესკალაციის პასუხისმგებლით. Dali გიპასუხებთ ასისტენტის ფიქსირებული პაკეტის საზღვრით.",
      },
    },
    "voice-agents": {
      slug: "voice-agents",
      name: "Voice Design-Partner პაკეტი",
      summary:
        "design-partner ტიპის კვლევითი პაკეტი ერთი განმეორებადი ზარის ხაზისთვის, რათა უფრო ფართო აგებამდე დადასტურდეს disclosure, routing, latency და ადამიანური handoff.",
      accent: "#1E3A8A",
      accentSoft: "#E9EDFF",
      tint: "#fff7f2",
      metadata: {
        title: "Voice Design-Partner პაკეტი | Dali",
        description:
          "Design-partner ტიპის კვლევითი პაკეტი ერთი რუტინული ზარის ხაზისთვის მკაფიო disclosure-ით, routing-ით, latency-ით, შეჯამებებით და ადამიანზე takeover ტესტებით.",
      },
      hero: {
        eyebrow: "Design-partner ტიპის კვლევითი პაკეტი",
        title: "სანამ voice agent-ს იყიდით, ჯერ ერთი განმეორებადი ზარის პროცესი შეამოწმეთ.",
        lead:
          "Dali აკონკრეტებს ერთ ზედამხედველობით მართულ ზარის ხაზს ერთი ტიპის ზარისთვის, ზომავს disclosure-ს, routing-ს, შეჯამებებს, latency-ს და transfer-ის ქცევას, და ამ მტკიცებულებით წყვეტს, ამართლებს თუ არა ეს ფასიან voice პაკეტს.",
        supportLine:
          "საუკეთესოა დაჯავშნისთვის, კვალიფიკაციისთვის, სტატუსის განახლებებისთვის და გადატვირთული პერიოდების დაფარვისთვის, სადაც სიჩქარე მნიშვნელოვანია, მაგრამ მაღალი რისკის განსჯა მაინც ადამიანებს ეკუთვნის.",
      },
      workflow: {
        label: "პროცესის დიაგრამა",
        intake: ["ზარების რიგი", "დაჯავშნის წესები", "FAQ docs"],
        agentLabel: "Voice design-partner ტესტი",
        review: ["ესკალაციები", "სენსიტიური მოთხოვნები", "callback გამონაკლისები"],
        outcomes: ["ნაპასუხები ზარი", "დაჯავშნილი დრო", "შეჯამება და გადაბარება"],
      },
      contrast: {
        painTitle: "რას ანაცვლებს",
        painPoints: [
          "რუტინულ ზარებს, რომლებიც აწყვეტინებს ოპერატორებს, რომლებმაც უფრო რთულ საქმეს უნდა მოხედონ.",
          "გამოტოვებულ ზარებს სამუშაო საათების მიღმა ან პიკის დროს, თანმიმდევრული follow-up-ის გარეშე.",
          "თანამშრომლებს, რომლებიც მთელი დღე იმეორებენ ერთსა და იმავე დაჯავშნის, სტატუსისა და intake კითხვებს.",
        ],
        outcomeTitle: "რას ქმნის",
        outcomePoints: [
          "ღიად გამოცხადებულ პირველ ფენას ერთი მკაფიოდ შემოსაზღვრული ზარის ტიპისთვის.",
          "მომწოდებლის დეტალების, შეჯამებების და შემდეგი ქმედებების თანმიმდევრულ აღრიცხვას.",
          "მყისიერ transfer-ს ან callback გადამისამართებას, როცა მოთხოვნა დამტკიცებულ ზარის გზას სცდება.",
        ],
      },
      pilot: {
        label: "კვლევის ზუსტი საზღვარი",
        fixedOutcome:
          "ერთი ზარის ტიპი, ერთი ენა, ერთი დაჯავშნის ან routing გზა, რეპეტიციით ზედამხედველობის ქვეშ disclosure-ისა და ადამიანური takeover წესებით.",
        includes: [
          "1 რუტინული შემომავალი ზარის პროცესი, მაგალითად booking ან status request-ები",
          "1 ენა და სამუშაო საათების ან overflow დაფარვის საზღვარი",
          "1 scheduling, routing ან summary handoff გზა",
          "განცხადება, რომ დამრეკავი ავტომატიზებულ სისტემას ესაუბრება",
        ],
        excludes: [
          "ტელეფონით გადახდების მიღება",
          "რთული გაყიდვის მოლაპარაკება ან medical, legal თუ crisis რჩევა",
          "პირველ პაკეტში მრავალენოვანი გაფართოება",
        ],
      },
      integrations: {
        label: "ინტეგრაციები და მაგალითები",
        intro:
          "ეს პაკეტი ყველაზე კარგად ჯდება მაშინ, როცა ზარის შემდეგი მარშრუტი უკვე განსაზღვრულია და ბიზნესს ძირითადად უფრო სწრაფი დაფარვა და უფრო სუფთა შეჯამებები სჭირდება.",
        items: [
          "Twilio, SIP routing ან არსებული cloud telephony provider",
          "Calendly, booking software ან სტრუქტურირებული intake sheet",
          "CRM განახლებები და პასუხისმგებელი პირის შეტყობინებები თითოეული ზარის შედეგის შემდეგ",
          "Telegram ან Slack შეტყობინებები transfer-ისა და callback მოვლენებისთვის",
        ],
      },
      guardrails: {
        label: "შეზღუდვები და დამტკიცება",
        intro:
          "Voice სისტემა მაღალი ნდობის სფეროა, ამიტომ პაკეტი ვიწრო და პირდაპირი უნდა დაიწყოს. სისტემამ მკაფიოდ უნდა თქვას, რა არის და სად ჩერდება.",
        items: [
          "დამრეკავებს ეუბნებიან, რომ ავტომატიზებულ ასისტენტს ესაუბრებიან.",
          "დამტკიცებული ზარის გზის მიღმა ყველაფერი ადამიანურ follow-up-ზე გადადის.",
          "შეჯამებები და ლოგები ინახება რევიუსთვის და ოპერაციული დახვეწისთვის.",
          "Recording-ისა და privacy-ის წესები გაშვებამდე ბიზნეს კონტექსტთანაა შეთავსებული.",
        ],
      },
      validation: {
        acceptanceTest:
          "გავატაროთ 30 სკრიპტირებული და არასკრიპტირებული ზარი. პაკეტი გადის მხოლოდ მაშინ, თუ ავტომატიზაცია ყოველთვის გამჟღავნებულია, ყველა ზარის შეჯამება დალოგილია, არაუფლებამოსილი ქმედებები 0-ზე რჩება, routing მინიმუმ 90% დამტკიცებულ ზარის ხაზში სწორია და ყველა საზღვარს გარეთ მყოფი მოთხოვნა transfer-მდე ან callback დაფიქსირებამდე აღწევს.",
        measures: [
          "დამტკიცებული ზარის გზის დასრულების მაჩვენებელი",
          "დაჯავშნის ან routing-ის წარმატება",
          "სწორი transfer-ისა და callback-ის მაჩვენებელი",
          "რევიუში შესული ზარების შეჯამების სიზუსტე",
        ],
        commercialModel:
          "აუდიტი აფიქსირებს ერთ ზარის ხაზს, provider-ს, handoff-ს და შეფასების ნაკრებს. Dali აგებას აფასებს მხოლოდ მაშინ, თუ design-partner მტკიცებულება სიცოცხლისუნარიან ფასიან პაკეტს ამყარებს.",
      },
      delivery: [
        {
          title: "ვიწრო ზარის ხაზის არჩევა",
          body:
            "ვირჩევთ ერთ ზარის ტიპს, რომელსაც საკმარისი გამეორება აქვს მნიშვნელობისთვის და საკმარისი სტრუქტურა უსაფრთხოდ მოსამართავად პაკეტირებული გადაწყვეტას ფარგლებში.",
        },
        {
          title: "transfer-ებისა და გამონაკლისების რეპეტიცია",
          body:
            "ვამოწმებთ საუბრის გზას, booking ლოგიკას და takeover წესებს იქამდე, სანამ აშკარა არ გახდება, სად უნდა გააგრძელოს სისტემამ და სად უნდა გაჩერდეს.",
        },
        {
          title: "ზედამხედველობით მართული სატესტო ხაზის გაშვება",
          body:
            "არჩეული ხაზი მუშაობს შეზღუდულ design-partner რეჟიმში disclosure-ით, მონიტორინგით და მკაფიო callback ან transfer გზით ყველაფრისთვის, რაც scope-ს სცდება.",
        },
      ],
      fit: {
        fit: [
          "გაქვთ განმეორებადი შემომავალი ზარების ტიპები, რომლებიც უკვე მიჰყვება სკრიპტს ან checklist-ს.",
          "დაფარვის ხარვეზები ან გამოტოვებული ზარები რეალურ ოპერაციულ ზარალს იწვევს.",
          "როცა ზარი რთულდება, უკვე არსებობს სუფთა handoff ადამიანთან.",
        ],
        notFit: [
          "ყველა ზარი რთულია, კონსულტაციურია ან ემოციურად სენსიტიურია.",
          "გჭირდებათ სისტემა, რომელიც ნებისმიერ ფასად ადამიანურად ჟღერს.",
          "ბიზნესს არ შეუძლია განსაზღვროს, რისი გაკეთება შეიძლება voice agent-ს.",
        ],
      },
      faqs: [
        {
          question: "ეცოდინებათ დამრეკავებს, რომ ეს ავტომატიზებულია?",
          answer:
            "კი. პაკეტი აშკარა disclosure-ს ეყრდნობა. დამალული ავტომატიზაცია ამ ტიპის voice პროცესისთვის არასწორი ნდობის მოდელია.",
        },
        {
          question: "შეუძლია ადამიანთან გადართვა?",
          answer:
            "ეს ჩვეულებრივ ბირთვული მოთხოვნაა. პაკეტი აწყობილია ვიწრო ზარის გზაზე და სუფთა transfer-ის ან callback ლოგიკაზე ყველაფრისთვის, რაც მის ფარგლებს გარეთაა.",
        },
        {
          question: "ეს სრულ contact-center ჩანაცვლებას ემსახურება?",
          answer:
            "არა. ეს არის ფიქსირებული პაკეტი ერთი ზარის ხაზისთვის. თუ იმუშავებს, უფრო ფართო გაფართოება ახალი საზღვრებით ცალკე გადაწყვეტილება უნდა იყოს.",
        },
      ],
      cta: {
        publicLabel: "შეიტანეთ განაცხადი voice design-partner აუდიტზე",
        publicBody:
          "გამოგვიგზავნეთ ერთი რეპრეზენტატიული ზარის სკრიპტი, მიმდინარე routing გზა და საჭირო საბოლოო ქმედება. Dali გიპასუხებთ აუდიტის მოცულობით, სატესტო მატრიცით და design-partner პაკეტის საზღვრით.",
        intakeFields: [
          "ერთი ტიპის რუტინული შემომავალი ზარი",
          "მიმდინარე telephony და routing provider",
          "booking, status ან intake ქმედება, რომელიც უნდა დასრულდეს",
          "transfer ან callback წესი scope-ს გარეთ მყოფი მოთხოვნებისთვის",
        ],
        upworkLabel: "ნახეთ, რა უნდა გააგზავნოთ Upwork-ში",
        upworkBody:
          "უპასუხეთ Upwork-ში ზარის ტიპით, routing ინსტრუმენტით და handoff წესებით. Dali გიპასუხებთ design-partner საზღვრით, სატესტო მატრიცით და დამტკიცების წინაპირობებით.",
      },
    },
    "vibe-code-rescue": {
      slug: "vibe-code-rescue",
      name: "Vibe-code Rescue პაკეტი",
      summary:
        "ფიქსირებული პაკეტი: AI-ით აწყობილი MVP-ის secrets, payments და admin ბილიკების ტრიაჟი, patch vs rewrite გადაწყვეტილებები, gates, stop-switch და handoff პაკეტი გუნდისთვის.",
      accent: "#0B3A4A",
      accentSoft: "#E4F0F3",
      tint: "#f4f9fa",
      metadata: {
        title: "Vibe-code Rescue პაკეტი | Dali",
        description:
          "ფიქსირებული production-hardening პაკეტი vibe-coded MVP-ებისთვის: secrets, payments და admin-ის ტრიაჟი, patch vs rewrite, gates და stop-switch, შემდეგ handoff პაკეტი, რომელსაც გუნდი ფლობს.",
      },
      hero: {
        eyebrow: "პაკეტური პაკეტი",
        title: "გაამყარეთ AI-ით აწყობილი MVP სანამ ის ნდობას ან ფულს დაგიჯდებათ.",
        lead:
          "Dali ატარებს ფიქსირებულ rescue-ს ერთ პროდუქტულ ზედაპირზე: პოულობს bleeding ბილიკებს (secrets, payments, admin, outbound ქმედებები), აჩერებს ყველაზე მძიმე რისკებს, წყვეტს patch vs rewrite-ს თითოეულ critical path-ზე და აყენებს gates-ს, მონიტორინგს და stop-switch-ს handoff-ით, რომელსაც გუნდი თავად უძღვება.",
        supportLine:
          "საუკეთესოდ ერგება დამფუძნებლებსა და ოპერატორებს, რომლებმაც Lovable, Cursor, v0 ან მსგავსი builder-ებით გაუშვეს პროდუქტი და ახლა სჭირდებათ production-სიმართლე სირცხვილის ლექციისა და სრული rewrite-ის გარეშე.",
      },
      workflow: {
        label: "პროცესის დიაგრამა",
        intake: ["Repo ან preview", "Payment და admin ბილიკები", "Secret ზედაპირები"],
        agentLabel: "Rescue და harden პაკეტი",
        review: ["კრიტიკული severity", "Patch vs rewrite", "Owner-ის დადასტურება"],
        outcomes: ["რისკის ტრიაჟის რუკა", "გამყარებული ბილიკები", "Handoff პაკეტი"],
      },
      contrast: {
        painTitle: "რას ანაცვლებს",
        painPoints: [
          "დემო, რომელიც preview-ში მუშაობს, სანამ tokens, webhooks ან admin routes production-ში ღიაა.",
          "გაუთავებელი chat-driven პაჩები severity-ის რიგის, stop-switch-ისა და sprint-ის შემდეგ ownership-ის გარეშე.",
          "ცრუ არჩევანი «გაუშვი როგორც არის» და «გააგდე ყველაფერი» შორის, როცა ინჟინერიის სიღრმე მხოლოდ რამდენიმე ბილიკს სჭირდება.",
        ],
        outcomeTitle: "რას ქმნის",
        outcomePoints: [
          "severity-ით დალაგებული ტრიაჟი secrets, payments, admin და outbound ქმედებებისთვის.",
          "წერილობითი patch vs rewrite გადაწყვეტილება თითოეულ critical path-ზე, არა ბუნდოვანი rewrite მანდატი.",
          "Gates, მონიტორინგი და stop-switch პლუს handoff პაკეტი, რომელსაც გუნდი Dali-ს მუდმივი ყოფნის გარეშე მართავს.",
        ],
      },
      pilot: {
        label: "scope-ის ზუსტი ფიქსირებული საზღვარი",
        fixedOutcome:
          "ერთი პროდუქტული ზედაპირი, მაღალი რისკის ბილიკების ტრიაჟი, patch ან rewrite გადაწყვეტილებები, production gates და stop-switch, handoff პაკეტი owners-ით და residual risks-ით.",
        includes: [
          "1 პროდუქტული ზედაპირი ან deployable აპი (საიტი, MVP ან admin-backed flow)",
          "secrets, payments, admin access და high-impact outbound ქმედებების ტრიაჟი",
          "patch vs rewrite შენიშვნები თითოეულ critical path-ზე scope-ში",
          "production gates, logging მოლოდინები და აშკარა stop-switch",
          "handoff პაკეტი: residual risks, owners და შემდეგი engineering ნაბიჯები",
        ],
        excludes: [
          "ყველა ფიჩის ან ეკრანის სრული rewrite",
          "ღია product redesign ან rebrand",
          "მრავალპროდუქტიანი rescue ერთ პაკეტში",
          "გუნდის დარცხვენა AI builders-ის გამოყენებისთვის",
        ],
      },
      integrations: {
        label: "ინტეგრაციები და მაგალითები",
        intro:
          "პაკეტი მუშაობს იმ სტეკზე, რომელიც უკვე გაუშვით. პროდუქტს იქ ვხვდებით, სადაც არის: builder output, custom code, payments და host - და ვამყარებთ მხოლოდ იმ ბილიკებს, რომლებსაც რეალურად შეუძლიათ ზიანის მიყენება.",
        items: [
          "Lovable, v0, Cursor, Bolt ან შერეული AI-assisted კოდბაზები",
          "Vercel, Netlify, Cloudflare ან მსგავსი preview-to-prod hosts",
          "Stripe, payment webhooks, promo კოდები და checkout callbacks",
          "Supabase, Firebase, custom admin ან shared service-role keys",
          "დაკავშირებული მასალები Dali ბლოგზე: how-we-rescue-vibe-coded-mvps, vibe-coded-site-hardening-checklist, security-audit-for-vibe-coded-websites, rewrite-vs-patch-vibe-code",
        ],
      },
      guardrails: {
        label: "დაცვები და დამტკიცება",
        intro:
          "Rescue არ არის ჩუმი rewrite. Severity, გადაწყვეტილებები და residual risk owner-ისთვის ხილული რჩება, სანამ რამე დასრულებულად ჩაითვლება.",
        items: [
          "Secrets და payment ბილიკები stop-the-bleeding სამუშაოა კოსმეტიკურ გაწმენდამდე.",
          "თითოეული critical path იღებს აშკარა patch ან rewrite გადაწყვეტილებას მიზეზით, არა «ვაიბით».",
          "stop-switch და human gate რჩება high-impact ქმედებებზე პაკეტის შემდეგაც.",
          "scope-ს გარეთ residual risks იწერება owners-ით, არა იკარგება ჩატში.",
        ],
      },
      validation: {
        acceptanceTest:
          "პაკეტი გადის მხოლოდ თუ high-severity secrets და payments findings დახურულია ან წერილობით მიღებულია owner-ის მიერ, scope-ის თითოეულ critical path-ს აქვს patch-or-rewrite გადაწყვეტილება, high-impact ქმედებებზე არსებობს stop-switch, და handoff პაკეტი ასახელებს residual risks-სა და owners-ს.",
        measures: [
          "high-severity findings დახურული ან owner-ის მიერ მიღებული",
          "critical paths წერილობითი patch vs rewrite გადაწყვეტილებით",
          "stop-switch და gate coverage high-impact ქმედებებზე",
          "handoff სისრულე: residual risks, owners, next steps",
        ],
        commercialModel:
          "აუდიტი აფიქსირებს პროდუქტულ ზედაპირს, რისკის პრიორიტეტებს და acceptance bar-ს. შემდეგ Dali აფასებს ერთ fixed-scope, fixed-price rescue პაკეტს. უფრო ფართო rewrite ან multi-surface სამუშაო handoff-ის შემდეგ ცალკე გადაწყვეტილებაა.",
      },
      delivery: [
        {
          title: "bleeding ბილიკების ტრიაჟი",
          body:
            "ვრუკავთ secrets, payments, admin და outbound ზედაპირებს, ვალაგებთ severity-ს და ვაფიქსირებთ პაკეტის საზღვარს, რომ სამუშაო იქ დაიწყოს, სადაც ზიანი რეალურია.",
        },
        {
          title: "Patch, rewrite და gates",
          body:
            "ვამყარებთ ან ვწერთ თავიდან თითოეულ critical path-ს scope-ში, ვამატებთ production gates-სა და stop-switch-ს და კოსმეტიკურ ვალს პირველ პაკეტში არ ვტოვებთ, თუ ის უსაფრთხოებას არ ბლოკავს.",
        },
        {
          title: "ownership-ის გადაცემა",
          body:
            "იღებთ პაკეტს გადაწყვეტილებებით, residual risks-ით, owners-ით და შემდეგი engineering ნაბიჯებით, რომ გუნდმა პროდუქტი Dali-ს მუდმივი on-call-ის გარეშე წარმართოს.",
        },
      ],
      fit: {
        fit: [
          "AI builders-ით ან heavy AI-assisted coding-ით გაუშვით MVP და რეალური მომხმარებლები ან payments ახლოსაა.",
          "შეგიძლიათ დაასახელოთ ერთი პროდუქტული ზედაპირი და ბილიკები, რომლებიც ფულს, წვდომას ან outbound side effects-ს ეხება.",
          "გჭირდებათ პატიოსანი patch vs rewrite რუკა უფრო, ვიდრე სრული rebuild-ის სლოგანი.",
        ],
        notFit: [
          "გჭირდებათ ყველა ეკრანის სრული product rewrite ერთ engagement-ში.",
          "არ არის owner, რომელიც residual risk-ს მიიღებს ან severity-ს პრიორიტეტს განსაზღვრავს.",
          "პროდუქტი ჯერ კიდევ სუფთა პროტოტიპია production host-ის, მომხმარებლების ან payment ბილიკის გარეშე.",
        ],
      },
      faqs: [
        {
          question: "უნდა გადავაგდოთ vibe-coded აპი?",
          answer:
            "ჩვეულებრივ არა. უმეტეს rescue ინარჩუნებს მომუშავე ზედაპირს და rewrite-ს მხოლოდ არაუსაფრთხო ან შეუნარჩუნებად ბილიკებს აკეთებს. patch vs rewrite წყდება თითოეულ critical path-ზე. გადაწყვეტილების ჩარჩო იხილეთ rewrite-vs-patch-vibe-code Dali ბლოგზე.",
        },
        {
          question: "ეს სრული security აუდიტია?",
          answer:
            "ეს არის production-hardening პაკეტი security-minded ტრიაჟით, არა enterprise pen-test თეატრი. ჯერ secrets, payments, admin და high-impact ქმედებები. უფრო ღრმა შენიშვნებია security-audit-for-vibe-coded-websites და vibe-coded-site-hardening-checklist-ში.",
        },
        {
          question: "გაგვირცხვენთ AI tools-ის გამო?",
          answer:
            "არა. სიჩქარე რაციონალური იყო. პაკეტი ვარაუდობს, რომ builders-მა სწავლაში დაგეხმარათ; ახლა საჭიროა production-სიმართლე. პროცესი საჯაროდაა how-we-rescue-vibe-coded-mvps-ში.",
        },
        {
          question: "რას ვიღებთ ბოლოს?",
          answer:
            "severity-ით დალაგებული ტრიაჟი, scope-ში გამყარებული ან rewrite გაკეთებული critical paths, gates და stop-switch, პლუს handoff პაკეტი residual risks-ით, owners-ით და next steps-ით. არა ბუნდოვანი «კოდი გავაუმჯობესეთ».",
        },
      ],
      cta: {
        publicLabel: "დაიწყეთ vibe-code rescue აუდიტი",
        publicBody:
          "თუ MVP უკვე live-ია ან მალე ფულს მიიღებს, გამოგვიგზავნეთ პროდუქტის URL ან repo კონტექსტი და ბილიკები, რომლებიც ყველაზე მეტად გაწუხებთ. Dali გიპასუხებთ ფიქსირებული rescue საზღვრით და acceptance bar-ით.",
        intakeFields: [
          "პროდუქტის URL, preview ან repo კონტექსტი ერთი ზედაპირისთვის",
          "payment, admin, auth ან outbound ბილიკები, რომლებიც უკვე არსებობს",
          "სად ცხოვრობს ახლა secrets, webhooks ან service keys",
          "owner, რომელსაც შეუძლია residual risk მიიღოს და severity პრიორიტეტი დააყენოს",
        ],
        upworkLabel: "ნახეთ, რა უნდა გააგზავნოთ Upwork-ში",
        upworkBody:
          "უპასუხეთ Upwork-ში პროდუქტული ზედაპირით, payment ან admin ბილიკებით და risk გადაწყვეტილებების owner-ით. Dali გიპასუხებთ ფიქსირებული rescue პაკეტის საზღვრით და ტრიაჟის რიგით.",
      },
    },
    "agent-rescue": {
      slug: "agent-rescue",
      name: "Agent Rescue",
      summary:
        "ფიქსირებული პაკეტი AI აგენტებისთვის, რომლებიც დემოში გადიან, მაგრამ production-ში ეცემიან: რეალური failure modes-ის ტრიაჟი, eval suite რეალურ საუბრებზე, guardrails და მონიტორინგი, შემდეგ cutover მტკიცებულებით.",
      accent: "#0B3A4A",
      accentSoft: "#E4F0F3",
      tint: "#f4f9fa",
      metadata: {
        title: "Agent Rescue | Dali",
        description:
          "ფიქსირებული rescue AI აგენტებისთვის, რომლებიც დემოში მუშაობენ, მაგრამ production-ში ეცემიან ან ჩერდებიან: failure modes-ის ტრიაჟი, eval suite რეალურ საუბრებზე, guardrails, approval gates, მონიტორინგი და production cutover 2-4 კვირაში.",
      },
      hero: {
        eyebrow: "პაკეტირებული გადაწყვეტა",
        title: "თქვენი აგენტი დემოში მუშაობდა. Production-ში გაჩერდა.",
        lead:
          "Dali იბარებს აგენტს, რომელიც სხვა ვენდორმა, ფრილანსერმა ან თქვენმა გუნდმა ააწყო, არჩევს რეალურ failure modes-ს - hallucinated actions, ჩუმი timeouts, drift, ხარჯის ნახტომები - აწყობს eval suite-ს რეალური საუბრებიდან, ამატებს guardrails-სა და მონიტორინგს და აკეთებს production cutover-ს 2-4 კვირაში.",
        supportLine:
          "საუკეთესოდ ერგება გუნდებს, რომლებმაც უკვე ჩადეს აგენტში და სჭირდებათ production-ნდობა, არა «თავიდან დავიწყოთ» პიჩი.",
      },
      workflow: {
        label: "პროცესის დიაგრამა",
        intake: ["არსებული აგენტის კოდი", "რეალური საუბრების ლოგები", "სბოის რეპორტები"],
        agentLabel: "Agent rescue პაკეტი",
        review: ["High-risk ქმედებები", "Eval ჩავარდნები", "Cutover-ის დადასტურება"],
        outcomes: ["Failure modes-ის რუკა", "გამავალი eval suite", "მონიტორინგიანი production აგენტი"],
      },
      contrast: {
        painTitle: "რას ანაცვლებს",
        painPoints: [
          "აგენტს, რომელიც დემოში კარგად გამოიყურება, მაგრამ რეალური მომხმარებლების მოსვლისას ქმედებებს იგონებს, ჩუმად ვარდება timeout-ზე ან drift-დება.",
          "დებაგს ანეკდოტებით: ერთი ცუდი ტრანსკრიპტი პრომპტის შესწორებას იწვევს და არავინ იცის, წინა სბოი მართლა გასწორდა თუ არა.",
          "ტოკენების ხარჯს, რომელიც owner-ის გარეშე იზრდება, რადგან არავინ ზომავს, რას აკეთებს აგენტი თითო საუბარში.",
        ],
        outcomeTitle: "რას ქმნის",
        outcomePoints: [
          "severity-ით დალაგებულ რუკას რეალური failure modes-ისთვის production საუბრებიდან, არა ვარაუდებიდან.",
          "eval suite-ს, რომელსაც გუნდი ყოველ ცვლილებაზე ხელახლა უშვებს, რომ ფიქსი ფიქსად დარჩეს.",
          "guardrails-ს, approval gates-სა და მონიტორინგს, რომლებთანაც აგენტის მუშაობაზე დატოვება უსაფრთხოა.",
        ],
      },
      pilot: {
        label: "scope-ის ზუსტი ფიქსირებული საზღვარი",
        fixedOutcome:
          "ერთი აგენტი, ერთი production პროცესი, წერილობითი failure modes-ის ტრიაჟი, eval suite რეპრეზენტატულ საუბრებზე, guardrails და approval gates high-risk ქმედებებზე, მონიტორინგი და production cutover 2-4 კვირაში.",
        includes: [
          "1 არსებული აგენტი ან AI პილოტი, ვინც არ უნდა აეწყოს: ვენდორი, ფრილანსერი ან in-house",
          "failure modes-ის ტრიაჟი: hallucinated actions, ჩუმი timeouts, drift, ხარჯის ნახტომები",
          "eval suite რეალური საუბრებიდან შეთანხმებული გავლის ზღვრით",
          "guardrails, approval gates high-risk ქმედებებზე და production მონიტორინგი",
          "production cutover ლოგებით და rollback ბილიკით",
        ],
        excludes: [
          "სრული rebuild ნულიდან, როცა არსებული აგენტის შეკეთება შესაძლებელია",
          "ახალი ფიჩების დეველოპმენტი იმის მიღმა, რაც თავად rescue-ს სჭირდება",
          "მრავალაგენტიანი პორტფელის rescue ერთ პაკეტში",
        ],
      },
      integrations: {
        label: "ინტეგრაციები და მაგალითები",
        intro:
          "პაკეტი მუშაობს იმ სტეკზე, რომელზეც აგენტი უკვე ცხოვრობს. მიზანია production-ში სანდო აგენტი, არა პლატფორმის მიგრაცია.",
        items: [
          "აგენტები OpenAI, Anthropic, LangChain, LangGraph ან custom სტეკებზე",
          "CRM, helpdesk და შიდა ინსტრუმენტები, რომლებსაც აგენტი უკვე ეხება",
          "tracing და eval ინსტრუმენტები თქვენს სტეკში, გუნდისთვის ხელახლა გაშვებადი",
          "Slack, Telegram ან email ალერტები guardrails და მონიტორინგის მოვლენებზე",
        ],
      },
      guardrails: {
        label: "დაცვები და დამტკიცება",
        intro:
          "გადარჩენილი აგენტი ნდობას იმით იმსახურებს, რომ ხილულად და იაფად ეცემა, სანამ მარტო მოქმედების უფლებას ისევ მიიღებს.",
        items: [
          "High-risk ქმედებები approval gates-ის უკან მიდის, სანამ eval suite სხვას არ იტყვის.",
          "აგენტის ყოველი ქმედება ლოგირდება იმ კონტექსტთან ერთად, რომელმაც ის წარმოშვა.",
          "ხარჯისა და latency ბიუჯეტები აშკარაა, ალერტებით მათი დარღვევისას.",
          "ძველი ქცევა rollback-ისთვის ხელმისაწვდომი რჩება, სანამ cutover-ის მტკიცებულება არ გამყარდება.",
        ],
      },
      validation: {
        acceptanceTest:
          "შეთანხმდით eval pass rate-ზე რეალური საუბრების რეპრეზენტატულ ნაკრებზე. Rescue გადის მხოლოდ მაშინ, როცა აგენტი ამ მაჩვენებელს აღწევს, high-risk ქმედებები approval gates-ზე ჩერდება და მონიტორინგი ხარჯსა და latency-ს შეთანხმებულ ბიუჯეტში აჩვენებს.",
        measures: [
          "eval pass rate რეპრეზენტატულ საუბრების ნაკრებზე",
          "hallucinated ან არაავტორიზებული ქმედებების წილი",
          "ჩუმი სბოებისა და timeout-ების წილი",
          "საუბრის ღირებულება ბიუჯეტთან შედარებით",
          "ესკალაციისა და approval gate-ის სიხშირე",
        ],
        commercialModel:
          "აუდიტი აფიქსირებს failure modes-ს, eval ნაკრებსა და გავლის ზღვარს. შემდეგ Dali აფასებს ერთ fixed-scope, fixed-price rescue-ს. სამუშაო იწყება დამტკიცების შემდეგ, ხოლო აგენტის უფრო ფართო roadmap ცალკე გადაწყვეტილებაა.",
      },
      delivery: [
        {
          title: "failure modes-ის ტრიაჟი",
          body:
            "ვკითხულობთ რეალურ production საუბრებსა და ლოგებს, ვასახელებთ ნამდვილ failure modes-ს - hallucinated actions, ჩუმი timeouts, drift, ხარჯის ნახტომები - და ვალაგებთ ზიანის მიხედვით.",
        },
        {
          title: "eval suite-ის აწყობა და ფიქსი",
          body:
            "რეპრეზენტატულ საუბრებს ხელახლა გაშვებად eval suite-დ ვაქცევთ, შემდეგ ვასწორებთ guardrails-ს, პრომპტებს, ინსტრუმენტებსა და state-ის მართვას, სანამ suite შეთანხმებულ ზღვარს არ გაივლის.",
        },
        {
          title: "cutover მონიტორინგით",
          body:
            "აგენტი production-ს approval gates-ის უკან უბრუნდება, მონიტორინგით, ბიუჯეტებით და rollback ბილიკით - სტარტიდან 2-4 კვირაში.",
        },
      ],
      fit: {
        fit: [
          "აგენტი ან AI პილოტი უკვე არსებობს და დემოში საკმარისად კარგად მუშაობდა, რომ გადარჩენად ღირდეს.",
          "გაქვთ რეალური საუბრები ან ლოგები, საიდანაც eval suite აიწყობა.",
          "თქვენი მხრიდან ვინმეს შეუძლია high-risk ქმედებების დასახელება და გავლის ზღვრის დადასტურება.",
        ],
        notFit: [
          "მომუშავე პროტოტიპი ჯერ არ არსებობს - ეს აწყობაა, არა rescue.",
          "პროცესი იმდენად შეიცვალა, რომ აგენტის სამუშაო აღარ არსებობს.",
          "არავინ არის, ვინც დამტკიცებებს დაეუფლება ან eval ზღვარს მიიღებს.",
        ],
      },
      faqs: [
        {
          question: "აგენტი სხვა ვენდორმა ააწყო. ეს პრობლემაა?",
          answer:
            "არა. rescue-ების უმეტესობა ზუსტად იქ იწყება. ვკითხულობთ კოდსა და საუბრებს, ვინარჩუნებთ იმას, რაც მუშაობს, და ვცვლით იმას, რაც ეცემა. დამნაშავის ძებნა პაკეტში არ შედის.",
        },
        {
          question: "რატომ eval suite და არა უბრალოდ ბაგების გასწორება?",
          answer:
            "იმიტომ, რომ მის გარეშე ყოველი ფიქსი ანეკდოტია. eval suite «ახლა მუშაობს»-ს გაზომვად მტკიცებად აქცევს, რომელსაც გუნდი ყოველი ცვლილების შემდეგ გადაამოწმებს.",
        },
        {
          question: "ნულიდან ააწყობთ თავიდან?",
          answer:
            "მხოლოდ თუ ტრიაჟი აჩვენებს, რომ შეკეთება rebuild-ზე ძვირი ჯდება, და ეს გადაწყვეტილება სამუშაომდე წერილობით ფიქსირდება. სრული rebuild შეგნებულად ამ პაკეტის scope-ს გარეთაა.",
        },
      ],
      cta: {
        publicLabel: "დაიწყეთ agent rescue აუდიტი",
        publicBody:
          "გამოგვიგზავნეთ, რა უნდა აკეთოს აგენტმა, სად ეცემა და რეალური საუბრების ნიმუში. Dali გიპასუხებთ failure modes-ის ტრიაჟის გეგმით, eval მიდგომით და ფიქსირებული rescue საზღვრით.",
        intakeFields: [
          "ვინ ააწყო აგენტი და რომელ სტეკზე მუშაობს",
          "რა უნდა აკეთოს და რა ხდება რეალურად production-ში",
          "რეალური საუბრების ან ლოგების ნიმუში, რედაქტირებულიც კმარა",
          "ქმედებები, რომლებიც ადამიანის დამტკიცების უკან უნდა დარჩეს",
        ],
        upworkLabel: "ნახეთ, რა უნდა გააგზავნოთ Upwork-ში",
        upworkBody:
          "უპასუხეთ Upwork-ში აგენტის სტეკით, ყველაზე ხშირი სბოით და იმით, შეგიძლიათ თუ არა საუბრების ლოგების გაზიარება. Dali გიპასუხებთ ტრიაჟის გეგმით და ფიქსირებული rescue საზღვრით.",
      },
    },
    "assistants-migration": {
      slug: "assistants-migration",
      name: "Assistants API მიგრაცია",
      summary:
        "ვადით შემოსაზღვრული მიგრაცია OpenAI Assistants API-დან 2026 წლის 26 აგვისტოს shutdown-მდე: ყველა call-ის mapping, state-ისა და threads-ის გადატანა, side-by-side evals და cutover downtime-ის გარეშე.",
      accent: "#0B3A4A",
      accentSoft: "#E4F0F3",
      tint: "#f4f9fa",
      metadata: {
        title: "Assistants API მიგრაცია | Dali",
        description:
          "მიგრაცია OpenAI Assistants API-დან Responses API-ზე 2026 წლის 26 აგვისტოს shutdown-მდე: call mapping, state-ისა და threads-ის გადატანა, side-by-side eval გაშვებები, zero-downtime cutover და thread მონაცემების ექსპორტი.",
      },
      hero: {
        eyebrow: "პაკეტირებული გადაწყვეტა · ვადიანი",
        title:
          "Assistants API ითიშება 2026 წლის 26 აგვისტოს. მიგრირდით, სანამ ეს ავარია გახდება.",
        lead:
          "OpenAI ხურავს /v1/assistants, /v1/threads და /v1/runs-ს 2026 წლის 26 აგვისტოს, და Azure სარკე იმავე ფანჯარაში მიდის. Dali თქვენს ინტეგრაციას Responses API-ზე 1-2 კვირაში გადაიტანს: ყველა call-ის mapping, state-ისა და threads-ის გადატანა, side-by-side evals და cutover downtime-ის გარეშე - thread მონაცემების ექსპორტით shutdown-მდე.",
        supportLine:
          "საუკეთესოდ ერგება გუნდებს მომუშავე Assistants API ინტეგრაციით, რომლებსაც ახლა უნდათ დაგეგმილი მიგრაცია და არა საავარიო rebuild გათიშვის შუაგულში 3-5x ფასად.",
      },
      workflow: {
        label: "პროცესის დიაგრამა",
        intake: ["Assistants API calls", "Thread და run state", "პრომპტები და tool კონფიგები"],
        agentLabel: "Assistants მიგრაცია",
        review: ["ქცევის დიფები", "Eval რეგრესიები", "Cutover-ის დადასტურება"],
        outcomes: ["ინტეგრაცია Responses API-ზე", "Side-by-side eval რეპორტი", "ექსპორტირებული thread მონაცემები"],
      },
      contrast: {
        painTitle: "რას ანაცვლებს",
        painPoints: [
          "production ინტეგრაციას /v1/assistants, /v1/threads და /v1/runs-ზე, რომელსაც მკაცრი გათიშვის თარიღი აქვს მიბმული.",
          "ვარაუდს, რომ ეს endpoint-ების გაცვლაა, როცა იცვლება state-ის მართვა, ხარჯის მოდელი და ფიჩების პარიტეტი.",
          "ლოდინს დედლაინამდე, როცა საავარიო rebuild გათიშვის შუაგულში დაგეგმილ მიგრაციაზე 3-5-ჯერ ძვირი ჯდება.",
        ],
        outcomeTitle: "რას ქმნის",
        outcomePoints: [
          "Assistants API-ის ყოველი call დაწყვილებულია Responses API ეკვივალენტთან, ხარვეზები კი წერილობით არის დასახელებული.",
          "state და threads გადატანილია გააზრებულად და არა ავარიის დროს დაკერებული.",
          "side-by-side eval გაშვება, რომელიც გადატანილ ქცევას გადართვამდე ამტკიცებს.",
        ],
      },
      pilot: {
        label: "scope-ის ზუსტი ფიქსირებული საზღვარი",
        fixedOutcome:
          "ერთი Assistants API ინტეგრაცია: call-by-call mapping, გადატანა Responses API-ზე, გადამოწმება side-by-side eval გაშვებებით და cutover downtime-ის გარეშე, thread მონაცემების ექსპორტით shutdown-მდე.",
        includes: [
          "1 production ინტეგრაცია /v1/assistants, /v1/threads ან /v1/runs-ზე, OpenAI ან Azure",
          "call-by-call mapping Responses API-ზე, პირდაპირი პარიტეტის გარეშე ნაწილების ჩათვლით",
          "state-ისა და threads-ის გადატანა თქვენს კონტროლქვეშ მყოფ საცავში, სადაც API მათ აღარ ინახავს",
          "side-by-side eval გაშვებები ძველი და ახალი ქცევის შესადარებლად რეალურ ქეისებზე",
          "zero-downtime cutover და thread მონაცემების ექსპორტი shutdown-მდე",
        ],
        excludes: [
          "ახალი ფიჩები იმის მიღმა, რასაც თავად მიგრაცია მოითხოვს",
          "გარემომცველი კოდბაზის დაუკავშირებელი რეფაქტორინგი",
          "ასისტენტის ქცევის redesign - ჯერ პარიტეტი, გაუმჯობესებები მერე",
        ],
      },
      integrations: {
        label: "ინტეგრაციები და მაგალითები",
        intro:
          "პაკეტი გადაიტანს იმ ინტეგრაციას, რომელიც გაქვთ, იმ სტეკზე, რომელიც გაქვთ. დედლაინი გარეა; მიგრაციის გეგმა თქვენია.",
        items: [
          "OpenAI Assistants API და Azure OpenAI Assistants სარკე",
          "Responses API სამიზნედ, საუბრის state-ის თქვენს საცავში გადატანით",
          "თქვენი არსებული backend: Node, Python ან რაც არ უნდა მასპინძლობდეს მიმდინარე calls-ს",
          "eval გაშვებები რეალურ საუბრის ქეისებზე გადატანამდე და მის შემდეგ",
        ],
      },
      guardrails: {
        label: "დაცვები და დამტკიცება",
        intro:
          "მიგრაცია მკაცრი გარე დედლაინით ნდობას იმით იმსახურებს, რომ პარიტეტს გადართვამდე ამტკიცებს და არა შემდეგ.",
        items: [
          "არავითარი cutover, სანამ side-by-side eval გაშვება შეთანხმებულ ქეისებზე არ დაემთხვევა.",
          "thread მონაცემები ექსპორტირდება და მოწმდება ძველი endpoint-ების გაქრობამდე.",
          "ძველი ინტეგრაცია მუშაობას განაგრძობს, სანამ ახალი production-ში არ გამყარდება.",
          "ყოველი დაწყვილებული call და ცნობილი პარიტეტის ხარვეზი იწერება და არა მოგვიანებით აღმოჩნდება.",
        ],
      },
      validation: {
        acceptanceTest:
          "გაუშვით შეთანხმებული ქეისების ნაკრები ძველ და ახალ ინტეგრაციაში პარალელურად. მიგრაცია გადის მხოლოდ მაშინ, როცა პასუხები შეთანხმებულ კრიტერიუმებზე ემთხვევა, state გადატანას გადაურჩება, thread მონაცემები ექსპორტირებული და გადამოწმებულია, ხოლო production downtime-ის გარეშე გადაერთვება.",
        measures: [
          "დაწყვილებული და გადატანილი calls მთლიანთან შედარებით",
          "side-by-side eval დამთხვევის წილი შეთანხმებულ ქეისებზე",
          "thread მონაცემების ექსპორტის სისრულე",
          "downtime cutover-ის დროს, მიზანი - ნული",
          "საუბრის ღირებულება მიგრაციამდე და მის შემდეგ",
        ],
        commercialModel:
          "აუდიტი აფიქსირებს call-ების ინვენტარს, eval ქეისებსა და cutover გეგმას. შემდეგ Dali აფასებს ერთ fixed-scope, fixed-price მიგრაციას. 1-2 კვირის ფანჯარა მხოლოდ მანამ ძალაშია, სანამ ეს დაგეგმილი სამუშაოა - დედლაინი არ იძვრის.",
      },
      delivery: [
        {
          title: "ინტეგრაციის mapping",
          body:
            "ვახდენთ ინვენტარიზაციას ყოველი Assistants API call-ის, thread-ისა და run-ის, რომელსაც თქვენი კოდი აკეთებს, და წერილობით ვაფიქსირებთ mapping-ს Responses API-ზე, პარიტეტის არარსებობის ადგილების ჩათვლით.",
        },
        {
          title: "გადატანა და დამტკიცება",
          body:
            "გადაგვაქვს calls და state-ის მართვა, შემდეგ ძველ და ახალ ინტეგრაციას პარალელურად ვუშვებთ რეალურ ქეისებზე, სანამ ქცევა შეთანხმებულ კრიტერიუმებს არ დაემთხვევა.",
        },
        {
          title: "cutover და ექსპორტი",
          body:
            "production Responses API-ზე downtime-ის გარეშე გადაერთვება, thread მონაცემები ექსპორტირებული და გადამოწმებულია, ხოლო ძველი ბილიკი თქვენი გრაფიკით გამოდის მწყობრიდან და არა OpenAI-ის გრაფიკით.",
        },
      ],
      fit: {
        fit: [
          "გაქვთ production ინტეგრაცია Assistants API-ზე, პირდაპირ ან Azure-ის გავლით.",
          "შეგიძლიათ გააზიაროთ კოდის ბილიკები, რომლებიც მას იძახებს, და რეალური საუბრების ნიმუში.",
          "გინდათ ეს დედლაინის იძულებამდე მოგვარდეს.",
        ],
        notFit: [
          "ინტეგრაცია პროტოტიპია, რომელზეც არავინ არის დამოკიდებული - წაშლა შეიძლება იაფი იყოს.",
          "გინდათ ასისტენტის სრული redesign მიგრაციის ფანჯარაში.",
          "არავინ არის, ვინც eval ქეისებს ან cutover-ს დაამტკიცებს.",
        ],
      },
      faqs: [
        {
          question: "ეს უბრალოდ endpoint-ების გაცვლაა?",
          answer:
            "არა. Responses API ცვლის საუბრის state-ის მართვასა და ხარჯის მოდელს, და ფიჩების სრული პარიტეტი არ არსებობს. ზუსტად ამიტომ დაგეგმილი მიგრაცია 1-2 კვირას იღებს, ხოლო საავარიო - გათიშვის შუაგულში - 3-5x ჯდება.",
        },
        {
          question: "რა მოუვა ჩვენს არსებულ threads-ს?",
          answer:
            "ისინი ექსპორტირდება და მოწმდება shutdown-მდე, ხოლო საუბრის state თქვენს კონტროლქვეშ მყოფ საცავში გადადის. 2026 წლის 26 აგვისტოს შემდეგ /v1/threads-ის მონაცემების ამოღებაზე ფსონის დადება არ ღირს.",
        },
        {
          question: "ჩვენ Azure OpenAI-ზე ვართ. დედლაინი გვეხება?",
          answer:
            "დიახ. Azure Assistants სარკე იმავე ფანჯარაში ითიშება, ამიტომ მიგრაციის გზა და დედლაინის დაგეგმვა იგივეა.",
        },
      ],
      cta: {
        publicLabel: "დაიწყეთ მიგრაციის აუდიტი",
        publicBody:
          "გამოგვიგზავნეთ, სად იძახება Assistants API, დაახლოებით რამდენი thread-ია ცოცხალი და ვინ არის ინტეგრაციაზე დამოკიდებული. Dali გიპასუხებთ call-ების ინვენტარის გეგმით, eval მიდგომით და ფიქსირებული მიგრაციის საზღვრით.",
        intakeFields: [
          "სად მუშაობს ინტეგრაცია: OpenAI პირდაპირ თუ Azure",
          "კოდის ბილიკები ან სერვისები, რომლებიც /v1/assistants, /v1/threads, /v1/runs-ს იძახებენ",
          "ცოცხალი thread-ების სავარაუდო მოცულობა და რა არის მათზე დამოკიდებული",
          "რეალური საუბრების ნიმუში eval ქეისებისთვის",
        ],
        upworkLabel: "ნახეთ, რა უნდა გააგზავნოთ Upwork-ში",
        upworkBody:
          "უპასუხეთ Upwork-ში სტეკით, Assistants API-ის გამოძახების ადგილებით და thread-ების მოცულობით. Dali გიპასუხებთ მიგრაციის გეგმით და ფიქსირებული scope საზღვრით.",
      },
    },
  } as Record<PilotSourceSlug, PilotSourceContent>, familyShells),
  labels: {
    browseAllPilots: "ყველა პაკეტის ნახვა",
    copyDetailedBrief: "დეტალური brief-ის კოპირება",
    briefCopied: "Brief დაკოპირდა",
    keepConversationOnPlatform: "შეინარჩუნეთ საუბარი პლატფორმაზე",
    returnToUpwork: "დაბრუნდით თქვენს Upwork მიმოწერაში და გაგზავნეთ ზემოთ მოცემული დეტალები.",
    humanReview: "ადამიანის შემოწმება",
    liveOutcome: "შედეგი live რეჟიმში",
    painVersusOutcome: "პრობლემა და შედეგი",
    contrastTitle: "ჩაანაცვლეთ ხახუნი ერთი დამტკიცებული ოპერაციული გზით.",
    pilotBoundary: "პაკეტის საზღვარი",
    boundaryTitle: "ფიქსირებული მოცულობა გაფართოებამდე.",
    included: "შედის პაკეტში",
    excluded: "განზრახ დარჩა მოცულობის გარეთ",
    systemSurfaces: "სისტემის ზედაპირები",
    surfacesTitle: "ინტეგრაციები, მაგალითები და კონტროლის წერტილები.",
    acceptanceTest: "მიღების ტესტი",
    validationTitle: "ზუსტად იცოდეთ, რას ნიშნავს რომ სისტემა მუშაობს.",
    passCondition: "პაკეტის ჩაბარების პირობა",
    measures: "მაჩვენებლები, რომლებსაც გუნდთან ერთად ვამოწმებთ",
    deliveryEyebrow: "მიწოდება სამ ნაბიჯში",
    deliveryTitle: "ერთი პრაქტიკული გზა გაშვებამდე.",
    stepPrefix: "ნაბიჯი",
    fitCheck: "შესაბამისობის შემოწმება",
    fitTitle: "როდის არის ძლიერი შესაბამისობა, სუსტი შესაბამისობა და რა არ უნდა დავაძალოთ.",
    goodFit: "კარგი შესაბამისობა",
    notFit: "ჯერ არ არის შესაფერისი",
    faq: "FAQ",
    faqTitle: "პრაქტიკული კითხვები პაკეტის დაწყებამდე.",
    ctaEyebrow: "შემდეგი ნაბიჯი",
    ctaTitle: "დაიწყეთ ყველაზე ვიწრო, მაგრამ სასარგებლო პაკეტით.",
    sendUpwork: "რა უნდა გაგზავნოთ Upwork-ში",
    sendDali: "რა უნდა გაუგზავნოთ Dali-ს",
    commercialModel: "კომერციული მოდელი",
    commercialBody:
      "Dali არ გთხოვთ, რომ თავიდანვე ფართო ავტომატიზაციის პროგრამა იყიდოთ. ჩვენ ვადგენთ ერთ მიღების ტესტს, ვაფასებთ ერთ პაკეტს, ვაშენებთ მხოლოდ შეთანხმების შემდეგ და მოცულობას ვაფართოებთ მხოლოდ მაშინ, როცა პირველი პროცესი შემოწმებას გაივლის.",
    workflowAriaSuffix: "პროცესის დიაგრამა",
    chooseLane: "Choose a fixed lane",
    lanesTitle: "One system shell. Fixed lanes inside.",
    laneAcceptance: "Lane acceptance test",
    startWithLane: "Start with this lane",
    fixedPackage: "ფიქსირებული პაკეტი",
    priceFrom: "მინიმუმ",
    priceRange: "ტიპური დიაპაზონი",
    pricingNoteBundle: "ორივე fixed lane ერთ პაკეტში.",
    pricingNoteLane: "ერთ საწყის lane-ზე.",
    guarantee: "თუ მიღების ტესტი არ ჩაბარდა, თქვენ არ იხდით.",
    foundingNote:
      "Founding კლიენტის ტარიფი: პირველი 5 კლიენტი იღებს 25% ფასდაკლებას მეტრიკებიანი საჯარო ქეისის სანაცვლოდ.",
    careHandoff:
      "გაშვების შემდეგ ყველა პაკეტი გადადის Agent Care-ში - მონიტორინგი, eval რეგრესიები და ერთი გაზომვადი გაუმჯობესება თვეში.",
  },
} satisfies LocalizedSolutionsBundle;
