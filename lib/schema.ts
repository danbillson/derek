import { sql } from "@vercel/postgres";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
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

export const GroupsTable = pgTable("groups", {
  id: uuid("id").primaryKey(),
  name: text("name").notNull(),
  bio: text("bio").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const MembersTable = pgTable("members", {
  id: uuid("id").primaryKey(),
  userId: text("userId").notNull(),
  groupId: uuid("groupId").notNull(),
  admin: boolean("admin").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export const SessionsTable = pgTable("sessions", {
  id: uuid("id").primaryKey(),
  groupId: uuid("groupId").notNull(),
  location: text("location").notNull(),
  date: timestamp("date").notNull(),
  duration: bigint("duration", { mode: "number" }).notNull(),
  bookings: jsonb("bookings").default([]).notNull(),
  format: text("format").notNull(),
  sport: text("sport").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Group = InferSelectModel<typeof GroupsTable>;
export type NewGroup = InferInsertModel<typeof GroupsTable>;
export type Member = InferSelectModel<typeof MembersTable>;
export type NewMember = InferInsertModel<typeof MembersTable>;
export type Session = InferSelectModel<typeof SessionsTable>;
export type NewSession = InferInsertModel<typeof SessionsTable>;

// Connect to Vercel Postgres
export const db = drizzle(sql);
