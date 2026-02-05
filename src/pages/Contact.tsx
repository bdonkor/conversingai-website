import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Mail,
  MessageSquare,
  MapPin,
  Send,
  CheckCircle2
} from "lucide-react";

const Contact = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] opacity-30" />
            <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px] opacity-20" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                Contact Us
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white/90">
                <span className="text-blue-500 text-glow">Let's Build</span> Your AI Future
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-2xl">
                Ready to automate your operations and scale your growth? Reach out today for a free discovery call and audit.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Grid */}
        <section className="py-24">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Left Column: Info & Trust */}
              <div className="space-y-12">
                <div>
                  <h2 className="text-3xl font-bold mb-8 italic text-white/95">Get in touch directly</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 group">
                      <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Email us</p>
                        <a href="mailto:info@conversingai.com" className="text-lg font-medium hover:text-blue-400 transition-colors tracking-tight">info@conversingai.com</a>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <MessageSquare className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Live Chat</p>
                        <button className="text-lg font-medium hover:text-blue-400 transition-colors tracking-tight">Chat with us</button>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 group">
                      <div className="h-12 w-12 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500 border border-blue-500/20">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-1">Our Location</p>
                        <p className="text-lg font-medium tracking-tight">Global Remote Team</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-8 rounded-[32px] bg-slate-900/40 border border-white/10 backdrop-blur-md">
                  <h3 className="text-xl font-bold mb-6">Why work with us?</h3>
                  <div className="space-y-4">
                    {[
                      "Dedicated Account Management",
                      "Custom-built AI Solutions",
                      "Full Technical Support",
                      "Transparent ROI Tracking"
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-500" />
                        <span className="text-slate-300 font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>


              </div>

              {/* Right Column: Contact Form */}
              <div className="relative">
                <div className="absolute inset-0 bg-blue-600/5 blur-[80px] rounded-full pointer-events-none" />
                <div className="relative p-8 md:p-12 rounded-[40px] border border-white/10 bg-slate-900/40 backdrop-blur-xl shadow-2xl max-w-xl mx-auto lg:max-w-none">
                  <h2 className="text-2xl font-bold mb-8">Send us a message</h2>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Full Name</label>
                        <input
                          type="text"
                          placeholder="John Doe"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500 transition-all font-medium"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Email Address</label>
                        <input
                          type="email"
                          placeholder="john@company.com"
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500 transition-all font-medium"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Service of Interest</label>
                      <select className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500 transition-all font-medium appearance-none">
                        <option className="bg-[#020617]">Select a service</option>
                        <option className="bg-[#020617]">AI Chat & Voice Agents</option>
                        <option className="bg-[#020617]">AI Receptionist</option>
                        <option className="bg-[#020617]">Website Design</option>
                        <option className="bg-[#020617]">AI Automation</option>
                        <option className="bg-[#020617]">Lead Generation</option>
                        <option className="bg-[#020617]">Other / Inquiry</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 ml-1">Project Details</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your business goals..."
                        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 outline-none focus:border-blue-500 transition-all font-medium resize-none"
                      />
                    </div>

                    <Button className="w-full h-16 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white text-lg font-bold gap-2 shadow-xl shadow-blue-900/40 group">
                      Submit Inquiry <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    </Button>

                    <p className="text-center text-[10px] text-slate-500 mt-4">
                      By submitting this form, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Preview */}
        <section className="py-24 bg-slate-950/40">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 italic">Common Questions</h2>
              <p className="text-slate-400">Everything you need to know before we start.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="p-8 rounded-3xl border border-white/5 bg-slate-900/10">
                <h4 className="font-bold mb-3 text-white">How fast is the deployment?</h4>
                <p className="text-sm text-slate-400">Most AI Agent and Automation projects are deployed within 7-14 business days after the strategy is finalized.</p>
              </div>
              <div className="p-8 rounded-3xl border border-white/5 bg-slate-900/10">
                <h4 className="font-bold mb-3 text-white">Do I need technical skills?</h4>
                <p className="text-sm text-slate-400">Not at all. We are a "Done-For-You" service. We handle development, hosting, and maintenance entirely.</p>
              </div>
              <div className="p-8 rounded-3xl border border-white/5 bg-slate-900/10">
                <h4 className="font-bold mb-3 text-white">What is the cost structure?</h4>
                <p className="text-sm text-slate-400">We offer both project-based pricing and monthly managed subscriptions depending on your scale and needs.</p>
              </div>
              <div className="p-8 rounded-3xl border border-white/5 bg-slate-900/10">
                <h4 className="font-bold mb-3 text-white">Can I integrate existing tools?</h4>
                <p className="text-sm text-slate-400">Yes! We specialize in connecting AI to your existing CRM, Slack, WhatsApp, and 6,000+ other enterprise apps.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contact;
