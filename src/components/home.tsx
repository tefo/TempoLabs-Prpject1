import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./layout/Sidebar";
import CompanyTable from "./dashboard/CompanyTable";
import ContactTable from "./dashboard/ContactTable";
import TaskList from "./dashboard/TaskList";

interface HomeProps {
  theme?: "light" | "dark";
  onThemeToggle?: () => void;
  onLogout?: () => void;
}

export default function Home({
  theme = "light",
  onThemeToggle = () => console.log("Theme toggled"),
  onLogout = () => console.log("Logout clicked"),
}: HomeProps) {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar
        theme={theme}
        onThemeToggle={onThemeToggle}
        onLogout={onLogout}
      />
      <main className="flex-1 overflow-auto p-8 space-y-8">
        <div className="grid grid-cols-1 gap-8">
          <CompanyTable />
          <ContactTable />
          <TaskList />
        </div>
        <Outlet />
      </main>
    </div>
  );
}
