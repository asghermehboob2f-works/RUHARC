"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Sofa,
  Sun,
  Moon,
  Camera,
  Layers,
  Palette,
  Maximize2,
  Presentation,
  Split,
  Eye,
  Sliders,
  Sparkles,
  Download,
} from "lucide-react";

export default function VisualizationWorkspacePage() {
  const [viewMode, setViewMode] = useState<"Exterior" | "Interior" | "Landscape" | "3D Model" | "Wireframe">("Exterior");
  const [sceneLighting, setSceneLighting] = useState<"Morning" | "Golden Hour" | "Evening" | "Night">("Golden Hour");
  const [renderQuality, setRenderQuality] = useState<"Standard" | "High" | "Ultra 8K">("Ultra 8K");
  const [presentationMode, setPresentationMode] = useState(false);

  return (
    <div className="space-y-6 font-mono">
      {/* WORKSPACE TOP CONTROL BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
            <Sofa className="w-4 h-4" /> RUHARC VISUALIZATION STUDIO
          </span>
          <h1 className="text-2xl font-extrabold text-white">Cinematic Render & Material Engine</h1>
          <p className="text-xs text-white/50">Photorealistic 8K ray-traced preview with daylight & material simulation.</p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPresentationMode(!presentationMode)}
            className={`px-4 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              presentationMode ? "bg-amber-400 text-black border-amber-400" : "bg-white/5 border-white/10 text-white/70"
            }`}
          >
            <Presentation className="w-4 h-4" />
            {presentationMode ? "Exit Presentation Mode" : "Client Presentation"}
          </button>

          <button className="px-4 py-2 rounded-xl bg-sky-400 text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer">
            <Download className="w-4 h-4" /> Export 8K Render
          </button>
        </div>
      </div>

      {/* VIEW MODES & SCENE LIGHTING STRIP */}
      <div className="flex flex-wrap items-center justify-between gap-4 glass-panel p-4 rounded-xl border border-white/10 text-xs">
        {/* View Mode Selector */}
        <div className="flex items-center gap-1.5">
          <span className="text-white/40 mr-2">VIEW MODE:</span>
          {(["Exterior", "Interior", "Landscape", "3D Model", "Wireframe"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                viewMode === mode ? "bg-sky-400 text-black" : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Scene Lighting Selector */}
        <div className="flex items-center gap-1.5">
          <Sun className="w-4 h-4 text-amber-400 mr-1" />
          <span className="text-white/40 mr-2">LIGHTING:</span>
          {(["Morning", "Golden Hour", "Evening", "Night"] as const).map((scene) => (
            <button
              key={scene}
              onClick={() => setSceneLighting(scene)}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer ${
                sceneLighting === scene ? "bg-amber-400 text-black" : "bg-white/5 text-white/60 hover:text-white"
              }`}
            >
              {scene}
            </button>
          ))}
        </div>
      </div>

      {/* MAIN CINEMATIC VIEWER CANVAS */}
      <div className="relative rounded-3xl overflow-hidden glass-panel border border-white/15 h-[520px] flex items-center justify-center">
        <img
          src="/images/villa1.png"
          alt="Visualization Render"
          className="w-full h-full object-cover animate-continuous-zoom"
        />

        {/* Overlay HUD Information */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 p-6 flex flex-col justify-between pointer-events-none">
          <div className="flex justify-between items-start">
            <div className="glass-pill px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-sky-300">
              ● REAL-TIME RAY TRACING (8K)
            </div>
            <div className="glass-pill px-3 py-1.5 rounded-xl border border-white/10 text-xs font-bold text-amber-300">
              LIGHTING: {sceneLighting.toUpperCase()} (SUN ELEVATION 24°)
            </div>
          </div>

          <div className="flex justify-between items-end">
            <div>
              <div className="text-xs text-white/50 font-bold">ACTIVE SCENE</div>
              <div className="text-xl font-extrabold text-white">Scandinavian Luxury Modern Villa</div>
            </div>

            <div className="flex gap-2 pointer-events-auto">
              <button className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-white/20">
                <Camera className="w-4 h-4" />
              </button>
              <button className="p-2.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white hover:bg-white/20">
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MATERIAL & FURNITURE STUDIO TOOLKITS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-sky-400 flex items-center gap-1.5">
            <Palette className="w-4 h-4" /> MATERIAL STUDIO PALETTE
          </h3>

          <div className="grid grid-cols-3 gap-3 text-xs">
            {[
              { name: "Engineered Oak", type: "Wood", status: "Active" },
              { name: "Polished Concrete", type: "Facade", status: "Active" },
              { name: "Low-E Double Glass", type: "Windows", status: "Active" },
            ].map((mat, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
                <div className="w-8 h-8 rounded-full bg-sky-500/20 border border-sky-400/40 mx-auto mb-2" />
                <div className="font-bold text-white text-[11px] truncate">{mat.name}</div>
                <div className="text-[9px] text-white/40">{mat.type}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
            <Sofa className="w-4 h-4" /> FURNITURE & LANDSCAPE PRESETS
          </h3>

          <div className="grid grid-cols-3 gap-3 text-xs">
            {["Nordic Sofa Lounge", "Minimal Dining Table", "Pool Pergola Deck"].map((item, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 text-center space-y-1">
                <div className="font-bold text-white text-[11px] truncate">{item}</div>
                <div className="text-[9px] text-emerald-400">1-Click Snap</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
