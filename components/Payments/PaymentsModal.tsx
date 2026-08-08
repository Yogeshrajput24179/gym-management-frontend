"use client";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import PaymentForm from "./PaymentForm";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PaymentModal({
  isOpen,
  onClose,
}: PaymentModalProps) {
  const handleSave = () => {
    console.log("Payment Saved");
    onClose();
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
            variant="secondary"
            onClick={onClose}
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            onClick={handleSave}
          >
            Save Payment
          </Button>
        </div>
      }
    >
      <PaymentForm />
    </Modal>
  );
}
