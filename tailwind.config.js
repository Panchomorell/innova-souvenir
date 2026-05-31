/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        judicial: {
          ink: "#07111f",
          navy: "#0a1f38",
          blue: "#0b91e8",
          sky: "#7cc8ff",
          mist: "#e8f3fb",
          line: "#d8e6f1"
        }
      },
      boxShadow: {
        judicial: "0 20px 60px rgba(5, 17, 32, 0.16)"
      }
    }
  },
  plugins: []
};
