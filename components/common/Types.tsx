export interface FormField {
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "date"
    | "time"
    | "textarea"
    | "select"
    | "checkbox"
    | "file";

  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  rows?: number;
  colSpan?: 1 | 2;

  options?: {
    label: string;
    value: string | number;
  }[];
}

export interface FormSection {
  title: string;
  fields: FormField[];
}