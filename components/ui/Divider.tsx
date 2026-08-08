"use client";

type DividerProps = {
    text?: string;
};

export default function Divider({
    text,
}: DividerProps) {
    return (
        <div className="flex items-center gap-4 py-3">
            <div className="h-px flex-1 bg-gray-300" />

            {text && (
                <span className="text-sm text-gray-500">
                    {text}
                </span>
            )}

            <div className="h-px flex-1 bg-gray-300" />
        </div>
    );
}