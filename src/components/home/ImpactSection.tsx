import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";

export const ImpactSection = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-slate-900/30 border-y border-white/5">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={containerVariants}
          >
            <motion.div variants={itemFadeUp} className="badge-blue mb-6">
              The Human Edge
            </motion.div>
            <motion.h2 variants={itemFadeUp} className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
              Built by <span className="gradient-text-blue">Experts</span>,<br />Driven by AI
            </motion.h2>
            <motion.p variants={itemFadeUp} className="text-lg text-slate-400 leading-relaxed mb-8">
              Behind every Conversing AI agent is a team of specialists dedicated to training and fine-tuning your
              business's voice. We ensure your AI doesn't just talk—it understands and converts.
            </motion.p>
            <motion.ul variants={itemFadeUp} className="space-y-4 mb-10">
              <li className="flex items-center gap-3 text-white font-semibold">
                <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Check className="h-4 w-4" />
                </div>
                Expert training & fine-tuning
              </li>
              <li className="flex items-center gap-3 text-white font-semibold">
                <div className="h-6 w-6 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Check className="h-4 w-4" />
                </div>
                Human-like empathy & tone
              </li>
            </motion.ul>
            <motion.div variants={itemFadeUp}>
              <Link to="/about" className="btn-secondary">
                Meet The Team
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full -z-10" />
            <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="/images/collaborative-experts-planning.png" 
                alt="Collaborative AI Expert Team" 
                className="w-full h-auto"
              />
            </div>
          </motion.div>
        </div>

        {/* Centered Case Study */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >
          <motion.div variants={itemFadeUp} className="badge-blue mb-6">
            Real-World Case
          </motion.div>
          <motion.h2 variants={itemFadeUp} className="text-4xl font-bold tracking-tight text-white sm:text-5xl mb-6">
            Perfect for <span className="gradient-text-blue">Clinics & Small Businesses</span>
          </motion.h2>
          <motion.p variants={itemFadeUp} className="text-lg text-slate-400 leading-relaxed mb-10">
            Whether you're running a busy dental clinic or a high-end boutique, our AI Receptionist handles your front
            desk with precision—answering questions, booking appointments, and never missing a call.
          </motion.p>
          <motion.div
            variants={itemFadeUp}
            className="relative w-full aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl mb-12"
          >
            <div className="absolute inset-0 bg-blue-500/10 blur-[80px] rounded-full -z-10" />
            <img 
              src="/images/AI Receptionist for all businesses.png" 
              alt="AI Receptionist for All Businesses" 
              className="w-full h-full object-cover"
            />
          </motion.div>
          <motion.div variants={itemFadeUp}>
            <Link
              to="/services/ai-receptionist"
              className="inline-flex items-center gap-2 h-13 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl btn-glow transition-all duration-200 text-base group"
            >
              Deploy AI Receptionist Today
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
