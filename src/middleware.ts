import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { defaultLocale, isValidLocale, locales } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static files, images, api routes, _next internal routes
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.includes(".") // static assets like images/fonts/videos
  ) {
    return NextResponse.next();
  }

  // Check if pathname starts with a supported locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`),
  );

  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Determine locale from cookie or Accept-Language header
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  let targetLocale = defaultLocale;

  if (cookieLocale && isValidLocale(cookieLocale)) {
    targetLocale = cookieLocale;
  } else {
    const acceptLanguage = request.headers.get("accept-language");
    if (acceptLanguage && (acceptLanguage.includes("pt") || acceptLanguage.includes("pt-BR"))) {
      targetLocale = "pt-BR";
    }
  }

  // Redirect to localized URL
  const redirectUrl = new URL(
    `/${targetLocale}${pathname === "/" ? "" : pathname}`,
    request.url,
  );
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
