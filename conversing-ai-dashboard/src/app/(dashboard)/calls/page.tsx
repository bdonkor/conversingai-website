"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, Filter, Phone, PhoneIncoming, Calendar, Shield } from "lucide-react";
import { mockCalls } from "@/lib/mock-data";
import {
  formatRelativeTime,
  formatDuration,
  getOutcomeColor,
  getOutcomeLabel,
  getSentimentColor,
} from "@/lib/utils";
import { Call } from "@/types";

const OUTCOMES = ["all", "appointment_booked", "lead_captured", "spam", "information_provided", "transferred", "callback_requested"];
const SENTIMENTS = ["all", "positive", "neutral", "negative"];

export default function CallsPage() {
  const [search, setSearch] = useState("");
  const [outcome, setOutcome] = useState("all");
  const [sentiment, setSentiment] = useState("all");
  const [page, setPage] = useState(1);
  const router = useRouter();
  const perPage = 6;

  const filtered = mockCalls.filter((c) => {
    const matchSearch =
      c.callerName.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search);
    const matchOutcome = outcome === "all" || c.outcome === outcome;
    const matchSentiment = sentiment === "all" || c.sentiment === sentiment;
    return matchSearch && matchOutcome && matchSentiment;
  });

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const pages = Math.ceil(total / perPage);

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-white font-bold text-lg">Call Logs</h2>
          <p className="text-slate-400 text-sm mt-0.5">{total} calls found</p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-400" />
            <span className="text-xs text-slate-400">{mockCalls.filter(c => c.appointmentBooked).length} Booked</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-xs text-slate-400">{mockCalls.filter(c => c.leadCaptured).length} Leads</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-red-400" />
            <span className="text-xs text-slate-400">{mockCalls.filter(c => c.spamBlocked).length} Spam</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-48">
          <Search size={14} className="text-slate-500 shrink-0" />
          <input
            className="input-dark py-1.5 px-0 bg-transparent border-none outline-none focus:ring-0 text-sm"
            placeholder="Search by name or number…"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            style={{ background: "transparent", border: "none", outline: "none", boxShadow: "none" }}
          />
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            value={outcome}
            onChange={(e) => { setOutcome(e.target.value); setPage(1); }}
            className="text-xs rounded-lg px-3 py-1.5 text-slate-300 outline-none"
            style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {OUTCOMES.map(o => (
              <option key={o} value={o}>
                {o === "all" ? "All Outcomes" : getOutcomeLabel(o)}
              </option>
            ))}
          </select>
          <select
            value={sentiment}
            onChange={(e) => { setSentiment(e.target.value); setPage(1); }}
            className="text-xs rounded-lg px-3 py-1.5 text-slate-300 outline-none"
            style={{ background: "#0d1424", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {SENTIMENTS.map(s => (
              <option key={s} value={s}>{s === "all" ? "All Sentiment" : s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Caller</th>
                <th>Phone</th>
                <th>Duration</th>
                <th>Outcome</th>
                <th>Appt Booked</th>
                <th>Sentiment</th>
                <th>Time</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((call, i) => (
                <motion.tr
                  key={call.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => router.push(`/calls/${call.id}`)}
                  className="cursor-pointer"
                >
                  <td>
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0"
                        style={{ background: "linear-gradient(135deg, #1e3a8a, #3b82f6)" }}
                      >
                        {call.callerName === "Unknown Caller" ? <Phone size={12} /> : call.callerName[0]}
                      </div>
                      <span className="text-white text-sm font-medium">{call.callerName}</span>
                    </div>
                  </td>
                  <td className="font-mono text-xs">{call.phone}</td>
                  <td>{formatDuration(call.duration)}</td>
                  <td>
                    <span className={`badge ${getOutcomeColor(call.outcome)}`}>
                      {getOutcomeLabel(call.outcome)}
                    </span>
                  </td>
                  <td>
                    {call.appointmentBooked ? (
                      <span className="badge badge-green flex items-center gap-1 w-fit">
                        <Calendar size={10} /> Yes
                      </span>
                    ) : (
                      <span className="text-slate-600 text-xs">—</span>
                    )}
                  </td>
                  <td>
                    <span className={`badge ${getSentimentColor(call.sentiment)} capitalize`}>
                      {call.sentiment}
                    </span>
                  </td>
                  <td className="text-slate-500 text-xs">{formatRelativeTime(call.createdAt)}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div
          className="flex items-center justify-between px-4 py-3 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          <p className="text-slate-500 text-xs">
            Showing {(page - 1) * perPage + 1}–{Math.min(page * perPage, total)} of {total}
          </p>
          <div className="flex items-center gap-1">
            {Array.from({ length: pages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => setPage(p)}
                className="w-7 h-7 rounded text-xs font-medium transition-all"
                style={{
                  background: p === page ? "#3b82f6" : "rgba(255,255,255,0.04)",
                  color: p === page ? "white" : "#64748b",
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
