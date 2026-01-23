// Pure CSS loading fallback - minimal JS footprint for fastest FCP
const PageLoadingFallback = () => (
  <div className="min-h-screen bg-slate-950 flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-8 h-8 border-2 border-slate-700 border-t-blue-500 rounded-full animate-spin" />
      <p className="text-slate-500 text-sm">Loading...</p>
    </div>
  </div>
);

export { PageLoadingFallback };
export default PageLoadingFallback;
