"use client";

import React, { useState } from "react";
import { Grid, Plus, Trash2, Save, Sparkles, CheckCircle2 } from "lucide-react";

interface Room {
  id: string;
  name: string;
  width: number;
  height: number;
  x: number;
  y: number;
  color: string;
}

export default function FloorplansPage() {
  const [rooms, setRooms] = useState<Room[]>([
    { id: "r1", name: "Living Room", width: 22, height: 16, x: 4, y: 4, color: "#0ea5e9" },
    { id: "r2", name: "Kitchen & Dining", width: 18, height: 14, x: 28, y: 4, color: "#10b981" },
    { id: "r3", name: "Master Suite", width: 20, height: 16, x: 4, y: 22, color: "#6366f1" },
    { id: "r4", name: "Bathroom", width: 10, height: 10, x: 26, y: 22, color: "#ec4899" },
  ]);

  const [selectedRoomId, setSelectedRoomId] = useState<string | null>("r1");
  const [newRoomName, setNewRoomName] = useState("Guest Bedroom");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);

  const addRoom = () => {
    const newRoom: Room = {
      id: `r_${Date.now()}`,
      name: newRoomName || "New Room",
      width: 14,
      height: 12,
      x: 10,
      y: 10,
      color: "#f59e0b",
    };
    setRooms([...rooms, newRoom]);
    setSelectedRoomId(newRoom.id);
  };

  const deleteRoom = (id: string) => {
    setRooms(rooms.filter((r) => r.id !== id));
    if (selectedRoomId === id) setSelectedRoomId(null);
  };

  const updateRoom = (key: keyof Room, val: any) => {
    if (!selectedRoomId) return;
    setRooms(
      rooms.map((r) => (r.id === selectedRoomId ? { ...r, [key]: val } : r))
    );
  };

  const totalSqFt = rooms.reduce((acc, r) => acc + r.width * r.height, 0);

  const handleSaveLayout = () => {
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 font-sans">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight flex items-center gap-3 font-mono">
            <Grid className="w-8 h-8 text-sky-400" />
            2D Interactive Floorplan Canvas
          </h1>
          <p className="text-sm text-white/60 font-sans mt-1">
            Precision layout workspace. Add, position, resize, and dimension architectural room boundaries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <div className="px-3 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 font-mono text-xs border border-emerald-500/30 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" /> Layout Saved
            </div>
          )}
          <button
            onClick={handleSaveLayout}
            className="px-5 py-3 rounded-xl bg-sky-400 text-black font-bold font-mono text-xs hover:bg-sky-300 transition-all flex items-center gap-2 cursor-pointer shadow-lg shadow-sky-400/20"
          >
            <Save className="w-4 h-4" />
            <span>Save Floorplan</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SIDEBAR CONTROLS */}
        <div className="p-6 rounded-3xl glass-panel border border-white/10 bg-[#08090e] space-y-6 font-mono text-xs">
          <div>
            <div className="text-xs text-sky-400 font-bold mb-2">TOTAL COVERED AREA</div>
            <div className="text-3xl font-extrabold text-white">{totalSqFt} <span className="text-xs text-white/40 font-normal">sq.ft</span></div>
          </div>

          <div className="border-t border-white/10 pt-4 space-y-3">
            <h4 className="font-bold text-white uppercase text-white/70">Add New Room</h4>
            <input
              type="text"
              value={newRoomName}
              onChange={(e) => setNewRoomName(e.target.value)}
              placeholder="Room Name"
              className="w-full h-10 px-3 rounded-xl bg-white/5 border border-white/10 text-white"
            />
            <button
              onClick={addRoom}
              className="w-full h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" /> Add Room Block
            </button>
          </div>

          {/* ROOM EDITOR */}
          {selectedRoom && (
            <div className="border-t border-white/10 pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <h4 className="font-bold text-sky-300">Edit: {selectedRoom.name}</h4>
                <button
                  onClick={() => deleteRoom(selectedRoom.id)}
                  className="text-red-400 hover:underline text-[10px]"
                >
                  Delete
                </button>
              </div>

              <div>
                <label className="text-white/60 block mb-1">Room Name</label>
                <input
                  type="text"
                  value={selectedRoom.name}
                  onChange={(e) => updateRoom("name", e.target.value)}
                  className="w-full h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-white/60 block mb-1">Width (ft)</label>
                  <input
                    type="number"
                    value={selectedRoom.width}
                    onChange={(e) => updateRoom("width", Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Height (ft)</label>
                  <input
                    type="number"
                    value={selectedRoom.height}
                    onChange={(e) => updateRoom("height", Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-white/60 block mb-1">Position X</label>
                  <input
                    type="number"
                    value={selectedRoom.x}
                    onChange={(e) => updateRoom("x", Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
                <div>
                  <label className="text-white/60 block mb-1">Position Y</label>
                  <input
                    type="number"
                    value={selectedRoom.y}
                    onChange={(e) => updateRoom("y", Number(e.target.value))}
                    className="w-full h-9 px-3 rounded-xl bg-white/5 border border-white/10 text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CANVAS */}
        <div className="lg:col-span-3 p-6 rounded-3xl glass-panel border border-white/10 bg-[#07080d] min-h-[600px] relative overflow-hidden flex flex-col justify-between">
          <div className="flex justify-between items-center mb-4 font-mono text-xs text-white/50">
            <span>GRID SCALE: 1 UNIT = 1 FOOT</span>
            <span>SNAP TO GRID ACTIVE</span>
          </div>

          <div className="relative flex-1 rounded-2xl border border-white/10 bg-architectural-grid bg-[#090b10] p-4 overflow-auto min-h-[500px]">
            {rooms.map((room) => {
              const isSelected = room.id === selectedRoomId;
              return (
                <div
                  key={room.id}
                  onClick={() => setSelectedRoomId(room.id)}
                  style={{
                    width: `${room.width * 11}px`,
                    height: `${room.height * 11}px`,
                    left: `${room.x * 11}px`,
                    top: `${room.y * 11}px`,
                    backgroundColor: `${room.color}25`,
                    borderColor: room.color,
                  }}
                  className={`absolute border-2 rounded-2xl p-3 flex flex-col justify-between font-mono text-xs font-bold text-white transition-all cursor-pointer shadow-lg ${
                    isSelected ? "ring-2 ring-white scale-[1.01] z-20" : "hover:opacity-90"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span>{room.name}</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-black/50 text-sky-300">
                      {room.width * room.height} sq.ft
                    </span>
                  </div>
                  <div className="text-[10px] text-white/60">
                    {room.width}&apos; × {room.height}&apos;
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
