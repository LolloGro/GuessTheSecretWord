/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "../server/views/layouts/main.handlebars",
    "../server/views/infoPage.handlebars",
    "../server/views/highscore.handlebars",
    "../server/views/layouts/homePage.handlebars",

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
