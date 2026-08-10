"use client";

import React, { useState } from "react";
import { Wand2, Sparkles, Layers, Send, CheckCircle2, ArrowRight, RefreshCw } from "lucide-react";
import Link from "next/link";

export default function AIArchitectPage() {
  const [prompt, setPrompt] = useState("");
  const [plotDimensions, setPlotDimensions] = useState("30x50 ft");
  const [projectType, setProjectType] = useState("Residential");
  const [bedrooms, setBedrooms] = useState(3);
  const [style, setStyle] = useState("Modern Minimalist");
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai/architect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          plotDimensions,
          projectType,
          bedrooms,
          style,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiResult(data.result);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="p-8 rounded-3xl bg-gradient-to-r from-sky-950/60 via-[#070d18] to-indigo-950/40 border border-sky-500/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-400 mb-3">
          <Sparkles className="w-3.5 h-3.5" /> RUHARC AI ENGINE v1.0
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          AI Architecture Studio
        </h1>
        <p className="text-sm text-white/60 font-sans mt-2 max-w-xl">
          Transform text briefs into structured spatial floorplans, structural specifications, and material schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* INPUT FORM */}
        <form onSubmit={handleGenerate} className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#08090e] space-y-4 font-mono text-xs">
          <h3 className="text-sm font-bold text-white uppercase text-sky-400">Design Brief & Parameters</h3>

          <div>
            <label className="text-white/70 block mb-1 font-bold">Natural Language Prompt</label>
            <textarea
              required
              rows={4}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Design a modern 3-bedroom residence on a 30x50 ft plot with passive solar heating and high daylighting..."
              className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none font-sans"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-white/70 block mb-1 font-bold">Plot Dimensions</label>
              <input
                type="text"
                value={plotDimensions}
                onChange={(e) => setPlotDimensions(e.target.value)}
                className="w-full h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="text-white/70 block mb-1 font-bold">Bedrooms</label>
              <input
                type="number"
                value={bedrooms}
                onChange={(e) => setBedrooms(Number(e.target.value))}
                className="w-full h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>

          <div>
            <label className="text-white/70 block mb-1 font-bold">Architectural Style</label>
            <select
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full h-11 px-3 rounded-xl bg-[#111] border border-white/10 text-white"
            >
              <option value="Modern Minimalist">Modern Minimalist</option>
              <option value="Scandinavian Eco">Scandinavian Eco</option>
              <option value="Contemporary Industrial">Contemporary Industrial</option>
              <option value="Biophilic Villa">Biophilic Villa</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full h-14 rounded-2xl bg-sky-400 text-black font-bold font-mono text-sm hover:bg-sky-300 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            {isLoading ? (
              <div className="flex items-center gap-2">
                <RefreshCw className="w-4 h-4 animate-spin text-black" />
                <span>Synthesizing Spatial Graph...</span>
              </div>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate Architectural Concept</span>
              </>
            )}
          </button>
        </form>

        {/* AI OUTPUT VIEW */}
        <div className="lg:col-span-2 space-y-6">
          {!aiResult ? (
            <div className="h-full min-h-[400px] p-12 rounded-3xl glass-panel border border-white/10 bg-[#07080c] flex flex-col items-center justify-center text-center space-y-4 font-mono">
              <Wand2 className="w-12 h-12 text-sky-400/40" />
              <h3 className="text-lg font-bold text-white">AI Studio Waiting for Prompt</h3>
              <p className="text-xs text-white/60 font-sans max-w-md">
                Enter your project specifications and click generate to view structured spatial floor plans, room schedules, and material takeoffs.
              </p>
            </div>
          ) : (
            <div className="space-y-6 font-mono text-xs">
              {/* Concept Title */}
              <div className="p-6 rounded-3xl glass-panel border border-sky-400/30 bg-[#080b12]">
                <div className="text-xs text-sky-400 font-bold mb-1">CONCEPT GENERATED</div>
                <h2 className="text-2xl font-extrabold text-white mb-2">{aiResult.conceptName}</h2>
                <p className="text-white/70 font-sans text-xs leading-relaxed">{aiResult.designBrief}</p>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4 pt-4 border-t border-white/10">
                  <div>Style: <span className="text-white font-bold">{aiResult.architecturalStyle}</span></div>
                  <div>Area: <span className="text-sky-300 font-bold">{aiResult.totalAreaSqFt} sq.ft</span></div>
                  <div>Est. Budget: <span className="text-emerald-400 font-bold">${aiResult.estimatedCostUSD?.toLocaleString()}</span></div>
                </div>
              </div>

              {/* Spatial Program */}
              <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#07080c] space-y-3">
                <h3 className="text-sm font-bold text-white text-indigo-400">Spatial Room Schedule</h3>
                <div className="space-y-2">
                  {aiResult.spatialProgram?.map((item: any, i: number) => (
                    <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                      <div>
                        <span className="text-white font-bold">{item.room}</span>
                        <span className="text-white/40 text-[10px] block">{item.naturalLighting}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-sky-300 font-bold">{item.dimensions}</span>
                        <span className="text-white/40 text-[10px] block">{item.areaSqFt} sq.ft</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Structural & Sustainability */}
              <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#07080c] space-y-3">
                <h3 className="text-sm font-bold text-white text-emerald-400">Structural System & Sustainability</h3>
                <div className="text-white/80 font-sans mb-3">{aiResult.structuralSystem}</div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {aiResult.sustainabilityFeatures?.map((feat: string, i: number) => (
                    <div key={i} className="flex items-center gap-2 text-white/70">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
