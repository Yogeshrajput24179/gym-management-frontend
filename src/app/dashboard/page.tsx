import DashboardStats from "@/components/dashboard/DashboardStats";
import MembershipChart from "@/components/dashboard/MembershipChart";
import QuickActions from "@/components/dashboard/QuickActions";
import RecentMembers from "@/components/dashboard/RecentMembers"
import RecentPayments from "@/components/dashboard/RecentPayments";
import RevenueChart from "@/components/dashboard/RevenueChart";

export default function DashboardPage() {
  return (
    <div className="space-y-8 overflow-auto">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Dashboard
        </h1>
        <p className="mt-2 text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      <DashboardStats />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <RevenueChart />
        </div>

        <MembershipChart />
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <RecentMembers />
        <RecentPayments />
      </div>

      <QuickActions />
    </div>
  );
}