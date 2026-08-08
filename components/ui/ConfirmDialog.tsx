"use client";

import Button from "@/app/components/ui/Button";
import Modal from "@/app/components/ui/Modal";

type ConfirmDialogProps = {
    open: boolean;
    title?: string;
    message: string;
    loading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
};

export default function ConfirmDialog({
    open,
    title = "Confirmation",
    message,
    loading,
    onConfirm,
    onCancel,
}: ConfirmDialogProps) {
    return (
        <Modal
            isOpen={open}
            title={title}
            onClose={onCancel}
            footer={
                <div className="flex justify-end gap-3">
                    <Button variant="secondary" onClick={onCancel}>
                        Cancel
                    </Button>

                    <Button
                        variant="danger"
                        loading={loading}
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            }
        >
            <p className="text-gray-600">{message}</p>
        </Modal>
    );
}