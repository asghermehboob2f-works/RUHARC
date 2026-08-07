# RUHARC — Local Development & Setup Guide

Version: 1.0.0

## 🛠️ Prerequisites

- **Node.js:** v20.x or later
- **pnpm:** v9.x or later
- **PHP:** v8.4 or later
- **Composer:** v2.x
- **Docker & Docker Compose:** Required for Redis, PostgreSQL 17, and MinIO storage.

---

## ⚡ Quick Start (Local Environment)

### 1. Clone & Install Monorepo Dependencies
```bash
git clone https://github.com/asghermehboob2f-works/RUHGEN.git ruharc
cd ruharc
pnpm install
```

### 2. Start Infrastructure Containers
```bash
docker-compose -f infrastructure/docker/docker-compose.yml up -d
```

### 3. Run Web Application
```bash
npm run dev
```
Open `http://localhost:3000` to view the web app.

### 4. Verify Monorepo Build Pipeline
```bash
npm run build
```
Runs Turbo pipeline to compile packages and web application cleanly.
