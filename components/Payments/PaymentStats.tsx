"use client";

import {
  IndianRupee,
  Wallet,
  Clock3,
  CircleCheckBig,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "₹4,85,000",
    icon: IndianRupee,
    iconBg: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    title: "Today's Collection",
    value: "₹12,500",
    icon: Wallet,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    title: "Pending Payments",
    value: "18",
    icon: Clock3,
    iconBg: "bg-yellow-100",
    iconColor: "text-yellow-600",
  },
  {
    title: "Completed Payments",
    value: "142",
    icon: CircleCheckBig,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
  },
];

export default function PaymentStats() {
  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>

                <h2 className="mt-2 text-3xl font-bold text-slate-800">
                  {item.value}
                </h2>
              </div>

              <div className={`rounded-xl p-3 ${item.iconBg}`}>
                <Icon className={`h-6 w-6 ${item.iconColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}