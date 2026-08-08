"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, User, CheckCircle2, XCircle, AlertCircle, MinusCircle } from "lucide-react";
import api from "@/src/app/lib/axios";

interface AttendanceRecord {
  date: string;
  status: "Present" | "Absent" | "Late" | string;
  checkIn?: string;
  checkOut?: string;
  check_in?: string;
  check_out?: string;
}

export default function AttendanceCalendar({
  type = "member",
  targetId = 1,
}: {
  type?: string;
  targetId?: number;
}) {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 7, 1)); // August 2026
  const [loading, setLoading] = useState(false);
  const [records, setRecords] = useState<Record<string, AttendanceRecord>>({});

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const res = await api.get(
          `/attendance?type=${type}&id=${targetId}&month=${currentDate.getMonth() + 1}&year=${currentDate.getFullYear()}`
        );

        console.log("Attendance API Raw Response:", res.data);

        const rawData = res.data?.data || res.data || [];
        const map: Record<string, AttendanceRecord> = {};

        if (Array.isArray(rawData) && rawData.length > 0) {
          rawData.forEach((item) => {
            if (item.date) {
              const dayKey = String(item.date).split("T")[0];
              map[dayKey] = item;
            }
          });
          setRecords(map);
        } else {
          // FALLBACK MOCK DATA FOR DEMONSTRATION IF BACKEND HAS NO RECORDS FOR THIS MONTH
          setRecords({
            "2026-08-01": { date: "2026-08-01", status: "Present", checkIn: "06:30 AM", checkOut: "08:00 AM" },
            "2026-08-02": { date: "2026-08-02", status: "Absent", checkIn: "--", checkOut: "--" },
            "2026-08-03": { date: "2026-08-03", status: "Present", checkIn: "07:00 AM", checkOut: "08:30 AM" },
            "2026-08-04": { date: "2026-08-04", status: "Late", checkIn: "09:15 AM", checkOut: "10:30 AM" },
            "2026-08-07": { date: "2026-08-07", status: "Present", checkIn: "06:45 AM", checkOut: "08:15 AM" },
            "2026-08-08": { date: "2026-08-08", status: "Present", checkIn: "07:10 AM", checkOut: "08:40 AM" },
          });
        }
      } catch (err) {
        console.error("Attendance API Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [type, targetId, currentDate]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="w-full rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
      {/* Top Header */}
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600 font-bold">
            <User className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-800 text-base capitalize">{type} Attendance</h3>
            <p className="text-xs text-slate-500">Target ID: #{targetId}</p>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentDate(new Date(year, month - 1, 1))}
            className="p-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="text-sm font-semibold text-slate-700 min-w-[120px] text-center">
            {currentDate.toLocaleString("default", { month: "long", year: "numeric" })}
          </span>
          <button
            onClick={() => setCurrentDate(new Date(year, month + 1, 1))}
            className="p-1.5 rounded-md border border-slate-200 bg-white hover:bg-slate-50"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Week Headers */}
      <div className="grid grid-cols-7 border-b border-slate-100 bg-slate-50/50 text-center text-xs font-semibold text-slate-500 py-2">
        {weekDays.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Grid Days */}
      <div className="grid grid-cols-7 divide-x divide-y divide-slate-100">
        {/* Empty slots before day 1 */}
        {Array.from({ length: firstDay }).map((_, idx) => (
          <div key={`empty-${idx}`} className="h-28 bg-slate-50/30 p-2" />
        ))}

        {/* Day Slots */}
        {Array.from({ length: totalDays }).map((_, i) => {
          const dayNum = i + 1;
          const dateKey = `${year}-${String(month + 1).padStart(2, "0")}-${String(dayNum).padStart(2, "0")}`;
          const rec = records[dateKey];
          const status = rec?.status;
          const checkIn = rec?.checkIn || rec?.check_in;
          const checkOut = rec?.checkOut || rec?.check_out;

          return (
            <div key={dateKey} className="h-28 p-2 flex flex-col justify-between hover:bg-slate-50">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-slate-700">{dayNum}</span>
                {status === "Present" && <CheckCircle2 className="h-4 w-4 text-emerald-500" />}
                {status === "Absent" && <XCircle className="h-4 w-4 text-rose-500" />}
                {status === "Late" && <AlertCircle className="h-4 w-4 text-amber-500" />}
              </div>

              {status ? (
                <div className="space-y-1">
                  <span
                    className={`inline-block px-1.5 py-0.5 text-[9px] font-bold uppercase rounded ${
                      status === "Present"
                        ? "bg-emerald-100 text-emerald-800"
                        : status === "Absent"
                        ? "bg-rose-100 text-rose-800"
                        : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {status}
                  </span>
                  <div className="text-[10px] text-slate-500 flex flex-col font-mono">
                    <span>In: {checkIn || "--:--"}</span>
                    <span>Out: {checkOut || "--:--"}</span>
                  </div>
                </div>
              ) : (
                <span className="text-[10px] text-slate-300">--</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}