import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  HelpCircle,
  BookOpenCheck,
  Library,
  Trophy,
  Phone,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  GraduationCap,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  {
    title: "AI Assistant",
    icon: HelpCircle,
    path: "/",
    description: "Chat with UniAssist AI",
  },
  {
    title: "Academics & Fees",
    icon: BookOpenCheck,
    path: "/academics",
    description: "Courses, clubs & programs",
  },
  {
    title: "Library Catalog",
    icon: Library,
    path: "/library",
    description: "Books & e-resources",
  },
  {
    title: "Sports & Facilities",
    icon: Trophy,
    path: "/sports",
    description: "Events & campus life",
  },
  {
    title: "Contact Directory",
    icon: Phone,
    path: "/contact",
    description: "Get in touch",
  },
];

export const AppSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen z-40 transition-all duration-300 ease-in-out",
        "bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section */}
      <div className="p-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          {/* University Logo with Glow */}
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-glow-orange">
              <GraduationCap className="w-7 h-7 text-slate-950" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 animate-pulse-soft" />
          </div>
          
          {!collapsed && (
            <div className="fade-in">
              <h1 className="font-bold text-slate-100">UniAssist AI</h1>
              <p className="text-xs text-slate-400">Periyar University</p>
            </div>
          )}
        </div>
      </div>

      {/* Status Badge */}
      {!collapsed && (
        <div className="px-4 py-3 mx-3 mt-4 rounded-lg bg-slate-800/50 border border-slate-700/50 fade-in">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-400" />
            <span className="text-xs font-medium text-slate-300">AI Knowledge Base</span>
            <span className="ml-auto flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse-soft" />
              <span className="text-xs text-green-400">Active</span>
            </span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-3 mt-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                "hover:bg-slate-800/60 group",
                isActive
                  ? "bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 text-orange-400"
                  : "text-slate-400 hover:text-slate-200"
              )}
            >
              <div
                className={cn(
                  "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                  isActive
                    ? "bg-orange-500/20 text-orange-400"
                    : "bg-slate-800/50 text-slate-400 group-hover:bg-slate-700/50 group-hover:text-slate-200"
                )}
              >
                <item.icon className="w-5 h-5" />
              </div>
              
              {!collapsed && (
                <div className="flex-1 min-w-0 fade-in">
                  <p className={cn(
                    "font-medium text-sm truncate",
                    isActive ? "text-orange-400" : "text-slate-200"
                  )}>
                    {item.title}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {item.description}
                  </p>
                </div>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse Toggle */}
      <div className="absolute bottom-4 left-0 right-0 px-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 rounded-xl",
            "bg-slate-800/50 border border-slate-700/50",
            "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50",
            "transition-all duration-200"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
};

export default AppSidebar;