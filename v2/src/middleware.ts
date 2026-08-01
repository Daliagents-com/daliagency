import { NextResponse, type NextRequest } from "next/server";
import { htmlLanguages, localeFromPathname } from "@/i18n/config";

/**
 * Locale from path only - no request mutation that forces dynamic RSC.
 * Content-Language is enough for crawlers; html[lang] set via static default
 * + tiny inline script in root layout for localized routes.
 *
 * Also: one-shot dashboard auth via ?key= for /internal/analytics.
 */
export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = localeFromPathname(pathname);
  const response = NextResponse.next();
  response.headers.set("Content-Language", htmlLanguages[locale]);

  if (pathname === "/internal/analytics" || pathname === "/internal/analytics/") {
    const key = request.nextUrl.searchParams.get("key");
    const secret = (process.env.ANALYTICS_DASHBOARD_SECRET ?? "").trim();
    if (key && secret && key.trim() === secret && secret.length >= 12) {
      const clean = request.nextUrl.clone();
      clean.searchParams.delete("key");
      const redirect = NextResponse.redirect(clean);
      redirect.headers.set("Content-Language", htmlLanguages[locale]);
      redirect.cookies.set("dali_analytics_dash", secret, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/internal/analytics",
        maxAge: 60 * 60 * 24 * 30,
      });
      return redirect;
    }
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
