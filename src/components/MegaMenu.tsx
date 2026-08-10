"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Home,
  Building2,
  Sofa,
  Trees,
  Factory,
  Hotel,
  GraduationCap,
  Landmark,
  ArrowRight,
  Sparkles,
} from "lucide-react";

interface MegaMenuProps {
  onClose?: () => void;
}

export const MegaMenu: React.FC<MegaMenuProps> = ({ onClose }) => {
  const solutions = [
    {
      title: "Residential Architecture",
      desc: "Luxury villas, modern homes, duplexes, and apartments.",
      icon: Home,
      action: "Explore Residential",
      href: "/generative-design",
    },
    {
      title: "Commercial & Office",
      desc: "High-rise towers, office spaces, retail malls, and plazas.",
      icon: Building2,
      action: "Explore Commercial",
      href: "/platform",
    },
    {
      title: "Interior Architecture",
      desc: "Spatial layout, furniture placement, and material styling.",
      icon: Sofa,
      action: "Explore Interior",
      href: "/dashboard/visualization",
    },
    {
      title: "Landscape & Outdoor",
      desc: "Gardens, swimming pools, terraces, and urban green spaces.",
      icon: Trees,
      action: "Explore Landscape",
      href: "/dashboard/floorplans",
    },
    {
      title: "Industrial Design",
      desc: "Warehouses, factories, logistics hubs, and processing units.",
      icon: Factory,
      action: "Explore Industrial",
      href: "/features",
    },
    {
      title: "Hospitality & Resort",
      desc: "Boutique hotels, luxury resorts, restaurants, and lounges.",
      icon: Hotel,
      action: "Explore Hospitality",
      href: "/platform",
    },
    {
      title: "Educational Campuses",
      desc: "Schools, universities, research centers, and libraries.",
      icon: GraduationCap,
      action: "Explore Education",
      href: "/resources",
    },
    {
      title: "Public Infrastructure",
      desc: "Civic centers, museums, transit stations, and master plans.",
      icon: Landmark,
      action: "Explore Civic",
      href: "/about",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.98 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[840px] rounded-3xl glass-panel p-6 shadow-2xl border border-white/15 z-50 bg-[#07090e]/95 backdrop-blur-2xl"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold font-mono uppercase tracking-wider text-white/90">
            Architectural Solutions Engine
          </span>
        </div>
        <span className="text-[11px] font-mono text-sky-400">
          ● Generative Spatial Graph v1.0
        </span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {solutions.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              onClick={onClose}
              className="group p-3.5 rounded-2xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] hover:border-sky-400/30 transition-all duration-200 hover:-translate-y-0.5 flex items-start gap-3.5"
            >
              <div className="w-10 h-10 rounded-xl bg-sky-500/10 border border-sky-400/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-400 group-hover:text-black transition-all duration-300 shrink-0">
                <Icon className="w-5 h-5" />
              </div>

              <div className="flex flex-col">
                <span className="text-sm font-semibold text-white group-hover:text-sky-300 transition-colors flex items-center gap-1">
                  {item.title}
                </span>
                <span className="text-xs text-white/60 line-clamp-2 mt-0.5 leading-relaxed font-sans">
                  {item.desc}
                </span>
                <span className="text-[11px] font-mono text-sky-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 mt-2 opacity-80 group-hover:opacity-100">
                  {item.action}
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </motion.div>
  );
};
