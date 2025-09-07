import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Paper, Grid } from "@mui/material";
import { Person, ArrowForward } from "@mui/icons-material";
import { useBooking } from "../../contexts/BookingContext";
import { validateName } from "../../utils/helpers";
import ErrorMessage from "../ui/ErrorMessage";

const NameStep = () => {
    const { formData, updateFormData, nextStep, error, clearError } =
        useBooking();
    const [localErrors, setLocalErrors] = useState({});
    const [touched, setTouched] = useState({});

    const handleInputChange = (field) => (event) => {
        const value = event.target.value;
        updateFormData({ [field]: value });

        // Clear local error when user starts typing
        if (localErrors[field]) {
            setLocalErrors((prev) => ({ ...prev, [field]: null }));
        }

        // Clear global error
        if (error) {
            clearError();
        }
    };

    const handleBlur = (field) => () => {
        setTouched((prev) => ({ ...prev, [field]: true }));

        const error = validateName(formData[field]);
        setLocalErrors((prev) => ({ ...prev, [field]: error }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate both fields
        const firstNameError = validateName(formData.firstName);
        const lastNameError = validateName(formData.lastName);

        const errors = {
            firstName: firstNameError,
            lastName: lastNameError,
        };

        setLocalErrors(errors);
        setTouched({ firstName: true, lastName: true });

        // If no errors, proceed to next step
        if (!firstNameError && !lastNameError) {
            nextStep();
        }
    };

    const hasErrors = Object.values(localErrors).some((error) => error);
    const isFormValid =
        formData.firstName.trim() && formData.lastName.trim() && !hasErrors;

    return (
        <Paper elevation={0} sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
            <Box textAlign="center" mb={3}>
                <Person sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                >
                    What's your name?
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Please enter your first and last name to get started with
                    your booking.
                </Typography>
            </Box>

            {error && (
                <ErrorMessage
                    error={error}
                    title="Name Input Issue"
                    onRetry={clearError}
                    showRetry={false}
                />
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="First Name"
                            value={formData.firstName}
                            onChange={handleInputChange("firstName")}
                            onBlur={handleBlur("firstName")}
                            error={touched.firstName && !!localErrors.firstName}
                            helperText={
                                (touched.firstName && localErrors.firstName) ||
                                " "
                            }
                            placeholder="Enter your first name"
                            variant="outlined"
                            required
                            autoComplete="given-name"
                            InputProps={{
                                sx: { fontSize: "1rem" },
                            }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Last Name"
                            value={formData.lastName}
                            onChange={handleInputChange("lastName")}
                            onBlur={handleBlur("lastName")}
                            error={touched.lastName && !!localErrors.lastName}
                            helperText={
                                (touched.lastName && localErrors.lastName) ||
                                " "
                            }
                            placeholder="Enter your last name"
                            variant="outlined"
                            required
                            autoComplete="family-name"
                            InputProps={{
                                sx: { fontSize: "1rem" },
                            }}
                        />
                    </Grid>
                </Grid>

                <Box mt={4} textAlign="center">
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        endIcon={<ArrowForward />}
                        disabled={!isFormValid}
                        sx={{
                            minWidth: 200,
                            py: 1.5,
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                        }}
                    >
                        Continue
                    </Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default NameStep;
