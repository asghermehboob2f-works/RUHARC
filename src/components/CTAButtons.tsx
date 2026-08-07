"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { PlayCircle, ArrowRight, Loader2, Sparkles } from "lucide-react";

interface CTAButtonsProps {
  onWatchDemo?: () => void;
  onStartDesigning?: () => void;
}

export const CTAButtons: React.FC<CTAButtonsProps> = ({ onWatchDemo, onStartDesigning }) => {
  const [loading, setLoading] = useState(false);

  const handlePrimaryClick = () => {
    setLoading(true);
    if (onStartDesigning) onStartDesigning();
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="flex flex-col sm:flex-row items-center justify-center gap-[18px] mb-12 w-full sm:w-auto"
    >
      {/* Primary Button */}
      <button
        onClick={handlePrimaryClick}
        disabled={loading}
        className="w-full sm:w-auto group relative flex items-center justify-center gap-3 rounded-[18px] bg-white text-black font-semibold text-base px-[36px] py-[18px] transition-all duration-250 hover:bg-slate-100 hover:scale-[1.03] active:scale-[0.97] shadow-2xl shadow-white/20 cursor-pointer disabled:opacity-80"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin text-black" />
            <span>Initializing AI OS...</span>
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4 text-sky-600 fill-sky-500/20" />
            <span>Start Designing</span>
            <ArrowRight className="w-4 h-4 text-black group-hover:translate-x-1 transition-transform duration-200" />
          </>
        )}
      </button>

      {/* Secondary Button */}
      <button
        onClick={onWatchDemo}
        className="w-full sm:w-auto group flex items-center justify-center gap-3 rounded-[18px] border border-white/10 bg-white/[0.05] backdrop-blur-xl font-medium text-base text-white px-[36px] py-[18px] transition-all duration-250 hover:bg-white/[0.10] hover:border-white/20 hover:scale-[1.03] active:scale-[0.97] shadow-lg cursor-pointer"
      >
        <PlayCircle className="w-5 h-5 text-sky-400 group-hover:translate-x-1 transition-transform duration-200" />
        <span>Watch Demo</span>
      </button>
    </motion.div>
  );
};
