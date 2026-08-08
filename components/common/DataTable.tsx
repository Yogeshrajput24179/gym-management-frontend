"use client";

import React from "react";
import EmptyState from "@/components/ui/EmptyState";
import Loader from "@/components/ui/Loader";

export interface TableColumn<T> {
    key: keyof T | string;
    title: string;
    width?: string;
    align?: "left" | "center" | "right";
    render?: (row: T, index: number) => React.ReactNode;
}

type DataTableProps<T> = {
    columns: TableColumn<T>[];
    data: T[];
    loading?: boolean;
    emptyMessage?: string;
    striped?: boolean;
    bordered?: boolean;
    hover?: boolean;
    showIndex?: boolean;
    className?: string;
};

export default function DataTable<T>({
    columns,
    data,
    loading = false,
    emptyMessage = "No records found",
    striped = true,
    bordered = true,
    hover = true,
    showIndex = false,
    className = "",
}: DataTableProps<T>) {
    if (loading) {
        return <Loader />;
    }

    if (!data.length) {
        return <EmptyState title={emptyMessage} />;
    }

    return (
        <div
            className={`
                overflow-hidden rounded-xl bg-white
                ${bordered ? "border border-gray-200 shadow-sm" : ""}
                ${className}
            `}
        >
            <div className="overflow-auto">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead className="sticky top-0 z-10 bg-gray-50">
                        <tr>
                            {showIndex && (
                                <th
                                    className="
                                        w-16
                                        border-b border-gray-200
                                        px-4 py-3
                                        text-center
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-gray-600
                                    "
                                >
                                    #
                                </th>
                            )}

                            {columns.map((column, index) => (
                                <th
                                    key={`head-${String(column.key)}-${index}`}
                                    style={{ width: column.width }}
                                    className={`
                                        border-b border-gray-200
                                        bg-gray-50
                                        px-4 py-3
                                        text-xs
                                        font-semibold
                                        uppercase
                                        tracking-wide
                                        text-gray-600
                                        ${
                                            column.align === "center"
                                                ? "text-center"
                                                : column.align === "right"
                                                ? "text-right"
                                                : "text-left"
                                        }
                                    `}
                                >
                                    {column.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr
                                key={`row-${(row as any)?.id ?? rowIndex}`}
                                className={`
                                    transition-colors duration-200
                                    border-b border-gray-100
                                    ${
                                        striped && rowIndex % 2
                                            ? "bg-gray-50/60"
                                            : "bg-white"
                                    }
                                    ${
                                        hover
                                            ? "hover:bg-blue-50"
                                            : ""
                                    }
                                `}
                            >
                                {showIndex && (
                                    <td className="whitespace-nowrap border-b border-gray-100 px-4 py-3 text-center text-sm font-medium text-gray-500">
                                        {rowIndex + 1}
                                    </td>
                                )}

                                {columns.map((column, colIndex) => (
                                    <td
                                        key={`cell-${rowIndex}-${String(
                                            column.key
                                        )}-${colIndex}`}
                                        className={`
                                            border-b border-gray-100
                                            px-4 py-3
                                            text-sm
                                            text-gray-700
                                            whitespace-nowrap
                                            max-w-xs
                                            overflow-hidden
                                            text-ellipsis
                                            ${
                                                column.align === "center"
                                                    ? "text-center"
                                                    : column.align === "right"
                                                    ? "text-right"
                                                    : "text-left"
                                            }
                                        `}
                                    >
                                        {column.render
                                            ? column.render(row, rowIndex)
                                            : (row[
                                                  column.key as keyof T
                                              ] as React.ReactNode)}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}