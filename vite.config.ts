import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vite.dev/config/
export default defineConfig({
  optimizeDeps: {
    exclude: ["@szhsin/react-accordion"],
  },
  plugins: [
    react(),
    svgr({
      svgrOptions: {
        icon: true,
        // This will transform your SVG to a React component
        exportType: "named",
        namedExport: "ReactComponent",
      },
    }),
  ],
  preview: {
    allowedHosts: ["admin-dev.proprly.tech", "admin-staging.proprly.tech"], //added this
  },
  server: {
    cors: {
      origin: [
        "admin-dev.proprly.tech",
        "admin-staging.proprly.tech",
        "http://localhost:5173",
      ],
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    },
    allowedHosts: ["admin-dev.proprly.tech", "admin-staging.proprly.tech"], //added this
  },
});
