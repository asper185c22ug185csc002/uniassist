import { lazy, Suspense, memo } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLoadingFallback from "./components/PageLoadingFallback";

// Lazy load all pages for code splitting with webpackChunkName for better caching
const Index = lazy(() => import(/* webpackChunkName: "index" */ "./pages/Index"));
const Academics = lazy(() => import(/* webpackChunkName: "academics" */ "./pages/Academics"));
const Library = lazy(() => import(/* webpackChunkName: "library" */ "./pages/Library"));
const Sports = lazy(() => import(/* webpackChunkName: "sports" */ "./pages/Sports"));
const Contact = lazy(() => import(/* webpackChunkName: "contact" */ "./pages/Contact"));
const Auth = lazy(() => import(/* webpackChunkName: "auth" */ "./pages/Auth"));
const Admin = lazy(() => import(/* webpackChunkName: "admin" */ "./pages/Admin"));
const Internships = lazy(() => import(/* webpackChunkName: "internships" */ "./pages/Internships"));
const Alumni = lazy(() => import(/* webpackChunkName: "alumni" */ "./pages/Alumni"));
const NotFound = lazy(() => import(/* webpackChunkName: "notfound" */ "./pages/NotFound"));

// Lazy load floating button as it's not critical for initial render
const FloatingAIButton = lazy(() => import(/* webpackChunkName: "floating-btn" */ "./components/FloatingAIButton"));

// Create query client outside component to prevent recreation
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false, // Reduce unnecessary refetches
      retry: 1, // Reduce retry attempts
    },
  },
});

// Memoized route config for better performance
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
