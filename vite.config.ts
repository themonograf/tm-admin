import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3700,
    open: true,
  },
  resolve: {
    alias: [{ find: "@tm-wear", replacement: path.resolve(__dirname, "src") }],
  },
  optimizeDeps: {
    force: true,
  },
});
