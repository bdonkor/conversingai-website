"use client";

import { notFound, useParams } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Phone,
  Clock,
  Calendar,
  User,
  Tag,
  Mic,
  FileText,
  ThumbsUp,
  ThumbsDown,
  Minus,
  CheckCircle,
  XCircle,
  Play,
  MessageSquare,
} from "lucide-react";
import { mockCalls } from "@/lib/mock-data";
import {
  formatDateTime,
  formatDuration,
  getOutcomeColor,
  getOutcomeLabel,
  getSentimentColor,
} from "@/lib/utils";

export default function CallDetailPage() {
  const { id } = useParams();
  const call = mockCalls.find((c) => c.id === id);
  if (!call) return notFound();

  const sentimentIcons = {
    positive: <ThumbsUp size={14} className="text-green-400" />,
    negative: <ThumbsDown size={14} className="text-red-400" />,
    neutral: <Minus size={14} className="text-slate-400" />,
  };

  return (
    <div className="space-y-5 max-w-5xl mx-auto">
      {/* Back */}
      <Link
        href="/calls"
        className="inline-flex items-center gap-1.5 text-slate-400 hover:text-white text-sm transition-colors"
      >
        <ArrowLeft size={14} /> Back to Call Logs
      </Link>

      {/* ─── Header Card ─── */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-6"
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-bold text-white shrink-0"
              style={{ background: "linear-gradient(135deg, #1e3a8a, #3b82f6)", boxShadow: "0 0 20px rgba(59,130,246,0.3)" }}
            >
              {call.callerName[0]}
            </div>
            <div>
              <h2 className="text-white text-xl font-bold">{call.callerName}</h2>
              <p className="text-slate-400 text-sm font-mono mt-0.5">{call.phone}</p>
              <div className="flex items-center gap-2 mt-2 flex-wrap">
                <span className={`badge ${getOutcomeColor(call.outcome)}`}>
                  {getOutcomeLabel(call.outcome)}
                </span>
                <span className={`badge ${getSentimentColor(call.sentiment)} capitalize flex items-center gap-1`}>
                  {sentimentIcons[call.sentiment]} {call.sentiment}
                </span>
                {call.spamBlocked && <span className="badge badge-red">Spam Blocked</span>}
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-slate-400 text-xs mb-1">Call Time</p>
            <p className="text-white text-sm font-medium">{formatDateTime(call.createdAt)}</p>
            <p className="text-slate-500 text-xs mt-1">Duration: {formatDuration(call.duration)}</p>
          </div>
        </div>

        {/* Quick stats */}
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-5 border-t"
          style={{ borderColor: "rgba(255,255,255,0.06)" }}
        >
          {[
            { label: "Duration", value: formatDuration(call.duration), icon: <Clock size={13} /> },
            { label: "Appointment", value: call.appointmentBooked ? "Booked ✓" : "Not Booked", icon: <Calendar size={13} />, color: call.appointmentBooked ? "#10b981" : "#64748b" },
            { label: "Lead Captured", value: call.leadCaptured ? "Yes ✓" : "No", icon: <User size={13} />, color: call.leadCaptured ? "#3b82f6" : "#64748b" },
            { label: "Tags", value: call.tags.length > 0 ? call.tags[0] + (call.tags.length > 1 ? ` +${call.tags.length - 1}` : "") : "None", icon: <Tag size={13} /> },
          ].map((s) => (
            <div
              key={s.label}
              className="rounded-lg p-3"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div className="flex items-center gap-1.5 text-slate-500 text-xs mb-1">
                {s.icon} {s.label}
              </div>
              <p
                className="text-sm font-semibold"
                style={{ color: s.color ?? "#f1f5f9" }}
              >
                {s.value}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ─── Transcript ─── */}
        <div className="lg:col-span-2 space-y-4">
          {/* Recording Player */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <Mic size={15} className="text-blue-400" />
              <h3 className="text-white font-semibold text-sm">Recording</h3>
            </div>
            <div
              className="rounded-lg p-4 flex items-center gap-4"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <button
                className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-transform hover:scale-105"
                style={{ background: "linear-gradient(135deg, #3b82f6, #2563eb)" }}
              >
                <Play size={14} className="text-white ml-0.5" />
              </button>
              <div className="flex-1">
                <div
                  className="h-1.5 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.08)" }}
                >
                  <div
                    className="h-full rounded-full"
                    style={{ width: "35%", background: "linear-gradient(90deg, #3b82f6, #60a5fa)" }}
                  />
                </div>
                <div className="flex justify-between mt-1.5 text-xs text-slate-500">
                  <span>1:14</span>
                  <span>{formatDuration(call.duration)}</span>
                </div>
              </div>
              <span className="text-slate-500 text-xs shrink-0">AI Receptionist</span>
            </div>
          </motion.div>

          {/* Transcript */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-4">
              <MessageSquare size={15} className="text-blue-400" />
              <h3 className="text-white font-semibold text-sm">Transcript</h3>
            </div>
            {call.transcript && call.transcript.length > 0 ? (
              <div className="space-y-3 max-h-96 overflow-y-auto pr-1">
                {call.transcript.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex gap-3 ${msg.role === "ai" ? "" : "flex-row-reverse"}`}
                  >
                    <div
                      className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                      style={{
                        background: msg.role === "ai"
                          ? "linear-gradient(135deg, #3b82f6, #2563eb)"
                          : "rgba(255,255,255,0.08)",
                        color: "white",
                      }}
                    >
                      {msg.role === "ai" ? "AI" : call.callerName[0]}
                    </div>
                    <div className={`max-w-[75%] ${msg.role === "customer" ? "text-right" : ""}`}>
                      <div
                        className="rounded-xl px-3.5 py-2.5 text-xs leading-relaxed"
                        style={{
                          background: msg.role === "ai"
                            ? "rgba(59,130,246,0.12)"
                            : "rgba(255,255,255,0.05)",
                          border: msg.role === "ai"
                            ? "1px solid rgba(59,130,246,0.2)"
                            : "1px solid rgba(255,255,255,0.06)",
                          color: msg.role === "ai" ? "#93c5fd" : "#e2e8f0",
                        }}
                      >
                        {msg.content}
                      </div>
                      <p className="text-slate-600 text-xs mt-1">{msg.timestamp}s</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <MessageSquare size={28} className="text-slate-700 mx-auto mb-2" />
                <p className="text-slate-500 text-sm">No transcript available for this call</p>
              </div>
            )}
          </motion.div>
        </div>

        {/* ─── Right Panel ─── */}
        <div className="space-y-4">
          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.12 }}
            className="glass-card p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <FileText size={15} className="text-blue-400" />
              <h3 className="text-white font-semibold text-sm">AI Summary</h3>
            </div>
            <p className="text-slate-300 text-xs leading-relaxed">
              {call.summary ?? "No summary available."}
            </p>
          </motion.div>

          {/* Sentiment Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.16 }}
            className="glass-card p-5"
          >
            <h3 className="text-white font-semibold text-sm mb-3">Sentiment Analysis</h3>
            <div className="space-y-2.5">
              {[
                { label: "Positive", value: call.sentiment === "positive" ? 88 : call.sentiment === "neutral" ? 45 : 12, color: "#10b981" },
                { label: "Neutral", value: call.sentiment === "neutral" ? 48 : call.sentiment === "positive" ? 9 : 25, color: "#64748b" },
                { label: "Negative", value: call.sentiment === "negative" ? 63 : call.sentiment === "neutral" ? 7 : 3, color: "#ef4444" },
              ].map((s) => (
                <div key={s.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{s.label}</span>
                    <span style={{ color: s.color }}>{s.value}%</span>
                  </div>
                  <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${s.value}%` }}
                      transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{ background: s.color }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Follow-up Recommendations */}
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-5"
          >
            <h3 className="text-white font-semibold text-sm mb-3">Follow-up Recommendations</h3>
            <div className="space-y-2">
              {call.appointmentBooked && (
                <div className="flex items-start gap-2 text-xs">
                  <CheckCircle size={12} className="text-green-400 mt-0.5 shrink-0" />
                  <span className="text-slate-300">Send appointment confirmation SMS</span>
                </div>
              )}
              {call.leadCaptured && (
                <div className="flex items-start gap-2 text-xs">
                  <CheckCircle size={12} className="text-blue-400 mt-0.5 shrink-0" />
                  <span className="text-slate-300">Follow up with pricing info within 24h</span>
                </div>
              )}
              {call.sentiment === "negative" && (
                <div className="flex items-start gap-2 text-xs">
                  <XCircle size={12} className="text-red-400 mt-0.5 shrink-0" />
                  <span className="text-slate-300">Escalate to manager — negative sentiment detected</span>
                </div>
              )}
              {call.outcome === "callback_requested" && (
                <div className="flex items-start gap-2 text-xs">
                  <Phone size={12} className="text-yellow-400 mt-0.5 shrink-0" />
                  <span className="text-slate-300">Call back scheduled — add to follow-up list</span>
                </div>
              )}
              {!call.appointmentBooked && !call.leadCaptured && call.sentiment !== "negative" && (
                <p className="text-slate-500 text-xs">No immediate follow-up required.</p>
              )}
            </div>
          </motion.div>

          {/* Tags */}
          {call.tags.length > 0 && (
            <motion.div
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.24 }}
              className="glass-card p-5"
            >
              <h3 className="text-white font-semibold text-sm mb-3">Tags</h3>
              <div className="flex flex-wrap gap-1.5">
                {call.tags.map((tag) => (
                  <span key={tag} className="badge badge-gray"># {tag}</span>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
