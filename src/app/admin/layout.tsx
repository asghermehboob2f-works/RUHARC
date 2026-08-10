"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Shield,
  Users,
  FolderKanban,
  FileText,
  LayoutDashboard,
  LogOut,
  Compass,
  Zap,
} from "lucide-react";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    async function checkAdmin() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          if (data.user?.role !== "ADMIN" && data.user?.role !== "SUPER_ADMIN") {
            router.push("/dashboard");
          } else {
            setAdminUser(data.user);
          }
        } else {
          router.push("/auth?mode=login");
        }
      } catch (e) {
        router.push("/dashboard");
      }
    }
    checkAdmin();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#040508] text-white flex flex-col font-sans selection:bg-amber-500/30">
      {/* Admin Topbar */}
      <header className="sticky top-0 z-40 h-[76px] bg-[#080a0f]/90 backdrop-blur-2xl border-b border-amber-500/20 px-6 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Shield className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight font-mono text-white">
              RUHARC <span className="text-[10px] text-amber-400 font-bold px-2 py-0.5 rounded bg-amber-500/20 border border-amber-400/30">ADMIN CONTROL</span>
            </span>
          </Link>
        </div>

        <div className="flex items-center gap-4 font-mono text-xs">
          <Link href="/dashboard" className="text-white/60 hover:text-white flex items-center gap-1">
            <Compass className="w-4 h-4" /> User Workspace
          </Link>

          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            <div className="text-right">
              <div className="font-bold text-amber-300">{adminUser?.name || "Admin"}</div>
              <div className="text-[10px] text-white/40">{adminUser?.role || "SUPER_ADMIN"}</div>
            </div>
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-red-400 text-white/60 transition-colors cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Admin Sidebar */}
        <aside className="w-64 bg-[#06070b] border-r border-white/10 p-4 space-y-2 font-mono text-xs shrink-0">
          <Link
            href="/admin"
            className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
              pathname === "/admin" ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30" : "text-white/70 hover:bg-white/5"
            }`}
          >
            <LayoutDashboard className="w-4 h-4 text-amber-400" />
            <span>Admin Overview</span>
          </Link>

          <Link
            href="/admin/users"
            className={`flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all ${
              pathname === "/admin/users" ? "bg-amber-500/20 text-amber-300 font-bold border border-amber-400/30" : "text-white/70 hover:bg-white/5"
            }`}
          >
            <Users className="w-4 h-4 text-sky-400" />
            <span>User Management</span>
          </Link>
        </aside>

        {/* Admin Content Area */}
        <main className="flex-1 p-8 max-w-[1600px] mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
