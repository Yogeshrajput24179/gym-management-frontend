"use client";

import React from "react";

type SwitchProps = {
    checked?: boolean;
    isDisabled?: boolean;
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
};

export default function Switch({
    checked,
    onChange,
    isDisabled
}: SwitchProps) {
    return (
        <label className="relative inline-flex cursor-pointer items-center">
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                className="peer sr-only"
                disabled={isDisabled}
            />

            <div
                className="
                h-6
                w-11
                rounded-full
                bg-gray-300
                transition
                peer-checked:bg-blue-600
                after:absolute
                after:left-1
                after:top-1
                after:h-4
                after:w-4
                after:rounded-full
                after:bg-white
                after:transition-all
                peer-checked:after:translate-x-5
            "
            />
        </label>
    );
}