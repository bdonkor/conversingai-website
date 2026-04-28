import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <motion.main
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="container py-24 max-w-4xl mx-auto"
      >
        <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mb-12">
          <motion.div
            variants={itemFadeUp}
            className="h-24 w-24 rounded-3xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center relative overflow-hidden shrink-0 group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute top-0 right-0 w-8 h-8 bg-blue-500/10 rounded-full blur-xl animate-pulse" />
            <svg
              className="w-12 h-12 text-blue-500 relative z-10"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </motion.div>

          <motion.div variants={itemFadeUp}>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-2">
              Refund <span className="text-blue-500 text-glow">Policy</span>
            </h1>
            <p className="text-slate-400 font-medium">Last Updated: February 2026</p>
          </motion.div>
        </div>

        <div className="prose prose-invert prose-slate max-w-none space-y-12">
          <motion.section variants={itemFadeUp}>
            <p className="text-slate-400 leading-relaxed mb-6">
              At Conversing AI, we take pride in delivering high-quality, custom-built AI chat and voice agents designed to accelerate business growth. As a service-oriented company, we invest substantial time and resources into every project. This refund policy outlines the conditions under which a refund may or may not be issued.
            </p>
          </motion.section>

          <motion.section variants={itemFadeUp}>
            <h2 className="text-2xl font-bold text-white mb-4">1. Nature of Services & Refund Eligibility</h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Our products are not physical goods; they are tailored AI solutions developed specifically to meet your business needs. Due to the personalized and technical nature of our services, returns and refunds are not automatic and are subject to evaluation.
            </p>
            <p className="text-slate-400 leading-relaxed">
              Creating AI agents involves an inordinate amount of time, research, coding, testing, and fine-tuning. If you are not absolutely certain that you need this service, we strongly advise against placing an order. Our team's time and effort are valuable and, in most cases, cannot be reclaimed once the process has begun.
            </p>
          </motion.section>

          <motion.section variants={itemFadeUp}>
            <h2 className="text-2xl font-bold text-white mb-4">2. Non-Refundable Situations</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              The following cases are non-refundable:
            </p>
            <ul className="list-disc pl-6 text-slate-400 space-y-2">
              <li>Change of mind after work has commenced.</li>
              <li>Delays caused by the client's failure to respond, provide materials, or approve stages.</li>
              <li>Completed and delivered services.</li>
              <li>Projects where significant time and effort have already been invested.</li>
            </ul>
          </motion.section>

          <motion.section variants={itemFadeUp}>
            <h2 className="text-2xl font-bold text-white mb-4">3. Dispute Resolution</h2>
            <p className="text-slate-400 leading-relaxed">
              If a resolution cannot be reached through mutual communication, the matter may be addressed through mediation or legal channels, in accordance with our Terms and Conditions.
            </p>
          </motion.section>

          <motion.section variants={itemFadeUp}>
            <h2 className="text-2xl font-bold text-white mb-4">4. Policy Updates</h2>
            <p className="text-slate-400 leading-relaxed">
              Conversing AI reserves the right to amend this Refund Policy at any time. Updates will be posted on our website with a revised effective date.
            </p>
          </motion.section>

          <motion.section variants={itemFadeUp} className="bg-blue-600/5 border border-blue-500/10 rounded-[32px] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-3xl rounded-full" />
            <div className="relative z-10">
              <h2 className="text-2xl font-bold text-white mb-4">5. Contact Us</h2>
              <p className="text-slate-400 leading-relaxed mb-6">
                For questions or concerns about this policy, or to start a discussion regarding a project, please reach out directly:
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <a href="mailto:info@conversingai.com" className="flex items-center gap-4 bg-slate-900/50 border border-white/10 p-4 rounded-2xl hover:border-blue-500/30 transition-all group">
                  <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                  </div>
                  <span className="text-slate-300 font-medium">info@conversingai.com</span>
                </a>
                <a href="https://conversingai.com" className="flex items-center gap-4 bg-slate-900/50 border border-white/10 p-4 rounded-2xl hover:border-blue-500/30 transition-all group">
                  <div className="h-10 w-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><line x1="2" x2="22" y1="12" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
                  </div>
                  <span className="text-slate-300 font-medium">conversingai.com</span>
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.main>
      <Footer />
    </div>
  );
};

export default RefundPolicy;
