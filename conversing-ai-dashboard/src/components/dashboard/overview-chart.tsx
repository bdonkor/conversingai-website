"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { callVolumeData, weeklyAppointmentsData, sentimentTrendData } from "@/lib/mock-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg px-3 py-2 text-xs"
        style={{
          background: "#0d1424",
          border: "1px solid rgba(255,255,255,0.1)",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
        }}
      >
        <p className="text-slate-400 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} className="font-semibold" style={{ color: p.color }}>
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function CallVolumeChart() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">Call Volume</h3>
          <p className="text-slate-500 text-xs mt-0.5">Total vs Answered calls this week</p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-blue-400 inline-block" />
            Total
          </span>
          <span className="flex items-center gap-1.5 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
            Answered
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <AreaChart data={callVolumeData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="label" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            name="Total"
            stroke="#3b82f6"
            strokeWidth={2}
            fill="url(#blueGrad)"
          />
          <Area
            type="monotone"
            dataKey="value2"
            name="Answered"
            stroke="#10b981"
            strokeWidth={2}
            fill="url(#greenGrad)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function AppointmentsChart() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">Appointments Booked</h3>
          <p className="text-slate-500 text-xs mt-0.5">By AI this week</p>
        </div>
        <span className="badge badge-green">+12% vs last week</span>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={weeklyAppointmentsData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="label" tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fill: "#475569", fontSize: 11 }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="value" name="Appointments" fill="#3b82f6" radius={[4, 4, 0, 0]}>
            {weeklyAppointmentsData.map((_, i) => (
              <Cell
                key={i}
                fill={i === weeklyAppointmentsData.length - 2 ? "#60a5fa" : "rgba(59,130,246,0.6)"}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function SentimentPieChart() {
  const data = [
    { name: "Positive", value: 88, color: "#10b981" },
    { name: "Neutral", value: 9, color: "#64748b" },
    { name: "Negative", value: 3, color: "#ef4444" },
  ];
  return (
    <div className="glass-card p-5">
      <div className="mb-4">
        <h3 className="text-white font-semibold text-sm">Sentiment Breakdown</h3>
        <p className="text-slate-500 text-xs mt-0.5">Customer satisfaction by call</p>
      </div>
      <div className="flex items-center gap-4">
        <ResponsiveContainer width={120} height={120}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={35}
              outerRadius={55}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, i) => (
                <Cell key={i} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <div className="space-y-2 flex-1">
          {data.map((d) => (
            <div key={d.name} className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                {d.name}
              </span>
              <span className="text-white text-xs font-semibold">{d.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
