"use client";

import React, { useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Sparkles,
  X,
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  ShieldCheck,
  AlertCircle,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

function AuthModalContent({ isOpen, onClose, initialMode = "login" }: AuthModalProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect") || "/dashboard";

  const [mode, setMode] = useState<"login" | "register" | "forgot">(initialMode);
  
  // Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState("Architect");
  const [country, setCountry] = useState("United States");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      if (mode === "login") {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Login failed");
        }

        onClose();
        if (data.user?.role === "ADMIN" || data.user?.role === "SUPER_ADMIN") {
          router.push("/admin");
        } else {
          router.push(redirectPath);
        }
        router.refresh();
      } else if (mode === "register") {
        const res = await fetch("/api/auth/register", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: fullName,
            email,
            password,
            profession,
            country,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Registration failed");
        }

        onClose();
        router.push(redirectPath);
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl rounded-[32px] glass-panel border border-white/15 overflow-hidden shadow-2xl bg-[#08090d] flex flex-col lg:flex-row min-h-[640px]"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 p-2 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT BRAND PANEL */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0a111e] via-[#080a10] to-[#040608] border-r border-white/10 p-10 flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400">
                <Sparkles className="w-5 h-5 animate-pulse" />
              </div>
              <span className="text-xl font-extrabold tracking-tight font-mono text-white">RUHARC</span>
            </div>

            <span className="text-xs font-mono text-sky-400 uppercase tracking-widest block mb-2 font-bold">
              AI ARCHITECTURE OPERATING SYSTEM
            </span>
            <h2 className="text-3xl font-extrabold text-white leading-tight mb-4">
              Real AI Architectural Workspace.
            </h2>
            <p className="text-sm text-white/60 leading-relaxed font-sans">
              Transform prompts into dimensioned layouts, BOQ cost estimates, structural analysis, and professional documents.
            </p>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/40 border-t border-white/10 pt-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              256-Bit Encrypted Session
            </span>
            <span>v1.0 Production</span>
          </div>
        </div>

        {/* RIGHT FORM PANEL */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative">
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <AnimatePresence mode="wait">
            {mode === "login" && (
              <motion.div
                key="login"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div>
                  <h3 className="text-2xl font-extrabold text-white mb-1">Welcome Back</h3>
                  <p className="text-xs font-mono text-white/60">Log in to access your projects and AI workspace.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="text-white/70 block mb-1.5 font-bold">Work Email</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="architect@firm.com"
                        className="w-full h-14 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/70 block mb-1.5 font-bold">Password</label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full h-14 pl-11 pr-11 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 rounded-2xl bg-sky-400 text-black font-bold font-mono text-sm hover:bg-sky-300 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <>
                        <span>Log In to Workspace</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>

                <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] font-mono text-white/50 text-center">
                  Demo Accounts: <span className="text-sky-300 font-bold">user@ruharc.org</span> (User) | <span className="text-amber-300 font-bold">admin@ruharc.org</span> (Admin)
                  <br /> Password: <span className="text-white font-bold">UserPassword123!</span> / <span className="text-white font-bold">AdminPassword123!</span>
                </div>

                <div className="text-center font-mono text-xs text-white/60 pt-2">
                  Don&apos;t have an account?{" "}
                  <button
                    onClick={() => { setErrorMessage(""); setMode("register"); }}
                    className="text-sky-400 font-bold hover:underline cursor-pointer"
                  >
                    Create Account
                  </button>
                </div>
              </motion.div>
            )}

            {mode === "register" && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-2xl font-extrabold text-white mb-1">Create Account</h3>
                  <p className="text-xs font-mono text-white/60">Join RUHARC to start building AI architectural projects.</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3 font-mono text-xs">
                  <div>
                    <label className="text-white/70 block mb-1 font-bold">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Sarah Jenkins"
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="text-white/70 block mb-1 font-bold">Work Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="architect@firm.com"
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-white/70 block mb-1 font-bold">Profession</label>
                      <select
                        value={profession}
                        onChange={(e) => setProfession(e.target.value)}
                        className="w-full h-12 px-3 rounded-xl bg-[#111] border border-white/10 text-white focus:border-sky-400 focus:outline-none"
                      >
                        <option value="Architect">Architect</option>
                        <option value="Civil Engineer">Civil Engineer</option>
                        <option value="Interior Designer">Interior Designer</option>
                        <option value="Builder">Builder / Contractor</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-white/70 block mb-1 font-bold">Country</label>
                      <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="w-full h-12 px-3 rounded-xl bg-white/5 border border-white/10 text-white focus:border-sky-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-white/70 block mb-1 font-bold">Password</label>
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 rounded-2xl bg-sky-400 text-black font-bold font-mono text-sm hover:bg-sky-300 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Create Account & Launch Workspace"
                    )}
                  </button>
                </form>

                <div className="text-center font-mono text-xs text-white/60 pt-1">
                  Already have an account?{" "}
                  <button onClick={() => { setErrorMessage(""); setMode("login"); }} className="text-sky-400 font-bold hover:underline cursor-pointer">
                    Log In
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

export const AuthModal: React.FC<AuthModalProps> = (props) => {
  return (
    <Suspense fallback={null}>
      <AuthModalContent {...props} />
    </Suspense>
  );
};
