/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    50: "#e3f2fd",
                    100: "#bbdefb",
                    200: "#90caf9",
                    300: "#64b5f6",
                    400: "#42a5f5",
                    500: "#2196f3",
                    600: "#1976d2",
                    700: "#1565c0",
                    800: "#0d47a1",
                    900: "#0277bd",
                },
            },
            fontFamily: {
                inter: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [],
    // Important: Prevent conflicts with Material-UI
    corePlugins: {
        preflight: false,
    },
};
