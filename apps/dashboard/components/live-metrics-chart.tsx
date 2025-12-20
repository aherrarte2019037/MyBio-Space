"use client";

import type { MediaKitDailyStats } from "@repo/db";
import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { createClient } from "@/lib/utils/supabase/client";

interface Props {
  kitId: string;
  initialData: MediaKitDailyStats[];
}

export function LiveMetricsChart({ kitId, initialData }: Props) {
  const [data, setData] = useState(initialData);
  const supabase = createClient();

  useEffect(() => {
    const channel = supabase
      .channel(`chart-events-${kitId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "media_kit_events",
          filter: `kit_id=eq.${kitId}`,
        },
        (payload) => {
          const type = payload.new.event_type;

          setData((prevData) => {
            const newData = [...prevData];

            const lastIndex = newData.length - 1;
            const lastDay = { ...newData[lastIndex] };

            if (type === "view") lastDay.views += 1;
            else if (type === "share") lastDay.shares += 1;
            else if (type === "contact_click") lastDay.contacts += 1;
            newData[lastIndex] = lastDay;

            return newData;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [kitId, supabase]);

  const formatDate = (dateStr: string) => {
    return format(new Date(dateStr), "MMM d");
  };

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>30-Day Growth</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorShares" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#64748b" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#64748b" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorContacts" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#b45309" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#b45309" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="day"
                tickFormatter={formatDate}
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                minTickGap={30}
              />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: "8px",
                  border: "none",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                }}
                labelFormatter={formatDate}
              />
              <Area
                type="monotone"
                dataKey="views"
                stroke="var(--primary)"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorViews)"
                name="Views"
                animationDuration={500}
              />
              <Area
                type="monotone"
                dataKey="shares"
                stroke="#64748b"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorShares)"
                name="Shares"
                animationDuration={500}
              />
              <Area
                type="monotone"
                dataKey="contacts"
                stroke="#b45309"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorContacts)"
                name="Contacts"
                animationDuration={500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
