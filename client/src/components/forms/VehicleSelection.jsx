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
    Avatar,
} from "@mui/material";
import {
    ArrowForward,
    ArrowBack,
    DirectionsCar,
    DirectionsBike,
} from "@mui/icons-material";
import { useBooking } from "../../contexts/BookingContext";
import { useVehiclesByType } from "../../hooks/useApi";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

const VehicleSelectionStep = () => {
    const {
        formData,
        updateFormData,
        nextStep,
        previousStep,
        loading,
        error,
        clearError,
    } = useBooking();

    const { vehicles, fetchVehiclesByType, clearVehicles } =
        useVehiclesByType();
    const [localError, setLocalError] = useState("");

    // Fetch vehicles when component mounts or vehicle type changes
    useEffect(() => {
        if (formData.vehicleType?.id) {
            fetchVehiclesByType(formData.vehicleType.id);
        } else {
            clearVehicles();
        }
    }, [formData.vehicleType?.id, fetchVehiclesByType, clearVehicles]);

    const handleVehicleChange = (value) => {
        const selectedVehicle = vehicles.find(
            (vehicle) => vehicle.id === parseInt(value)
        );
        updateFormData({ vehicle: selectedVehicle });

        // Clear any errors
        setLocalError("");
        if (error) {
            clearError();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!formData.vehicle) {
            setLocalError("Please select a specific vehicle");
            return;
        }

        nextStep();
    };

    const handleBack = () => {
        previousStep();
    };

    const handleRetry = () => {
        clearError();
        if (formData.vehicleType?.id) {
            fetchVehiclesByType(formData.vehicleType.id);
        }
    };

    const getVehicleIcon = (wheels) => {
        return wheels === 2 ? <DirectionsBike /> : <DirectionsCar />;
    };

    if (loading) {
        return (
            <Paper elevation={0} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
                <Loading message="Loading available vehicles..." />
            </Paper>
        );
    }

    return (
        <Paper elevation={0} sx={{ p: 3, maxWidth: 900, mx: "auto" }}>
            <Box textAlign="center" mb={3}>
                <Avatar
                    sx={{
                        width: 64,
                        height: 64,
                        bgcolor: "primary.main",
                        mx: "auto",
                        mb: 2,
                    }}
                >
                    {getVehicleIcon(formData.wheels)}
                </Avatar>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                >
                    Choose your vehicle
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    Select the specific {formData.vehicleType?.name} you'd like
                    to rent
                </Typography>
                <Box display="flex" justifyContent="center" gap={1} mt={2}>
                    <Chip
                        label={`${formData.wheels} wheels`}
                        color="primary"
                        variant="outlined"
                        size="small"
                    />
                    <Chip
                        label={formData.vehicleType?.name}
                        color="secondary"
                        variant="outlined"
                        size="small"
                    />
                </Box>
            </Box>

            {(error || localError) && (
                <ErrorMessage
                    error={error || localError}
                    title="Vehicle Loading Issue"
                    onRetry={error ? handleRetry : undefined}
                    showRetry={!!error}
                />
            )}

            {!loading && vehicles.length === 0 && !error && (
                <Box textAlign="center" py={4}>
                    <Typography
                        variant="body1"
                        color="text.secondary"
                        gutterBottom
                    >
                        No vehicles available for {formData.vehicleType?.name}.
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Please try selecting a different vehicle type.
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

            {vehicles.length > 0 && (
                <Box component="form" onSubmit={handleSubmit}>
                    <FormControl component="fieldset" fullWidth>
                        <RadioGroup
                            value={formData.vehicle?.id || ""}
                            onChange={(e) =>
                                handleVehicleChange(e.target.value)
                            }
                        >
                            <Grid
                                container
                                spacing={3}
                                justifyContent="center"
                                sx={{
                                    maxWidth:
                                        vehicles.length <= 2 ? 700 : "none",
                                    mx: "auto",
                                }}
                            >
                                {vehicles.map((vehicle) => (
                                    <Grid
                                        item
                                        xs={12}
                                        sm={vehicles.length === 1 ? 8 : 6}
                                        md={vehicles.length <= 2 ? 6 : 4}
                                        key={vehicle.id}
                                    >
                                        <Card
                                            sx={{
                                                cursor: "pointer",
                                                border: 2,
                                                borderColor:
                                                    formData.vehicle?.id ===
                                                    vehicle.id
                                                        ? "primary.main"
                                                        : "transparent",
                                                backgroundColor:
                                                    formData.vehicle?.id ===
                                                    vehicle.id
                                                        ? "primary.50"
                                                        : "background.paper",
                                                transition: "all 0.3s ease",
                                                "&:hover": {
                                                    borderColor:
                                                        "primary.light",
                                                    elevation: 4,
                                                },
                                                height: "100%",
                                                minHeight: "240px",
                                                display: "flex",
                                                flexDirection: "column",
                                                maxWidth: {
                                                    xs: "100%",
                                                    sm: "400px",
                                                    md: "320px",
                                                },
                                                mx: "auto",
                                            }}
                                            onClick={() =>
                                                handleVehicleChange(vehicle.id)
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
                                                    value={vehicle.id}
                                                    control={
                                                        <Radio
                                                            sx={{
                                                                display: "none",
                                                            }}
                                                        />
                                                    }
                                                    label={
                                                        <Box>
                                                            <Avatar
                                                                sx={{
                                                                    width: 48,
                                                                    height: 48,
                                                                    bgcolor:
                                                                        "secondary.main",
                                                                    mx: "auto",
                                                                    mb: 2,
                                                                }}
                                                            >
                                                                {getVehicleIcon(
                                                                    formData.wheels
                                                                )}
                                                            </Avatar>
                                                            <Typography
                                                                variant="h6"
                                                                component="div"
                                                                gutterBottom
                                                                fontWeight="bold"
                                                            >
                                                                {vehicle.name}
                                                            </Typography>
                                                            <Typography
                                                                variant="body2"
                                                                color="text.secondary"
                                                                sx={{ mb: 2 }}
                                                            >
                                                                Model:{" "}
                                                                {vehicle.model}
                                                            </Typography>
                                                            <Box
                                                                display="flex"
                                                                justifyContent="center"
                                                                gap={1}
                                                                flexWrap="wrap"
                                                            >
                                                                <Chip
                                                                    label={
                                                                        vehicle
                                                                            .vehicleType
                                                                            .name
                                                                    }
                                                                    size="small"
                                                                    color="primary"
                                                                    variant="outlined"
                                                                />
                                                                {vehicle.isAvailable ? (
                                                                    <Chip
                                                                        label="Available"
                                                                        size="small"
                                                                        color="success"
                                                                        variant="outlined"
                                                                    />
                                                                ) : (
                                                                    <Chip
                                                                        label="Not Available"
                                                                        size="small"
                                                                        color="error"
                                                                        variant="outlined"
                                                                    />
                                                                )}
                                                            </Box>
                                                        </Box>
                                                    }
                                                    sx={{ m: 0, width: "100%" }}
                                                    disabled={
                                                        !vehicle.isAvailable
                                                    }
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
                            disabled={
                                !formData.vehicle ||
                                !formData.vehicle.isAvailable
                            }
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

export default VehicleSelectionStep;
