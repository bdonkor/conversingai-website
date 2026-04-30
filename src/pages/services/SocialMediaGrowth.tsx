import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Share2, CheckCircle2, ArrowRight, TrendingUp, Users, Target } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";
import { Link } from "react-router-dom";

const SocialMediaGrowth = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        {/* Section 1: Hero */}
        <section className="relative py-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-1/2 left-0 w-[500px] h-[500px] bg-green-600/5 rounded-full blur-[120px] opacity-50" />
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px] opacity-30" />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container relative z-10 text-center"
          >
            <div className="max-w-3xl mx-auto">
              <motion.div variants={itemFadeUp} className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 mb-6">
                Service Details
              </motion.div>
              <motion.h1 variants={itemFadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 text-white/90">
                <span className="text-emerald-500 text-glow">Social Media</span> Growth
              </motion.h1>
              <motion.p variants={itemFadeUp} className="text-xl text-muted-foreground leading-relaxed mb-10">
                Scale your brand's presence across all social platforms. We combine organic strategies with data-driven paid advertising to build a loyal community around your business.
              </motion.p>
              <motion.div variants={itemFadeUp} className="flex flex-wrap justify-center gap-4">
                <Link to="/get-started">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700 text-white gap-2 h-14 px-10 text-lg font-semibold shadow-emerald-900/40 shadow-xl">
                    Get started <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/get-quote">
                  <Button size="lg" variant="outline" className="h-14 px-10 border-white/40 ring-2 ring-white/10 bg-slate-950/50 hover:bg-slate-900 text-white text-lg font-semibold transition-all">
                    Free Consultation
                  </Button>
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Section 2: Strategy Pillars */}
        <section className="py-20 bg-slate-950/40">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="container"
          >
            <div className="grid md:grid-cols-3 gap-12">
              <motion.div variants={itemFadeUp} whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-2xl bg-emerald-600/10 flex items-center justify-center mb-8 border border-emerald-500/20">
                  <TrendingUp className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Organic Growth</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Building a genuine audience through consistent, high-quality content that resonates with your target demographic.
                </p>
              </motion.div>
              <motion.div variants={itemFadeUp} whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-2xl bg-emerald-600/10 flex items-center justify-center mb-8 border border-emerald-500/20">
                  <Target className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Paid Advertising</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Highly targeted ad campaigns designed to reach new customers and maximize your return on investment.
                </p>
              </motion.div>
              <motion.div variants={itemFadeUp} whileHover={{ y: -5 }} className="flex flex-col items-center text-center p-6">
                <div className="h-16 w-16 rounded-2xl bg-emerald-600/10 flex items-center justify-center mb-8 border border-emerald-500/20">
                  <Users className="h-8 w-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Community Engagement</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We manage your interactions, turning followers into fans and fans into loyal customers for your brand.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Section 3: The Advantage */}
        <section className="py-20 relative">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="container"
          >
            <div className="rounded-3xl border border-white/5 bg-slate-900/30 p-8 md:p-16">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div variants={itemFadeUp}>
                  <h2 className="text-4xl font-bold mb-8">Dominating Your <br /> Social Presence</h2>
                  <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                    Social media is the modern storefront. We ensure your business is not just seen, but remembered and trusted.
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                    {[
                      "Custom Content Calendar",
                      "Professional Graphic Design",
                      "Short-form Video Content",
                      "Hashtag Optimization",
                      "In-depth Analytics",
                      "Competitor Analysis",
                      "Monthly Strategy Calls",
                      "24/7 Monitoring"
                    ].map((feature, i) => (
                      <motion.li key={i} variants={itemFadeUp} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-500 flex-shrink-0" />
                        <span className="text-muted-foreground font-medium">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
                <motion.div variants={itemFadeUp} className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 group">
                  <div className="absolute inset-0 bg-emerald-600 animate-pulse group-hover:opacity-20 opacity-10 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Share2 className="h-32 w-32 text-emerald-500 opacity-20" />
                  </div>
                  {/* Mockup UI items */}
                  <div className="absolute top-8 left-8 right-8 h-4 bg-white/5 rounded-full" />
                  <div className="absolute top-20 left-8 w-3/4 h-32 bg-emerald-600/20 rounded-lg" />
                  <div className="absolute bottom-8 left-8 w-1/4 h-8 bg-white/5 rounded-full" />
                  <div className="absolute bottom-8 right-8 w-1/4 h-8 bg-white/5 rounded-full" />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SocialMediaGrowth;
