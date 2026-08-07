# RUHARC — AI Architecture Operating System

> **Design Beyond Imagination.**  
> The future of intelligent architecture, spatial planning, BIM engineering, and real-time design orchestration.

---

## 🏛️ Enterprise Monorepo Overview

RUHARC is built as a production-grade, enterprise Monorepo adhering to Domain-Driven Design (DDD), Clean Architecture, and SOLID principles.

```
ruharc/
├── apps/
│   ├── web/                    # Next.js 16 Web Application (App Router, Tailwind, Framer Motion)
│   ├── api/                    # Laravel 12 REST & WebSockets API Gateway (DDD, Sanctum, Reverb)
│   ├── worker/                 # Asynchronous AI Worker Cluster (Redis Queue Consumers)
│   └── docs/                   # Full System Documentation & Specs
│
├── packages/
│   ├── ui/                     # Design System UI Library & Components
│   ├── types/                  # Shared TypeScript DTOs & Domain Types
│   ├── config/                 # Monorepo Configurations (ESLint, Prettier, TSConfig)
│   ├── utils/                  # Utility Functions & Parametric Calculators
│   ├── hooks/                  # Custom React Hooks
│   ├── constants/              # System Presets & Design Tokens
│   ├── validators/             # Zod Validation Schemas
│   ├── api-client/             # Monorepo SDK & WebSockets Client
│   └── shared/                 # Shared Business Helpers
│
├── infrastructure/
│   ├── docker/                 # Container Manifests (PostgreSQL 17, Redis, MinIO, Nginx)
│   ├── nginx/                  # Reverse Proxy & Load Balancers
│   ├── scripts/                # Database Backup & Maintenance Scripts
│   ├── monitoring/             # Prometheus, Health Collectors & Sentry Metrics
│   ├── deployment/             # Blue/Green Zero-Downtime Deployment Pipelines
│   └── backups/                # Backup & Disaster Recovery Policies
│
├── README.md                   # Project Overview & System Index
├── ARCHITECTURE.md             # System Architectural Blueprint & DDD Specs
├── API.md                      # REST & WebSockets API Documentation
├── SETUP.md                    # Local Setup & Quickstart Guide
├── DEPLOYMENT.md               # Production DevOps & Security Infrastructure
└── CONTRIBUTING.md             # Engineering Standards & Guidelines
```

---

## 🌟 Key Features & Workspaces

1. **Multi-Agent Orchestration Layer:** Coordinates 12+ specialized AI agents (*Intent Analyzer, Context Engine, Prompt Enhancer, Geometry Engine, Report Composer*).
2. **AI Architect Studio (`/dashboard/architect`):** Interactive 2D/3D BIM canvas with layer controls and dual-view version comparison.
3. **Construction Workspace (`/dashboard/construction`):** Automated Bill of Quantities (BOQ), material estimation, and budget tier selection.
4. **Visualization Studio (`/dashboard/visualization`):** Real-time ray-traced lighting simulation (*Morning to Night*) and cinema-grade presentation modes.
5. **Collaboration Hub (`/dashboard/collaboration`):** Real-time multiplayer presence with cursor position streaming, live comments, and approval tracking.
6. **Immutable Credit Ledger:** Microsecond credit deduction tracking with zero silent deductions.

---

## ⚡ Quickstart

```bash
# 1. Clone repo & install monorepo dependencies
pnpm install

# 2. Start local development infrastructure
docker-compose -f infrastructure/docker/docker-compose.yml up -d

# 3. Launch Next.js web application
npm run dev

# 4. Execute production Turborepo build pipeline
npm run build
```

---

## 📚 Technical Documentation Index

- 📘 [ARCHITECTURE.md](file:///c:/Users/anony/OneDrive/Desktop/ruharc/ARCHITECTURE.md) — Architectural Blueprint & DDD Domains
- 🎨 [FRONTEND_ARCHITECTURE.md](file:///c:/Users/anony/OneDrive/Desktop/ruharc/apps/docs/FRONTEND_ARCHITECTURE.md) — Master 10-Part Frontend Specification
- ⚙️ [BACKEND_ARCHITECTURE.md](file:///c:/Users/anony/OneDrive/Desktop/ruharc/apps/docs/BACKEND_ARCHITECTURE.md) — Master 10-Part Backend Specification
- 🧠 [AI_ARCHITECTURE.md](file:///c:/Users/anony/OneDrive/Desktop/ruharc/apps/docs/AI_ARCHITECTURE.md) — Master AI System Architecture Specification
- 📡 [API.md](file:///c:/Users/anony/OneDrive/Desktop/ruharc/API.md) — REST API Endpoints & WebSocket Channels


- ⚡ [SETUP.md](file:///c:/Users/anony/OneDrive/Desktop/ruharc/SETUP.md) — Local Development Setup
- 🚀 [DEPLOYMENT.md](file:///c:/Users/anony/OneDrive/Desktop/ruharc/DEPLOYMENT.md) — DevOps & Blue/Green Deployment
- 📐 [CONTRIBUTING.md](file:///c:/Users/anony/OneDrive/Desktop/ruharc/CONTRIBUTING.md) — Coding Standards & Guidelines

---

## 📄 License
Commercial Enterprise License — RUHARC Inc. All rights reserved.
