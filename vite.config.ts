import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
export default defineConfig({
  plugins: [react(), svgr({
    svgrOptions: {
      icon: true,
      // This will transform your SVG to a React component
      exportType: "named",
      namedExport: "ReactComponent",
    },
  })],
  preview: {
    allowedHosts: ["admin-dev.proprly.tech", "admin-staging.proprly.tech", "app.proprly.tech"], //added this
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "~": path.resolve(__dirname, "./public"),
    }
  },
});
