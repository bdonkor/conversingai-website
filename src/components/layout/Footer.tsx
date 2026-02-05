import { Mail, MessageSquare, MapPin, Linkedin, Twitter, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="w-full bg-[#030712] border-t border-white/5 pb-12 pt-20 relative overflow-hidden">
      {/* Subtle brand glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-48 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-0">
          {/* Brand & Contact - Takes 4 columns */}
          <div className="flex flex-col gap-6 lg:col-span-4">
            <Link to="/" className="flex items-center space-x-2">
              <img src="/logo.jpg" alt="Conversing AI Logo" className="h-12 w-auto rounded-sm object-contain" />
              <span className="font-bold text-2xl tracking-tighter text-white">Conversing AI</span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Done-for-you AI, automation & digital growth services. We design, build, deploy, and manage AI systems end-to-end.
            </p>
            <ul className="flex flex-col gap-4 text-sm text-slate-400">
              <li className="flex items-center gap-3 group">
                <div className="h-8 w-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <Mail className="h-4 w-4" />
                </div>
                <a href="mailto:info@conversingai.com" className="hover:text-blue-400 transition-colors">info@conversingai.com</a>
              </li>
              <li className="flex items-center gap-3 group">
                <div className="h-8 w-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <button className="hover:text-blue-400 transition-colors font-medium">Chat With Us</button>
              </li>
              <li className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500">
                  <MapPin className="h-4 w-4" />
                </div>
                <span>Global Remote Team</span>
              </li>
            </ul>
          </div>

          {/* Spacer - 1 column gap to separate brand from links */}
          <div className="hidden lg:block lg:col-span-1" />

          {/* Menu Sections Container - Evenly distributed */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-12 lg:gap-8 lg:pt-3">
            {/* Services */}
            <div>
              <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Services</h3>
              <ul className="flex flex-col gap-4 text-sm text-slate-400">
                <li><Link to="/services/ai-chat-voice-agents" className="hover:text-blue-400 transition-colors">AI Chat & Voice Agents</Link></li>
                <li><Link to="/services/ai-receptionist" className="hover:text-blue-400 transition-colors">AI Receptionist</Link></li>
                <li><Link to="/services/website-design" className="hover:text-blue-400 transition-colors">Website Design</Link></li>
                <li><Link to="/services/ai-automation" className="hover:text-blue-400 transition-colors">AI Automation</Link></li>
                <li><Link to="/services/lead-generation" className="hover:text-blue-400 transition-colors">Lead Generation</Link></li>
                <li><Link to="/services/blog-writing-seo" className="hover:text-blue-400 transition-colors">Blog Writing & SEO</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Company</h3>
              <ul className="flex flex-col gap-4 text-sm text-slate-400">
                <li><Link to="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
                <li><Link to="/how-it-works" className="hover:text-blue-400 transition-colors">How It Works</Link></li>
                <li><Link to="/blog" className="hover:text-blue-400 transition-colors">Blog</Link></li>
                <li><Link to="/contact" className="hover:text-blue-400 transition-colors">Contact</Link></li>
                <li><Link to="/careers" className="hover:text-blue-400 transition-colors">Careers</Link></li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="font-bold text-white mb-6 uppercase tracking-widest text-xs">Legal</h3>
              <ul className="flex flex-col gap-4 text-sm text-slate-400">
                <li><Link to="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link></li>
                <li><Link to="/cookies" className="hover:text-blue-400 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 pt-8 border-t border-white/5 flex flex-col items-center justify-between gap-6 md:flex-row">
          <p className="text-xs text-slate-500">
            © 2026 Conversing AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {[
              { icon: Linkedin, href: "#" },
              { icon: Twitter, href: "#" },
              { icon: Facebook, href: "#" },
              { icon: Instagram, href: "#" }
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target={social.href.startsWith('http') ? "_blank" : undefined}
                rel={social.href.startsWith('http') ? "noopener noreferrer" : undefined}
                className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:bg-blue-600 hover:text-white hover:border-blue-500 transition-all shadow-lg"
              >
                <social.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
