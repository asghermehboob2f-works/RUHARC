"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FeatureCard } from "@/components/features/FeatureCard";
import { FloorPlanDemo } from "@/components/features/demos/FloorPlanDemo";
import { LightingEngineDemo } from "@/components/features/demos/LightingEngineDemo";
import { DimensionValidatorDemo } from "@/components/features/demos/DimensionValidatorDemo";
import { CostOptimizerDemo } from "@/components/features/demos/CostOptimizerDemo";
import { InteriorDesignerDemo } from "@/components/features/demos/InteriorDesignerDemo";
import { CollaborationDemo } from "@/components/features/demos/CollaborationDemo";
import { PromptEnhancerDemo } from "@/components/features/demos/PromptEnhancerDemo";
import { InterviewDemo } from "@/components/features/demos/InterviewDemo";

import {
  Wand2,
  Edit3,
  Ruler,
  Calculator,
  Sparkles,
  MessageSquare,
  Layers,
  History,
  Download,
  FileText,
  Sofa,
  Trees,
  Hammer,
  LayoutGrid,
  Sun,
  Wind,
  TrendingDown,
  Users,
  Compass,
  Heart,
  Grid,
  Building,
  Home,
  CheckCircle,
  AlertTriangle,
  PieChart,
  Activity,
  FolderCheck,
  Bot,
  Package,
} from "lucide-react";

export const FeatureGrid: React.FC = () => {
  const [filter, setFilter] = useState<"all" | "generators" | "interiors" | "enterprise">("all");

  return (
    <section className="relative z-10 bg-[#050505] text-white pt-[100px] pb-[140px] px-6 sm:px-12 lg:px-[120px] max-w-[1600px] mx-auto overflow-hidden">
      {/* SECTION TITLE & HEADER */}
      <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16">
        <span className="font-mono text-xs font-bold tracking-widest text-sky-400 uppercase mb-4 px-4 py-1.5 rounded-full bg-sky-500/10 border border-sky-400/20">
          NEXT GENERATION AI ARCHITECTURE
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 leading-tight">
          Everything You Need. <br className="hidden sm:block" />
          <span className="animate-text-gradient">Nothing You Don&apos;t.</span>
        </h2>

        <p className="text-base sm:text-xl text-white/70 font-normal leading-relaxed max-w-3xl">
          RUHARC combines intelligent architecture generation, professional planning tools, AI editing, construction intelligence, and modern collaboration into a single platform.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-8 glass-panel p-2 rounded-2xl border border-white/10">
          {[
            { id: "all", label: "All 30 Features" },
            { id: "generators", label: "Generators & Editors" },
            { id: "interiors", label: "Interiors & Landscapes" },
            { id: "enterprise", label: "Enterprise & BIM" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold transition-all cursor-pointer ${
                filter === tab.id
                  ? "bg-sky-400 text-black shadow-lg shadow-sky-400/20"
                  : "text-white/70 hover:text-white hover:bg-white/5"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 30 FEATURES GRID (12 Column Responsive Layout) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* PART 1 FEATURES (01 - 10) */}

        {/* 01. AI Design Generator */}
        {(filter === "all" || filter === "generators") && (
          <FeatureCard
            title="AI Design Generator"
            category="Generator"
            tag="Most Popular"
            description="Transform natural language into beautiful architectural concepts, complete floor plans, and realistic visualizations."
            icon={Wand2}
            delay={0.05}
          >
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 flex flex-col gap-3 font-mono text-xs">
              <div className="text-white/50 text-[10px]">Prompt Input:</div>
              <div className="text-sky-300">&quot;Design a luxury villa with Scandinavian architecture on a 60x80 ft plot.&quot;</div>
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
                <div className="bg-sky-400 h-full w-4/5 animate-pulse" />
              </div>
              <div className="flex justify-between text-[10px] text-white/50">
                <span>Generating Wireframe...</span>
                <span>80%</span>
              </div>
            </div>
          </FeatureCard>
        )}

        {/* 02. AI Architectural Editor (Flagship Large Card) */}
        {(filter === "all" || filter === "generators") && (
          <FeatureCard
            title="AI Architectural Editor"
            category="Flagship AI"
            tag="Live Canvas"
            description="Edit architecture naturally without starting over. Simply describe changes like 'Increase bedroom width by 3 feet' or 'Add rooftop garden' and watch the canvas update live."
            icon={Edit3}
            isLarge
            delay={0.1}
          >
            <div className="p-4 rounded-2xl bg-[#090b10] border border-sky-400/30 flex flex-col justify-between h-[220px]">
              <div className="flex items-center justify-between text-xs font-mono text-sky-400">
                <span>LIVE CANVAS MODIFICATION</span>
                <span className="animate-pulse">● EDITING READY</span>
              </div>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2 rounded bg-white/5 text-white/80">User: &quot;Increase master bedroom width by 3 feet.&quot;</div>
                <div className="p-2 rounded bg-sky-500/20 text-sky-300 border border-sky-400/30">
                  AI: Dimensions updated (16x18 ft). Furniture repositioned. Corridor adjusted.
                </div>
              </div>
            </div>
          </FeatureCard>
        )}

        {/* 03. Smart Dimension Engine */}
        {(filter === "all" || filter === "generators") && (
          <FeatureCard
            title="Smart Dimension Engine"
            category="Parametrics"
            description="Automatically calculates realistic room dimensions, wall thickness, door clearances, and human circulation paths without manual math."
            icon={Ruler}
            delay={0.15}
          >
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-2">
              <div className="flex justify-between text-white/70">
                <span>Bedroom Dimensions:</span>
                <span className="text-sky-400 font-bold">14×16 → 16×18 ft</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Wall Thickness:</span>
                <span className="text-white">9 Inches</span>
              </div>
              <div className="flex justify-between text-white/70">
                <span>Circulation Clearance:</span>
                <span className="text-emerald-400">3.5 ft Optimal</span>
              </div>
            </div>
          </FeatureCard>
        )}

        {/* 04. Construction Intelligence */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="Construction Intelligence"
            category="Estimates"
            description="AI calculates required bricks, steel, concrete, tiles, paint, electrical lines, and plumbing specs with regional price indexes."
            icon={Calculator}
            delay={0.2}
          >
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span>Steel Rebar (Fe-550):</span>
                <span className="text-white font-bold">14.2 Tons</span>
              </div>
              <div className="flex justify-between">
                <span>Concrete (M25 Grade):</span>
                <span className="text-white font-bold">180 Cu.m</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-bold">
                <span>Est. Construction Time:</span>
                <span>8.5 Months</span>
              </div>
            </div>
          </FeatureCard>
        )}

        {/* 05. AI Prompt Enhancer */}
        {(filter === "all" || filter === "generators") && (
          <FeatureCard
            title="AI Prompt Enhancer"
            category="Prompting"
            description="Turns basic user ideas like 'Modern House' into high-precision professional architectural prompts automatically."
            icon={Sparkles}
            delay={0.25}
          >
            <PromptEnhancerDemo />
          </FeatureCard>
        )}

        {/* 06. AI Interview */}
        {(filter === "all" || filter === "generators") && (
          <FeatureCard
            title="AI Interview Onboarding"
            category="Interactive"
            description="Instead of tedious forms, conversational AI interviews you about family size, kitchen preference, budget, and solar energy requirements."
            icon={MessageSquare}
            delay={0.3}
          >
            <InterviewDemo />
          </FeatureCard>
        )}

        {/* 07. Multi-Version Generation */}
        {(filter === "all" || filter === "generators") && (
          <FeatureCard
            title="Multi-Version Generation"
            category="Synthesis"
            description="Generate Version A (Modern), Version B (Luxury), and Version C (Minimalist) side-by-side to compare options before building."
            icon={Layers}
            delay={0.35}
          >
            <div className="grid grid-cols-3 gap-2 font-mono text-[10px]">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-sky-400 font-bold block mb-1">VER A</span>
                <span className="text-white/60">Modern</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-indigo-400 font-bold block mb-1">VER B</span>
                <span className="text-white/60">Luxury</span>
              </div>
              <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-center">
                <span className="text-emerald-400 font-bold block mb-1">VER C</span>
                <span className="text-white/60">Minimal</span>
              </div>
            </div>
          </FeatureCard>
        )}

        {/* 08. Project History */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="Project History & Versioning"
            category="Version Control"
            description="Track every modification made by AI or team members with 1-click restore functionality to revert to previous design branches."
            icon={History}
            delay={0.4}
          >
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-1.5">
              <div className="flex justify-between text-white/70">
                <span>v1.0 - Initial Concept</span>
                <span className="text-white/40">2 hrs ago</span>
              </div>
              <div className="flex justify-between text-sky-400 font-bold">
                <span>v1.2 - Added Balcony & Pool</span>
                <span>Active</span>
              </div>
            </div>
          </FeatureCard>
        )}

        {/* 09. One Click Export */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="One-Click File Exporter"
            category="Export"
            description="Export completed projects directly into PDF, PNG, SVG, ZIP, and upcoming CAD formats like DWG, DXF, and OBJ."
            icon={Download}
            delay={0.45}
          >
            <div className="flex flex-wrap gap-2 font-mono text-[10px]">
              {["PDF Report", "PNG 8K", "DXF CAD", "SVG Plan", "ZIP Bundle"].map((fmt, i) => (
                <span key={i} className="px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-400/20 text-sky-300">
                  {fmt}
                </span>
              ))}
            </div>
          </FeatureCard>
        )}

        {/* 10. Construction Reports */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="Construction Reports"
            category="Documentation"
            description="Instantly generate comprehensive printable PDF reports detailing room dimensions, elevations, material lists, and structural guidelines."
            icon={FileText}
            delay={0.5}
          >
            <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 font-mono text-xs flex items-center justify-between">
              <div>
                <div className="font-bold text-white">Full Spec Report PDF</div>
                <div className="text-white/50 text-[10px]">24 Pages • Material Specs Included</div>
              </div>
              <span className="px-3 py-1 rounded bg-sky-400 text-black font-bold">PDF</span>
            </div>
          </FeatureCard>
        )}

        {/* PART 2 FEATURES (11 - 20) */}

        {/* 11. AI Interior Designer */}
        {(filter === "all" || filter === "interiors") && (
          <FeatureCard
            title="AI Interior Designer"
            category="Interiors"
            tag="Premium AI"
            description="Generate interior room stylings for Living, Kitchen, Bedroom, and Office matching the exterior architecture with custom material controls."
            icon={Sofa}
            delay={0.1}
          >
            <InteriorDesignerDemo />
          </FeatureCard>
        )}

        {/* 12. AI Landscape Designer */}
        {(filter === "all" || filter === "interiors") && (
          <FeatureCard
            title="AI Landscape Designer"
            category="Outdoors"
            description="Design outdoor environments including gardens, swimming pools, walkways, driveways, gazebos, and outdoor kitchens."
            icon={Trees}
            delay={0.15}
          >
            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 font-mono text-xs text-emerald-300 space-y-1">
              <div>✓ Rainwater Harvesting Included</div>
              <div>✓ Low-Maintenance Native Plant Index</div>
              <div>✓ Perimeter Drainage Validated</div>
            </div>
          </FeatureCard>
        )}

        {/* 13. AI Renovation Mode */}
        {(filter === "all" || filter === "generators") && (
          <FeatureCard
            title="AI Renovation Mode"
            category="Retrofit"
            tag="Before / After"
            description="Upload existing photos or floor plans of older homes and let AI modernize the exterior, upgrade roofing, or add balcony extensions."
            icon={Hammer}
            delay={0.2}
          >
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex justify-between font-mono text-xs">
              <span className="text-white/50">BEFORE: 1980 Brick House</span>
              <span className="text-sky-400 font-bold">AFTER: Modern Glass Villa</span>
            </div>
          </FeatureCard>
        )}

        {/* 14. AI Furniture Planner */}
        {(filter === "all" || filter === "interiors") && (
          <FeatureCard
            title="AI Furniture Planner"
            category="Layout"
            description="Automatically places furniture respecting door swings, window light lines, human walking space, and aesthetic symmetry."
            icon={LayoutGrid}
            delay={0.25}
          >
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-1">
              <div className="text-white/60">Style: Scandinavian Minimalist</div>
              <div className="text-sky-400">Clearance: 36 inches around dining table ✓</div>
            </div>
          </FeatureCard>
        )}

        {/* 15. AI Lighting Engine */}
        {(filter === "all" || filter === "interiors") && (
          <FeatureCard
            title="AI Lighting Engine"
            category="Simulation"
            description="Simulate natural sun movement and artificial lighting across Morning, Midday Afternoon, Golden Hour Evening, and Night hours."
            icon={Sun}
            delay={0.3}
          >
            <LightingEngineDemo />
          </FeatureCard>
        )}

        {/* 16. AI Climate Optimizer */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="AI Climate Optimizer"
            category="Sustainability"
            description="Analyzes sun angles, wind directions, humidity, and rainfall to optimize roof overhangs, window positions, and solar panel arrays."
            icon={Wind}
            delay={0.35}
          >
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20 font-mono text-xs text-sky-300 space-y-1">
              <div>Solar Gain Reduction: -28%</div>
              <div>Natural Cross Ventilation: 94% Efficiency</div>
            </div>
          </FeatureCard>
        )}

        {/* 17. AI Cost Optimizer */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="AI Cost Optimizer"
            category="Budget"
            description="Reduce construction expenses without compromising aesthetics using alternative materials and optimized column placement."
            icon={TrendingDown}
            delay={0.4}
          >
            <CostOptimizerDemo />
          </FeatureCard>
        )}

        {/* 18. AI Collaboration (Large Card) */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="Real-Time Team Collaboration"
            category="Multiplayer"
            tag="Enterprise"
            description="Invite architects, structural engineers, builders, and clients into a live shared workspace with multiplayer cursors, inline comments, and approval workflows."
            icon={Users}
            isLarge
            delay={0.45}
          >
            <CollaborationDemo />
          </FeatureCard>
        )}

        {/* 19. Project Templates */}
        {(filter === "all" || filter === "generators") && (
          <FeatureCard
            title="Architectural Project Templates"
            category="Library"
            description="Kickstart projects using pre-validated templates for Luxury Villas, Modern Duplexes, Farmhouses, Commercial Towers, and Resorts."
            icon={Compass}
            delay={0.5}
          >
            <div className="flex items-center gap-2 font-mono text-[10px]">
              {["Luxury Villa", "Modern Farmhouse", "Commercial Office"].map((t, i) => (
                <span key={i} className="px-2.5 py-1 rounded bg-white/5 border border-white/10 text-white/70">
                  {t}
                </span>
              ))}
            </div>
          </FeatureCard>
        )}

        {/* 20. Community Showcase */}
        {(filter === "all" || filter === "generators") && (
          <FeatureCard
            title="Community Design Showcase"
            category="Inspiration"
            description="Explore trending, award-winning architectural designs submitted by top architects worldwide. Save inspiration to your personal workspace."
            icon={Heart}
            delay={0.55}
          >
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs flex justify-between">
              <span>Trending Villa Concept</span>
              <span className="text-rose-400 font-bold">♥ 4.8k Likes</span>
            </div>
          </FeatureCard>
        )}

        {/* PART 3 FEATURES (21 - 30 ENTERPRISE FEATURES) */}

        {/* 21. AI Floor Plan Generator (Large Flagship Card) */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="AI Floor Plan Generator"
            category="BIM Engine"
            tag="Architectural Standard"
            description="Generate fully dimensioned floor plans with room labels, door/window schedules, and circulation paths in interactive Dark Blueprint Mode."
            icon={Grid}
            isLarge
            delay={0.1}
          >
            <FloorPlanDemo />
          </FeatureCard>
        )}

        {/* 22. AI Elevation Designer */}
        {(filter === "all" || filter === "generators") && (
          <FeatureCard
            title="AI Elevation Designer"
            category="Facade"
            description="Generate front, rear, left, and right architectural elevations across Modern, Minimalist, Scandinavian, Mediterranean, and Luxury styles."
            icon={Building}
            delay={0.15}
          >
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs flex justify-between">
              <span className="text-white/60">Front Elevation:</span>
              <span className="text-sky-300 font-bold">Scandinavian Wood & Glass</span>
            </div>
          </FeatureCard>
        )}

        {/* 23. AI Room Planner */}
        {(filter === "all" || filter === "interiors") && (
          <FeatureCard
            title="AI Room Planner"
            category="Spatial"
            description="Calculates recommended square footage, ventilation openings, and color palettes for every room from master suites to prayer rooms."
            icon={Home}
            delay={0.2}
          >
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-1">
              <div>Living Room: 280 sq ft</div>
              <div className="text-emerald-400">Natural Light Index: 92%</div>
            </div>
          </FeatureCard>
        )}

        {/* 24. AI Material Engine */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="AI Material Engine"
            category="Engineering"
            description="Recommends specific building materials based on climate durability, maintenance cost, carbon footprint, and expected lifespan."
            icon={FolderCheck}
            delay={0.25}
          >
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-1">
              <div>Suggested Flooring: Engineered Hardwood</div>
              <div className="text-white/50 text-[10px]">Lifespan: 30+ Years • Low Maintenance</div>
            </div>
          </FeatureCard>
        )}

        {/* 25. AI Dimension Validator */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="AI Dimension Validator"
            category="Code Check"
            tag="Safety Alert"
            description="Scans blueprints for narrow hallways, small door clearances, or inadequate bathroom space before construction begins."
            icon={AlertTriangle}
            delay={0.3}
          >
            <DimensionValidatorDemo />
          </FeatureCard>
        )}

        {/* 26. AI Cost Breakdown */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="AI Cost Breakdown Dashboard"
            category="Finance"
            description="Interactive cost breakdown by foundation, walls, roofing, electrical, plumbing, labor, and taxes with dynamic budget tier sliders."
            icon={PieChart}
            delay={0.35}
          >
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs flex justify-between">
              <span>Foundation & Concrete:</span>
              <span className="text-white font-bold">32% of Budget</span>
            </div>
          </FeatureCard>
        )}

        {/* 27. AI Structural Insights */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="AI Structural Insights"
            category="Insights"
            description="Provides conceptual guidance on column grids, load distribution, and roof beam alignment. (Conceptual guidance only)."
            icon={Activity}
            delay={0.4}
          >
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs space-y-1">
              <div className="text-sky-300">Suggested Column Grid: 15×15 ft Spacing</div>
              <div className="text-white/40 text-[9px]">Note: Requires licensed structural engineer review.</div>
            </div>
          </FeatureCard>
        )}

        {/* 28. Smart Project Dashboard */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="Smart Project Dashboard"
            category="Workspace"
            description="Track project progress, AI health scores, version history, export bundles, and team member approvals in a unified dashboard."
            icon={Package}
            delay={0.45}
          >
            <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 font-mono text-xs flex justify-between items-center">
              <span>Project Health:</span>
              <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold">98% OPTIMAL</span>
            </div>
          </FeatureCard>
        )}

        {/* 29. AI Knowledge Assistant */}
        {(filter === "all" || filter === "generators") && (
          <FeatureCard
            title="AI Knowledge Assistant"
            category="Co-Pilot"
            description="Persistent architectural AI chat window that answers questions about building codes, ventilation improvements, and budget optimizations."
            icon={Bot}
            delay={0.5}
          >
            <div className="p-3 rounded-xl bg-sky-500/10 border border-sky-400/20 font-mono text-xs text-sky-300">
              AI Assistant: &quot;I recommend adding a 4ft skylight above the central staircase for optimal daylight.&quot;
            </div>
          </FeatureCard>
        )}

        {/* 30. One-Click Project Export Package */}
        {(filter === "all" || filter === "enterprise") && (
          <FeatureCard
            title="Enterprise Export Package"
            category="Package"
            description="Compiles high-res renders, floor plans, reports, material lists, cost summaries, and construction notes into a single ZIP archive."
            icon={CheckCircle}
            delay={0.55}
          >
            <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-400/30 text-emerald-300 font-mono text-xs flex justify-between items-center">
              <span>ZIP Export Package:</span>
              <span className="font-bold">DOWNLOAD READY</span>
            </div>
          </FeatureCard>
        )}
      </div>
    </section>
  );
};
