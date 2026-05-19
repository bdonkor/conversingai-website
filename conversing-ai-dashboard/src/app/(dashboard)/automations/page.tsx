import type { Metadata } from "next";
import { Zap, Construction } from "lucide-react";

export const metadata: Metadata = { title: "Automations" };

export default function AutomationsPage() {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-white font-bold text-lg">Automations</h2>
        <p className="text-slate-400 text-sm mt-0.5">Configure automated follow-ups, reminders, and workflows</p>
      </div>
      <div className="glass-card p-16 text-center">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4"
          style={{ background: "rgba(59,130,246,0.1)" }}
        >
          <Zap size={28} className="text-blue-400" />
        </div>
        <h3 className="text-white font-bold text-base mb-2">Automations Coming Soon</h3>
        <p className="text-slate-400 text-sm max-w-md mx-auto mb-4">
          Set up automated SMS reminders, follow-up sequences, lead nurturing campaigns, and smart call routing — all powered by your AI receptionist.
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["SMS Reminders", "Lead Follow-ups", "Appointment Sequences", "Callback Triggers", "CRM Sync"].map((f) => (
            <span key={f} className="badge badge-blue">{f}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
