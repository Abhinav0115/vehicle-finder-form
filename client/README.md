# Vehicle Finder Client

A React-based frontend application for vehicle rental booking with a multi-step form interface.

## Features

- **Multi-step Form**: One question per screen with validation
- **Dynamic Data**: Vehicle types and vehicles fetched from API
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Validation**: Form validation with error handling
- **Availability Check**: Real-time vehicle availability checking
- **Progress Tracking**: Visual progress indicator
- **Material-UI**: Modern, accessible UI components
- **State Management**: Context API for form state
- **API Integration**: RESTful API communication

## Technology Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and dev server
- **Material-UI (MUI)** - UI component library
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API calls
- **React Hook Form** - Form handling
- **React Toastify** - Toast notifications
- **React Icons** - Icon library

## Project Structure

```
client/
├── src/
│   ├── components/
│   │   ├── forms/               # Form step components
│   │   │   ├── BookingForm.jsx
│   │   │   ├── NameStep.jsx
│   │   │   ├── WheelsStep.jsx
│   │   │   ├── VehicleTypeStep.jsx
│   │   │   ├── VehicleSelectionStep.jsx
│   │   │   ├── DateSelectionStep.jsx
│   │   │   └── ConfirmationStep.jsx
│   │   └── ui/                  # Reusable UI components
│   │   │   ├── Loading.jsx
│   │   │   ├── ErrorMessage.jsx
│   │   │   └── ProgressBar.jsx
│   │   └── layout/              # Reusable layout components
│   │       └── Header.jsx
│   ├── contexts/                # React Context providers
│   │   └── BookingContext.jsx
│   ├── hooks/                   # Custom React hooks
│   │   └── useApi.js
│   ├── services/                # API service layer
│   │   └── api.js
│   ├── utils/                   # Utility functions
│   │   └── helpers.js
│   ├── App.jsx                  # Main app component
│   ├── main.jsx                 # App entry point
│   └── App.css                  # Component-specific styles
│   └── index.css                # Global styles
├── public/                      # Static assets
├── package.json                 # Dependencies and scripts
├── vite.config.js               # Vite configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── .env.example                 # Example environment variables
└── README.md
```

## Quick Start

1. **Install dependencies**

    ```bash
    cd client
    npm install
    ```

2. **Set up environment**
   Create a `.env` file:

    ```env
    VITE_API_URL=http://localhost:3001/api
    VITE_NODE_ENV=development
    ```

3. **Start development server**

    ```bash
    npm run dev
    ```

    The app will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Form Flow

The application presents a multi-step booking form with the following steps:

### 1. Personal Information

- First Name (required, 2-50 characters)
- Last Name (required, 2-50 characters)
- Real-time validation with error messages

### 2. Number of Wheels

- Radio button selection: 2 or 4 wheels
- Visual cards with icons and descriptions
- Filters available vehicle types

### 3. Vehicle Type

- Dynamic list from API based on wheel selection
- Radio button selection with descriptions
- Categories like Hatchback, SUV, Sedan, Cruiser, Sports

### 4. Specific Vehicle

- Dynamic list based on selected vehicle type
- Shows vehicle name, model, and availability status
- Only available vehicles can be selected

### 5. Date Selection

- Start and end date pickers
- Date validation (future dates, end > start)
- Real-time availability checking
- Booking summary with duration

### 6. Confirmation & Booking

- Review all selected information
- Submit booking to API
- Success confirmation with booking details
- Option to make new booking

## Features & Validation

### Client-side Validation

- **Names**: Required, 2-50 characters, letters only
- **Dates**: Future dates, logical date range
- **Selections**: Required at each step
- **Real-time feedback**: Immediate error display

### Server Integration

- **Dynamic Data**: All options fetched from database
- **Availability Check**: Real-time vehicle availability
- **Booking Overlap**: Prevents double-booking
- **Error Handling**: Graceful API error handling

### User Experience

- **Progress Indicator**: Shows current step and progress
- **Navigation**: Back/Continue buttons with validation
- **Loading States**: Visual feedback during API calls
- **Error Recovery**: Retry mechanisms for failed requests
- **Responsive**: Works on all device sizes

## API Integration

The client communicates with the backend API:

### Endpoints Used

- `GET /api/vehicles/types` - Get vehicle types by wheels
- `GET /api/vehicles/type/{id}` - Get vehicles by type
- `GET /api/bookings/availability/check` - Check availability
- `POST /api/bookings` - Create booking

### Error Handling

- Network errors with retry options
- Validation errors with field-specific messages
- Server errors with user-friendly messages
- Loading states for better UX

## Environment Variables

```env
# Required
VITE_API_URL=http://localhost:3001/api

# Optional
VITE_NODE_ENV=development
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile) + Vite