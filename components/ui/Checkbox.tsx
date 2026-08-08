"use client";

import React from "react";

type CheckboxProps = {
    label: string;

    checked?: boolean;

    disabled?: boolean;
    required?: boolean;
    error?: string;
    helperText?: string;

    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Checkbox({
    label,
    checked,
    disabled,
    required,
    error,
    helperText,
    onChange,
}: CheckboxProps) {
    return (
        <label className="flex cursor-pointer items-center gap-3">
            <span>{label}</span>
            <input
                type="checkbox"
                checked={checked}
                disabled={disabled}
                onChange={onChange}
                className="h-4 w-4 rounded"
                required={required}
            />

            <span>{helperText}</span>
        </label>
    );
}