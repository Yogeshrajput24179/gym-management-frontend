"use client";

import { useState } from "react";
import Sidebar from "@/components/layout/SideBar";
import Header from "@/components/layout/Header";

type DashboardLayoutProps = {
  children: React.ReactNode;
};

export default function DashboardLayout({
  children,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
  
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="lg:ml-64">
        <Header
          onMenuClick={() =>
            setSidebarOpen((prev) => !prev)
          }
        />

        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  );
}