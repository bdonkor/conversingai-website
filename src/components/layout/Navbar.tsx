import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-20 items-center justify-between">
        <Link to="/" className="mr-6 flex items-center space-x-2">
          <img src="/logo.jpg" alt="ConversingAI Logo" className="h-14 w-auto rounded-sm object-contain" />
          <span className="font-bold text-2xl tracking-tight">Conversing AI</span>
        </Link>
        <nav className="hidden md:flex items-center justify-center space-x-8 text-base font-medium bg-white/5 border border-white/10 px-8 py-2 rounded-full backdrop-blur-md shadow-sm">
          <Link to="/" className="transition-colors hover:text-primary text-foreground/80">Home</Link>

          <div className="relative group cursor-pointer py-1">
            <div className="flex items-center gap-1 transition-colors hover:text-primary text-foreground/60">
              Services
              <span className="text-[10px] opacity-50 transition-transform group-hover:rotate-180">▼</span>
            </div>

            {/* Dropdown Menu */}
            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-[100]">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-xl p-2 w-56 shadow-2xl">
                <Link to="/services/ai-chat-voice-agents" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap">AI Chat & Voice Agents</Link>
                <Link to="/services/ai-receptionist" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap">AI Receptionist</Link>
                <Link to="/services/website-design" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap">Website Design</Link>
                <Link to="/services/ai-automation" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap">AI Automation</Link>
                <Link to="/services/lead-generation" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap">Lead Generation</Link>
                <Link to="/services/blog-writing-seo" target="_blank" rel="noopener noreferrer" className="block px-4 py-2 text-sm rounded-lg hover:bg-white/10 transition-colors whitespace-nowrap">Blog Writing & SEO</Link>
              </div>
            </div>
          </div>


          <Link to="/how-it-works" className="transition-colors hover:text-primary text-foreground/60">How It Works</Link>
          <Link to="/blog" className="transition-colors hover:text-primary text-foreground/60">Blog</Link>
          <Link to="/about" className="transition-colors hover:text-primary text-foreground/60">About Us</Link>
          <Link to="/contact" className="transition-colors hover:text-primary text-foreground/60">Contact</Link>
        </nav>
        <div className="flex items-center space-x-4">
          <Link to="/get-quote">
            <Button variant="outline" size="sm" className="hidden sm:inline-flex border-blue-600 text-blue-500 hover:bg-blue-600/10 font-bold tracking-tight">Free Consultation</Button>
          </Link>
          <Link to="/get-started">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/20 font-bold">Get started</Button>
          </Link>
        </div>
      </div>
    </header>
  );
};
