/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../server/views/layouts/main.handlebars",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "button-blue": "#00AEC6",
      },
    },
  },
  plugins: [],
};

//./index.html
