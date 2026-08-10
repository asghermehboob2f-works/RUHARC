import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ authenticated: false, user: null }, { status: 401 });
  }

  const user = db.prepare("SELECT id, name, email, role, profession, country, avatar_url, created_at FROM users WHERE id = ?").get(sessionUser.id);

  return NextResponse.json({
    authenticated: true,
    user,
  });
}
