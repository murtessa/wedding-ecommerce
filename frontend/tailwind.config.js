module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // ✅ Scans all JSX/TSX files
    "./public/index.html", // ✅ Include index.html
    "./src/assets/styles/tailwind.css", // ✅ Include global styles
  ],
  theme: {
    extend: {
      colors: {
        primary: "#d45e66",
        secondary: "#d89ea8",
      },
    },
  },
  plugins: [],
};
