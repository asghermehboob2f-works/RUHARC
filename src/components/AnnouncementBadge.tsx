"use client";

import React from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

export const AnnouncementBadge: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="flex justify-center mb-8"
    >
      <a
        href="#demo"
        className="group relative inline-flex items-center gap-3 rounded-full border border-white/[0.08] bg-white/[0.04] px-7 py-3.5 shadow-xl backdrop-blur-[24px] transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:shadow-2xl hover:shadow-sky-500/10 cursor-pointer"
      >
        <span className="flex items-center justify-center text-sky-400">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </span>

        <span className="font-medium text-xs sm:text-sm text-white/90 tracking-wide">
          Introducing RUHARC AI Architecture OS
        </span>

        <span className="flex items-center text-white/40 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
          <ArrowRight className="w-3.5 h-3.5" />
        </span>

        {/* Ambient subtle glow */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-sky-500/0 via-sky-400/10 to-indigo-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </a>
    </motion.div>
  );
};
