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
        console.log("Submitting values:", values);

        try {
            let res;
            if (mode === "edit" && initialValues._id) {
                // Handle Edit/Update route
                res = await api.put(`/member/update/${initialValues._id}`, values);
            } else {
                // Handle Add route
                res = await api.post("/member/add", values);
            }
           toast.success('Member updated successfully!')

            console.log("Success:", res.data);
            
            // Execute parent refresh callback if provided, close modal, and navigate
            if (onSuccess) onSuccess();
            onClose();
            router.push("/dashboard/members");
            
        } catch (err: any) {
            console.error("Submission Error Details:");
            console.error("Status:", err.response?.status);
            console.error("Response Data:", err.response?.data);
            console.error("Target URL:", err.config?.url);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={mode === "add" ? "Add Member" : "Edit Member"}
            width="xl"
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