"use client";

import React from "react";

type LoaderProps = {
    size?: "sm" | "md" | "lg";
    fullScreen?: boolean;
};

export default function Loader({
    size = "md",
    fullScreen = false,
}: LoaderProps) {
    const sizes = {
        sm: "h-5 w-5 border-2",
        md: "h-8 w-8 border-[3px]",
        lg: "h-12 w-12 border-4",
    };

    const spinner = (
        <div
            className={`
                animate-spin
                rounded-full
                border-blue-600
                border-t-transparent
                ${sizes[size]}
            `}
        />
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-white/70">
                {spinner}
            </div>
        );
    }

    return (
        <div className="flex justify-center py-5">
            {spinner}
        </div>
    );
}