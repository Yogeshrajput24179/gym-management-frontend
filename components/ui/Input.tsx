"use client";

import React from "react";

type InputProps = {
  id?: string;
  name?: string;

  label?: string;
  type?: React.HTMLInputTypeAttribute;

  value?: string | number;

  placeholder?: string;

  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;

  error?: string;
  helperText?: string;

  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;

  min?: number | string;
  max?: number | string;
  step?: number;
  minLength?: number;
  maxLength?: number;

  autoFocus?: boolean;
  autoComplete?: string;

  className?: string;
  labelClassName?: string;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
};

export default function Input({
  id,
  name,
  label,
  type = "text",
  value,
  placeholder,
  required = false,
  disabled = false,
  readOnly = false,

  error,
  helperText,

  startIcon,
  endIcon,

  min,
  max,
  step,
  minLength,
  maxLength,

  autoFocus,
  autoComplete,

  className = "",
  labelClassName = "",

  onChange,
  onBlur,
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className={`mb-2 block text-sm font-medium text-gray-700 ${labelClassName}`}
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      <div
        className={`
          flex items-center rounded-lg border bg-white px-3 transition-colors
          ${
            error
              ? "border-red-500"
              : "border-gray-300 focus-within:border-blue-500"
          }
          ${disabled ? "bg-gray-100" : ""}
        `}
      >
        {startIcon && (
          <div className="mr-2 text-gray-500">
            {startIcon}
          </div>
        )}

        <input
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}

          min={min}
          max={max}
          step={step}
          minLength={minLength}
          maxLength={maxLength}

          autoFocus={autoFocus}
          autoComplete={autoComplete}

          onChange={onChange}
          onBlur={onBlur}
          className={`
            w-full bg-transparent text-color-black py-3 outline-none
            disabled:cursor-not-allowed
            disabled:opacity-70
            ${className}
          `}
        />

        {endIcon && (
          <div className="ml-2 text-gray-500">
            {endIcon}
          </div>
        )}
      </div>

      {helperText && !error && (
        <p className="mt-1 text-xs text-gray-500">
          {helperText}
        </p>
      )}

      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}