"use client";

import { useEffect, useState } from "react";
import {
  Download,
  Plus,
  RefreshCw,
  Calendar as CalendarIcon,
  List,
  ChevronLeft,
  ChevronRight,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  MinusCircle,
} from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";

import AttendanceStats from "@/components/attendance/AttendanceStats";
import AttendanceFilters from "@/components/attendance/AttendanceFilter";
import AttendanceTable from "@/components/attendance/AttendanceTable";
import AttendanceModal from "@/components/attendance/AttendanceModal";
import QuickCheckIn from "@/components/attendance/QuickCheckIn";
import api from "@/src/app/lib/axios";

// --- INTERFACES ---
interface AttendanceCalendarProps {
  type?: "member" | "trainer" | string;
  targetId: number;
}

interface AttendanceRecord {
  id?: number;
  date: string;
  status: string;
  checkIn?: string;
  checkOut?: string;
  check_in?: string;
  check_out?: string;
}

interface TargetProfile {
  id: number;
  full_name?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
}

// --- ATTENDANCE CALENDAR COMPONENT ---
function AttendanceCalendar({
  type = "member",
  targetId,
}: AttendanceCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<TargetProfile | null>(null);
  const [records, setRecords] = useState<Record<string, AttendanceRecord>>({});

  const safeType = String(type ?? "member").toLowerCase().replace(/s$/, "");

  useEffect(() => {
    async function fetchData() {
      if (!targetId) return;

      setLoading(true);
      try {
        // 1. Fetch Profile Details
        try {
          const profileRes = await api.get(`/${safeType}s/${targetId}`);
          setProfile(profileRes.data?.data || profileRes.data || null);
        } catch {
          setProfile(null);
        }

        // 2. Fetch Attendance Records
        const attendanceRes = await api.get(
          `/attendance?type=${safeType}&id=${targetId}&month=${
            currentDate.getMonth() + 1
          }&year=${currentDate.getFullYear()}`
        );

        // Normalize response body structure
        const rawData = attendanceRes.data?.data || attendanceRes.data || [];
        const recordMap: Record<string, AttendanceRecord> = {};

        if (Array.isArray(rawData)) {
          rawData.forEach((rec: any) => {
            if (rec) {
              // Extract YYYY-MM-DD from ISO, Timestamp, or Date String
              let dateStr = "";
              if (rec.date) {
                dateStr = String(rec.date).split("T")[0];
              } else if (rec.created_at) {
                dateStr = String(rec.created_at).split("T")[0];
              }

              if (dateStr) {
                recordMap[dateStr] = {
                  ...rec,
                  status: rec.status || "Present",
                  checkIn: rec.checkIn || rec.check_in || rec.checkin || "--:--",
                  checkOut: rec.checkOut || rec.check_out || rec.checkout || "--:--",
                };
              }
            }
          });
        }

        setRecords(recordMap);
      } catch (err) {
        console.error("Failed to load attendance calendar data", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [safeType, targetId, currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getDisplayName = () => {
    if (profile?.full_name) return profile.full_name;
    if (profile?.name) return profile.name;
    if (profile?.first_name) {
      return `${profile.first_name} ${profile.last_name || ""}`.trim();
    }
    return `${safeType.toUpperCase()} #${targetId}`;
  };

  const displayName = getDisplayName();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex flex-col gap-4 border-b border-slate-100 bg-slate-50/50 p-6 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-600 font-bold text-lg">
            <User className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-800">{displayName}</h2>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold capitalize text-blue-600 border border-blue-200">
                {safeType}
              </span>
            </div>
            <p className="text-xs text-slate-500">Target ID: #{targetId}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handlePrevMonth}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="min-w-[140px] text-center text-sm font-semibold text-slate-800">
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            type="button"
            onClick={handleNextMonth}
            className="rounded-lg border border-slate-200 bg-white p-2 text-slate-600 shadow-sm transition hover:bg-slate-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Week Headers */}
      <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50 text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
        {weekDays.map((day) => (
          <div key={day} className="py-3">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      {loading ? (
        <div className="p-12 text-center text-sm text-slate-400">
          Loading attendance calendar...
        </div>
      ) : (
        <div className="grid grid-cols-7 auto-rows-fr divide-x divide-y divide-slate-100 text-sm">
          {Array.from({ length: firstDayOfMonth }).map((_, index) => (
            <div key={`empty-${index}`} className="min-h-[110px] bg-slate-50/30 p-2" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const formattedDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(
              dayNum
            ).padStart(2, "0")}`;

            const record = records[formattedDate];
            const status = record?.status;

            return (
              <div
                key={formattedDate}
                className="min-h-[110px] p-2 flex flex-col justify-between transition hover:bg-slate-50/50"
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-semibold text-slate-700">{dayNum}</span>
                  {status === "Present" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                  {status === "Absent" && <XCircle className="h-4 w-4 text-rose-500" />}
                  {status === "Late" && <AlertCircle className="h-4 w-4 text-amber-500" />}
                  {!status && <MinusCircle className="h-3.5 w-3.5 text-slate-200" />}
                </div>

                <div className="mt-auto space-y-1">
                  {status ? (
                    <>
                      <span
                        className={`inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          status === "Present"
                            ? "bg-emerald-100 text-emerald-800"
                            : status === "Absent"
                            ? "bg-rose-100 text-rose-800"
                            : "bg-amber-100 text-amber-800"
                        }`}
                      >
                        {status}
                      </span>

                      <div className="text-[10px] text-slate-500 font-medium flex flex-col gap-0.5 mt-1">
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">In:</span>
                          <span className="font-semibold text-slate-700">
                            {record.checkIn || "--:--"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-slate-400">Out:</span>
                          <span className="font-semibold text-slate-700">
                            {record.checkOut || "--:--"}
                          </span>
                        </div>
                      </div>
                    </>
                  ) : (
                    <span className="text-[10px] text-slate-300 italic">--</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// --- MAIN PAGE COMPONENT ---
export default function AttendancePage() {
  const [open, setOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [isMounted, setIsMounted] = useState(false);

  // Consistent defaults for Server Render
  const [activeView, setActiveView] = useState<"list" | "calendar">("list");
  const [selectedType, setSelectedType] = useState<"member" | "trainer">("member");
  const [selectedId, setSelectedId] = useState<number>(1);

  // Restore client values post-hydration
  useEffect(() => {
    setIsMounted(true);

    const savedView = localStorage.getItem("att_activeView") as "list" | "calendar" | null;
    if (savedView) setActiveView(savedView);

    const savedType = localStorage.getItem("att_selectedType") as "member" | "trainer" | null;
    if (savedType) setSelectedType(savedType);

    const savedId = localStorage.getItem("att_selectedId");
    if (savedId) setSelectedId(Number(savedId));
  }, []);

  const handleAttendanceUpdated = () => {
    setRefreshKey((prev) => prev + 1);
  };

  const handleViewChange = (view: "list" | "calendar") => {
    setActiveView(view);
    localStorage.setItem("att_activeView", view);
  };

  const handleTypeChange = (type: "member" | "trainer") => {
    setSelectedType(type);
    localStorage.setItem("att_selectedType", type);
  };

  const handleIdChange = (idVal: string) => {
    const num = Number(idVal) || 1;
    setSelectedId(num);
    localStorage.setItem("att_selectedId", String(num));
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div className="space-y-5">
      <PageHeader
        title="Attendance Management"
        description="Manage daily attendance of gym members and trainers."
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

            <Button onClick={() => setOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Mark Attendance
            </Button>
          </div>
        }
      />

      <div className="rounded-xl border bg-white p-5 shadow-sm">
        <h3 className="mb-2 text-sm font-semibold uppercase tracking-wider text-gray-500">
          Front Desk Quick Check-In
        </h3>
        <QuickCheckIn onAttendanceUpdated={handleAttendanceUpdated} />
      </div>

      <AttendanceStats key={`stats-${refreshKey}`} />

      {/* Tab Switcher Controls */}
      <div className="flex items-center justify-between rounded-xl border bg-white p-3 shadow-sm">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => handleViewChange("list")}
            className={`flex items-center rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
              activeView === "list"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <List className="mr-2 h-4 w-4" />
            List View
          </button>

          <button
            type="button"
            onClick={() => handleViewChange("calendar")}
            className={`flex items-center rounded-lg px-4 py-2 text-xs font-medium transition-colors ${
              activeView === "calendar"
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-white text-slate-700 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            Calendar View
          </button>
        </div>

        {/* Target Selector */}
        {activeView === "calendar" && (
          <div className="flex items-center gap-3 text-sm">
            <select
              value={selectedType}
              onChange={(e) => handleTypeChange(e.target.value as "member" | "trainer")}
              className="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="member">Member</option>
              <option value="trainer">Trainer</option>
            </select>

            <input
              type="number"
              placeholder="Enter ID..."
              value={selectedId}
              onChange={(e) => handleIdChange(e.target.value)}
              className="w-32 rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        )}
      </div>

      {activeView === "list" && (
        <div className="space-y-5">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <AttendanceFilters />
          </div>

          <div className="rounded-xl border bg-white shadow-sm">
            <div className="border-b px-6 py-5">
              <h2 className="text-lg font-semibold text-slate-800">Attendance Records</h2>
              <p className="text-sm text-gray-500">View and manage attendance.</p>
            </div>

            <AttendanceTable key={`table-${refreshKey}`} />
          </div>
        </div>
      )}

      {activeView === "calendar" && (
        <div className="space-y-3 rounded-xl border-2px bg-white p-5 shadow-sm">
          <AttendanceCalendar
            key={`cal-${selectedType}-${selectedId}-${refreshKey}`}
            type={selectedType}
            targetId={selectedId}
          />
        </div>
      )}

      <AttendanceModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onAttendanceUpdated={handleAttendanceUpdated}
      />
    </div>
  );
}