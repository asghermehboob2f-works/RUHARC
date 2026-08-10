"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FolderKanban, PlusCircle, Trash2, ArrowRight, Search } from "lucide-react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    try {
      const res = await fetch("/api/projects");
      if (res.ok) {
        const data = await res.json();
        setProjects(data.projects || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const res = await fetch(`/api/projects/${id}`, { method: "DELETE" });
    if (res.ok) fetchProjects();
  };

  const filtered = projects.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.project_type.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3 font-mono">
            <FolderKanban className="w-8 h-8 text-sky-400" />
            Architectural Projects
          </h1>
          <p className="text-sm text-white/60 font-sans mt-1">
            Browse and manage all saved spatial concepts, floor plans, and project briefings.
          </p>
        </div>

        <div className="relative w-full sm:w-72 font-mono text-xs">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="w-full h-11 pl-9 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-sky-400 focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-white/40 font-mono text-sm">Loading project database...</div>
      ) : filtered.length === 0 ? (
        <div className="p-12 rounded-3xl glass-panel border border-white/10 bg-[#07080c] text-center text-white/60 font-mono text-sm">
          No matching architectural projects found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((proj) => (
            <div
              key={proj.id}
              className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#08090e] hover:border-sky-400/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 font-mono text-[10px]">
                  <span className="px-2.5 py-1 rounded-md bg-sky-500/20 text-sky-300 font-bold border border-sky-400/30">
                    {proj.project_type}
                  </span>
                  <span className="text-white/40">{new Date(proj.created_at).toLocaleDateString()}</span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 font-mono">{proj.title}</h3>
                <p className="text-xs text-white/60 font-sans line-clamp-2 mb-4">
                  {proj.description || "No project description provided."}
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
                  onClick={() => handleDelete(proj.id)}
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
  );
}
