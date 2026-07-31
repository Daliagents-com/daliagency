import { NextResponse, type NextRequest } from "next/server";
import {
  htmlLanguages,
  localeFromPathname,
} from "@/i18n/config";

export function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  const locale = localeFromPathname(request.nextUrl.pathname);

  requestHeaders.set("x-dali-language", htmlLanguages[locale]);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
