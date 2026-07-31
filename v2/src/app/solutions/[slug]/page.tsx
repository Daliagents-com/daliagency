// Purpose: Publish static public solution landing pages for each packaged Dali pilot.
// Scope: Route entrypoint for the public solutions detail pages.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionLanding } from "@/Components/Solutions/SolutionPages";
import {
  buildPublicMetadata,
  getSolutionBySlug,
  solutionSlugs,
} from "@/Components/Solutions/solutionContent";

type RouteProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return solutionSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: RouteProps): Promise<Metadata> {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    return {};
  }

  return buildPublicMetadata(solution);
}

export default async function SolutionDetailPage({ params }: RouteProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return <SolutionLanding solution={solution} variant="public" />;
}
