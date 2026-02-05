import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Search,
  Lightbulb,
  Code2,
  Rocket,
  BarChart3,
  ArrowRight,
  Zap,
  ShieldCheck,
  Cpu
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Discovery & Audit",
    description: "We start by diving deep into your business. We identify bottlenecks, repetitive tasks, and growth opportunities that AI can solve.",
    details: ["Operational Audit", "ROI Projections", "Technical Feasibility"]
  },
  {
    icon: Lightbulb,
    title: "Strategic Planning",
    description: "No cookie-cutter solutions. We design a custom AI architecture and digital strategy tailored specifically to your business goals.",
    details: ["Custom Roadmap", "Tech Stack Selection", "Process Mapping"]
  },
  {
    icon: Code2,
    title: "Build & Develop",
    description: "Our engineers build your AI agents, automation workflows, or premium website. We handle all the technical heavy lifting.",
    details: ["AI Training", "Custom Integration", "UI/UX Design"]
  },
  {
    icon: Zap,
    title: "Testing & QA",
    description: "Before going live, we put everything through rigorous testing to ensure your AI understands context and your systems are bulletproof.",
    details: ["Response Accuracy", "Stress Testing", "Security Audit"]
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "We launch your new systems into production. We manage the migration and ensure a smooth transition for your team and customers.",
    details: ["Live Launch", "Team Training", "CRM Syncing"]
  },
  {
    icon: BarChart3,
    title: "Manage & Optimize",
    description: "We don't just 'launch and leave'. We continuously monitor performances and optimize your AI to ensure peak efficiency.",
    details: ["Performance Reports", "Ongoing Updates", "Scaling Support"]
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] opacity-40" />
          </div>

          <div className="container relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                Our Process
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white/90">
                <span className="text-blue-500 text-glow">The Proven</span> Path to Growth
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed mb-10">
                Moving your business to the AI era shouldn't be complicated. We follow a rigorous 6-step framework to ensure every solution we deploy delivers maximum impact.
              </p>
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-14 px-10 text-lg font-semibold shadow-blue-900/40 shadow-xl rounded-full">
                Start Your Journey <ArrowRight className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="py-24 relative">
          <div className="container">
            <div className="grid gap-12">
              {steps.map((step, index) => (
                <div key={index} className={`flex flex-col lg:flex-row gap-12 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Visual Card */}
                  <div className="flex-1 w-full flex justify-center lg:block">
                    <div className="relative group overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/40 p-8 md:p-12 backdrop-blur-md hover:border-blue-500/30 transition-all duration-500 max-w-xl lg:max-w-none">
                      <div className="absolute -top-12 -right-12 h-48 w-48 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all" />
                      <div className="relative z-10">
                        <div className="h-16 w-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 border border-blue-500/20">
                          <step.icon className="h-8 w-8 text-blue-500" />
                        </div>
                        <div className="text-xs font-bold text-blue-500 uppercase tracking-widest mb-4">Step 0{index + 1}</div>
                        <h3 className="text-3xl font-bold mb-6 italic text-white/95">{step.title}</h3>
                        <p className="text-slate-400 text-lg leading-relaxed mb-8">{step.description}</p>

                        <div className="flex flex-wrap gap-3">
                          {step.details.map((detail, dIndex) => (
                            <span key={dIndex} className="px-4 py-2 rounded-lg bg-blue-600/5 border border-blue-500/10 text-xs font-medium text-blue-400">
                              {detail}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Connecting Element (only visible on desktop between items) */}
                  <div className="hidden lg:flex items-center justify-center">
                    <div className="h-24 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/50 to-blue-500/0" />
                  </div>

                  <div className="flex-1 hidden lg:block" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why DFY Section */}
        <section className="py-24 bg-slate-950/40">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4 italic">Why "Done-For-You"?</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Scaling with AI is hard. We take the complexity out of it so you can focus on leading your business.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: Cpu,
                  title: "Technical Excellence",
                  desc: "You don't need to hire a team of AI prompt engineers or developers. We are your outsourced AI department."
                },
                {
                  icon: ShieldCheck,
                  title: "Future-Proofed",
                  desc: "The AI landscape changes weekly. We make sure your systems stay updated with the latest models and security protocols."
                },
                {
                  icon: Zap,
                  title: "Speed to Market",
                  desc: "Building these systems in-house takes months. We deploy high-performing solutions in a fraction of the time."
                }
              ].map((item, i) => (
                <div key={i} className="p-8 rounded-3xl border border-white/5 bg-slate-900/20 hover:bg-slate-900/40 transition-all text-center">
                  <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6 mx-auto">
                    {i === 0 && <Cpu className="h-6 w-6 text-blue-500" />}
                    {i === 1 && <ShieldCheck className="h-6 w-6 text-blue-500" />}
                    {i === 2 && <Zap className="h-6 w-6 text-blue-500" />}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24">
          <div className="container">
            <div className="p-12 md:p-20 rounded-[48px] bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 text-center relative overflow-hidden">
              <div className="absolute -bottom-24 -right-24 h-96 w-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
              <h2 className="text-4xl md:text-5xl font-bold mb-8">Ready to see it in action?</h2>
              <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
                Book a free discovery call where we'll audit your current processes and build a mock-up roadmap for your business.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-12 h-14 text-lg">
                  Book My Free Audit
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-12 h-14 text-lg border-white/10 hover:bg-white/5">
                  Browse Services
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
