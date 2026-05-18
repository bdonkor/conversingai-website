import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Linkedin, Clock, Facebook, Twitter, Share2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

const LINKEDIN_URL = "https://www.linkedin.com/in/benjamin-donkor-6a050728";

const BestAIReceptionistGhana = () => {
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
                The Best <span className="text-blue-500 text-glow">AI Receptionist</span> Service Providers in Ghana
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
                  src="https://images.unsplash.com/photo-1596524430615-b46475ddff6e?auto=format&fit=crop&q=80&w=1200"
                  alt="AI Receptionist Service Providers in Ghana"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Article Content */}
              <article className="prose prose-invert prose-lg max-w-none text-slate-300 leading-relaxed">
                <p className="text-xl text-white font-medium mb-8">
                  Picture this: a customer calls your business at 8pm on a Friday, but no one picks up. They try again Saturday morning — still nothing. By Monday, they have already gone to your competitor.
                </p>

                <p>
                  This is a situation many Ghanaian businesses deal with daily. The solution does not have to be hiring more staff. An AI receptionist can handle incoming enquiries, greet callers, answer common questions, and collect information — any time of day, including weekends and public holidays.
                </p>

                <p>
                  As more businesses in Ghana look for practical ways to stay responsive without stretching their budgets, AI receptionist services are becoming a real option. Here is a breakdown of the providers worth knowing about.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">1. Conversing AI</h2>
                <p>
                  Conversing AI offers one of the most practical AI receptionist setups for businesses operating in Ghana. They do not sell you a complicated platform and expect you to manage it yourself. Instead, their team builds and manages the entire setup for you.
                </p>
                <p>
                  Their AI receptionist works across channels — it can handle website chat, WhatsApp messages, and social media enquiries. When a customer reaches out, the receptionist greets them, finds out what they need, and either resolves it immediately or collects their details and passes them to your team.
                </p>
                <p>
                  Here is a simple example: imagine you run a clinic in Kumasi. Patients often call to check consultation hours, ask about available doctors, or find out how to book an appointment. An AI receptionist from Conversing AI can handle all of that, 24 hours a day. Your staff only step in when the patient needs something more specific, like a prescription refill or a specialist referral.
                </p>
                <p>
                  The same applies to hotels, law firms, logistics companies, car dealerships, and any business that gets a steady stream of customer enquiries.
                </p>
                <p>
                  What sets Conversing AI apart in the Ghanaian market is that they localise the experience. They understand that your customers may ask questions in different ways, and they train the receptionist accordingly. They also provide ongoing support so the system keeps working as your business evolves.
                </p>
                <p>
                  <strong className="text-white">Best for:</strong> Businesses of all sizes in Ghana looking for a managed, done-for-you AI receptionist.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">2. Global Platforms with Local Setup</h2>
                <p>
                  Tools like Intercom, Drift, and Zendesk offer AI-powered receptionist and chat features that some Ghanaian companies with larger budgets use. These platforms are powerful, but they are generally built for international markets and can be expensive to run properly.
                </p>
                <p>
                  For most local businesses, these platforms also require significant technical setup and configuration — meaning you would either need a developer or spend considerable time learning the system yourself. They are an option, but not always the most practical one for a small to mid-sized Ghanaian business.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">3. Freelancers and One-Time Setup Services</h2>
                <p>
                  There are individual consultants in Ghana who will set up an AI receptionist system for you using third-party tools. You pay once, they configure it, and you manage it from there.
                </p>
                <p>
                  This can work if you have a clear idea of what you need and a team member comfortable with managing software. The downside is that ongoing support is often not included, and if something stops working, you may be back to square one.
                </p>

                <h2 className="text-3xl font-bold text-white mt-12 mb-6">What Makes a Good AI Receptionist for a Ghanaian Business?</h2>
                <p>Not every AI receptionist tool is the right fit for every business. Here is what to look for:</p>
                <ul className="list-disc pl-6 space-y-3 text-slate-300">
                  <li><strong className="text-white">It should respond quickly.</strong> If it takes more than a few seconds to reply, customers will lose patience.</li>
                  <li><strong className="text-white">It should feel natural.</strong> Stiff, robotic replies put people off. A good AI receptionist converses naturally.</li>
                  <li><strong className="text-white">It should work on WhatsApp.</strong> Most Ghanaians communicate via WhatsApp, so this channel is non-negotiable.</li>
                  <li><strong className="text-white">It should know your business.</strong> Generic answers frustrate customers. The tool needs to be trained on your specific services.</li>
                  <li><strong className="text-white">There should be a human backup.</strong> When a query is too complex, the system should hand it off to a real person smoothly.</li>
                </ul>

                <div className="bg-blue-600/10 border border-blue-500/20 rounded-3xl p-8 my-12">
                  <h3 className="text-2xl font-bold text-white mb-4">The Bottom Line</h3>
                  <p className="mb-6">
                    The businesses getting ahead in Ghana today are not necessarily the largest — they are the ones that respond fastest and communicate best. An AI receptionist is one of the simplest ways to make sure no customer enquiry goes unanswered. For a fully managed, locally tailored solution, Conversing AI remains the strongest option on the market.
                  </p>
                  <Link to="/get-started">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full">
                      Set Up Your AI Receptionist <ArrowRight className="ml-2 h-4 w-4" />
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
                <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white text-glow">Never Miss a Customer Again</h2>
                <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
                  Let us build and manage an AI receptionist that keeps your business open 24/7 — even when you are not.
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

export default BestAIReceptionistGhana;
