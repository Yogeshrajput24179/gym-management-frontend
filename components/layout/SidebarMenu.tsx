import {
  LayoutDashboard,
  Users,
  UserCog,
  CreditCard,
  CalendarCheck,
  Dumbbell,
  Utensils,
  FileText,
  Settings,
} from "lucide-react";

export const sidebarMenu = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Members",
    href: "/dashboard/members",
    icon: Users,
  },
  {
    title: "Trainers",
    href: "/dashboard/trainers",
    icon: UserCog,
  },
  {
    title: "Attendance",
    href: "/dashboard/attendance",
    icon: CalendarCheck,
  },
  {
    title: "Payments",
    href: "/dashboard/payments",
    icon: CreditCard,
  },
  {
    title: "Workout Plans",
    href: "/dashboard/workouts",
    icon: Dumbbell,
  },
  {
    title: "Diet Plans",
    href: "/dashboard/diet-plans",
    icon: Utensils,
  },
  {
    title: "Reports",
    href: "/dashboard/reports",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];