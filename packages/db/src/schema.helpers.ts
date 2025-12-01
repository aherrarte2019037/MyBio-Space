import { timestamp } from "drizzle-orm/pg-core";
import type { AnalyticsStats, KitBlock, MediaKitTheme } from "./schema";

export const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
};

export const DefaultKitTheme: MediaKitTheme = {
  primary: "#171717",
  radius: 0.5,
};

export const DefaultKitBlocks: KitBlock[] = [
  { id: "1", type: "profile", data: {} },
  {
    id: "2",
    type: "separator",
    data: { title: "Stats" },
  },
  {
    id: "3",
    type: "stats",
    data: {
      provider: "youtube",
      metric: "all",
    },
  },
  {
    id: "4",
    type: "separator",
    data: { title: "Contact" },
  },
  { id: "5", type: "contact", data: { buttonText: "Get in touch" } },
];

export const DefaultAnalyticsStats: AnalyticsStats = {
  subscriberCount: 0,
  videoCount: 0,
  viewCount: 0,
  followerCount: 0,
  mediaCount: 0,
};
