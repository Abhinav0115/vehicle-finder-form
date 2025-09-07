const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { PrismaClient } = require("@prisma/client");

// Import routes
const vehicleRoutes = require("./routes/vehicleRoutes");
const bookingRoutes = require("./routes/bookingRoutes");

// Import middleware
const errorHandler = require("./middleware/errorHandler");

// Load environment variables
dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(
    cors({
        origin: process.env.ALLOWED_ORIGINS?.split(",") || [
            "http://localhost:5173",
        ],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/bookings", bookingRoutes);

// Health check endpoint
app.get("/api", (req, res) => {
    res.json({
        status: "OK",
        message: "Vehicle Finder Form API is running",
        timestamp: new Date().toISOString(),
    });
});

// 404 handler
app.use("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});

// Error handling middleware
app.use(errorHandler);

// shutdown

const shutdown = async () => {
    console.log("SIGTERM received, shutting down...");
    await prisma.$disconnect();
    process.exit(0);
};

process.on("SIGTERM", shutdown);
process.on("SIGINT", shutdown);

app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
