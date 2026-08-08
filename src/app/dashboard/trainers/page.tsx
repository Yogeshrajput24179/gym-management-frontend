"use client";

import { useState, useTransition } from "react";
import { Download, Plus, RefreshCw, Upload } from "lucide-react";

import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";

import TrainerStats from "@/components/trainer/TrainerStats";
import TrainerFilters from "@/components/trainer/TrainerFilter";
import TrainerTable from "@/components/trainer/TrainerTable";
import TrainerModal from "@/components/trainer/TrainerModal";
import { useData } from "@/context/DataContext";

export default function TrainersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTrainer, setSelectedTrainer] = useState<unknown | null>(null);
  const [isPending, startTransition] = useTransition();

  const { trainers = [], refreshData } = useData();

  const handleRefresh = () => {
    startTransition(async () => {
      if (refreshData) {
        await refreshData();
      }
    });
  };

  const handleOpenAddModal = () => {
    setSelectedTrainer(null);
    setIsModalOpen(true);
  };

  const handleExport = () => {
    if (!trainers.length) return;
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(trainers, null, 2)
    )}`;
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", jsonString);
    downloadAnchor.setAttribute("download", `trainers_export_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleImport = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json,.csv";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        console.log("Importing file:", file.name);
      }
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title="Trainer Management"
        description="Manage gym trainers, specializations and assignments."
        action={
          <div className="flex flex-wrap items-center gap-1">
            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={isPending}
            >
              <RefreshCw
                className={`mr-2 h-4 w-4 ${isPending ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

            <Button variant="outline" onClick={handleImport}>
              <Upload className="mr-2 h-4 w-4" />
              Import
            </Button>

            <Button
              variant="outline"
              onClick={handleExport}
              disabled={!trainers.length}
            >
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Button onClick={handleOpenAddModal}>
              <Plus className="mr-2 h-4 w-4" />
              Add Trainer
            </Button>
          </div>
        }
      />

      <TrainerStats />

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <TrainerFilters />
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              Trainer List
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              View and manage all registered trainers.
            </p>
          </div>

          <span className="self-start sm:self-auto rounded-full bg-blue-50 px-3.5 py-1 text-sm font-medium text-blue-700">
            Total Trainers : {trainers?.length ?? 0}
          </span>
        </div>

        <TrainerTable />
      </div>

      <TrainerModal
        isOpen={isModalOpen}
        initialData={selectedTrainer}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedTrainer(null);
        }}
      />
    </div>
  );
}