"use client";

import React, { useState } from "react";
import { Wand2, ArrowRight, Sparkles } from "lucide-react";

export const PromptEnhancerDemo: React.FC = () => {
  const [enhanced, setEnhanced] = useState(false);

  return (
    <div className="relative w-full h-[220px] rounded-2xl border border-white/10 p-4 bg-[#080b0f] flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-sky-400 font-bold flex items-center gap-1">
          <Wand2 className="w-4 h-4" />
          PROMPT ENHANCER ENGINE
        </span>
        <button
          onClick={() => setEnhanced(!enhanced)}
          className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30 hover:bg-sky-400 hover:text-black transition-all cursor-pointer"
        >
          {enhanced ? "Reset Prompt" : "Enhance Now ✨"}
        </button>
      </div>

      <div className="space-y-2">
        <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs font-mono">
          <div className="text-[9px] text-white/40 uppercase mb-1">Simple Input:</div>
          <div className="text-white/80">&quot;Modern House&quot;</div>
        </div>

        <div
          className={`p-3 rounded-xl border transition-all duration-300 text-xs font-mono ${
            enhanced
              ? "bg-sky-500/10 border-sky-400/40 text-white"
              : "bg-white/[0.02] border-white/5 text-white/40"
          }`}
        >
          <div className="text-[9px] text-sky-400 uppercase mb-1 font-bold flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            Architectural Synthesis:
          </div>
          <div className="leading-relaxed">
            {enhanced
              ? "Design a luxury two-story Scandinavian residence optimized for natural lighting, cross ventilation, minimalist interiors, and sustainable materials on a 45×70 ft plot."
              : "Click 'Enhance Now' to expand simple prompts into structural specifications..."}
          </div>
        </div>
      </div>
    </div>
  );
};
