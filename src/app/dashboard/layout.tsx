"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { CommandPalette } from "@/components/CommandPalette";
import {
  Compass,
  LayoutDashboard,
  FolderKanban,
  PlusCircle,
  Wand2,
  Edit3,
  Grid,
  HardHat,
  Sofa,
  Trees,
  TrendingDown,
  FileText,
  Download,
  LayoutGrid,
  Users,
  Bot,
  Bell,
  Settings,
  CreditCard,
  ChevronLeft,
  ChevronRight,
  Search,
  Sparkles,
  Zap,
  User,
  LogOut,
  Send,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [credits, setCredits] = useState(840);

  const sidebarNavItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Projects", href: "/dashboard/projects", icon: FolderKanban },
    { name: "New Project", href: "/dashboard/new", icon: PlusCircle, isHighlight: true },
    { name: "AI Architect", href: "/dashboard/architect", icon: Edit3, isBadge: "Flagship" },
    { name: "AI Generator", href: "/dashboard/generator", icon: Wand2 },
    { name: "Floor Plans", href: "/dashboard/floorplans", icon: Grid },
    { name: "Construction", href: "/dashboard/construction", icon: HardHat },
    { name: "Visualization", href: "/dashboard/visualization", icon: Sofa },
    { name: "Landscape Studio", href: "/dashboard/landscape", icon: Trees },
    { name: "Cost Analysis", href: "/dashboard/costs", icon: TrendingDown },
    { name: "Reports", href: "/dashboard/reports", icon: FileText },
    { name: "Exports", href: "/dashboard/exports", icon: Download },
    { name: "Templates", href: "/dashboard/templates", icon: LayoutGrid },
    { name: "Collaboration", href: "/dashboard/collaboration", icon: Users, isBadge: "Live" },
    { name: "AI Assistant", href: "/dashboard/assistant", icon: Bot },
    { name: "Notifications", href: "/dashboard/notifications", icon: Bell },
    { name: "Settings", href: "/dashboard/settings", icon: Settings },
    { name: "Billing", href: "/dashboard/billing", icon: CreditCard },
  ];

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

        {/* Global Search Trigger */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="flex items-center gap-3 h-11 px-4 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/50 text-xs font-mono w-full max-w-md cursor-pointer"
        >
          <Search className="w-4 h-4 text-sky-400" />
          <span className="flex-1 text-left">Search projects, layers, specs...</span>
          <span className="px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/10 text-[10px]">
            Ctrl + K
          </span>
        </button>

        {/* Topbar Right Tools */}
        <div className="flex items-center gap-3">
          {/* AI Credits Pill */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-300">
            <Zap className="w-3.5 h-3.5 fill-sky-400 text-sky-400" />
            <span>{credits} AI Credits</span>
          </div>

          {/* Profile User Avatar */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 p-[1.5px]">
              <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-xs font-bold font-mono">
                AS
              </div>
            </div>
            <div className="hidden md:flex flex-col font-mono">
              <span className="text-xs font-bold text-white">Asgher Mehboob</span>
              <span className="text-[9px] text-white/40">Enterprise Architect</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN BODY WRAPPER (SIDEBAR + WORKSPACE CONTENT) */}
      <div className="flex flex-1 relative">
        {/* COLLAPSIBLE SIDEBAR */}
        <motion.aside
          animate={{ width: collapsed ? 88 : 280 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="sticky top-[76px] h-[calc(100vh-76px)] bg-[#07080b]/90 backdrop-blur-2xl border-r border-white/10 p-3 flex flex-col justify-between z-30 shrink-0 overflow-y-auto scrollbar-none"
        >
          <div className="space-y-1">
            {/* Collapse / Expand Toggle Button */}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="w-full h-10 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white/60 hover:text-white flex items-center justify-center transition-colors mb-3 cursor-pointer"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>

            {/* Sidebar Navigation Items */}
            {sidebarNavItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all font-mono text-xs relative group ${
                    isActive
                      ? "bg-sky-500/20 text-white border border-sky-400/40 font-bold shadow-lg shadow-sky-500/10"
                      : item.isHighlight
                      ? "bg-white text-black font-bold hover:bg-white/90"
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
                  {isActive && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-sky-400 rounded-r" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Footer Info */}
          {!collapsed && (
            <div className="p-3 rounded-2xl bg-white/5 border border-white/10 font-mono text-[10px] space-y-1 text-white/50">
              <div className="text-white font-bold text-xs">RUHARC OS v1.0</div>
              <div>Connected to AI Engine</div>
            </div>
          )}
        </motion.aside>

        {/* WORKSPACE CONTENT AREA */}
        <main className="flex-1 p-6 sm:p-10 max-w-[1700px] mx-auto min-h-[calc(100vh-76px)] pb-32">
          {children}
        </main>
      </div>

      {/* 3. PERSISTENT FLOATING AI COMMAND BAR */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-3xl px-4 pointer-events-none">
        <div className="pointer-events-auto glass-panel p-2.5 rounded-2xl border border-white/20 shadow-2xl bg-[#090b10]/95 flex items-center gap-3 backdrop-blur-2xl">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>

          <input
            type="text"
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Ask RUHARC AI to edit, calculate costs, generate renders, or check building codes..."
            className="w-full bg-transparent text-white font-mono text-xs sm:text-sm focus:outline-none placeholder:text-white/40"
          />

          <button className="px-4 py-2.5 rounded-xl bg-sky-400 text-black font-bold font-mono text-xs hover:bg-sky-300 transition-all shrink-0 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-sky-400/20">
            <Send className="w-3.5 h-3.5" />
            <span>Command</span>
          </button>
        </div>
      </div>

      {/* Global Command Palette */}
      <CommandPalette isOpen={commandPaletteOpen} onClose={() => setCommandPaletteOpen(false)} />
    </div>
  );
}
