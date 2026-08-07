"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Grid,
  Layers,
  Sliders,
  Sparkles,
  Eye,
  Lock,
  ChevronDown,
  RotateCcw,
  RotateCw,
  Share2,
  Download,
  ZoomIn,
  ZoomOut,
  Maximize2,
  CheckCircle2,
  Send,
  Wand2,
  Split,
  Plus,
} from "lucide-react";

export default function AIArchitectWorkspacePage() {
  const [canvasMode, setCanvasMode] = useState<"blueprint" | "3d" | "wireframe" | "presentation">("blueprint");
  const [zoomLevel, setZoomLevel] = useState(100);
  const [compareMode, setCompareMode] = useState(false);

  // Active room properties
  const [roomName, setRoomName] = useState("Master Bedroom");
  const [width, setWidth] = useState(16);
  const [length, setLength] = useState(18);
  const [wallMaterial, setWallMaterial] = useState("AAC Lightweight Blocks");
  const [floorMaterial, setFloorMaterial] = useState("Engineered Natural Oak");

  // Layers tree state
  const [layers, setLayers] = useState([
    { name: "Ground Floor Layout", visible: true, locked: false },
    { name: "First Floor Plan", visible: true, locked: false },
    { name: "Roof & Solar Array", visible: true, locked: true },
    { name: "Landscape & Garden", visible: true, locked: false },
    { name: "Furniture Schedule", visible: true, locked: false },
    { name: "Dimension Grid", visible: true, locked: true },
  ]);

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col font-mono -m-6 sm:-m-10">
      {/* WORKSPACE SUB-TOPBAR */}
      <div className="h-14 bg-[#090b10] border-b border-white/10 px-6 flex items-center justify-between text-xs shrink-0">
        <div className="flex items-center gap-4">
          <span className="font-bold text-white text-sm">Luxury Modern Villa v5.0</span>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
            <CheckCircle2 className="w-3 h-3 text-emerald-400" /> Saved & Synced
          </div>
        </div>

        {/* Canvas Mode Toggles */}
        <div className="flex items-center gap-1 glass-panel p-1 rounded-xl border border-white/10">
          {(["blueprint", "3d", "wireframe", "presentation"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setCanvasMode(mode)}
              className={`px-3 py-1 rounded-lg text-[10px] uppercase font-bold transition-all capitalize cursor-pointer ${
                canvasMode === mode ? "bg-sky-400 text-black shadow" : "text-white/60 hover:text-white"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>

        {/* Compare Mode & Action Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCompareMode(!compareMode)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 cursor-pointer ${
              compareMode ? "bg-sky-500/20 border-sky-400 text-sky-300" : "bg-white/5 border-white/10 text-white/70"
            }`}
          >
            <Split className="w-3.5 h-3.5" />
            {compareMode ? "Exit Compare Mode" : "Compare Versions"}
          </button>

          <button className="px-3 py-1.5 rounded-xl bg-sky-400 text-black font-bold flex items-center gap-1 cursor-pointer">
            <Download className="w-3.5 h-3.5" /> Export CAD
          </button>
        </div>
      </div>

      {/* 3 PANEL WORKSPACE AREA */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT LAYERS PANEL */}
        <div className="w-64 bg-[#07080c] border-r border-white/10 p-4 flex flex-col justify-between shrink-0">
          <div className="space-y-4">
            <div className="flex items-center justify-between text-xs text-sky-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Layers className="w-4 h-4" /> LAYERS PANEL
              </span>
              <button className="p-1 rounded hover:bg-white/10"><Plus className="w-3.5 h-3.5" /></button>
            </div>

            <div className="space-y-1.5 text-xs">
              {layers.map((layer, idx) => (
                <div
                  key={idx}
                  className="p-2.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between hover:border-sky-400/30 transition-colors"
                >
                  <span className="text-white/80 truncate text-[11px]">{layer.name}</span>
                  <div className="flex items-center gap-1 text-white/40">
                    <Eye className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                    <Lock className="w-3.5 h-3.5 hover:text-white cursor-pointer" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CENTER INFINITE DESIGN CANVAS */}
        <div className="flex-1 bg-[#04060a] relative overflow-hidden flex items-center justify-center p-6">
          {/* Blueprint Grid Overlay */}
          <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none" />

          {/* Render or Blueprint Simulation View */}
          {!compareMode ? (
            <div
              className="relative border-2 border-sky-400/50 rounded-2xl p-6 glass-panel transition-all duration-300 max-w-2xl w-full h-[400px] flex flex-col justify-between"
              style={{ transform: `scale(${zoomLevel / 100})` }}
            >
              {canvasMode === "3d" ? (
                <img src="/images/villa1.png" alt="3D Villa Canvas" className="w-full h-full object-cover rounded-xl" />
              ) : (
                <div className="space-y-4 h-full flex flex-col justify-between">
                  <div className="flex justify-between text-xs text-sky-300 font-bold border-b border-sky-400/30 pb-2">
                    <span>CANVAS: GROUND FLOOR PLAN</span>
                    <span>SCALE 1:50</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 flex-1">
                    <div className="border border-sky-400/40 rounded-xl p-3 flex flex-col justify-between bg-sky-500/5">
                      <span className="font-bold text-white text-xs">{roomName}</span>
                      <span className="text-sky-300 text-xs">{width} × {length} FT ({width * length} SQ.FT)</span>
                    </div>

                    <div className="border border-sky-400/40 rounded-xl p-3 flex flex-col justify-between bg-sky-500/5">
                      <span className="font-bold text-white text-xs">OPEN KITCHEN</span>
                      <span className="text-sky-300 text-xs">14 × 12 FT (168 SQ.FT)</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Split-Screen Compare Mode */
            <div className="grid grid-cols-2 gap-4 w-full h-full p-4">
              <div className="border border-white/20 rounded-2xl p-4 glass-panel flex flex-col justify-between">
                <span className="text-xs text-rose-400 font-bold">PREVIOUS VERSION (v4.0)</span>
                <div className="text-xs space-y-1 text-white/60">
                  <div>• Living Room: 18 × 20 FT</div>
                  <div>• Roof: Concrete Deck</div>
                </div>
              </div>

              <div className="border border-sky-400/50 rounded-2xl p-4 glass-panel flex flex-col justify-between bg-sky-500/10">
                <span className="text-xs text-emerald-400 font-bold">CURRENT ACTIVE VERSION (v5.0)</span>
                <div className="text-xs space-y-1 text-white">
                  <div>✓ Living Room: 22 × 20 FT (Expanded)</div>
                  <div>✓ Roof: Scandinavian Rooftop Garden</div>
                </div>
              </div>
            </div>
          )}

          {/* Zoom Controls */}
          <div className="absolute bottom-4 right-4 flex items-center gap-2 glass-pill px-3 py-1.5 rounded-xl border border-white/10 text-xs">
            <button onClick={() => setZoomLevel(Math.max(50, zoomLevel - 10))}><ZoomOut className="w-4 h-4 text-white/70" /></button>
            <span className="w-12 text-center text-sky-400 font-bold">{zoomLevel}%</span>
            <button onClick={() => setZoomLevel(Math.min(200, zoomLevel + 10))}><ZoomIn className="w-4 h-4 text-white/70" /></button>
          </div>
        </div>

        {/* RIGHT CONTEXTUAL PROPERTIES PANEL */}
        <div className="w-72 bg-[#07080c] border-l border-white/10 p-4 flex flex-col justify-between shrink-0 space-y-4">
          <div className="space-y-4 text-xs">
            <div className="text-sky-400 font-bold flex items-center gap-1.5 border-b border-white/10 pb-2">
              <Sliders className="w-4 h-4" /> ROOM PROPERTIES
            </div>

            <div className="space-y-3">
              <div>
                <label className="text-white/50 block mb-1">Selected Room</label>
                <input
                  type="text"
                  value={roomName}
                  onChange={(e) => setRoomName(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white font-bold"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-white/50 block mb-1">Width (ft)</label>
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white font-bold"
                  />
                </div>
                <div>
                  <label className="text-white/50 block mb-1">Length (ft)</label>
                  <input
                    type="number"
                    value={length}
                    onChange={(e) => setLength(Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="text-white/50 block mb-1">Wall Specification</label>
                <input
                  type="text"
                  value={wallMaterial}
                  onChange={(e) => setWallMaterial(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-[11px]"
                />
              </div>

              <div>
                <label className="text-white/50 block mb-1">Flooring Finish</label>
                <input
                  type="text"
                  value={floorMaterial}
                  onChange={(e) => setFloorMaterial(e.target.value)}
                  className="w-full h-9 px-3 rounded-lg bg-white/5 border border-white/10 text-white text-[11px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
