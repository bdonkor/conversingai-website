import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { TrendingUp, CheckCircle2, ArrowRight, Target, Users, BarChart3, Magnet } from "lucide-react";

import { Link } from "react-router-dom";

const LeadGeneration = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] opacity-40" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[120px] opacity-30" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                Service Details
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white/90">
                <span className="text-blue-500 text-glow">Done-For-You</span> Lead Generation
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10 max-w-2xl mx-auto">
                Stop chasing leads. We build predictable, AI-powered systems that source, qualify, and deliver high-intent prospects straight to your calendar.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/get-started">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-14 px-10 text-lg font-semibold shadow-blue-900/40 shadow-xl">
                    Get started <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-10 border-slate-800 bg-slate-950/50 hover:bg-slate-900 text-white text-lg font-semibold">
                  How it Works
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Row */}
        <section className="py-20 bg-slate-900/20">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-card/50 border border-white/5 p-8 rounded-3xl hover:border-blue-500/30 transition-all hover:-translate-y-2">
                <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6">
                  <Target className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Precision Targeting</h3>
                <p className="text-muted-foreground">Our AI analyzes millions of data points to find the exact decision-makers most likely to buy your services right now.</p>
              </div>
              <div className="bg-card/50 border border-white/5 p-8 rounded-3xl hover:border-blue-500/30 transition-all hover:-translate-y-2">
                <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6">
                  <Magnet className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">AI Qualification</h3>
                <p className="text-muted-foreground">No more manual filtering. Our AI agents converse with prospects to ensure they fit your ideal client profile before you talk.</p>
              </div>
              <div className="bg-card/50 border border-white/5 p-8 rounded-3xl hover:border-blue-500/30 transition-all hover:-translate-y-2">
                <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6">
                  <BarChart3 className="h-6 w-6 text-blue-500" />
                </div>
                <h3 className="text-xl font-bold mb-4">Predictable Growth</h3>
                <p className="text-muted-foreground">We turn lead generation into a math problem. Switch from "hoping for leads" to "knowing your numbers."</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative rounded-3xl overflow-hidden aspect-square flex items-center justify-center bg-blue-600/5 border border-white/5">
                <div className="absolute inset-0 bg-grid-white/5" />
                <div className="relative z-10 w-full max-w-sm space-y-4">
                  <div className="p-4 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce">
                    <Users className="h-8 w-8 text-blue-500" />
                    <div>
                      <p className="text-xs text-blue-500 font-bold uppercase">New Hot Lead</p>
                      <p className="text-sm">CTO interested in Automation</p>
                    </div>
                  </div>
                  <div className="p-4 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl flex items-center gap-4 ml-12">
                    <TrendingUp className="h-8 w-8 text-green-500" />
                    <div>
                      <p className="text-xs text-green-500 font-bold uppercase">Qualified</p>
                      <p className="text-sm">$50k Annual Budget Verified</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6">Built for Scaling Agencies <br />& B2B Businesses</h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  We don't just find names and emails. We build a fully automated machine that handles the outreach, the follow-up, and the qualification.
                </p>
                <div className="space-y-4">
                  {[
                    "Omnichannel Outreach (Email, LinkedIn, Voice)",
                    "Multivariate Campaign Testing",
                    "Advanced Prospect Data Enrichment",
                    "Automatic Appointment Booking",
                    "Dedicated Account Management Support"
                  ].map((text, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-blue-500" />
                      <span className="font-medium">{text}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LeadGeneration;
