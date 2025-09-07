import axios from "axios";

const API_BASE_URL =
    import.meta.env.VITE_API_URL || "http://localhost:3001/api";

// Create axios instance
const api = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
// api.interceptors.request.use(
//     (config) => {
//         console.log(
//             `Making ${config.method?.toUpperCase()} request to:`,
//             config.url
//         );
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

// Response interceptor
api.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        console.error("API Error:", error);

        if (error.response?.data) {
            throw new Error(error.response.data.message || "An error occurred");
        }

        if (error.code === "ECONNABORTED") {
            throw new Error("Request timeout - please try again");
        }

        if (!error.response) {
            throw new Error("Network error - please check your connection");
        }

        throw new Error(error.message || "An unexpected error occurred");
    }
);

// Vehicle API endpoints
export const vehicleApi = {
    // Get vehicle types by number of wheels
    getVehicleTypes: (wheels) => {
        const params = wheels ? { wheels } : {};
        return api.get("/vehicles/types", { params });
    },

    // Get all vehicle types with their vehicles
    getAllVehicleTypes: () => {
        return api.get("/vehicles/types/all");
    },

    // Get vehicles by vehicle type ID
    getVehiclesByType: (vehicleTypeId) => {
        return api.get(`/vehicles/type/${vehicleTypeId}`);
    },

    // Get specific vehicle by ID
    getVehicleById: (vehicleId) => {
        return api.get(`/vehicles/${vehicleId}`);
    },
};

// Booking API endpoints
export const bookingApi = {
    // Create new booking
    createBooking: (bookingData) => {
        return api.post("/bookings", bookingData);
    },

    // Get all bookings
    getBookings: () => {
        return api.get("/bookings");
    },

    // Get specific booking by ID
    getBookingById: (bookingId) => {
        return api.get(`/bookings/${bookingId}`);
    },

    // Check vehicle availability
    checkAvailability: (vehicleId, startDate, endDate) => {
        const params = { vehicleId, startDate, endDate };
        return api.get("/bookings/availability/check", { params });
    },
};

export default api;
