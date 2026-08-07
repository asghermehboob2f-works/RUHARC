"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  User,
  FolderKanban,
  LayoutGrid,
  CreditCard,
  KeyRound,
  Settings,
  HelpCircle,
  LogOut,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface ProfileMenuProps {
  onClose: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ onClose }) => {
  const menuItems = [
    { label: "My Projects", icon: FolderKanban, href: "#projects" },
    { label: "Workspace Studio", icon: LayoutGrid, href: "#workspace" },
    { label: "Billing & Credits", icon: CreditCard, href: "#billing" },
    { label: "API Keys", icon: KeyRound, href: "#api" },
    { label: "Settings", icon: Settings, href: "#settings" },
    { label: "Support & Help", icon: HelpCircle, href: "#support" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full right-0 mt-3 w-72 rounded-2xl glass-panel p-3 shadow-2xl border border-white/10 z-50 bg-[#0c0c0e]/95"
    >
      {/* Profile Info Header */}
      <div className="flex items-center gap-3 p-3 bg-white/[0.04] rounded-xl border border-white/[0.08] mb-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 p-[2px] shadow-lg">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-white text-sm">
            AR
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-semibold text-white">Alex Rivera</span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              Pro Architect
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-1">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <a
              key={idx}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors group"
            >
              <Icon className="w-4 h-4 text-white/50 group-hover:text-sky-400 transition-colors" />
              <span>{item.label}</span>
            </a>
          );
        })}
      </div>

      {/* Logout button */}
      <div className="pt-2 mt-2 border-t border-white/10">
        <button
          onClick={onClose}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Log Out</span>
        </button>
      </div>
    </motion.div>
  );
};
