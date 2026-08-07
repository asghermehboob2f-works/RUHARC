"use client";

import React from "react";
import { motion } from "framer-motion";

export const HeroDescription: React.FC = () => {
  return (
    <motion.p
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="max-w-[760px] mx-auto font-normal text-base sm:text-lg md:text-[22px] text-center text-white/72 leading-relaxed mb-10 tracking-normal"
    >
      Create architectural designs, editable floor plans, construction-ready reports, intelligent dimensions, material estimates, and immersive visualizations—all powered by a next-generation AI Architecture Operating System.
    </motion.p>
  );
};
