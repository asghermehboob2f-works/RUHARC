"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  FolderKanban,
  PlusCircle,
  Wand2,
  Grid,
  TrendingUp,
  Sparkles,
  ArrowRight,
  Clock,
  Layers,
  CheckCircle2,
  Trash2,
} from "lucide-react";

export default function DashboardPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    projectType: "Residential",
    plotDimensions: "30x50 ft",
    estimatedBudget: 250000,
  });

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (e) {
      console.error("Failed to load projects:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleCreateProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProject),
      });
      if (res.ok) {
        setShowCreateModal(false);
        setNewProject({
          title: "",
          description: "",
          projectType: "Residential",
          plotDimensions: "30x50 ft",
          estimatedBudget: 250000,
        });
        fetchProjects();
      }
    } catch (e) {
      console.error("Failed to create project:", e);
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    try {
      const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProjects();
      }
    } catch (e) {
      console.error("Failed to delete project:", e);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      {/* Welcome Banner */}
      <div className="p-8 rounded-3xl bg-gradient-to-r from-sky-950/60 via-[#070d18] to-indigo-950/40 border border-sky-500/20 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-400 mb-3">
            <Sparkles className="w-3.5 h-3.5" /> ARCHITECTURAL WORKSPACE ACTIVE
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Architectural Workspace Overview
          </h1>
          <p className="text-sm text-white/60 font-sans mt-2 max-w-xl">
            Manage your AI generative concepts, floor plan layouts, structural specifications, and cost schedules in one workspace.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-5 py-3.5 rounded-xl bg-sky-400 text-black font-bold font-mono text-xs hover:bg-sky-300 transition-all shadow-lg flex items-center gap-2 cursor-pointer shrink-0"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Create New Project</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-5 rounded-2xl glass-panel border border-white/10 bg-[#07080d]">
          <div className="text-xs text-white/50 mb-1">TOTAL PROJECTS</div>
          <div className="text-3xl font-extrabold text-white">{projects.length}</div>
          <div className="text-[10px] text-sky-400 mt-2 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Live Database Synced
          </div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/10 bg-[#07080d]">
          <div className="text-xs text-white/50 mb-1">ACTIVE FLOORPLANS</div>
          <div className="text-3xl font-extrabold text-sky-400">{projects.length}</div>
          <div className="text-[10px] text-white/40 mt-2">2D Grid Layouts</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/10 bg-[#07080d]">
          <div className="text-xs text-white/50 mb-1">AI GENERATIONS</div>
          <div className="text-3xl font-extrabold text-indigo-400">12</div>
          <div className="text-[10px] text-indigo-300 mt-2">Spatial Concepts</div>
        </div>

        <div className="p-5 rounded-2xl glass-panel border border-white/10 bg-[#07080d]">
          <div className="text-xs text-white/50 mb-1">SYSTEM STATUS</div>
          <div className="text-3xl font-extrabold text-emerald-400">100%</div>
          <div className="text-[10px] text-emerald-300 mt-2">AI Engine Online</div>
        </div>
      </div>

      {/* Quick Launch Tools */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
        <Link
          href="/dashboard/architect"
          className="p-6 rounded-2xl glass-panel border border-sky-400/30 bg-[#080b12] hover:border-sky-400 transition-all group block"
        >
          <Wand2 className="w-8 h-8 text-sky-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-base font-bold text-white mb-1">AI Architecture Studio</h3>
          <p className="text-white/60 font-sans text-xs">Generate floor plan briefs, spatial requirements, and material schedules using AI.</p>
        </Link>

        <Link
          href="/dashboard/floorplans"
          className="p-6 rounded-2xl glass-panel border border-indigo-400/30 bg-[#080b12] hover:border-indigo-400 transition-all group block"
        >
          <Grid className="w-8 h-8 text-indigo-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-base font-bold text-white mb-1">2D Floorplan Canvas</h3>
          <p className="text-white/60 font-sans text-xs">Interactive layout design grid with room placement, wall dimensioning, and snap tools.</p>
        </Link>

        <Link
          href="/dashboard/projects"
          className="p-6 rounded-2xl glass-panel border border-emerald-400/30 bg-[#080b12] hover:border-emerald-400 transition-all group block"
        >
          <FolderKanban className="w-8 h-8 text-emerald-400 mb-4 group-hover:scale-110 transition-transform" />
          <h3 className="text-base font-bold text-white mb-1">Project Workspace</h3>
          <p className="text-white/60 font-sans text-xs">View all saved client projects, requirements history, and export documentation.</p>
        </Link>
      </div>

      {/* Projects List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderKanban className="w-5 h-5 text-sky-400" />
            Recent Architectural Projects
          </h2>
          <Link href="/dashboard/projects" className="text-xs text-sky-400 hover:underline">
            View All ({projects.length})
          </Link>
        </div>

        {loading ? (
          <div className="p-12 text-center text-white/40 font-mono text-sm">Loading project database...</div>
        ) : projects.length === 0 ? (
          <div className="p-12 rounded-3xl glass-panel border border-white/10 bg-[#07080c] text-center space-y-4">
            <FolderKanban className="w-12 h-12 text-white/30 mx-auto" />
            <h3 className="text-lg font-bold text-white font-mono">No Projects Created Yet</h3>
            <p className="text-xs text-white/60 font-sans max-w-md mx-auto">
              Start your first architectural design project to unlock AI floor planning and spatial concept generation.
            </p>
            <button
              onClick={() => setShowCreateModal(true)}
              className="px-6 py-3 rounded-xl bg-sky-400 text-black font-bold font-mono text-xs hover:bg-sky-300 transition-all cursor-pointer"
            >
              Create Project Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.map((proj) => (
              <div
                key={proj.id}
                className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#08090e] hover:border-white/20 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                    <span className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 font-bold border border-sky-400/30">
                      {proj.project_type || "Residential"}
                    </span>
                    <span className="text-white/40">{new Date(proj.created_at).toLocaleDateString()}</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 font-mono">{proj.title}</h3>
                  <p className="text-xs text-white/60 font-sans line-clamp-2 mb-4">
                    {proj.description || "No description provided."}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-white/50 border-t border-white/10 pt-3">
                    <div>Plot: <span className="text-white font-bold">{proj.plot_dimensions}</span></div>
                    <div>Budget: <span className="text-emerald-400 font-bold">${proj.estimated_budget?.toLocaleString()}</span></div>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 font-mono text-xs">
                  <Link
                    href={`/dashboard/projects/${proj.id}`}
                    className="text-sky-400 hover:underline font-bold flex items-center gap-1"
                  >
                    Open Workspace <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className="p-2 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                    title="Delete Project"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CREATE PROJECT MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg p-8 rounded-3xl glass-panel border border-white/15 bg-[#08090d] space-y-6 font-mono text-xs">
            <h3 className="text-2xl font-extrabold text-white">Create New Project</h3>

            <form onSubmit={handleCreateProject} className="space-y-4">
              <div>
                <label className="text-white/70 block mb-1 font-bold">Project Title</label>
                <input
                  type="text"
                  required
                  value={newProject.title}
                  onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                  placeholder="Modern Villa Concept"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-1 font-bold">Description / Brief</label>
                <textarea
                  rows={3}
                  value={newProject.description}
                  onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                  placeholder="3-bedroom luxury villa with solar roofing and passive cooling..."
                  className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none font-sans"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-white/70 block mb-1 font-bold">Project Type</label>
                  <select
                    value={newProject.projectType}
                    onChange={(e) => setNewProject({ ...newProject, projectType: e.target.value })}
                    className="w-full h-12 px-3 rounded-xl bg-[#111] border border-white/10 text-white focus:border-sky-400 focus:outline-none"
                  >
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Interior">Interior</option>
                    <option value="Landscape">Landscape</option>
                  </select>
                </div>

                <div>
                  <label className="text-white/70 block mb-1 font-bold">Plot Dimensions</label>
                  <input
                    type="text"
                    value={newProject.plotDimensions}
                    onChange={(e) => setNewProject({ ...newProject, plotDimensions: e.target.value })}
                    className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white focus:border-sky-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-5 py-3 rounded-xl bg-white/5 text-white/70 hover:bg-white/10"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-sky-400 text-black font-bold hover:bg-sky-300 cursor-pointer"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
