"use client";

import DynamicForm from "@/components/common/DynamicForm";
import { FormSection } from "@/components/common/Types";

interface TrainerFormProps {
  initialValues?: Record<string, any>;
  onSubmit: (values: Record<string, any>) => void;
  onCancel: () => void;
  submitText?: string;
}

const trainerSections: FormSection[] = [
  {
    title: "Trainer Information",
    fields: [
      {
        name: "full_name",
        label: "Full Name",
        type: "text",
        placeholder: "Enter trainer name",
        required: true,
      },
      {
        name: "phone",
        label: "Phone",
        type: "text",
        placeholder: "9876543210",
        required: true,
      },
      {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "trainer@example.com",
        required: false,
      },
      {
        name: "specialization",
        label: "Specialization",
        type: "select",
        required: true,
        options: [
          {
            label: "Strength Training",
            value: "Strength Training",
          },
          {
            label: "Weight Loss",
            value: "Weight Loss",
          },
          {
            label: "Cardio",
            value: "Cardio",
          },
          {
            label: "Yoga",
            value: "Yoga",
          },
          {
            label: "CrossFit",
            value: "CrossFit",
          },
          {
            label: "Bodybuilding",
            value: "Bodybuilding",
          },
          {
            label: "Zumba",
            value: "Zumba",
          },
          {
            label: "Personal Training",
            value: "Personal Training",
          },
        ],
      },
      {
        name: "experience",
        label: "Experience (Years)",
        type: "number",
        placeholder: "5",
      },
      {
        name: "salary",
        label: "Salary",
        type: "number",
        placeholder: "25000",
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
        options: [
          {
            label: "Active",
            value: "active",
          },
          {
            label: "Inactive",
            value: "inactive",
          },
        ],
      },
    ],
  },
];

export default function TrainerForm({
  initialValues = {},
  onSubmit,
  onCancel,
  submitText = "Save Trainer",
}: TrainerFormProps) {




    
  return (
    <DynamicForm
      sections={trainerSections}
      initialValues={initialValues}
      submitLabel={submitText}
      onSubmit={onSubmit}
    />
  );
}