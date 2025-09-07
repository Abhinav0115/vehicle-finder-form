const {
    getVehicleTypesByWheels,
    getAllVehicleTypes,
    getVehiclesByType,
    getVehicleById,
} = require("../services/vehicleService");

const getVehicleTypesController = async (req, res, next) => {
    try {
        const { wheels } = req.query;
        const vehicleTypes = await getVehicleTypesByWheels(wheels);

        res.json({
            success: true,
            data: vehicleTypes,
            message: "Vehicle types fetched successfully",
        });
    } catch (error) {
        next(error);
    }
};

const getAllVehicleTypesController = async (req, res, next) => {
    try {
        const vehicleTypes = await getAllVehicleTypes();

        res.json({
            success: true,
            data: vehicleTypes,
            message: "All vehicle types fetched successfully",
        });
    } catch (error) {
        next(error);
    }
};

const getVehiclesByTypeController = async (req, res, next) => {
    try {
        const { vehicleTypeId } = req.params;

        if (!vehicleTypeId || isNaN(vehicleTypeId)) {
            return res.status(400).json({
                success: false,
                message: "Valid vehicle type ID is required",
            });
        }

        const vehicles = await getVehiclesByType(vehicleTypeId);

        res.json({
            success: true,
            data: vehicles,
            message: "Vehicles fetched successfully",
        });
    } catch (error) {
        next(error);
    }
};

const getVehicleByIdController = async (req, res, next) => {
    try {
        const { vehicleId } = req.params;

        if (!vehicleId || isNaN(vehicleId)) {
            return res.status(400).json({
                success: false,
                message: "Valid vehicle ID is required",
            });
        }

        const vehicle = await getVehicleById(vehicleId);

        if (!vehicle) {
            return res.status(404).json({
                success: false,
                message: "Vehicle not found",
            });
        }

        res.json({
            success: true,
            data: vehicle,
            message: "Vehicle fetched successfully",
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getVehicleTypesController,
    getAllVehicleTypesController,
    getVehiclesByTypeController,
    getVehicleByIdController,
};
