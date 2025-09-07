import React, { useState, useEffect } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    FormControl,
    FormControlLabel,
    RadioGroup,
    Radio,
    Card,
    CardContent,
    Grid,
    Chip,
} from "@mui/material";
import { ArrowForward, ArrowBack, Category } from "@mui/icons-material";
import { useBooking } from "../../contexts/BookingContext";
import { useVehicleTypes } from "../../hooks/useApi";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

const VehicleTypeStep = () => {
    const {
        formData,
        updateFormData,
        nextStep,
        previousStep,
        loading,
        error,
        clearError,
    } = useBooking();

    const { vehicleTypes, fetchVehicleTypes, initialized } = useVehicleTypes();
    const [localError, setLocalError] = useState("");

    // Fetch vehicle types when component mounts or wheels selection changes
    useEffect(() => {
        if (formData.wheels && (!initialized || vehicleTypes.length === 0)) {
            fetchVehicleTypes(formData.wheels);
        }
    }, [formData.wheels, fetchVehicleTypes, initialized, vehicleTypes.length]);

    const handleTypeChange = (value) => {
        const selectedType = vehicleTypes.find(
            (type) => type.id === parseInt(value)
        );
        updateFormData({
            vehicleType: selectedType,
            vehicle: null, // Reset dependent field
        });

        // Clear any errors
        setLocalError("");
        if (error) {
            clearError();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.vehicleType) {
            setLocalError("Please select a vehicle type");
            return;
        }

        nextStep();
    };

    const handleBack = () => {
        previousStep();
    };

    const handleRetry = () => {
        clearError();
        fetchVehicleTypes(formData.wheels);
    };

    if (loading && !initialized) {
        return (
            <Paper elevation={0} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
                <Loading message="Loading vehicle types..." />
            </Paper>
        );
    }

    return (
        <Paper elevation={0} sx={{ p: 3, maxWidth: 800, mx: "auto" }}>
            <Box textAlign="center" mb={3}>
                <Category sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                >
                    Type of vehicle
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    What type of {formData.wheels}-wheeler would you like to
                    rent?
                </Typography>
                <Chip
                    label={`${formData.wheels} wheels`}
                    color="primary"
                    variant="outlined"
                    size="small"
                />
            </Box>

            {(error || localError) && (
                <ErrorMessage
                    error={error || localError}
                    title="Vehicle Category Loading"
                    onRetry={error ? handleRetry : undefined}
                    showRetry={!!error}
                />
            )}

            {!loading && vehicleTypes.length === 0 && !error && (
                <Box textAlign="center" py={4}>
                    <Typography variant="body1" color="text.secondary">
                        No vehicle types available for {formData.wheels} wheels.
                    </Typography>
                    <Button
                        variant="outlined"
                        onClick={handleRetry}
                        sx={{ mt: 2 }}
                    >
                        Retry
                    </Button>
                </Box>
            )}

            {vehicleTypes.length > 0 && (
                <Box component="form" onSubmit={handleSubmit}>
                    <FormControl component="fieldset" fullWidth>
                        <RadioGroup
                            value={formData.vehicleType?.id || ""}
                            onChange={(e) => handleTypeChange(e.target.value)}
                        >
                            <Grid
                                container
                                spacing={3}
                                justifyContent="center"
                                sx={{
                                    maxWidth:
                                        vehicleTypes.length <= 2 ? 600 : "none",
                                    mx: "auto",
                                }}
                            >
                                {vehicleTypes.map((type) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={vehicleTypes.length === 1 ? 8 : 6}
                                        md={vehicleTypes.length <= 2 ? 6 : 4}
                                        key={type.id}
                                    >
                                        <Card
                                            sx={{
                                                cursor: "pointer",
                                                border: 2,
                                                borderColor:
                                                    formData.vehicleType?.id ===
                                                    type.id
                                                        ? "primary.main"
                                                        : "transparent",
                                                backgroundColor:
                                                    formData.vehicleType?.id ===
                                                    type.id
                                                        ? "primary.50"
                                                        : "background.paper",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    borderColor:
                                                        "primary.light",
                                                    elevation: 4,
                                                },
                                                height: "100%",
                                                minHeight: "160px",
                                                display: "flex",
                                                flexDirection: "column",
                                                maxWidth: {
                                                    xs: "100%",
                                                    sm: "350px",
                                                    md: "300px",
                                                },
                                                mx: "auto",
                                            }}
                                            onClick={() =>
                                                handleTypeChange(type.id)
                                            }
                                        >
                                            <CardContent
                                                sx={{
                                                    textAlign: "center",
                                                    py: 3,
                                                    flex: 1,
                                                    display: "flex",
                                                    flexDirection: "column",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                }}
                                            >
                                                <FormControlLabel
                                                    value={type.id}
                                                    control={
                                                        <Radio
                                                            sx={{
                                                                display: "none",
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <Box>
                                                            <Typography
                                                                variant="h6"
                                                                component="div"
                                                                gutterBottom
                                                                fontWeight="bold"
                                                            >
                                                                {type.name}
                                                            </Typography>
                                                            {type.description && (
                                                                <Typography
                                                                    variant="body2"
                                                                    color="text.secondary"
                                                                    sx={{
                                                                        mb: 2,
                                                                    }}
                                                                >
                                                                    {
                                                                        type.description
                                                                    }
                                                                </Typography>
                                                            )}
                                                            <Chip
                                                                label={`${type.wheels} wheels`}
                                                                size="small"
                                                                color="secondary"
                                                                variant="outlined"
                                                            />
                                                        </Box>
                                                    }
                                                    sx={{ m: 0, width: "100%" }}
                                                />
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </RadioGroup>
                    </FormControl>

                    <Box mt={4} display="flex" justifyContent="space-between">
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<ArrowBack />}
                            onClick={handleBack}
                            sx={{ minWidth: 120 }}
                        >
                            Back
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForward />}
                            disabled={!formData.vehicleType}
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
            )}
        </Paper>
    );
};

export default VehicleTypeStep;
