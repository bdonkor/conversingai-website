import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    number: "01",
    title: "Tell Us What You Need",
    description: "Share your business goals and challenges. We'll listen carefully and understand exactly what you're looking for."
  },
  {
    number: "02",
    title: "We Design The Solution",
    description: "Our team crafts a tailored strategy using AI and automation to address your specific needs and objectives."
  },
  {
    number: "03",
    title: "We Build & Deploy",
    description: "We handle everything — from development to deployment. You don't need to lift a finger or worry about technical details."
  },
  {
    number: "04",
    title: "We Support & Optimize",
    description: "We continuously monitor, maintain, and improve your systems. Your success is our ongoing commitment."
  }
]

export const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="container py-12 md:py-16 lg:py-20 bg-background relative overflow-hidden">
      {/* Background curve line placeholder */}
      <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent hidden lg:block opacity-20 -z-10" />

      <div className="mx-auto flex max-w-screen-2xl flex-col items-center justify-center space-y-4 text-center mb-16">
        <div className="inline-block rounded-full bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Your Path to <span className="text-primary">Digital Transformation</span></h2>
        <p className="max-w-2xl text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
          A simple, streamlined process that takes you from idea to implementation without the complexity. We do the heavy lifting.
        </p>
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 relative z-10">
        {steps.map((step, index) => (
          <div key={index} className="flex flex-col gap-4 p-6 rounded-xl border border-primary/10 bg-card hover:bg-card/80 transition-colors">
            <div className="h-10 w-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-900/20">
              {step.number}
            </div>
            <h3 className="text-xl font-bold">{step.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white gap-2">
          Learn More About Our Process <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  );
};
