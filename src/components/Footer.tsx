import { GraduationCap, Heart, MapPin, ExternalLink } from "lucide-react";

const GOOGLE_MAPS_URL = "https://www.google.com/maps/place/Periyar+University/@11.7168999,78.0808945,17z";

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
              Periyar<span className="text-secondary">University</span>
            </span>
          </div>

          {/* Location Link */}
          <a 
            href={GOOGLE_MAPS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground transition-colors group"
          >
            <MapPin className="w-5 h-5 text-secondary" />
            <span className="text-sm">Salem, Tamil Nadu, India</span>
            <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>

          {/* Links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a href="/" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              AI Assistant
            </a>
            <a href="/academics" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Academics
            </a>
            <a href="/contact" className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
              Contact
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
            © {new Date().getFullYear()} Periyar University. All rights reserved. Providing 24/7 campus support.
          </p>
        </div>
      </div>
    </footer>
  );
};
