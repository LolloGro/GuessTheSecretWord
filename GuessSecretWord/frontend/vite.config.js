import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        entryFileNames: "main.js",
        assetFileNames: "main.css",
      },
    },
  },
  server: {
    proxy: {
      "/api": "http://localhost:5080",
    },
  },
});
