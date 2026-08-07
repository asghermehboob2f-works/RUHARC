"use client";

import React, { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  title: string;
  category?: string;
  tag?: string;
  description: string;
  icon: LucideIcon;
  isLarge?: boolean;
  children?: React.ReactNode;
  ctaText?: string;
  onCtaClick?: () => void;
  delay?: number;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  category,
  tag,
  description,
  icon: Icon,
  isLarge = false,
  children,
  ctaText = "Learn More →",
  onCtaClick,
  delay = 0,
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: false, amount: 0.15 });

  // 3D Tilt effect on mouse move
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const rX = ((mouseY - height / 2) / (height / 2)) * -3; // max 3°
    const rY = ((mouseX - width / 2) / (width / 2)) * 3;

    setRotateX(rX);
    setRotateY(rY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
      animate={
        isInView
          ? { opacity: 1, y: 0, filter: "blur(0px)" }
          : { opacity: 0, y: 40, filter: "blur(10px)" }
      }
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`group relative glass-panel rounded-[28px] border border-white/10 p-8 sm:p-10 flex flex-col justify-between overflow-hidden transition-all duration-300 hover:border-sky-400/40 hover:scale-[1.02] hover:shadow-2xl hover:shadow-sky-500/10 ${
        isLarge ? "lg:col-span-2 min-h-[560px]" : "col-span-1 min-h-[520px]"
      }`}
    >
      {/* Background Subtle Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-sky-500/5 via-transparent to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Top Header Row */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-400 group-hover:text-black group-hover:rotate-6 transition-all duration-300">
            <Icon className="w-6 h-6" />
          </div>

          <div className="flex items-center gap-2">
            {category && (
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-white/50">
                {category}
              </span>
            )}
            {tag && (
              <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-full bg-sky-500/20 text-sky-400 border border-sky-400/30">
                {tag}
              </span>
            )}
          </div>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-sky-300 transition-colors">
          {title}
        </h3>

        <p className="text-sm text-white/70 font-normal leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Center Interactive Sub-Demo Content */}
      {children && (
        <div className="relative my-4 w-full flex-1 flex flex-col justify-center">
          {children}
        </div>
      )}

      {/* Bottom CTA Link */}
      <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs font-mono">
        <button
          onClick={onCtaClick}
          className="text-sky-400 group-hover:text-white flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <span>{ctaText}</span>
        </button>
        <span className="text-white/30 font-mono text-[10px]">RUHARC OS</span>
      </div>
    </motion.div>
  );
};
