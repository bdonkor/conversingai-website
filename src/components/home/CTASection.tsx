import { Button } from "@/components/ui/button";
import { MessageSquare, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export const CTASection = () => {
  return (
    <section id="contact" className="container py-12 md:py-16 lg:py-20">
      <div className="relative rounded-3xl overflow-hidden border border-primary/10 bg-card px-6 py-16 md:px-16 md:py-24 text-center shadow-2xl">
        {/* Background Gradient */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/10 rounded-full blur-3xl opacity-20" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl flex flex-col items-center gap-6">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
            Ready to Transform?
          </div>

          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Let's Build Your <span className="text-primary">AI-Powered Future</span>
          </h2>

          <p className="max-w-2xl text-muted-foreground md:text-xl/relaxed">
            Stop struggling with technology. Let our experts design, build, and manage AI solutions that drive real results for your business.
          </p>

          <div className="flex flex-col gap-4 min-[400px]:flex-row pt-4 w-full justify-center">
            <Link to="/get-started">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white gap-2 shadow-lg shadow-blue-900/20">
                <MessageSquare className="h-4 w-4" /> Get started
              </Button>
            </Link>
            <Link to="/get-quote">
              <Button size="lg" variant="outline" className="border-primary/20 hover:bg-primary/10 hover:text-primary gap-2">
                Free Consultation <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-x-8 gap-y-2 text-xs text-muted-foreground/60">
            <span>AI Agents</span>
            <span>Website Design</span>
            <span>Automation</span>
          </div>
        </div>
      </div>
    </section>
  );
};
