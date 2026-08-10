import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sparkles, Cpu, Layers, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function GenerativeDesignPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-sky-500/30">
      <Navbar />

      <section className="pt-32 pb-20 px-6 sm:px-12 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-400 mb-6">
          <Cpu className="w-4 h-4" /> GENERATIVE ALGORITHMIC DESIGN
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-sky-400 bg-clip-text text-transparent">
          Multi-Constraint Algorithmic Spatial Layout Generation
        </h1>
        <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto font-sans leading-relaxed mb-12">
          Input plot geometry, solar orientation, target square footage, and budget boundaries. Our generative engine produces dozens of viable floor plan options ranked by spatial efficiency.
        </p>

        <div className="p-10 rounded-3xl glass-panel border border-white/15 bg-[#080a10] text-left grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs mb-12">
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-sky-400 font-bold text-sm mb-2">01. Constraint Definition</div>
            <p className="text-white/60 font-sans">Set plot dimensions (e.g. 40x60 ft), set back rules, maximum floor count, and desired room adjacencies.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-indigo-400 font-bold text-sm mb-2">02. Spatial Synthesis</div>
            <p className="text-white/60 font-sans">Generative algorithms iterate through room arrangements to optimize circulation efficiency and natural light.</p>
          </div>
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-emerald-400 font-bold text-sm mb-2">03. Automated Evaluation</div>
            <p className="text-white/60 font-sans">Compare Concept A, B, and C with automated health scores, estimated structural costs, and BOQ takeoffs.</p>
          </div>
        </div>

        <Link
          href="/dashboard"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-sky-400 text-black font-bold font-mono text-sm hover:bg-sky-300 transition-all shadow-xl"
        >
          <span>Launch Generative Studio</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>
    </main>
  );
}
