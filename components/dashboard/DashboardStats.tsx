"use client";

import {
  CalendarCheck,
  Dumbbell,
  IndianRupee,
  Users,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";

const stats = [
  {
    title: "Total Members",
    value: 560,
    icon: Users,
    change: 12,
    changeLabel: "vs last month",
    iconBgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Active Trainers",
    value: 18,
    icon: Dumbbell,
    change: 5,
    changeLabel: "vs last month",
    iconBgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
  {
    title: "Monthly Revenue",
    value: "₹2,35,000",
    icon: IndianRupee,
    change: 18,
    changeLabel: "vs last month",
    iconBgColor: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Today's Attendance",
    value: "82%",
    icon: CalendarCheck,
    change: -3,
    changeLabel: "vs yesterday",
    iconBgColor: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export default function DashboardStats() {
  return (
    <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
}