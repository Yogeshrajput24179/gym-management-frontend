import api from "@/app/utils/axios";
export const dashboardService = {
  getStats() {
    return api.get("/dashboard/stats");
  },

  getRevenueChart() {
    return api.get("/dashboard/revenue");
  },

  getAttendanceChart() {
    return api.get("/dashboard/attendance");
  },

  getRecentMembers() {
    return api.get("/dashboard/recent-members");
  },

  getRecentPayments() {
    return api.get("/dashboard/recent-payments");
  },
};