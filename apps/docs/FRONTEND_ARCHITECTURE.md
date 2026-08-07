# RUHARC — Frontend Master Architecture & Specification

Version: 1.0.0  
Status: Production Master Specification  

---

## 🎯 Executive Summary & Architectural Philosophy

The RUHARC frontend is an intelligent, real-time **Architectural Operating System** running entirely inside the browser. It combines professional architectural modeling software (*CAD/BIM*), real-time generative AI assistance, and seamless team collaboration into an ultra-premium, glassmorphic desktop web experience inspired by Apple, Linear, Arc Browser, Notion, Framer, and Figma.

Built around the core experience pyramid of **Beauty, Usability, Speed, Reliability, and Trust**, the UI provides an invisible creative workspace keeping architects and designers in continuous flow.

---

## 🏗️ 10-Part Frontend Specification Index

### Part 01 — Frontend Vision, Interaction Philosophy & Operating System UX
- **Operating System Metaphor:** Functions as an in-browser operating system for spatial planning rather than a traditional SaaS dashboard.
- **Visual Identity:** Minimal Luxury, Dark-First theme, Glassmorphism surfaces, soft ambient blurs, depth elevation layering, and responsive variable typography.
- **Core Interaction Tools:**
  - *Command Palette (`Ctrl + K`):* Global keyboard-driven search for projects, commands, settings, AI tools, exports, and recent files.
  - *Floating AI Copilot:* Always-available context-aware assistant aware of active selection, project state, and revision history.
  - *Dockable Panel System:* Detachable, resizable property inspectors, layers, AI chat, and asset libraries.
  - *Contextual Menus:* Object-level right-click action menus for AI suggestions, quick properties, duplicates, and history.
  - *Multi-File Drag & Drop:* Ingest images, PDFs, material swatches, blueprints, and templates.
- **Performance SLA:** Initial Load <2s, Interaction latency <16ms (60 FPS), Panel animations 60 FPS, Search <100ms.

---

### Part 02 — Landing Page, Marketing Experience & Brand Identity
- **First Impression Target:** "How is this even a website?" 5-second initial WOW factor showcasing an evolving live 3D architecture hero scene.
- **13-Section Page Layout:**
  1. *Hero (100vh split screen with interactive evolving 3D house/blueprint)*
  2. *Trusted By (Animated partner logos)*
  3. *Interactive Demo (Mini working simulation)*
  4. *Why RUHARC (Animated interactive cards)*
  5. *AI Workflow Timeline (Vertical animated timeline)*
  6. *Live Design Canvas (Try-before-login interactive canvas)*
  7. *Feature Grid (3D hover glass cards)*
  8. *Comparison Table (CAD vs AI Image Generators vs RUHARC)*
  9. *Pricing (Animated cards with monthly/yearly/enterprise tiers)*
  10. *Testimonials (Video/image social proof)*
  11. *FAQ (Searchable AI accordion)*
  12. *Final CTA (Minimal high-conversion banner)*
  13. *Footer (Structured documentation & company links)*
- **Performance:** Lighthouse score 95+, GPU-accelerated Framer Motion & GSAP animations, server-rendered SEO metadata.

---

### Part 03 — Authentication, Onboarding & Project Creation UX
- **Creative Studio Auth Experience:** Fast, minimal OAuth (Google, Microsoft, Apple, GitHub), Magic Links, and Enterprise SSO.
- **First Project Wizard:** 5-step intake collecting project name, building type, units, style preference, budget, and timeline with smart defaults.
- **Template & AI Intake Options:** Blank project, Residential Villa, Apartment, Office, Retail, School, Landscape, Renovation, or AI intake from prompts, sketches, CAD, PDF, or reference images.
- **Auto-Save & Offline Resilience:** Continuous background saving with revision recovery snapshots, toast notifications, and offline queueing. SLA: Sign In <2s, Project Creation <3s, Workspace Load <3s.

---

### Part 04 — Workspace Architecture & Infinite Canvas System
- **Software Fusion Architecture:** Combines features from Figma, Autodesk, Apple Vision Pro, Notion, Blender, and Linear.
- **Workspace Layout Topology:** Top Nav Bar, Resizable Left Panel (Explorer, Layers, Assets), Resizable Right Inspector (Properties, Materials, AI Copilot), Bottom Status Bar (Zoom, Coordinates, Sync, AI Queue), Center Infinite Canvas.
- **Canvas Modes:** 2D Blueprint, 3D Viewport, Hybrid Split View, Presentation Mode, Version Comparison, Review Mode, Construction View.
- **Infinite Canvas Features:** Multi-object selection (lasso, group), transform gizmos (move, rotate, scale, mirror, snap), smart guide alignment, adaptive grids, rulers, mini map, layers, and workspace tabs. SLA: Canvas Pan 60 FPS, Zoom 60 FPS, Selection <20ms, Object Update <50ms.

---

### Part 05 — AI Copilot & Conversational Workspace
- **Permanent Architectural Collaborator:** Aware of active room/object selection, project history, blueprint model, 3D scene, materials, reports, and organization standards.
- **Copilot Modes:** Architect, Interior Designer, Landscape Designer, Construction Advisor, Material Expert, Blueprint Assistant, Accessibility Advisor, Energy Advisor.
- **Multi-Modal Entrances:** Text, Voice, Hand Sketch (drawing walls/rooms), Reference Images, Blueprints, PDFs, CAD files. Includes visual diff views, change explanations, and step-by-step action approvals. SLA: Response Start <1s, Context Assembly <200ms, Object Lookup <100ms.

---

### Part 06 — Blueprint Workspace & CAD-Style Editor
- **Parametric 2D CAD Environment:** Professional drafting interface supporting 2D Floor Plans, Site Plans, Roof Plans, Furniture Layouts, Sections, and Elevations.
- **Tools & Automation:** Wall/Door/Window placement, Smart Snapping, Auto Labeling (rooms, openings, levels), Auto Dimensioning, and Revision Clouds highlighting changes between versions.
- **Side-by-Side Comparison:** Compare Version A vs Version B with visual overlays and dimension difference tracking. Exports to PDF, SVG, PNG (Future DWG, DXF, IFC). SLA: Canvas 60 FPS, Selection <20ms, Dimension Update <100ms, Blueprint Sync <500ms.

---

### Part 07 — 3D Workspace, Real-Time Visualization & Scene Editing
- **Interactive 3D Digital Environment:** Real-time editable viewport synchronized with the Unified Building Model.
- **Modes & Viewports:** Orbit, Walkthrough, First-Person, Presentation, Construction.
- **Features:** GPU-accelerated rendering, transform gizmos, material editor (roughness, metalness, textures, thermal metadata), lighting controls (time of day, sun angle, weather simulation: sunny, rain, fog, snow), collision detection, and live clearance measurement overlays. SLA: Viewport 60 FPS, Selection <20ms, Transform <30ms, Scene Sync <300ms.

---

### Part 08 — Reports, Document Center & Export System
- **Live Interactive Documents:** Reports derived dynamically from the Unified Building Model (not static PDFs).
- **Document Types:** Project Summary, Blueprint Package, AI Design Report, Construction Estimate, BOQ, Material Schedule, Room Schedule, Landscape Report, Energy Summary, Accessibility Review, Revision Report, Presentation Deck.
- **Exports & Interactivity:** PDF, DOCX, PPTX, CSV, Excel, PNG, SVG, ZIP package. Clickable object links linking report elements directly back to 2D/3D canvas elements, digital approval tracking, and password-protected share links. SLA: Open Report <1s, Generate PDF <10s, Search <100ms.

---

### Part 09 — Real-Time Collaboration & Enterprise Team Workspace
- **Multiplayer Architecture:** Real-time collaboration experience (Figma/Notion style) across architects, designers, engineers, clients, and contractors.
- **Presence & Collaboration Features:** Color-coded live cursors, active selection indicators, Follow User viewport tracking mode (for client meetings), threaded object comments with `@mentions`, automated task creation from comments, and granular role permissions (Owner, Admin, PM, Architect, Designer, Engineer, Reviewer, Client, Commenter, Viewer).
- **Branching & Approvals:** Project branching (`Main`, `Client Review`, `Budget Option`), merge workflows, conflict locking, and enterprise audit logs. SLA: Presence Update <100ms, Cursor Sync <50ms, Comment Sync <200ms.

---

### Part 10 — Master Engineering Standards & Definition of Done
- **Monorepo Architecture:** Next.js 16 App Router, TypeScript Strict Mode, Tailwind CSS, shadcn/ui primitives, Framer Motion, Zustand, TanStack Query, React Three Fiber.
- **Definition of Done:** 100% Type-safe, Zero console/ESLint errors, 60 FPS GPU-accelerated motion, fully responsive (Desktop Studio, Tablet Review, Mobile Companion), WCAG AA keyboard accessible, and 100% test pass rate across unit and visual regression suites.
