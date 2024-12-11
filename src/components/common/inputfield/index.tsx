import React from "react";
import {
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
    Collapse,
    Box,
    FormControlLabel,
    Checkbox,
    RadioGroup,
    Radio,
    Typography,
} from "@mui/material";

import { InputFieldProps } from "types";

const InputField: React.FC<InputFieldProps> = React.memo(({
    field,
    value,
    onChange,
    visible,
    error,
}) => {
    console.log("field", field.type)

    const sharedProps = React.useMemo(
        () => ({
            fullWidth: true,
            variant: "outlined" as const,
            label: field.label,
            value: typeof value === "string" ? value : "",
            onChange: (e: React.ChangeEvent<HTMLInputElement | { value: unknown }>) =>
                onChange(field.id, e.target.value as string),
            error: !!error,
            helperText: error || "",
        }),
        [field.label, value, onChange, error]
    );

    const renderInput = React.useCallback(() => {
        switch (field.type) {
            case "text":
                return <TextField {...sharedProps} required={field.required} type="text" />;
            case "email":
                return <TextField {...sharedProps} required={field.required} type="email" />;
            case "dropdown":
                return (
                    <FormControl fullWidth variant="outlined" error={!!error}>
                        <InputLabel>{field.label}</InputLabel>
                        <Select
                            value={typeof value === "string" ? value : ""}
                            onChange={(e) => onChange(field.id, e.target.value as string)}
                            label={field.label}
                        >
                            {field.options?.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </Select>
                        <FormHelperText>{error || ""}</FormHelperText>
                    </FormControl>
                );
            case "textarea":
                return (
                    <TextField
                        {...sharedProps}
                        multiline
                        minRows={4}
                        required={field.required}
                    />
                );
            case "checkbox":
                return (
                    <Box>
                        <FormControl error={!!error} component="fieldset">
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={Boolean(value)}
                                        onChange={(e) => onChange(field.id, e.target.checked)}
                                    />
                                }
                                label={field.label}
                            />
                            {error && <FormHelperText>{error}</FormHelperText>}
                        </FormControl>
                    </Box>
                );
            case "radio":
                return (
                    <FormControl component="fieldset" error={!!error}>
                        <Typography sx={{ marginBottom: 1 }}>{field.label}</Typography>
                        <RadioGroup
                            value={typeof value === "string" ? value : ""}
                            onChange={(e) => onChange(field.id, e.target.value)}
                        >
                            {field.options?.map((option) => (
                                <FormControlLabel
                                    key={option}
                                    value={option}
                                    control={<Radio />}
                                    label={option}
                                />
                            ))}
                        </RadioGroup>
                        {error && <FormHelperText>{error}</FormHelperText>}
                    </FormControl>
                );
            default:
                return null;
        }
    }, [field, sharedProps, value, onChange, error]);
    if (!visible) return null;

    return (
        <Collapse in={visible} timeout={300} unmountOnExit>
            <Box sx={{ paddingY: 1.5 }}>{renderInput()}</Box>
        </Collapse>
    );
});

export default InputField;
