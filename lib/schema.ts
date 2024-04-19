import { sql } from "@vercel/postgres";
import { relations } from "drizzle-orm";
import {
  bigint,
  boolean,
  jsonb,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/vercel-postgres";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const groups = pgTable("groups", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const groupsRelations = relations(groups, ({ many }) => ({
  members: many(members),
  sessions: many(sessions),
}));

export const members = pgTable("members", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("userId").notNull(),
  groupId: uuid("groupId").notNull(),
  admin: boolean("admin").default(false).notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const membersRelations = relations(members, ({ many }) => ({
  group: many(groups),
}));

export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  groupId: uuid("groupId").notNull(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  duration: bigint("duration", { mode: "number" }).notNull(),
  bookings: jsonb("bookings").default([]).notNull(),
  format: text("format").notNull(),
  sport: text("sport").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
});

export const sessionsRelations = relations(sessions, ({ one }) => ({
  group: one(groups),
}));

export const insertGroupSchema = createInsertSchema(groups);
export const selectGroupSchema = createSelectSchema(groups);

// Connect to Vercel Postgres
export const db = drizzle(sql);
