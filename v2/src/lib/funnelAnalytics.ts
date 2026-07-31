// Purpose: Attribute marketplace landing-page views without changing the visible URL.
// Scope: Validate opaque listing references and rewrite only Vercel page-view events.
import type { BeforeSendEvent } from "@vercel/analytics/next";

const upworkReferencePattern = /^uw-(\d{18,24})$/;
const flReferencePattern = /^fl-(\d{6,9})$/;
const funnelPathPattern =
  /^\/(?:solutions|for\/upwork|ru\/solutions)\/[a-z0-9-]+\/?$/;

function getReferenceCode(reference: string) {
  const upworkMatch = reference.match(upworkReferencePattern);

  if (upworkMatch?.[1]) {
    return `upwork-${upworkMatch[1]}`;
  }

  const flMatch = reference.match(flReferencePattern);

  if (flMatch?.[1]) {
    return `fl-${flMatch[1]}`;
  }

  return null;
}

export function attributeFunnelPageView(
  event: BeforeSendEvent,
  pageHref: string,
): BeforeSendEvent {
  if (event.type !== "pageview") {
    return event;
  }

  const pageUrl = new URL(pageHref);
  const reference = pageUrl.searchParams.get("ref");
  const referenceCode = reference ? getReferenceCode(reference) : null;

  if (!referenceCode) {
    return event;
  }

  const eventUrl = new URL(event.url);

  if (!funnelPathPattern.test(eventUrl.pathname)) {
    return event;
  }

  eventUrl.pathname = `${eventUrl.pathname.replace(/\/$/, "")}/_ref/${referenceCode}`;
  eventUrl.search = "";
  eventUrl.hash = "";

  return {
    ...event,
    url: eventUrl.toString(),
  };
}
