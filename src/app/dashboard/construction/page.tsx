"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  HardHat,
  TrendingDown,
  Calendar,
  FileSpreadsheet,
  Layers,
  Leaf,
  AlertTriangle,
  Download,
  DollarSign,
  CheckCircle2,
  PackageCheck,
} from "lucide-react";

export default function ConstructionWorkspacePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "boq" | "materials" | "cost" | "timeline" | "sustainability">("boq");
  const [budgetScenario, setBudgetScenario] = useState<"Economy" | "Standard" | "Premium" | "Luxury">("Standard");

  const boqItems = [
    { item: "Substructure Concrete (M25 Grade)", unit: "Cu.m", qty: 180, rate: "$240", total: "$43,200", status: "Calculated" },
    { item: "Reinforcement Steel (TMT 500D)", unit: "Tons", qty: 14.2, rate: "$950", total: "$13,490", status: "Calculated" },
    { item: "AAC Lightweight Wall Bricks", unit: "Pcs", qty: 12400, rate: "$1.80", total: "$22,320", status: "Calculated" },
    { item: "Double-Glazed Low-E Glass Windows", unit: "Sq.ft", qty: 640, rate: "$45", total: "$28,800", status: "Estimated" },
    { item: "Engineered Oak Hardwood Flooring", unit: "Sq.ft", qty: 1850, rate: "$14", total: "$25,900", status: "Estimated" },
  ];

  return (
    <div className="space-y-6 font-mono">
      {/* HEADER & TOP TABS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
            <HardHat className="w-4 h-4" /> RUHARC CONSTRUCTION INTELLIGENCE
          </span>
          <h1 className="text-2xl font-extrabold text-white">Bill of Quantities & Material Center</h1>
          <p className="text-xs text-white/50">AI-generated construction planning assistant. (Requires professional engineering review).</p>
        </div>

        {/* Budget Tier Selector */}
        <div className="flex items-center gap-2 bg-black/40 p-1.5 rounded-xl border border-white/10 text-xs">
          {(["Economy", "Standard", "Premium", "Luxury"] as const).map((tier) => (
            <button
              key={tier}
              onClick={() => setBudgetScenario(tier)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                budgetScenario === tier ? "bg-amber-400 text-black shadow" : "text-white/60 hover:text-white"
              }`}
            >
              {tier}
            </button>
          ))}
        </div>
      </div>

      {/* METRICS SUMMARY ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "ESTIMATED TOTAL BUDGET", val: "$133,710", sub: `${budgetScenario} Tier Target`, icon: DollarSign, color: "text-emerald-400" },
          { label: "TOTAL COVERED AREA", val: "4,000 SQ.FT", sub: "Ground + 1 Floor", icon: Layers, color: "text-sky-400" },
          { label: "ESTIMATED TIMELINE", val: "7.5 MONTHS", sub: "Phase 1 - 4 Schedule", icon: Calendar, color: "text-amber-400" },
          { label: "SUSTAINABILITY SCORE", val: "A+ (94%)", sub: "Material Waste -32%", icon: Leaf, color: "text-emerald-400" },
        ].map((m, idx) => {
          const Icon = m.icon;
          return (
            <div key={idx} className="glass-panel p-5 rounded-2xl border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] text-white/50">
                <span>{m.label}</span>
                <Icon className={`w-4 h-4 ${m.color}`} />
              </div>
              <div className={`text-2xl font-extrabold ${m.color}`}>{m.val}</div>
              <div className="text-[10px] text-white/40">{m.sub}</div>
            </div>
          );
        })}
      </div>

      {/* BILL OF QUANTITIES (BOQ) TABLE */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-white flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-sky-400" />
            BILL OF QUANTITIES (BOQ) BREAKDOWN
          </h2>
          <button className="px-3 py-1.5 rounded-xl bg-white/10 text-white hover:bg-white/20 text-xs font-bold flex items-center gap-1.5">
            <Download className="w-3.5 h-3.5" /> Export Excel
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-white/50">
                <th className="py-3 px-4 font-bold">MATERIAL / SPECIFICATION</th>
                <th className="py-3 px-4 font-bold">UNIT</th>
                <th className="py-3 px-4 font-bold">QUANTITY</th>
                <th className="py-3 px-4 font-bold">EST. RATE</th>
                <th className="py-3 px-4 font-bold">EST. TOTAL</th>
                <th className="py-3 px-4 font-bold">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {boqItems.map((row, i) => (
                <tr key={i} className="hover:bg-white/5 transition-colors text-white/80">
                  <td className="py-3.5 px-4 font-bold text-white">{row.item}</td>
                  <td className="py-3.5 px-4 text-white/60">{row.unit}</td>
                  <td className="py-3.5 px-4 text-sky-300 font-bold">{row.qty}</td>
                  <td className="py-3.5 px-4 text-white/60">{row.rate}</td>
                  <td className="py-3.5 px-4 text-emerald-400 font-bold">{row.total}</td>
                  <td className="py-3.5 px-4">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AI RISK & WARNINGS PANEL */}
      <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-start gap-3 text-xs text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block text-amber-300 mb-0.5">Engineering Verification Notice:</span>
          All material quantities and cost estimates are AI-assisted planning metrics. Structural spans exceeding 18 ft require certified structural engineer sign-off prior to site preparation.
        </div>
      </div>
    </div>
  );
}
