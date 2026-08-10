import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const JWT_SECRET = process.env.JWT_SECRET || "ruharc_super_secret_enterprise_jwt_key_2026_safe";
const secretKey = new TextEncoder().encode(JWT_SECRET);
const COOKIE_NAME = "ruharc_session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get(COOKIE_NAME)?.value;

  let session: any = null;
  if (token) {
    try {
      const { payload } = await jwtVerify(token, secretKey);
      session = payload;
    } catch {
      session = null;
    }
  }

  // Protect Dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!session) {
      const loginUrl = new URL("/auth", request.url);
      loginUrl.searchParams.set("mode", "login");
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Protect Admin routes (Only ADMIN or SUPER_ADMIN allowed)
  if (pathname.startsWith("/admin")) {
    if (!session) {
      const loginUrl = new URL("/auth", request.url);
      loginUrl.searchParams.set("mode", "login");
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*"],
};
