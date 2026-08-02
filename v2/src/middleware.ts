import { NextResponse, type NextRequest } from "next/server";
import { htmlLanguages, localeFromPathname } from "@/i18n/config";

/**
 * Locale from path only - no request mutation that forces dynamic RSC.
 * Content-Language is enough for crawlers; html[lang] set via static default
 * + tiny inline script in root layout for localized routes.
 */
export function middleware(request: NextRequest) {
  const locale = localeFromPathname(request.nextUrl.pathname);
  const response = NextResponse.next();
  response.headers.set("Content-Language", htmlLanguages[locale]);
  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
