"use client";

import { useState, useEffect } from "react";
import api from "@/src/app/utils/axios";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { MdSearch, MdCheckCircle, MdLogout } from "react-icons/md";

interface MemberResult {
  id: number;
  full_name: string;
  phone?: string;
}

export default function QuickCheckIn({ onAttendanceUpdated }: { onAttendanceUpdated?: () => void }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<MemberResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoadingId, setActionLoadingId] = useState<number | null>(null);

  // Debounced search logic
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        const res = await api.get(`/attendence/search-members?query=${encodeURIComponent(query)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setResults(res.data.data || []);
      } catch (err) {
        console.error("Failed to search members", err);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Handle 1-Click Toggle
  const handleToggleAttendance = async (memberId: number) => {
    setActionLoadingId(memberId);
    try {
      const token = localStorage.getItem("token");
      const res = await api.post(
        "/attendence/toggle",
        { member_id: memberId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert(res.data.message);

      // Clear search results and trigger table reload
      setQuery("");
      setResults([]);
      if (onAttendanceUpdated) {
        await onAttendanceUpdated();
      }
    } catch (err: any) {
      alert(err.response?.data?.message || "Check-in failed");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="relative mb-6 w-full max-w-lg">
      <div className="relative">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-xl text-slate-400" />
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Quick Check-In: Type Member ID, Name, or Phone..."
          className="pl-10 color-black text-base shadow-sm focus:border-emerald-500"
        />
      </div>

      {/* Autocomplete Search Dropdown */}
      {results.length > 0 && (
        <div className="absolute z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-white shadow-xl">
          {results.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between border-b border-slate-100 p-3 transition hover:bg-slate-50"
            >
              <div>
                <p className="font-semibold text-slate-800">{member.full_name}</p>
                <p className="text-xs text-slate-500">
                  ID: #{member.id} {member.phone ? `• ${member.phone}` : ""}
                </p>
              </div>

              <Button
                type="button"
                disabled={actionLoadingId === member.id}
                onClick={() => handleToggleAttendance(member.id)}
                className="bg-emerald-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-emerald-700 active:bg-emerald-800"
              >
                {actionLoadingId === member.id ? "Processing..." : "Check In / Out"}
              </Button>
            </div>
          ))}
        </div>
      )}

      {loading && (
        <div className="absolute z-50 mt-1 w-full rounded-xl border border-slate-200 bg-white p-3 text-center text-sm text-slate-500 shadow-lg">
          Searching members...
        </div>
      )}
    </div>
  );
}