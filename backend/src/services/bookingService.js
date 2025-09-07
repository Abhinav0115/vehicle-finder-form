const { PrismaClient } = require("@prisma/client");
const { isWithinInterval, parseISO } = require("date-fns");

const prisma = new PrismaClient();

const checkBookingOverlap = async (vehicleId, startDate, endDate) => {
    try {
        const existingBookings = await prisma.booking.findMany({
            where: {
                vehicleId: parseInt(vehicleId),
                status: "confirmed",
                OR: [
                    {
                        AND: [
                            { startDate: { lte: startDate } },
                            { endDate: { gt: startDate } },
                        ],
                    },
                    {
                        AND: [
                            { startDate: { lt: endDate } },
                            { endDate: { gte: endDate } },
                        ],
                    },
                    {
                        AND: [
                            { startDate: { gte: startDate } },
                            { endDate: { lte: endDate } },
                        ],
                    },
                ],
            },
        });

        return existingBookings;
    } catch (error) {
        throw new Error(`Failed to check booking overlap: ${error.message}`);
    }
};

const createBooking = async (bookingData) => {
    try {
        const { firstName, lastName, vehicleId, startDate, endDate } =
            bookingData;

        // Parse dates
        const startDateParsed = parseISO(startDate);
        const endDateParsed = parseISO(endDate);

        // Validate dates
        if (startDateParsed >= endDateParsed) {
            throw new Error("End date must be after start date");
        }

        if (startDateParsed < new Date()) {
            throw new Error("Start date cannot be in the past");
        }

        // Check for overlapping bookings
        const overlappingBookings = await checkBookingOverlap(
            vehicleId,
            startDateParsed,
            endDateParsed
        );

        if (overlappingBookings.length > 0) {
            throw new Error("Vehicle is not available for the selected dates");
        }

        // Create the booking
        const booking = await prisma.booking.create({
            data: {
                firstName,
                lastName,
                vehicleId: parseInt(vehicleId),
                startDate: startDateParsed,
                endDate: endDateParsed,
                status: "confirmed",
            },
            include: {
                vehicle: {
                    include: {
                        vehicleType: true,
                    },
                },
            },
        });

        return booking;
    } catch (error) {
        throw new Error(`Failed to create booking: ${error.message}`);
    }
};

const getBookingById = async (bookingId) => {
    try {
        const booking = await prisma.booking.findUnique({
            where: { id: parseInt(bookingId) },
            include: {
                vehicle: {
                    include: {
                        vehicleType: true,
                    },
                },
            },
        });
        return booking;
    } catch (error) {
        throw new Error(`Failed to fetch booking: ${error.message}`);
    }
};

const getBookings = async () => {
    try {
        const bookings = await prisma.booking.findMany({
            include: {
                vehicle: {
                    include: {
                        vehicleType: true,
                    },
                },
            },
            orderBy: { createdAt: "desc" },
        });
        return bookings;
    } catch (error) {
        throw new Error(`Failed to fetch bookings: ${error.message}`);
    }
};

const getVehicleAvailability = async (vehicleId, startDate, endDate) => {
    try {
        const overlappingBookings = await checkBookingOverlap(
            vehicleId,
            parseISO(startDate),
            parseISO(endDate)
        );

        return {
            isAvailable: overlappingBookings.length === 0,
            conflictingBookings: overlappingBookings,
        };
    } catch (error) {
        throw new Error(`Failed to check availability: ${error.message}`);
    }
};

module.exports = {
    createBooking,
    checkBookingOverlap,
    getBookingById,
    getBookings,
    getVehicleAvailability,
};
