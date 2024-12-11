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
        default:
            return state;
    }
};
