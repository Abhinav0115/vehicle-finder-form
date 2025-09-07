import React, { useState } from "react";
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
} from "@mui/material";
import {
    DirectionsBike,
    DirectionsCar,
    ArrowForward,
    ArrowBack,
} from "@mui/icons-material";
import { useBooking } from "../../contexts/BookingContext";
import ErrorMessage from "../ui/ErrorMessage";

const WheelsStep = () => {
    const {
        formData,
        updateFormData,
        nextStep,
        previousStep,
        error,
        clearError,
    } = useBooking();
    const [localError, setLocalError] = useState("");

    const wheelOptions = [
        {
            value: 2,
            label: "2 Wheels",
            description: "Motorcycles, bikes, scooters",
            icon: <DirectionsBike sx={{ fontSize: 48 }} />,
            color: "primary.main",
        },
        {
            value: 4,
            label: "4 Wheels",
            description: "Cars, SUVs, trucks",
            icon: <DirectionsCar sx={{ fontSize: 48 }} />,
            color: "secondary.main",
        },
    ];

    const handleWheelChange = (value) => {
        const wheelValue = parseInt(value);
        updateFormData({
            wheels: wheelValue,
            vehicleType: null, // Reset dependent fields
            vehicle: null,
        });

        // Clear any errors
        setLocalError("");
        if (error) {
            clearError();
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (formData.wheels === null) {
            setLocalError("Please select the number of wheels");
            return;
        }

        nextStep();
    };

    const handleBack = () => {
        previousStep();
    };

    return (
        <Paper elevation={0} sx={{ p: 3, maxWidth: 700, mx: "auto" }}>
            <Box textAlign="center" mb={3}>
                <Typography
                    variant="h4"
                    component="h1"
                    gutterBottom
                    fontWeight="bold"
                >
                    Number of wheels
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    How many wheels does your preferred vehicle have?
                </Typography>
            </Box>

            {(error || localError) && (
                <ErrorMessage
                    error={error || localError}
                    title="Vehicle Type Selection"
                    onRetry={clearError}
                    showRetry={false}
                />
            )}

            <Box component="form" onSubmit={handleSubmit}>
                <FormControl component="fieldset" fullWidth>
                    <RadioGroup
                        value={formData.wheels || ""}
                        onChange={(e) => handleWheelChange(e.target.value)}
                    >
                        <Grid container spacing={3} justifyContent="center">
                            {wheelOptions.map((option) => (
                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                    md={4}
                                    key={option.value}
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        maxWidth: {
                                            xs: "100%",
                                            sm: "50%",
                                            md: "300px",
                                        },
                                    }}
                                >
                                    <Card
                                        sx={{
                                            cursor: "pointer",
                                            border: 2,
                                            borderColor:
                                                formData.wheels === option.value
                                                    ? "primary.main"
                                                    : "transparent",
                                            backgroundColor:
                                                formData.wheels === option.value
                                                    ? "primary.50"
                                                    : "background.paper",
                                            transition: "all 0.3s ease",
                                            "&:hover": {
                                                borderColor: "primary.light",
                                                elevation: 4,
                                            },
                                            width: "100%",
                                            minHeight: "180px",
                                            display: "flex",
                                            flexDirection: "column",
                                        }}
                                        onClick={() =>
                                            handleWheelChange(option.value)
                                        }
                                    >
                                        <CardContent
                                            sx={{
                                                p: 3,
                                                display: "flex",
                                                flexDirection: "column",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                textAlign: "center",
                                                flex: 1,
                                            }}
                                        >
                                            <FormControlLabel
                                                value={option.value}
                                                control={
                                                    <Radio
                                                        sx={{ display: "none" }}
                                                    />
                                                }
                                                label={
                                                    <Box
                                                        sx={{
                                                            display: "flex",
                                                            flexDirection:
                                                                "column",
                                                            alignItems:
                                                                "center",
                                                            justifyContent:
                                                                "center",
                                                            gap: 2,
                                                        }}
                                                    >
                                                        <Box
                                                            sx={{
                                                                color: option.color,
                                                                display: "flex",
                                                                alignItems:
                                                                    "center",
                                                                justifyContent:
                                                                    "center",
                                                            }}
                                                        >
                                                            {option.icon}
                                                        </Box>
                                                        <Typography
                                                            variant="h6"
                                                            component="div"
                                                            fontWeight="bold"
                                                            sx={{
                                                                color: "text.primary",
                                                            }}
                                                        >
                                                            {option.label}
                                                        </Typography>
                                                        <Typography
                                                            variant="body2"
                                                            color="text.secondary"
                                                        >
                                                            {option.description}
                                                        </Typography>
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
                        disabled={formData.wheels === null}
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

export default WheelsStep;
