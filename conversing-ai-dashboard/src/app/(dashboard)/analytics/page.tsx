"use client";

import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, Cell,
} from "recharts";
import { Download, TrendingUp } from "lucide-react";
import {
  peakHoursData,
  conversionData,
  sentimentTrendData,
  topQuestionsData,
} from "@/lib/mock-data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg px-3 py-2 text-xs"
        style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.1)" }}
      >
        <p className="text-slate-400 mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-semibold">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-white font-bold text-lg">Analytics</h2>
          <p className="text-slate-400 text-sm mt-0.5">Deep insights into your AI receptionist performance</p>
        </div>
        <div className="flex items-center gap-2">
          <select
            className="text-xs rounded-lg px-3 py-1.5 text-slate-300 outline-none"
            style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <option>Last 30 days</option>
            <option>Last 7 days</option>
            <option>Last 90 days</option>
            <option>This year</option>
          </select>
          <button
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 transition-all hover:text-white"
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <Download size={13} /> Export
          </button>
        </div>
      </div>

      {/* KPI Summary row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label: "Call-to-Appointment Rate", value: "30.3%", change: "+4.1%", positive: true },
          { label: "Lead Conversion Rate", value: "12.1%", change: "+2.3%", positive: true },
          { label: "AI Resolution Rate", value: "94.2%", change: "+1.8%", positive: true },
          { label: "Avg Satisfaction Score", value: "4.7★", change: "+0.2", positive: true },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card p-4"
          >
            <p className="text-slate-400 text-xs mb-2">{kpi.label}</p>
            <p className="text-white text-2xl font-bold">{kpi.value}</p>
            <p className={`text-xs mt-1 font-medium ${kpi.positive ? "text-emerald-400" : "text-red-400"}`}>
              ↑ {kpi.change} vs last period
            </p>
          </motion.div>
        ))}
      </div>

      {/* Charts grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Peak hours */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm">Peak Call Hours</h3>
              <p className="text-slate-500 text-xs mt-0.5">When customers call most</p>
            </div>
            <span className="badge badge-blue">10–11 AM peak</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={peakHoursData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="label" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="value" name="Calls" fill="#3b82f6" radius={[3, 3, 0, 0]}>
                {peakHoursData.map((d, i) => (
                  <Cell
                    key={i}
                    fill={d.value === Math.max(...peakHoursData.map(x => x.value)) ? "#60a5fa" : "rgba(59,130,246,0.5)"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion trend */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm">Appointment Conversions</h3>
              <p className="text-slate-500 text-xs mt-0.5">Monthly bookings by AI</p>
            </div>
            <span className="badge badge-green">Growing ↑</span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={conversionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="convGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="label" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" name="Bookings" stroke="#10b981" strokeWidth={2} fill="url(#convGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Sentiment Trend */}
        <div className="glass-card p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-white font-semibold text-sm">Sentiment Trend</h3>
              <p className="text-slate-500 text-xs mt-0.5">Customer emotion over 4 weeks</p>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-slate-400"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" />Positive</span>
              <span className="flex items-center gap-1 text-slate-400"><span className="w-2 h-2 rounded-full bg-slate-400 inline-block" />Neutral</span>
              <span className="flex items-center gap-1 text-slate-400"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" />Negative</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={sentimentTrendData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="posGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
              <XAxis dataKey="label" tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#475569", fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="value" name="Positive" stroke="#10b981" strokeWidth={2} fill="url(#posGrad)" />
              <Area type="monotone" dataKey="value2" name="Neutral" stroke="#64748b" strokeWidth={1.5} fill="none" strokeDasharray="4 4" />
              <Area type="monotone" dataKey="value3" name="Negative" stroke="#ef4444" strokeWidth={1.5} fill="none" strokeDasharray="4 4" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Top Questions */}
        <div className="glass-card p-5">
          <div className="mb-4">
            <h3 className="text-white font-semibold text-sm">Top Customer Questions</h3>
            <p className="text-slate-500 text-xs mt-0.5">Most common reasons for calling</p>
          </div>
          <div className="space-y-3">
            {topQuestionsData.map((q, i) => {
              const max = Math.max(...topQuestionsData.map((x) => x.count));
              const pct = (q.count / max) * 100;
              return (
                <div key={q.question}>
                  <div className="flex items-center justify-between mb-1 text-xs">
                    <span className="text-slate-300">{q.question}</span>
                    <span className="text-slate-500 font-medium">{q.count}</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${pct}%` }}
                      transition={{ delay: 0.1 + i * 0.08, duration: 0.7, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: `hsl(${210 + i * 15}, 70%, 55%)` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* AI Performance Score */}
      <div
        className="glass-card p-6 flex items-center gap-6 flex-wrap"
        style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.08) 0%, rgba(139,92,246,0.05) 100%)" }}
      >
        <div
          className="w-24 h-24 rounded-2xl flex items-center justify-center shrink-0"
          style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.2), rgba(139,92,246,0.2))" }}
        >
          <div className="text-center">
            <p className="text-white text-2xl font-black">A+</p>
            <p className="text-slate-400 text-xs">Rating</p>
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-bold text-base mb-1 flex items-center gap-2">
            <TrendingUp size={16} className="text-blue-400" />
            AI Receptionist Performance Score
          </h3>
          <p className="text-slate-400 text-sm mb-3">
            Based on call resolution rate, customer sentiment, appointment conversion, and response accuracy.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Resolution Rate", value: "94.2%", color: "#10b981" },
              { label: "Sentiment Score", value: "88%", color: "#3b82f6" },
              { label: "Appt Conversion", value: "30.3%", color: "#a855f7" },
              { label: "Response Accuracy", value: "97.1%", color: "#f59e0b" },
            ].map((m) => (
              <div key={m.label} className="text-center">
                <p className="text-lg font-bold" style={{ color: m.color }}>{m.value}</p>
                <p className="text-slate-500 text-xs">{m.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
