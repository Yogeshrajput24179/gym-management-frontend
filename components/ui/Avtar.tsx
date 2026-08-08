"use client";

import React from "react";

type AvatarProps = {
    src?: string;
    name?: string;
    size?: "sm" | "md" | "lg";
};

export default function Avatar({
    src,
    name = "",
    size = "md",
}: AvatarProps) {
    const sizes = {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-14 w-14 text-lg",
    };

    if (src) {
        return (
            <img
                src={src}
                alt={name}
                className={`rounded-full object-cover ${sizes[size]}`}
            />
        );
    }

    return (
        <div
            className={`
                flex
                items-center
                justify-center
                rounded-full
                bg-blue-600
                font-semibold
                text-white
                ${sizes[size]}
            `}
        >
            {name.charAt(0).toUpperCase()}
        </div>
    );
}