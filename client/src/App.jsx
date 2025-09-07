import React from "react";
import { CssBaseline } from "@mui/material";
import { BookingProvider } from "./contexts/BookingContext";
import Header from "./components/layout/Header";
import BookingForm from "./components/forms/BookingForm";

function App() {
    return (
        <>
            <CssBaseline />
            <BookingProvider>
                <div className="App">
                    <Header />
                    <BookingForm />
                </div>
            </BookingProvider>
        </>
    );
}

export default App;
