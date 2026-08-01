// Purpose: Internal ClickHouse product + session analytics dashboard.
import type { Metadata } from "next";
import Link from "next/link";
import {
  DASHBOARD_PATH,
  isDashboardAuthorized,
  isDashboardSecretConfigured,
} from "@/lib/analytics/dashboardAuth";
import {
  loadDashboardSnapshot,
  parseDashboardRange,
  parseSessionId,
  type DashboardRange,
  type NamedCount,
} from "@/lib/analytics/queries";
import LoginForm from "./LoginForm";
import LogoutButton from "./LogoutButton";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Product analytics · Dali",
  robots: { index: false, follow: false, nocache: true },
};

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

type SearchParams = Promise<{ range?: string; key?: string; session?: string }>;

function formatRate(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}

function formatInt(n: number): string {
  return new Intl.NumberFormat("en-US").format(n);
}

function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds}s`;
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  if (m < 60) return `${m}m ${s}s`;
  const h = Math.floor(m / 60);
  return `${h}h ${m % 60}m`;
}

function maxCount(rows: NamedCount[]): number {
  return Math.max(1, ...rows.map((r) => r.count));
}

function RankList({
  rows,
  unit = "",
}: {
  rows: NamedCount[];
  unit?: string;
}) {
  if (rows.length === 0) {
    return <p className={styles.empty}>No data in this range.</p>;
  }
  const max = maxCount(rows);
  return (
    <div className={styles.list}>
      {rows.map((row) => (
        <div key={row.name} className={styles.row}>
          <span className={styles.rowName} title={row.name}>
            {row.name}
          </span>
          <span className={styles.rowCount}>
            {unit === "s" ? formatDuration(row.count) : formatInt(row.count)}
            {unit && unit !== "s" ? unit : ""}
          </span>
          <div className={styles.track}>
            <div
              className={styles.fill}
              style={{ width: `${Math.round((row.count / max) * 100)}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

function DayChart({
  byDay,
}: {
  byDay: Awaited<ReturnType<typeof loadDashboardSnapshot>>["byDay"];
}) {
  if (byDay.length === 0) {
    return <p className={styles.empty}>No daily series yet.</p>;
  }
  const peak = Math.max(
    1,
    ...byDay.map((d) => d.pageviews + d.opens + d.submits + d.errors),
  );

  return (
    <>
      <div className={styles.chart} aria-hidden>
        {byDay.map((d) => {
          const total = d.pageviews + d.opens + d.submits + d.errors;
          const h = Math.max(total > 0 ? 8 : 0, Math.round((total / peak) * 100));
          return (
            <div
              key={d.day}
              className={styles.barCol}
              title={`${d.day}: pv ${d.pageviews}, open ${d.opens}, submit ${d.submits}`}
            >
              <div className={styles.barStack} style={{ height: `${h}%` }}>
                {d.pageviews > 0 ? (
                  <div
                    className={styles.barOpen}
                    style={{
                      height: `${Math.round((d.pageviews / Math.max(total, 1)) * 100)}%`,
                      background: "#60a5fa",
                    }}
                  />
                ) : null}
                {d.opens > 0 ? (
                  <div
                    className={styles.barSubmit}
                    style={{
                      height: `${Math.round((d.opens / Math.max(total, 1)) * 100)}%`,
                      background: "#a78bfa",
                    }}
                  />
                ) : null}
                {d.submits > 0 ? (
                  <div
                    className={styles.barError}
                    style={{
                      height: `${Math.round((d.submits / Math.max(total, 1)) * 100)}%`,
                      background: "#22c55e",
                    }}
                  />
                ) : null}
              </div>
              <span className={styles.barLabel}>{d.day.slice(5)}</span>
            </div>
          );
        })}
      </div>
      <div className={styles.legend}>
        <span>
          <i className={styles.dot} style={{ background: "#60a5fa" }} /> pageviews
        </span>
        <span>
          <i className={styles.dot} style={{ background: "#a78bfa" }} /> opens
        </span>
        <span>
          <i className={styles.dot} style={{ background: "#22c55e" }} /> submits
        </span>
      </div>
    </>
  );
}

export default async function InternalAnalyticsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const range = parseDashboardRange(params.range);
  const focusSession = parseSessionId(params.session);

  if (!isDashboardSecretConfigured()) {
    return (
      <div className={styles.shell}>
        <div className={styles.login}>
          <p className={styles.eyebrow}>Setup required</p>
          <h1>Missing dashboard secret</h1>
          <p>
            Set <code>ANALYTICS_DASHBOARD_SECRET</code> (min 12 chars) on Vercel /
            local env, redeploy, then open this page again.
          </p>
        </div>
      </div>
    );
  }

  const authorized = await isDashboardAuthorized();
  if (!authorized) {
    return (
      <div className={styles.shell}>
        <LoginForm />
      </div>
    );
  }

  const data = await loadDashboardSnapshot(range, focusSession);
  const ranges: DashboardRange[] = [7, 30, 90];

  return (
    <div className={styles.shell}>
      <header className={styles.top}>
        <div>
          <p className={styles.eyebrow}>Dali · ClickHouse session analytics</p>
          <h1 className={styles.title}>Product analytics</h1>
          <p className={styles.meta}>
            Who / where / how long · funnel + pageviews + clicks + heartbeats
            {data.configured ? "" : " · ClickHouse offline"}
            {" · "}
            last {data.rangeDays} days
          </p>
        </div>
        <div className={styles.actions}>
          <div className={styles.range} role="navigation" aria-label="Range">
            {ranges.map((days) => (
              <Link
                key={days}
                href={`${DASHBOARD_PATH}?range=${days}${
                  focusSession ? `&session=${focusSession}` : ""
                }`}
                data-active={days === range ? "true" : "false"}
              >
                {days}d
              </Link>
            ))}
          </div>
          <Link
            className={styles.button}
            href={`${DASHBOARD_PATH}?range=${range}${
              focusSession ? `&session=${focusSession}` : ""
            }`}
          >
            Refresh
          </Link>
          <LogoutButton />
        </div>
      </header>

      {data.error ? (
        <div className={styles.error}>Query error: {data.error}</div>
      ) : null}

      <section className={styles.kpis} aria-label="KPIs">
        <article className={styles.kpi}>
          <p className={styles.kpiLabel}>Visitors</p>
          <p className={styles.kpiValue}>{formatInt(data.kpis.uniqueVisitors)}</p>
        </article>
        <article className={styles.kpi}>
          <p className={styles.kpiLabel}>Sessions</p>
          <p className={styles.kpiValue}>{formatInt(data.kpis.uniqueSessions)}</p>
        </article>
        <article className={styles.kpi}>
          <p className={styles.kpiLabel}>Pageviews</p>
          <p className={styles.kpiValue}>{formatInt(data.kpis.pageviews)}</p>
        </article>
        <article className={styles.kpi}>
          <p className={styles.kpiLabel}>Clicks</p>
          <p className={styles.kpiValue}>{formatInt(data.kpis.clicks)}</p>
        </article>
        <article className={styles.kpi}>
          <p className={styles.kpiLabel}>Active time</p>
          <p className={styles.kpiValue}>
            {formatDuration(data.kpis.activeSeconds)}
          </p>
        </article>
        <article className={styles.kpi}>
          <p className={styles.kpiLabel}>Consult opens</p>
          <p className={styles.kpiValue}>{formatInt(data.kpis.opens)}</p>
        </article>
        <article className={styles.kpi}>
          <p className={styles.kpiLabel}>Submits</p>
          <p className={styles.kpiValue}>{formatInt(data.kpis.submits)}</p>
        </article>
        <article className={styles.kpi}>
          <p className={styles.kpiLabel}>Submit rate</p>
          <p className={styles.kpiValue}>{formatRate(data.kpis.submitRate)}</p>
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Daily volume</h2>
          <DayChart byDay={data.byDay} />
        </article>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Time on path (heartbeat Σ)</h2>
          <RankList rows={data.timeOnPages} unit="s" />
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Top pages</h2>
          <RankList rows={data.topPages} />
        </article>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Top clicks</h2>
          <RankList rows={data.topClicks} />
        </article>
      </section>

      <section className={styles.card} style={{ marginTop: 14 }}>
        <h2 className={styles.cardTitle}>Sessions (who · where · how long)</h2>
        {data.sessions.length === 0 ? (
          <p className={styles.empty}>
            No sessions yet. Open the public site after deploy - session capture
            starts automatically.
          </p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Started</th>
                  <th>Duration</th>
                  <th>Visitor</th>
                  <th>Session</th>
                  <th>PV</th>
                  <th>Clicks</th>
                  <th>Last path</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {data.sessions.map((row) => (
                  <tr key={row.session_id}>
                    <td>{row.started}</td>
                    <td>{formatDuration(row.duration_s)}</td>
                    <td className={styles.mono}>
                      {(row.visitor_id || "—").slice(0, 10)}
                    </td>
                    <td className={styles.mono}>
                      {row.session_id.slice(0, 10)}
                    </td>
                    <td>{row.pageviews}</td>
                    <td>{row.clicks}</td>
                    <td className={styles.mono}>{row.last_path || "—"}</td>
                    <td>
                      <Link
                        className={styles.button}
                        href={`${DASHBOARD_PATH}?range=${range}&session=${row.session_id}`}
                      >
                        Timeline
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {focusSession ? (
        <section className={styles.card} style={{ marginTop: 14 }}>
          <h2 className={styles.cardTitle}>
            Session timeline ·{" "}
            <span className={styles.mono}>{focusSession.slice(0, 16)}</span>
            {" · "}
            <Link href={`${DASHBOARD_PATH}?range=${range}`}>clear</Link>
          </h2>
          {data.sessionTimeline.length === 0 ? (
            <p className={styles.empty}>No events for this session in range.</p>
          ) : (
            <div className={styles.tableWrap}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Time (UTC)</th>
                    <th>Event</th>
                    <th>Path</th>
                    <th>Source</th>
                    <th>Props</th>
                  </tr>
                </thead>
                <tbody>
                  {data.sessionTimeline.map((row, index) => (
                    <tr key={`${row.event_time}-${row.event_name}-${index}`}>
                      <td>{row.event_time}</td>
                      <td>{row.event_name}</td>
                      <td className={styles.mono}>{row.path || "—"}</td>
                      <td>{row.source || "—"}</td>
                      <td className={styles.mono}>{row.props}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ) : null}

      <section className={styles.grid} style={{ marginTop: 14 }}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Consult sources</h2>
          <RankList rows={data.topSources} />
        </article>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Submit interest</h2>
          <RankList rows={data.byInterest} />
        </article>
      </section>

      <section className={styles.grid}>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>By locale</h2>
          <RankList rows={data.byLocale} />
        </article>
        <article className={styles.card}>
          <h2 className={styles.cardTitle}>All event types</h2>
          <RankList rows={data.byEvent} />
        </article>
      </section>

      <section className={styles.card} style={{ marginTop: 14 }}>
        <h2 className={styles.cardTitle}>Recent events (all)</h2>
        {data.recent.length === 0 ? (
          <p className={styles.empty}>No events yet.</p>
        ) : (
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Time (UTC)</th>
                  <th>Event</th>
                  <th>Session</th>
                  <th>Path</th>
                  <th>Source</th>
                  <th>Props</th>
                </tr>
              </thead>
              <tbody>
                {data.recent.map((row, index) => (
                  <tr key={`${row.event_time}-${row.event_name}-${index}`}>
                    <td>{row.event_time}</td>
                    <td>{row.event_name}</td>
                    <td className={styles.mono}>
                      {row.session_id ? (
                        <Link
                          href={`${DASHBOARD_PATH}?range=${range}&session=${row.session_id}`}
                        >
                          {row.session_id.slice(0, 10)}
                        </Link>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className={styles.mono}>{row.path || "—"}</td>
                    <td>{row.source || "—"}</td>
                    <td className={styles.mono}>{row.props}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <p className={styles.empty} style={{ marginTop: 18 }}>
        Not full PostHog session replay (no video of the screen). This is an
        event stream: anonymous visitor + session, pages, dwell time via 15s
        heartbeats, and clicks. No email/name stored.
      </p>
    </div>
  );
}
