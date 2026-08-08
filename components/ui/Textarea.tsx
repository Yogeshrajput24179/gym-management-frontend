"use client";

import React from "react";

type TextAreaProps = {
    label?: string;
    name?: string;
    value?: string;

    rows?: number;

    placeholder?: string;

    required?: boolean;
    disabled?: boolean;

    error?: string;

    helperText?: string;

    className?: string;

    onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
};

export default function TextArea({
    label,
    name,
    value,
    rows = 4,
    placeholder,
    required,
    disabled,
    error,
    helperText,
    className = "",
    onChange,
}: TextAreaProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="mb-2 block text-sm font-medium">
                    {label}
                    {required && (
                        <span className="ml-1 text-red-500">*</span>
                    )}
                </label>
            )}

            <textarea
                name={name}
                rows={rows}
                value={value}
                placeholder={placeholder}
                disabled={disabled}
                onChange={onChange}
                className={`
                    w-full rounded-lg border border-gray-300
                    px-4 py-3 outline-none
                    resize-none
                    focus:border-blue-500
                    ${className}
                `}
            />

            {helperText && !error && (
                <p className="mt-1 text-xs text-gray-500">
                    {helperText}
                </p>
            )}

            {error && (
                <p className="mt-1 text-sm text-red-500">
                    {error}
                </p>
            )}
        </div>
    );
}