export interface DashboardStats {
  totalMembers: number;
  activeMembers: number;
  trainers: number;
  monthlyRevenue: number;
  todayAttendance: number;
}

export interface RevenueData {
  month: string;
  revenue: number;
}

export interface AttendanceData {
  day: string;
  attendance: number;
}