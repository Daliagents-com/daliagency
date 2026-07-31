// Purpose: Keep Dali's public contact destination and reusable audit brief in one place.
// Scope: Email-based intake for AI agent and workflow audit pages.
import type { Locale } from "@/i18n/config";

export const daliContactEmail = "dav.hakobyan100@gmail.com";

export function buildMailtoHref(subject: string, body: string) {
  return `mailto:${daliContactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const generalAuditCopy: Record<
  Locale,
  {
    subject: string;
    lines: readonly string[];
  }
> = {
  en: {
    subject: "Dali workflow audit",
    lines: [
      "Hi Dali,",
      "",
      "I want to audit one workflow before discussing implementation.",
      "",
      "The recurring workflow:",
      "",
      "Current tools:",
      "",
      "Approximate weekly volume or time lost:",
      "",
      "Cases that must always wait for a person:",
      "",
      "Which pilot seems closest:",
    ],
  },
  ru: {
    subject: "Dali: аудит рабочего процесса",
    lines: [
      "Здравствуйте, Dali.",
      "",
      "Хочу провести аудит одного рабочего процесса перед обсуждением внедрения.",
      "",
      "Повторяющийся рабочий процесс:",
      "",
      "Текущие инструменты:",
      "",
      "Примерный недельный объем или потери времени:",
      "",
      "Случаи, которые всегда должны ждать человека:",
      "",
      "Какой пилот кажется наиболее подходящим:",
    ],
  },
  ge: {
    subject: "Dali: სამუშაო პროცესის აუდიტი",
    lines: [
      "გამარჯობა, Dali.",
      "",
      "მსურს ერთი სამუშაო პროცესის აუდიტი დანერგვის განხილვამდე.",
      "",
      "განმეორებადი სამუშაო პროცესი:",
      "",
      "მიმდინარე ინსტრუმენტები:",
      "",
      "დაახლოებითი ყოველკვირეული მოცულობა ან დაკარგული დრო:",
      "",
      "შემთხვევები, რომლებიც ყოველთვის ადამიანის ჩართვას საჭიროებს:",
      "",
      "რომელი პილოტი ჩანს ყველაზე ახლოს:",
    ],
  },
  arm: {
    subject: "Dali: աշխատանքային հոսքի աուդիտ",
    lines: [
      "Բարև, Dali։",
      "",
      "Ցանկանում եմ մեկ աշխատանքային հոսքի աուդիտ անցկացնել նախքան ներդրումը քննարկելը։",
      "",
      "Կրկնվող աշխատանքային հոսքը՝",
      "",
      "Ընթացիկ գործիքները՝",
      "",
      "Մոտավոր շաբաթական ծավալը կամ կորցրած ժամանակը՝",
      "",
      "Դեպքերը, որոնք միշտ պետք է սպասեն մարդու վերանայմանը՝",
      "",
      "Որ պիլոտն է ամենամոտը՝",
    ],
  },
};

export function getGeneralAuditHref(locale: Locale = "en") {
  const copy = generalAuditCopy[locale];
  return buildMailtoHref(copy.subject, copy.lines.join("\n"));
}

export const generalAuditHref = getGeneralAuditHref();
