import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Linkedin, Clock, Facebook, Twitter, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const LINKEDIN_URL = "https://www.linkedin.com/in/benjamin-donkor-6a050728";

const BestAIChatAgentsGhana = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main>
        {/* Article Hero */}
        <section className="relative pt-16 pb-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-50" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto">
              <Link to="/blog" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors mb-8 group">
                <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" /> Back to Blog
              </Link>

              <div className="flex items-center gap-4 mb-6">
                <span className="bg-blue-600/20 text-blue-400 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-blue-500/20">
                  Ghana AI
                </span>
                <span className="text-slate-500 text-sm flex items-center gap-1">
                  <Clock className="h-4 w-4" /> 6 min read
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-8 leading-tight">
                The Best <span className="text-blue-500 text-glow">AI Chat Agent</span> Creators in Ghana
              </h1>

              <div className="flex items-center justify-between py-8 border-y border-white/5 mb-12">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center font-bold text-lg">
                    DB
                  </div>
                  <div>
                    <p className="font-bold text-white">DK Benjamin</p>
                    <p className="text-sm text-slate-500">Founder & AI Strategy Expert</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all">
                    <Facebook className="h-4 w-4" />
                  </button>
                  <button className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all">
                    <Twitter className="h-4 w-4" />
                  </button>
                  <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all">
                    <Linkedin className="h-4 w-4" />
                  </a>
                  <button className="h-10 w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-all">
                    <Share2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="aspect-video rounded-[32px] overflow-hidden border border-white/10 mb-16 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?auto=format&fit=crop&q=80&w=1200"
                  alt="AI Chat Agent Creators in Ghana"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Content */}
              <article className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
                <p className="text-xl text-white font-medium mb-8">
                  If you run a business in Ghana and you have ever missed a customer message because it came in at midnight, or lost a lead because your team was handling other things — a chat agent might be exactly what you need.
                </p>

                <p>
                  Chat agents are software tools set up to hold conversations with your customers automatically. They answer questions, collect contact details, book appointments, and guide people through your services. They sit on your website, WhatsApp, Instagram, or Facebook page and work around the clock — without needing a break.
                </p>

                <p>
                  Ghana's business landscape has grown fast in recent years, and more companies are now looking for smarter ways to handle customer communication without hiring large teams. A good chat agent can do the work of a full-time customer service rep — 24 hours a day, 7 days a week.
                </p>

                <p>
                  So who is actually building these tools in Ghana? Here is a look at the options worth considering.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">1. Conversing AI</h2>
                <p>
                  Conversing AI is one of the most focused providers of AI chat agents for businesses in Ghana. What makes them stand out is that they do not just hand you a generic tool and leave you to figure it out. They build a chat agent specifically for your business — trained on your products, your tone, and your most common customer questions.
                </p>
                <p>
                  For example, if you run a salon in Accra, they can set up a chat agent that tells customers about your services, quotes prices, and books appointments — all without you lifting a finger. If you run an online store, the agent can guide shoppers through your catalogue and answer delivery questions instantly.
                </p>
                <p>
                  They also handle the setup, testing, and ongoing improvements, which is useful if you are not very technical. Their plans are designed to fit small and medium businesses, and they work across channels including WhatsApp, websites, and social media.
                </p>
                <p>
                  <strong className="text-white">Best for:</strong> Small to mid-sized Ghanaian businesses that want a ready-to-go, professionally built chat agent.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">2. In-House Developers Using Existing Platforms</h2>
                <p>
                  Some larger companies in Ghana have their own tech teams and use platforms like Tidio, ManyChat, or Botpress to build chat agents internally. This gives them more control but requires time, technical skill, and ongoing maintenance.
                </p>
                <p>
                  If your business already has a development team and a reasonable budget for tools, this route is possible. But for most small business owners, the learning curve and time investment make it less practical.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">3. Freelance Developers on Local Platforms</h2>
                <p>
                  You will also find individual freelancers on local platforms and WhatsApp groups offering chat agent setup services. Some are quite skilled and can deliver decent results for a lower upfront cost.
                </p>
                <p>
                  The risk with this option is consistency. Freelancers may not always be available for fixes and updates after the initial setup. If something breaks or you need changes, you might be left waiting.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">What to Look for When Choosing a Chat Agent Creator</h2>
                <p>Before you pick a provider, here are a few questions to ask:</p>
                <ul className="list-disc pl-6 space-y-3 text-slate-300">
                  <li><strong className="text-white">Will they customise it for my business?</strong> A generic chatbot that gives vague answers is more annoying than helpful.</li>
                  <li><strong className="text-white">Which platforms will it work on?</strong> WhatsApp is still the dominant messaging platform in Ghana, so make sure it is supported.</li>
                  <li><strong className="text-white">What happens when something goes wrong?</strong> You want someone you can actually call or message for support.</li>
                  <li><strong className="text-white">Can I update it as my business changes?</strong> Your prices, services, or hours may change. The agent should reflect that.</li>
                  <li><strong className="text-white">Is there a clear pricing structure?</strong> Avoid vague quotes. A trustworthy provider will be upfront about costs.</li>
                </ul>

                <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8 my-12">
                  <h3 className="text-2xl font-bold text-white mb-4">The Bottom Line</h3>
                  <p className="mb-6">
                    The demand for chat agents is growing across Ghana — from retail shops in Tema to logistics companies in Kumasi. Businesses that set these up early are already seeing fewer missed messages and more conversions. If you are just starting out and want something that works from day one, Conversing AI is worth a look. They take the technical side off your plate so you can focus on running your business.
                  </p>
                  <Link to="/get-started">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                      Get Your Chat Agent Set Up <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </article>

              {/* Author Footer */}
              <div className="bg-slate-900/50 border border-white/5 rounded-[40px] p-8 md:p-12 mb-20 flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                <div className="h-24 w-24 rounded-full bg-blue-600 flex items-center justify-center font-bold text-3xl shrink-0">
                  DB
                </div>
                <div>
                  <h4 className="text-2xl font-bold mb-2 italic">About the Author</h4>
                  <p className="text-slate-400 leading-relaxed">
                    DK Benjamin is a seasoned strategist focused on bridging the gap between cutting-edge technology and real-world business growth. With over a decade of experience in digital transformation, he now leads Conversing AI in helping businesses automate their way to success.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-slate-950">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-gradient-to-br from-blue-600 to-blue-800 rounded-[40px] p-12 text-center shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white text-glow">Ready to Build Your AI Chat Agent?</h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                  Let us design, build, and manage a chat agent that works 24/7 to grow your business in Ghana.
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link to="/get-started">
                    <Button size="lg" className="bg-white text-blue-700 hover:bg-slate-100 h-14 px-10 text-lg font-bold">
                      Get Started
                    </Button>
                  </Link>
                  <Link to="/get-quote">
                    <Button size="lg" variant="outline" className="border-white/40 ring-2 ring-white/10 text-white hover:bg-white/10 h-14 px-10 text-lg font-bold transition-all">
                      Free Consultation
                    </Button>
                  </Link>
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

export default BestAIChatAgentsGhana;
