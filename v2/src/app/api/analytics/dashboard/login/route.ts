// Purpose: Set httpOnly dashboard cookie after secret check.
import { NextResponse } from "next/server";
import {
  DASHBOARD_COOKIE,
  DASHBOARD_PATH,
  dashboardCookieOptions,
  isDashboardSecretConfigured,
  verifyDashboardSecret,
} from "@/lib/analytics/dashboardAuth";

export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!isDashboardSecretConfigured()) {
    return NextResponse.json(
      { ok: false, error: "Dashboard secret is not configured" },
      { status: 503 },
    );
  }

  let secret = "";
  const contentType = request.headers.get("content-type") ?? "";

  if (contentType.includes("application/json")) {
    const body = (await request.json().catch(() => ({}))) as { secret?: string };
    secret = body.secret ?? "";
  } else {
    const form = await request.formData().catch(() => null);
    secret = String(form?.get("secret") ?? "");
  }

  if (!verifyDashboardSecret(secret)) {
    return NextResponse.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true, redirect: DASHBOARD_PATH });
  response.cookies.set(DASHBOARD_COOKIE, secret.trim(), dashboardCookieOptions());
  return response;
}
