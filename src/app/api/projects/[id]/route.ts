import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as any;
  if (!project) {
    return NextResponse.json({ error: "Project not found" }, { status: 404 });
  }

  // Authorization check: Must own project or be Admin
  if (project.user_id !== sessionUser.id && sessionUser.role !== "ADMIN" && sessionUser.role !== "SUPER_ADMIN") {
    return NextResponse.json({ error: "Access denied. You do not have permission to view this project." }, { status: 403 });
  }

  const requirements = db.prepare("SELECT * FROM project_requirements WHERE project_id = ?").get(id);
  const floorPlans = db.prepare("SELECT * FROM floor_plans WHERE project_id = ? ORDER BY version DESC").all(id);
  const aiGenerations = db.prepare("SELECT * FROM ai_generations WHERE project_id = ? ORDER BY created_at DESC").all(id);

  return NextResponse.json({
    project,
    requirements,
    floorPlans,
    aiGenerations,
  });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as any;
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.user_id !== sessionUser.id && sessionUser.role !== "ADMIN" && sessionUser.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const body = await req.json();
    const { title, description, projectType, plotDimensions, estimatedBudget, status } = body;

    const now = new Date().toISOString();

    db.prepare(`
      UPDATE projects
      SET title = COALESCE(?, title),
          description = COALESCE(?, description),
          project_type = COALESCE(?, project_type),
          plot_dimensions = COALESCE(?, plot_dimensions),
          estimated_budget = COALESCE(?, estimated_budget),
          status = COALESCE(?, status),
          updated_at = ?
      WHERE id = ?
    `).run(title, description, projectType, plotDimensions, estimatedBudget, status, now, id);

    return NextResponse.json({ success: true, message: "Project updated successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const project = db.prepare("SELECT * FROM projects WHERE id = ?").get(id) as any;
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    if (project.user_id !== sessionUser.id && sessionUser.role !== "ADMIN" && sessionUser.role !== "SUPER_ADMIN") {
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    db.prepare("DELETE FROM projects WHERE id = ?").run(id);

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, action, details, ip_address, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(`log_${Date.now()}`, sessionUser.id, "PROJECT_DELETE", `Deleted project: ${id}`, "127.0.0.1", new Date().toISOString());

    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
