"use client";

import { MoreHorizontal } from "lucide-react";
import DataTable, { TableColumn } from "@/components/common/DataTable";

interface Payment {
  id: number;
  member_name: string;
  membership_plan: string;
  amount: number;
  payment_date: string;
  payment_method: "Cash" | "UPI" | "Card" | "Bank Transfer";
  status: "Paid" | "Pending";
}

const paymentData: Payment[] = [
  {
    id: 1,
    member_name: "Yogesh Rajput",
    membership_plan: "Gold",
    amount: 2500,
    payment_date: "2026-07-20",
    payment_method: "UPI",
    status: "Paid",
  },
  {
    id: 2,
    member_name: "Rahul Verma",
    membership_plan: "Silver",
    amount: 1800,
    payment_date: "2026-07-19",
    payment_method: "Cash",
    status: "Pending",
  },
  {
    id: 3,
    member_name: "Amit Sharma",
    membership_plan: "Basic",
    amount: 1200,
    payment_date: "2026-07-18",
    payment_method: "Card",
    status: "Paid",
  },
];

const columns: TableColumn<Payment>[] = [
  {
    key: "member_name",
    title: "Member",
  },
  {
    key: "membership_plan",
    title: "Plan",
  },
  {
    key: "amount",
    title: "Amount",
    render: (row) => `₹${row.amount.toLocaleString()}`,
  },
  {
    key: "payment_date",
    title: "Payment Date",
  },
  {
    key: "payment_method",
    title: "Method",
    align: "center",
  },
  {
    key: "status",
    title: "Status",
    align: "center",
    render: (row) => (
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          row.status === "Paid"
            ? "bg-green-100 text-green-700"
            : "bg-yellow-100 text-yellow-700"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    align: "center",
    render: (row) => (
      <button
        className="rounded-lg p-2 transition hover:bg-slate-100"
        onClick={() => console.log("Payment ID:", row.id)}
      >
        <MoreHorizontal className="h-5 w-5 text-slate-600" />
      </button>
    ),
  },
];

export default function PaymentTable() {
  return (
    <DataTable
      columns={columns}
      data={paymentData}
      loading={false}
      emptyMessage="No payment records found."
    />
  );
}