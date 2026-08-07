/**
 * RUHARC Enterprise Backend Architecture — Database Schema & Data Models (Part 02)
 * Version 1.0.0
 * 
 * PostgreSQL 17 Relational Model with UUID v7 primary keys, version control snapshots,
 * geometry graph tables, credit transaction ledger, and security audit logs.
 */

export interface DbUser {
  id: string; // UUID v7
  email: string;
  name: string;
  role: "SuperAdmin" | "WorkspaceOwner" | "Architect" | "Engineer" | "Client" | "Viewer";
  mfaEnabled: boolean;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface DbOrganization {
  id: string;
  name: string;
  ownerId: string;
  plan: "Free" | "Starter" | "Professional" | "Studio" | "Enterprise";
  creditsBalance: number;
  createdAt: string;
}

export interface DbProject {
  id: string; // UUID v7
  organizationId: string;
  ownerId: string;
  currentVersionId: string;
  title: string;
  slug: string;
  projectType: "Residential" | "Commercial" | "Interior" | "Landscape";
  plotSize: string;
  estimatedBudget: number;
  estimatedAreaSqFt: number;
  healthScore: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface DbProjectVersion {
  id: string; // UUID v7
  projectId: string;
  versionNumber: number;
  summary: string;
  aiModelUsed: string;
  geometryHash: string;
  isCurrent: boolean;
  createdBy: string;
  createdAt: string;
}

export interface DbGeometryRoom {
  id: string;
  versionId: string;
  name: string;
  category: string;
  widthFt: number;
  lengthFt: number;
  heightFt: number;
  areaSqFt: number;
  wallMaterial: string;
  floorFinish: string;
}

export interface DbCreditTransaction {
  id: string;
  organizationId: string;
  userId: string;
  type: "Purchase" | "Usage" | "Refund" | "Bonus" | "Manual";
  creditsAdded: number;
  creditsRemoved: number;
  remainingBalance: number;
  reason: string;
  referenceId?: string; // Payment ID or AI Job ID
  timestamp: string;
}

export interface DbAuditLog {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  ipAddress: string;
  device: string;
  timestamp: string;
}
