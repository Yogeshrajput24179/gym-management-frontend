"use client";

import { MoreHorizontal } from "lucide-react";
import DataTable, { TableColumn } from "@/components/common/DataTable";

export interface Payment {
  id: number;
  member_name: string;
  membership_plan: string;
  amount: number;
  payment_date: string;
  payment_method: "Cash" | "UPI" | "Card" | "Bank Transfer";
  status: "Paid" | "Pending";
}

interface PaymentTableProps {
  data: Payment[];
  loading?: boolean;
}

export default function PaymentTable({
  data,
  loading = false,
}: PaymentTableProps) {
  const columns: TableColumn<Payment>[] = [
    {
      key: "member_name",
      title: "Member",
      render: (row) => (
        <div>
          <p className="font-medium text-slate-800">{row.member_name}</p>
        </div>
      ),
    },
    {
      key: "membership_plan",
      title: "Plan",
      render: (row) => (
        <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
          {row.membership_plan}
        </span>
      ),
    },
    {
      key: "amount",
      title: "Amount",
      render: (row) => (
        <span className="font-semibold text-slate-800">
          ₹{Number(row.amount).toLocaleString("en-IN")}
        </span>
      ),
    },
    {
      key: "payment_date",
      title: "Payment Date",
      render: (row) => {
        const date = new Date(row.payment_date);

        if (Number.isNaN(date.getTime())) {
          return row.payment_date;
        }

        return date.toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
    {
      key: "payment_method",
      title: "Method",
      align: "center",
      render: (row) => (
        <span className="text-sm font-medium text-slate-600">
          {row.payment_method}
        </span>
      ),
    },
    {
      key: "status",
      title: "Status",
      align: "center",
      render: (row) => (
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
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
          type="button"
          className="rounded-lg p-2 transition hover:bg-slate-100"
          onClick={() => console.log("Payment ID:", row.id)}
          aria-label={`Actions for payment ${row.id}`}
        >
          <MoreHorizontal className="h-5 w-5 text-slate-600" />
        </button>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      emptyMessage="No payment records found."
    />
  );
}