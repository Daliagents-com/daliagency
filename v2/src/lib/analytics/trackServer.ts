// Purpose: Server-side product analytics (Route Handlers / Server Actions).
// Dual-write: Vercel Web Analytics custom events + ClickHouse when configured.
import { track } from "@vercel/analytics/server";
import { insertWebEvent } from "./clickhouse";
import {
  isValidEventName,
  sanitizeProps,
  type AnalyticsEventInput,
  type AnalyticsProps,
} from "./events";

function vercelProps(
  props: AnalyticsProps | undefined,
  extras: { path?: string; locale?: string; source?: string },
): Record<string, string | number | boolean> {
  const base = sanitizeProps(props);
  if (extras.path) base.path = extras.path.slice(0, 256);
  if (extras.locale) base.locale = extras.locale.slice(0, 16);
  if (extras.source) base.source = extras.source.slice(0, 128);
  return base;
}

/**
 * Track a product event from the server.
 * Never throws - analytics must not break request handlers.
 */
export async function trackServerEvent(
  input: AnalyticsEventInput,
  meta?: {
    referrer?: string;
    userAgent?: string;
  },
): Promise<void> {
  if (!isValidEventName(input.name)) {
    console.error("[analytics] invalid event name", input.name);
    return;
  }

  const props = vercelProps(input.props, {
    path: input.path,
    locale: input.locale,
    source: input.source,
  });

  try {
    await track(input.name, props);
  } catch (error) {
    console.error(
      "[analytics/vercel]",
      error instanceof Error ? error.message : error,
    );
  }

  await insertWebEvent(input, meta);
}
