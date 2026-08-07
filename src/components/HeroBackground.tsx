"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface HeroBackgroundProps {
  mouseX: number;
  mouseY: number;
}

export const HeroBackground: React.FC<HeroBackgroundProps> = ({ mouseX, mouseY }) => {
  // Parallax offsets (max 12px depth)
  const bgOffsetX = mouseX * -6;
  const bgOffsetY = mouseY * -6;
  const fgOffsetX = mouseX * 12;
  const fgOffsetY = mouseY * 12;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {/* Layer 1: Deep premium dark background #050505 */}
      <div className="absolute inset-0 bg-[#050505]" />

      {/* Layer 2: Large blurred architectural grid (Opacity 4%) */}
      <motion.div
        style={{
          x: bgOffsetX * 0.5,
          y: bgOffsetY * 0.5,
        }}
        className="absolute inset-[-10%] bg-architectural-grid opacity-[0.04] filter blur-[0.5px]"
      />

      {/* Layer 3: Very subtle animated blueprint lines (Opacity 3%) */}
      <motion.div
        style={{
          x: -bgOffsetX * 0.8,
          y: -bgOffsetY * 0.8,
        }}
        className="absolute inset-0 bg-architectural-grid-fine opacity-[0.03] animate-grid-lines"
      />

      {/* Layer 4: Tiny moving particles (Opacity 10%, slow random movement) */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-sky-300 animate-particle"
            style={{
              left: `${(i * 17) % 100}%`,
              top: `${(i * 23) % 100}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${8 + (i % 5) * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Layer 5: Floating glowing circles (Blur 80px, Opacity 8%, Ultra slow movement) */}
      <motion.div
        style={{ x: bgOffsetX, y: bgOffsetY }}
        className="absolute top-[-10%] left-[20%] w-[600px] h-[600px] rounded-full bg-sky-500/10 filter blur-[100px] opacity-[0.08] animate-float-1"
      />
      <motion.div
        style={{ x: -bgOffsetX, y: -bgOffsetY }}
        className="absolute bottom-[-10%] right-[15%] w-[700px] h-[700px] rounded-full bg-indigo-500/10 filter blur-[120px] opacity-[0.08] animate-float-2"
      />

      {/* Layer 6: Noise Texture (2% opacity) */}
      <div
        className="absolute inset-0 opacity-[0.02] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' h='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Layer 7: Light Rays (Subtle Top-Right & Bottom-Left) */}
      <div className="absolute top-0 right-0 w-[50vw] h-[60vh] bg-gradient-to-bl from-sky-400/5 via-transparent to-transparent opacity-60 filter blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[40vw] h-[50vh] bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent opacity-50 filter blur-3xl pointer-events-none" />

      {/* FLOATING BLUEPRINT SHEETS (Low Opacity, drifting gently) */}
      <motion.div
        animate={{
          rotate: [0, 2, 0, -2, 0],
          y: [0, -15, 0, 15, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
        style={{ x: fgOffsetX * 0.3, y: fgOffsetY * 0.3 }}
        className="absolute top-[15%] right-[5%] w-[380px] h-[260px] rounded-2xl border border-sky-400/10 bg-sky-950/10 backdrop-blur-[2px] opacity-[0.04] p-4 hidden lg:block"
      >
        <div className="w-full h-full border border-dashed border-sky-400/20 rounded-lg p-2 flex flex-col justify-between">
          <div className="flex justify-between font-mono text-[9px] text-sky-300">
            <span>DRAWING NO. A-104</span>
            <span>SCALE 1:50</span>
          </div>
          <div className="w-full h-32 bg-architectural-grid opacity-30 rounded border border-sky-400/10" />
          <div className="font-mono text-[8px] text-sky-400/60">RUHARC OS // STRUCTURAL GRID</div>
        </div>
      </motion.div>

      <motion.div
        animate={{
          rotate: [0, -3, 0, 3, 0],
          y: [0, 20, 0, -20, 0],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        style={{ x: -fgOffsetX * 0.2, y: -fgOffsetY * 0.2 }}
        className="absolute bottom-[20%] left-[3%] w-[320px] h-[220px] rounded-2xl border border-white/10 bg-white/5 backdrop-blur-[2px] opacity-[0.03] p-4 hidden lg:block"
      >
        <div className="w-full h-full border border-dashed border-white/20 rounded-lg p-3 font-mono text-[8px] text-white/40 flex flex-col justify-between">
          <div>ELEVATION ANALYSIS // AXIS X-Y</div>
          <div className="space-y-1">
            <div className="w-full h-1 bg-white/10 rounded" />
            <div className="w-3/4 h-1 bg-white/10 rounded" />
            <div className="w-1/2 h-1 bg-white/10 rounded" />
          </div>
          <div>ESTIMATED MASSING: 3,850 SQ FT</div>
        </div>
      </motion.div>

      {/* FLOATING ARCHITECTURAL ELEMENTS (Opacity below 5%) */}
      <div className="absolute top-[35%] left-[8%] opacity-[0.04] font-mono text-xs text-sky-300 pointer-events-none hidden md:block">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 border border-sky-400" />
          <span>AXIS 01-A | 50&apos;-0&quot;</span>
        </div>
        <div className="w-48 h-[1px] bg-sky-400/40 my-1" />
        <div className="text-[10px] opacity-70">BEARING CAP. 240 kN/m²</div>
      </div>

      <div className="absolute bottom-[15%] right-[10%] opacity-[0.04] font-mono text-xs text-white pointer-events-none hidden md:block">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-white" />
          <span>ROOFTOP GARDEN LEVEL (+24.5 FT)</span>
        </div>
        <div className="w-40 h-[1px] bg-white/40 my-1" />
        <div className="text-[10px] opacity-70">PERMEABLE PAVING: 42%</div>
      </div>
    </div>
  );
};
