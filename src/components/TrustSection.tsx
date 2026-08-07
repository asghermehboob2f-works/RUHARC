"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  FolderKanban,
  Sparkles,
  FileText,
  Zap,
  Wand2,
  Edit3,
  Ruler,
  Calculator,
  History,
  Home,
  Building2,
  Hotel,
  Utensils,
  Briefcase,
  Hospital,
  GraduationCap,
  Factory,
  ShoppingBag,
  Trees,
  Waves,
  Car,
  Layers,
  Sofa,
  Hammer,
  ShieldCheck,
  Lock,
  Cloud,
  CheckCircle2,
  ArrowRight,
  Sliders,
  Compass,
} from "lucide-react";

export const TrustSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.15 });

  // Count up state for statistics
  const [counts, setCounts] = useState({
    projects: 0,
    iterations: 0,
    reports: 0,
    seconds: 15,
  });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 2000; // 2 seconds
    const intervalTime = 30;
    const steps = duration / intervalTime;

    const timer = setInterval(() => {
      start += 1;
      const progress = start / steps;
      setCounts({
        projects: Math.floor(progress * 125000),
        iterations: Number((progress * 8.7).toFixed(1)),
        reports: Math.floor(progress * 940000),
        seconds: Math.max(9, Math.floor(15 - progress * 6)),
      });

      if (start >= steps) {
        setCounts({
          projects: 125000,
          iterations: 8.7,
          reports: 940000,
          seconds: 9,
        });
        clearInterval(timer);
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isInView]);

  // AI Capability Grid data
  const capabilities = [
    {
      title: "AI Design Generation",
      desc: "Generate complete architectural concepts from natural language prompts.",
      icon: Wand2,
      tag: "Engine 01",
    },
    {
      title: "AI Design Editing",
      desc: "Modify existing designs through simple conversational commands.",
      icon: Edit3,
      tag: "Engine 02",
    },
    {
      title: "Smart Dimensions",
      desc: "Automatically calculate realistic room sizes, spacing, and circulation.",
      icon: Ruler,
      tag: "Engine 03",
    },
    {
      title: "Material Intelligence",
      desc: "Estimate materials, quantities, and approximate construction costs.",
      icon: Calculator,
      tag: "Engine 03",
    },
    {
      title: "Construction Reports",
      desc: "Generate printable PDF reports for planning and collaboration.",
      icon: FileText,
      tag: "Engine 03",
    },
    {
      title: "Version History",
      desc: "Save every design iteration and compare changes over time.",
      icon: History,
      tag: "Engine 02",
    },
  ];

  // Project Types Carousel data
  const projectTypes = [
    { title: "Residential Homes", desc: "Custom family houses & duplexes", icon: Home },
    { title: "Luxury Villas", desc: "High-end estates & infinity pools", icon: Compass },
    { title: "Apartments", desc: "Multi-family residential towers", icon: Building2 },
    { title: "Hotels & Resorts", desc: "Boutique stays & hospitality", icon: Hotel },
    { title: "Restaurants", desc: "Dining spaces & commercial kitchens", icon: Utensils },
    { title: "Offices & HQ", desc: "Corporate headquarters & workspaces", icon: Briefcase },
    { title: "Hospitals", desc: "Healthcare facilities & clinics", icon: Hospital },
    { title: "Schools & Colleges", desc: "Educational campuses & labs", icon: GraduationCap },
    { title: "Factories & Hubs", desc: "Industrial units & logistics", icon: Factory },
    { title: "Shopping Malls", desc: "Retail centers & plazas", icon: ShoppingBag },
    { title: "Landscapes & Parks", desc: "Outdoor gardens & pathways", icon: Trees },
    { title: "Swimming Pools", desc: "Indoor & outdoor aquatic spaces", icon: Waves },
    { title: "Parking Areas", desc: "Multi-level & underground parking", icon: Car },
    { title: "Mixed-Use Towers", desc: "Combined residential & retail", icon: Layers },
    { title: "Interior Architecture", desc: "Spatial styling & lighting", icon: Sofa },
    { title: "Renovations", desc: "Building extensions & retrofits", icon: Hammer },
  ];

  // AI Workflow Steps
  const workflowSteps = [
    { id: 1, title: "Idea", desc: "Initial spatial concept prompt" },
    { id: 2, title: "AI Interview", desc: "Plots, budget & style questions" },
    { id: 3, title: "Prompt Enhancement", desc: "Architectural context synthesis" },
    { id: 4, title: "Dimension Validation", desc: "Structural circulation check" },
    { id: 5, title: "Generate Design", desc: "High-res renders & layout" },
    { id: 6, title: "Edit Design", desc: "Conversational refinements" },
    { id: 7, title: "Construction Report", desc: "Material & cost estimates" },
    { id: 8, title: "Export", desc: "PDF, DXF, DWG & WebP export" },
  ];
  const [activeWorkflow, setActiveWorkflow] = useState(4);

  // Technology Highlights
  const techHighlights = [
    {
      title: "AI Prompt Intelligence",
      desc: "Natural language processing tailored specifically for structural building codes, site conditions, and climate factors.",
      icon: Sparkles,
    },
    {
      title: "Dimension Engine",
      desc: "Real-time parametric geometry calculation guaranteeing buildable wall ratios and realistic room sizes.",
      icon: Ruler,
    },
    {
      title: "Construction Intelligence",
      desc: "Instant material quantity takeoff and regional cost estimations calculated per square foot.",
      icon: Calculator,
    },
    {
      title: "Version Control & Sync",
      desc: "Git-style design branch management allowing side-by-side comparison of any previous concept.",
      icon: History,
    },
  ];

  // Mini Showcase Before/After state
  const [showcaseSlider, setShowcaseSlider] = useState(50);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#050505] text-white pt-[140px] pb-[140px] px-6 sm:px-12 lg:px-[120px] max-w-[1600px] mx-auto overflow-hidden"
    >
      {/* Seamless Dark Background Glows */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-sky-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* 1. SECTION TITLE BLOCK */}
      <motion.div
        initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
        animate={
          isInView
            ? { opacity: 1, y: 0, filter: "blur(0px)" }
            : { opacity: 0, y: 30, filter: "blur(10px)" }
        }
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20"
      >
        <span className="font-mono text-xs font-bold tracking-widest text-sky-400 uppercase mb-4 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20">
          TRUSTED ARCHITECTURE AI
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Built for Professionals. <br className="hidden sm:block" />
          <span className="animate-text-gradient">Designed for Everyone.</span>
        </h2>

        <p className="text-base sm:text-xl text-white/70 font-normal leading-relaxed max-w-3xl">
          Whether you&apos;re designing your dream home, planning a commercial building, or exploring architectural concepts, RUHARC combines AI intelligence with professional workflows to simplify every stage of design.
        </p>
      </motion.div>

      {/* 2. LIVE STATISTICS CARDS (Animated Count-Up) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-28">
        {[
          {
            label: "Projects Generated",
            val: `${counts.projects.toLocaleString()}+`,
            sub: "Worldwide architectural plans",
            icon: FolderKanban,
          },
          {
            label: "AI Design Iterations",
            val: `${counts.iterations} Million+`,
            sub: "Natural language refinements",
            icon: Sparkles,
          },
          {
            label: "Exported Reports",
            val: `${counts.reports.toLocaleString()}+`,
            sub: "Print-ready PDFs & DXF specs",
            icon: FileText,
          },
          {
            label: "Avg. AI Response Time",
            val: `< ${counts.seconds} Seconds`,
            sub: "Ultra-fast generation engine",
            icon: Zap,
          },
        ].map((card, idx) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 25 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="group glass-panel p-6 rounded-[24px] border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:shadow-sky-500/10 cursor-pointer"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-mono text-white/50 uppercase">{card.label}</span>
                <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 group-hover:rotate-12 transition-transform duration-300">
                  <Icon className="w-5 h-5" />
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-white font-mono mb-2">
                {card.val}
              </div>
              <div className="text-xs text-white/60">{card.sub}</div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. AI CAPABILITY GRID (6 Cards) */}
      <div className="mb-28">
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Everything Your Architect Needs.
          </h3>
          <p className="text-sm sm:text-base text-white/60 mt-2">
            6 specialized intelligence engines working in perfect harmony.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: idx * 0.08 }}
                className="group glass-panel p-[36px] rounded-[24px] border border-white/10 hover:border-sky-400/40 hover:scale-[1.02] transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-sky-400 group-hover:bg-sky-400 group-hover:text-black transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/60">
                      {item.tag}
                    </span>
                  </div>
                  <h4 className="text-xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-sm text-white/70 leading-relaxed font-normal">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-mono text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity gap-1">
                  <span>Explore Feature</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 4. SUPPORTED PROJECT TYPES (Infinite Auto-Scroll Carousel) */}
      <div className="mb-28">
        <div className="text-center mb-12">
          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight">
            Create Every Kind of Project.
          </h3>
          <p className="text-sm sm:text-base text-white/60 mt-2">
            From residential homes to massive commercial master plans.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full overflow-hidden py-4 group">
          {/* Left/Right Fading Edge Masks */}
          <div className="absolute top-0 bottom-0 left-0 w-24 bg-gradient-to-r from-[#050505] to-transparent z-20 pointer-events-none" />
          <div className="absolute top-0 bottom-0 right-0 w-24 bg-gradient-to-l from-[#050505] to-transparent z-20 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex gap-4 w-max animate-[marquee_35s_linear_infinite] group-hover:[animation-play-state:paused]">
            {[...projectTypes, ...projectTypes].map((type, idx) => {
              const Icon = type.icon;
              return (
                <div
                  key={idx}
                  className="w-[260px] glass-pill p-4 rounded-[20px] border border-white/10 hover:border-sky-400/30 hover:-translate-y-1 transition-all duration-300 flex items-center gap-3.5 shrink-0"
                >
                  <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col overflow-hidden">
                    <span className="text-sm font-semibold text-white truncate">
                      {type.title}
                    </span>
                    <span className="text-[11px] text-white/50 truncate">
                      {type.desc}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 5. AI WORKFLOW VISUAL (Interactive Horizontal Timeline) */}
      <div className="mb-28 glass-panel p-8 sm:p-12 rounded-[28px] border border-white/10">
        <div className="text-center mb-12">
          <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
            AI WORKFLOW PIPELINE
          </span>
          <h3 className="text-2xl sm:text-4xl font-bold text-white tracking-tight mt-2">
            From Idea to Construction Documents.
          </h3>
        </div>

        {/* Timeline Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative">
          {workflowSteps.map((step) => {
            const isActive = activeWorkflow === step.id;
            return (
              <button
                key={step.id}
                onClick={() => setActiveWorkflow(step.id)}
                className={`flex flex-col items-center text-center p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isActive
                    ? "bg-sky-500/20 border-sky-400 text-white scale-105 shadow-xl shadow-sky-500/10"
                    : "bg-white/[0.03] border-white/10 text-white/70 hover:bg-white/[0.08]"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-mono text-xs font-bold mb-2 ${
                    isActive
                      ? "bg-sky-400 text-black animate-pulse"
                      : "bg-white/10 text-white/60"
                  }`}
                >
                  0{step.id}
                </div>
                <span className="text-xs font-semibold text-white mb-1">
                  {step.title}
                </span>
                <span className="text-[10px] text-white/50 leading-tight">
                  {step.desc}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 6. TECHNOLOGY HIGHLIGHTS & SECURITY BADGES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
        {techHighlights.map((tech, idx) => {
          const Icon = tech.icon;
          return (
            <div
              key={idx}
              className="group glass-panel p-8 rounded-[24px] border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">{tech.title}</h4>
              <p className="text-sm text-white/70 leading-relaxed">{tech.desc}</p>
            </div>
          );
        })}
      </div>

      {/* Security Pills */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-28">
        {[
          "Secure Cloud Storage",
          "Encrypted Projects",
          "Role Based Access",
          "Version Protected",
          "Private Workspace",
          "Export Ready",
        ].map((badge, idx) => (
          <div
            key={idx}
            className="glass-pill px-4 py-2 rounded-full border border-white/10 text-xs font-mono text-white/80 flex items-center gap-2 hover:border-sky-400/40 transition-colors"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
            <span>{badge}</span>
          </div>
        ))}
      </div>

      {/* 7. MINI SHOWCASE (Interactive Before/After Prompt Slider) */}
      <div className="glass-panel p-6 sm:p-10 rounded-[28px] border border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
          <div>
            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest">
              PROMPT TRANSFORMATION ENGINE
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Natural Language → Complete Architecture
            </h3>
          </div>
          <div className="text-xs font-mono text-white/60 glass-pill px-4 py-2 rounded-full border border-white/10">
            Drag slider to inspect AI generation depth
          </div>
        </div>

        {/* Interactive Comparison Split */}
        <div className="relative w-full h-[380px] sm:h-[480px] rounded-2xl overflow-hidden border border-white/10 select-none">
          {/* Edited Full Architecture (After) */}
          <img
            src="/images/villa2.png"
            alt="Complete Architectural Project"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 glass-pill px-4 py-1.5 rounded-lg text-xs font-mono text-sky-300">
            AFTER: COMPLETE 8K ARCHITECTURAL SPEC
          </div>

          {/* Simple Prompt Concept (Before) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${showcaseSlider}%` }}
          >
            <img
              src="/images/villa1.png"
              alt="Simple Concept Prompt"
              className="absolute inset-0 w-full h-full object-cover max-w-none"
              style={{ width: "100%" }}
            />
            <div className="absolute top-4 left-4 glass-pill px-4 py-1.5 rounded-lg text-xs font-mono text-white/70">
              BEFORE: SIMPLE NATURAL PROMPT
            </div>
          </div>

          {/* Slider Line & Handle */}
          <div
            className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(255,255,255,0.9)]"
            style={{ left: `${showcaseSlider}%` }}
          >
            <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
              <Sliders className="w-4 h-4" />
            </div>
          </div>

          <input
            type="range"
            min="0"
            max="100"
            value={showcaseSlider}
            onChange={(e) => setShowcaseSlider(Number(e.target.value))}
            className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
          />
        </div>
      </div>
    </section>
  );
};
