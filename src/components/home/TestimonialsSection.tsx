import { Quote, Star } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";

const testimonials = [
  {
    quote: "Conversing AI transformed our customer service. Our AI agents handle 80% of inquiries now, and our team can focus on high-value tasks. The ROI was visible within the first month.",
    author: "Sarah Mitchell",
    role: "CEO, TechStart Inc.",
    initials: "SM",
    gradient: "from-blue-600 to-indigo-600",
    rating: 5,
  },
  {
    quote: "The lead generation subscription has been a game-changer. We went from struggling to find leads to having a consistent pipeline. Their AI qualification saves us hours every week.",
    author: "Marcus Johnson",
    role: "Founder, GrowthLabs",
    initials: "MJ",
    gradient: "from-violet-600 to-purple-600",
    rating: 5,
  },
  {
    quote: "They redesigned our website and set up AI chat — our conversion rate doubled. The team is incredibly professional and the results speak for themselves. Absolutely outstanding.",
    author: "Emily Chen",
    role: "Marketing Director, Apex Solutions",
    initials: "EC",
    gradient: "from-cyan-600 to-teal-600",
    rating: 5,
  },
];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-px section-divider" />
        <div className="absolute bottom-0 left-0 w-full h-px section-divider" />
        <div className="absolute inset-0 bg-slate-950/30" />
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
            Client Stories
          </motion.div>
          <motion.h2 variants={itemFadeUp} className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-6">
            Trusted by{" "}
            <span className="gradient-text-blue">Growing Businesses</span>
          </motion.h2>
          <motion.p variants={itemFadeUp} className="text-lg text-slate-400 leading-relaxed">
            See what our clients say about working with us. Real results from real businesses.
          </motion.p>
        </motion.div>

        {/* Testimonial Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 md:grid-cols-3"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              variants={itemFadeUp}
              whileHover={{ y: -6 }}
              className="relative flex flex-col justify-between glass-card rounded-2xl p-8 border border-white/5 hover:border-white/10 transition-all duration-300 hover:shadow-xl hover:shadow-black/20"
            >
              {/* Top: Quote icon + stars */}
              <div className="flex items-start justify-between mb-6">
                <div className="h-10 w-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Quote className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </div>

              {/* Quote text */}
              <p className="text-sm text-slate-300 leading-relaxed mb-8 flex-1">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className={`h-11 w-11 rounded-full bg-gradient-to-br ${testimonial.gradient} flex items-center justify-center text-white font-bold text-sm shadow-lg flex-shrink-0`}>
                  {testimonial.initials}
                </div>
                <div>
                  <div className="font-semibold text-white text-sm">{testimonial.author}</div>
                  <div className="text-xs text-slate-500 mt-0.5">{testimonial.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Trusted Companies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-600 mb-10">
            Trusted by innovative companies worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {["TechCorp", "InnovateCo", "FutureLabs", "GrowthFirst", "ScaleUp", "NextGen"].map((company, i) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.08, color: "#60a5fa" }}
                className="text-base font-bold text-slate-700 cursor-default transition-colors duration-200"
              >
                {company}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
