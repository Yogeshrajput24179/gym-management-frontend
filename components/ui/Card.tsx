"use client";

import React from "react";

type CardProps = {
    children: React.ReactNode;
    title?: string;
    subtitle?: string;
    footer?: React.ReactNode;
    className?: string;
};

export default function Card({
    children,
    title,
    subtitle,
    footer,
    className = "",
}: CardProps) {
    return (
        <div
            className={`
                rounded-xl
                border
                border-gray-200
                bg-white
                shadow-sm
                ${className}
            `}
        >
            {(title || subtitle) && (
                <div className="border-b px-6 py-4">
                    {title && (
                        <h2 className="text-lg font-semibold">
                            {title}
                        </h2>
                    )}

                    {subtitle && (
                        <p className="mt-1 text-sm text-gray-500">
                            {subtitle}
                        </p>
                    )}
                </div>
            )}

            <div className="p-6">
                {children}
            </div>

            {footer && (
                <div className="border-t bg-gray-50 px-6 py-4">
                    {footer}
                </div>
            )}
        </div>
    );
}