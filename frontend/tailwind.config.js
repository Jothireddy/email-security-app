export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#FFF7ED",
        ink: "#1A1A1A",
        accent: "#D05E35",
      },
      fontSize: {
        hero: "clamp(3rem, 6vw, 4.5rem)",
      },
    },
  },
  plugins: [],
};