"use client";

import { useEffect, useState, useCallback } from "react";
import { Download, Plus, RefreshCw } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";
import Pagination from "@/components/ui/Pagination";

import PaymentStats from "@/components/Payments/PaymentStats";
import PaymentFilters from "@/components/Payments/PaymentFilter";
import PaymentTable, { Payment } from "@/components/Payments/PaymentsTable";
import PaymentModal from "@/components/Payments/PaymentsModal";

import api from "@/src/app/utils/axios";

/* =========================================================
   API TYPES
========================================================= */

interface PaymentApiData {
  id: number;
  member_id: number;
  membership_plan_id: number;
  amount: number;
  payment_date: string;
  payment_method: "Cash" | "UPI" | "Card" | "Bank Transfer";
  transaction_id?: string | null;
  status: "Paid" | "Pending";
  remarks?: string | null;
  Member?: {
    id: number;
    full_name: string;
    phone?: string;
    email?: string;
  };
  MembershipPlan?: {
    id: number;
    plan_name: string;
  };
}

interface MetaData {
  totalRecords?: number;
  currentPage?: number;
  pageSize?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
}

export default function PaymentsPage() {
  const [open, setOpen] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPayments, setTotalPayments] = useState(0);
  const [metaData, setMetaData] = useState<MetaData | null>(null);
  const [loading, setLoading] = useState(false);

  // Filters
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [membershipPlan, setMembershipPlan] = useState("");

  const limit = 10;

  const fetchPayments = useCallback(
    async (page: number) => {
      try {
        setLoading(true);

        const params = new URLSearchParams();
        params.append("page", String(page));
        params.append("limit", String(limit));

        if (search.trim()) params.append("search", search.trim());
        if (status) params.append("status", status);
        if (paymentMethod) params.append("payment_method", paymentMethod);
        if (membershipPlan) params.append("membership_plan_id", membershipPlan);

        // Fixed: Use 'id' or 'payment_date' instead of 'created_at' to prevent Sequelize column errors
        params.append("sortBy", "id");
        params.append("order", "DESC");

        const res = await api.get(`/payment/all?${params.toString()}`);
        const responseData = res.data;

        if (responseData?.success && Array.isArray(responseData?.data)) {
          const formattedPayments: Payment[] = responseData.data.map(
            (item: PaymentApiData) => ({
              id: item.id,
              member_name: item.Member?.full_name || "-",
              membership_plan: item.MembershipPlan?.plan_name || "-",
              amount: Number(item.amount),
              payment_date: item.payment_date,
              payment_method: item.payment_method,
              status: item.status,
            })
          );

          setPayments(formattedPayments);
          setMetaData(responseData.meta || null);
          setTotalPages(responseData.meta?.totalPages || 1);
          setTotalPayments(responseData.meta?.totalRecords || 0);
        } else {
          setPayments([]);
          setMetaData(null);
          setTotalPages(1);
          setTotalPayments(0);
        }
      } catch (error) {
        console.error("Error fetching payments:", error);
        setPayments([]);
        setMetaData(null);
        setTotalPages(1);
        setTotalPayments(0);
      } finally {
        setLoading(false);
      }
    },
    [limit, search, status, paymentMethod, membershipPlan]
  );

  useEffect(() => {
    fetchPayments(currentPage);
  }, [currentPage, fetchPayments]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRefresh = () => {
    fetchPayments(currentPage);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
    setCurrentPage(1);
  };

  const handleMethodChange = (value: string) => {
    setPaymentMethod(value);
    setCurrentPage(1);
  };

  const handlePlanChange = (value: string) => {
    setMembershipPlan(value);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setStatus("");
    setPaymentMethod("");
    setMembershipPlan("");
    setCurrentPage(1);
  };

  // Pagination bounds
  const startItem = totalPayments === 0 ? 0 : (currentPage - 1) * limit + 1;
  const endItem = Math.min(currentPage * limit, totalPayments);

  // Summary statistics
  const totalAmount = payments.reduce((sum, p) => sum + Number(p.amount), 0);
  const paidAmount = payments
    .filter((p) => p.status === "Paid")
    .reduce((sum, p) => sum + Number(p.amount), 0);
  const pendingAmount = payments
    .filter((p) => p.status === "Pending")
    .reduce((sum, p) => sum + Number(p.amount), 0);

  // CSV Export
  const handleExport = () => {
    if (!payments.length) return;

    const headers = ["Member", "Plan", "Amount", "Payment Date", "Method", "Status"];
    const rows = payments.map((p) => [
      p.member_name,
      p.membership_plan,
      p.amount,
      p.payment_date,
      p.payment_method,
      p.status,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "payments.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto space-y-5">
        <PageHeader
          title="Payment Management"
          description="Manage all member payments and transactions."
          action={
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" onClick={handleRefresh} disabled={loading}>
                <RefreshCw className={`mr-2 h-4 w-4 ${loading ? "animate-spin" : ""}`} />
                Refresh
              </Button>

              <Button
                variant="outline"
                onClick={handleExport}
                disabled={loading || !payments.length}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>

              <Button onClick={() => setOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Payment
              </Button>
            </div>
          }
        />

        <section>
          <PaymentStats
            totalAmount={totalAmount}
            paidAmount={paidAmount}
            pendingAmount={pendingAmount}
            totalPayments={totalPayments}
          />
        </section>

        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <PaymentFilters
            search={search}
            status={status}
            method={paymentMethod}
            plan={membershipPlan}
            onSearchChange={handleSearchChange}
            onStatusChange={handleStatusChange}
            onMethodChange={handleMethodChange}
            onPlanChange={handlePlanChange}
            onClear={clearFilters}
          />
        </section>

        <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-slate-200 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-slate-900">Payment Records</h2>
              <p className="mt-1 text-sm text-slate-500">
                View, search and manage all member payments.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700">
                Total Payments: {totalPayments}
              </span>
            </div>
          </div>

          <PaymentTable data={payments} loading={loading} />

          <div className="flex flex-col items-center justify-between gap-4 border-t border-slate-200 px-6 py-4 text-sm text-slate-500 md:flex-row">
            <p>
              Showing <span className="font-semibold">{startItem}-{endItem}</span> of{" "}
              <span className="font-semibold">{totalPayments}</span> payments
            </p>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </section>

        <PaymentModal
          isOpen={open}
          onClose={() => setOpen(false)}
          onSuccess={() => {
            setOpen(false);
            if (currentPage === 1) {
              fetchPayments(1);
            } else {
              setCurrentPage(1); // Resetting page triggers useEffect refetch
            }
          }}
        />
      </div>
    </div>
  );
}