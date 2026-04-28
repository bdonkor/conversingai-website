import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";
import {
  Target,
  Eye,
  Users,
  Award,
  TrendingUp,
  ShieldCheck,
  Globe,
  ArrowRight
} from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] opacity-40" />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container relative z-10 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <motion.div variants={itemFadeUp} className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                About Conversing AI
              </motion.div>
              <motion.h1 variants={itemFadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 text-white/90">
                <span className="text-blue-500 text-glow">The Future</span> of AI Business
              </motion.h1>
              <motion.p variants={itemFadeUp} className="text-xl text-slate-400 leading-relaxed max-w-2xl mx-auto">
                We are a specialist "Done-For-You" AI agency dedicated to helping businesses navigate the complex landscape of artificial intelligence with ease.
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Mission & Vision Section */}
        <section className="py-24 relative overflow-hidden">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="container relative z-10"
          >
            <div className="grid md:grid-cols-2 gap-12">
              {/* Mission */}
              <motion.div
                variants={itemFadeUp}
                whileHover={{ y: -5 }}
                className="relative group p-8 md:p-12 rounded-[40px] border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden transition-all hover:border-blue-500/30"
              >
                <div className="absolute -top-12 -right-12 h-48 w-48 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all" />
                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 border border-blue-500/20">
                    <Target className="h-7 w-7 text-blue-500" />
                  </div>
                  <h2 className="text-3xl font-bold mb-6 italic text-white/95">Our Mission</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    To empower businesses by building and managing intelligent AI solutions that eliminate operational friction, double conversion rates, and unlock sustainable, long-term growth. We handle the technology so you can handle the business.
                  </p>
                </div>
              </motion.div>

              {/* Vision */}
              <motion.div
                variants={itemFadeUp}
                whileHover={{ y: -5 }}
                className="relative group p-8 md:p-12 rounded-[40px] border border-white/10 bg-slate-900/40 backdrop-blur-md overflow-hidden transition-all hover:border-blue-500/30"
              >
                <div className="absolute -bottom-12 -right-12 h-48 w-48 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all" />
                <div className="relative z-10">
                  <div className="h-14 w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-8 border border-blue-500/20">
                    <Eye className="h-7 w-7 text-blue-500" />
                  </div>
                  <h2 className="text-3xl font-bold mb-6 italic text-white/95">Our Vision</h2>
                  <p className="text-slate-400 text-lg leading-relaxed">
                    To become the world's most trusted partner for "Done-For-You" AI services, defining the global standard for how modern enterprises integrate and benefit from autonomous intelligence. We envision a future where every business is AI-powered and human-led.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Core Values */}
        <section className="py-24 bg-slate-950/40">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="container"
          >
            <div className="text-center mb-16">
              <motion.h2 variants={itemFadeUp} className="text-4xl font-bold mb-4 italic">The Principles That Drive Us</motion.h2>
              <motion.p variants={itemFadeUp} className="text-slate-400 max-w-2xl mx-auto">Transparency, Innovation, and Excellence are at the heart of everything we build.</motion.p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: "Trust First", desc: "We prioritize security and ethical AI practices in every deployment." },
                { icon: TrendingUp, title: "ROI Driven", desc: "Every line of code and AI prompt is designed with your bottom line in mind." },
                { icon: Users, title: "Global Team", desc: "A world-class remote team working across continents to deliver 24/7." },
                { icon: Globe, title: "Future Ready", desc: "We build systems that adapt to the rapidly evolving AI landscape." }
              ].map((value, i) => (
                <motion.div
                  key={i}
                  variants={itemFadeUp}
                  whileHover={{ y: -5 }}
                  className="p-8 rounded-3xl border border-white/5 bg-slate-900/20 hover:bg-slate-900/40 transition-all text-center group"
                >
                  <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6 mx-auto group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <value.icon className="h-6 w-6 text-blue-500 group-hover:text-white" />
                  </div>
                  <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                  <p className="text-slate-500 text-sm leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Why Conversing AI */}
        <section className="py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="container"
          >
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <motion.h2 variants={itemFadeUp} className="text-4xl font-bold mb-8 italic">Innovation Beyond <span className="text-blue-500">The Screen</span></motion.h2>
                <motion.p variants={itemFadeUp} className="text-slate-400 text-lg leading-relaxed mb-8">
                  Founded on the belief that AI should be accessible to every business, regardless of their technical depth. We saw a gap: thousands of amazing AI tools exist, but few companies have the time or expertise to integrate them correctly.
                </motion.p>
                <motion.p variants={itemFadeUp} className="text-slate-400 text-lg leading-relaxed mb-10">
                  Conversing AI was built to be that bridge. We don't just give you tools; we build you a department of intelligent autonomous agents.
                </motion.p>
                <motion.div variants={itemFadeUp} className="grid grid-cols-2 gap-8">
                  <div>
                    <p className="text-4xl font-extrabold text-blue-500 mb-2">500+</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Solutions Deployed</p>
                  </div>
                  <div>
                    <p className="text-4xl font-extrabold text-blue-500 mb-2">24/7</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Managed Support</p>
                  </div>
                </motion.div>
              </div>
              <motion.div variants={itemFadeUp} className="relative">
                <div className="absolute inset-0 bg-blue-600/5 blur-[100px] rounded-full" />
                <div className="relative aspect-square rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                    alt="Our Collaborative Team"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent" />
                  <div className="absolute bottom-10 left-10">
                    <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center mb-4">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                    <p className="text-white font-bold text-xl uppercase tracking-widest italic">Industry Leaders in DFY AI</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
            className="container text-center"
          >
            <div className="max-w-4xl mx-auto p-12 md:p-20 rounded-[48px] bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 relative overflow-hidden">
              <div className="absolute -top-24 -right-24 h-96 w-96 bg-blue-600/10 rounded-full blur-[120px]" />
              <motion.h2 variants={itemFadeUp} className="text-4xl md:text-5xl font-bold mb-8">Join the AI Revolution</motion.h2>
              <motion.p variants={itemFadeUp} className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
                Stop watching the AI wave from the sidelines. Partner with a team that actually delivers.
              </motion.p>
              <motion.div variants={itemFadeUp}>
                <Button className="h-16 px-12 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-lg font-bold gap-2 shadow-xl shadow-blue-900/40 hover:scale-105 transition-transform">
                  Get Started with Conversing AI <ArrowRight className="h-5 w-5" />
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


export default About;
