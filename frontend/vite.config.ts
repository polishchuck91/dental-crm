import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@tanstack/react-query": "@tanstack/react-query/build/modern",
      "@": path.resolve(__dirname, "src"),
    },
  },
  optimizeDeps: {
    include: ["swr"],
  },
  css: {
    postcss: "./postcss.config.js", // Make sure your PostCSS config is set correctly
  },
  server: {
    watch: {
      usePolling: true,
    },
  },
});
