"use client";

import Modal from "@/components/ui/Modal";
import TrainerForm from "@/components/trainer/TrainerForm";
import api from "@/src/app/lib/axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TrainerModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode?: "add" | "edit";
  initialValues?: Record<string, any>;
  onSuccess?: () => void;
}

export default function TrainerModal({
  isOpen,
  onClose,
  mode = "add",
  initialValues = {},
  onSuccess,
}: TrainerModalProps) {
  const router = useRouter();

  const handleSubmit = async (values: Record<string, any>) => {
    try {
      const trainerId = initialValues._id || initialValues.id;

      if (mode === "edit" && trainerId) {
        await api.put(`/trainer/update/${trainerId}`, values);
        toast.success("Trainer updated successfully!");
      } else {
        await api.post("/trainer/add", values);
        toast.success("Trainer added successfully!");
      }

      if (onSuccess) onSuccess();
      onClose();
      router.refresh(); // Refresh current page state instead of forced push
    } catch (err: any) {
      const errorMessage =
        err.response?.data?.message || "Failed to save trainer details.";
      toast.error(errorMessage);

      console.error("Submission Error Details:", {
        status: err.response?.status,
        data: err.response?.data,
        url: err.config?.url,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      width="lg"
      title={mode === "add" ? "Add Trainer" : "Edit Trainer"}
    >
      <TrainerForm
        initialValues={initialValues}
        submitText={mode === "add" ? "Save Trainer" : "Update Trainer"}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}