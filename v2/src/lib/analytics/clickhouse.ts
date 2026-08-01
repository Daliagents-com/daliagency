// Purpose: Server-only ClickHouse writer for custom product analytics.
// Scope: Insert web_events rows; no-op when ClickHouse env is not configured.
import { createClient, type ClickHouseClient } from "@clickhouse/client";
import {
  sanitizeProps,
  sanitizeSessionId,
  sanitizeVisitorId,
  type AnalyticsEventInput,
} from "./events";

export type WebEventRow = {
  event_time: string;
  event_name: string;
  session_id: string;
  path: string;
  locale: string;
  source: string;
  referrer: string;
  props: string;
  user_agent: string;
  vercel_env: string;
  vercel_region: string;
};

let client: ClickHouseClient | null | undefined;

function isClickHouseConfigured(): boolean {
  // URL/host is the real gate. Password may be empty on local single-node setups.
  return Boolean(process.env.CLICKHOUSE_URL || process.env.CLICKHOUSE_HOST);
}

export function getClickHouseClient(): ClickHouseClient | null {
  if (client !== undefined) return client;

  if (!isClickHouseConfigured()) {
    client = null;
    return client;
  }

  const url =
    process.env.CLICKHOUSE_URL ||
    process.env.CLICKHOUSE_HOST ||
    "http://localhost:8123";

  client = createClient({
    url,
    username: process.env.CLICKHOUSE_USER ?? "default",
    password: process.env.CLICKHOUSE_PASSWORD ?? "",
    database: process.env.CLICKHOUSE_DATABASE ?? "default",
    application: "dali-website",
    request_timeout: 8_000,
    clickhouse_settings: {
      // Fire-and-forget style inserts fit serverless traffic spikes.
      async_insert: 1,
      wait_for_async_insert: 0,
    },
  });

  return client;
}

function nowIsoMs(): string {
  return new Date().toISOString().replace("T", " ").replace("Z", "");
}

export function buildWebEventRow(
  input: AnalyticsEventInput,
  meta: {
    referrer?: string;
    userAgent?: string;
  } = {},
): WebEventRow {
  const props = sanitizeProps(input.props);
  if (input.source && !props.source) {
    props.source = input.source.slice(0, 256);
  }
  const visitorId = sanitizeVisitorId(input.visitorId);
  if (visitorId && !props.visitor_id) {
    props.visitor_id = visitorId;
  }

  return {
    event_time: nowIsoMs(),
    event_name: input.name,
    session_id: sanitizeSessionId(input.sessionId),
    path: (input.path ?? "").slice(0, 512),
    locale: (input.locale ?? "").slice(0, 16),
    source: (input.source ?? "").slice(0, 128),
    referrer: (meta.referrer ?? "").slice(0, 512),
    props: JSON.stringify(props),
    user_agent: (meta.userAgent ?? "").slice(0, 256),
    vercel_env: process.env.VERCEL_ENV ?? process.env.NODE_ENV ?? "unknown",
    vercel_region: process.env.VERCEL_REGION ?? "",
  };
}

export async function insertWebEvent(
  input: AnalyticsEventInput,
  meta?: {
    referrer?: string;
    userAgent?: string;
  },
): Promise<{ ok: true; skipped?: boolean } | { ok: false; error: string }> {
  const ch = getClickHouseClient();
  if (!ch) {
    return { ok: true, skipped: true };
  }

  const table = process.env.CLICKHOUSE_EVENTS_TABLE ?? "web_events";
  const row = buildWebEventRow(input, meta);

  try {
    await ch.insert({
      table,
      values: [row],
      format: "JSONEachRow",
    });
    return { ok: true };
  } catch (error) {
    const message = error instanceof Error ? error.message : "insert failed";
    console.error("[analytics/clickhouse]", message);
    return { ok: false, error: message };
  }
}
