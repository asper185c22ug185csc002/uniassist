import { 
  GraduationCap, 
  BookOpen, 
  Users, 
  Building2, 
  Calendar, 
  CreditCard,
  Library,
  MapPin
} from "lucide-react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { FeatureCard } from "@/components/FeatureCard";
import { ChatInterface } from "@/components/ChatInterface";
import { Footer } from "@/components/Footer";

const features = [
  {
    icon: GraduationCap,
    title: "Admissions Support",
    description: "Get instant answers about admission requirements, eligibility criteria, and application procedures.",
  },
  {
    icon: BookOpen,
    title: "Academic Programs",
    description: "Explore courses, syllabus details, credit systems, and department information effortlessly.",
  },
  {
    icon: Library,
    title: "Library Services",
    description: "Check timings, borrowing limits, renewals, e-resources, and digital library access.",
  },
  {
    icon: CreditCard,
    title: "Fees & Scholarships",
    description: "Learn about fee structures, payment methods, and available scholarship opportunities.",
  },
  {
    icon: Users,
    title: "Career Guidance",
    description: "Get information about placements, internships, and career counseling services.",
  },
  {
    icon: Building2,
    title: "Campus Facilities",
    description: "Discover hostel, transport, cafeteria, and other campus amenities information.",
  },
  {
    icon: Calendar,
    title: "Exam Information",
    description: "Access examination rules, evaluation methods, and academic regulations.",
  },
  {
    icon: MapPin,
    title: "Campus Navigation",
    description: "Find office locations, departments, and important administrative contacts.",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <Hero />

      {/* Features Section */}
      <section id="features" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-sm font-medium text-accent-foreground mb-4">
              Features
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Everything You Need to Know
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              UniAssist AI provides comprehensive support across all aspects of college life, 
              from admissions to graduation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Chat Section */}
      <section id="chat" className="py-24 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary text-sm font-medium text-primary-foreground mb-4">
              AI Assistant
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Chat with UniAssist AI
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ask any question about college services, academics, library, or campus life. 
              I'm here to help 24/7!
            </p>
          </div>

          <ChatInterface />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent text-sm font-medium text-accent-foreground mb-4">
              About
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Empowering Campus Life
            </h2>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              UniAssist AI is designed to bridge the information gap between students and 
              administrative services. Our AI-powered assistant provides accurate, instant 
              responses to common queries, reducing wait times and improving accessibility 
              to crucial college information.
            </p>
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-sm text-muted-foreground">Always Available</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Instant</div>
                <div className="text-sm text-muted-foreground">Quick Responses</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">Accurate</div>
                <div className="text-sm text-muted-foreground">Reliable Info</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
