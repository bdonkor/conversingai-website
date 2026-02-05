import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, ArrowRight, Workflow, Settings, Zap, Database, Share2 } from "lucide-react";

import { Link } from "react-router-dom";

const AIAutomation = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Section 1: Hero */}
        <section className="relative py-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] opacity-30" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                Service Details
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white/90">
                <span className="text-blue-500 text-glow">Intelligent</span> AI Automation
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Eliminate repetitive tasks and human error. We build custom AI-driven workflows that connect your apps and automate your entire business operations.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-started">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-14 px-8 text-lg font-semibold shadow-blue-900/40 shadow-xl">
                    Get started <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-8 border-slate-800 bg-slate-950/50 hover:bg-slate-900 text-white text-lg font-semibold">
                  See Case Studies
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Automation Pillars */}
        <section className="py-20 bg-slate-950/20">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: Workflow,
                  title: "Workflow Design",
                  desc: "We map out your manual processes and turn them into automated hands-off systems."
                },
                {
                  icon: Share2,
                  title: "App Integration",
                  desc: "Seamlessly connect your CRM, Email, Slack, and 6,000+ other apps to work as one."
                },
                {
                  icon: Database,
                  title: "Data Processing",
                  desc: "AI-powered data extraction, cleaning, and entry to eliminate manual spreadsheet work."
                },
                {
                  icon: Zap,
                  title: "Instant Scaling",
                  desc: "Handle 100x the workload without adding a single person to your payroll."
                }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-2xl border border-white/5 bg-slate-900/40 hover:border-blue-500/30 transition-all text-center group">
                  <div className="h-14 w-14 rounded-full bg-blue-600/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-600 transition-colors">
                    <item.icon className="h-7 w-7 text-blue-500 group-hover:text-white" />
                  </div>
                  <h3 className="text-lg font-bold mb-3">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 3: The Process */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="order-2 lg:order-1 relative">
                <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-blue-600" />
                  <div className="space-y-8">
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">01</div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">Process Audit</h4>
                        <div className="h-2 w-full bg-slate-800 rounded-full mt-2"><div className="h-full w-full bg-blue-600 rounded-full" /></div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">02</div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">Automation Build</h4>
                        <div className="h-2 w-full bg-slate-800 rounded-full mt-2"><div className="h-full w-2/3 bg-blue-600 rounded-full" /></div>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 opacity-50">
                      <div className="h-8 w-8 rounded bg-slate-800 flex items-center justify-center text-xs font-bold text-white flex-shrink-0">03</div>
                      <div className="flex-1">
                        <h4 className="font-bold mb-1">Testing & QA</h4>
                      </div>
                    </div>
                  </div>
                  <Settings className="absolute -bottom-10 -right-10 h-40 w-40 text-blue-500/5 animate-spin-slow" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold mb-8">Work Smarter, <br /><span className="text-blue-500">Not Harder</span></h2>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                  Most businesses lose 20-30% of their revenue to operational inefficiencies. Our AI automation plugs those leaks forever.
                </p>
                <div className="space-y-4">
                  {[
                    "CRM & Sales Pipeline Automation",
                    "Customer Onboarding Sequences",
                    "Automated Invoicing & Payments",
                    "Social Media Content Distribution",
                    "Business Intelligence Reporting"
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

export default AIAutomation;
