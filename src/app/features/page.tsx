import React from "react";
import { Navbar } from "@/components/Navbar";
import { FeatureGrid } from "@/components/features/FeatureGrid";
import { Sparkles } from "lucide-react";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-sky-500/30">
      <Navbar />
      <div className="pt-28 pb-10 text-center px-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-400 mb-6">
          <Sparkles className="w-4 h-4" /> COMPLETE FEATURE MATRIX
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
          Built for Professional Architecture
        </h1>
        <p className="text-white/60 font-sans text-sm sm:text-base max-w-2xl mx-auto">
          Explore all 30 core features spanning AI generative floorplanning, structural analysis, BOQ calculations, and high-definition visualization.
        </p>
      </div>
      <FeatureGrid />
    </main>
  );
}
