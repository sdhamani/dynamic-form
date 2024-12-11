import React, { useState, useCallback, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";

export const CommonSnackbar: React.FC = () => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState<string>("");
    const [severity, setSeverity] = useState<"success" | "error" | "info" | "warning">("success");

    const showSnackbar = useCallback((msg: string, severityType: "success" | "error" | "info" | "warning") => {
        setMessage(msg);
        setSeverity(severityType);
        setOpen(true);
    }, []);

    useEffect(() => {
        (window as any).showSnackbar = showSnackbar;
        return () => {
            delete (window as any).showSnackbar;
        };
    }, [showSnackbar]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Snackbar
            open={open}
            autoHideDuration={3000}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
            <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
    );
};
