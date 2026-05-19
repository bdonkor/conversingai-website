"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { mockCalls } from "@/lib/mock-data";
import { formatRelativeTime, formatDuration, getOutcomeColor, getOutcomeLabel, getSentimentColor } from "@/lib/utils";

export function RecentCalls() {
  const recent = mockCalls.slice(0, 5);

  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-white font-semibold text-sm">Recent Calls</h3>
          <p className="text-slate-500 text-xs mt-0.5">Latest AI-handled calls</p>
        </div>
        <Link
          href="/calls"
          className="flex items-center gap-1 text-blue-400 hover:text-blue-300 text-xs font-medium transition-colors"
        >
          View all <ArrowRight size={11} />
        </Link>
      </div>

      <div className="space-y-1">
        {recent.map((call) => (
          <Link
            key={call.id}
            href={`/calls/${call.id}`}
            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/[0.03] transition-all group"
          >
            {/* Avatar */}
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-bold text-white"
              style={{ background: "linear-gradient(135deg, #1e3a8a, #3b82f6)" }}
            >
              {call.callerName === "Unknown Caller" ? (
                <Phone size={13} />
              ) : (
                call.callerName[0]
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="text-white text-xs font-medium truncate group-hover:text-blue-300 transition-colors">
                  {call.callerName}
                </p>
                <span className={`badge ${getOutcomeColor(call.outcome)} shrink-0`}>
                  {getOutcomeLabel(call.outcome)}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-0.5">
                <p className="text-slate-500 text-xs truncate">{call.phone}</p>
                <span className="text-slate-700">·</span>
                <p className="text-slate-500 text-xs shrink-0">{formatDuration(call.duration)}</p>
                <span className="text-slate-700">·</span>
                <span className={`badge ${getSentimentColor(call.sentiment)} shrink-0`}>
                  {call.sentiment}
                </span>
              </div>
            </div>

            {/* Time */}
            <p className="text-slate-600 text-xs shrink-0 hidden sm:block">
              {formatRelativeTime(call.createdAt)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
