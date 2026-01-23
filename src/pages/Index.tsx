import { lazy, Suspense } from "react";
import { Layout } from "@/components/Layout";

// Lazy load the heavy ChatInterface component
const OptimizedChatInterface = lazy(() => import("@/components/OptimizedChatInterface"));

// Minimal loading state
const ChatLoading = () => (
  <div className="flex flex-col h-screen w-full max-w-5xl mx-auto px-4 md:px-6 items-center justify-center">
    <div className="w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
  </div>
);

const Index = () => {
  return (
    <Layout>
      <Suspense fallback={<ChatLoading />}>
        <OptimizedChatInterface />
      </Suspense>
    </Layout>
  );
};

export default Index;
