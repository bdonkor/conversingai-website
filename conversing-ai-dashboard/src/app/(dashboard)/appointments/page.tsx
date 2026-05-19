"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, User, Phone, CheckCircle, XCircle, AlertCircle, Bell } from "lucide-react";
import { mockAppointments } from "@/lib/mock-data";
import { formatDateTime, formatDate, getStatusColor } from "@/lib/utils";

const STATUS_TABS = ["all", "confirmed", "pending", "completed", "cancelled"];

export default function AppointmentsPage() {
  const [tab, setTab] = useState("all");
  const [view, setView] = useState<"list" | "calendar">("list");

  const filtered = tab === "all" ? mockAppointments : mockAppointments.filter((a) => a.status === tab);

  const statusIcons: Record<string, React.ReactNode> = {
    confirmed: <CheckCircle size={12} className="text-green-400" />,
    pending: <AlertCircle size={12} className="text-yellow-400" />,
    completed: <CheckCircle size={12} className="text-cyan-400" />,
    cancelled: <XCircle size={12} className="text-red-400" />,
    no_show: <XCircle size={12} className="text-slate-400" />,
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-white font-bold text-lg">Appointments</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            {mockAppointments.filter((a) => a.bookedByAI).length} booked by AI •{" "}
            {mockAppointments.filter((a) => a.status === "confirmed").length} confirmed upcoming
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="flex rounded-lg overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.08)" }}
          >
            {(["list", "calendar"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className="px-3 py-1.5 text-xs font-medium capitalize transition-all"
                style={{
                  background: view === v ? "rgba(59,130,246,0.2)" : "transparent",
                  color: view === v ? "#60a5fa" : "#64748b",
                }}
              >
                {v}
              </button>
            ))}
          </div>
          <button className="btn-primary text-xs py-1.5 px-3">+ New Appointment</button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "Total", value: mockAppointments.length, color: "#3b82f6" },
          { label: "Confirmed", value: mockAppointments.filter(a => a.status === "confirmed").length, color: "#10b981" },
          { label: "Pending", value: mockAppointments.filter(a => a.status === "pending").length, color: "#f59e0b" },
          { label: "Booked by AI", value: mockAppointments.filter(a => a.bookedByAI).length, color: "#a855f7" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card p-4 text-center"
          >
            <p className="text-2xl font-bold" style={{ color: s.color }}>{s.value}</p>
            <p className="text-slate-400 text-xs mt-1">{s.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 flex-wrap">
        {STATUS_TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-all"
            style={{
              background: tab === t ? "rgba(59,130,246,0.15)" : "rgba(255,255,255,0.03)",
              color: tab === t ? "#60a5fa" : "#64748b",
              border: tab === t ? "1px solid rgba(59,130,246,0.3)" : "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {t === "all" ? "All" : t}
          </button>
        ))}
      </div>

      {/* Appointments list */}
      <div className="space-y-3">
        {filtered.map((apt, i) => (
          <motion.div
            key={apt.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="glass-card glass-card-hover p-5"
          >
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex items-center gap-4">
                {/* Time block */}
                <div
                  className="w-14 text-center rounded-xl py-2 shrink-0"
                  style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.15)" }}
                >
                  <p className="text-blue-400 text-xs font-bold">
                    {new Date(apt.dateTime).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })}
                  </p>
                  <p className="text-slate-500 text-xs">
                    {new Date(apt.dateTime).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </p>
                </div>

                {/* Info */}
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="text-white font-semibold text-sm">{apt.customerName}</h3>
                    <span className={`badge ${getStatusColor(apt.status)} flex items-center gap-1`}>
                      {statusIcons[apt.status]} {apt.status}
                    </span>
                    {apt.bookedByAI && <span className="badge badge-purple">AI Booked</span>}
                  </div>
                  <p className="text-blue-400 text-xs font-medium mb-1">{apt.service}</p>
                  <div className="flex items-center gap-3 text-slate-500 text-xs flex-wrap">
                    <span className="flex items-center gap-1"><Phone size={10} /> {apt.customerPhone}</span>
                    <span className="flex items-center gap-1"><Clock size={10} /> {apt.duration} min</span>
                    {apt.customerEmail && <span className="flex items-center gap-1">✉ {apt.customerEmail}</span>}
                  </div>
                  {apt.notes && (
                    <p className="text-slate-500 text-xs mt-1 italic">{apt.notes}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {apt.reminderSent ? (
                  <span className="flex items-center gap-1 text-xs text-emerald-400">
                    <Bell size={11} /> Reminder sent
                  </span>
                ) : (
                  <button
                    className="text-xs px-2.5 py-1 rounded-lg transition-all hover:opacity-80"
                    style={{ background: "rgba(255,255,255,0.06)", color: "#94a3b8" }}
                  >
                    Send Reminder
                  </button>
                )}
                <button
                  className="text-xs px-2.5 py-1 rounded-lg transition-all"
                  style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}
                >
                  View Details
                </button>
              </div>
            </div>
          </motion.div>
        ))}

        {filtered.length === 0 && (
          <div className="glass-card p-12 text-center">
            <Calendar size={40} className="text-slate-700 mx-auto mb-3" />
            <p className="text-slate-400 text-sm font-medium">No appointments found</p>
            <p className="text-slate-600 text-xs mt-1">Appointments booked by your AI receptionist will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}
