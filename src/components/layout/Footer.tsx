import { Mail, MessageSquare, MapPin, Linkedin, Twitter, Facebook, Instagram, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";

const footerLinks = {
  Services: [
    { label: "AI Chat & Voice Agents", href: "/services/ai-chat-voice-agents" },
    { label: "AI Receptionist", href: "/services/ai-receptionist" },
    { label: "Website Design", href: "/services/website-design" },
    { label: "Blog Writing & SEO", href: "/services/blog-writing-seo" },
    { label: "Social Media Growth", href: "/services/social-media-growth" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Blog", href: "/blog" },
    { label: "AI Courses", href: "/ai-courses" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/careers" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
    { label: "Refund Policy", href: "/refund" },
  ],
};

const socials = [
  { Icon: Linkedin, href: "#", label: "LinkedIn" },
  { Icon: Twitter, href: "#", label: "Twitter" },
  { Icon: Facebook, href: "#", label: "Facebook" },
  { Icon: Instagram, href: "#", label: "Instagram" },
];

export const Footer = () => {
  return (
    <footer className="w-full bg-[#020617] border-t border-white/5 pb-10 pt-20 relative overflow-hidden">
      {/* Background details */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-48 bg-blue-600/8 blur-[100px] rounded-full pointer-events-none" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        className="container relative z-10"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-0">

          {/* Brand Column — 4 cols */}
          <motion.div variants={itemFadeUp} className="flex flex-col gap-7 lg:col-span-4 lg:pr-12">
            <Link to="/" className="flex items-center gap-3 group w-fit">
              <img src="/logo.jpg" alt="Conversing AI Logo" className="h-11 w-auto rounded-lg object-contain" />
              <span className="font-extrabold text-xl tracking-tight text-white">
                Conversing<span className="text-blue-400"> AI</span>
              </span>
            </Link>

            <p className="text-sm text-slate-500 leading-relaxed max-w-xs">
              Done-for-you AI, automation & digital growth services. We design, build, deploy,
              and manage AI systems end-to-end so you can focus on your business.
            </p>

            {/* Contact info */}
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <a
                  href="mailto:info@conversingai.com"
                  className="flex items-center gap-3 group/item text-slate-500 hover:text-white transition-colors duration-200"
                >
                  <div className="h-9 w-9 rounded-xl bg-blue-600/10 border border-blue-500/15 flex items-center justify-center text-blue-500 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-200 flex-shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  info@conversingai.com
                </a>
              </li>
              <li>
                <button className="flex items-center gap-3 group/item text-slate-500 hover:text-white transition-colors duration-200">
                  <div className="h-9 w-9 rounded-xl bg-blue-600/10 border border-blue-500/15 flex items-center justify-center text-blue-500 group-hover/item:bg-blue-600 group-hover/item:text-white transition-all duration-200 flex-shrink-0">
                    <MessageSquare className="h-4 w-4" />
                  </div>
                  Live Chat Support
                </button>
              </li>
              <li>
                <div className="flex items-center gap-3 text-slate-500">
                  <div className="h-9 w-9 rounded-xl bg-blue-600/10 border border-blue-500/15 flex items-center justify-center text-blue-500 flex-shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  Global Remote Team
                </div>
              </li>
            </ul>

            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-xl bg-blue-600/10 border border-blue-500/15 px-4 py-2.5 w-fit">
              <Sparkles className="h-3.5 w-3.5 text-blue-400" />
              <span className="text-xs font-semibold text-blue-400">500+ Happy Clients</span>
            </div>
          </motion.div>

          {/* Spacer */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Links Grid — 7 cols */}
          <motion.div variants={itemFadeUp} className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-10 lg:pt-1">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="font-bold text-white mb-5 uppercase tracking-widest text-xs">
                  {category}
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        to={link.href}
                        className="text-sm text-slate-500 hover:text-blue-400 transition-colors duration-200 leading-none"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          variants={itemFadeUp}
          className="mt-16 pt-8 border-t border-white/5 flex flex-col items-center justify-between gap-6 md:flex-row"
        >
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Conversing AI. All rights reserved. Built with ❤️ for businesses worldwide.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="h-9 w-9 rounded-xl bg-white/4 border border-white/8 flex items-center justify-center text-slate-500 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all duration-200 shadow-lg"
              >
                <Icon className="h-4 w-4" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};
