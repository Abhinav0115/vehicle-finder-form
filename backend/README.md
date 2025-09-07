# Vehicle Finder Backend

A Node.js Express API for managing vehicle rentals with SQLite database and Prisma ORM.

## Features

-   RESTful API for vehicle and booking management
-   SQLite database with Prisma ORM
-   Input validation and error handling
-   CORS support for frontend integration
-   Database seeding with initial data
-   Booking overlap prevention

## Project Structure

```
backend/
├── src/
│   ├── controllers/     # Route controllers
│   ├── services/        # Business logic services
│   ├── routes/          # API route definitions
│   ├── middleware/      # Custom middleware
│   └── index.js         # Main application file
├── prisma/
│   └── schema.prisma    # Database schema
├── scripts/
│   └── seed.js          # Database seeding script
│   ├── .env.example     # Example environment variables
└── package.json         # Project metadata and dependencies
```

## Quick Start

1. **Install dependencies**

    ```bash
    cd backend
    npm install
    ```

2. **Set up the database**

    ```bash
    npm run db:setup
    ```

3. **Start the development server**
    ```bash
    npm run dev
    ```

The API will be available at `http://localhost:3001`

## Available Scripts

-   `npm run dev` - Start development server with nodemon
-   `npm start` - Start production server
-   `npm run db:generate` - Generate Prisma client
-   `npm run db:migrate` - Run database migrations
-   `npm run db:seed` - Seed database with initial data
-   `npm run db:setup` - Complete database setup (generate + migrate + seed)
-   `npm run db:reset` - Reset database (careful!)

## API Endpoints

### Vehicles

-   `GET /api/vehicles/types` - Get vehicle types (optional: ?wheels=2|4)
-   `GET /api/vehicles/types/all` - Get all vehicle types with vehicles
-   `GET /api/vehicles/type/:vehicleTypeId` - Get vehicles by type
-   `GET /api/vehicles/:vehicleId` - Get specific vehicle

### Bookings

-   `POST /api/bookings` - Create new booking
-   `GET /api/bookings` - Get all bookings
-   `GET /api/bookings/:bookingId` - Get specific booking
-   `GET /api/bookings/availability/check` - Check vehicle availability

### Health Check

-   `GET /api` - API health status

## Database Schema

### VehicleType

-   id (Primary Key)
-   name (String, unique)
-   wheels (Integer: 2 or 4)
-   description (Optional string)

### Vehicle

-   id (Primary Key)
-   name (String)
-   model (String)
-   vehicleTypeId (Foreign Key)
-   isAvailable (Boolean)

### Booking

-   id (Primary Key)
-   firstName (String)
-   lastName (String)
-   vehicleId (Foreign Key)
-   startDate (DateTime)
-   endDate (DateTime)
-   status (String: confirmed/cancelled)

## Environment Variables

Create a `.env` file:

```env
NODE_ENV=development
PORT=3001
DATABASE_URL="file:./dev.db"
ALLOWED_ORIGINS=http://localhost:5173
```

## Validation Rules

### Booking Creation

-   firstName: 2-50 characters, required
-   lastName: 2-50 characters, required
-   vehicleId: positive integer, required
-   startDate: ISO 8601 date, required, future date
-   endDate: ISO 8601 date, required, after startDate

## Error Handling

The API returns consistent error responses:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [...] // For validation errors
}
```

## Business Logic

### Booking Overlap Prevention

-   Only one booking per vehicle at any given time
-   Checks for date range overlaps before creating bookings
-   Returns appropriate error messages for conflicts

### Date Validation

-   Start date must be in the future
-   End date must be after start date
-   Dates must be in ISO 8601 format