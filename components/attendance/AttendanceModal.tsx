"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import AttendanceForm from "@/components/attendance/AttendanceForm";
import api from "@/src/app/lib/axios";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onAttendanceUpdated?: () => void;
  mode?: "add" | "edit";
  attendanceId?: string | number | null;
  initialData?: Record<string, any>;
}

export default function AttendanceModal({
  isOpen,
  onClose,
  onSuccess,
  onAttendanceUpdated,
  mode = "add",
  attendanceId,
  initialData,
}: Props) {
  const router = useRouter();

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      if (mode === "edit") {
        await api.put(`/attendence/update/${attendanceId}`, values);
        toast.success("Attendance updated successfully!");
      } else {
        await api.post("/attendence/add", values);
        toast.success("Attendance marked successfully!");
      }

      onSuccess?.();
      onAttendanceUpdated?.();
      onClose();
      router.refresh();
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Failed to save attendance."
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "edit" ? "Edit Attendance" : "Mark Attendance"}
      width="lg"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="outline" onClick={onClose} type="button">
            Cancel
          </Button>

          <Button type="submit" form="attendance-form">
            Save Attendance
          </Button>
        </div>
      }
    >
      <AttendanceForm
        formId="attendance-form"
        onSubmit={handleSubmit}
        initialData={initialData}
      />
    </Modal>
  );
}