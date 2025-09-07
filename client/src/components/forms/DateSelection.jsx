import React, { useState, useEffect, useRef } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    Grid,
    Card,
    CardContent,
    Chip,
    Avatar,
    Alert,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
    ArrowForward,
    ArrowBack,
    CalendarToday,
    DirectionsCar,
    DirectionsBike,
} from "@mui/icons-material";
import { useBooking } from "../../contexts/BookingContext";
import { useAvailabilityCheck } from "../../hooks/useApi";
import { validateDateRange, formatDate } from "../../utils/helpers";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

const DateSelectionStep = () => {
    const {
        formData,
        updateFormData,
        nextStep,
        previousStep,
        loading,
        error,
        clearError,
    } = useBooking();

    const { checkAvailability, checking, availabilityError } =
        useAvailabilityCheck();
    const [localErrors, setLocalErrors] = useState([]);
    const [availabilityChecked, setAvailabilityChecked] = useState(false);
    const lastCheckRef = useRef(null);

    // Format dates for input fields (YYYY-MM-DD)
    const formatDateForInput = (date) => {
        if (!date) return null;
        return new Date(date);
    };

    // Get minimum date (today)
    const getMinDate = () => {
        return new Date();
    };

    const handleDateChange = (field) => (newValue) => {
        const isoDate = newValue ? newValue.toISOString() : null;

        updateFormData({ [field]: isoDate });

        // Clear errors when user changes dates
        setLocalErrors([]);
        setAvailabilityChecked(false);
        if (error) {
            clearError();
        }
    };

    // Check availability when both dates are selected
    useEffect(() => {
        const checkVehicleAvailability = async () => {
            const checkKey = `${formData.vehicle?.id}-${formData.startDate}-${formData.endDate}`;

            if (
                formData.startDate &&
                formData.endDate &&
                formData.vehicle?.id &&
                lastCheckRef.current !== checkKey
            ) {
                lastCheckRef.current = checkKey;
                setAvailabilityChecked(false);

                try {
                    const availability = await checkAvailability(
                        formData.vehicle.id,
                        formData.startDate,
                        formData.endDate
                    );

                    if (availability && !availability.isAvailable) {
                        setLocalErrors([
                            "This vehicle is not available for the selected dates. Please choose different dates.",
                        ]);
                    } else {
                        setLocalErrors([]);
                    }

                    setAvailabilityChecked(true);
                } catch (error) {
                    console.error("Availability check failed:", error);
                    setAvailabilityChecked(false);
                }
            }
        };

        checkVehicleAvailability();
    }, [
        formData.startDate,
        formData.endDate,
        formData.vehicle?.id,
        checkAvailability,
    ]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Validate dates
        const dateErrors = validateDateRange(
            formData.startDate,
            formData.endDate
        );

        if (dateErrors.length > 0) {
            setLocalErrors(dateErrors);
            return;
        }

        // Check if availability has been verified
        if (!availabilityChecked && !availabilityError) {
            setLocalErrors(["Please wait while we check availability..."]);
            return;
        }

        if (availabilityError) {
            setLocalErrors([availabilityError]);
            return;
        }

        nextStep();
    };

    const handleBack = () => {
        previousStep();
    };

    const getVehicleIcon = (wheels) => {
        return wheels === 2 ? <DirectionsBike /> : <DirectionsCar />;
    };

    const calculateDays = () => {
        if (formData.startDate && formData.endDate) {
            const start = new Date(formData.startDate);
            const end = new Date(formData.endDate);
            const diffTime = Math.abs(end - start);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays;
        }
        return 0;
    };

    const errors = [
        ...localErrors,
        ...(availabilityError ? [availabilityError] : []),
    ];
    const isFormValid =
        formData.startDate &&
        formData.endDate &&
        errors.length === 0 &&
        availabilityChecked;

    return (
        <Paper elevation={0} sx={{ p: 4, maxWidth: 800, mx: "auto" }}>
            <Box textAlign="center" mb={4}>
                <CalendarToday
                    sx={{ fontSize: 48, color: "primary.main", mb: 2 }}
                />
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                >
                    Select dates
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    When would you like to rent this vehicle?
                </Typography>
            </Box>

            {/* Vehicle Summary Card */}
            <Card sx={{ mb: 4, bgcolor: "grey.50", maxWidth: 600, mx: "auto" }}>
                <CardContent>
                    <Box display="flex" alignItems="center" gap={2}>
                        <Avatar
                            sx={{
                                width: 48,
                                height: 48,
                                bgcolor: "primary.main",
                            }}
                        >
                            {getVehicleIcon(formData.wheels)}
                        </Avatar>
                        <Box flex={1}>
                            <Typography variant="h6" fontWeight="bold">
                                {formData.vehicle?.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Model: {formData.vehicle?.model} •{" "}
                                {formData.vehicleType?.name}
                            </Typography>
                        </Box>
                        <Box display="flex" gap={1}>
                            <Chip
                                label={`${formData.wheels} wheels`}
                                size="small"
                                color="primary"
                                variant="outlined"
                            />
                        </Box>
                    </Box>
                </CardContent>
            </Card>

            {(error || errors.length > 0) && (
                <ErrorMessage
                    error={error || errors.join(". ")}
                    title="Date Selection Issue"
                    onRetry={clearError}
                    showRetry={false}
                />
            )}

            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Box component="form" onSubmit={handleSubmit}>
                    {/* Centered Date Picker Section */}
                    <Box display="flex" justifyContent="center" mb={4}>
                        <Grid
                            container
                            spacing={3}
                            sx={{
                                maxWidth: 600,
                                mx: "auto",
                            }}
                        >
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="center">
                                    <DatePicker
                                        label="Start Date"
                                        value={formatDateForInput(
                                            formData.startDate
                                        )}
                                        onChange={handleDateChange("startDate")}
                                        minDate={getMinDate()}
                                        maxDate={formatDateForInput(
                                            formData.endDate
                                        )}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                required: true,
                                                sx: {
                                                    maxWidth: "280px",
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <Box display="flex" justifyContent="center">
                                    <DatePicker
                                        label="End Date"
                                        value={formatDateForInput(
                                            formData.endDate
                                        )}
                                        onChange={handleDateChange("endDate")}
                                        minDate={
                                            formatDateForInput(
                                                formData.startDate
                                            ) || getMinDate()
                                        }
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                required: true,
                                                sx: {
                                                    maxWidth: "280px",
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>

                    {/* Date Summary */}
                    {formData.startDate && formData.endDate && (
                        <Card
                            sx={{
                                mt: 3,
                                bgcolor: "primary.50",
                                maxWidth: 600,
                                mx: "auto",
                            }}
                        >
                            <CardContent>
                                <Typography variant="h6" gutterBottom>
                                    Booking Summary
                                </Typography>
                                <Box
                                    display="flex"
                                    justifyContent="space-between"
                                    alignItems="center"
                                >
                                    <Box>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            From:{" "}
                                            {formatDate(formData.startDate)}
                                        </Typography>
                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            To: {formatDate(formData.endDate)}
                                        </Typography>
                                    </Box>
                                    <Box textAlign="right">
                                        <Typography
                                            variant="h6"
                                            color="primary.main"
                                            fontWeight="bold"
                                        >
                                            {calculateDays()}{" "}
                                            {calculateDays() === 1
                                                ? "day"
                                                : "days"}
                                        </Typography>
                                    </Box>
                                </Box>
                            </CardContent>
                        </Card>
                    )}

                    {/* Availability Check Status */}
                    {checking && (
                        <Box mt={2} display="flex" justifyContent="center">
                            <Loading
                                message="Checking availability..."
                                size={24}
                            />
                        </Box>
                    )}

                    {availabilityChecked &&
                        formData.startDate &&
                        formData.endDate &&
                        !availabilityError && (
                            <Alert
                                severity="success"
                                sx={{ mt: 2, maxWidth: 600, mx: "auto" }}
                            >
                                Vehicle is available for the selected dates!
                            </Alert>
                        )}

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
                            disabled={!isFormValid || checking}
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
            </LocalizationProvider>
        </Paper>
    );
};

export default DateSelectionStep;
