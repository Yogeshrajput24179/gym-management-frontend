"use client";

import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import PaymentForm from "./PaymentForm";
import api from "@/src/app/utils/axios";
import { toast } from "sonner";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
  onSuccess,
}: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const FORM_ID = "payment-modal-form";

  const handleSave = async (data: Record<string, any>) => {
    setLoading(true);
    try {
      await api.post("/payment/add", data);
      toast.success("Payment saved successfully!");
      if (onSuccess) onSuccess();
      onClose();
    } catch (error: any) {
      console.error("Error saving payment:", error);
      const errorMsg =
        error?.response?.data?.message || "Failed to save payment.";
      toast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Payment"
      width="xl"
      footer={
        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>

          <Button
            type="submit"
            // Passed via extra props/className to trigger native HTML form submission
            {...({ form: FORM_ID } as any)}
            variant="primary"
            size="sm"
            loading={loading}
          >
            Save Payment
          </Button>
        </div>
      }
    >
      <PaymentForm
        formId={FORM_ID}
        showSubmitButton={false}
        onSubmit={handleSave}
      />
    </Modal>
  );
}