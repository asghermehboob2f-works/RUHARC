"use client";

import React, { useState } from "react";
import { ZoomIn, ZoomOut, Eye, Layers, SunMedium, Play } from "lucide-react";

export const FloorPlanDemo: React.FC = () => {
  const [blueprintMode, setBlueprintMode] = useState(true);
  const [showDimensions, setShowDimensions] = useState(true);
  const [isDrawing, setIsDrawing] = useState(false);

  return (
    <div
      className={`relative w-full h-[220px] rounded-2xl border transition-all duration-500 overflow-hidden flex flex-col justify-between p-4 ${
        blueprintMode
          ? "bg-[#041226] border-sky-500/30 text-sky-300"
          : "bg-[#0f0f12] border-white/10 text-white"
      }`}
    >
      {/* Blueprint Grid Overlay */}
      <div
        className="absolute inset-0 opacity-20 pointer-events-none"
        style={{
          backgroundImage: blueprintMode
            ? "radial-gradient(#38bdf8 1px, transparent 1px)"
            : "radial-gradient(#ffffff 1px, transparent 1px)",
          backgroundSize: "16px 16px",
        }}
      />

      {/* Control Bar */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setBlueprintMode(!blueprintMode)}
            className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-[10px] font-mono hover:bg-white/20 transition-colors flex items-center gap-1"
          >
            <Layers className="w-3 h-3" />
            {blueprintMode ? "Blueprint Mode" : "Standard Mode"}
          </button>
          <button
            onClick={() => setShowDimensions(!showDimensions)}
            className="px-2.5 py-1 rounded-lg bg-white/10 border border-white/10 text-[10px] font-mono hover:bg-white/20 transition-colors flex items-center gap-1"
          >
            <Eye className="w-3 h-3" />
            {showDimensions ? "Dimensions ON" : "Dimensions OFF"}
          </button>
        </div>

        <button
          onClick={() => {
            setIsDrawing(true);
            setTimeout(() => setIsDrawing(false), 2000);
          }}
          className="px-2.5 py-1 rounded-lg bg-sky-500 text-black font-semibold text-[10px] font-mono hover:bg-sky-400 transition-colors flex items-center gap-1"
        >
          <Play className="w-3 h-3 fill-black" />
          {isDrawing ? "Drawing..." : "Draw Blueprint"}
        </button>
      </div>

      {/* Vector Blueprint Graphics Simulation */}
      <div className="relative z-10 my-auto flex items-center justify-center">
        <div className="relative w-full max-w-[280px] h-[120px] border-2 border-sky-400/80 rounded-lg p-2 flex flex-col justify-between">
          {/* Animated Drawing Overlay Line */}
          {isDrawing && (
            <div className="absolute inset-0 bg-sky-400/20 animate-pulse border-2 border-sky-300 rounded-lg" />
          )}

          {/* Master Bedroom & Living Area Dividers */}
          <div className="flex justify-between h-full gap-2">
            <div className="w-1/2 h-full border-r-2 border-sky-400/80 p-1 flex flex-col justify-between">
              <span className="text-[10px] font-mono font-bold">MASTER BEDROOM</span>
              {showDimensions && (
                <span className="text-[9px] font-mono text-sky-400/70">16&apos;0&quot; × 18&apos;0&quot;</span>
              )}
            </div>
            <div className="w-1/2 h-full p-1 flex flex-col justify-between text-right">
              <span className="text-[10px] font-mono font-bold">LIVING & DINING</span>
              {showDimensions && (
                <span className="text-[9px] font-mono text-sky-400/70">22&apos;0&quot; × 26&apos;0&quot;</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div className="relative z-10 flex items-center justify-between text-[10px] font-mono text-white/50">
        <span>PLOT: 60×80 FT</span>
        <span>VASTU VALIDATED ✓</span>
      </div>
    </div>
  );
};
