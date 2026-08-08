"use client";

import DynamicForm from "@/components/common/DynamicForm";
import { FormSection } from "@/components/common/Types";
import { useData } from "@/context/DataContext";

interface Props {
  formId?: string;
  onSubmit: (values: Record<string, any>) => void;
  initialData?: Record<string, any>;
}

export default function AttendanceForm({
  formId = "attendance-form",
  onSubmit,
  initialData,
}: Props) {
  const { members = [], trainers = [] } = useData();

  const sections: FormSection[] = [
    {
      title: "Attendance Details",
      fields: [
        {
          name: "user_type",
          label: "User Type",
          type: "select",
          required: true,
          defaultValue: initialData?.user_type || "member",
          options: [
            { label: "Member", value: "member" },
            { label: "Trainer", value: "trainer" },
          ],
        },
        {
          name: "member_id",
          label: "Member / Trainer Name",
          type: "select",
          placeholder: "Select Person",
          required: true,
          options: [
            ...members.map((m: any) => ({
              label: `Member: ${m.full_name || m.name}`,
              value: m.id,
            })),
            ...trainers.map((t: any) => ({
              label: `Trainer: ${t.full_name || t.name}`,
              value: t.id,
            })),
          ],
        },
        {
          name: "date",
          label: "Date",
          type: "date",
          required: true,
          defaultValue: initialData?.date || new Date().toISOString().split("T")[0],
        },
        {
          name: "status",
          label: "Status",
          type: "select",
          required: true,
          defaultValue: initialData?.status || "Present",
          options: [
            { label: "Present", value: "Present" },
            { label: "Absent", value: "Absent" },
            { label: "Late", value: "Late" },
          ],
        },
      ],
    },
  ];

  return (
    <DynamicForm
      formId={formId}
      sections={sections}
      initialData={initialData}
      onSubmit={onSubmit}
      showSubmitButton={false}
    />
  );
}