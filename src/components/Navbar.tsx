"use client";

import React, { useState, useEffect } from "react";
import { Compass, Search, Bell, Sun, Moon, Laptop, Menu, X, ArrowUpRight, ChevronDown, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { CommandPalette } from "@/components/CommandPalette";
import { NotificationCenter } from "@/components/NotificationCenter";
import { ProfileMenu } from "@/components/ProfileMenu";
import { AuthModal } from "@/components/auth/AuthModal";

export const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("Home");
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#" },
    { name: "Features", href: "#features" },
    { name: "Solutions", href: "#solutions", hasMegaMenu: true },
    { name: "Templates", href: "#templates" },
    { name: "Pricing", href: "#pricing" },
    { name: "Resources", href: "#resources" },
    { name: "Community", href: "#community" },
  ];

  return (
    <>
      {/* Floating Centered Desktop Navbar */}
      <header className="fixed top-[20px] left-0 right-0 z-50 flex justify-center px-4 sm:px-8 pointer-events-none">
        <motion.div
          animate={{
            height: scrolled ? 66 : 74,
            backgroundColor: scrolled ? "rgba(10, 10, 10, 0.85)" : "rgba(10, 10, 10, 0.55)",
            boxShadow: scrolled
              ? "0 20px 80px rgba(0, 0, 0, 0.65)"
              : "0 12px 60px rgba(0, 0, 0, 0.35)",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-auto w-full max-w-[1680px] rounded-[22px] border border-white/[0.08] backdrop-blur-[32px] px-4 sm:px-[28px] flex items-center justify-between shadow-2xl relative"
        >
          {/* 1. LOGO */}
          <a
            href="#"
            className="flex items-center gap-3 group relative"
            onMouseEnter={() => setMegaMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: scrolled ? 0.92 : 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-white via-slate-200 to-slate-400 p-[1px] shadow-lg shadow-white/5 transition-transform duration-250 group-hover:rotate-4 group-hover:scale-[1.04]"
            >
              <div className="w-full h-full bg-[#09090b] rounded-[11px] flex items-center justify-center relative overflow-hidden">
                <Compass className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
                <div className="absolute inset-0 bg-sky-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5">
                RUHARC
                <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-sky-500/20 border border-sky-400/30 text-sky-400">
                  OS
                </span>
              </span>
              <span className="text-[9px] text-white/40 tracking-widest font-mono uppercase">
                Architecture AI
              </span>
            </div>
          </a>

          {/* 2. NAVIGATION LINKS (Desktop) */}
          <nav className="hidden lg:flex items-center gap-6 relative">
            {navLinks.map((link) => {
              const isActive = activeNav === link.name;
              return (
                <div
                  key={link.name}
                  className="relative py-2"
                  onMouseEnter={() => {
                    if (link.hasMegaMenu) setMegaMenuOpen(true);
                    else setMegaMenuOpen(false);
                  }}
                >
                  <a
                    href={link.href}
                    onClick={() => setActiveNav(link.name)}
                    className={`relative text-sm font-medium transition-colors duration-200 flex items-center gap-1 group py-1 ${
                      isActive ? "text-white" : "text-white/70 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {link.hasMegaMenu && (
                      <ChevronDown
                        className={`w-3.5 h-3.5 text-white/40 group-hover:text-white transition-transform ${
                          megaMenuOpen ? "rotate-180 text-sky-400" : ""
                        }`}
                      />
                    )}

                    {/* Bottom Underline Grows from Center */}
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-sky-400 transition-all duration-250 group-hover:w-full" />
                  </a>

                  {/* Active Page Small Glowing Bottom Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-sky-400 to-indigo-400 rounded-full shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                    />
                  )}
                </div>
              );
            })}

            {/* Mega Menu Dropdown */}
            <AnimatePresence>
              {megaMenuOpen && (
                <div onMouseLeave={() => setMegaMenuOpen(false)}>
                  <MegaMenu onClose={() => setMegaMenuOpen(false)} />
                </div>
              )}
            </AnimatePresence>
          </nav>

          {/* 3. RIGHT TOOLS & CTA (Search, Theme, Notifications, Profile, CTA) */}
          <div className="hidden xl:flex items-center gap-3">
            {/* Search Input Trigger (Command Palette) */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/20 transition-all text-white/50 text-xs cursor-pointer group"
            >
              <Search className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-white/60">
                Search projects, templates...
              </span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/10 ml-1">
                Ctrl + K
              </span>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="w-[44px] h-[44px] rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] flex items-center justify-center text-white/70 hover:text-white transition-colors cursor-pointer"
              title="Toggle Theme"
            >
              {theme === "dark" ? (
                <Moon className="w-4 h-4 text-sky-400" />
              ) : (
                <Sun className="w-4 h-4 text-amber-400" />
              )}
            </button>

            {/* Notification Center Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationsOpen(!notificationsOpen);
                  setProfileOpen(false);
                }}
                className="w-[44px] h-[44px] rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] flex items-center justify-center text-white/70 hover:text-white transition-colors relative cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-sky-400 animate-pulse-glow" />
              </button>

              <AnimatePresence>
                {notificationsOpen && (
                  <NotificationCenter onClose={() => setNotificationsOpen(false)} />
                )}
              </AnimatePresence>
            </div>

            {/* Profile Dropdown Trigger */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationsOpen(false);
                }}
                className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-colors cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 p-[1.5px]">
                  <div className="w-full h-full rounded-full bg-black flex items-center justify-center text-white text-xs font-bold">
                    AR
                  </div>
                </div>
              </button>

              <AnimatePresence>
                {profileOpen && (
                  <ProfileMenu onClose={() => setProfileOpen(false)} />
                )}
              </AnimatePresence>
            </div>

            {/* Primary CTA Button */}
            <button
              onClick={() => {
                setAuthMode("register");
                setAuthModalOpen(true);
              }}
              className="relative group overflow-hidden rounded-[18px] bg-white text-black font-semibold text-sm px-5 py-2.5 transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-white/10 cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-sky-600" />
                Start Designing
              </span>
            </button>
          </div>

          {/* Mobile Hamburger Toggle */}
          <div className="flex xl:hidden items-center gap-3">
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="p-2 rounded-xl text-white/70 bg-white/5 border border-white/10"
            >
              <Search className="w-5 h-5 text-sky-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-white bg-white/5 border border-white/10 transition-transform active:scale-95"
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </motion.div>
      </header>

      {/* Auth Modal System */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* Command Palette Modal */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
      />

      {/* MOBILE OVERLAY NAVIGATION MENU */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#050507]/98 backdrop-blur-3xl pt-28 px-6 pb-8 flex flex-col justify-between overflow-y-auto"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                Navigation Menu
              </span>
              <div className="flex flex-col gap-2">
                {navLinks.map((link, idx) => (
                  <motion.a
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-2xl font-bold text-white/90 hover:text-sky-400 py-3 border-b border-white/5 flex items-center justify-between"
                  >
                    <span>{link.name}</span>
                    <ArrowUpRight className="w-5 h-5 opacity-40" />
                  </motion.a>
                ))}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3">
              <a
                href="#demo-workspace"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center bg-white text-black font-semibold text-base py-4 rounded-xl shadow-xl flex items-center justify-center gap-2 min-h-[48px]"
              >
                <Sparkles className="w-5 h-5 text-sky-600" />
                Start Designing Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
