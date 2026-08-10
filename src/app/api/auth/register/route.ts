import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password, profession, country } = body;

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing required fields: name, email, password" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ error: "Password must be at least 8 characters long" }, { status: 400 });
    }

    const existingUser = db.prepare("SELECT id FROM users WHERE email = ?").get(email);
    if (existingUser) {
      return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
    }

    const userId = `usr_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const passwordHash = bcrypt.hashSync(password, 10);
    const now = new Date().toISOString();

    db.prepare(`
      INSERT INTO users (id, name, email, password_hash, role, profession, country, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
      userId,
      name,
      email,
      passwordHash,
      "USER",
      profession || "Architect",
      country || "United States",
      now,
      now
    );

    // Create Audit Log
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, action, details, ip_address, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(`log_${Date.now()}`, userId, "USER_REGISTER", `User registered: ${email}`, "127.0.0.1", now);

    const token = await createSessionToken({
      id: userId,
      email,
      name,
      role: "USER",
      profession: profession || "Architect",
    });

    await setSessionCookie(token);

    return NextResponse.json({
      success: true,
      user: {
        id: userId,
        name,
        email,
        role: "USER",
        profession: profession || "Architect",
        country: country || "United States",
      },
    });
  } catch (error: any) {
    console.error("Register Error:", error);
    return NextResponse.json({ error: "Failed to register account" }, { status: 500 });
  }
}
