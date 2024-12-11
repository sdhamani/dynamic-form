export interface FieldConfig {
    type: string;
    label: string;
    id: string;
    required?: boolean;
    regex?: string;
    errorMessage?: string;
    options?: string[];
    visibleIf?: {
        field: string;
        value: string[];
    };
}

export interface FormConfig {
    title: string;
    fields: FieldConfig[];
}

export interface InputFieldProps {
    field: FieldConfig;
    value: string | boolean;
    onChange: (fieldId: string, value: string | boolean) => void;
    visible: boolean;
    error?: string | null;
}