"use client";

import React, { useState } from "react";
import { MessageSquare, Check, Sparkles } from "lucide-react";

export const InterviewDemo: React.FC = () => {
  const [step, setStep] = useState(0);

  const questions = [
    { q: "How many family members will live here?", options: ["4-5 Members", "2-3 Members", "6+ Members"] },
    { q: "Do you prefer an open-concept kitchen?", options: ["Yes, Open Island", "Closed Traditional"] },
    { q: "Include rooftop solar panels & rainwater harvesting?", options: ["Yes, Include Solar", "Standard Roof"] },
  ];

  const current = questions[step % questions.length];

  return (
    <div className="relative w-full h-[220px] rounded-2xl border border-white/10 p-4 bg-[#09080c] flex flex-col justify-between overflow-hidden">
      <div className="flex items-center justify-between text-xs font-mono">
        <span className="text-sky-400 font-bold flex items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          AI INTERVIEW ENGINE
        </span>
        <span className="text-white/40">Step {step + 1} of 3</span>
      </div>

      <div className="p-3 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs text-white">
        <div className="text-[9px] text-sky-400 uppercase mb-1">AI Question:</div>
        <div>{current.q}</div>
      </div>

      <div className="flex flex-col gap-1.5">
        {current.options.map((opt, i) => (
          <button
            key={i}
            onClick={() => setStep(step + 1)}
            className="w-full py-1.5 px-3 rounded-lg bg-white/5 border border-white/10 hover:bg-sky-500/20 hover:border-sky-400/40 text-left font-mono text-xs text-white/80 hover:text-white transition-all flex items-center justify-between cursor-pointer"
          >
            <span>{opt}</span>
            <Check className="w-3.5 h-3.5 text-sky-400 opacity-60" />
          </button>
        ))}
      </div>
    </div>
  );
};
