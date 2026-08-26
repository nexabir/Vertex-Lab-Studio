"use client";

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";

export function RequestsTrendChart({ data }: { data: { date: string; count: number }[] }) {
  return (
    <div style={{ width: "100%", height: 220 }}>
      <ResponsiveContainer>
        <LineChart data={data} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
          <CartesianGrid stroke="#E7E4DC" vertical={false} />
          <XAxis
            dataKey="date"
            tick={{ fontSize: 11, fill: "#8A8996" }}
            interval={Math.ceil(data.length / 8)}
            axisLine={false}
            tickLine={false}
          />
          <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "#8A8996" }} axisLine={false} tickLine={false} width={28} />
          <Tooltip
            contentStyle={{ fontSize: 12, borderRadius: 8, border: "1px solid #E7E4DC" }}
            labelStyle={{ color: "#14131F", fontWeight: 500 }}
          />
          <Line type="monotone" dataKey="count" stroke="#6D4AFF" strokeWidth={2} dot={false} name="Requests" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
