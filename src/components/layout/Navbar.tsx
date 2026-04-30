import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ArrowRight } from "lucide-react";

const services = [
  { label: "AI Chat & Voice Agents", href: "/services/ai-chat-voice-agents", desc: "Automate customer conversations 24/7" },
  { label: "AI Receptionist", href: "/services/ai-receptionist", desc: "Never miss a call or inquiry" },
  { label: "Website Design", href: "/services/website-design", desc: "Premium conversion-focused websites" },
  { label: "Blog Writing & SEO", href: "/services/blog-writing-seo", desc: "Content that ranks and converts" },
  { label: "Social Media Growth", href: "/services/social-media-growth", desc: "Scale your audience automatically" },
];

const trainingLinks = [
  { label: "AI Courses", href: "/ai-courses", desc: "Master AI automation today" },
  { label: "Live 1-on-1 Training", href: "/live-training", desc: "Personalized expert guidance" },
];

export const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [trainingOpen, setTrainingOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setTrainingOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => location.pathname === href;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled
        ? "bg-[#020617]/92 backdrop-blur-xl border-b border-white/6 shadow-xl shadow-black/30"
        : "bg-transparent border-b border-transparent"
        }`}
    >
      <div className="container flex h-20 items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group flex-shrink-0">
          <img
            src="/logo.jpg"
            alt="Conversing AI Logo"
            className="h-12 w-auto rounded-lg object-contain transition-transform duration-200 group-hover:scale-105"
          />
          <span className="font-extrabold text-xl tracking-tight text-white hidden sm:block">
            Conversing<span className="text-blue-400"> AI</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/4 border border-white/8 px-6 py-2 rounded-full backdrop-blur-xl">
          <Link
            to="/"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive("/") ? "text-white bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/6"
              }`}
          >
            Welcome
          </Link>
          
          <Link
            to="/about"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive("/about") ? "text-white bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/6"
              }`}
          >
            About Us
          </Link>

          {/* Services Dropdown */}
          <div className="relative group" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/6 transition-all duration-200">
              Services
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <AnimatePresence>
              {servicesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[100] w-72"
                >
                  <div className="glass-dark rounded-2xl p-2 shadow-2xl shadow-black/50 border border-white/8">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        to={s.href}
                        className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-blue-600/20 transition-all duration-150 group/item"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-200 group-hover/item:text-white transition-colors">{s.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-slate-600 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
                        </div>
                        <span className="text-xs text-slate-500 group-hover/item:text-slate-400 transition-colors">{s.desc}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Training Dropdown */}
          <div className="relative group" onMouseEnter={() => setTrainingOpen(true)} onMouseLeave={() => setTrainingOpen(false)}>
            <button className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-slate-400 hover:text-white hover:bg-white/6 transition-all duration-200">
              Training
              <ChevronDown className="h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180" />
            </button>
            <AnimatePresence>
              {trainingOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8, scale: 0.97 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-3 z-[100] w-72"
                >
                  <div className="glass-dark rounded-2xl p-2 shadow-2xl shadow-black/50 border border-white/8">
                    {trainingLinks.map((s) => (
                      <Link
                        key={s.href}
                        to={s.href}
                        className="flex flex-col gap-0.5 px-4 py-3 rounded-xl hover:bg-blue-600/20 transition-all duration-150 group/item"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-slate-200 group-hover/item:text-white transition-colors">{s.label}</span>
                          <ArrowRight className="h-3.5 w-3.5 text-slate-600 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0.5 transition-all" />
                        </div>
                        <span className="text-xs text-slate-500 group-hover/item:text-slate-400 transition-colors">{s.desc}</span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            to="/blog"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive("/blog") ? "text-white bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/6"
              }`}
          >
            Blog
          </Link>
          <Link
            to="/contact"
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${isActive("/contact") ? "text-white bg-white/10" : "text-slate-400 hover:text-white hover:bg-white/6"
              }`}
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Link to="/get-quote">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="h-10 px-5 rounded-lg border border-white/15 text-sm font-semibold text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-200"
            >
              Free Consultation
            </motion.button>
          </Link>
          <Link to="/get-started">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="h-10 px-6 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold btn-glow transition-colors duration-200"
            >
              Get Started
            </motion.button>
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait" initial={false}>
            {mobileOpen ? (
              <motion.span key="x" initial={{ opacity: 0, rotate: -90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: 90 }} transition={{ duration: 0.15 }}>
                <X className="h-5 w-5" />
              </motion.span>
            ) : (
              <motion.span key="menu" initial={{ opacity: 0, rotate: 90 }} animate={{ opacity: 1, rotate: 0 }} exit={{ opacity: 0, rotate: -90 }} transition={{ duration: 0.15 }}>
                <Menu className="h-5 w-5" />
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden bg-[#020617]/97 backdrop-blur-xl border-t border-white/6"
          >
            <div className="container py-6 space-y-1">
              <Link to="/" className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/6 transition-all">Welcome</Link>
              <Link to="/about" className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/6 transition-all">About Us</Link>

              {/* Mobile Services */}
              <div>
                <button
                  onClick={() => {
                    setServicesOpen(!servicesOpen);
                    setTrainingOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/6 transition-all"
                >
                  Services
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 mt-1 space-y-0.5 overflow-hidden"
                    >
                      {services.map((s) => (
                        <Link key={s.href} to={s.href} className="flex items-center px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-3 flex-shrink-0" />
                          {s.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Training */}
              <div>
                <button
                  onClick={() => {
                    setTrainingOpen(!trainingOpen);
                    setServicesOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/6 transition-all"
                >
                  Training
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${trainingOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {trainingOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="ml-4 mt-1 space-y-0.5 overflow-hidden"
                    >
                      {trainingLinks.map((s) => (
                        <Link key={s.href} to={s.href} className="flex items-center px-4 py-2.5 rounded-xl text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mr-3 flex-shrink-0" />
                          {s.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/blog" className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/6 transition-all">Blog</Link>
              <Link to="/contact" className="flex items-center px-4 py-3 rounded-xl text-sm font-semibold text-slate-300 hover:text-white hover:bg-white/6 transition-all">Contact</Link>

              <div className="pt-4 flex flex-col gap-3">
                <Link to="/get-quote">
                  <button className="w-full h-12 rounded-xl border border-white/15 text-sm font-semibold text-slate-300 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all">
                    Free Consultation
                  </button>
                </Link>
                <Link to="/get-started">
                  <button className="w-full h-12 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold btn-glow transition-colors">
                    Get Started
                  </button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};
