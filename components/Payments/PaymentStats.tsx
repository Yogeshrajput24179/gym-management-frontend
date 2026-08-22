"use client";

import {
  CreditCard,
  IndianRupee,
  Clock3,
  TrendingUp,
} from "lucide-react";

interface PaymentStatsProps {
  totalAmount: number;
  paidAmount: number;
  pendingAmount: number;
  totalPayments: number;
}

export default function PaymentStats({
  totalAmount,
  paidAmount,
  pendingAmount,
  totalPayments,
}: PaymentStatsProps) {
  const stats = [
    {
      title: "Total Revenue",
      value: `₹${totalAmount.toLocaleString("en-IN")}`,
      icon: IndianRupee,
      description: "All payment records",
    },
    {
      title: "Paid Amount",
      value: `₹${paidAmount.toLocaleString("en-IN")}`,
      icon: TrendingUp,
      description: "Successfully received",
    },
    {
      title: "Pending Amount",
      value: `₹${pendingAmount.toLocaleString("en-IN")}`,
      icon: Clock3,
      description: "Awaiting payment",
    },
    {
      title: "Total Payments",
      value: totalPayments.toString(),
      icon: CreditCard,
      description: "Payment transactions",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>

                <h3 className="mt-2 text-2xl font-bold text-slate-800">
                  {stat.value}
                </h3>
              </div>

              <div className="rounded-lg bg-slate-100 p-3">
                <Icon className="h-5 w-5 text-slate-700" />
              </div>
            </div>

            <p className="mt-3 text-xs text-slate-400">
              {stat.description}
            </p>
          </div>
        );
      })}
    </div>
  );
}