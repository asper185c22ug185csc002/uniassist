import { Menu, X, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import periyarLogo from "@/assets/periyar-logo.jpg";
export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAdmin } = useAuth();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl overflow-hidden group-hover:scale-105 transition-transform duration-300 border-2 border-primary/30">
              <img 
                src={periyarLogo} 
                alt="Periyar University Logo" 
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-bold text-xl text-foreground">
              Periyar<span className="text-secondary"> University</span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Features
            </a>
            <a href="#chat" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Chat
            </a>
            <a href="#about" className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              About
            </a>
          </nav>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {isAdmin && (
              <Button variant="outline" size="sm" asChild>
                <a href="/admin">
                  <Shield className="w-4 h-4 mr-1" />
                  Admin
                </a>
              </Button>
            )}
            {!user && (
              <Button variant="ghost" size="sm" asChild>
                <a href="/auth">Login</a>
              </Button>
            )}
            <Button variant="default" size="sm" asChild>
              <a href="#chat">Start Chatting</a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="flex flex-col gap-4">
              <a 
                href="#features" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#chat" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Chat
              </a>
              <a 
                href="#about" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              {isAdmin && (
                <a 
                  href="/admin" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </a>
              )}
              {!user && (
                <a 
                  href="/auth" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </a>
              )}
              <Button variant="default" size="sm" className="w-fit" asChild>
                <a href="#chat" onClick={() => setIsMenuOpen(false)}>Start Chatting</a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
