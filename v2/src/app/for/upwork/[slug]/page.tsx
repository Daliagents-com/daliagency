// Purpose: Publish policy-safe Upwork mirrors for Dali's packaged pilot solution pages.
// Scope: Static detail routes with noindex metadata and on-platform CTA only.
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SolutionLanding } from "@/Components/Solutions/SolutionPages";
import {
  buildUpworkMetadata,
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

  return buildUpworkMetadata(solution);
}

export default async function UpworkSolutionPage({ params }: RouteProps) {
  const { slug } = await params;
  const solution = getSolutionBySlug(slug);

  if (!solution) {
    notFound();
  }

  return <SolutionLanding solution={solution} variant="upwork" />;
}
