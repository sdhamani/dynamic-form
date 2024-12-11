import React from "react";
import { Box, Card, CardContent, Button, Typography } from "@mui/material";
import InputField from "components/common/inputfield";
import Grid from "@mui/material/Grid";
import { validateField } from "utils/validationInput";
import { useFormContext } from "contexts/formContext";
import { FieldConfig, FormConfig } from "types";

interface DynamicFormProps {
    config: FormConfig;
}

const DynamicForm: React.FC<DynamicFormProps> = ({ config }) => {
    const { state, dispatch } = useFormContext();

    const visibleFields = React.useMemo(
        () =>
            config.fields.filter((field) => {
                if (!field.visibleIf) return true;
                const dependentValue = state.values[field.visibleIf.field];
                return (
                    typeof dependentValue === "string" &&
                    field.visibleIf.value.includes(dependentValue)
                );
            }),
        [config.fields, state.values]
    );

    const handleChange = React.useCallback(
        (fieldId: string, value: string | boolean) => {
            dispatch({
                type: "SET_FIELD_VALUE",
                payload: { fieldId, value },
            });
        },
        [dispatch]
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isValid = config.fields.every((field) =>
            validateField(field, state.values[field.id], () => true, dispatch)
        );

        if (isValid) {
            (window as any).showSnackbar("Form submitted successfully!", "success");
            config.fields.forEach((field) => {
                dispatch({
                    type: "SET_FIELD_VALUE",
                    payload: { fieldId: field.id, value: "" },
                });
            });
        } else {
            (window as any).showSnackbar(
                "Please fix the errors in the form.",
                "error"
            );
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                minHeight: "100vh",
                backgroundColor: "#f9f9f9",
                padding: 2,
            }}
        >
            <Card
                sx={{ width: "100%", maxWidth: 600, boxShadow: 3, borderRadius: 2 }}
            >
                <CardContent>
                    <Typography variant="h4" component="h1" align="center" gutterBottom>
                        {config.title}
                    </Typography>
                    <form onSubmit={handleSubmit} data-testid="form-element">
                        <Grid container spacing={2}>
                            {visibleFields.map((field) => (
                                <Grid item xs={12} key={field.id}>
                                    <InputField
                                        field={field}
                                        value={state.values[field.id] || ""}
                                        onChange={handleChange}
                                        visible={true}
                                        error={state.errors[field.id] || undefined}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        <Box
                            sx={{ display: "flex", justifyContent: "center", marginTop: 3 }}
                        >
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{ textTransform: "none", borderRadius: 2 }}
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                </CardContent>
            </Card>
        </Box>
    );
};

export default DynamicForm;