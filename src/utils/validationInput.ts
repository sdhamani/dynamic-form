import { FieldConfig } from "components/common/inputfield";

export const validateField = (
    field: FieldConfig,
    value: string | boolean,
    isVisible: (field: FieldConfig) => boolean,
    dispatch: React.Dispatch<any>
): boolean => {
    if (!isVisible(field)) {
        dispatch({
            type: "SET_ERROR",
            payload: {
                fieldId: field.id,
                error: null,
            },
        });
        return true;
    }

    if (field.required && (value === undefined || value === false || value === "")) {
        dispatch({
            type: "SET_ERROR",
            payload: {
                fieldId: field.id,
                error: field.errorMessage || `${field.label} is required.`,
            },
        });
        return false;
    }

    if (field.regex && typeof value === "string" && !new RegExp(field.regex).test(value)) {
        dispatch({
            type: "SET_ERROR",
            payload: {
                fieldId: field.id,
                error: field.errorMessage || "Invalid value.",
            },
        });
        return false;
    }

    dispatch({
        type: "SET_ERROR",
        payload: {
            fieldId: field.id,
            error: null,
        },
    });

    return true;
};
