"use client";

import { useState, useEffect } from "react";
import { Search, RotateCcw } from "lucide-react";
import Input from "@/components/ui/Input";
import Select from "@/components/ui/Select";
import { useData } from "@/context/DataContext"; // Adjust context path if needed

export interface FilterState {
  search: string;
  status: string;
  planId: string;
  trainerId: string;
}

interface MemberFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

export default function MemberFilters({ onFilterChange }: MemberFiltersProps) {
  const { plans, trainers } = useData();

  // Internal filter states
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [planId, setPlanId] = useState("");
  const [trainerId, setTrainerId] = useState("");

  // Debounce search/filter changes to avoid firing requests on every keystroke
  useEffect(() => {
    const timer = setTimeout(() => {
      onFilterChange?.({ search, status, planId, trainerId });
    }, 400);

    return () => clearTimeout(timer);
  }, [search, status, planId, trainerId, onFilterChange]);

  // Reset handler
  const handleReset = () => {
    setSearch("");
    setStatus("");
    setPlanId("");
    setTrainerId("");
    onFilterChange?.({ search: "", status: "", planId: "", trainerId: "" });
  };

  // Convert plans and trainers from context into SelectOption format
  const statusOptions = [
    { label: "Active", value: "Active" },
    { label: "Expired", value: "Expired" },
    { label: "Pending", value: "Pending" },
  ];

  const planOptions =
    plans?.map((plan: any) => ({
      label: plan.name || plan.title,
      value: plan.id,
    })) || [];

  const trainerOptions =
    trainers?.map((trainer: any) => ({
      label: trainer.full_name || trainer.name,
      value: trainer.id,
    })) || [];

  return (
    <div className="w-full rounded-2xl border border-gray-100 bg-white p-5 shadow-xs">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5 items-center">
        {/* Search Input */}
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 pointer-events-none z-10" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search members..."
            className="w-full h-11 rounded-xl border-gray-200 bg-gray-50/50 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500/10 transition-all duration-200"
          />
        </div>

        {/* Status Select using Select.tsx */}
        <Select
          placeholder="Status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          options={statusOptions}
          className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-700 py-0"
        />

        {/* Membership Select using Select.tsx */}
        <Select
          placeholder="Membership"
          value={planId}
          onChange={(e) => setPlanId(e.target.value)}
          options={planOptions}
          className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-700 py-0"
        />

        {/* Trainer Select using Select.tsx */}
        <Select
          placeholder="Trainer"
          value={trainerId}
          onChange={(e) => setTrainerId(e.target.value)}
          options={trainerOptions}
          className="h-11 rounded-xl border-gray-200 bg-gray-50/50 text-sm font-medium text-gray-700 py-0"
        />

        {/* Reset Button */}
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 active:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all duration-200 cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          <span>Reset Filters</span>
        </button>
      </div>
    </div>
  );
}