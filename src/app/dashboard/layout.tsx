"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Compass,
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Wand2,
  Grid,
  Sofa,
  Settings,
  Shield,
  LogOut,
  User as UserIcon,
  ChevronLeft,
  ChevronRight,
  Zap,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [collapsed, setCollapsed] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (e) {
        console.error("Failed to fetch user:", e);
      }
    }
    loadUser();
  }, []);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/");
    router.refresh();
  };

  const sidebarNavItems = [
    { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
    { name: "AI Architect", href: "/dashboard/architect", icon: Wand2, isBadge: "AI Core" },
    { name: "Floor Plans", href: "/dashboard/floorplans", icon: Grid },
    { name: "Visualization", href: "/dashboard/visualization", icon: Sofa },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
  ];

  if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
    sidebarNavItems.push({ name: "Admin Panel", href: "/admin", icon: Shield, isBadge: "Admin" });
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col font-sans selection:bg-sky-500/30 overflow-x-hidden">
      {/* 1. TOPBAR */}
      <header className="sticky top-0 z-40 h-[76px] bg-[#07080c]/90 backdrop-blur-2xl border-b border-white/10 px-6 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
              <Compass className="w-5 h-5" />
            </div>
            <span className="font-extrabold text-lg tracking-tight font-mono">
              RUHARC <span className="text-[10px] text-sky-400 font-normal px-1.5 py-0.5 rounded bg-sky-500/20 border border-sky-400/30">STUDIO</span>
            </span>
          </Link>
        </div>

        {/* Topbar Right Tools */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-300">
            <Zap className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
            <span>AI Studio Active</span>
          </div>

          <div className="flex items-center gap-3 pl-3 border-l border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 p-[1.5px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-xs font-bold font-mono">
                {user?.name ? user.name.substring(0, 2).toUpperCase() : "US"}
              </div>
            </div>
            <div className="hidden md:flex flex-col font-mono text-left">
              <span className="text-xs font-bold text-white">{user?.name || "Loading..."}</span>
              <span className="text-[9px] text-white/40">{user?.role || "USER"} • {user?.profession || "Architect"}</span>
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-xl bg-white/5 border border-white/10 hover:bg-red-500/20 hover:text-red-400 text-white/60 transition-colors cursor-pointer ml-2"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. MAIN BODY */}
      <div className="flex flex-1 relative">
        <motion.aside
          animate={{ width: collapsed ? 88 : 260 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="sticky top-[76px] h-[calc(100vh-76px)] bg-[#07080b]/90 backdrop-blur-2xl border-r border-white/10 p-3 flex flex-col justify-between z-30 shrink-0 overflow-y-auto"
        >
          <div className="space-y-1">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors mb-3 cursor-pointer"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {sidebarNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-mono text-xs relative ${
                    isActive
                      ? "bg-sky-500/20 text-white border border-sky-400/40 font-bold shadow-lg shadow-sky-500/10"
                      : "text-white/70 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-sky-400" : ""}`} />
                  {!collapsed && (
                    <span className="truncate flex-1 flex items-center justify-between">
                      <span>{item.name}</span>
                      {item.isBadge && (
                        <span className="text-[9px] px-1.5 py-0.2 rounded bg-sky-400 text-black font-bold">
                          {item.isBadge}
                        </span>
                      )}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {!collapsed && (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 font-mono text-[10px] space-y-1 text-white/50">
              <div className="text-white font-bold text-xs">RUHARC OS v1.0</div>
              <div>Database & Session Active</div>
            </div>
          )}
        </motion.aside>

        <main className="flex-1 p-6 sm:p-10 max-w-[1600px] mx-auto min-h-[calc(100vh-76px)]">
          {children}
        </main>
      </div>
    </div>
  );
}
