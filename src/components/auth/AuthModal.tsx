"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  X,
  Eye,
  EyeOff,
  CheckCircle2,
  Lock,
  Mail,
  User,
  Globe,
  Briefcase,
  ArrowRight,
  ShieldCheck,
  Building,
  Wand2,
  Layers,
  Grid,
  Bot,
  Sliders,
  Check,
  AlertCircle,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: "login" | "register";
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  initialMode = "login",
}) => {
  const [mode, setMode] = useState<"login" | "register" | "verify" | "forgot" | "onboarding">(initialMode);
  
  // Login & Register Form Inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [capsLockOn, setCapsLockOn] = useState(false);
  const [fullName, setFullName] = useState("");
  const [profession, setProfession] = useState("Architect");
  const [country, setCountry] = useState("United States");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(60);

  // Onboarding Step State (1 to 6)
  const [onboardingStep, setOnboardingStep] = useState(1);
  const [unitSystem, setUnitSystem] = useState<"Metric" | "Imperial">("Imperial");
  const [workspaceType, setWorkspaceType] = useState("Architect");

  // Password rules validation
  const passRules = {
    length: password.length >= 8,
    upper: /[A-Z]/.test(password),
    lower: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[^A-Za-z0-9]/.test(password),
  };

  // Keyboard caps lock detection
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.getModifierState && e.getModifierState("CapsLock")) {
      setCapsLockOn(true);
    } else {
      setCapsLockOn(false);
    }
  };

  // Resend email countdown
  useEffect(() => {
    let timer: any;
    if (mode === "verify" && resendTimer > 0) {
      timer = setInterval(() => setResendTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [mode, resendTimer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      if (mode === "register") {
        setMode("verify");
      } else if (mode === "login") {
        setMode("onboarding");
      } else if (mode === "forgot") {
        setMode("login");
      }
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-xl">
      {/* Outer Card Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-5xl rounded-[32px] glass-panel border border-white/15 overflow-hidden shadow-2xl bg-[#08090d] flex flex-col lg:flex-row min-h-[640px]"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-30 p-2 rounded-full bg-white/10 text-white/60 hover:text-white hover:bg-white/20 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* LEFT PANEL: BRAND EXPERIENCE & ANIMATED BLUEPRINT */}
        <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-[#0a111e] via-[#080a10] to-[#040608] border-r border-white/10 p-10 flex-col justify-between relative overflow-hidden">
          {/* Blueprint Grid Lines */}
          <div className="absolute inset-0 bg-architectural-grid opacity-30 pointer-events-none" />

          <div className="relative z-10">
            {/* Logo */}
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
              Design Beyond Imagination.
            </h2>
            <p className="text-sm text-white/60 leading-relaxed">
              Transform natural language into fully dimensioned architectural designs, construction material takeoffs, and photorealistic 8K renders.
            </p>
          </div>

          {/* Animated 3D House Preview Card */}
          <div className="relative z-10 glass-panel p-4 rounded-2xl border border-white/15 overflow-hidden my-6">
            <div className="relative h-[200px] rounded-xl overflow-hidden">
              <img
                src="/images/villa1.png"
                alt="RUHARC Render Preview"
                className="w-full h-full object-cover animate-continuous-zoom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-sky-300 font-bold">✓ SCANDINAVIAN VILLA</span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                    8K RENDERED
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Security Footer */}
          <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/40">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              256-Bit Encrypted Session
            </span>
            <span>v1.0 Enterprise</span>
          </div>
        </div>

        {/* RIGHT PANEL: GLASS AUTHENTICATION FORM CARD */}
        <div className="w-full lg:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative">
          <AnimatePresence mode="wait">
            {/* LOGIN MODE */}
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
                  <p className="text-xs font-mono text-white/60">Continue building intelligent architectural projects.</p>
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
                        className="w-full h-14 pl-11 pr-4 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1.5">
                      <label className="text-white/70 font-bold">Password</label>
                      <button
                        type="button"
                        onClick={() => setMode("forgot")}
                        className="text-sky-400 hover:underline text-[11px]"
                      >
                        Forgot Password?
                      </button>
                    </div>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                      <input
                        type={showPassword ? "text" : "password"}
                        required
                        value={password}
                        onKeyDown={handleKeyDown}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full h-14 pl-11 pr-11 rounded-2xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                    {capsLockOn && (
                      <div className="text-[10px] text-amber-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> Caps Lock is ON
                      </div>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 rounded-2xl bg-white text-black font-bold font-mono text-sm hover:bg-white/90 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
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

                <div className="relative text-center font-mono text-[11px] text-white/40 my-4">
                  <span className="bg-[#08090d] px-3 relative z-10">OR CONTINUE WITH</span>
                  <div className="absolute inset-0 top-1/2 border-t border-white/10" />
                </div>

                <div className="grid grid-cols-2 gap-3 font-mono text-xs">
                  <button
                    onClick={() => setMode("onboarding")}
                    className="h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    Google
                  </button>
                  <button
                    onClick={() => setMode("onboarding")}
                    className="h-12 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    GitHub
                  </button>
                </div>

                <div className="text-center font-mono text-xs text-white/60 pt-2">
                  Don&apos;t have a workspace?{" "}
                  <button
                    onClick={() => setMode("register")}
                    className="text-sky-400 font-bold hover:underline"
                  >
                    Create Account
                  </button>
                </div>
              </motion.div>
            )}

            {/* REGISTER MODE */}
            {mode === "register" && (
              <motion.div
                key="register"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-4"
              >
                <div>
                  <h3 className="text-2xl font-extrabold text-white mb-1">Create Your Workspace</h3>
                  <p className="text-xs font-mono text-white/60">Start designing smarter with AI architecture tools.</p>
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
                        <option value="Home Owner">Home Owner</option>
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

                    {/* Password Strength Checklist */}
                    <div className="grid grid-cols-2 gap-1 text-[10px] mt-2 text-white/50">
                      <div className={passRules.length ? "text-emerald-400 font-bold" : ""}>✓ 8+ Characters</div>
                      <div className={passRules.upper ? "text-emerald-400 font-bold" : ""}>✓ Uppercase Letter</div>
                      <div className={passRules.number ? "text-emerald-400 font-bold" : ""}>✓ One Number</div>
                      <div className={passRules.special ? "text-emerald-400 font-bold" : ""}>✓ Special Character</div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full h-14 rounded-2xl bg-sky-400 text-black font-bold font-mono text-sm hover:bg-sky-300 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    ) : (
                      "Create Workspace Free"
                    )}
                  </button>
                </form>

                <div className="text-center font-mono text-xs text-white/60 pt-1">
                  Already have an account?{" "}
                  <button onClick={() => setMode("login")} className="text-sky-400 font-bold hover:underline">
                    Log In
                  </button>
                </div>
              </motion.div>
            )}

            {/* EMAIL VERIFICATION SCREEN */}
            {mode === "verify" && (
              <motion.div
                key="verify"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="text-center space-y-6 my-auto"
              >
                <div className="w-16 h-16 rounded-2xl bg-sky-500/20 border border-sky-400/40 flex items-center justify-center text-sky-400 mx-auto animate-bounce">
                  <Mail className="w-8 h-8" />
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-white mb-2">Check Your Inbox</h3>
                  <p className="text-xs font-mono text-white/60 leading-relaxed max-w-sm mx-auto">
                    We&apos;ve sent a verification email link to <span className="text-sky-300 font-bold">{email || "architect@firm.com"}</span>.
                  </p>
                </div>

                <div className="space-y-3 font-mono text-xs">
                  <button
                    onClick={() => setMode("onboarding")}
                    className="w-full h-14 rounded-2xl bg-white text-black font-bold hover:bg-white/90 transition-all shadow-lg cursor-pointer"
                  >
                    Open Mail App & Verify
                  </button>

                  <div className="text-white/40 text-[11px]">
                    Didn&apos;t receive email? Resend in <span className="text-sky-400 font-bold">{resendTimer}s</span>
                  </div>
                </div>
              </motion.div>
            )}

            {/* ONBOARDING EXPERIENCE (STEPS 01 TO 06) */}
            {mode === "onboarding" && (
              <motion.div
                key="onboarding"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6 my-auto"
              >
                <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs">
                  <span className="text-sky-400 font-bold uppercase">ONBOARDING STEP {onboardingStep} OF 3</span>
                  <span className="text-white/40">Personalizing RUHARC</span>
                </div>

                {/* ONBOARDING STEP 1: WELCOME & UNITS */}
                {onboardingStep === 1 && (
                  <div className="space-y-4 font-mono text-xs">
                    <h3 className="text-xl font-bold text-white">Welcome to RUHARC AI</h3>
                    <p className="text-white/60">Choose your preferred architectural measurement system:</p>

                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setUnitSystem("Imperial")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          unitSystem === "Imperial"
                            ? "bg-sky-500/20 border-sky-400 text-white font-bold"
                            : "bg-white/5 border-white/10 text-white/60"
                        }`}
                      >
                        <div className="text-sm mb-1">Imperial Units</div>
                        <div className="text-[10px] text-white/40">Feet, Inches, Sq.Ft</div>
                      </button>

                      <button
                        onClick={() => setUnitSystem("Metric")}
                        className={`p-4 rounded-2xl border text-left transition-all ${
                          unitSystem === "Metric"
                            ? "bg-sky-500/20 border-sky-400 text-white font-bold"
                            : "bg-white/5 border-white/10 text-white/60"
                        }`}
                      >
                        <div className="text-sm mb-1">Metric System</div>
                        <div className="text-[10px] text-white/40">Meters, Centimeters, Sq.M</div>
                      </button>
                    </div>
                  </div>
                )}

                {/* ONBOARDING STEP 2: WORKSPACE ROLE */}
                {onboardingStep === 2 && (
                  <div className="space-y-4 font-mono text-xs">
                    <h3 className="text-xl font-bold text-white">Select Workspace Profile</h3>
                    <p className="text-white/60">Tailor the AI assistant for your specific workflow:</p>

                    <div className="grid grid-cols-2 gap-2">
                      {["Architect Workspace", "Visualization Studio", "Construction Manager", "Client Review"].map((ws, i) => (
                        <button
                          key={i}
                          onClick={() => setWorkspaceType(ws)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            workspaceType === ws
                              ? "bg-sky-400 text-black font-bold"
                              : "bg-white/5 border-white/10 text-white/70"
                          }`}
                        >
                          {ws}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* ONBOARDING STEP 3: READY TO START */}
                {onboardingStep === 3 && (
                  <div className="text-center space-y-4 font-mono text-xs">
                    <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
                    <h3 className="text-2xl font-bold text-white">Your Workspace is Ready!</h3>
                    <p className="text-white/60">Configured for {unitSystem} measurements and {workspaceType} layout.</p>
                  </div>
                )}

                {/* Onboarding Navigation Buttons */}
                <div className="flex justify-between items-center pt-4">
                  {onboardingStep > 1 ? (
                    <button
                      onClick={() => setOnboardingStep(onboardingStep - 1)}
                      className="px-4 py-2 rounded-xl bg-white/5 text-white/60 font-mono text-xs"
                    >
                      Back
                    </button>
                  ) : (
                    <div />
                  )}

                  <button
                    onClick={() => {
                      if (onboardingStep < 3) {
                        setOnboardingStep(onboardingStep + 1);
                      } else {
                        onClose();
                      }
                    }}
                    className="px-6 py-3 rounded-xl bg-sky-400 text-black font-bold font-mono text-xs shadow-lg flex items-center gap-1 cursor-pointer"
                  >
                    <span>{onboardingStep === 3 ? "Launch Workspace Studio" : "Continue"}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};
