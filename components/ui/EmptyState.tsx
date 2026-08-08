"use client";

import React from "react";

type EmptyStateProps = {
    title: string;
    description?: string;
    icon?: React.ReactNode;
    action?: React.ReactNode;
};

export default function EmptyState({
    title,
    description,
    icon,
    action,
}: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
            {icon && (
                <div className="mb-4 text-5xl text-gray-400">
                    {icon}
                </div>
            )}

            <h3 className="text-xl font-semibold">
                {title}
            </h3>

            {description && (
                <p className="mt-2 max-w-sm text-gray-500">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}
        </div>
    );
}