import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { db } from "@/lib/db";

export async function GET() {
  const sessionUser = await getSessionUser();
  if (!sessionUser) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const projects = db.prepare(`
    SELECT p.*, req.bedrooms, req.bathrooms, req.floors, req.style
    FROM projects p
    LEFT JOIN project_requirements req ON req.project_id = p.id
    WHERE p.user_id = ?
    ORDER BY p.updated_at DESC
  `).all(sessionUser.id);

  return NextResponse.json({ projects });
}

export async function POST(req: Request) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, projectType, plotDimensions, estimatedBudget, floors, bedrooms, bathrooms, style, specialRequirements } = body;

    if (!title) {
      return NextResponse.json({ error: "Project title is required" }, { status: 400 });
    }

    const projectId = `proj_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "");
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO projects (id, user_id, title, slug, description, project_type, plot_dimensions, estimated_budget, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      projectId,
      sessionUser.id,
      title,
      slug,
      description || "",
      projectType || "Residential",
      plotDimensions || "30x50 ft",
      estimatedBudget || 200000,
      "Active",
      now,
      now
    );

    db.prepare(`
      INSERT INTO project_requirements (id, project_id, floors, bedrooms, bathrooms, style, special_requirements, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      `req_${Date.now()}`,
      projectId,
      floors || 2,
      bedrooms || 3,
      bathrooms || 2,
      style || "Modern Minimalist",
      specialRequirements || "",
      now
    );

    // Seed an initial empty or starter floorplan for the project
    const defaultRooms = JSON.stringify([
      { id: "room-1", name: "Living Room", width: 20, height: 16, x: 10, y: 10, color: "#0ea5e9" },
      { id: "room-2", name: "Kitchen", width: 14, height: 12, x: 32, y: 10, color: "#10b981" },
    ]);

    db.prepare(`
      INSERT INTO floor_plans (id, project_id, version, name, grid_width, grid_height, layout_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      `fp_${Date.now()}`,
      projectId,
      1,
      "Initial Layout Concept",
      800,
      600,
      defaultRooms,
      now,
      now
    );

    // Audit log
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, action, details, ip_address, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(`log_${Date.now()}`, sessionUser.id, "PROJECT_CREATE", `Created project: ${title} (${projectId})`, "127.0.0.1", now);

    return NextResponse.json({
      success: true,
      project: {
        id: projectId,
        title,
        slug,
        projectType: projectType || "Residential",
        plotDimensions: plotDimensions || "30x50 ft",
        status: "Active",
      },
    });
  } catch (error: any) {
    console.error("Create Project Error:", error);
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
