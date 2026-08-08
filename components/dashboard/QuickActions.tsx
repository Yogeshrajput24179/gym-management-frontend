"use client";

import {
  UserPlus,
  CreditCard,
  Dumbbell,
  CalendarPlus,
} from "lucide-react";

const actions = [
  {
    title: "Add Member",
    icon: UserPlus,
  },
  {
    title: "Record Payment",
    icon: CreditCard,
  },
  {
    title: "Add Trainer",
    icon: Dumbbell,
  },
  {
    title: "Mark Attendance",
    icon: CalendarPlus,
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="mb-6 text-lg font-semibold">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              className="flex flex-col items-center justify-center rounded-xl border border-gray-200 p-6 transition hover:border-blue-500 hover:bg-blue-50"
            >
              <Icon className="mb-3 h-8 w-8 text-blue-600" />

              <span className="text-sm font-medium">
                {action.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}