import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "@/i18n/routing";
import { updateSession } from "@/lib/supabase/middleware";

const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // The admin dashboard is NOT locale-prefixed. Refresh the Supabase session
  // and guard access here.
  if (pathname === "/admin" || pathname.startsWith("/admin/")) {
    return await updateSession(request);
  }

  // Skip API routes (they handle their own logic / locale-agnostic).
  if (pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Old indexed URLs used mixed case (e.g. /en/About, /About). Our routes are
  // lowercase, so 301 any uppercase public path to its lowercase form. The
  // comparison is case-sensitive, so a lowercased path never redirects again.
  const lower = pathname.toLowerCase();
  if (lower !== pathname) {
    const url = request.nextUrl.clone();
    url.pathname = lower;
    return NextResponse.redirect(url, 301);
  }

  // Everything else is public, localized content.
  return intlMiddleware(request);
}

export const config = {
  // Run on the root and all paths except API, Next internals, and static files.
  // The root `/` is listed explicitly because the catch-all does not match it.
  matcher: ["/", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
