import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import {
  Rocket,
  ArrowRight,
  Calendar,
  FileText,
  Zap,
  CheckCircle2,
  Users,
  Briefcase
} from "lucide-react";
import { Link } from "react-router-dom";

const GetStarted = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-40 shrink-0" />
            <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] opacity-30 shrink-0" />
          </div>

          <div className="container relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-8 animate-bounce">
                <Rocket className="h-4 w-4" /> The Journey Begins Here
              </div>
              <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8">
                How would you like to <span className="text-blue-500 text-glow">Scale?</span>
              </h1>
              <p className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto mb-12">
                Choose the path that best suits your current needs. Whether you're ready to build or just exploring possibilities, we're here to guide you.
              </p>
            </div>
          </div>
        </section>

        {/* Choice Path Section */}
        <section className="py-12 bg-slate-900/20">
          <div className="container">
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

              {/* Path 1: Ready to Build */}
              <div className="group relative p-8 rounded-[40px] border border-white/10 bg-slate-900/40 backdrop-blur-xl hover:border-blue-500/50 transition-all flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:bg-blue-600 transition-colors">
                  <Zap className="h-8 w-8 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic">I'm Ready to Build</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                  You know what you need and you're ready for a custom quote. We'll analyze your requirements and deliver a roadmap in 48 hours.
                </p>
                <Link to="/get-quote" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-2xl h-14 font-bold gap-2">
                    Request Quote <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

              {/* Path 2: Let's Talk Strategy */}
              <div className="group relative p-8 rounded-[40px] border border-blue-500/30 bg-blue-600/5 backdrop-blur-xl hover:scale-105 transition-all flex flex-col items-center text-center z-10">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-1 rounded-full">
                  Most Popular
                </div>
                <div className="h-16 w-16 rounded-2xl bg-blue-600 flex items-center justify-center mb-8 shadow-lg shadow-blue-900/40">
                  <Calendar className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic">Discovery Call</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                  Schedule a free 15-minute strategy session. We'll discuss your goals and see if our AI solutions are the right fit for your business.
                </p>
                <Button className="w-full bg-white text-blue-900 hover:bg-slate-200 rounded-2xl h-14 font-bold gap-2">
                  Book a Slot <ArrowRight className="h-4 w-4" />
                </Button>
              </div>

              {/* Path 3: I'm Just Exploring */}
              <div className="group relative p-8 rounded-[40px] border border-white/10 bg-slate-900/40 backdrop-blur-xl hover:border-blue-500/50 transition-all flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 border border-blue-500/20 group-hover:bg-blue-600 transition-colors">
                  <FileText className="h-8 w-8 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-4 italic">Just Exploring</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-1">
                  Read our latest insights on AI and business growth. Learn how other companies are winning with our implementation strategies.
                </p>
                <Link to="/blog" className="w-full">
                  <Button variant="outline" className="w-full border-white/10 hover:bg-white/5 rounded-2xl h-14 font-bold text-white gap-2">
                    Visit the Blog <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* What to Expect Section */}
        <section className="py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold mb-12 text-center">What happens next?</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { icon: Briefcase, title: "Alignment", desc: "We review your submission to ensure perfect alignment with your goals." },
                  { icon: Zap, title: "Analysis", desc: "Our team drafts a custom AI roadmap tailored to your specific infrastructure." },
                  { icon: Users, title: "Review", desc: "We jump on a call if needed to walk you through the projected ROI." },
                  { icon: CheckCircle2, title: "Launch", desc: "Our DFY team builds and deploys your solution with zero tech hassle." }
                ].map((item, i) => (
                  <div key={i} className="p-6">
                    <item.icon className="h-6 w-6 text-blue-500 mb-4" />
                    <h4 className="font-bold mb-2">{item.title}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default GetStarted;
