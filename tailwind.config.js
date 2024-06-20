/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './app/**/*.{js,jsx,ts,tsx}',
        './components/**/*.{js,jsx,ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                primary: "#161622",
                secondary: {
                    DEFAULT: "#FF9C01",
                    100: "#FF9001",
                    200: "#FF8E01",
                },
                black: {
                    DEFAULT: "#000",
                    100: "#1E1E2D",
                    200: "#232533",
                },
                gray: {
                    100: "#CDCDE0",
                },
            },
            fontFamily: {
                "spice-thin": ["Poppins-Thin", "sans-serif"],
                "spice-extralight": ["Poppins-ExtraLight", "sans-serif"],
                "spice-light": ["Poppins-Light", "sans-serif"],
                "spice-regular": ["Poppins-Regular", "sans-serif"],
                "spice-medium": ["Poppins-Medium", "sans-serif"],
                "spice-semibold": ["Poppins-SemiBold", "sans-serif"],
                "spice-bold": ["Poppins-Bold", "sans-serif"],
                "spice-extrabold": ["Poppins-ExtraBold", "sans-serif"],
                "spice-black": ["Poppins-Black", "sans-serif"],
            },
        },
    },
    plugins: []
};
