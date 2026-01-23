import { lazy, Suspense, memo } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLoadingFallback from "./components/PageLoadingFallback";

// Lazy load all pages for maximum code splitting
const Index = lazy(() => import("./pages/Index"));
const Academics = lazy(() => import("./pages/Academics"));
const Library = lazy(() => import("./pages/Library"));
const Sports = lazy(() => import("./pages/Sports"));
const Contact = lazy(() => import("./pages/Contact"));
const Auth = lazy(() => import("./pages/Auth"));
const Admin = lazy(() => import("./pages/Admin"));
const Internships = lazy(() => import("./pages/Internships"));
const Alumni = lazy(() => import("./pages/Alumni"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Lazy load floating button - not critical for initial render
const FloatingAIButton = lazy(() => import("./components/FloatingAIButton"));

// Create query client with optimized settings
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

// Memoized route config
const AppRoutes = memo(() => (
  <Routes>
    <Route path="/" element={<Index />} />
    <Route path="/academics" element={<Academics />} />
    <Route path="/library" element={<Library />} />
    <Route path="/sports" element={<Sports />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/auth" element={<Auth />} />
    <Route path="/admin" element={<Admin />} />
    <Route path="/internships" element={<Internships />} />
    <Route path="/alumni" element={<Alumni />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
));

AppRoutes.displayName = 'AppRoutes';

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={300}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<PageLoadingFallback />}>
          <AppRoutes />
          <FloatingAIButton />
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
