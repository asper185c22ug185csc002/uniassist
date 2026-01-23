import { ReactNode, lazy, Suspense, memo } from "react";
import { MobileNav } from "./MobileNav";

// Lazy load the sidebar to reduce initial bundle
const AppSidebar = lazy(() => import("./AppSidebar"));

// Memoized sidebar fallback - minimal skeleton
const SidebarFallback = () => (
  <aside className="fixed left-0 top-0 h-screen z-40 w-64 bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50" />
);

interface LayoutProps {
  children: ReactNode;
}

// Memoize Layout to prevent unnecessary re-renders
export const Layout = memo(({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* Minimal Background - CSS only, no images */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* CSS-only gradient orbs - no JavaScript animation on critical path */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-orange-600/5 rounded-full blur-3xl" />
        
        {/* Grid Pattern - pure CSS */}
        <div 
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100, 116, 139, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100, 116, 139, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Desktop Sidebar - lazy loaded */}
      <div className="hidden md:block">
        <Suspense fallback={<SidebarFallback />}>
          <AppSidebar />
        </Suspense>
      </div>

      {/* Main Content */}
      <main className="relative z-10 md:ml-64 min-h-screen pb-24 md:pb-0">
        {children}
      </main>

      {/* Mobile Navigation */}
      <MobileNav />
    </div>
  );
});

Layout.displayName = 'Layout';

export default Layout;
