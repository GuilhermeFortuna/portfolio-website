import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import {
  defaultLocale,
  getLocaleFromPathname,
  isPrefixedLocale,
  isValidLocale,
  localeHeader,
  localizePathname,
  stripLocalePrefix,
  type Locale,
} from "@/lib/i18n";

function preferredLocale(request: NextRequest): Locale {
  const cookieLocale = request.cookies.get("NEXT_LOCALE")?.value;
  if (cookieLocale && isValidLocale(cookieLocale)) {
    return cookieLocale;
  }

  const acceptLanguage = request.headers.get("accept-language");
  if (
    acceptLanguage &&
    (acceptLanguage.includes("pt-BR") || acceptLanguage.includes("pt"))
  ) {
    return "pt-BR";
  }

  return defaultLocale;
}

function nextWithLocale(request: NextRequest, locale: Locale) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(localeHeader, locale);
  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

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

  const pathLocale = getLocaleFromPathname(pathname);

  // Default locale is unprefixed — collapse /en and /en/... to canonical URLs.
  if (pathLocale === defaultLocale) {
    const canonicalPath = stripLocalePrefix(pathname);
    return NextResponse.redirect(new URL(canonicalPath, request.url));
  }

  // Prefixed locales (e.g. /pt-BR) pass through with locale metadata.
  if (pathLocale && isPrefixedLocale(pathLocale)) {
    return nextWithLocale(request, pathLocale);
  }

  // Unprefixed routes: serve English, or redirect when preference is prefixed.
  const targetLocale = preferredLocale(request);
  if (isPrefixedLocale(targetLocale)) {
    const redirectUrl = new URL(
      localizePathname(pathname, targetLocale),
      request.url,
    );
    return NextResponse.redirect(redirectUrl);
  }

  return nextWithLocale(request, defaultLocale);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};
