# RUHARC — Enterprise Architecture & System Blueprint

Version: 1.0.0

## 🏛️ System Overview

RUHARC is an enterprise-grade AI Architecture Operating System built on Domain-Driven Design (DDD), Clean Architecture, and SOLID principles.

```
                                  RUHARC ECOSYSTEM TOPOLOGY
                                              │
                                     CDN + WAF + DDoS Protection
                                              │
                                    Global Load Balancer
                                              │
                         ┌────────────────────┴────────────────────┐
                         │                                         │
                    Next.js Web                              Mobile Client
                    (apps/web)                               (Future)
                         │                                         │
                         └────────────────────┬────────────────────┘
                                              │
                                         API Gateway
                                              │
                   ┌──────────────────────────┼──────────────────────────┐
                   │                          │                          │
              Auth Service                Core API                  AI Gateway
             (Laravel Sanctum)          (apps/api)                (apps/worker)
                   │                          │                          │
                   └────────────┬─────────────┴────────────┬─────────────┘
                                │                          │
                         PostgreSQL 17                   Redis
                           (Primary)                 (Cache/Queues)
                                │                          │
                                └─────────────┬────────────┘
                                              │
                                     S3 Object Storage
                                    (MinIO Local Dev)
```

---

## 📦 Directory Structure & Monorepo Layout

```
ruharc/
├── apps/
│   ├── web/                    # Next.js 16 Frontend (App Router, Tailwind, Framer Motion)
│   ├── api/                    # Laravel 12 Backend API (Domain-Driven Design, Sanctum, Reverb)
│   ├── worker/                 # AI Worker & Render Cluster (Queue Consumers)
│   └── docs/                   # System Documentation & Specifications
│
├── packages/
│   ├── ui/                     # Design System UI Component Library
│   ├── types/                  # Shared TypeScript Interfaces & DTOs
│   ├── config/                 # ESLint, Prettier, Tailwind & TSConfigs
│   ├── utils/                  # Utility Functions & Unit Converters
│   ├── hooks/                  # Custom React Hooks
│   ├── constants/              # System Constants & Presets
│   ├── validators/             # Zod Validation Schemas
│   ├── api-client/             # REST & WebSocket API Client
│   └── shared/                 # Shared Utilities
│
├── infrastructure/
│   ├── docker/                 # Docker Compose & Container Configurations
│   ├── nginx/                  # Nginx Reverse Proxy & Load Balancer Setup
│   ├── scripts/                # Database Backup & Maintenance Scripts
│   ├── monitoring/             # Prometheus, Grafana & Health Collectors
│   ├── deployment/             # Blue/Green CI/CD Deployment Rules
│   └── backups/                # Disaster Recovery Backup Policies
│
├── README.md                   # Enterprise System Overview
├── ARCHITECTURE.md             # System Architectural Specifications
├── API.md                      # REST & WebSocket API Documentation
├── SETUP.md                    # Local Development & Setup Guide
├── DEPLOYMENT.md               # Production Deployment & Infrastructure Guide
└── CONTRIBUTING.md             # Engineering Standards & Code Quality Guide
```

---

## 🎯 Domain Driven Design (DDD) & Service Layer

Business logic is strictly isolated inside Domain Modules within `apps/api/app/Domains/`:

1. **Auth & Users Domain:** Zero Trust Sanctum token handling, Argon2id hashing, Argon MFA.
2. **Projects Domain:** Relational project management, folder hierarchies, version snapshotting.
3. **Geometry Domain:** Parametric graph storage (*Rooms, Walls, Openings, Furniture, Materials*).
4. **AI Domain:** Multi-agent pipeline orchestration (*Intent Analyzer, Prompt Enhancer, AI Interview Engine*).
5. **Reports Domain:** Automatic document intelligence composer (*PDF, DOCX, XLSX exports*).
6. **Billing Domain:** Atomic credit ledger with immutable transactions.
7. **Real-Time Collaboration Domain:** Laravel Reverb WebSockets presence indicators and live activity logs.

---

## 📚 Master Architecture Specifications

For detailed part-by-part domain specifications, refer to the docs package:

- 🎨 **Frontend Architecture Master Specification:** [`apps/docs/FRONTEND_ARCHITECTURE.md`](file:///c:/Users/anony/OneDrive/Desktop/ruharc/apps/docs/FRONTEND_ARCHITECTURE.md)
- ⚙️ **Backend Architecture Master Specification:** [`apps/docs/BACKEND_ARCHITECTURE.md`](file:///c:/Users/anony/OneDrive/Desktop/ruharc/apps/docs/BACKEND_ARCHITECTURE.md)
- 🧠 **AI System Master Architecture Specification:** [`apps/docs/AI_ARCHITECTURE.md`](file:///c:/Users/anony/OneDrive/Desktop/ruharc/apps/docs/AI_ARCHITECTURE.md)


