import React from "react";
import { Navbar } from "@/components/Navbar";
import { Check, Sparkles, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-sky-500/30">
      <Navbar />

      <section className="pt-32 pb-20 px-6 sm:px-12 max-w-6xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-400 mb-6">
          <Zap className="w-4 h-4" /> TRANSPARENT ARCHITECTURAL PRICING
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-slate-200 to-sky-400 bg-clip-text text-transparent">
          Plans Built for Solo Architects & Enterprise Studios
        </h1>
        <p className="text-base sm:text-lg text-white/60 max-w-3xl mx-auto font-sans leading-relaxed mb-16">
          Start designing with AI for free. Upgrade as your project pipeline grows.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          {/* Starter Plan */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-[#08090e] flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-white/50 uppercase tracking-widest mb-2 font-bold">STARTER</div>
              <div className="text-4xl font-extrabold font-mono text-white mb-2">$0 <span className="text-xs text-white/40 font-normal">/ month</span></div>
              <p className="text-xs text-white/60 font-sans mb-6">Ideal for exploring AI floorplanning and spatial generation concepts.</p>
              
              <ul className="space-y-3 font-mono text-xs text-white/80 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-sky-400" /> 3 AI Architectural Projects</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-sky-400" /> 2D Floorplan Canvas</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-sky-400" /> 50 AI Generation Credits / mo</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-sky-400" /> Basic PDF Export</li>
              </ul>
            </div>
            <Link
              href="/auth?mode=register"
              className="mt-8 w-full py-3.5 rounded-xl bg-white/10 border border-white/15 text-white font-mono font-bold text-xs hover:bg-white/20 text-center block transition-all"
            >
              Get Started Free
            </Link>
          </div>

          {/* Professional Plan */}
          <div className="p-8 rounded-3xl glass-panel border border-sky-400/50 bg-[#0b121e] flex flex-col justify-between relative shadow-2xl shadow-sky-500/10">
            <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-sky-400 text-black font-mono font-extrabold text-[10px] uppercase tracking-wider">
              MOST POPULAR
            </div>
            <div>
              <div className="text-xs font-mono text-sky-400 uppercase tracking-widest mb-2 font-bold">PROFESSIONAL</div>
              <div className="text-4xl font-extrabold font-mono text-white mb-2">$49 <span className="text-xs text-white/40 font-normal">/ month</span></div>
              <p className="text-xs text-white/60 font-sans mb-6">For practicing architects, civil engineers, and design consultants.</p>

              <ul className="space-y-3 font-mono text-xs text-white/90 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-sky-400" /> Unlimited Projects</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-sky-400" /> Full Interactive Floorplan Editor</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-sky-400" /> 1,500 AI Generation Credits / mo</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-sky-400" /> Generative Design Variations</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-sky-400" /> Automated BOQ Cost Takeoffs</li>
              </ul>
            </div>
            <Link
              href="/auth?mode=register"
              className="mt-8 w-full py-3.5 rounded-xl bg-sky-400 text-black font-mono font-extrabold text-xs hover:bg-sky-300 text-center block transition-all shadow-lg shadow-sky-400/20"
            >
              Start 14-Day Free Trial
            </Link>
          </div>

          {/* Studio Enterprise Plan */}
          <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-[#08090e] flex flex-col justify-between">
            <div>
              <div className="text-xs font-mono text-indigo-400 uppercase tracking-widest mb-2 font-bold">STUDIO ENTERPRISE</div>
              <div className="text-4xl font-extrabold font-mono text-white mb-2">$149 <span className="text-xs text-white/40 font-normal">/ month</span></div>
              <p className="text-xs text-white/60 font-sans mb-6">For architectural firms, construction companies, and multi-user teams.</p>

              <ul className="space-y-3 font-mono text-xs text-white/80 border-t border-white/10 pt-6">
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Dedicated Team Workspace</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Unlimited AI Credits & API Access</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Custom Structural Code Rules</li>
                <li className="flex items-center gap-2.5"><Check className="w-4 h-4 text-indigo-400" /> Dedicated Account Manager & SLA</li>
              </ul>
            </div>
            <Link
              href="/contact"
              className="mt-8 w-full py-3.5 rounded-xl bg-white/10 border border-white/15 text-white font-mono font-bold text-xs hover:bg-white/20 text-center block transition-all"
            >
              Contact Sales
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
