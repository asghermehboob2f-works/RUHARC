import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { createSessionToken, setSessionCookie } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required" }, { status: 400 });
    }

    const user = db.prepare("SELECT * FROM users WHERE email = ?").get(email) as any;
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password_hash);
    if (!isPasswordValid) {
      // Audit log failed login
      db.prepare(`
        INSERT INTO audit_logs (id, user_id, action, details, ip_address, created_at)
        VALUES (?, ?, ?, ?, ?, ?)
      `).run(`log_${Date.now()}`, user.id, "LOGIN_FAILED", `Failed login attempt for ${email}`, "127.0.0.1", new Date().toISOString());

      return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
    }

    const token = await createSessionToken({
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      profession: user.profession,
    });

    await setSessionCookie(token);

    // Audit log successful login
    db.prepare(`
      INSERT INTO audit_logs (id, user_id, action, details, ip_address, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(`log_${Date.now()}`, user.id, "LOGIN_SUCCESS", `Successful login for ${email}`, "127.0.0.1", new Date().toISOString());

    return NextResponse.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profession: user.profession,
        country: user.country,
      },
    });
  } catch (error: any) {
    console.error("Login Error:", error);
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 });
  }
}
