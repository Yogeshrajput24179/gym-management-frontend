"use client";

import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function TrainerFilters() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5 text-black">

      <Input placeholder="Search trainer..." />

      <select className="rounded-lg border border-slate-300 px-4 py-2.5">
        <option>Status</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>

      <select className="rounded-lg border border-slate-300 px-4 py-2.5">
        <option>Specialization</option>
        <option>Strength Training</option>
        <option>Cardio</option>
        <option>Yoga</option>
        <option>CrossFit</option>
      </select>

      <select className="rounded-lg border border-slate-300 px-4 py-2.5">
        <option>Experience</option>
        <option>0-2 Years</option>
        <option>3-5 Years</option>
        <option>5+ Years</option>
      </select>

      <Button variant="outline">
        Reset
      </Button>

    </div>
  );
}