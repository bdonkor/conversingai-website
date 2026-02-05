import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Phone, CheckCircle2, ArrowRight, Clock, Calendar, UserCheck } from "lucide-react";

import { Link } from "react-router-dom";

const AIReceptionist = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Section 1: Hero */}
        <section className="relative py-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] opacity-50" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl border-l-4 border-blue-600 pl-8">
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                Service Details
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white/90">
                <span className="text-blue-500 text-glow">24/7</span> AI Receptionist
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Never miss a call again. Our AI Receptionists handle inquiries, book appointments, and provide information with natural, human-like voice quality.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-started">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-14 px-8 text-lg font-semibold shadow-blue-900/40 shadow-xl">
                    Get started <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-8 border-slate-800 bg-slate-950/50 hover:bg-slate-900 text-white text-lg font-semibold">
                  Listen to Samples
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Core Capabilities */}
        <section className="py-20 bg-slate-950/20">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Total Call Management</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Our AI doesn't just answer; it assists. Every call is a finished task, not a message left on a machine.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-8 rounded-2xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6">
                  <Clock className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Zero Wait Time</h3>
                <p className="text-muted-foreground">The AI answers on the first ring, 365 days a year. No hold times, no lunch breaks, just instant service.</p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6">
                  <Calendar className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Smart Booking</h3>
                <p className="text-muted-foreground">Directly integrated with your calendar. The AI can check availability and book meetings while on the call.</p>
              </div>
              <div className="p-8 rounded-2xl border border-white/5 bg-slate-900/40 hover:bg-slate-900/60 transition-all hover:-translate-y-1">
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6">
                  <UserCheck className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Human Handover</h3>
                <p className="text-muted-foreground">In complex cases, the AI can intelligently transfer the call to your staff with a full summary of the interaction.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Feature Highlight */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 lg:order-1">
                <div className="p-8 rounded-3xl bg-blue-600/5 border border-blue-500/20">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 bg-slate-900/80 p-4 rounded-xl border border-white/5">
                      <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                        <Phone className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="text-xs uppercase tracking-wider text-blue-500 font-bold mb-1">Incoming Call</div>
                        <div className="text-sm font-medium">Customer: "I need to reschedule..."</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 bg-blue-600/80 p-4 rounded-xl border border-white/10 ml-8 text-white">
                      <div className="flex-1">
                        <div className="text-xs uppercase tracking-wider opacity-70 font-bold mb-1">AI Receptionist</div>
                        <div className="text-sm">"No problem! I have Tuesday at 2pm open..."</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-3xl font-bold mb-8">Professionalism at Scale</h2>
                <ul className="space-y-4">
                  {[
                    "Customized phone personality",
                    "Infinite simultaneous call handling",
                    "Automatic call transcription & summary",
                    "Language support for 20+ languages",
                    "Seamless lead capture into your CRM"
                  ].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-500" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIReceptionist;
