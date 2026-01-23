import { memo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';

// Memoize to prevent unnecessary re-renders
export const FloatingAIButton = memo(() => {
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
        {/* Use CSS icon instead of image for better LCP */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/30 to-orange-600/20 flex items-center justify-center group-hover:scale-110 transition-transform">
          <Bot className="w-5 h-5 text-orange-300" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
      </div>
    </Button>
  );
});

FloatingAIButton.displayName = 'FloatingAIButton';

export default FloatingAIButton;
