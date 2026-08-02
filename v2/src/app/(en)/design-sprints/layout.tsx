import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design Sprints | Dali",
  description:
    "Align the product vision, build a realistic prototype, and test it with users before implementation.",
  alternates: {
    canonical: "/design-sprints",
    languages: {
      en: "/design-sprints",
      ru: "/ru/design-sprints",
      ka: "/ge/design-sprints",
      hy: "/arm/design-sprints",
    },
  },
};

export default function DesignSprintsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
