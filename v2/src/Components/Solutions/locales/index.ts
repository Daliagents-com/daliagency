import type { Locale } from "@/i18n/config";
import { armenianSolutionsBundle } from "./arm";
import { englishSolutionsBundle } from "./en";
import { georgianSolutionsBundle } from "./ge";
import { russianSolutionsBundle } from "./ru";
import type { LocalizedSolutionsBundle } from "./types";

export const solutionsBundles = {
  en: englishSolutionsBundle,
  ru: russianSolutionsBundle,
  ge: georgianSolutionsBundle,
  arm: armenianSolutionsBundle,
} satisfies Record<Locale, LocalizedSolutionsBundle>;
