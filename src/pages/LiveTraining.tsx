import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { MessageSquare, Monitor } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";
import { Link } from "react-router-dom";

const LiveTraining = () => {
  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px] opacity-50" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px] opacity-30" />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container relative z-10 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <motion.div variants={itemFadeUp} className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                Professional Coaching
              </motion.div>
              <motion.h1 variants={itemFadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
                Live <span className="gradient-text-blue">1-on-1 Training</span> Session
              </motion.h1>
              <motion.p variants={itemFadeUp} className="text-xl text-slate-400 leading-relaxed mb-10">
                Book an intensive private session to master AI implementation or Website Strategy. Personalized support to help you achieve your goals faster.
              </motion.p>
            </div>
          </motion.div>
        </section>

        {/* Lesson Selection */}
        <section className="py-24">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Choose Your Lesson</h2>
              <p className="text-slate-400">Select the area you want to focus on during our intensive sessions.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {/* AI Chat Agent Lesson */}
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col h-full"
              >
                <div className="h-14 w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center mb-6 border border-blue-500/20">
                  <MessageSquare className="h-7 w-7 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">AI Chat Agent Mastery</h3>
                <p className="text-slate-400 mb-8 flex-grow">
                  Learn to build, design, and deploy high-converting AI chat agents for any website. Includes conversational design skills.
                </p>
                <div className="mb-8">
                  <span className="text-3xl font-bold text-white">$50</span>
                  <span className="text-slate-500 ml-2">/ 2 Hours (1 Sunday)</span>
                </div>
                <Link to="/get-started">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl">
                    Enroll Now
                  </Button>
                </Link>
              </motion.div>

              {/* Website Strategy Lesson */}
              <motion.div
                whileHover={{ y: -5 }}
                className="glass-card p-8 rounded-2xl border border-white/5 flex flex-col h-full"
              >
                <div className="h-14 w-14 rounded-2xl bg-indigo-600/10 flex items-center justify-center mb-6 border border-indigo-500/20">
                  <Monitor className="h-7 w-7 text-indigo-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Premium Website Design</h3>
                <p className="text-slate-400 mb-8 flex-grow">
                  Comprehensive 2-hour Sunday (4-week) course. Master high-performance design, for businesses and individuals.
                </p>
                <div className="mb-8">
                  <span className="text-3xl font-bold text-white">$300</span>
                  <span className="text-slate-500 ml-2">/ 4 Sundays (2hrs ea.)</span>
                </div>
                <Link to="/get-started">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 rounded-xl">
                    Enroll Now
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Fallback */}
        <section className="py-20 bg-slate-950/40">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center p-12 glass-card rounded-3xl border border-white/5">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-slate-400 mb-8">
                Not sure which lesson is right for you? Or have specific requirements? We're happy to help.
              </p>
              <Link to="/contact">
                <Button variant="outline" className="h-12 px-8 border-white/20 hover:bg-white/5 text-white gap-2">
                  <MessageSquare className="h-4 w-4" /> Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LiveTraining;
