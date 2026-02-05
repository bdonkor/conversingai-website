import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight, Clock, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";

const blogPosts = [
  {
    id: 1,
    title: "How AI Agents are Revolutionizing Customer Service in 2026",
    excerpt: "Discover why businesses are moving away from traditional support models of the past and embracing autonomous AI agents for 24/7 engagement.",
    category: "AI Strategy",
    author: "DK Benjamin",
    date: "Feb 12, 2026",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    featured: true,
    slug: "/blog/ai-revolution-2026"
  },
  {
    id: 2,
    title: "The ROI of Marketing Automation: What the Data Shows",
    excerpt: "We analyze over 500 projects to see exactly how much time and money businesses save when implementing intelligent workflow automation.",
    category: "Automation",
    author: "DK Benjamin",
    date: "Feb 10, 2026",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1551288049-bbda10a56d70?auto=format&fit=crop&q=80&w=800",
    featured: false,
    slug: "#"
  },
  {
    id: 3,
    title: "SEO is Changing: How to Rank in the AI-Search Era",
    excerpt: "With SGE and AI-powered search engines, traditional keyword stuffing is dead. Here is what you need to focus on for 2026.",
    category: "SEO",
    author: "DK Benjamin",
    date: "Feb 08, 2026",
    readTime: "8 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    featured: false,
    slug: "#"
  },
  {
    id: 4,
    title: "5 Common Mistakes When Deploying Voice AI Receptionists",
    excerpt: "Don't let your first impression be a robotic disaster. Avoid these critical pitfalls when setting up your AI-powered phone systems.",
    category: "Voice AI",
    author: "DK Benjamin",
    date: "Feb 05, 2026",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800",
    featured: false,
    slug: "#"
  }
];

const LINKEDIN_URL = "https://www.linkedin.com/in/benjamin-donkor-6a050728";

const BlogPage = () => {
  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main className="container py-16">
        {/* Hero / Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
            The <span className="text-blue-500 text-glow">Conversing AI</span> Blog
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10">
            Insights, strategies, and industry updates on the future of AI-powered business growth.
          </p>

          <div className="max-w-xl mx-auto relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder="Search articles..."
              className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all backdrop-blur-sm"
            />
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="relative group mb-20 overflow-hidden rounded-[32px] border border-white/10 bg-slate-900/40 backdrop-blur-md">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="aspect-[16/10] lg:aspect-auto overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-6">
                  <span className="bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/20">
                    Featured Article
                  </span>
                  <span className="text-slate-500 text-sm flex items-center gap-1">
                    <Clock className="h-4 w-4" /> {featuredPost.readTime}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 group-hover:text-blue-400 transition-colors leading-tight">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex items-center gap-4 mb-8">
                  <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center font-bold text-sm text-white">
                    DB
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <p className="font-semibold">{featuredPost.author}</p>
                      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="h-8 w-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 hover:bg-blue-600 hover:text-white transition-all border border-blue-500/20">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </div>
                    <p className="text-xs text-slate-500">{featuredPost.date}</p>
                  </div>
                </div>
                <Link to={featuredPost.slug}>
                  <Button className="w-fit bg-blue-600 hover:bg-blue-700 text-white gap-2 px-8 h-12 rounded-full">
                    Read Full Article <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Categories Bar */}
        <div className="flex flex-wrap gap-4 mb-12 justify-center">
          {['All', 'AI Strategy', 'Automation', 'SEO', 'Voice AI', 'Case Studies'].map((cat) => (
            <button key={cat} className="px-6 py-2 rounded-full border border-white/5 bg-white/5 hover:bg-blue-600/10 hover:border-blue-500/30 transition-all text-sm font-medium">
              {cat}
            </button>
          ))}
        </div>

        {/* Regular Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post) => (
            <Link key={post.id} to={post.slug} className="group flex flex-col bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:border-blue-500/30 transition-all hover:-translate-y-2">
              <div className="aspect-video overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-8 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">{post.category}</span>
                  <span className="text-slate-500 text-xs flex items-center gap-1">
                    <Clock className="h-3 w-3" /> {post.readTime}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-4 group-hover:text-blue-400 transition-colors leading-snug">
                  {post.title}
                </h3>
                <p className="text-slate-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center gap-3" onClick={(e) => e.preventDefault()}>
                    <div className="h-8 w-8 rounded-full bg-slate-800 flex items-center justify-center text-xs font-bold border border-white/10 text-white shrink-0">
                      DB
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-slate-300 font-medium">{post.author}</span>
                      <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="h-6 w-6 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 hover:bg-blue-500 hover:text-white transition-all border border-blue-500/10">
                        <Linkedin className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                  <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all shadow-lg">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter Box */}
        <div className="mt-32 p-12 rounded-[40px] bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 text-center relative overflow-hidden">
          <div className="absolute -top-24 -right-24 h-64 w-64 bg-blue-600/10 rounded-full blur-3xl" />
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-4 italic">Unlock the Power of AI</h2>
            <p className="text-slate-400 max-w-md mx-auto mb-8">
              Join 5,000+ business owners receiving weekly AI growth strategies directly to their inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="name@email.com"
                className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-3 outline-none focus:border-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-8">
                Join Now
              </Button>
            </div>
            <p className="text-[10px] text-slate-500 mt-4">No spam. Only high-value content. Unsubscribe anytime.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPage;
