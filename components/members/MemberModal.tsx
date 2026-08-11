"use client";

import Modal from "@/components/ui/Modal";
import MemberForm from "./MemberForm";
import api from "@/src/app/lib/axios";
import { useRouter } from "next/navigation";
import { toast } from 'sonner';

interface MemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    mode?: "add" | "edit";
    initialValues?: Record<string, any>;
    onSuccess?: () => void;
}

export default function MemberModal({
    isOpen,
    onClose,
    mode = "add",
    initialValues = {},
    onSuccess,
}: MemberModalProps) {

    const router = useRouter();

    const handleSubmit = async (values: Record<string, any>) => {
        try {
            let res;
            if (mode === "edit" && initialValues._id) {
                // Handle Edit/Update route
                res = await api.put(`/member/update/${initialValues._id}`, values);
                toast.success('Member updated successfully!');
            } else {
                // Handle Add route
                res = await api.post("/member/add", values);
                toast.success('Member added successfully!');
            }

            // Execute parent refresh callback if provided, close modal, and navigate
            if (onSuccess) onSuccess();
            onClose();
            router.push("/dashboard/members");
            
        } catch (err: any) {
            console.error("Submission Error Details:", err.response?.data || err.message);
            
            // Show server error message or a fallback message
            const errorMessage = err.response?.data?.message || `Failed to ${mode} member. Please try again.`;
            toast.error(errorMessage);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "add" ? "Add New Member" : "Edit Member Details"}
            subtitle={mode === "add" ? "Fill out personal and dietary parameters" : "Update existing member information"}
            width="lg"
        >
            <MemberForm
                initialValues={initialValues}
                submitText={mode === "add" ? "Save Member" : "Update Member"}
                onSubmit={handleSubmit}
                onCancel={onClose}
            />
        </Modal>
    );
}