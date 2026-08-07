"use client";

import React from "react";
import { MousePointer2, MessageSquare, CheckCircle2 } from "lucide-react";

export const CollaborationDemo: React.FC = () => {
  return (
    <div className="relative w-full h-[220px] rounded-2xl border border-white/10 p-4 bg-[#070b12] flex flex-col justify-between overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-sky-400 font-bold flex items-center gap-1">
          REAL-TIME TEAM MULTIPLAYER
        </span>
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-white/60">4 Active Now</span>
        </div>
      </div>

      {/* Canvas Simulation with Floating Multiplayer Cursors */}
      <div className="relative w-full h-[120px] rounded-xl border border-white/10 bg-white/[0.02] p-3 overflow-hidden flex items-center justify-between">
        {/* Architect Cursor */}
        <div className="absolute top-3 left-6 flex items-center gap-1 animate-bounce">
          <MousePointer2 className="w-4 h-4 text-sky-400 fill-sky-400" />
          <span className="px-2 py-0.5 rounded bg-sky-500 text-black text-[9px] font-mono font-bold shadow">
            Sarah (Lead Architect)
          </span>
        </div>

        {/* Structural Engineer Cursor */}
        <div className="absolute bottom-4 right-10 flex items-center gap-1">
          <MousePointer2 className="w-4 h-4 text-indigo-400 fill-indigo-400" />
          <span className="px-2 py-0.5 rounded bg-indigo-500 text-white text-[9px] font-mono font-bold shadow">
            Marcus (Structural Eng.)
          </span>
        </div>

        {/* Client Comment Bubble */}
        <div className="absolute bottom-2 left-8 p-2 rounded-lg bg-amber-500/20 border border-amber-400/30 text-amber-200 text-[10px] font-mono flex items-center gap-1.5">
          <MessageSquare className="w-3 h-3 text-amber-400" />
          <span>Client: &quot;Approved balcony extension!&quot;</span>
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
        <span>ROLE PERMISSIONS: EDITABLE</span>
        <span className="text-emerald-400 flex items-center gap-1">
          <CheckCircle2 className="w-3 h-3" /> SYNCHRONIZED
        </span>
      </div>
    </div>
  );
};
