import { Button } from "@/components/ui/button";
import { Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const plans = [
  {
    name: "Starter",
    price: "$997",
    period: "/month",
    description: "Perfect for small businesses getting started with AI-powered lead generation.",
    features: ["100 qualified leads/month", "AI lead qualification", "Email follow-up sequences", "Monthly performance report", "Email support"],
    buttonText: "Get started",
    popular: false
  },
  {
    name: "Growth",
    price: "$2,497",
    period: "/month",
    description: "For growing businesses ready to scale their lead pipeline significantly.",
    features: ["300 qualified leads/month", "Advanced AI qualification", "Multi-channel outreach", "CRM integration", "Weekly optimization calls", "Priority support"],
    buttonText: "Get started",
    popular: true
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For large organizations with complex needs and high-volume requirements.",
    features: ["Unlimited leads", "Custom AI training", "Dedicated account manager", "Custom integrations", "White label options", "24/7 premium support"],
    buttonText: "Contact Sales",
    popular: false
  }
]

export const LeadGenPreview = () => {
  return (
    <section id="lead-gen" className="container py-12 md:py-16 lg:py-20 bg-background">
      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center space-y-4 text-center mb-16">
        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">Lead Generation</div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Consistent Leads, <span className="text-primary">Every Month</span></h2>
        <p className="max-w-2xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          Subscribe to our lead generation service and never worry about finding new customers again. AI-powered, continuously optimized.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-3 max-w-7xl mx-auto">
        {plans.map((plan, index) => (
          <div key={index} className={`relative flex flex-col rounded-2xl border ${plan.popular ? 'border-blue-600 shadow-lg shadow-blue-900/20 scale-105 z-10' : 'border-primary/10 bg-card'} p-8 transition-all hover:border-primary/30`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </div>
            )}
            <div className="mb-6">
              <h3 className="text-lg font-semibold">{plan.name}</h3>
              <div className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-bold">{plan.price}</span>
                <span className="text-sm text-muted-foreground">{plan.period}</span>
              </div>
              <p className="mt-4 text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
            </div>

            <ul className="mb-8 space-y-3 flex-1">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-center text-sm text-muted-foreground/90">
                  <Check className="mr-3 h-4 w-4 text-blue-500" />
                  {feature}
                </li>
              ))}
            </ul>

            <Link to="/get-started">
              <Button className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-secondary hover:bg-secondary/80 text-foreground'}`} variant={plan.popular ? 'default' : 'secondary'}>
                {plan.buttonText} {plan.popular && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button variant="link" className="text-primary gap-1">
          View full pricing details <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
