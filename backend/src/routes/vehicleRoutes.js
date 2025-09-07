const express = require("express");
const {
    getVehicleTypesController,
    getAllVehicleTypesController,
    getVehiclesByTypeController,
    getVehicleByIdController,
} = require("../controllers/vehicleController");

const router = express.Router();

/**
 * @route GET /api/vehicles/types
 * @desc Get vehicle types, optionally filtered by number of wheels
 * @query wheels - Number of wheels (2 or 4)
 */
router.get("/types", getVehicleTypesController);

/**
 * @route GET /api/vehicles/types/all
 * @desc Get all vehicle types with their vehicles
 */
router.get("/types/all", getAllVehicleTypesController);

/**
 * @route GET /api/vehicles/type/:vehicleTypeId
 * @desc Get vehicles by vehicle type ID
 * @param vehicleTypeId - ID of the vehicle type
 */
router.get("/type/:vehicleTypeId", getVehiclesByTypeController);

/**
 * @route GET /api/vehicles/:vehicleId
 * @desc Get vehicle by ID
 * @param vehicleId - ID of the vehicle
 */
router.get("/:vehicleId", getVehicleByIdController);

module.exports = router;
