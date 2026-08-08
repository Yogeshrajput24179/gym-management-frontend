"use client";

import { useMemo } from "react";
import { Eye, Pencil, Trash2 } from "lucide-react";
import DataTable, { TableColumn } from "@/components/common/DataTable";

export interface Member {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  membership?: string;
  membership_plan_id?: string;
  trainer?: string;
  joining_date?: string;
  dob?: string;
  status: "Active" | "Expired" | "Pending" | "inactive";
}

interface MemberTableProps {
  members: Member[];
  loading: boolean;
  onEdit?: (member: Member) => void;
  onDelete?: (id: number) => void;
  onView?: (member: Member) => void;
}

const getStatusBadgeClass = (status: Member["status"]) => {
  const normalized = status.toLowerCase();
  switch (normalized) {
    case "active":
      return "bg-green-100 text-green-700 border-green-200";
    case "expired":
    case "inactive":
      return "bg-red-100 text-red-700 border-red-200";
    case "pending":
      return "bg-amber-100 text-amber-700 border-amber-200";
    default:
      return "bg-slate-100 text-slate-700 border-slate-200";
  }
};

const formatJoiningDate = (dateStr?: string) => {
  if (!dateStr) return "N/A";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? "N/A" : date.toLocaleDateString();
};

export default function MemberTable({
  members,
  loading,
  onEdit,
  onDelete,
  onView,
}: MemberTableProps) {
  const columns = useMemo<TableColumn<Member>[]>(
    () => [
      {
        key: "id",
        title: "Member Id",
      },
      {
        key: "full_name",
        title: "Member",
      },
      {
        key: "phone",
        title: "Phone",
      },
      {
        key: "email",
        title: "Email",
      },
      {
        key: "membership",
        title: "Membership",
        align: "center",
        render: (row) => row.membership || row.membership_plan_id || "N/A",
      },
      {
        key: "trainer",
        title: "Trainer",
        render: (row) => row.trainer || "Unassigned",
      },
      {
        key: "joining_date",
        title: "Joined",
        render: (row) => formatJoiningDate(row.joining_date),
      },
      {
        key: "status",
        title: "Status",
        align: "center",
        render: (row) => (
          <span
            className={`inline-block border rounded-full px-3 py-1 text-xs font-medium capitalize ${getStatusBadgeClass(
              row.status
            )}`}
          >
            {row.status}
          </span>
        ),
      },
      {
        key: "actions",
        title: "Actions",
        align: "center",
        render: (row) => (
          <div className="flex justify-center gap-2">
            <button
              type="button"
              className="rounded-lg p-2 text-slate-600 hover:bg-slate-100 transition-colors"
              onClick={() => onView?.(row)}
              aria-label={`View details for ${row.full_name}`}
            >
              <Eye size={18} />
            </button>

            <button
              type="button"
              className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 transition-colors"
              onClick={() => onEdit?.(row)}
              aria-label={`Edit ${row.full_name}`}
            >
              <Pencil size={18} />
            </button>

            <button
              type="button"
              className="rounded-lg p-2 text-red-600 hover:bg-red-50 transition-colors"
              onClick={() => onDelete?.(row.id)}
              aria-label={`Delete ${row.full_name}`}
            >
              <Trash2 size={18} />
            </button>
          </div>
        ),
      },
    ],
    [onView, onEdit, onDelete]
  );

  return (
    <DataTable
      columns={columns}
      data={members}
      loading={loading}
      emptyMessage="No members found"
    />
  );
}