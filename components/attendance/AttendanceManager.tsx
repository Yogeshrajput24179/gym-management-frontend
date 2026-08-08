"use client";

import { useState } from "react";
import { Download, Plus, RefreshCw } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";

import AttendanceStats from "@/components/attendance/AttendanceStats";
import AttendanceFilter from "@/components/attendance/AttendanceFilter";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import AttendanceModal from "@/components/attendance/AttendanceModal";
import QuickCheckIn from "@/components/attendance/QuickCheckIn";

export default function AttendanceManager() {
  const [openModal, setOpenModal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  // Trigger re-fetch for stats & table components
  const handleAttendanceUpdated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="space-y-6 p-6">
      {/* Header with Quick Action Buttons */}
      <PageHeader
        title="Attendance Management"
        description="Manage daily check-ins and check-outs for gym members."
        action={
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleAttendanceUpdated}>
              <RefreshCw className="mr-2 h-4 w-4" />
              Refresh
            </Button>

            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Button onClick={() => setOpenModal(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Mark Attendance
            </Button>
          </div>
        }
      />

      {/* 1-Click Front Desk Quick Search Bar */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">
          Front Desk Quick Check-In
        </h3>
        <QuickCheckIn onAttendanceUpdated={handleAttendanceUpdated} />
      </div>

      {/* Stats Overview */}
      <AttendanceStats key={`stats-${refreshKey}`} />

      {/* Filter Section */}
      <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <AttendanceFilter />
      </div>

      {/* Data Table */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-800">
            Today's Attendance Records
          </h2>
          <p className="text-xs text-slate-500">
            View active check-ins, check-out times, and member presence logs.
          </p>
        </div>

        <AttendanceTable key={`table-${refreshKey}`} />
      </div>

      {/* Manual Modal Form */}
      <AttendanceModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      />
    </div>
  );
}