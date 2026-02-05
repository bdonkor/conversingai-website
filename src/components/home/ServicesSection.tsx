import { MessageSquare, Phone, Globe, Bot, TrendingUp, PenTool, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const services = [
  {
    icon: MessageSquare,
    title: "AI Chat & Voice Agents",
    description: "24/7 intelligent chat and voice agents that handle customer interactions, answer questions, and drive conversions.",
    features: ["Website chat agents", "Voice & phone agents", "WhatsApp support"],
  },
  {
    icon: Phone,
    title: "AI Receptionist",
    description: "Never miss a call. Our AI receptionists handle inquiries, book appointments, and route calls intelligently.",
    features: ["Call handling", "Appointment booking", "Human handover"],
  },
  {
    icon: Globe,
    title: "Website Design",
    description: "Premium, conversion-focused websites built to capture leads and establish your brand authority.",
    features: ["Mobile responsive", "SEO optimized", "Conversion focused"],
  },
  {
    icon: Bot,
    title: "AI Automation",
    description: "Streamline your operations with intelligent automation that saves time and reduces errors.",
    features: ["CRM automation", "Workflow optimization", "Business processes"],
    highlight: "Popular",
  },
  {
    icon: TrendingUp,
    title: "Lead Generation",
    description: "Subscription-based lead sourcing, capture, and qualification with AI-powered follow-up.",
    features: ["Verified leads", "AI qualification", "Continuous optimization"],
    highlight: "Best Value",
  },
  {
    icon: PenTool,
    title: "Blog Writing & SEO",
    description: "Authority-building content that ranks. Professional, human-sounding articles delivered regularly.",
    features: ["SEO friendly", "Authority building", "Regular publishing"],
  },
];

export const ServicesSection = () => {
  return (
    <section id="services" className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center space-y-4 text-center mb-16">
        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Our Services</div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Everything You Need <br /> to <span className="text-primary">Grow Digitally</span></h2>
        <p className="max-w-2xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Premium done-for-you services. We handle the technology, you enjoy the results. No technical expertise required.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <div key={index} className="relative group rounded-2xl border border-primary/10 bg-card p-8 hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
            {service.highlight && (
              <div className="absolute top-4 right-4 rounded-full bg-blue-600 px-2 py-0.5 text-xs font-semibold text-white">
                {service.highlight}
              </div>
            )}
            <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
              <service.icon className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold">{service.title}</h3>
            <p className="mb-6 text-sm text-muted-foreground leading-relaxed">
              {service.description}
            </p>
            <ul className="mb-6 space-y-2">
              {service.features.map((feature, i) => (
                <li key={i} className="flex items-center text-xs text-muted-foreground/80">
                  <span className="mr-2 h-1 w-1 rounded-full bg-primary" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link to="#" className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80">
              Learn More <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        ))}
      </div>
      <div className="mt-16 flex justify-center flex-col items-center gap-4 text-center">
        <p className="text-muted-foreground">Not sure which service you need? Let's discuss your goals.</p>
        <Link to="#contact" className="inline-flex h-10 items-center justify-center rounded-md bg-blue-600 px-8 text-sm font-medium text-white shadow transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50">
          Get a Free Consultation <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </div>
    </section>
  );
};
