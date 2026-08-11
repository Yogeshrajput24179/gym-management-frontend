"use client";

import { useState } from "react";
import { Sparkles, FileText, ExternalLink, RefreshCw } from "lucide-react";
import PageHeader from "@/components/common/PageHeader";
import Button from "@/components/ui/Button";
import DietPlanModal from "@/components/dietPlan/DietPlanModal";

export default function dietsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <PageHeader
        title="Diet Plans"
        description="Generate, preview, and download custom AI-powered diet plan PDFs."
        action={
          <Button onClick={() => setIsOpen(true)}>
            <Sparkles className="mr-2 h-4 w-4 text-amber-300" />
            Generate AI Plan PDF
          </Button>
        }
      />

      {pdfUrl ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <FileText className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-800">
                  AI Diet Plan Generated
                </h3>
                <p className="text-xs text-slate-500">
                  Preview available below or view in a new tab.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                onClick={() => window.open(pdfUrl, "_blank")}
              >
                <ExternalLink className="mr-1.5 h-4 w-4" />
                Open PDF
              </Button>
              <Button onClick={() => setIsOpen(true)}>
                <RefreshCw className="mr-1.5 h-4 w-4" />
                Generate New
              </Button>
            </div>
          </div>

          {/* Embedded PDF Preview */}
          <div className="h-[750px] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-900 shadow-sm">
            <iframe
              src={pdfUrl}
              className="h-full w-full border-none"
              title="Diet Plan PDF Preview"
            />
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-12 text-center">
          <Sparkles className="mx-auto h-10 w-10 text-slate-400 mb-3" />
          <h3 className="text-lg font-semibold text-slate-800">
            No Plan Generated Yet
          </h3>
          <p className="text-sm text-slate-500 max-w-md mx-auto mt-1 mb-4">
            Click on "Generate AI Plan PDF" to create custom diet plans,
            calorie targets, and macro breakdowns formatted as a printable PDF.
          </p>
          <Button onClick={() => setIsOpen(true)}>
            <Sparkles className="mr-2 h-4 w-4 text-amber-300" />
            Create First Plan PDF
          </Button>
        </div>
      )}

      <DietPlanModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSuccess={(generatedPdfUrl) => setPdfUrl(generatedPdfUrl)}
      />
    </div>
  );
}