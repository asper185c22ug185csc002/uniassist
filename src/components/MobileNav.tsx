import { NavLink, useLocation } from "react-router-dom";
import {
  HelpCircle,
  BookOpenCheck,
  Library,
  Trophy,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

const menuItems = [
  { title: "AI", icon: HelpCircle, path: "/" },
  { title: "Academics", icon: BookOpenCheck, path: "/academics" },
  { title: "Library", icon: Library, path: "/library" },
  { title: "Sports", icon: Trophy, path: "/sports" },
  { title: "Contact", icon: Phone, path: "/contact" },
];

export const MobileNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
      <div className="mx-3 mb-3 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-slate-800/50 shadow-lg">
        <div className="flex items-center justify-around py-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all",
                  isActive
                    ? "text-orange-400"
                    : "text-slate-400 hover:text-slate-200"
                )}
              >
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    isActive
                      ? "bg-orange-500/20"
                      : "bg-transparent"
                  )}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{item.title}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default MobileNav;