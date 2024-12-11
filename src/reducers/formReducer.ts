interface FormState {
    values: { [key: string]: string | boolean };
    errors: { [key: string]: string | null };
}

interface FormAction {
    type: string;
    payload?: {
        fieldId?: string;
        value?: string | boolean;
        error?: string | null;
    };
}

export const initialFormState: FormState = {
    values: {},
    errors: {},
};

export const formReducer = (
    state: FormState,
    action: FormAction
): FormState => {
    switch (action.type) {
        case "SET_FIELD_VALUE":
            return {
                ...state,
                values: {
                    ...state.values,
                    [action.payload?.fieldId || ""]: action.payload?.value || "",
                },
                errors: {
                    ...state.errors,
                    [action.payload?.fieldId || ""]: null,
                },
            };
        case "SET_ERROR":
            return {
                ...state,
                errors: {
                    ...state.errors,
                    [action.payload?.fieldId || ""]: action.payload?.error || "",
                },
            };
        default:
            return state;
    }
};
