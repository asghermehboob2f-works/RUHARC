# RUHARC — Engineering Standards & Contributing Guide

Version: 1.0.0

## 📐 Code Quality Guidelines

1. **Clean Architecture & DDD:** Business logic MUST live inside Domain Services or Actions (`apps/api/app/Domains/`). Never write database logic in controllers or UI components.
2. **Type Safety:** Strict mode enabled across TypeScript packages. Avoid `any` types.
3. **Immutability:** Version records, credit transactions, and audit logs are append-only and immutable.
4. **Commit Messages:** Follow Conventional Commits format (`feat:`, `fix:`, `docs:`, `refactor:`).
