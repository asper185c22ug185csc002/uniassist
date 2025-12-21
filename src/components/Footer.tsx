import { GraduationCap, Heart } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-primary py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-bold text-xl text-primary-foreground">
              Uni<span className="text-secondary">Assist</span>
            </span>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="#features" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Features
            </a>
            <a href="#chat" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Chat
            </a>
            <a href="#about" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              About
            </a>
          </nav>

          {/* Copyright */}
          <div className="flex items-center gap-1 text-sm text-primary-foreground/70">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-secondary fill-secondary" />
            <span>for students</span>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-primary-foreground/10 text-center">
          <p className="text-xs text-primary-foreground/50">
            © {new Date().getFullYear()} UniAssist AI. All rights reserved. Providing 24/7 campus support.
          </p>
        </div>
      </div>
    </footer>
  );
};
