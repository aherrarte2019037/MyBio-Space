import { shortId } from "@repo/utils";
import type { InferSelectModel } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";
import type {
  AnalyticsHistoryItem,
  AnalyticsStats,
  KitBlock,
  MediaKitTheme,
  Profiles,
} from "./schema";

// -- Types --
export type AnalyticsProviders = Record<
  string,
  { stats: AnalyticsStats; history: AnalyticsHistoryItem[] }
>;

export type Profile = InferSelectModel<typeof Profiles>;

// -- Common Columns --
export const timestamps = {
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
  deletedAt: timestamp("deleted_at"),
};

// -- Default Values --
export const DefaultKitTheme: MediaKitTheme = {
  primary: "#171717",
  radius: 0.5,
};

export const DefaultKitBlocks: KitBlock[] = [
  { id: shortId(), type: "profile", data: {} },
  {
    id: shortId(),
    type: "separator",
    data: { title: "Stats" },
  },
  {
    id: shortId(),
    type: "stats",
    data: {
      provider: "youtube",
      metric: "all",
    },
  },
  {
    id: shortId(),
    type: "separator",
    data: { title: "Contact" },
  },
  { id: shortId(), type: "contact", data: { buttonText: "Get in touch" } },
];

export const DefaultAnalyticsStats: AnalyticsStats = {
  subscriberCount: 0,
  videoCount: 0,
  viewCount: 0,
  followerCount: 0,
  mediaCount: 0,
};
