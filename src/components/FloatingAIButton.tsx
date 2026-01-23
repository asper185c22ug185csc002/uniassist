import { useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import periyarLogo from '@/assets/periyar-logo.jpg';

export const FloatingAIButton = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Don't show on home page (where AI assistant is)
  if (location.pathname === '/') return null;

  return (
    <Button
      onClick={() => navigate('/')}
      className="fixed bottom-24 right-4 md:bottom-8 md:right-8 z-50 w-14 h-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 border-2 border-primary/30 p-0 overflow-hidden group"
      title="Ask AI Assistant"
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <img 
          src={periyarLogo} 
          alt="AI Assistant" 
          loading="eager"
          fetchPriority="low"
          className="w-10 h-10 rounded-full object-cover group-hover:scale-110 transition-transform"
        />
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
      </div>
    </Button>
  );
};

export default FloatingAIButton;
