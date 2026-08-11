"use client";

import { useEffect, useState, useRef } from "react";
import Input from "@/components/ui/Input";
import TextArea from "@/components/ui/Textarea";
import Select from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import Radio from "@/components/ui/Radio";

export type Option = {
  label: string;
  value: string | number;
};

export type Field = {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "textarea"
    | "select"
    | "checkbox"
    | "radio";

  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  hidden?: boolean;

  className?: string;
  labelClassName?: string;

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

  options?: Option[];
  rows?: number;
  defaultValue?: any;
};

export type Section = {
  title?: string;
  description?: string;
  fields: Field[];
};

export type DynamicFormProps = {
  formId?: string;
  sections: Section[];
  submitLabel?: string;
  showSubmitButton?: boolean;
  initialValues?: Record<string, any>;
  initialData?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => void;
};

export default function DynamicForm({
  formId = "dynamic-form",
  sections,
  submitLabel = "Submit",
  showSubmitButton = true,
  initialValues,
  initialData,
  onSubmit,
}: DynamicFormProps) {
  const mergedInitialValues = initialData || initialValues || {};
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;

    const values: Record<string, any> = {};

    sections.forEach((section) => {
      section.fields.forEach((field) => {
        values[field.name] =
          mergedInitialValues[field.name] ??
          field.defaultValue ??
          (field.type === "checkbox" ? false : "");
      });
    });

    setFormData(values);
    initialized.current = true;
  }, [sections, mergedInitialValues]);

  const handleChange = (name: string, value: string | boolean | number) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    sections.forEach((section) => {
      section.fields.forEach((field) => {
        const value = formData[field.name];
        if (
          field.required &&
          (value === undefined || value === null || value === "" || value === false)
        ) {
          newErrors[field.name] = `${field.label} is required`;
        }
      });
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validate()) return;

    onSubmit(formData);
  };

  const renderField = (field: Field) => {
    if (field.hidden) return null;

    switch (field.type) {
      case "textarea":
        return (
          <TextArea
            label={field.label}
            name={field.name}
            value={formData[field.name] ?? ""}
            placeholder={field.placeholder}
            rows={field.rows ?? 4}
            required={field.required}
            disabled={field.disabled}
            error={errors[field.name]}
            helperText={field.helperText}
            className={field.className}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );

      case "select":
        return (
          <Select
            label={field.label}
            name={field.name}
            value={formData[field.name] ?? ""}
            placeholder={field.placeholder}
            options={field.options ?? []}
            required={field.required}
            disabled={field.disabled}
            error={errors[field.name]}
            helperText={field.helperText}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );

      case "checkbox":
        return (
          <Checkbox
            label={field.label}
            checked={Boolean(formData[field.name])}
            required={field.required}
            disabled={field.disabled}
            error={errors[field.name]}
            helperText={field.helperText}
            onChange={(e) => handleChange(field.name, e.target.checked)}
          />
        );

      case "radio":
        return (
          <Radio
            label={field.label}
            name={field.name}
            value={formData[field.name] ?? ""}
            options={field.options ?? []}
            required={field.required}
            isDisabled={field.disabled}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );

      default:
        return (
          <Input
            id={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            value={formData[field.name] ?? ""}
            placeholder={field.placeholder}
            required={field.required}
            disabled={field.disabled}
            readOnly={field.readOnly}
            error={errors[field.name]}
            helperText={field.helperText}
            startIcon={field.startIcon}
            endIcon={field.endIcon}
            min={field.min}
            max={field.max}
            step={field.step}
            minLength={field.minLength}
            maxLength={field.maxLength}
            autoFocus={field.autoFocus}
            autoComplete={field.autoComplete}
            className={field.className}
            labelClassName={field.labelClassName}
            onChange={(e) => handleChange(field.name, e.target.value)}
          />
        );
    }
  };

  return (
    <form id={formId} onSubmit={handleSubmit} className="space-y-6">
      {sections.map((section, index) => (
        <div
          key={`section-${section.title ?? index}`}
          className="rounded-lg border bg-white p-6 shadow-sm"
        >
          {section.title && (
            <h2 className="mb-1 text-lg font-semibold text-slate-800">
              {section.title}
            </h2>
          )}

          {section.description && (
            <p className="mb-4 text-sm text-gray-500">
              {section.description}
            </p>
          )}

          <div className="grid gap-4">
            {section.fields.map((field) => (
              <div key={field.name} className={field.className}>
                {renderField(field)}

                {errors[field.name] && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors[field.name]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      {showSubmitButton && (
        <button
          type="submit"
          className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
        >
          {submitLabel}
        </button>
      )}
    </form>
  );
}