const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Starting database seed...");

    // Clean existing data
    await prisma.booking.deleteMany({});
    await prisma.vehicle.deleteMany({});
    await prisma.vehicleType.deleteMany({});

    // Create vehicle types
    const vehicleTypes = [
        // Car types (4 wheels)
        {
            name: "Hatchback",
            wheels: 4,
            description: "Compact and efficient city cars",
        },
        {
            name: "SUV",
            wheels: 4,
            description: "Sport Utility Vehicles for all terrains",
        },
        {
            name: "Sedan",
            wheels: 4,
            description: "Elegant and comfortable passenger cars",
        },

        // Bike type (2 wheels)
        {
            name: "Cruiser",
            wheels: 2,
            description: "Comfortable long-distance motorcycles",
        },
        {
            name: "Sports",
            wheels: 2,
            description: "High-performance racing motorcycles",
        },
    ];

    console.log("Creating vehicle types...");
    const createdTypes = [];
    for (const type of vehicleTypes) {
        const created = await prisma.vehicleType.create({
            data: type,
        });
        createdTypes.push(created);
        console.log(`✅ Created vehicle type: ${created.name}`);
    }

    // Create vehicles for each type
    const vehicles = [
        // Hatchback vehicles
        {
            name: "Honda Civic Hatchback",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "Hatchback").id,
        },
        {
            name: "Toyota Corolla Hatchback",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "Hatchback").id,
        },
        {
            name: "Volkswagen Golf",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "Hatchback").id,
        },

        // SUV vehicles
        {
            name: "Toyota RAV4",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "SUV").id,
        },
        {
            name: "Honda CR-V",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "SUV").id,
        },
        {
            name: "Ford Explorer",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "SUV").id,
        },

        // Sedan vehicles
        {
            name: "Honda Accord",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "Sedan").id,
        },
        {
            name: "Toyota Camry",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "Sedan").id,
        },
        {
            name: "BMW 3 Series",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "Sedan").id,
        },

        // Cruiser bikes
        {
            name: "Harley-Davidson Street 750",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "Cruiser").id,
        },
        {
            name: "Indian Scout Bobber",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "Cruiser").id,
        },

        // Sports bikes
        {
            name: "Yamaha R1",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "Sports").id,
        },
        {
            name: "Kawasaki Ninja ZX-10R",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "Sports").id,
        },
        {
            name: "Honda CBR1000RR",
            model: "2023",
            vehicleTypeId: createdTypes.find((t) => t.name === "Sports").id,
        },
    ];

    console.log("Creating vehicles...");
    for (const vehicle of vehicles) {
        const created = await prisma.vehicle.create({
            data: vehicle,
        });
        console.log(`✅ Created vehicle: ${created.name} (${created.model})`);
    }

    console.log("🎉 Database seeded successfully!");
    console.log(
        `📊 Created ${vehicleTypes.length} vehicle types and ${vehicles.length} vehicles`
    );
}

main()
    .catch((e) => {
        console.error("❌ Error seeding database:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
