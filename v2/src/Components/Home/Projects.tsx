import Container from "@/Components/Container/Container";
import { ProjectShowcase } from "@/Components/ui/project-showcase";
import React from "react";
import type { Locale } from "@/i18n/config";

export default function Projects({ locale = "en" }: { locale?: Locale }) {
  return (
    <section
      id="projects"
      className="relative scroll-mt-80 py-64 md:scroll-mt-64 md:py-100"
    >
      <Container wide>
        <div className="px-[clamp(6px,1vw,16px)]">
          <ProjectShowcase locale={locale} />
        </div>
      </Container>
    </section>
  );
}
