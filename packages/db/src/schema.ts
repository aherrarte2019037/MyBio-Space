import { pgTable, text, timestamp, uuid, jsonb, pgPolicy } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  email: text("email").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  pgPolicy("Users can view own profile", {
    for: "select",
    using: sql`auth.uid() = ${table.id}`,
  }),
  pgPolicy("Users can update own profile", {
    for: "update",
    using: sql`auth.uid() = ${table.id}`,
  }),
]);

export const mediaKits = pgTable("media_kits", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  handle: text("handle").notNull().unique(),
  theme: jsonb("theme").$type<{
    primary?: string;
    radius?: number;
  }>(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
}, (table) => [
  pgPolicy("Media kits are public", {
    for: "select",
    using: sql`true`,
  }),
  pgPolicy("Users can create own kits", {
    for: "insert",
    withCheck: sql`auth.uid() = ${table.userId}`,
  }),
  pgPolicy("Users can update own kits", {
    for: "update",
    using: sql`auth.uid() = ${table.userId}`,
  }),
  pgPolicy("Users can delete own kits", {
    for: "delete",
    using: sql`auth.uid() = ${table.userId}`,
  }),
]);

