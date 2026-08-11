"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { useData } from "@/context/DataContext";
import api from "@/src/app/utils/axios";

interface GenerateWorkoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (pdfUrl: string) => void;
}

export default function GenerateWorkoutModal({
  isOpen,
  onClose,
  onSuccess,
}: GenerateWorkoutModalProps) {
  const { members = [] } = useData();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    member_id: "",
    height_cm: 175,
    weight_kg: 70,
    diet_preference: "High-Protein",
    fitness_goal: "Muscle Gain",
    experience_level: "Intermediate",
    workout_days: 4,
  });

  const handleGenerate = async () => {
    if (!formData.member_id) {
      alert("Please select a member.");
      return;
    }

    setLoading(true);
    try {
      // Set responseType to 'blob' to accept raw binary PDF data
      const response = await api.post(
        "/workoutPlan/generate",
        {
          ...formData,
          member_id: Number(formData.member_id),
        },
        {
          responseType: "blob",
        }
      );

      // Create a Blob from the PDF response
      const pdfBlob = new Blob([response.data], { type: "application/pdf" });
      const pdfUrl = URL.createObjectURL(pdfBlob);

      // Open PDF in a new tab for preview / printing
      window.open(pdfUrl, "_blank");

      if (onSuccess) {
        onSuccess(pdfUrl);
      }

      onClose();
    } catch (err) {
      console.error("Error generating PDF:", err);
      alert("Failed to generate workout plan PDF. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Generate AI Workout Plan PDF"
      width="md"
      footer={
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>

          <Button variant="primary" onClick={handleGenerate} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating PDF...
              </>
            ) : (
              "Generate & Preview PDF"
            )}
          </Button>
        </div>
      }
    >
      <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Select Member *
          </label>
          <select
            required
            value={formData.member_id}
            onChange={(e) =>
              setFormData({ ...formData, member_id: e.target.value })
            }
            className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
          >
            <option value="" className="text-slate-500">
              Select a member
            </option>
            {members.map((m: any) => (
              <option key={m.id} value={m.id} className="text-slate-900">
                {m.full_name || `Member #${m.id}`}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Height (cm)
            </label>
            <input
              type="number"
              value={formData.height_cm}
              onChange={(e) =>
                setFormData({ ...formData, height_cm: +e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Weight (kg)
            </label>
            <input
              type="number"
              value={formData.weight_kg}
              onChange={(e) =>
                setFormData({ ...formData, weight_kg: +e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Fitness Goal
            </label>
            <select
              value={formData.fitness_goal}
              onChange={(e) =>
                setFormData({ ...formData, fitness_goal: e.target.value })
              }
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
            >
              <option value="Muscle Gain">Muscle Gain</option>
              <option value="Weight Loss">Weight Loss</option>
              <option value="Endurance">Endurance</option>
              <option value="General Fitness">General Fitness</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Diet Preference
            </label>
            <select
              value={formData.diet_preference}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  diet_preference: e.target.value,
                })
              }
              className="w-full rounded-lg border border-slate-200 bg-white p-2.5 text-sm text-slate-900 outline-none focus:border-blue-500"
            >
              <option value="High-Protein">High-Protein</option>
              <option value="Standard">Standard</option>
              <option value="Vegetarian">Vegetarian</option>
              <option value="Vegan">Vegan</option>
              <option value="Keto">Keto</option>
            </select>
          </div>
        </div>
      </form>
    </Modal>
  );
}