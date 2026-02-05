import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Globe, CheckCircle2, ArrowRight, Layout, Search, MousePointer2 } from "lucide-react";

import { Link } from "react-router-dom";

const WebsiteDesign = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Section 1: Hero */}
        <section className="relative py-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] opacity-50" />
          </div>

          <div className="container relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                Service Details
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white/90">
                <span className="text-blue-500 text-glow">Premium</span> Website Design
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-10">
                We build conversion-focused, high-performance websites that don't just look stunning — they drive growth and establish your brand authority.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link to="/get-started">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-14 px-10 text-lg font-semibold shadow-blue-900/40 shadow-xl">
                    Get started <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-10 border-slate-800 bg-slate-950/50 hover:bg-slate-900 text-white text-lg font-semibold">
                  View Portfolio
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: Pillars of Growth */}
        <section className="py-20 bg-slate-950/40">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-12">
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 border border-blue-500/20">
                  <Layout className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Conversion Focused</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Every pixel is placed with intent. We design layouts that guide your visitors toward the actions that grow your business.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 border border-blue-500/20">
                  <MousePointer2 className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Premium UX/UI</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Modern, sleek, and intuitive. We create digital experiences that wow your customers and keep them coming back.
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 border border-blue-500/20">
                  <Search className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">SEO Optimized</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Built to be found. From clean code to lightning-fast load speeds, we ensure your site ranks where it counts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: The Advantage */}
        <section className="py-20 relative">
          <div className="container">
            <div className="rounded-3xl border border-white/5 bg-slate-900/30 p-8 md:p-16">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <div>
                  <h2 className="text-4xl font-bold mb-8">Building Your Digital <br /> Competitive Advantage</h2>
                  <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                    A website is your most valuable 24/7 salesperson. We ensure it's equipped with everything it needs to close the deal.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      "Mobile-First Design",
                      "Lightning Fast Performance",
                      "Full CRM Integration",
                      "AI Chatbot Ready",
                      "E-commerce Capability",
                      "Secure Cloud Hosting",
                      "Analytics Dashboard",
                      "Continuous Maintenance"
                    ].map((feature, i) => (
                      <li key={i} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-blue-500 flex-shrink-0" />
                        <span className="text-muted-foreground font-medium">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                  <div className="absolute inset-0 bg-blue-600 animate-pulse group-hover:opacity-20 opacity-10 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Globe className="h-32 w-32 text-blue-500 opacity-20" />
                  </div>
                  {/* Mockup UI items */}
                  <div className="absolute top-8 left-8 right-8 h-4 bg-white/5 rounded-full" />
                  <div className="absolute top-20 left-8 w-1/2 h-8 bg-blue-600/20 rounded-lg" />
                  <div className="absolute top-36 left-8 w-1/3 h-4 bg-white/5 rounded-full" />
                  <div className="absolute bottom-8 right-8 w-1/4 h-24 bg-white/5 rounded-2xl" />
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

export default WebsiteDesign;
