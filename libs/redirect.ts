import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// 1. Define the language you supported
const locales = ["en", "zh"];
const defaultLocale = "en";

export default function handleRedirect(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 2. Check whether the pathname has the supported language or not
  // Examples: '/en/about' or '/zh' returns true， '/about' returns false
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    // Do nothing
    return;
  }

  // 3. If not, do the redirect
  // Default redirect to /en
  const locale = defaultLocale;
  
  // Build new url
  // For example：When user access '/about' -> redirect to '/en/about'
  request.nextUrl.pathname = `/${locale}${pathname}`;
  
  // 4. Return the redirect response
  return NextResponse.redirect(request.nextUrl);
}