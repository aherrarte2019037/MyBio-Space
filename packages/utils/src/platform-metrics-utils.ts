import type {
  InstagramChartMetric,
  InstagramStatMetric,
  YouTubeChartMetric,
  YouTubeStatMetric,
} from "@repo/db/src/schema/analytics.sql";
import type { StatsOrChartBlockType } from "@repo/db/src/schema/media-kits.sql";
import {
  InstagramChartMetricsList,
  InstagramStatMetricsList,
  ProviderList,
  YouTubeChartMetricsList,
  YouTubeStatMetricsList,
} from "@repo/db/src/schema/schema.constants";

type AllMetrics =
  | YouTubeStatMetric
  | InstagramStatMetric
  | YouTubeChartMetric
  | InstagramChartMetric;

export const MetricLabels: Record<AllMetrics, string> = {
  all: "All",
  subscribers: "Subscribers",
  views: "Views",
  videos: "Videos",
  watchTimeMinutes: "Watch Time",
  subscribersGained: "Subscribers Gained",
  likes: "Likes",
  followers: "Followers",
};

export const ProviderLabels: Record<(typeof ProviderList)[number], string> = {
  youtube: "YouTube",
  instagram: "Instagram",
};

export const ProviderOptions = ProviderList.map((p) => ({
  label: ProviderLabels[p],
  value: p,
  disabled: p === "instagram",
}));

function getOptions(metrics: readonly AllMetrics[]) {
  return metrics.map((m) => ({
    label: MetricLabels[m],
    value: m,
  }));
}

export function getProviderMetricOptions(provider: string, blockType: StatsOrChartBlockType) {
  switch (provider) {
    case "youtube":
      if (blockType === "stats") return getOptions(YouTubeStatMetricsList);
      if (blockType === "chart") return getOptions(YouTubeChartMetricsList);
      break;
    case "instagram":
      if (blockType === "stats") return getOptions(InstagramStatMetricsList);
      if (blockType === "chart") return getOptions(InstagramChartMetricsList);
      break;
  }
  return [];
}
