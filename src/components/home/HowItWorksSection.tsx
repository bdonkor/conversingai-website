import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";

const steps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description: "Share your business goals and challenges. We'll listen carefully and understand exactly what you're looking to achieve.",
    color: "from-blue-600 to-blue-500",
    glow: "shadow-blue-600/30",
  },
  {
    number: "02",
    title: "We Design The Solution",
    description: "Our team crafts a tailored AI strategy and digital roadmap built specifically for your business needs and objectives.",
    color: "from-violet-600 to-violet-500",
    glow: "shadow-violet-600/30",
  },
  {
    number: "03",
    title: "We Build & Deploy",
    description: "We handle everything from development to deployment. You don't need to lift a finger or worry about technical details.",
    color: "from-cyan-600 to-cyan-500",
    glow: "shadow-cyan-600/30",
  },
  {
    number: "04",
    title: "We Support & Optimize",
    description: "We continuously monitor, maintain, and improve your systems. Your success is our ongoing commitment.",
    color: "from-emerald-600 to-emerald-500",
    glow: "shadow-emerald-600/30",
  },
];

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px section-divider" />
        <div className="absolute bottom-0 left-0 w-full h-px section-divider" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center mb-20"
        >
          <motion.div variants={itemFadeUp} className="badge-blue mb-6">
            How It Works
          </motion.div>
          <motion.h2 variants={itemFadeUp} className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            Your Path to{" "}
            <span className="gradient-text-blue">Digital Transformation</span>
          </motion.h2>
          <motion.p variants={itemFadeUp} className="text-lg text-slate-400 leading-relaxed">
            A simple, streamlined process that takes you from idea to implementation.
            We do all the heavy lifting.
          </motion.p>
        </motion.div>

        {/* Steps Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 relative"
        >
          {/* Connecting line on desktop */}
          <div className="absolute top-14 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-blue-600/30 via-emerald-600/20 to-blue-600/30 hidden lg:block" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemFadeUp}
              whileHover={{ y: -6 }}
              className="relative flex flex-col gap-5 p-7 rounded-2xl glass-card border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Step number badge */}
              <div className={`h-12 w-12 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center text-white font-black text-base shadow-xl ${step.glow} relative z-10`}>
                {step.number}
              </div>

              <div>
                <h3 className="text-lg font-bold text-white mb-2 leading-snug">{step.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center"
        >
          <a
            href="/how-it-works"
            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group"
          >
            Learn more about our process
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};
