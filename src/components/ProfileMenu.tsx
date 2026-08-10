"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  User,
  FolderKanban,
  LayoutGrid,
  Settings,
  LogOut,
  Sparkles,
  ShieldCheck,
  Wand2,
} from "lucide-react";

interface ProfileMenuProps {
  onClose: () => void;
}

export const ProfileMenu: React.FC<ProfileMenuProps> = ({ onClose }) => {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (e) {
        setUser(null);
      }
    }
    loadUser();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      onClose();
      router.push("/");
      router.refresh();
    } catch (e) {
      console.error("Logout failed", e);
    }
  };

  const menuItems = [
    { label: "My Projects", icon: FolderKanban, href: "/dashboard/projects" },
    { label: "Workspace Studio", icon: LayoutGrid, href: "/dashboard" },
    { label: "AI Architect", icon: Wand2, href: "/dashboard/architect" },
    { label: "Floor Plan Canvas", icon: User, href: "/dashboard/floorplans" },
    { label: "Account Settings", icon: Settings, href: "/dashboard/settings" },
  ];

  if (user?.role === "ADMIN" || user?.role === "SUPER_ADMIN") {
    menuItems.unshift({ label: "Admin Panel", icon: ShieldCheck, href: "/admin" });
  }

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    : "AR";

  return (
    <motion.div
      initial={{ opacity: 0, y: 15, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.95 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full right-0 mt-3 w-72 rounded-2xl glass-panel p-3 shadow-2xl border border-white/15 z-50 bg-[#07090e]/95 backdrop-blur-xl font-mono text-xs"
    >
      {/* Profile Info Header */}
      <div className="flex items-center gap-3 p-3 bg-white/[0.04] rounded-xl border border-white/[0.08] mb-2">
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 p-[2px] shadow-lg shrink-0">
          <div className="w-full h-full rounded-full bg-black flex items-center justify-center font-bold text-white text-xs">
            {initials}
          </div>
        </div>
        <div className="flex flex-col truncate">
          <span className="text-xs font-bold text-white truncate">
            {user?.name || "Architect Session"}
          </span>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-sky-500/20 text-sky-400 border border-sky-400/30 flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" />
              {user?.role || "PRO ARCHITECT"}
            </span>
          </div>
        </div>
      </div>

      {/* Menu Items */}
      <div className="space-y-1">
        {menuItems.map((item, idx) => {
          const Icon = item.icon;
          return (
            <Link
              key={idx}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-white/80 hover:text-white hover:bg-white/[0.08] transition-colors group cursor-pointer"
            >
              <Icon className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout button */}
      <div className="pt-2 mt-2 border-t border-white/10">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4 text-rose-400" />
          <span>Log Out Session</span>
        </button>
      </div>
    </motion.div>
  );
};
