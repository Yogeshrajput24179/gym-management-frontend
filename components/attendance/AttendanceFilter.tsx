"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function AttendanceFilters() {
  return (
    <div className="grid gap-4 md:grid-cols-4 text-black">

      <Input
        placeholder="Search Member..."
      />

      <Input
        type="date"
      />

      <select className="rounded-lg border px-4 py-2.5">
        <option>All Status</option>
        <option>Present</option>
        <option>Absent</option>
      </select>

      <Button variant="outline">
        Reset
      </Button>

    </div>
  );
}