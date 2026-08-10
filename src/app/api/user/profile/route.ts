import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = db.prepare("SELECT id, name, email, role, profession, country, avatar_url, created_at FROM users WHERE id = ?").get(sessionUser.id);
  return NextResponse.json({ user });
}

export async function PUT(req: Request) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { name, profession, country, currentPassword, newPassword } = body;

    const user = db.prepare("SELECT * FROM users WHERE id = ?").get(sessionUser.id) as any;
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const now = new Date().toISOString();

    // If updating password
    if (newPassword) {
      if (!currentPassword) {
        return NextResponse.json({ error: "Current password is required to set a new password" }, { status: 400 });
      }
      const isMatch = bcrypt.compareSync(currentPassword, user.password_hash);
      if (!isMatch) {
        return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 });
      }
      const newHash = bcrypt.hashSync(newPassword, 10);
      db.prepare("UPDATE users SET password_hash = ?, updated_at = ? WHERE id = ?").run(newHash, now, sessionUser.id);
    }

    // Update profile metadata
    db.prepare(`
      UPDATE users
      SET name = COALESCE(?, name),
          profession = COALESCE(?, profession),
          country = COALESCE(?, country),
          updated_at = ?
      WHERE id = ?
    `).run(name, profession, country, now, sessionUser.id);

    return NextResponse.json({ success: true, message: "Profile updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update profile" }, { status: 500 });
  }
}
