// Purpose: Clear analytics dashboard session cookie.
import { NextResponse } from "next/server";
import {
  DASHBOARD_COOKIE,
  DASHBOARD_PATH,
  dashboardCookieOptions,
} from "@/lib/analytics/dashboardAuth";

export const runtime = "nodejs";

export async function POST() {
  const response = NextResponse.json({ ok: true });
  response.cookies.set(DASHBOARD_COOKIE, "", {
    ...dashboardCookieOptions(0),
    maxAge: 0,
  });
  // Also clear if path-scoped cookie was set broader earlier
  response.cookies.set(DASHBOARD_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
  void DASHBOARD_PATH;
  return response;
}
