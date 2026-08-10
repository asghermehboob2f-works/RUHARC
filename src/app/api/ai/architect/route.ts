import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth/session";
import { generateArchitecturalConcept } from "@/lib/ai/provider";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  try {
    const sessionUser = await getSessionUser();
    if (!sessionUser) {
      return NextResponse.json({ error: "Unauthorized. Please log in." }, { status: 401 });
    }

    const body = await req.json();
    const { prompt, projectId, plotDimensions, projectType, bedrooms, floors, style, budget } = body;

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const aiResult = await generateArchitecturalConcept({
      prompt,
      plotDimensions,
      projectType,
      bedrooms,
      floors,
      style,
      budget,
    });

    const genId = `gen_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`;
    const now = new Date().toISOString();

    // Store generation in Database
    db.prepare(`
      INSERT INTO ai_generations (id, user_id, project_id, type, prompt, output_data, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `).run(
      genId,
      sessionUser.id,
      projectId || null,
      "architect_concept",
      prompt,
      JSON.stringify(aiResult),
      now
    );

    // If projectId is provided, update project floor plan with rooms returned by AI
    if (projectId && aiResult.floorPlanRooms) {
      const existingFp = db.prepare("SELECT * FROM floor_plans WHERE project_id = ?").get(projectId) as any;
      if (existingFp) {
        db.prepare(`
          UPDATE floor_plans
          SET layout_json = ?, updated_at = ?
          WHERE id = ?
        `).run(JSON.stringify(aiResult.floorPlanRooms), now, existingFp.id);
      }
    }

    return NextResponse.json({
      success: true,
      generationId: genId,
      result: aiResult,
    });
  } catch (error: any) {
    console.error("AI Architect API Error:", error);
    return NextResponse.json({ error: "AI Generation failed. Please try again." }, { status: 500 });
  }
}
