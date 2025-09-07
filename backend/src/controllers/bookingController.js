const { body, validationResult } = require("express-validator");
const {
    createBooking,
    getBookings,
    getBookingById,
    getVehicleAvailability,
} = require("../services/bookingService");

// Validation rules
const getValidationRules = () => {
    return [
        body("firstName")
            .trim()
            .notEmpty()
            .withMessage("First name is required")
            .isLength({ min: 2, max: 50 })
            .withMessage("First name must be between 2 and 50 characters"),

        body("lastName")
            .trim()
            .notEmpty()
            .withMessage("Last name is required")
            .isLength({ min: 2, max: 50 })
            .withMessage("Last name must be between 2 and 50 characters"),

        body("vehicleId")
            .notEmpty()
            .withMessage("Vehicle ID is required")
            .isInt({ min: 1 })
            .withMessage("Vehicle ID must be a valid positive integer"),

        body("startDate")
            .notEmpty()
            .withMessage("Start date is required")
            .isISO8601()
            .withMessage("Start date must be a valid ISO 8601 date"),

        body("endDate")
            .notEmpty()
            .withMessage("End date is required")
            .isISO8601()
            .withMessage("End date must be a valid ISO 8601 date"),
    ];
};

const createBookingController = async (req, res, next) => {
    try {
        // Check validation results
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errors.array(),
            });
        }

        const bookingData = req.body;
        const booking = await createBooking(bookingData);

        res.status(201).json({
            success: true,
            data: booking,
            message: "Booking created successfully",
        });
    } catch (error) {
        next(error);
    }
};

const getBookingsController = async (req, res, next) => {
    try {
        const bookings = await getBookings();

        res.json({
            success: true,
            data: bookings,
            message: "Bookings fetched successfully",
        });
    } catch (error) {
        next(error);
    }
};

const getBookingByIdController = async (req, res, next) => {
    try {
        const { bookingId } = req.params;

        if (!bookingId || isNaN(bookingId)) {
            return res.status(400).json({
                success: false,
                message: "Valid booking ID is required",
            });
        }

        const booking = await getBookingById(bookingId);

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: "Booking not found",
            });
        }

        res.json({
            success: true,
            data: booking,
            message: "Booking fetched successfully",
        });
    } catch (error) {
        next(error);
    }
};

const checkAvailabilityController = async (req, res, next) => {
    try {
        const { vehicleId, startDate, endDate } = req.query;

        if (!vehicleId || !startDate || !endDate) {
            return res.status(400).json({
                success: false,
                message: "Vehicle ID, start date, and end date are required",
            });
        }

        const availability = await getVehicleAvailability(
            vehicleId,
            startDate,
            endDate
        );

        res.json({
            success: true,
            data: availability,
            message: "Availability checked successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getValidationRules,
    createBookingController,
    getBookingsController,
    getBookingByIdController,
    checkAvailabilityController,
};
