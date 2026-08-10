import { DatabaseSync } from "node:sqlite";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

const dbDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

const dbPath = path.join(dbDir, "ruharc.db");
const db = new DatabaseSync(dbPath);

let isInitialized = false;

export function getDb() {
  if (!isInitialized) {
    try {
      db.exec("PRAGMA foreign_keys = ON;");
      db.exec("PRAGMA journal_mode = WAL;");

      db.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id TEXT PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT UNIQUE NOT NULL,
          password_hash TEXT NOT NULL,
          role TEXT NOT NULL DEFAULT 'USER',
          profession TEXT DEFAULT 'Architect',
          country TEXT DEFAULT 'United States',
          avatar_url TEXT,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS projects (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          title TEXT NOT NULL,
          slug TEXT NOT NULL,
          description TEXT,
          project_type TEXT NOT NULL DEFAULT 'Residential',
          plot_dimensions TEXT DEFAULT '30x50 ft',
          estimated_budget REAL DEFAULT 150000,
          status TEXT DEFAULT 'Active',
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS project_requirements (
          id TEXT PRIMARY KEY,
          project_id TEXT NOT NULL,
          floors INTEGER DEFAULT 2,
          bedrooms INTEGER DEFAULT 3,
          bathrooms INTEGER DEFAULT 2,
          style TEXT DEFAULT 'Modern Minimalist',
          special_requirements TEXT,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS floor_plans (
          id TEXT PRIMARY KEY,
          project_id TEXT NOT NULL,
          version INTEGER DEFAULT 1,
          name TEXT NOT NULL,
          grid_width INTEGER DEFAULT 800,
          grid_height INTEGER DEFAULT 600,
          layout_json TEXT NOT NULL,
          created_at TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS ai_generations (
          id TEXT PRIMARY KEY,
          user_id TEXT NOT NULL,
          project_id TEXT,
          type TEXT NOT NULL,
          prompt TEXT NOT NULL,
          output_data TEXT NOT NULL,
          image_url TEXT,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS audit_logs (
          id TEXT PRIMARY KEY,
          user_id TEXT,
          action TEXT NOT NULL,
          details TEXT,
          ip_address TEXT,
          created_at TEXT NOT NULL
        );

        CREATE TABLE IF NOT EXISTS system_settings (
          key TEXT PRIMARY KEY,
          value TEXT NOT NULL,
          updated_at TEXT NOT NULL
        );
      `);

      // Seed Super Admin if not exists
      const existingAdmin = db.prepare("SELECT * FROM users WHERE email = ?").get("admin@ruharc.org");
      if (!existingAdmin) {
        const adminPasswordHash = bcrypt.hashSync("AdminPassword123!", 10);
        const now = new Date().toISOString();
        db.prepare(`
          INSERT INTO users (id, name, email, password_hash, role, profession, country, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          "usr_admin_01",
          "RUHARC Administrator",
          "admin@ruharc.org",
          adminPasswordHash,
          "SUPER_ADMIN",
          "Principal Architect",
          "United States",
          now,
          now
        );
      }

      // Seed Demo User if not exists
      const existingUser = db.prepare("SELECT * FROM users WHERE email = ?").get("user@ruharc.org");
      if (!existingUser) {
        const userPasswordHash = bcrypt.hashSync("UserPassword123!", 10);
        const now = new Date().toISOString();
        db.prepare(`
          INSERT INTO users (id, name, email, password_hash, role, profession, country, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          "usr_demo_01",
          "Asgher Mehboob",
          "user@ruharc.org",
          userPasswordHash,
          "USER",
          "Senior Architectural Technologist",
          "United States",
          now,
          now
        );

        const projectId = "proj_demo_01";
        db.prepare(`
          INSERT INTO projects (id, user_id, title, slug, description, project_type, plot_dimensions, estimated_budget, status, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          projectId,
          "usr_demo_01",
          "Nordic Eco Residence",
          "nordic-eco-residence",
          "A sustainable 3-bedroom residential concept with solar integration and optimal natural lighting.",
          "Residential",
          "30x50 ft",
          285000,
          "Active",
          now,
          now
        );

        db.prepare(`
          INSERT INTO project_requirements (id, project_id, floors, bedrooms, bathrooms, style, special_requirements, created_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          "req_demo_01",
          projectId,
          2,
          3,
          3,
          "Scandinavian Eco",
          "High natural daylighting, open courtyard, smart ventilation",
          now
        );

        const initialFloorPlan = JSON.stringify([
          { id: "room-1", name: "Living Room", width: 20, height: 16, x: 10, y: 10, color: "#0ea5e9" },
          { id: "room-2", name: "Master Bedroom", width: 16, height: 14, x: 32, y: 10, color: "#6366f1" },
          { id: "room-3", name: "Kitchen & Dining", width: 18, height: 14, x: 10, y: 28, color: "#10b981" },
        ]);

        db.prepare(`
          INSERT INTO floor_plans (id, project_id, version, name, grid_width, grid_height, layout_json, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          "fp_demo_01",
          projectId,
          1,
          "Ground Floor Master Plan",
          800,
          600,
          initialFloorPlan,
          now,
          now
        );
      }

      isInitialized = true;
    } catch (e) {
      // In multi-worker build mode, ignore table creation collision if already initialized
    }
  }
  return db;
}

export const dbProxy = {
  prepare(sql: string) {
    return getDb().prepare(sql);
  },
  exec(sql: string) {
    return getDb().exec(sql);
  },
};

export { dbProxy as db };
