const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getVehicleTypesByWheels = async (wheels) => {
    try {
        const vehicleTypes = await prisma.vehicleType.findMany({
            where: wheels ? { wheels: parseInt(wheels) } : {},
            orderBy: { name: "asc" },
        });
        return vehicleTypes;
    } catch (error) {
        throw new Error(`Failed to fetch vehicle types: ${error.message}`);
    }
};

const getVehiclesByType = async (vehicleTypeId) => {
    try {
        const vehicles = await prisma.vehicle.findMany({
            where: {
                vehicleTypeId: parseInt(vehicleTypeId),
                isAvailable: true,
            },
            include: {
                vehicleType: true,
            },
            orderBy: { name: "asc" },
        });
        return vehicles;
    } catch (error) {
        throw new Error(`Failed to fetch vehicles: ${error.message}`);
    }
};

const getAllVehicleTypes = async () => {
    try {
        const vehicleTypes = await prisma.vehicleType.findMany({
            include: {
                vehicles: {
                    where: { isAvailable: true },
                },
            },
            orderBy: { name: "asc" },
        });
        return vehicleTypes;
    } catch (error) {
        throw new Error(`Failed to fetch vehicle types: ${error.message}`);
    }
};

const getVehicleById = async (vehicleId) => {
    try {
        const vehicle = await prisma.vehicle.findUnique({
            where: { id: parseInt(vehicleId) },
            include: {
                vehicleType: true,
            },
        });
        return vehicle;
    } catch (error) {
        throw new Error(`Failed to fetch vehicle: ${error.message}`);
    }
};

module.exports = {
    getVehicleTypesByWheels,
    getVehiclesByType,
    getAllVehicleTypes,
    getVehicleById,
};
