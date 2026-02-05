import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <main className="container py-24 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Privacy Policy</h1>
        <p className="text-slate-400 mb-8 italic">Last Updated: February 4, 2026</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. Introduction</h2>
            <p className="text-slate-400 leading-relaxed">
              At Conversing AI, we respect your privacy and are committed to protecting it through our compliance with this policy. This policy describes the types of information we may collect from you or that you may provide when you visit the website [conversingai.com] and our practices for collecting, using, maintaining, protecting, and disclosing that information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. Information We Collect</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              We collect several types of information from and about users of our Website, including:
            </p>
            <ul className="list-disc pl-6 text-slate-400 space-y-2">
              <li>Personal identifiers such as name, postal address, email address, or telephone number.</li>
              <li>Information about your internet connection, the equipment you use to access our Website, and usage details.</li>
              <li>Company details and project requirements shared during discovery calls or via contact forms.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. How We Use Your Information</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              We use information that we collect about you or that you provide to us, including any personal information:
            </p>
            <ul className="list-disc pl-6 text-slate-400 space-y-2">
              <li>To present our Website and its contents to you.</li>
              <li>To provide you with information, products, or services that you request from us.</li>
              <li>To fulfill any other purpose for which you provide it.</li>
              <li>To carry out our obligations and enforce our rights arising from any contracts entered into between you and us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Data Security</h2>
            <p className="text-slate-400 leading-relaxed">
              We have implemented measures designed to secure your personal information from accidental loss and from unauthorized access, use, alteration, and disclosure. The safety and security of your information also depends on you. All information you provide to us is stored on our secure servers behind firewalls.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">5. Contact Information</h2>
            <p className="text-slate-400 leading-relaxed">
              To ask questions or comment about this privacy policy and our privacy practices, contact us at:
              <a href="mailto:info@conversingai.com" className="text-blue-500 hover:underline ml-1">info@conversingai.com</a>.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
