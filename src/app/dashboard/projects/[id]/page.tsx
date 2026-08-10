"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  Wand2,
  Grid,
  FileText,
  DollarSign,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
} from "lucide-react";

export default function SingleProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const [projectData, setProjectData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"overview" | "floorplan" | "boq">("overview");
  const [unwrappedParams, setUnwrappedParams] = useState<{ id: string } | null>(null);

  useEffect(() => {
    params.then(setUnwrappedParams);
  }, [params]);

  useEffect(() => {
    if (!unwrappedParams?.id) return;
    async function loadProject() {
      try {
        const res = await fetch(`/api/projects/${unwrappedParams!.id}`);
        if (res.ok) {
          const data = await res.json();
          setProjectData(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [unwrappedParams]);

  if (loading) {
    return <div className="p-12 text-center text-white/40 font-mono text-sm">Loading project workspace...</div>;
  }

  if (!projectData || !projectData.project) {
    return (
      <div className="p-12 text-center space-y-4 font-mono">
        <div className="text-red-400 font-bold">Project Not Found or Access Denied</div>
        <Link href="/dashboard/projects" className="text-sky-400 hover:underline text-xs">
          ← Back to Projects
        </Link>
      </div>
    );
  }

  const { project, requirements, floorPlans, aiGenerations } = projectData;
  const currentFloorPlan = floorPlans?.[0];
  let rooms: any[] = [];
  try {
    if (currentFloorPlan?.layout_json) {
      rooms = JSON.parse(currentFloorPlan.layout_json);
    }
  } catch {}

  return (
    <div className="space-y-6 font-sans">
      <div className="flex items-center justify-between">
        <Link href="/dashboard/projects" className="text-xs font-mono text-white/50 hover:text-white flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
        <div className="px-3 py-1 rounded-md bg-sky-500/20 text-sky-300 font-mono text-xs font-bold border border-sky-400/30">
          ID: {project.id}
        </div>
      </div>

      {/* Header Banner */}
      <div className="p-8 rounded-3xl glass-panel border border-white/10 bg-[#080a10]">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="text-xs font-mono text-sky-400 uppercase tracking-widest font-bold mb-1">
              {project.project_type} ARCHITECTURAL PROJECT
            </div>
            <h1 className="text-3xl font-extrabold text-white">{project.title}</h1>
            <p className="text-sm text-white/60 font-sans mt-2">{project.description}</p>
          </div>

          <Link
            href="/dashboard/architect"
            className="px-5 py-3 rounded-xl bg-sky-400 text-black font-bold font-mono text-xs hover:bg-sky-300 transition-all flex items-center gap-2 cursor-pointer shrink-0 shadow-lg shadow-sky-400/20"
          >
            <Sparkles className="w-4 h-4" />
            <span>Generate AI Concept</span>
          </Link>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 border-t border-white/10 mt-8 pt-4 font-mono text-xs">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-2 border-b-2 font-bold ${
              activeTab === "overview" ? "border-sky-400 text-sky-400" : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            Overview & Specs
          </button>
          <button
            onClick={() => setActiveTab("floorplan")}
            className={`pb-2 border-b-2 font-bold ${
              activeTab === "floorplan" ? "border-sky-400 text-sky-400" : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            Floor Plan Canvas ({rooms.length} Rooms)
          </button>
          <button
            onClick={() => setActiveTab("boq")}
            className={`pb-2 border-b-2 font-bold ${
              activeTab === "boq" ? "border-sky-400 text-sky-400" : "border-transparent text-white/60 hover:text-white"
            }`}
          >
            BOQ & Cost Takeoff
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}
      {activeTab === "overview" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
          <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#07080c] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase text-sky-400">Site & Constraints</h3>
            <div className="space-y-2 text-white/70">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Plot Dimensions:</span>
                <span className="text-white font-bold">{project.plot_dimensions}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Estimated Budget:</span>
                <span className="text-emerald-400 font-bold">${project.estimated_budget?.toLocaleString("en-US")}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Status:</span>
                <span className="text-sky-300 font-bold">{project.status}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Floors:</span>
                <span className="text-white font-bold">{requirements?.floors || 2}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span>Bedrooms / Baths:</span>
                <span className="text-white font-bold">{requirements?.bedrooms || 3} Bed / {requirements?.bathrooms || 2} Bath</span>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#07080c] space-y-4">
            <h3 className="text-sm font-bold text-white uppercase text-indigo-400">AI Generations History</h3>
            {aiGenerations?.length === 0 ? (
              <p className="text-white/40 font-sans">No AI generations performed for this project yet.</p>
            ) : (
              <div className="space-y-3">
                {aiGenerations?.map((gen: any) => (
                  <div key={gen.id} className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px]">
                    <div className="text-sky-300 font-bold">{gen.type}</div>
                    <div className="text-white/60 font-sans text-xs mt-1 truncate">{gen.prompt}</div>
                    <div className="text-white/30 text-[10px] mt-1">{new Date(gen.created_at).toLocaleString()}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === "floorplan" && (
        <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#07080d] space-y-4">
          <div className="flex justify-between items-center font-mono text-xs">
            <span className="text-white font-bold">Current Layout Grid</span>
            <Link href="/dashboard/floorplans" className="text-sky-400 hover:underline">
              Open Full Interactive Floor Plan Editor →
            </Link>
          </div>

          <div className="relative h-[400px] w-full rounded-2xl border border-white/10 bg-architectural-grid bg-[#0a0c10] p-4 overflow-hidden">
            {rooms.map((room: any) => (
              <div
                key={room.id}
                style={{
                  width: `${room.width * 12}px`,
                  height: `${room.height * 12}px`,
                  left: `${(room.x || 10) * 12}px`,
                  top: `${(room.y || 10) * 12}px`,
                  backgroundColor: `${room.color || "#0ea5e9"}22`,
                  borderColor: room.color || "#0ea5e9",
                }}
                className="absolute border-2 rounded-xl p-2 flex flex-col justify-between font-mono text-xs font-bold text-white shadow-lg"
              >
                <span>{room.name}</span>
                <span className="text-[10px] opacity-70">{room.width}&apos; × {room.height}&apos;</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === "boq" && (
        <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#07080d] font-mono text-xs space-y-4">
          <h3 className="text-sm font-bold text-white text-emerald-400">Bill of Quantities (BOQ) Schedule</h3>
          <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden">
            <div className="p-3 bg-white/5 font-bold grid grid-cols-4 text-white">
              <span>Category</span>
              <span>Specification / Material</span>
              <span>Estimated Quantity</span>
              <span>Est. Cost</span>
            </div>
            <div className="p-3 grid grid-cols-4 text-white/70">
              <span>Concrete & Structural</span>
              <span>Reinforced Concrete Frame</span>
              <span>120 m³</span>
              <span className="text-emerald-400">$64,000</span>
            </div>
            <div className="p-3 grid grid-cols-4 text-white/70">
              <span>Facade & Insulation</span>
              <span>Double-Stud Exterior R-30 Insulated Wall</span>
              <span>340 m²</span>
              <span className="text-emerald-400">$38,500</span>
            </div>
            <div className="p-3 grid grid-cols-4 text-white/70">
              <span>Glazing</span>
              <span>Triple-Pane Low-E Argon Windows</span>
              <span>85 m²</span>
              <span className="text-emerald-400">$29,000</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
