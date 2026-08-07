# RUHARC — REST & WebSocket API Specification

Version: 1.0.0

## 📡 API Conventions

- **Base URL:** `https://api.ruharc.io/api/v1`
- **Authentication:** Bearer Token via Laravel Sanctum header `Authorization: Bearer <token>`
- **Response Format:** JSON
- **WebSockets Transport:** `wss://reverb.ruharc.io`

---

## 🔑 Authentication Endpoints (`/api/v1/auth`)

### `POST /auth/register`
Creates a user account, initializes standard workspace, and grants default credits.

### `POST /auth/login`
Returns Sanctum Access Token and user role profile.

---

## 🏗️ Project Management Endpoints (`/api/v1/projects`)

### `GET /projects`
Returns a paginated list of projects owned by or shared with the authenticated user's organization.

### `POST /projects`
Creates a project record with default Scandinavian Modern parameters.

### `GET /projects/{uuid}`
Fetches full project details including active version snapshot and geometry summary.

---

## 🤖 AI Engine & Generation Endpoints (`/api/v1/ai`)

### `POST /ai/orchestrate`
Routes a user request through the Multi-Agent Gateway (*Intent Analyzer → Context Injection → Geometry Engine*).

### `POST /ai/jobs`
Dispatches an asynchronous AI Job (*Generation, Editing, Costing, Rendering*).
Returns `jobId` and WebSockets progress channel subscription (`jobs.{jobId}.progress`).

---

## 📊 Reports & Exports Endpoints (`/api/v1/reports`)

### `POST /reports/generate`
Compiles executive architectural summaries, BOQ estimates, and project health scores.

---

## 💳 Billing & Credits Endpoints (`/api/v1/billing`)

### `GET /billing/credits`
Returns the current immutable credit ledger balance and recent transactions.
