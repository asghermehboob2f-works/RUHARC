import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sparkles, Layers, Box, Cpu, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PlatformPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-sky-500/30">
      <Navbar />

      <section className="pt-32 pb-20 px-6 sm:px-12 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-400 mb-6">
          <Sparkles className="w-4 h-4" /> THE RUHARC PLATFORM ARCHITECTURE
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-sky-400 bg-clip-text text-transparent">
          End-to-End AI Architectural Workflow
        </h1>
        <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto font-sans leading-relaxed mb-12">
          From concept briefing to structural analysis, 2D floorplanning, 3D visualization, and cost takeoffs — seamlessly connected in one workspace.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left my-12">
          <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-[#08090e]">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center font-mono font-bold text-lg mb-6">01</div>
            <h3 className="text-xl font-bold text-white mb-2 font-mono">Conversational AI Co-Creation</h3>
            <p className="text-sm text-white/60 font-sans leading-relaxed">
              Describe project requirements, plot sizes, budget constraints, and aesthetic preferences. The AI generates complete architectural concepts in seconds.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-[#08090e]">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center font-mono font-bold text-lg mb-6">02</div>
            <h3 className="text-xl font-bold text-white mb-2 font-mono">Interactive Spatial Floorplanner</h3>
            <p className="text-sm text-white/60 font-sans leading-relaxed">
              Edit room dimensions, wall boundaries, doors, and windows on a precision 2D canvas with live measurement snapping.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-[#08090e]">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono font-bold text-lg mb-6">03</div>
            <h3 className="text-xl font-bold text-white mb-2 font-mono">Generative Concept Comparison</h3>
            <p className="text-sm text-white/60 font-sans leading-relaxed">
              Evaluate alternative spatial layouts side-by-side with automatic daylighting and circulation score reports.
            </p>
          </div>

          <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-[#08090e]">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-mono font-bold text-lg mb-6">04</div>
            <h3 className="text-xl font-bold text-white mb-2 font-mono">Automated BOQ & Documentation</h3>
            <p className="text-sm text-white/60 font-sans leading-relaxed">
              Export professional project summaries, material takeoff schedules, and architectural specifications with one click.
            </p>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-sky-400 text-black font-bold font-mono text-sm hover:bg-sky-300 transition-all shadow-xl"
        >
          <span>Explore Platform Workspace</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
