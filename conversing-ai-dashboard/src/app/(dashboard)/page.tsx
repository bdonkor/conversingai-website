import type { Metadata } from "next";
import {
  Phone,
  PhoneIncoming,
  PhoneMissed,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Star,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";
import { CallVolumeChart, AppointmentsChart, SentimentPieChart } from "@/components/dashboard/overview-chart";
import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { RecentCalls } from "@/components/dashboard/recent-calls";
import { mockAnalyticsSummary, mockBusiness } from "@/lib/mock-data";
import { formatDuration } from "@/lib/utils";

export const metadata: Metadata = { title: "Overview" };

export default function DashboardPage() {
  const s = mockAnalyticsSummary;

  return (
    <div className="space-y-6">
      {/* ─── Welcome Banner ─────────────────────────────────────── */}
      <div
        className="rounded-2xl p-5 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.08) 100%)",
          border: "1px solid rgba(59,130,246,0.2)",
        }}
      >
        <div
          className="absolute right-0 top-0 bottom-0 w-48 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse at right, rgba(59,130,246,0.12) 0%, transparent 70%)",
          }}
        />
        <div className="relative">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-blue-300 text-xs font-medium uppercase tracking-widest mb-1">
                👋 Welcome back
              </p>
              <h2 className="text-white text-xl font-bold mb-1">{mockBusiness.name}</h2>
              <p className="text-slate-400 text-sm">
                Your AI receptionist has been active. Here&apos;s your performance overview.
              </p>
            </div>
            <div className="shrink-0 text-right hidden sm:block">
              <p className="text-slate-400 text-xs mb-1">AI Success Rate</p>
              <p className="text-4xl font-bold gradient-text">{s.aiSuccessRate}%</p>
              <p className="text-slate-500 text-xs mt-0.5">this month</p>
            </div>
          </div>
          <div className="flex items-center gap-3 mt-4 flex-wrap">
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: "rgba(16,185,129,0.15)", color: "#34d399", border: "1px solid rgba(16,185,129,0.2)" }}
            >
              <CheckCircle size={11} /> AI Receptionist Active
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: "rgba(59,130,246,0.12)", color: "#60a5fa", border: "1px solid rgba(59,130,246,0.2)" }}
            >
              <Star size={11} /> {s.customerSatisfaction}★ Avg Rating
            </span>
            <span
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium capitalize"
              style={{ background: "rgba(168,85,247,0.12)", color: "#c084fc", border: "1px solid rgba(168,85,247,0.2)" }}
            >
              {mockBusiness.plan} Plan
            </span>
          </div>
        </div>
      </div>

      {/* ─── Stat Cards ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <StatCard
          index={0}
          title="Total Calls"
          value={s.totalCalls.toLocaleString()}
          change="18% vs last month"
          changeType="positive"
          icon={<Phone size={18} color="#3b82f6" />}
          iconColor="#3b82f6"
          iconBg="rgba(59,130,246,0.12)"
          accentColor="#3b82f6"
        />
        <StatCard
          index={1}
          title="Answered Calls"
          value={s.answeredCalls.toLocaleString()}
          change={`${((s.answeredCalls / s.totalCalls) * 100).toFixed(1)}% answer rate`}
          changeType="positive"
          icon={<PhoneIncoming size={18} color="#10b981" />}
          iconColor="#10b981"
          iconBg="rgba(16,185,129,0.12)"
          accentColor="#10b981"
        />
        <StatCard
          index={2}
          title="Missed Calls Prevented"
          value={s.missedCallsPrevented}
          change="vs traditional voicemail"
          changeType="positive"
          icon={<PhoneMissed size={18} color="#a855f7" />}
          iconColor="#a855f7"
          iconBg="rgba(168,85,247,0.12)"
          accentColor="#a855f7"
        />
        <StatCard
          index={3}
          title="Appointments Booked"
          value={s.appointmentsBooked}
          change="23% vs last month"
          changeType="positive"
          icon={<Calendar size={18} color="#06b6d4" />}
          iconColor="#06b6d4"
          iconBg="rgba(6,182,212,0.12)"
          accentColor="#06b6d4"
        />
        <StatCard
          index={4}
          title="Leads Captured"
          value={s.leadsCaptured}
          change="8 new leads today"
          changeType="positive"
          icon={<Users size={18} color="#f97316" />}
          iconColor="#f97316"
          iconBg="rgba(249,115,22,0.12)"
          accentColor="#f97316"
        />
        <StatCard
          index={5}
          title="AI Success Rate"
          value={`${s.aiSuccessRate}%`}
          change="2.3% improvement"
          changeType="positive"
          icon={<TrendingUp size={18} color="#3b82f6" />}
          iconColor="#3b82f6"
          iconBg="rgba(59,130,246,0.12)"
          accentColor="#3b82f6"
        />
        <StatCard
          index={6}
          title="Avg Call Duration"
          value={formatDuration(s.avgCallDuration)}
          description="Per handled call"
          icon={<Clock size={18} color="#fbbf24" />}
          iconColor="#fbbf24"
          iconBg="rgba(251,191,36,0.12)"
          accentColor="#fbbf24"
        />
        <StatCard
          index={7}
          title="Spam Blocked"
          value={s.spamBlocked}
          change="Saved 83 interruptions"
          changeType="positive"
          icon={<ShieldCheck size={18} color="#10b981" />}
          iconColor="#10b981"
          iconBg="rgba(16,185,129,0.12)"
          accentColor="#10b981"
        />
      </div>

      {/* ─── Charts Row ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <CallVolumeChart />
        </div>
        <SentimentPieChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <AppointmentsChart />
        <ActivityFeed />
      </div>

      {/* ─── Recent Calls ────────────────────────────────────────── */}
      <RecentCalls />

      {/* ─── AI Insights ─────────────────────────────────────────── */}
      <div
        className="rounded-xl p-5"
        style={{
          background: "rgba(13,20,36,0.8)",
          border: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-6 h-6 rounded-md flex items-center justify-center"
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)" }}
          >
            <TrendingUp size={12} className="text-white" />
          </div>
          <h3 className="text-white font-semibold text-sm">AI Insights</h3>
          <span className="badge badge-blue ml-1">Auto-generated</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            {
              title: "Peak Call Window",
              insight: "Most calls arrive between 10 AM–11 AM. Consider scheduling staff meetings outside this window.",
              color: "#3b82f6",
            },
            {
              title: "Top Opportunity",
              insight: "Dental implant inquiries have a 91% lead score but only 22% conversion. Follow-up faster to increase revenue.",
              color: "#10b981",
            },
            {
              title: "Performance Alert",
              insight: "Your AI success rate increased 2.3% this week. Customers respond well to appointment confirmation messages.",
              color: "#a855f7",
            },
          ].map((insight) => (
            <div
              key={insight.title}
              className="p-4 rounded-lg"
              style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}
            >
              <div
                className="w-1.5 h-1.5 rounded-full mb-2"
                style={{ background: insight.color }}
              />
              <p className="text-white text-xs font-semibold mb-1">{insight.title}</p>
              <p className="text-slate-400 text-xs leading-relaxed">{insight.insight}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
