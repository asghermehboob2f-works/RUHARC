"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  PlusCircle,
  FolderKanban,
  Wand2,
  LayoutGrid,
  Sparkles,
  ArrowUpRight,
  Clock,
  CheckCircle2,
  TrendingDown,
  Download,
  Share2,
  MoreVertical,
  Layers,
  Edit3,
} from "lucide-react";

export default function HomeDashboardPage() {
  const recentProjects = [
    {
      id: "p1",
      name: "Luxury Modern Villa",
      plot: "50×80 FT",
      status: "Active Editing",
      lastEdited: "10 mins ago",
      progress: 92,
      image: "/images/villa1.png",
      collaborators: 4,
    },
    {
      id: "p2",
      name: "Scandinavian Farmhouse",
      plot: "60×100 FT",
      status: "Costing Complete",
      lastEdited: "2 hours ago",
      progress: 84,
      image: "/images/villa1.png",
      collaborators: 2,
    },
    {
      id: "p3",
      name: "Commercial Office Tower",
      plot: "120×150 FT",
      status: "Review Pending",
      lastEdited: "Yesterday",
      progress: 68,
      image: "/images/villa1.png",
      collaborators: 6,
    },
  ];

  return (
    <div className="space-y-8 font-mono">
      {/* WELCOME HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel p-8 rounded-[28px] border border-white/15 relative overflow-hidden bg-gradient-to-r from-sky-500/10 via-transparent to-indigo-500/10"
      >
        <div className="relative z-10 max-w-3xl">
          <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-widest block mb-2">
            RUHARC DASHBOARD STUDIO
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mb-2">
            Good Morning, Asgher.
          </h1>
          <p className="text-sm text-white/70">
            Let&apos;s continue building something extraordinary today. You have 3 active projects in workspace.
          </p>
        </div>
      </motion.div>

      {/* QUICK ACTION CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "Create New Project", subtitle: "Prompt to Architectural Plan", icon: PlusCircle, href: "/dashboard/architect", color: "bg-sky-400 text-black font-bold" },
          { title: "Continue Last Project", subtitle: "Luxury Modern Villa (v5.0)", icon: Edit3, href: "/dashboard/architect", color: "bg-white/10 text-white" },
          { title: "AI Generator", subtitle: "Generate Facades & Interiors", icon: Wand2, href: "/dashboard/generator", color: "bg-white/10 text-white" },
          { title: "Browse Templates", subtitle: "Villas, Duplexes & Towers", icon: LayoutGrid, href: "/dashboard/templates", color: "bg-white/10 text-white" },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              href={card.href}
              className={`p-5 rounded-2xl border border-white/10 transition-all hover:scale-[1.02] flex flex-col justify-between h-[140px] group ${card.color}`}
            >
              <div className="flex items-center justify-between">
                <Icon className="w-6 h-6" />
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
              </div>
              <div>
                <div className="text-sm font-bold">{card.title}</div>
                <div className="text-[10px] opacity-70">{card.subtitle}</div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* RECENT PROJECTS GRID */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-sky-400" />
            <span>Recent Architectural Projects</span>
          </h2>
          <Link href="/dashboard/projects" className="text-xs text-sky-400 hover:underline">
            View All Projects →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentProjects.map((proj) => (
            <div
              key={proj.id}
              className="glass-panel rounded-2xl border border-white/10 overflow-hidden hover:border-sky-400/40 transition-all group flex flex-col justify-between"
            >
              <div className="relative h-[160px] overflow-hidden">
                <img
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] text-sky-300 font-bold border border-white/10">
                  {proj.status}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-white text-base">{proj.name}</h3>
                  <span className="text-[10px] text-white/40">{proj.plot}</span>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] text-white/60">
                    <span>Completion</span>
                    <span className="text-sky-400 font-bold">{proj.progress}%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-sky-400 h-full" style={{ width: `${proj.progress}%` }} />
                  </div>
                </div>

                <div className="flex items-center justify-between text-[10px] text-white/50 pt-2 border-t border-white/5">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-sky-400" />
                    {proj.lastEdited}
                  </span>
                  <div className="flex gap-2">
                    <Link
                      href="/dashboard/architect"
                      className="px-3 py-1 rounded bg-sky-400 text-black font-bold hover:bg-sky-300 transition-colors"
                    >
                      Open Studio
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI SUGGESTIONS & RECENT EXPORTS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Suggestions Widget */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              AI ARCHITECT SUGGESTIONS
            </span>
            <span className="text-[10px] text-white/40">Updated 5m ago</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { title: "Optimize Villa Roof Solar Output", action: "Add Solar Array", text: "Adding 12 panel rooftop array reduces grid dependency by 64%." },
              { title: "Standardize Staircase Width", action: "Fix Warning", text: "Master suite stairs width currently 3.2 ft (Recommended 4.0 ft)." },
            ].map((s, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{s.title}</div>
                  <div className="text-[10px] text-white/50">{s.text}</div>
                </div>
                <button className="px-3 py-1.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30 text-[10px] font-bold shrink-0">
                  {s.action}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Exports Widget */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5">
              <Download className="w-4 h-4" />
              RECENT EXPORT PACKAGES
            </span>
            <span className="text-[10px] text-white/40">3 Completed</span>
          </div>

          <div className="space-y-2 text-xs">
            {[
              { name: "Luxury_Villa_BIM_Spec.pdf", size: "18.4 MB", date: "Today" },
              { name: "Villa_FloorPlan_Ground.dxf", size: "6.2 MB", date: "Yesterday" },
            ].map((e, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div>
                  <div className="font-bold text-white">{e.name}</div>
                  <div className="text-[10px] text-white/50">{e.size} • {e.date}</div>
                </div>
                <button className="px-3 py-1.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-[10px] font-bold">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
