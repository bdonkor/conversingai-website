import { Button } from "@/components/ui/button";
import { ArrowRight, Play, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[85vh] flex flex-col items-center justify-center overflow-hidden bg-[#020617] py-16 px-4">
      {/* Background Brain/Network Simulation */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]" />
        {/* You could add an SVG or Image here for the brain network if desired */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5" />
      </div>

      <div className="container relative z-10 flex flex-col gap-16 items-center">
        {/* Top Row: Hero Content */}
        <div className="flex flex-col items-center text-center max-w-4xl gap-8">
          <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
            Done-For-You AI Services
          </div>

          <h1 className="text-5xl font-extrabold leading-[1.1] tracking-tight sm:text-6xl md:text-7xl text-white">
            Transform Your Business With <span className="text-blue-500 text-glow">AI-Powered Growth</span>
          </h1>

          <p className="max-w-2xl text-xl text-muted-foreground/80 leading-relaxed">
            We design, build, deploy, and manage AI agents, automation systems, and digital solutions — so you can focus on what you do best.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground/90">
              <CheckCircle2 className="h-5 w-5 text-blue-500" />
              Fully managed AI solutions
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground/90">
              <CheckCircle2 className="h-5 w-5 text-blue-500" />
              No technical expertise required
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground/90">
              <CheckCircle2 className="h-5 w-5 text-blue-500" />
              Deployed within days
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 mt-4">
            <Link to="/get-started">
              <Button size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-xl shadow-blue-900/30 text-lg font-semibold transition-all hover:scale-105">
                Get started <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button size="lg" variant="outline" className="h-14 px-8 border-slate-800 bg-slate-950/50 hover:bg-slate-900 text-white gap-2 text-lg font-semibold transition-all">
                <Play className="h-5 w-5 fill-white" /> How It Works
              </Button>
            </Link>
          </div>
        </div>

        {/* Bottom Row: Stats (from Image 2) */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          <div className="group flex flex-col gap-2 rounded-2xl border border-white/5 bg-[#0a0f1e]/80 p-8 transition-all hover:border-blue-500/30 hover:bg-[#0a0f1e] text-center">
            <div className="text-4xl font-bold text-blue-500 mb-1 group-hover:scale-110 transition-transform">500+</div>
            <div className="text-sm font-medium text-slate-400">Projects Delivered</div>
          </div>

          <div className="group flex flex-col gap-2 rounded-2xl border border-white/5 bg-[#0a0f1e]/80 p-8 transition-all hover:border-blue-500/30 hover:bg-[#0a0f1e] text-center">
            <div className="text-4xl font-bold text-blue-500 mb-1 group-hover:scale-110 transition-transform">98%</div>
            <div className="text-sm font-medium text-slate-400">Client Satisfaction</div>
          </div>

          <div className="group flex flex-col gap-2 rounded-2xl border border-white/5 bg-[#0a0f1e]/80 p-8 transition-all hover:border-blue-500/30 hover:bg-[#0a0f1e] text-center">
            <div className="text-4xl font-bold text-blue-500 mb-1 group-hover:scale-110 transition-transform">24/7</div>
            <div className="text-sm font-medium text-slate-400">AI Availability</div>
          </div>

          <div className="group flex flex-col gap-2 rounded-2xl border border-white/5 bg-[#0a0f1e]/80 p-8 transition-all hover:border-blue-500/30 hover:bg-[#0a0f1e] text-center">
            <div className="text-4xl font-bold text-blue-500 mb-1 group-hover:scale-110 transition-transform">10x</div>
            <div className="text-sm font-medium text-slate-400">Efficiency Boost</div>
          </div>
        </div>
      </div>
    </section>
  );
};
