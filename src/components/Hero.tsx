import { ArrowDown, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-hero-gradient">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-secondary rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary rounded-full blur-3xl animate-float" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/50 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative container mx-auto px-4 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 mb-8 animate-fade-in">
          <Sparkles className="w-4 h-4 text-secondary" />
          <span className="text-sm font-medium text-primary-foreground">AI-Powered College Assistant</span>
        </div>

        {/* Main Heading */}
        <h1 
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 animate-slide-up"
          style={{ animationDelay: "0.1s" }}
        >
          Your Smart Campus
          <br />
          <span className="text-secondary">Companion</span>
        </h1>

        {/* Description */}
        <p 
          className="text-lg md:text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-10 animate-slide-up"
          style={{ animationDelay: "0.2s" }}
        >
          Get instant answers about admissions, academics, library services, campus facilities, and more. 
          UniAssist AI is here to help 24/7.
        </p>

        {/* CTA Buttons */}
        <div 
          className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-slide-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button variant="hero" size="xl" asChild>
            <a href="#chat">
              <Sparkles className="w-5 h-5" />
              Start Chatting Now
            </a>
          </Button>
          <Button variant="heroOutline" size="lg" asChild>
            <a href="#features">Learn More</a>
          </Button>
        </div>

        {/* Scroll Indicator */}
        <div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce"
          style={{ animationDelay: "1s" }}
        >
          <a href="#features" className="flex flex-col items-center gap-2 text-primary-foreground/60 hover:text-primary-foreground/80 transition-colors">
            <span className="text-xs font-medium">Scroll to explore</span>
            <ArrowDown className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
};
