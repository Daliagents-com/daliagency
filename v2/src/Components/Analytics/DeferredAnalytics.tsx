// Purpose: Client-only deferred analytics mount (layout cannot use dynamic ssr:false).
"use client";

import dynamic from "next/dynamic";

const FunnelAnalytics = dynamic(
  () => import("@/Components/Analytics/FunnelAnalytics"),
  { ssr: false },
);
const ProductSessionAnalytics = dynamic(
  () => import("@/Components/Analytics/ProductSessionAnalytics"),
  { ssr: false },
);

export default function DeferredAnalytics({
  enableVercelFunnel = false,
}: {
  enableVercelFunnel?: boolean;
}) {
  return (
    <>
      {enableVercelFunnel ? <FunnelAnalytics /> : null}
      <ProductSessionAnalytics />
    </>
  );
}
