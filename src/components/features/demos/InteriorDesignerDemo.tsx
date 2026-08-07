"use client";

import React, { useState } from "react";
import { Sparkles, Palette, Layers } from "lucide-react";

export const InteriorDesignerDemo: React.FC = () => {
  const [sofaColor, setSofaColor] = useState<"beige" | "navy" | "charcoal">("beige");
  const [flooring, setFlooring] = useState<"oak" | "marble" | "concrete">("oak");

  const colors = {
    beige: { bg: "bg-[#d4c3b3]", label: "Warm Beige Fabric" },
    navy: { bg: "bg-[#1e293b]", label: "Royal Navy Velvet" },
    charcoal: { bg: "bg-[#27272a]", label: "Charcoal Leather" },
  };

  const floors = {
    oak: { label: "Natural Oak Wood Plank" },
    marble: { label: "Italian Carrara Marble" },
    concrete: { label: "Polished Architectural Concrete" },
  };

  return (
    <div className="relative w-full h-[220px] rounded-2xl border border-white/10 p-4 bg-[#09080d] flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-sky-400 font-bold flex items-center gap-1">
          <Sparkles className="w-4 h-4" />
          INTERIOR STYLING ENGINE
        </span>
        <span className="text-white/40">3D Preview</span>
      </div>

      {/* Room Style Card */}
      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col gap-2">
        <div className="flex justify-between text-xs font-mono">
          <span className="text-white/60">SOFA FABRIC:</span>
          <span className="text-sky-300 font-semibold">{colors[sofaColor].label}</span>
        </div>

        <div className="flex justify-between text-xs font-mono">
          <span className="text-white/60">FLOORING:</span>
          <span className="text-sky-300 font-semibold">{floors[flooring].label}</span>
        </div>
      </div>

      {/* Interactive Toggles */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-mono text-white/50">SOFA:</span>
          {(["beige", "navy", "charcoal"] as const).map((c) => (
            <button
              key={c}
              onClick={() => setSofaColor(c)}
              className={`w-6 h-6 rounded-full border transition-transform ${colors[c].bg} ${
                sofaColor === c ? "scale-110 border-sky-400 shadow-md" : "border-transparent"
              }`}
            />
          ))}
        </div>

        <div className="flex items-center gap-1 text-[10px] font-mono">
          {(["oak", "marble", "concrete"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFlooring(f)}
              className={`px-2 py-1 rounded border capitalize transition-colors ${
                flooring === f
                  ? "bg-sky-400 text-black border-sky-400 font-bold"
                  : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10"
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
