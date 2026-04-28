import { MessageSquare, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";

const perks = [
  "No contracts — cancel anytime",
  "Results in 7–14 days",
  "100% Done-For-You",
];

export const CTASection = () => {
  return (
    <section id="contact" className="py-24 md:py-32 px-4">
      <div className="container">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background layers */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-[#020617] to-violet-900/15" />
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[120px]"
              style={{ background: "radial-gradient(circle, rgba(59,130,246,0.25) 0%, transparent 60%)" }}
            />
            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.35, 0.2] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px]"
              style={{ background: "radial-gradient(circle, rgba(139,92,246,0.2) 0%, transparent 60%)" }}
            />
            {/* Border gradient */}
            <div className="absolute inset-0 rounded-3xl border border-blue-500/20" />
            <div
              className="absolute inset-0 opacity-[0.025]"
              style={{
                backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "60px 60px",
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 px-8 py-20 md:px-20 md:py-24 text-center">
            <motion.div variants={itemFadeUp} className="badge-blue mb-8 inline-flex">
              Ready to Transform?
            </motion.div>

            <motion.h2
              variants={itemFadeUp}
              className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6 max-w-3xl mx-auto"
            >
              Let's Build Your{" "}
              <span className="gradient-text">AI-Powered Future</span>
            </motion.h2>

            <motion.p
              variants={itemFadeUp}
              className="max-w-2xl mx-auto text-lg text-slate-400 leading-relaxed mb-10"
            >
              Stop struggling with technology. Let our experts design, build, and
              manage AI solutions that drive real results for your business.
            </motion.p>

            {/* Perks */}
            <motion.div
              variants={itemFadeUp}
              className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12"
            >
              {perks.map((perk, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-slate-400">
                  <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                  {perk}
                </div>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              variants={itemFadeUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link to="/get-started">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 h-14 px-10 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-base btn-glow transition-colors duration-200"
                >
                  <MessageSquare className="h-5 w-5" />
                  Get Started Today
                </motion.button>
              </Link>
              <Link to="/get-quote">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2.5 h-14 px-10 glass-dark text-white rounded-xl font-semibold text-base hover:bg-white/10 transition-all duration-200 border border-white/10"
                >
                  Book Free Consultation
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
