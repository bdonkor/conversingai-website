"use client";

import { motion } from "framer-motion";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative" | "neutral";
  icon: React.ReactNode;
  iconColor?: string;
  iconBg?: string;
  accentColor?: string;
  description?: string;
  index?: number;
}

export function StatCard({
  title,
  value,
  change,
  changeType = "neutral",
  icon,
  iconColor = "#3b82f6",
  iconBg = "rgba(59,130,246,0.12)",
  accentColor = "#3b82f6",
  description,
  index = 0,
}: StatCardProps) {
  const changeColors = {
    positive: "#10b981",
    negative: "#ef4444",
    neutral: "#64748b",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06, ease: "easeOut" }}
      className="glass-card glass-card-hover p-5 relative overflow-hidden"
    >
      {/* Accent line */}
      <div
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-r"
        style={{ background: accentColor }}
      />

      {/* Background glow */}
      <div
        className="absolute right-4 top-4 w-16 h-16 rounded-full blur-2xl opacity-20"
        style={{ background: accentColor }}
      />

      <div className="flex items-start justify-between gap-3 relative">
        <div className="flex-1 min-w-0">
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wide mb-2">
            {title}
          </p>
          <p className="text-white text-2xl font-bold tracking-tight">{value}</p>
          {change && (
            <p
              className="text-xs mt-1.5 font-medium"
              style={{ color: changeColors[changeType] }}
            >
              {changeType === "positive" && "↑ "}
              {changeType === "negative" && "↓ "}
              {change}
            </p>
          )}
          {description && (
            <p className="text-slate-500 text-xs mt-1">{description}</p>
          )}
        </div>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: iconBg }}
        >
          {icon}
        </div>
      </div>
    </motion.div>
  );
}
