import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { GraduationCap, ArrowRight, Star, Trophy, Laptop, Rocket, BrainCircuit, Zap, Users, Info } from "lucide-react";
import { motion } from "framer-motion";
import { containerVariants, itemFadeUp } from "@/lib/animations";
import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "Automate & build a 6-Figure AI Skill Set. Become an AI Automation Specialist",
    label: "AI AUTOMATION",
    icon: Zap,
    color: "from-blue-600 to-blue-400",
    desc: "Join the elite 1% of specialists building high-ticket AI solutions.",
    image: "/course project/Automate & build a 6-Figure AI Skill Set. Become an AI Automation Specialist.png",
    slug: "https://learn.aidenis.com/p/ai-automation-masterclass?affcode=1988697_zwrsz7jv"
  },
  {
    id: 2,
    title: "Self-paced program transforms you into the go-to AI expert in your company",
    label: "AI ROCKSTAR",
    icon: Star,
    color: "from-yellow-500 to-orange-400",
    desc: "The ultimate roadmap to becoming an indispensable AI asset.",
    image: "/course project/Self-paced program transforms you into the go-to AI expert in your company.png"
  },
  {
    id: 3,
    title: "Master a clear plan to automate tasks and focus on what truly matters",
    label: "AI FIRST ENTREPRENEUR",
    icon: Laptop,
    color: "from-emerald-500 to-teal-400",
    desc: "Build an AI-first growth mindset for your business.",
    image: "/course project/Master a clear plan to automate tasks and focus on what truly matters.png"
  },
  {
    id: 4,
    title: "The Ultimate AI Mastery Bundle. 4 Products total included in package",
    label: "AI MASTERY BUNDLE",
    icon: Trophy,
    color: "from-purple-600 to-indigo-400",
    desc: "Get everything you need to dominate the AI landscape.",
    image: "/course project/The Ultimate AI Mastery Bundle. 4 Products total included in package.png"
  },
  {
    id: 5,
    title: "Launch AI-driven systems in minutes. No guesswork, no coding",
    label: "SPECIAL BUNDLE",
    icon: Rocket,
    color: "from-rose-500 to-pink-400",
    desc: "Ready-to-deploy automation templates and resources.",
    image: "/course project/Launch AI-driven systems in minutes. No guesswork, no coding.png"
  },
  {
    id: 6,
    title: "Learn and Deploy: Master the Art of Creating Your Own GPTs",
    label: "CUSTOM GPTs MASTERY",
    icon: BrainCircuit,
    color: "from-cyan-500 to-blue-400",
    desc: "Build custom digital employees tailored to your workflow.",
    image: "/course project/Learn and Deploy Master the Art of Creating Your Own GPTs.png"
  }
];

const AICourses = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] opacity-50" />
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="container relative z-10 text-center"
          >
            <motion.div variants={itemFadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-400 text-sm font-bold mb-8">
              <GraduationCap className="h-4 w-4" /> Professional AI Education
            </motion.div>

            <motion.h1 variants={itemFadeUp} className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight">
              Top <span className="text-blue-500 text-glow">AI Courses</span>
            </motion.h1>

            <motion.p variants={itemFadeUp} className="text-xl text-slate-400 max-w-2xl mx-auto mb-12">
              The world's most practical, high-impact AI training programs for modern growth.
            </motion.p>
          </motion.div>
        </section>

        {/* Intro Section */}
        <section className="pb-16 pt-8">
          <div className="container">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid md:grid-cols-2 gap-12 items-start bg-slate-900/40 border border-white/5 rounded-[32px] p-8 md:p-12 mb-12"
            >
              <motion.div variants={itemFadeUp} className="space-y-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Zap className="h-6 w-6 text-blue-500" />
                  </div>
                  Become the AI Expert
                </h2>
                <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
                  <p>
                    Step into the future and become the AI expert your team relies on by mastering practical skills that help you work less and achieve more. This all-in-one learning hub gives you everything from AI fundamentals to advanced automation with Make.com and Airtable, Custom GPT creation, LinkedIn growth strategies, ready-to-deploy AI templates, and deep insights that place you among the top 1 percent of AI users.
                  </p>
                  <p>
                    Whether you choose individual courses like <span className="text-blue-400 font-semibold">AI Rockstar</span> and <span className="text-blue-400 font-semibold">AI Automation Masterclass</span>, or unlock greater value through our <span className="text-blue-400 font-semibold">Ultimate AI Mastery Bundles</span>, you gain proven systems that elevate productivity, accelerate results, and build an AI-first mindset. Start today and position yourself at the forefront of modern digital work.
                  </p>
                </div>
              </motion.div>

              <motion.div variants={itemFadeUp} className="space-y-6">
                <h2 className="text-3xl font-bold text-white flex items-center gap-3">
                  <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20">
                    <Users className="h-6 w-6 text-blue-500" />
                  </div>
                  Why Trust Our Courses?
                </h2>
                <div className="space-y-4 text-slate-400 text-lg leading-relaxed">
                  <p>
                    AIDenis Top AI Courses are designed for both individuals and organizations ready to harness the power of AI. Whether you want to boost your personal productivity or lead your team into the future, these courses focus on real-world application—not theory.
                  </p>
                  <p>
                    Led by bestselling educator <span className="text-white font-semibold">Denis Panjuta</span>, who has trained over 500,000 students worldwide, each program delivers hands-on, practical lessons you can apply immediately. Learn from experts who use AI daily to transform their work, teams, and results.
                  </p>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-slate-400 text-sm italic max-w-3xl mx-auto text-center justify-center mb-16"
            >
              <Info className="h-5 w-5 text-blue-500 shrink-0" />
              <p>
                Note: If you take any of these courses, AIDenis will give us a small commission for promoting their courses — at no cost to you.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Courses Grid */}
        <section className="pb-32">
          <div className="container">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {courses.map((course) => (
                <motion.div
                  key={course.id}
                  variants={itemFadeUp}
                  className="group flex flex-col bg-slate-900/40 border border-white/5 rounded-[32px] overflow-hidden hover:border-blue-500/30 transition-all hover:shadow-2xl hover:shadow-blue-900/20"
                >
                  {/* Banner Image / Gradient Placeholder */}
                  <div className={`aspect-video relative flex items-center justify-center overflow-hidden transition-transform duration-500 bg-[#0f172a] group-hover:scale-105 ${!course.image ? `bg-gradient-to-br ${course.color}` : ''}`}>
                    {course.image ? (
                      <img
                        src={course.image}
                        alt={course.title}
                        className="w-full h-full object-contain"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-black/20" />
                        <div className="relative z-10 text-center px-6">
                          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 inline-block mb-4 border border-white/20">
                            <course.icon className="h-10 w-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-black text-white tracking-tighter leading-none italic uppercase">
                            {course.label}
                          </h3>
                        </div>
                        {/* Floating highlights */}
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/20 blur-3xl rounded-full" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/40 blur-3xl rounded-full" />
                      </>
                    )}
                  </div>

                  <div className="p-8 flex-1 flex flex-col gap-4">
                    <h3 className="text-lg md:text-xl font-bold leading-tight transition-colors group-hover:text-blue-400">
                      {course.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {course.desc}
                    </p>
                    <div className="mt-auto pt-6 flex items-center justify-between">
                      {course.slug?.startsWith('http') ? (
                        <a href={course.slug} target="_blank" rel="noopener noreferrer" className="w-full">
                          <Button className="w-full bg-white/5 border border-white/10 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-white rounded-xl transition-all h-12 font-bold group/btn">
                            View Course <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </a>
                      ) : (
                        <Link to={course.slug || "/get-started"} className="w-full">
                          <Button className="w-full bg-white/5 border border-white/10 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-white rounded-xl transition-all h-12 font-bold group/btn">
                            View Course <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Support Section */}
        <section className="py-24 bg-slate-900/20 border-y border-white/5">
          <div className="container text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-6">Need a custom training solution?</h2>
              <p className="text-slate-400 mb-10 text-lg">
                We provide end-to-end AI workshops and corporate training programs tailored to your specific industry.
              </p>
              <Link to="/contact">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white rounded-full px-10 h-14 font-bold">
                  Book Corporate Training
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AICourses;
