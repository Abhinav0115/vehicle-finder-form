import React from "react";
import {
    Box,
    LinearProgress,
    Typography,
    Stepper,
    Step,
    StepLabel,
} from "@mui/material";

const ProgressBar = ({ currentStep, totalSteps, stepTitles = [] }) => {
    const progress = (currentStep / totalSteps) * 100;

    const defaultStepTitles = [
        "Personal Info",
        "Vehicle Type",
        "Vehicle Category",
        "Choose Vehicle",
        "Select Dates",
        "Confirm Booking",
    ];

    const titles =
        stepTitles.length === totalSteps
            ? stepTitles
            : defaultStepTitles.slice(0, totalSteps);

    return (
        <Box sx={{ width: "100%", mb: 4 }}>
            {/* Progress bar */}
            <Box sx={{ mb: 2 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                    }}
                >
                    <Typography variant="body2" color="text.secondary">
                        Step {currentStep} of {totalSteps}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {Math.round(progress)}% Complete
                    </Typography>
                </Box>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: "grey.200",
                        "& .MuiLinearProgress-bar": {
                            borderRadius: 4,
                        },
                    }}
                />
            </Box>

            {/* Step indicator */}
            <Stepper activeStep={currentStep - 1} alternativeLabel>
                {titles.map((title, index) => (
                    <Step key={index}>
                        <StepLabel
                            sx={{
                                "& .MuiStepLabel-label": {
                                    fontSize: "0.75rem",
                                    fontWeight:
                                        currentStep - 1 === index ? 600 : 400,
                                },
                            }}
                        >
                            {title}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default ProgressBar;
