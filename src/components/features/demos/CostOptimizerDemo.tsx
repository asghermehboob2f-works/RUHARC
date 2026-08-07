"use client";

import React, { useState } from "react";
import { TrendingDown, Sparkles } from "lucide-react";

export const CostOptimizerDemo: React.FC = () => {
  const [tier, setTier] = useState<"basic" | "premium" | "luxury">("premium");

  const tierData = {
    basic: { cost: "₹58 Lakhs", orig: "₹65 Lakhs", save: "₹7 Lakhs", materials: "Standard AAC Blocks & Ceramic Tiles" },
    premium: { cost: "₹74 Lakhs", orig: "₹82 Lakhs", save: "₹8 Lakhs", materials: "Porcelain Tiles, Double Glazed Windows" },
    luxury: { cost: "₹1.15 Cr", orig: "₹1.28 Cr", save: "₹13 Lakhs", materials: "Italian Marble, Smart Solar Roofing" },
  };

  const active = tierData[tier];

  return (
    <div className="relative w-full h-[220px] rounded-2xl border border-white/10 p-4 bg-[#090b0e] flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-emerald-400 font-bold flex items-center gap-1">
          <TrendingDown className="w-4 h-4" />
          AI SAVINGS ENGINE
        </span>
        <span className="text-white/50">Lakhs (INR)</span>
      </div>

      {/* Live Cost Graph Comparison */}
      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-white/50">ORIGINAL ESTIMATE</span>
          <span className="text-sm font-mono line-through text-white/40">{active.orig}</span>
        </div>

        <div className="flex flex-col text-right">
          <span className="text-[10px] font-mono text-emerald-400 font-bold">OPTIMIZED ESTIMATE</span>
          <span className="text-xl font-bold font-mono text-white">{active.cost}</span>
        </div>

        <div className="px-2.5 py-1 rounded-lg bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-mono font-bold">
          Save {active.save}
        </div>
      </div>

      {/* Tier Selector Buttons */}
      <div className="grid grid-cols-3 gap-2">
        {(["basic", "premium", "luxury"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTier(t)}
            className={`py-1.5 rounded-lg text-xs font-mono uppercase font-bold transition-all ${
              tier === t
                ? "bg-sky-400 text-black shadow-md"
                : "bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>
    </div>
  );
};
