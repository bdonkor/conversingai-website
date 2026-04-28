import { MessageSquare, Phone, Globe, PenTool, ArrowRight, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";

const services = [
  {
    icon: MessageSquare,
    title: "AI Chat & Voice Agents",
    description: "24/7 intelligent chat and voice agents that handle customer interactions, answer questions, and drive conversions automatically.",
    features: ["Website chat agents", "Voice & phone agents", "WhatsApp support"],
    href: "/services/ai-chat-voice-agents",
    color: "blue",
  },
  {
    icon: Phone,
    title: "AI Receptionist",
    description: "Never miss a call. Our AI receptionists handle inquiries, book appointments, and route calls intelligently around the clock.",
    features: ["Call handling", "Appointment booking", "Smart call routing"],
    href: "/services/ai-receptionist",
    color: "violet",
  },
  {
    icon: Globe,
    title: "Website Design",
    description: "Premium, conversion-focused websites built to capture leads and establish your brand authority in the digital space.",
    features: ["Mobile responsive", "SEO optimized", "Conversion focused"],
    href: "/services/website-design",
    color: "cyan",
  },
  {
    icon: PenTool,
    title: "Blog Writing & SEO",
    description: "Authority-building content that ranks on Google. Professional, human-sounding articles delivered on a consistent schedule.",
    features: ["SEO friendly", "Authority building", "Regular publishing"],
    href: "/services/blog-writing-seo",
    color: "orange",
  },
];

const colorMap: Record<string, { icon: string; badge: string; border: string; dot: string }> = {
  blue: { icon: "bg-blue-600/15 text-blue-400 group-hover:bg-blue-600 group-hover:text-white", badge: "bg-blue-600", border: "hover:border-blue-500/40", dot: "bg-blue-500" },
  violet: { icon: "bg-violet-600/15 text-violet-400 group-hover:bg-violet-600 group-hover:text-white", badge: "bg-violet-600", border: "hover:border-violet-500/40", dot: "bg-violet-500" },
  cyan: { icon: "bg-cyan-600/15 text-cyan-400 group-hover:bg-cyan-600 group-hover:text-white", badge: "bg-cyan-600", border: "hover:border-cyan-500/40", dot: "bg-cyan-500" },
  green: { icon: "bg-emerald-600/15 text-emerald-400 group-hover:bg-emerald-600 group-hover:text-white", badge: "bg-emerald-600", border: "hover:border-emerald-500/40", dot: "bg-emerald-500" },
  orange: { icon: "bg-orange-600/15 text-orange-400 group-hover:bg-orange-600 group-hover:text-white", badge: "bg-orange-600", border: "hover:border-orange-500/40", dot: "bg-orange-500" },
};

export const ServicesSection = () => {
  return (
    <section id="services" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/5 blur-[120px] rounded-full" />
      </div>

      <div className="container relative z-10">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="mx-auto flex max-w-3xl flex-col items-center justify-center text-center mb-20"
        >
          <motion.div variants={itemFadeUp} className="badge-blue mb-6">
            Our Services
          </motion.div>
          <motion.h2 variants={itemFadeUp} className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl mb-6">
            Everything You Need to{" "}
            <span className="gradient-text-blue">Grow Digitally</span>
          </motion.h2>
          <motion.p variants={itemFadeUp} className="text-lg text-slate-400 leading-relaxed max-w-2xl">
            Premium done-for-you services. We handle the technology, you enjoy the results.
            No technical expertise required.
          </motion.p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service, index) => {
            const c = colorMap[service.color];
            return (
              <motion.div
                key={index}
                variants={itemFadeUp}
                whileHover={{ y: -6 }}
                className={`relative group glass-card rounded-2xl p-8 border border-white/5 transition-all duration-300 ${c.border} hover:shadow-xl hover:shadow-black/20 shimmer`}
              >
                {/* Icon */}
                <div className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-300 ${c.icon}`}>
                  <service.icon className="h-7 w-7" />
                </div>

                {/* Title */}
                <h3 className="mb-3 text-xl font-bold text-white leading-snug">{service.title}</h3>

                {/* Description */}
                <p className="mb-6 text-sm text-slate-400 leading-relaxed">
                  {service.description}
                </p>

                {/* Features */}
                <ul className="mb-8 space-y-2.5">
                  {service.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm text-slate-400">
                      <CheckCircle className={`h-4 w-4 flex-shrink-0 ${c.dot.replace("bg-", "text-")}`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* CTA Link */}
                <Link
                  to={service.href}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-1" />
                </Link>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 flex flex-col items-center gap-5 text-center"
        >
          <p className="text-slate-400 text-base">Not sure which service you need? Let's discuss your goals.</p>
          <Link
            to="/get-quote"
            className="inline-flex items-center gap-2 h-13 px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl btn-glow transition-all duration-200 text-base group"
          >
            Book a Free Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
