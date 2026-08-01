// Purpose: Read-side ClickHouse queries for the internal product analytics dashboard.
import { getClickHouseClient } from "./clickhouse";
import { AnalyticsEvent } from "./events";

export type DashboardRange = 7 | 30 | 90;

export type DashboardKpis = {
  opens: number;
  submits: number;
  errors: number;
  submitRate: number;
  uniqueSessions: number;
  uniqueVisitors: number;
  pageviews: number;
  clicks: number;
  activeSeconds: number;
};

export type NamedCount = {
  name: string;
  count: number;
};

export type DayCount = {
  day: string;
  opens: number;
  submits: number;
  errors: number;
  pageviews: number;
};

export type SessionRow = {
  session_id: string;
  visitor_id: string;
  started: string;
  ended: string;
  duration_s: number;
  pageviews: number;
  clicks: number;
  heartbeats: number;
  last_path: string;
  events: number;
};

export type RecentEvent = {
  event_time: string;
  event_name: string;
  session_id: string;
  source: string;
  path: string;
  locale: string;
  props: string;
  vercel_env: string;
};

export type DashboardSnapshot = {
  configured: boolean;
  rangeDays: DashboardRange;
  kpis: DashboardKpis;
  byDay: DayCount[];
  topSources: NamedCount[];
  byInterest: NamedCount[];
  byLocale: NamedCount[];
  byEvent: NamedCount[];
  topPages: NamedCount[];
  topClicks: NamedCount[];
  timeOnPages: NamedCount[];
  sessions: SessionRow[];
  sessionTimeline: RecentEvent[];
  recent: RecentEvent[];
  focusSessionId: string;
  error?: string;
};

function eventsTable(): string {
  const raw = process.env.CLICKHOUSE_EVENTS_TABLE ?? "web_events";
  if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(raw)) {
    return "web_events";
  }
  return raw;
}

function emptySnapshot(
  rangeDays: DashboardRange,
  error?: string,
  configured = false,
): DashboardSnapshot {
  return {
    configured,
    rangeDays,
    kpis: {
      opens: 0,
      submits: 0,
      errors: 0,
      submitRate: 0,
      uniqueSessions: 0,
      uniqueVisitors: 0,
      pageviews: 0,
      clicks: 0,
      activeSeconds: 0,
    },
    byDay: [],
    topSources: [],
    byInterest: [],
    byLocale: [],
    byEvent: [],
    topPages: [],
    topClicks: [],
    timeOnPages: [],
    sessions: [],
    sessionTimeline: [],
    recent: [],
    focusSessionId: "",
    error,
  };
}

function asNumber(value: unknown): number {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const n = Number(value);
    return Number.isFinite(n) ? n : 0;
  }
  return 0;
}

export function parseDashboardRange(raw: string | null | undefined): DashboardRange {
  if (raw === "7" || raw === "30" || raw === "90") {
    return Number(raw) as DashboardRange;
  }
  return 30;
}

export function parseSessionId(raw: string | null | undefined): string {
  if (!raw) return "";
  const trimmed = raw.trim().slice(0, 64);
  if (!/^[a-zA-Z0-9_-]+$/.test(trimmed)) return "";
  return trimmed;
}

function mapRecent(rows: Record<string, unknown>[]): RecentEvent[] {
  return rows.map((row) => ({
    event_time: String(row.event_time_label ?? row.event_time ?? ""),
    event_name: String(row.event_name ?? ""),
    session_id: String(row.session_id ?? ""),
    source: String(row.source ?? ""),
    path: String(row.path ?? ""),
    locale: String(row.locale ?? ""),
    props: String(row.props ?? "{}"),
    vercel_env: String(row.vercel_env ?? ""),
  }));
}

export async function loadDashboardSnapshot(
  rangeDays: DashboardRange,
  focusSessionId = "",
): Promise<DashboardSnapshot> {
  const ch = getClickHouseClient();
  if (!ch) {
    return emptySnapshot(rangeDays, "ClickHouse is not configured", false);
  }

  const table = eventsTable();
  const open = AnalyticsEvent.ConsultationOpen;
  const submit = AnalyticsEvent.ConsultationSubmit;
  const error = AnalyticsEvent.ConsultationError;
  const pageView = AnalyticsEvent.PageView;
  const click = AnalyticsEvent.ElementClick;
  const heartbeat = AnalyticsEvent.SessionHeartbeat;

  try {
    const [
      kpiRows,
      dayRows,
      sourceRows,
      interestRows,
      localeRows,
      eventRows,
      pageRows,
      clickRows,
      timeRows,
      sessionRows,
      recentRows,
      timelineRows,
    ] = await Promise.all([
      ch
        .query({
          query: `
            SELECT
              countIf(event_name = {open:String}) AS opens,
              countIf(event_name = {submit:String}) AS submits,
              countIf(event_name = {error:String}) AS errors,
              uniqExactIf(session_id, session_id != '') AS unique_sessions,
              uniqExactIf(
                JSONExtractString(props, 'visitor_id'),
                JSONExtractString(props, 'visitor_id') != ''
              ) AS unique_visitors,
              countIf(event_name = {pageView:String}) AS pageviews,
              countIf(event_name = {click:String}) AS clicks,
              sumIf(
                JSONExtractInt(props, 'tick_s'),
                event_name = {heartbeat:String}
              ) AS active_seconds
            FROM ${table}
            WHERE event_time >= now() - INTERVAL {days:UInt16} DAY
          `,
          query_params: {
            open,
            submit,
            error,
            pageView,
            click,
            heartbeat,
            days: rangeDays,
          },
          format: "JSONEachRow",
        })
        .then((r) => r.json<Record<string, unknown>>()),

      ch
        .query({
          query: `
            SELECT
              formatDateTime(toStartOfDay(event_time), '%Y-%m-%d') AS day,
              countIf(event_name = {open:String}) AS opens,
              countIf(event_name = {submit:String}) AS submits,
              countIf(event_name = {error:String}) AS errors,
              countIf(event_name = {pageView:String}) AS pageviews
            FROM ${table}
            WHERE event_time >= now() - INTERVAL {days:UInt16} DAY
            GROUP BY day
            ORDER BY day ASC
          `,
          query_params: { open, submit, error, pageView, days: rangeDays },
          format: "JSONEachRow",
        })
        .then((r) => r.json<Record<string, unknown>>()),

      ch
        .query({
          query: `
            SELECT
              if(source = '', '(unknown)', source) AS name,
              count() AS count
            FROM ${table}
            WHERE event_name = {open:String}
              AND event_time >= now() - INTERVAL {days:UInt16} DAY
            GROUP BY name
            ORDER BY count DESC
            LIMIT 12
          `,
          query_params: { open, days: rangeDays },
          format: "JSONEachRow",
        })
        .then((r) => r.json<Record<string, unknown>>()),

      ch
        .query({
          query: `
            SELECT
              if(
                JSONExtractString(props, 'interest') = '',
                '(unknown)',
                JSONExtractString(props, 'interest')
              ) AS name,
              count() AS count
            FROM ${table}
            WHERE event_name = {submit:String}
              AND event_time >= now() - INTERVAL {days:UInt16} DAY
            GROUP BY name
            ORDER BY count DESC
            LIMIT 12
          `,
          query_params: { submit, days: rangeDays },
          format: "JSONEachRow",
        })
        .then((r) => r.json<Record<string, unknown>>()),

      ch
        .query({
          query: `
            SELECT
              if(locale = '', '(unknown)', locale) AS name,
              count() AS count
            FROM ${table}
            WHERE event_time >= now() - INTERVAL {days:UInt16} DAY
            GROUP BY name
            ORDER BY count DESC
            LIMIT 12
          `,
          query_params: { days: rangeDays },
          format: "JSONEachRow",
        })
        .then((r) => r.json<Record<string, unknown>>()),

      ch
        .query({
          query: `
            SELECT
              event_name AS name,
              count() AS count
            FROM ${table}
            WHERE event_time >= now() - INTERVAL {days:UInt16} DAY
            GROUP BY name
            ORDER BY count DESC
            LIMIT 20
          `,
          query_params: { days: rangeDays },
          format: "JSONEachRow",
        })
        .then((r) => r.json<Record<string, unknown>>()),

      ch
        .query({
          query: `
            SELECT
              if(path = '', '(unknown)', path) AS name,
              count() AS count
            FROM ${table}
            WHERE event_name = {pageView:String}
              AND event_time >= now() - INTERVAL {days:UInt16} DAY
            GROUP BY name
            ORDER BY count DESC
            LIMIT 15
          `,
          query_params: { pageView, days: rangeDays },
          format: "JSONEachRow",
        })
        .then((r) => r.json<Record<string, unknown>>()),

      ch
        .query({
          query: `
            SELECT
              if(
                JSONExtractString(props, 'label') = '',
                if(source = '', '(unknown)', source),
                JSONExtractString(props, 'label')
              ) AS name,
              count() AS count
            FROM ${table}
            WHERE event_name = {click:String}
              AND event_time >= now() - INTERVAL {days:UInt16} DAY
            GROUP BY name
            ORDER BY count DESC
            LIMIT 15
          `,
          query_params: { click, days: rangeDays },
          format: "JSONEachRow",
        })
        .then((r) => r.json<Record<string, unknown>>()),

      ch
        .query({
          query: `
            SELECT
              if(path = '', '(unknown)', path) AS name,
              sum(JSONExtractInt(props, 'tick_s')) AS count
            FROM ${table}
            WHERE event_name = {heartbeat:String}
              AND event_time >= now() - INTERVAL {days:UInt16} DAY
            GROUP BY name
            ORDER BY count DESC
            LIMIT 15
          `,
          query_params: { heartbeat, days: rangeDays },
          format: "JSONEachRow",
        })
        .then((r) => r.json<Record<string, unknown>>()),

      ch
        .query({
          query: `
            SELECT
              session_id,
              any(JSONExtractString(props, 'visitor_id')) AS visitor_id,
              formatDateTime(min(event_time), '%Y-%m-%d %H:%i:%S') AS started,
              formatDateTime(max(event_time), '%Y-%m-%d %H:%i:%S') AS ended,
              dateDiff('second', min(event_time), max(event_time)) AS duration_s,
              countIf(event_name = {pageView:String}) AS pageviews,
              countIf(event_name = {click:String}) AS clicks,
              countIf(event_name = {heartbeat:String}) AS heartbeats,
              argMax(path, event_time) AS last_path,
              count() AS events
            FROM ${table}
            WHERE session_id != ''
              AND event_time >= now() - INTERVAL {days:UInt16} DAY
            GROUP BY session_id
            ORDER BY max(event_time) DESC
            LIMIT 40
          `,
          query_params: { pageView, click, heartbeat, days: rangeDays },
          format: "JSONEachRow",
        })
        .then((r) => r.json<Record<string, unknown>>()),

      ch
        .query({
          query: `
            SELECT
              formatDateTime(event_time, '%Y-%m-%d %H:%i:%S') AS event_time_label,
              event_name,
              session_id,
              source,
              path,
              locale,
              props,
              vercel_env
            FROM ${table}
            WHERE event_time >= now() - INTERVAL {days:UInt16} DAY
            ORDER BY event_time DESC
            LIMIT 50
          `,
          query_params: { days: rangeDays },
          format: "JSONEachRow",
        })
        .then((r) => r.json<Record<string, unknown>>()),

      focusSessionId
        ? ch
            .query({
              query: `
                SELECT
                  formatDateTime(event_time, '%Y-%m-%d %H:%i:%S') AS event_time_label,
                  event_name,
                  session_id,
                  source,
                  path,
                  locale,
                  props,
                  vercel_env
                FROM ${table}
                WHERE session_id = {sessionId:String}
                  AND event_time >= now() - INTERVAL {days:UInt16} DAY
                ORDER BY event_time ASC
                LIMIT 200
              `,
              query_params: { sessionId: focusSessionId, days: rangeDays },
              format: "JSONEachRow",
            })
            .then((r) => r.json<Record<string, unknown>>())
        : Promise.resolve([] as Record<string, unknown>[]),
    ]);

    const kpi = kpiRows[0] ?? {};
    const opens = asNumber(kpi.opens);
    const submits = asNumber(kpi.submits);
    const errors = asNumber(kpi.errors);

    return {
      configured: true,
      rangeDays,
      focusSessionId,
      kpis: {
        opens,
        submits,
        errors,
        submitRate: opens > 0 ? submits / opens : 0,
        uniqueSessions: asNumber(kpi.unique_sessions),
        uniqueVisitors: asNumber(kpi.unique_visitors),
        pageviews: asNumber(kpi.pageviews),
        clicks: asNumber(kpi.clicks),
        activeSeconds: asNumber(kpi.active_seconds),
      },
      byDay: dayRows.map((row) => ({
        day: String(row.day ?? ""),
        opens: asNumber(row.opens),
        submits: asNumber(row.submits),
        errors: asNumber(row.errors),
        pageviews: asNumber(row.pageviews),
      })),
      topSources: sourceRows.map((row) => ({
        name: String(row.name ?? ""),
        count: asNumber(row.count),
      })),
      byInterest: interestRows.map((row) => ({
        name: String(row.name ?? ""),
        count: asNumber(row.count),
      })),
      byLocale: localeRows.map((row) => ({
        name: String(row.name ?? ""),
        count: asNumber(row.count),
      })),
      byEvent: eventRows.map((row) => ({
        name: String(row.name ?? ""),
        count: asNumber(row.count),
      })),
      topPages: pageRows.map((row) => ({
        name: String(row.name ?? ""),
        count: asNumber(row.count),
      })),
      topClicks: clickRows.map((row) => ({
        name: String(row.name ?? ""),
        count: asNumber(row.count),
      })),
      timeOnPages: timeRows.map((row) => ({
        name: String(row.name ?? ""),
        count: asNumber(row.count),
      })),
      sessions: sessionRows.map((row) => ({
        session_id: String(row.session_id ?? ""),
        visitor_id: String(row.visitor_id ?? ""),
        started: String(row.started ?? ""),
        ended: String(row.ended ?? ""),
        duration_s: asNumber(row.duration_s),
        pageviews: asNumber(row.pageviews),
        clicks: asNumber(row.clicks),
        heartbeats: asNumber(row.heartbeats),
        last_path: String(row.last_path ?? ""),
        events: asNumber(row.events),
      })),
      sessionTimeline: mapRecent(timelineRows),
      recent: mapRecent(recentRows),
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : "query failed";
    console.error("[analytics/dashboard]", message);
    return emptySnapshot(rangeDays, message, true);
  }
}
