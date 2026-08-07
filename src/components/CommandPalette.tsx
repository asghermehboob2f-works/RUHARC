"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Sparkles,
  FolderKanban,
  FileText,
  Wand2,
  LayoutGrid,
  History,
  Command,
  ArrowRight,
  X,
  Compass,
  Building2,
  Ruler,
  FileCheck,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K and Esc
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(); // parent handles toggle
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const items = [
    { category: "AI Tools", title: "Generate Luxury Villa Concept", icon: Wand2, badge: "Engine 01" },
    { category: "AI Tools", title: "AI Architectural Editor (Modify Dimensions)", icon: Sparkles, badge: "Engine 02" },
    { category: "AI Tools", title: "Calculate Construction Cost & Materials", icon: Ruler, badge: "Engine 03" },
    { category: "Projects", title: "Modern Villa Project (50x80 ft)", icon: Building2, badge: "Active" },
    { category: "Projects", title: "Rooftop Garden Extension", icon: FolderKanban, badge: "Draft" },
    { category: "Templates", title: "Commercial Mixed-Use Complex", icon: LayoutGrid, badge: "Template" },
    { category: "Templates", title: "Minimalist Japanese Courtyard Villa", icon: Compass, badge: "Popular" },
    { category: "Documentation", title: "Structural Building Code Specs", icon: FileText, badge: "Guide" },
  ];

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 sm:px-6">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-2xl rounded-2xl glass-panel border border-white/15 shadow-2xl overflow-hidden z-50 bg-[#0c0c0e]/95"
          >
            {/* Search Bar Input */}
            <div className="flex items-center px-4 py-4 border-b border-white/10">
              <Search className="w-5 h-5 text-sky-400 mr-3 shrink-0" />
              <input
                type="text"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setSelectedIndex(0);
                }}
                placeholder="Search projects, templates, AI tools, commands..."
                className="w-full bg-transparent text-white placeholder-white/40 text-base font-normal focus:outline-none"
                autoFocus
              />
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Content List */}
            <div className="max-h-[380px] overflow-y-auto p-2 space-y-1 scrollbar-thin">
              {filteredItems.length === 0 ? (
                <div className="py-12 text-center text-white/40 font-mono text-sm">
                  No matching architectural commands or projects found.
                </div>
              ) : (
                filteredItems.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;
                  return (
                    <button
                      key={index}
                      onClick={onClose}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl transition-all duration-150 text-left ${
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
                        <div className="flex flex-col">
                          <span className="text-sm font-medium">{item.title}</span>
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
                            isSelected
                              ? "text-sky-400 translate-x-1"
                              : "text-white/20"
                          }`}
                        />
                      </div>
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer Commands Info */}
            <div className="px-4 py-3 bg-white/[0.02] border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-white/40">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">↑↓</kbd> Navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">↵</kbd> Select
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-white/80">ESC</kbd> Close
                </span>
              </div>
              <div className="flex items-center gap-1 text-sky-400">
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
