import {
  db,
  type MediaKitDailyStats,
  MediaKitEvents,
  type MediaKitEventType,
  type MediaKitStats,
  MediaKits,
} from "@repo/db";
import { eachDayOfInterval, format, subDays } from "date-fns";
import { and, eq, gte, sql } from "drizzle-orm";
import { Now } from "../current-date";
import { takeUnique } from "../take-unique";

export const MediaKitAnalyticsService = {
  async trackEvent(kitId: string, type: MediaKitEventType, meta?: Record<string, unknown>) {
    const [kit] = await db
      .select({ userId: MediaKits.userId })
      .from(MediaKits)
      .where(eq(MediaKits.id, kitId));

    if (!kit) return;

    await db.insert(MediaKitEvents).values({
      kitId,
      userId: kit.userId,
      eventType: type,
      meta,
    });
  },

  async getMetrics(kitId: string): Promise<MediaKitStats> {
    const result = takeUnique(
      await db
        .select({
          views: sql<number>`cast(count(*) filter (where ${MediaKitEvents.eventType} = 'view') as int)`,
          shares: sql<number>`cast(count(*) filter (where ${MediaKitEvents.eventType} = 'share') as int)`,
          contacts: sql<number>`cast(count(*) filter (where ${MediaKitEvents.eventType} = 'contact_click') as int)`,
        })
        .from(MediaKitEvents)
        .where(eq(MediaKitEvents.kitId, kitId))
    );

    return {
      views: result.views,
      shares: result.shares,
      contacts: result.contacts,
    };
  },

  async getGrowthChart(kitId: string, days = 30): Promise<MediaKitDailyStats[]> {
    const endDate = Now();
    const startDate = subDays(endDate, days);

    const rawData = await db
      .select({
        day: sql<string>`to_char(${MediaKitEvents.createdAt}, 'YYYY-MM-DD')`,
        views: sql<number>`count(*) filter (where ${MediaKitEvents.eventType} = 'view')`,
        shares: sql<number>`count(*) filter (where ${MediaKitEvents.eventType} = 'share')`,
        contacts: sql<number>`count(*) filter (where ${MediaKitEvents.eventType} = 'contact_click')`,
      })
      .from(MediaKitEvents)
      .where(and(eq(MediaKitEvents.kitId, kitId), gte(MediaKitEvents.createdAt, startDate)))
      .groupBy(sql`to_char(${MediaKitEvents.createdAt}, 'YYYY-MM-DD')`)
      .orderBy(sql`to_char(${MediaKitEvents.createdAt}, 'YYYY-MM-DD')`);

    const allDays = eachDayOfInterval({ start: startDate, end: endDate });

    const normalizedData = allDays.map((dateObj) => {
      const dayStr = format(dateObj, "yyyy-MM-dd");
      const found = rawData.find((r) => r.day === dayStr) || {
        views: 0,
        shares: 0,
        contacts: 0,
      };

      return {
        day: dateObj.toISOString(),
        views: found.views,
        shares: found.shares,
        contacts: found.contacts,
      };
    });

    return normalizedData;
  },
};
