import React from "react";
import { Navbar } from "@/components/Navbar";
import { BookOpen, FileText, HelpCircle, Code, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ResourcesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-sky-500/30">
      <Navbar />

      <section className="pt-32 pb-20 px-6 sm:px-12 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-400 mb-6">
            <BookOpen className="w-4 h-4" /> KNOWLEDGE & DOCUMENTATION
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
            RUHARC Resources & Guides
          </h1>
          <p className="text-white/60 font-sans text-sm sm:text-base max-w-2xl mx-auto">
            Learn how to leverage generative AI for floor planning, structural specifications, and architectural documentation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
          <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#08090e] space-y-3">
            <FileText className="w-8 h-8 text-sky-400" />
            <h3 className="text-lg font-bold text-white">Documentation</h3>
            <p className="text-white/60 font-sans">Full technical documentation on AI prompt syntax, spatial graph APIs, and floorplan schema formats.</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#08090e] space-y-3">
            <Code className="w-8 h-8 text-indigo-400" />
            <h3 className="text-lg font-bold text-white">API References</h3>
            <p className="text-white/60 font-sans">REST endpoints for programmatically submitting prompts, retrieving spatial layout JSON, and generating reports.</p>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#08090e] space-y-3">
            <HelpCircle className="w-8 h-8 text-emerald-400" />
            <h3 className="text-lg font-bold text-white">Architect FAQs</h3>
            <p className="text-white/60 font-sans">Answers regarding building code compliance, CAD export formats, data security, and model privacy.</p>
          </div>
        </div>
      </section>
    </main>
  );
}
