"use client";

import { useEffect, useState, useCallback } from "react";
import { Download, Plus, RefreshCw, Upload } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";

import MemberFilters from "@/components/members/MemberFilters";
import MemberStats from "@/components/members/MemberStats";
import MemberTable, { Member } from "@/components/members/MemberTable";
import MemberModal from "@/components/members/MemberModal";
import api from "@/src/app/utils/axios";

interface MetaData {
  totalRecords?: number;
  activeMembersCount?: number;
  expiredMembersCount?: number;
  pendingMembersCount?: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
}

export default function MembersPage() {
  const [open, setOpen] = useState(false);

  // States
  const [members, setMembers] = useState<Member[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalMembers, setTotalMembers] = useState(0);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(false);

  const limit = 10;

  // Single source of truth for API calls
  const fetchMembers = useCallback(async (page: number) => {
    try {
      setLoading(true);
      const res = await api.get(`/member/all?page=${page}&limit=${limit}`);
      const responseData = res.data;

      if (responseData?.success && Array.isArray(responseData?.data)) {
        setMembers(responseData.data);
        setMetaData(responseData.meta || null);
        setTotalPages(responseData.meta?.totalPages || 1);
        setTotalMembers(responseData.meta?.totalRecords || 0);
      } else {
        setMembers([]);
        setMetaData(null);
      }
    } catch (error) {
      console.error("Error fetching members:", error);
      setMembers([]);
      setMetaData(null);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchMembers(currentPage);
  }, [currentPage, fetchMembers]);

  // Handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const startItem = totalMembers === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalMembers);

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto space-y-5">
        <PageHeader
          title="Members"
          description="Manage gym members, memberships, trainers and records."
          action={
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={() => fetchMembers(currentPage)}>
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>
              <Button variant="outline">
                <Upload className="mr-2 h-4 w-4" />
                Import
              </Button>
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Member
              </Button>
            </div>
          }
        />

        <section>
          {/* Render member stats directly using meta data from response */}
          <MemberStats metaData={metaData} />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <MemberFilters />
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Member List</h2>
              <p className="mt-1 text-sm text-slate-500">
                View, search and manage all registered gym members.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                Total Members: {totalMembers}
              </span>
            </div>
          </div>

          <MemberTable members={members} loading={loading} />

          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 px-6 py-4 text-sm text-slate-500 md:flex-row">
            <p>
              Showing{" "}
              <span className="font-semibold">
                {startItem}-{endItem}
              </span>{" "}
              of <span className="font-semibold">{totalMembers}</span> members
            </p>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </section>

        <MemberModal isOpen={open} onClose={() => setOpen(false)} />
      </div>
    </div>
  );
}