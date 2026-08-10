import React from "react";
import { Navbar } from "@/components/Navbar";
import { Sparkles, Shield, Cpu, Layers, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-sky-500/30">
      <Navbar />

      <section className="pt-32 pb-20 px-6 sm:px-12 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-400 mb-6">
          <Sparkles className="w-4 h-4" /> ABOUT RUHARC ARCHITECTURE OS
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-sky-400 bg-clip-text text-transparent">
          Empowering Next-Generation Architectural Intelligence
        </h1>
        <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto font-sans leading-relaxed mb-12">
          RUHARC is built at the intersection of generative AI, structural engineering, CAD/BIM automation, and spatial planning. Our mission is to compress the architectural design cycle from weeks to minutes while maintaining structural rigor.
        </p>

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left my-16 font-mono">
          <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#080a0f]">
            <Cpu className="w-8 h-8 text-sky-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Generative Spatial Graph</h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              Algorithms synthesize natural language constraints into fully dimensioned, code-compliant architectural layouts.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#080a0f]">
            <Layers className="w-8 h-8 text-indigo-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">BIM & BOQ Integration</h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              Instant bill-of-quantities and cost estimation models derived directly from layout geometry data.
            </p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#080a0f]">
            <Shield className="w-8 h-8 text-emerald-400 mb-4" />
            <h3 className="text-lg font-bold text-white mb-2">Enterprise Cyber Protection</h3>
            <p className="text-xs text-white/60 leading-relaxed font-sans">
              End-to-end user isolation, role-based security, encrypted data pipelines, and immutable audit logs.
            </p>
          </div>
        </div>

        <div className="p-10 rounded-3xl bg-gradient-to-r from-sky-950/40 to-indigo-950/40 border border-sky-500/20 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Ready to start designing intelligently?</h2>
          <Link
            href="/auth?mode=register"
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-sky-400 text-black font-bold font-mono text-xs hover:bg-sky-300 transition-all shadow-lg cursor-pointer"
          >
            <span>Launch AI Studio</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
