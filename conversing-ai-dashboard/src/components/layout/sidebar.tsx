"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Phone,
  Calendar,
  Users,
  BarChart3,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Bell,
  Building2,
  ChevronsUpDown,
} from "lucide-react";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/calls", label: "Calls", icon: Phone },
  { href: "/appointments", label: "Appointments", icon: Calendar },
  { href: "/leads", label: "Leads", icon: Users },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/automations", label: "Automations", icon: Zap },
];

const bottomItems = [
  { href: "/settings", label: "Settings", icon: Settings },
];

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();
  // Mocking user for preview mode
  const user = { firstName: "Benjamin", primaryEmailAddress: { emailAddress: "benjamin@conversingai.com" } };
  const signOut = () => console.log("Sign out");

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex flex-col h-screen shrink-0 overflow-hidden"
      style={{
        background: "rgba(9, 14, 30, 0.95)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* ─── Logo ─────────────────────────────────────────────── */}
      <div
        className="flex items-center px-4 border-b shrink-0"
        style={{
          height: 64,
          borderColor: "rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2.5 overflow-hidden">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #3b82f6, #2563eb)",
              boxShadow: "0 0 16px rgba(59,130,246,0.4)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" />
            </svg>
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden whitespace-nowrap"
              >
                <span className="text-white font-bold text-sm">Conversing AI</span>
                <p className="text-slate-500 text-xs leading-tight">Dashboard</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Business Switcher ────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {!collapsed && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mx-3 mt-3 mb-1"
          >
            <button
              className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-left transition-all"
              style={{
                background: "rgba(59,130,246,0.08)",
                border: "1px solid rgba(59,130,246,0.15)",
              }}
            >
              <div
                className="w-7 h-7 rounded-md flex items-center justify-center shrink-0"
                style={{ background: "rgba(59,130,246,0.2)" }}
              >
                <Building2 size={13} className="text-blue-400" />
              </div>
              <div className="overflow-hidden flex-1 min-w-0">
                <p className="text-white text-xs font-semibold truncate">Accra Dental Clinic</p>
                <p className="text-slate-500 text-xs">Professional Plan</p>
              </div>
              <ChevronsUpDown size={12} className="text-slate-500 shrink-0" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Nav Items ────────────────────────────────────────── */}
      <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-0.5">
        {!collapsed && (
          <p className="text-slate-600 text-xs font-semibold uppercase tracking-widest px-2 py-2">
            Menu
          </p>
        )}
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || (href !== "/" && pathname.startsWith(href));
          return (
            <Link key={href} href={href} className={`sidebar-link ${active ? "active" : ""}`}>
              <Icon size={17} className={active ? "text-blue-400" : "text-slate-500"} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap text-sm"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}
      </nav>

      {/* ─── Bottom Section ───────────────────────────────────── */}
      <div className="px-2 pb-3 space-y-0.5 border-t" style={{ borderColor: "rgba(255,255,255,0.06)", paddingTop: 12 }}>
        {bottomItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href} className={`sidebar-link ${active ? "active" : ""}`}>
              <Icon size={17} className={active ? "text-blue-400" : "text-slate-500"} />
              <AnimatePresence mode="wait">
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    className="overflow-hidden whitespace-nowrap text-sm"
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </Link>
          );
        })}

        {/* User Profile */}
        <div
          className="flex items-center gap-2.5 px-2 py-2.5 mt-1 rounded-lg"
          style={{ background: "rgba(255,255,255,0.03)" }}
        >
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
          >
            {user?.firstName?.[0] ?? "U"}
          </div>
          <AnimatePresence mode="wait">
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 overflow-hidden whitespace-nowrap min-w-0"
              >
                <p className="text-white text-xs font-medium truncate">
                  {user?.firstName ?? "User"}
                </p>
                <p className="text-slate-500 text-xs truncate">
                  {user?.primaryEmailAddress?.emailAddress ?? ""}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <AnimatePresence>
            {!collapsed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => signOut()}
                className="text-slate-500 hover:text-red-400 transition-colors shrink-0"
                title="Sign out"
              >
                <LogOut size={14} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ─── Collapse Toggle ─────────────────────────────────── */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full flex items-center justify-center z-50 transition-all hover:scale-110"
        style={{
          background: "#0d1424",
          border: "1px solid rgba(255,255,255,0.12)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
        }}
      >
        {collapsed ? (
          <ChevronRight size={12} className="text-slate-400" />
        ) : (
          <ChevronLeft size={12} className="text-slate-400" />
        )}
      </button>
    </motion.aside>
  );
}
