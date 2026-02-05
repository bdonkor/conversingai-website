import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Conversing AI transformed our customer service. Our AI agents handle 80% of inquiries now, and our team can focus on high-value tasks. The ROI was visible within the first month.",
    author: "Sarah Mitchell",
    role: "CEO, TechStart Inc.",
    initials: "SM"
  },
  {
    quote: "The lead generation subscription has been a game-changer. We went from struggling to find leads to having a consistent pipeline. Their AI qualification saves us hours every week.",
    author: "Marcus Johnson",
    role: "Founder, GrowthLabs",
    initials: "MJ"
  },
  {
    quote: "They redesigned our website and set up AI chat — our conversion rate doubled. The team is incredibly professional and the results speak for themselves.",
    author: "Emily Chen",
    role: "Marketing Director, Apex Solutions",
    initials: "EC"
  }
];

const companies = ["TechCorp", "InnovateCo", "FutureLabs", "GrowthFirst", "ScaleUp", "NextGen"];

export const TestimonialsSection = () => {
  return (
    <section id="testimonials" className="container py-12 md:py-16 lg:py-20">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center space-y-4 text-center mb-16">
        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">Trusted by <span className="text-primary">Growing Businesses</span></h2>
        <p className="max-w-2xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          See what our clients say about working with us. Real results from real businesses.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((testimonial, index) => (
          <div key={index} className="flex flex-col justify-between rounded-xl border border-primary/10 bg-card p-8 shadow-sm hover:border-primary/30 transition-colors">
            <Quote className="h-8 w-8 text-primary/20 mb-4" />
            <p className="text-sm text-muted-foreground/90 leading-relaxed mb-6">"{testimonial.quote}"</p>
            <div className="flex items-center space-x-4">
              <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                {testimonial.initials}
              </div>
              <div>
                <div className="font-semibold text-sm">{testimonial.author}</div>
                <div className="text-xs text-muted-foreground">{testimonial.role}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 pt-10 border-t border-border/40">
        <p className="text-center text-sm text-muted-foreground mb-8">Trusted by innovative companies worldwide</p>
        <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
          {companies.map((company, i) => (
            <span key={i} className="text-lg font-bold hover:text-primary transition-colors cursor-default">{company}</span>
          ))}
        </div>
      </div>
    </section>
  );
};
