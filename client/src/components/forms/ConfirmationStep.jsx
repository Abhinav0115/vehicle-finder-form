import React, { useState } from "react";
import {
    Box,
    Typography,
    Button,
    Paper,
    Card,
    CardContent,
    Grid,
    Divider,
    Avatar,
    Chip,
    Alert,
} from "@mui/material";
import {
    CheckCircle,
    ArrowBack,
    Person,
    DirectionsCar,
    DirectionsBike,
    CalendarToday,
    Send,
} from "@mui/icons-material";
import { useBooking } from "../../contexts/BookingContext";
import { useBookingSubmission } from "../../hooks/useApi";
import { formatDate } from "../../utils/helpers";
import Loading from "../ui/Loading";
import ErrorMessage from "../ui/ErrorMessage";

const ConfirmationStep = () => {
    const {
        formData,
        previousStep,
        resetForm,
        error,
        clearError,
        bookingResult,
    } = useBooking();

    const { submitBooking, submitting } = useBookingSubmission();
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async () => {
        try {
            setSubmitted(false);
            clearError();

            await submitBooking(formData);
            setSubmitted(true);
        } catch (error) {
            console.error("Booking submission failed:", error);
            // Error is handled by the hook and context
        }
    };

    const handleBack = () => {
        previousStep();
    };

    const handleNewBooking = () => {
        resetForm();
        setSubmitted(false);
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

    // Show success screen after successful submission
    if (submitted && bookingResult) {
        return (
            <Paper elevation={0} sx={{ p: 3, maxWidth: 600, mx: "auto" }}>
                <Box textAlign="center" mb={3}>
                    <CheckCircle
                        sx={{ fontSize: 72, color: "success.main", mb: 2 }}
                    />
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        fontWeight="bold"
                    >
                        Booking Confirmed!
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                        Your vehicle has been successfully booked.
                    </Typography>
                </Box>

                <Card sx={{ mb: 4, bgcolor: "success.50" }}>
                    <CardContent>
                        <Typography variant="h6" gutterBottom fontWeight="bold">
                            Booking Details
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Booking ID:
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    #{bookingResult.id}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Status:
                                </Typography>
                                <Chip
                                    label={bookingResult.status}
                                    color="success"
                                    size="small"
                                    sx={{ textTransform: "capitalize" }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Customer:
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {bookingResult.firstName}{" "}
                                    {bookingResult.lastName}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Vehicle:
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {bookingResult.vehicle.name} (
                                    {bookingResult.vehicle.model})
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    Start Date:
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {formatDate(bookingResult.startDate)}
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    End Date:
                                </Typography>
                                <Typography variant="body1" fontWeight="bold">
                                    {formatDate(bookingResult.endDate)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>

                <Box textAlign="center">
                    <Button
                        variant="contained"
                        size="large"
                        onClick={handleNewBooking}
                        sx={{
                            minWidth: 200,
                            py: 1.5,
                            fontSize: "1.1rem",
                            fontWeight: "bold",
                        }}
                    >
                        Make Another Booking
                    </Button>
                </Box>
            </Paper>
        );
    }

    // Show loading screen during submission
    if (submitting) {
        return (
            <Paper elevation={0} sx={{ p: 4, maxWidth: 600, mx: "auto" }}>
                <Loading message="Processing your booking..." size={48} />
                <Box textAlign="center" mt={2}>
                    <Typography variant="body2" color="text.secondary">
                        Please don't close this window...
                    </Typography>
                </Box>
            </Paper>
        );
    }

    // Show confirmation form
    return (
        <Paper elevation={0} sx={{ p: 4, maxWidth: 700, mx: "auto" }}>
            <Box textAlign="center" mb={4}>
                <Send sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                >
                    Confirm Your Booking
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Please review your booking details before confirming.
                </Typography>
            </Box>

            {error && (
                <ErrorMessage
                    error={error}
                    title="Booking Submission Issue"
                    onRetry={clearError}
                    showRetry={false}
                />
            )}

            {/* Customer Information */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Avatar sx={{ bgcolor: "primary.main" }}>
                            <Person />
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold">
                            Customer Information
                        </Typography>
                    </Box>
                    <Typography variant="body1">
                        {formData.firstName} {formData.lastName}
                    </Typography>
                </CardContent>
            </Card>

            {/* Vehicle Information */}
            <Card sx={{ mb: 3 }}>
                <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Avatar sx={{ bgcolor: "secondary.main" }}>
                            {getVehicleIcon(formData.wheels)}
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold">
                            Vehicle Details
                        </Typography>
                    </Box>
                    <Grid container spacing={2} justifyContent={"space-between"}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Vehicle:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {formData.vehicle.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Model:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {formData.vehicle.model}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Type:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {formData.vehicleType.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Wheels:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {formData.wheels}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            {/* Booking Period */}
            <Card sx={{ mb: 4 }}>
                <CardContent>
                    <Box display="flex" alignItems="center" gap={2} mb={2}>
                        <Avatar sx={{ bgcolor: "info.main" }}>
                            <CalendarToday />
                        </Avatar>
                        <Typography variant="h6" fontWeight="bold">
                            Booking Period
                        </Typography>
                    </Box>
                    <Grid container spacing={2} justifyContent={"space-between"}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                Start Date:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {formatDate(formData.startDate)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="body2" color="text.secondary">
                                End Date:
                            </Typography>
                            <Typography variant="body1" fontWeight="bold">
                                {formatDate(formData.endDate)}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body2" color="text.secondary">
                                Duration:
                            </Typography>
                            <Typography
                                variant="h6"
                                color="primary.main"
                                fontWeight="bold"
                            >
                                {calculateDays()}{" "}
                                {calculateDays() === 1 ? "day" : "days"}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>

            <Alert severity="info" sx={{ mb: 4 }}>
                By confirming this booking, you agree that the information
                provided is accurate and you understand the rental terms and
                conditions.
            </Alert>

            <Box display="flex" justifyContent="space-between">
                <Button
                    variant="outlined"
                    size="large"
                    startIcon={<ArrowBack />}
                    onClick={handleBack}
                    disabled={submitting}
                    sx={{ minWidth: 120 }}
                >
                    Back
                </Button>

                <Button
                    variant="contained"
                    size="large"
                    onClick={handleSubmit}
                    disabled={submitting}
                    sx={{
                        minWidth: 200,
                        py: 1.5,
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                    }}
                >
                    Confirm Booking
                </Button>
            </Box>
        </Paper>
    );
};

export default ConfirmationStep;
