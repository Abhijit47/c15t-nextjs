import {
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
  json,
  foreignKey,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const subject = pgTable("subject", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  externalId: text("externalId"),
  identityProvider: text("identityProvider"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  tenantId: text("tenantId"),
});

export const subjectRelations = relations(subject, ({ one, many }) => ({
  consents: many(consent, {
    relationName: "consent_subject",
  }),
  auditLogs: many(auditLog, {
    relationName: "auditLog_subject",
  }),
}));

export const domain = pgTable("domain", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  name: text("name").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  tenantId: text("tenantId"),
});

export const domainRelations = relations(domain, ({ one, many }) => ({
  consents: many(consent, {
    relationName: "consent_domain",
  }),
}));

export const consentPolicy = pgTable("consentPolicy", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  version: text("version").notNull(),
  type: text("type").notNull(),
  hash: text("hash"),
  effectiveDate: timestamp("effectiveDate").notNull(),
  isActive: boolean("isActive").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  tenantId: text("tenantId"),
});

export const consentPolicyRelations = relations(
  consentPolicy,
  ({ one, many }) => ({
    consents: many(consent, {
      relationName: "consent_consentPolicy",
    }),
  }),
);

export const runtimePolicyDecision = pgTable("runtimePolicyDecision", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  tenantId: text("tenantId"),
  policyId: text("policyId").notNull(),
  fingerprint: text("fingerprint").notNull(),
  matchedBy: text("matchedBy").notNull(),
  countryCode: text("countryCode"),
  regionCode: text("regionCode"),
  jurisdiction: text("jurisdiction").notNull(),
  language: text("language"),
  model: text("model").notNull(),
  policyI18n: json("policyI18n"),
  uiMode: text("uiMode"),
  bannerUi: json("bannerUi"),
  dialogUi: json("dialogUi"),
  categories: json("categories"),
  preselectedCategories: json("preselectedCategories"),
  proofConfig: json("proofConfig"),
  dedupeKey: text("dedupeKey").unique().notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const runtimePolicyDecisionRelations = relations(
  runtimePolicyDecision,
  ({ one, many }) => ({
    consents: many(consent, {
      relationName: "consent_runtimePolicyDecision",
    }),
  }),
);

export const consentPurpose = pgTable("consentPurpose", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  code: text("code").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
  tenantId: text("tenantId"),
});

export const consent = pgTable(
  "consent",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    subjectId: text("subjectId").notNull(),
    domainId: text("domainId").notNull(),
    policyId: text("policyId"),
    purposeIds: json("purposeIds").notNull(),
    metadata: json("metadata"),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    givenAt: timestamp("givenAt").notNull().defaultNow(),
    validUntil: timestamp("validUntil"),
    jurisdiction: text("jurisdiction"),
    jurisdictionModel: text("jurisdictionModel"),
    tcString: text("tcString"),
    uiSource: text("uiSource"),
    consentAction: text("consentAction"),
    runtimePolicyDecisionId: text("runtimePolicyDecisionId"),
    runtimePolicySource: text("runtimePolicySource"),
    tenantId: text("tenantId"),
  },
  (table) => [
    foreignKey({
      columns: [table.subjectId],
      foreignColumns: [subject.id],
      name: "consent_subject_subject_fk",
    })
      .onUpdate("restrict")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.domainId],
      foreignColumns: [domain.id],
      name: "consent_domain_domain_fk",
    })
      .onUpdate("restrict")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.policyId],
      foreignColumns: [consentPolicy.id],
      name: "consent_consentPolicy_policy_fk",
    })
      .onUpdate("restrict")
      .onDelete("restrict"),
    foreignKey({
      columns: [table.runtimePolicyDecisionId],
      foreignColumns: [runtimePolicyDecision.id],
      name: "consent_runtimePolicyDecision_runtimePolicyDecision_fk",
    })
      .onUpdate("restrict")
      .onDelete("restrict"),
  ],
);

export const consentRelations = relations(consent, ({ one, many }) => ({
  subject: one(subject, {
    relationName: "consent_subject",
    fields: [consent.subjectId],
    references: [subject.id],
  }),
  domain: one(domain, {
    relationName: "consent_domain",
    fields: [consent.domainId],
    references: [domain.id],
  }),
  policy: one(consentPolicy, {
    relationName: "consent_consentPolicy",
    fields: [consent.policyId],
    references: [consentPolicy.id],
  }),
  runtimePolicyDecision: one(runtimePolicyDecision, {
    relationName: "consent_runtimePolicyDecision",
    fields: [consent.runtimePolicyDecisionId],
    references: [runtimePolicyDecision.id],
  }),
}));

export const auditLog = pgTable(
  "auditLog",
  {
    id: varchar("id", { length: 255 }).primaryKey().notNull(),
    entityType: text("entityType").notNull(),
    entityId: text("entityId").notNull(),
    actionType: text("actionType").notNull(),
    subjectId: text("subjectId"),
    ipAddress: text("ipAddress"),
    userAgent: text("userAgent"),
    changes: json("changes"),
    metadata: json("metadata"),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    tenantId: text("tenantId"),
  },
  (table) => [
    foreignKey({
      columns: [table.subjectId],
      foreignColumns: [subject.id],
      name: "auditLog_subject_subject_fk",
    })
      .onUpdate("restrict")
      .onDelete("restrict"),
  ],
);

export const auditLogRelations = relations(auditLog, ({ one, many }) => ({
  subject: one(subject, {
    relationName: "auditLog_subject",
    fields: [auditLog.subjectId],
    references: [subject.id],
  }),
}));

export const private_c15t_settings = pgTable("private_c15t_settings", {
  id: varchar("id", { length: 255 }).primaryKey().notNull(),
  version: varchar("version", { length: 255 }).notNull().default("2.0.0"),
});
