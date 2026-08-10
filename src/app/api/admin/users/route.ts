import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser || (sessionUser.role !== "ADMIN" && sessionUser.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
  }

  const users = db.prepare("SELECT id, name, email, role, profession, country, created_at, updated_at FROM users ORDER BY created_at DESC").all();
  return NextResponse.json({ users });
}

export async function PATCH(req: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || (sessionUser.role !== "ADMIN" && sessionUser.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
  }

  const body = await req.json();
  const { userId, role } = body;

  if (!userId || !role) {
    return NextResponse.json({ error: "userId and role are required" }, { status: 400 });
  }

  db.prepare("UPDATE users SET role = ?, updated_at = ? WHERE id = ?").run(role, new Date().toISOString(), userId);

  // Log admin action
  db.prepare(`
    INSERT INTO audit_logs (id, user_id, action, details, ip_address, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(`log_${Date.now()}`, sessionUser.id, "ADMIN_CHANGE_USER_ROLE", `Changed user ${userId} role to ${role}`, "127.0.0.1", new Date().toISOString());

  return NextResponse.json({ success: true, message: `User role updated to ${role}` });
}

export async function DELETE(req: Request) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || sessionUser.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Forbidden: Super Admin access required" }, { status: 403 });
  }

  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "userId query parameter required" }, { status: 400 });
  }

  if (userId === sessionUser.id) {
    return NextResponse.json({ error: "Cannot delete your own admin account" }, { status: 400 });
  }

  db.prepare("DELETE FROM users WHERE id = ?").run(userId);

  // Log admin action
  db.prepare(`
    INSERT INTO audit_logs (id, user_id, action, details, ip_address, created_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(`log_${Date.now()}`, sessionUser.id, "ADMIN_DELETE_USER", `Deleted user ${userId}`, "127.0.0.1", new Date().toISOString());

  return NextResponse.json({ success: true, message: "User deleted successfully" });
}
