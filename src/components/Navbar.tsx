"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Compass, Search, Bell, Sun, Moon, Menu, X, ArrowUpRight, ChevronDown, Sparkles, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { MegaMenu } from "@/components/MegaMenu";
import { CommandPalette } from "@/components/CommandPalette";
import { NotificationCenter } from "@/components/NotificationCenter";
import { ProfileMenu } from "@/components/ProfileMenu";
import { AuthModal } from "@/components/auth/AuthModal";

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    async function checkUser() {
      try {
        const res = await fetch("/api/auth/me");
        if (res.ok) {
          const data = await res.json();
          setCurrentUser(data.user);
        }
      } catch (e) {
        setCurrentUser(null);
      }
    }
    checkUser();
  }, []);

  const navLinks = [
    { name: "Platform", href: "/platform", hasMegaMenu: true },
    { name: "Features", href: "/features" },
    { name: "Generative AI", href: "/generative-design" },
    { name: "Pricing", href: "/pricing" },
    { name: "Resources", href: "/resources" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      {/* Floating Centered Desktop Navbar */}
      <header className="fixed top-[20px] left-0 right-0 z-50 flex justify-center px-4 sm:px-8 pointer-events-none">
        <motion.div
          animate={{
            height: scrolled ? 66 : 74,
            backgroundColor: scrolled ? "rgba(7, 9, 14, 0.92)" : "rgba(7, 9, 14, 0.65)",
            boxShadow: scrolled
              ? "0 20px 80px rgba(0, 0, 0, 0.75)"
              : "0 12px 60px rgba(0, 0, 0, 0.45)",
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="pointer-events-auto w-full max-w-[1680px] rounded-[22px] border border-white/[0.12] backdrop-blur-[32px] px-4 sm:px-[28px] flex items-center justify-between shadow-2xl relative"
        >
          {/* 1. LOGO */}
          <Link
            href="/"
            className="flex items-center gap-3 group relative"
            onMouseEnter={() => setMegaMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: scrolled ? 0.92 : 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-400 via-indigo-500 to-slate-800 p-[1.5px] shadow-lg shadow-sky-500/20 transition-transform duration-250 group-hover:scale-[1.05]"
            >
              <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center relative overflow-hidden">
                <Compass className="w-5 h-5 text-sky-400 group-hover:rotate-45 transition-transform duration-500" />
                <div className="absolute inset-0 bg-sky-400/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            </motion.div>

            <div className="flex flex-col">
              <span className="font-extrabold text-lg sm:text-xl tracking-tight text-white flex items-center gap-1.5 font-mono">
                RUHARC
                <span className="text-[10px] uppercase font-mono tracking-widest px-1.5 py-0.5 rounded bg-sky-500/20 border border-sky-400/30 text-sky-400">
                  AI OS
                </span>
              </span>
              <span className="text-[9px] text-white/40 tracking-widest font-mono uppercase">
                Architectural Platform
              </span>
            </div>
          </Link>

          {/* 2. NAVIGATION LINKS (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 relative">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <div
                  key={link.name}
                  className="relative py-2"
                  onMouseEnter={() => {
                    if (link.hasMegaMenu) setMegaMenuOpen(true);
                    else setMegaMenuOpen(false);
                  }}
                >
                  <Link
                    href={link.href}
                    className={`relative text-sm font-medium font-sans transition-colors duration-200 flex items-center gap-1 group py-1 ${
                      isActive ? "text-white font-bold" : "text-white/70 hover:text-white"
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

                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-sky-400 transition-all duration-250 group-hover:w-full" />
                  </Link>

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

          {/* 3. RIGHT TOOLS & ACTIONS */}
          <div className="hidden xl:flex items-center gap-3">
            {/* Search Input Trigger */}
            <button
              onClick={() => setCommandPaletteOpen(true)}
              className="flex items-center gap-2.5 h-[44px] px-3.5 rounded-xl bg-white/[0.04] border border-white/[0.1] hover:bg-white/[0.08] hover:border-sky-400/30 transition-all text-white/50 text-xs cursor-pointer group font-mono"
            >
              <Search className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
              <span className="hidden xl:inline text-white/60">Search features, docs...</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/10 text-white/80 border border-white/10 ml-1">
                Ctrl + K
              </span>
            </button>

            {currentUser ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-sky-500/20 border border-sky-400/40 text-white font-mono font-bold text-xs hover:bg-sky-500/30 transition-all cursor-pointer shadow-lg shadow-sky-500/10"
              >
                <div className="w-6 h-6 rounded-full bg-sky-400 text-black flex items-center justify-center text-[10px] font-extrabold">
                  {currentUser.name ? currentUser.name.substring(0, 2).toUpperCase() : "US"}
                </div>
                <span>Workspace Dashboard</span>
              </Link>
            ) : (
              <>
                <button
                  onClick={() => {
                    setAuthMode("login");
                    setAuthModalOpen(true);
                  }}
                  className="text-xs font-mono font-bold text-white/80 hover:text-white px-3 py-2 cursor-pointer transition-colors"
                >
                  Log In
                </button>

                <button
                  onClick={() => {
                    setAuthMode("register");
                    setAuthModalOpen(true);
                  }}
                  className="relative group overflow-hidden rounded-xl bg-sky-400 text-black font-mono font-extrabold text-xs px-5 py-2.5 transition-all duration-300 hover:bg-sky-300 active:scale-95 shadow-xl shadow-sky-400/20 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-black" />
                    Launch Studio
                  </span>
                </button>
              </>
            )}
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
              className="p-2 rounded-xl text-white bg-white/5 border border-white/10 transition-transform active:scale-95 cursor-pointer"
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
            className="fixed inset-0 z-40 bg-[#05060a]/98 backdrop-blur-3xl pt-28 px-6 pb-8 flex flex-col justify-between overflow-y-auto font-sans"
          >
            <div className="space-y-4">
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                Navigation Menu
              </span>
              <div className="flex flex-col gap-2 font-mono">
                {navLinks.map((link, idx) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-xl font-bold text-white/90 hover:text-sky-400 py-3 border-b border-white/5 flex items-center justify-between"
                    >
                      <span>{link.name}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-40 text-sky-400" />
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="pt-6 border-t border-white/10 flex flex-col gap-3 font-mono text-xs">
              {currentUser ? (
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center bg-sky-400 text-black font-extrabold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  Go to Workspace Dashboard
                </Link>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthMode("register");
                    setAuthModalOpen(true);
                  }}
                  className="w-full text-center bg-sky-400 text-black font-extrabold py-4 rounded-2xl shadow-xl flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-black" />
                  Launch Studio Free
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
