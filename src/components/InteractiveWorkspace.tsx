"use client";

import React, { useState, useEffect } from "react";
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
  GitBranch,
  Share2,
  Eye,
  CheckCircle2,
  ArrowRight,
  Maximize2,
  Compass,
  Sliders,
  Send,
  Layers
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
    plot: "50 × 80 ft",
    area: 3850,
    bedrooms: 5,
    bathrooms: 5,
    parking: "2 Cars",
    garden: "Landscape Yard",
    cost: 78,
  });

  const thinkingSteps = [
    "Analyzing Plot Dimensions...",
    "Calculating Structural Loads...",
    "Optimizing Solar Circulation...",
    "Checking Building Ventilation...",
    "Balancing Architectural Proportions...",
    "Generating 8K Render & CAD...",
  ];

  // Conversation history state
  const [messages, setMessages] = useState<PromptMessage[]>([
    {
      id: "1",
      sender: "user",
      text: "Design a luxury two-story villa on a 50×80 ft plot.",
    },
    {
      id: "2",
      sender: "ai",
      text: "Project requirements analyzed. Generating layout...",
      checklist: [
        "Plot Validated",
        "Dimensions Calculated",
        "Natural Lighting Optimized",
        "Parking Added",
        "Landscape Generated",
      ],
    },
  ]);

  // Thinking step cycling
  useEffect(() => {
    if (!isThinking) return;
    const interval = setInterval(() => {
      setThinkingIndex((prev) => (prev + 1) % thinkingSteps.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [isThinking]);

  // Handle user AI command trigger
  const triggerAiUpdate = (
    userText: string,
    checklist: string[],
    newImg: 0 | 1,
    newDims: Partial<typeof dimensions>
  ) => {
    if (isThinking || isTransitioning) return;

    // Add user message
    const userMsg: PromptMessage = {
      id: Date.now().toString(),
      sender: "user",
      text: userText,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsThinking(true);

    setTimeout(() => {
      setIsThinking(false);
      // Image cinematic transition sequence (Fade -> Blur -> Cross dissolve -> Zoom In)
      setIsTransitioning(true);
      setCurrentImageIndex(newImg);

      setTimeout(() => {
        setIsTransitioning(false);
      }, 900);

      // Add AI response
      const aiMsg: PromptMessage = {
        id: (Date.now() + 1).toString(),
        sender: "ai",
        text: "Updating architectural geometry...",
        checklist,
      };
      setMessages((prev) => [...prev, aiMsg]);

      // Update dimension stats (numbers count up)
      setDimensions((prev) => ({ ...prev, ...newDims }));
    }, 2400);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promptInput.trim()) return;
    const input = promptInput;
    setPromptInput("");

    triggerAiUpdate(
      input,
      ["Layout Repositioned", "Structure Recalibrated", "3D Renders Synchronized"],
      currentImageIndex === 0 ? 1 : 0,
      {
        area: dimensions.area + 270,
        cost: dimensions.cost + 6,
        garden: "Rooftop Garden + Yard",
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[1400px] mx-auto rounded-[28px] glass-panel p-3 sm:p-5 shadow-2xl border border-white/10 overflow-hidden"
    >
      {/* Ambient background glow inside panel */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />

      {/* 1. WORKSPACE HEADER */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10 mb-3 bg-white/[0.02] rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-sky-500/20 border border-sky-400/30 flex items-center justify-center">
            <Compass className="w-4 h-4 text-sky-400" />
          </div>
          <span className="font-bold text-sm tracking-tight text-white flex items-center gap-2">
            RUHARC OS
            <span className="text-white/30 text-xs font-normal">/</span>
            <span className="text-white/80 font-medium text-xs sm:text-sm">Modern Villa Project</span>
          </span>
        </div>

        {/* AI Status Badge & Actions */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span className="text-xs font-mono font-medium text-emerald-400">● AI Ready</span>
          </div>

          <button
            onClick={() =>
              triggerAiUpdate(
                "Optimize full layout for rooftop garden and glass balconies.",
                ["Rooftop Garden Generated", "Glass Balconies Fitted", "Solar Index +24%"],
                1,
                { area: 4120, garden: "Rooftop Oasis", cost: 84, parking: "3 Cars" }
              )
            }
            className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-xl bg-sky-500 text-black font-semibold text-xs transition-transform hover:scale-105 active:scale-95 shadow-md shadow-sky-500/20 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Generate
          </button>
        </div>
      </div>

      {/* WORKSPACE BODY (SIDEBAR + MAIN CANVAS + PROMPT PANEL) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3 h-[480px] sm:h-[620px] lg:h-[720px] relative">
        {/* 2. LEFT SIDEBAR (Icon navigation) */}
        <div className="hidden sm:flex lg:col-span-1 flex-col items-center justify-between py-4 glass-pill rounded-2xl border border-white/5">
          <div className="flex flex-col gap-4">
            {[
              { id: "projects", icon: FolderKanban, label: "Projects" },
              { id: "generator", icon: Wand2, label: "AI Generator" },
              { id: "editor", icon: Edit3, label: "AI Architectural Editor" },
              { id: "plans", icon: LayoutGrid, label: "Floor Plans" },
              { id: "reports", icon: FileText, label: "Reports" },
              { id: "exports", icon: Download, label: "Exports" },
              { id: "history", icon: Clock, label: "History" },
            ].map((item) => {
              const IconComponent = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  title={item.label}
                  className={`relative p-3 rounded-xl transition-all duration-200 group cursor-pointer ${
                    isActive
                      ? "bg-white text-black shadow-lg shadow-white/10"
                      : "text-white/50 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {/* Tooltip */}
                  <span className="absolute left-14 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-zinc-900 text-white text-[11px] font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap border border-white/10 shadow-xl">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            title="Settings"
            className="p-3 rounded-xl text-white/50 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

        {/* 3. MAIN CANVAS (Center 7 cols desktop) */}
        <div className="col-span-1 lg:col-span-7 flex flex-col relative rounded-2xl overflow-hidden border border-white/10 bg-black/40 group">
          {/* FLOATING AI TOOLBAR (Top of Canvas) */}
          <div className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between glass-pill px-4 py-2 rounded-xl border border-white/10">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentImageIndex(0)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Undo"
              >
                <Undo2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setCurrentImageIndex(1)}
                className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors"
                title="Redo"
              >
                <Redo2 className="w-4 h-4" />
              </button>
              <div className="w-[1px] h-4 bg-white/10 mx-1" />
              <button
                onClick={() => setIsComparing(!isComparing)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                  isComparing ? "bg-sky-500/20 text-sky-400 border border-sky-400/30" : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
                title="Before / After Compare Slider"
              >
                <Columns2 className="w-3.5 h-3.5" />
                <span>Compare</span>
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono text-white/40 hidden sm:inline">v2.4 ArchViz</span>
              <button className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <button className="p-1.5 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* MAIN RENDER CANVAS VIEWPORT */}
          <div className="relative w-full h-full overflow-hidden bg-zinc-950 flex items-center justify-center">
            {/* Cinematic image transition wrapper */}
            <motion.div
              animate={{
                scale: isTransitioning ? 0.97 : 1,
                filter: isTransitioning ? "blur(14px)" : "blur(0px)",
                opacity: isTransitioning ? 0.4 : 1,
              }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full h-full"
            >
              {!isComparing ? (
                /* SINGLE RENDER VIEW */
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={currentImageIndex === 0 ? "/images/villa1.png" : "/images/villa2.png"}
                    alt="Architectural Villa Render"
                    className="w-full h-full object-cover animate-continuous-zoom"
                  />

                  {/* Smart Measurement Overlay HUD */}
                  <div className="absolute top-20 left-6 glass-pill px-3 py-1.5 rounded-lg text-[11px] font-mono text-sky-300 border border-sky-400/20 flex items-center gap-2 pointer-events-none">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />
                    <span>FRONT ELEVATION: 28.5 FT</span>
                  </div>

                  <div className="absolute bottom-20 right-6 glass-pill px-3 py-1.5 rounded-lg text-[11px] font-mono text-white/80 border border-white/10 flex items-center gap-2 pointer-events-none">
                    <Layers className="w-3.5 h-3.5 text-sky-400" />
                    <span>SLOPE: 12° REINFORCED CONCRETE</span>
                  </div>
                </div>
              ) : (
                /* BEFORE / AFTER COMPARISON SLIDER VIEW */
                <div className="relative w-full h-full select-none overflow-hidden">
                  {/* Background (After / Edited Image) */}
                  <img
                    src="/images/villa2.png"
                    alt="Edited Design"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute top-16 right-4 glass-pill px-3 py-1 rounded-md text-[10px] font-mono text-sky-300">
                    EDITED DESIGN
                  </div>

                  {/* Foreground Clipped (Before / Original Image) */}
                  <div
                    className="absolute inset-0 overflow-hidden"
                    style={{ width: `${sliderPosition}%` }}
                  >
                    <img
                      src="/images/villa1.png"
                      alt="Original Design"
                      className="absolute inset-0 w-full h-full object-cover max-w-none"
                      style={{ width: "100%" }}
                    />
                    <div className="absolute top-16 left-4 glass-pill px-3 py-1 rounded-md text-[10px] font-mono text-white/60">
                      ORIGINAL CONCEPT
                    </div>
                  </div>

                  {/* Drag Handle Divider */}
                  <div
                    className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize z-20 shadow-[0_0_15px_rgba(255,255,255,0.8)]"
                    style={{ left: `${sliderPosition}%` }}
                  >
                    <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-black flex items-center justify-center shadow-2xl">
                      <Sliders className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Interactive Slider Input Overlay */}
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
                  className="absolute inset-0 z-40 bg-black/75 backdrop-blur-md flex flex-col items-center justify-center gap-4 text-center p-6"
                >
                  <div className="relative w-16 h-16 flex items-center justify-center">
                    <div className="absolute inset-0 rounded-full border-2 border-sky-400/20 border-t-sky-400 animate-spin" />
                    <Sparkles className="w-6 h-6 text-sky-400 animate-pulse" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-mono tracking-wider text-sky-400 uppercase">
                      RUHARC Intelligence Engine
                    </p>
                    <motion.p
                      key={thinkingIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-lg font-medium text-white"
                    >
                      {thinkingSteps[thinkingIndex]}
                    </motion.p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* 4. LIVE AI PROMPT & CHAT PANEL (Right 4 cols desktop) */}
        <div className="col-span-1 lg:col-span-4 flex flex-col glass-pill rounded-2xl border border-white/10 p-4 justify-between h-full bg-black/20">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-white/70 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-sky-400" />
              Live Architectural Prompt
            </span>
            <span className="text-[10px] font-mono text-white/40">Engine 02</span>
          </div>

          {/* Conversation Chat Stream */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1 scrollbar-thin">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col gap-1.5 ${
                  msg.sender === "user" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl text-xs sm:text-sm leading-relaxed max-w-[90%] ${
                    msg.sender === "user"
                      ? "bg-white text-black font-medium rounded-tr-sm shadow-md"
                      : "bg-white/10 text-white/90 border border-white/10 rounded-tl-sm backdrop-blur-md"
                  }`}
                >
                  {msg.text}

                  {/* Checklist if AI message */}
                  {msg.checklist && (
                    <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                      {msg.checklist.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 text-[11px] text-sky-300 font-mono"
                        >
                          <CheckCircle2 className="w-3 h-3 text-sky-400 shrink-0" />
                          <span>✓ {item}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Quick AI Action Chips */}
          <div className="py-2 flex flex-wrap gap-1.5 border-t border-white/10 mt-2">
            <span className="text-[10px] text-white/40 font-mono w-full">Quick Commands:</span>
            <button
              onClick={() =>
                triggerAiUpdate(
                  "Increase master bedroom width by 3 feet.",
                  ["Room Dimensions Updated", "Furniture Repositioned", "Corridor Adjusted"],
                  1,
                  { area: 3980, bedrooms: 5, cost: 81 }
                )
              }
              className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 transition-colors cursor-pointer"
            >
              +3ft Bedroom Width
            </button>
            <button
              onClick={() =>
                triggerAiUpdate(
                  "Add rooftop garden with glass pergolas.",
                  ["Rooftop Landscape Added", "Pergola Structured"],
                  1,
                  { garden: "Rooftop Garden", cost: 83 }
                )
              }
              className="text-[11px] px-2.5 py-1 rounded-lg bg-white/5 hover:bg-white/15 border border-white/10 text-white/80 transition-colors cursor-pointer"
            >
              Add Rooftop Garden
            </button>
          </div>

          {/* Interactive Chat Input Form */}
          <form onSubmit={handleCustomSubmit} className="relative mt-2">
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Ask AI to modify design (e.g. Add skylight)..."
              className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-white/40 focus:outline-none focus:border-sky-400/50 transition-colors pr-10"
            />
            <button
              type="submit"
              disabled={!promptInput.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-sky-500 text-black disabled:opacity-30 transition-opacity cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>

      {/* 5. LIVE DIMENSION PANEL (Bottom Bar) */}
      <div className="mt-3 pt-3 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 bg-white/[0.02] rounded-xl p-3">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-white/40 uppercase">Plot Size</span>
          <span className="text-xs font-semibold text-white">{dimensions.plot}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-white/40 uppercase">Built-up Area</span>
          <span className="text-xs font-semibold text-sky-400 font-mono">
            {dimensions.area.toLocaleString()} sq ft
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-white/40 uppercase">Bedrooms</span>
          <span className="text-xs font-semibold text-white">{dimensions.bedrooms} Beds</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-white/40 uppercase">Bathrooms</span>
          <span className="text-xs font-semibold text-white">{dimensions.bathrooms} Baths</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-white/40 uppercase">Parking</span>
          <span className="text-xs font-semibold text-white">{dimensions.parking}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-white/40 uppercase">Landscape</span>
          <span className="text-xs font-semibold text-emerald-400">{dimensions.garden}</span>
        </div>

        <div className="flex flex-col col-span-2 sm:col-span-1">
          <span className="text-[10px] font-mono text-white/40 uppercase">Estimated Cost</span>
          <span className="text-xs font-bold text-amber-400 font-mono">
            ₹{dimensions.cost} Lakhs
          </span>
        </div>
      </div>
    </motion.div>
  );
};
