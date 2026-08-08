"use client";

import { LucideIcon, TrendingDown, TrendingUp } from "lucide-react";
import Card from "@/components/ui/Card";
type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;

  change?: number;
  changeLabel?: string;

  iconBgColor?: string;
  iconColor?: string;
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  change,
  changeLabel,
  iconBgColor = "bg-blue-100",
  iconColor = "text-blue-600",
}: StatCardProps) {
  const isPositive = change === undefined || change >= 0;

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-gray-500">{title}</p>

          <h2 className="mt-2 text-3xl font-bold text-gray-900">
            {value}
          </h2>

          {change !== undefined && (
            <div className="mt-4 flex items-center gap-2">
              <span
                className={`flex items-center text-sm font-medium ${
                  isPositive
                    ? "text-green-600"
                    : "text-red-600"
                }`}
              >
                {isPositive ? (
                  <TrendingUp size={16} />
                ) : (
                  <TrendingDown size={16} />
                )}

                <span className="ml-1">
                  {Math.abs(change)}%
                </span>
              </span>

              {changeLabel && (
                <span className="text-sm text-gray-500">
                  {changeLabel}
                </span>
              )}
            </div>
          )}
        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-xl ${iconBgColor}`}
        >
          <Icon
            size={28}
            className={iconColor}
          />
        </div>
      </div>
    </Card>
  );
}