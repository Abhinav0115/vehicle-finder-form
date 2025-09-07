import React, { useState } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Box,
    Button,
    Avatar,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    DirectionsCar,
    DirectionsBike,
    Phone,
    Email,
    LocationOn,
    MoreVert,
} from "@mui/icons-material";

const Header = () => {
    const [anchorEl, setAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <AppBar
            position="static"
            sx={{
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                borderBottom: "1px solid #e0e0e0",
            }}
        >
            <Toolbar
                sx={{ py: { xs: 0.5, sm: 1 } }}
            >
                {/* Logo Section */}
                <Box display="flex" alignItems="center" sx={{ flexGrow: 1 }}>
                    <Avatar
                        sx={{
                            bgcolor: "primary.main",
                            mr: { xs: 1, sm: 2 },
                            width: { xs: 40, sm: 48 },
                            height: { xs: 40, sm: 48 },
                        }}
                    >
                        <DirectionsCar sx={{ fontSize: { xs: 20, sm: 24 } }} />
                    </Avatar>
                    <Box>
                        <Typography
                            variant={isMobile ? "h6" : "h5"}
                            component="h1"
                            sx={{
                                fontWeight: "bold",
                                color: "primary.main",
                                lineHeight: 1.2,
                            }}
                        >
                            Vehicle Rental Form
                        </Typography>
                        {!isMobile && (
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ fontSize: "0.8rem" }}
                            >
                                Your trusted vehicle rental partner
                            </Typography>
                        )}
                    </Box>
                </Box>

                {/* Service Types - Hidden on mobile */}
                <Box
                    display="flex"
                    alignItems="center"
                    gap={1}
                    sx={{
                        display: { xs: "none", sm: "flex" },
                        mr: 3,
                    }}
                >
                    <Chip
                        icon={<DirectionsBike />}
                        label="2-Wheeler"
                        variant="outlined"
                        size="small"
                        sx={{
                            color: "primary.main",
                            borderColor: "primary.main",
                        }}
                    />
                    <Chip
                        icon={<DirectionsCar />}
                        label="4-Wheeler"
                        variant="outlined"
                        size="small"
                        sx={{
                            color: "primary.main",
                            borderColor: "primary.main",
                        }}
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
