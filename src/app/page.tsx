"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { SpotlightCursor } from "@/components/SpotlightCursor";
import { InteractiveWorkspace } from "@/components/InteractiveWorkspace";
import { FeatureGrid } from "@/components/features/FeatureGrid";
import { HowItWorksSection } from "@/components/how-it-works/HowItWorksSection";
import { AuthModal } from "@/components/auth/AuthModal";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Wand2,
  Grid,
  Sofa,
  Box,
  Layers,
  Zap,
  Cpu,
  FileText,
  DollarSign,
  Compass,
  ArrowUpRight,
} from "lucide-react";

export default function Home() {
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [activeHeroTab, setActiveHeroTab] = useState<"interactive" | "render" | "blueprint">("interactive");
  const [promptPreset, setPromptPreset] = useState("Modern 3-bedroom villa with solar roof and rooftop courtyard on a 30x50 ft plot.");
  const [sandboxResult, setSandboxResult] = useState<any>(null);
  const [sandboxLoading, setSandboxLoading] = useState(false);

  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.98]);
  const heroY = useTransform(scrollY, [0, 500], [0, -30]);

  const handleSandboxSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSandboxLoading(true);
    try {
      const res = await fetch("/api/ai/architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptPreset,
          plotDimensions: "30x50 ft",
          projectType: "Residential",
          bedrooms: 3,
        }),
      });
      if (res.ok) {
        const data = await res.json();
        setSandboxResult(data.result);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setSandboxLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-[#040508] text-white selection:bg-sky-500/30 overflow-x-hidden font-sans">
      <Navbar />

      {/* 01. HERO COMMAND CENTER SECTION */}
      <motion.section
        style={{ scale: heroScale }}
        className="relative pt-[130px] pb-[80px] px-6 sm:px-12 lg:px-16 max-w-[1600px] mx-auto min-h-screen flex flex-col justify-between"
      >
        {/* Glow Background */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-sky-500/20 via-indigo-600/15 to-purple-600/10 rounded-full blur-[140px] pointer-events-none"
        />

        <div className="relative z-10 w-full text-center">
          <motion.div style={{ y: heroY }} className="flex flex-col items-center max-w-4xl mx-auto mb-12">
            {/* Announcement Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-sky-400/30 bg-sky-500/10 text-sky-300 font-mono text-xs mb-8 shadow-xl shadow-sky-500/10">
              <Sparkles className="w-4 h-4 text-sky-400 animate-pulse" />
              <span>RUHARC OS 1.0 — REAL AI ARCHITECTURE PLATFORM</span>
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-ping" />
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.08] mb-6">
              Transform Architectural Briefs Into{" "}
              <span className="bg-gradient-to-r from-sky-400 via-indigo-300 to-emerald-400 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(56,189,248,0.3)]">
                Real CAD & BIM Models
              </span>{" "}
              in Seconds.
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg lg:text-xl text-white/70 font-sans max-w-3xl leading-relaxed mb-10">
              The next-generation AI operating system built for architects, engineers, and construction managers. Synthesize spatial layouts, dimensioned 2D floorplans, BOQ cost takeoffs, and 8K visual renders.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 font-mono text-xs w-full sm:w-auto">
              <button
                onClick={() => setAuthModalOpen(true)}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-sky-400 text-black font-extrabold hover:bg-sky-300 transition-all shadow-xl shadow-sky-400/25 flex items-center justify-center gap-2.5 cursor-pointer text-sm"
              >
                <Sparkles className="w-4 h-4 text-black" />
                <span>Launch AI Workspace</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <Link
                href="/platform"
                className="w-full sm:w-auto px-8 py-4 rounded-2xl glass-panel border border-white/15 bg-white/5 hover:bg-white/10 text-white font-bold transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
              >
                <Layers className="w-4 h-4 text-sky-400" />
                <span>Explore Platform Architecture</span>
              </Link>
            </div>

            {/* Trust Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 mt-12 border-t border-white/10 w-full max-w-3xl font-mono text-xs text-white/60">
              <div>
                <div className="text-xl font-extrabold text-white">12,000+</div>
                <div className="text-[11px] text-sky-400">Layouts Generated</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">&lt; 1.2s</div>
                <div className="text-[11px] text-indigo-400">Spatial Solver Speed</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">100%</div>
                <div className="text-[11px] text-emerald-400">Code Rules Checked</div>
              </div>
              <div>
                <div className="text-xl font-extrabold text-white">ISO 27001</div>
                <div className="text-[11px] text-amber-400">Encrypted Storage</div>
              </div>
            </div>
          </motion.div>

          {/* HERO DECK TABS & DISPLAY */}
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2 font-mono text-xs">
              <button
                onClick={() => setActiveHeroTab("interactive")}
                className={`px-5 py-2.5 rounded-xl border transition-all ${
                  activeHeroTab === "interactive"
                    ? "bg-sky-500/20 text-sky-300 border-sky-400/40 font-bold shadow-lg"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                }`}
              >
                Live Interactive Studio
              </button>
              <button
                onClick={() => setActiveHeroTab("render")}
                className={`px-5 py-2.5 rounded-xl border transition-all ${
                  activeHeroTab === "render"
                    ? "bg-sky-500/20 text-sky-300 border-sky-400/40 font-bold shadow-lg"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                }`}
              >
                8K Architectural Render
              </button>
              <button
                onClick={() => setActiveHeroTab("blueprint")}
                className={`px-5 py-2.5 rounded-xl border transition-all ${
                  activeHeroTab === "blueprint"
                    ? "bg-sky-500/20 text-sky-300 border-sky-400/40 font-bold shadow-lg"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                }`}
              >
                CAD Spatial Blueprint
              </button>
            </div>

            {/* TAB DISPLAY CONTENT */}
            <div id="demo-workspace" className="w-full pt-2">
              {activeHeroTab === "interactive" && <InteractiveWorkspace />}

              {activeHeroTab === "render" && (
                <div className="relative w-full max-w-[1400px] mx-auto rounded-[28px] glass-panel p-4 border border-white/15 overflow-hidden bg-black shadow-2xl">
                  <img
                    src="/images/hero_architecture_render.png"
                    alt="8K Architectural Masterpiece"
                    className="w-full h-[550px] object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl glass-panel border border-white/15 bg-black/80 flex justify-between items-center font-mono text-xs">
                    <div>
                      <div className="text-sky-400 font-bold text-sm">PARAMETRIC VILLA CONCEPT #804</div>
                      <div className="text-white/60 font-sans mt-0.5">8K Raytraced Daylight Study • Structural Steel & Low-E Glazing</div>
                    </div>
                    <button
                      onClick={() => setAuthModalOpen(true)}
                      className="px-5 py-2.5 rounded-xl bg-sky-400 text-black font-bold hover:bg-sky-300"
                    >
                      Generate Concept Render →
                    </button>
                  </div>
                </div>
              )}

              {activeHeroTab === "blueprint" && (
                <div className="relative w-full max-w-[1400px] mx-auto rounded-[28px] glass-panel p-4 border border-white/15 overflow-hidden bg-black shadow-2xl">
                  <img
                    src="/images/hero_cad_blueprint.png"
                    alt="CAD Spatial Blueprint"
                    className="w-full h-[550px] object-cover rounded-2xl"
                  />
                  <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl glass-panel border border-white/15 bg-black/80 flex justify-between items-center font-mono text-xs">
                    <div>
                      <div className="text-emerald-400 font-bold text-sm">2D CAD VECTOR FLOORPLAN GENERATION</div>
                      <div className="text-white/60 font-sans mt-0.5">Automated Wall Vectoring • Live Room Dimensioning</div>
                    </div>
                    <Link href="/dashboard/floorplans" className="px-5 py-2.5 rounded-xl bg-emerald-400 text-black font-bold hover:bg-emerald-300">
                      Open Floorplan Editor →
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.section>

      {/* 02. LIVE AI PROMPT SANDBOX DEMO */}
      <section className="py-20 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-sky-400/30 bg-[#080b12] text-left space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 text-xs text-sky-400 mb-2">
                <Wand2 className="w-3.5 h-3.5" /> LIVE AI GENERATIVE SANDBOX
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Test Prompt Synthesis</h2>
            </div>
            <span className="text-xs text-white/40">Powered by Gemini AI Core</span>
          </div>

          <form onSubmit={handleSandboxSubmit} className="space-y-4 font-mono text-xs">
            <div className="relative">
              <input
                type="text"
                value={promptPreset}
                onChange={(e) => setPromptPreset(e.target.value)}
                className="w-full h-14 pl-4 pr-36 rounded-2xl bg-white/5 border border-white/15 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none text-sm font-sans"
              />
              <button
                type="submit"
                disabled={sandboxLoading}
                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2.5 rounded-xl bg-sky-400 text-black font-extrabold hover:bg-sky-300 transition-all cursor-pointer"
              >
                {sandboxLoading ? "Synthesizing..." : "Run AI Solver"}
              </button>
            </div>
          </form>

          {sandboxResult && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 font-mono text-xs"
            >
              <div className="text-sky-300 font-bold text-sm">{sandboxResult.conceptName}</div>
              <p className="text-white/70 font-sans text-xs">{sandboxResult.designBrief}</p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-white/10 text-white/80">
                <div>Built-up: <span className="text-white font-bold">{sandboxResult.totalAreaSqFt} sq.ft</span></div>
                <div>Budget: <span className="text-emerald-400 font-bold">${sandboxResult.estimatedCostUSD?.toLocaleString()}</span></div>
                <div>Style: <span className="text-sky-300 font-bold">{sandboxResult.architecturalStyle}</span></div>
                <div>Rooms: <span className="text-indigo-300 font-bold">{sandboxResult.spatialProgram?.length || 4} Spaces</span></div>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* 03. CORE ARCHITECTURAL CAPABILITIES GRID */}
      <FeatureGrid />

      {/* 04. HOW IT WORKS WORKFLOW */}
      <HowItWorksSection />

      {/* 05. FINAL CTA BANNER */}
      <section className="py-24 px-6 sm:px-12 max-w-5xl mx-auto text-center">
        <div className="p-12 sm:p-16 rounded-[36px] bg-gradient-to-br from-sky-950/60 via-[#070b14] to-indigo-950/60 border border-sky-400/30 relative overflow-hidden shadow-2xl space-y-6">
          <div className="w-14 h-14 rounded-2xl bg-sky-400/20 border border-sky-400/40 flex items-center justify-center text-sky-400 mx-auto">
            <Sparkles className="w-7 h-7 animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            Ready to Build With AI Precision?
          </h2>

          <p className="text-white/70 font-sans text-base max-w-xl mx-auto leading-relaxed">
            Create your account today to access full spatial floorplanning, material BOQ schedule generation, and high-definition architectural renders.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4 font-mono text-xs">
            <button
              onClick={() => setAuthModalOpen(true)}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-sky-400 text-black font-extrabold text-sm hover:bg-sky-300 transition-all shadow-xl shadow-sky-400/20 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Launch Studio Free</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <Link
              href="/pricing"
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white/5 border border-white/15 text-white font-bold text-sm hover:bg-white/10 transition-all cursor-pointer"
            >
              View Transparent Pricing
            </Link>
          </div>
        </div>
      </section>

      {/* 06. FOOTER */}
      <footer className="border-t border-white/10 bg-[#030406] py-16 px-6 sm:px-12 font-mono text-xs text-white/50">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-5 gap-10">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5 text-white font-bold text-lg">
              <Compass className="w-5 h-5 text-sky-400" />
              <span>RUHARC OS</span>
            </div>
            <p className="text-white/40 font-sans text-xs max-w-sm leading-relaxed">
              Enterprise architectural generative operating system for spatial planning, CAD floorplanning, BOQ estimation, and structural intelligence.
            </p>
            <div className="text-[11px] text-white/30">
              © 2026 RUHARC.ORG. All rights reserved.
            </div>
          </div>

          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">Platform</div>
            <ul className="space-y-2">
              <li><Link href="/platform" className="hover:text-white transition-colors">Overview</Link></li>
              <li><Link href="/generative-design" className="hover:text-white transition-colors">Generative AI</Link></li>
              <li><Link href="/features" className="hover:text-white transition-colors">Feature Matrix</Link></li>
              <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">Workspace</div>
            <ul className="space-y-2">
              <li><Link href="/dashboard" className="hover:text-white transition-colors">Studio Dashboard</Link></li>
              <li><Link href="/dashboard/architect" className="hover:text-white transition-colors">AI Architect</Link></li>
              <li><Link href="/dashboard/floorplans" className="hover:text-white transition-colors">Floor Plan Editor</Link></li>
              <li><Link href="/dashboard/visualization" className="hover:text-white transition-colors">Render Visualizer</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <div className="text-white font-bold uppercase tracking-wider text-[11px]">Company</div>
            <ul className="space-y-2">
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/resources" className="hover:text-white transition-colors">Documentation</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact Sales</Link></li>
              <li><Link href="/admin" className="hover:text-amber-400 transition-colors">Admin Panel</Link></li>
            </ul>
          </div>
        </div>
      </footer>

      {/* Global Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode="register"
      />
    </main>
  );
}
