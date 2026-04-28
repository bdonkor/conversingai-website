import { ArrowRight, Sparkles, Play, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";

const stats = [
  { value: "500+", label: "Projects Delivered", suffix: "" },
  { value: "98", label: "Client Satisfaction", suffix: "%" },
  { value: "24/7", label: "AI Availability", suffix: "" },
  { value: "10x", label: "Efficiency Boost", suffix: "" },
];

export const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-[#020617] py-20 px-4">

      {/* ── Layered Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {/* Mesh gradient */}
        <div className="absolute inset-0 mesh-bg" />

        {/* Central blue orb */}
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }}
        />
        {/* Top-right purple orb */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
          className="absolute -top-32 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)" }}
        />
        {/* Bottom-left teal orb */}
        <motion.div
          animate={{ scale: [1, 1.1, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 6 }}
          className="absolute bottom-0 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)" }}
        />

        {/* Fine grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />

        {/* Top separator glow line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="container relative z-10 flex flex-col gap-20 items-center"
      >
        {/* ── Hero Content ── */}
        <div className="flex flex-col items-center text-center max-w-5xl gap-8">

          {/* Badge */}
          <motion.div variants={itemFadeUp} className="badge-blue">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            Done-For-You AI Services — Everything Managed For You
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={itemFadeUp}
            className="text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl md:text-7xl xl:text-8xl"
          >
            <span className="text-white">Transform Your</span>{" "}
            <br className="hidden sm:block" />
            <span className="gradient-text">Business With AI</span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={itemFadeUp}
            className="max-w-2xl text-lg md:text-xl text-slate-400 leading-relaxed"
          >
            We design, build, deploy, and manage AI agents, automation systems,
            and digital solutions — so you can focus on what you do best.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div variants={itemFadeUp} className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link to="/get-started">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 h-14 px-8 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-lg font-bold btn-glow transition-colors duration-200"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </motion.button>
            </Link>
            <Link to="/how-it-works">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 h-14 px-8 glass-dark text-white rounded-xl text-lg font-semibold hover:bg-white/10 transition-all duration-200 border border-white/10"
              >
                <span className="flex items-center justify-center h-7 w-7 rounded-full bg-white/10 mr-1">
                  <Play className="h-3.5 w-3.5 fill-white text-white ml-0.5" />
                </span>
                See How It Works
              </motion.button>
            </Link>
          </motion.div>

          {/* Trust line */}
          <motion.div variants={itemFadeUp} className="flex items-center gap-3 text-sm text-slate-500">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span>Trusted by 500+ businesses worldwide · No technical skills required</span>
          </motion.div>
        </div>

        {/* ── Stats Row ── */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="w-full grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemFadeUp}
              whileHover={{ y: -4, scale: 1.02 }}
              className="glass-card shimmer group flex flex-col items-center justify-center gap-2 rounded-2xl p-7 text-center transition-all duration-300 hover:border-blue-500/20"
            >
              <div className="stat-number text-4xl md:text-5xl font-black">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-slate-400 tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};
