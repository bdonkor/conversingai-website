"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Search, RefreshCw, Moon, Sun } from "lucide-react";
import { mockNotifications } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";
import {
  Phone,
  Calendar,
  User,
  Shield,
  Star,
  AlertCircle,
  Info,
} from "lucide-react";

const routeLabels: Record<string, string> = {
  "/": "Overview",
  "/calls": "Call Logs",
  "/appointments": "Appointments",
  "/leads": "Leads",
  "/analytics": "Analytics",
  "/automations": "Automations",
  "/settings": "Settings",
};

const notifIcons: Record<string, React.ReactNode> = {
  call: <Phone size={13} className="text-blue-400" />,
  appointment: <Calendar size={13} className="text-green-400" />,
  lead: <User size={13} className="text-purple-400" />,
  alert: <Shield size={13} className="text-red-400" />,
  system: <Info size={13} className="text-slate-400" />,
};

export function Header() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const pathname = usePathname();

  const unread = mockNotifications.filter((n) => !n.read).length;

  // Determine route label
  const routeLabel =
    routeLabels[pathname] ??
    (pathname.startsWith("/calls/") ? "Call Details" : "Dashboard");

  return (
    <header
      className="flex items-center justify-between px-6 shrink-0 relative z-30"
      style={{
        height: 64,
        background: "rgba(5,9,20,0.9)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Left: breadcrumb */}
      <div>
        <h1 className="text-white font-semibold text-base">{routeLabel}</h1>
        <p className="text-slate-500 text-xs">Conversing AI — AI Receptionist Portal</p>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        {/* Search */}
        <button
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-slate-400 text-sm transition-all hover:text-white"
          style={{
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          <Search size={14} />
          <span className="hidden md:inline text-xs">Search…</span>
          <span
            className="hidden md:inline text-xs px-1 rounded"
            style={{ background: "rgba(255,255,255,0.08)", color: "#64748b" }}
          >
            ⌘K
          </span>
        </button>

        {/* Refresh */}
        <button
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          title="Refresh data"
        >
          <RefreshCw size={14} />
        </button>

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
        >
          {darkMode ? <Moon size={14} /> : <Sun size={14} />}
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(!notifOpen)}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-white transition-colors relative"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.06)" }}
          >
            <Bell size={14} />
            {unread > 0 && (
              <span
                className="absolute -top-1 -right-1 w-4 h-4 rounded-full text-white text-xs flex items-center justify-center font-bold"
                style={{ background: "#3b82f6", fontSize: 9 }}
              >
                {unread}
              </span>
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setNotifOpen(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.96 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-10 w-80 rounded-xl overflow-hidden z-50"
                  style={{
                    background: "#0d1424",
                    border: "1px solid rgba(255,255,255,0.08)",
                    boxShadow: "0 20px 60px rgba(0,0,0,0.5)",
                  }}
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 border-b"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    <span className="text-white font-semibold text-sm">Notifications</span>
                    {unread > 0 && (
                      <span className="badge badge-blue">{unread} new</span>
                    )}
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {mockNotifications.map((notif) => (
                      <div
                        key={notif.id}
                        className="flex items-start gap-3 px-4 py-3 hover:bg-white/[0.02] transition-colors border-b"
                        style={{
                          borderColor: "rgba(255,255,255,0.04)",
                          background: notif.read ? "transparent" : "rgba(59,130,246,0.04)",
                        }}
                      >
                        <div
                          className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: "rgba(255,255,255,0.06)" }}
                        >
                          {notifIcons[notif.type]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="text-white text-xs font-medium truncate">{notif.title}</p>
                            {!notif.read && (
                              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                            )}
                          </div>
                          <p className="text-slate-400 text-xs mt-0.5 line-clamp-2">{notif.message}</p>
                          <p className="text-slate-600 text-xs mt-1">{formatRelativeTime(notif.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2.5 text-center">
                    <button className="text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>

        {/* Live indicator */}
        <div
          className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg"
          style={{ background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.2)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
          <span className="text-emerald-400 text-xs font-medium">Live</span>
        </div>
      </div>
    </header>
  );
}
