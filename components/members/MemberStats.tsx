"use client";

import { Users, UserCheck, UserX, Clock3 } from "lucide-react";

export interface MetaData {
  totalRecords?: number;
  activeMembersCount?: number;
  expiredMembersCount?: number;
  pendingMembersCount?: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
}

interface MemberStatsProps {
  metaData?: MetaData | null;
}

export default function MemberStats({ metaData }: MemberStatsProps) {
  // Read counts directly from backend metadata (fallback to 0 if loading/null)
  const totalRecords = metaData?.totalRecords ?? 0;
  const activeCount = metaData?.activeMembersCount ?? 0;
  const expiredCount = metaData?.expiredMembersCount ?? 0;
  const pendingCount = metaData?.pendingMembersCount ?? 0;

  const stats = [
    {
      title: "Total Members",
      value: totalRecords,
      icon: Users,
      bgColor: "bg-blue-100",
      textColor: "text-blue-600",
    },
    {
      title: "Active",
      value: activeCount,
      icon: UserCheck,
      bgColor: "bg-green-100",
      textColor: "text-green-600",
    },
    {
      title: "Expired",
      value: expiredCount,
      icon: UserX,
      bgColor: "bg-red-100",
      textColor: "text-red-600",
    },
    {
      title: "Pending",
      value: pendingCount,
      icon: Clock3,
      bgColor: "bg-yellow-100",
      textColor: "text-yellow-600",
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
                <p className="text-sm font-medium text-slate-500">{item.title}</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-900">{item.value}</h2>
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