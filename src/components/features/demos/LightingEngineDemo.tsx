"use client";

import React, { useState } from "react";
import { Sun, Moon, Sunset, SunMedium } from "lucide-react";

export const LightingEngineDemo: React.FC = () => {
  const [timeHour, setTimeHour] = useState(14); // 8: Morning, 14: Afternoon, 18: Evening, 22: Night

  const getTimeDetails = () => {
    if (timeHour < 11) return { label: "Morning Sun (8:00 AM)", shadow: "shadow-amber-500/20", filter: "sepia(20%) brightness(1.05)", icon: Sun };
    if (timeHour < 17) return { label: "Midday Afternoon (2:00 PM)", shadow: "shadow-sky-500/20", filter: "brightness(1.1)", icon: SunMedium };
    if (timeHour < 20) return { label: "Golden Hour Evening (6:30 PM)", shadow: "shadow-orange-500/30", filter: "hue-rotate(-20deg) brightness(0.95)", icon: Sunset };
    return { label: "Artificial Night Lighting (10:00 PM)", shadow: "shadow-indigo-500/40", filter: "brightness(0.7) contrast(1.2)", icon: Moon };
  };

  const current = getTimeDetails();
  const Icon = current.icon;

  return (
    <div className="relative w-full h-[220px] rounded-2xl border border-white/10 overflow-hidden flex flex-col justify-between p-4 bg-[#09090c]">
      {/* Villa Image with Dynamic Filter Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="/images/villa1.png"
          alt="Villa Lighting"
          className="w-full h-full object-cover transition-all duration-500"
          style={{ filter: current.filter }}
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Top Header Tag */}
      <div className="relative z-10 flex items-center justify-between">
        <div className="glass-pill px-3 py-1 rounded-full border border-white/20 text-[11px] font-mono text-white flex items-center gap-1.5 backdrop-blur-md">
          <Icon className="w-3.5 h-3.5 text-amber-400" />
          <span>{current.label}</span>
        </div>
      </div>

      {/* Bottom Time Slider Control */}
      <div className="relative z-10 glass-panel p-3 rounded-xl border border-white/15 backdrop-blur-md flex flex-col gap-2">
        <div className="flex justify-between text-[10px] font-mono text-white/70">
          <span>Morning</span>
          <span>Afternoon</span>
          <span>Evening</span>
          <span>Night</span>
        </div>
        <input
          type="range"
          min="8"
          max="22"
          step="2"
          value={timeHour}
          onChange={(e) => setTimeHour(Number(e.target.value))}
          className="w-full accent-sky-400 cursor-pointer h-1.5 bg-white/20 rounded-lg"
        />
      </div>
    </div>
  );
};
