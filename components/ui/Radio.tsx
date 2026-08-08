"use client";

import React from "react";

export interface RadioOption {
    label: string;
    value: string;
}

type RadioProps = {
    label?: string;
    name: string;
    value?: string;
    isDisabled?: boolean;
    options: RadioOption[];
    required?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Radio({
    label,
    name,
    value,
    options,
    onChange,
    isDisabled,
    required,
}: RadioProps) {
    return (
        <div>
            {label && (
                <p className="mb-2 text-sm font-medium">
                    {label}
                </p>
            )}

            <div className="flex gap-6">
                {options.map((option, index) => (
                    <label
                        key={`${name}-${option.value}-${index}`}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="radio"
                            name={name}
                            value={option.value}
                            checked={value === option.value}
                            onChange={onChange}
                            required={required}
                            disabled={isDisabled}
                        />

                        {option.label}
                    </label>
                ))}
            </div>
        </div>
    );
}