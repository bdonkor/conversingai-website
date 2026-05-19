"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Save, Building2, Clock, Phone, Bell, Globe, Plug, MessageSquare } from "lucide-react";
import { mockBusiness } from "@/lib/mock-data";
import { toast } from "sonner";

const DAYS = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;

function SettingsSection({
  icon: Icon,
  title,
  description,
  children,
  index,
}: {
  icon: any;
  title: string;
  description: string;
  children: React.ReactNode;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="glass-card p-6"
    >
      <div className="flex items-start gap-3 mb-5">
        <div
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(59,130,246,0.12)" }}
        >
          <Icon size={17} className="text-blue-400" />
        </div>
        <div>
          <h3 className="text-white font-semibold text-sm">{title}</h3>
          <p className="text-slate-500 text-xs mt-0.5">{description}</p>
        </div>
      </div>
      {children}
    </motion.div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-slate-400 text-xs font-medium mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [businessName, setBusinessName] = useState(mockBusiness.name);
  const [greeting, setGreeting] = useState(mockBusiness.greeting ?? "");
  const [forwarding, setForwarding] = useState(mockBusiness.forwardingNumber ?? "");
  const [hours, setHours] = useState(mockBusiness.businessHours);
  const [notifications, setNotifications] = useState({
    newCall: true,
    appointment: true,
    lead: true,
    weeklySummary: true,
    spamAlert: false,
  });

  const handleSave = () => {
    toast.success("Settings saved successfully!");
  };

  return (
    <div className="space-y-5 max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="text-white font-bold text-lg">Settings</h2>
          <p className="text-slate-400 text-sm mt-0.5">Configure your AI receptionist and business preferences</p>
        </div>
        <button onClick={handleSave} className="btn-primary">
          <Save size={14} /> Save Changes
        </button>
      </div>

      {/* Business Info */}
      <SettingsSection
        index={0}
        icon={Building2}
        title="Business Information"
        description="Your business details visible to the AI"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Business Name">
            <input
              className="input-dark"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
            />
          </Field>
          <Field label="Industry">
            <select
              className="input-dark"
              defaultValue={mockBusiness.industry}
              style={{ background: "#111827" }}
            >
              {["Healthcare", "Legal", "Real Estate", "Beauty & Wellness", "Automotive", "Education", "Food & Beverage", "Other"].map(i => (
                <option key={i}>{i}</option>
              ))}
            </select>
          </Field>
          <Field label="Business Phone">
            <input className="input-dark" defaultValue={mockBusiness.phone} />
          </Field>
          <Field label="Business Email">
            <input className="input-dark" type="email" defaultValue={mockBusiness.email} />
          </Field>
        </div>
      </SettingsSection>

      {/* AI Greeting */}
      <SettingsSection
        index={1}
        icon={MessageSquare}
        title="AI Receptionist Greeting"
        description="The first message your AI says when answering calls"
      >
        <Field label="Greeting Script">
          <textarea
            className="input-dark resize-none"
            rows={4}
            value={greeting}
            onChange={(e) => setGreeting(e.target.value)}
          />
        </Field>
        <p className="text-slate-600 text-xs mt-2">
          Use natural language. The AI will adapt tone based on caller sentiment.
        </p>
      </SettingsSection>

      {/* Business Hours */}
      <SettingsSection
        index={2}
        icon={Clock}
        title="Business Hours"
        description="When your AI receptionist is fully active"
      >
        <div className="space-y-2.5">
          {DAYS.map((day) => {
            const h = hours[day];
            return (
              <div key={day} className="flex items-center gap-3 flex-wrap">
                <div className="w-24 flex items-center gap-2">
                  <div
                    onClick={() => setHours(prev => ({
                      ...prev,
                      [day]: { ...prev[day], isOpen: !prev[day].isOpen }
                    }))}
                    className="relative w-9 h-5 rounded-full cursor-pointer transition-colors"
                    style={{ background: h.isOpen ? "#3b82f6" : "rgba(255,255,255,0.1)" }}
                  >
                    <div
                      className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                      style={{ transform: `translateX(${h.isOpen ? "20px" : "2px"})` }}
                    />
                  </div>
                  <span className="text-slate-300 text-xs capitalize w-16">{day.slice(0, 3)}</span>
                </div>
                {h.isOpen ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="time"
                      value={h.open}
                      onChange={(e) => setHours(prev => ({ ...prev, [day]: { ...prev[day], open: e.target.value } }))}
                      className="input-dark py-1 px-2 w-28 text-xs"
                      style={{ background: "#111827" }}
                    />
                    <span className="text-slate-600 text-xs">to</span>
                    <input
                      type="time"
                      value={h.close}
                      onChange={(e) => setHours(prev => ({ ...prev, [day]: { ...prev[day], close: e.target.value } }))}
                      className="input-dark py-1 px-2 w-28 text-xs"
                      style={{ background: "#111827" }}
                    />
                  </div>
                ) : (
                  <span className="text-slate-600 text-xs">Closed</span>
                )}
              </div>
            );
          })}
        </div>
      </SettingsSection>

      {/* Call Forwarding */}
      <SettingsSection
        index={3}
        icon={Phone}
        title="Call Forwarding"
        description="Where to forward calls the AI can't handle"
      >
        <Field label="Forwarding Number">
          <input
            className="input-dark"
            value={forwarding}
            onChange={(e) => setForwarding(e.target.value)}
            placeholder="+233 XX XXX XXXX"
          />
        </Field>
        <p className="text-slate-600 text-xs mt-2">
          The AI will forward emergency or complex calls to this number.
        </p>
      </SettingsSection>

      {/* Notifications */}
      <SettingsSection
        index={4}
        icon={Bell}
        title="Notification Preferences"
        description="Choose when to receive alerts"
      >
        <div className="space-y-3">
          {Object.entries(notifications).map(([key, value]) => {
            const labels: Record<string, string> = {
              newCall: "New call handled by AI",
              appointment: "Appointment booked",
              lead: "New lead captured",
              weeklySummary: "Weekly performance summary",
              spamAlert: "Spam/robocall blocked",
            };
            return (
              <div key={key} className="flex items-center justify-between">
                <span className="text-slate-300 text-sm">{labels[key]}</span>
                <div
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key as keyof typeof prev] }))}
                  className="relative w-9 h-5 rounded-full cursor-pointer transition-colors"
                  style={{ background: value ? "#3b82f6" : "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform"
                    style={{ transform: `translateX(${value ? "20px" : "2px"})` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </SettingsSection>

      {/* Integrations */}
      <SettingsSection
        index={5}
        icon={Plug}
        title="Integrations"
        description="Connect your AI receptionist to other tools"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { name: "Google Calendar", status: "connected", color: "#10b981" },
            { name: "WhatsApp Business", status: "not connected", color: "#64748b" },
            { name: "HubSpot CRM", status: "not connected", color: "#64748b" },
            { name: "Twilio SMS", status: "connected", color: "#10b981" },
            { name: "Zapier", status: "not connected", color: "#64748b" },
            { name: "Calendly", status: "not connected", color: "#64748b" },
          ].map((intg) => (
            <div
              key={intg.name}
              className="flex items-center justify-between p-3.5 rounded-xl"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="text-white text-xs font-medium">{intg.name}</span>
              <div className="flex items-center gap-2">
                <span
                  className="text-xs font-medium"
                  style={{ color: intg.color }}
                >
                  {intg.status === "connected" ? "✓ Connected" : "—"}
                </span>
                <button
                  className="text-xs px-2 py-0.5 rounded-md transition-all"
                  style={{
                    background: intg.status === "connected" ? "rgba(239,68,68,0.1)" : "rgba(59,130,246,0.1)",
                    color: intg.status === "connected" ? "#f87171" : "#60a5fa",
                    border: `1px solid ${intg.status === "connected" ? "rgba(239,68,68,0.2)" : "rgba(59,130,246,0.2)"}`,
                  }}
                >
                  {intg.status === "connected" ? "Disconnect" : "Connect"}
                </button>
              </div>
            </div>
          ))}
        </div>
      </SettingsSection>
    </div>
  );
}
