"use client";

import { ChangeEvent } from "react";
import { FiSearch } from "react-icons/fi";

type SearchInputProps = {
    value?: string;
    placeholder?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({
    value,
    placeholder = "Search...",
    onChange,
}: SearchInputProps) {
    return (
        <div className="relative w-full">
            <FiSearch
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
            />

            <input
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="w-full rounded-lg border border-gray-300 py-3 pl-10 pr-4 outline-none focus:border-blue-500"
            />
        </div>
    );
}