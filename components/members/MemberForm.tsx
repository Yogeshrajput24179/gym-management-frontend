"use client";

import DynamicForm from "@/components/common/DynamicForm";
import { FormSection } from "@/components/common/Types";

interface MemberFormProps {
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  onCancel: () => void;
  submitText?: string;
}

const memberSections: FormSection[] = [
  {
    title: "Basic Information",
    fields: [
      {
        name: "full_name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter full name",
        required: true,
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "Enter phone number",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email",
      },
      {
        name: "gender",
        label: "Gender",
        type: "select",
        required: true,
        options: [
          { label: "Male", value: "Male" },
          { label: "Female", value: "Female" },
          { label: "Other", value: "Other" },
        ],
      },
    ],
  },
  {
    title: "Membership Details",
    fields: [
      {
        name: "membership",
        label: "Membership",
        type: "select",
        required: true,
        options: [
          { label: "Basic", value: "Basic" },
          { label: "Silver", value: "Silver" },
          { label: "Gold", value: "Gold" },
          { label: "Premium", value: "Premium" },
        ],
      },
      {
        name: "trainer",
        label: "Trainer",
        type: "select",
        options: [
          { label: "Select Trainer", value: "" },
          { label: "Amit Sharma", value: "1" },
          { label: "Rahul Verma", value: "2" },
          { label: "Priya Singh", value: "3" },
        ],
      },
      {
        name: "joining_date",
        label: "Joining Date",
        type: "date",
        required: true,
      },
      {
        name: "status",
        label: "Status",
        type: "select",
        required:true,
        options: [
          { label: "Active", value: "Active" },
          { label: "Expired", value: "Expired" },
          { label: "Pending", value: "Pending" },
        ],
      },
    ],
  },
  {
    title: "Physical Information",
    fields: [
      {
        name: "height",
        label: "Height (cm)",
        type: "number",
        placeholder: "170",
      },
      {
        name: "weight",
        label: "Weight (kg)",
        type: "number",
        placeholder: "70",
      },
      {
        name: "emergency_contact",
        label: "Emergency Contact",
        type: "text",
        placeholder: "Enter emergency contact",
      },
      {
        name: "address",
        label: "Address",
        type: "textarea",
        rows: 3,
        colSpan: 2,
        placeholder: "Enter address",
      },
    ],
  },
];

export default function MemberForm({
  initialValues = {},
  onSubmit,
  onCancel,
  submitText = "Save Member",
}: MemberFormProps) {
  
  return (
    <DynamicForm
      sections={memberSections}
      initialValues={initialValues}
      submitLabel={submitText}

      onSubmit={onSubmit}
      onCancel={onCancel}
    />
  );
}