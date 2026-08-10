import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser || (sessionUser.role !== "ADMIN" && sessionUser.role !== "SUPER_ADMIN")) {
    return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
  }

  const totalUsers = db.prepare("SELECT COUNT(*) as count FROM users").get() as any;
  const totalProjects = db.prepare("SELECT COUNT(*) as count FROM projects").get() as any;
  const totalGenerations = db.prepare("SELECT COUNT(*) as count FROM ai_generations").get() as any;
  const totalAuditLogs = db.prepare("SELECT COUNT(*) as count FROM audit_logs").get() as any;

  const recentLogs = db.prepare("SELECT * FROM audit_logs ORDER BY created_at DESC LIMIT 10").all();
  const recentUsers = db.prepare("SELECT id, name, email, role, profession, created_at FROM users ORDER BY created_at DESC LIMIT 5").all();

  return NextResponse.json({
    stats: {
      totalUsers: totalUsers.count,
      totalProjects: totalProjects.count,
      totalGenerations: totalGenerations.count,
      totalAuditLogs: totalAuditLogs.count,
    },
    recentLogs,
    recentUsers,
  });
}
