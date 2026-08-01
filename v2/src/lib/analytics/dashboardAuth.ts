// Purpose: Gate the internal analytics dashboard with a shared secret cookie.
import { cookies } from "next/headers";
import { timingSafeEqual } from "node:crypto";

export const DASHBOARD_COOKIE = "dali_analytics_dash";
export const DASHBOARD_PATH = "/internal/analytics";

export function getDashboardSecret(): string {
  return (process.env.ANALYTICS_DASHBOARD_SECRET ?? "").trim();
}

export function isDashboardSecretConfigured(): boolean {
  return getDashboardSecret().length >= 12;
}

function safeEqual(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  try {
    return timingSafeEqual(left, right);
  } catch {
    return false;
  }
}

export function verifyDashboardSecret(candidate: string | null | undefined): boolean {
  const secret = getDashboardSecret();
  if (!secret || !candidate) return false;
  return safeEqual(candidate.trim(), secret);
}

export async function isDashboardAuthorized(
  requestSecret?: string | null,
): Promise<boolean> {
  if (!isDashboardSecretConfigured()) return false;
  if (requestSecret && verifyDashboardSecret(requestSecret)) return true;

  const jar = await cookies();
  const cookie = jar.get(DASHBOARD_COOKIE)?.value;
  return verifyDashboardSecret(cookie);
}

export function dashboardCookieOptions(maxAgeSeconds = 60 * 60 * 24 * 30) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: DASHBOARD_PATH,
    maxAge: maxAgeSeconds,
  };
}
