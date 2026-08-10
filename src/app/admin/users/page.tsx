"use client";

import React, { useEffect, useState } from "react";
import { Users, Search, Shield, Trash2 } from "lucide-react";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await fetch("/api/admin/users");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users || []);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId: string, newRole: string) => {
    const res = await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role: newRole }),
    });
    if (res.ok) fetchUsers();
  };

  const handleDeleteUser = async (userId: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    const res = await fetch(`/api/admin/users?userId=${userId}`, { method: "DELETE" });
    if (res.ok) fetchUsers();
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3 font-mono">
            <Users className="w-8 h-8 text-amber-400" />
            Platform User Management
          </h1>
          <p className="text-sm text-white/60 font-sans mt-1">
            View, modify role permissions, or remove user accounts across RUHARC.
          </p>
        </div>

        <div className="relative w-full sm:w-72 font-mono text-xs">
          <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full h-11 pl-9 pr-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:border-amber-400 focus:outline-none"
          />
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-white/40 font-mono text-sm">Loading user database...</div>
      ) : (
        <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#07080d] font-mono text-xs overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/10 text-white/50 text-[11px]">
                <th className="pb-3">NAME & EMAIL</th>
                <th className="pb-3">PROFESSION</th>
                <th className="pb-3">ROLE</th>
                <th className="pb-3">CREATED</th>
                <th className="pb-3 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-white/5">
                  <td className="py-4">
                    <div className="font-bold text-white">{u.name}</div>
                    <div className="text-[10px] text-white/40">{u.email}</div>
                  </td>
                  <td className="py-4 text-white/70">{u.profession || "Architect"}</td>
                  <td className="py-4">
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u.id, e.target.value)}
                      className="bg-[#111] border border-white/10 text-amber-300 font-bold px-2 py-1 rounded text-[11px]"
                    >
                      <option value="USER">USER</option>
                      <option value="ADMIN">ADMIN</option>
                      <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    </select>
                  </td>
                  <td className="py-4 text-white/40 text-[10px]">
                    {new Date(u.created_at).toLocaleDateString()}
                  </td>
                  <td className="py-4 text-right">
                    <button
                      onClick={() => handleDeleteUser(u.id)}
                      className="p-2 text-white/40 hover:text-red-400 transition-colors cursor-pointer"
                      title="Delete User"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
