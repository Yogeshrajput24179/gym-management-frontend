"use client";

import Input from "@/components/ui/Input";

export default function PaymentForm() {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

      {/* Member */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Member <span className="text-red-500">*</span>
        </label>

        <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
          <option value="">Select Member</option>
          <option>Yogesh Rajput</option>
          <option>Amit Sharma</option>
          <option>Rahul Verma</option>
        </select>
      </div>

      {/* Membership Plan */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Membership Plan
        </label>

        <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
          <option value="">Select Plan</option>
          <option>Basic</option>
          <option>Silver</option>
          <option>Gold</option>
          <option>Premium</option>
        </select>
      </div>

      {/* Amount */}
      <Input
        label="Amount"
        type="number"
        placeholder="Enter payment amount"
      />

      {/* Payment Date */}
      <Input
        label="Payment Date"
        type="date"
      />

      {/* Payment Method */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Payment Method
        </label>

        <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
          <option value="">Select Method</option>
          <option>Cash</option>
          <option>UPI</option>
          <option>Card</option>
          <option>Bank Transfer</option>
        </select>
      </div>

      {/* Status */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Payment Status
        </label>

        <select className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-700 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100">
          <option>Paid</option>
          <option>Pending</option>
        </select>
      </div>

      {/* Remarks */}
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700">
          Remarks
        </label>

        <textarea
          rows={4}
          placeholder="Enter remarks (optional)"
          className="w-full rounded-lg border border-slate-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
        />
      </div>

    </div>
  );
}