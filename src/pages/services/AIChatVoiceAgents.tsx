import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MessageSquare, CheckCircle2, ArrowRight, Zap, Shield, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";

const AIChatVoiceAgents = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Section 1: Hero */}
        <section className="relative py-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] opacity-50" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-600/5 rounded-full blur-[120px] opacity-30" />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container relative z-10"
          >
            <div className="max-w-3xl">
              <motion.div variants={itemFadeUp} className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                Service Details
              </motion.div>
              <motion.h1 variants={itemFadeUp} className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white/90">
                <span className="text-blue-500 text-glow">AI Chat &</span> Voice Agents
              </motion.h1>
              <motion.p variants={itemFadeUp} className="text-xl text-muted-foreground leading-relaxed mb-8">
                Automate your customer interactions with intelligent agents that sound human, understand context, and drive real business results 24/7.
              </motion.p>
              <motion.div variants={itemFadeUp} className="flex flex-wrap gap-4">
                <Link to="/get-started">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-14 px-8 text-lg font-semibold shadow-lg shadow-blue-900/20">
                    Get started <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/get-quote">
                  <Button size="lg" variant="outline" className="h-14 px-8 border-white/40 ring-2 ring-white/10 bg-slate-950/50 hover:bg-slate-900 text-white text-lg font-semibold transition-all">
                    Free Consultation
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Key Features */}
        <section className="py-20 bg-slate-950/30">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid md:grid-cols-3 gap-8"
            >
              <motion.div variants={itemFadeUp} className="p-8 rounded-2xl border border-white/5 bg-slate-900/50 hover:border-blue-500/30 transition-all group">
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Zap className="h-6 w-6 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Instant Response</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Zero wait times. Your AI agents engage customers the microsecond they reach out, ensuring no lead is ever lost.
                </p>
              </motion.div>
              <motion.div variants={itemFadeUp} className="p-8 rounded-2xl border border-white/5 bg-slate-900/50 hover:border-blue-500/30 transition-all group">
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Globe className="h-6 w-6 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Multi-Platform</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Deploy your agents across Website, WhatsApp, Facebook, and Voice lines — all managed from a single brain.
                </p>
              </motion.div>
              <motion.div variants={itemFadeUp} className="p-8 rounded-2xl border border-white/5 bg-slate-900/50 hover:border-blue-500/30 transition-all group">
                <div className="h-12 w-12 rounded-xl bg-blue-600/10 flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Shield className="h-6 w-6 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4">Secure & Accurate</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Enterprise-grade security and accuracy. Our agents are trained strictly on your data to provide perfect information.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Section 3: Value Prop */}
        <section className="py-20">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              className="grid lg:grid-cols-2 gap-16 items-center"
            >
              <motion.div variants={itemFadeUp}>
                <h2 className="text-3xl md:text-4xl font-bold mb-8">Why Choose Our AI Agents?</h2>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="mt-1 h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Contextual Awareness</h4>
                      <p className="text-muted-foreground">Agents remember previous interactions and handle complex, multi-turn conversations seamlessly.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">Human-Like Voice</h4>
                      <p className="text-muted-foreground">Our voice agents use advanced neural TTS to sound warm, natural, and indistinguishable from human staff.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="mt-1 h-6 w-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg mb-1">CRM Integration</h4>
                      <p className="text-muted-foreground">Every interaction, lead, and appointment is automatically synced to your existing business tools.</p>
                    </div>
                  </div>
                </div>
              </motion.div>
              <motion.div variants={itemFadeUp} className="relative">
                <div className="aspect-square rounded-3xl bg-blue-600/5 border border-blue-500/20 flex items-center justify-center p-12">
                  <MessageSquare className="h-48 w-48 text-blue-500 opacity-20 absolute" />
                  <div className="relative z-10 w-full space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="bg-slate-900 border border-white/10 p-4 rounded-2xl w-3/4 ml-auto"
                    >
                      <p className="text-sm">How can I help you today?</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="bg-blue-600 p-4 rounded-2xl w-3/4 text-white shadow-xl shadow-blue-900/40"
                    >
                      <p className="text-sm">I'd like to book a consultation for next Tuesday morning.</p>
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.4 }}
                      className="bg-slate-900 border border-white/10 p-4 rounded-2xl w-3/4 ml-auto"
                    >
                      <p className="text-sm">Certainly! I see openings at 9:00 AM and 10:30 AM. Which works best?</p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AIChatVoiceAgents;
