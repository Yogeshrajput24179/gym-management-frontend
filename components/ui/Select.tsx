"use client";

import React from "react";

export interface SelectOption {
    label: string;
    value: string | number;
}

type SelectProps = {
    label?: string;
    name?: string;
    value?: string | number;
    placeholder?: string;
    options: SelectOption[];

    required?: boolean;
    disabled?: boolean;

    error?: string;
    helperText?: string;

    className?: string;

    onChange?: React.ChangeEventHandler<HTMLSelectElement>;
};

export default function Select({
    label,
    name,
    value = "",
    placeholder = "Select",
    options,
    required,
    disabled,
    error,
    helperText,
    className = "",
    onChange,
}: SelectProps) {
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

            <select
                name={name}
                value={value}
                disabled={disabled}
                onChange={onChange}
                className={`
                    w-full rounded-lg border text-black bg-white px-4 py-3 outline-none
                    transition
                    ${error
                        ? "border-red-500"
                        : "border-gray-300 focus:border-blue-500"
                    }
                    ${className}
                `}
            >
                <option value="">{placeholder}</option>

                {options.map((option, index) => (
                    <option
                        // Combines value, label, and index so keys are guaranteed 100% unique
                        key={`${option.value}-${option.label}-${index}`}
                        value={option.value}
                    >
                        {option.label}
                    </option>
                ))}
            </select>

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