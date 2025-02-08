import React from "react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Building2,
  Users,
  CheckSquare,
  Settings,
  Sun,
  Moon,
  LogOut,
} from "lucide-react";

interface SidebarProps {
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
  onLogout?: () => void;
}

const defaultProps: SidebarProps = {
  theme: "light",
  onThemeToggle: () => console.log("Theme toggled"),
  onLogout: () => console.log("Logout clicked"),
};

export default function Sidebar({
  theme = "light",
  onThemeToggle = defaultProps.onThemeToggle,
  onLogout = defaultProps.onLogout,
}: SidebarProps) {
  const navItems = [
    { icon: Building2, label: "Companies", path: "/companies" },
    { icon: Users, label: "Contacts", path: "/contacts" },
    { icon: CheckSquare, label: "Tasks", path: "/tasks" },
    { icon: Settings, label: "Settings", path: "/settings" },
  ];

  return (
    <div className="w-[280px] h-screen bg-background border-r flex flex-col">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-primary">CRM Dashboard</h1>
      </div>

      <ScrollArea className="flex-1 px-4">
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted"
                }`
              }
            >
              <item.icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-6 border-t space-y-4">
        <Button
          variant="ghost"
          className="w-full justify-start"
          onClick={onThemeToggle}
        >
          {theme === "light" ? (
            <>
              <Sun className="w-5 h-5 mr-3" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="w-5 h-5 mr-3" />
              Dark Mode
            </>
          )}
        </Button>

        <Button
          variant="ghost"
          className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="w-5 h-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );
}
