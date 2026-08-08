"use client";

import { Search, RotateCcw } from "lucide-react";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function PaymentFilters() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">

      {/* Search Member */}
      <div className="xl:col-span-2">
        <Input
          placeholder="Search member..."
          endIcon={<Search className="h-4 w-4 text-slate-400" />}
        />
      </div>

      {/* Payment Date */}
      <Input type="date" />

      {/* Payment Method */}
      <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
        <option value="">All Methods</option>
        <option value="Cash">Cash</option>
        <option value="UPI">UPI</option>
        <option value="Card">Card</option>
        <option value="Bank Transfer">Bank Transfer</option>
      </select>

      {/* Status */}
      <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
        <option value="">All Status</option>
        <option value="Paid">Paid</option>
        <option value="Pending">Pending</option>
      </select>

      {/* Reset Button */}
      <div className="md:col-span-2 xl:col-span-5 flex justify-end">
        <Button variant="secondary">
          <RotateCcw className="mr-2 h-4 w-4" />
          Reset Filters
        </Button>
      </div>

    </div>
  );
}