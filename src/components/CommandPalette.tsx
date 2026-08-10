"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  FolderKanban,
  FileText,
  Wand2,
  LayoutGrid,
  Command,
  ArrowRight,
  X,
  Compass,
  Building2,
  Ruler,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    { category: "AI Tools", title: "Launch Generative AI Architect", icon: Wand2, badge: "AI Studio", href: "/dashboard/architect" },
    { category: "AI Tools", title: "Interactive 2D Floor Plan Canvas", icon: Sparkles, badge: "Editor", href: "/dashboard/floorplans" },
    { category: "AI Tools", title: "3D Render & ArchViz Studio", icon: Ruler, badge: "Render Engine", href: "/dashboard/visualization" },
    { category: "Projects", title: "Browse Active Architectural Projects", icon: Building2, badge: "Projects", href: "/dashboard/projects" },
    { category: "Features", title: "30-Feature System Matrix", icon: LayoutGrid, badge: "Platform", href: "/features" },
    { category: "Solutions", title: "Architectural Workflows & Solutions", icon: Compass, badge: "Solutions", href: "/platform" },
    { category: "Billing", title: "Transparent Subscription Plans", icon: FileText, badge: "Pricing", href: "/pricing" },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href: string) => {
    onClose();
    router.push(href);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-2xl glass-panel border border-white/15 shadow-2xl overflow-hidden z-50 bg-[#07090e]/95 backdrop-blur-2xl font-mono text-xs"
          >
            <div className="flex items-center px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-sky-400 mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search tools, floor plans, projects, commands..."
                className="w-full bg-transparent text-white placeholder-white/40 text-sm font-sans focus:outline-none"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 scrollbar-thin">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-white/40 font-mono text-xs">
                  No matching architectural commands or projects found.
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelect(item.href)}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 text-left cursor-pointer ${
                        isSelected
                          ? "bg-sky-500/15 border border-sky-400/30 text-white"
                          : "text-white/80 hover:bg-white/5 border border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                            isSelected
                              ? "bg-sky-400 text-black"
                              : "bg-white/10 text-sky-400"
                          }`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex flex-col font-sans">
                          <span className="text-xs font-bold">{item.title}</span>
                          <span className="text-[10px] font-mono text-white/40">
                            {item.category}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 border border-white/10 text-white/60">
                          {item.badge}
                        </span>
                        <ArrowRight
                          className={`w-4 h-4 transition-transform ${
                            isSelected ? "text-sky-400 translate-x-1" : "text-white/20"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            <div className="px-4 py-3 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">↵</kbd> Select
                </span>
              </div>
              <div className="flex items-center gap-1 text-sky-400 font-bold">
                <Command className="w-3.5 h-3.5" />
                <span>RUHARC Command AI</span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
