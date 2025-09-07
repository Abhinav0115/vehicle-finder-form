const express = require("express");
const {
    getValidationRules,
    createBookingController,
    getBookingsController,
    getBookingByIdController,
    checkAvailabilityController,
} = require("../controllers/bookingController");

const router = express.Router();

/**
 * @route POST /api/bookings
 * @desc Create a new booking
 * @body firstName, lastName, vehicleId, startDate, endDate
 */
router.post("/", getValidationRules(), createBookingController);

/**
 * @route GET /api/bookings
 * @desc Get all bookings
 */
router.get("/", getBookingsController);

/**
 * @route GET /api/bookings/:bookingId
 * @desc Get booking by ID
 * @param bookingId - ID of the booking
 */
router.get("/:bookingId", getBookingByIdController);

/**
 * @route GET /api/bookings/availability/check
 * @desc Check vehicle availability for given dates
 * @query vehicleId, startDate, endDate
 */
router.get("/availability/check", checkAvailabilityController);

module.exports = router;
