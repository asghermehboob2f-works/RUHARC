"use client";

import React from "react";
import { motion } from "framer-motion";
import { Star, Cpu, ShieldCheck, Download, Award } from "lucide-react";

export const TrustRow: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-wrap items-center justify-center gap-3 sm:gap-[20px] max-w-4xl mx-auto"
    >
      {/* Rating Pill */}
      <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 text-xs sm:text-sm font-medium text-white/90">
        <div className="flex text-amber-400 gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
          ))}
        </div>
        <span className="text-white/60 font-mono">4.9/5.0</span>
      </div>

      {/* Trust Pill 1 */}
      <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 text-xs sm:text-sm font-medium text-white/80">
        <Award className="w-3.5 h-3.5 text-sky-400" />
        <span>Trusted by Architects</span>
      </div>

      {/* Trust Pill 2 */}
      <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 text-xs sm:text-sm font-medium text-white/80">
        <Cpu className="w-3.5 h-3.5 text-indigo-400" />
        <span>AI Powered OS</span>
      </div>

      {/* Trust Pill 3 */}
      <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 text-xs sm:text-sm font-medium text-white/80">
        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
        <span>Secure Platform</span>
      </div>

      {/* Trust Pill 4 */}
      <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-2 border border-white/10 text-xs sm:text-sm font-medium text-white/80">
        <Download className="w-3.5 h-3.5 text-purple-400" />
        <span>Export Ready</span>
      </div>
    </motion.div>
  );
};
