"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Mail, MessageSquare, Send, CheckCircle2 } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#050505] text-white selection:bg-sky-500/30">
      <Navbar />

      <section className="pt-32 pb-20 px-6 sm:px-12 max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/30 font-mono text-xs text-sky-400 mb-6">
            <Mail className="w-4 h-4" /> GET IN TOUCH
          </div>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
            Contact the RUHARC Team
          </h1>
          <p className="text-white/60 font-sans text-sm sm:text-base max-w-xl mx-auto">
            Have questions about enterprise integration, custom AI architectural workflows, or partnerships? Send us a message.
          </p>
        </div>

        {submitted ? (
          <div className="p-12 rounded-3xl glass-panel border border-emerald-500/30 bg-[#081014] text-center space-y-4 font-mono">
            <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
            <h2 className="text-2xl font-bold text-white">Message Received</h2>
            <p className="text-sm text-white/60 font-sans">
              Thank you for reaching out! Our architectural engineering team will respond within 24 hours.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-8 sm:p-12 rounded-3xl glass-panel border border-white/10 bg-[#08090e] space-y-6 font-mono text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-white/70 block mb-2 font-bold">Your Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Sarah Jenkins"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-white/70 block mb-2 font-bold">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="architect@firm.com"
                  className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-white/70 block mb-2 font-bold">Subject</label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder="Enterprise API integration inquiry"
                className="w-full h-12 px-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-white/70 block mb-2 font-bold">Message</label>
              <textarea
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Tell us about your project requirements..."
                className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/30 focus:border-sky-400 focus:outline-none font-sans"
              />
            </div>

            <button
              type="submit"
              className="w-full h-14 rounded-2xl bg-sky-400 text-black font-bold font-mono text-sm hover:bg-sky-300 transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </button>
          </form>
        )}
      </section>
    </main>
  );
}
