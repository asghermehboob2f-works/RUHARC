"use client";

import React, { useState } from "react";
import { AlertTriangle, CheckCircle2, Wand2 } from "lucide-react";

export const DimensionValidatorDemo: React.FC = () => {
  const [fixed, setFixed] = useState(false);

  return (
    <div className="relative w-full h-[220px] rounded-2xl border border-white/10 p-4 bg-[#0d0909] flex flex-col justify-between overflow-hidden">
      {/* Top Status Badge */}
      <div className="flex items-center justify-between">
        <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400">
          AI SAFETY CHECK
        </span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white/60">
          CODE V3.4
        </span>
      </div>

      {/* Warning Box or Fixed Success State */}
      <div
        className={`p-4 rounded-xl border transition-all duration-300 ${
          fixed
            ? "bg-emerald-500/10 border-emerald-400/30 text-emerald-300"
            : "bg-amber-500/10 border-amber-400/30 text-amber-300"
        }`}
      >
        <div className="flex items-start gap-3">
          {fixed ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5 animate-pulse" />
          )}

          <div className="flex flex-col">
            <span className="text-xs font-bold font-mono">
              {fixed
                ? "VALIDATED: Kitchen width updated to 10 ft standard."
                : "⚠ Kitchen width below recommended building code standard."}
            </span>

            <div className="flex items-center gap-4 text-[11px] font-mono mt-2 text-white/70">
              <span>Current: {fixed ? "10 ft" : "7 ft"}</span>
              <span>Recommended: 10 ft</span>
            </div>
          </div>
        </div>
      </div>

      {/* Fix Automatically Action */}
      <button
        onClick={() => setFixed(!fixed)}
        className={`w-full py-2.5 rounded-xl font-mono text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
          fixed
            ? "bg-white/10 text-white hover:bg-white/20 border border-white/10"
            : "bg-amber-400 text-black hover:bg-amber-300 shadow-lg shadow-amber-400/20"
        }`}
      >
        <Wand2 className="w-4 h-4" />
        {fixed ? "Reset Simulation" : "Fix Automatically [YES]"}
      </button>
    </div>
  );
};
