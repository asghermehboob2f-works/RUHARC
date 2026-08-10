"use client";

import React, { useEffect, useState } from "react";
import { Shield, Users, FolderKanban, Wand2, FileText, CheckCircle2 } from "lucide-react";

export default function AdminOverviewPage() {
  const [statsData, setStatsData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setStatsData(data);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  if (loading) {
    return <div className="p-12 text-center text-white/40 font-mono text-sm">Loading admin platform metrics...</div>;
  }

  const { stats, recentLogs, recentUsers } = statsData || {};

  return (
    <div className="space-y-8 font-sans">
      <div className="p-8 rounded-3xl bg-gradient-to-r from-amber-950/40 via-[#0a0c10] to-sky-950/40 border border-amber-500/20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 font-mono text-xs text-amber-400 mb-3">
          <Shield className="w-3.5 h-3.5" /> SYSTEM CONTROL CENTER
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          RUHARC Platform Administration
        </h1>
        <p className="text-sm text-white/60 font-sans mt-1">
          Monitor active system metrics, user registrations, AI generations, and audit logs.
        </p>
      </div>

      {/* METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
        <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#080a0f]">
          <div className="text-xs text-white/50 mb-1">TOTAL USERS</div>
          <div className="text-3xl font-extrabold text-white">{stats?.totalUsers || 0}</div>
          <div className="text-[10px] text-sky-400 mt-2">Registered Accounts</div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#080a0f]">
          <div className="text-xs text-white/50 mb-1">ACTIVE PROJECTS</div>
          <div className="text-3xl font-extrabold text-sky-400">{stats?.totalProjects || 0}</div>
          <div className="text-[10px] text-white/40 mt-2">Database Records</div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#080a0f]">
          <div className="text-xs text-white/50 mb-1">AI GENERATIONS</div>
          <div className="text-3xl font-extrabold text-indigo-400">{stats?.totalGenerations || 0}</div>
          <div className="text-[10px] text-indigo-300 mt-2">Concepts & Floorplans</div>
        </div>

        <div className="p-6 rounded-2xl glass-panel border border-white/10 bg-[#080a0f]">
          <div className="text-xs text-white/50 mb-1">AUDIT LOGS</div>
          <div className="text-3xl font-extrabold text-emerald-400">{stats?.totalAuditLogs || 0}</div>
          <div className="text-[10px] text-emerald-300 mt-2">Security Events</div>
        </div>
      </div>

      {/* LOGS AND USERS TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 font-mono text-xs">
        {/* Recent Audit Logs */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#07080c] space-y-4">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <FileText className="w-4 h-4" /> System Audit Logs
          </h3>
          <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden text-[11px]">
            {recentLogs?.map((log: any) => (
              <div key={log.id} className="p-3 flex justify-between items-center hover:bg-white/5">
                <div>
                  <span className="text-amber-300 font-bold">{log.action}</span>
                  <span className="text-white/60 block text-[10px] font-sans">{log.details}</span>
                </div>
                <div className="text-right text-white/40 text-[10px]">
                  {new Date(log.created_at).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Registered Users */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#07080c] space-y-4">
          <h3 className="text-sm font-bold text-sky-400 flex items-center gap-2">
            <Users className="w-4 h-4" /> Recent Registered Users
          </h3>
          <div className="divide-y divide-white/10 border border-white/10 rounded-2xl overflow-hidden text-[11px]">
            {recentUsers?.map((u: any) => (
              <div key={u.id} className="p-3 flex justify-between items-center hover:bg-white/5">
                <div>
                  <span className="text-white font-bold">{u.name}</span>
                  <span className="text-white/50 block text-[10px] font-mono">{u.email}</span>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-bold text-[10px]">
                    {u.role}
                  </span>
                  <span className="text-white/40 block text-[10px] mt-0.5">{u.profession}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
