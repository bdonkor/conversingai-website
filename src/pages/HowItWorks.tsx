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
  Cpu,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";

const steps = [
  {
    icon: Search,
    title: "Discovery & Audit",
    description: "We start by diving deep into your business. We identify bottlenecks, repetitive tasks, and growth opportunities that AI can solve.",
  },
  {
    icon: Lightbulb,
    title: "Strategic Planning",
    description: "No cookie-cutter solutions. We design a custom AI architecture and digital strategy tailored specifically to your business goals.",
  },
  {
    icon: Code2,
    title: "Build & Develop",
    description: "Our engineers build your AI agents, automation workflows, or premium website. We handle all the technical heavy lifting.",
  },
  {
    icon: Zap,
    title: "Testing & QA",
    description: "Before going live, we put everything through rigorous testing to ensure your AI understands context and your systems are bulletproof.",
  },
  {
    icon: Rocket,
    title: "Deployment",
    description: "We launch your new systems into production. We manage the migration and ensure a smooth transition for your team and customers.",
  },
  {
    icon: BarChart3,
    title: "Manage & Optimize",
    description: "We don't just 'launch and leave'. We continuously monitor performances and optimize your AI to ensure peak efficiency.",
  }
];

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main className="bg-[#020617]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-24 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px] bg-blue-600/10 rounded-full blur-[150px] opacity-30 px-4" />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container relative z-10 text-center"
          >
            <div className="max-w-4xl mx-auto">
              <motion.div variants={itemFadeUp} className="inline-flex items-center rounded-full border border-blue-500/20 bg-blue-950/30 px-6 py-2 text-sm font-semibold text-blue-400 mb-10 backdrop-blur-md">
                Our Process
              </motion.div>
              <motion.h1 variants={itemFadeUp} className="text-6xl md:text-8xl font-black tracking-tight mb-10 text-white leading-[1.1]">
                <span className="text-blue-500 text-glow">The Proven</span> Path to <br /> Growth
              </motion.h1>
              <motion.p variants={itemFadeUp} className="text-xl md:text-2xl text-slate-400 font-medium leading-relaxed mb-12 max-w-3xl mx-auto">
                Moving your business to the AI era shouldn't be complicated. We follow a rigorous 6-step framework to ensure every solution we deploy delivers maximum impact.
              </motion.p>
              <motion.div variants={itemFadeUp}>
                <Link to="/get-started">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-16 px-12 text-xl font-bold rounded-full shadow-2xl shadow-blue-600/40 transition-all hover:scale-105 active:scale-95 group">
                    Start Your Journey <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* List Section */}
        <section className="pt-24 pb-8 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="container max-w-4xl"
          >
            <div className="text-center mb-16">
              <motion.h2 variants={itemFadeUp} className="text-3xl md:text-5xl font-bold mb-6 italic">How We Deliver Results</motion.h2>
              <motion.p variants={itemFadeUp} className="text-slate-400 max-w-2xl mx-auto">A seamless, full-service approach to bringing your AI vision to life.</motion.p>
            </div>

            <div className="space-y-4">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  variants={itemFadeUp}
                  whileHover={{ scale: 1.02 }}
                  className="group flex flex-col md:flex-row items-start md:items-center gap-6 p-8 rounded-[32px] border border-white/5 bg-slate-950/50 hover:bg-slate-900/40 hover:border-blue-500/30 transition-all duration-300 shadow-xl"
                >
                  {/* Icon Container */}
                  <div className="h-16 w-16 rounded-2xl bg-blue-600/10 flex items-center justify-center border border-blue-500/20 shrink-0 group-hover:scale-110 transition-transform">
                    <step.icon className="h-8 w-8 text-blue-500" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="text-2xl font-bold text-white leading-none">{step.title}</h3>
                    </div>
                    <p className="text-slate-400 text-base leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Why DFY Section */}
        <section className="pt-12 pb-24 bg-slate-950/40">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="container"
          >
            <div className="text-center mb-16">
              <motion.h2 variants={itemFadeUp} className="text-4xl font-bold mb-4 italic">Why "Done-For-You"?</motion.h2>
              <motion.p variants={itemFadeUp} className="text-slate-400 max-w-2xl mx-auto">Scaling with AI is hard. We take the complexity out of it so you can focus on leading your business.</motion.p>
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
                <motion.div key={i} variants={itemFadeUp} whileHover={{ y: -5 }} className="p-8 rounded-3xl border border-white/5 bg-slate-900/20 hover:bg-slate-900/40 transition-all text-center">
                  <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6 mx-auto">
                    {i === 0 && <Cpu className="h-6 w-6 text-blue-500" />}
                    {i === 1 && <ShieldCheck className="h-6 w-6 text-blue-500" />}
                    {i === 2 && <Zap className="h-6 w-6 text-blue-500" />}
                  </div>
                  <h4 className="text-xl font-bold mb-3">{item.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="container"
          >
            <div className="p-12 md:p-20 rounded-[48px] bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 text-center relative overflow-hidden">
              <div className="absolute -bottom-24 -right-24 h-96 w-96 bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
              <motion.h2 variants={itemFadeUp} className="text-4xl md:text-5xl font-bold mb-8">Ready to see it in action?</motion.h2>
              <motion.p variants={itemFadeUp} className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
                Book a free discovery call where we'll audit your current processes and build a mock-up roadmap for your business.
              </motion.p>
              <motion.div variants={itemFadeUp} className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-12 h-14 text-lg">
                  Book My Free Audit
                </Button>
                <Button size="lg" variant="outline" className="rounded-full px-12 h-14 text-lg border-white/10 hover:bg-white/5">
                  Browse Services
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HowItWorks;
