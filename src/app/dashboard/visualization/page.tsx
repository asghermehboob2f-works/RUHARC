"use client";

import React, { useState } from "react";
import { Sofa, Wand2, Sparkles, Image as ImageIcon, Layers, RefreshCw } from "lucide-react";

export default function VisualizationPage() {
  const [style, setStyle] = useState("Scandinavian Minimalist");
  const [viewType, setViewType] = useState("Exterior Facade");
  const [lighting, setLighting] = useState("Golden Hour Daylight");
  const [isGenerating, setIsGenerating] = useState(false);
  const [rendered, setRendered] = useState(false);

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setRendered(true);
    }, 1500);
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="p-8 rounded-3xl bg-gradient-to-r from-sky-950/60 via-[#070d18] to-indigo-950/40 border border-sky-500/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-400 mb-3">
          <Sofa className="w-3.5 h-3.5" /> ARCHITECTURAL VISUALIZATION ENGINE
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          High-Definition Render Studio
        </h1>
        <p className="text-sm text-white/60 font-sans mt-2 max-w-xl">
          Generate photorealistic exterior facades, interior room perspectives, and lighting studies for your architectural concepts.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 font-mono text-xs">
        <form onSubmit={handleGenerate} className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#08090e] space-y-4">
          <h3 className="text-sm font-bold text-white uppercase text-sky-400">Render Parameters</h3>

          <div>
            <label className="text-white/70 block mb-1 font-bold">View Perspective</label>
            <select
              value={viewType}
              onChange={(e) => setViewType(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#111] border border-white/10 text-white"
            >
              <option value="Exterior Facade">Exterior Front Elevation</option>
              <option value="Interior Living Room">Interior Living Room</option>
              <option value="Master Bedroom Suite">Master Bedroom Suite</option>
              <option value="Aerial Isometric View">Aerial Isometric View</option>
            </select>
          </div>

          <div>
            <label className="text-white/70 block mb-1 font-bold">Design Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#111] border border-white/10 text-white"
            >
              <option value="Scandinavian Minimalist">Scandinavian Minimalist</option>
              <option value="Contemporary Japanese Wood">Contemporary Japanese Wood</option>
              <option value="Brutalist Concrete">Brutalist Concrete</option>
              <option value="Modern Glass & Steel">Modern Glass & Steel</option>
            </select>
          </div>

          <div>
            <label className="text-white/70 block mb-1 font-bold">Lighting & Atmosphere</label>
            <select
              value={lighting}
              onChange={(e) => setLighting(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#111] border border-white/10 text-white"
            >
              <option value="Golden Hour Daylight">Golden Hour Daylight</option>
              <option value="Blue Hour Evening">Blue Hour Evening</option>
              <option value="Direct Midday Sun">Direct Midday Sun</option>
              <option value="Overcast Ambient Soft">Overcast Ambient Soft</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full h-14 rounded-2xl bg-sky-400 text-black font-bold font-mono text-sm hover:bg-sky-300 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            {isGenerating ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Raytracing 8K Render...</span>
              </div>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate Architectural Render</span>
              </>
            )}
          </button>
        </form>

        <div className="lg:col-span-2 p-6 rounded-3xl glass-panel border border-white/10 bg-[#07080d] flex flex-col justify-between min-h-[450px]">
          <div className="flex justify-between items-center text-white/50 mb-4">
            <span>RENDER VIEWPORT</span>
            <span>8K RESOLUTION</span>
          </div>

          <div className="relative flex-1 rounded-2xl border border-white/10 overflow-hidden bg-black flex items-center justify-center">
            {rendered ? (
              <div className="relative w-full h-full min-h-[360px] flex flex-col justify-end p-6 bg-cover bg-center" style={{ backgroundImage: "url('/images/villa1.png')" }}>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="relative z-10 space-y-1">
                  <div className="text-sky-300 font-bold text-sm">{viewType} — {style}</div>
                  <div className="text-white/60 text-xs">{lighting} • Raytraced Shader Core</div>
                </div>
              </div>
            ) : (
              <div className="text-center space-y-3 p-8">
                <ImageIcon className="w-12 h-12 text-white/20 mx-auto" />
                <div className="text-white/40 font-mono text-xs">Select parameters and click generate to view render.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
