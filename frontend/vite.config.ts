import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  css: {
    postcss: "./postcss.config.js", // Make sure your PostCSS config is set correctly
  },
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": "http://localhost:5000", // Adjust to match your NestJS API
    },
  },
});
