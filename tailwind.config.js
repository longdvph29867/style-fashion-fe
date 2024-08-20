/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{jsx,js,tsx,ts}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1280px",
        },
      },
      colors: {
        primary: '#fe385c',
        primary2: '#ff385c',
        title: '#222222',
        content: '#6a6a6a',
        bg: '#f8f9fa',
      },
    },
  },
  plugins: [],
};
