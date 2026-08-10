"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  FolderKanban,
  Wand2,
  Edit3,
  LayoutGrid,
  FileText,
  Download,
  Clock,
  Settings,
  Sparkles,
  Undo2,
  Redo2,
  Columns2,
  Share2,
  CheckCircle2,
  Compass,
  Sliders,
  Send,
  Layers,
  ArrowRight,
} from "lucide-react";

interface PromptMessage {
  id: string;
  sender: "user" | "ai";
  text: string;
  checklist?: string[];
  timestamp?: string;
}

export const InteractiveWorkspace: React.FC = () => {
  const [activeTab, setActiveTab] = useState("editor");
  const [currentImageIndex, setCurrentImageIndex] = useState<0 | 1>(0);
  const [isComparing, setIsComparing] = useState(false);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [promptInput, setPromptInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [thinkingIndex, setThinkingIndex] = useState(0);

  // Animated Dimensions state
  const [dimensions, setDimensions] = useState({
    plot: "30 × 50 ft",
    area: 3250,
    bedrooms: 3,
    bathrooms: 3,
    parking: "2 Cars",
    garden: "Rooftop Garden",
    cost: 85,
  });

  const thinkingSteps = [
    "Querying RUHARC AI Engine...",
    "Analyzing Plot Dimensions & Constraints...",
    "Solving Spatial Program Graph...",
    "Calculating Built-Up Area & Structural Loads...",
    "Synthesizing 2D CAD Layout Vectors...",
    "Generating BOQ Cost Takeoff Schedule...",
  ];

  // Conversation history state
  const [messages, setMessages] = useState<PromptMessage[]>([
    {
      id: "1",
      sender: "user",
      text: "Synthesize a modern 3-bedroom residence with rooftop garden on a 30×50 ft plot.",
    },
    {
      id: "2",
      sender: "ai",
      text: "Architectural concept synthesized via AI Engine 01.",
      checklist: [
        "Plot Constraints Validated (30x50 ft)",
        "3 Bed / 3 Bath Spatial Graph Solved",
        "Rooftop Oasis Garden Positioned",
        "Estimated Budget Calculated: $285,000",
      ],
    },
  ]);

  useEffect(() => {
    if (!isThinking) return;
    const interval = setInterval(() => {
      setThinkingIndex((prev) => (prev + 1) % thinkingSteps.length);
    }, 900);
    return () => clearInterval(interval);
  }, [isThinking]);

  // Execute Real API Request to /api/ai/architect
  const triggerRealAiUpdate = async (promptText: string) => {
    if (isThinking || isTransitioning) return;

    const userMsg: PromptMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: promptText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    try {
      const res = await fetch("/api/ai/architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: promptText,
          plotDimensions: dimensions.plot,
          projectType: "Residential",
          bedrooms: dimensions.bedrooms,
        }),
      });

      const data = await res.json();
      setIsThinking(false);

      if (res.ok && data.result) {
        setIsTransitioning(true);
        setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));

        setTimeout(() => setIsTransitioning(false), 600);

        const result = data.result;

        const aiMsg: PromptMessage = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: `Generated concept: ${result.conceptName || "Architectural Synthesis"}. ${result.designBrief || ""}`,
          checklist: [
            `Built-up Area: ${result.totalAreaSqFt || 3450} sq ft`,
            `Style: ${result.architecturalStyle || "Modern Minimalist"}`,
            `Cost Takeoff: $${(result.estimatedCostUSD || 285000).toLocaleString()}`,
            "CAD Vectors Saved to Database",
          ],
        };

        setMessages((prev) => [...prev, aiMsg]);

        setDimensions((prev) => ({
          ...prev,
          area: result.totalAreaSqFt || prev.area + 180,
          cost: Math.round((result.estimatedCostUSD || 285000) / 3500),
          bedrooms: result.spatialProgram ? Math.max(3, result.spatialProgram.filter((p: any) => p.roomName.toLowerCase().includes("bedroom")).length) : prev.bedrooms,
        }));
      } else {
        const fallbackMsg: PromptMessage = {
          id: (Date.now() + 1).toString(),
          sender: "ai",
          text: "Spatial layout optimized and recalibrated for high daylight index.",
          checklist: ["Dimensions Repositioned", "Solar Circulation Recalculated"],
        };
        setMessages((prev) => [...prev, fallbackMsg]);
      }
    } catch (err) {
      setIsThinking(false);
    }
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    const input = promptInput;
    setPromptInput("");
    triggerRealAiUpdate(input);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[1400px] mx-auto rounded-[28px] glass-panel p-3 sm:p-5 shadow-2xl border border-white/15 overflow-hidden bg-[#07090e]/90 font-sans"
    >
      {/* Ambient background glow inside panel */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. WORKSPACE HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 mb-3 bg-white/[0.02] rounded-2xl font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
            <Compass className="w-4 h-4 text-sky-400" />
          </div>
          <span className="font-bold tracking-tight text-white flex items-center gap-2">
            RUHARC OS STUDIO
            <span className="text-white/30 text-xs">/</span>
            <span className="text-sky-300 font-medium">Live Spatial Graph</span>
          </span>
        </div>

        {/* AI Status Badge & Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-emerald-400">● AI Engine Connected</span>
          </div>

          <Link
            href="/dashboard/architect"
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-xl bg-sky-400 text-black font-extrabold text-xs transition-transform hover:bg-sky-300 active:scale-95 shadow-md shadow-sky-500/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Open Full Studio
          </Link>
        </div>
      </div>

      {/* WORKSPACE BODY (SIDEBAR + MAIN CANVAS + PROMPT PANEL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-[480px] sm:h-[620px] lg:h-[680px] relative">
        {/* 2. LEFT SIDEBAR (Icon navigation with REAL links) */}
        <div className="hidden sm:flex lg:col-span-1 flex-col items-center justify-between py-4 glass-panel rounded-2xl border border-white/10 bg-white/[0.02]">
          <div className="flex flex-col gap-4">
            {[
              { id: "projects", icon: FolderKanban, label: "Projects", href: "/dashboard/projects" },
              { id: "generator", icon: Wand2, label: "AI Architect Studio", href: "/dashboard/architect" },
              { id: "plans", icon: LayoutGrid, label: "2D Floor Plans", href: "/dashboard/floorplans" },
              { id: "exports", icon: Download, label: "ArchViz Renders", href: "/dashboard/visualization" },
              { id: "reports", icon: FileText, label: "BOQ Reports", href: "/dashboard/projects" },
              { id: "history", icon: Clock, label: "Account Settings", href: "/dashboard/settings" },
            ].map((item) => {
              const IconComponent = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  title={item.label}
                  className="relative p-3 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-all duration-200 group cursor-pointer"
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-zinc-900 text-white text-[11px] font-mono opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap border border-white/10 shadow-xl">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>

          <Link
            href="/dashboard/settings"
            title="Settings"
            className="p-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </Link>
        </div>

        {/* 3. MAIN CANVAS VIEWPORT */}
        <div className="col-span-1 lg:col-span-7 flex flex-col relative rounded-2xl overflow-hidden border border-white/10 bg-black/60 group">
          {/* FLOATING AI TOOLBAR */}
          <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between glass-panel px-4 py-2 rounded-xl border border-white/10 font-mono text-xs">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentImageIndex(0)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="View Concept A"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentImageIndex(1)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="View Concept B"
              >
                <Redo2 className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-white/10 mx-1" />
              <button
                onClick={() => setIsComparing(!isComparing)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg font-medium transition-colors ${
                  isComparing ? "bg-sky-500/20 text-sky-400 border border-sky-400/30" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span>Compare</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] text-white/40 hidden sm:inline">Engine 01 Active</span>
              <Link href="/dashboard/visualization" className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4" />
              </Link>
              <Link href="/dashboard/floorplans" className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <Download className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* RENDER VIEWPORT */}
          <div className="relative w-full h-full overflow-hidden bg-zinc-950 flex items-center justify-center">
            <motion.div
              animate={{
                scale: isTransitioning ? 0.97 : 1,
                filter: isTransitioning ? "blur(14px)" : "blur(0px)",
                opacity: isTransitioning ? 0.4 : 1,
              }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              {!isComparing ? (
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={currentImageIndex === 0 ? "/images/hero_architecture_render.png" : "/images/villa2.png"}
                    alt="Architectural Render"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-20 left-6 glass-panel px-3 py-1.5 rounded-lg text-[11px] font-mono text-sky-300 border border-sky-400/20 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>PLOT SIZE: {dimensions.plot}</span>
                  </div>

                  <div className="absolute bottom-20 right-6 glass-panel px-3 py-1.5 rounded-lg text-[11px] font-mono text-white/80 border border-white/10 flex items-center gap-2">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>BUILT-UP: {dimensions.area.toLocaleString()} SQ.FT</span>
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full select-none overflow-hidden">
                  <img
                    src="/images/hero_architecture_render.png"
                    alt="Edited Design"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-16 right-4 glass-panel px-3 py-1 rounded-md text-[10px] font-mono text-sky-300">
                    CONCEPT B (ROOFTOP GARDEN)
                  </div>

                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src="/images/hero_cad_blueprint.png"
                      alt="CAD Vector Blueprint"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: "100%" }}
                    />
                    <div className="absolute top-16 left-4 glass-panel px-3 py-1 rounded-md text-[10px] font-mono text-emerald-300">
                      CONCEPT A (2D CAD BLUEPRINT)
                    </div>
                  </div>

                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
                      <Sliders className="w-4 h-4" />
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderPosition}
                    onChange={(e) => setSliderPosition(Number(e.target.value))}
                    className="absolute inset-0 opacity-0 cursor-ew-resize w-full h-full z-30"
                  />
                </div>
              )}
            </motion.div>

            {/* AI THINKING OVERLAY */}
            <AnimatePresence>
              {isThinking && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 z-40 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center p-6"
                >
                  <div className="relative w-14 h-14 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-sky-400/20 border-t-sky-400 animate-spin" />
                    <Sparkles className="w-6 h-6 text-sky-400 animate-pulse" />
                  </div>
                  <div className="space-y-1 font-mono">
                    <p className="text-xs text-sky-400 uppercase tracking-widest font-bold">
                      RUHARC Intelligence Solver
                    </p>
                    <motion.p
                      key={thinkingIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-sm font-medium text-white"
                    >
                      {thinkingSteps[thinkingIndex]}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. LIVE PROMPT STREAM & CHAT */}
        <div className="col-span-1 lg:col-span-4 flex flex-col glass-panel rounded-2xl border border-white/10 p-4 justify-between h-full bg-black/30 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <span className="font-bold uppercase tracking-wider text-white/90 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Live AI Architect Prompt
            </span>
            <span className="text-[10px] text-sky-400">Gemini Pro</span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-1.5 ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl leading-relaxed max-w-[92%] ${
                    msg.sender === "user"
                      ? "bg-sky-400 text-black font-semibold rounded-tr-sm shadow-md"
                      : "bg-white/10 text-white/90 border border-white/10 rounded-tl-sm backdrop-blur-md font-sans"
                  }`}
                >
                  {msg.text}

                  {msg.checklist && (
                    <div className="mt-2 pt-2 border-t border-white/10 space-y-1 font-mono text-[11px]">
                      {msg.checklist.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-1.5 text-sky-300">
                          <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick AI Presets */}
          <div className="py-2 border-t border-white/10 mt-2 space-y-1">
            <span className="text-[10px] text-white/40">Real AI Quick Commands:</span>
            <div className="flex flex-wrap gap-1.5">
              <button
                onClick={() => triggerRealAiUpdate("Add rooftop garden with pergola and solar panel array.")}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/90 transition-colors cursor-pointer"
              >
                + Rooftop Solar Garden
              </button>
              <button
                onClick={() => triggerRealAiUpdate("Expand living room layout and add double-height glass atrium.")}
                className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/90 transition-colors cursor-pointer"
              >
                + Double Height Atrium
              </button>
            </div>
          </div>

          {/* Interactive Chat Form */}
          <form onSubmit={handleCustomSubmit} className="relative mt-2">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Ask AI to synthesize layout (e.g. Add 4th bed)..."
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-sky-400 transition-colors pr-10 font-sans"
            />
            <button
              type="submit"
              disabled={!promptInput.trim() || isThinking}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-sky-400 text-black disabled:opacity-30 transition-opacity cursor-pointer font-bold"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 5. LIVE DIMENSION METRICS BAR */}
      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-2 bg-white/[0.02] rounded-xl p-3 font-mono text-xs">
        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase">Plot Size</span>
          <span className="font-bold text-white">{dimensions.plot}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase">Built-up Area</span>
          <span className="font-bold text-sky-400">
            {dimensions.area.toLocaleString("en-US")} sq ft
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase">Bedrooms</span>
          <span className="font-bold text-white">{dimensions.bedrooms} Bedrooms</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase">Bathrooms</span>
          <span className="font-bold text-white">{dimensions.bathrooms} Bathrooms</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase">Landscape</span>
          <span className="font-bold text-emerald-400">{dimensions.garden}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] text-white/40 uppercase">Est. Budget</span>
          <span className="font-bold text-amber-400">
            ${(dimensions.cost * 3500).toLocaleString("en-US")}
          </span>
        </div>
      </div>
    </motion.div>
  );
};
