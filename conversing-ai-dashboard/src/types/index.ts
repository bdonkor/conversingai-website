// ─── Core Types for Conversing AI Dashboard ───

export type CallOutcome =
  | "appointment_booked"
  | "lead_captured"
  | "information_provided"
  | "transferred"
  | "voicemail"
  | "spam"
  | "callback_requested"
  | "resolved";

export type CallSentiment = "positive" | "neutral" | "negative";

export type AppointmentStatus = "confirmed" | "pending" | "cancelled" | "completed" | "no_show";

export type LeadStage = "new" | "qualified" | "contacted" | "proposal" | "converted" | "lost";

export type NotificationType = "call" | "appointment" | "lead" | "alert" | "system";

// ─── Call ───
export interface Call {
  id: string;
  businessId: string;
  callerName: string;
  phone: string;
  duration: number; // seconds
  outcome: CallOutcome;
  sentiment: CallSentiment;
  appointmentBooked: boolean;
  leadCaptured: boolean;
  spamBlocked: boolean;
  transcript?: TranscriptMessage[];
  summary?: string;
  recordingUrl?: string;
  tags: string[];
  createdAt: string;
}

// ─── Transcript ───
export interface TranscriptMessage {
  id: string;
  role: "ai" | "customer";
  content: string;
  timestamp: number; // seconds from start
}

// ─── Appointment ───
export interface Appointment {
  id: string;
  businessId: string;
  callId?: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  dateTime: string;
  duration: number; // minutes
  status: AppointmentStatus;
  service: string;
  notes?: string;
  reminderSent: boolean;
  bookedByAI: boolean;
  createdAt: string;
}

// ─── Lead ───
export interface Lead {
  id: string;
  businessId: string;
  callId?: string;
  name: string;
  phone: string;
  email?: string;
  company?: string;
  stage: LeadStage;
  score: number; // 0–100
  source: "call" | "web" | "referral" | "social" | "walk_in";
  service?: string;
  notes?: string;
  tags: string[];
  createdAt: string;
  lastContactedAt?: string;
}

// ─── Notification ───
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

// ─── Business ───
export interface Business {
  id: string;
  name: string;
  slug: string;
  phone: string;
  email: string;
  industry: string;
  timezone: string;
  plan: "starter" | "professional" | "enterprise";
  greeting?: string;
  forwardingNumber?: string;
  businessHours: BusinessHours;
  createdAt: string;
}

export interface BusinessHours {
  monday: DayHours;
  tuesday: DayHours;
  wednesday: DayHours;
  thursday: DayHours;
  friday: DayHours;
  saturday: DayHours;
  sunday: DayHours;
}

export interface DayHours {
  isOpen: boolean;
  open: string;  // "09:00"
  close: string; // "17:00"
}

// ─── Analytics ───
export interface AnalyticsSummary {
  totalCalls: number;
  answeredCalls: number;
  missedCallsPrevented: number;
  appointmentsBooked: number;
  leadsCaptured: number;
  aiSuccessRate: number;
  avgCallDuration: number;
  customerSatisfaction: number;
  spamBlocked: number;
}

export interface ChartDataPoint {
  label: string;
  value: number;
  value2?: number;
  value3?: number;
}
