"use client";

import DynamicForm from "@/components/common/DynamicForm";
import { FormSection } from "@/components/common/Types";
import { useData } from "@/context/DataContext"; // Adjust import path if needed

interface PaymentFormProps {
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  onCancel: () => void;
  submitText?: string;
}

export default function PaymentForm({
  initialValues = {},
  onSubmit,
  onCancel,
  submitText = "Save Payment",
}: PaymentFormProps) {
  const { members, plans, loading } = useData();

  // Format context data for dynamic select options
  const memberOptions = members.map((m) => ({
    label: `${m.full_name || m.name} (ID: ${m.id})`,
    value: m.id,
  }));

  const planOptions = plans.map((p) => ({
    label: `${p.plan_name || p.name} — ₹${p.price}`,
    value: p.id,
  }));

  const defaultValues = {
    payment_date: new Date().toISOString().split("T")[0],
    payment_method: "Cash",
    status: "Paid",
    ...initialValues,
  };

  const handleFormSubmit = (formData: Record<string, any>) => {
    const payload = {
      ...formData,
      member_id: Number(formData.member_id),
      membership_plan_id: Number(formData.membership_plan_id),
      amount: parseFloat(formData.amount),
      transaction_id: formData.transaction_id?.trim() || null,
      remarks: formData.remarks?.trim() || null,
    };

    onSubmit(payload);
  };

  const paymentSections: FormSection[] = [
    {
      title: "Payment Information",
      fields: [
        {
          name: "member_id",
          label: "Member",
          type: "select",
          required: true,
          disabled: loading,
          placeholder: loading ? "Loading members..." : "Select Member",
          options: memberOptions,
        },
        {
          name: "membership_plan_id",
          label: "Membership Plan",
          type: "select",
          required: true,
          disabled: loading,
          placeholder: loading ? "Loading plans..." : "Select Plan",
          options: planOptions,
        },
        {
          name: "amount",
          label: "Amount (₹)",
          type: "number",
          placeholder: "0.00",
          required: true,
        },
        {
          name: "payment_date",
          label: "Payment Date",
          type: "date",
          required: true,
        },
      ],
    },
    {
      title: "Transaction & Status",
      fields: [
        {
          name: "payment_method",
          label: "Payment Method",
          type: "select",
          required: true,
          options: [
            { label: "Cash", value: "Cash" },
            { label: "UPI", value: "UPI" },
            { label: "Card", value: "Card" },
            { label: "Net Banking", value: "Net Banking" },
          ],
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          options: [
            { label: "Paid", value: "Paid" },
            { label: "Pending", value: "Pending" },
            { label: "Failed", value: "Failed" },
          ],
        },
        {
          name: "transaction_id",
          label: "Transaction ID / Ref No",
          type: "text",
          placeholder: "e.g. UPI/123456789",
        },
        {
          name: "remarks",
          label: "Remarks",
          type: "textarea",
          rows: 3,
          placeholder: "Enter optional remarks or notes",
        },
      ],
    },
  ];

  return (
    <DynamicForm
      sections={paymentSections}
      initialValues={defaultValues}
      submitLabel={submitText}
      onSubmit={handleFormSubmit}
      onCancel={onCancel}
    />
  );
}