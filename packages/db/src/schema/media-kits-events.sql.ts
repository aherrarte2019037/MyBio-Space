import { sql } from "drizzle-orm";
import { jsonb, pgPolicy, pgTable, uuid } from "drizzle-orm/pg-core";
import { Profiles } from "./account.sql";
import { mediaKitEventType } from "./enums.sql";
import { MediaKits } from "./media-kits.sql";
import type { MediaKitEventTypeList } from "./schema.constants";
import { timestamps } from "./schema.helpers";

export type MediaKitEventType = (typeof MediaKitEventTypeList)[number];

export type MediaKitStats = {
  views: number;
  shares: number;
  contacts: number;
};

export type MediaKitDailyStats = {
  day: string;
  views: number;
  shares: number;
  contacts: number;
};

export const MediaKitEvents = pgTable(
  "media_kit_events",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => Profiles.id, { onDelete: "cascade" })
      .unique(),
    kitId: uuid("kit_id")
      .references(() => MediaKits.id, { onDelete: "cascade" })
      .notNull(),
    eventType: mediaKitEventType("event_type").notNull(),
    meta: jsonb("meta"),
    ...timestamps,
  },
  (table) => [
    pgPolicy("Creators can view their own analytics", {
      for: "select",
      to: ["authenticated"],
      using: sql`auth.uid() = ${table.userId}`,
    }),
  ]
);
