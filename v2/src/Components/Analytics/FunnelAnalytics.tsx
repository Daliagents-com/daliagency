"use client";

// Purpose: Enable Vercel page views with safe marketplace-listing attribution.
// Scope: Client adapter around the official analytics component.
import {
  Analytics,
  type BeforeSendEvent,
} from "@vercel/analytics/next";
import { attributeFunnelPageView } from "@/lib/funnelAnalytics";

function beforeSend(event: BeforeSendEvent) {
  return attributeFunnelPageView(event, window.location.href);
}

export default function FunnelAnalytics() {
  return <Analytics beforeSend={beforeSend} />;
}
