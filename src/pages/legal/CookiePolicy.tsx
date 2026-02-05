import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const CookiePolicy = () => {
  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <Navbar />
      <main className="container py-24 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-8">Cookie Policy</h1>
        <p className="text-slate-400 mb-8 italic">Last Updated: February 4, 2026</p>

        <div className="prose prose-invert prose-slate max-w-none space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">1. What Are Cookies</h2>
            <p className="text-slate-400 leading-relaxed">
              Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Website or a third-party to recognize you and make your next visit easier and the Website more useful to you.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">2. How Conversing AI Uses Cookies</h2>
            <p className="text-slate-400 leading-relaxed mb-4">
              When you use and access the Website, we may place a number of cookies files in your web browser. We use cookies for the following purposes:
            </p>
            <ul className="list-disc pl-6 text-slate-400 space-y-2">
              <li>To enable certain functions of the Website.</li>
              <li>To provide analytics and understand how you use our site.</li>
              <li>To store your preferences.</li>
              <li>To enable advertisement delivery, including behavioral advertising.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">3. Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white">Essential Cookies</h3>
                <p className="text-slate-400">Necessary for the website to function and cannot be switched off in our systems.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Performance Cookies</h3>
                <p className="text-slate-400">Allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">Functionality Cookies</h3>
                <p className="text-slate-400">Enable the website to provide enhanced functionality and personalization.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">4. Your Choices Regarding Cookies</h2>
            <p className="text-slate-400 leading-relaxed">
              If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser. Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CookiePolicy;
