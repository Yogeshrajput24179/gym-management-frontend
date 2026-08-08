"use client";

import { useEffect, useState } from "react";
import { MoreHorizontal } from "lucide-react";
import DataTable, { TableColumn } from "@/components/common/DataTable";
import api from "@/src/app/lib/axios";

interface Trainer {
  id: number;
  full_name: string;
  phone: string;
  email: string;
  specialization: string;
  experience: number;
  salary: number;
  joining_date: string;
  status: "active" | "inactive";
}

const columns: TableColumn<Trainer>[] = [
  {
    key: "id",
    title: "Trainer ID",
  },
  {
    key: "full_name",
    title: "Trainer",
    render: (trainer) => (
      <div>
        <p className="font-medium text-slate-800">{trainer.full_name}</p>
        <p className="text-xs text-slate-500">{trainer.email}</p>
      </div>
    ),
  },
  {
    key: "phone",
    title: "Phone",
  },
  {
    key: "specialization",
    title: "Specialization",
  },
  {
    key: "experience",
    title: "Experience",
    render: (trainer) => `${trainer.experience} Years`,
  },
  {
    key: "salary",
    title: "Salary",
    render: (trainer) => `₹${trainer.salary?.toLocaleString() ?? 0}`,
  },
  {
    key: "joining_date",
    title: "Joining Date",
  },
  {
    key: "status",
    title: "Status",
    align: "center",
    render: (trainer) => (
      <span
        className={`rounded-full px-3 py-1 text-xs font-medium ${
          trainer.status === "active"
            ? "bg-green-100 text-green-700"
            : "bg-red-100 text-red-700"
        }`}
      >
        {trainer.status === "active" ? "Active" : "Inactive"}
      </span>
    ),
  },
  {
    key: "actions",
    title: "Actions",
    align: "center",
    render: (trainer) => (
      <button
        className="rounded-lg p-2 transition hover:bg-slate-100"
        onClick={() => console.log("Selected trainer ID:", trainer.id)}
      >
        <MoreHorizontal className="h-5 w-5 text-slate-600" />
      </button>
    ),
  },
];

export default function TrainerTable() {
  const [trainers, setTrainers] = useState<Trainer[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await api.get("/trainer/all");
      const responseData = res?.data?.data;

      if (Array.isArray(responseData)) {
        // Deduplicate items by ID to avoid React key collision warnings
        const uniqueMap = new Map<number | string, Trainer>();
        responseData.forEach((item: Trainer, idx: number) => {
          const uniqueKey = item?.id ?? `trainer-${idx}`;
          if (!uniqueMap.has(uniqueKey)) {
            uniqueMap.set(uniqueKey, item);
          }
        });
        setTrainers(Array.from(uniqueMap.values()));
        console.log("Fetched trainers:", responseData);
      } else {
        setTrainers([]);
      }
    } catch (error) {
      console.error("Error fetching trainers:", error);
      setTrainers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataTable
      columns={columns}
      data={trainers}
      loading={loading}
      emptyMessage="No trainers found."
    />
  );
}