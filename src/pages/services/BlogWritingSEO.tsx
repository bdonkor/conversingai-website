import { useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { PenTool, ArrowRight, Search, BarChart, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const BlogWritingSEO = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const sliderImages = [
    "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&q=80&w=800"
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % sliderImages.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-background text-white">
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px] opacity-20" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-3xl">
              <div className="inline-flex items-center rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-400 mb-6">
                Service Details
              </div>
              <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 text-white/90">
                <span className="text-blue-500 text-glow">Authority</span> Blog Writing
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8">
                Authority-building blog content integrated with technical SEO. We don't just write articles; we build assets that rank on Google and turn readers into customers.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/get-quote">
                  <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 h-14 px-8 text-lg font-semibold border-2 border-blue-400 ring-2 ring-blue-500/50">
                    Free Consultation <ArrowRight className="h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="h-14 px-8 border-slate-800 bg-slate-950/50 hover:bg-slate-900 text-white text-lg font-semibold">
                  Our Writing Style
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-slate-950/30">
          <div className="container">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center group">
                <div className="h-16 w-16 mx-auto bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Search className="h-8 w-8 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Keyword Research</h3>
                <p className="text-sm text-muted-foreground">Finding the high-intent keywords your customers are already searching for.</p>
              </div>
              <div className="text-center group">
                <div className="h-16 w-16 mx-auto bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <PenTool className="h-8 w-8 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Authority Writing</h3>
                <p className="text-sm text-muted-foreground">Deeply researched content that establishes you as a leader in your industry.</p>
              </div>
              <div className="text-center group">
                <div className="h-16 w-16 mx-auto bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <Globe className="h-8 w-8 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">On-Page SEO</h3>
                <p className="text-sm text-muted-foreground">Optimizing every element to ensure Google understands and ranks your content.</p>
              </div>
              <div className="text-center group">
                <div className="h-16 w-16 mx-auto bg-blue-600/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                  <BarChart className="h-8 w-8 text-blue-500 group-hover:text-white" />
                </div>
                <h3 className="text-lg font-bold mb-2">Growth Tracking</h3>
                <p className="text-sm text-muted-foreground">Monthly reporting on rankings, traffic, and keyword performance.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-20">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6 italic">"Content is King, but Strategy is the Kingdom."</h2>
                <p className="text-muted-foreground mb-8 text-lg">
                  We combine storytelling with search data to create a content machine that feeds your sales funnel 24 hours a day.
                </p>
                <div className="space-y-4">
                  {[
                    "1,500+ Word Authority Pillars",
                    "Technical SEO Site Audits",
                    "Backlink Building Strategy",
                    "Content Distribution Systems",
                    "Conversion Optimization (CRO)"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span className="font-medium text-slate-300">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 border border-white/10 rounded-3xl relative overflow-hidden h-[450px] shadow-2xl flex flex-col">
                {/* Browser Header with Dots */}
                <div className="h-14 border-b border-white/5 flex items-center px-6 bg-[#0a0f1e] shrink-0">
                  <div className="flex items-center gap-2">
                    <div className="h-3 w-3 rounded-full bg-red-500 shadow-sm shadow-red-500/50" />
                    <div className="h-3 w-3 rounded-full bg-yellow-500 shadow-sm shadow-yellow-500/50" />
                    <div className="h-3 w-3 rounded-full bg-green-500 shadow-sm shadow-green-500/50" />
                  </div>
                </div>

                {/* Non-stop Image Slider below the header */}
                <div className="flex-1 relative overflow-hidden group">
                  {sliderImages.map((img, index) => (
                    <div
                      key={index}
                      className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentImage ? "opacity-100" : "opacity-0"
                        }`}
                    >
                      <img
                        src={img}
                        alt="Blogging Strategy"
                        className="w-full h-full object-cover transition-transform duration-[10s] group-hover:scale-110"
                      />
                      {/* Gentle overlay to bind imagery and design */}
                      <div className="absolute inset-0 bg-blue-600/10 mix-blend-overlay" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default BlogWritingSEO;
