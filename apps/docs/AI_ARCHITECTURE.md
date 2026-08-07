# RUHARC — AI System Master Architecture & Specification

Version: 1.0.0  
Status: Production Master Specification  

---

## 🎯 Executive Summary & AI Philosophy

RUHARC is not a simple generative AI image tool—it is an **Enterprise AI Architecture Operating System**. Generative images are merely one visual communication layer. The core of RUHARC lies in its multi-agent intelligence, parametric spatial reasoning, adaptive requirement extraction, retrieval-augmented architectural knowledge, dynamic 3D scene graph editing, photorealistic multi-model rendering, conversational editing, and construction engineering intelligence.

Instead of a single LLM prompt box, RUHARC operates as a **Coordinated Team of Specialized AI Agents** supervised by a Master Architect AI, guiding projects through a structured lifecycle:
`Interview -> Analysis -> Knowledge Retrieval -> Spatial Planning -> Constraint Solving -> Parametric Blueprints -> Scene Graph -> Multi-Model Rendering -> Conversational Editing -> BOQ & Construction Analysis -> Reports & Exports`.

---

## 🏗️ 10-Part AI System Architecture Index

### Part 01 — AI Vision, Multi-Agent Architecture & Intelligence Foundation
- **Multi-Agent Ecosystem:** Master Architect AI supervises 15 specialized agents (`Architect`, `Interior`, `Landscape`, `Structural`, `Material`, `Electrical`, `Plumbing`, `HVAC`, `Cost Estimation`, `Code Compliance`, `Rendering`, `Report`, `Optimization`, `Review`, `Export`).
- **Communication & Memory:** Agents exchange strict JSON payloads (never unformatted text) with confidence scores. Shared memory incorporates `Project Context`, `User Preferences`, `Material Library`, `Knowledge Base`, and `Organization Policies`.
- **Conflict Resolution & Resilience:** Multi-agent disagreements resolved via confidence scoring, Master Agent re-evaluation, or user clarification. Automatic fallback provider chains and graceful feature reduction on provider errors.

---

### Part 02 — AI Interview Engine, Prompt Intelligence & Requirement Extraction
- **Architectural Interview Engine:** Converts vague human prompts (e.g., *"I want a modern villa"*) into comprehensive structured architectural specifications.
- **Interview Modes:**
  - *Quick Mode:* 5 targeted questions for rapid conceptual generation.
  - *Standard Mode:* 15–25 questions for balanced quality.
  - *Professional Mode:* 30–60 questions for maximum technical accuracy.
  - *Enterprise Mode:* Custom organization-defined intake workflows.
- **Entity & Dimension Extraction:** Automatic parsing of rooms, site orientation, topography, accessibility, climate, budget, materials, and unit normalization (mm, cm, m, ft, in). Prompt quality scoring (0–100).

---

### Part 03 — Architectural Knowledge Engine, RAG System & Design Intelligence
- **RAG Architecture:** Grounded LLM reasoning powered by PgVector (PostgreSQL) vector embeddings and multi-layered context retrieval.
- **Knowledge Layers:** `Global Knowledge -> Regional Standards -> Organization Rules -> Project Context -> User Preferences -> Current Prompt`.
- **Domain Libraries:** Parametric room standards, climate-driven material matrix, room adjacency graphs, accessibility rules (ADA/WCAG), structural concepts, and cost estimation databases.
- **Performance SLA:** Embedding lookup <30ms, Vector search <100ms, Knowledge assembly <150ms (Total RAG retrieval <250ms).

---

### Part 04 — AI Planning Engine, Spatial Reasoning & Layout Generation
- **Parametric Layout First:** Spatial planning occurs *before* image rendering. The engine calculates site orientation, functional zoning (Public, Private, Service, Outdoor), circulation efficiency, and dimension optimization.
- **Room Adjacency & Multi-Floor Planning:** Graph-based room relationship solver (`Kitchen -> Dining -> Living`, `Master -> Ensuite`). Multi-story alignment for staircases, elevators, and vertical utility shafts.
- **Concept Generation & Change Propagation:** Generates multiple design variations (Concepts A, B, C) with pros, cons, and confidence scores. Edits automatically propagate across adjacent rooms and circulation paths.

---

### Part 05 — Blueprint Intelligence Engine, CAD Generation & Parametric Design System
- **Parametric Building Model:** Living structured hierarchy (`Building -> Floor -> Zone -> Room -> Wall -> Door -> Window -> Furniture -> Dimensions`).
- **Drawing Output Types:** Automatic generation of 2D Architectural Floor Plans, Site Plans, Roof Plans, Furniture Layouts, Dimension Drawings, Elevations, Concept Sections, Electrical Layouts, and Presentation Sheets.
- **CAD & Export Integration:** Real-time grid alignment, symbol library, auto-dimensioning, and export formats (`PDF`, `SVG`, `PNG`, with future `DWG`, `DXF`, `IFC` support).

---

### Part 06 — 3D Intelligence Engine, Scene Graph & Interactive Design Editing
- **Editable 3D Scene Graph:** Full hierarchical object representation (`House -> Floor -> Room -> Object -> Material`). Eliminates the need for complete image regeneration on minor tweaks.
- **Natural Language Object Editing:** Supports natural language commands (*"Move dining table closer to window"*, *"Replace marble with oak flooring"*) by isolating transformations to specific scene nodes.
- **Synchronization:** Real-time bidirectional updates across Scene Graph, Parametric Blueprint, Material Library, Cost Estimator, and Render Engine.

---

### Part 07 — AI Rendering Engine, Multi-Model Orchestration & Photorealistic Visualization
- **Multi-Model Router:** Dynamic routing across OpenAI, Google Gemini, Anthropic Claude, OpenRouter, and self-hosted Diffusion models based on task, resolution, budget, latency, and cost.
- **Structured Prompt Generator:** Internal prompt compilation incorporating Scene, Lighting, Material, Camera, and Negative prompts (automatically filtering out wall distortion, floating objects, perspective flaws, and human artifacts).
- **Camera & Environmental Simulation:** Automated camera composition (lens selection, rule of thirds) combined with lighting (Morning, Noon, Golden Hour, Night, HDR) and weather simulation (Sunny, Rainy, Foggy, Seasons).
- **Render Pipelines & Quality Controls:** Iterative rendering (`Draft -> Review -> Refinement -> High Res`), automatic AI quality scoring, retries on failed renders, 2x/4x/8x AI Super-Resolution upscaling, and view package generation. SLA: Preview <20s, Professional Render <90s.

---

### Part 08 — AI Design Editor, Conversational Editing & Intelligent Co-Creation System
- **Non-Destructive Conversational Editing:** Continuous natural language refinement (*"Increase ceiling height"*, *"Move kitchen next to dining room"*, *"Make exterior Scandinavian"*, *"Reduce cost by 10%"*).
- **Partial Regeneration Engine:** Intelligently isolates changes so only affected rooms, surfaces, and views are recomputed rather than restarting the project.
- **Visual Impact & Branching:** Interactive Before-vs-After visual difference views, project branching (`Branch A: Modern`, `Branch B: Luxury`, `Branch C: Budget`), change impact cost analysis, and unlimited undo/redo history. SLA: Edit recognition <100ms, Object update <300ms, Partial regen <2s, Full sync <5s.

---

### Part 09 — Construction Intelligence, BOQ & Engineering Analysis
- **Quantity & Material Estimator:** Preliminary material quantity calculations (concrete, steel, brick, glass, wood, insulation, roofing, flooring).
- **Bill of Quantities (BOQ) Generator:** Itemized financial schedules with quantities, unit costs, sub-totals, contingency buffers, and regional price adjustments.
- **Sustainability & Buildability Analysis:** Preliminary carbon footprint estimation, energy efficiency suggestions, passive cooling recommendations, solar feasibility, and structural risk flags.
- **Disclaimer Enforcement:** Clear notice that AI outputs serve as preliminary conceptual planning estimates and must be verified by licensed architects, structural engineers, and quantity surveyors. SLA: Material Estimation <5s, Cost Calculation <3s, BOQ Generation <5s.

---

### Part 10 — AI Master Specification, Learning System & Future Intelligence Roadmap
- **Governance & Explainability:** Every AI recommendation includes rationale, benefits, trade-offs, confidence scores, and alternatives. Human-in-the-loop workflows for major structural or budget modifications.
- **Preference-Based Learning System:** Learns user and organization design preferences (materials, styles, templates) without silently altering project parameters.
- **Security & Memory Isolation:** Strict isolation across Session Memory, Project Memory, Organization Memory, and Knowledge Vectors with prompt injection protection.
- **Definition of AI Done:** Requirements satisfied, spatial constraints respected, explanations provided, confidence reported, outputs synchronized, unit tests passing, and documentation updated.

---

## 🛠️ Implementation Guidance & Domain Mapping

The AI System Architecture directly informs backend domain implementations within `apps/api/app/Domains/AI/`:
- `InterviewEngine/` -> Part 02 Intake & Requirement Extraction
- `KnowledgeEngine/` -> Part 03 RAG Retrieval & PgVector Integration
- `PlanningEngine/` -> Part 04 Spatial Graphs & Zoning Algorithms
- `BlueprintEngine/` -> Part 05 Parametric Model & CAD Export
- `SceneGraphEngine/` -> Part 06 3D Node Transformations & Sync
- `RenderingEngine/` -> Part 07 Multi-Model Orchestration & Upscaling
- `DesignEditor/` -> Part 08 Conversational Edits & Branching
- `ConstructionEngine/` -> Part 09 BOQ & Material Cost Calculation
- `Governance/` -> Part 10 Explainability, Memory Isolation & Safety

All AI pipelines maintain strict vendor abstraction (`AIProviderInterface`), explainable rationale tracking, and structured multi-agent JSON communication standards.
