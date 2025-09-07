import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

const Loading = ({ message = "Loading...", size = 40, color = "primary" }) => {
    return (
        <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            gap={2}
            py={4}
        >
            <CircularProgress size={size} color={color} />
            <Typography variant="body1" color="text.secondary">
                {message}
            </Typography>
        </Box>
    );
};

export default Loading;
