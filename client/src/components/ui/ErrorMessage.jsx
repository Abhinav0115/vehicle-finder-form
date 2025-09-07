import React from "react";
import { Alert, AlertTitle, Box, Button } from "@mui/material";
import { ErrorOutline, Refresh } from "@mui/icons-material";

const ErrorMessage = ({
    error,
    onRetry,
    title = "Booking Issue",
    showRetry = true,
    variant = "standard",
}) => {
    if (!error) return null;

    return (
        <Box py={2}>
            <Alert
                severity="error"
                variant={variant}
                icon={<ErrorOutline />}
                action={
                    showRetry && onRetry ? (
                        <Button
                            color="inherit"
                            size="small"
                            onClick={onRetry}
                            startIcon={<Refresh />}
                        >
                            Try Again
                        </Button>
                    ) : null
                }
            >
                <AlertTitle>{title}</AlertTitle>
                {typeof error === "string"
                    ? error
                    : error.message || "An unexpected error occurred"}
            </Alert>
        </Box>
    );
};

export default ErrorMessage;
