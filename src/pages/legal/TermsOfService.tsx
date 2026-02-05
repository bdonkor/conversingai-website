import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <main className="container py-24 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Terms of Service</h1>
        <p className="text-slate-400 mb-8 italic">Last Updated: February 4, 2026</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Acceptance of Terms</h2>
            <p className="text-slate-400 leading-relaxed">
              By accessing and using the services provided by Conversing AI ("we," "us," or "our"), you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services or website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Description of Service</h2>
            <p className="text-slate-400 leading-relaxed">
              Conversing AI provides "Done-For-You" AI automation, agent development, and digital growth services. These services are provided subject to specific project agreements and statements of work.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Intellectual Property</h2>
            <p className="text-slate-400 leading-relaxed">
              All content on this website, including text, graphics, logos, and software, is the property of Conversing AI and is protected by international copyright laws. Unauthorized use of any materials may violate copyright, trademark, and other laws.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. User Obligations</h2>
            <p className="text-slate-400 leading-relaxed">
              You agree to provide accurate and complete information when contacting us or requesting services. You are responsible for maintaining the confidentiality of any account or project-related information entrusted to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Disclaimer of Warranties</h2>
            <p className="text-slate-400 leading-relaxed">
              Our services are provided on an "as is" and "as available" basis. While we strive for excellence, we cannot guarantee that AI systems will be perfectly error-free or that specific business outcomes are guaranteed due to the experimental nature of AI technology.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">6. Limitation of Liability</h2>
            <p className="text-slate-400 leading-relaxed">
              Conversing AI shall not be liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use our services or website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">7. Governing Law</h2>
            <p className="text-slate-400 leading-relaxed">
              These terms shall be governed by and construed in accordance with the laws of the jurisdiction in which the company operates, without regard to its conflict of law provisions.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
