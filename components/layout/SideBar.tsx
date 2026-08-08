"use client";

import { Dumbbell } from "lucide-react";

import SidebarItem from "@/components/layout/SidebarItems";
import { sidebarMenu } from "@/components/layout/SidebarMenu";

export default function Sidebar({ onClose }: { onClose: () => void }) {


  return (
    <aside className="hidden h-screen w-72 border-r border-gray-200 bg-white lg:flex lg:flex-col">
      <div className="flex items-center gap-3 border-b p-6">
        <div className="rounded-xl bg-blue-600 p-3 text-white">
          <Dumbbell size={24} />
        </div>

        <div>
          <h1 className="text-xl font-bold">Gym AI</h1>
          <p className="text-sm text-gray-500">
            Management System
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-2 overflow-y-auto p-4">
        {sidebarMenu.map((item) => (
          <SidebarItem key={item.href} {...item} />
        ))}
      </nav>
    </aside>
  );
}