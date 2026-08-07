"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bell, CheckCircle2, Download, CreditCard, MessageSquare, Sparkles, X } from "lucide-react";

interface NotificationCenterProps {
  onClose: () => void;
}

export const NotificationCenter: React.FC<NotificationCenterProps> = ({ onClose }) => {
  const notifications = [
    {
      id: "1",
      title: "AI Generation Complete",
      desc: "Modern Villa 8K Renders & DXF floor plans generated.",
      time: "2 mins ago",
      icon: Sparkles,
      iconColor: "text-sky-400 bg-sky-500/10 border-sky-400/20",
    },
    {
      id: "2",
      title: "Export Ready",
      desc: "Structural PDF Report & Construction Estimates compiled.",
      time: "15 mins ago",
      icon: Download,
      iconColor: "text-emerald-400 bg-emerald-500/10 border-emerald-400/20",
    },
    {
      id: "3",
      title: "Credits Refreshed",
      desc: "Your Pro Architect Monthly 5,000 AI Credits added.",
      time: "1 hour ago",
      icon: CreditCard,
      iconColor: "text-amber-400 bg-amber-500/10 border-amber-400/20",
    },
    {
      id: "4",
      title: "Team Comment",
      desc: "Lead Architect requested a +3ft balcony revision.",
      time: "3 hours ago",
      icon: MessageSquare,
      iconColor: "text-indigo-400 bg-indigo-500/10 border-indigo-400/20",
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full right-0 mt-3 w-80 sm:w-96 rounded-2xl glass-panel p-4 shadow-2xl border border-white/10 z-50 bg-[#0c0c0e]/95"
    >
      <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-sky-400" />
          <span className="text-xs font-bold uppercase tracking-wider text-white">
            Notifications
          </span>
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-sky-500/20 text-sky-400">
            4 New
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-white/40 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-thin">
        {notifications.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              className="p-3 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.06] transition-all flex items-start gap-3 cursor-pointer group"
            >
              <div
                className={`w-8 h-8 rounded-lg border flex items-center justify-center shrink-0 ${item.iconColor}`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="flex flex-col flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white group-hover:text-sky-300 transition-colors">
                    {item.title}
                  </span>
                  <span className="text-[10px] font-mono text-white/40">
                    {item.time}
                  </span>
                </div>
                <span className="text-xs text-white/60 mt-0.5 leading-relaxed">
                  {item.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="pt-3 mt-2 border-t border-white/10 text-center">
        <button className="text-xs font-mono text-sky-400 hover:underline">
          Mark all as read
        </button>
      </div>
    </motion.div>
  );
};
