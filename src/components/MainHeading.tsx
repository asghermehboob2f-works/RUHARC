"use client";

import React from "react";
import { motion } from "framer-motion";

export const MainHeading: React.FC = () => {
  const words = [
    { text: "Design.", isGradient: false },
    { text: "Plan.", isGradient: false },
    { text: "Build.", isGradient: false },
    { text: "With", isGradient: false },
    { text: "Intelligence.", isGradient: true },
  ];

  return (
    <h1 className="max-w-[980px] mx-auto font-extrabold text-[42px] sm:text-[54px] md:text-[64px] lg:text-[72px] leading-[1.1] tracking-[-2px] text-center text-white mb-6 flex flex-wrap justify-center items-center gap-x-3 sm:gap-x-4 gap-y-1">
      {words.map((word, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.8,
            delay: 0.1 * (idx + 1),
            ease: [0.16, 1, 0.3, 1],
          }}
          className={
            word.isGradient
              ? "animate-text-gradient inline-block font-extrabold drop-shadow-[0_0_35px_rgba(56,189,248,0.2)]"
              : "inline-block text-white"
          }
        >
          {word.text}
        </motion.span>
      ))}
    </h1>
  );
};
