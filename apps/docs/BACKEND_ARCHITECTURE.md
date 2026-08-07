# RUHARC — Backend Master Architecture & Specification

Version: 1.0.0  
Status: Production Master Specification  

---

## 🎯 Executive Summary & Architectural Philosophy

The RUHARC backend is not simply an API endpoint system—it is the **Enterprise Intelligence Engine** powering the entire AI Architecture Operating System. It orchestrates multi-provider generative AI models, parametric design reasoning, high-throughput asynchronous job queues, immutable financial ledgers, zero-trust security workflows, and real-time collaboration channels.

Designed as a **Domain-Driven Modular Monolith** (with full preparedness for future Microservice extraction), the backend strictly enforces clean architecture boundaries:
`Presentation -> Controllers -> Form Requests -> Services -> Actions -> Repositories -> Models -> Database`.

---

## 🏗️ 10-Part Backend Specification Index

### Part 01 — Enterprise Backend Vision & System Architecture
- **Core Purpose:** Invisible, ultra-fast, fault-tolerant intelligence engine powering Authentication, AI Orchestration, Project Lifecycles, Credit Economy, Document Reports, Media Pipelines, Real-Time Collaboration, Billing, and Analytics.
- **Architecture Style:** Modular Monolith built with Laravel 12 on PHP 8.4+, isolated domain modules, seamless future microservices transition path.
- **Primary Tech Stack:** Laravel 12, PHP 8.4+, PostgreSQL 17+, Redis (Cache & Queues), Laravel Reverb (WebSockets), Cloudflare R2 / AWS S3 (Object Storage), Laravel Sanctum (Auth), Spatie Permission (RBAC), Laravel Scout & Meilisearch (Search), Monolog & Laravel Pulse (Observability), Sentry (Error Tracking), DomPDF (Document Generation).
- **Topology:** `Internet -> Nginx Proxy -> Laravel Core -> Redis / Postgres -> S3 / R2 Storage -> AI Providers`.
- **Database & API Standards:** UUID v7 primary keys, soft deletes, normalized transactional design, RESTful versioned `/api/v1/` endpoints with standardized JSON payload structure.

---

### Part 02 — Enterprise Laravel Folder Structure & Domain Organization
- **App Layout:** Organized into `Console`, `Core`, `Domains`, `Infrastructure`, `Shared`, `Providers`, and `Support`.
- **Self-Contained Business Domains (`app/Domains/`):** `Authentication`, `Users`, `Organizations`, `Projects`, `Generation`, `PromptEngine`, `Canvas`, `Blueprint`, `Materials`, `Reports`, `Exports`, `Media`, `Billing`, `Credits`, `Payments`, `Notifications`, `Analytics`, `Search`, `Admin`, `System`, `Audit`, `APIKeys`, `Integrations`.
- **Domain Anatomy:** Each domain encapsulates its own `Controllers`, `Services`, `Actions`, `Repositories`, `DTOs`, `Requests`, `Policies`, `Models`, `Resources`, `Jobs`, `Events`, `Listeners`, `Enums`, `Exceptions`, `Contracts`, `Queries`, `Commands`, `Factories`, `Tests`, and `README.md`.
- **Strict Layering Rules:** Controllers handles validation/auth and delegating to Services (<200 lines). Services compose Actions for workflows. Actions perform single operations. Repositories manage database queries and caching. No business logic in Controllers, Models, Routes, or Views.

---

### Part 03 — Authentication, Authorization, Organizations & Enterprise Security
- **Security Principles:** Zero Trust, Least Privilege, Defense in Depth, Secure by Default, Privacy by Design, Audit Everything.
- **Authentication Stack:** Laravel Sanctum token engine, Argon2id password hashing, secure HTTP-only cookie sessions, mandatory email verification signed links, TOTP Multi-Factor Authentication (MFA), recovery codes, device trust session manager.
- **Organization & RBAC Hierarchy:** System Roles (`Super Admin`, `Platform Admin`, `Support`, `Moderator`, `User`) & Granular Organization Roles (`Owner`, `Administrator`, `Architect`, `Designer`, `Engineer`, `Reviewer`, `Client`, `Guest`).
- **Access & Keys:** Scope-based Personal and Organization API Keys (hashed at rest, rotatable, audited), signed temporary share links with password/expiration protection, immutable audit log recorder.

---

### Part 04 — Enterprise Database Design & Data Architecture
- **Engine & Design:** PostgreSQL 17+, strict third-normal-form (3NF) relational design, UUID v7 primary keys, timestamped audit fields (`created_by`, `updated_by`, `deleted_by`).
- **Core Schema Domain Clusters:**
  - *Identity & Auth:* `users`, `sessions`, `password_reset_tokens`, `email_verifications`, `mfa_devices`, `trusted_devices`, `api_keys`, `oauth_accounts`.
  - *Organizations & Workspaces:* `organizations`, `organization_members`, `organization_invitations`, `organization_settings`, `organization_billing`, `organization_api_keys`.
  - *Projects & Versions:* `projects`, `project_versions`, `project_status_history`, `project_members`, `project_templates`, `project_settings`, `project_constraints`.
  - *AI Orchestration:* `generations`, `generation_jobs`, `generation_steps`, `generation_prompts`, `generation_models`, `generation_outputs`, `generation_failures`, `generation_metrics`.
  - *Geometry & Design:* `blueprints`, `blueprint_layers`, `canvas_objects`, `rooms`, `materials`, `landscape_objects`.
  - *Financial Ledger:* `credit_wallets`, `credit_transactions`, `credit_packages`, `plans`, `subscriptions`, `invoices`, `payments`.

---

### Part 05 — AI Orchestration Engine, Multi-Provider Pipeline & Generation System
- **Pipeline Architecture:** `Prompt -> Understanding -> Reasoning -> Planning -> Validation -> Generation -> Verification -> Optimization -> Delivery`.
- **Vendor Abstraction (`AIProviderInterface`):** Pluggable backend adapter interface for OpenAI, Google Gemini, Anthropic Claude, xAI, OpenRouter, Azure OpenAI, Replicate, Fal.ai, NVIDIA NIM, and self-hosted models.
- **Dynamic Router & Model Registry:** Real-time routing decision engine based on latency, cost, model capability, quality scores, queue length, and regional compliance.
- **Sub-Engines:**
  - *Prompt Engine:* Natural language sanitization, intent extraction, dimension parsing, budget & style mapping.
  - *Architect Interview Engine:* Context gap analyzer generating adaptive clarifying questions until confidence meets threshold.
  - *Knowledge Engine:* Architectural domain rules (building codes, climate zoning, structural relationships).
  - *Constraint & Dimension Intelligence:* Real-time parametric constraint validation preventing impossible geometry.
- **Resilience:** Circuit breaker pattern, multi-provider fallback chains, localized object-level image editing, confidence score evaluator.

---

### Part 06 — Queue System, Background Jobs, Events, WebSockets & Real-Time Processing
- **Queue Architecture:** Redis Queue driver managed by Laravel Horizon with 9 priority queues (`critical`, `high`, `default`, `generation`, `reports`, `exports`, `media`, `emails`, `notifications`, `analytics`, `low`).
- **Background Execution:** All heavy operations (AI inference, blueprint processing, PDF compilation, image optimization, search indexing) execute asynchronously via idempotent, retry-safe background jobs.
- **Real-Time Layer:** Laravel Reverb WebSockets broadcasting state changes on private/presence channels (`User`, `Organization`, `Project`, `Generation`, `Notification`, `Admin`). Live multi-stage progress streaming (0–100%).
- **Job Reliability:** Idempotency keys, exponential backoff retries, Dead Letter Queue (DLQ) inspection, job batching, and chained pipelines.

---

### Part 07 — Enterprise Storage Architecture, Media Management & Export System
- **Object Storage Foundation:** Swappable S3-compatible backend (Cloudflare R2 / AWS S3) with private bucket privacy and SHA-256 deduplication.
- **Media Pipeline:** Asynchronous image optimization, automatic aspect-aware thumbnail generation, WebP/AVIF format conversion, automated media tagging and full-text metadata indexing.
- **Signed URL Delivery:** Temporary authorization token generation for private asset downloads.
- **Export Processing Engine:** Queue-backed multi-format compilation engine supporting PDF project reports, PNG/JPEG renders, SVG/vector blueprints, ZIP archives with manifests, and DOCX summaries.

---

### Part 08 — Enterprise Billing, Credit Engine & Payment Architecture
- **Ledger Philosophy:** Immutable double-entry credit ledger. Balance is always derived from transactions (`Purchase`, `Generation`, `Refund`, `Adjustment`, `Bonus`, `Expiration`).
- **Reservation Workflow:** Atomic credit reservation prior to generation execution. Success commits the transaction; failure releases the reservation instantly to prevent race conditions.
- **Gateway Abstraction:** Primary Razorpay payment processing with signature-verified webhooks, idempotency checks, tax handling (GST/VAT), multi-currency conversions, and subscription renewal management.

---

### Part 09 — Admin Panel, Platform Operations & System Management
- **Operations Center:** Comprehensive administrative management console for platform health monitoring, user/organization administration, project management, queue inspection, and feature flag management.
- **Observability & Diagnostics:** Live status tracking for Redis, Postgres, Queue workers, WebSockets, Storage, and AI provider latencies.
- **Provider Controls:** Dynamic model throttling, priority tuning, maintenance toggles, and prompt moderation review queues.
- **Security & Audit:** Immutable administrative audit logger recording every system alteration with user IP, user agent, timestamp, and target domain context.

---

### Part 10 — Backend Master Specification & Enterprise Engineering Standards
- **Quality Gates:** 100% PHP 8.4+ type safety (strict types, constructor promotion, readonly properties, typed enums), PSR-12 code style enforced via Laravel Pint, PHPStan static analysis at max level.
- **API Response Standards:** Uniform JSON envelope structure for Success (`status`, `message`, `data`, `meta`) and Error (`status`, `error`, `message`, `errors`).
- **Performance Thresholds:** API responses <150ms, Cached endpoints <30ms, Simple DB queries <20ms, Queue dispatch <20ms, WebSocket events <200ms.
- **Deployment & Engineering Standards:** Automated CI/CD pipeline, zero-downtime blue/green deployment strategy, environment-driven configurations, 100% automated test coverage across Unit, Feature, Integration, and Architecture test suites.

---

## 🛠️ Implementation Guidance & Next Steps

This Backend Architecture Specification serves as the binding blueprint for building the RUHARC enterprise backend within `apps/api`. All upcoming service implementations, API controllers, database migrations, and domain jobs must conform to the domain boundaries, layer dependencies, and security guidelines established herein.
