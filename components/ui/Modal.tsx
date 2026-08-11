"use client";

import { ReactNode, useEffect, useState } from "react";

// Types for Macro State
export type MacroData = {
  calories: number;
  protein: number; // in grams
  carbs: number;   // in grams
  fats: number;    // in grams
};

type ModalProps = {
  isOpen: boolean;
  title?: string;
  subtitle?: string;
  macros?: MacroData; // Optional dynamic macro state
  children: ReactNode;
  footer?: ReactNode;
  width?: "sm" | "md" | "lg";
  closeOnOverlay?: boolean;
  onClose: () => void;
};

export default function Modal({
  isOpen,
  title = "Generate Diet Plan",
  subtitle = "Customize targets & macro ratios",
  macros,
  children,
  footer,
  width = "md",
  closeOnOverlay = true,
  onClose,
}: ModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const widths = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-3 backdrop-blur-xs transition-opacity"
      onClick={() => closeOnOverlay && onClose()}
      aria-modal="true"
      role="dialog"
    >
      <div
        className={`relative flex max-h-[88vh] w-full ${widths[width]} flex-col rounded-xl bg-white shadow-lg`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Compact Header */}
        <div className="flex items-center justify-between px-5 pt-4 pb-2">
          <div>
            {title && (
              <h2 className="text-base font-semibold text-slate-800">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-xs text-slate-500">{subtitle}</p>
            )}
          </div>

          <button
            onClick={onClose}
            className="rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-600 focus:outline-none"
            aria-label="Close modal"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Live Macro Summary Box */}
        {macros && (
          <div className="mx-5 my-2 rounded-lg bg-slate-50 p-3 ring-1 ring-slate-100">
            <div className="mb-2 flex items-baseline justify-between">
              <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
                Target Daily Macros
              </span>
              <span className="text-sm font-bold text-slate-800">
                {macros.calories.toLocaleString()} <span className="text-xs font-normal text-slate-500">kcal</span>
              </span>
            </div>

            {/* Macro Cards Grid */}
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="rounded-md bg-white p-2 shadow-2xs">
                <p className="text-[10px] font-medium text-slate-400">PROTEIN</p>
                <p className="text-xs font-bold text-indigo-600">{macros.protein}g</p>
              </div>

              <div className="rounded-md bg-white p-2 shadow-2xs">
                <p className="text-[10px] font-medium text-slate-400">CARBS</p>
                <p className="text-xs font-bold text-emerald-600">{macros.carbs}g</p>
              </div>

              <div className="rounded-md bg-white p-2 shadow-2xs">
                <p className="text-[10px] font-medium text-slate-400">FATS</p>
                <p className="text-xs font-bold text-amber-600">{macros.fats}g</p>
              </div>
            </div>
          </div>
        )}

        {/* Form Inputs / Body Content */}
        <div className="flex-1 overflow-y-auto px-5 py-2 text-xs text-slate-600">
          {children}
        </div>

        {/* Footer Actions */}
        {footer && (
          <div className="flex items-center justify-end gap-2 px-5 pt-2 pb-4">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}