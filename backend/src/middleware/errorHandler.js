const errorHandler = (error, req, res, next) => {
    console.error("Error:", error);

    // Prisma errors
    if (error.code === "P2002") {
        return res.status(400).json({
            success: false,
            message: "A record with this information already exists",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }

    if (error.code === "P2025") {
        return res.status(404).json({
            success: false,
            message: "Record not found",
            error:
                process.env.NODE_ENV === "development"
                    ? error.message
                    : undefined,
        });
    }

    // Validation errors
    if (error.name === "ValidationError") {
        return res.status(400).json({
            success: false,
            message: "Validation failed",
            errors: error.details || error.message,
        });
    }

    // Default error
    const statusCode = error.statusCode || 500;
    const message = error.message || "Internal Server Error";

    res.status(statusCode).json({
        success: false,
        message,
        error: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
};

module.exports = errorHandler;
