"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Users,
  MessageSquare,
  CheckCircle2,
  Clock,
  UserPlus,
  Shield,
  FileCheck,
  Video,
  Send,
  Sparkles,
  Kanban,
  CheckSquare,
} from "lucide-react";

export default function CollaborationWorkspacePage() {
  const [approvalStage, setApprovalStage] = useState<"Draft" | "Internal Review" | "Engineering Review" | "Client Review" | "Approved">("Engineering Review");

  const teamMembers = [
    { name: "Asgher Mehboob", role: "Lead Architect", status: "Online", avatar: "AM", color: "bg-sky-500" },
    { name: "Sarah Jenkins", role: "Structural Engineer", status: "Reviewing", avatar: "SJ", color: "bg-indigo-500" },
    { name: "David Chen", role: "MEP Consultant", status: "Editing", avatar: "DC", color: "bg-emerald-500" },
    { name: "Elena Rostova", role: "Client Representative", status: "Online", avatar: "ER", color: "bg-amber-500" },
  ];

  const activityLog = [
    { user: "Sarah Jenkins", action: "Approved structural column placement on Ground Floor", time: "12 mins ago" },
    { user: "Asgher Mehboob", action: "Updated Living Room ceiling height to 11.5 ft", time: "34 mins ago" },
    { user: "David Chen", action: "Added HVAC ductwork overlay to First Floor Plan", time: "1 hour ago" },
  ];

  return (
    <div className="space-y-6 font-mono">
      {/* WORKSPACE HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 glass-panel p-6 rounded-2xl border border-white/10">
        <div>
          <span className="text-xs font-bold text-sky-400 uppercase tracking-widest block mb-1 flex items-center gap-1.5">
            <Users className="w-4 h-4" /> RUHARC MULTIPLAYER COLLABORATION
          </span>
          <h1 className="text-2xl font-extrabold text-white">Team Review & Approval Center</h1>
          <p className="text-xs text-white/50">Real-time collaborative architectural workspace & audit log.</p>
        </div>

        {/* Live Action Buttons */}
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 rounded-xl bg-sky-500/20 text-sky-300 border border-sky-400/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer">
            <Video className="w-4 h-4 text-sky-400" /> Start AI Sync Meeting
          </button>
          <button className="px-4 py-2 rounded-xl bg-white text-black font-bold text-xs flex items-center gap-1.5 cursor-pointer">
            <UserPlus className="w-4 h-4" /> Invite Team Member
          </button>
        </div>
      </div>

      {/* APPROVAL PIPELINE STATUS BAR */}
      <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <span className="text-white/50 font-bold">PROJECT APPROVAL WORKFLOW</span>
          <span className="text-sky-400 font-bold">STAGE: {approvalStage.toUpperCase()}</span>
        </div>

        <div className="grid grid-cols-5 gap-2 text-center text-xs">
          {(["Draft", "Internal Review", "Engineering Review", "Client Review", "Approved"] as const).map((stage, idx) => {
            const isCurrent = stage === approvalStage;
            return (
              <button
                key={stage}
                onClick={() => setApprovalStage(stage)}
                className={`p-3 rounded-xl border transition-all cursor-pointer ${
                  isCurrent
                    ? "bg-sky-400 text-black font-bold border-sky-400 shadow-lg"
                    : "bg-white/5 border-white/10 text-white/60 hover:text-white"
                }`}
              >
                <div className="text-[10px] text-white/40 mb-1">0{idx + 1}</div>
                <div className="font-bold text-[11px] truncate">{stage}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TEAM MEMBERS & REAL-TIME ACTIVITY FEED GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Team Members List */}
        <div className="glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sky-400">
              <Users className="w-4 h-4" /> ACTIVE TEAM (4 ONLINE)
            </span>
            <span className="text-[10px] text-emerald-400">● Live Cursors Synced</span>
          </h3>

          <div className="space-y-3 text-xs">
            {teamMembers.map((member, i) => (
              <div key={i} className="p-3 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full ${member.color} flex items-center justify-center font-bold text-white text-xs`}>
                    {member.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-white">{member.name}</div>
                    <div className="text-[10px] text-white/50">{member.role}</div>
                  </div>
                </div>
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold">
                  {member.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-white/10 space-y-4">
          <h3 className="text-xs font-bold text-white flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-sky-400">
              <Clock className="w-4 h-4" /> REAL-TIME PROJECT AUDIT LOG
            </span>
            <span className="text-[10px] text-white/40">Filtered by Current Version (v5.0)</span>
          </h3>

          <div className="space-y-3 text-xs">
            {activityLog.map((act, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FileCheck className="w-4 h-4 text-sky-400 shrink-0" />
                  <div>
                    <span className="font-bold text-white">{act.user}: </span>
                    <span className="text-white/70">{act.action}</span>
                  </div>
                </div>
                <span className="text-[10px] text-white/40 shrink-0">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
