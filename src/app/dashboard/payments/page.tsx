"use client";

import { useState } from "react";
import { Download, Plus, RefreshCw } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";

import PaymentStats from "@/components/Payments/PaymentStats"
import PaymentFilters from "@/components/Payments/PaymentFilter";
import PaymentTable from "@/components/Payments/PaymentsTable";
import PaymentModal from "@/components/Payments/PaymentsModal";

export default function PaymentsPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="space-y-6">

      <PageHeader
        title="Payment Management"
        description="Manage all member payments and transactions."
        action={
          <div className="flex flex-wrap gap-3">

            <Button variant="outline">
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Button onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Add Payment
            </Button>

          </div>
        }
      />

      <PaymentStats />

      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <PaymentFilters />
      </div>

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">

        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-lg font-semibold text-slate-800">
            Payment Records
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            View, manage and track all member payments.
          </p>
        </div>

        <PaymentTable />

      </div>

      <PaymentModal
        isOpen={open}
        onClose={() => setOpen(false)}
      />

    </div>
  );
}