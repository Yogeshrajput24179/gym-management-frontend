"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
  useCallback,
} from "react";
import api from "@/src/app/utils/axios";

type Props = {
  children: ReactNode;
};

type FetchMemberParams = {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
};

type MetaType = {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  activeMembersCount?: number;
  expiredMembersCount?: number;
  pendingMembersCount?: number;
};

type DataContextType = {
  members: any[];
  meta: MetaType;
  trainers: any[];
  users: any[];
  plans: any[];
  loading: boolean;
  attendance: any[];
  fetchAttendance: () => Promise<void>;
  fetchMembers: (params?: FetchMemberParams) => Promise<void>;
  fetchTrainers: () => Promise<void>;
  fetchUsers: () => Promise<void>;
  fetchPlans: () => Promise<void>;
  fetchAllData: () => Promise<void>;
};

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider = ({ children }: Props) => {
  const [members, setMembers] = useState<any[]>([]);
  const [meta, setMeta] = useState<MetaType>({
    currentPage: 1,
    pageSize: 10,
    totalPages: 1,
    totalRecords: 0,
    activeMembersCount: 0,
    expiredMembersCount: 0,
    pendingMembersCount: 0,
  });
  const [trainers, setTrainers] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [plans, setPlans] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [attendance, setAttendance] = useState<any[]>([]);

  // Fetch Members with pagination and filtering
  const fetchMembers = useCallback(async (params?: FetchMemberParams) => {
    try {
      const { page = 1, limit = 10, search = "", status = "" } = params || {};
      const { data } = await api.get(
        `/member/all?page=${page}&limit=${limit}&search=${encodeURIComponent(
          search
        )}&status=${encodeURIComponent(status)}`
      );

      if (data?.success) {
        setMembers(data.data || []);
        setMeta({
          currentPage: data.meta?.currentPage || 1,
          pageSize: data.meta?.pageSize || 10,
          totalPages: data.meta?.totalPages || 1,
          totalRecords: data.meta?.totalRecords || 0,
          activeMembersCount: data.meta?.activeMembersCount || 0,
          expiredMembersCount: data.meta?.expiredMembersCount || 0,
          pendingMembersCount: data.meta?.pendingMembersCount || 0,
        });
      }
    } catch (err) {
      console.error("Failed to fetch members:", err);
      setMembers([]);
    }
  }, []);

  // Fetch Trainers
  const fetchTrainers = useCallback(async () => {
    try {
      const { data } = await api.get("/trainer/all");
      setTrainers(data?.data || []);
    } catch (err) {
      console.warn("Failed to fetch trainers:", err);
      setTrainers([]);
    }
  }, []);

  // Fetch Users (Safe against 404s)
  const fetchUsers = useCallback(async () => {
    try {
      const { data } = await api.get("/user/all");
      setUsers(data?.data || []);
    } catch (err) {
      console.warn("Failed to fetch users (endpoint might be missing):", err);
      setUsers([]);
    }
  }, []);

  // Fetch Plans
  const fetchPlans = useCallback(async () => {
    try {
      const { data } = await api.get("/plan/all");
      setPlans(data?.data || []);
    } catch (err) {
      console.warn("Failed to fetch plans:", err);
      setPlans([]);
    }
  }, []);


  //fetch attendence

  const fetchAttendance = useCallback(async () => {
    try {
      const { data } = await api.get("/attendence/all");
      setAttendance(data?.data || []);
      console.log("Fetched attendance:", data?.data);
    } catch (err) {
      console.warn("Failed to fetch attendance:", err);
      setAttendance([]);
    }
  }, []);

  // Fetch Everything on Mount
  const fetchAllData = useCallback(async () => {
    try {
      setLoading(true);
      await Promise.allSettled([
        fetchMembers({ page: 1, limit: 10 }),
        fetchTrainers(),
        fetchUsers(),
        fetchAttendance(),
        fetchPlans(),
      ]);
    } catch (err) {
      console.error("Error fetching all data:", err);
    } finally {
      setLoading(false);
    }
  }, [fetchMembers, fetchTrainers, fetchUsers, fetchPlans, fetchAttendance]);

  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  return (
    <DataContext.Provider
      value={{
        members,
        meta,
        trainers,
        users,
        plans,
        loading,
        attendance,
        fetchAttendance,
        fetchMembers,
        fetchTrainers,
        fetchUsers,
        fetchPlans,
        fetchAllData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};