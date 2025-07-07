import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
export default defineConfig({
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
    allowedHosts: [
      "admin-dev.proprly.tech",
      "admin-staging.proprly.tech",
      "app.proprly.tech",
      "9e303f1b-41ac-49ee-8b74-46bd49bada30-00-2lh6tqj8qq0p0.sisko.replit.dev",
    ], //added this
  },
  server: {
    allowedHosts: [
      "admin-dev.proprly.tech",
      "admin-staging.proprly.tech",
      "app.proprly.tech",
      "9e303f1b-41ac-49ee-8b74-46bd49bada30-00-2lh6tqj8qq0p0.sisko.replit.dev",
    ], //added this
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./public"),
    },
  },
});
