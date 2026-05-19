"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Phone, Mail, Tag, Star, ArrowRight, Plus } from "lucide-react";
import { mockLeads } from "@/lib/mock-data";
import { getStageColor, scoreColor, formatRelativeTime, truncate } from "@/lib/utils";
import { Lead, LeadStage } from "@/types";

const STAGES: LeadStage[] = ["new", "qualified", "contacted", "proposal", "converted", "lost"];

const stageLabels: Record<LeadStage, string> = {
  new: "New",
  qualified: "Qualified",
  contacted: "Contacted",
  proposal: "Proposal",
  converted: "Converted",
  lost: "Lost",
};

const stageBg: Record<LeadStage, string> = {
  new: "rgba(59,130,246,0.08)",
  qualified: "rgba(6,182,212,0.08)",
  contacted: "rgba(245,158,11,0.08)",
  proposal: "rgba(168,85,247,0.08)",
  converted: "rgba(16,185,129,0.08)",
  lost: "rgba(239,68,68,0.06)",
};

const stageBorder: Record<LeadStage, string> = {
  new: "rgba(59,130,246,0.2)",
  qualified: "rgba(6,182,212,0.2)",
  contacted: "rgba(245,158,11,0.2)",
  proposal: "rgba(168,85,247,0.2)",
  converted: "rgba(16,185,129,0.2)",
  lost: "rgba(239,68,68,0.15)",
};

function LeadCard({ lead, index }: { lead: Lead; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="rounded-xl p-4 space-y-3 glass-card-hover cursor-pointer"
      style={{
        background: "rgba(13,20,36,0.8)",
        border: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2.5">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white shrink-0"
            style={{ background: "linear-gradient(135deg, #1e3a8a, #3b82f6)" }}
          >
            {lead.name[0]}
          </div>
          <div>
            <p className="text-white text-xs font-semibold">{lead.name}</p>
            {lead.company && <p className="text-slate-500 text-xs">{lead.company}</p>}
          </div>
        </div>
        <div className="text-right">
          <p className={`text-sm font-bold ${scoreColor(lead.score)}`}>{lead.score}</p>
          <p className="text-slate-600 text-xs">score</p>
        </div>
      </div>

      {/* Contact */}
      <div className="space-y-1">
        <div className="flex items-center gap-1.5 text-xs text-slate-400">
          <Phone size={10} /> {lead.phone}
        </div>
        {lead.email && (
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Mail size={10} /> {truncate(lead.email, 24)}
          </div>
        )}
      </div>

      {/* Service */}
      {lead.service && (
        <p className="text-blue-400 text-xs font-medium">{lead.service}</p>
      )}

      {/* Notes */}
      {lead.notes && (
        <p className="text-slate-500 text-xs leading-relaxed line-clamp-2">{lead.notes}</p>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex gap-1 flex-wrap">
          {lead.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="badge badge-gray text-xs"># {tag}</span>
          ))}
        </div>
        <span className="text-slate-600 text-xs">{formatRelativeTime(lead.createdAt)}</span>
      </div>
    </motion.div>
  );
}

export default function LeadsPage() {
  const [activeStage, setActiveStage] = useState<LeadStage | "all">("all");

  const countByStage = (stage: LeadStage) => mockLeads.filter((l) => l.stage === stage).length;
  const totalValue = mockLeads.filter((l) => l.stage !== "lost").length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h2 className="text-white font-bold text-lg">Leads Pipeline</h2>
          <p className="text-slate-400 text-sm mt-0.5">
            {mockLeads.length} total leads • {mockLeads.filter(l => l.stage === "converted").length} converted
          </p>
        </div>
        <button className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1.5">
          <Plus size={13} /> Add Lead
        </button>
      </div>

      {/* Pipeline Funnel */}
      <div className="glass-card p-5">
        <h3 className="text-white font-semibold text-sm mb-4">Pipeline Overview</h3>
        <div className="flex items-end gap-2 h-20 overflow-x-auto pb-1">
          {STAGES.map((stage) => {
            const count = countByStage(stage);
            const pct = mockLeads.length > 0 ? (count / mockLeads.length) * 100 : 0;
            return (
              <button
                key={stage}
                onClick={() => setActiveStage(activeStage === stage ? "all" : stage)}
                className="flex-1 min-w-16 flex flex-col items-center gap-1"
              >
                <span className="text-xs font-bold" style={{ color: activeStage === stage ? "#60a5fa" : "#94a3b8" }}>
                  {count}
                </span>
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${Math.max(pct, 8)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full rounded-t-md min-h-2"
                  style={{
                    background: activeStage === stage || activeStage === "all"
                      ? stageBg[stage].replace("0.08", "0.4")
                      : stageBg[stage],
                    border: `1px solid ${stageBorder[stage]}`,
                    minHeight: 8,
                    alignSelf: "flex-end",
                  }}
                />
                <span className="text-xs text-slate-500 capitalize truncate w-full text-center">{stageLabels[stage]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Kanban columns */}
      <div className="flex gap-4 overflow-x-auto pb-2">
        {STAGES.map((stage) => {
          const leads = mockLeads.filter((l) =>
            activeStage === "all" || activeStage === stage ? l.stage === stage : false
          );
          if (activeStage !== "all" && activeStage !== stage) return null;
          return (
            <div
              key={stage}
              className="pipeline-col shrink-0"
            >
              {/* Column header */}
              <div
                className="flex items-center justify-between px-3 py-2.5 rounded-t-xl mb-2"
                style={{ background: stageBg[stage], border: `1px solid ${stageBorder[stage]}` }}
              >
                <div className="flex items-center gap-2">
                  <span className={`badge ${getStageColor(stage)} capitalize`}>{stageLabels[stage]}</span>
                  <span className="text-slate-500 text-xs">{countByStage(stage)}</span>
                </div>
                <button className="text-slate-500 hover:text-white transition-colors">
                  <Plus size={13} />
                </button>
              </div>

              {/* Cards */}
              <div className="space-y-2.5">
                {leads.map((lead, i) => (
                  <LeadCard key={lead.id} lead={lead} index={i} />
                ))}
                {leads.length === 0 && (
                  <div
                    className="rounded-xl p-4 text-center"
                    style={{ border: "1px dashed rgba(255,255,255,0.08)" }}
                  >
                    <p className="text-slate-600 text-xs">No leads here</p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
