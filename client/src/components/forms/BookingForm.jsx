import React from "react";
import { Box, Container, Paper } from "@mui/material";
import { useBooking } from "../../contexts/BookingContext";
import ProgressBar from "../ui/ProgressBar";
import NameStep from "./NameStep";
import WheelsStep from "./WheelsStep";
import VehicleTypeStep from "./VehicleType";
import VehicleSelectionStep from "./VehicleSelection";
import DateSelectionStep from "./DateSelection";
import ConfirmationStep from "./ConfirmationStep";

const BookingForm = () => {
    const { step, totalSteps } = useBooking();

    const renderStep = () => {
        switch (step) {
            case 1:
                return <NameStep />;
            case 2:
                return <WheelsStep />;
            case 3:
                return <VehicleTypeStep />;
            case 4:
                return <VehicleSelectionStep />;
            case 5:
                return <DateSelectionStep />;
            case 6:
                return <ConfirmationStep />;
            default:
                return <NameStep />;
        }
    };

    const stepTitles = [
        "Personal Info",
        "Vehicle Type",
        "Vehicle Category",
        "Choose Vehicle",
        "Select Dates",
        "Confirm Booking",
    ];

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper
                elevation={1}
                sx={{
                    p: {
                        xs: 2,
                        sm: 3,
                        md: 4,
                    },
                    borderRadius: 2,
                    background:
                        "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
                    minHeight: "80vh",

                }}
            >
                {/* Progress indicator - hide on confirmation step if booking is successful */}
                {step <= totalSteps && (
                    <ProgressBar
                        currentStep={step}
                        totalSteps={totalSteps}
                        stepTitles={stepTitles}
                    />
                )}

                {/* Step content */}
                <Box>{renderStep()}</Box>
            </Paper>
        </Container>
    );
};

export default BookingForm;
