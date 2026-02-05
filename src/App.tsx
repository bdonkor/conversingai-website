import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import AIChatVoiceAgents from "@/pages/services/AIChatVoiceAgents";
import AIReceptionist from "@/pages/services/AIReceptionist";
import WebsiteDesign from "@/pages/services/WebsiteDesign";
import AIAutomation from "@/pages/services/AIAutomation";
import LeadGeneration from "@/pages/services/LeadGeneration";
import BlogWritingSEO from "@/pages/services/BlogWritingSEO";
import Blog from "@/pages/Blog";
import HowItWorks from "@/pages/HowItWorks";
import Contact from "@/pages/Contact";
import About from "@/pages/About";
import PrivacyPolicy from "@/pages/legal/PrivacyPolicy";
import TermsOfService from "@/pages/legal/TermsOfService";
import CookiePolicy from "@/pages/legal/CookiePolicy";
import GetQuote from "@/pages/GetQuote";
import GetStarted from "@/pages/GetStarted";
import AIRevolution2026 from "@/pages/blog/AIRevolution2026";
import ScrollToTop from "@/components/layout/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/services/ai-chat-voice-agents" element={<AIChatVoiceAgents />} />
        <Route path="/services/ai-receptionist" element={<AIReceptionist />} />
        <Route path="/services/website-design" element={<WebsiteDesign />} />
        <Route path="/services/ai-automation" element={<AIAutomation />} />
        <Route path="/services/lead-generation" element={<LeadGeneration />} />
        <Route path="/services/blog-writing-seo" element={<BlogWritingSEO />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/ai-revolution-2026" element={<AIRevolution2026 />} />
        <Route path="/how-it-works" element={<HowItWorks />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<TermsOfService />} />
        <Route path="/cookies" element={<CookiePolicy />} />
        <Route path="/get-quote" element={<GetQuote />} />
        <Route path="/get-started" element={<GetStarted />} />
      </Routes>
    </Router>
  );
}

export default App;
