"use client";

import { motion } from "framer-motion";
import { Phone, Calendar, User, Shield, Star, ArrowRight } from "lucide-react";
import { activityFeed } from "@/lib/mock-data";
import Link from "next/link";

const icons: Record<string, React.ReactNode> = {
  phone: <Phone size={13} className="text-blue-400" />,
  calendar: <Calendar size={13} className="text-green-400" />,
  user: <User size={13} className="text-purple-400" />,
  shield: <Shield size={13} className="text-red-400" />,
  star: <Star size={13} className="text-yellow-400" />,
};

const typeBg: Record<string, string> = {
  call: "rgba(59,130,246,0.12)",
  appointment: "rgba(16,185,129,0.12)",
  lead: "rgba(168,85,247,0.12)",
  spam: "rgba(239,68,68,0.12)",
  rating: "rgba(245,158,11,0.12)",
};

export function ActivityFeed() {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">Live Activity</h3>
          <p className="text-slate-500 text-xs mt-0.5">Real-time AI receptionist actions</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 pulse-glow" />
          <span className="text-emerald-400 text-xs">Live</span>
        </div>
      </div>

      <div className="space-y-2">
        {activityFeed.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-white/[0.02] transition-colors"
          >
            <div
              className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5"
              style={{ background: typeBg[item.type] ?? "rgba(255,255,255,0.06)" }}
            >
              {icons[item.icon] ?? <Phone size={13} className="text-slate-400" />}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-300 text-xs leading-relaxed">{item.label}</p>
              <p className="text-slate-600 text-xs mt-0.5">{item.time}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <Link
        href="/calls"
        className="flex items-center justify-center gap-1.5 mt-4 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
      >
        View all activity <ArrowRight size={12} />
      </Link>
    </div>
  );
}
