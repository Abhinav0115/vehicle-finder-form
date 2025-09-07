// Date formatting utilities
export const formatDate = (date) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

// Form validation utilities
export const validateName = (name) => {
    if (!name || !name.trim()) {
        return "This field is required";
    }
    if (name.trim().length < 2) {
        return "Must be at least 2 characters long";
    }
    if (name.trim().length > 50) {
        return "Must be less than 50 characters long";
    }
    if (!/^[a-zA-Z\s'-]+$/.test(name.trim())) {
        return "Only letters, spaces, hyphens, and apostrophes are allowed";
    }
    return null;
};

export const validateDateRange = (startDate, endDate) => {
    const errors = [];
    const now = new Date();
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (!startDate) {
        errors.push("Start date is required");
    } else if (start < now) {
        errors.push("Start date cannot be in the past");
    }

    if (!endDate) {
        errors.push("End date is required");
    } else if (startDate && end <= start) {
        errors.push("End date must be after start date");
    }

    return errors;
};

// API response utilities
export const handleApiError = (error) => {
    console.error("API Error:", error);

    if (error.message) {
        return error.message;
    }

    if (typeof error === "string") {
        return error;
    }

    return "An unexpected error occurred. Please try again.";
};
