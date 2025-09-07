import React, { createContext, useContext, useReducer, useMemo } from "react";

// Initial state
const initialState = {
    step: 1,
    totalSteps: 6,
    formData: {
        firstName: "",
        lastName: "",
        wheels: null,
        vehicleType: null,
        vehicle: null,
        startDate: null,
        endDate: null,
    },
    vehicleTypes: [],
    vehicles: [],
    loading: false,
    error: null,
    bookingResult: null,
};

// Action types
const ACTIONS = {
    SET_STEP: "SET_STEP",
    NEXT_STEP: "NEXT_STEP",
    PREVIOUS_STEP: "PREVIOUS_STEP",
    UPDATE_FORM_DATA: "UPDATE_FORM_DATA",
    SET_VEHICLE_TYPES: "SET_VEHICLE_TYPES",
    SET_VEHICLES: "SET_VEHICLES",
    SET_LOADING: "SET_LOADING",
    SET_ERROR: "SET_ERROR",
    CLEAR_ERROR: "CLEAR_ERROR",
    SET_BOOKING_RESULT: "SET_BOOKING_RESULT",
    RESET_FORM: "RESET_FORM",
};

// Reducer
function bookingReducer(state, action) {
    switch (action.type) {
        case ACTIONS.SET_STEP:
            return { ...state, step: action.payload };

        case ACTIONS.NEXT_STEP:
            return {
                ...state,
                step: Math.min(state.step + 1, state.totalSteps),
                error: null,
            };

        case ACTIONS.PREVIOUS_STEP:
            return {
                ...state,
                step: Math.max(state.step - 1, 1),
                error: null,
            };

        case ACTIONS.UPDATE_FORM_DATA:
            return {
                ...state,
                formData: { ...state.formData, ...action.payload },
                error: null,
            };

        case ACTIONS.SET_VEHICLE_TYPES:
            return { ...state, vehicleTypes: action.payload };

        case ACTIONS.SET_VEHICLES:
            return { ...state, vehicles: action.payload };

        case ACTIONS.SET_LOADING:
            return { ...state, loading: action.payload };

        case ACTIONS.SET_ERROR:
            return { ...state, error: action.payload, loading: false };

        case ACTIONS.CLEAR_ERROR:
            return { ...state, error: null };

        case ACTIONS.SET_BOOKING_RESULT:
            return { ...state, bookingResult: action.payload, loading: false };

        case ACTIONS.RESET_FORM:
            return {
                ...initialState,
                vehicleTypes: state.vehicleTypes, // Keep cached data
            };

        default:
            return state;
    }
}

// Context
const BookingContext = createContext();

// Provider
export function BookingProvider({ children }) {
    const [state, dispatch] = useReducer(bookingReducer, initialState);

    // Memoize action creators to prevent infinite loops
    const actions = useMemo(
        () => ({
            setStep: (step) =>
                dispatch({ type: ACTIONS.SET_STEP, payload: step }),

            nextStep: () => dispatch({ type: ACTIONS.NEXT_STEP }),

            previousStep: () => dispatch({ type: ACTIONS.PREVIOUS_STEP }),

            updateFormData: (data) =>
                dispatch({ type: ACTIONS.UPDATE_FORM_DATA, payload: data }),

            setVehicleTypes: (types) =>
                dispatch({ type: ACTIONS.SET_VEHICLE_TYPES, payload: types }),

            setVehicles: (vehicles) =>
                dispatch({ type: ACTIONS.SET_VEHICLES, payload: vehicles }),

            setLoading: (loading) =>
                dispatch({ type: ACTIONS.SET_LOADING, payload: loading }),

            setError: (error) =>
                dispatch({ type: ACTIONS.SET_ERROR, payload: error }),

            clearError: () => dispatch({ type: ACTIONS.CLEAR_ERROR }),

            setBookingResult: (result) =>
                dispatch({ type: ACTIONS.SET_BOOKING_RESULT, payload: result }),

            resetForm: () => dispatch({ type: ACTIONS.RESET_FORM }),
        }),
        []
    );

    // Memoize validation functions to prevent unnecessary re-renders
    const validation = useMemo(
        () => ({
            canProceedFromStep: (step, formData) => {
                switch (step) {
                    case 1:
                        return (
                            formData.firstName.trim() &&
                            formData.lastName.trim()
                        );
                    case 2:
                        return formData.wheels !== null;
                    case 3:
                        return formData.vehicleType !== null;
                    case 4:
                        return formData.vehicle !== null;
                    case 5:
                        return formData.startDate && formData.endDate;
                    case 6:
                        return true; // Confirmation step doesn't require validation
                    default:
                        return false;
                }
            },

            getStepErrors: (step, formData) => {
                const errors = [];

                switch (step) {
                    case 1:
                        if (!formData.firstName.trim())
                            errors.push("First name is required");
                        if (!formData.lastName.trim())
                            errors.push("Last name is required");
                        break;
                    case 2:
                        if (formData.wheels === null)
                            errors.push("Please select number of wheels");
                        break;
                    case 3:
                        if (formData.vehicleType === null)
                            errors.push("Please select a vehicle type");
                        break;
                    case 4:
                        if (formData.vehicle === null)
                            errors.push("Please select a specific vehicle");
                        break;
                    case 5:
                        if (!formData.startDate)
                            errors.push("Please select a start date");
                        if (!formData.endDate)
                            errors.push("Please select an end date");
                        if (
                            formData.startDate &&
                            formData.endDate &&
                            new Date(formData.startDate) >=
                                new Date(formData.endDate)
                        ) {
                            errors.push("End date must be after start date");
                        }
                        if (
                            formData.startDate &&
                            new Date(formData.startDate) < new Date()
                        ) {
                            errors.push("Start date cannot be in the past");
                        }
                        break;
                }

                return errors;
            },
        }),
        []
    );

    const contextValue = useMemo(
        () => ({
            ...state,
            ...actions,
            ...validation,
        }),
        [state, actions, validation]
    );

    return (
        <BookingContext.Provider value={contextValue}>
            {children}
        </BookingContext.Provider>
    );
}

// Hook to use the context
export function useBooking() {
    const context = useContext(BookingContext);
    if (!context) {
        throw new Error("useBooking must be used within a BookingProvider");
    }
    return context;
}

export default BookingContext;
