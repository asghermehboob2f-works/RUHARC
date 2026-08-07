"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Sparkles,
  Send,
  MessageSquare,
  Wand2,
  Grid,
  Layers,
  Edit3,
  AlertTriangle,
  History,
  Calculator,
  TrendingDown,
  FileText,
  Download,
  Users,
  CheckCircle2,
  Play,
  Pause,
  RotateCcw,
  ArrowRight,
  ShieldCheck,
  Compass,
  Sliders,
  ChevronRight,
  Eye,
} from "lucide-react";

export const HowItWorksSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

  // 15 Steps State
  const [activeStep, setActiveStep] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  // Auto-advance sequence timer (every 4.5 seconds if playing)
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev >= 15 ? 1 : prev + 1));
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Step 01: Typing simulation state
  const [typedText, setTypedText] = useState("");
  const targetText = "Build me a luxury modern villa on a 50×80 ft plot.";
  useEffect(() => {
    if (activeStep === 1) {
      setTypedText("");
      let index = 0;
      const typeInterval = setInterval(() => {
        if (index < targetText.length) {
          setTypedText(targetText.slice(0, index + 1));
          index++;
        } else {
          clearInterval(typeInterval);
        }
      }, 50);
      return () => clearInterval(typeInterval);
    }
  }, [activeStep]);

  // Step 02: Thinking progress ring state
  const [thinkProgress, setThinkProgress] = useState(0);
  useEffect(() => {
    if (activeStep === 2) {
      setThinkProgress(0);
      const thinkInterval = setInterval(() => {
        setThinkProgress((prev) => (prev >= 100 ? 100 : prev + 4));
      }, 100);
      return () => clearInterval(thinkInterval);
    }
  }, [activeStep]);

  // Step 07: Editing prompt state
  const [editPromptIndex, setEditPromptIndex] = useState(0);
  const editPrompts = [
    { prompt: "Increase the living room by 4 feet.", response: "Living Room 18×20 → 22×20. Walls smoothly expanded. Furniture repositioned." },
    { prompt: "Add a rooftop garden.", response: "Roof structure rendered transparent. Pergola & greenery added." },
    { prompt: "Convert style to Scandinavian.", response: "Wood textures applied. Windows enlarged. Cross ventilation optimized." },
  ];

  // Step 08: Validation fix state
  const [validatedFixed, setValidatedFixed] = useState(false);

  // Step 11: Cost slider state
  const [costTier, setCostTier] = useState<"basic" | "premium" | "luxury">("premium");

  const stepsList = [
    { id: 1, title: "01. Your Idea", subtitle: "Natural Language Prompt", icon: Sparkles },
    { id: 2, title: "02. AI Thinks", subtitle: "Spatial & Site Analysis", icon: Sparkles },
    { id: 3, title: "03. AI Interview", subtitle: "Conversational Requirements", icon: MessageSquare },
    { id: 4, title: "04. Enhancement", subtitle: "Architectural Synthesis", icon: Wand2 },
    { id: 5, title: "05. Dimension Engine", subtitle: "Parametric Layout Drawing", icon: Grid },
    { id: 6, title: "06. AI Generation", subtitle: "Wireframe to Photorealistic", icon: Layers },
    { id: 7, title: "07. Intelligent Editing", subtitle: "Live Non-Destructive Canvas", icon: Edit3 },
    { id: 8, title: "08. Smart Validation", subtitle: "Building Code Safety HUD", icon: AlertTriangle },
    { id: 9, title: "09. Version History", subtitle: "Git-Style Design Branches", icon: History },
    { id: 10, title: "10. Material Estimates", subtitle: "Quantity Takeoff Engine", icon: Calculator },
    { id: 11, title: "11. Cost Analysis", subtitle: "Live Budget Optimization", icon: TrendingDown },
    { id: 12, title: "12. Construction Report", subtitle: "24-Page Printable PDF", icon: FileText },
    { id: 13, title: "13. Multi-Format Export", subtitle: "CAD, DXF, PNG & ZIP Packages", icon: Download },
    { id: 14, title: "14. Team Collaboration", subtitle: "Real-Time Multiplayer Workspace", icon: Users },
    { id: 15, title: "15. Project Completed", subtitle: "8K Renders & Spec Master", icon: CheckCircle2 },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative z-10 bg-[#050505] text-white pt-[120px] pb-[140px] px-6 sm:px-12 lg:px-[120px] max-w-[1600px] mx-auto overflow-hidden"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-500/5 rounded-full blur-[160px] pointer-events-none" />

      {/* SECTION TITLE & HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.7 }}
        className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16"
      >
        <span className="font-mono text-xs font-bold tracking-widest text-sky-400 uppercase mb-4 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20">
          HOW RUHARC WORKS
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          From One Idea <br className="hidden sm:block" />
          <span className="animate-text-gradient">To A Complete Architectural Project.</span>
        </h2>

        <p className="text-base sm:text-xl text-white/70 font-normal leading-relaxed max-w-3xl">
          Watch how RUHARC transforms a simple prompt into a professional, editable architectural design through 15 intelligent real-time stages.
        </p>

        {/* Player Play/Pause Controls */}
        <div className="flex items-center gap-4 mt-8 glass-pill px-5 py-2.5 rounded-full border border-white/10">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="flex items-center gap-2 text-xs font-mono font-bold text-sky-400 hover:text-white transition-colors cursor-pointer"
          >
            {isPlaying ? (
              <>
                <Pause className="w-4 h-4 text-sky-400" />
                <span>Pause Real-Time Story</span>
              </>
            ) : (
              <>
                <Play className="w-4 h-4 text-emerald-400 fill-emerald-400" />
                <span>Auto-Play Sequence (25s)</span>
              </>
            )}
          </button>
          <span className="text-white/20">|</span>
          <button
            onClick={() => setActiveStep(1)}
            className="text-xs font-mono text-white/50 hover:text-white transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset to Step 01</span>
          </button>
        </div>
      </motion.div>

      {/* STORYLINE INTERACTIVE TIMELINE STRIP */}
      <div className="mb-12 overflow-x-auto pb-4 scrollbar-thin">
        <div className="flex items-center gap-2 min-w-max">
          {stepsList.map((step) => {
            const isActive = activeStep === step.id;
            const Icon = step.icon;
            return (
              <button
                key={step.id}
                onClick={() => {
                  setActiveStep(step.id);
                  setIsPlaying(false);
                }}
                className={`px-3.5 py-2.5 rounded-2xl border transition-all duration-300 flex items-center gap-2.5 text-left cursor-pointer ${
                  isActive
                    ? "bg-sky-500/20 border-sky-400 text-white scale-105 shadow-xl shadow-sky-500/10"
                    : "bg-white/[0.03] border-white/10 text-white/60 hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono ${
                    isActive ? "bg-sky-400 text-black" : "bg-white/10 text-white/70"
                  }`}
                >
                  {step.id < 10 ? `0${step.id}` : step.id}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold whitespace-nowrap">{step.title}</span>
                  <span className="text-[9px] font-mono text-white/40 whitespace-nowrap">{step.subtitle}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* REAL-TIME SIMULATION CANVAS CONTAINER */}
      <div className="relative w-full min-h-[580px] rounded-[32px] glass-panel border border-white/15 p-6 sm:p-12 overflow-hidden shadow-2xl bg-[#090a0e]/95 flex flex-col justify-between">
        {/* Canvas Header / Status Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-rose-500/80" />
            <div className="w-3 h-3 rounded-full bg-amber-500/80" />
            <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            <span className="text-xs font-mono text-white/40 ml-2">
              RUHARC ARCHITECTURE OS // RUNTIME STAGE {activeStep < 10 ? `0${activeStep}` : activeStep} OF 15
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
              {stepsList[activeStep - 1].title}
            </span>
          </div>
        </div>

        {/* STEP-BY-STEP DYNAMIC SIMULATION DISPLAY */}
        <AnimatePresence mode="wait">
          {/* STEP 01: YOUR IDEA */}
          {activeStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center flex-1 my-auto text-center max-w-2xl mx-auto"
            >
              <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6 shadow-xl">
                <Sparkles className="w-8 h-8 animate-pulse" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">Step 01: Describe Your Idea</h3>
              <p className="text-sm text-white/60 mb-8">Natural language prompt initialization with instant AI wake-up.</p>

              <div className="w-full glass-panel p-4 rounded-2xl border border-white/20 flex items-center gap-3 bg-black/50">
                <input
                  type="text"
                  value={typedText}
                  readOnly
                  className="w-full bg-transparent text-white font-mono text-sm sm:text-base focus:outline-none"
                />
                <button className="px-4 py-2.5 rounded-xl bg-sky-400 text-black font-bold text-xs font-mono flex items-center gap-1.5 shadow-lg shadow-sky-400/20">
                  <Send className="w-4 h-4" />
                  Enter
                </button>
              </div>
            </motion.div>
          )}

          {/* STEP 02: AI UNDERSTANDS */}
          {activeStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center flex-1 my-auto max-w-xl mx-auto w-full text-center"
            >
              {/* Progress Ring */}
              <div className="relative w-24 h-24 mb-6 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="48" cy="48" r="40" stroke="rgba(255,255,255,0.1)" strokeWidth="6" fill="transparent" />
                  <circle
                    cx="48"
                    cy="48"
                    r="40"
                    stroke="#38bdf8"
                    strokeWidth="6"
                    fill="transparent"
                    strokeDasharray={251}
                    strokeDashoffset={251 - (251 * thinkProgress) / 100}
                    className="transition-all duration-100"
                  />
                </svg>
                <span className="absolute font-mono text-lg font-bold text-sky-400">{thinkProgress}%</span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-4">Step 02: AI Reasoning Stream</h3>
              <div className="w-full space-y-2 text-left font-mono text-xs">
                {[
                  "✓ Analyzing plot dimensions (50×80 ft)...",
                  "✓ Calculating setback & zoning regulations...",
                  "✓ Checking natural solar angles & wind directions...",
                  "✓ Planning circulation paths & room adjacencies...",
                  "✓ Generating initial structural wireframe...",
                ].map((msg, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl bg-white/5 border border-white/10 text-sky-300">
                    {msg}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 03: AI INTERVIEW */}
          {activeStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center flex-1 my-auto max-w-xl mx-auto w-full text-center"
            >
              <MessageSquare className="w-10 h-10 text-sky-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Step 03: AI Interview Onboarding</h3>
              <p className="text-sm text-white/60 mb-6">Conversational questions replacing tedious forms.</p>

              <div className="w-full space-y-3 font-mono text-xs">
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-300 text-left">
                  AI: &quot;How many family members will live in this villa, and do you require a rooftop garden?&quot;
                </div>
                <div className="p-3 rounded-xl bg-white/10 border border-white/10 text-white text-right">
                  User: &quot;5 family members. Yes to rooftop garden and open kitchen layout.&quot;
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 04: PROMPT ENHANCEMENT */}
          {activeStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 my-auto flex-1 items-center"
            >
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
                <span className="text-rose-400 font-bold uppercase block mb-2">ORIGINAL USER PROMPT</span>
                <p className="text-white/70">&quot;Build me a luxury modern villa on a 50×80 ft plot.&quot;</p>
              </div>

              <div className="p-6 rounded-2xl bg-sky-500/10 border border-sky-400/40 font-mono text-xs">
                <span className="text-sky-400 font-bold uppercase block mb-2">ENHANCED ARCHITECTURAL SYNTHESIS</span>
                <p className="text-white leading-relaxed">
                  &quot;Design a two-story luxury modern villa on a 50×80 ft plot featuring double-height living room, 5 en-suite bedrooms, open-concept kitchen, Scandinavian wood facade, rooftop garden, and optimized cross ventilation.&quot;
                </p>
              </div>
            </motion.div>
          )}

          {/* STEP 05: DIMENSION ENGINE */}
          {activeStep === 5 && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center flex-1 my-auto text-center"
            >
              <h3 className="text-2xl font-bold text-white mb-2">Step 05: Parametric Dimension Engine</h3>
              <p className="text-sm text-white/60 mb-6">Blueprints draw room boundaries and circulation paths automatically.</p>

              <div className="w-full max-w-lg p-6 rounded-2xl bg-[#041226] border border-sky-400/40 font-mono text-xs text-sky-300">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div className="p-3 border border-sky-400/40 rounded-xl">
                    <span className="font-bold block">MASTER BEDROOM</span>
                    <span className="text-white">16 × 18 FT</span>
                  </div>
                  <div className="p-3 border border-sky-400/40 rounded-xl">
                    <span className="font-bold block">OPEN KITCHEN</span>
                    <span className="text-white">14 × 12 FT</span>
                  </div>
                  <div className="p-3 border border-sky-400/40 rounded-xl">
                    <span className="font-bold block">LIVING AREA</span>
                    <span className="text-white">22 × 18 FT</span>
                  </div>
                  <div className="p-3 border border-sky-400/40 rounded-xl">
                    <span className="font-bold block">GARAGE & PARKING</span>
                    <span className="text-white">20 × 22 FT</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 06: AI GENERATION */}
          {activeStep === 6 && (
            <motion.div
              key="step6"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full h-[360px] rounded-2xl overflow-hidden border border-white/20 my-auto"
            >
              <img src="/images/villa1.png" alt="Render Generation" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent p-6 flex flex-col justify-end">
                <span className="text-xs font-mono text-sky-400 uppercase font-bold">STAGE 06 // RENDER GENERATED</span>
                <h4 className="text-xl font-bold text-white">Photorealistic Modern Villa Concept</h4>
              </div>
            </motion.div>
          )}

          {/* STEP 07: AI ARCHITECT WORKSPACE */}
          {activeStep === 7 && (
            <motion.div
              key="step7"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col justify-between flex-1 my-auto w-full space-y-4"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-sky-400 font-bold">FLAGSHIP LIVE CANVAS EDITING</span>
                <span className="text-white/50">Prompt {editPromptIndex + 1} of 3</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 font-mono text-xs">
                <span className="text-white/50 block mb-1">Active Command:</span>
                <div className="text-sky-300 font-bold text-sm">{editPrompts[editPromptIndex].prompt}</div>
              </div>

              <div className="p-4 rounded-2xl bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-white">
                <span className="text-emerald-400 font-bold block mb-1">AI Live Canvas Output:</span>
                <div>{editPrompts[editPromptIndex].response}</div>
              </div>

              <div className="flex justify-end gap-2">
                {editPrompts.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setEditPromptIndex(i)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs transition-colors ${
                      editPromptIndex === i ? "bg-sky-400 text-black font-bold" : "bg-white/10 text-white/60"
                    }`}
                  >
                    Preset {i + 1}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 08: SMART VALIDATION */}
          {activeStep === 8 && (
            <motion.div
              key="step8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center flex-1 my-auto text-center max-w-xl mx-auto w-full"
            >
              <AlertTriangle className="w-12 h-12 text-amber-400 mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold text-white mb-2">Step 08: Building Code Validation HUD</h3>

              <div
                className={`w-full p-4 rounded-2xl border transition-all text-left font-mono text-xs ${
                  validatedFixed
                    ? "bg-emerald-500/10 border-emerald-400/40 text-emerald-300"
                    : "bg-amber-500/10 border-amber-400/40 text-amber-300"
                }`}
              >
                <div className="font-bold text-sm mb-1">
                  {validatedFixed
                    ? "✓ VALIDATED: Staircase width updated to 4.0 ft code standard."
                    : "⚠ Staircase width is below recommended building code safety standard."}
                </div>
                <div className="text-white/70">Suggested Fix: Increase staircase clearance by 1.0 ft.</div>
              </div>

              <button
                onClick={() => setValidatedFixed(!validatedFixed)}
                className="mt-6 px-6 py-3 rounded-xl bg-sky-400 text-black font-bold font-mono text-xs shadow-lg shadow-sky-400/20 cursor-pointer"
              >
                {validatedFixed ? "Reset Warning" : "Apply Automatically [ YES ]"}
              </button>
            </motion.div>
          )}

          {/* STEP 09: VERSION HISTORY */}
          {activeStep === 9 && (
            <motion.div
              key="step9"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col justify-center flex-1 my-auto space-y-3 font-mono text-xs max-w-xl mx-auto w-full"
            >
              <span className="text-sky-400 font-bold uppercase text-center block mb-2">DESIGN BRANCH VERSION HISTORY</span>
              {[
                { v: "v1.0", desc: "Original Concept", status: "Base" },
                { v: "v2.0", desc: "Added Balcony & Pool", status: "Saved" },
                { v: "v3.0", desc: "Expanded Kitchen to 14x12 ft", status: "Saved" },
                { v: "v4.0", desc: "Luxury Scandinavian Interior", status: "Saved" },
                { v: "v5.0", desc: "Rooftop Garden & Solar Array", status: "ACTIVE BRANCH" },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    idx === 4 ? "bg-sky-500/20 border-sky-400 text-white font-bold" : "bg-white/5 border-white/10 text-white/70"
                  }`}
                >
                  <span>{item.v} - {item.desc}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-white/10">{item.status}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* STEP 10: MATERIAL ESTIMATION */}
          {activeStep === 10 && (
            <motion.div
              key="step10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4 my-auto flex-1 items-center font-mono text-xs"
            >
              {[
                { title: "Concrete", val: "180 Cu.m", icon: "🧱" },
                { title: "Steel Rebar", val: "14.2 Tons", icon: "⚙️" },
                { title: "AAC Bricks", val: "12,400 Pcs", icon: "📦" },
                { title: "Glass Windows", val: "1,200 Sq.ft", icon: "🪟" },
              ].map((m, i) => (
                <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <span className="text-2xl block mb-2">{m.icon}</span>
                  <span className="text-white/60 block">{m.title}</span>
                  <span className="text-sky-400 font-bold text-sm">{m.val}</span>
                </div>
              ))}
            </motion.div>
          )}

          {/* STEP 11: COST ANALYSIS */}
          {activeStep === 11 && (
            <motion.div
              key="step11"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col justify-between flex-1 my-auto max-w-xl mx-auto w-full space-y-4"
            >
              <div className="flex items-center justify-between font-mono text-xs">
                <span className="text-emerald-400 font-bold">LIVE COST OPTIMIZER</span>
                <span className="text-white/50">Currency: INR (₹)</span>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between font-mono text-xs">
                <div>
                  <span className="text-white/50 block">BUDGET TARGET</span>
                  <span className="text-white font-bold text-lg">₹80 Lakhs</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-bold block">OPTIMIZED ESTIMATE</span>
                  <span className="text-sky-400 font-bold text-xl">₹74 Lakhs</span>
                </div>
                <div className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 font-bold">
                  Save ₹6 Lakhs
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {(["basic", "premium", "luxury"] as const).map((t) => (
                  <button
                    key={t}
                    onClick={() => setCostTier(t)}
                    className={`py-2 rounded-xl font-mono text-xs uppercase font-bold transition-colors ${
                      costTier === t ? "bg-sky-400 text-black" : "bg-white/5 text-white/60"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 12: CONSTRUCTION REPORT */}
          {activeStep === 12 && (
            <motion.div
              key="step12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center flex-1 my-auto text-center"
            >
              <FileText className="w-12 h-12 text-sky-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Step 12: Construction PDF Report</h3>
              <p className="text-sm text-white/60 mb-6">24-page complete architectural & structural specification document.</p>

              <div className="w-full max-w-md p-4 rounded-2xl bg-white/5 border border-white/15 font-mono text-xs text-left space-y-2">
                <div className="text-sky-300 font-bold">DOCUMENT CONTENTS:</div>
                <div className="text-white/80">• Cover Page & Project Overview</div>
                <div className="text-white/80">• Dimensioned Floor Plans & Elevations</div>
                <div className="text-white/80">• Material Takeoff & Cost Breakdown</div>
                <div className="text-white/80">• Construction Notes & Timeline</div>
              </div>
            </motion.div>
          )}

          {/* STEP 13: EXPORT */}
          {activeStep === 13 && (
            <motion.div
              key="step13"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center flex-1 my-auto text-center"
            >
              <Download className="w-12 h-12 text-emerald-400 mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Step 13: Multi-Format Package Export</h3>
              <p className="text-sm text-white/60 mb-6">Export CAD DWG/DXF, PDF, 8K PNGs, and ZIP packages.</p>

              <div className="flex flex-wrap gap-3 justify-center font-mono text-xs">
                {["PDF Report", "PNG 8K Renders", "DXF CAD File", "SVG Floor Plan", "ZIP Archive"].map((f, i) => (
                  <span key={i} className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/30 font-bold">
                    ✓ {f}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* STEP 14: TEAM COLLABORATION */}
          {activeStep === 14 && (
            <motion.div
              key="step14"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col justify-center flex-1 my-auto space-y-4 max-w-xl mx-auto w-full font-mono text-xs"
            >
              <span className="text-sky-400 font-bold text-center uppercase block">REAL-TIME TEAM MULTIPLAYER</span>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/30 text-sky-300">
                  Lead Architect (Online)
                </div>
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-400/30 text-indigo-300">
                  Structural Eng. (Online)
                </div>
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-300">
                  Client (Approved)
                </div>
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300">
                  Builder (Viewing)
                </div>
              </div>
            </motion.div>
          )}

          {/* STEP 15: PROJECT COMPLETED */}
          {activeStep === 15 && (
            <motion.div
              key="step15"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex flex-col items-center justify-center flex-1 my-auto text-center max-w-xl mx-auto"
            >
              <CheckCircle2 className="w-16 h-16 text-emerald-400 mb-4" />
              <h3 className="text-3xl font-extrabold text-white mb-2">Project Completed!</h3>
              <p className="text-sm text-white/70 mb-6">Luxury Modern Villa is fully rendered, dimensioned, costed, and export-ready.</p>

              <div className="flex flex-wrap gap-3 justify-center">
                <a href="#demo-workspace" className="px-6 py-3 rounded-xl bg-white text-black font-bold font-mono text-xs shadow-xl">
                  Open Workspace Studio
                </a>
                <a href="#pricing" className="px-6 py-3 rounded-xl bg-white/10 text-white font-bold font-mono text-xs border border-white/20">
                  Download Full Report
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom Navigation Buttons */}
        <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-6">
          <button
            onClick={() => {
              setActiveStep((prev) => (prev > 1 ? prev - 1 : 15));
              setIsPlaying(false);
            }}
            className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white/70 hover:text-white transition-colors cursor-pointer"
          >
            ← Previous Stage
          </button>

          <span className="text-xs font-mono text-white/40">
            Stage {activeStep} / 15
          </span>

          <button
            onClick={() => {
              setActiveStep((prev) => (prev < 15 ? prev + 1 : 1));
              setIsPlaying(false);
            }}
            className="px-4 py-2 rounded-xl bg-sky-400 text-black font-bold text-xs font-mono flex items-center gap-1 shadow-lg shadow-sky-400/20 cursor-pointer"
          >
            <span>Next Stage</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* FINAL SECTION CTA */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mt-28 glass-panel p-10 sm:p-16 rounded-[36px] border border-white/15 text-center relative overflow-hidden bg-gradient-to-b from-white/[0.04] to-transparent"
      >
        <div className="relative z-10 max-w-3xl mx-auto">
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
            Ready to Design Without Limits?
          </h2>
          <p className="text-base sm:text-xl text-white/70 font-normal leading-relaxed mb-8">
            Transform your ideas into professional architectural projects with the world&apos;s most intelligent AI Architecture Operating System.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#demo-workspace"
              className="px-8 py-4 rounded-[20px] bg-white text-black font-bold text-base hover:scale-105 transition-transform shadow-2xl shadow-white/20 flex items-center gap-2"
            >
              <Sparkles className="w-5 h-5 text-sky-600" />
              Start Designing Now
            </a>
            <a
              href="#pricing"
              className="px-8 py-4 rounded-[20px] glass-panel border border-white/20 text-white font-semibold text-base hover:bg-white/10 transition-all"
            >
              Book Live Demo
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};
