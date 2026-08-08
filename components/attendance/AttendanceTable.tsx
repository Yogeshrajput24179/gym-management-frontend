"use client";

import { useState } from "react";
import DataTable, { TableColumn } from "@/components/common/DataTable";
import { useData } from "@/context/DataContext";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import api from "@/src/app/utils/axios";
import { MdDelete, MdEdit, MdOutlineLogout } from "react-icons/md";

export interface Attendance {
  id: number;
  member_name?: string;
  trainer_name?: string;
  attendance_date?: string;
  check_in?: string;
  check_out?: string;
  status: "Present" | "Absent" | "Late" | string;
  Member?: {
    id?: number | string;
    full_name?: string;
  };
}

const formatDateTime = (dateStr?: string) => {
  if (!dateStr || dateStr === "--") return "--";
  const date = new Date(dateStr);
  return isNaN(date.getTime()) ? dateStr : date.toLocaleDateString();
};

const getCurrentTimeString = () => {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  
  return `${hours}:${minutes}:${seconds}`; // e.g., "11:04:00" or "23:04:00"
};

export default function AttendanceManager() {
  // Destructure fetchAllData (or fetchAttendance if your DataContext uses that name)
  const { 
    loading: contextLoading, 
    attendance: contextAttendance, 
    fetchAllData 
  } = useData();

  // Dialog State
  const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper to extract Auth Token
  const getAuthHeader = () => {
    const token = localStorage.getItem("token");
    return { headers: { Authorization: `Bearer ${token}` } };
  };

  // Quick Check Out Handler
  const handleCheckOut = async (attendance: Attendance) => {
    const currentTime = getCurrentTimeString();

    try {
      await api.put(
        `/attendence/update/${attendance.id}`,
        { check_out: currentTime },
        getAuthHeader()
      );

      if (fetchAllData) await fetchAllData();
    } catch (error) {
      console.error("Failed to check out member:", error);
      alert("Failed to record check out time.");
    }
  };

  // Edit Click Handlers
  const handleEditClick = (attendance: Attendance) => {
    setSelectedAttendance(attendance);
    setIsEditOpen(true);
  };

  const handleSaveEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!selectedAttendance) return;

    setIsSubmitting(true);
    try {
      await api.put(
        `/attendence/update/${selectedAttendance.id}`,
        {
          status: selectedAttendance.status,
          check_in: selectedAttendance.check_in,
          check_out: selectedAttendance.check_out,
        },
        getAuthHeader()
      );

      if (fetchAllData) await fetchAllData();

      setIsEditOpen(false);
      setSelectedAttendance(null);
    } catch (error) {
      console.error("Failed to update record:", error);
      alert("Failed to update attendance record.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Handlers
  const handleDeleteClick = (attendance: Attendance) => {
    setSelectedAttendance(attendance);
    setIsDeleteOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedAttendance) return;

    setIsSubmitting(true);
    try {
      await api.delete(
        `/attendence/delete/${selectedAttendance.id}`,
        getAuthHeader()
      );

      if (fetchAllData) await fetchAllData();

      setIsDeleteOpen(false);
      setSelectedAttendance(null);
    } catch (error: any) {
      console.error("Failed to delete record:", error);
      if (error.response?.status === 403) {
        alert("Access Denied (403): You do not have permission to perform this action.");
      } else {
        alert("Failed to delete record.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Table Columns Setup
  const columns: TableColumn<Attendance>[] = [
    {
      key: "MemberId",
      title: "Member Id",
      render: (row) => row.Member?.id ?? "N/A",
    },
    {
      key: "Member",
      title: "Member",
      render: (row) => row.Member?.full_name ?? row.member_name ?? "N/A",
    },
    {
      key: "attendance_date",
      title: "Date",
      render: (row) => formatDateTime(row.attendance_date),
    },
    {
      key: "check_in",
      title: "Check In",
      align: "center",
      render: (row) => row.check_in || "--",
    },
    {
      key: "check_out",
      title: "Check Out",
      align: "center",
      render: (row) => row.check_out || "--",
    },
    {
      key: "status",
      title: "Status",
      align: "center",
      render: (row) => {
        const isPresent = row.status?.toLowerCase() === "present";
        return (
          <span
            className={`inline-block rounded-full border px-3 py-1 text-xs font-medium capitalize ${
              isPresent
                ? "border-green-200 bg-green-100 text-green-700"
                : "border-red-200 bg-red-100 text-red-700"
            }`}
          >
            {row.status || "Absent"}
          </span>
        );
      },
    },
    {
      key: "actions",
      title: "Actions",
      align: "center",
      render: (row) => {
        const hasCheckedOut = Boolean(row.check_out && row.check_out !== "--");

        return (
          <div className="flex items-center justify-center gap-1">
            {/* Quick Check Out Button */}
            <Button
              type="button"
              disabled={hasCheckedOut}
              className={`rounded-lg p-2 transition ${
                hasCheckedOut
                  ? "cursor-not-allowed text-slate-300"
                  : "text-slate-600 hover:bg-blue-50 hover:text-blue-600 active:bg-blue-100"
              }`}
              onClick={() => handleCheckOut(row)}
              title={hasCheckedOut ? "Already checked out" : "Check Out Now"}
              aria-label={`Check out ${row.Member?.full_name || row.member_name || "member"}`}
            >
              <MdOutlineLogout />
            </Button>

            {/* Edit Button */}
            <Button
              type="button"
              className="rounded-lg p-2 text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-600 active:bg-emerald-100"
              onClick={() => handleEditClick(row)}
              aria-label={`Edit ${row.Member?.full_name || row.member_name || "member"}`}
            >
              <MdEdit />
            </Button>

            {/* Delete Button */}
            <Button
              type="button"
              className="rounded-lg p-2 text-slate-600 transition hover:bg-red-50 hover:text-red-600 active:bg-red-100"
              onClick={() => handleDeleteClick(row)}
              aria-label={`Delete ${row.Member?.full_name || row.member_name || "member"}`}
            >
              <MdDelete />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-6">
      <DataTable<Attendance>
        columns={columns}
        data={contextAttendance ?? []}
        loading={contextLoading}
        emptyMessage="No attendance records found."
        striped
        bordered
        hover
      />

      {/* Edit Modal */}
      {isEditOpen && selectedAttendance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Edit Attendance</h2>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Member Name
                </label>
                <Input
                  type="text"
                  disabled
                  value={
                    selectedAttendance.Member?.full_name ||
                    selectedAttendance.member_name ||
                    "N/A"
                  }
                  className="cursor-not-allowed bg-slate-100 text-slate-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-slate-700">
                  Status
                </label>
                <select
                  value={selectedAttendance.status}
                  onChange={(e) =>
                    setSelectedAttendance({
                      ...selectedAttendance,
                      status: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-slate-300 p-2.5 text-sm text-slate-900 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                  <option value="Late">Late</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Check In
                  </label>
                  <Input
                    type="text"
                    value={selectedAttendance.check_in || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSelectedAttendance({
                        ...selectedAttendance,
                        check_in: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">
                    Check Out
                  </label>
                  <Input
                    type="text"
                    value={selectedAttendance.check_out || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setSelectedAttendance({
                        ...selectedAttendance,
                        check_out: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <Button
                  type="button"
                  disabled={isSubmitting}
                  className="border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                  onClick={() => setIsEditOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-emerald-600 px-4 py-2 text-white hover:bg-emerald-700"
                >
                  {isSubmitting ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && selectedAttendance && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-slate-900">Confirm Deletion</h2>
            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to delete the attendance record for{" "}
              <span className="font-semibold text-slate-900">
                {selectedAttendance.Member?.full_name ||
                  selectedAttendance.member_name ||
                  "this member"}
              </span>
              ?
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <Button
                type="button"
                disabled={isSubmitting}
                className="border border-slate-300 px-4 py-2 text-slate-700 hover:bg-slate-50"
                onClick={() => setIsDeleteOpen(false)}
              >
                Cancel
              </Button>
              <Button
                type="button"
                disabled={isSubmitting}
                className="bg-red-600 px-4 py-2 text-white hover:bg-red-700"
                onClick={handleConfirmDelete}
              >
                {isSubmitting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}