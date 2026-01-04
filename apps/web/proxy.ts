import { NextRequest, NextResponse } from "next/server";

const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password"];
const SESSION_COOKIE_NAME = "better-auth.session_token";

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get(SESSION_COOKIE_NAME);

  const isLoggedIn = !!sessionCookie;

  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  const isAppRoute = pathname.startsWith("/app");

  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL("/app/dashboard", request.url));
  }

  if (!isLoggedIn && isAppRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/app/:path*", "/login", "/signup", "/forgot-password", "/reset-password"],
};
