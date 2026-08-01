// Purpose: Accept browser product/session events and insert into ClickHouse.
// Vercel Web Analytics is written client-side for select events; this route is the CH mirror.
import { NextResponse } from "next/server";
import { insertWebEvent } from "@/lib/analytics/clickhouse";
import {
  isValidEventName,
  sanitizeProps,
  sanitizeSessionId,
  sanitizeVisitorId,
  type AnalyticsProps,
} from "@/lib/analytics/events";

export const runtime = "nodejs";

type Body = {
  name?: unknown;
  props?: unknown;
  path?: unknown;
  locale?: unknown;
  source?: unknown;
  sessionId?: unknown;
  visitorId?: unknown;
};

function asString(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value.slice(0, max);
}

function asProps(value: unknown): AnalyticsProps | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return undefined;
  }
  return value as AnalyticsProps;
}

export async function POST(request: Request) {
  let body: Body;

  try {
    body = (await request.json()) as Body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = asString(body.name, 64);
  if (!isValidEventName(name)) {
    return NextResponse.json({ ok: false, error: "invalid_event" }, { status: 400 });
  }

  const visitorId = sanitizeVisitorId(asString(body.visitorId, 64));
  const props = sanitizeProps({
    ...asProps(body.props),
    ...(visitorId ? { visitor_id: visitorId } : {}),
  });
  const path = asString(body.path, 512);
  const locale = asString(body.locale, 16);
  const source = asString(body.source, 128);
  const sessionId = sanitizeSessionId(asString(body.sessionId, 64));

  const referrer = request.headers.get("referer") ?? "";
  const userAgent = request.headers.get("user-agent") ?? "";

  const result = await insertWebEvent(
    {
      name,
      props,
      path,
      locale,
      source,
      sessionId,
      visitorId,
    },
    { referrer, userAgent },
  );

  if (!result.ok) {
    return NextResponse.json({ ok: false }, { status: 202 });
  }

  return NextResponse.json({ ok: true, skipped: result.skipped === true });
}

export async function GET() {
  return NextResponse.json(
    { ok: false, error: "method_not_allowed" },
    { status: 405 },
  );
}
