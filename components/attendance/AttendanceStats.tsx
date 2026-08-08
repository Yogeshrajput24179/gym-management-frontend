"use client";

import {
  CalendarCheck,
  UserCheck,
  UserX,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Today's Attendance",
    value: "105",
    icon: CalendarCheck,
  },
  {
    title: "Present",
    value: "98",
    icon: UserCheck,
  },
  {
    title: "Absent",
    value: "7",
    icon: UserX,
  },
  {
    title: "Members",
    value: "150",
    icon: Users,
  },
];

export default function AttendanceStats() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-xl border bg-white p-5 shadow-sm"
          >
            <div className="flex justify-between">

              <div>
                <p className="text-sm text-gray-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-2xl font-bold">
                  {item.value}
                </h2>
              </div>

              <div className="rounded-xl bg-blue-100 p-3">
                <Icon className="text-blue-600" />
              </div>

            </div>
          </div>
        );
      })}
    </div>
  );
}