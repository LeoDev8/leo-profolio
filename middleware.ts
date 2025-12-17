import handleRedirect  from "@/libs/redirect";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  return handleRedirect(request);
}

export const config = {
  // Matcher: macth all paths except static resources (_next, images, fonts, favicon .etc)
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     * - fonts (your local font folder in public)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|fonts|.*\\..*).*)',
  ],
};
