"use client";

import React from "react";

type BadgeProps = {
    children: React.ReactNode;
    variant?:
        | "primary"
        | "secondary"
        | "success"
        | "danger"
        | "warning";
    rounded?: boolean;
    className?: string;
};

export default function Badge({
    children,
    variant = "primary",
    rounded = true,
    className = "",
}: BadgeProps) {
    const colors = {
        primary: "bg-blue-100 text-blue-700",
        secondary: "bg-gray-100 text-gray-700",
        success: "bg-green-100 text-green-700",
        danger: "bg-red-100 text-red-700",
        warning: "bg-yellow-100 text-yellow-700",
    };

    return (
        <span
            className={`
                inline-flex
                items-center
                px-3
                py-1
                text-sm
                font-medium
                ${rounded ? "rounded-full" : "rounded-md"}
                ${colors[variant]}
                ${className}
            `}
        >
            {children}
        </span>
    );
}