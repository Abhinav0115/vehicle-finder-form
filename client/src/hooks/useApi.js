import { useState, useEffect, useCallback } from "react";
import { vehicleApi, bookingApi } from "../services/api";
import { useBooking } from "../contexts/BookingContext";
import { handleApiError } from "../utils/helpers";

// Custom hook for vehicle types
export function useVehicleTypes() {
    const { vehicleTypes, setVehicleTypes, setLoading, setError } =
        useBooking();
    const [initialized, setInitialized] = useState(false);

    const fetchVehicleTypes = useCallback(
        async (wheels = null) => {
            try {
                setLoading(true);
                setError(null);

                const response = await vehicleApi.getVehicleTypes(wheels);

                if (response.success && response.data) {
                    setVehicleTypes(response.data);
                } else {
                    throw new Error(
                        response.message || "Failed to fetch vehicle types"
                    );
                }
            } catch (error) {
                const errorMessage = handleApiError(error);
                setError(errorMessage);
                console.error("Error fetching vehicle types:", error);
            } finally {
                setLoading(false);
                setInitialized(true);
            }
        },
        [setVehicleTypes, setLoading, setError]
    );

    return {
        vehicleTypes,
        fetchVehicleTypes,
        initialized,
    };
}

// Custom hook for vehicles by type
export function useVehiclesByType() {
    const { vehicles, setVehicles, setLoading, setError } = useBooking();

    const fetchVehiclesByType = useCallback(
        async (vehicleTypeId) => {
            if (!vehicleTypeId) return;

            try {
                setLoading(true);
                setError(null);

                const response =
                    await vehicleApi.getVehiclesByType(vehicleTypeId);

                if (response.success && response.data) {
                    setVehicles(response.data);
                } else {
                    throw new Error(
                        response.message || "Failed to fetch vehicles"
                    );
                }
            } catch (error) {
                const errorMessage = handleApiError(error);
                setError(errorMessage);
                setVehicles([]);
                console.error("Error fetching vehicles:", error);
            } finally {
                setLoading(false);
            }
        },
        [setVehicles, setLoading, setError]
    );

    const clearVehicles = useCallback(() => {
        setVehicles([]);
    }, [setVehicles]);

    return {
        vehicles,
        fetchVehiclesByType,
        clearVehicles,
    };
}

// Custom hook for booking submission
export function useBookingSubmission() {
    const { setLoading, setError, setBookingResult } = useBooking();
    const [submitting, setSubmitting] = useState(false);

    const submitBooking = useCallback(
        async (formData) => {
            try {
                setSubmitting(true);
                setLoading(true);
                setError(null);

                // Prepare booking data for API
                const bookingData = {
                    firstName: formData.firstName.trim(),
                    lastName: formData.lastName.trim(),
                    vehicleId: formData.vehicle.id,
                    startDate: formData.startDate,
                    endDate: formData.endDate,
                };

                const response = await bookingApi.createBooking(bookingData);

                if (response.success && response.data) {
                    setBookingResult(response.data);
                    return response.data;
                } else {
                    throw new Error(
                        response.message || "Failed to create booking"
                    );
                }
            } catch (error) {
                const errorMessage = handleApiError(error);
                setError(errorMessage);
                throw error;
            } finally {
                setSubmitting(false);
                setLoading(false);
            }
        },
        [setLoading, setError, setBookingResult]
    );

    return {
        submitBooking,
        submitting,
    };
}

// Custom hook for availability checking
export function useAvailabilityCheck() {
    const [checking, setChecking] = useState(false);
    const [availabilityError, setAvailabilityError] = useState(null);

    const checkAvailability = useCallback(
        async (vehicleId, startDate, endDate) => {
            if (!vehicleId || !startDate || !endDate) return null;

            try {
                setChecking(true);
                setAvailabilityError(null);

                const response = await bookingApi.checkAvailability(
                    vehicleId,
                    startDate,
                    endDate
                );

                if (response.success && response.data) {
                    return response.data;
                } else {
                    throw new Error(
                        response.message || "Failed to check availability"
                    );
                }
            } catch (error) {
                const errorMessage = handleApiError(error);
                setAvailabilityError(errorMessage);
                console.error("Error checking availability:", error);
                return null;
            } finally {
                setChecking(false);
            }
        },
        []
    );

    return {
        checkAvailability,
        checking,
        availabilityError,
    };
}

// Custom hook for form persistence
export function useFormPersistence() {
    const { formData, updateFormData } = useBooking();

    // Save form data to localStorage whenever it changes
    useEffect(() => {
        if (Object.keys(formData).some((key) => formData[key] !== "")) {
            try {
                localStorage.setItem(
                    "vehicleBookingForm",
                    JSON.stringify(formData)
                );
            } catch (error) {
                console.warn("Failed to persist form data:", error);
            }
        }
    }, [formData]);

    // Load form data from localStorage on mount
    const loadPersistedData = useCallback(() => {
        try {
            const saved = localStorage.getItem("vehicleBookingForm");
            if (saved) {
                const parsedData = JSON.parse(saved);
                updateFormData(parsedData);
                return parsedData;
            }
        } catch (error) {
            console.warn("Failed to load persisted form data:", error);
        }
        return null;
    }, [updateFormData]);

    const clearPersistedData = useCallback(() => {
        try {
            localStorage.removeItem("vehicleBookingForm");
        } catch (error) {
            console.warn("Failed to clear persisted form data:", error);
        }
    }, []);

    return {
        loadPersistedData,
        clearPersistedData,
    };
}
