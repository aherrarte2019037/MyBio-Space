"use client";

import type { AnalyticsProvider, ChartBlockData } from "@repo/db";
import { MetricLabels, ProviderLabels } from "@repo/utils";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";

interface Props {
  data: ChartBlockData;
  analyticsProvider: AnalyticsProvider;
}

export function ChartBlock({ data, analyticsProvider }: Props) {
  const history = analyticsProvider[data.provider]?.history || [];
  const days = data.days;

  if (history.length === 0) return null;

  const chartData = history.slice(-days).reverse();

  return (
    <div className="group relative overflow-hidden rounded-4xl bg-stone-900 border border-stone-800 p-8 transition-all duration-500 hover:shadow-2xl">
      {/* Background Gradient - Subtle Teal/Dark */}
      <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(20,184,166,0.15)_0%,transparent_70%)] blur-3xl transition-all duration-700 group-hover:scale-125" />

      {/* Recessed "Live" Indicator (Dark Mode Version) */}
      <div className="absolute top-6 left-6 flex items-center justify-center">
        <div className="flex size-3 items-center justify-center rounded-full bg-stone-950 shadow-[inset_0_1px_3px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.1)]">
          <div className="size-1.5 rounded-full bg-[#17B26A] shadow-[0_0_8px_1.5px_rgba(23,178,106,0.6)] animate-pulse"></div>
        </div>
      </div>

      <div className="relative z-10 flex h-full flex-col items-center justify-between">
        <div className="space-y-1">
          <h3 className="font-serif text-3xl font-bold tracking-tight text-white">
            {MetricLabels[data.metric]} Growth
          </h3>
          <div className="flex items-center gap-2 text-stone-500">
            <span className="text-[10px] font-bold uppercase tracking-widest">
              {ProviderLabels[data.provider]}
            </span>
            <span className="size-0.5 rounded-full bg-stone-500" />
            <p className="text-[10px] font-bold uppercase tracking-widest">Last {days} days</p>
          </div>
        </div>

        <div className="h-[120px] w-full mt-6 -ml-2">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="chartGradientDark" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ff0000" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#ff0000" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis dataKey="date" hide />
              <Tooltip
                cursor={{ stroke: "#ff0000", strokeWidth: 1, strokeDasharray: "4 4", opacity: 0.5 }}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #44403c",
                  backgroundColor: "rgba(28, 25, 23, 0.95)",
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",
                  padding: "8px 12px",
                  color: "#fff",
                }}
                labelStyle={{ color: "#a8a29e", fontSize: "12px", marginBottom: "4px" }}
                itemStyle={{ color: "#ff0000", fontSize: "14px", fontWeight: "600", padding: 0 }}
              />
              <Area
                type="monotone"
                dataKey={data.metric}
                stroke="#ff0000"
                strokeWidth={3}
                fill="url(#chartGradientDark)"
                dot={false}
                activeDot={{
                  r: 4,
                  fill: "#1c1917", // stone-900 (bg color)
                  stroke: "#ff0000",
                  strokeWidth: 3,
                }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
