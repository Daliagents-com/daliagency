"use client";

// Purpose: Secret gate for /internal/analytics.
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import styles from "./page.module.css";

export default function LoginForm({ initialError }: { initialError?: string }) {
  const router = useRouter();
  const [error, setError] = useState(initialError ?? "");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const secret = String(form.get("secret") ?? "");

    try {
      const res = await fetch("/api/analytics/dashboard/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ secret }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
        redirect?: string;
      };
      if (!res.ok || !data.ok) {
        setError(data.error || "Invalid secret");
        setLoading(false);
        return;
      }
      router.replace(data.redirect || "/internal/analytics");
      router.refresh();
    } catch {
      setError("Network error");
      setLoading(false);
    }
  }

  return (
    <form className={styles.login} onSubmit={onSubmit}>
      <p className={styles.eyebrow}>Dali internal</p>
      <h1>Product analytics</h1>
      <p>
        ClickHouse funnel dashboard. Enter the dashboard secret from
        <code> ANALYTICS_DASHBOARD_SECRET</code>.
      </p>
      <label htmlFor="secret">Secret</label>
      <input
        id="secret"
        name="secret"
        type="password"
        autoComplete="current-password"
        required
        minLength={12}
        placeholder="••••••••••••"
      />
      {error ? <p className={styles.error}>{error}</p> : null}
      <button type="submit" disabled={loading}>
        {loading ? "Checking…" : "Open dashboard"}
      </button>
      <p className={styles.hint}>
        First visit can also use{" "}
        <code>?key=YOUR_SECRET</code> once - cookie is set automatically.
      </p>
    </form>
  );
}
