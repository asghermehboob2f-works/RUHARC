"use client";

import React, { useEffect, useState } from "react";
import { Settings, User, Lock, CheckCircle2, ShieldCheck, AlertCircle } from "lucide-react";

export default function SettingsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profession, setProfession] = useState("Architect");
  const [country, setCountry] = useState("United States");

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadProfile() {
      try {
        const res = await fetch("/api/user/profile");
        if (res.ok) {
          const data = await res.json();
          if (data.user) {
            setName(data.user.name || "");
            setEmail(data.user.email || "");
            setProfession(data.user.profession || "Architect");
            setCountry(data.user.country || "United States");
          }
        }
      } catch (e) {
        console.error(e);
      }
    }
    loadProfile();
  }, []);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage("");
    setErrorMessage("");

    try {
      const res = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          profession,
          country,
          currentPassword: currentPassword || undefined,
          newPassword: newPassword || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to update profile");
      }

      setMessage("Account profile and security updated successfully.");
      setCurrentPassword("");
      setNewPassword("");
    } catch (err: any) {
      setErrorMessage(err.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 font-sans max-w-4xl">
      <div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3 font-mono">
          <Settings className="w-8 h-8 text-sky-400" />
          Account & Security Settings
        </h1>
        <p className="text-sm text-white/60 font-sans mt-1">
          Manage your personal architectural profile, credentials, and password security.
        </p>
      </div>

      {message && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-mono flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <form onSubmit={handleUpdateProfile} className="space-y-6 font-mono text-xs">
        {/* PROFILE SECTION */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#08090e] space-y-4">
          <h3 className="text-sm font-bold text-white uppercase text-sky-400 flex items-center gap-2">
            <User className="w-4 h-4" /> Personal Profile
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/70 block mb-1 font-bold">Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="text-white/70 block mb-1 font-bold">Email Address (Read Only)</label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white/40 cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/70 block mb-1 font-bold">Profession</label>
              <select
                value={profession}
                onChange={(e) => setProfession(e.target.value)}
                className="w-full h-12 px-3 rounded-xl bg-[#111] border border-white/10 text-white"
              >
                <option value="Architect">Architect</option>
                <option value="Civil Engineer">Civil Engineer</option>
                <option value="Interior Designer">Interior Designer</option>
                <option value="Builder">Builder / Contractor</option>
              </select>
            </div>

            <div>
              <label className="text-white/70 block mb-1 font-bold">Country</label>
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>
        </div>

        {/* SECURITY SECTION */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#08090e] space-y-4">
          <h3 className="text-sm font-bold text-white uppercase text-indigo-400 flex items-center gap-2">
            <Lock className="w-4 h-4" /> Change Password
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-white/70 block mb-1 font-bold">Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>

            <div>
              <label className="text-white/70 block mb-1 font-bold">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="px-8 py-4 rounded-2xl bg-sky-400 text-black font-bold font-mono text-sm hover:bg-sky-300 transition-all shadow-lg flex items-center gap-2 cursor-pointer"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Save Profile Changes</span>
        </button>
      </form>
    </div>
  );
}
