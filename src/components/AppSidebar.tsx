import { useState, memo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  HelpCircle,
  BookOpenCheck,
  Library,
  Trophy,
  Phone,
  ChevronLeft,
  ChevronRight,
  User,
  LogOut,
  Shield,
  Users,
  Briefcase,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

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
    title: "Internships & IV",
    icon: Briefcase,
    path: "/internships",
    description: "Industrial training",
  },
  {
    title: "Alumni Network",
    icon: Users,
    path: "/alumni",
    description: "Connect with alumni",
  },
  {
    title: "Contact Directory",
    icon: Phone,
    path: "/contact",
    description: "Get in touch",
  },
];

// Memoized menu item for performance
const MenuItem = memo(({ item, isActive, collapsed }: { 
  item: typeof menuItems[0]; 
  isActive: boolean; 
  collapsed: boolean;
}) => (
  <NavLink
    to={item.path}
    className={cn(
      "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
      "hover:bg-slate-800/60 group",
      isActive
        ? "bg-gradient-to-r from-blue-500/20 to-blue-600/10 border border-blue-500/30 text-blue-400"
        : "text-slate-400 hover:text-slate-200"
    )}
  >
    <div
      className={cn(
        "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all",
        isActive
          ? "bg-blue-500/20 text-blue-400"
          : "bg-slate-800/50 text-slate-400 group-hover:bg-slate-700/50 group-hover:text-slate-200"
      )}
    >
      <item.icon className="w-5 h-5" />
    </div>
    
    {!collapsed && (
      <div className="flex-1 min-w-0">
        <p className={cn(
          "font-medium text-sm truncate",
          isActive ? "text-blue-400" : "text-slate-200"
        )}>
          {item.title}
        </p>
      </div>
    )}
  </NavLink>
));

MenuItem.displayName = 'MenuItem';

export const AppSidebar = memo(() => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAdmin, signOut } = useAuth();

  const handleCallNow = () => {
    window.location.href = "tel:04272345766";
  };

  const handleSignOut = async () => {
    const { error } = await signOut();
    if (error) {
      toast.error("Failed to sign out");
    } else {
      toast.success("Signed out successfully");
      navigate("/");
    }
  };

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 h-screen z-40 transition-all duration-300 ease-in-out flex flex-col",
        "bg-slate-900/95 backdrop-blur-xl border-r border-slate-800/50",
        collapsed ? "w-20" : "w-64"
      )}
    >
      {/* Logo Section - CSS icon instead of image */}
      <div className="p-4 border-b border-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="relative flex-shrink-0">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-orange-600/10 border-2 border-orange-500/30 flex items-center justify-center">
              <Bot className="w-6 h-6 text-orange-400" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900" />
          </div>
          
          {!collapsed && (
            <div>
              <h1 className="font-bold text-slate-100">Periyar Uni</h1>
              <p className="text-xs text-slate-400">STUDENT PORTAL</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Menu Label */}
      {!collapsed && (
        <div className="px-4 pt-4 pb-2">
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Main Menu</p>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => (
          <MenuItem
            key={item.path}
            item={item}
            isActive={location.pathname === item.path}
            collapsed={collapsed}
          />
        ))}

        {/* Account Section */}
        {!collapsed && (
          <div className="pt-4">
            <p className="px-3 text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Account</p>
          </div>
        )}
        
        {user ? (
          <>
            {isAdmin && (
              <NavLink
                to="/admin"
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                  "hover:bg-slate-800/60 group",
                  location.pathname === "/admin"
                    ? "bg-gradient-to-r from-orange-500/20 to-orange-600/10 border border-orange-500/30 text-orange-400"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <div
                  className={cn(
                    "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                    location.pathname === "/admin"
                      ? "bg-orange-500/20 text-orange-400"
                      : "bg-slate-800/50 text-slate-400 group-hover:bg-slate-700/50 group-hover:text-slate-200"
                  )}
                >
                  <Shield className="w-5 h-5" />
                </div>
                
                {!collapsed && (
                  <div className="flex-1 min-w-0">
                    <p className={cn(
                      "font-medium text-sm truncate",
                      location.pathname === "/admin" ? "text-orange-400" : "text-slate-200"
                    )}>
                      Admin Panel
                    </p>
                  </div>
                )}
              </NavLink>
            )}
            
            <button
              onClick={handleSignOut}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
                "hover:bg-red-500/10 group text-slate-400 hover:text-red-400"
              )}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center bg-slate-800/50 group-hover:bg-red-500/20 transition-all">
                <LogOut className="w-5 h-5" />
              </div>
              
              {!collapsed && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="font-medium text-sm truncate text-slate-200 group-hover:text-red-400">
                    Sign Out
                  </p>
                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                </div>
              )}
            </button>
          </>
        ) : (
          <NavLink
            to="/auth"
            className={cn(
              "flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200",
              "hover:bg-slate-800/60 group",
              location.pathname === "/auth"
                ? "bg-gradient-to-r from-green-500/20 to-green-600/10 border border-green-500/30 text-green-400"
                : "text-slate-400 hover:text-slate-200"
            )}
          >
            <div
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-all",
                location.pathname === "/auth"
                  ? "bg-green-500/20 text-green-400"
                  : "bg-slate-800/50 text-slate-400 group-hover:bg-slate-700/50 group-hover:text-slate-200"
              )}
            >
              <User className="w-5 h-5" />
            </div>
            
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className={cn(
                  "font-medium text-sm truncate",
                  location.pathname === "/auth" ? "text-green-400" : "text-slate-200"
                )}>
                  Login / Sign Up
                </p>
              </div>
            )}
          </NavLink>
        )}
      </nav>

      {/* Direct Support Section */}
      {!collapsed && (
        <div className="p-4 mt-auto border-t border-slate-800/50">
          <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/30">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-2">Direct Support</p>
            <p className="text-xs text-slate-400 mb-1">Admin Office:</p>
            <p className="text-sm font-semibold text-slate-200 mb-3">0427-2345766</p>
            <button
              onClick={handleCallNow}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-slate-950 font-semibold text-sm hover:from-orange-400 hover:to-orange-500 transition-all"
            >
              <Phone className="w-4 h-4" />
              Call Now
            </button>
          </div>
        </div>
      )}

      {/* Collapse Toggle */}
      <div className="p-3 border-t border-slate-800/50">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "w-full flex items-center justify-center gap-2 py-3 rounded-xl",
            "bg-blue-600 hover:bg-blue-500",
            "text-white",
            "transition-all duration-200"
          )}
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <ChevronLeft className="w-5 h-5" />
          )}
        </button>
      </div>
    </aside>
  );
});

AppSidebar.displayName = 'AppSidebar';

export default AppSidebar;
