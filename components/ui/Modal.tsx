"use client";

import { ReactNode, useEffect } from "react";


type ModalProps = {
    isOpen: boolean;
    title?: string;
    children: ReactNode;
    footer?: ReactNode;
    width?: "sm" | "md" | "lg" | "xl";
    closeOnOverlay?: boolean;
    onClose: () => void;
};

export default function Modal({
    isOpen,
    title,
    children,
    footer,
    width = "md",
    closeOnOverlay = true,
    onClose,
}: ModalProps) {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        if (isOpen) {
            document.addEventListener("keydown", handleKey);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleKey);
            document.body.style.overflow = "";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const widths = {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-3xl",
        xl: "max-w-5xl",
    };

    return (
        <div
            className="fixed inset-0 z-50 flex text-black items-center justify-center bg-black/50 p-4"
            onClick={() => closeOnOverlay && onClose()}
        >
            <div
                className={`w-full ${widths[width]} rounded-xl bg-white shadow-xl`}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="border-b px-6 py-4">
                        <h2 className="text-lg font-semibold">{title}</h2>
                    </div>
                )}

                <div className="max-h-[70vh] overflow-y-auto p-6">
                    {children}
                </div>

                {footer && (
                    <div className="border-t bg-gray-50 px-6 py-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
}