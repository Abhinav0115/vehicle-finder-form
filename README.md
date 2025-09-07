# Vehicle Rental Form - Complete Rental Booking System

A full-stack vehicle rental booking application with a multi-step form interface. Users can book vehicles (cars and motorcycles) through an intuitive step-by-step process.

## 🚗 Project Overview

This application allows users to:

-   Enter personal information
-   Choose between 2-wheel and 4-wheel vehicles
-   Select vehicle types (Hatchback, SUV, Sedan, Cruiser, Sports)
-   Pick specific vehicles from available inventory
-   Select rental dates with availability checking
-   Complete bookings with confirmation

## 🏗️ Architecture

### Backend (Node.js + Express + SQLite + Prisma)

-   RESTful API with proper error handling
-   SQLite database with Prisma ORM
-   Booking overlap prevention
-   Data validation and sanitization
-   CORS enabled for frontend integration

### Frontend (React + Vite + Material-UI + Tailwind)

-   Multi-step form with validation
-   Responsive design for all devices
-   Real-time data fetching from API
-   Progress tracking and error handling
-   Modern UI with Material-UI components

## 📁 Project Structure

```
vehicle_finder/
├── backend/                 # Node.js API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── services/        # Business logic
│   │   ├── routes/          # API routes
│   │   ├── middleware/      # Custom middleware
│   │   └── index.js         # Main server file
│   ├── prisma/
│   │   └── schema.prisma    # Database schema
│   ├── scripts/
│   │   └── seed.js          # Database seeding
│   └── package.json
├── client/                  # React frontend app
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── contexts/        # State management
│   │   ├── hooks/           # Custom hooks
│   │   ├── services/        # API integration
│   │   └── utils/           # Helper functions
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   Git

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vehicle_finder
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Set up database and seed data
npm run db:setup

# Start development server
npm run dev
```

The backend will run on `http://localhost:3001`

### 3. Frontend Setup

```bash
cd client

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start development server
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📊 Database Schema

### VehicleType

-   `id` - Primary key
-   `name` - Vehicle type name (Hatchback, SUV, etc.)
-   `wheels` - Number of wheels (2 or 4)
-   `description` - Optional description

### Vehicle

-   `id` - Primary key
-   `name` - Vehicle name
-   `model` - Vehicle model/year
-   `vehicleTypeId` - Foreign key to VehicleType
-   `isAvailable` - Availability status

### Booking

-   `id` - Primary key
-   `firstName` - Customer first name
-   `lastName` - Customer last name
-   `vehicleId` - Foreign key to Vehicle
-   `startDate` - Booking start date
-   `endDate` - Booking end date
-   `status` - Booking status

## 🔧 API Endpoints

### Vehicle Endpoints

-   `GET /api/vehicles/types?wheels={2|4}` - Get vehicle types
-   `GET /api/vehicles/type/{typeId}` - Get vehicles by type
-   `GET /api/vehicles/{vehicleId}` - Get specific vehicle

### Booking Endpoints

-   `POST /api/bookings` - Create new booking
-   `GET /api/bookings` - Get all bookings
-   `GET /api/bookings/{bookingId}` - Get specific booking
-   `GET /api/bookings/availability/check` - Check availability

## ✨ Features

### Backend Features

-   **Data Validation**: Comprehensive input validation
-   **Error Handling**: Consistent error responses
-   **Booking Logic**: Prevents overlapping bookings
-   **Database Seeding**: Initial data for testing
-   **CORS Support**: Frontend integration ready

### Frontend Features

-   **Multi-step Form**: One question per screen
-   **Progress Tracking**: Visual step indicator
-   **Real-time Validation**: Immediate feedback
-   **Responsive Design**: Mobile-friendly interface
-   **Error Recovery**: Retry mechanisms
-   **Loading States**: Better user experience

## 🧪 Testing the Application

### 1. Start Both Servers

-   Backend: `http://localhost:3001`
-   Frontend: `http://localhost:5173`

### 2. Test the Booking Flow

1. **Name Step**: Enter first and last name
2. **Wheels Step**: Choose 2 or 4 wheels
3. **Type Step**: Select vehicle type (filtered by wheels)
4. **Vehicle Step**: Pick specific vehicle (filtered by type)
5. **Dates Step**: Choose rental dates (availability checked)
6. **Confirm Step**: Review and submit booking

### 3. API Testing

Use tools like Postman or curl to test API endpoints:

```bash
# Get vehicle types for cars (4 wheels)
curl http://localhost:3001/api/vehicles/types?wheels=4

# Get vehicles for a specific type
curl http://localhost:3001/api/vehicles/type/1

# Check booking availability
curl "http://localhost:3001/api/bookings/availability/check?vehicleId=1&startDate=2024-01-15&endDate=2024-01-20"
```

## 🛠️ Development Scripts

### Backend

```bash
npm run dev          # Start development server
npm run db:setup     # Setup database with seed data
npm run db:migrate   # Run database migrations
npm run db:seed      # Seed database with sample data
npm run db:reset     # Reset database (careful!)
```

### Frontend

```bash
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
npm run lint        # Run linting
```

## 📦 Production Deployment

### Backend

```bash
cd backend
npm install --production
npm run db:generate
npm run db:migrate
npm start
```

### Frontend

```bash
cd client
npm install
npm run build
# Deploy dist/ folder to your hosting service
```

## 🔒 Environment Variables

### Backend (.env)

```env
NODE_ENV=production
PORT=3001
DATABASE_URL="file:./production.db"
ALLOWED_ORIGINS=https://your-frontend-domain.com
```

### Frontend (.env)

```env
VITE_API_URL=https://your-api-domain.com/api
VITE_NODE_ENV=production
```

## 🐛 Troubleshooting

### Common Issues

1. **Database Connection Error**

    - Ensure database URL is correct
    - Run `npm run db:generate` and `npm run db:migrate`

2. **CORS Error**

    - Check `ALLOWED_ORIGINS` in backend .env
    - Verify frontend is running on correct port

3. **API Connection Failed**

    - Ensure backend server is running
    - Check `VITE_API_URL` in frontend .env

4. **Missing Data**
    - Run `npm run db:seed` to populate sample data
    - Check database seeding script output

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**Happy Coding! 🚗💨**
