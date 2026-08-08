"use client";

import { Users, UserCheck, UserX, Dumbbell } from "lucide-react";
import { useData } from "@/context/DataContext";

export interface TrainerMetaData {
  totalTrainers?: number;
  activeTrainersCount?: number;
  inactiveTrainersCount?: number;
  specializationsCount?: number;
}

interface TrainerStatsProps {
  metaData?: TrainerMetaData | null;
}

export default function TrainerStats({ metaData }: TrainerStatsProps) {
  const totalTrainers = metaData?.totalTrainers ?? 0;
  const activeTrainers = metaData?.activeTrainersCount ?? 0;
  const inactiveTrainers = metaData?.inactiveTrainersCount ?? 0;
  const specializations = metaData?.specializationsCount ?? 0;
  const { trainers } = useData();

  const stats = [
    {
      title: "Total Trainers",
      value: trainers?.length,
      icon: Users,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Active",
      value: trainers.filter((trainer) => trainer.status === "active").length,
      icon: UserCheck,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Inactive",
      value: trainers.filter((trainer) => trainer.status === "inactive").length,
      icon: UserX,
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
  ];

  return (
    <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {item.title}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">
                  {item.value}
                </h2>
              </div>

              <div className={`rounded-xl p-3 ${item.bgColor}`}>
                <Icon className={`h-6 w-6 ${item.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}