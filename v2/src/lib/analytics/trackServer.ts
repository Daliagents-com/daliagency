// Purpose: Server-side product events via PostHog Node (+ optional Vercel).
import { PostHog } from "posthog-node";
import { track } from "@vercel/analytics/server";
import { sanitizeProps, type AnalyticsEventName, type AnalyticsProps } from "./events";

function getServerKey(): string {
  return (
    process.env.POSTHOG_API_KEY ||
    process.env.NEXT_PUBLIC_POSTHOG_KEY ||
    ""
  ).trim();
}

function getHost(): string {
  return (
    process.env.NEXT_PUBLIC_POSTHOG_HOST ||
    process.env.POSTHOG_HOST ||
    "https://us.i.posthog.com"
  ).trim();
}

/**
 * Track a product event from Route Handlers / Server Actions.
 * Never throws - analytics must not break request handlers.
 */
export async function trackServerEvent(input: {
  name: AnalyticsEventName;
  props?: AnalyticsProps;
  path?: string;
  locale?: string;
  source?: string;
  /** Prefer a stable anonymous id when available. */
  distinctId?: string;
}): Promise<void> {
  const props = sanitizeProps({
    ...input.props,
    ...(input.path ? { path: input.path.slice(0, 256) } : {}),
    ...(input.locale ? { locale: input.locale } : {}),
    ...(input.source ? { source: input.source } : {}),
  });

  try {
    await track(input.name, props);
  } catch (error) {
    console.error(
      "[analytics/vercel]",
      error instanceof Error ? error.message : error,
    );
  }

  const key = getServerKey();
  if (!key) return;

  const client = new PostHog(key, {
    host: getHost(),
    flushAt: 1,
    flushInterval: 0,
  });

  try {
    client.capture({
      distinctId: input.distinctId || "server",
      event: input.name,
      properties: {
        ...props,
        $lib: "dali-server",
      },
    });
    await client.shutdown();
  } catch (error) {
    console.error(
      "[analytics/posthog-server]",
      error instanceof Error ? error.message : error,
    );
    try {
      await client.shutdown();
    } catch {
      // ignore
    }
  }
}
