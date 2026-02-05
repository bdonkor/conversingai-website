import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  CheckCircle2,
  ArrowRight,
  Send,
  Clock,
  ShieldCheck,
  Zap,
  MessageSquare,
  Globe,
  Bot,
  TrendingUp,
  PenTool,
  Phone
} from "lucide-react";

const GetQuote = () => {
  const [step, setStep] = useState(1);

  const services = [
    { id: "chat", title: "AI Chat & Voice Agents", icon: MessageSquare },
    { id: "receptionist", title: "AI Receptionist", icon: Phone },
    { id: "web", title: "Website Design", icon: Globe },
    { id: "automation", title: "AI Automation", icon: Bot },
    { id: "leads", title: "Lead Generation", icon: TrendingUp },
    { id: "seo", title: "Blog Writing & SEO", icon: PenTool },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main className="container py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-start max-w-7xl mx-auto">

          {/* Left Column: Visual & Trust */}
          <div className="space-y-12">
            <div>
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                Free Strategy Consultation
              </div>
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8">
                Ready to <span className="text-blue-500 text-glow">Scale</span> Your Business?
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-lg">
                Fill out the form to the right and our AI strategy team will build you a custom implementation roadmap within 24 hours.
              </p>
            </div>

            <div
              className="relative h-[400px] w-full rounded-[32px] overflow-hidden border-2 border-blue-500/30 shadow-2xl bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop")' }}
            >
              <div className="absolute inset-0 bg-[#020617]/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-white" />
                  </div>
                  <p className="text-sm font-medium">98% of consultation roadmaps delivered within 48 hours</p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center flex-shrink-0 text-blue-500 border border-blue-500/20">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 italic">Save Time</h4>
                  <p className="text-slate-400 text-sm">Our streamlined process takes less than 2 minutes to complete.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center flex-shrink-0 text-blue-500 border border-blue-500/20">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold text-lg mb-1 italic">No Obligation</h4>
                  <p className="text-slate-400 text-sm">Get a detailed breakdown and ROI projection with zero commitment.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="relative bg-slate-900/40 backdrop-blur-xl border border-white/10 rounded-[48px] p-8 md:p-12 shadow-2xl">

              {/* Progress Bar */}
              <div className="flex justify-between items-center mb-12">
                {[1, 2, 3].map((num) => (
                  <div key={num} className="flex-1 flex flex-col items-center gap-2">
                    <div className={`h-1.5 w-full rounded-full transition-all duration-500 ${step >= num ? 'bg-blue-600' : 'bg-white/10'}`} />
                    <span className={`text-[10px] font-bold uppercase tracking-widest ${step >= num ? 'text-blue-500' : 'text-slate-500'}`}>
                      {num === 1 ? 'Services' : num === 2 ? 'Project' : 'Contact'}
                    </span>
                  </div>
                ))}
              </div>

              {/* Step 1: Service Selection */}
              {step === 1 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h2 className="text-2xl font-bold mb-8 italic">What can we build for you?</h2>
                  <div className="grid sm:grid-cols-2 gap-4 mb-12">
                    {services.map((service) => (
                      <label
                        key={service.id}
                        className="group relative cursor-pointer"
                      >
                        <input type="checkbox" className="peer sr-only" />
                        <div className="h-full border border-white/10 bg-white/5 rounded-2xl p-6 transition-all peer-checked:border-blue-600 peer-checked:bg-blue-600/10 group-hover:bg-white/10">
                          <service.icon className="h-6 w-6 text-blue-500 mb-3" />
                          <p className="font-bold text-sm tracking-tight">{service.title}</p>
                        </div>
                        <div className="absolute top-4 right-4 h-4 w-4 rounded-full border border-white/20 peer-checked:bg-blue-600 peer-checked:border-blue-600 flex items-center justify-center">
                          <CheckCircle2 className="h-3 w-3 text-white opacity-0 peer-checked:opacity-100" />
                        </div>
                      </label>
                    ))}
                  </div>
                  <Button onClick={() => setStep(2)} className="w-full h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-bold gap-2">
                    Next Step <ArrowRight className="h-5 w-5" />
                  </Button>
                </div>
              )}

              {/* Step 2: Project Details */}
              {step === 2 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h2 className="text-2xl font-bold mb-8 italic">Project Scope & Timeline</h2>
                  <div className="space-y-6 mb-12">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Industry Type</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 transition-all font-medium appearance-none">
                        <option className="bg-[#020617]">Professional Services (Agency/Consulting)</option>
                        <option className="bg-[#020617]">E-commerce & Retail</option>
                        <option className="bg-[#020617]">Technology & SaaS</option>
                        <option className="bg-[#020617]">Real Estate & Property</option>
                        <option className="bg-[#020617]">Healthcare & Medical</option>
                        <option className="bg-[#020617]">Finance & Banking</option>
                        <option className="bg-[#020617]">Education & E-learning</option>
                        <option className="bg-[#020617]">Legal & Law Firms</option>
                        <option className="bg-[#020617]">Manufacturing & Logistics</option>
                        <option className="bg-[#020617]">Hospitality & Tourism</option>
                        <option className="bg-[#020617]">Other</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Desired Launch Date</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 transition-all font-medium appearance-none">
                        <option className="bg-[#020617]">ASAP (Within 1 week)</option>
                        <option className="bg-[#020617]">2-4 Weeks</option>
                        <option className="bg-[#020617]">1-2 Months</option>
                        <option className="bg-[#020617]">Just exploring</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Project Goals</label>
                      <textarea
                        rows={3}
                        placeholder="e.g. Reduce support tickets by 50%..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 transition-all font-medium resize-none mb-4"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">What can we build for you?</label>
                      <textarea
                        rows={4}
                        placeholder="Describe any other specific features or custom requirements you have in mind..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 transition-all font-medium resize-none"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(1)} className="flex-1 h-16 border-white/10 hover:bg-white/5 rounded-2xl text-lg font-bold text-white">
                      Back
                    </Button>
                    <Button onClick={() => setStep(3)} className="flex-[2] h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-bold gap-2">
                      Final Step <ArrowRight className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}

              {/* Step 3: Contact Info */}
              {step === 3 && (
                <div className="animate-in fade-in slide-in-from-right-8 duration-500">
                  <h2 className="text-2xl font-bold mb-8 italic">Where should we send your quote?</h2>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                      <input type="text" placeholder="John Doe" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Work Email</label>
                      <input type="email" placeholder="john@company.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 transition-all font-medium" />
                    </div>
                  </div>
                  <div className="space-y-4 mb-12">
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Company Website</label>
                      <input type="text" placeholder="www.yourcompany.com" className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 transition-all font-medium" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Additional Information</label>
                      <textarea
                        rows={3}
                        placeholder="Any other details you'd like us to know..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-600 transition-all font-medium resize-none"
                      />
                    </div>
                    <p className="text-[10px] text-slate-500 text-center">
                      We'll never share your data. By submitting, you agree to our Terms of Service.
                    </p>
                  </div>
                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep(2)} className="flex-1 h-16 border-white/10 hover:bg-white/5 rounded-2xl text-lg font-bold text-white">
                      Back
                    </Button>
                    <Button className="flex-[2] h-16 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-lg font-bold gap-2 shadow-xl shadow-blue-900/40">
                      Submit & Get Analysis <Send className="h-5 w-5" />
                    </Button>
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GetQuote;
