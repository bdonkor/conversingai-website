import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow, format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function formatRelativeTime(dateString: string): string {
  return formatDistanceToNow(new Date(dateString), { addSuffix: true });
}

export function formatDate(dateString: string, fmt = "MMM d, yyyy"): string {
  return format(new Date(dateString), fmt);
}

export function formatDateTime(dateString: string): string {
  return format(new Date(dateString), "MMM d, yyyy h:mm a");
}

export function formatPhone(phone: string): string {
  // Format Ghana phone: +233 XX XXX XXXX
  if (phone.startsWith("+233") && phone.length === 13) {
    return `${phone.slice(0, 4)} ${phone.slice(4, 6)} ${phone.slice(6, 9)} ${phone.slice(9)}`;
  }
  return phone;
}

export function getSentimentColor(sentiment: string) {
  switch (sentiment) {
    case "positive": return "badge-green";
    case "negative": return "badge-red";
    default: return "badge-gray";
  }
}

export function getOutcomeColor(outcome: string) {
  switch (outcome) {
    case "appointment_booked": return "badge-green";
    case "lead_captured": return "badge-blue";
    case "spam": return "badge-red";
    case "transferred": return "badge-yellow";
    case "voicemail": return "badge-gray";
    case "resolved": return "badge-cyan";
    case "callback_requested": return "badge-purple";
    default: return "badge-gray";
  }
}

export function getOutcomeLabel(outcome: string) {
  const labels: Record<string, string> = {
    appointment_booked: "Appointment Booked",
    lead_captured: "Lead Captured",
    information_provided: "Info Provided",
    transferred: "Transferred",
    voicemail: "Voicemail",
    spam: "Spam Blocked",
    callback_requested: "Callback Requested",
    resolved: "Resolved",
  };
  return labels[outcome] ?? outcome;
}

export function getStageColor(stage: string) {
  switch (stage) {
    case "new": return "badge-blue";
    case "qualified": return "badge-cyan";
    case "contacted": return "badge-yellow";
    case "proposal": return "badge-purple";
    case "converted": return "badge-green";
    case "lost": return "badge-red";
    default: return "badge-gray";
  }
}

export function getStatusColor(status: string) {
  switch (status) {
    case "confirmed": return "badge-green";
    case "pending": return "badge-yellow";
    case "cancelled": return "badge-red";
    case "completed": return "badge-cyan";
    case "no_show": return "badge-gray";
    default: return "badge-gray";
  }
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length) + "…";
}

export function scoreColor(score: number): string {
  if (score >= 75) return "text-green-400";
  if (score >= 50) return "text-yellow-400";
  return "text-red-400";
}
